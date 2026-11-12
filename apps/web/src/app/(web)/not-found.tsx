import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="eyebrow mb-6">Error 404</p>
      <p className="font-display text-[clamp(96px,16vw,180px)] font-normal italic leading-none text-[#E6DFD5] select-none" aria-hidden="true">
        404
      </p>
      <h1 className="-mt-4 font-display text-[clamp(28px,3.5vw,40px)] font-normal leading-tight text-[#2B2520]">
        Page not found
      </h1>
      <p className="mt-4 max-w-sm text-[15px] leading-[1.8] text-[#2B2520]/65">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link href="/" className="btn-pill mt-10">
        Back to home
      </Link>
    </div>
  );
}
