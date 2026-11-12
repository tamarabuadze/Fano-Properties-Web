"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn, isOptimizedImageHost, unitTypeLabel, formatPlace, splitListingTitle } from "@fano/utils";

// Tiny warm-beige JPEG used as blur placeholder before real image loads
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

function formatPrice(price: number, currency = "AED"): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency, maximumFractionDigits: 0 }).format(price);
}

// A gallery-style card: the photograph, then a serif name, the place, the price
// and a quiet line of facts. No box, no border; a hairline separates text from image.
function PropertyCard({
  title, slug, propertyType, unitType, priceUnit, listingType, price, currency = "AED",
  location, city, bedrooms, bathrooms, sqft, coverImage, featured, className, priority = false,
}: PropertyCardProps) {
  const isCommercial = propertyType === "commercial";
  const { headline, details } = splitListingTitle(title);
  const place = formatPlace(location, city);
  const facts = isCommercial
    ? [unitTypeLabel(unitType), sqft > 0 ? `${sqft.toLocaleString("en-US")} sq ft` : null]
    : [`${bedrooms} bed`, `${bathrooms} bath`, sqft > 0 ? `${sqft.toLocaleString("en-US")} sq ft` : null];

  return (
    <Link href={`/properties/${slug}`} className={cn("cinema-property-card group block h-full", className)}>
      <div className="relative aspect-[4/3] overflow-hidden rounded-[4px] bg-[#E6DFD5]">
        <Image
          src={coverImage}
          unoptimized={!isOptimizedImageHost(coverImage)}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 420px"
          quality={85}
          className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
          placeholder="blur"
          blurDataURL={BLUR_PLACEHOLDER}
          priority={priority}
        />
        <div className="absolute left-3 top-3 flex gap-2">
          <span className="rounded-full bg-[#F4EFEA]/92 px-2.5 py-1 font-label text-[10px] font-semibold uppercase tracking-[0.16em] text-[#2B2520] backdrop-blur-sm">
            For {listingType}
          </span>
          {featured && (
            <span className="rounded-full bg-[#2B2520]/85 px-2.5 py-1 font-label text-[10px] font-semibold uppercase tracking-[0.16em] text-[#F4EFEA] backdrop-blur-sm">
              Featured
            </span>
          )}
        </div>
      </div>

      <div className="pt-5">
        <h3 className="font-display text-[24px] font-normal leading-tight text-[#2B2520] transition-colors group-hover:text-[#8C6A47]">
          {headline}
        </h3>
        {details.length > 0 && <p className="mt-1 text-[12px] text-[#A39886]">{details.join(" · ")}</p>}
        <p className="mt-1.5 text-[13px] text-[#2B2520]/65">{place}</p>
        <div className="mt-4 flex items-baseline justify-between gap-4 border-t border-[#C5BAAB]/40 pt-3">
          <p className="text-[15px] font-medium tracking-[0.01em] text-[#2B2520]">
            {formatPrice(price, currency)}
            {priceUnit === "per_sqft" && <span className="text-[12px] font-normal text-[#2B2520]/55"> /sq ft</span>}
            {listingType === "rent" && <span className="text-[12px] font-normal text-[#2B2520]/55"> /mo</span>}
          </p>
          <p className="text-[12px] text-[#2B2520]/55">{facts.filter(Boolean).join(" · ")}</p>
        </div>
      </div>
    </Link>
  );
}

export { PropertyCard };
