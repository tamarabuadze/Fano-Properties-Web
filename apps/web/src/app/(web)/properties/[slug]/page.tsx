import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPropertyBySlug, getRelatedProperties, incrementPropertyViewCount } from "@/lib/queries/properties";
import { PropertyGallery } from "./_components/property-gallery";
import { PropertyOverview } from "./_components/property-overview";
import { PropertyAmenities } from "./_components/property-amenities";
import { PropertyInquiryForm } from "./_components/property-inquiry-form";
import { RelatedProperties } from "./_components/related-properties";
import { PropertyAgentCard } from "./_components/property-agent-card";

interface PropertyPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PropertyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);
  if (!property) return { title: "Property Not Found" };

  return {
    title: property.metaTitle ?? property.title,
    description: property.metaDescription ?? property.description.slice(0, 160),
    openGraph: {
      title: property.title,
      description: property.description.slice(0, 160),
      images: [{ url: property.coverImage }],
    },
  };
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);
  if (!property || !property.published) notFound();

  const related = await getRelatedProperties(property.id, property.propertyType, 3);
  await incrementPropertyViewCount(property.id);

  const allImages = [
    property.coverImage,
    ...property.images.map((img) => img.url),
  ];

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Gallery */}
      <PropertyGallery images={allImages} title={property.title} />

      <div className="container-site py-12">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-12">
            <PropertyOverview property={property as never} />
            {property.amenities.length > 0 && (
              <PropertyAmenities amenities={property.amenities} />
            )}
          </div>

          {/* Sticky sidebar */}
          <div className="space-y-6">
            <div className="sticky top-24 space-y-6">
              <PropertyInquiryForm propertyId={property.id} propertyTitle={property.title} />
              {property.agent && (
                <PropertyAgentCard agent={property.agent as never} />
              )}
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-20 pt-12 border-t border-border">
            <RelatedProperties properties={related as never} />
          </div>
        )}
      </div>
    </div>
  );
}
