import { PropertyCard } from "@fano/ui";
import { getProperties } from "@/lib/queries/properties";

interface PropertiesGridProps {
  filters: {
    search?: string;
    category?: string;
    unitType?: string;
    propertyType?: string;
    listingType?: string;
    city?: string;
    minPrice?: string;
    maxPrice?: string;
    minBedrooms?: string;
    featured?: string;
    page?: string;
    sortBy?: string;
  };
}

export async function PropertiesGrid({ filters }: PropertiesGridProps) {
  const result = await getProperties({
    search: filters.search,
    category: filters.category as never,
    unitType: filters.unitType as never,
    propertyType: filters.propertyType as never,
    listingType: filters.listingType as never,
    city: filters.city,
    minPrice: filters.minPrice ? parseFloat(filters.minPrice) : undefined,
    maxPrice: filters.maxPrice ? parseFloat(filters.maxPrice) : undefined,
    minBedrooms: filters.minBedrooms ? parseInt(filters.minBedrooms) : undefined,
    featured: filters.featured === "true" ? true : undefined,
    page: filters.page ? parseInt(filters.page) : 1,
    sortBy: filters.sortBy as never,
  });

  if (result.data.length === 0) {
    return (
      <div className="py-24 text-center">
        <p className="font-display text-[32px] font-normal leading-tight text-[#2B2520]">No properties found</p>
        <p className="mt-3 text-[14px] text-[#2B2520]/60">Try adjusting your filters or search terms.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between border-b border-[#C5BAAB]/40 pb-4">
        <p className="eyebrow">
          {result.total} {result.total === 1 ? "property" : "properties"}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 xl:grid-cols-3">
        {result.data.map((property) => (
          <PropertyCard
            key={property.id}
            id={property.id}
            title={property.title}
            slug={property.slug}
            propertyType={property.propertyType}
            unitType={property.unitType}
            priceUnit={property.priceUnit}
            listingType={property.listingType}
            price={parseFloat(property.price.toString())}
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
      </div>

      {result.totalPages > 1 && (
        <div className="mt-14 flex justify-center border-t border-[#C5BAAB]/40 pt-6">
          <p className="text-[12px] tracking-[0.1em] text-[#2B2520]/55">
            Page {result.page} of {result.totalPages}
          </p>
        </div>
      )}
    </div>
  );
}
