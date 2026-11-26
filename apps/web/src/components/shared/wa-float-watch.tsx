"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Hides the floating WhatsApp button while any section marked data-hide-wa-float is on screen
// (slide 03 has its own WhatsApp button, and the map has its own controls in that corner),
// so the corner button never sits on top of another button.
export function WaFloatWatch() {
  const pathname = usePathname();

  useEffect(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-hide-wa-float]"));
    if (!targets.length || !("IntersectionObserver" in window)) return;
    const visible = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.add(e.target);
          else visible.delete(e.target);
        }
        document.body.toggleAttribute("data-wa-hidden", visible.size > 0);
      },
      // Counts as on screen once it covers the lower part of the window, where the button sits
      { rootMargin: "-55% 0px 0px 0px" }
    );
    targets.forEach((t) => io.observe(t));
    return () => {
      io.disconnect();
      document.body.removeAttribute("data-wa-hidden");
    };
  }, [pathname]);

  return null;
}
