"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { cn } from "@fano/utils";

interface FaqItem { q: string; a: string; }

export function FaqAccordion({ faqs }: { faqs: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <div
          key={i}
          className={cn(
            "rounded-2xl border transition-colors duration-200",
            open === i ? "border-black bg-zinc-50" : "border-border bg-white hover:border-zinc-300"
          )}
        >
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="flex items-center justify-between w-full px-6 py-5 text-left gap-4"
          >
            <span className={cn(
              "font-medium text-base transition-colors",
              open === i ? "text-black" : "text-zinc-700"
            )}>
              {faq.q}
            </span>
            <div className={cn(
              "h-8 w-8 rounded-full flex items-center justify-center shrink-0 transition-colors",
              open === i ? "bg-black text-white" : "bg-zinc-100 text-zinc-500"
            )}>
              {open === i ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            </div>
          </button>

          <AnimatePresence>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="overflow-hidden"
              >
                <p className="px-6 pb-6 text-zinc-600 leading-relaxed text-sm lg:text-base">
                  {faq.a}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
