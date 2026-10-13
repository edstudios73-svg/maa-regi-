import { cn } from "@/lib/format";

/** Classic rule with a centred diamond. Decorative. */
export function Ornament({ className, tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  const c = tone === "light" ? "bg-caramel-light/60 text-caramel-light" : "bg-caramel/60 text-caramel";
  return (
    <div className={cn("flex items-center justify-center gap-3", className)} aria-hidden>
      <span className={cn("h-px w-16", c.split(" ")[0])} />
      <svg viewBox="0 0 12 12" className={cn("h-2.5 w-2.5 fill-current", c.split(" ")[1])}>
        <path d="M6 0l6 6-6 6-6-6z" />
      </svg>
      <span className={cn("h-px w-16", c.split(" ")[0])} />
    </div>
  );
}
