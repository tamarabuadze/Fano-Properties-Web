import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { getBlogArticleBySlug } from "@/lib/queries/blog";
import { formatDate } from "@fano/utils";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://fanoproperties.com";

interface BlogArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getBlogArticleBySlug(slug);
  if (!article || !article.published) return { title: "Article Not Found", robots: { index: false } };

  return {
    title: article.metaTitle?.trim() || article.title,
    description: article.metaDescription?.trim() || article.excerpt,
    alternates: { canonical: `/blog/${slug}` },
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

  const url = `${SITE_URL}/blog/${slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.metaDescription?.trim() || article.excerpt,
    url,
    mainEntityOfPage: url,
    ...(article.coverImage && { image: [article.coverImage] }),
    ...(article.publishedAt && { datePublished: article.publishedAt.toISOString() }),
    dateModified: article.updatedAt.toISOString(),
    author: { "@type": "Organization", name: "Fano Properties", url: SITE_URL },
    publisher: { "@id": `${SITE_URL}/#organization` },
  };

  return (
    <div className="min-h-screen bg-white pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container-site max-w-3xl py-12">
        {/* Back */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-[#1a1410] transition-colors mb-10"
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

          <h1 className="text-3xl lg:text-4xl font-semibold [letter-spacing:-0.025em] text-[#1a1410] mb-4 text-balance">
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
          className="prose prose-zinc max-w-none prose-headings:font-semibold prose-headings:[letter-spacing:-0.02em] prose-a:text-[#1a1410] prose-a:underline-offset-2 prose-img:rounded-2xl"
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
