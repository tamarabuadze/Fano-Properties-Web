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
      <div className="page-band py-12">
        <div className="container-site">
          <p className="text-xs font-medium uppercase tracking-widest text-zinc-400 mb-3">The Team</p>
          <h1 className="text-4xl lg:text-5xl font-semibold [letter-spacing:-0.025em] text-[#2B2520]">
            Your Real Estate Insiders
          </h1>
          <p className="text-zinc-500 mt-3 max-w-xl">
            Discover the dedicated experts behind your next successful property investment.
          </p>
        </div>
      </div>

      <div className="container-site section-y-sm">
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
      <div className="py-24 text-center text-zinc-400">
        <p className="text-xl">Our team is being assembled. Check back soon.</p>
      </div>
    );
  }

  return (
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
  );
}

function AgentsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="rounded-2xl border border-border p-6 space-y-4">
          <div className="h-20 w-20 rounded-full bg-[#E6DFD5] animate-pulse mx-auto" />
          <div className="space-y-2">
            <div className="h-5 w-32 rounded bg-[#E6DFD5] animate-pulse mx-auto" />
            <div className="h-4 w-24 rounded bg-[#E6DFD5] animate-pulse mx-auto" />
          </div>
        </div>
      ))}
    </div>
  );
}
