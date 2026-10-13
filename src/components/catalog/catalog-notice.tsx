import { Info } from "lucide-react";
import { IS_DEMO } from "@/config/site";

export function CatalogNotice() {
  if (!IS_DEMO) return null;
  return (
    <div className="flex gap-3 rounded-2xl border border-caramel/30 bg-caramel/10 p-4 text-sm leading-relaxed text-espresso-soft">
      <Info className="mt-0.5 h-4 w-4 shrink-0 text-caramel-dark" aria-hidden />
      <p>
        <strong className="font-semibold text-espresso">Demonstration catalogue.</strong> Items, photos and availability are
        placeholders. Prices marked <em>Sample</em> are illustrative only; prices marked <em>Listed price · to confirm</em> were
        taken from Maa Regi&rsquo;s existing ordering page and still need the owner&rsquo;s confirmation.
      </p>
    </div>
  );
}
