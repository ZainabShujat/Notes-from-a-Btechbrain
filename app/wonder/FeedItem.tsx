"use client";

import { useState } from "react";
import Link from "next/link";
import LikeButton from "../components/LikeButton";
import { Observation } from "./data";

export default function FeedItem({ obs }: { obs: Observation }) {
  const [copied, setCopied] = useState(false);
  const postUrl = typeof window !== "undefined" 
    ? `${window.location.origin}/wonder/${obs.id}` 
    : `/wonder/${obs.id}`; // Fallback for SSR

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(postUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  return (
    <article className="relative flex gap-4 md:gap-5 py-6 md:py-8 border-b border-hairline group">
      {/* Avatar column */}
      <div className="shrink-0 flex flex-col items-center">
        <Link href="/">
          <img
            src="/thumbnail.png"
            alt="Zainab Shujat"
            className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border border-hairline group-hover:border-accent-soft transition-colors"
          />
        </Link>
        {/* Timeline connecting line */}
        <div className="w-px h-full bg-hairline mt-4 group-last:hidden" />
      </div>

      {/* Content column */}
      <div className="flex-1 min-w-0 pb-2">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <Link href="/" className="font-bold text-ink-1 hover:underline decoration-accent-soft">
              Zainab Shujat
            </Link>
            <span className="text-ink-3 text-sm">@btechbrain</span>
            <span className="text-ink-3 text-sm">·</span>
            <Link href={`/wonder/${obs.id}`} className="text-ink-3 text-sm hover:underline">
              {new Date(obs.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </Link>
          </div>
        </div>

        {/* Thought text */}
        <div className="mt-2 text-[15px] md:text-[16px] leading-relaxed text-ink-2 whitespace-pre-wrap">
          <span className="font-semibold text-ink-1 block mb-1">{obs.title}</span>
          {obs.body}
        </div>

        {/* Actions row */}
        <div className="flex items-center gap-6 mt-4">
          <div className="scale-90 origin-left">
             <LikeButton slug={`wonder-${obs.id}`} />
          </div>
         
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 text-ink-3 hover:text-accent-soft transition-colors text-sm font-medium"
            aria-label="Share"
          >
            {copied ? (
              <>
                <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-green-500">Copied</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                <span>Share</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
