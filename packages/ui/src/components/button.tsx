"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@fano/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none",
  {
    variants: {
      variant: {
        default:
          "bg-[#2B2520] text-white hover:bg-[#3A322B] active:scale-[0.98]",
        outline:
          "border border-[#2B2520] bg-transparent text-[#2B2520] hover:bg-[#2B2520] hover:text-white active:scale-[0.98]",
        ghost:
          "bg-transparent text-[#2B2520] hover:bg-zinc-100 active:scale-[0.98]",
        secondary:
          "bg-zinc-100 text-[#2B2520] hover:bg-zinc-200 active:scale-[0.98]",
        destructive:
          "bg-red-500 text-white hover:bg-red-600 active:scale-[0.98]",
        link: "text-[#2B2520] underline-offset-4 hover:underline p-0 h-auto",
        white:
          "bg-surface text-[#2B2520] hover:bg-zinc-100 active:scale-[0.98]",
        "outline-white":
          "border border-white bg-transparent text-white hover:bg-surface hover:text-[#2B2520] active:scale-[0.98]",
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
