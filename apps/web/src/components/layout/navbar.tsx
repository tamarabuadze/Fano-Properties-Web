"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Plus, X } from "lucide-react";
import { FanoLogo, LOGO_COLORS } from "@/components/shared/fano-logo";
import { cn } from "@fano/utils";

const navLinks = [
  { label: "properties", href: "/properties" },
  { label: "agents", href: "/agents" },
  { label: "roi calculator", href: "/roi-calculator" },
  { label: "insights", href: "/blog" },
  { label: "about", href: "/about" },
];

// A quiet bone bar: logo left, lowercase links, one espresso pill. It gains a
// hairline shadow once the page scrolls.
export function Navbar({ showAgents = true }: { showAgents?: boolean }) {
  const links = showAgents ? navLinks : navLinks.filter((l) => l.href !== "/agents");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    document.body.toggleAttribute("data-overlay-open", mobileOpen);
    return () => {
      document.body.style.overflow = "";
      document.body.removeAttribute("data-overlay-open");
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 bg-[#F4EFEA]/95 backdrop-blur-md transition-shadow duration-500",
          scrolled ? "shadow-[0_1px_0_rgba(197,186,171,.6),0_12px_32px_-24px_rgba(43,37,32,.35)]" : "shadow-[0_1px_0_rgba(197,186,171,.35)]"
        )}
      >
        <div className="container-site">
          <div className="flex h-16 lg:h-20 items-center justify-between gap-8">
            <Link href="/" className="flex items-center" aria-label="Fano Properties home">
              <FanoLogo color={LOGO_COLORS.bronze} className="h-10 lg:h-11" />
            </Link>

            {/* Bold chips on matching gold tones: champagne-tinted at rest, deeper on hover,
                solid gold with a bronze hairline for the current page */}
            <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-2.5">
              {links.map((link) => {
                const active = pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "relative rounded-full border px-4 py-2 font-label text-[11px] font-bold uppercase tracking-[0.14em] transition-colors",
                      active
                        ? "text-[#2B2520]"
                        : "border-[#EBD3AC] bg-[#F6E7D2] text-[#6B5038] hover:border-[#E2A862] hover:bg-[#EFC98D] hover:text-[#2B2520]"
                    )}
                    aria-current={active ? "page" : undefined}
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-chip"
                        className="absolute inset-0 -z-10 rounded-full border border-[#B98540] bg-gradient-to-b from-[#F3C981] to-[#DFA458] shadow-[inset_0_1px_0_rgba(255,255,255,.5)]"
                        transition={{ type: "spring", stiffness: 400, damping: 32 }}
                      />
                    )}
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-3">
              <Link href="/contact" className="btn-pill hidden lg:inline-flex">
                contact us <Plus className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>

              <button
                onClick={() => setMobileOpen((v) => !v)}
                className="lg:hidden h-10 w-10 rounded-full flex items-center justify-center text-[#2B2520] hover:bg-[#2B2520]/5 transition-colors"
                aria-label="Toggle menu"
                aria-expanded={mobileOpen}
                aria-controls="mobile-navigation"
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-0 z-40 bg-[#F4EFEA] pt-16 lg:hidden"
            id="mobile-navigation"
          >
            <div className="container-site flex h-full flex-col py-10">
              <nav className="flex flex-col divide-y divide-[#C5BAAB]/40" aria-label="Mobile">
                {links.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.25 }}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        "flex items-center justify-between py-5 font-label text-[15px] font-bold uppercase tracking-[0.16em] leading-none text-[#2B2520]",
                        pathname.startsWith(link.href) && "text-[#8C6A47]"
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <Link href="/contact" className="btn-pill mt-10 w-full">
                contact us <Plus className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
              <p className="eyebrow mt-auto pt-10">Churchill Tower · Business Bay · Dubai</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
