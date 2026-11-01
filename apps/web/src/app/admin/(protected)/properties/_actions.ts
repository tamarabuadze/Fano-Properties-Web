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
  status: z.enum(["available", "sold", "rented", "off_market", "off_payment_plan"]).default("available"),
  price: z.number().positive(),
  currency: z.literal("AED").default("AED"),
  location: z.string().min(1),
  city: z.string().min(1),
  state: z.string().optional(),
  country: z.string().default("AE"),
  unitType: z.enum(["shop", "warehouse", "office_floor", "office_space"]).nullable().optional(),
  bedrooms: z.number().int().min(0),
  bathrooms: z.number().int().min(0),
  sqft: z.number().int().min(0),
  amenities: z.array(z.string()).default([]),
  coverImage: z.string().min(1),
  gallery: z.array(z.string().min(1)).optional(),
  featured: z.boolean().default(false),
  published: z.boolean().default(false),
  agentId: z.string().optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
});

// Keeps commercial and residential fields consistent, whatever the client sends
function normalizeCategory<T extends Partial<z.infer<typeof propertySchema>>>(data: T): T {
  if (data.propertyType === undefined) return data;
  if (data.propertyType === "commercial") {
    return {
      ...data,
      bedrooms: 0,
      bathrooms: 0,
      status: data.status === "rented" ? "available" : data.status,
      listingType: data.listingType === "rent" ? "lease" : data.listingType,
    };
  }
  return { ...data, unitType: null, status: data.status === "off_payment_plan" ? "available" : data.status };
}

const UNIT_TYPE_REQUIRED = "Choose a unit type for commercial properties.";

export async function createProperty(data: z.infer<typeof propertySchema>) {
  await requireAdmin();
  const parsed = propertySchema.safeParse(data);
  if (!parsed.success) return { success: false, error: parsed.error.errors[0]?.message };
  if (parsed.data.propertyType === "commercial" && !parsed.data.unitType) return { success: false, error: UNIT_TYPE_REQUIRED };

  try {
    const slug = generateSlug(parsed.data.title);
    const { gallery, ...rest } = normalizeCategory(parsed.data);
    const property = await prisma.property.create({
      data: { ...rest, images: { create: (gallery ?? []).map((url, position) => ({ url, position })) }, slug, price: parsed.data.price, agentId: parsed.data.agentId || undefined },
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
  if (data.propertyType === "commercial" && !data.unitType) return { success: false, error: UNIT_TYPE_REQUIRED };
  try {
    const { gallery, ...rest } = normalizeCategory(data);
    await prisma.property.update({
      where: { id },
      data: {
        ...rest,
        agentId: data.agentId || undefined,
        // Gallery order is the order shown in the form, so replace the whole list
        ...(gallery && { images: { deleteMany: {}, create: gallery.map((url, position) => ({ url, position })) } }),
      },
    });
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
