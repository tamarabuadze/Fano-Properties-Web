import type { Metadata } from "next";
import { AgentCard } from "@fano/ui";
import { getAgents } from "@/lib/queries/agents";
import { AnimateStagger } from "@/components/shared/animate-stagger";

export const metadata: Metadata = {
  title: "Our Agents",
  description: "Meet our team of expert real estate agents ready to help you find your dream property.",
};

export const revalidate = 3600;

export default async function AgentsPage() {
  const agents = await getAgents().catch(() => []);

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="border-b border-border bg-zinc-50 py-12">
        <div className="container-site">
          <p className="text-xs font-medium uppercase tracking-widest text-zinc-400 mb-3">The Team</p>
          <h1 className="text-4xl lg:text-5xl font-semibold [letter-spacing:-0.025em] text-black">
            Meet Our Agents
          </h1>
          <p className="text-zinc-500 mt-3 max-w-xl">
            Work with dedicated professionals who know the market inside out.
          </p>
        </div>
      </div>

      <div className="container-site section-y-sm">
        {agents.length === 0 ? (
          <div className="py-24 text-center text-zinc-400">
            <p className="text-xl">Our team is being assembled. Check back soon.</p>
          </div>
        ) : (
          <AnimateStagger className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-6">
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
