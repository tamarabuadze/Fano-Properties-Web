export const COMMERCIAL_UNIT_TYPES = [
  { value: "shop", label: "Shop" },
  { value: "warehouse", label: "Warehouse" },
  { value: "office_floor", label: "Office Floor" },
  { value: "office_space", label: "Office Space" },
] as const;

export function unitTypeLabel(unitType?: string | null): string {
  return COMMERCIAL_UNIT_TYPES.find((t) => t.value === unitType)?.label ?? "Commercial";
}

export const PROPERTY_STATUS_LABELS: Record<string, string> = {
  available: "Available",
  sold: "Sold",
  rented: "Rented",
  off_market: "Off Market",
  off_payment_plan: "Off Payment Plan",
};

// The third status differs: residential has Rented, commercial has Off Payment Plan
export const RESIDENTIAL_STATUSES = ["available", "sold", "rented", "off_market"] as const;
export const COMMERCIAL_STATUSES = ["available", "sold", "off_payment_plan", "off_market"] as const;

// Keep in sync with images.remotePatterns in next.config.ts. Images from other
// hosts skip next/image optimisation, which would otherwise throw and crash the page.
const OPTIMIZED_IMAGE_HOSTS = [/\.supabase\.co$/, /^images\.unsplash\.com$/, /^plus\.unsplash\.com$/, /^cdn\.prod\.website-files\.com$/];

/** Server-side only: reads secret env vars. Local development saves uploads to disk. */
export function isUploadStorageConfigured(): boolean {
  if (process.env.NODE_ENV !== "production") return true;
  return !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

export function isVideoUrl(url?: string | null): boolean {
  return !!url && /\.mp4($|\?)/i.test(url);
}

export function isOptimizedImageHost(src?: string | null): boolean {
  if (!src) return false;
  if (src.startsWith("/")) return true;
  try {
    const { hostname } = new URL(src);
    return OPTIMIZED_IMAGE_HOSTS.some((host) => host.test(hostname));
  } catch {
    return false;
  }
}
