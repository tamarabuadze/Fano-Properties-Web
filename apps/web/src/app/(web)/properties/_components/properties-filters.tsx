"use client";

import React, { useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Search, SlidersHorizontal } from "lucide-react";
import { cn } from "@fano/utils";

const LISTING_TYPES = [
  { label: "Any", value: "" },
  { label: "For Sale", value: "sale" },
  { label: "For Rent", value: "rent" },
  { label: "For Lease", value: "lease" },
];

const PROPERTY_TYPES = [
  { label: "Any Type", value: "" },
  { label: "Apartment", value: "apartment" },
  { label: "Villa", value: "villa" },
  { label: "House", value: "house" },
  { label: "Penthouse", value: "penthouse" },
  { label: "Commercial", value: "commercial" },
  { label: "Land", value: "land" },
];

const BEDROOMS = [
  { label: "Any", value: "" },
  { label: "1+", value: "1" },
  { label: "2+", value: "2" },
  { label: "3+", value: "3" },
  { label: "4+", value: "4" },
];

interface PropertiesFiltersProps {
  initialFilters: Record<string, string | undefined>;
}

export function PropertiesFilters({ initialFilters }: PropertiesFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();

  const updateFilters = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams();
      const current = {
        ...Object.fromEntries(
          Object.entries(initialFilters).filter(([, v]) => v !== undefined)
        ) as Record<string, string>,
        [key]: value,
      };
      Object.entries(current).forEach(([k, v]) => {
        if (v) params.set(k, v);
      });
      params.delete("page");
      router.push(`${pathname}?${params.toString()}`);
    },
    [initialFilters, pathname, router]
  );

  const clearFilters = () => router.push(pathname);

  const hasFilters = Object.values(initialFilters).some(Boolean);

  return (
    <div className="rounded-2xl p-5 sticky top-24 space-y-6" style={{ backgroundColor: "#1a1410" }}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-[#c9a96e]" />
          <span className="font-semibold text-sm text-[#c9a96e]">Filters</span>
        </div>
        {hasFilters && (
          <button
            onClick={clearFilters}
            className="text-xs text-white/40 hover:text-white transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Search */}
      <div>
        <label className="text-xs font-medium text-white/50 uppercase tracking-wider mb-2 block">
          Search
        </label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
          <input
            type="text"
            defaultValue={initialFilters.search}
            placeholder="Location, title…"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                updateFilters("search", (e.target as HTMLInputElement).value);
              }
            }}
            className="w-full h-10 pl-9 pr-3 rounded-xl border border-white/15 bg-white/5 text-white placeholder-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a96e]/30 focus:border-transparent"
          />
        </div>
      </div>

      {/* Listing Type */}
      <div>
        <label className="text-xs font-medium text-white/50 uppercase tracking-wider mb-2 block">
          Listing Type
        </label>
        <div className="grid grid-cols-2 gap-1.5">
          {LISTING_TYPES.map((t) => (
            <button
              key={t.value}
              onClick={() => updateFilters("listingType", t.value)}
              className={cn(
                "h-9 px-3 rounded-xl text-sm font-medium border transition-all",
                initialFilters.listingType === t.value ||
                  (!initialFilters.listingType && t.value === "")
                  ? "bg-[#c9a96e] text-[#1a1410] border-[#c9a96e]"
                  : "border-white/15 text-white/60 hover:border-[#c9a96e]/50 hover:text-white"
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Property Type */}
      <div>
        <label className="text-xs font-medium text-white/50 uppercase tracking-wider mb-2 block">
          Property Type
        </label>
        <div className="space-y-1">
          {PROPERTY_TYPES.map((t) => (
            <button
              key={t.value}
              onClick={() => updateFilters("propertyType", t.value)}
              className={cn(
                "w-full text-left px-3 h-9 rounded-xl text-sm transition-all",
                initialFilters.propertyType === t.value ||
                  (!initialFilters.propertyType && t.value === "")
                  ? "bg-[#c9a96e]/20 font-medium text-[#c9a96e]"
                  : "text-white/60 hover:bg-white/10 hover:text-white"
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Bedrooms */}
      <div>
        <label className="text-xs font-medium text-white/50 uppercase tracking-wider mb-2 block">
          Bedrooms
        </label>
        <div className="flex gap-1.5 flex-wrap">
          {BEDROOMS.map((b) => (
            <button
              key={b.value}
              onClick={() => updateFilters("minBedrooms", b.value)}
              className={cn(
                "h-9 px-4 rounded-xl text-sm font-medium border transition-all",
                initialFilters.minBedrooms === b.value ||
                  (!initialFilters.minBedrooms && b.value === "")
                  ? "bg-[#c9a96e] text-[#1a1410] border-[#c9a96e]"
                  : "border-white/15 text-white/60 hover:border-[#c9a96e]/50 hover:text-white"
              )}
            >
              {b.label}
            </button>
          ))}
        </div>
      </div>

      {/* Featured toggle */}
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-white/80">Featured only</label>
        <button
          role="switch"
          aria-checked={initialFilters.featured === "true"}
          onClick={() =>
            updateFilters(
              "featured",
              initialFilters.featured === "true" ? "" : "true"
            )
          }
          className={cn(
            "relative h-6 w-11 rounded-full border-2 transition-all duration-200",
            initialFilters.featured === "true"
              ? "bg-[#c9a96e] border-[#c9a96e]"
              : "bg-white/10 border-white/20"
          )}
        >
          <span
            className={cn(
              "absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform duration-200",
              initialFilters.featured === "true" ? "translate-x-5" : "translate-x-0.5"
            )}
          />
        </button>
      </div>
    </div>
  );
}
