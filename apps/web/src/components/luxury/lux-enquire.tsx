// One sticky word at the bottom right in place of three round buttons.
// Opens WhatsApp; the footer carries the rest of the contact details.
export function LuxEnquire() {
  return (
    <a
      href="https://wa.me/971525719164"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Enquire on WhatsApp"
      className="fano-fab fixed bottom-6 right-5 z-50 inline-flex items-center gap-3 rounded-full border border-lx-gold/50 bg-lx-page/80 px-5 py-3 font-label text-[11px] font-bold uppercase tracking-[0.2em] text-lx-text backdrop-blur-md transition-colors hover:border-lx-gold hover:text-lx-gold sm:right-8"
    >
      <span className="h-1.5 w-1.5 rounded-full bg-lx-gold" aria-hidden="true" />
      Enquire
    </a>
  );
}
