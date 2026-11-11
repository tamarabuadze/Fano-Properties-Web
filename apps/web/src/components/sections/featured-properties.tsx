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
  unitType?: string | null;
  priceUnit?: string | null;
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
    <section className="section-y">
      <div className="container-site">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="h-px w-6 bg-[#E2A862]" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E2A862]">New to Market</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-semibold text-[#2B2520] leading-tight">
              Be the first.
            </h2>
          </div>
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#8C6A47] hover:text-[#6B5038] hover:gap-3 transition-all group shrink-0"
          >
            See everything on the market
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
                id={property.id}
                title={property.title}
                slug={property.slug}
                propertyType={property.propertyType}
                unitType={property.unitType}
                priceUnit={property.priceUnit}
                listingType={property.listingType}
                price={Number(property.price)}
                currency={property.currency}
                location={property.location}
                city={property.city}
                bedrooms={property.bedrooms}
                bathrooms={property.bathrooms}
                sqft={property.sqft}
                coverImage={property.coverImage}
                featured={property.featured}
              />
            ))}
          </AnimateStagger>
        )}
      </div>
    </section>
  );
}
