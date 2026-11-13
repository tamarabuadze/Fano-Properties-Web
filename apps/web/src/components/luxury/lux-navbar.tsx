"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { FanoLogo } from "@/components/shared/fano-logo";
import { cn } from "@fano/utils";

const navLinks = [
  { label: "Properties", href: "/properties" },
  { label: "Agents", href: "/agents" },
  { label: "Insights", href: "/blog" },
  { label: "About", href: "/about" },
];

// Transparent over the film, settling onto the page colour after the first scroll.
// Bold tracked capitals in bone; the current page is gold with a hairline beneath.
export function LuxNavbar({ showAgents = true }: { showAgents?: boolean }) {
  const links = showAgents ? navLinks : navLinks.filter((l) => l.href !== "/agents");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const closeMenu = () => setMobileOpen(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  // While open: Escape closes and returns focus to the toggle, Tab cycles between the toggle and the menu
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        toggleRef.current?.focus();
        return;
      }
      const first = toggleRef.current;
      if (e.key !== "Tab" || !menuRef.current || !first) return;
      const items = menuRef.current.querySelectorAll<HTMLElement>("a[href], button");
      const last = items[items.length - 1] ?? first;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  // The menu is lg:hidden, so close it on widening or the inert page behind would stay stuck
  useEffect(() => {
    if (!mobileOpen) return;
    const mq = window.matchMedia("(min-width: 1024px)");
    const close = () => { if (mq.matches) setMobileOpen(false); };
    close();
    mq.addEventListener("change", close);
    return () => mq.removeEventListener("change", close);
  }, [mobileOpen]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    document.body.toggleAttribute("data-overlay-open", mobileOpen);
    const behind = document.querySelectorAll<HTMLElement>(".lx-root > main, .lx-root > footer");
    behind.forEach((el) => el.toggleAttribute("inert", mobileOpen));
    return () => {
      document.body.style.overflow = "";
      document.body.removeAttribute("data-overlay-open");
      behind.forEach((el) => el.removeAttribute("inert"));
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-700",
          scrolled || mobileOpen
            ? "bg-lx-page/92 backdrop-blur-md shadow-[0_1px_0_var(--lx-line)]"
            : "bg-transparent"
        )}
      >
        <div className="container-site">
          <div className="flex h-20 items-center justify-between gap-8 lg:h-24">
            <Link href="/" onClick={closeMenu} className="flex items-center" aria-label="Fano Properties home">
              <FanoLogo color="#D4A843" className="h-11 lg:h-12" />
            </Link>

            <nav aria-label="Main navigation" className="hidden items-center gap-9 lg:flex">
              {links.map((link) => {
                const active = pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative py-2 font-label text-[11px] font-bold uppercase tracking-[0.2em] transition-colors",
                      active ? "text-lx-gold" : "text-lx-text/75 hover:text-lx-text"
                    )}
                  >
                    {link.label}
                    {active && (
                      <motion.span
                        layoutId="lx-nav-rule"
                        className="absolute inset-x-0 -bottom-px h-px bg-lx-gold"
                        transition={{ type: "spring", stiffness: 400, damping: 32 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-3">
              <Link href="/contact" className="btn-gold hidden lg:inline-flex">Enquire</Link>
              <button
                ref={toggleRef}
                onClick={() => setMobileOpen((v) => !v)}
                className="flex h-10 w-10 items-center justify-center rounded-full text-lx-text transition-colors hover:bg-lx-text/10 lg:hidden"
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
            ref={menuRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-40 bg-lx-page pt-20 lg:hidden"
            id="mobile-navigation"
          >
            <div className="container-site flex h-full flex-col py-10">
              <nav className="flex flex-col divide-y divide-lx-line" aria-label="Mobile">
                {links.map((link, i) => {
                  const active = pathname.startsWith(link.href);
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.3 }}
                    >
                      <Link
                        href={link.href}
                        onClick={closeMenu}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "flex items-center justify-between py-6 font-display text-[26px] leading-none text-lx-text",
                          active && "text-lx-gold"
                        )}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>
              <Link href="/contact" onClick={closeMenu} className="btn-gold mt-12 w-full">Enquire</Link>
              <p className="lx-eyebrow mt-auto pt-10">Churchill Executive Tower · Business Bay · Dubai</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
