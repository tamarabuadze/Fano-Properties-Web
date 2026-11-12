import Image from "next/image";
import Link from "next/link";
import { isOptimizedImageHost } from "@fano/utils";
import { Reveal } from "./reveal";

interface Advisor {
  firstName: string;
  lastName: string | null;
  slug: string;
  avatar?: string | null;
  title?: string | null;
  phone?: string | null;
  email?: string | null;
}

// Not a grid: one photograph, one paragraph, a name and a direct line.
// Without an advisor on file, the city stands in for the portrait.
export function LuxTeam({ advisor }: { advisor?: Advisor | null }) {
  const name = advisor ? [advisor.firstName, advisor.lastName].filter(Boolean).join(" ") : null;
  const photo = advisor?.avatar || "/hero-dubai.jpg";

  return (
    <section className="bg-lx-page py-24 lg:py-36">
      <div className="container-site grid items-center gap-12 lg:grid-cols-12 lg:gap-20">
        <Reveal className="lg:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[4px] bg-lx-raised">
            <Image
              src={photo}
              unoptimized={!isOptimizedImageHost(photo)}
              alt={name ?? "Dubai skyline"}
              fill
              sizes="(max-width: 1023px) 100vw, 42vw"
              className="object-cover"
            />
          </div>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
          <p className="lx-numeral">04</p>
          <h2 className="mt-5 font-display text-[clamp(32px,3.8vw,50px)] font-normal leading-[1.02] tracking-[-0.01em] text-lx-text">
            A team <span className="italic text-lx-pale">on your side.</span>
          </h2>
          <span className="my-9 block h-14 w-px bg-lx-gold" aria-hidden="true" />
          <p className="max-w-md text-[15px] leading-[1.8] text-lx-text/70">
            Local knowledge and clear conversations, from your first enquiry to the transfer at the Dubai Land Department.
            Every listing comes with its facts laid out before you decide: price, size, payment plan and handover, straight from the developer.
          </p>

          {advisor && name ? (
            <div className="mt-10 border-t border-lx-line pt-8">
              <p className="font-display text-[24px] text-lx-text">{name}</p>
              {advisor.title && <p className="mt-1 font-label text-[10px] font-semibold uppercase tracking-[0.2em] text-lx-muted">{advisor.title}</p>}
              <div className="mt-5 flex flex-wrap gap-x-10 gap-y-3">
                {advisor.phone && <a href={`tel:${advisor.phone.replace(/\s+/g, "")}`} className="lx-link lx-link-quiet">{advisor.phone}</a>}
                <Link href={`/agents/${advisor.slug}`} className="btn-gold">Meet {advisor.firstName}</Link>
              </div>
            </div>
          ) : (
            <div className="mt-10 flex flex-wrap gap-x-10 gap-y-3 border-t border-lx-line pt-8">
              <a href="tel:+97145644635" className="lx-link lx-link-quiet">04 564 4635</a>
              <Link href="/about" className="btn-gold">About Fano</Link>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
