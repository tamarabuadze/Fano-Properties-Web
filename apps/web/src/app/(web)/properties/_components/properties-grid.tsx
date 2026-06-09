import { PropertyCard } from "@fano/ui";
import { getProperties } from "@/lib/queries/properties";

interface PropertiesGridProps {
  filters: {
    search?: string;
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
        <p className="text-2xl font-semibold text-black mb-3">No properties found</p>
        <p className="text-zinc-500">Try adjusting your filters or search terms.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-zinc-500">
          <span className="font-semibold text-black">{result.total}</span> properties found
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {result.data.map((property) => (
          <PropertyCard
            key={property.id}
            id={property.id}
            title={property.title}
            slug={property.slug}
            propertyType={property.propertyType}
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
        <div className="mt-12 flex justify-center">
          <p className="text-sm text-zinc-500">
            Page {result.page} of {result.totalPages}
          </p>
        </div>
      )}
    </div>
  );
}
