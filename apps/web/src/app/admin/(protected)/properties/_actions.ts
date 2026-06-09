"use server";

import { prisma } from "@fano/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { generateSlug } from "@fano/utils";
import { requireAdmin } from "@/lib/admin-auth";

const propertySchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  propertyType: z.enum(["apartment", "villa", "house", "commercial", "land", "penthouse", "townhouse"]),
  listingType: z.enum(["sale", "rent", "lease"]),
  status: z.enum(["available", "sold", "rented", "off_market"]).default("available"),
  price: z.number().positive(),
  currency: z.string().default("USD"),
  location: z.string().min(1),
  city: z.string().min(1),
  state: z.string().optional(),
  country: z.string().default("US"),
  bedrooms: z.number().int().min(0),
  bathrooms: z.number().int().min(0),
  sqft: z.number().int().min(0),
  amenities: z.array(z.string()).default([]),
  coverImage: z.string().url(),
  featured: z.boolean().default(false),
  published: z.boolean().default(false),
  agentId: z.string().optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
});

export async function createProperty(data: z.infer<typeof propertySchema>) {
  await requireAdmin();
  const parsed = propertySchema.safeParse(data);
  if (!parsed.success) return { success: false, error: parsed.error.errors[0]?.message };

  try {
    const slug = generateSlug(parsed.data.title);
    const property = await prisma.property.create({
      data: { ...parsed.data, slug, price: parsed.data.price, agentId: parsed.data.agentId || undefined },
    });
    revalidatePath("/admin/properties");
    revalidatePath("/admin/properties");
    return { success: true, id: property.id };
  } catch (e: unknown) {
    if ((e as { code?: string }).code === "P2002") return { success: false, error: "A property with this title already exists." };
    return { success: false, error: "Failed to create property." };
  }
}

export async function updateProperty(id: string, data: Partial<z.infer<typeof propertySchema>>) {
  await requireAdmin();
  try {
    await prisma.property.update({ where: { id }, data: { ...data, agentId: data.agentId || undefined } });
    revalidatePath("/admin/properties");
    revalidatePath(`/properties/${id}`);
    return { success: true };
  } catch {
    return { success: false, error: "Failed to update property." };
  }
}

export async function deleteProperty(id: string) {
  await requireAdmin();
  try {
    await prisma.property.delete({ where: { id } });
    revalidatePath("/admin/properties");
    return { success: true };
  } catch {
    return { success: false, error: "Failed to delete property." };
  }
}

export async function togglePropertyPublished(id: string, published: boolean) {
  await requireAdmin();
  try {
    await prisma.property.update({ where: { id }, data: { published } });
    revalidatePath("/admin/properties");
    revalidatePath(`/properties/${id}`);
    return { success: true };
  } catch {
    return { success: false, error: "Failed to update." };
  }
}

export async function togglePropertyFeatured(id: string, featured: boolean) {
  await requireAdmin();
  try {
    await prisma.property.update({ where: { id }, data: { featured } });
    revalidatePath("/admin/properties");
    return { success: true };
  } catch {
    return { success: false, error: "Failed to update." };
  }
}
