"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Pause, Play } from "lucide-react";

const HERO_VIDEO = "/hero-aerial.mp4";
const HERO_POSTER = "/hero-aerial.jpg";
const PAUSE_KEY = "fano-hero-video-paused";

// Full-screen film under a gradient that deepens toward the bottom third.
// One headline, one sentence, two text links. Nothing else in the frame.
export function LuxHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [hasVideo, setHasVideo] = useState(false);
  const [paused, setPaused] = useState(false);

  const startVideo = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (!video.getAttribute("src")) {
      video.src = HERO_VIDEO;
      video.load();
    }
    setHasVideo(true);
    void video.play().catch((err: unknown) => {
      setVideoReady(false);
      // Autoplay blocked (e.g. iOS Low Power Mode): show Play, but don't save it as the visitor's choice
      if (err instanceof DOMException && err.name === "NotAllowedError") setPaused(true);
    });
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    let storedPaused = false;
    try {
      storedPaused = localStorage.getItem(PAUSE_KEY) === "1";
    } catch {}
    let timer: ReturnType<typeof setTimeout>;
    const load = () => {
      if (reducedMotion.matches || connection?.saveData) return;
      if (storedPaused) {
        setHasVideo(true);
        setPaused(true);
        return;
      }
      timer = setTimeout(startVideo, 250);
    };
    // Turning on Reduce Motion mid-visit stops the film and returns to the still
    const onMotionChange = () => {
      if (!reducedMotion.matches) return;
      clearTimeout(timer);
      video.pause();
      setVideoReady(false);
      setPaused(true);
    };
    reducedMotion.addEventListener("change", onMotionChange);
    if (document.readyState === "complete") load();
    else window.addEventListener("load", load, { once: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("load", load);
      reducedMotion.removeEventListener("change", onMotionChange);
      video.pause();
    };
  }, [startVideo]);

  // Lets the floating seller CTA step back to an outline while the hero's own CTA is on screen
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entry]) => {
      document.body.toggleAttribute("data-hero-in-view", entry?.isIntersecting ?? false);
    });
    observer.observe(section);
    return () => {
      observer.disconnect();
      document.body.removeAttribute("data-hero-in-view");
    };
  }, []);

  const togglePaused = () => {
    const video = videoRef.current;
    if (!video) return;
    const next = !paused;
    setPaused(next);
    try {
      localStorage.setItem(PAUSE_KEY, next ? "1" : "0");
    } catch {}
    if (next) {
      video.pause();
      setVideoReady(false);
    } else {
      startVideo();
    }
  };

  return (
    <section ref={sectionRef} className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-lx-page" aria-label="Fano Properties, Dubai">
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <Image src={HERO_POSTER} alt="" fill priority fetchPriority="high" sizes="100vw" className="object-cover" />
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="none"
          tabIndex={-1}
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

      <div className="container-site relative z-10 grid pb-28 pt-32 sm:pt-40 lg:grid-cols-12">
        <div className="lg:col-span-8 xl:col-span-7">
          <p className="lx-rise font-sans text-[12px] font-medium uppercase tracking-[2.5px] text-[#E8D5B0]">Dubai&rsquo;s finest addresses, by introduction</p>
          <h1 className="lx-rise lx-rise-1 mt-3 font-display font-bold uppercase leading-none text-white">
            <span className="block text-[clamp(44px,5.6vw,72px)] tracking-[0.02em]">Fano</span>
            <span className="mt-2 block text-[clamp(18px,2.2vw,28px)] tracking-[0.32em] text-[#E8D5B0]">Properties</span>
          </h1>
          <p className="lx-rise lx-rise-1 mt-4 font-display text-[clamp(18px,1.9vw,24px)] font-normal italic leading-snug text-lx-pale">
            Real Estate. Real Relationships.
          </p>
          <p className="lx-rise lx-rise-2 mt-4 max-w-[420px] text-[16px] leading-[1.6] text-[#E5E5E5]">
            A Business Bay advisory for the homes and office floors that are sold before they are listed.
          </p>
          <div className="lx-rise lx-rise-3 mt-7 flex flex-wrap items-center gap-x-5 gap-y-4">
            <Link href="/properties" className="btn-gold">View the Collection</Link>
            <Link href="/agents" className="lx-underline">Speak to an Advisor</Link>
          </div>
        </div>
      </div>

      {/* Pause control for the looping film (WCAG 2.2.2) */}
      {hasVideo && (
        <div className="container-site pointer-events-none absolute inset-x-0 bottom-6 z-10 sm:bottom-8">
          <button
            type="button"
            onClick={togglePaused}
            aria-pressed={paused}
            aria-label="Pause background video"
            className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full border border-lx-gold/40 bg-lx-page/40 text-lx-text/80 backdrop-blur-sm transition-colors hover:border-lx-gold hover:text-lx-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lx-gold"
          >
            {paused ? <Play className="h-4 w-4" aria-hidden="true" /> : <Pause className="h-4 w-4" aria-hidden="true" />}
          </button>
        </div>
      )}

      {/* Scroll cue */}
      <div className="absolute bottom-28 right-6 hidden flex-col items-center gap-3 lg:right-12 lg:flex" aria-hidden="true">
        <span className="font-label text-[9px] uppercase tracking-[0.3em] text-lx-text/50 [writing-mode:vertical-rl]">Scroll</span>
        <span className="lx-scroll-line block h-14 w-px bg-lx-gold" />
      </div>
    </section>
  );
}
