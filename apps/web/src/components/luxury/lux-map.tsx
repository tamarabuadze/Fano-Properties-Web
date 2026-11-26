"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { MapProperty } from "@/lib/dubai-areas";
import type { EnginePoint, FanoMapController, MapLibre } from "./lux-map-engine";
import { Reveal } from "./reveal";

const KIND_LABEL: Record<MapProperty["kind"], string> = { office: "Office", shop: "Shop", home: "Apartment", villa: "Villa" };

interface Office { title: string; area: string; lng: number; lat: number }

// MapLibre GL (the open-source map renderer) from the jsDelivr CDN, pinned with integrity hashes,
// fetched only when the map slide comes near the screen
const ML = "https://cdn.jsdelivr.net/npm/maplibre-gl@5.24.1/dist/maplibre-gl";
const ML_JS_SRI = "sha384-nXMl9YiLoSG5KBPTFgvxVuIqQQcqIvo0bFrvoEaGJC6r7IibIzF1S36Zbf/sKBtL";
const ML_CSS_SRI = "sha384-uTttxo/aOKbdE5RlD/SPzSDoDmNvGlUYPjONi2MN/b7c9HPSvW07OIuyP7uL6jxK";

let loading: Promise<MapLibre> | null = null;
function loadMapLibre(): Promise<MapLibre> {
  const w = window as unknown as { maplibregl?: MapLibre };
  if (w.maplibregl) return Promise.resolve(w.maplibregl);
  loading ??= new Promise<MapLibre>((resolve, reject) => {
    const css = document.createElement("link");
    Object.assign(css, { rel: "stylesheet", href: `${ML}.css`, integrity: ML_CSS_SRI, crossOrigin: "anonymous" });
    document.head.appendChild(css);
    const js = document.createElement("script");
    Object.assign(js, { src: `${ML}.js`, integrity: ML_JS_SRI, crossOrigin: "anonymous", async: true });
    js.onload = () => (w.maplibregl ? resolve(w.maplibregl) : reject(new Error("MapLibre missing")));
    js.onerror = () => {
      loading = null;
      reject(new Error("MapLibre failed to load"));
    };
    document.head.appendChild(js);
  });
  return loading;
}

// Slide 05: Dubai at night with every Fano listing as a gold tower. The map and its library load
// only when the slide comes near the screen, and the camera tour runs only while it is in view.
export function LuxMap({ properties, office }: { properties: MapProperty[]; office: Office }) {
  const sectionRef = useRef<HTMLElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const ctrl = useRef<FanoMapController | null>(null);
  const [active, setActive] = useState(-1);
  const [touring, setTouring] = useState(false);
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);

  // The office first, then the listings: the tour starts at home
  const points: EnginePoint[] = useMemo(
    () => [
      { title: office.title, area: office.area, kind: "hq", lng: office.lng, lat: office.lat },
      ...properties.map((p) => ({ title: p.title, area: p.area, kind: p.kind, lng: p.lng, lat: p.lat })),
    ],
    [properties, office]
  );

  useEffect(() => {
    const section = sectionRef.current;
    const el = mapRef.current;
    if (!section || !el) return;
    let cancelled = false;
    let started = false;

    const start = async () => {
      started = true;
      try {
        const [ml, engine] = await Promise.all([loadMapLibre(), import("./lux-map-engine")]);
        if (cancelled) return;
        ctrl.current = engine.createFanoMap(ml, el, points, { onActive: setActive, onTour: setTouring });
        ctrl.current.map.once("load", () => setReady(true));
      } catch {
        if (!cancelled) setFailed(true);
      }
    };

    const near = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting && !started) start();
      },
      { rootMargin: "600px 0px" }
    );
    const inView = new IntersectionObserver(([e]) => ctrl.current?.setVisible(!!e?.isIntersecting), { threshold: 0.15 });
    near.observe(section);
    inView.observe(section);
    return () => {
      cancelled = true;
      near.disconnect();
      inView.disconnect();
      ctrl.current?.destroy();
      ctrl.current = null;
    };
  }, [points]);

  const current = active >= 0 ? points[active] : null;
  const currentListing = active > 0 ? properties[active - 1] : null;

  return (
    <section ref={sectionRef} className="lx-map-section relative overflow-hidden py-24 lg:py-32" data-hide-wa-float>
      <div className="container-site">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-16">
          <Reveal className="lg:col-span-6">
            <p className="lx-numeral !text-[#E2A862]">05</p>
            <h2 className="mt-5 font-display text-[clamp(32px,3.8vw,50px)] font-normal leading-[1.02] tracking-[-0.01em] text-[#F4EFEA]">
              Our Dubai, <span className="italic text-[#E2A862]">mapped.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-5 lg:col-start-8">
            <p className="max-w-md text-[15px] leading-[1.8] text-[#F4EFEA]/65">
              Every gold tower is a Fano listing. Tap one to fly over it, or let the camera take you across the city.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-[1680px] sm:px-6 lg:mt-16 lg:px-10">
        <div className="lx-map-frame relative h-[clamp(460px,76vh,860px)] overflow-hidden sm:rounded-[6px]">
          {/* MapLibre's stylesheet sets its own box to position: relative, so the map fills a sized wrapper */}
          <div className="absolute inset-0">
            <div ref={mapRef} className="h-full w-full" />
          </div>
          <div className="lx-map-veil pointer-events-none absolute inset-0" aria-hidden="true" />
          {!ready && !failed && (
            <div className="pointer-events-none absolute inset-0 grid place-items-center">
              <p className="lx-map-loading font-label text-[10px] font-semibold uppercase tracking-[0.3em] text-[#E2A862]/80">Loading the city</p>
            </div>
          )}
          {failed && (
            <div className="absolute inset-0 grid place-items-center px-8 text-center">
              <p className="max-w-sm text-[14px] leading-[1.7] text-[#F4EFEA]/70">
                The map couldn&apos;t load just now. Every listing is on the{" "}
                <Link href="/properties" className="text-[#E2A862] underline underline-offset-4">properties page</Link>.
              </p>
            </div>
          )}

          {/* Listings panel (computers) */}
          <div className="lx-map-panel absolute left-6 top-6 hidden max-h-[calc(100%-3rem)] w-[330px] flex-col lg:flex">
            <p className="px-5 pt-5 font-label text-[10px] font-semibold uppercase tracking-[0.24em] text-[#E2A862]">
              {properties.length} {properties.length === 1 ? "listing" : "listings"} on the map
            </p>
            <ul className="mt-3 min-h-0 flex-1 overflow-y-auto px-2 pb-2">
              {points.map((p, i) => (
                <li key={`${p.title}-${i}`}>
                  <button
                    type="button"
                    onClick={() => ctrl.current?.goTo(i)}
                    data-active={i === active || undefined}
                    className="lx-map-item group flex w-full items-start gap-3 rounded-[4px] px-3 py-2.5 text-left"
                  >
                    <span className={i === 0 ? "lx-map-swatch lx-map-swatch-hq" : "lx-map-swatch"} aria-hidden="true" />
                    <span className="min-w-0">
                      <span className="block truncate font-display text-[15px] leading-snug text-[#F4EFEA]">{i === 0 ? "Fano Properties office" : p.title}</span>
                      <span className="block truncate text-[11px] text-[#F4EFEA]/50">
                        {i === 0 ? p.area : `${KIND_LABEL[properties[i - 1]?.kind ?? "office"]} · ${p.area}`}
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-2 border-t border-[#E2A862]/20 p-3">
              <button type="button" onClick={() => ctrl.current?.setTouring(!touring)} className="lx-map-btn flex-1" disabled={!ready}>
                {touring ? "Pause the tour" : "Play the tour"}
              </button>
              <button type="button" onClick={() => ctrl.current?.goTo(-1)} className="lx-map-btn" disabled={!ready}>
                Whole city
              </button>
            </div>
          </div>

          {/* The listing the camera is on */}
          {current && (
            <div className="lx-map-card absolute right-4 top-4 w-[min(300px,calc(100%-2rem))] p-5 sm:right-6 sm:top-6">
              <p className="font-label text-[10px] font-semibold uppercase tracking-[0.22em] text-[#E2A862]">
                {currentListing
                  ? `${currentListing.listing === "sale" ? "For sale" : "For rent"} · ${KIND_LABEL[currentListing.kind]}`
                  : "Our office"}
              </p>
              <p className="mt-2 font-display text-[20px] leading-tight text-[#F4EFEA]">{currentListing ? current.title : "Fano Properties"}</p>
              <p className="mt-1 text-[12px] text-[#F4EFEA]/55">{current.area}</p>
              {currentListing ? (
                <Link href={`/properties/${currentListing.slug}`} className="lx-map-link mt-4">View property</Link>
              ) : (
                <Link href="/contact" className="lx-map-link mt-4">Visit us</Link>
              )}
            </div>
          )}
        </div>

        {/* Listings strip (phones and tablets) */}
        <div className="mt-4 flex gap-2 overflow-x-auto px-5 pb-2 sm:px-0 lg:hidden">
          <button type="button" onClick={() => ctrl.current?.setTouring(!touring)} className="lx-map-btn shrink-0" disabled={!ready}>
            {touring ? "Pause" : "Play tour"}
          </button>
          {points.map((p, i) => (
            <button
              key={`m-${p.title}-${i}`}
              type="button"
              onClick={() => ctrl.current?.goTo(i)}
              data-active={i === active || undefined}
              className="lx-map-chip shrink-0"
            >
              {i === 0 ? "Fano office" : p.title}
            </button>
          ))}
        </div>

        <p className="mt-4 px-5 text-[11px] leading-relaxed text-[#F4EFEA]/40 sm:px-0">
          Towers are illustrations. Listings without an exact address are shown in their community; each property page has the full location.
          Hold Ctrl (⌘ on Mac) to zoom with the mouse wheel, or use two fingers on a phone.
        </p>
      </div>
    </section>
  );
}
