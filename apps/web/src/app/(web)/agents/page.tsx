import type { Metadata } from "next";
import { buildPageMeta } from "@/lib/seo";
import { Suspense } from "react";
import { AgentCard } from "@fano/ui";
import { getAgents } from "@/lib/queries/agents";
import { AnimateStagger } from "@/components/shared/animate-stagger";
import { PageBanner } from "@/components/luxury/page-banner";

export async function generateMetadata(): Promise<Metadata> {
  const hasAgents = (await getAgents(1).catch(() => [])).length > 0;
  const title = "Our Real Estate Agents | Dubai Property Specialists";
  const description = "Meet the Fano Properties team: real estate agents in Dubai for commercial offices, apartments and villas to buy, sell and lease.";
  return {
    title,
    description,
    alternates: { canonical: "/agents" },
    ...buildPageMeta({ path: "/agents", title, description }),
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
      <PageBanner
        image="/media/f8f423b8-936d-4970-9165-558815f2a243.jpg"
        eyebrow="The team"
        title="Your real estate"
        accent="insiders."
        subtitle="Discover the dedicated experts behind your next successful property investment."
      />

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

  const salesAgents = agents.filter((a) => (a as never as { role: string }).role !== "administrative_staff");
  const adminStaff = agents.filter((a) => (a as never as { role: string }).role === "administrative_staff");

  return (
    <div className="space-y-20">
      {salesAgents.length > 0 && (
        <div>
          <h2 className="mb-10 font-display text-[clamp(24px,2.4vw,32px)] font-normal text-lx-text">Agents</h2>
          <AnimateStagger className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {salesAgents.map((agent) => (
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
        </div>
      )}

      {adminStaff.length > 0 && (
        <div>
          <h2 className="mb-10 font-display text-[clamp(24px,2.4vw,32px)] font-normal text-lx-text">Administrative Staff</h2>
          <AnimateStagger className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {adminStaff.map((agent) => (
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
        </div>
      )}
    </div>
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
