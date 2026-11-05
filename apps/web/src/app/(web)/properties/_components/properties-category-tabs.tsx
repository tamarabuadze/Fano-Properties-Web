import Link from "next/link";
import { cn } from "@fano/utils";

type Category = "all" | "residential" | "commercial";

interface PropertiesCategoryTabsProps {
  category: Category;
  search?: string;
  listingType?: string;
  unitType?: string;
}

export function PropertiesCategoryTabs({ category, search, listingType, unitType }: PropertiesCategoryTabsProps) {
  const commercial = category === "commercial";
  const href = (toCategory: Category, toListingType?: string) => {
    const toCommercial = toCategory === "commercial";
    const params = new URLSearchParams();
    if (toCategory !== "all") params.set("category", toCategory);
    if (search) params.set("search", search);
    if (toListingType) params.set("listingType", toListingType);
    if (toCommercial && unitType) params.set("unitType", unitType);
    const qs = params.toString();
    return qs ? `/properties?${qs}` : "/properties";
  };

  return (
    <div className="flex flex-wrap items-center gap-3 mb-8">
    <div className="inline-flex rounded-full border border-border p-1 bg-zinc-50" role="tablist" aria-label="Property category">
      {[
        { label: "All", value: "all" as const },
        { label: "Residential", value: "residential" as const },
        { label: "Commercial", value: "commercial" as const },
      ].map((tab) => (
        <Link
          key={tab.label}
          href={href(tab.value)}
          role="tab"
          aria-selected={category === tab.value}
          scroll={false}
          className={cn(
            "px-6 h-10 inline-flex items-center rounded-full text-sm font-medium transition-colors",
            category === tab.value ? "bg-[#2B2520] text-[#E2A862]" : "text-zinc-600 hover:text-[#2B2520]"
          )}
        >
          {tab.label}
        </Link>
      ))}
    </div>

    {commercial && (
      <div className="inline-flex rounded-full border border-border p-1 bg-zinc-50" role="tablist" aria-label="Buy or lease">
        {[
          { label: "Buy", value: "sale" },
          { label: "Lease", value: "lease" },
        ].map((tab) => (
          <Link
            key={tab.value}
            href={href("commercial", tab.value)}
            role="tab"
            aria-selected={listingType === tab.value}
            scroll={false}
            className={cn(
              "px-6 h-10 inline-flex items-center rounded-full text-sm font-medium transition-colors",
              listingType === tab.value ? "bg-[#E2A862] text-[#2B2520]" : "text-zinc-600 hover:text-[#2B2520]"
            )}
          >
            {tab.label}
          </Link>
        ))}
      </div>
    )}
    </div>
  );
}
