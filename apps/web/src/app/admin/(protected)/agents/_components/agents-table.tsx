"use client";

import Link from "next/link";
import Image from "next/image";
import { Edit, Trash2, ToggleLeft, ToggleRight } from "lucide-react";
import { toast } from "sonner";
import { deleteAgent, toggleAgentActive } from "../_actions";

interface Agent {
  id: string;
  firstName: string;
  lastName: string;
  slug: string;
  email: string;
  title?: string | null;
  avatar?: string | null;
  active: boolean;
  _count: { properties: number };
}

export function AgentsTable({ agents }: { agents: Agent[] }) {
  async function handleDelete(id: string) {
    if (!confirm("Delete this agent?")) return;
    const r = await deleteAgent(id);
    if (r.success) toast.success("Agent deleted");
    else toast.error(r.error);
  }

  async function handleToggle(id: string, active: boolean) {
    const r = await toggleAgentActive(id, !active);
    if (r.success) toast.success(active ? "Agent deactivated" : "Agent activated");
    else toast.error(r.error);
  }

  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-secondary/40">
            <th className="text-left px-4 py-3 font-medium text-muted-foreground">Agent</th>
            <th className="text-left px-4 py-3 font-medium text-muted-foreground">Email</th>
            <th className="text-left px-4 py-3 font-medium text-muted-foreground">Listings</th>
            <th className="text-left px-4 py-3 font-medium text-muted-foreground">Status</th>
            <th className="text-right px-4 py-3 font-medium text-muted-foreground">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {agents.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-4 py-12 text-center text-muted-foreground">
                No agents yet
              </td>
            </tr>
          ) : (
            agents.map((a) => (
              <tr key={a.id} className="hover:bg-secondary/30 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="relative h-8 w-8 rounded-full bg-secondary overflow-hidden shrink-0">
                      {a.avatar ? (
                        <Image src={a.avatar} alt="" fill sizes="32px" className="object-cover" />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center text-xs font-medium text-muted-foreground">
                          {a.firstName[0]}{a.lastName[0]}
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{a.firstName} {a.lastName}</p>
                      {a.title && <p className="text-xs text-muted-foreground">{a.title}</p>}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-muted-foreground text-xs">{a.email}</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-0.5 rounded-full bg-secondary text-muted-foreground text-xs">
                    {a._count.properties}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    a.active ? "bg-green-50 text-green-700" : "bg-zinc-100 text-zinc-500"
                  }`}>
                    {a.active ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => handleToggle(a.id, a.active)}
                      aria-label={a.active ? "Deactivate" : "Activate"}
                      className="h-8 w-8 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-secondary transition-colors"
                    >
                      {a.active ? <ToggleRight className="h-4 w-4 text-green-600" /> : <ToggleLeft className="h-4 w-4" />}
                    </button>
                    <Link href={`/agents/${a.id}`} aria-label="Edit" className="h-8 w-8 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-secondary transition-colors">
                      <Edit className="h-4 w-4" />
                    </Link>
                    <button
                      onClick={() => handleDelete(a.id)}
                      aria-label="Delete"
                      className="h-8 w-8 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-red-50 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
