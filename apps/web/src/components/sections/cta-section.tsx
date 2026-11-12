"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

// Closing full-bleed photograph with a large serif line set low and right,
// as the reference ends its home page
export function CtaSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative isolate flex min-h-[520px] items-end overflow-hidden bg-[#2B2520] lg:min-h-[640px]" aria-labelledby="owner-invitation-title">
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <Image src="/hero-dubai.jpg" alt="" fill sizes="100vw" quality={85} className="object-cover object-[65%_50%]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#211C18]/80 via-[#2B2520]/20 to-transparent" />
      </div>

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7 }}
        className="container-site relative z-10 flex flex-col items-start gap-6 pb-14 pt-32 text-[#F4EFEA] lg:flex-row lg:items-end lg:justify-between lg:pb-20"
      >
        <h2 id="owner-invitation-title" className="font-display text-[clamp(40px,6vw,88px)] font-normal leading-[0.98] tracking-[-0.01em] text-balance">
          Your property.<br /><span className="italic text-[#F6E7D2]">Its next chapter.</span>
        </h2>
        <div className="max-w-sm">
          <p className="text-[14px] leading-[1.8] text-[#F4EFEA]/80">
            Selling or leasing in Dubai? Share the details and we will discuss the right approach for your home or commercial space.
          </p>
          <Link href="/contact" className="btn-gold mt-6">
            List your property with us
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
