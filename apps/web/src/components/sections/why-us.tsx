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
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-center">
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
              {/* Bottom vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#2B2520]/40 via-transparent to-transparent" />
            </div>

            {/* Floating accent card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 10 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="absolute -bottom-5 -right-4 hidden sm:block"
            >
              <div className="rounded-[4px] bg-[#2B2520] px-6 py-5 shadow-[0_16px_40px_-12px_rgba(43,37,32,.55)]">
                <p className="cinema-eyebrow text-[#E2A862] mb-2">Our commitment</p>
                <p className="font-serif italic text-[#F4EFEA] text-lg leading-tight">
                  Personal guidance,<br />every step.
                </p>
              </div>
            </motion.div>
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.08 * i, duration: 0.45 }}
                  className="relative flex gap-4 rounded-2xl bg-gradient-to-br from-[#F4EFEA] to-[#EDE7DE] border border-[#D9CFC2]/60 p-5 overflow-hidden"
                >
                  {/* Decorative number */}
                  <span
                    aria-hidden="true"
                    className="absolute right-3 bottom-1 font-display font-semibold text-[72px] leading-none select-none pointer-events-none"
                    style={{ color: "rgba(197,186,171,0.22)" }}
                  >
                    0{i + 1}
                  </span>

                  <div className="relative h-11 w-11 rounded-xl bg-gradient-to-br from-[#ECBE80] to-[#C98F4F] flex items-center justify-center shrink-0 shadow-sm">
                    <f.icon className="h-5 w-5 text-[#2B2520]" />
                  </div>

                  <div className="relative">
                    <h3 className="font-semibold text-[#2B2520] text-sm mb-1.5">{f.title}</h3>
                    <p className="text-sm text-[#6B5038]/75 leading-relaxed">{f.description}</p>
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
