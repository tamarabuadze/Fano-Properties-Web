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
      <aside className="hidden lg:block w-72 shrink-0">
        <div className="sticky top-24">
          <PropertiesFilters initialFilters={initialFilters} />
        </div>
      </aside>

      <div className="lg:hidden">
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-haspopup="dialog"
          aria-expanded={open}
          className="inline-flex h-11 items-center gap-2.5 rounded-full bg-[#2B2520] pl-4 pr-5 text-sm font-medium text-[#E2A862] shadow-[0_8px_24px_-10px_rgba(43,37,32,.6)] transition-transform active:scale-[0.98]"
        >
          <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
          Filters
          {activeCount > 0 && (
            <span className="ml-0.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[#E2A862] px-1.5 text-[11px] font-semibold text-[#2B2520]">
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
            className="absolute inset-0 bg-[#2B2520]/55 backdrop-blur-[2px]"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Filter properties"
            className={cn(
              "absolute inset-x-0 bottom-0 flex max-h-[88dvh] flex-col rounded-t-3xl bg-[#2B2520] shadow-[0_-20px_60px_-20px_rgba(0,0,0,.6)] transition-transform duration-300 ease-[cubic-bezier(.25,.46,.45,.94)]",
              open ? "translate-y-0" : "translate-y-full"
            )}
          >
            <div className="flex items-center justify-between px-5 pt-4 pb-2">
              <span aria-hidden="true" className="absolute left-1/2 top-2 h-1 w-10 -translate-x-1/2 rounded-full bg-white/20" />
              <span className="cinema-eyebrow text-[#E2A862]">Refine your search</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close filters"
                className="flex h-9 w-9 items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/10 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-2 pb-2 [&>div]:rounded-none [&>div]:pt-2">
              <PropertiesFilters initialFilters={initialFilters} />
            </div>

            <div className="border-t border-white/10 px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-4">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex min-h-[52px] w-full items-center justify-center rounded-full bg-gradient-to-br from-[#ECBE80] via-[#E2A862] to-[#B9824A] text-sm font-semibold text-[#2B2520] shadow-[0_10px_30px_-10px_rgba(226,168,98,.6)]"
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
