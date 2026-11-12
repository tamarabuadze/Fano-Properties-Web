"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, Home, ArrowUpRight } from "lucide-react";
import { cn } from "@fano/utils";

const PROPERTY_TYPES = ["All Types", "Apartment", "Villa", "House", "Penthouse", "Commercial", "Offices"];
const LISTING_TYPES = ["Buy", "Rent", "Lease"];

// A single hairline row under the hero: listing toggle, search field, button,
// then the popular areas as plain text links
export function PropertySearchSection() {
  const router = useRouter();
  const [listingType, setListingType] = useState("Buy");
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("All Types");

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    params.set("listingType", listingType === "Buy" ? "sale" : listingType.toLowerCase());
    if (location) params.set("search", location);
    if (propertyType === "Offices") {
      params.set("category", "commercial");
      params.set("unitType", "offices");
    } else if (propertyType !== "All Types") {
      params.set("propertyType", propertyType.toLowerCase());
    }
    router.push(`/properties?${params.toString()}`);
  }

  return (
    <section aria-label="Find your property">
      <div className="container-site">
        <form onSubmit={handleSearch} className="border-y border-[#C5BAAB]/45 py-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <div className="flex shrink-0 gap-1 rounded-full border border-[#C5BAAB]/60 p-1" role="group" aria-label="Listing type">
              {LISTING_TYPES.map((type) => (
                <button
                  key={type}
                  type="button"
                  aria-pressed={listingType === type}
                  onClick={() => setListingType(type)}
                  className={cn(
                    "rounded-full px-4 py-1.5 text-[12px] transition-colors",
                    listingType === type ? "bg-[#E2A862] font-medium text-[#2B2520]" : "text-[#2B2520]/65 hover:text-[#2B2520]"
                  )}
                >
                  {type}
                </button>
              ))}
            </div>

            <div className="relative flex-1">
              <MapPin className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#A39886]" aria-hidden="true" />
              <input
                aria-label="City, neighborhood, or address"
                type="text"
                placeholder="Search a community or building…"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="h-11 w-full rounded-full border border-[#C5BAAB]/60 bg-transparent pl-11 pr-4 text-[14px] text-[#2B2520] placeholder:text-[#A39886] focus:border-[#E2A862] focus:outline-none"
              />
            </div>

            <div className="relative lg:w-48">
              <Home className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#A39886]" aria-hidden="true" />
              <select
                aria-label="Property type"
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="h-11 w-full appearance-none rounded-full border border-[#C5BAAB]/60 bg-transparent pl-11 pr-4 text-[14px] text-[#2B2520] focus:border-[#E2A862] focus:outline-none"
              >
                {PROPERTY_TYPES.map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>

            <button type="submit" className="btn-pill shrink-0">
              <Search className="h-4 w-4" aria-hidden="true" />
              Search
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px]">
            <span className="eyebrow basis-full sm:basis-auto">Popular</span>
            {["Business Bay", "Downtown Dubai", "Sheikh Zayed Road", "Dubai Marina"].map((city) => (
              <button
                key={city}
                type="button"
                onClick={() => router.push(`/properties?search=${encodeURIComponent(city)}`)}
                className="text-[#2B2520]/65 underline-offset-4 transition-colors hover:text-[#2B2520] hover:underline"
              >
                {city}
              </button>
            ))}
          </div>
        </form>
      </div>
    </section>
  );
}
