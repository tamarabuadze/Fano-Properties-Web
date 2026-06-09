import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PropertyCard } from "@fano/ui";
import { SectionHeader } from "@/components/shared/section-header";
import { AnimateStagger } from "@/components/shared/animate-stagger";

interface Property {
  id: string;
  title: string;
  slug: string;
  propertyType: string;
  listingType: string;
  price: number | string;
  currency: string;
  location: string;
  city: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  coverImage: string;
  featured: boolean;
}

interface FeaturedPropertiesProps {
  properties: Property[];
}

export function FeaturedPropertiesSection({ properties }: FeaturedPropertiesProps) {
  return (
    <section className="section-y bg-white">
      <div className="container-site">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <SectionHeader
            eyebrow="Handpicked"
            title="Featured Properties"
            description="A curated selection of premium homes and investment opportunities."
          />
          <Link
            href="/properties?featured=true"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#9a7957] hover:text-[#7e6244] hover:gap-3 transition-all group shrink-0"
          >
            View all listings
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {properties.length === 0 ? (
          <div className="py-24 text-center text-zinc-400">
            <p className="text-lg">No featured properties yet.</p>
          </div>
        ) : (
          <AnimateStagger className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard
                key={property.id}
                {...property}
                price={typeof property.price === "string" ? parseFloat(property.price) : property.price}
              />
            ))}
          </AnimateStagger>
        )}
      </div>
    </section>
  );
}
