"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Search, MapPin, Home, DollarSign } from "lucide-react";
import { cn } from "@fano/utils";

const PROPERTY_TYPES = [
  "All Types",
  "Apartment",
  "Villa",
  "House",
  "Penthouse",
  "Commercial",
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
    if (listingType !== "Buy") params.set("listingType", listingType.toLowerCase());
    if (location) params.set("search", location);
    if (propertyType !== "All Types") params.set("propertyType", propertyType.toLowerCase());
    router.push(`/properties?${params.toString()}`);
  }

  return (
    <section className="bg-white py-0">
      <div className="container-site">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="-mt-8 relative z-10 bg-white rounded-2xl shadow-2xl border border-border p-6 lg:p-8"
        >
          {/* Listing type tabs */}
          <div className="flex gap-1 p-1 bg-zinc-100 rounded-xl w-fit mb-6">
            {LISTING_TYPES.map((type) => (
              <button
                key={type}
                onClick={() => setListingType(type)}
                className={cn(
                  "px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  listingType === type
                    ? "bg-[#1a1410] text-white shadow-sm"
                    : "text-zinc-600 hover:text-[#1a1410]"
                )}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Search form */}
          <form onSubmit={handleSearch}>
            <div className="flex flex-col lg:flex-row gap-3">
              {/* Location */}
              <div className="flex-1 relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                <input
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
                className="h-14 px-8 rounded-xl bg-[#1a1410] text-white font-medium text-sm flex items-center gap-2 hover:bg-[#2a2118] transition-colors whitespace-nowrap"
              >
                <Search className="h-4 w-4" />
                Search
              </button>
            </div>
          </form>

          {/* Quick links */}
          <div className="mt-5 flex flex-wrap gap-2">
            <span className="text-xs text-zinc-400">Popular:</span>
            {["Dubai", "Abu Dhabi", "London", "Paris", "Amsterdam"].map((city) => (
              <button
                key={city}
                type="button"
                onClick={() => {
                  setLocation(city);
                  router.push(`/properties?search=${city}`);
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
