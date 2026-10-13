"use client";

import { forwardRef, type ComponentProps, type ReactNode } from "react";
import { CircleAlert } from "lucide-react";
import { cn } from "@/lib/format";

const control =
  "w-full rounded-xl border bg-cream-soft px-4 text-[0.95rem] text-espresso placeholder:text-stone-warm/80 focus:outline-none focus:ring-2 transition-colors";
const ok = "border-cocoa/20 focus:border-cocoa focus:ring-cocoa/20";
const bad = "border-terracotta focus:border-terracotta focus:ring-terracotta/25";

type BaseProps = {
  id: string;
  label: string;
  error?: string;
  hint?: ReactNode;
  required?: boolean;
  className?: string;
};

function FieldShell({ id, label, error, hint, required, className, children }: BaseProps & { children: ReactNode }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-espresso">
        {label}
        {required ? (
          <span className="ml-0.5 text-terracotta" aria-hidden>
            *
          </span>
        ) : (
          <span className="ml-1.5 text-xs font-normal text-stone-warm">(optional)</span>
        )}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-stone-warm">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 flex items-center gap-1.5 text-sm text-terracotta-dark">
          <CircleAlert className="h-3.5 w-3.5 shrink-0" aria-hidden />
          {error}
        </p>
      )}
    </div>
  );
}

function describedBy(id: string, error?: string, hint?: ReactNode) {
  return error ? `${id}-error` : hint ? `${id}-hint` : undefined;
}

type InputProps = BaseProps & Omit<ComponentProps<"input">, "id" | "className">;

export const TextField = forwardRef<HTMLInputElement, InputProps>(function TextField(
  { id, label, error, hint, required, className, ...props },
  ref,
) {
  return (
    <FieldShell id={id} label={label} error={error} hint={hint} required={required} className={className}>
      <input
        ref={ref}
        id={id}
        name={id}
        aria-invalid={error ? true : undefined}
        aria-required={required || undefined}
        aria-describedby={describedBy(id, error, hint)}
        className={cn(control, "h-12", error ? bad : ok)}
        {...props}
      />
    </FieldShell>
  );
});

type TextAreaProps = BaseProps & Omit<ComponentProps<"textarea">, "id" | "className">;

export function TextArea({ id, label, error, hint, required, className, rows = 4, ...props }: TextAreaProps) {
  return (
    <FieldShell id={id} label={label} error={error} hint={hint} required={required} className={className}>
      <textarea
        id={id}
        name={id}
        rows={rows}
        aria-invalid={error ? true : undefined}
        aria-required={required || undefined}
        aria-describedby={describedBy(id, error, hint)}
        className={cn(control, "py-3", error ? bad : ok)}
        {...props}
      />
    </FieldShell>
  );
}

type SelectProps = BaseProps & Omit<ComponentProps<"select">, "id" | "className"> & { options: string[]; placeholder?: string };

export function SelectField({ id, label, error, hint, required, className, options, placeholder = "Select…", ...props }: SelectProps) {
  return (
    <FieldShell id={id} label={label} error={error} hint={hint} required={required} className={className}>
      <select
        id={id}
        name={id}
        aria-invalid={error ? true : undefined}
        aria-required={required || undefined}
        aria-describedby={describedBy(id, error, hint)}
        className={cn(control, "h-12 appearance-none bg-[length:16px] bg-[right_1rem_center] bg-no-repeat pr-10", error ? bad : ok)}
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%235A3A28' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
        }}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </FieldShell>
  );
}

/** Lists all errors at the top of a form after a failed submit and links to each field. */
export function ErrorSummary({ errors, labels, id = "error-summary" }: { errors: Record<string, string | undefined>; labels: Record<string, string>; id?: string }) {
  const entries = Object.entries(errors).filter(([, v]) => v);
  if (!entries.length) return null;
  return (
    <div id={id} tabIndex={-1} role="alert" className="rounded-2xl border border-terracotta/40 bg-terracotta/5 p-4 focus:outline-none">
      <p className="flex items-center gap-2 font-medium text-terracotta-dark">
        <CircleAlert className="h-4 w-4" aria-hidden />
        Please fix {entries.length === 1 ? "the following" : `these ${entries.length} things`}:
      </p>
      <ul className="mt-2 space-y-1 pl-6 text-sm">
        {entries.map(([key, msg]) => (
          <li key={key} className="list-disc text-espresso-soft">
            <a href={`#${key}`} className="underline underline-offset-2 hover:text-espresso">
              {labels[key] ?? key}
            </a>
            : {msg}
          </li>
        ))}
      </ul>
    </div>
  );
}
