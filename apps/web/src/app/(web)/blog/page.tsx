import type { Metadata } from "next";
import { buildPageMeta } from "@/lib/seo";
import { Suspense } from "react";
import { BlogGrid } from "./_components/blog-grid";
import { BlogCategories } from "./_components/blog-categories";
import { getBlogCategories } from "@/lib/queries/blog";
import { getDubaiPropertyNews } from "@/lib/dubai-news";
import { getDubaiMarket } from "@/lib/dubai-market";
import { PageBanner } from "@/components/luxury/page-banner";
import { LuxNews } from "@/components/luxury/lux-news";
import { MarketTicker } from "@/components/market/market-board";

const title = "Dubai Property Insights | Market Updates & Investment Guides";
const description = "Market updates, buying guides and investment insights for Dubai real estate, from the Fano Properties team.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/blog" },
  ...buildPageMeta({ path: "/blog", title, description }),
};

export const dynamic = "force-dynamic";

interface BlogPageProps {
  searchParams: Promise<{ category?: string; page?: string; search?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const [categories, news, market] = await Promise.all([
    getBlogCategories().catch(() => []),
    getDubaiPropertyNews(6).catch(() => []),
    getDubaiMarket().catch(() => []),
  ]);

  return (
    <div className="min-h-screen pt-20">
      <PageBanner
        image="/media/648d1136-ebf5-4b0b-90ed-d94da7d4f3e0.jpg"
        eyebrow="Insights"
        title="Blog &"
        accent="market updates."
        subtitle="Expert insights, buying guides, and the latest Dubai real estate market news."
      />
      <MarketTicker items={news} market={market} />

      <div className="container-site py-12 lg:py-16">
        <BlogCategories categories={categories} activeSlug={params.category} />

        <Suspense fallback={<BlogSkeleton />}>
          <BlogGrid filters={params} />
        </Suspense>
      </div>

      {/* Market charts and the latest headlines, the same feed as the homepage */}
      <div className="border-t border-lx-line">
        <LuxNews items={news} market={market} ticker={false} />
      </div>
    </div>
  );
}

function BlogSkeleton() {
  return (
    <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="aspect-[16/10] rounded-[4px] bg-lx-raised" />
          <div className="mt-5 h-5 w-3/4 rounded-[2px] bg-lx-raised" />
          <div className="mt-3 h-3 w-1/2 rounded-[2px] bg-lx-raised/70" />
        </div>
      ))}
    </div>
  );
}
