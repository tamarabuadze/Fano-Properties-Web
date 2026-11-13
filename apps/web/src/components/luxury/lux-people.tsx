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

// Full-width banner: a row of team portraits with names and titles.
// Dark surface background — section number, headline, then the grid of faces.
export function LuxPeople({ people }: { people: Person[] }) {
  if (!people.length) return null;

  return (
    <section className="bg-lx-surface py-24 lg:py-36">
      <div className="container-site">
        <Reveal className="mb-14 lg:mb-16">
          <p className="lx-numeral">05</p>
          <h2 className="mt-5 font-display text-[clamp(32px,3.8vw,50px)] font-normal leading-[1.02] tracking-[-0.01em] text-lx-text">
            The people{" "}
            <span className="italic text-lx-pale">behind every deal.</span>
          </h2>
          <p className="mt-6 max-w-lg text-[15px] leading-[1.8] text-lx-text/60">
            Our advisors bring deep local knowledge, honest counsel and the kind of attention that turns a transaction into a lasting relationship.
          </p>
        </Reveal>

        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {people.map((person, i) => {
            const name = [person.firstName, person.lastName].filter(Boolean).join(" ");
            const photo = person.avatar ?? "/hero-dubai.jpg";
            return (
              <Reveal key={person.slug} delay={i * 0.06}>
                <Link
                  href={`/agents/${person.slug}`}
                  className="group block"
                >
                  <div className="relative aspect-[3/4] overflow-hidden rounded-[4px] bg-lx-raised">
                    <SafeImage
                      src={photo}
                      unoptimized={!isOptimizedImageHost(photo)}
                      alt={name}
                      fill
                      sizes="(max-width: 639px) 50vw, (max-width: 1023px) 33vw, 25vw"
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

        <Reveal className="mt-12">
          <Link href="/agents" className="btn-gold">
            Meet the full team
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
