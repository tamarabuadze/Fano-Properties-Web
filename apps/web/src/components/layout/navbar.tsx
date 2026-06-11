"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@fano/utils";

const navLinks = [
  { label: "Properties", href: "/properties" },
  { label: "Agents", href: "/agents" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
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

  const navBg = scrolled || !isHome || mobileOpen
    ? "bg-white/95 backdrop-blur-md border-b border-border shadow-sm"
    : "bg-transparent border-b border-transparent";

  const textColor = scrolled || !isHome || mobileOpen ? "text-black" : "text-white";
  const logoColor = scrolled || !isHome || mobileOpen ? "text-black" : "text-white";

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
            {/* Logo — always beige/gold brand color */}
            <Link href="/" className="flex items-center">
              <Image
                src="/logo-dark.png"
                alt="Fano Properties"
                width={160}
                height={52}
                className="h-9 w-auto object-contain transition-all duration-300"
                style={{ filter: "brightness(0) saturate(100%) invert(77%) sepia(16%) saturate(430%) hue-rotate(2deg) brightness(96%)" }}
                priority
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-200",
                    "hover:bg-black/5",
                    pathname.startsWith(link.href)
                      ? cn(textColor, "bg-black/5")
                      : textColor,
                    !scrolled && isHome && "hover:bg-white/10"
                  )}
                >
                  {link.label}
                  {pathname.startsWith(link.href) && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-[#9a7957]"
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
                className="hidden lg:inline-flex items-center h-10 px-5 rounded-full text-sm font-medium transition-all duration-200 text-white"
                style={{ backgroundColor: "#9a7957" }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#7e6244")}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#9a7957")}
              >
                Contact Us
              </Link>

              <button
                onClick={() => setMobileOpen((v) => !v)}
                className={cn(
                  "lg:hidden h-10 w-10 rounded-full flex items-center justify-center transition-colors",
                  scrolled || !isHome || mobileOpen ? "text-black hover:bg-zinc-100" : "text-white hover:bg-white/10"
                )}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-0 z-40 bg-white pt-16 lg:hidden"
          >
            <div className="container-site py-8 flex flex-col gap-1">
              {navLinks.map((link, i) => (
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
                        ? "bg-zinc-100 text-black"
                        : "text-black hover:bg-zinc-50"
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.06, duration: 0.2 }}
                className="mt-4 pt-4 border-t border-border"
              >
                <Link
                  href="/contact"
                  className="flex items-center justify-center h-14 rounded-full text-white font-medium text-base transition-colors"
                  style={{ backgroundColor: "#9a7957" }}
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
