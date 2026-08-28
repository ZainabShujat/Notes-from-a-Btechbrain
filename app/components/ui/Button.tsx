import Link from "next/link";
import React from "react";
import { cx } from "./cx";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "pill"
  | "pill-accent";
export type ButtonSize = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-semibold whitespace-nowrap " +
  "transition-[transform,background-color,box-shadow,color] duration-200 " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent " +
  "disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-white rounded-md shadow-card hover:bg-accent-strong hover:-translate-y-px active:translate-y-0",
  secondary:
    "bg-surface-2 text-ink-1 border border-hairline rounded-md backdrop-blur-md " +
    "hover:bg-surface-3 hover:border-hairline-strong hover:-translate-y-px active:translate-y-0",
  ghost:
    "text-ink-2 rounded-md hover:text-ink-1 hover:bg-surface-1",
  pill:
    "bg-surface-2 text-ink-1 border border-hairline rounded-pill backdrop-blur-md shadow-card " +
    "hover:bg-surface-3 hover:shadow-lift hover:-translate-y-px active:translate-y-0",
  "pill-accent":
    "bg-accent/85 text-white border border-accent/40 rounded-pill backdrop-blur-md shadow-card " +
    "hover:bg-accent hover:shadow-lift hover:-translate-y-px active:translate-y-0",
};

const sizes: Record<ButtonSize, string> = {
  sm: "text-sm px-3 py-1.5 min-h-9",
  md: "text-sm px-4 py-2.5 min-h-11",
  lg: "text-base px-6 py-3 min-h-12",
};

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButton = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps> & {
    href: string;
    prefetch?: boolean;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

/**
 * The single button in the system.
 *
 * primary   solid violet — the one clear action on a screen
 * secondary glass + hairline — the default for everything else
 * ghost     text only — inline "see all" style actions
 * pill      large rounded glass — hero CTAs
 * pill-accent  the one violet CTA in a pill row
 */
export default function Button(props: ButtonProps) {
  const { variant = "secondary", size = "md", className, children, ...rest } =
    props;

  const classes = cx(base, variants[variant], sizes[size], className);

  if (rest.href !== undefined) {
    const { href, ...anchorProps } = rest as Omit<
      ButtonAsLink,
      keyof CommonProps
    >;

    if (/^https?:\/\//.test(href)) {
      return (
        <a href={href} className={classes} {...anchorProps}>
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={classes} {...anchorProps}>
        {children}
      </Link>
    );
  }

  const buttonProps = rest as Omit<ButtonAsButton, keyof CommonProps>;

  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
