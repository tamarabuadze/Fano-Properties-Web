import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@fano/utils";

// Small tracked labels on the beige palette: espresso solid, bone, or a hairline outline
const badgeVariants = cva(
  "inline-flex items-center rounded-full font-label font-semibold uppercase tracking-[0.16em] transition-colors",
  {
    variants: {
      variant: {
        default: "bg-[#2B2520] text-[#F4EFEA]",
        secondary: "bg-[#E6DFD5] text-[#2B2520]",
        outline: "border border-[#C5BAAB]/70 text-[#2B2520]",
        success: "border border-[#8C6A47]/40 text-[#8C6A47]",
        warning: "border border-[#E2A862] text-[#8C6A47]",
        destructive: "border border-red-300 text-red-700",
        sale: "bg-[#2B2520] text-[#F4EFEA]",
        rent: "bg-[#3A322B] text-[#F4EFEA]",
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
