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

// Eyebrow label, a large light serif title, and a short paragraph
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
        "flex flex-col gap-4 max-w-2xl",
        align === "center" && "items-center text-center mx-auto",
        className
      )}
    >
      {eyebrow && <p className={cn("eyebrow", light && "text-[#E2A862]")}>{eyebrow}</p>}
      <h2
        className={cn(
          "font-display font-normal leading-[1.05] tracking-[-0.01em] text-balance",
          "text-[clamp(34px,4.4vw,58px)]",
          light ? "text-[#F4EFEA]" : "text-[#2B2520]"
        )}
      >
        {title}
      </h2>
      {description && (
        <p className={cn("max-w-lg text-[15px] leading-[1.85]", light ? "text-[#F4EFEA]/70" : "text-[#2B2520]/70")}>
          {description}
        </p>
      )}
    </div>
  );
}
