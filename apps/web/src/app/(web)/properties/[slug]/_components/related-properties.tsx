import { PropertyCard } from "@fano/ui";

interface RelatedPropertiesProps {
  properties: Array<{
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
  }>;
}

export function RelatedProperties({ properties }: RelatedPropertiesProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-black mb-6">Similar Properties</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((p) => (
          <PropertyCard
            key={p.id}
            {...p}
            price={typeof p.price === "string" ? parseFloat(p.price) : p.price}
          />
        ))}
      </div>
    </div>
  );
}
