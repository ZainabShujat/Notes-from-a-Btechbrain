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
}

export default function PostCard({ title, slug, excerpt, date, category, banner, featured }: PostCardProps) {
  return (
    <article
      className={`relative rounded-2xl overflow-hidden shadow-lg border border-purple-200 dark:border-purple-700 flex flex-col justify-end w-full bg-black group transition-transform duration-200 will-change-transform ${featured ? "featured-postcard" : ""}`}
      style={featured
        ? { minWidth: 340, maxWidth: 600, minHeight: 400, maxHeight: 400, gridColumn: 'span 2', gridRow: 'span 2' }
        : { minWidth: 320, maxWidth: 420, minHeight: 340, maxHeight: 340 }}
      tabIndex={0}
    >
      {/* Banner image centered and fully visible, with zoom on hover */}
      {banner && (
        <img
          src={banner}
          alt={title}
          className="absolute inset-0 w-full h-full object-contain object-center z-0 transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
          style={{ background: '#0a0020' }}
        />
      )}

      {/* Category pill in top-left, more translucent */}
      {category && (
        <span
          className="absolute top-4 left-4 px-3 py-1 rounded-full bg-purple-500/50 text-white text-xs font-semibold tracking-wide shadow-md z-20 backdrop-blur-sm"
          style={{ maxWidth: '70%', border: '1.5px solid #fff2', letterSpacing: '0.03em' }}
        >
          {category}
        </span>
      )}

      {/* Bottom-only gradient fade for text readability */}
      <div className="absolute bottom-0 left-0 w-full h-2/3 z-10 pointer-events-none" style={{background: 'linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0))'}} />

      {/* Card content at bottom, smaller overlay */}
      <div className="absolute bottom-0 left-0 w-full z-20">
        <div className="w-full px-4 pt-3 pb-2 flex flex-col gap-1">
          <h3 className="text-lg font-bold leading-snug text-white mb-0.5 drop-shadow-lg">
            <Link href={`/post/${slug}`}>{title}</Link>
          </h3>
          {excerpt && (
            <p className="text-slate-100 text-xs mb-1 max-w-full drop-shadow-md">
              {excerpt}
            </p>
          )}
          <div className="flex items-center justify-between text-slate-200/90 text-xs mt-0.5">
            <div className="flex items-center gap-2">
              <ArticleStats slug={slug} />
              {date && <span className="ml-1 text-[10px]">{date}</span>}
            </div>
            <Link
              href={`/post/${slug}`}
              className="inline-block px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-400 to-purple-600 text-white font-semibold text-xs shadow-lg transition-all duration-200 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.6)] group-hover:-translate-y-[1px] focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              Dive in <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Card hover animation: lift */}
      <style jsx>{`
        .group:hover, .group:focus {
          transform: translateY(-6px);
        }
        .featured-postcard {
          min-width: 340px !important;
          max-width: 600px !important;
          min-height: 400px !important;
          max-height: 400px !important;
        }
      `}</style>
    </article>
  );
}
