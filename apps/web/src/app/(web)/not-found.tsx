import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 text-center">
      <p className="text-[120px] font-bold text-zinc-100 leading-none select-none mb-0">404</p>
      <h1 className="text-2xl font-semibold text-black [letter-spacing:-0.02em] -mt-4 mb-3">
        Page Not Found
      </h1>
      <p className="text-zinc-500 mb-8 max-w-sm">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 h-12 px-6 rounded-full bg-black text-white font-medium hover:bg-zinc-800 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </Link>
    </div>
  );
}
