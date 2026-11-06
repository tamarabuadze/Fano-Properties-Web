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
            "inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em]",
            light ? "text-[#ECBE80]" : "text-[#8C6A47]"
          )}
        >
          <span className="h-px w-8 bg-gradient-to-r from-[#E2A862] to-[#E2A862]/0" aria-hidden />
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "font-display font-semibold leading-tight text-balance",
          "[letter-spacing:-0.025em]",
          "text-3xl sm:text-4xl lg:text-[2.75rem]",
          light ? "text-white" : "text-[#2B2520]"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "text-base lg:text-lg leading-relaxed",
            light ? "text-white/60" : "text-[#6B5038]/80"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
