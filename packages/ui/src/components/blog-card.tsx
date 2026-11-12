"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn, isOptimizedImageHost } from "@fano/utils";

export interface BlogCardProps {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage?: string | null;
  publishedAt?: Date | string | null;
  readTime?: number | null;
  category?: { name: string; slug: string } | null;
  className?: string;
  variant?: "default" | "horizontal";
}

const BLUR_PLACEHOLDER =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/wAAECAADAAQDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABQQG/8QAHBAAAgMAAwEAAAAAAAAAAAAAAQIDBAASITH/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AJXi1KrXLpKhbIxWkQMVIOhGR3Qf/9k=";

// An editorial card: the photograph, a tracked label, a serif title and a short excerpt.
// No box or shadow; a hairline closes the card.
function BlogCard({
  title,
  slug,
  excerpt,
  coverImage,
  publishedAt,
  readTime,
  category,
  className,
  variant = "default",
}: BlogCardProps) {
  const date = publishedAt
    ? new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }).format(new Date(publishedAt))
    : null;

  const meta = [category?.name, date].filter(Boolean).join(" · ");

  if (variant === "horizontal") {
    return (
      <Link
        href={`/blog/${slug}`}
        className={cn("group flex items-start gap-5", className)}
      >
        <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-[4px] bg-lx-raised">
          {coverImage && (
            <Image
              src={coverImage}
              unoptimized={!isOptimizedImageHost(coverImage)}
              alt={title}
              fill
              sizes="96px"
              className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
              placeholder="blur"
              blurDataURL={BLUR_PLACEHOLDER}
            />
          )}
        </div>
        <div className="min-w-0 flex-1">
          {meta && (
            <p className="mb-1.5 font-label text-[10px] font-semibold uppercase tracking-[0.18em] text-lx-gold">
              {meta}
            </p>
          )}
          <h3 className="line-clamp-2 font-display text-[19px] font-normal leading-snug text-lx-text transition-colors group-hover:text-lx-gold">
            {title}
          </h3>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/blog/${slug}`} className={cn("group flex h-full flex-col", className)}>
      <div className="relative aspect-[16/10] shrink-0 overflow-hidden rounded-[4px] bg-lx-raised">
        {coverImage ? (
          <Image
            src={coverImage}
            unoptimized={!isOptimizedImageHost(coverImage)}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
            placeholder="blur"
            blurDataURL={BLUR_PLACEHOLDER}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="font-display text-4xl font-normal italic text-lx-gold/50">Fano</span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col pt-5">
        {meta && (
          <p className="mb-3 font-label text-[10px] font-semibold uppercase tracking-[0.18em] text-lx-gold">
            {meta}
          </p>
        )}

        <h3 className="line-clamp-2 font-display text-[24px] font-normal leading-tight text-lx-text transition-colors group-hover:text-lx-gold">
          {title}
        </h3>

        <p className="mt-3 line-clamp-3 flex-1 text-[14px] leading-[1.8] text-lx-text/65">{excerpt}</p>

        <div className="mt-5 flex items-center justify-between gap-4 border-t border-lx-line pt-3">
          <span className="inline-flex items-center gap-3 text-[12px] font-medium text-lx-text after:h-px after:w-6 after:bg-lx-gold after:transition-all after:duration-300 group-hover:after:w-10">
            Read article
          </span>
          {readTime && <span className="text-[12px] text-lx-text/55">{readTime} min read</span>}
        </div>
      </div>
    </Link>
  );
}

export { BlogCard };
