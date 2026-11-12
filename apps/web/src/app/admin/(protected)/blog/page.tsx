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
          <h1 className="font-display text-[32px] font-normal leading-tight text-foreground">Blog</h1>
          <p className="text-muted-foreground text-sm mt-1">{articles.length} articles</p>
        </div>
        <Link
          href="/admin/blog/new"
          className="btn-gold"
        >
          <Plus className="h-4 w-4" />
          New Article
        </Link>
      </div>

      <BlogTable articles={articles as never} />
    </div>
  );
}
