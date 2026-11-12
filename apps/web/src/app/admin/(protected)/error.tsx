"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[Admin error]", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 p-8 text-center">
      <div className="h-12 w-12 rounded-full bg-[#F6E3DF] border border-[#E9C6BF] flex items-center justify-center">
        <AlertTriangle className="h-5 w-5 text-[#B0453A]" />
      </div>
      <div>
        <h2 className="font-display text-2xl font-normal text-foreground mb-1">Something went wrong</h2>
        <p className="text-sm text-muted-foreground max-w-sm">
          {error.message || "An unexpected error occurred loading this page."}
        </p>
        {error.digest && (
          <p className="text-xs text-muted-foreground/60 mt-1">Digest: {error.digest}</p>
        )}
      </div>
      <button
        onClick={reset}
        className="btn-gold"
      >
        Try again
      </button>
    </div>
  );
}
