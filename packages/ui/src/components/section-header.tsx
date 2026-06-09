import * as React from "react";
import { cn } from "@fano/utils";

interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  titleClassName?: string;
  descriptionClassName?: string;
}

function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  titleClassName,
  descriptionClassName,
  ...props
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className
      )}
      {...props}
    >
      {eyebrow && (
        <p className="text-xs font-medium uppercase tracking-widest text-text-secondary">
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "font-semibold leading-tight tracking-tight text-balance",
          "text-3xl lg:text-4xl xl:text-5xl",
          "[letter-spacing:-0.02em]",
          titleClassName
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "text-text-secondary leading-relaxed",
            "text-base lg:text-lg",
            align === "center" && "max-w-2xl",
            descriptionClassName
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}

export { SectionHeader };
