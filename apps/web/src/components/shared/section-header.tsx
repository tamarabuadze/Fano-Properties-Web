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

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  light = false,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 max-w-2xl",
        align === "center" && "items-center text-center mx-auto",
        className
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "text-xs font-medium uppercase tracking-widest",
            light ? "text-white/60" : "text-gold-600"
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "font-semibold leading-tight text-balance",
          "[letter-spacing:-0.025em]",
          "text-3xl sm:text-4xl lg:text-[2.75rem]",
          light ? "text-white" : "text-[#3d3020]"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "text-base lg:text-lg leading-relaxed",
            light ? "text-white/60" : "text-[#7e6244]/80"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
