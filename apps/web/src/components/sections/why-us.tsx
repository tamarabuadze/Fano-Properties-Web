"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShieldCheck, Clock, Award, Users } from "lucide-react";
import { SectionHeader } from "@/components/shared/section-header";

const features = [
  {
    icon: ShieldCheck,
    title: "Trusted & Verified",
    description: "Every listing is verified and every agent is licensed and background-checked.",
  },
  {
    icon: Clock,
    title: "Fast & Efficient",
    description: "From first inquiry to closing, we streamline every step of the process.",
  },
  {
    icon: Award,
    title: "Award-Winning Service",
    description: "Recognized for excellence in luxury real estate for over a decade.",
  },
  {
    icon: Users,
    title: "Expert Agents",
    description: "Work with dedicated experts who know the local market inside out.",
  },
];

export function WhyUsSection() {
  return (
    <section className="section-y bg-white">
      <div className="container-site">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-24 items-center">
          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative"
          >
            <div className="relative h-[280px] sm:h-[380px] lg:h-[520px] rounded-3xl overflow-hidden bg-zinc-100">
              <Image
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800&auto=format"
                alt="Why choose Fano"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            {/* Floating stat card */}
            <div className="absolute bottom-4 right-4 lg:-bottom-6 lg:-right-6 bg-black text-white rounded-2xl p-4 lg:p-6 shadow-2xl">
              <p className="text-3xl font-semibold [letter-spacing:-0.03em]">98%</p>
              <p className="text-white/60 text-sm mt-1">Client satisfaction rate</p>
            </div>
          </motion.div>

          {/* Content side */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <SectionHeader
              eyebrow="Why Choose Us"
              title="Your Vision, Our Mission"
              description="We don't just sell properties — we build relationships that last a lifetime. Our approach is personal, professional, and performance-driven."
              className="mb-10"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i, duration: 0.4 }}
                  className="flex gap-4"
                >
                  <div className="h-10 w-10 rounded-xl bg-zinc-50 border border-border flex items-center justify-center shrink-0">
                    <f.icon className="h-5 w-5 text-[#9a7957]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#3d3020] text-sm mb-1">{f.title}</h3>
                    <p className="text-sm text-[#7e6244]/70 leading-relaxed">{f.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
