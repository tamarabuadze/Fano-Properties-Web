"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function CtaSection() {
  return (
    <section className="section-y">
      <div className="container-site">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative overflow-hidden rounded-[4px] border border-[#D9CFC2] bg-[#2B2520] min-h-[460px] lg:min-h-[560px] flex items-center"
        >
          {/* Background image */}
          <div className="absolute inset-0">
            <Image
              src="/property-conversation.webp"
              unoptimized
              alt="Luxury property"
              fill
              sizes="100vw"
              className="object-cover opacity-65"
              quality={85}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#2B2520] via-[#2B2520]/80 to-transparent" />
          </div>

          <div className="relative z-10 px-7 py-12 sm:p-12 lg:p-20 max-w-3xl">
            <p className="cinema-eyebrow text-[#E2A862] mb-6">
              A conversation away
            </p>
            <h2 className="text-white font-semibold text-3xl lg:text-5xl [letter-spacing:-0.025em] leading-tight mb-6 text-balance">
              Your next chapter.<br /><span className="cinema-serif text-[#F6E7D2]">Let&apos;s find it together.</span>
            </h2>
            <p className="text-white/60 text-base lg:text-lg leading-relaxed mb-10">
              Connect with our expert team today. Whether you&apos;re buying, selling, or investing — we&apos;re here to guide you every step of the way.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="cinema-button cinema-button-gold"
              >
                Get in Touch
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/properties"
                className="cinema-button cinema-button-glass"
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
