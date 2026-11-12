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
  const featured = articles[0];
  const rest = articles.slice(1);

  return (
    <section className="section-y section-tint">
      <div className="container-site">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <SectionHeader
            eyebrow="Insights"
            title="Latest Articles"
            description="Market insights, buying guides, and real estate news."
          />
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#8C6A47] hover:text-[#6B5038] hover:gap-3 transition-all group shrink-0"
          >
            View all articles
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {!featured ? (
          <div className="py-24 text-center text-[#A39886]">
            <p className="text-lg">Articles coming soon.</p>
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
          <AnimateStagger className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
            {/* Featured article — wider column */}
            <div className="lg:col-span-3">
              <BlogCard
                key={featured.id}
                {...featured}
                publishedAt={featured.publishedAt?.toISOString()}
              />
            </div>

            {/* Remaining articles stacked as horizontal cards */}
            <div className="lg:col-span-2 flex flex-col divide-y divide-[#D9CFC2]/60">
              {rest.map((article) => (
                <div key={article.id} className="py-5 first:pt-0 last:pb-0">
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
