import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { prisma } from "@fano/db";
import { PropertyForm } from "../_components/property-form";

export const metadata: Metadata = { title: "Edit Property" };

export default async function EditPropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [property, agents] = await Promise.all([
    prisma.property.findUnique({ where: { id } }),
    prisma.agent.findMany({
      where: { active: true },
      select: { id: true, firstName: true, lastName: true },
    }),
  ]);

  if (!property) notFound();

  return (
    <div className="p-6 lg:p-8 max-w-3xl space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/properties" className="h-9 w-9 rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-xl font-semibold text-foreground [letter-spacing:-0.02em]">Edit Property</h1>
          <p className="text-muted-foreground text-sm truncate">{property.title}</p>
        </div>
      </div>

      <PropertyForm
        agents={agents}
        propertyId={property.id}
        defaultValues={{
          title: property.title,
          description: property.description,
          propertyType: property.propertyType,
          listingType: property.listingType,
          status: property.status,
          price: parseFloat(property.price.toString()),
          currency: property.currency,
          location: property.location,
          city: property.city,
          state: property.state ?? undefined,
          country: property.country,
          bedrooms: property.bedrooms,
          bathrooms: property.bathrooms,
          sqft: property.sqft,
          coverImage: property.coverImage,
          featured: property.featured,
          published: property.published,
          agentId: property.agentId ?? undefined,
          metaTitle: property.metaTitle ?? undefined,
          metaDescription: property.metaDescription ?? undefined,
        }}
      />
    </div>
  );
}
