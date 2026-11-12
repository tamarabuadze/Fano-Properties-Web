"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@fano/utils";

export interface AgentCardProps {
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
  totalListings?: number;
  className?: string;
}

const BLUR_PLACEHOLDER =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/wAAECAADAAQDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABQQG/8QAHBAAAgMAAwEAAAAAAAAAAAAAAQIDBAASITH/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AJXi1KrXLpKhbIxWkQMVIOhGR3Qf/9k=";

// A gallery-style team card: the portrait, then a serif name, the role and a quiet
// line of facts under a hairline. No box, no shadow; the photograph carries the card.
function AgentCard({
  firstName,
  lastName,
  slug,
  avatar,
  title,
  specialization,
  licenseNumber,
  languages = [],
  phone,
  email,
  totalListings,
  className,
}: AgentCardProps) {
  const facts = [
    licenseNumber ? `BRN ${licenseNumber}` : null,
    totalListings ? `${totalListings} listing${totalListings === 1 ? "" : "s"}` : null,
  ].filter(Boolean);

  return (
    <Link href={`/agents/${slug}`} className={cn("group flex h-full flex-col", className)}>
      <div className="relative aspect-[4/5] overflow-hidden rounded-[4px] bg-[#E6DFD5]">
        {avatar ? (
          <Image
            src={avatar}
            alt={`${firstName} ${lastName ?? ""}`.trim()}
            fill
            quality={90}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
            className="object-cover object-top transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
            placeholder="blur"
            blurDataURL={BLUR_PLACEHOLDER}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="font-display text-5xl font-normal text-[#8C6A47]/60">
              {firstName[0]}
              {lastName?.[0]}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col pt-5">
        <h3 className="font-display text-[24px] font-normal leading-tight text-[#2B2520] transition-colors group-hover:text-[#8C6A47]">
          {firstName} {lastName}
        </h3>
        {title && <p className="mt-1 text-[13px] text-[#2B2520]/65">{title}</p>}
        {specialization && <p className="mt-1 text-[12px] text-[#A39886]">{specialization}</p>}

        {languages.length > 0 && (
          <p className="mt-3 font-label text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8C6A47]">
            {languages.join(" · ")}
          </p>
        )}

        <div className="mt-auto flex items-center justify-between gap-4 border-t border-[#C5BAAB]/40 pt-3">
          <p className="text-[12px] text-[#2B2520]/55">{facts.join(" · ")}</p>
          <span className="inline-flex items-center gap-3 text-[12px] font-medium text-[#2B2520] after:h-px after:w-6 after:bg-[#2B2520] after:transition-all after:duration-300 group-hover:after:w-10">
            View profile
          </span>
        </div>
        {(phone || email) && <span className="sr-only">{[phone, email].filter(Boolean).join(", ")}</span>}
      </div>
    </Link>
  );
}

export { AgentCard };
