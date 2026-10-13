export type FieldErrors<T extends string> = Partial<Record<T, string>>;

/** Normalises a Ghanaian phone number; returns null when it is not valid. */
export function normaliseGhanaPhone(input: string): string | null {
  const cleaned = input.replace(/[\s\-().]/g, "");
  const match = cleaned.match(/^(?:\+?233|0)(\d{9})$/);
  return match ? `+233${match[1]}` : null;
}

export function validateRequired(value: string, label: string): string | undefined {
  return value.trim() ? undefined : `Please enter ${label}.`;
}

export function validatePhone(value: string): string | undefined {
  if (!value.trim()) return "Please enter a phone number.";
  return normaliseGhanaPhone(value)
    ? undefined
    : "Enter a valid Ghana number, e.g. 024 123 4567 or +233 24 123 4567.";
}

export function validateEmail(value: string, required = false): string | undefined {
  if (!value.trim()) return required ? "Please enter an email address." : undefined;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
    ? undefined
    : "Enter a valid email address, e.g. name@example.com.";
}

/** Returns an error if the ISO date (yyyy-mm-dd) is missing or in the past. */
export function validateFutureDate(value: string): string | undefined {
  if (!value) return "Please choose the event date.";
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return "Please choose a valid date.";
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today ? "The event date cannot be in the past." : undefined;
}

export function hasErrors(errors: Record<string, string | undefined>): boolean {
  return Object.values(errors).some(Boolean);
}
