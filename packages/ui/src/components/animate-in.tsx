"use client";

import * as React from "react";
import { motion, type Variants, type HTMLMotionProps } from "framer-motion";
import { cn } from "@fano/utils";

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const staggerContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

interface AnimateInProps extends HTMLMotionProps<"div"> {
  variant?: "fadeUp" | "fadeIn";
  delay?: number;
  stagger?: boolean;
  className?: string;
  children: React.ReactNode;
}

function AnimateIn({
  variant = "fadeUp",
  delay = 0,
  stagger = false,
  className,
  children,
  ...props
}: AnimateInProps) {
  const variants = stagger
    ? staggerContainerVariants
    : variant === "fadeUp"
    ? fadeUpVariants
    : fadeInVariants;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={variants}
      custom={delay}
      className={cn(className)}
      style={delay ? { ...props.style } : props.style}
      {...(delay && !stagger
        ? {
            transition: {
              delay,
              duration: 0.6,
              ease: [0.25, 0.46, 0.45, 0.94],
            },
          }
        : {})}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export { AnimateIn, fadeUpVariants, fadeInVariants, staggerContainerVariants };
