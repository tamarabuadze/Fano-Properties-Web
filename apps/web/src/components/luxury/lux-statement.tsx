import { FanoMark } from "@/components/shared/fano-logo";
import { Reveal } from "./reveal";

export function LuxStatement() {
  return (
    <section className="relative isolate overflow-hidden bg-lx-page">
      {/* Ambient radial gold glow for depth */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.06] blur-[100px]"
        style={{ background: "radial-gradient(ellipse, #C4AD8E 0%, transparent 70%)" }}
        aria-hidden="true"
      />
      <FanoMark className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[80%] w-auto -translate-x-1/2 -translate-y-1/2 opacity-[0.09]" />

      <Reveal className="container-site flex flex-col items-center py-28 text-center lg:py-40">
        {/* Eyebrow with flanking rules */}
        <div className="mb-8 flex items-center gap-4" aria-hidden="true">
          <span className="block h-px w-10 bg-lx-gold opacity-50" />
          <span className="font-label text-[10px] font-semibold uppercase tracking-[0.28em] text-lx-gold/70">
            Business Bay · Dubai
          </span>
          <span className="block h-px w-10 bg-lx-gold opacity-50" />
        </div>

        <h2 className="font-display text-[clamp(32px,4.4vw,58px)] font-normal leading-[1.1] tracking-[-0.02em] text-lx-text">
          Dubai, <span className="italic text-lx-pale">by introduction.</span>
        </h2>

        {/* Diamond ornament */}
        <div className="mt-10 flex items-center gap-3" aria-hidden="true">
          <span className="block h-px w-14 bg-lx-gold opacity-60" />
          <span className="block h-[5px] w-[5px] rotate-45 bg-lx-gold" />
          <span className="block h-px w-14 bg-lx-gold opacity-60" />
        </div>

        <p className="mt-8 max-w-sm text-[14px] leading-[1.9] text-lx-text/50">
          A private advisory for clients who prefer that the finest addresses never reach the open market.
        </p>
      </Reveal>
    </section>
  );
}
