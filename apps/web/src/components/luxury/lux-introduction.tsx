import Link from "next/link";
import { Reveal } from "./reveal";

// One line and one link on the page colour, hairlines above and below
export function LuxIntroduction() {
  return (
    <section className="border-y border-lx-line bg-lx-page">
      <Reveal className="container-site flex flex-col items-start gap-10 py-24 lg:flex-row lg:items-center lg:justify-between lg:py-32">
        <div className="max-w-3xl">
          <p className="lx-numeral">03</p>
          <h2 className="mt-5 font-display text-[clamp(26px,3vw,40px)] font-normal leading-[1.1] tracking-[-0.01em] text-lx-text">
            Some of the finest homes in Dubai are never advertised.
            <span className="italic text-lx-pale"> Tell us what you are looking for.</span>
          </h2>
        </div>
        <Link href="/contact" className="btn-gold shrink-0">Request an introduction</Link>
      </Reveal>
    </section>
  );
}
