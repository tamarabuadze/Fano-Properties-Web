"use client";

import * as React from "react";
import Link from "next/link";
import { cn, isOptimizedImageHost, unitTypeLabel, formatPlace, splitListingTitle } from "@fano/utils";
import { SafeImage } from "./safe-image";

// Tiny navy JPEG used as blur placeholder before the real image loads
const BLUR_PLACEHOLDER =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/wAAECAADAAQDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABQQG/8QAHBAAAgMAAwEAAAAAAAAAAAAAAQIDBAASITH/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AJXi1KrXLpKhbIxWkQMVIOhGR3Qf/9k=";

export interface PropertyCardProps {
  id: string;
  title: string;
  slug: string;
  propertyType: string;
  unitType?: string | null;
  priceUnit?: string | null;
  listingType: string;
  price: number;
  currency?: string;
  location: string;
  city: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  coverImage: string;
  featured?: boolean;
  className?: string;
  priority?: boolean;
}

function formatMoney(price: number, currency = "AED"): string {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(price) + (currency === "AED" ? "" : ` ${currency}`);
}

// Photograph, then serif name, tracked place line and one quiet line of facts;
// the price sits alone in serif. No box, no border. Hover: slow push-in, slight dim.
function PropertyCard({
  title, slug, propertyType, unitType, priceUnit, listingType, price, currency = "AED",
  location, city, bedrooms, bathrooms, sqft, coverImage, className, priority = false,
}: PropertyCardProps) {
  const isCommercial = propertyType === "commercial";
  const { headline } = splitListingTitle(title);
  const place = formatPlace(location, city);
  const facts = (isCommercial
    ? [unitTypeLabel(unitType), sqft > 0 ? `${sqft.toLocaleString("en-US")} sq ft` : null]
    : [
        bedrooms > 0 ? `${bedrooms} bedroom${bedrooms === 1 ? "" : "s"}` : null,
        sqft > 0 ? `${sqft.toLocaleString("en-US")} sq ft` : null,
        bathrooms > 0 ? `${bathrooms} bath` : null,
      ]
  ).filter(Boolean) as string[];
  const label = listingType === "rent" ? "To let" : listingType === "lease" ? "To lease" : null;

  return (
    <Link href={`/properties/${slug}`} className={cn("group block h-full", className)}>
      <div className="relative aspect-[4/3] overflow-hidden rounded-[4px] bg-lx-raised">
        <SafeImage
          src={coverImage}
          unoptimized={!isOptimizedImageHost(coverImage)}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 420px"
          quality={85}
          className="object-cover transition-[transform,opacity] duration-[1400ms] ease-out group-hover:scale-[1.04] group-hover:opacity-90"
          placeholder="blur"
          blurDataURL={BLUR_PLACEHOLDER}
          priority={priority}
        />
        {label && (
          <span className="absolute left-4 top-4 rounded-full border border-lx-gold/60 bg-lx-page/60 px-3 py-1 font-label text-[9px] font-semibold uppercase tracking-[0.2em] text-lx-pale backdrop-blur-sm">
            {label}
          </span>
        )}
      </div>

      <div className="pt-6">
        <h3 className="truncate font-display text-[22px] font-normal leading-tight text-lx-text transition-colors group-hover:text-lx-gold">
          {headline}
        </h3>
        <p className="mt-2 truncate font-label text-[10px] font-semibold uppercase tracking-[0.2em] text-lx-muted">{place}</p>
        <div className="mt-5 flex items-baseline justify-between gap-4 border-t border-lx-line pt-4">
          <p className="font-display text-[19px] leading-none text-lx-text">
            <span className="mr-2 font-label text-[10px] font-semibold uppercase tracking-[0.2em] text-lx-muted">{currency}</span>
            {formatMoney(price, currency)}
            {priceUnit === "per_sqft" && <span className="ml-1 text-[12px] text-lx-muted">/sq ft</span>}
            {listingType === "rent" && <span className="ml-1 text-[12px] text-lx-muted">/mo</span>}
          </p>
          {facts.length > 0 && <p className="truncate text-right text-[12px] text-lx-text/55">{facts.join(" · ")}</p>}
        </div>
      </div>
    </Link>
  );
}

export { PropertyCard };
