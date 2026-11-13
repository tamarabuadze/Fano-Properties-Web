import type { Metadata } from "next";
import Image from "next/image";
import { ContactForm } from "./_components/contact-form";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Fano Properties. We're ready to help you with your property needs.",
  alternates: { canonical: "/contact" },
};

const details: { label: string; text: string; href?: string }[] = [
  { label: "Office", text: "3404, 34th Floor, Churchill Executive Tower, Business Bay, Dubai, UAE" },
  { label: "Phone", text: "+971 4 564 4635", href: "tel:+97145644635" },
  { label: "Email", text: "info@fanoproperties.com", href: "mailto:info@fanoproperties.com" },
  { label: "Hours", text: "Mon–Fri 9am–6pm, Sat 10am–4pm" },
];

// A serif "Contact us", the form with hairline fields and a "How can we help?" choice,
// then the office photograph across the page
export default function ContactPage() {
  return (
    <div className="min-h-screen pt-20">
      <div className="container-site py-14 lg:py-24">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
          {/* Introduction and details */}
          <div className="lg:col-span-5">
            <p className="lx-eyebrow mb-5">Get in touch</p>
            <h1 className="font-display text-[clamp(36px,4.6vw,56px)] font-normal leading-[1.0] tracking-[-0.01em] text-lx-text">
              Contact us
            </h1>
            <p className="mt-6 max-w-md text-[15px] leading-[1.85] text-lx-text/70">
              Whether you&apos;re buying, selling, or just exploring your options, our team is here to help.
            </p>

            <dl className="mt-12 divide-y divide-lx-line border-y border-lx-line">
              {details.map(({ label, text, href }) => (
                <div key={label} className="grid grid-cols-[88px_1fr] gap-4 py-4">
                  <dt className="font-label text-[10px] font-semibold uppercase tracking-[0.2em] text-lx-gold pt-1">{label}</dt>
                  <dd className="text-[14px] leading-[1.7] text-lx-text/80">
                    {href ? (
                      <a
                        href={href}
                        data-track={href.startsWith("tel:") ? "phone_click" : undefined}
                        className="underline-offset-4 transition-colors hover:text-lx-gold hover:underline"
                      >
                        {text}
                      </a>
                    ) : (
                      text
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </div>

      {/* The office */}
      <section className="container-site pb-16 lg:pb-24">
        <div className="relative aspect-[16/9] overflow-hidden rounded-[4px] bg-lx-raised lg:aspect-[21/9]">
          <Image
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1600&auto=format"
            alt="The Fano Properties office"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-lx-page/75 to-transparent p-6 lg:p-10">
            <p className="lx-eyebrow text-lx-gold">Business Bay, Dubai</p>
            <p className="mt-3 font-display text-[clamp(24px,3vw,40px)] font-normal leading-tight text-lx-text">
              Churchill Executive Tower, 34th floor
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
