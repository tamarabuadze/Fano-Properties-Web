import React from "react";
import Link from "next/link";
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
  const featured = articles[0];
  const rest = articles.slice(1);

  return (
    <section className="section-y section-tint">
      <div className="container-site">
        <div className="mb-14 flex flex-col gap-6 border-b border-[#C5BAAB]/50 pb-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            eyebrow="Insights"
            title="Latest articles"
            description="Market insights, buying guides, and real estate news."
          />
          <Link href="/blog" className="link-rule shrink-0">
            View all articles
          </Link>
        </div>

        {!featured ? (
          <div className="py-24 text-center">
            <p className="font-display text-2xl font-normal text-[#2B2520]/60">Articles coming soon.</p>
          </div>
        ) : rest.length === 0 ? (
          <AnimateStagger className="grid grid-cols-1 gap-6">
            <BlogCard
              key={featured.id}
              {...featured}
              publishedAt={featured.publishedAt?.toISOString()}
            />
          </AnimateStagger>
        ) : (
          <AnimateStagger className="grid grid-cols-1 items-start gap-10 lg:grid-cols-5 lg:gap-14">
            {/* Featured article — wider column */}
            <div className="lg:col-span-3">
              <BlogCard
                key={featured.id}
                {...featured}
                publishedAt={featured.publishedAt?.toISOString()}
              />
            </div>

            {/* Remaining articles stacked as horizontal cards */}
            <div className="flex flex-col divide-y divide-[#C5BAAB]/40 lg:col-span-2">
              {rest.map((article) => (
                <div key={article.id} className="py-6 first:pt-0 last:pb-0">
                  <BlogCard
                    {...article}
                    publishedAt={article.publishedAt?.toISOString()}
                    variant="horizontal"
                  />
                </div>
              ))}
            </div>
          </AnimateStagger>
        )}
      </div>
    </section>
  );
}
