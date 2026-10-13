import { MapPin } from "lucide-react";
import { business } from "@/config/site";

/**
 * Keyless Google Maps embed centred on a search for the business.
 * Replace the query with the owner's confirmed Google Maps place once available.
 */
export function MapEmbed({ className }: { className?: string }) {
  const query = encodeURIComponent(`Maa Regi, Tse Addo, ${business.address.value.city}, ${business.address.value.country}`);
  return (
    <div className={`relative aspect-[4/3] overflow-hidden rounded-[1.75rem] bg-cream-deep shadow-card ring-1 ring-cocoa/10 sm:aspect-[16/10] ${className ?? ""}`}>
      <div className="absolute inset-0 grid place-items-center text-center text-sm text-stone-warm" aria-hidden>
        <span>
          <MapPin className="mx-auto mb-2 h-6 w-6 text-terracotta" />
          Loading map…
        </span>
      </div>
      <iframe
        title="Map showing the approximate location of Maa Regi in Tse Addo, Accra"
        src={`https://www.google.com/maps?q=${query}&output=embed`}
        className="absolute inset-0 h-full w-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
