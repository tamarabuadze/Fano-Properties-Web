"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Search, MapPin, Home, ArrowUpRight } from "lucide-react";
import { cn } from "@fano/utils";

const PROPERTY_TYPES = [
  "All Types",
  "Apartment",
  "Villa",
  "House",
  "Penthouse",
  "Commercial",
  "Offices",
];

const LISTING_TYPES = ["Buy", "Rent", "Lease"];

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
    <section
      className="relative bg-gradient-to-b from-[#2B2520]/75 via-[#2B2520]/18 to-transparent pb-10 lg:pb-16"
      aria-label="Find your property"
    >
      <div className="container-site -mt-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative rounded-[6px] overflow-hidden bg-[#F4EFEA] border border-[#D9CFC2]/70 shadow-[0_24px_64px_-20px_rgba(43,37,32,.45),0_4px_16px_-6px_rgba(43,37,32,.14)]"
        >
          {/* Gold accent line at top */}
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#E2A862] to-transparent" />

          <div className="p-6 lg:p-8">
            {/* Header row */}
            <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
              <p className="cinema-eyebrow text-[#8C6A47]">Your next chapter starts here</p>
              <div
                className="flex gap-1 rounded-full border border-[#D9CFC2] bg-[#F4EFEA]/80 p-1"
                role="group"
                aria-label="Listing type"
              >
                {LISTING_TYPES.map((type) => (
                  <button
                    key={type}
                    type="button"
                    aria-pressed={listingType === type}
                    onClick={() => setListingType(type)}
                    className={cn(
                      "px-5 py-2 rounded-full text-xs font-medium transition-all duration-200",
                      listingType === type
                        ? "bg-[#2B2520] text-[#F4EFEA] shadow-sm"
                        : "text-[#7A6E62] hover:text-[#2B2520]"
                    )}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Search form */}
            <form onSubmit={handleSearch}>
              <div className="flex flex-col lg:flex-row gap-3">
                <div className="flex-1 relative">
                  <MapPin
                    className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#A39886] pointer-events-none"
                    aria-hidden="true"
                  />
                  <input
                    aria-label="City, neighborhood, or address"
                    type="text"
                    placeholder="City, neighborhood, or address"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full h-14 pl-11 pr-4 rounded-xl border border-[#D9CFC2] bg-[#FAF7F4] text-[#2B2520] placeholder:text-[#A39886] text-sm focus:outline-none focus:ring-2 focus:ring-[#E2A862]/30 focus:border-[#E2A862]/60 transition-all hover:border-[#C5BAAB]"
                  />
                </div>

                <div className="relative w-full lg:w-52">
                  <Home
                    className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#A39886] pointer-events-none"
                    aria-hidden="true"
                  />
                  <select
                    aria-label="Property type"
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full h-14 pl-11 pr-4 rounded-xl border border-[#D9CFC2] bg-[#FAF7F4] text-[#2B2520] text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-[#E2A862]/30 focus:border-[#E2A862]/60 transition-all hover:border-[#C5BAAB]"
                  >
                    {PROPERTY_TYPES.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  className="h-14 px-8 rounded-xl bg-gradient-to-b from-[#3A322B] to-[#2B2520] text-[#F4EFEA] shadow-[0_8px_24px_-8px_rgba(43,37,32,.55)] hover:-translate-y-0.5 hover:shadow-[0_14px_32px_-10px_rgba(43,37,32,.65)] font-medium text-sm flex items-center justify-center gap-2 transition-all whitespace-nowrap"
                >
                  <Search className="h-4 w-4" aria-hidden="true" />
                  Find a property
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </form>

            {/* Popular quick links */}
            <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-[#D9CFC2]/60 pt-4">
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#A39886]">
                Popular:
              </span>
              {["Business Bay", "Downtown Dubai", "Sheikh Zayed Road", "Dubai Marina"].map((city) => (
                <button
                  key={city}
                  type="button"
                  onClick={() => {
                    setLocation(city);
                    router.push(`/properties?search=${encodeURIComponent(city)}`);
                  }}
                  className="text-xs text-[#6B5038] hover:text-[#2B2520] hover:bg-[#E2A862]/12 px-3 py-1.5 rounded-full border border-transparent hover:border-[#E2A862]/30 transition-all"
                >
                  {city}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
