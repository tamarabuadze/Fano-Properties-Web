import type { Attribution } from "@/lib/attribution";

// Website enquiries are copied into the Fano team app's Lead inbox as "Website" leads.
// The app accepts requests from the fanoproperties.com origin and needs a 7-15 digit phone.
const LEAD_URL = process.env.FANO_APP_LEAD_URL ?? "https://app.fanoproperties.workers.dev/api/lead";

export interface FanoAppLead {
  name: string;
  phone: string;
  email?: string;
  message?: string;
  project?: string;
  unit?: string;
  purpose?: string;
  page?: string;
  attribution?: Attribution;
  inquiryId?: string;
}

export async function sendLeadToFanoApp(lead: FanoAppLead): Promise<boolean> {
  const digits = lead.phone.replace(/\D/g, "");
  if (digits.length < 7 || digits.length > 15) return false;
  const a = lead.attribution ?? {};
  try {
    const res = await fetch(LEAD_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", Origin: "https://fanoproperties.com" },
      body: JSON.stringify({
        name: lead.name.slice(0, 80),
        phone: lead.phone,
        email: lead.email ?? "",
        unit: lead.unit ?? "",
        budget: "",
        purpose: lead.purpose ?? "",
        message: (lead.message ?? "").slice(0, 1500),
        website: "",
        project: lead.project ?? "fanoproperties.com",
        page: lead.page ?? "",
        inquiryId: lead.inquiryId ?? "",
        // Sent from the server after the visitor filled the form, so well past the app's too-fast check
        ms: 10000,
        c: a.c ?? "",
        gclid: a.gclid ?? "",
        gbraid: a.gbraid ?? "",
        wbraid: a.wbraid ?? "",
        utm_source: a.utm_source ?? (a.gclid || a.gbraid || a.wbraid ? "google" : a.fbclid ? "facebook" : ""),
        utm_medium: a.utm_medium ?? (a.gclid || a.gbraid || a.wbraid || a.fbclid ? "cpc" : ""),
        utm_campaign: a.utm_campaign ?? "",
        ref: a.ref ?? "",
      }),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) {
      console.warn("[fano-app-lead] not accepted", res.status);
      return false;
    }
    const result: { ok?: boolean; accepted?: boolean } = await res.json();
    return result.ok === true && result.accepted !== false;
  } catch (e) {
    console.warn("[fano-app-lead] failed", e instanceof Error ? e.message : e);
    return false;
  }
}
