// Google Analytics / Google Ads events. Safe to call before the tag loads, or when no tag is set up.
type Gtag = (...args: unknown[]) => void;

declare global {
  interface Window {
    gtag?: Gtag;
    dataLayer?: unknown[];
  }
}

export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", name, params);
}

/** A sent enquiry: the event Google Ads optimises for */
export function trackLead(form: "contact" | "property_inquiry" | "roi_lead" | "listing_submission" | "office_enquiry", params: Record<string, unknown> = {}) {
  trackEvent("generate_lead", { form_name: form, currency: "AED", ...params });
}

/** Countries where cookies for ads and analytics need consent first (EEA, UK, Switzerland) */
export const CONSENT_COUNTRIES = [
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU", "IE", "IT", "LV", "LT",
  "LU", "MT", "NL", "PL", "PT", "RO", "SK", "SI", "ES", "SE", "IS", "LI", "NO", "GB", "CH",
];
