import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { after } from "next/server";
import { getPropertyBySlug, getRelatedProperties, incrementPropertyViewCount } from "@/lib/queries/properties";
import { PropertyGallery } from "./_components/property-gallery";
import { PropertyOverview } from "./_components/property-overview";
import { PropertyAmenities } from "./_components/property-amenities";
import { PropertyInquiryForm } from "./_components/property-inquiry-form";
import { RelatedProperties } from "./_components/related-properties";
import { PropertyAgentCard } from "./_components/property-agent-card";
import { RoiCalculator } from "@/components/roi/roi-calculator";
import { totalPrice, splitListingTitle } from "@fano/utils";

interface PropertyPageProps {
  params: Promise<{ slug: string }>;
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://fanoproperties.com";

export async function generateMetadata({ params }: PropertyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);
  if (!property || !property.published) return { title: "Property Not Found", robots: { index: false } };

  const url = `${SITE_URL}/properties/${slug}`;
  return {
    title: property.metaTitle?.trim() || property.title,
    description: property.metaDescription?.trim() || property.description.slice(0, 160),
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title: property.title,
      description: property.description.slice(0, 160),
      images: [{ url: property.coverImage, width: 1200, height: 800, alt: property.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: property.title,
      description: property.description.slice(0, 160),
      images: [property.coverImage],
    },
  };
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);
  if (!property || !property.published) notFound();

  const related = await getRelatedProperties(property.id, property.propertyType, 3);
  // Counted after the response is sent, so visitors do not wait on it
  after(() => incrementPropertyViewCount(property.id).catch(() => {}));

  const allImages = [
    property.coverImage,
    ...property.images.map((img) => img.url),
  ];

  const fullPrice = totalPrice(Number(property.price), property.priceUnit, property.sqft);
  const displayTitle = splitListingTitle(property.title).headline;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: property.title,
    description: property.description.slice(0, 300),
    url: `${SITE_URL}/properties/${slug}`,
    image: allImages,
    offers: {
      "@type": "Offer",
      price: fullPrice,
      priceCurrency: property.currency,
      availability: "https://schema.org/InStock",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: property.location,
      addressLocality: property.city,
      addressCountry: property.country ?? "AE",
    },
    ...(property.propertyType !== "commercial" && {
      numberOfRooms: property.bedrooms,
      numberOfBathroomsTotal: property.bathrooms,
    }),
    floorSize: {
      "@type": "QuantitativeValue",
      value: property.sqft,
      unitCode: "SqFt",
    },
  };

  return (
    <div className="min-h-screen bg-lx-page pt-20 lg:pt-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Gallery */}
      <PropertyGallery images={allImages} title={property.title} />

      <div className="container-site py-12 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-3 lg:gap-16">
          {/* Main content */}
          <div className="space-y-16 lg:col-span-2">
            <PropertyOverview property={property as never} />
            {property.amenities.length > 0 && (
              <PropertyAmenities amenities={property.amenities} />
            )}
            {property.listingType === "sale" && fullPrice > 0 && (
              <section id="roi" className="scroll-mt-28">
                <p className="lx-eyebrow mb-4">Investor tools</p>
                <h2 className="font-display text-[28px] font-normal leading-tight text-lx-text">Investment calculator</h2>
                <p className="mb-8 mt-3 max-w-lg text-[14px] leading-[1.8] text-lx-text/65">
                  Estimate the rental yield and return on this property. Adjust any figure to match your plans.
                </p>
                <RoiCalculator
                  variant="compact"
                  price={fullPrice}
                  sizeSqft={property.sqft}
                  propertyId={property.id}
                  propertyTitle={displayTitle}
                />
              </section>
            )}
          </div>

          {/* Sticky sidebar */}
          <div className="space-y-6">
            <div className="sticky top-28 space-y-6">
              <PropertyInquiryForm propertyId={property.id} propertyTitle={displayTitle} />
              {property.agent && (
                <PropertyAgentCard agent={property.agent as never} />
              )}
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-24 border-t border-lx-line pt-16">
            <RelatedProperties properties={related as never} />
          </div>
        )}
      </div>
    </div>
  );
}
