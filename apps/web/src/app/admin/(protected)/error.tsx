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
      <div className="h-12 w-12 rounded-full bg-red-50 border border-red-100 flex items-center justify-center">
        <AlertTriangle className="h-5 w-5 text-red-500" />
      </div>
      <div>
        <h2 className="font-semibold text-foreground mb-1">Something went wrong</h2>
        <p className="text-sm text-muted-foreground max-w-sm">
          {error.message || "An unexpected error occurred loading this page."}
        </p>
        {error.digest && (
          <p className="text-xs text-muted-foreground/60 mt-1">Digest: {error.digest}</p>
        )}
      </div>
      <button
        onClick={reset}
        className="h-9 px-5 rounded-xl bg-[#1a1410] text-white text-sm font-medium hover:bg-[#2a2118] transition-colors"
      >
        Try again
      </button>
    </div>
  );
}
