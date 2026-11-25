import Image from "next/image";
import { Reveal } from "./reveal";

// "Dubai, by introduction." over the beachfront of the Palm Jebel Ali villas (from that listing's
// photos in the site's media), shaded warm so the light type reads the same in both site themes
export function LuxStatement() {
  return (
    <section className="relative isolate overflow-hidden bg-[#1A1612]">
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <Image
          src="/media/25de9424-2da9-4296-846b-5bfed77e3352.jpg"
          alt=""
          fill
          unoptimized
          sizes="100vw"
          className="object-cover object-[60%_55%]"
        />
        {/* Even shade over the whole photo, a little deeper behind the words */}
        <div className="absolute inset-0 bg-[#2B2520]/55" />
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse 60% 55% at 50% 50%, rgba(43,37,32,0.45) 0%, rgba(43,37,32,0) 100%)" }}
        />
      </div>

      <Reveal className="container-site flex flex-col items-center py-28 text-center lg:py-40">
        {/* Eyebrow with flanking rules */}
        <div className="mb-8 flex items-center gap-4" aria-hidden="true">
          <span className="block h-px w-10 bg-[#E2A862] opacity-70" />
          <span className="font-label text-[10px] font-semibold uppercase tracking-[0.28em] text-[#E2A862]">
            Business Bay · Dubai
          </span>
          <span className="block h-px w-10 bg-[#E2A862] opacity-70" />
        </div>

        <h2 className="font-display text-[clamp(32px,4.4vw,58px)] font-normal leading-[1.1] tracking-[-0.02em] text-[#F7F1E8] [text-shadow:0_2px_24px_rgba(0,0,0,0.35)]">
          Dubai, <span className="italic text-[#E9D3B4]">by introduction.</span>
        </h2>

        {/* Diamond ornament */}
        <div className="mt-10 flex items-center gap-3" aria-hidden="true">
          <span className="block h-px w-14 bg-[#E2A862] opacity-70" />
          <span className="block h-[5px] w-[5px] rotate-45 bg-[#E2A862]" />
          <span className="block h-px w-14 bg-[#E2A862] opacity-70" />
        </div>

        <p className="mt-8 max-w-sm text-[14px] leading-[1.9] text-[#F7F1E8]/85 [text-shadow:0_1px_12px_rgba(0,0,0,0.4)]">
          A private advisory for clients who prefer that the finest addresses never reach the open market.
        </p>
      </Reveal>
    </section>
  );
}
