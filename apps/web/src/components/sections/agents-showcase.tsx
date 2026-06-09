import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AgentCard } from "@fano/ui";
import { SectionHeader } from "@/components/shared/section-header";
import { AnimateStagger } from "@/components/shared/animate-stagger";

interface Agent {
  id: string;
  firstName: string;
  lastName: string;
  slug: string;
  avatar?: string | null;
  title?: string | null;
  specialization?: string | null;
  phone?: string | null;
  email: string;
  _count?: { properties: number };
}

interface AgentsShowcaseProps {
  agents: Agent[];
}

export function AgentsShowcaseSection({ agents }: AgentsShowcaseProps) {
  return (
    <section className="section-y bg-gold-50">
      <div className="container-site">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <SectionHeader
            eyebrow="Meet the team"
            title="Our Expert Agents"
            description="Work with top-performing agents who have deep local expertise."
          />
          <Link
            href="/agents"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#9a7957] hover:text-[#7e6244] hover:gap-3 transition-all group shrink-0"
          >
            Meet all agents
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {agents.length === 0 ? (
          <div className="py-24 text-center text-zinc-400">
            <p className="text-lg">Agents coming soon.</p>
          </div>
        ) : (
          <AnimateStagger className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
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
