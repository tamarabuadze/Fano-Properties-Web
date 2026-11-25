import type { Metadata } from "next";
import { buildPageMeta } from "@/lib/seo";
import Image from "next/image";
import { ContactForm } from "./_components/contact-form";
import { PageBanner } from "@/components/luxury/page-banner";

const title = "Contact Us";
const description = "Get in touch with Fano Properties. We're ready to help you with your property needs.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/contact" },
  ...buildPageMeta({ path: "/contact", title, description }),
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
      <PageBanner
        image="/media/5e91c869-8a1b-412a-833e-f4652c8bd957.jpg"
        size="md"
        eyebrow="Get in touch"
        title="Contact"
        accent="us."
        subtitle="Whether you're buying, selling, or just exploring your options, our team is here to help."
      />
      <div className="container-site py-14 lg:py-20">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
          {/* Contact details */}
          <div className="lg:col-span-5">
            <dl className="divide-y divide-lx-line border-y border-lx-line">
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
