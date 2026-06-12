"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone, Mail } from "lucide-react";
import { cn } from "@fano/utils";

export interface AgentCardProps {
  id: string;
  firstName: string;
  lastName: string;
  slug: string;
  avatar?: string | null;
  title?: string | null;
  specialization?: string | null;
  phone?: string | null;
  email: string;
  totalListings?: number;
  className?: string;
}

const BLUR_PLACEHOLDER =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/wAAECAADAAQDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABQQG/8QAHBAAAgMAAwEAAAAAAAAAAAAAAQIDBAASITH/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AJXi1KrXLpKhbIxWkQMVIOhGR3Qf/9k=";

function AgentCard({
  firstName,
  lastName,
  slug,
  avatar,
  title,
  specialization,
  phone,
  email,
  totalListings,
  className,
}: AgentCardProps) {
  return (
    <Link
      href={`/agents/${slug}`}
      className={cn(
        "group flex flex-col items-center text-center p-6 rounded-2xl bg-white border border-border h-full",
        "transition-all duration-500 hover:shadow-xl hover:-translate-y-1",
        className
      )}
    >
      <div className="relative h-20 w-20 rounded-full overflow-hidden bg-zinc-100 mb-4 ring-2 ring-transparent group-hover:ring-[#c3ae8f]/40 transition-all duration-300">
        {avatar ? (
          <Image
            src={avatar}
            alt={`${firstName} ${lastName}`}
            fill
            sizes="80px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            placeholder="blur"
            blurDataURL={BLUR_PLACEHOLDER}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-zinc-100">
            <span className="text-2xl font-semibold text-zinc-400">
              {firstName[0]}{lastName[0]}
            </span>
          </div>
        )}
      </div>

      <div className="flex-1 flex flex-col items-center">
        <h3 className="font-semibold text-lg" style={{ color: "#3d3020" }}>
          {firstName} {lastName}
        </h3>
        {title && (
          <p className="text-sm mt-0.5" style={{ color: "#9a7957" }}>{title}</p>
        )}
        {specialization && (
          <p className="text-xs mt-1" style={{ color: "#b09070" }}>{specialization}</p>
        )}

        {totalListings !== undefined && (
          <div className="mt-3 px-3 py-1 rounded-full border" style={{ backgroundColor: "#faf7f2", borderColor: "#e6d8c4" }}>
            <span className="text-xs font-medium" style={{ color: "#9a7957" }}>
              {totalListings} listings
            </span>
          </div>
        )}
      </div>

      <div className="mt-4 flex gap-2 w-full">
        {phone && (
          <div className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl border transition-colors" style={{ borderColor: "#e6d8c4", color: "#9a7957" }}>
            <Phone className="h-3.5 w-3.5" />
            <span>Call</span>
          </div>
        )}
        <div className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl border transition-colors" style={{ borderColor: "#e6d8c4", color: "#9a7957" }}>
          <Mail className="h-3.5 w-3.5" />
          <span>Email</span>
        </div>
      </div>
    </Link>
  );
}

export { AgentCard };
