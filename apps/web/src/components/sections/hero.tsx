"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, Pause, Play } from "lucide-react";

const HERO_VIDEO = "/media/770e7ca3-8d03-48a5-93d1-0167f57336a9.mp4";

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = window.matchMedia("(min-width: 768px)");
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    let timer: ReturnType<typeof setTimeout>;
    const load = () => {
      if (!desktop.matches || reducedMotion.matches || connection?.saveData) return;
      timer = setTimeout(() => {
        video.src = HERO_VIDEO;
        video.load();
        void video.play().catch(() => setVideoReady(false));
      }, 250);
    };
    const respectMotion = () => {
      if (reducedMotion.matches) {
        video.pause(); setPaused(true); setVideoReady(false);
      }
    };
    if (document.readyState === "complete") load();
    else window.addEventListener("load", load, { once: true });
    reducedMotion.addEventListener("change", respectMotion);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("load", load);
      reducedMotion.removeEventListener("change", respectMotion);
      video.pause();
    };
  }, []);

  async function togglePlayback() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      try { await video.play(); setPaused(false); } catch { setVideoReady(false); }
    } else { video.pause(); setPaused(true); }
  }

  return (
    <section className="cinema-hero relative isolate overflow-hidden bg-[#2B2520] text-[#F4EFEA]" aria-label="Discover Fano Properties in Dubai">
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <Image src="/hero-dubai.webp" alt="" fill priority unoptimized
          sizes="(max-width: 767px) 160vw, 100vw" className="cinema-hero-image object-cover" />
        <video ref={videoRef} autoPlay muted loop playsInline preload="none" tabIndex={-1}
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-[1800ms]"
          style={{ opacity: videoReady ? 1 : 0 }}
          onPlaying={() => { setVideoReady(true); setPaused(false); }}
          onError={() => setVideoReady(false)} />
        <div className="cinema-hero-shade absolute inset-0" />
        <div className="cinema-grain absolute inset-0" />
      </div>
      <div className="cinema-hero-content container-site relative z-10">
        <div className="cinema-enter mb-7 flex items-center gap-4 text-[10px] font-medium uppercase tracking-[0.28em] text-[#F6E7D2] sm:text-xs">
          <span className="h-px w-10 bg-[#E2A862]" aria-hidden="true" />
          Dubai real estate, thoughtfully selected
        </div>
        <h1 className="cinema-enter cinema-enter-1 max-w-5xl text-[clamp(42px,6.7vw,96px)] font-medium leading-[1.04] tracking-[-0.045em]">
          Real Estate.<br />
          <span className="cinema-serif mt-2 inline-block text-[#F6E7D2]">Real Relationships.</span>
        </h1>
        <div className="cinema-enter cinema-enter-2 mt-8 grid gap-8 lg:grid-cols-[1fr_320px] lg:items-end lg:gap-16 xl:gap-24">
          <div>
            <p className="max-w-lg text-[15px] leading-[1.8] text-[#F4EFEA]/85 sm:text-base">
              Remarkable homes. Ambitious workspaces. A personal approach to finding your place in Dubai.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/properties" className="cinema-button cinema-button-gold">
                Explore properties <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link href="/contact" className="cinema-button cinema-button-glass">
                Meet your advisor <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
          <Link href="/properties?category=commercial&listingType=sale" className="group hidden border-l border-[#F6E7D2]/30 pl-7 pr-16 lg:block">
            <span className="text-[10px] uppercase tracking-[0.24em] text-[#F6E7D2]/70">For your next ambition</span>
            <span className="mt-3 flex items-center justify-between gap-4 text-xl font-medium">
              Offices for sale <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden="true" />
            </span>
            <span className="mt-2 block text-xs leading-relaxed text-[#F4EFEA]/70">Explore Dubai&apos;s commercial collection</span>
          </Link>
        </div>
      </div>
      <div className="cinema-hero-bottom container-site relative z-10 flex items-center justify-between gap-5 border-t border-[#F6E7D2]/20 py-6">
        <a href="#discover" className="group inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.22em] text-[#F4EFEA]/80">
          <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-1" aria-hidden="true" /> Discover the collection
        </a>
        <div className="flex items-center gap-5">
          <span className="hidden text-[10px] uppercase tracking-[0.22em] text-[#F4EFEA]/65 sm:block">A new perspective on Dubai</span>
          {videoReady && <button type="button" onClick={togglePlayback}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#F6E7D2]/40 bg-[#2B2520]/20 transition hover:bg-[#2B2520]/60"
            aria-label={paused ? "Play background film" : "Pause background film"}>
            {paused ? <Play className="h-3.5 w-3.5" aria-hidden="true" /> : <Pause className="h-3.5 w-3.5" aria-hidden="true" />}
          </button>}
        </div>
      </div>
    </section>
  );
}
