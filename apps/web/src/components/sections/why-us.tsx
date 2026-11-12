"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const features = [
  { title: "Trusted & transparent", description: "Clear facts on every listing: price, size, payment plan and handover, straight from the developer." },
  { title: "Fast & efficient", description: "From first enquiry to transfer at the Dubai Land Department, we handle every step with you." },
  { title: "Off-plan & commercial focus", description: "Grade A offices and landmark towers in Business Bay, Downtown and on Sheikh Zayed Road." },
  { title: "Local advisors", description: "A Business Bay team that knows Dubai's developers, payment plans and the buying process." },
];

// Words left, photograph right: a large serif statement, a vertical champagne rule,
// a serif sub-heading and a short paragraph, then four hairline rows
export function WhyUsSection() {
  return (
    <section className="section-y overflow-x-clip">
      <div className="container-site grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="lg:col-span-5"
        >
          <h2 className="font-display text-[clamp(34px,4.4vw,58px)] font-normal leading-[1.05] tracking-[-0.01em] text-[#2B2520]">
            A city of possibility.
          </h2>
          <div className="my-8 h-14 w-px bg-[#E2A862]" aria-hidden="true" />
          <h3 className="font-display text-[26px] font-normal leading-tight text-[#2B2520]">A team on your side.</h3>
          <p className="mt-5 max-w-md text-[15px] leading-[1.85] text-[#2B2520]/70">
            Local knowledge. Clear conversations. Personal guidance from your first enquiry to your next move, with the
            facts of every listing laid out before you decide.
          </p>

          <dl className="mt-10 divide-y divide-[#C5BAAB]/40 border-y border-[#C5BAAB]/40">
            {features.map((f) => (
              <div key={f.title} className="grid gap-1 py-4 sm:grid-cols-[180px_1fr] sm:gap-6">
                <dt className="text-[13px] font-medium text-[#2B2520]">{f.title}</dt>
                <dd className="text-[13px] leading-[1.75] text-[#2B2520]/65">{f.description}</dd>
              </div>
            ))}
          </dl>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="lg:col-span-7"
        >
          <div className="relative aspect-[4/3] overflow-hidden rounded-[4px] bg-[#D9CFC2] lg:aspect-[5/4]">
            <Image
              src="/hero-dubai.jpg"
              unoptimized
              alt="The Burj Khalifa and Downtown Dubai skyline"
              fill
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover"
              quality={90}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
