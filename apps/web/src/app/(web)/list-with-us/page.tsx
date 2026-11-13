import type { Metadata } from "next";
import { ListForm } from "./_components/list-form";

export const metadata: Metadata = {
  title: "List Your Property",
  description:
    "List your Dubai property with Fano Properties. We introduce your home or investment to qualified, discreet buyers — often before it ever reaches the open market.",
  alternates: { canonical: "/list-with-us" },
};

const whyUs = [
  {
    title: "Qualified buyers only.",
    body: "Every buyer in our network has been verified. No time-wasters, no low-ball offers — just serious individuals who are ready to move.",
  },
  {
    title: "Discreet, by design.",
    body: "Many of our listings never appear publicly. We introduce your property to the right people directly, protecting your privacy at every step.",
  },
  {
    title: "Fair pricing, backed by data.",
    body: "Our advisors provide a clear, evidence-based valuation before we begin. No inflated numbers to win the mandate — just honest guidance.",
  },
  {
    title: "One point of contact.",
    body: "A single senior advisor manages your listing from valuation to transfer at the Dubai Land Department. No handoffs, no gaps.",
  },
];

export default function ListWithUsPage() {
  return (
    <div className="min-h-screen pt-20">
      <div className="container-site py-14 lg:py-24">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">

          {/* Left — copy */}
          <div className="lg:col-span-5">
            <p className="lx-eyebrow mb-5">List with Fano</p>
            <h1 className="font-display text-[clamp(36px,4.6vw,56px)] font-normal leading-[1.0] tracking-[-0.01em] text-lx-text">
              Your property,<br />in front of the<br />right buyers.
            </h1>
            <p className="mt-6 max-w-md text-[15px] leading-[1.85] text-lx-text/70">
              We work by introduction. Our buyers are pre-qualified, discreet, and motivated — many acquisitions are agreed before a property is ever publicly listed. Tell us about your home or investment and we will be in touch within 24 hours.
            </p>

            <dl className="mt-12 space-y-8">
              {whyUs.map(({ title, body }) => (
                <div key={title} className="border-l-2 border-lx-gold pl-5">
                  <dt className="font-display text-[16px] font-normal text-lx-text">{title}</dt>
                  <dd className="mt-1 text-[14px] leading-[1.75] text-lx-text/65">{body}</dd>
                </div>
              ))}
            </dl>

            <p className="mt-12 text-[13px] italic leading-[1.7] text-lx-text/50">
              &ldquo;Fano arranged a buyer before we even discussed marketing. The whole process was seamless and completely confidential.&rdquo;
              <span className="mt-2 block not-italic text-lx-gold">— Private seller, Business Bay</span>
            </p>
          </div>

          {/* Right — form */}
          <div className="lg:col-span-7">
            <div className="rounded-[4px] border border-lx-line bg-lx-surface p-6 lg:p-8">
              <p className="lx-eyebrow mb-4">Property details</p>
              <h2 className="mb-2 font-display text-[24px] font-normal leading-tight text-lx-text">
                Tell us about your property
              </h2>
              <p className="mb-8 text-[14px] leading-[1.75] text-lx-text/60">
                Complete the form below and a senior advisor will review your submission and contact you within 24 hours to discuss next steps — with no obligation.
              </p>
              <ListForm />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
