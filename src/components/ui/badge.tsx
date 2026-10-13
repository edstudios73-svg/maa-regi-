import type { ReactNode } from "react";
import { cn } from "@/lib/format";

type Tone = "neutral" | "caramel" | "terracotta" | "muted" | "success";

const tones: Record<Tone, string> = {
  neutral: "bg-cream-deep text-cocoa",
  caramel: "bg-caramel/15 text-caramel-dark",
  terracotta: "bg-terracotta/10 text-terracotta-dark",
  muted: "bg-espresso/5 text-stone-warm",
  success: "bg-[#E3EADB] text-[#3F5A2A]",
};

export function Badge({ children, tone = "neutral", className, title }: { children: ReactNode; tone?: Tone; className?: string; title?: string }) {
  return (
    <span title={title} className={cn("inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[0.7rem] font-semibold tracking-wide", tones[tone], className)}>
      {children}
    </span>
  );
}
