import Image from "next/image";
import Link from "next/link";
import { Reveal } from "./reveal";

// Closing still: the sunset skyline under a deep gradient, one serif line, one link
export function LuxClosing() {
  return (
    <section className="relative isolate flex min-h-[70vh] items-end overflow-hidden bg-lx-page lg:min-h-[85vh]" aria-labelledby="lx-closing-title">
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <Image src="/hero-dubai.jpg" alt="" fill sizes="100vw" quality={85} className="object-cover object-[60%_50%]" />
        <div className="absolute inset-0 bg-gradient-to-t from-lx-page via-lx-page/45 to-lx-page/10" />
      </div>

      <Reveal className="container-site relative z-10 flex flex-col items-start gap-8 pb-20 pt-40 lg:flex-row lg:items-end lg:justify-between lg:pb-28">
        <h2 id="lx-closing-title" className="font-display text-[clamp(36px,5vw,72px)] font-normal leading-[0.98] tracking-[-0.015em] text-lx-text text-balance">
          Your property.<br /><span className="italic text-lx-pale">Its next chapter.</span>
        </h2>
        <div className="max-w-sm">
          <p className="text-[15px] leading-[1.8] text-lx-text/70">
            Selling or leasing in Dubai? Share the details and an advisor will come back to you with a considered view.
          </p>
          <Link href="/contact" className="btn-gold mt-8">List with Fano</Link>
        </div>
      </Reveal>
    </section>
  );
}
