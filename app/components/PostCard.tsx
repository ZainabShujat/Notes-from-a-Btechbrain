"use client";
// app/components/PostCard.tsx
import Link from "next/link";
import React from "react";
import ArticleStats from "./ArticleStats";

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
  likes?: number;   // <-- add this
  views?: number;   // <-- add this
};

interface PostCardProps extends Props {
  featured?: boolean;
  small?: boolean;
}

export default function PostCard({ title, slug, excerpt, date, category, banner, featured, small, created_at }: PostCardProps) {
  let style: React.CSSProperties = {};

  if (featured) {
    style = { minWidth: 340, maxWidth: 600, minHeight: 400, maxHeight: 400, gridColumn: 'span 2', gridRow: 'span 2', margin: '0 0 28px 0' };
  } else if (small) {
    style = { minWidth: 140, maxWidth: 160, minHeight: 180, maxHeight: 180, margin: '0 0 12px 0' };
  } else {
    // Even larger square aspect for grid cards
    style = { aspectRatio: '1 / 1', minHeight: 0, maxHeight: 'none', margin: '0 0 28px 0', maxWidth: 500, minWidth: 260 };
  }

  return (
    <article
      className={`relative rounded-lg overflow-hidden shadow-card border border-hairline flex flex-col justify-end w-full min-w-0 bg-sunken group transition-[transform,box-shadow,border-color] duration-200 will-change-transform hover:-translate-y-1 hover:shadow-lift hover:border-hairline-strong ${featured ? "featured-postcard" : "aspect-[1/1]"}`}
      style={style}
      tabIndex={0}
    >
      {/* Banner image centered and fully visible, with zoom on hover */}
      {banner && (
        <img
          src={banner}
          alt={title}
          className="absolute inset-0 w-full h-full object-contain object-center z-0 transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
          style={{ background: '#0a0020', opacity: 0.95, filter: 'brightness(0.6)' }}
        />
      )}

      {/* Category pill in top-left, more translucent */}
      {category && (
        <span
          className="absolute top-3 left-3 max-w-[70%] truncate px-2 py-0.5 rounded-pill bg-accent-muted text-accent-soft text-[11px] font-medium tracking-wide z-20 backdrop-blur-sm border border-hairline"
        >
          {category}
        </span>
      )}

      {/* Bottom-only gradient fade for text readability */}
      <div className="absolute bottom-0 left-0 w-full h-2/3 z-10 pointer-events-none" style={{background: 'linear-gradient(to top, rgba(0,0,0,0.55), rgba(0,0,0,0))'}} />

      {/* Card content at bottom, smaller overlay */}
      <div className="absolute bottom-0 left-0 w-full z-20">
        <div className={`w-full px-4 pt-3 pb-2 flex flex-col gap-1 ${small ? 'text-[13px]' : ''}`}>
          <h3 className={`font-bold leading-snug text-white mb-0.5 drop-shadow-lg ${small ? 'text-base' : 'text-lg'}`}>
            <Link href={`/post/${slug}`}>{title}</Link>
          </h3>
          {!small && excerpt && (
            <p className="text-ink-2 text-xs mb-1 max-w-full drop-shadow-md">
              {excerpt}
            </p>
          )}
          <div className="flex items-center justify-between text-ink-2 text-xs mt-2">
            {!small && (date || created_at) && (
  <span className="text-[11px] text-ink-3 font-normal">
    {new Date(date || created_at!).toLocaleDateString()}
  </span>
)}
            <Link
              href={`/post/${slug}`}
              className={`inline-block px-3 py-1.5 rounded-pill bg-accent text-white font-medium text-xs shadow-card transition-[transform,background-color,box-shadow] duration-200 hover:bg-accent-strong group-hover:shadow-glow group-hover:-translate-y-px ${small ? 'text-xs px-2 py-1' : ''}`}
            >
              Dive in <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </div>

    </article>
  );
}
