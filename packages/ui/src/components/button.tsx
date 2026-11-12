"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@fano/utils";

// Built on the theme tokens so the same button reads on the navy site and the beige
// admin. "gold" is the glossy champagne pill used for primary actions everywhere.
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:-translate-y-px hover:opacity-95 active:scale-[0.98]",
        gold:
          "border border-[#B07C3A] bg-gradient-to-b from-[#F7D597] via-[#EEC076] to-[#D8984C] text-[#2B2520] font-label text-[12px] font-semibold uppercase tracking-[0.12em] shadow-[inset_0_1px_0_rgba(255,255,255,.6),0_2px_4px_rgba(0,0,0,.18)] hover:-translate-y-px hover:brightness-105 active:scale-[0.98]",
        outline:
          "border border-[#E2A862]/60 bg-transparent text-foreground hover:border-[#E2A862] hover:bg-[#E2A862]/10 active:scale-[0.98]",
        ghost:
          "bg-transparent text-foreground hover:bg-foreground/5 active:scale-[0.98]",
        secondary:
          "bg-secondary text-secondary-foreground border border-border hover:border-[#E2A862] active:scale-[0.98]",
        destructive:
          "bg-[#B0453A] text-[#F4EFEA] hover:bg-[#9A3B31] active:scale-[0.98]",
        link: "text-foreground underline-offset-4 hover:underline p-0 h-auto",
        white:
          "bg-background text-foreground hover:opacity-90 active:scale-[0.98]",
        "outline-white":
          "border border-[#F4EFEA]/60 bg-transparent text-[#F4EFEA] hover:bg-[#F4EFEA] hover:text-[#0B1220] active:scale-[0.98]",
      },
      size: {
        sm: "h-9 px-4 text-sm rounded-full",
        default: "h-12 px-6 text-base rounded-full",
        lg: "h-14 px-8 text-base rounded-full",
        xl: "h-16 px-10 text-lg rounded-full",
        icon: "h-10 w-10 rounded-full",
        "icon-sm": "h-8 w-8 rounded-full",
        "icon-lg": "h-12 w-12 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
