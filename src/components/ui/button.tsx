import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/format";

type Variant = "primary" | "secondary" | "ghost" | "light" | "outline-light";
type Size = "md" | "lg" | "sm";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50 whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary: "bg-cocoa text-cream-soft hover:bg-espresso focus-visible:outline-cocoa",
  secondary: "border border-cocoa/30 text-cocoa hover:border-cocoa hover:bg-cocoa/5 focus-visible:outline-cocoa",
  ghost: "text-cocoa hover:bg-cocoa/5 focus-visible:outline-cocoa",
  light: "bg-cream-soft text-espresso hover:bg-white focus-visible:outline-cream",
  "outline-light": "border border-cream/60 text-cream-soft hover:bg-cream/10 focus-visible:outline-cream",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-[0.95rem]",
  lg: "h-12 px-7 text-base",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "md", className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}

type ButtonProps = ComponentProps<"button"> & { variant?: Variant; size?: Size };

export function Button({ variant = "primary", size = "md", className, type = "button", ...props }: ButtonProps) {
  return <button type={type} className={buttonClasses(variant, size, className)} {...props} />;
}

type LinkButtonProps = {
  href: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  external?: boolean;
} & Omit<ComponentProps<"a">, "href">;

export function LinkButton({ href, variant = "primary", size = "md", className, children, external, ...props }: LinkButtonProps) {
  const classes = buttonClasses(variant, size, className);
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...props}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} {...props}>
      {children}
    </Link>
  );
}
