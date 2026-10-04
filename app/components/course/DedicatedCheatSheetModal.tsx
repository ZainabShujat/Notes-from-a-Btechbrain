"use client";

import React, { useState, useEffect } from "react";
import { LessonCheatSheet, LessonMeta, QuickRevisionSection } from "../../../lib/courses/types";
import { formatMarkdownInline } from "./LessonRenderer";
import { OS_LESSON_CHEATSHEETS } from "../../../lib/courses/os-cheatsheets";

interface DedicatedCheatSheetModalProps {
  lesson: LessonMeta;
  isOpen: boolean;
  onClose: () => void;
}

export default function DedicatedCheatSheetModal({
  lesson,
  isOpen,
  onClose,
}: DedicatedCheatSheetModalProps) {
  const [copied, setCopied] = useState(false);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Resolve cheatsheet data: explicit lesson.cheatsheet -> OS_LESSON_CHEATSHEETS lookup -> fallback to quick-revision section
  const dedicatedSheet = lesson.cheatsheet || OS_LESSON_CHEATSHEETS[lesson.slug];

  const quickRevSection = lesson.sections.find(
    (s): s is QuickRevisionSection => s.type === "quick-revision"
  );
  const panicCard = quickRevSection?.oneMinutePanicCard;

  const title = dedicatedSheet?.title || `${lesson.title} · Rapid Cheat Sheet`;
  const summaryRule = dedicatedSheet?.summaryRule || panicCard?.coreRule || lesson.tagline;
  const formulasAndRules =
    dedicatedSheet?.keyFormulasAndRules || panicCard?.mustRememberFormulas || [];
  const pitfalls = dedicatedSheet?.examPitfalls || panicCard?.criticalPitfalls || [];
  const highYieldTips = dedicatedSheet?.highYieldTips || [];
  const visualAnchor = dedicatedSheet?.visualAnchor || panicCard?.visualFlow;

  const handleCopyMarkdown = () => {
    const markdownContent = `# ${lesson.title} — Topic Cheat Sheet
**Core Principle:**
> ${summaryRule}

## Key Formulas & Invariants
${formulasAndRules.map((r) => `- ${r}`).join("\n")}

## Common Traps & Pitfalls
${pitfalls.map((p) => `- ⚠️ ${p}`).join("\n")}
${highYieldTips.length > 0 ? `\n## High-Yield Exam Tips\n${highYieldTips.map((t) => `- 🎯 ${t}`).join("\n")}` : ""}
${visualAnchor ? `\n## Visual Reference\n\`\`\`\n${visualAnchor}\n\`\`\`` : ""}
`;

    navigator.clipboard.writeText(markdownContent).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="cheatsheet-title"
      style={{
        filter: "drop-shadow(0 25px 35px rgba(0, 0, 0, 0.45))",
      }}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] flex flex-col bg-raised text-ink-1 popup-octagon-lg border border-hairline-strong shadow-2xl overflow-hidden font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between p-4 sm:p-6 border-b border-hairline/80 bg-surface-1/40">
          <div className="space-y-1 pr-4">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-accent/15 text-accent border border-accent/25">
                TOPIC CHEAT SHEET
              </span>
              <span className="text-[11px] font-mono text-ink-3">
                ~{lesson.estimatedMinutes} min topic
              </span>
            </div>
            <h2
              id="cheatsheet-title"
              className="text-lg sm:text-xl font-bold font-handwriting tracking-tight text-ink-1"
            >
              {title}
            </h2>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleCopyMarkdown}
              className="px-2.5 py-1 text-xs font-mono rounded border border-hairline/80 bg-surface-2 hover:bg-surface-3 text-ink-2 hover:text-ink-1 transition-colors flex items-center gap-1.5"
              title="Copy markdown format"
            >
              {copied ? (
                <>
                  <span className="text-emerald-500 font-bold">✓</span> Copied
                </>
              ) : (
                <>
                  <span>📋</span> Copy
                </>
              )}
            </button>
            <button
              onClick={handlePrint}
              className="hidden sm:inline-flex px-2.5 py-1 text-xs font-mono rounded border border-hairline/80 bg-surface-2 hover:bg-surface-3 text-ink-2 hover:text-ink-1 transition-colors items-center gap-1.5"
              title="Print cheat sheet"
            >
              <span>🖨️</span> Print
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-2 text-ink-3 hover:text-ink-1 transition-colors text-lg font-bold"
              aria-label="Close modal"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 text-sm">
          {/* Core Principle / Mental Model Anchor */}
          <div className="p-3.5 sm:p-4 rounded-lg bg-accent/5 border-l-4 border-accent border-y border-r border-accent/15">
            <span className="text-[11px] font-mono uppercase tracking-widest text-accent font-bold block mb-1">
              CORE PRINCIPLE & MENTAL ANCHOR
            </span>
            <p
              className="text-sm sm:text-base font-semibold text-ink-1 leading-snug"
              dangerouslySetInnerHTML={{
                __html: `&ldquo;${formatMarkdownInline(summaryRule)}&rdquo;`,
              }}
            />
          </div>

          {/* 2-Column Grid: Formulas/Rules & Exam Traps */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Must-Remember Formulas & Invariants */}
            <div className="p-4 rounded-lg bg-surface-1/40 border border-hairline/70 flex flex-col">
              <div className="flex items-center gap-1.5 mb-3 pb-2 border-b border-hairline/60">
                <span className="text-base">📐</span>
                <h3 className="font-mono text-xs uppercase tracking-wider font-bold text-ink-1">
                  Formulas & Invariants
                </h3>
              </div>
              <ul className="space-y-2.5 flex-1">
                {formulasAndRules.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs sm:text-[13px] text-ink-2 leading-relaxed">
                    <span className="text-accent font-mono font-bold mt-0.5">•</span>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: formatMarkdownInline(rule),
                      }}
                    />
                  </li>
                ))}
              </ul>
            </div>

            {/* Pitfalls & Corner Cases */}
            <div className="p-4 rounded-lg bg-surface-1/40 border border-hairline/70 flex flex-col">
              <div className="flex items-center gap-1.5 mb-3 pb-2 border-b border-hairline/60">
                <span className="text-base">⚠️</span>
                <h3 className="font-mono text-xs uppercase tracking-wider font-bold text-amber-500 dark:text-amber-400">
                  Exam Traps & Misconceptions
                </h3>
              </div>
              <ul className="space-y-2.5 flex-1">
                {pitfalls.map((pitfall, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs sm:text-[13px] text-ink-2 leading-relaxed">
                    <span className="text-amber-500 font-mono font-bold mt-0.5">!</span>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: formatMarkdownInline(pitfall),
                      }}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* High-Yield Tips if present */}
          {highYieldTips.length > 0 && (
            <div className="p-4 rounded-lg bg-surface-1/40 border border-hairline/70">
              <div className="flex items-center gap-1.5 mb-2.5 pb-2 border-b border-hairline/60">
                <span className="text-base">🎯</span>
                <h3 className="font-mono text-xs uppercase tracking-wider font-bold text-emerald-500 dark:text-emerald-400">
                  High-Yield GATE & University Exam Tips
                </h3>
              </div>
              <ul className="space-y-2">
                {highYieldTips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs sm:text-[13px] text-ink-2 leading-relaxed">
                    <span className="text-emerald-500 font-mono font-bold mt-0.5">✓</span>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: formatMarkdownInline(tip),
                      }}
                    />
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Visual Anchor Diagram / ASCII Flow if present */}
          {visualAnchor && (
            <div className="p-4 rounded-lg bg-surface-2/60 border border-hairline/70">
              <div className="flex items-center justify-between mb-2.5 pb-1 border-b border-hairline/50">
                <div className="flex items-center gap-1.5">
                  <span className="text-base">📊</span>
                  <h3 className="font-mono text-xs uppercase tracking-wider font-bold text-ink-3">
                    Visual Anchor & Decision Flow
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-ink-3">PREVIEW</span>
              </div>
              <pre className="font-mono text-[11px] sm:text-xs text-ink-2 leading-tight overflow-x-auto p-2 bg-surface-base/80 rounded border border-hairline/50 select-text whitespace-pre">
                {visualAnchor}
              </pre>
            </div>
          )}
        </div>

        {/* Modal Footer Folio */}
        <div className="p-3 sm:p-4 border-t border-hairline/80 bg-surface-1/50 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-ink-3">
          <span>Notes From A B.Tech Brain &middot; {lesson.slug}</span>
          <button
            onClick={onClose}
            className="px-3 py-1 rounded bg-surface-2 hover:bg-surface-3 text-ink-1 font-sans text-xs transition-colors"
          >
            Done Reading
          </button>
        </div>
      </div>
    </div>
  );
}
