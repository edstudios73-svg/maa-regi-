import type { ReactNode } from "react";
import { cn } from "@/lib/format";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2";
  tone?: "dark" | "light";
  className?: string;
  id?: string;
};

export function SectionHeading({ eyebrow, title, description, align = "left", as: Tag = "h2", tone = "dark", className, id }: Props) {
  const light = tone === "light";
  return (
    <div className={cn(align === "center" && "mx-auto text-center", "max-w-2xl", className)}>
      {eyebrow && (
        <p className={cn("mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-eyebrow", align === "center" && "justify-center", light ? "text-caramel-light" : "text-terracotta")}>
          <span className="h-px w-8 bg-current opacity-60" aria-hidden />
          {eyebrow}
          {align === "center" && <span className="h-px w-8 bg-current opacity-60" aria-hidden />}
        </p>
      )}
      <Tag
        id={id}
        className={cn(
          "font-serif font-medium leading-[1.1] text-balance",
          Tag === "h1" ? "text-4xl sm:text-5xl lg:text-6xl" : "text-3xl sm:text-4xl lg:text-[2.75rem]",
          light ? "text-cream-soft" : "text-espresso",
        )}
      >
        {title}
      </Tag>
      {description && (
        <p className={cn("mt-4 text-base leading-relaxed sm:text-lg", light ? "text-cream/80" : "text-espresso-soft")}>{description}</p>
      )}
    </div>
  );
}
