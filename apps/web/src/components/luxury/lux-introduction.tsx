import { FanoLogo } from "@/components/shared/fano-logo";
import { Reveal } from "./reveal";

// Slide 03. Left: the line and one WhatsApp button (the site's WhatsApp gate asks for name and
// mobile first, so every tap becomes a lead). Right: the promotion space, now the Fano Properties
// app: what it does, a link to open it, the one install link, a QR code on computers and a phone
// drawn with the app's own home screen (search, tabs and chips as in the real app).
const WA_URL =
  "https://wa.me/971525719164?text=" +
  encodeURIComponent("Hello Fano Properties, I'm looking for a property in Dubai. This is what I need: ");

// fanoproperties.com/listings is the public Fano Properties app; /get has install steps for every phone
const APP_URL = "/listings";
const INSTALL_URL = "https://app.fanoproperties.workers.dev/get";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4c1.7.7 2.4.8 3.2.7a2.8 2.8 0 0 0 1.8-1.3 2.3 2.3 0 0 0 .2-1.3c-.1-.1-.3-.2-.5-.3z"
      />
    </svg>
  );
}

// The app's home screen in miniature: decorative, so it is hidden from screen readers
function AppScreen() {
  return (
    <div className="flex h-full flex-col bg-[#F4EFEA] font-sans text-[#2B2520]">
      <div className="flex items-center justify-between px-3 pb-2 pt-7">
        <FanoLogo className="h-[17px]" />
        <span className="grid h-5 w-5 place-items-center rounded-[6px] border border-[#2B2520]/15">
          <svg viewBox="0 0 24 24" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
            <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
          </svg>
        </span>
      </div>
      <div className="lx-app-hero relative flex-1 px-3 pt-4">
        <p className="text-[13px] font-bold leading-[1.15] text-white">Find your next property in Dubai</p>
        <p className="mt-1 font-display text-[7.5px] italic leading-snug text-white/75">
          Offices, shops, homes and off-plan projects, hand-picked by Fano Properties.
        </p>
        <div className="mt-3 rounded-[8px] bg-[#F4EFEA] p-2 shadow-lg">
          <div className="flex gap-1 text-[7px] font-semibold">
            <span className="rounded-[5px] bg-[#2B2520] px-2 py-1 text-white">Buy</span>
            <span className="px-1.5 py-1 text-[#7A6E62]">Rent</span>
            <span className="px-1.5 py-1 text-[#7A6E62]">Off-plan</span>
          </div>
          <div className="mt-1.5 flex h-5 items-center rounded-[5px] border border-[#2B2520]/10 bg-white px-1.5 text-[6.5px] text-[#7A6E62]">
            Area, project or developer
          </div>
          <div className="mt-1 grid grid-cols-2 gap-1 text-[6.5px] text-[#2B2520]">
            <span className="flex h-5 items-center justify-between rounded-[5px] border border-[#2B2520]/10 bg-white px-1.5">All types <i className="not-italic opacity-60">⌄</i></span>
            <span className="flex h-5 items-center justify-between rounded-[5px] border border-[#2B2520]/10 bg-white px-1.5">Any price <i className="not-italic opacity-60">⌄</i></span>
          </div>
          <div className="mt-1.5 grid h-5 place-items-center rounded-[5px] bg-gradient-to-b from-[#EEC076] to-[#D8984C] text-[7px] font-semibold">Search</div>
        </div>
        <div className="mt-2.5 flex flex-wrap gap-1">
          {["Offices", "Shops", "Apartments", "Off-plan"].map((c) => (
            <span key={c} className="rounded-full border border-white/30 bg-white/10 px-1.5 py-[3px] text-[6.5px] font-medium text-white">{c}</span>
          ))}
        </div>
      </div>
      <div className="bg-[#E6DFD5] px-3 pb-4 pt-2.5">
        <div className="lx-app-card relative h-[58px] overflow-hidden rounded-[7px]">
          <span className="absolute left-1.5 top-1.5 flex gap-1 text-[6px] font-semibold">
            <span className="rounded-[4px] bg-[#F4EFEA] px-1 py-0.5">Ready</span>
            <span className="rounded-[4px] bg-[#F4EFEA] px-1 py-0.5">Office</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export function LuxIntroduction() {
  return (
    <section className="border-y border-lx-line bg-lx-page" data-hide-wa-float>
      <div className="container-site grid gap-14 py-24 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-16 lg:py-32">
        <Reveal className="max-w-xl">
          <p className="lx-numeral">03</p>
          <h2 className="mt-5 font-display text-[clamp(26px,3vw,40px)] font-normal leading-[1.1] tracking-[-0.01em] text-lx-text">
            Some of the finest homes in Dubai are never advertised.
            <span className="italic text-lx-pale"> Tell us what you are looking for.</span>
          </h2>
          <div className="mt-10">
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-gold">
              <WhatsAppIcon className="h-[18px] w-[18px]" />
              Tell us on WhatsApp
            </a>
            <p className="mt-4 text-[12px] text-lx-text/55">No commitment. We typically respond within 2 hours.</p>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="lx-app-promo relative isolate overflow-hidden rounded-[6px] border border-[#E2A862]/30 px-6 py-9 sm:px-10 sm:py-11">
            <div className="grid items-center gap-10 sm:grid-cols-[minmax(0,1fr)_auto]">
              <div className="relative z-10">
                <p className="lx-app-eyebrow">New · Fano Properties app</p>
                <h3 className="mt-4 font-display text-[clamp(26px,2.6vw,36px)] font-normal leading-[1.08] text-[#F4EFEA]">
                  Every Fano listing,
                  <span className="block italic text-[#E2A862]">in your pocket.</span>
                </h3>
                <p className="mt-5 max-w-sm text-[14px] leading-[1.75] text-[#F4EFEA]/70">
                  Browse offices, shops, homes and off-plan projects for sale and rent in Dubai. Enquire in one tap.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <a href={APP_URL} className="btn-gold">Open the app</a>
                  <a href={INSTALL_URL} target="_blank" rel="noopener noreferrer" className="lx-app-outline">
                    Install on your phone
                  </a>
                </div>
                <div className="mt-8 hidden items-center gap-4 lg:flex">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/fano-app-qr.svg" alt="QR code to install the Fano Properties app" width={76} height={76} className="rounded-[6px]" />
                  <p className="font-label text-[10px] font-semibold uppercase leading-[1.8] tracking-[0.2em] text-[#F4EFEA]/55">
                    Scan to install
                    <span className="block text-[#F4EFEA]/40">iPhone · Android · Computer</span>
                  </p>
                </div>
              </div>

              <div className="relative mx-auto w-[190px] sm:w-[200px] lg:w-[210px]" aria-hidden="true">
                <span className="lx-app-glow" />
                <div className="lx-app-phone">
                  <AppScreen />
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
