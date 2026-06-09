import { prisma } from "@fano/db";

export async function getBlogArticles(options: {
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

export async function getBlogArticleBySlug(slug: string) {
  return prisma.blogArticle.findUnique({
    where: { slug },
    include: {
      category: true,
      tags: { include: { tag: true } },
    },
  });
}

export async function getLatestArticles(limit = 3) {
  return prisma.blogArticle.findMany({
    where: { published: true },
    take: limit,
    orderBy: { publishedAt: "desc" },
    include: { category: true },
  });
}

export async function getBlogCategories() {
  return prisma.blogCategory.findMany({
    include: { _count: { select: { articles: { where: { published: true } } } } },
  });
}
