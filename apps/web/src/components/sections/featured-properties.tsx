import React from "react";
import Link from "next/link";
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
    <section className="section-y" id="discover">
      <div className="container-site">
        <div className="mb-12 flex flex-col gap-6 lg:mb-16 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            eyebrow="Selected by Fano"
            title="Spaces with distinction."
            description="A short list of residences and workspaces our advisors would show first, each verified with the developer and priced in full."
          />
          <Link href="/properties" className="link-rule shrink-0">View all listings</Link>
        </div>

        {properties.length === 0 ? (
          <div className="py-24 text-center text-[#A39886]">
            <p className="text-lg">No featured properties yet.</p>
          </div>
        ) : (
          <AnimateStagger className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 xl:grid-cols-3">
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
