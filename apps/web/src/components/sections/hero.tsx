"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown, Search } from "lucide-react";

const HERO_IMAGE = "/hero-dubai.jpg";
const HERO_VIDEO = "/hero-dubai.mp4";

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
          {i < text.split(" ").length - 1 ? " " : ""}
        </span>
      ))}
    </span>
  );
}

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);

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
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/10" />
        {/* Top/bottom vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/85" />
        {/* Corner vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 130% 100% at 50% 50%, transparent 38%, rgba(0,0,0,0.7) 100%)",
          }}
        />
      </div>

      {/* ── Content (fades + rises on scroll) ───────────────── */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 h-full flex flex-col justify-end pb-10 lg:pb-20 xl:pb-24"
      >
        <div className="container-site">
          <div className="max-w-4xl">

            {/* Eyebrow — expanding line + label */}
            <div className="flex items-center gap-3 mb-7 overflow-hidden">
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
            <h1 className="font-semibold heading-display text-[clamp(42px,6.5vw,88px)] mb-7 leading-[1.04]">
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
              transition={{ duration: 0.8, delay: 1.05, ease: [0.22, 1, 0.36, 1] }}
              className="text-white/60 text-lg max-w-xl mb-10 leading-relaxed"
            >
              We help you find more than a property — we find your next chapter.
              Buy, sell or rent with confidence.
            </motion.p>

            {/* CTA row */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap gap-4"
            >
              {/* Primary — gold button with glow */}
              <motion.div
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 350, damping: 22 }}
              >
                <Link
                  href="/properties"
                  className="inline-flex items-center gap-2.5 h-14 px-8 rounded-full bg-gradient-to-br from-[#ECBE80] via-[#E2A862] to-[#B9824A] text-[#2B2520] font-semibold text-base shadow-[0_8px_28px_-6px_rgba(185,130,74,.75)] hover:shadow-[0_14px_40px_-6px_rgba(185,130,74,.95)] transition-shadow duration-300"
                >
                  <Search className="h-4 w-4" />
                  Browse Properties
                </Link>
              </motion.div>

              {/* Secondary — glass button */}
              <motion.div
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 350, damping: 22 }}
              >
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2.5 h-14 px-8 rounded-full border border-white/35 bg-white/10 text-white font-medium text-base hover:bg-white/20 hover:border-white/55 backdrop-blur-sm transition-all duration-300"
                >
                  Talk to an Agent
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </motion.div>
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
          <ChevronDown className="h-6 w-6 text-white/40" />
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
