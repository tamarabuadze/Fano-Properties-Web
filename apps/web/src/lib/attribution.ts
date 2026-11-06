// Remembers which ad or link brought the visitor, so enquiries can be credited to the campaign.
// Kept for the browser session; the first visit with tracking tags wins.
const KEY = "fano-attribution";
const PARAMS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "c", "gclid", "fbclid"] as const;

export type Attribution = Partial<Record<(typeof PARAMS)[number] | "ref" | "landing", string>>;

export function captureAttribution() {
  if (typeof window === "undefined") return;
  try {
    const qs = new URLSearchParams(window.location.search);
    const found: Attribution = {};
    for (const p of PARAMS) {
      const v = qs.get(p);
      if (v) found[p] = v.slice(0, 200);
    }
    const hasTags = Object.keys(found).length > 0;
    if (!hasTags && sessionStorage.getItem(KEY)) return;
    const ref = document.referrer && !document.referrer.startsWith(window.location.origin) ? document.referrer : "";
    sessionStorage.setItem(KEY, JSON.stringify({ ...found, ref: ref.slice(0, 300), landing: window.location.pathname }));
  } catch {}
}

export function getAttribution(): Attribution {
  try {
    return JSON.parse(sessionStorage.getItem(KEY) ?? "{}") as Attribution;
  } catch {
    return {};
  }
}
