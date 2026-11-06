"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import Link from "next/link";
import { CONSENT_COUNTRIES, trackEvent } from "@/lib/analytics";
import { captureAttribution } from "@/lib/attribution";

const CONSENT_KEY = "fano-cookie-consent";
const GRANTED = { ad_storage: "granted", ad_user_data: "granted", ad_personalization: "granted", analytics_storage: "granted" };
const DENIED = { ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied", analytics_storage: "denied" };

interface GoogleTagProps {
  /** Google Analytics 4 measurement ID, G-XXXXXXX */
  gaId?: string;
  /** Google Ads tag ID, AW-XXXXXXXXX */
  adsId?: string;
  /** The visitor is in a country where cookies need consent first */
  askConsent: boolean;
}

// Loads the Google tag with Consent Mode v2: denied by default in the EEA, UK and
// Switzerland until the visitor accepts, granted elsewhere. Also reports taps on
// phone and WhatsApp links, which count as conversions.
export function GoogleTag({ gaId, adsId, askConsent }: GoogleTagProps) {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    if (!askConsent) return;
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(CONSENT_KEY);
    } catch {}
    if (saved === "granted") window.gtag?.("consent", "update", GRANTED);
    else if (saved !== "denied") setShowBanner(true);
  }, [askConsent]);

  useEffect(() => {
    captureAttribution();
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.("a[href]");
      if (!link) return;
      const href = link.getAttribute("href") ?? "";
      if (href.startsWith("tel:")) trackEvent("click_to_call", { link_url: href, page_path: location.pathname });
      else if (href.includes("wa.me/")) trackEvent("whatsapp_click", { page_path: location.pathname });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  if (!gaId && !adsId) return null;

  function choose(granted: boolean) {
    try {
      localStorage.setItem(CONSENT_KEY, granted ? "granted" : "denied");
    } catch {}
    window.gtag?.("consent", "update", granted ? GRANTED : DENIED);
    setShowBanner(false);
  }

  const ids = [gaId, adsId].filter(Boolean) as string[];

  return (
    <>
      <Script id="google-consent" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;
gtag('consent','default',${JSON.stringify({ ...DENIED, region: CONSENT_COUNTRIES, wait_for_update: 500 })});
gtag('consent','default',${JSON.stringify(GRANTED)});
gtag('js',new Date());
${ids.map((id) => `gtag('config',${JSON.stringify(id)});`).join("\n")}`}
      </Script>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${ids[0]}`} strategy="afterInteractive" />

      {showBanner && (
        <div
          role="dialog"
          aria-label="Cookie consent"
          className="fixed inset-x-4 bottom-4 sm:left-6 sm:right-auto sm:max-w-md z-[60] rounded-2xl bg-[#2B2520] text-white/80 shadow-2xl ring-1 ring-[#E2A862]/30 p-5 text-sm"
        >
          <p className="leading-relaxed">
            We use cookies to measure our ads and improve this site. See our{" "}
            <Link href="/privacy-policy" className="text-[#E2A862] underline underline-offset-4">
              privacy policy
            </Link>
            .
          </p>
          <div className="mt-4 flex gap-3">
            <button
              type="button"
              onClick={() => choose(true)}
              className="h-10 px-5 rounded-full bg-[#E2A862] text-[#2B2520] font-medium"
            >
              Accept
            </button>
            <button
              type="button"
              onClick={() => choose(false)}
              className="h-10 px-5 rounded-full border border-white/20 text-white/80"
            >
              Decline
            </button>
          </div>
        </div>
      )}
    </>
  );
}
