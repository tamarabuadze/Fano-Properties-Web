import React from "react";
import { cn } from "@fano/utils";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  light?: boolean;
}

// Eyebrow label, a large light serif title, and a short paragraph, on the navy page.
// `light` is kept for callers; the default already renders for dark.
export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  light,
}: SectionHeaderProps) {
  void light;
  return (
    <div
      className={cn(
        "flex flex-col gap-4 max-w-2xl",
        align === "center" && "items-center text-center mx-auto",
        className
      )}
    >
      {eyebrow && <p className="lx-eyebrow">{eyebrow}</p>}
      <h2
        className={cn(
          "font-display font-normal leading-[1.05] tracking-[-0.01em] text-balance",
          "text-[clamp(32px,3.8vw,50px)] text-lx-text"
        )}
      >
        {title}
      </h2>
      {description && (
        <p className="max-w-lg text-[15px] leading-[1.85] text-lx-text/70">
          {description}
        </p>
      )}
    </div>
  );
}
