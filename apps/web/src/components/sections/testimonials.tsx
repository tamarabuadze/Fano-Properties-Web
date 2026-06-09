"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { SectionHeader } from "@/components/shared/section-header";

const testimonials = [
  {
    id: 1,
    quote:
      "Fano made buying our first luxury home an absolute joy. Their team was attentive, knowledgeable, and never made us feel rushed. We found our dream home in just three weeks.",
    name: "Sarah & James Mitchell",
    role: "Homeowners, Miami",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format",
  },
  {
    id: 2,
    quote:
      "As an investor, I need a team that understands the numbers as well as the market. Fano delivered on both fronts. My portfolio has grown significantly thanks to their insight.",
    name: "Marcus Chen",
    role: "Real Estate Investor",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format",
  },
  {
    id: 3,
    quote:
      "We relocated from London and were nervous about navigating the US market. Our Fano agent held our hand through everything. Couldn't recommend them more highly.",
    name: "Emma & David Harrington",
    role: "Relocating Family, New York",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format",
  },
];

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  const t = testimonials[current]!;

  return (
    <section className="section-y bg-white overflow-hidden">
      <div className="container-site">
        <SectionHeader
          eyebrow="Testimonials"
          title="Why Clients Trust Us"
          align="center"
          className="mb-16"
        />

        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="text-center"
            >
              <Quote className="h-10 w-10 text-zinc-200 mx-auto mb-8" />

              <blockquote className="text-xl lg:text-2xl font-medium text-black leading-relaxed [letter-spacing:-0.01em] mb-10 text-balance">
                "{t.quote}"
              </blockquote>

              <div className="flex items-center justify-center gap-4">
                <div className="relative h-12 w-12 rounded-full overflow-hidden bg-zinc-100">
                  <Image
                    src={t.avatar}
                    alt={t.name}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-black text-sm">{t.name}</p>
                  <p className="text-zinc-500 text-xs">{t.role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6 mt-12">
            <button
              onClick={prev}
              className="h-10 w-10 rounded-full border border-border flex items-center justify-center hover:bg-zinc-50 transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === current ? "w-8 bg-black" : "w-1.5 bg-zinc-200"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="h-10 w-10 rounded-full border border-border flex items-center justify-center hover:bg-zinc-50 transition-colors"
              aria-label="Next"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
