import type { WithTimestamps, Coordinates } from "./common";

export type PropertyType = "apartment" | "villa" | "house" | "commercial" | "land" | "penthouse" | "townhouse";
export type ListingType = "sale" | "rent" | "lease";
export type PropertyStatus = "available" | "sold" | "rented" | "off_market";

export type PropertyImage = {
  id: string;
  propertyId: string;
  url: string;
  alt?: string | null;
  position: number;
};

export type Property = WithTimestamps & {
  id: string;
  title: string;
  slug: string;
  description: string;
  propertyType: PropertyType;
  listingType: ListingType;
  status: PropertyStatus;
  price: number;
  currency: string;
  location: string;
  city: string;
  state?: string | null;
  country: string;
  postalCode?: string | null;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  amenities: string[];
  coverImage: string;
  gallery: PropertyImage[];
  featured: boolean;
  published: boolean;
  coordinates?: Coordinates | null;
  agentId?: string | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  viewCount: number;
};

export type PropertyCardData = Pick<
  Property,
  | "id"
  | "title"
  | "slug"
  | "propertyType"
  | "listingType"
  | "price"
  | "currency"
  | "location"
  | "city"
  | "country"
  | "bedrooms"
  | "bathrooms"
  | "sqft"
  | "coverImage"
  | "featured"
  | "status"
>;

export type PropertyFilters = {
  search?: string;
  propertyType?: PropertyType;
  listingType?: ListingType;
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  minBedrooms?: number;
  minBathrooms?: number;
  minSqft?: number;
  maxSqft?: number;
  featured?: boolean;
  page?: number;
  pageSize?: number;
  sortBy?: "price" | "createdAt" | "viewCount";
  sortOrder?: "asc" | "desc";
};
