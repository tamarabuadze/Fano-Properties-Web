"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { BedDouble, Bath, Maximize2, MapPin } from "lucide-react";
import { cn } from "@fano/utils";
import { Badge } from "./badge";

// Tiny warm-beige JPEG used as blur placeholder before real image loads
const BLUR_PLACEHOLDER =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/wAAECAADAAQDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABQQG/8QAHBAAAgMAAwEAAAAAAAAAAAAAAQIDBAASITH/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AJXi1KrXLpKhbIxWkQMVIOhGR3Qf/9k=";

export interface PropertyCardProps {
  id: string;
  title: string;
  slug: string;
  propertyType: string;
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

function formatPrice(price: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(price);
}

function PropertyCard({
  title,
  slug,
  propertyType,
  listingType,
  price,
  currency = "USD",
  location,
  city,
  bedrooms,
  bathrooms,
  sqft,
  coverImage,
  featured,
  className,
  priority = false,
}: PropertyCardProps) {
  return (
    <Link
      href={`/properties/${slug}`}
      className={cn(
        "group flex flex-col overflow-hidden rounded-2xl bg-white border border-border h-full",
        "transition-all duration-500 hover:shadow-xl hover:-translate-y-1",
        className
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-zinc-100 shrink-0">
        <Image
          src={coverImage}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          placeholder="blur"
          blurDataURL={BLUR_PLACEHOLDER}
          priority={priority}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge variant={listingType as "sale" | "rent" | "lease"} size="sm">
            For {listingType}
          </Badge>
          {featured && (
            <Badge variant="default" size="sm" className="bg-white/90 text-black backdrop-blur-sm">
              Featured
            </Badge>
          )}
        </div>
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-lg px-2.5 py-1">
          <span className="text-xs font-medium capitalize text-black">{propertyType}</span>
        </div>
      </div>

      <div className="flex flex-col flex-1 p-5">
        <div className="mb-3">
          <p className="text-2xl font-semibold tracking-tight [letter-spacing:-0.02em]" style={{ color: "#7e6244" }}>
            {formatPrice(price, currency)}
            {listingType === "rent" && (
              <span className="text-sm font-normal text-text-secondary">/mo</span>
            )}
          </p>
        </div>

        <h3 className="font-semibold mb-1.5 line-clamp-1 transition-colors" style={{ color: "#3d3020" }}>
          {title}
        </h3>

        <div className="flex items-center gap-1.5 mb-4 flex-1" style={{ color: "#9a7957" }}>
          <MapPin className="h-3.5 w-3.5 shrink-0" />
          <p className="text-sm line-clamp-1">
            {location}, {city}
          </p>
        </div>

        <div className="h-px bg-border mb-4" />

        <div className="flex items-center justify-between text-sm" style={{ color: "#9a7957" }}>
          <div className="flex items-center gap-1.5">
            <BedDouble className="h-4 w-4" />
            <span>{bedrooms} Beds</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Bath className="h-4 w-4" />
            <span>{bathrooms} Baths</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Maximize2 className="h-4 w-4" />
            <span>{sqft.toLocaleString()} sqft</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export { PropertyCard };
