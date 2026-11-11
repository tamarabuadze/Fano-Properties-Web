// Remembers which ad or link brought the visitor, so enquiries can be credited to the campaign.
// Kept for the browser session. Internal links must not erase an ad click identifier.
const KEY = "fano-attribution";
const PARAMS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "c", "gclid", "gbraid", "wbraid", "fbclid"] as const;
const CLICK_IDS = ["gclid", "gbraid", "wbraid", "fbclid"] as const;

export type Attribution = Partial<Record<(typeof PARAMS)[number] | "ref" | "landing", string>>;

export function captureAttribution() {
  if (typeof window === "undefined") return;
  try {
    const qs = new URLSearchParams(window.location.search);
    const existing = getAttribution();
    const found: Attribution = {};
    for (const p of PARAMS) {
      const v = qs.get(p);
      if (v && (!CLICK_IDS.includes(p as (typeof CLICK_IDS)[number]) || /^[A-Za-z0-9_-]{8,200}$/.test(v))) found[p] = v.slice(0, 200);
    }
    const hasTags = Object.keys(found).length > 0;
    const hasNewClick = CLICK_IDS.some((key) => found[key]);
    if (!hasNewClick && CLICK_IDS.some((key) => existing[key])) return;
    if (!hasTags && Object.keys(existing).length) return;
    let ref = "";
    try { if (document.referrer && new URL(document.referrer).origin !== window.location.origin) ref = document.referrer; } catch {}
    sessionStorage.setItem(KEY, JSON.stringify({ ...found, ref: ref.slice(0, 300), landing: window.location.pathname }));
  } catch {}
}

export function getAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  try {
    const saved: unknown = JSON.parse(sessionStorage.getItem(KEY) ?? "{}");
    if (!saved || typeof saved !== "object" || Array.isArray(saved)) return {};
    return Object.fromEntries(Object.entries(saved).filter(([key, value]) =>
      ([...PARAMS, "ref", "landing"] as string[]).includes(key) && typeof value === "string"
    ).map(([key, value]) => [key, (value as string).slice(0, 300)])) as Attribution;
  } catch {
    return {};
  }
}
