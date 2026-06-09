import type { WithTimestamps, SeoMeta } from "./common";

export type BlogCategory = WithTimestamps & {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
};

export type BlogTag = {
  id: string;
  name: string;
  slug: string;
};

export type BlogArticle = WithTimestamps &
  SeoMeta & {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    coverImage?: string | null;
    published: boolean;
    publishedAt?: Date | null;
    readTime?: number | null;
    categoryId?: string | null;
    category?: BlogCategory | null;
    tags: BlogTag[];
    authorId?: string | null;
    viewCount: number;
  };

export type BlogArticleCard = Pick<
  BlogArticle,
  | "id"
  | "title"
  | "slug"
  | "excerpt"
  | "coverImage"
  | "publishedAt"
  | "readTime"
  | "category"
  | "tags"
>;
