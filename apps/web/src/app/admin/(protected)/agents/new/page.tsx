import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AgentForm } from "../_components/agent-form";

export const metadata: Metadata = { title: "New Agent" };

export default function NewAgentPage() {
  return (
    <div className="p-6 lg:p-8 max-w-3xl space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/agents"
          className="h-9 w-9 rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-xl font-semibold text-foreground [letter-spacing:-0.02em]">
            New Agent
          </h1>
          <p className="text-muted-foreground text-sm">Add a new agent to the team</p>
        </div>
      </div>

      <AgentForm />
    </div>
  );
}
