"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { cn } from "@fano/utils";

interface Category {
  id: string;
  name: string;
  slug: string;
  _count: { articles: number };
}

export function BlogCategories({
  categories,
  activeSlug,
}: {
  categories: Category[];
  activeSlug?: string;
}) {
  return (
    <div className="flex flex-wrap gap-2 pb-6 border-b border-border mb-0">
      <Link
        href="/blog"
        className={cn(
          "inline-flex items-center h-9 px-4 rounded-full text-sm font-medium transition-all",
          !activeSlug
            ? "bg-[#1a1410] text-white"
            : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
        )}
      >
        All
      </Link>
      {categories.map((cat) => (
        <Link
          key={cat.id}
          href={`/blog?category=${cat.slug}`}
          className={cn(
            "inline-flex items-center h-9 px-4 rounded-full text-sm font-medium transition-all gap-1.5",
            activeSlug === cat.slug
              ? "bg-[#1a1410] text-white"
              : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
          )}
        >
          {cat.name}
          <span className={cn(
            "text-xs",
            activeSlug === cat.slug ? "text-white/60" : "text-zinc-400"
          )}>
            {cat._count.articles}
          </span>
        </Link>
      ))}
    </div>
  );
}
