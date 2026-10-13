"use client";

import { useRef, useState } from "react";
import { FlaskConical } from "lucide-react";
import { business } from "@/config/site";
import { hasErrors, validateEmail, validatePhone, validateRequired, type FieldErrors } from "@/lib/validation";
import { Button } from "@/components/ui/button";
import { ErrorSummary, SelectField, TextArea, TextField } from "./fields";

type Values = { name: string; phone: string; email: string; topic: string; message: string };
type Field = keyof Values;
const empty: Values = { name: "", phone: "", email: "", topic: "", message: "" };
const labels: Record<Field, string> = { name: "Name", phone: "Phone number", email: "Email address", topic: "Topic", message: "Message" };
const topics = ["General question", "Bakery order", "Restaurant order", "Feedback", "Other"];

function validate(v: Values): FieldErrors<Field> {
  return {
    name: validateRequired(v.name, "your name"),
    phone: validatePhone(v.phone),
    email: validateEmail(v.email),
    message: validateRequired(v.message, "a message"),
  };
}

export function ContactForm() {
  const [values, setValues] = useState<Values>(empty);
  const [errors, setErrors] = useState<FieldErrors<Field>>({});
  const [submitted, setSubmitted] = useState(false);
  const [done, setDone] = useState(false);
  const doneRef = useRef<HTMLDivElement>(null);

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
      requestAnimationFrame(() => document.getElementById("contact-errors")?.focus());
      return;
    }
    setDone(true);
    requestAnimationFrame(() => doneRef.current?.focus());
  }

  if (done) {
    return (
      <div ref={doneRef} tabIndex={-1} role="status" className="rounded-2xl bg-cream-soft p-6 shadow-card ring-1 ring-cocoa/5 focus:outline-none sm:p-8">
        <div className="grid h-12 w-12 place-items-center rounded-full bg-caramel/20 text-caramel-dark">
          <FlaskConical className="h-6 w-6" aria-hidden />
        </div>
        <h3 className="mt-4 font-serif text-3xl text-espresso">Demo message recorded</h3>
        <p className="mt-2 text-espresso-soft">
          This is a demonstration, so <strong className="text-espresso">your message has not been sent to {business.name}</strong>. In the
          live version, the business would receive it and reply.
        </p>
        <Button
          variant="secondary"
          className="mt-6"
          onClick={() => {
            setValues(empty);
            setDone(false);
            setSubmitted(false);
            setErrors({});
          }}
        >
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} className="space-y-5 rounded-2xl bg-cream-soft p-5 shadow-card ring-1 ring-cocoa/5 sm:p-8">
      {submitted && <ErrorSummary id="contact-errors" errors={errors} labels={labels} />}
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
        <TextField id="email" label="Email address" type="email" autoComplete="email" value={values.email} onChange={set("email")} error={errors.email} />
        <SelectField id="topic" label="Topic" options={topics} value={values.topic} onChange={set("topic")} />
      </div>
      <TextArea id="message" label="Message" required rows={5} value={values.message} onChange={set("message")} error={errors.message} />
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <Button type="submit" size="lg">
          Send message
        </Button>
        <p className="text-xs text-stone-warm">Demonstration form — messages are not sent to Maa Regi.</p>
      </div>
    </form>
  );
}
