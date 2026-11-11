"use client";

import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

const STATS: StatItem[] = [
  { value: 500, suffix: "+", label: "Properties Sold" },
  { value: 15, suffix: "+", label: "Years Experience" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
  { value: 1200, suffix: "+", label: "Happy Clients" },
];

function CountUp({ target, suffix, active }: { target: number; suffix: string; active: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    let start = 0;
    const duration = 1800;
    const step = 16;
    const increment = target / (duration / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, step);
    return () => clearInterval(timer);
  }, [active, target]);

  return (
    <span>
      {count.toLocaleString("en-US")}
      {suffix}
    </span>
  );
}

export function CtaSection() {
  const statsRef = useRef<HTMLDivElement>(null);
  const statsVisible = useInView(statsRef, { once: true, margin: "-80px" });

  return (
    <section className="section-y">
      <div className="container-site">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative overflow-hidden rounded-3xl bg-[#2B2520] min-h-[480px] lg:min-h-[560px] flex flex-col justify-between"
        >
          {/* Background image */}
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format"
              alt="Luxury property"
              fill
              sizes="100vw"
              className="object-cover opacity-30"
            />
            {/* Left + bottom gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#2B2520] via-[#2B2520]/75 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2B2520]/90 via-transparent to-transparent" />
            {/* Cinematic vignette corners */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 120% 90% at 50% 50%, transparent 42%, rgba(0,0,0,0.55) 100%)",
              }}
            />
          </div>

          {/* Main content */}
          <div className="relative z-10 p-10 lg:p-16 max-w-2xl">
            {/* Animated eyebrow */}
            <div className="flex items-center gap-3 mb-5">
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                style={{ originX: 0 }}
                className="h-px w-8 bg-gradient-to-r from-[#E2A862] to-[#ECBE80]"
              />
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-[#E2A862] text-[11px] font-semibold uppercase tracking-[0.22em]"
              >
                Get in touch
              </motion.p>
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-white font-semibold text-3xl lg:text-5xl [letter-spacing:-0.025em] leading-tight mb-6 text-balance"
            >
              Ready to Find Your Perfect Property?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-white/60 text-base lg:text-lg leading-relaxed mb-10"
            >
              Connect with our expert team today. Whether you&apos;re buying, selling, or investing — we&apos;re here to guide you every step of the way.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap gap-4"
            >
              <motion.div
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 350, damping: 22 }}
              >
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 h-13 px-7 rounded-full bg-gradient-to-br from-[#ECBE80] via-[#E2A862] to-[#B9824A] text-[#2B2520] font-semibold shadow-[0_10px_24px_-10px_rgba(185,130,74,.8)] hover:shadow-[0_14px_32px_-8px_rgba(185,130,74,1)] transition-shadow duration-300"
                >
                  Get in Touch
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 350, damping: 22 }}
              >
                <Link
                  href="/properties"
                  className="inline-flex items-center gap-2 h-13 px-7 rounded-full border border-white/30 bg-white/8 text-white font-medium hover:bg-white/15 hover:border-white/50 backdrop-blur-sm transition-all duration-300"
                >
                  Browse Listings
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* Stats strip */}
          <div ref={statsRef} className="relative z-10 border-t border-white/10 mx-10 lg:mx-16 mb-10 lg:mb-16 pt-8 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                animate={statsVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="font-display text-2xl lg:text-3xl font-bold text-[#ECBE80] [letter-spacing:-0.02em] mb-1">
                  <CountUp target={stat.value} suffix={stat.suffix} active={statsVisible} />
                </p>
                <p className="text-white/50 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
