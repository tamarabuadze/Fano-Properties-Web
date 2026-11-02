import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { RoiButton } from "@/components/layout/roi-button";
import { getAgents } from "@/lib/queries/agents";

export default async function WebLayout({ children }: { children: React.ReactNode }) {
  // The Agents page stays out of the menus until agents are added
  const showAgents = (await getAgents(1).catch(() => [])).length > 0;
  return (
    <>
      <Navbar showAgents={showAgents} />
      <main>{children}</main>
      <Footer showAgents={showAgents} />
      <RoiButton />
      <WhatsAppButton />
    </>
  );
}
