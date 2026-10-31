import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";
import { prisma } from "@fano/db";
import { AgentsTable } from "./_components/agents-table";

export const metadata: Metadata = { title: "Agents" };

export default async function AgentsAdminPage() {
  const agents = await prisma.agent.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      _count: { select: { properties: { where: { published: true } } } },
    },
  });

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground [letter-spacing:-0.02em]">Agents</h1>
          <p className="text-muted-foreground text-sm mt-1">{agents.length} total agents</p>
        </div>
        <Link
          href="/admin/agents/new"
          className="inline-flex items-center gap-2 h-10 px-4 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
        >
          <Plus className="h-4 w-4" />
          Add Agent
        </Link>
      </div>

      <AgentsTable agents={agents as never} />
    </div>
  );
}
