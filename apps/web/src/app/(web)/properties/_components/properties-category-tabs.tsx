import Link from "next/link";
import { cn } from "@fano/utils";

interface PropertiesCategoryTabsProps {
  commercial: boolean;
  search?: string;
  listingType?: string;
}

export function PropertiesCategoryTabs({ commercial, search, listingType }: PropertiesCategoryTabsProps) {
  const href = (toCommercial: boolean) => {
    const params = new URLSearchParams();
    if (toCommercial) params.set("category", "commercial");
    if (search) params.set("search", search);
    if (listingType) params.set("listingType", listingType);
    const qs = params.toString();
    return qs ? `/properties?${qs}` : "/properties";
  };

  return (
    <div className="inline-flex rounded-full border border-border p-1 bg-zinc-50 mb-8" role="tablist" aria-label="Property category">
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
  );
}
