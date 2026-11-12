"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const HERO_VIDEO = "/hero-aerial.mp4";
const HERO_POSTER = "/hero-aerial.jpg";

// Full-screen film under a gradient that deepens toward the bottom third.
// One headline, one sentence, two text links. Nothing else in the frame.
export function LuxHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    let timer: ReturnType<typeof setTimeout>;
    const load = () => {
      if (reducedMotion.matches || connection?.saveData) return;
      timer = setTimeout(() => {
        video.src = HERO_VIDEO;
        video.load();
        void video.play().catch(() => setVideoReady(false));
      }, 250);
    };
    if (document.readyState === "complete") load();
    else window.addEventListener("load", load, { once: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("load", load);
      video.pause();
    };
  }, []);

  return (
    <section className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-lx-page" aria-label="Fano Properties, Dubai">
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <Image src={HERO_POSTER} alt="" fill priority unoptimized sizes="100vw" className="object-cover" />
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          tabIndex={-1}
          poster={HERO_POSTER}
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-[2000ms]"
          style={{ opacity: videoReady ? 1 : 0 }}
          onPlaying={() => setVideoReady(true)}
          onError={() => setVideoReady(false)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-lx-page via-lx-page/35 to-lx-page/10" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-lx-page/60 to-transparent" />
      </div>

      {/* Top-right caption */}
      <p className="lx-rise absolute right-5 top-24 hidden font-label text-[10px] font-semibold uppercase tracking-[0.24em] text-lx-text/60 sm:right-8 lg:right-12 lg:top-28 lg:block">
        Business Bay · Dubai · RERA 49852
      </p>

      <div className="container-site relative z-10 grid pb-20 pt-40 lg:grid-cols-12 lg:pb-28">
        <div className="lg:col-span-8 xl:col-span-7">
          <p className="lx-eyebrow lx-rise">Private real estate advisory</p>
          <h1 className="lx-rise lx-rise-1 mt-7 font-display text-[clamp(40px,6vw,84px)] font-normal leading-[0.98] tracking-[-0.015em] text-lx-text">
            Dubai,<br />
            <span className="italic text-lx-pale">by introduction.</span>
          </h1>
          <p className="lx-rise lx-rise-2 mt-8 max-w-xl text-[15px] leading-[1.8] text-lx-text/70">
            A Business Bay advisory for the homes and office floors that are sold before they are listed.
          </p>
          <div className="lx-rise lx-rise-3 mt-10 flex flex-wrap items-center gap-x-10 gap-y-4">
            <Link href="/properties" className="btn-gold">View the collection</Link>
            <Link href="/contact" className="lx-link lx-link-quiet">Speak to an advisor</Link>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 right-6 hidden flex-col items-center gap-3 lg:right-12 lg:flex" aria-hidden="true">
        <span className="font-label text-[9px] uppercase tracking-[0.3em] text-lx-text/50 [writing-mode:vertical-rl]">Scroll</span>
        <span className="lx-scroll-line block h-14 w-px bg-lx-gold" />
      </div>
    </section>
  );
}
