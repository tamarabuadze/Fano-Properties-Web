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
        ? "border-[#2B2520] text-[#2B2520]"
        : "border-transparent text-[#2B2520]/55 hover:text-[#2B2520]"
    );

  return (
    <div className="flex flex-wrap gap-x-8 gap-y-1 border-b border-[#C5BAAB]/40">
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
          <span className="font-label text-[10px] tracking-[0.1em] text-[#A39886]">
            {cat._count.articles}
          </span>
        </Link>
      ))}
    </div>
  );
}
