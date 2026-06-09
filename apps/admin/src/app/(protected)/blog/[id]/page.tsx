import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { prisma } from "@fano/db";
import { ArticleForm } from "../_components/article-form";

export const metadata: Metadata = { title: "Edit Article" };

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [article, categories] = await Promise.all([
    prisma.blogArticle.findUnique({ where: { id } }),
    prisma.blogCategory.findMany({
      orderBy: { name: "asc" },
      select: { id: true, name: true },
    }),
  ]);

  if (!article) notFound();

  return (
    <div className="p-6 lg:p-8 max-w-3xl space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/blog"
          className="h-9 w-9 rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-xl font-semibold text-foreground [letter-spacing:-0.02em]">
            Edit Article
          </h1>
          <p className="text-muted-foreground text-sm truncate">{article.title}</p>
        </div>
      </div>

      <ArticleForm
        categories={categories}
        articleId={article.id}
        defaultValues={{
          title: article.title,
          excerpt: article.excerpt,
          content: article.content,
          coverImage: article.coverImage ?? "",
          published: article.published,
          readTime: article.readTime ?? undefined,
          categoryId: article.categoryId ?? undefined,
          metaTitle: article.metaTitle ?? undefined,
          metaDescription: article.metaDescription ?? undefined,
        }}
      />
    </div>
  );
}
