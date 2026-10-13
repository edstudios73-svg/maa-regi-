import Link from "next/link";
import { cn } from "@/lib/format";

export function Wordmark({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  const light = tone === "light";
  return (
    <Link
      href="/"
      aria-label="Maa Regi — home"
      className={cn("group inline-flex flex-col leading-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-caramel", className)}
    >
      <span className={cn("font-serif text-[1.65rem] font-semibold tracking-tight lg:text-[1.85rem]", light ? "text-cream-soft" : "text-espresso")}>
        Maa Regi
      </span>
      <span className={cn("mt-1 text-[0.58rem] font-semibold uppercase tracking-[0.32em]", light ? "text-caramel-light" : "text-caramel-dark")}>
        Bakery · Kitchen · Catering
      </span>
    </Link>
  );
}
