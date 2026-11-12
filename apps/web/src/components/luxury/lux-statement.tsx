import { Reveal } from "./reveal";

// The breath after the film: the brand line alone, with a short gold rule
export function LuxStatement() {
  return (
    <section className="bg-lx-page">
      <Reveal className="container-site flex flex-col items-center py-28 text-center lg:py-40">
        <h2 className="font-display text-[clamp(26px,3vw,38px)] font-normal leading-[1.15] tracking-[-0.01em] text-lx-text">
          Real Estate. <span className="italic text-lx-pale">Real Relationships.</span>
        </h2>
        <span className="mt-10 block h-px w-12 bg-lx-gold" aria-hidden="true" />
      </Reveal>
    </section>
  );
}
