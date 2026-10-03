"use client";

import Link from "next/link";
import { QuickRevisionSection } from "../../../lib/courses/types";

export default function QuickRevision({
  section,
}: {
  section: QuickRevisionSection;
}) {
  const { oneMinutePanicCard, heading, cheatSheetDownloadSlug } = section;

  return (
    <section className="my-10 border-t border-dashed border-hairline/80 pt-6">
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 border-b border-dashed border-hairline/70 pb-3 mb-5">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-accent font-bold block mb-1">
            RAPID REVIEW &middot; NOTEBOOK SUMMARY
          </span>
          <h3 className="font-handwriting text-2xl sm:text-3xl font-bold text-ink-1">
            {heading || "Quick Revision Summary"}
          </h3>
        </div>

        {cheatSheetDownloadSlug && (
          <Link
            href={`/notes/cheat-sheets#${cheatSheetDownloadSlug}`}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded border border-hairline/70 bg-surface-1/40 hover:bg-surface-2 text-xs font-mono text-ink-2 hover:text-ink-1 transition-colors self-start sm:self-auto"
          >
            <span>Cheat Sheet</span>
            <span>&rarr;</span>
          </Link>
        )}
      </div>

      {/* Core Memory Anchor Note on Paper */}
      <div className="my-5 pl-4 border-l-2 border-accent space-y-2">
        <span className="font-handwriting text-lg sm:text-xl font-bold text-accent block">
          core principle:
        </span>
        <p className="text-sm sm:text-base font-bold text-ink-1 leading-snug font-sans">
          &ldquo;{oneMinutePanicCard.coreRule}&rdquo;
        </p>
      </div>

      {/* Principles & Pitfalls Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 font-sans">
        {/* Principles */}
        <div className="pl-3.5 border-l-2 border-hairline/80 space-y-2">
          <span className="font-handwriting text-lg sm:text-xl font-bold text-ink-1 block">
            must-remember principles:
          </span>
          <ul className="space-y-1.5 text-xs sm:text-sm text-ink-2 font-mono">
            {oneMinutePanicCard.mustRememberFormulas.map((rule, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-accent font-mono text-xs mt-0.5">&bull;</span>
                <span className="leading-relaxed">{rule}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Pitfalls */}
        <div className="pl-3.5 border-l-2 border-accent/80 space-y-2">
          <span className="font-handwriting text-lg sm:text-xl font-bold text-accent block">
            critical exam pitfalls:
          </span>
          <ul className="space-y-1.5 text-xs sm:text-sm text-ink-2 font-mono">
            {oneMinutePanicCard.criticalPitfalls.map((pitfall, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-accent font-mono text-xs mt-0.5">&bull;</span>
                <span className="leading-relaxed">{pitfall}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Visual Execution Flow Decision Tree */}
      {oneMinutePanicCard.visualFlow && (
        <div className="mt-6 pt-4 border-t border-dashed border-hairline/80">
          <span className="font-handwriting text-base font-bold text-accent block mb-2">
            decision flow &amp; invariants:
          </span>
          <div className="bg-surface-1/40 border border-dashed border-hairline/80 rounded p-4 font-mono text-[11px] sm:text-xs text-ink-1 overflow-x-auto whitespace-pre leading-relaxed">
            {oneMinutePanicCard.visualFlow}
          </div>
        </div>
      )}
    </section>
  );
}
