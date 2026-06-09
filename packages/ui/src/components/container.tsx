import * as React from "react";
import { cn } from "@fano/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "default" | "tight" | "wide" | "full";
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = "default", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "mx-auto w-full",
          {
            "max-w-7xl px-6 lg:px-10": size === "default",
            "max-w-5xl px-6 lg:px-8": size === "tight",
            "max-w-8xl px-6 lg:px-10 xl:px-16": size === "wide",
            "px-6 lg:px-10": size === "full",
          },
          className
        )}
        {...props}
      />
    );
  }
);
Container.displayName = "Container";

export { Container };
