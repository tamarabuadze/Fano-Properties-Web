import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { prisma } from "@fano/db";
import { AgentForm } from "../_components/agent-form";

export const metadata: Metadata = { title: "Edit Agent" };

export default async function EditAgentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const agent = await prisma.agent.findUnique({ where: { id } });

  if (!agent) notFound();

  return (
    <div className="p-6 lg:p-8 max-w-3xl space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/agents"
          className="h-9 w-9 rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-xl font-semibold text-foreground [letter-spacing:-0.02em]">
            Edit Agent
          </h1>
          <p className="text-muted-foreground text-sm truncate">
            {agent.firstName} {agent.lastName}
          </p>
        </div>
      </div>

      <AgentForm
        agentId={agent.id}
        defaultValues={{
          firstName: agent.firstName,
          lastName: agent.lastName,
          email: agent.email,
          phone: agent.phone ?? undefined,
          title: agent.title ?? undefined,
          bio: agent.bio ?? undefined,
          avatar: agent.avatar ?? "",
          specialization: agent.specialization ?? undefined,
          licenseNumber: agent.licenseNumber ?? undefined,
          yearsExperience: agent.yearsExperience ?? undefined,
          linkedinUrl: agent.linkedinUrl ?? "",
          instagramUrl: agent.instagramUrl ?? "",
          twitterUrl: agent.twitterUrl ?? "",
          active: agent.active,
        }}
      />
    </div>
  );
}
