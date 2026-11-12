import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@fano/utils";

// Small tracked labels built on the theme tokens, so they read correctly on the
// navy public site and the beige admin alike. Gold variants are the one fixed accent.
const badgeVariants = cva(
  "inline-flex items-center rounded-full font-label font-semibold uppercase tracking-[0.16em] transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        outline: "border border-border text-foreground",
        success: "border border-[#8C6A47]/50 text-[#8C6A47]",
        warning: "border border-[#E2A862] text-[#E2A862]",
        destructive: "border border-[#B0453A]/60 text-[#B0453A]",
        sale: "bg-primary text-primary-foreground",
        rent: "border border-[#E2A862]/60 text-foreground",
        lease: "bg-[#8C6A47] text-[#F4EFEA]",
      },
      size: {
        sm: "px-2.5 py-0.5 text-[10px]",
        default: "px-3 py-1 text-[10px]",
        lg: "px-4 py-1.5 text-[11px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
