import type { Metadata } from "next";
import { Suspense } from "react";
import { AgentCard } from "@fano/ui";
import { getAgents } from "@/lib/queries/agents";
import { AnimateStagger } from "@/components/shared/animate-stagger";

export async function generateMetadata(): Promise<Metadata> {
  const hasAgents = (await getAgents(1).catch(() => [])).length > 0;
  return {
    title: "Your Real Estate Insiders",
    description: "Discover the dedicated experts behind your next successful property investment in Dubai.",
    alternates: { canonical: "/agents" },
    // An empty team page stays out of search results
    ...(!hasAgents && { robots: { index: false, follow: true } }),
  };
}

export const dynamic = "force-dynamic";

// The grid streams in behind its own skeleton. A segment-level loading.tsx would
// also wrap /agents/[slug], which turns that page's 404s into 200s.
export default function AgentsPage() {
  return (
    <div className="min-h-screen pt-20">
      <div className="page-band py-14 lg:py-20">
        <div className="container-site">
          <p className="lx-eyebrow mb-5">The team</p>
          <h1 className="font-display text-[clamp(36px,4.6vw,56px)] font-normal leading-[1.02] tracking-[-0.01em] text-lx-text text-balance">
            Your real estate insiders
          </h1>
          <p className="mt-5 max-w-xl text-[15px] leading-[1.85] text-lx-text/70">
            Discover the dedicated experts behind your next successful property investment.
          </p>
        </div>
      </div>

      <div className="container-site section-y">
        <Suspense fallback={<AgentsSkeleton />}>
          <AgentsGrid />
        </Suspense>
      </div>
    </div>
  );
}

async function AgentsGrid() {
  const agents = await getAgents().catch(() => []);

  if (agents.length === 0) {
    return (
      <div className="py-24 text-center">
        <p className="font-display text-2xl font-normal text-lx-text/60">Our team is being assembled. Check back soon.</p>
      </div>
    );
  }

  return (
    <AnimateStagger className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
  );
}

function AgentsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="aspect-[4/5] rounded-[4px] bg-lx-raised" />
          <div className="mt-5 h-5 w-2/3 rounded-[2px] bg-lx-raised" />
          <div className="mt-3 h-3 w-1/2 rounded-[2px] bg-lx-raised/70" />
        </div>
      ))}
    </div>
  );
}
