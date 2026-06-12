"use client";

import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Search } from "lucide-react";

// Pexels: "Aerial Footage of Buildings in Dubai" — free to use
const HERO_VIDEO =
  "https://videos.pexels.com/video-files/1409899/1409899-hd_1920_1080_25fps.mp4";

// Poster shown immediately as the LCP element; video fades in over it
const HERO_POSTER =
  "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2071&auto=format&fit=crop";

const stats = [
  { value: "2,400+", label: "Properties Listed" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "12+", label: "Years Experience" },
  { value: "$2B+", label: "Properties Sold" },
];

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  // Lazy-load video after page is interactive so the poster image wins the LCP race
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Respect prefers-reduced-motion — keep static poster
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const load = () => {
      video.src = HERO_VIDEO;
      video.load();
    };

    if (document.readyState === "complete") {
      // Small delay to let the browser paint the poster first
      const t = setTimeout(load, 300);
      return () => clearTimeout(t);
    }
    window.addEventListener("load", load, { once: true });
    return () => window.removeEventListener("load", load);
  }, []);

  return (
    <section
      ref={ref}
      className="relative h-[100svh] min-h-[700px] max-h-[1080px] overflow-hidden bg-[#1a1410]"
    >
      {/* Background: poster + video fade */}
      <div className="absolute inset-0" aria-hidden>
        {/* Poster image — always present, serves as LCP */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
          style={{
            backgroundImage: `url(${HERO_POSTER})`,
            opacity: videoReady ? 0 : 1,
          }}
        />

        {/* Video — fades in once it can play */}
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

        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
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
                className="inline-flex items-center gap-2 h-14 px-8 rounded-full bg-gold-400 text-white font-medium text-base hover:bg-gold-500 transition-colors"
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

            {/* Stats strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="hidden sm:flex flex-wrap gap-8 pt-8 border-t border-white/20"
            >
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="text-2xl font-semibold [letter-spacing:-0.02em]" style={{ color: "#c3ae8f" }}>
                    {s.value}
                  </p>
                  <p className="text-xs mt-0.5 uppercase tracking-wider text-white/50">{s.label}</p>
                </div>
              ))}
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
