"use client";

import Image from "next/image";
import { useState } from "react";
import { Plus } from "lucide-react";
import type { Product } from "@/data/types";
import { useCart } from "@/context/cart-context";
import { availabilityLabel, cn, formatPrice, priceStatusHelp, priceStatusLabel } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import { QuantityStepper } from "@/components/ui/quantity-stepper";
import { Button } from "@/components/ui/button";

export function PriceTag({ product, className }: { product: Product; className?: string }) {
  const label = priceStatusLabel[product.priceStatus];
  return (
    <div className={cn("flex flex-col", className)}>
      <span className="font-serif text-xl tabular-nums text-espresso">
        {product.price === null ? <span className="text-base text-stone-warm">Price TBC</span> : formatPrice(product.price)}
      </span>
      {label && product.price !== null && (
        <span className="text-[0.7rem] font-medium text-stone-warm" title={priceStatusHelp[product.priceStatus]}>
          {label}
        </span>
      )}
    </div>
  );
}

export function ProductCard({ product, compact = false }: { product: Product; compact?: boolean }) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const unavailable = product.availability === "unavailable";

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-cream-soft shadow-card ring-1 ring-cocoa/5">
      <div className="relative aspect-[4/3] overflow-hidden bg-cream-deep">
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, (min-width: 520px) 50vw, 100vw"
          className={cn(
            "object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]",
            unavailable && "grayscale-[60%]",
          )}
        />
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          {product.priceStatus === "sample" && (
            <Badge tone="neutral" className="bg-cream-soft/95" title={priceStatusHelp.sample}>
              Sample
            </Badge>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="mb-2">
          <Badge tone={unavailable ? "muted" : product.availability === "pre-order" ? "caramel" : "success"}>
            {availabilityLabel[product.availability]}
          </Badge>
        </div>
        <h3 className="font-serif text-xl leading-snug text-espresso">{product.name}</h3>
        {!compact && <p className="mt-1.5 text-sm leading-relaxed text-espresso-soft">{product.description}</p>}

        <div className="mt-auto pt-4">
          <PriceTag product={product} />
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <QuantityStepper value={qty} onChange={setQty} label={product.name} disabled={unavailable} />
            <Button
              size="md"
              className="min-w-0 flex-1 px-4"
              disabled={unavailable}
              onClick={() => {
                add(product.id, qty);
                setQty(1);
              }}
              aria-label={unavailable ? `${product.name} is currently unavailable` : `Add ${qty} ${product.name} to cart`}
            >
              {unavailable ? (
                "Unavailable"
              ) : (
                <>
                  <Plus className="h-4 w-4" aria-hidden /> Add
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
