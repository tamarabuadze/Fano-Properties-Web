import { FanoMark } from "@/components/shared/fano-logo";
import { Reveal } from "./reveal";

// The breath after the film: the brand line alone, with a short gold rule,
// the Fano mark faint behind it like a watermark
export function LuxStatement() {
  return (
    <section className="relative isolate overflow-hidden bg-lx-page">
      <FanoMark className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[78%] w-auto -translate-x-1/2 -translate-y-1/2 opacity-[0.07]" />
      <Reveal className="container-site flex flex-col items-center py-24 text-center lg:py-32">
        <h2 className="font-display text-[clamp(26px,3vw,38px)] font-normal leading-[1.15] tracking-[-0.01em] text-lx-text">
          Real Estate. <span className="italic text-lx-pale">Real Relationships.</span>
        </h2>
        <span className="mt-10 block h-px w-12 bg-lx-gold" aria-hidden="true" />
      </Reveal>
    </section>
  );
}
