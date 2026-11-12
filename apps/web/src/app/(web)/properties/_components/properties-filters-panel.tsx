"use client";

import { useEffect, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { cn } from "@fano/utils";
import { PropertiesFilters } from "./properties-filters";

interface PropertiesFiltersPanelProps {
  initialFilters: Record<string, string | undefined>;
}

const NOT_A_FILTER = new Set(["category", "page", "sortBy"]);

// Desktop: a sticky sidebar. Mobile: a "Filters" button that opens a bottom sheet,
// so listings start right under the category tabs instead of two screens down.
export function PropertiesFiltersPanel({ initialFilters }: PropertiesFiltersPanelProps) {
  const [open, setOpen] = useState(false);
  const isCommercial = initialFilters.category === "commercial";

  const activeCount = Object.entries(initialFilters).filter(
    ([k, v]) => Boolean(v) && !NOT_A_FILTER.has(k) && !(isCommercial && k === "listingType")
  ).length;

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    document.body.setAttribute("data-overlay-open", "");
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.body.removeAttribute("data-overlay-open");
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <aside className="hidden w-64 shrink-0 lg:block xl:w-72">
        <div className="sticky top-28">
          <PropertiesFilters initialFilters={initialFilters} />
        </div>
      </aside>

      <div className="lg:hidden">
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-haspopup="dialog"
          aria-expanded={open}
          className="btn-pill-outline"
        >
          <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
          Filters
          {activeCount > 0 && (
            <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[#2B2520] px-1.5 text-[11px] font-medium text-[#F4EFEA]">
              {activeCount}
            </span>
          )}
        </button>

        <div
          className={cn(
            "fixed inset-0 z-[60] transition-opacity duration-300",
            open ? "opacity-100" : "pointer-events-none opacity-0"
          )}
          aria-hidden={!open}
        >
          <button
            type="button"
            aria-label="Close filters"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-[#2B2520]/50"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Filter properties"
            className={cn(
              "absolute inset-x-0 bottom-0 flex max-h-[88dvh] flex-col rounded-t-[12px] bg-[#FBF8F4] transition-transform duration-300 ease-[cubic-bezier(.25,.46,.45,.94)]",
              open ? "translate-y-0" : "translate-y-full"
            )}
          >
            <div className="flex items-center justify-between border-b border-[#C5BAAB]/40 px-5 pb-4 pt-5">
              <span aria-hidden="true" className="absolute left-1/2 top-2 h-1 w-10 -translate-x-1/2 rounded-full bg-[#C5BAAB]/60" />
              <span className="eyebrow">Refine your search</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close filters"
                className="flex h-9 w-9 items-center justify-center rounded-full text-[#2B2520]/60 transition-colors hover:bg-[#E6DFD5] hover:text-[#2B2520]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-5 pt-5">
              <PropertiesFilters initialFilters={initialFilters} />
            </div>

            <div className="border-t border-[#C5BAAB]/40 px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-4">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="btn-pill w-full"
              >
                Show results
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
