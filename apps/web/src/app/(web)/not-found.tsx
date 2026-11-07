import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <p className="text-[120px] font-bold text-zinc-100 leading-none select-none mb-0">404</p>
      <h1 className="text-2xl font-semibold text-[#2B2520] [letter-spacing:-0.02em] -mt-4 mb-3">
        Page Not Found
      </h1>
      <p className="text-zinc-500 mb-8 max-w-sm">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 h-12 px-6 rounded-full bg-gradient-to-b from-[#3A322B] to-[#2B2520] text-[#F4EFEA] shadow-[0_10px_24px_-10px_rgba(43,37,32,.6)] hover:-translate-y-px hover:shadow-[0_16px_30px_-12px_rgba(43,37,32,.7)] font-medium transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </Link>
    </div>
  );
}
