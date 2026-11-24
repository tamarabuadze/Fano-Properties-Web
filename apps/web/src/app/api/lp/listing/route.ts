import { NextResponse, after } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@fano/db";
import { sendLeadToFanoApp } from "@/lib/fano-app";
import type { Attribution } from "@/lib/attribution";

// The form on the "List your property" landing pages (/lp/en|ar/list-your-property) posts here.
// Like the website's own List Your Property form, each submission is saved under Inquiries in the
// website admin and copied to the Fano team app's Lead inbox.

const TYPES = ["Apartment", "Penthouse", "Villa", "Townhouse", "Office", "Retail", "Plot", "Other"] as const;
const STATUSES = ["Ready to move in", "Off-plan", "Under construction", "Tenanted"] as const;
const BEDROOMS = ["N/A", "Studio", "1 BR", "2 BR", "3 BR", "4 BR", "5 BR+"] as const;
const ATTRIBUTION_KEYS = ["c", "gclid", "gbraid", "wbraid", "fbclid", "utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "ref"];

const schema = z.object({
  name: z.string().trim().min(2).max(80),
  phone: z.string().trim().max(25),
  email: z.union([z.literal(""), z.string().trim().max(120).email()]).optional(),
  propertyType: z.enum(TYPES),
  intent: z.enum(["Sell", "Lease", ""]).optional(),
  status: z.enum([...STATUSES, ""]).optional(),
  bedrooms: z.enum([...BEDROOMS, ""]).optional(),
  area: z.string().trim().max(120).optional(),
  notes: z.string().trim().max(1000).optional(),
  lang: z.enum(["en", "ar"]).optional(),
  page: z.string().max(300).optional(),
  attribution: z.record(z.string().max(300)).optional(),
  // Spam guards, as on the website's other forms: a field people never see, and how long the form was open
  website: z.string().max(200).optional(),
  ms: z.number().optional(),
});

const MIN_FILL_MS = 2500;

/** 7 to 15 digits and not one digit repeated */
function plausiblePhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 7 && digits.length <= 15 && !/^(\d)\1+$/.test(digits);
}

/** Only this website's own pages may post here */
function fromThisSite(req: Request) {
  const origin = req.headers.get("origin");
  if (!origin) return true;
  try {
    const host = new URL(origin).host;
    const own = [req.headers.get("x-forwarded-host"), req.headers.get("host")].filter(Boolean);
    return own.includes(host) || /(^|\.)fanoproperties\.com$/.test(host) || /^(localhost|127\.0\.0\.1)(:\d+)?$/.test(host);
  } catch {
    return false;
  }
}

const json = (body: object, status = 200) => NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });

export async function POST(req: Request) {
  if (!fromThisSite(req)) return json({ ok: false }, 403);
  const raw = await req.text();
  if (raw.length > 20_000) return json({ ok: false }, 413);

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return json({ ok: false }, 400);
  }
  const parsed = schema.safeParse(body);
  if (!parsed.success) return json({ ok: false }, 400);
  const f = parsed.data;

  // Bots get the same answer as people, and nothing is saved
  if (f.website || (f.ms !== undefined && f.ms < MIN_FILL_MS)) return json({ ok: true });
  if (!plausiblePhone(f.phone)) return json({ ok: false }, 400);

  const attribution = Object.fromEntries(
    Object.entries(f.attribution ?? {}).filter(([key]) => ATTRIBUTION_KEYS.includes(key)),
  ) as Attribution;
  const bedrooms = f.bedrooms && f.bedrooms !== "N/A" ? f.bedrooms : "";
  const details = [
    `Property Type: ${f.propertyType}`,
    f.intent ? `Looking to: ${f.intent}` : null,
    f.status ? `Status: ${f.status}` : null,
    f.bedrooms ? `Bedrooms: ${f.bedrooms}` : null,
    f.area ? `Area / Community: ${f.area}` : null,
    f.notes ? `Additional notes: ${f.notes}` : null,
  ].filter(Boolean).join("\n");
  const message = `Listing submission (landing page, ${f.lang === "ar" ? "Arabic" : "English"})\n\n${details}`;
  const [firstName = "", ...rest] = f.name.split(/\s+/);

  // The team app sees the website server's location, so pass the visitor's country from Cloudflare
  const country = req.headers.get("cf-ipcountry")?.toUpperCase();
  const lead = (inquiryId?: string) => ({
    inquiryId,
    name: f.name,
    phone: f.phone,
    email: f.email || undefined,
    message: country && country !== "XX" ? `${message}\nVisitor country: ${country}` : message,
    project: "List your property",
    unit: [f.propertyType, bedrooms, f.status].filter(Boolean).join(" · "),
    purpose: f.intent ? `Owner wants to ${f.intent.toLowerCase()}` : "Owner listing",
    page: f.page,
    attribution,
  });

  try {
    const saved = await prisma.inquiry.create({
      data: {
        firstName: firstName.slice(0, 50),
        lastName: rest.join(" ").slice(0, 50),
        email: f.email ?? "",
        phone: f.phone,
        message,
        type: "general",
      },
    });
    revalidatePath("/admin/inquiries");
    // Copy it to the team app's Lead inbox once the visitor has their answer
    after(() => sendLeadToFanoApp(lead(saved.id)));
    return json({ ok: true });
  } catch (e) {
    // The website's database could not be reached: the Lead inbox alone still gets the enquiry
    console.warn("[lp-listing] not saved", e instanceof Error ? e.message : e);
    return (await sendLeadToFanoApp(lead())) ? json({ ok: true }) : json({ ok: false }, 502);
  }
}
