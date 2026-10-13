"use client";

import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/format";

type Props = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  label: string;
  size?: "sm" | "md";
  disabled?: boolean;
};

export function QuantityStepper({ value, onChange, min = 1, max = 50, label, size = "md", disabled }: Props) {
  const btn = cn(
    "grid place-items-center rounded-full text-cocoa transition-colors hover:bg-cocoa/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cocoa disabled:opacity-40 disabled:hover:bg-transparent",
    size === "sm" ? "h-7 w-7" : "h-9 w-9",
  );
  return (
    <div role="group" aria-label={label} className={cn("inline-flex items-center rounded-full border border-cocoa/20 bg-cream-soft", size === "sm" ? "p-0.5" : "p-1")}>
      <button type="button" className={btn} onClick={() => onChange(value - 1)} disabled={disabled || value <= min} aria-label={`Decrease quantity of ${label}`}>
        <Minus className="h-3.5 w-3.5" aria-hidden />
      </button>
      <span aria-live="polite" className={cn("min-w-[2ch] text-center font-semibold tabular-nums text-espresso", size === "sm" ? "px-1.5 text-sm" : "px-2")}>
        {value}
      </span>
      <button type="button" className={btn} onClick={() => onChange(value + 1)} disabled={disabled || value >= max} aria-label={`Increase quantity of ${label}`}>
        <Plus className="h-3.5 w-3.5" aria-hidden />
      </button>
    </div>
  );
}
