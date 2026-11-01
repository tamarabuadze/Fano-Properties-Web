import type { Metadata } from "next";
import { Suspense } from "react";
import { PropertiesGrid } from "./_components/properties-grid";
import { PropertiesFilters } from "./_components/properties-filters";
import { PropertiesHeader } from "./_components/properties-header";
import { PropertiesCategoryTabs } from "./_components/properties-category-tabs";

export const metadata: Metadata = {
  title: "Properties — Browse Listings",
  description: "Browse our full portfolio of premium properties for sale and rent.",
};

export const revalidate = 300;

interface PropertiesPageProps {
  searchParams: Promise<{
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
  }>;
}

export default async function PropertiesPage({ searchParams }: PropertiesPageProps) {
  const raw = await searchParams;
  // Older links use propertyType=commercial; they open the Commercial tab
  const isCommercial = raw.category === "commercial" || raw.propertyType === "commercial";
  const params = {
    ...raw,
    category: isCommercial ? "commercial" : undefined,
    propertyType: isCommercial ? undefined : raw.propertyType,
    unitType: isCommercial ? raw.unitType : undefined,
    // Commercial is Buy or Lease only, and opens on Buy
    listingType: isCommercial ? (raw.listingType === "lease" ? "lease" : "sale") : raw.listingType,
    minBedrooms: isCommercial ? undefined : raw.minBedrooms,
  };
  return (
    <div className="min-h-screen bg-white pt-20">
      <PropertiesHeader />
      <div className="container-site py-10">
        <PropertiesCategoryTabs commercial={isCommercial} search={params.search} listingType={params.listingType} />
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="w-full lg:w-72 shrink-0">
            <PropertiesFilters initialFilters={params} />
          </aside>
          <main className="flex-1 min-w-0">
            <Suspense fallback={<PropertiesGridSkeleton />}>
              <PropertiesGrid filters={params} />
            </Suspense>
          </main>
        </div>
      </div>
    </div>
  );
}

function PropertiesGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="rounded-2xl bg-zinc-100 animate-pulse h-80" />
      ))}
    </div>
  );
}
