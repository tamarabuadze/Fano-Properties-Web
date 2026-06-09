"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@fano/utils";

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

  if (variant === "horizontal") {
    return (
      <Link
        href={`/blog/${slug}`}
        className={cn(
          "group flex gap-5 items-start",
          "transition-opacity duration-300 hover:opacity-80",
          className
        )}
      >
        <div className="relative h-20 w-24 rounded-xl overflow-hidden bg-zinc-100 shrink-0">
          {coverImage && (
            <Image
              src={coverImage}
              alt={title}
              fill
              sizes="96px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}
        </div>
        <div className="flex-1 min-w-0">
          {category && (
            <p className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-1">
              {category.name}
            </p>
          )}
          <h3 className="font-semibold text-black text-sm line-clamp-2 leading-snug">
            {title}
          </h3>
          {date && (
            <p className="text-xs text-text-muted mt-1.5">{date}</p>
          )}
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/blog/${slug}`}
      className={cn(
        "group block overflow-hidden rounded-2xl bg-white border border-border",
        "transition-all duration-500 hover:shadow-xl hover:-translate-y-1",
        className
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-zinc-100">
        {coverImage ? (
          <Image
            src={coverImage}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-zinc-50">
            <span className="text-4xl">📰</span>
          </div>
        )}
        {category && (
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-medium text-black">
              {category.name}
            </span>
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-center gap-2 text-xs text-text-secondary mb-3">
          {date && <span>{date}</span>}
          {date && readTime && <span>·</span>}
          {readTime && <span>{readTime} min read</span>}
        </div>

        <h3 className="font-semibold mb-2 line-clamp-2 leading-snug transition-colors" style={{ color: "#3d3020" }}>
          {title}
        </h3>

        <p className="text-sm line-clamp-2 leading-relaxed" style={{ color: "#7e6244" }}>
          {excerpt}
        </p>

        <div className="mt-4 flex items-center gap-1.5 text-sm font-medium" style={{ color: "#9a7957" }}>
          <span>Read more</span>
          <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
        </div>
      </div>
    </Link>
  );
}

export { BlogCard };
