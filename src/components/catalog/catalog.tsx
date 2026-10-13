"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, SearchX, X } from "lucide-react";
import type { Category, Product } from "@/data/types";
import { cn } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { ProductCard } from "./product-card";

type Props = {
  products: Product[];
  categories: Category[];
  searchLabel: string;
};

const ALL = "all";

export function CatalogView({ products, categories, searchLabel }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [, startTransition] = useTransition();

  const initialCategory = params.get("category");
  const [category, setCategory] = useState<string>(
    initialCategory && categories.some((c) => c.id === initialCategory) ? initialCategory : ALL,
  );
  const [query, setQuery] = useState(params.get("q") ?? "");

  // Follow category links (e.g. from the footer) while already on this page.
  const urlCategory = params.get("category");
  useEffect(() => {
    setCategory(urlCategory && categories.some((c) => c.id === urlCategory) ? urlCategory : ALL);
  }, [urlCategory, categories]);

  function syncUrl(next: { category?: string; q?: string }) {
    const sp = new URLSearchParams(params.toString());
    const cat = next.category ?? category;
    const q = next.q ?? query;
    if (cat === ALL) sp.delete("category");
    else sp.set("category", cat);
    if (q.trim()) sp.set("q", q.trim());
    else sp.delete("q");
    const qs = sp.toString();
    startTransition(() => router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false }));
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      if (category !== ALL && p.category !== category) return false;
      if (!q) return true;
      return `${p.name} ${p.description}`.toLowerCase().includes(q);
    });
  }, [products, category, query]);

  const countFor = (id: string) => (id === ALL ? products.length : products.filter((p) => p.category === id).length);
  const activeLabel = category === ALL ? "All items" : categories.find((c) => c.id === category)?.label;

  function reset() {
    setCategory(ALL);
    setQuery("");
    syncUrl({ category: ALL, q: "" });
  }

  return (
    <div>
      <div className="sticky top-16 z-20 -mx-4 border-b border-cocoa/10 bg-cream/95 px-4 pb-3 pt-4 backdrop-blur sm:-mx-6 sm:px-6 lg:top-20 lg:-mx-8 lg:px-8">
        <form role="search" onSubmit={(e) => e.preventDefault()} className="relative max-w-md">
          <label htmlFor="catalog-search" className="sr-only">
            {searchLabel}
          </label>
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-warm" aria-hidden />
          <input
            id="catalog-search"
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              syncUrl({ q: e.target.value });
            }}
            placeholder={searchLabel}
            autoComplete="off"
            className="h-11 w-full rounded-full border border-cocoa/20 bg-cream-soft pl-11 pr-10 text-[0.95rem] text-espresso placeholder:text-stone-warm focus:border-cocoa focus:outline-none focus:ring-2 focus:ring-cocoa/20 [&::-webkit-search-cancel-button]:hidden"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                syncUrl({ q: "" });
              }}
              className="absolute right-2 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full text-stone-warm hover:bg-cocoa/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cocoa"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" aria-hidden />
            </button>
          )}
        </form>

        <div
          role="group"
          aria-label="Filter by category"
          className="no-scrollbar -mx-4 mt-3 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0"
        >
          {[{ id: ALL, label: "All" }, ...categories].map((c) => {
            const active = category === c.id;
            const count = countFor(c.id);
            return (
              <button
                key={c.id}
                type="button"
                aria-pressed={active}
                onClick={() => {
                  setCategory(c.id);
                  syncUrl({ category: c.id });
                }}
                className={cn(
                  "inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full border px-4 text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-cocoa",
                  active
                    ? "border-cocoa bg-cocoa text-cream-soft"
                    : "border-cocoa/20 bg-cream-soft text-espresso-soft hover:border-cocoa/50 hover:text-espresso",
                )}
              >
                {c.label}
                <span className={cn("text-xs tabular-nums", active ? "text-cream/70" : "text-stone-warm")}>{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      <p className="mt-6 text-sm text-stone-warm" aria-live="polite">
        {activeLabel} · {filtered.length} {filtered.length === 1 ? "item" : "items"}
        {query.trim() && <> matching &ldquo;{query.trim()}&rdquo;</>}
      </p>

      {filtered.length > 0 ? (
        <ul className="mt-4 grid gap-5 min-[520px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {filtered.map((p) => (
            <li key={p.id}>
              <ProductCard product={p} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-6 flex flex-col items-center rounded-2xl border border-dashed border-cocoa/20 bg-cream-soft px-6 py-16 text-center">
          <div className="grid h-14 w-14 place-items-center rounded-full bg-cream-deep">
            <SearchX className="h-6 w-6 text-cocoa" aria-hidden />
          </div>
          <h3 className="mt-4 font-serif text-2xl text-espresso">Nothing matches just yet</h3>
          <p className="mt-2 max-w-sm text-sm text-espresso-soft">
            Try a different search or category. Items not listed here may still be available &mdash; get in touch to ask.
          </p>
          <Button variant="secondary" className="mt-6" onClick={reset}>
            Clear filters
          </Button>
        </div>
      )}
    </div>
  );
}
