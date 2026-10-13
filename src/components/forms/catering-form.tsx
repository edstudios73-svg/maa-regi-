"use client";

import { useRef, useState } from "react";
import { FlaskConical } from "lucide-react";
import { business } from "@/config/site";
import {
  hasErrors,
  validateEmail,
  validateFutureDate,
  validatePhone,
  validateRequired,
  type FieldErrors,
} from "@/lib/validation";
import { Button } from "@/components/ui/button";
import { ErrorSummary, SelectField, TextArea, TextField } from "./fields";

type Values = {
  name: string;
  phone: string;
  email: string;
  eventType: string;
  eventDate: string;
  guests: string;
  location: string;
  requirements: string;
  notes: string;
};
type Field = keyof Values;

const empty: Values = { name: "", phone: "", email: "", eventType: "", eventDate: "", guests: "", location: "", requirements: "", notes: "" };

const labels: Record<Field, string> = {
  name: "Name",
  phone: "Phone number",
  email: "Email address",
  eventType: "Type of event",
  eventDate: "Event date",
  guests: "Estimated number of guests",
  location: "Event location",
  requirements: "Food requirements",
  notes: "Additional notes",
};

/** Editable list; confirm with the owner which events Maa Regi caters for. */
const eventTypes = ["Birthday", "Wedding", "Funeral", "Naming ceremony", "Corporate / office", "Church or community event", "Party", "Other"];

function validate(v: Values): FieldErrors<Field> {
  const guests = Number(v.guests);
  return {
    name: validateRequired(v.name, "your name"),
    phone: validatePhone(v.phone),
    email: validateEmail(v.email),
    eventType: v.eventType ? undefined : "Please choose the type of event.",
    eventDate: validateFutureDate(v.eventDate),
    guests: !v.guests.trim()
      ? "Please give an estimated number of guests."
      : !Number.isInteger(guests) || guests < 1
        ? "Enter a whole number of guests, e.g. 50."
        : undefined,
    location: validateRequired(v.location, "the event location"),
    requirements: validateRequired(v.requirements, "the food you have in mind"),
  };
}

export function CateringForm() {
  const [values, setValues] = useState<Values>(empty);
  const [errors, setErrors] = useState<FieldErrors<Field>>({});
  const [submitted, setSubmitted] = useState(false);
  const [done, setDone] = useState<Values | null>(null);
  const confirmRef = useRef<HTMLDivElement>(null);
  const today = new Date().toISOString().slice(0, 10);

  const set = (key: Field) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const next = { ...values, [key]: e.target.value };
    setValues(next);
    if (submitted) setErrors(validate(next));
  };

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    const errs = validate(values);
    setErrors(errs);
    if (hasErrors(errs)) {
      requestAnimationFrame(() => document.getElementById("catering-errors")?.focus());
      return;
    }
    // Prototype only: the enquiry stays in this browser and is not sent anywhere.
    setDone(values);
    requestAnimationFrame(() => confirmRef.current?.focus());
  }

  if (done) {
    return (
      <div ref={confirmRef} tabIndex={-1} role="status" className="rounded-2xl bg-cream-soft p-6 shadow-card ring-1 ring-cocoa/5 focus:outline-none sm:p-8">
        <div className="grid h-12 w-12 place-items-center rounded-full bg-caramel/20 text-caramel-dark">
          <FlaskConical className="h-6 w-6" aria-hidden />
        </div>
        <h3 className="mt-4 font-serif text-3xl text-espresso">Demo enquiry recorded</h3>
        <p className="mt-2 text-espresso-soft">
          Thank you, {done.name.split(" ")[0]}. This is a demonstration, so{" "}
          <strong className="text-espresso">your enquiry has not been sent to {business.name}</strong>. In the live version, Maa Regi would
          receive these details and get back to you to discuss a quote.
        </p>
        <dl className="mt-6 grid gap-4 text-sm sm:grid-cols-2">
          {(Object.keys(labels) as Field[])
            .filter((k) => done[k].trim())
            .map((k) => (
              <div key={k} className={k === "requirements" || k === "notes" ? "sm:col-span-2" : undefined}>
                <dt className="text-xs font-semibold uppercase tracking-eyebrow text-stone-warm">{labels[k]}</dt>
                <dd className="mt-1 whitespace-pre-wrap break-words text-espresso">{done[k]}</dd>
              </div>
            ))}
        </dl>
        <Button
          variant="secondary"
          className="mt-8"
          onClick={() => {
            setDone(null);
            setValues(empty);
            setSubmitted(false);
            setErrors({});
          }}
        >
          Start a new enquiry
        </Button>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} className="space-y-5 rounded-2xl bg-cream-soft p-5 shadow-card ring-1 ring-cocoa/5 sm:p-8">
      {submitted && <ErrorSummary id="catering-errors" errors={errors} labels={labels} />}

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField id="name" label="Name" required autoComplete="name" value={values.name} onChange={set("name")} error={errors.name} />
        <TextField
          id="phone"
          label="Phone number"
          required
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="024 123 4567"
          value={values.phone}
          onChange={set("phone")}
          error={errors.phone}
        />
        <TextField
          id="email"
          label="Email address"
          type="email"
          autoComplete="email"
          value={values.email}
          onChange={set("email")}
          error={errors.email}
          className="sm:col-span-2"
        />
        <SelectField id="eventType" label="Type of event" required options={eventTypes} value={values.eventType} onChange={set("eventType")} error={errors.eventType} />
        <TextField id="eventDate" label="Event date" required type="date" min={today} value={values.eventDate} onChange={set("eventDate")} error={errors.eventDate} />
        <TextField
          id="guests"
          label="Estimated number of guests"
          required
          type="number"
          inputMode="numeric"
          min={1}
          step={1}
          value={values.guests}
          onChange={set("guests")}
          error={errors.guests}
        />
        <TextField id="location" label="Event location" required placeholder="Venue or area" value={values.location} onChange={set("location")} error={errors.location} />
      </div>
      <TextArea
        id="requirements"
        label="Food requirements"
        required
        rows={4}
        placeholder="Dishes you have in mind, bakery items, drinks, dietary needs…"
        value={values.requirements}
        onChange={set("requirements")}
        error={errors.requirements}
      />
      <TextArea id="notes" label="Additional notes" rows={3} value={values.notes} onChange={set("notes")} />

      <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center">
        <Button type="submit" size="lg">
          Request a Quote
        </Button>
        <p className="text-xs text-stone-warm">Demonstration form — submissions are not sent to Maa Regi.</p>
      </div>
    </form>
  );
}
