"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { cn } from "@fano/utils";

interface FaqItem { q: string; a: string; }

// A hairline list: serif questions, a thin plus that turns to minus, the answer beneath
export function FaqAccordion({ faqs }: { faqs: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="border-t border-[#C5BAAB]/40">
      {faqs.map((faq, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className="border-b border-[#C5BAAB]/40">
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-6 py-6 text-left"
            >
              <span className={cn(
                "font-display text-[clamp(20px,2.2vw,26px)] font-normal leading-snug transition-colors",
                isOpen ? "text-[#2B2520]" : "text-[#2B2520]/80"
              )}>
                {faq.q}
              </span>
              <span
                aria-hidden="true"
                className={cn(
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors",
                  isOpen ? "border-[#2B2520] bg-[#2B2520] text-[#F4EFEA]" : "border-[#C5BAAB]/70 text-[#8C6A47]"
                )}
              >
                {isOpen ? <Minus className="h-4 w-4" strokeWidth={1.5} /> : <Plus className="h-4 w-4" strokeWidth={1.5} />}
              </span>
            </button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <p className="max-w-2xl pb-7 text-[15px] leading-[1.85] text-[#2B2520]/75">
                    {faq.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
