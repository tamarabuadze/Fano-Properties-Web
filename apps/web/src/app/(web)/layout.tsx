import { headers } from "next/headers";
import { LuxNavbar } from "@/components/luxury/lux-navbar";
import { LuxFooter } from "@/components/luxury/lux-footer";
import { GoogleTag } from "@/components/analytics/google-tag";
import { getAgents } from "@/lib/queries/agents";
import { CONSENT_COUNTRIES } from "@/lib/analytics";
import { googleTagIds } from "@/lib/google-tag-html";
import { defaultTheme, themeScript } from "@/lib/site-theme";
import { WhatsAppFloat } from "@/components/shared/whatsapp-float";
import { WaFloatWatch } from "@/components/shared/wa-float-watch";
import { whatsAppGateJs } from "@/lib/whatsapp-gate";


export default async function WebLayout({ children }: { children: React.ReactNode }) {
  // The Agents page stays out of the menus until agents are added
  const showAgents = (await getAgents(1).catch(() => [])).length > 0;
  // Cloudflare tells us the visitor's country; unknown counts as needing consent
  const country = (await headers()).get("cf-ipcountry")?.toUpperCase();
  const askConsent = !country || country === "XX" || CONSENT_COUNTRIES.includes(country);

  return (
    <div className="lx-root">
      {/* Sand (team app look) or navy: the visitor's saved choice, else SITE_THEME */}
      <script dangerouslySetInnerHTML={{ __html: themeScript(defaultTheme()) }} />
      <LuxNavbar showAgents={showAgents} />
      <main className="fano-web">{children}</main>
      <LuxFooter showAgents={showAgents} />
      <WhatsAppFloat />
      <WaFloatWatch />
      {/* Asks for name and mobile before any WhatsApp link opens, so taps become leads */}
      <script dangerouslySetInnerHTML={{ __html: whatsAppGateJs() }} />
      {/* Tag IDs are read when the page is served, so they can be set on Railway without a rebuild */}
      <GoogleTag {...googleTagIds()} askConsent={askConsent} />
    </div>
  );
}
