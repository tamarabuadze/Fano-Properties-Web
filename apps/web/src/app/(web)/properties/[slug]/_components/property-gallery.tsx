"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, Grid3X3 } from "lucide-react";
import { cn } from "@fano/utils";

interface PropertyGalleryProps {
  images: string[];
  title: string;
}

export function PropertyGallery({ images, title }: PropertyGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  function openLightbox(i: number) {
    setActiveIndex(i);
    setLightboxOpen(true);
  }

  const prev = () => setActiveIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setActiveIndex((i) => (i + 1) % images.length);

  return (
    <>
      {/* Grid layout */}
      <div className="grid grid-cols-4 grid-rows-2 gap-2 h-[50vh] max-h-[560px] overflow-hidden">
        {/* Main image */}
        <button
          className="col-span-2 row-span-2 relative overflow-hidden bg-zinc-100 group"
          onClick={() => openLightbox(0)}
        >
          {images[0] && (
            <Image
              src={images[0]}
              alt={title}
              fill
              sizes="50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
            />
          )}
        </button>

        {/* Side images */}
        {images.slice(1, 5).map((img, i) => (
          <button
            key={i}
            className="relative overflow-hidden bg-zinc-100 group"
            onClick={() => openLightbox(i + 1)}
          >
            <Image
              src={img}
              alt={`${title} ${i + 2}`}
              fill
              sizes="25vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {i === 3 && images.length > 5 && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center gap-2 text-white">
                <Grid3X3 className="h-5 w-5" />
                <span className="font-medium">+{images.length - 5} more</span>
              </div>
            )}
          </button>
        ))}

        {/* Fill empty cells */}
        {Array.from({ length: Math.max(0, 4 - (images.length - 1)) }).map((_, i) => (
          <div key={`empty-${i}`} className="bg-zinc-100" />
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 h-12 w-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <div
              className="relative w-full max-w-5xl max-h-[80vh] mx-16"
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="relative aspect-[16/10]"
                >
                  {images[activeIndex] && (
                    <Image
                      src={images[activeIndex]}
                      alt={`${title} ${activeIndex + 1}`}
                      fill
                      sizes="90vw"
                      className="object-contain"
                    />
                  )}
                </motion.div>
              </AnimatePresence>

              <p className="text-white/50 text-sm text-center mt-4">
                {activeIndex + 1} / {images.length}
              </p>
            </div>

            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 h-12 w-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
