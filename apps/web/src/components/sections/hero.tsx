"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, Search } from "lucide-react";
import { cn } from "@fano/utils";

const HERO_IMAGE = "/hero-dubai.jpg";
const HERO_VIDEO = "/hero-dubai.mp4";

const POPULAR_AREAS = [
  "Business Bay",
  "Downtown Dubai",
  "Dubai Marina",
  "Palm Jumeirah",
  "JVC",
  "DIFC",
];

// Splits text into words, each revealed with a clip-path / overflow-hidden mask
function RevealWords({
  text,
  delay = 0,
  className,
}: {
  text: string;
  delay?: number;
  className?: string;
}) {
  return (
    <span className={className}>
      {text.split(" ").map((word, i) => (
        <span key={i} className="inline-block overflow-hidden leading-[1.1]">
          <motion.span
            className="inline-block"
            initial={{ y: "108%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.85,
              delay: delay + i * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </motion.span>
          {i < text.split(" ").length - 1 ? " " : ""}
        </span>
      ))}
    </span>
  );
}

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const router = useRouter();
  const [listingType, setListingType] = useState<"Buy" | "Rent">("Buy");
  const [location, setLocation] = useState("");

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Content fades + lifts as hero scrolls out
  const contentOpacity = useTransform(scrollYProgress, [0, 0.38], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.38], [0, -48]);

  // Load video only on wide screens after page interactive, respecting user prefs
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (
      !window.matchMedia("(min-width: 768px)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      conn?.saveData
    )
      return;

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

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (listingType === "Rent") params.set("listingType", "rent");
    if (location.trim()) params.set("search", location.trim());
    router.push(`/properties?${params.toString()}`);
  }

  return (
    <section
      ref={ref}
      className="relative h-[100svh] min-h-[700px] max-h-[1080px] overflow-hidden bg-[#2B2520]"
    >
      {/* ── Background layer ─────────────────────────────────── */}
      <div className="absolute inset-0" aria-hidden>
        {/* Ken Burns: gentle slow zoom-out on page load */}
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 12, ease: "easeOut" }}
        >
          <Image
            src={HERO_IMAGE}
            alt=""
            fill
            priority
            sizes="(max-aspect-ratio: 16/9) 178vh, 100vw"
            className="object-cover object-center"
          />
        </motion.div>

        {/* Video fades in over poster once it can play */}
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ opacity: videoReady ? 1 : 0, transition: "opacity 1.6s ease-in-out" }}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          onCanPlay={() => setVideoReady(true)}
        />
      </div>

      {/* ── Cinematic overlay stack ───────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        {/* Left-to-right gradient: text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-black/10" />
        {/* Top/bottom vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/90" />
        {/* Corner vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 130% 100% at 50% 50%, transparent 38%, rgba(0,0,0,0.6) 100%)",
          }}
        />
      </div>

      {/* ── Content (fades + rises on scroll) ───────────────── */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 h-full flex flex-col justify-end pb-10 lg:pb-16"
      >
        <div className="container-site">
          <div className="max-w-3xl">

            {/* Eyebrow — expanding line + label */}
            <div className="flex items-center gap-3 mb-6 overflow-hidden">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                style={{ originX: 0 }}
                className="h-px w-10 bg-gradient-to-r from-[#E2A862] to-[#ECBE80] shrink-0"
              />
              <motion.p
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-[#E2A862] text-[11px] font-semibold uppercase tracking-[0.22em]"
              >
                Premium Real Estate · Dubai
              </motion.p>
            </div>

            {/* Headline — word-by-word reveal */}
            <h1 className="font-semibold heading-display text-[clamp(38px,5.5vw,76px)] mb-5 leading-[1.04]">
              <div className="mb-1">
                <RevealWords text="Real Estate." delay={0.3} className="text-white" />
              </div>
              <div>
                <RevealWords text="Real Relationships." delay={0.52} className="text-white/55" />
              </div>
            </h1>

            {/* Subline */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
              className="text-white/55 text-base max-w-lg mb-8 leading-relaxed"
            >
              We help you find more than a property — we find your next chapter.
            </motion.p>

            {/* ── Integrated Search Bar (McCone-style) ─────────── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.15, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Buy / Rent tabs */}
              <div className="flex gap-0 mb-3">
                {(["Buy", "Rent"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setListingType(tab)}
                    className={cn(
                      "px-6 py-2 text-sm font-semibold rounded-t-lg transition-all duration-200",
                      listingType === tab
                        ? "bg-white text-[#2B2520]"
                        : "bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm"
                    )}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Search input row */}
              <form onSubmit={handleSearch} className="flex gap-0">
                <input
                  type="text"
                  placeholder="Search a community or building..."
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="flex-1 h-13 px-5 py-3.5 bg-white text-[#2B2520] placeholder:text-zinc-400 text-sm focus:outline-none rounded-l-lg min-w-0"
                />
                <button
                  type="submit"
                  className="h-13 px-7 py-3.5 bg-gradient-to-br from-[#ECBE80] via-[#E2A862] to-[#B9824A] text-[#2B2520] font-semibold text-sm flex items-center gap-2 rounded-r-lg hover:brightness-105 transition-all whitespace-nowrap shadow-[0_4px_20px_-6px_rgba(185,130,74,.8)]"
                >
                  <Search className="h-4 w-4" />
                  Search
                </button>
              </form>

              {/* Popular area chips */}
              <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5">
                <span className="text-xs text-white/40 font-medium">Popular:</span>
                {POPULAR_AREAS.map((area) => (
                  <button
                    key={area}
                    type="button"
                    onClick={() => {
                      setLocation(area);
                      const params = new URLSearchParams();
                      if (listingType === "Rent") params.set("listingType", "rent");
                      params.set("search", area);
                      router.push(`/properties?${params.toString()}`);
                    }}
                    className="text-xs text-white/60 hover:text-white transition-colors"
                  >
                    {area}
                  </button>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </motion.div>

      {/* ── Animated scroll chevron ───────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.9, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1"
        aria-hidden
      >
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-6 w-6 text-white/35" />
        </motion.div>
      </motion.div>

      {/* ── Scroll-progress bar ───────────────────────────────── */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#E2A862] via-[#ECBE80] to-[#B9824A] z-20 origin-left"
        style={{ scaleX: scrollYProgress }}
      />
    </section>
  );
}
