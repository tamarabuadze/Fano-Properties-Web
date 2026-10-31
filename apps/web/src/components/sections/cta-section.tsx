"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function CtaSection() {
  return (
    <section className="section-y bg-white">
      <div className="container-site">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative overflow-hidden rounded-3xl bg-[#1a1410] min-h-[400px] lg:min-h-[480px] flex items-center"
        >
          {/* Background image */}
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format"
              alt="Luxury property"
              fill
              sizes="100vw"
              className="object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1a1410] via-[#1a1410]/80 to-transparent" />
          </div>

          <div className="relative z-10 p-10 lg:p-16 max-w-2xl">
            <p className="text-gold-400 text-xs font-medium uppercase tracking-widest mb-4">
              Get in touch
            </p>
            <h2 className="text-white font-semibold text-3xl lg:text-5xl [letter-spacing:-0.025em] leading-tight mb-6 text-balance">
              Ready to Find Your Perfect Property?
            </h2>
            <p className="text-white/60 text-base lg:text-lg leading-relaxed mb-10">
              Connect with our expert team today. Whether you&apos;re buying, selling, or investing — we&apos;re here to guide you every step of the way.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 h-13 px-7 rounded-full bg-gold-400 text-white font-medium hover:bg-gold-500 transition-colors"
              >
                Get in Touch
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/properties"
                className="inline-flex items-center gap-2 h-13 px-7 rounded-full border border-white/30 text-white font-medium hover:bg-white/10 transition-colors"
              >
                Browse Listings
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
