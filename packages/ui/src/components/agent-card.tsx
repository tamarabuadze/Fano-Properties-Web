"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Phone, Mail } from "lucide-react";
import { cn } from "@fano/utils";

export interface AgentCardProps {
  id: string;
  firstName: string;
  lastName: string;
  slug: string;
  avatar?: string | null;
  title?: string | null;
  specialization?: string | null;
  licenseNumber?: string | null;
  languages?: string[];
  phone?: string | null;
  email: string;
  totalListings?: number;
  className?: string;
}

const BLUR_PLACEHOLDER =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/wAAECAADAAQDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABQQG/8QAHBAAAgMAAwEAAAAAAAAAAAAAAQIDBAASITH/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AJXi1KrXLpKhbIxWkQMVIOhGR3Qf/9k=";

// Team card in the Fano "Calcite Sand" look: a large portrait with the name over a soft
// espresso fade, then BRN, focus area and languages on warm bone, and an amber call to action
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
  return (
    <Link
      href={`/agents/${slug}`}
      className={cn(
        "group flex flex-col h-full overflow-hidden rounded-3xl border border-[#C5BAAB]/50",
        "bg-gradient-to-b from-[#FAF7F3] to-[#F4EFEA] shadow-[0_1px_0_rgba(255,255,255,.7)_inset,0_10px_30px_-12px_rgba(43,37,32,.18)]",
        "transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_48px_-18px_rgba(43,37,32,.35)]",
        className
      )}
    >
      {/* Portrait */}
      <div className="relative aspect-[4/5] overflow-hidden bg-[#E6DFD5]">
        {avatar ? (
          <Image
            src={avatar}
            alt={`${firstName} ${lastName}`}
            fill
            quality={90}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
            className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
            placeholder="blur"
            blurDataURL={BLUR_PLACEHOLDER}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="font-display text-5xl font-semibold text-[#8C6A47]/60">
              {firstName[0]}
              {lastName[0]}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#2B2520]/85 via-[#2B2520]/10 to-transparent" />

        {licenseNumber && (
          <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-[#F4EFEA]/90 backdrop-blur px-3 py-1 text-[11px] font-semibold tracking-wide text-[#2B2520]">
            <BadgeCheck className="h-3.5 w-3.5 text-[#8C6A47]" />
            RERA BRN {licenseNumber}
          </span>
        )}

        <div className="absolute inset-x-0 bottom-0 p-5">
          <h3 className="font-display text-xl font-semibold leading-tight text-[#F4EFEA] [letter-spacing:-0.01em]">
            {firstName} {lastName}
          </h3>
          {title && <p className="mt-1 text-sm font-medium text-[#ECBE80]">{title}</p>}
        </div>
      </div>

      {/* Details */}
      <div className="flex flex-1 flex-col p-5">
        {specialization && <p className="text-sm text-[#4A413A]">{specialization}</p>}

        {languages.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {languages.map((lang) => (
              <span
                key={lang}
                className="rounded-full border border-[#D9CFC2] bg-[#EFE8DF] px-2.5 py-0.5 text-[11px] font-medium text-[#62574D]"
              >
                {lang}
              </span>
            ))}
          </div>
        )}

        {!!totalListings && (
          <p className="mt-3 text-xs font-medium text-[#8C6A47]">
            {totalListings} active listing{totalListings === 1 ? "" : "s"}
          </p>
        )}

        <div className="mt-auto pt-5 flex gap-2">
          {phone && (
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#D9CFC2] text-[#8C6A47]" aria-label="Call">
              <Phone className="h-4 w-4" />
            </span>
          )}
          {email && (
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#D9CFC2] text-[#8C6A47]" aria-label="Email">
              <Mail className="h-4 w-4" />
            </span>
          )}
          <span className="flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-br from-[#ECBE80] via-[#E2A862] to-[#B9824A] text-sm font-semibold text-[#2B2520] transition group-hover:brightness-105">
            View profile
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}

export { AgentCard };
