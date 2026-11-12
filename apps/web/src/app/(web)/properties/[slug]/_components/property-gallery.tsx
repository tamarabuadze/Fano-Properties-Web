"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, Grid3X3, Play } from "lucide-react";
import { isOptimizedImageHost, isVideoUrl } from "@fano/utils";

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
      <div className="container-site pt-6">
      <div className="grid h-[52vh] max-h-[600px] grid-cols-4 grid-rows-2 gap-2 overflow-hidden rounded-[4px]">
        {/* Main image */}
        <button
          className="group relative col-span-2 row-span-2 overflow-hidden bg-[#E6DFD5]"
          onClick={() => openLightbox(0)}
          aria-label="Open photo 1"
        >
          {images[0] && (
            <Image
              src={images[0]}
              unoptimized={!isOptimizedImageHost(images[0])}
              alt={title}
              fill
              sizes="50vw"
              className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
              priority
            />
          )}
        </button>

        {/* Side images */}
        {images.slice(1, 5).map((img, i) => (
          <button
            key={i}
            className="group relative overflow-hidden bg-[#E6DFD5]"
            onClick={() => openLightbox(i + 1)}
            aria-label={`Open photo ${i + 2}`}
          >
            {isVideoUrl(img) ? (
              <>
                <video src={img} muted playsInline preload="metadata" className="absolute inset-0 h-full w-full object-cover" />
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#2B2520]/70 text-[#F4EFEA]">
                    <Play className="h-5 w-5" />
                  </span>
                </span>
              </>
            ) : (
              <Image
                src={img}
                unoptimized={!isOptimizedImageHost(img)}
                alt={`${title} ${i + 2}`}
                fill
                sizes="25vw"
                className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
              />
            )}
            {i === 3 && images.length > 5 && (
              <div className="absolute inset-0 flex items-center justify-center gap-2 bg-[#2B2520]/55 text-[#F4EFEA]">
                <Grid3X3 className="h-5 w-5" aria-hidden="true" />
                <span className="font-label text-[11px] font-semibold uppercase tracking-[0.16em]">+{images.length - 5} more</span>
              </div>
            )}
          </button>
        ))}

        {/* Fill empty cells */}
        {Array.from({ length: Math.max(0, 4 - (images.length - 1)) }).map((_, i) => (
          <div key={`empty-${i}`} className="bg-[#E6DFD5]" />
        ))}
      </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#211C18]/95"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              onClick={() => setLightboxOpen(false)}
              aria-label="Close gallery"
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-[#F4EFEA]/25 text-[#F4EFEA] transition-colors hover:bg-[#F4EFEA]/10"
            >
              <X className="h-5 w-5" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              aria-label="Previous photo"
              className="absolute left-4 flex h-12 w-12 items-center justify-center rounded-full border border-[#F4EFEA]/25 text-[#F4EFEA] transition-colors hover:bg-[#F4EFEA]/10"
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
                  {isVideoUrl(images[activeIndex]) ? (
                    <video src={images[activeIndex]} controls autoPlay playsInline className="absolute inset-0 h-full w-full object-contain" />
                  ) : images[activeIndex] && (
                    <Image
                      src={images[activeIndex]}
                      unoptimized={!isOptimizedImageHost(images[activeIndex])}
                      alt={`${title} ${activeIndex + 1}`}
                      fill
                      sizes="90vw"
                      className="object-contain"
                    />
                  )}
                </motion.div>
              </AnimatePresence>

              <p className="mt-4 text-center font-label text-[11px] tracking-[0.2em] text-[#F4EFEA]/55">
                {activeIndex + 1} / {images.length}
              </p>
            </div>

            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              aria-label="Next photo"
              className="absolute right-4 flex h-12 w-12 items-center justify-center rounded-full border border-[#F4EFEA]/25 text-[#F4EFEA] transition-colors hover:bg-[#F4EFEA]/10"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
