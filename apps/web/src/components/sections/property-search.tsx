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
    <section className="bg-surface py-8 lg:py-10" aria-label="Find your property">
      <div className="container-site">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative z-10 border-b border-[#D9CFC2] pb-7 lg:pb-9"
        >
          {/* Listing type tabs */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-5">
          <p className="cinema-eyebrow text-[#8C6A47]">Your next chapter starts here</p>
          <div className="flex gap-1 rounded-full border border-[#D9CFC2] p-1" role="group" aria-label="Listing type">
            {LISTING_TYPES.map((type) => (
              <button
                key={type}
                type="button"
                aria-pressed={listingType === type}
                onClick={() => setListingType(type)}
                className={cn(
                  "px-5 py-2 rounded-full text-xs font-medium transition-all duration-200",
                  listingType === type
                    ? "bg-[#2B2520] text-white shadow-sm"
                    : "text-zinc-600 hover:text-[#2B2520]"
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
              {/* Location */}
              <div className="flex-1 relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                <input
                  aria-label="City, neighborhood, or address"
                  type="text"
                  placeholder="City, neighborhood, or address"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full h-14 pl-11 pr-4 rounded-xl border border-border bg-zinc-50 text-black placeholder:text-zinc-400 text-sm focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-transparent transition-all hover:border-zinc-300"
                />
              </div>

              {/* Property Type */}
              <div className="relative w-full lg:w-52">
                <Home className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 pointer-events-none" />
                <select
                  aria-label="Property type"
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full h-14 pl-11 pr-4 rounded-xl border border-border bg-zinc-50 text-black text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-transparent transition-all hover:border-zinc-300"
                >
                  {PROPERTY_TYPES.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>

              {/* Search button */}
              <button
                type="submit"
                className="h-14 px-8 rounded-xl bg-gradient-to-b from-[#3A322B] to-[#2B2520] text-[#F4EFEA] shadow-[0_10px_24px_-10px_rgba(43,37,32,.6)] hover:-translate-y-px hover:shadow-[0_16px_30px_-12px_rgba(43,37,32,.7)] font-medium text-sm flex items-center gap-2 transition-colors whitespace-nowrap"
              >
                <Search className="h-4 w-4" />
                Find a property
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </form>

          {/* Quick links */}
          <div className="mt-5 flex flex-wrap gap-2">
            <span className="text-xs text-zinc-400">Popular:</span>
            {["Business Bay", "Downtown Dubai", "Sheikh Zayed Road", "Dubai Marina"].map((city) => (
              <button
                key={city}
                type="button"
                onClick={() => {
                  setLocation(city);
                  router.push(`/properties?search=${encodeURIComponent(city)}`);
                }}
                className="text-xs text-zinc-600 hover:text-black transition-colors underline underline-offset-2"
              >
                {city}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
