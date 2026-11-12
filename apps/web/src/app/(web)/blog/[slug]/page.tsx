import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
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

  const meta = [
    article.category?.name,
    article.publishedAt ? formatDate(article.publishedAt) : null,
    article.readTime ? `${article.readTime} min read` : null,
  ].filter(Boolean);

  return (
    <div className="min-h-screen pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container-site max-w-3xl py-12 lg:py-16">
        {/* Back */}
        <Link
          href="/blog"
          className="mb-12 inline-flex items-center gap-2 text-[12px] tracking-[0.08em] text-[#2B2520]/55 transition-colors hover:text-[#2B2520]"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          Back to blog
        </Link>

        {/* Header */}
        <div className="mb-10">
          {article.category && (
            <Link
              href={`/blog?category=${article.category.slug}`}
              className="eyebrow mb-5 transition-colors hover:text-[#2B2520]"
            >
              {article.category.name}
            </Link>
          )}

          <h1 className="font-display text-[clamp(36px,5vw,60px)] font-normal leading-[1.05] tracking-[-0.01em] text-[#2B2520] text-balance">
            {article.title}
          </h1>

          <p className="mt-6 text-[17px] leading-[1.75] text-[#2B2520]/70">{article.excerpt}</p>

          <p className="mt-6 border-t border-[#C5BAAB]/40 pt-4 font-label text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8C6A47]">
            {meta.join("  ·  ")}
          </p>
        </div>

        {/* Cover image */}
        {article.coverImage && (
          <div className="relative mb-12 aspect-[16/9] overflow-hidden rounded-[4px] bg-[#E6DFD5]">
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
          className="prose max-w-none prose-headings:font-display prose-headings:font-normal prose-headings:tracking-[-0.01em] prose-headings:text-[#2B2520] prose-p:text-[15px] prose-p:leading-[1.85] prose-p:text-[#2B2520]/80 prose-li:text-[#2B2520]/80 prose-strong:text-[#2B2520] prose-a:text-[#8C6A47] prose-a:underline-offset-4 prose-blockquote:border-l-[#E2A862] prose-blockquote:font-display prose-blockquote:text-[20px] prose-blockquote:font-normal prose-blockquote:not-italic prose-blockquote:text-[#2B2520] prose-img:rounded-[4px] prose-hr:border-[#C5BAAB]/40"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Tags */}
        {article.tags.length > 0 && (
          <div className="mt-14 border-t border-[#C5BAAB]/40 pt-8">
            <div className="flex flex-wrap gap-2">
              {article.tags.map(({ tag }) => (
                <span
                  key={tag.id}
                  className="inline-flex h-8 items-center rounded-full border border-[#C5BAAB]/70 px-3 font-label text-[10px] font-semibold uppercase tracking-[0.14em] text-[#2B2520]/70"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
