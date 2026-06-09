import type { Metadata } from "next";
import { Suspense } from "react";
import { BlogGrid } from "./_components/blog-grid";
import { BlogCategories } from "./_components/blog-categories";
import { getBlogCategories } from "@/lib/queries/blog";

export const metadata: Metadata = {
  title: "Blog & Insights",
  description: "Real estate market insights, buying guides, investment tips, and industry news.",
};

export const revalidate = 1800;

interface BlogPageProps {
  searchParams: Promise<{ category?: string; page?: string; search?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const categories = await getBlogCategories().catch(() => []);

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="border-b border-border bg-zinc-50 py-12">
        <div className="container-site">
          <p className="text-xs font-medium uppercase tracking-widest text-zinc-400 mb-3">Insights</p>
          <h1 className="text-4xl lg:text-5xl font-semibold [letter-spacing:-0.025em] text-black">
            Blog & Market Updates
          </h1>
          <p className="text-zinc-500 mt-3 max-w-xl">
            Expert insights, buying guides, and the latest real estate market news.
          </p>
        </div>
      </div>

      <div className="container-site py-12">
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="rounded-2xl bg-zinc-100 animate-pulse h-72" />
      ))}
    </div>
  );
}
