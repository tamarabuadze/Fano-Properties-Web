import Link from "next/link";
import { SafeImage } from "@fano/ui";
import { isOptimizedImageHost } from "@fano/utils";
import { Reveal } from "./reveal";

interface Person {
  firstName: string;
  lastName: string | null;
  slug: string;
  avatar?: string | null;
  title?: string | null;
  specialization?: string | null;
}

// Slide 04: the whole team on one slide. The line and the direct number at the top,
// then every advisor's portrait with their name and title.
// Without advisors on file, the line and the office number stand alone.
export function LuxTeam({ people }: { people: Person[] }) {
  return (
    <section className="bg-lx-page py-24 lg:py-36">
      <div className="container-site">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-16">
          <Reveal className="lg:col-span-6">
            <p className="lx-numeral">04</p>
            <h2 className="mt-5 font-display text-[clamp(32px,3.8vw,50px)] font-normal leading-[1.02] tracking-[-0.01em] text-lx-text">
              A team <span className="italic text-lx-pale">on your side.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-5 lg:col-start-8">
            <p className="max-w-md text-[15px] leading-[1.8] text-lx-text/70">
              Local knowledge and clear conversations, from your first enquiry to the transfer at the Dubai Land Department.
              Every listing comes with its facts laid out before you decide: price, size, payment plan and handover, straight from the developer.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-lx-line pt-7">
              <a href="tel:+97145644635" className="lx-link lx-link-quiet">+971 4 564 4635</a>
              {people.length > 0 ? (
                <Link href="/agents" className="btn-gold">Meet the full team</Link>
              ) : (
                <Link href="/about" className="btn-gold">About Fano</Link>
              )}
            </div>
          </Reveal>
        </div>

        {people.length > 0 && (
          <div className="mt-16 grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:mt-20 lg:grid-cols-4 lg:gap-x-6 xl:grid-cols-5">
            {people.map((person, i) => {
              const name = [person.firstName, person.lastName].filter(Boolean).join(" ");
              const photo = person.avatar ?? "/hero-dubai.jpg";
              return (
                <Reveal key={person.slug} delay={Math.min(i, 8) * 0.06}>
                  <Link href={`/agents/${person.slug}`} className="group block">
                    <div className="relative aspect-[3/4] overflow-hidden rounded-[4px] bg-lx-raised">
                      <SafeImage
                        src={photo}
                        unoptimized={!isOptimizedImageHost(photo)}
                        alt={name}
                        fill
                        sizes="(max-width: 639px) 50vw, (max-width: 1023px) 33vw, (max-width: 1279px) 25vw, 20vw"
                        className="object-cover transition-[transform,opacity] duration-[1200ms] ease-out group-hover:scale-[1.04] group-hover:opacity-85"
                      />
                    </div>
                    <div className="mt-4">
                      <p className="font-display text-[18px] font-normal leading-tight text-lx-text transition-colors group-hover:text-lx-gold">
                        {name}
                      </p>
                      {(person.title || person.specialization) && (
                        <p className="mt-1 font-label text-[10px] font-semibold uppercase tracking-[0.18em] text-lx-muted">
                          {person.title ?? person.specialization}
                        </p>
                      )}
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
