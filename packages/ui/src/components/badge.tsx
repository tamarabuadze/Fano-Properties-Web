import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@fano/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-black text-white",
        secondary: "bg-zinc-100 text-zinc-900",
        outline: "border border-zinc-200 text-zinc-700",
        success: "bg-emerald-50 text-emerald-700 border border-emerald-100",
        warning: "bg-amber-50 text-amber-700 border border-amber-100",
        destructive: "bg-red-50 text-red-700 border border-red-100",
        sale: "bg-black text-white",
        rent: "bg-zinc-800 text-white",
        lease: "bg-zinc-600 text-white",
      },
      size: {
        sm: "px-2.5 py-0.5 text-xs",
        default: "px-3 py-1 text-xs",
        lg: "px-4 py-1.5 text-sm",
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
