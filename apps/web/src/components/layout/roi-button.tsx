"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calculator } from "lucide-react";

// Floating shortcut to the ROI calculator, stacked above the WhatsApp button.
// On a property page that has its own calculator, it scrolls there instead.
export function RoiButton() {
  const pathname = usePathname();
  if (pathname.startsWith("/roi-calculator")) return null;

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    const section = document.getElementById("roi");
    if (section) {
      e.preventDefault();
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  return (
    <Link
      href="/roi-calculator"
      onClick={handleClick}
      aria-label="ROI Calculator"
      className="group fixed bottom-[5.25rem] sm:bottom-24 right-4 sm:right-6 z-50 flex h-12 sm:h-14 items-center rounded-full bg-[#1a1410] text-[#c9a96e] shadow-lg ring-1 ring-[#c9a96e]/30 hover:scale-105 transition-all duration-200"
    >
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-medium opacity-0 transition-all duration-300 sm:group-hover:max-w-[9rem] sm:group-hover:pl-5 sm:group-hover:opacity-100">
        ROI Calculator
      </span>
      <span className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center">
        <Calculator className="h-6 w-6" />
      </span>
    </Link>
  );
}
