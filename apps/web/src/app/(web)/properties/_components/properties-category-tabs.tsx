import Link from "next/link";
import { cn } from "@fano/utils";

interface PropertiesCategoryTabsProps {
  commercial: boolean;
  search?: string;
  listingType?: string;
  unitType?: string;
}

export function PropertiesCategoryTabs({ commercial, search, listingType, unitType }: PropertiesCategoryTabsProps) {
  const href = (toCommercial: boolean, toListingType?: string) => {
    const params = new URLSearchParams();
    if (toCommercial) params.set("category", "commercial");
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
        { label: "Residential", value: false },
        { label: "Commercial", value: true },
      ].map((tab) => (
        <Link
          key={tab.label}
          href={href(tab.value)}
          role="tab"
          aria-selected={commercial === tab.value}
          scroll={false}
          className={cn(
            "px-6 h-10 inline-flex items-center rounded-full text-sm font-medium transition-colors",
            commercial === tab.value ? "bg-[#1a1410] text-[#c9a96e]" : "text-zinc-600 hover:text-[#1a1410]"
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
            href={href(true, tab.value)}
            role="tab"
            aria-selected={listingType === tab.value}
            scroll={false}
            className={cn(
              "px-6 h-10 inline-flex items-center rounded-full text-sm font-medium transition-colors",
              listingType === tab.value ? "bg-[#c9a96e] text-[#1a1410]" : "text-zinc-600 hover:text-[#1a1410]"
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
