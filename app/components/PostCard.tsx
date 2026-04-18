"use client";
// app/components/PostCard.tsx
import Link from "next/link";
import React from "react";
import ArticleStats from "./ArticleStats";

type Props = {
  title: string;
  slug: string;
  excerpt?: string;
  date?: string;
  category?: string;
  banner?: string;
  likes?: number;   // <-- add this
  views?: number;   // <-- add this
};

interface PostCardProps extends Props {
  featured?: boolean;
  small?: boolean;
}

export default function PostCard({ title, slug, excerpt, date, category, banner, featured, small }: PostCardProps) {
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
      className={`relative rounded-2xl overflow-hidden shadow border border-purple-100 dark:border-purple-700 flex flex-col justify-end w-full min-w-0 bg-black group transition-transform duration-200 will-change-transform ${featured ? "featured-postcard" : "aspect-[1/1]"}`}
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
          style={{ background: '#0a0020', opacity: 0.75, filter: 'brightness(0.5)' }}
        />
      )}

      {/* Category pill in top-left, more translucent */}
      {category && (
        <span
          className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-purple-200/10 text-purple-100/50 text-[11px] font-normal tracking-wide z-20 backdrop-blur-sm border border-purple-100/5"
          style={{ maxWidth: '70%', border: '1px solid #eee2', letterSpacing: '0.02em', background: 'rgba(168,85,247,0.07)' }}
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
            <p className="text-slate-100 text-xs mb-1 max-w-full drop-shadow-md">
              {excerpt}
            </p>
          )}
          <div className="flex items-center justify-between text-slate-200/90 text-xs mt-2">
            {!small && date && <span className="text-[11px] text-slate-200/80 font-normal">{date}</span>}
            <Link
              href={`/post/${slug}`}
              className={`inline-block px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-400 to-purple-600 text-white font-medium text-xs shadow transition-all duration-200 group-hover:shadow-[0_0_12px_rgba(168,85,247,0.3)] group-hover:-translate-y-[1px] focus:outline-none focus:ring-2 focus:ring-purple-300 ${small ? 'text-xs px-2 py-1' : ''}`}
            >
              Dive in <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Card hover animation: lift */}
      <style jsx>{`
        .group:hover, .group:focus {
          transform: translateY(-4px);
        }
        .featured-postcard {
          min-width: 340px !important;
          max-width: 600px !important;
          min-height: 400px !important;
          max-height: 400px !important;
        }
        /* Increase spacing between cards globally */
        :global(.grid), :global(.gap-8) {
          gap: 28px !important;
        }
      `}</style>
    </article>
  );
}
