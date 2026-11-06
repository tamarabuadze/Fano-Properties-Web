import type { Metadata } from "next";
import { AgentCard } from "@fano/ui";
import { getAgents } from "@/lib/queries/agents";
import { AnimateStagger } from "@/components/shared/animate-stagger";

export async function generateMetadata(): Promise<Metadata> {
  const hasAgents = (await getAgents(1).catch(() => [])).length > 0;
  return {
    title: "The Fano Properties Team",
    description: "Discover the dedicated experts behind your next successful property investment in Dubai.",
    alternates: { canonical: "/agents" },
    // An empty team page stays out of search results
    ...(!hasAgents && { robots: { index: false, follow: true } }),
  };
}

export const dynamic = "force-dynamic";

export default async function AgentsPage() {
  const agents = await getAgents().catch(() => []);

  return (
    <div className="min-h-screen bg-surface pt-20">
      <div className="border-b border-border bg-zinc-50 py-12">
        <div className="container-site">
          <p className="text-xs font-medium uppercase tracking-widest text-zinc-400 mb-3">The Team</p>
          <h1 className="text-4xl lg:text-5xl font-semibold [letter-spacing:-0.025em] text-[#2B2520]">
            The Fano Properties Team
          </h1>
          <p className="text-zinc-500 mt-3 max-w-xl">
            Discover the dedicated experts behind your next successful property investment.
          </p>
        </div>
      </div>

      <div className="container-site section-y-sm">
        {agents.length === 0 ? (
          <div className="py-24 text-center text-zinc-400">
            <p className="text-xl">Our team is being assembled. Check back soon.</p>
          </div>
        ) : (
          <AnimateStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {agents.map((agent) => (
              <AgentCard
                key={agent.id}
                id={agent.id}
                firstName={agent.firstName}
                lastName={agent.lastName}
                slug={agent.slug}
                avatar={agent.avatar}
                title={agent.title}
                specialization={agent.specialization}
                licenseNumber={agent.licenseNumber}
                languages={agent.languages}
                phone={agent.phone}
                email={agent.email}
                totalListings={(agent as never as { _count: { properties: number } })._count?.properties}
              />
            ))}
          </AnimateStagger>
        )}
      </div>
    </div>
  );
}
