import { prisma } from "@fano/db";
import { cached, CACHE_TAGS } from "@/lib/cache";

async function getBlogArticlesUncached(options: {
  limit?: number;
  page?: number;
  categorySlug?: string;
  tagSlug?: string;
  search?: string;
} = {}) {
  const { limit = 9, page = 1, categorySlug, search } = options;

  const where = {
    published: true,
    ...(categorySlug && { category: { slug: categorySlug } }),
    ...(search && {
      OR: [
        { title: { contains: search, mode: "insensitive" as const } },
        { excerpt: { contains: search, mode: "insensitive" as const } },
      ],
    }),
  };

  const [data, total] = await Promise.all([
    prisma.blogArticle.findMany({
      where,
      take: limit,
      skip: (page - 1) * limit,
      orderBy: { publishedAt: "desc" },
      include: {
        category: true,
        tags: { include: { tag: true } },
      },
    }),
    prisma.blogArticle.count({ where }),
  ]);

  return {
    data,
    total,
    page,
    pageSize: limit,
    totalPages: Math.ceil(total / limit),
  };
}

async function getBlogArticleBySlugUncached(slug: string) {
  return prisma.blogArticle.findUnique({
    where: { slug },
    include: {
      category: true,
      tags: { include: { tag: true } },
    },
  });
}

async function getLatestArticlesUncached(limit = 3) {
  return prisma.blogArticle.findMany({
    where: { published: true },
    take: limit,
    orderBy: { publishedAt: "desc" },
    include: { category: true },
  });
}

async function getBlogCategoriesUncached() {
  return prisma.blogCategory.findMany({
    include: { _count: { select: { articles: { where: { published: true } } } } },
  });
}

export const getBlogArticles = cached(getBlogArticlesUncached, "getBlogArticles", [CACHE_TAGS.blog]);
export const getBlogArticleBySlug = cached(getBlogArticleBySlugUncached, "getBlogArticleBySlug", [CACHE_TAGS.blog]);
export const getLatestArticles = cached(getLatestArticlesUncached, "getLatestArticles", [CACHE_TAGS.blog]);
export const getBlogCategories = cached(getBlogCategoriesUncached, "getBlogCategories", [CACHE_TAGS.blog]);
