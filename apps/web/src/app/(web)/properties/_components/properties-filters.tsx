"use client";

import React, { useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Search } from "lucide-react";
import { COMMERCIAL_UNIT_TYPES, cn } from "@fano/utils";

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
  { label: "Land", value: "land" },
];

const UNIT_TYPES = [{ label: "Any Unit", value: "" }, { label: "Offices", value: "offices" }, ...COMMERCIAL_UNIT_TYPES];

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

// A quiet filter column: tracked labels, hairline-separated groups, outline pills
// and plain text options. No box, no fill; the active choice is solid espresso.
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
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [initialFilters, pathname, router]
  );

  const isCommercial = initialFilters.category === "commercial";

  const clearFilters = () =>
    router.replace(
      isCommercial ? `${pathname}?category=commercial&listingType=${initialFilters.listingType ?? "sale"}` : pathname,
      { scroll: false }
    );

  const hasFilters = Object.entries(initialFilters).some(([k, v]) => k !== "category" && !(isCommercial && k === "listingType") && Boolean(v));

  const pill = (active: boolean) =>
    cn(
      "h-9 rounded-full border px-4 text-[12px] transition-colors",
      active
        ? "border-[#2B2520] bg-[#2B2520] text-[#F4EFEA]"
        : "border-[#C5BAAB]/60 text-[#2B2520]/70 hover:border-[#2B2520] hover:text-[#2B2520]"
    );

  const option = (active: boolean) =>
    cn(
      "flex h-8 w-full items-center gap-3 text-left text-[13px] transition-colors",
      active ? "text-[#2B2520]" : "text-[#2B2520]/60 hover:text-[#2B2520]"
    );

  return (
    <div className="divide-y divide-[#C5BAAB]/40">
      <div className="flex items-center justify-between pb-5">
        <span className="eyebrow">Filters</span>
        {hasFilters && (
          <button
            onClick={clearFilters}
            className="text-[12px] text-[#2B2520]/55 underline-offset-4 transition-colors hover:text-[#2B2520] hover:underline"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Search */}
      <div className="py-5">
        <label className="mb-3 block font-label text-[10px] font-semibold uppercase tracking-[0.2em] text-[#2B2520]/55">
          Search
        </label>
        <div className="relative">
          <Search className="pointer-events-none absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-[#A39886]" aria-hidden="true" />
          <input
            type="text"
            defaultValue={initialFilters.search}
            placeholder="Location, title…"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                updateFilters("search", (e.target as HTMLInputElement).value);
              }
            }}
            className="h-10 w-full border-0 border-b border-[#C5BAAB]/60 bg-transparent pl-7 pr-0 text-[14px] text-[#2B2520] placeholder:text-[#A39886] focus:border-[#E2A862] focus:outline-none focus:ring-0"
          />
        </div>
      </div>

      {/* Listing Type (commercial uses the Buy / Lease tabs instead) */}
      {!isCommercial && <div className="py-5">
        <label className="mb-3 block font-label text-[10px] font-semibold uppercase tracking-[0.2em] text-[#2B2520]/55">
          Listing type
        </label>
        <div className="flex flex-wrap gap-2">
          {LISTING_TYPES.map((t) => (
            <button
              key={t.value}
              onClick={() => updateFilters("listingType", t.value)}
              className={pill(
                initialFilters.listingType === t.value ||
                  (!initialFilters.listingType && t.value === "")
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>}

      {/* Unit Type (commercial) */}
      {isCommercial && (
        <div className="py-5">
          <label className="mb-3 block font-label text-[10px] font-semibold uppercase tracking-[0.2em] text-[#2B2520]/55">
            Unit type
          </label>
          <div className="space-y-0.5">
            {UNIT_TYPES.map((t) => {
              const active = initialFilters.unitType === t.value || (!initialFilters.unitType && t.value === "");
              return (
                <button key={t.value} onClick={() => updateFilters("unitType", t.value)} className={option(active)}>
                  <span aria-hidden="true" className={cn("h-px transition-all", active ? "w-5 bg-[#E2A862]" : "w-0 bg-transparent")} />
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Property Type */}
      {!isCommercial && <div className="py-5">
        <label className="mb-3 block font-label text-[10px] font-semibold uppercase tracking-[0.2em] text-[#2B2520]/55">
          Property type
        </label>
        <div className="space-y-0.5">
          {PROPERTY_TYPES.map((t) => {
            const active = initialFilters.propertyType === t.value || (!initialFilters.propertyType && t.value === "");
            return (
              <button key={t.value} onClick={() => updateFilters("propertyType", t.value)} className={option(active)}>
                <span aria-hidden="true" className={cn("h-px transition-all", active ? "w-5 bg-[#E2A862]" : "w-0 bg-transparent")} />
                {t.label}
              </button>
            );
          })}
        </div>
      </div>}

      {/* Bedrooms */}
      {!isCommercial && <div className="py-5">
        <label className="mb-3 block font-label text-[10px] font-semibold uppercase tracking-[0.2em] text-[#2B2520]/55">
          Bedrooms
        </label>
        <div className="flex flex-wrap gap-2">
          {BEDROOMS.map((b) => (
            <button
              key={b.value}
              onClick={() => updateFilters("minBedrooms", b.value)}
              className={pill(
                initialFilters.minBedrooms === b.value ||
                  (!initialFilters.minBedrooms && b.value === "")
              )}
            >
              {b.label}
            </button>
          ))}
        </div>
      </div>}

      {/* Featured toggle */}
      <div className="flex items-center justify-between py-5">
        <label className="text-[13px] text-[#2B2520]">Featured only</label>
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
            "relative h-6 w-11 rounded-full border transition-colors duration-200",
            initialFilters.featured === "true"
              ? "border-[#2B2520] bg-[#2B2520]"
              : "border-[#C5BAAB] bg-transparent"
          )}
        >
          <span
            className={cn(
              "absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full transition-transform duration-200",
              initialFilters.featured === "true" ? "translate-x-[22px] bg-[#F4EFEA]" : "translate-x-[3px] bg-[#C5BAAB]"
            )}
          />
        </button>
      </div>
    </div>
  );
}
