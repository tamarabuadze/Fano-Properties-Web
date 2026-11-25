import type { Attribution } from "@/lib/attribution";

// Website enquiries are copied into the Fano team app's Lead inbox as "Website" leads.
// The apps accept requests from the fanoproperties.com origin and need a 7-15 digit phone.
//
// Every lead goes to the new team app, and a copy still goes to the old one (version 15) while
// the team moves over, so nothing is missed if one of them turns a lead away. Once everyone works
// in the new app, set FANO_APP_LEAD_URLS on Railway to the new app's address alone.
//   FANO_APP_LEAD_URLS  comma-separated list; replaces both addresses below
//   FANO_APP_LEAD_URL   older single setting; still honoured, in place of the old app's address
const NEW_APP_LEAD_URL = "https://fano-ai.marketing-a98.workers.dev/api/lead";
const OLD_APP_LEAD_URL = "https://app.fanoproperties.workers.dev/api/lead";

function leadUrls(): string[] {
  const list = process.env.FANO_APP_LEAD_URLS?.trim()
    ? process.env.FANO_APP_LEAD_URLS.split(",")
    : [NEW_APP_LEAD_URL, process.env.FANO_APP_LEAD_URL?.trim() || OLD_APP_LEAD_URL];
  return [...new Set(list.map((u) => u.trim()).filter((u) => /^https?:\/\//.test(u)))];
}

export interface FanoAppLead {
  name: string;
  phone: string;
  email?: string;
  message?: string;
  project?: string;
  unit?: string;
  budget?: string;
  purpose?: string;
  page?: string;
  attribution?: Attribution;
  inquiryId?: string;
}

/**
 * Sends the lead to every team app address at once, retrying each once after a short wait.
 * True when at least one app took it.
 */
export async function sendLeadToFanoApp(lead: FanoAppLead): Promise<boolean> {
  const results = await Promise.all(leadUrls().map((url) => sendWithRetry(url, lead)));
  return results.some(Boolean);
}

async function sendWithRetry(url: string, lead: FanoAppLead): Promise<boolean> {
  if (await sendOnce(url, lead)) return true;
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return sendOnce(url, lead);
}

async function sendOnce(url: string, lead: FanoAppLead): Promise<boolean> {
  const digits = lead.phone.replace(/\D/g, "");
  if (digits.length < 7 || digits.length > 15) return false;
  const a = lead.attribution ?? {};
  const app = new URL(url).hostname;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", Origin: "https://fanoproperties.com" },
      body: JSON.stringify({
        name: lead.name.slice(0, 80),
        phone: lead.phone,
        email: lead.email ?? "",
        unit: (lead.unit ?? "").slice(0, 80),
        budget: (lead.budget ?? "").slice(0, 80),
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
      console.warn("[fano-app-lead] not accepted", app, res.status);
      return false;
    }
    // A 2xx answer is a saved lead unless the app says ok:false or accepted:false
    const result: { ok?: boolean; accepted?: boolean } = await res.json().catch(() => ({}));
    if (result.ok === false || result.accepted === false) {
      console.warn("[fano-app-lead] not accepted", app, JSON.stringify(result).slice(0, 120));
      return false;
    }
    return true;
  } catch (e) {
    console.warn("[fano-app-lead] failed", app, e instanceof Error ? e.message : e);
    return false;
  }
}
