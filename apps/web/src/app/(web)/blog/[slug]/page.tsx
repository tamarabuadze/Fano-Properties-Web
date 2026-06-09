import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { getBlogArticleBySlug } from "@/lib/queries/blog";
import { formatDate } from "@fano/utils";

interface BlogArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getBlogArticleBySlug(slug);
  if (!article) return { title: "Article Not Found" };

  return {
    title: article.metaTitle ?? article.title,
    description: article.metaDescription ?? article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: article.coverImage ? [{ url: article.coverImage }] : [],
      type: "article",
      publishedTime: article.publishedAt?.toISOString(),
    },
  };
}

export default async function BlogArticlePage({ params }: BlogArticlePageProps) {
  const { slug } = await params;
  const article = await getBlogArticleBySlug(slug);
  if (!article || !article.published) notFound();

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="container-site max-w-3xl py-12">
        {/* Back */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-black transition-colors mb-10"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </Link>

        {/* Header */}
        <div className="mb-8">
          {article.category && (
            <Link
              href={`/blog?category=${article.category.slug}`}
              className="inline-flex items-center h-7 px-3 rounded-full bg-zinc-100 text-zinc-600 text-xs font-medium hover:bg-zinc-200 transition-colors mb-4"
            >
              {article.category.name}
            </Link>
          )}

          <h1 className="text-3xl lg:text-4xl font-semibold [letter-spacing:-0.025em] text-black mb-4 text-balance">
            {article.title}
          </h1>

          <p className="text-lg text-zinc-500 leading-relaxed mb-6">{article.excerpt}</p>

          <div className="flex items-center gap-5 text-sm text-zinc-400">
            {article.publishedAt && (
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(article.publishedAt)}</span>
              </div>
            )}
            {article.readTime && (
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                <span>{article.readTime} min read</span>
              </div>
            )}
          </div>
        </div>

        {/* Cover image */}
        {article.coverImage && (
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-zinc-100 mb-10">
            <Image
              src={article.coverImage}
              alt={article.title}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Content */}
        <div
          className="prose prose-zinc max-w-none prose-headings:font-semibold prose-headings:[letter-spacing:-0.02em] prose-a:text-black prose-a:underline-offset-2 prose-img:rounded-2xl"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Tags */}
        {article.tags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex flex-wrap gap-2">
              {article.tags.map(({ tag }) => (
                <span
                  key={tag.id}
                  className="inline-flex items-center h-8 px-3 rounded-full bg-zinc-100 text-zinc-600 text-xs font-medium"
                >
                  #{tag.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
