"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@fano/utils";

interface AnimateStaggerProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export function AnimateStagger({ children, className, delay = 0 }: AnimateStaggerProps) {
  const containerVariants = delay
    ? { ...container, show: { ...container.show, transition: { ...container.show.transition, delayChildren: delay } } }
    : container;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      className={cn(className)}
    >
      {React.Children.map(children, (child) =>
        child ? (
          <motion.div variants={item} className="h-full">{child}</motion.div>
        ) : null
      )}
    </motion.div>
  );
}
