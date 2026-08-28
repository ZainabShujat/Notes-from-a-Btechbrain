import Link from "next/link";
import React from "react";
import { cx } from "./cx";

export type TagTone = "neutral" | "accent" | "highlight";
export type TagSize = "sm" | "md";

const tones: Record<TagTone, string> = {
  neutral: "bg-surface-2 text-ink-2 border-hairline",
  accent: "bg-accent-muted text-accent-soft border-accent/30",
  highlight: "bg-highlight/10 text-highlight border-highlight/25",
};

const sizes: Record<TagSize, string> = {
  sm: "text-[11px] px-2 py-0.5",
  md: "text-xs px-2.5 py-1",
};

export type TagProps = {
  tone?: TagTone;
  size?: TagSize;
  href?: string;
  className?: string;
  children: React.ReactNode;
};

/** Category pills, version badges, metadata chips. */
export default function Tag({
  tone = "neutral",
  size = "sm",
  href,
  className,
  children,
}: TagProps) {
  const classes = cx(
    "inline-flex items-center gap-1 border rounded-pill font-medium tracking-wide backdrop-blur-sm",
    tones[tone],
    sizes[size],
    href && "transition-colors hover:text-ink-1 hover:bg-surface-3",
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return <span className={classes}>{children}</span>;
}
