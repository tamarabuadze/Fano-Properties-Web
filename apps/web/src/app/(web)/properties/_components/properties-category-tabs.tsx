import Link from "next/link";
import { cn } from "@fano/utils";

type Category = "all" | "residential" | "commercial";

interface PropertiesCategoryTabsProps {
  category: Category;
  search?: string;
  listingType?: string;
  unitType?: string;
}

// Hairline pill groups: the active tab is solid espresso, the rest plain text
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

  const tabClass = (active: boolean) =>
    cn(
      "inline-flex h-10 items-center rounded-full px-5 text-[13px] transition-colors",
      active ? "bg-[#2B2520] text-[#F4EFEA]" : "text-[#2B2520]/65 hover:text-[#2B2520]"
    );

  return (
    <div className="mb-10 flex flex-wrap items-center gap-3">
      <div className="inline-flex gap-1 rounded-full border border-[#C5BAAB]/60 p-1" role="tablist" aria-label="Property category">
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
            className={tabClass(category === tab.value)}
          >
            {tab.label}
          </Link>
        ))}
      </div>

      {commercial && (
        <div className="inline-flex gap-1 rounded-full border border-[#C5BAAB]/60 p-1" role="tablist" aria-label="Buy or lease">
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
              className={tabClass(listingType === tab.value)}
            >
              {tab.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
