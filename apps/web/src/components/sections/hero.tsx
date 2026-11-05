"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Search } from "lucide-react";

// Downtown Dubai with the Burj Khalifa, supplied by Fano: the photo shows at once,
// and on larger screens a time-lapse of the same view fades in over it
const HERO_IMAGE = "/hero-dubai.webp";
const HERO_VIDEO = "/hero-dubai.mp4";

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  // Load the video only after the page has loaded, on screens 768px and wider,
  // and not when the visitor asked for less motion or less data
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (
      !window.matchMedia("(min-width: 768px)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      conn?.saveData
    ) return;

    const load = () => {
      video.src = HERO_VIDEO;
      video.load();
    };
    if (document.readyState === "complete") {
      const t = setTimeout(load, 300);
      return () => clearTimeout(t);
    }
    window.addEventListener("load", load, { once: true });
    return () => window.removeEventListener("load", load);
  }, []);

  return (
    <section
      ref={ref}
      className="relative h-[100svh] min-h-[700px] max-h-[1080px] overflow-hidden bg-[#2B2520]"
    >
      {/* Background photo, darkened on the left and bottom so the white text stays readable */}
      <div className="absolute inset-0" aria-hidden>
        <Image
          src={HERO_IMAGE}
          alt=""
          fill
          priority
          // Tall screens crop the sides, so they need an image about 16/9 of the screen height wide
          sizes="(max-aspect-ratio: 16/9) 178vh, 100vw"
          className="object-cover object-center"
        />
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-1000"
          style={{ opacity: videoReady ? 1 : 0 }}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          onCanPlay={() => setVideoReady(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70" />
      </div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 h-full flex flex-col justify-end pb-8 lg:pb-16 xl:pb-24"
      >
        <div className="container-site">
          <div className="max-w-4xl">
            {/* Eyebrow */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-white/70 text-sm font-medium uppercase tracking-widest mb-6"
            >
              Premium Real Estate
            </motion.p>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-white font-semibold heading-display text-[clamp(40px,7vw,96px)] mb-8 leading-[1.02]"
            >
              Real Estate.
              <br />
              <span className="text-white/70">Real Relationships.</span>
            </motion.h1>

            {/* Subline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-white/70 text-lg max-w-xl mb-10 leading-relaxed"
            >
              We help you find more than a property — we find your next chapter.
              Buy, sell or rent with confidence.
            </motion.p>

            {/* CTA row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap gap-4 mb-8 lg:mb-16"
            >
              <Link
                href="/properties"
                className="inline-flex items-center gap-2 h-14 px-8 rounded-full bg-gradient-to-br from-[#ECBE80] via-[#E2A862] to-[#B9824A] text-[#2B2520] font-semibold text-base hover:brightness-105 transition"
              >
                <Search className="h-4 w-4" />
                Browse Properties
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 h-14 px-8 rounded-full border border-white/40 text-white font-medium text-base hover:bg-white/10 transition-colors"
              >
                Talk to an Agent
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>

          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 right-8 lg:right-12 z-10 hidden lg:flex flex-col items-center gap-2"
        aria-hidden
      >
        <div className="h-10 w-px bg-white/30" />
        <p className="text-white/40 text-xs uppercase tracking-widest rotate-90 origin-center translate-y-4">
          Scroll
        </p>
      </motion.div>
    </section>
  );
}
