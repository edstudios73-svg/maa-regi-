"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from "react";
import { getProduct } from "@/data/products";
import type { Product } from "@/data/types";

const STORAGE_KEY = "maaregi-concept-cart-v1";
export const MAX_QTY = 50;

type CartItem = { id: string; qty: number };

type Action =
  | { type: "add"; id: string; qty: number }
  | { type: "set"; id: string; qty: number }
  | { type: "remove"; id: string }
  | { type: "clear" }
  | { type: "hydrate"; items: CartItem[] };

function clampQty(qty: number) {
  return Math.max(0, Math.min(MAX_QTY, Math.floor(qty)));
}

function reducer(state: CartItem[], action: Action): CartItem[] {
  switch (action.type) {
    case "add": {
      const existing = state.find((i) => i.id === action.id);
      if (existing) {
        return state.map((i) =>
          i.id === action.id ? { ...i, qty: clampQty(i.qty + action.qty) } : i,
        );
      }
      return [...state, { id: action.id, qty: clampQty(action.qty) }];
    }
    case "set": {
      const qty = clampQty(action.qty);
      if (qty === 0) return state.filter((i) => i.id !== action.id);
      return state.map((i) => (i.id === action.id ? { ...i, qty } : i));
    }
    case "remove":
      return state.filter((i) => i.id !== action.id);
    case "clear":
      return [];
    case "hydrate":
      return action.items;
  }
}

export type CartLine = { product: Product; qty: number; lineTotal: number | null };

type CartContextValue = {
  /** False until the saved cart has been restored from this browser. */
  ready: boolean;
  lines: CartLine[];
  itemCount: number;
  /** Sum of all priced lines. */
  subtotal: number;
  /** True when some items have no price yet and will be priced on confirmation. */
  hasUnpricedItems: boolean;
  /** True when any line uses a demonstration (sample) price. */
  hasSamplePrices: boolean;
  add: (id: string, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  /** Last item added, for the toast announcement. */
  lastAdded: { name: string; qty: number; at: number } | null;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, dispatch] = useReducer(reducer, []);
  const [hydrated, setHydrated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [lastAdded, setLastAdded] = useState<CartContextValue["lastAdded"]>(null);

  // Restore the cart from this browser only. Nothing is sent anywhere.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartItem[];
        const valid = parsed.filter(
          (i) => typeof i?.id === "string" && getProduct(i.id) && Number.isFinite(i.qty) && i.qty > 0,
        );
        dispatch({ type: "hydrate", items: valid.map((i) => ({ id: i.id, qty: clampQty(i.qty) })) });
      }
    } catch {
      // Storage unavailable (private mode etc.) — the cart simply starts empty.
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Ignore storage failures; the in-memory cart still works.
    }
  }, [items, hydrated]);

  const add = useCallback((id: string, qty = 1) => {
    const product = getProduct(id);
    if (!product || product.availability === "unavailable" || qty <= 0) return;
    dispatch({ type: "add", id, qty });
    setLastAdded({ name: product.name, qty, at: Date.now() });
  }, []);
  const setQty = useCallback((id: string, qty: number) => dispatch({ type: "set", id, qty }), []);
  const remove = useCallback((id: string) => dispatch({ type: "remove", id }), []);
  const clear = useCallback(() => dispatch({ type: "clear" }), []);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo<CartContextValue>(() => {
    const lines: CartLine[] = items.flatMap((item) => {
      const product = getProduct(item.id);
      if (!product) return [];
      return [
        {
          product,
          qty: item.qty,
          lineTotal: product.price === null ? null : product.price * item.qty,
        },
      ];
    });
    return {
      ready: hydrated,
      lines,
      itemCount: lines.reduce((n, l) => n + l.qty, 0),
      subtotal: lines.reduce((sum, l) => sum + (l.lineTotal ?? 0), 0),
      hasUnpricedItems: lines.some((l) => l.lineTotal === null),
      hasSamplePrices: lines.some((l) => l.product.priceStatus === "sample"),
      add,
      setQty,
      remove,
      clear,
      isOpen,
      open,
      close,
      lastAdded,
    };
  }, [items, hydrated, add, setQty, remove, clear, isOpen, open, close, lastAdded]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
