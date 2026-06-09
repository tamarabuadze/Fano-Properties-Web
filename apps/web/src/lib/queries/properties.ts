import { prisma } from "@fano/db";
import type { PropertyFilters } from "@fano/types";

export async function getFeaturedProperties(limit = 6) {
  return prisma.property.findMany({
    where: { featured: true, published: true },
    take: limit,
    orderBy: { createdAt: "desc" },
    include: { images: { orderBy: { position: "asc" }, take: 1 } },
  });
}

export async function getProperties(filters: PropertyFilters = {}) {
  const {
    search,
    propertyType,
    listingType,
    city,
    minPrice,
    maxPrice,
    minBedrooms,
    featured,
    page = 1,
    pageSize = 12,
    sortBy = "createdAt",
    sortOrder = "desc",
  } = filters;

  const where = {
    published: true,
    ...(search && {
      OR: [
        { title: { contains: search, mode: "insensitive" as const } },
        { location: { contains: search, mode: "insensitive" as const } },
        { city: { contains: search, mode: "insensitive" as const } },
      ],
    }),
    ...(propertyType && { propertyType }),
    ...(listingType && { listingType }),
    ...(city && { city: { contains: city, mode: "insensitive" as const } }),
    ...(minPrice !== undefined && { price: { gte: minPrice } }),
    ...(maxPrice !== undefined && { price: { lte: maxPrice } }),
    ...(minBedrooms !== undefined && { bedrooms: { gte: minBedrooms } }),
    ...(featured !== undefined && { featured }),
  };

  const [data, total] = await Promise.all([
    prisma.property.findMany({
      where,
      take: pageSize,
      skip: (page - 1) * pageSize,
      orderBy: { [sortBy]: sortOrder },
      include: { images: { orderBy: { position: "asc" }, take: 1 } },
    }),
    prisma.property.count({ where }),
  ]);

  return {
    data,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  };
}

export async function getPropertyBySlug(slug: string) {
  return prisma.property.findUnique({
    where: { slug },
    include: {
      images: { orderBy: { position: "asc" } },
      agent: true,
    },
  });
}

export async function getRelatedProperties(propertyId: string, propertyType: string, limit = 3) {
  return prisma.property.findMany({
    where: {
      published: true,
      propertyType: propertyType as never,
      NOT: { id: propertyId },
    },
    take: limit,
    orderBy: { createdAt: "desc" },
    include: { images: { orderBy: { position: "asc" }, take: 1 } },
  });
}

export async function incrementPropertyViewCount(id: string) {
  return prisma.property.update({
    where: { id },
    data: { viewCount: { increment: 1 } },
  });
}
