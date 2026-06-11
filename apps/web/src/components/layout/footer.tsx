import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Instagram, Linkedin, Twitter } from "lucide-react";

const footerLinks = {
  Company: [
    { label: "About", href: "/about" },
    { label: "Agents", href: "/agents" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  Properties: [
    { label: "For Sale", href: "/properties?listingType=sale" },
    { label: "For Rent", href: "/properties?listingType=rent" },
    { label: "Featured", href: "/properties?featured=true" },
    { label: "All Listings", href: "/properties" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "FAQ", href: "/faq" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-[#1a1410] text-white">
      {/* Large brand wordmark */}
      <div className="border-b border-gold-900/40 overflow-hidden">
        <div className="container-site py-16">
          <p className="text-[clamp(60px,12vw,160px)] font-bold leading-none tracking-[-0.04em] text-gold-900/60 select-none">
            FANO
          </p>
        </div>
      </div>

      {/* Links grid */}
      <div className="container-site py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-8">
          {/* Brand col */}
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center mb-4">
              <Image
                src="/logo-white.png"
                alt="Fano Properties"
                width={140}
                height={45}
                className="h-9 w-auto object-contain"
              />
            </Link>
            <p className="text-sm text-white/50 leading-relaxed max-w-xs">
              Premium real estate for discerning buyers, sellers, and investors.
            </p>
            <div className="flex gap-3 mt-6">
              {[
                { icon: Instagram, href: "#", label: "Instagram" },
                { icon: Linkedin, href: "#", label: "LinkedIn" },
                { icon: Twitter, href: "#", label: "Twitter" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="h-9 w-9 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/60 transition-all duration-200"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <p className="text-xs font-medium uppercase tracking-widest text-white/40 mb-5">
                {heading}
              </p>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/60 hover:text-white transition-colors duration-150"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-site py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} Fano Real Estate. All rights reserved.
          </p>
          <p className="text-xs text-white/40">
            Premium properties, exceptional service.
          </p>
        </div>
      </div>
    </footer>
  );
}
