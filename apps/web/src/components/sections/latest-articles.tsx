import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BlogCard } from "@fano/ui";
import { SectionHeader } from "@/components/shared/section-header";
import { AnimateStagger } from "@/components/shared/animate-stagger";

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage?: string | null;
  publishedAt?: Date | null;
  readTime?: number | null;
  category?: { name: string; slug: string } | null;
}

interface LatestArticlesProps {
  articles: Article[];
}

export function LatestArticlesSection({ articles }: LatestArticlesProps) {
  return (
    <section className="section-y bg-zinc-50">
      <div className="container-site">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <SectionHeader
            eyebrow="Insights"
            title="Latest Articles"
            description="Market insights, buying guides, and real estate news."
          />
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-black hover:gap-3 transition-all group shrink-0"
          >
            View all articles
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {articles.length === 0 ? (
          <div className="py-24 text-center text-zinc-400">
            <p className="text-lg">Articles coming soon.</p>
          </div>
        ) : (
          <AnimateStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <BlogCard
                key={article.id}
                {...article}
                publishedAt={article.publishedAt?.toISOString()}
              />
            ))}
          </AnimateStagger>
        )}
      </div>
    </section>
  );
}
