"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, CircleCheck, FlaskConical, MessageCircle, ShoppingBag, Store, Trash2, Truck } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { business, IS_DEMO, WHATSAPP_ORDERING_ENABLED } from "@/config/site";
import { cn, formatPrice } from "@/lib/format";
import { buildOrderMessage, whatsappLink, type Fulfilment, type OrderDetails } from "@/lib/order";
import { hasErrors, validatePhone, validateRequired, type FieldErrors } from "@/lib/validation";
import { Button, LinkButton, buttonClasses } from "@/components/ui/button";
import { QuantityStepper } from "@/components/ui/quantity-stepper";
import { ErrorSummary, TextArea, TextField } from "./fields";

type Step = "details" | "review" | "done";
type Field = "name" | "phone" | "deliveryLocation";

const labels: Record<Field, string> = { name: "Name", phone: "Phone number", deliveryLocation: "Delivery location" };

function validate(d: OrderDetails): FieldErrors<Field> {
  return {
    name: validateRequired(d.name, "your name"),
    phone: validatePhone(d.phone),
    deliveryLocation: d.fulfilment === "delivery" ? validateRequired(d.deliveryLocation, "a delivery location") : undefined,
  };
}

export function CheckoutFlow() {
  const cart = useCart();
  const { lines, subtotal, hasUnpricedItems, hasSamplePrices } = cart;
  const [step, setStep] = useState<Step>("details");
  const [details, setDetails] = useState<OrderDetails>({ name: "", phone: "", fulfilment: "pickup", deliveryLocation: "", notes: "" });
  const [errors, setErrors] = useState<FieldErrors<Field>>({});
  const [submitted, setSubmitted] = useState(false);
  const [finalMessage, setFinalMessage] = useState("");
  const headingRef = useRef<HTMLHeadingElement>(null);

  // Move focus to the new heading when the step changes (not on first load).
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    window.scrollTo({ top: 0 });
    headingRef.current?.focus({ preventScroll: true });
  }, [step]);

  const update = <K extends keyof OrderDetails>(key: K, value: OrderDetails[K]) => {
    const next = { ...details, [key]: value };
    setDetails(next);
    if (submitted) setErrors(validate(next));
  };

  function goToReview(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    const errs = validate(details);
    setErrors(errs);
    if (hasErrors(errs)) {
      requestAnimationFrame(() => document.getElementById("checkout-errors")?.focus());
      return;
    }
    setStep("review");
  }

  const message = buildOrderMessage(details, lines, subtotal, hasUnpricedItems);

  function placeOrder() {
    setFinalMessage(message);
    if (WHATSAPP_ORDERING_ENABLED) {
      window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
    }
    cart.clear();
    setStep("done");
  }

  // ——— Completed ———
  if (step === "done") {
    return (
      <div className="mx-auto max-w-2xl py-6 text-center">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-caramel/20 text-caramel-dark">
          {WHATSAPP_ORDERING_ENABLED ? <CircleCheck className="h-8 w-8" aria-hidden /> : <FlaskConical className="h-8 w-8" aria-hidden />}
        </div>
        <h1 ref={headingRef} tabIndex={-1} className="mt-6 font-serif text-4xl text-espresso focus:outline-none sm:text-5xl">
          {WHATSAPP_ORDERING_ENABLED ? "Your order is ready to send" : "Demo order complete"}
        </h1>
        {WHATSAPP_ORDERING_ENABLED ? (
          <p className="mt-4 text-espresso-soft">
            WhatsApp has opened with your order. Your order is only placed once you send the message and {business.name} confirms
            availability, total and timing. No payment has been taken.
          </p>
        ) : (
          <p className="mt-4 text-espresso-soft">
            This is a demonstration. <strong className="text-espresso">Nothing has been sent to {business.name}</strong>, and no payment
            has been taken. In the live version, the message below would be handed off to Maa Regi on WhatsApp once the business number is
            confirmed.
          </p>
        )}
        <figure className="mt-8 rounded-2xl bg-cream-soft p-5 text-left shadow-card ring-1 ring-cocoa/5">
          <figcaption className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-eyebrow text-stone-warm">
            <MessageCircle className="h-4 w-4" aria-hidden /> Order message {IS_DEMO && "(preview)"}
          </figcaption>
          <pre className="whitespace-pre-wrap break-words font-sans text-sm leading-relaxed text-espresso">{finalMessage}</pre>
        </figure>
        <div className="mt-8 flex flex-col justify-center gap-3 min-[420px]:flex-row">
          <LinkButton href="/menu" size="lg">
            Back to the menu
          </LinkButton>
          <LinkButton href="/" variant="secondary" size="lg">
            Home
          </LinkButton>
        </div>
      </div>
    );
  }

  if (!cart.ready) {
    return <p className="py-16 text-center text-stone-warm">Loading your order…</p>;
  }

  // ——— Empty cart ———
  if (lines.length === 0) {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center py-10 text-center">
        <div className="grid h-16 w-16 place-items-center rounded-full bg-cream-deep">
          <ShoppingBag className="h-7 w-7 text-cocoa" aria-hidden />
        </div>
        <h1 ref={headingRef} tabIndex={-1} className="mt-6 font-serif text-4xl text-espresso focus:outline-none">
          Your cart is empty
        </h1>
        <p className="mt-3 text-espresso-soft">Add a few things from the bakery or the restaurant menu, then come back here to review your order.</p>
        <div className="mt-8 flex flex-col gap-3 min-[420px]:flex-row">
          <LinkButton href="/menu" size="lg">
            Restaurant Menu
          </LinkButton>
          <LinkButton href="/bakery" variant="secondary" size="lg">
            Bakery
          </LinkButton>
        </div>
      </div>
    );
  }

  const summary = (
    <aside aria-labelledby="summary-title" className="h-fit rounded-2xl bg-cream-soft p-5 shadow-card ring-1 ring-cocoa/5 sm:p-6 lg:sticky lg:top-28">
      <h2 id="summary-title" className="font-serif text-2xl text-espresso">
        Order summary
      </h2>
      <ul className="mt-4 divide-y divide-cocoa/10">
        {lines.map(({ product, qty, lineTotal }) => (
          <li key={product.id} className="flex gap-3 py-3">
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-cream-deep">
              <Image src={product.image} alt="" fill sizes="56px" className="object-cover" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex justify-between gap-2">
                <p className="text-sm font-medium leading-snug text-espresso">{product.name}</p>
                <p className="shrink-0 text-sm font-semibold tabular-nums">{lineTotal === null ? "TBC" : formatPrice(lineTotal)}</p>
              </div>
              {step === "details" ? (
                <div className="mt-2 flex items-center justify-between">
                  <QuantityStepper size="sm" value={qty} onChange={(v) => cart.setQty(product.id, v)} label={product.name} />
                  <button
                    type="button"
                    onClick={() => cart.remove(product.id)}
                    className="grid h-8 w-8 place-items-center rounded-full text-stone-warm hover:bg-terracotta/10 hover:text-terracotta-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-cocoa"
                    aria-label={`Remove ${product.name}`}
                  >
                    <Trash2 className="h-4 w-4" aria-hidden />
                  </button>
                </div>
              ) : (
                <p className="text-xs text-stone-warm">Qty {qty}</p>
              )}
            </div>
          </li>
        ))}
      </ul>
      <dl className="mt-2 space-y-2 border-t border-cocoa/10 pt-4 text-sm">
        <div className="flex justify-between">
          <dt className="text-espresso-soft">Subtotal</dt>
          <dd className="font-semibold tabular-nums">{formatPrice(subtotal)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-espresso-soft">{details.fulfilment === "delivery" ? "Delivery" : "Pickup"}</dt>
          <dd className="text-stone-warm">{details.fulfilment === "delivery" ? "To be confirmed" : "Free"}</dd>
        </div>
        <div className="flex items-baseline justify-between border-t border-cocoa/10 pt-3">
          <dt className="font-medium text-espresso">Estimated total</dt>
          <dd className="font-serif text-2xl tabular-nums text-espresso">{formatPrice(subtotal)}</dd>
        </div>
      </dl>
      <ul className="mt-3 space-y-1 text-xs text-stone-warm">
        {hasUnpricedItems && <li>Items without a confirmed price are priced by Maa Regi on confirmation.</li>}
        {hasSamplePrices && <li>Includes sample prices for demonstration only.</li>}
        <li>Final total and availability are confirmed by Maa Regi. No payment is taken online.</li>
      </ul>
    </aside>
  );

  // ——— Review ———
  if (step === "review") {
    return (
      <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-12">
        <div>
          <button
            type="button"
            onClick={() => setStep("details")}
            className="inline-flex items-center gap-1.5 text-sm text-cocoa hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-cocoa"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden /> Edit details
          </button>
          <h1 ref={headingRef} tabIndex={-1} className="mt-3 font-serif text-4xl text-espresso focus:outline-none sm:text-5xl">
            Review your order
          </h1>
          <p className="mt-2 text-espresso-soft">Check everything below before you continue.</p>

          <dl className="mt-8 grid gap-4 rounded-2xl bg-cream-soft p-5 shadow-card ring-1 ring-cocoa/5 sm:grid-cols-2 sm:p-6">
            {[
              ["Name", details.name],
              ["Phone", details.phone],
              ["Collection", details.fulfilment === "pickup" ? "Pickup" : "Delivery (subject to confirmation)"],
              ...(details.fulfilment === "delivery" ? [["Delivery location", details.deliveryLocation]] : []),
              ...(details.notes.trim() ? [["Notes", details.notes]] : []),
            ].map(([k, v]) => (
              <div key={k} className={k === "Notes" ? "sm:col-span-2" : undefined}>
                <dt className="text-xs font-semibold uppercase tracking-eyebrow text-stone-warm">{k}</dt>
                <dd className="mt-1 whitespace-pre-wrap break-words text-espresso">{v}</dd>
              </div>
            ))}
          </dl>

          <div
            className={cn(
              "mt-6 flex gap-3 rounded-2xl p-4 text-sm",
              WHATSAPP_ORDERING_ENABLED ? "bg-[#E3EADB] text-[#2F4520]" : "border border-caramel/30 bg-caramel/10 text-espresso-soft",
            )}
          >
            {WHATSAPP_ORDERING_ENABLED ? (
              <>
                <MessageCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                <p>Continuing opens WhatsApp with your order addressed to {business.name}. Your order is placed when you send the message.</p>
              </>
            ) : (
              <>
                <FlaskConical className="mt-0.5 h-4 w-4 shrink-0 text-caramel-dark" aria-hidden />
                <p>
                  <strong className="text-espresso">Demo mode:</strong> this order will not be sent to {business.name}. The WhatsApp handoff
                  will be switched on only after the owner confirms the business number.
                </p>
              </>
            )}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" onClick={placeOrder}>
              {WHATSAPP_ORDERING_ENABLED ? (
                <>
                  <MessageCircle className="h-4 w-4" aria-hidden /> Send order on WhatsApp
                </>
              ) : (
                "Complete demo order"
              )}
            </Button>
            <Button size="lg" variant="secondary" onClick={() => setStep("details")}>
              Edit details
            </Button>
          </div>
        </div>
        {summary}
      </div>
    );
  }

  // ——— Details ———
  return (
    <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-12">
      <div>
        <h1 ref={headingRef} tabIndex={-1} className="font-serif text-4xl text-espresso focus:outline-none sm:text-5xl">
          Checkout
        </h1>
        <p className="mt-2 text-espresso-soft">
          Tell us who the order is for. You&rsquo;ll review everything before continuing.
          {IS_DEMO && " This is a demonstration — nothing is sent."}
        </p>

        <form noValidate onSubmit={goToReview} className="mt-8 space-y-6">
          {submitted && <ErrorSummary id="checkout-errors" errors={errors} labels={labels} />}

          <fieldset className="grid gap-5 sm:grid-cols-2">
            <legend className="sr-only">Your details</legend>
            <TextField
              id="name"
              label="Name"
              required
              autoComplete="name"
              value={details.name}
              onChange={(e) => update("name", e.target.value)}
              error={errors.name}
            />
            <TextField
              id="phone"
              label="Phone number"
              required
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="024 123 4567"
              value={details.phone}
              onChange={(e) => update("phone", e.target.value)}
              error={errors.phone}
              hint="So Maa Regi can confirm your order."
            />
          </fieldset>

          <fieldset>
            <legend className="mb-2 text-sm font-medium text-espresso">
              Pickup or delivery? <span className="text-xs font-normal text-stone-warm">(delivery subject to confirmation)</span>
            </legend>
            <div className="grid gap-3 sm:grid-cols-2">
              {(
                [
                  { value: "pickup", label: "Pickup", text: "Collect from Maa Regi, Tse Addo", icon: Store },
                  { value: "delivery", label: "Delivery", text: "Availability and fee confirmed by Maa Regi", icon: Truck },
                ] as { value: Fulfilment; label: string; text: string; icon: typeof Store }[]
              ).map((opt) => {
                const checked = details.fulfilment === opt.value;
                return (
                  <label
                    key={opt.value}
                    className={cn(
                      "flex cursor-pointer gap-3 rounded-xl border p-4 transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-cocoa",
                      checked ? "border-cocoa bg-cocoa/5" : "border-cocoa/20 bg-cream-soft hover:border-cocoa/50",
                    )}
                  >
                    <input
                      type="radio"
                      name="fulfilment"
                      value={opt.value}
                      checked={checked}
                      onChange={() => update("fulfilment", opt.value)}
                      className="mt-1 h-4 w-4 accent-cocoa"
                    />
                    <span>
                      <span className="flex items-center gap-2 font-medium text-espresso">
                        <opt.icon className="h-4 w-4 text-cocoa" aria-hidden /> {opt.label}
                      </span>
                      <span className="mt-0.5 block text-xs text-stone-warm">{opt.text}</span>
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          {details.fulfilment === "delivery" && (
            <TextArea
              id="deliveryLocation"
              label="Delivery location"
              required
              rows={2}
              autoComplete="street-address"
              placeholder="Area, street and a nearby landmark"
              value={details.deliveryLocation}
              onChange={(e) => update("deliveryLocation", e.target.value)}
              error={errors.deliveryLocation}
            />
          )}

          <TextArea
            id="notes"
            label="Order notes"
            rows={3}
            placeholder="Preferred pickup time, allergies, special requests…"
            value={details.notes}
            onChange={(e) => update("notes", e.target.value)}
          />

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button type="submit" size="lg">
              Review order
            </Button>
            <Link href="/menu" className={buttonClasses("ghost", "lg")}>
              Add more items
            </Link>
          </div>
        </form>
      </div>
      {summary}
    </div>
  );
}
