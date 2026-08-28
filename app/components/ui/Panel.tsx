import React from "react";
import { cx } from "./cx";

export type PanelProps = {
  /** 1 = quiet (page sections), 2 = raised (filter bars, HUD panels) */
  level?: 1 | 2;
  padding?: "none" | "sm" | "md" | "lg";
  className?: string;
  children: React.ReactNode;
} & Omit<React.HTMLAttributes<HTMLDivElement>, "className" | "children">;

const levels = {
  1: "bg-surface-1 border-hairline",
  2: "bg-surface-2 border-hairline-strong",
} as const;

const paddings = {
  none: "",
  sm: "p-4",
  md: "p-5 md:p-6",
  lg: "p-6 md:p-8",
} as const;

/**
 * The glass surface, lifted from the Brain Map HUD:
 * translucent white over the night ground, one hairline border,
 * one blur value. Every card, filter bar and callout sits on it.
 */
export default function Panel({
  level = 1,
  padding = "md",
  className,
  children,
  ...rest
}: PanelProps) {
  return (
    <div
      className={cx(
        "border rounded-lg backdrop-blur-md shadow-card",
        levels[level],
        paddings[padding],
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
