import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, ExternalLink } from "lucide-react";

interface Agent {
  firstName: string;
  lastName: string;
  slug: string;
  avatar?: string | null;
  title?: string | null;
  phone?: string | null;
  email: string;
}

export function PropertyAgentCard({ agent }: { agent: Agent }) {
  return (
    <div className="rounded-2xl border border-border p-6 bg-zinc-50">
      <p className="text-xs font-medium uppercase tracking-wider text-zinc-400 mb-4">
        Listing Agent
      </p>

      <div className="flex items-center gap-4 mb-5">
        <div className="relative h-14 w-14 rounded-full overflow-hidden bg-zinc-200 shrink-0">
          {agent.avatar ? (
            <Image
              src={agent.avatar}
              alt={`${agent.firstName} ${agent.lastName}`}
              fill
              sizes="56px"
              className="object-cover"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center">
              <span className="text-xl font-semibold text-zinc-400">
                {agent.firstName[0]}{agent.lastName[0]}
              </span>
            </div>
          )}
        </div>
        <div>
          <p className="font-semibold text-[#1a1410]">
            {agent.firstName} {agent.lastName}
          </p>
          {agent.title && (
            <p className="text-sm text-zinc-500">{agent.title}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        {agent.phone && (
          <a
            href={`tel:${agent.phone}`}
            className="flex items-center gap-3 w-full h-10 px-4 rounded-xl border border-border bg-white text-sm text-zinc-700 hover:bg-zinc-100 transition-colors"
          >
            <Phone className="h-4 w-4 text-zinc-400" />
            {agent.phone}
          </a>
        )}
        <a
          href={`mailto:${agent.email}`}
          className="flex items-center gap-3 w-full h-10 px-4 rounded-xl border border-border bg-white text-sm text-zinc-700 hover:bg-zinc-100 transition-colors"
        >
          <Mail className="h-4 w-4 text-zinc-400" />
          {agent.email}
        </a>
        <Link
          href={`/agents/${agent.slug}`}
          className="flex items-center justify-center gap-2 w-full h-10 px-4 rounded-xl bg-[#1a1410] text-white text-sm font-medium hover:bg-[#2a2118] transition-colors"
        >
          <ExternalLink className="h-4 w-4" />
          View Profile
        </Link>
      </div>
    </div>
  );
}
