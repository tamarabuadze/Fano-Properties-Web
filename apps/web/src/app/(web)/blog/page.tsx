import type { Metadata } from "next";
import { buildPageMeta } from "@/lib/seo";
import { Suspense } from "react";
import { BlogGrid } from "./_components/blog-grid";
import { BlogCategories } from "./_components/blog-categories";
import { getBlogCategories } from "@/lib/queries/blog";

const title = "Blog & Insights";
const description = "Real estate market insights, buying guides, investment tips, and industry news.";

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
  const categories = await getBlogCategories().catch(() => []);

  return (
    <div className="min-h-screen pt-20">
      <div className="page-band py-14 lg:py-20">
        <div className="container-site">
          <p className="lx-eyebrow mb-5">Insights</p>
          <h1 className="font-display text-[clamp(36px,4.6vw,56px)] font-normal leading-[1.02] tracking-[-0.01em] text-lx-text text-balance">
            Blog &amp; market updates
          </h1>
          <p className="mt-5 max-w-xl text-[15px] leading-[1.85] text-lx-text/70">
            Expert insights, buying guides, and the latest real estate market news.
          </p>
        </div>
      </div>

      <div className="container-site py-12 lg:py-16">
        <BlogCategories categories={categories} activeSlug={params.category} />

        <Suspense fallback={<BlogSkeleton />}>
          <BlogGrid filters={params} />
        </Suspense>
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
