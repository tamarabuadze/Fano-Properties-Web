import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";
import { prisma } from "@fano/db";
import { BlogTable } from "./_components/blog-table";

export const metadata: Metadata = { title: "Blog" };

export default async function BlogAdminPage() {
  const articles = await prisma.blogArticle.findMany({
    orderBy: { createdAt: "desc" },
    include: { category: true },
  });

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground [letter-spacing:-0.02em]">Blog</h1>
          <p className="text-muted-foreground text-sm mt-1">{articles.length} articles</p>
        </div>
        <Link
          href="/admin/blog/new"
          className="inline-flex items-center gap-2 h-10 px-4 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
        >
          <Plus className="h-4 w-4" />
          New Article
        </Link>
      </div>

      <BlogTable articles={articles as never} />
    </div>
  );
}
