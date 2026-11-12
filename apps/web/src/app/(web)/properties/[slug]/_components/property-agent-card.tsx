import Image from "next/image";
import Link from "next/link";
import { Phone, Mail } from "lucide-react";

interface Agent {
  firstName: string;
  lastName: string | null;
  slug: string;
  avatar?: string | null;
  title?: string | null;
  phone?: string | null;
  email: string | null;
}

// The listing agent on a linen panel: portrait, serif name, hairline contact rows
export function PropertyAgentCard({ agent }: { agent: Agent }) {
  return (
    <div className="rounded-[4px] bg-[#FBF8F4] p-6">
      <p className="eyebrow mb-5">Listing agent</p>

      <div className="mb-5 flex items-center gap-4">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-[4px] bg-[#E6DFD5]">
          {agent.avatar ? (
            <Image
              src={agent.avatar}
              alt={`${agent.firstName} ${agent.lastName ?? ""}`.trim()}
              fill
              sizes="64px"
              className="object-cover object-top"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <span className="font-display text-xl text-[#8C6A47]/60">
                {agent.firstName[0]}{agent.lastName?.[0]}
              </span>
            </div>
          )}
        </div>
        <div>
          <p className="font-display text-[22px] font-normal leading-tight text-[#2B2520]">
            {agent.firstName} {agent.lastName}
          </p>
          {agent.title && (
            <p className="mt-1 text-[13px] text-[#2B2520]/60">{agent.title}</p>
          )}
        </div>
      </div>

      <div className="divide-y divide-[#C5BAAB]/40 border-y border-[#C5BAAB]/40">
        {agent.phone && (
          <a
            href={`tel:${agent.phone}`}
            className="flex h-11 items-center gap-3 text-[13px] text-[#2B2520]/80 transition-colors hover:text-[#2B2520]"
          >
            <Phone className="h-4 w-4 text-[#8C6A47]" aria-hidden="true" />
            {agent.phone}
          </a>
        )}
        {agent.email && (
          <a
            href={`mailto:${agent.email}`}
            className="flex h-11 items-center gap-3 text-[13px] text-[#2B2520]/80 transition-colors hover:text-[#2B2520]"
          >
            <Mail className="h-4 w-4 text-[#8C6A47]" aria-hidden="true" />
            <span className="truncate">{agent.email}</span>
          </a>
        )}
      </div>

      <Link href={`/agents/${agent.slug}`} className="link-rule mt-5">
        View profile
      </Link>
    </div>
  );
}
