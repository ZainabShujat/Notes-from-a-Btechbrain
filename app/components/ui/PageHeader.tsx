import React from "react";
import { cx } from "./cx";

export type PageHeaderProps = {
  /** Small uppercase kicker above the title. */
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Buttons or links shown beneath the description. */
  actions?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
};

/**
 * One page header for every page.
 *
 * Replaces nine hand-rolled headers that ranged from text-3xl to
 * text-7xl and switched between centred and left-aligned. The title
 * uses a single clamped size so it steps down on mobile by itself.
 */
export default function PageHeader({
  eyebrow,
  title,
  description,
  actions,
  align = "left",
  className,
}: PageHeaderProps) {
  const centered = align === "center";

  return (
    <header
      className={cx(
        "flex flex-col gap-4 pb-8 md:pb-10",
        centered && "items-center text-center",
        className
      )}
    >
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-3 m-0">
          {eyebrow}
        </p>
      )}

      <h1 className="text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.1] tracking-tight text-ink-1 m-0">
        {title}
      </h1>

      {description && (
        <p
          className={cx(
            "text-base md:text-lg text-ink-2 leading-relaxed m-0 max-w-2xl",
            centered && "mx-auto"
          )}
        >
          {description}
        </p>
      )}

      {actions && (
        <div
          className={cx(
            "flex flex-wrap items-center gap-3 pt-1",
            centered && "justify-center"
          )}
        >
          {actions}
        </div>
      )}
    </header>
  );
}
