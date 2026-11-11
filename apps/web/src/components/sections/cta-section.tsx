"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function CtaSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="section-y" aria-labelledby="owner-invitation-title">
      <div className="container-site">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
          className="relative isolate overflow-hidden rounded-[4px] bg-[#2B2520] min-h-[520px] lg:min-h-[600px] flex items-center"
        >
          <div className="absolute inset-0 -z-10" aria-hidden="true">
            <Image
              src="/hero-dubai.jpg"
              alt=""
              fill
              sizes="100vw"
              quality={85}
              className="object-cover object-[65%_50%]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#211C18]/95 via-[#2B2520]/80 to-[#2B2520]/20" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#211C18]/75 via-transparent to-[#211C18]/20" />
          </div>

          <div className="relative z-10 w-full px-7 py-14 sm:p-12 lg:p-20">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-6">
                <span className="h-px w-8 bg-[#E2A862]" />
                <p className="text-[#ECBE80] text-[11px] font-semibold uppercase tracking-[0.22em]">
                  For property owners
                </p>
              </div>
              <h2
                id="owner-invitation-title"
                className="text-white font-semibold text-3xl sm:text-4xl lg:text-5xl [letter-spacing:-0.025em] leading-tight mb-6 text-balance"
              >
                Your property.<br />
                <span className="cinema-serif text-[#F6E7D2]">Its next chapter.</span>
              </h2>
              <p className="max-w-xl text-white/80 text-base lg:text-lg leading-relaxed mb-9">
                Looking to sell or lease in Dubai? List your property with Fano.
                Share the details with our team and let&apos;s discuss the right approach for your home or commercial space.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-3 min-h-14 px-6 py-4 rounded-full bg-gradient-to-br from-[#ECBE80] via-[#E2A862] to-[#B9824A] text-[#2B2520] text-sm sm:text-base font-semibold shadow-lg hover:brightness-110 transition-[filter] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ECBE80]"
                >
                  List your property with us
                  <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                </Link>
                <Link
                  href="/properties"
                  className="inline-flex items-center justify-center min-h-14 px-7 py-4 rounded-full border border-white/40 bg-white/5 text-white font-medium hover:bg-white/15 backdrop-blur-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  Explore our listings
                </Link>
              </div>
              <p className="mt-10 border-t border-white/20 pt-6 text-xs sm:text-sm text-[#F6E7D2]/80 tracking-wide">
                Apartments · Villas · Offices · Commercial spaces
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
