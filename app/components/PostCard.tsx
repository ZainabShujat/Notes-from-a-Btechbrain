"use client";
// app/components/PostCard.tsx
import Link from "next/link";
import React from "react";
import { cx } from "./ui/cx";

type Props = {
  title: string;
  slug: string;
  tags?: string[];
  cluster?: string;
  pathway?: string;
  importance?: number;
  related?: string[];
  mapDescription?: string;
  excerpt?: string;
  date?: string;
  category?: string;
  banner?: string;
  created_at?: string;
  likes?: number;
  views?: number;
};

interface PostCardProps extends Props {
  /** Wide hero card — spans two columns, keeps the excerpt. */
  featured?: boolean;
  /** Compact card for dense rails. */
  small?: boolean;
}

function formatCategory(category?: string) {
  if (!category) return null;
  return category
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export default function PostCard({
  title,
  slug,
  excerpt,
  date,
  category,
  banner,
  featured,
  small,
  created_at,
}: PostCardProps) {
  const when = date || created_at;

  return (
    <Link
      href={`/post/${slug}`}
      className={cx(
        "group flex w-full min-w-0 flex-col overflow-hidden rounded-lg bg-raised",
        "border border-hairline shadow-card",
        "transition-[transform,box-shadow,border-color] duration-300",
        "hover:-translate-y-1 hover:shadow-lift hover:border-hairline-strong",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
        featured && "sm:col-span-2"
      )}
    >
      {/* The banner is a designed poster and usually carries its own title —
          so it is shown clean: no scrim, no overlaid type, full brightness. */}
      <div
        className={cx(
          "relative w-full overflow-hidden bg-sunken",
          "aspect-[16/9]"
        )}
      >
        {banner ? (
          <img
            src={banner}
            alt={title}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-sunken to-raised" />
        )}
      </div>

      {/* Caption sits under the art, where it can never fight the artwork. */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-center gap-2 text-[11px] text-ink-3">
          {category && (
            <span className="truncate font-medium text-accent-soft">
              {formatCategory(category)}
            </span>
          )}

          {category && when && <span aria-hidden="true">·</span>}

          {when && <span>{new Date(when).toLocaleDateString()}</span>}
        </div>

        <h3
          className={cx(
            "font-semibold leading-snug text-ink-1 transition-colors group-hover:text-accent-soft",
            featured ? "text-xl md:text-2xl" : small ? "text-sm" : "text-base"
          )}
        >
          {title}
        </h3>

        {featured && excerpt && (
          <p className="max-w-2xl text-sm text-ink-2 line-clamp-2">{excerpt}</p>
        )}
      </div>
    </Link>
  );
}
