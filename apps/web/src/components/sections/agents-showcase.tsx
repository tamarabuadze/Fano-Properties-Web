import React from "react";
import Link from "next/link";
import { AgentCard } from "@fano/ui";
import { SectionHeader } from "@/components/shared/section-header";
import { AnimateStagger } from "@/components/shared/animate-stagger";

interface Agent {
  id: string;
  firstName: string;
  lastName: string | null;
  slug: string;
  avatar?: string | null;
  title?: string | null;
  specialization?: string | null;
  licenseNumber?: string | null;
  languages?: string[];
  phone?: string | null;
  email: string | null;
  _count?: { properties: number };
}

interface AgentsShowcaseProps {
  agents: Agent[];
}

export function AgentsShowcaseSection({ agents }: AgentsShowcaseProps) {
  return (
    <section className="section-y">
      <div className="container-site">
        <div className="mb-14 flex flex-col gap-6 border-b border-[#C5BAAB]/40 pb-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            eyebrow="Meet the team"
            title="Your real estate insiders"
            description="Discover the dedicated experts behind your next successful property investment."
          />
          <Link href="/agents" className="link-rule shrink-0">
            Meet the team
          </Link>
        </div>

        {agents.length === 0 ? (
          <div className="py-24 text-center">
            <p className="font-display text-2xl font-normal text-[#2B2520]/60">Agents coming soon.</p>
          </div>
        ) : (
          <AnimateStagger className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {agents.map((agent) => (
              <AgentCard
                key={agent.id}
                {...agent}
                totalListings={agent._count?.properties}
              />
            ))}
          </AnimateStagger>
        )}
      </div>
    </section>
  );
}
