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

/**
 * Turns a phone number as the visitor typed it into the international format Google
 * matches on (+971501234567). UAE numbers typed without a country code (050 123 4567,
 * 50 123 4567, 04 123 4567) are valid and get +971; numbers with a code (+44…, 0044…,
 * 971…) keep theirs. Only the copy sent to Google is changed; the lead keeps what was typed.
 */
export function toE164Phone(raw: string): string | undefined {
  const typed = raw.trim();
  let digits = typed.replace(/\D/g, "");
  let e164: string;
  if (!digits) return undefined;
  if (typed.startsWith("+")) e164 = "+" + digits;
  else if (digits.startsWith("00")) e164 = "+" + digits.slice(2);
  else if (digits.startsWith("971")) e164 = "+" + digits;
  else {
    if (digits.startsWith("0")) digits = digits.slice(1);
    // UAE numbers without the trunk 0 are 8 digits (landline) or 9 (mobile)
    if (digits.length === 8 || digits.length === 9) e164 = "+971" + digits;
    // Anything longer was typed with its own country code, just without the +
    else e164 = "+" + digits;
  }
  const length = e164.length - 1;
  return length >= 8 && length <= 15 ? e164 : undefined;
}

export interface LeadContact {
  email?: string;
  phone?: string;
}

/**
 * Hands the enquirer's email and phone to the Google tag (user-provided data), so GA4
 * and Google Ads can match the lead to a Google account. The tag hashes it before
 * sending and respects the visitor's ad_user_data consent. Address is left out: Google
 * needs a postal code with it, which UAE addresses don't have.
 */
function setUserData({ email, phone }: LeadContact) {
  if (typeof window === "undefined" || !window.gtag) return;
  const data: Record<string, string> = {};
  const cleanEmail = email?.trim().toLowerCase();
  if (cleanEmail) data.email = cleanEmail;
  const phoneNumber = phone ? toE164Phone(phone) : undefined;
  if (phoneNumber) data.phone_number = phoneNumber;
  if (Object.keys(data).length) window.gtag("set", "user_data", data);
}

/** A sent enquiry: the event Google Ads optimises for */
export function trackLead(
  form: "contact" | "property_inquiry" | "roi_lead" | "listing_submission" | "office_enquiry",
  params: Record<string, unknown> = {},
  contact?: LeadContact,
) {
  if (contact) setUserData(contact);
  trackEvent("generate_lead", { form_name: form, currency: "AED", ...params });
}

/** Countries where cookies for ads and analytics need consent first (EEA, UK, Switzerland) */
export const CONSENT_COUNTRIES = [
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU", "IE", "IT", "LV", "LT",
  "LU", "MT", "NL", "PL", "PT", "RO", "SK", "SI", "ES", "SE", "IS", "LI", "NO", "GB", "CH",
];
