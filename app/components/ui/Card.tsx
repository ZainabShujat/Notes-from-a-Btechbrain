import Link from "next/link";
import React from "react";
import { cx } from "./cx";

export type CardProps = {
  /** Renders the whole card as a link when provided. */
  href?: string;
  /** Adds the hover lift. Defaults to true when href is set. */
  interactive?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
  className?: string;
  children: React.ReactNode;
};

const paddings = {
  none: "",
  sm: "p-4",
  md: "p-5 md:p-6",
  lg: "p-6 md:p-8",
} as const;

/**
 * The shared card surface — same glass as Panel, plus the one
 * hover treatment used across the site (lighten + 1px lift).
 * Content-specific cards (post, topic) compose this.
 */
export default function Card({
  href,
  interactive,
  padding = "md",
  className,
  children,
}: CardProps) {
  const isInteractive = interactive ?? href !== undefined;

  const classes = cx(
    "block bg-surface-1 border border-hairline rounded-lg backdrop-blur-md shadow-card",
    paddings[padding],
    isInteractive &&
      "transition-[transform,background-color,border-color,box-shadow] duration-200 " +
        "hover:bg-surface-2 hover:border-hairline-strong hover:shadow-lift hover:-translate-y-0.5 " +
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return <div className={classes}>{children}</div>;
}
