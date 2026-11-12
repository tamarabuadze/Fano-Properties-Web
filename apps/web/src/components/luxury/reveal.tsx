"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

// One quiet rise on first view: 24px over 1.1s, never a bounce
export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "li" | "p";
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  return (
    <Tag
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1.1, delay, ease: [0.2, 0.65, 0.25, 1] }}
      className={className}
    >
      {children}
    </Tag>
  );
}
