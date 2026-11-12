import Link from "next/link";

// Full-width espresso band with a centred serif line, as the reference's
// "Invitation Only" band: one sentence, one outlined button
export function InvitationBand() {
  return (
    <section className="bg-[#2B2520] text-[#F4EFEA]">
      <div className="container-site py-20 text-center lg:py-24">
        <h2 className="font-display text-[clamp(32px,4vw,52px)] font-normal leading-[1.05] tracking-[-0.01em]">
          Off-market, by introduction.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-[14px] leading-[1.8] text-[#F4EFEA]/70">
          Some of the finest homes and office floors in Dubai never reach the portals. Tell us what you are looking for
          and an advisor will bring you the ones that fit.
        </p>
        <Link
          href="/contact"
          className="btn-gold mt-9"
        >
          Request an introduction
        </Link>
      </div>
    </section>
  );
}
