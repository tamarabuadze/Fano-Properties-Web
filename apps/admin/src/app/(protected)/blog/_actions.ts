"use server";

import { prisma } from "@fano/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { generateSlug } from "@fano/utils";
import { requireAdmin } from "@/lib/auth";

const articleSchema = z.object({
  title: z.string().min(1),
  excerpt: z.string().min(1),
  content: z.string().min(1),
  coverImage: z.string().url().optional().or(z.literal("")),
  published: z.boolean().default(false),
  readTime: z.number({ coerce: true }).int().optional(),
  categoryId: z.string().optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
});

export async function createArticle(data: z.infer<typeof articleSchema>) {
  await requireAdmin();
  const parsed = articleSchema.safeParse(data);
  if (!parsed.success) return { success: false, error: parsed.error.errors[0]?.message ?? "Invalid data" };

  try {
    const slug = generateSlug(parsed.data.title);
    const article = await prisma.blogArticle.create({
      data: {
        ...parsed.data,
        slug,
        coverImage: parsed.data.coverImage || null,
        categoryId: parsed.data.categoryId || null,
        publishedAt: parsed.data.published ? new Date() : null,
      },
    });
    revalidatePath("/blog");
    return { success: true, id: article.id };
  } catch {
    return { success: false, error: "Failed to create article." };
  }
}

export async function updateArticle(id: string, data: Partial<z.infer<typeof articleSchema>>) {
  await requireAdmin();
  try {
    const updateData = {
      ...data,
      categoryId: data.categoryId || undefined,
      publishedAt: data.published ? new Date() : undefined,
    };
    await prisma.blogArticle.update({ where: { id }, data: updateData });
    revalidatePath("/blog");
    return { success: true };
  } catch {
    return { success: false, error: "Failed to update article." };
  }
}

export async function deleteArticle(id: string) {
  await requireAdmin();
  try {
    await prisma.blogArticle.delete({ where: { id } });
    revalidatePath("/blog");
    return { success: true };
  } catch {
    return { success: false, error: "Failed to delete article." };
  }
}

export async function toggleArticlePublished(id: string, published: boolean) {
  await requireAdmin();
  try {
    await prisma.blogArticle.update({
      where: { id },
      data: { published, publishedAt: published ? new Date() : null },
    });
    revalidatePath("/blog");
    return { success: true };
  } catch {
    return { success: false, error: "Failed to update." };
  }
}
