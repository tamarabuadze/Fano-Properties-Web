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
            id={p.id}
            title={p.title}
            slug={p.slug}
            propertyType={p.propertyType}
            listingType={p.listingType}
            price={Number(p.price)}
            currency={p.currency}
            location={p.location}
            city={p.city}
            bedrooms={p.bedrooms}
            bathrooms={p.bathrooms}
            sqft={p.sqft}
            coverImage={p.coverImage}
            featured={p.featured}
          />
        ))}
      </div>
    </div>
  );
}
