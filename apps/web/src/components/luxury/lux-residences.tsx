import Link from "next/link";
import { LuxPropertyCard, type LuxPropertyCardProps } from "./lux-property-card";
import { Reveal } from "./reveal";

type Listing = Omit<LuxPropertyCardProps, "price" | "feature" | "priority" | "className"> & { id: string; price: number | string };

// Three listings only: one large, two beside it, with generous air
export function LuxResidences({ properties }: { properties: Listing[] }) {
  const [first, ...rest] = properties.slice(0, 3);

  return (
    <section className="bg-lx-page py-24 lg:py-36" id="discover">
      <div className="container-site">
        <Reveal className="mb-14 flex flex-col gap-6 lg:mb-20 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="lx-numeral">01</p>
            <h2 className="mt-5 font-display text-[clamp(36px,4.6vw,60px)] font-normal leading-[1.02] tracking-[-0.01em] text-lx-text">
              Selected <span className="italic text-lx-pale">residences.</span>
            </h2>
          </div>
          <Link href="/properties" className="lx-link shrink-0">View the collection</Link>
        </Reveal>

        {!first ? (
          <p className="py-20 text-center text-lx-muted">The collection is being prepared.</p>
        ) : (
          <div className="grid gap-x-10 gap-y-16 lg:grid-cols-12">
            <Reveal className="lg:col-span-8">
              <LuxPropertyCard {...first} price={Number(first.price)} feature priority />
            </Reveal>
            <div className="grid gap-y-16 sm:grid-cols-2 sm:gap-x-10 lg:col-span-4 lg:grid-cols-1">
              {rest.map((p, i) => (
                <Reveal key={p.id} delay={0.1 * (i + 1)}>
                  <LuxPropertyCard {...p} price={Number(p.price)} />
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
