import type { Metadata } from "next";
import Link from "next/link";

// A slug page that calls notFound() takes its metadata from this boundary, not from its generateMetadata
export const metadata: Metadata = { title: "Page Not Found", robots: { index: false } };

export default function NotFound() {
  return (
    // Unknown URLs render outside the (web) layout, so this page carries the navy root itself
    <div className="lx-root flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="lx-eyebrow mb-6">Error 404</p>
      <p className="font-display text-[clamp(96px,16vw,180px)] font-normal italic leading-none text-lx-gold/20 select-none" aria-hidden="true">
        404
      </p>
      <h1 className="-mt-4 font-display text-[clamp(28px,3.5vw,40px)] font-normal leading-tight text-lx-text">
        Page not found
      </h1>
      <p className="mt-4 max-w-sm text-[15px] leading-[1.8] text-lx-text/65">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link href="/" className="btn-gold mt-10">
        Back to home
      </Link>
    </div>
  );
}
