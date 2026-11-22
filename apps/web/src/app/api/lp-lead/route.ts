import { NextResponse, after } from "next/server";
import { prisma } from "@fano/db";
import { z } from "zod";
import { sendLeadToFanoApp } from "@/lib/fano-app";

// Enquiries from the /lp landing pages. Each one is saved with the website's other enquiries
// (Admin → Inquiries) and then handed to the Fano team app's Lead inbox as a "Website" lead.
// The pages show "Enquiry received" only once it is saved here, so a team-app outage loses nothing.

const lead = z.object({
  name: z.string().trim().min(2).max(80),
  phone: z.string().trim().max(30),
  email: z.union([z.literal(""), z.string().trim().email().max(120)]).optional(),
  unit: z.string().max(80).optional(),
  budget: z.string().max(80).optional(),
  purpose: z.string().max(80).optional(),
  message: z.string().max(1500).optional(),
  website: z.string().max(200).optional(), // hidden field people never see
  project: z.string().max(160).optional(),
  page: z.string().max(300).optional(),
  ms: z.number().optional(), // time from opening the page to sending
  c: z.string().max(100).optional(),
  gclid: z.string().max(300).optional(),
  gbraid: z.string().max(300).optional(),
  wbraid: z.string().max(300).optional(),
  utm_source: z.string().max(100).optional(),
  utm_medium: z.string().max(100).optional(),
  utm_campaign: z.string().max(150).optional(),
  ref: z.string().max(300).optional(),
});

const MIN_FILL_MS = 2500;
const LIMIT = 5; // enquiries per visitor address per 10 minutes
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
  if (raw.length > 20_000) return NextResponse.json({ ok: false }, { status: 413 });
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
  const [firstName, ...rest] = d.name.split(/\s+/);
  const details = [
    d.project && `Landing page: ${d.project}`,
    d.unit && `Interested in: ${d.unit}`,
    d.budget && `Budget: ${d.budget}`,
    d.purpose && `Purpose: ${d.purpose}`,
    country && country !== "XX" && `Visitor country: ${country}`,
  ].filter(Boolean);
  const message = [d.message?.trim(), ...details].filter(Boolean).join("\n") || "Landing page enquiry";

  let inquiryId: string;
  try {
    const saved = await prisma.inquiry.create({
      data: {
        type: "property",
        firstName: (firstName ?? d.name).slice(0, 50),
        lastName: (rest.join(" ") || "-").slice(0, 50),
        email: d.email || "",
        phone: d.phone,
        message,
      },
      select: { id: true },
    });
    inquiryId = saved.id;
  } catch (e) {
    console.error("[lp-lead] could not save", e instanceof Error ? e.message : e);
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  after(() =>
    sendLeadToFanoApp({
      inquiryId,
      name: d.name,
      phone: d.phone,
      email: d.email || undefined,
      message: country && country !== "XX" ? `${d.message ?? ""}\nVisitor country: ${country}`.trim() : d.message,
      project: d.project,
      unit: d.unit,
      budget: d.budget,
      purpose: d.purpose,
      page: d.page,
      // Empty fields are left out, so a Google click without UTM tags is still credited as google / cpc
      attribution: Object.fromEntries(
        Object.entries({
          c: d.c, gclid: d.gclid, gbraid: d.gbraid, wbraid: d.wbraid,
          utm_source: d.utm_source, utm_medium: d.utm_medium, utm_campaign: d.utm_campaign, ref: d.ref,
        }).filter(([, v]) => v),
      ),
    }).then((ok) => { if (!ok) console.warn("[lp-lead] team app did not accept", inquiryId); }),
  );

  return NextResponse.json({ ok: true });
}
