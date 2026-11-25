import Image from "next/image";
import type { ReactNode } from "react";

// The opening of every inner page, in the style of the homepage's "Dubai, by introduction." band:
// a Fano photograph under an even warm shade, a gold eyebrow between hairlines, a light serif
// headline with an italic accent, and a diamond ornament. The colours are fixed so the banner reads
// the same in the sand and navy themes. It rises in with CSS, so the headline is in the first paint.
//
// centred (default): headline, ornament and a short line beneath, for pages that open on a title.
// `aside`: headline on the left and a panel on the right (an enquiry form), for listings pages.

interface PageBannerProps {
  image: string;
  /** CSS object-position for the photograph, e.g. "50% 60%" */
  position?: string;
  eyebrow: string;
  title: ReactNode;
  accent?: ReactNode;
  subtitle?: ReactNode;
  /** Shown above the eyebrow (breadcrumbs) */
  before?: ReactNode;
  /** Shown under the subtitle (buttons, a date) */
  children?: ReactNode;
  /** A panel beside the headline; switches to the left-aligned layout */
  aside?: ReactNode;
  /** "lg" is the full statement height; "md" keeps a form close below */
  size?: "lg" | "md";
}

const isLocal = (src: string) => src.startsWith("/media/");

function Rule({ className = "" }: { className?: string }) {
  return <span className={`block h-px bg-[#E2A862] opacity-70 ${className}`} />;
}

export function PageBanner({ image, position = "50% 50%", eyebrow, title, accent, subtitle, before, children, aside, size = "lg" }: PageBannerProps) {
  const split = Boolean(aside);

  const heading = (
    <>
      {before}
      <div className={`mb-7 flex items-center gap-4 ${split ? "" : "justify-center"}`}>
        <Rule className="w-10" />
        <p className="font-label text-[10px] font-semibold uppercase tracking-[0.28em] text-[#E2A862]">{eyebrow}</p>
        {!split && <Rule className="w-10" />}
      </div>
      <h1 className="font-display text-[clamp(36px,5vw,64px)] font-normal leading-[1.05] tracking-[-0.02em] text-[#F7F1E8] text-balance [text-shadow:0_2px_24px_rgba(0,0,0,0.35)]">
        {title}
        {accent ? (
          <>
            {" "}
            <span className="italic text-[#E9D3B4]">{accent}</span>
          </>
        ) : null}
      </h1>
      {!split && (
        <div className="mt-9 flex items-center justify-center gap-3" aria-hidden="true">
          <Rule className="w-14" />
          <span className="block h-[5px] w-[5px] rotate-45 bg-[#E2A862]" />
          <Rule className="w-14" />
        </div>
      )}
      {subtitle ? (
        <div
          className={`text-[15px] leading-[1.85] text-[#F7F1E8]/85 [text-shadow:0_1px_12px_rgba(0,0,0,0.4)] ${
            split ? "mt-6 max-w-xl" : "mx-auto mt-7 max-w-xl"
          }`}
        >
          {subtitle}
        </div>
      ) : null}
      {children}
    </>
  );

  return (
    <section className="relative isolate overflow-hidden bg-[#1A1612]">
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <Image
          src={image}
          alt=""
          fill
          priority
          unoptimized={isLocal(image)}
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: position }}
        />
        {/* Even warm shade, a little deeper behind the words */}
        <div className="absolute inset-0 bg-[#2B2520]/55" />
        <div
          className="absolute inset-0"
          style={{
            background: split
              ? "linear-gradient(90deg, rgba(26,22,18,0.6) 0%, rgba(26,22,18,0.3) 55%, rgba(26,22,18,0.15) 100%)"
              : "radial-gradient(ellipse 60% 55% at 50% 50%, rgba(43,37,32,0.45) 0%, rgba(43,37,32,0) 100%)",
          }}
        />
      </div>

      {split ? (
        <div className="container-site grid gap-10 py-16 lg:grid-cols-[1fr_380px] lg:items-center lg:gap-16 lg:py-24">
          <div className="lx-rise lx-photo-type">{heading}</div>
          {aside}
        </div>
      ) : (
        <div
          className={`lx-rise lx-photo-type container-site flex flex-col items-center text-center ${
            size === "lg" ? "min-h-[52vh] justify-center py-24 lg:min-h-[60vh] lg:py-32" : "py-20 lg:py-28"
          }`}
        >
          {heading}
        </div>
      )}
    </section>
  );
}
