import { headers } from "next/headers";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { RoiButton } from "@/components/layout/roi-button";
import { SocialButton } from "@/components/layout/social-button";
import { GoogleTag } from "@/components/analytics/google-tag";
import { getAgents } from "@/lib/queries/agents";
import { CONSENT_COUNTRIES } from "@/lib/analytics";

// Tag IDs are read when the page is served, so they can be set on Railway without a rebuild
const tagId = (value: string | undefined, prefix: string) =>
  value && new RegExp(`^${prefix}-[A-Z0-9-]+$`).test(value.trim()) ? value.trim() : undefined;

export default async function WebLayout({ children }: { children: React.ReactNode }) {
  // The Agents page stays out of the menus until agents are added
  const showAgents = (await getAgents(1).catch(() => [])).length > 0;
  // Cloudflare tells us the visitor's country; unknown counts as needing consent
  const country = (await headers()).get("cf-ipcountry")?.toUpperCase();
  const askConsent = !country || country === "XX" || CONSENT_COUNTRIES.includes(country);

  return (
    <>
      <Navbar showAgents={showAgents} />
      <main className="fano-web">{children}</main>
      <Footer showAgents={showAgents} />
      <SocialButton />
      <RoiButton />
      <WhatsAppButton />
      <GoogleTag
        gaId={tagId(process.env.GA_MEASUREMENT_ID, "G")}
        adsId={tagId(process.env.GOOGLE_ADS_ID, "AW")}
        askConsent={askConsent}
      />
    </>
  );
}
