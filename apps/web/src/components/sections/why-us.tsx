"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShieldCheck, Clock, Award, Users } from "lucide-react";
import { SectionHeader } from "@/components/shared/section-header";

const features = [
  {
    icon: ShieldCheck,
    title: "Trusted & Transparent",
    description: "Clear facts on every listing: price, size, payment plan and handover, straight from the developer.",
  },
  {
    icon: Clock,
    title: "Fast & Efficient",
    description: "From first enquiry to transfer at the Dubai Land Department, we handle every step with you.",
  },
  {
    icon: Award,
    title: "Off-Plan & Commercial Focus",
    description: "Grade A offices and landmark off-plan towers in Business Bay, Downtown and on Sheikh Zayed Road.",
  },
  {
    icon: Users,
    title: "Local Advisors",
    description: "A Business Bay team that knows Dubai's developers, payment plans and the buying process.",
  },
];

export function WhyUsSection() {
  return (
    <section className="section-y overflow-x-clip">
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
            <div className="relative h-[320px] sm:h-[440px] lg:h-[620px] rounded-[4px] overflow-hidden bg-[#D9CFC2]">
              <Image
                src="/hero-dubai.jpg"
                unoptimized
                alt="The Burj Khalifa and Downtown Dubai skyline"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                quality={90}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/wAAECAADAAQDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABQQG/8QAHBAAAgMAAwEAAAAAAAAAAAAAAQIDBAASITH/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AJXi1KrXLpKhbIxWkQMVIOhGR3Qf/9k="
              />
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
              title="A city of possibility. A team on your side."
              description="Local knowledge. Clear conversations. Personal guidance from your first enquiry to your next move."
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
                  <div className="h-10 w-10 rounded-xl bg-[#F6E7D2] border border-[#EFD3AE] flex items-center justify-center shrink-0">
                    <f.icon className="h-5 w-5 text-[#8C6A47]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#2B2520] text-sm mb-1">{f.title}</h3>
                    <p className="text-sm text-[#6B5038]/70 leading-relaxed">{f.description}</p>
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
