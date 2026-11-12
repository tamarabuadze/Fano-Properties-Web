import { cn } from "@fano/utils";
import type { SiteTheme } from "@/lib/site-theme";

const options: { theme: SiteTheme; label: string }[] = [
  { theme: "navy", label: "Navy" },
  { theme: "espresso", label: "Espresso" },
  { theme: "beige", label: "Current" },
];

// Shown only to a browser that has opened a /design/… link: flips between the
// candidate homepages on the same deployment. Removed once a design is chosen.
export function DesignSwitch({ current }: { current: SiteTheme }) {
  const dark = current !== "beige";
  return (
    <div
      className={cn(
        "fixed bottom-6 left-5 z-50 inline-flex items-center gap-1 rounded-full border p-1 font-label text-[10px] font-bold uppercase tracking-[0.16em] backdrop-blur-md sm:left-8",
        dark ? "border-[#E2A862]/40 bg-[#0B1220]/80 text-[#F4EFEA]" : "border-[#C5BAAB] bg-[#F4EFEA]/90 text-[#2B2520]"
      )}
      aria-label="Design preview switch"
    >
      {options.map((o) => (
        <a
          key={o.theme}
          href={`/design/${o.theme}`}
          className={cn(
            "rounded-full px-3 py-1.5 transition-colors",
            o.theme === current ? "bg-[#E2A862] text-[#14110F]" : dark ? "hover:text-[#E2A862]" : "hover:text-[#8C6A47]"
          )}
        >
          {o.label}
        </a>
      ))}
    </div>
  );
}
