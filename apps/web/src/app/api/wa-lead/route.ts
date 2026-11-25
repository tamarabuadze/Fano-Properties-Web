import { NextResponse, after } from "next/server";
import { prisma } from "@fano/db";
import { z } from "zod";
import { sendLeadToFanoApp } from "@/lib/fano-app";

// Name and mobile left in the box that shows before WhatsApp opens (lib/whatsapp-gate.ts).
// Each one is saved with the website's other enquiries (Admin → Inquiries, as a call-back) and
// copied to the team app's Lead inbox. WhatsApp opens whatever happens here, so this never blocks
// the chat; the answer only matters to bots.

const lead = z.object({
  name: z.string().trim().min(2).max(80),
  phone: z.string().trim().max(30),
  website: z.string().max(200).optional(), // hidden field people never see
  ms: z.number().optional(), // time from the box opening to sending
  page: z.string().max(300).optional(),
  title: z.string().max(160).optional(),
  c: z.string().max(200).optional(),
  gclid: z.string().max(300).optional(),
  gbraid: z.string().max(300).optional(),
  wbraid: z.string().max(300).optional(),
  utm_source: z.string().max(200).optional(),
  utm_medium: z.string().max(200).optional(),
  utm_campaign: z.string().max(200).optional(),
  ref: z.string().max(300).optional(),
});

const MIN_FILL_MS = 1500; // typing a name and a number takes longer than this
const LIMIT = 5; // per visitor address per 10 minutes
const WINDOW_MS = 10 * 60 * 1000;
const recent = new Map<string, number[]>();

function tooMany(ip: string): boolean {
  const now = Date.now();
  const list = (recent.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  list.push(now);
  recent.set(ip, list);
  if (recent.size > 5000) for (const [k, v] of recent) if (now - (v[v.length - 1] ?? 0) > WINDOW_MS) recent.delete(k);
  return list.length > LIMIT;
}

const SITE_HOSTS = new Set(["fanoproperties.com", "www.fanoproperties.com", "localhost"]);

export async function POST(req: Request) {
  // Only this site's own pages may send
  const origin = req.headers.get("origin");
  if (origin) {
    let host = "";
    try { host = new URL(origin).hostname; } catch {}
    if (!SITE_HOSTS.has(host) && host !== new URL(req.url).hostname) {
      return NextResponse.json({ ok: false }, { status: 403 });
    }
  }
  const raw = await req.text();
  if (raw.length > 10_000) return NextResponse.json({ ok: false }, { status: 413 });
  let body: unknown;
  try { body = JSON.parse(raw); } catch { return NextResponse.json({ ok: false }, { status: 400 }); }
  const parsed = lead.safeParse(body);
  if (!parsed.success) return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  const d = parsed.data;

  // Bots get the same answer as people, and nothing is saved
  if (d.website || (d.ms !== undefined && d.ms < MIN_FILL_MS)) return NextResponse.json({ ok: true });

  const digits = d.phone.replace(/\D/g, "");
  if (digits.length < 7 || digits.length > 15 || /^(\d)\1+$/.test(digits)) {
    return NextResponse.json({ ok: false, error: "phone" }, { status: 400 });
  }

  const ip = req.headers.get("cf-connecting-ip") ?? req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (tooMany(ip)) return NextResponse.json({ ok: false, error: "too_many" }, { status: 429 });

  const country = req.headers.get("cf-ipcountry")?.toUpperCase();
  const where = d.title?.trim() || d.page || "fanoproperties.com";
  const message = [
    `Tapped WhatsApp on: ${where}`,
    d.page && `Page: ${d.page}`,
    "They were sent on to WhatsApp +971 52 571 9164 and may already have messaged there.",
    country && country !== "XX" && `Visitor country: ${country}`,
  ].filter(Boolean).join("\n");
  const attribution = Object.fromEntries(
    Object.entries({
      c: d.c, gclid: d.gclid, gbraid: d.gbraid, wbraid: d.wbraid,
      utm_source: d.utm_source, utm_medium: d.utm_medium, utm_campaign: d.utm_campaign, ref: d.ref,
    }).filter(([, v]) => v),
  );

  // A database hiccup must not lose the lead, so the team app copy goes out either way
  let inquiryId: string | undefined;
  try {
    const [firstName, ...rest] = d.name.split(/\s+/);
    const saved = await prisma.inquiry.create({
      data: {
        type: "callback",
        firstName: (firstName ?? d.name).slice(0, 50),
        lastName: (rest.join(" ") || "-").slice(0, 50),
        email: "",
        phone: d.phone,
        message,
      },
      select: { id: true },
    });
    inquiryId = saved.id;
  } catch (e) {
    console.error("[wa-lead] could not save", e instanceof Error ? e.message : e);
  }

  after(() =>
    sendLeadToFanoApp({
      inquiryId,
      name: d.name,
      phone: d.phone,
      message,
      project: where.slice(0, 160),
      page: d.page,
      attribution,
    }).then((ok) => { if (!ok) console.warn("[wa-lead] team app did not accept", inquiryId ?? "(not saved)"); }),
  );

  return NextResponse.json({ ok: true });
}
