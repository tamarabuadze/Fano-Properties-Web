"use client";

import Link from "next/link";
import { cn } from "@fano/utils";

interface Category {
  id: string;
  name: string;
  slug: string;
  _count: { articles: number };
}

// Plain text filters on a hairline: the active one carries a short champagne rule
export function BlogCategories({
  categories,
  activeSlug,
}: {
  categories: Category[];
  activeSlug?: string;
}) {
  const item = (active: boolean) =>
    cn(
      "inline-flex h-10 items-center gap-2 border-b pb-px text-[13px] transition-colors -mb-px",
      active
        ? "border-lx-gold text-lx-text"
        : "border-transparent text-lx-text/55 hover:text-lx-gold"
    );

  return (
    <div className="flex flex-wrap gap-x-8 gap-y-1 border-b border-lx-line">
      <Link href="/blog" className={item(!activeSlug)}>
        All
      </Link>
      {categories.map((cat) => (
        <Link
          key={cat.id}
          href={`/blog?category=${cat.slug}`}
          className={item(activeSlug === cat.slug)}
        >
          {cat.name}
          <span className="font-label text-[10px] tracking-[0.1em] text-lx-muted">
            {cat._count.articles}
          </span>
        </Link>
      ))}
    </div>
  );
}
