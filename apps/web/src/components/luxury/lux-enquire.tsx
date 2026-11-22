import Link from "next/link";

// Fixed bottom-right CTA — takes sellers to the listing form.
export function LuxEnquire() {
  return (
    <Link
      href="/list-with-us"
      aria-label="List your property with Fano"
      className="btn-gold fano-fab fixed bottom-6 right-5 z-50 shadow-[0_12px_30px_-10px_rgba(43,37,32,.45)] sm:right-8"
    >
      List Your Property
    </Link>
  );
}
