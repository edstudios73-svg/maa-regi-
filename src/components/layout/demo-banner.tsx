import Link from "next/link";
import { FlaskConical } from "lucide-react";
import { IS_DEMO, studio } from "@/config/site";

/** Persistent notice that this is a concept, not Maa Regi's official website. */
export function DemoBanner() {
  if (!IS_DEMO) return null;
  return (
    <div className="bg-espresso text-cream/90">
      <p className="mx-auto flex max-w-site items-center justify-center gap-2 px-4 py-2 text-center text-[0.75rem] leading-snug sm:text-xs">
        <FlaskConical className="hidden h-3.5 w-3.5 shrink-0 text-caramel-light sm:block" aria-hidden />
        <span>
          <strong className="font-semibold text-cream-soft">Website concept by {studio.name}.</strong> Not Maa Regi&rsquo;s official
          website. Sample data — no orders or messages are sent.{" "}
          <Link href="/about#concept" className="underline underline-offset-2 hover:text-white">
            Learn more
          </Link>
        </span>
      </p>
    </div>
  );
}
