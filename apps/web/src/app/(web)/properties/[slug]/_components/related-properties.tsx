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
    unitType?: string | null;
    priceUnit?: string | null;
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
      <p className="eyebrow mb-3">You may also like</p>
      <h2 className="mb-10 font-display text-[clamp(30px,3.6vw,44px)] font-normal leading-tight text-[#2B2520]">Similar properties</h2>
      <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {properties.map((p) => (
          <PropertyCard
            key={p.id}
            id={p.id}
            title={p.title}
            slug={p.slug}
            propertyType={p.propertyType}
            unitType={p.unitType}
            priceUnit={p.priceUnit}
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
