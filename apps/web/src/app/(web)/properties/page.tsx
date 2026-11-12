import type { Metadata } from "next";
import { Suspense } from "react";
import { PropertiesGrid } from "./_components/properties-grid";
import { PropertiesFiltersPanel } from "./_components/properties-filters-panel";
import { PropertiesHeader } from "./_components/properties-header";
import { PropertiesCategoryTabs } from "./_components/properties-category-tabs";

const CATEGORY_META = {
  all: {
    title: "Properties for Sale & Rent in Dubai",
    description: "Browse residential and commercial properties for sale, rent and lease in Dubai, from off-plan offices in Business Bay to luxury homes.",
    canonical: "/properties",
  },
  residential: {
    title: "Residential Properties for Sale & Rent in Dubai",
    description: "Apartments, villas, townhouses and penthouses for sale and rent in Dubai, selected by Fano Properties.",
    canonical: "/properties?category=residential",
  },
  commercial: {
    title: "Commercial Properties & Offices for Sale in Dubai",
    description: "Grade A offices, shops and commercial space for sale and lease in Dubai, including off-plan towers in Business Bay and on Sheikh Zayed Road.",
    canonical: "/properties?category=commercial",
  },
};

function categoryOf(raw: { category?: string; propertyType?: string }) {
  // Older links use propertyType=commercial; they open the Commercial tab
  if (raw.category === "commercial" || raw.propertyType === "commercial") return "commercial" as const;
  if (raw.category === "residential") return "residential" as const;
  return "all" as const;
}

export async function generateMetadata({ searchParams }: PropertiesPageProps): Promise<Metadata> {
  const { title, description, canonical } = CATEGORY_META[categoryOf(await searchParams)];
  return { title, description, alternates: { canonical } };
}

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
  const category = categoryOf(raw);
  const isCommercial = category === "commercial";
  const params = {
    ...raw,
    category: category === "all" ? undefined : category,
    propertyType: isCommercial ? undefined : raw.propertyType,
    unitType: isCommercial ? raw.unitType : undefined,
    // Commercial is Buy or Lease only, and opens on Buy
    listingType: isCommercial ? (raw.listingType === "lease" ? "lease" : "sale") : raw.listingType,
    minBedrooms: isCommercial ? undefined : raw.minBedrooms,
  };
  return (
    <div className="min-h-screen pt-20">
      <PropertiesHeader />
      <div className="container-site py-12 lg:py-16">
        <PropertiesCategoryTabs category={category} search={params.search} listingType={params.listingType} unitType={params.unitType} />
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-14">
          <PropertiesFiltersPanel initialFilters={params} />
          <main className="min-w-0 flex-1">
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
    <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="aspect-[4/3] rounded-[4px] bg-[#E6DFD5]" />
          <div className="mt-5 h-5 w-3/4 rounded-[2px] bg-[#E6DFD5]" />
          <div className="mt-3 h-3 w-1/2 rounded-[2px] bg-[#E6DFD5]/70" />
        </div>
      ))}
    </div>
  );
}
