"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { useCart } from "@/context/cart-context";

/** Brief confirmation when an item is added, also announced to screen readers. */
export function CartToast() {
  const { lastAdded, open, isOpen } = useCart();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!lastAdded) return;
    setVisible(true);
    const t = window.setTimeout(() => setVisible(false), 3200);
    return () => window.clearTimeout(t);
  }, [lastAdded]);

  return (
    <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-20 z-40 flex justify-center px-4 sm:bottom-6 sm:justify-end sm:px-6">
      <AnimatePresence>
        {visible && lastAdded && !isOpen && (
          <motion.div
            key={lastAdded.at}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            className="pointer-events-auto flex items-center gap-3 rounded-full bg-espresso py-2 pl-3 pr-2 text-sm text-cream-soft shadow-lift"
          >
            <span className="grid h-6 w-6 place-items-center rounded-full bg-caramel text-espresso">
              <Check className="h-3.5 w-3.5" aria-hidden />
            </span>
            <span>
              Added {lastAdded.qty > 1 ? `${lastAdded.qty} × ` : ""}
              {lastAdded.name}
            </span>
            <button
              type="button"
              onClick={open}
              className="rounded-full bg-cream-soft px-3 py-1 text-xs font-semibold text-espresso hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-caramel"
            >
              View cart
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
