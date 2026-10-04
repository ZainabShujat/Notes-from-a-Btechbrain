import React from "react";

export type HighlightColor = "yellow" | "pink" | "green" | "purple" | "violet";

interface HighlightProps {
  color?: HighlightColor;
  children: React.ReactNode;
  className?: string;
}

/**
 * Reusable inline text highlighter component.
 * Mimics a real student highlighter marker stroke behind the text with organic,
 * non-pill edges and natural multi-line wrapping.
 *
 * Color semantics:
 * - yellow = core definition / fact (default)
 * - pink   = important distinction / common trap
 * - green  = intuition / connection
 * - purple = key terminology / structural concept
 */
export default function Highlight({
  color = "yellow",
  children,
  className = "",
}: HighlightProps) {
  const colorClass =
    color === "pink"
      ? "highlight-pink"
      : color === "green"
      ? "highlight-green"
      : color === "purple" || color === "violet"
      ? "highlight-purple"
      : "highlight-yellow";

  return (
    <mark className={`student-highlight ${colorClass} ${className}`}>
      {children}
    </mark>
  );
}
