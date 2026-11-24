"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const stats = [
  { value: "10+", label: "Years in Dubai" },
  { value: "500+", label: "Properties Sold" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "50+", label: "Expert Agents" },
];

export function StatsSection() {
  return (
    <section className="bg-[#2B2520] py-14 lg:py-20">
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Google Reviews */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="h-px w-6 bg-[#E2A862]" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E2A862]">
                Google Reviews
              </span>
            </div>
            <div className="flex items-end gap-5">
              <span className="text-7xl lg:text-8xl font-semibold text-white leading-none">4.9</span>
              <div className="pb-2">
                <div className="flex gap-1 mb-1.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-[#E2A862] text-[#E2A862]" />
                  ))}
                </div>
                <p className="text-white/50 text-sm">Out of 5</p>
              </div>
            </div>
            <p className="text-white/40 text-sm mt-3">From 200+ verified reviews on Google.</p>
          </motion.div>

          {/* Stats grid */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-2 gap-px bg-white/10 rounded-2xl overflow-hidden"
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-[#2B2520] p-7 flex flex-col gap-1"
              >
                <span className="text-3xl lg:text-4xl font-semibold text-white">{stat.value}</span>
                <span className="text-sm text-white/45">{stat.label}</span>
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
