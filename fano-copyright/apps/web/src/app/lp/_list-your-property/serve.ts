import { NextResponse } from "next/server";
import { landingPageGoogleTag } from "@/lib/landing-page-tag";
import { whatsAppGateTag } from "@/lib/whatsapp-gate";
import { withCopyright } from "@/lib/copyright";
import { LIST_YOUR_PROPERTY_PAGES } from "./pages";

/** Serves the "List your property" landing page in one language, with the website's Google tag. */
export function serveListYourProperty(lang: keyof typeof LIST_YOUR_PROPERTY_PAGES) {
  const html = withCopyright(LIST_YOUR_PROPERTY_PAGES[lang])
    .replace("<!--GOOGLE_TAG-->", landingPageGoogleTag())
    .replace("</body>", `${whatsAppGateTag()}</body>`);
  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=300",
      "X-Content-Type-Options": "nosniff",
      "Referrer-Policy": "strict-origin-when-cross-origin",
    },
  });
}
