import type { Attribution } from "@/lib/attribution";

// Website enquiries are copied into the Fano team app's Lead inbox as "Website" leads.
// The app accepts requests from the fanoproperties.com origin and needs a 7-15 digit phone.
//
// The team app answers at two addresses that share one database, so each lead goes to the first
// address only; the second is a backup, used only when the first does not take the lead. Sending
// to both would put every lead in the inbox twice.
//   FANO_APP_LEAD_URLS  comma-separated list, tried in order; replaces the addresses below
//   FANO_APP_LEAD_URL   older single setting; still honoured, tried first
const APP_LEAD_URL = "https://app.fanoproperties.workers.dev/api/lead";
const BACKUP_APP_LEAD_URL = "https://fano-ai.fanoproperties.workers.dev/api/lead";

function leadUrls(): string[] {
  const list = process.env.FANO_APP_LEAD_URLS?.trim()
    ? process.env.FANO_APP_LEAD_URLS.split(",")
    : [process.env.FANO_APP_LEAD_URL?.trim() ?? "", APP_LEAD_URL, BACKUP_APP_LEAD_URL];
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
 * Sends the lead to the team app, retrying once after a short wait, and moves on to the backup
 * address only if that fails. True when the app took it.
 */
export async function sendLeadToFanoApp(lead: FanoAppLead): Promise<boolean> {
  for (const url of leadUrls()) {
    if (await sendWithRetry(url, lead)) return true;
  }
  return false;
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
