"use client";

import { useEffect, useRef, useState } from "react";
import { Share2, X } from "lucide-react";
import { cn } from "@fano/utils";
import { SOCIAL_LINKS } from "@/lib/social-links";

// Floating button stacked above the ROI and WhatsApp buttons.
// Tapping it fans out Fano's social and portal profiles.
export function SocialButton() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div
      ref={ref}
      className="fixed bottom-[9rem] sm:bottom-[10.5rem] right-4 sm:right-6 z-50 flex flex-col-reverse items-center gap-3"
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close social links" : "Follow Fano Properties"}
        aria-expanded={open}
        className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-[#1a1410] text-[#c9a96e] shadow-lg ring-1 ring-[#c9a96e]/30 hover:scale-110 transition-all duration-200"
      >
        {open ? <X className="h-6 w-6" /> : <Share2 className="h-6 w-6" />}
      </button>

      {SOCIAL_LINKS.map(({ label, href, icon: Icon, color }, i) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          title={label}
          tabIndex={open ? 0 : -1}
          className={cn(
            "flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full text-white shadow-lg transition-all duration-200 hover:scale-110",
            open ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 translate-y-4"
          )}
          style={{ background: color, transitionDelay: open ? `${i * 40}ms` : "0ms" }}
        >
          <Icon className="h-5 w-5" />
        </a>
      ))}
    </div>
  );
}
