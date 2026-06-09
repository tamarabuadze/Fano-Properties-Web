"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionHeader } from "@/components/shared/section-header";

const types = [
  {
    label: "Apartments",
    value: "apartment",
    count: "140+ listings",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=735&auto=format",
  },
  {
    label: "Villas",
    value: "villa",
    count: "60+ listings",
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=800&auto=format",
  },
  {
    label: "Houses",
    value: "house",
    count: "200+ listings",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format",
  },
];

export function PropertyTypesSection() {
  return (
    <section className="section-y bg-zinc-50">
      <div className="container-site">
        <SectionHeader
          eyebrow="Browse by type"
          title="Find What Fits You"
          description="From urban apartments to expansive villas — every lifestyle, covered."
          className="mb-12"
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
          {types.map((type, i) => (
            <motion.div
              key={type.value}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <Link
                href={`/properties?propertyType=${type.value}`}
                className="group relative block h-72 lg:h-80 overflow-hidden rounded-2xl bg-zinc-200"
              >
                <Image
                  src={type.image}
                  alt={type.label}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <p className="text-white/60 text-xs uppercase tracking-widest mb-1">{type.count}</p>
                  <div className="flex items-end justify-between">
                    <h3 className="text-white font-semibold text-2xl [letter-spacing:-0.02em]">
                      {type.label}
                    </h3>
                    <div className="h-9 w-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:bg-white/30">
                      <ArrowUpRight className="h-4 w-4 text-white" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
