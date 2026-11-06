"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FanoLogo, LOGO_COLORS } from "@/components/shared/fano-logo";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@fano/utils";

const navLinks = [
  { label: "Properties", href: "/properties" },
  { label: "Agents", href: "/agents" },
  { label: "ROI Calculator", href: "/roi-calculator" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Navbar({ showAgents = true }: { showAgents?: boolean }) {
  const links = showAgents ? navLinks : navLinks.filter((l) => l.href !== "/agents");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isHome = pathname === "/";

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Scrolled/non-home: frosted Calcite Sand glass like the Fano app; transparent on the home hero
  const isOpaque = scrolled || !isHome || mobileOpen;

  const navBg = isOpaque
    ? "bg-surface/85 backdrop-blur-xl border-b border-titan/50 shadow-sm"
    : "bg-transparent border-b border-transparent";

  // Espresso links on the light bar, white over the hero photo
  const linkColor = isOpaque ? "text-[#2B2520]" : "text-white";
  const hoverBg = isOpaque ? "hover:bg-[#2B2520]/5" : "hover:bg-white/10";
  // Bronze logo on the light bar, sand logo over the photo
  const logoColor = isOpaque ? LOGO_COLORS.bronze : LOGO_COLORS.sand;

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          navBg
        )}
      >
        <div className="container-site">
          <div className="flex h-16 lg:h-20 items-center justify-between gap-8">
            {/* Logo: sharp vector, bronze on light and sand over the photo */}
            <Link href="/" className="flex items-center" aria-label="Fano Properties home">
              <FanoLogo
                color={logoColor}
                className={cn(
                  "h-11 lg:h-[3.25rem] transition-colors duration-300",
                  !isOpaque && "drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)]"
                )}
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-200",
                    hoverBg,
                    pathname.startsWith(link.href)
                      ? cn(linkColor, isOpaque ? "bg-[#E2A862]/20" : "bg-white/10")
                      : linkColor
                  )}
                >
                  {link.label}
                  {pathname.startsWith(link.href) && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-[#E2A862]"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
            </nav>

            {/* CTA + Mobile Toggle */}
            <div className="flex items-center gap-3">
              <Link
                href="/contact"
                className="hidden lg:inline-flex items-center h-10 px-5 rounded-full text-sm font-medium transition-all duration-200 text-[#2B2520] bg-gradient-to-br from-[#ECBE80] via-[#E2A862] to-[#B9824A] hover:brightness-105 shadow-sm"
              >
                Contact Us
              </Link>

              <button
                onClick={() => setMobileOpen((v) => !v)}
                className={cn(
                  "lg:hidden h-10 w-10 rounded-full flex items-center justify-center transition-colors",
                  isOpaque ? "text-[#2B2520] hover:bg-[#2B2520]/5" : "text-white hover:bg-white/10"
                )}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu — dark brown like footer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-0 z-40 bg-[#2B2520] pt-16 lg:hidden"
          >
            <div className="container-site py-8 flex flex-col gap-1">
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.2 }}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "flex items-center h-14 px-4 rounded-xl text-lg font-medium transition-colors",
                      pathname.startsWith(link.href)
                        ? "bg-white/10 text-[#E2A862]"
                        : "text-[#E2A862]/80 hover:bg-white/10 hover:text-[#E2A862]"
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: links.length * 0.06, duration: 0.2 }}
                className="mt-4 pt-4 border-t border-white/10"
              >
                <Link
                  href="/contact"
                  className="flex items-center justify-center h-14 rounded-full text-white font-medium text-base transition-colors"
                  style={{ backgroundColor: "#8C6A47" }}
                >
                  Contact Us
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
