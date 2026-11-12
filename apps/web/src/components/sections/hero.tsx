"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Pause, Play } from "lucide-react";

// Aerial of the Burj Al Arab: a slow, eased push-in that returns to its start, graded
// to the Calcite Sand palette. Poster is its first frame.
const HERO_VIDEO = "/hero-aerial.mp4";
const HERO_POSTER = "/hero-aerial.jpg";

// Split hero on the bone page: the film sits left in a tall frame, the serif
// headline, a short champagne rule and the invitation sit right.
export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [paused, setPaused] = useState(false);

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
    <section className="pt-16 lg:pt-20" aria-label="Discover Fano Properties in Dubai">
      <div className="container-site grid items-center gap-10 py-10 lg:grid-cols-12 lg:gap-14 lg:py-16 xl:py-20">
        {/* Film */}
        <div className="cinema-enter relative lg:col-span-6">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[4px] bg-[#E6DFD5] lg:aspect-[5/6]">
            <Image src={HERO_POSTER} alt="" fill priority unoptimized sizes="(max-width: 1023px) 100vw, 50vw" className="object-cover" />
            <video ref={videoRef} autoPlay muted loop playsInline preload="none" tabIndex={-1} poster={HERO_POSTER}
              className="absolute inset-0 h-full w-full object-cover transition-opacity duration-[1800ms]"
              style={{ opacity: videoReady ? 1 : 0 }}
              onPlaying={() => { setVideoReady(true); setPaused(false); }}
              onError={() => setVideoReady(false)} />
            {videoReady && (
              <button type="button" onClick={togglePlayback}
                className="absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/50 bg-[#2B2520]/35 text-white backdrop-blur-sm transition hover:bg-[#2B2520]/60"
                aria-label={paused ? "Play background film" : "Pause background film"}>
                {paused ? <Play className="h-3.5 w-3.5" aria-hidden="true" /> : <Pause className="h-3.5 w-3.5" aria-hidden="true" />}
              </button>
            )}
          </div>
        </div>

        {/* Words */}
        <div className="lg:col-span-6 lg:pl-4 xl:pl-10">
          <p className="eyebrow cinema-enter">Dubai real estate, thoughtfully selected</p>
          <h1 className="cinema-enter cinema-enter-1 mt-6 font-display text-[clamp(44px,6.2vw,88px)] font-normal leading-[1.02] tracking-[-0.01em] text-[#2B2520]">
            Real Estate.<br />
            <span className="italic text-[#8C6A47]">Real Relationships.</span>
          </h1>
          <div className="rule-gold cinema-enter cinema-enter-2 mt-9" aria-hidden="true" />
          <p className="cinema-enter cinema-enter-2 mt-7 max-w-md text-[15px] leading-[1.85] text-[#2B2520]/75">
            Remarkable homes and ambitious workspaces, presented with the care they deserve. A Business Bay team that delivers precise, considered results in every transaction.
          </p>
          <div className="cinema-enter cinema-enter-2 mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link href="/properties" className="link-rule">View our inventory</Link>
            <Link href="/contact" className="btn-pill-outline">Speak to an advisor</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
