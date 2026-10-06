"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  if (!isOpen || !mounted) return null;

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

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-start p-3 sm:p-5 pt-[72px] sm:pt-[84px] md:pt-[92px] pb-4 sm:pb-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="cheatsheet-title"
    >
      <div
        className="relative w-full max-w-3xl flex flex-col bg-white dark:bg-[#0d0b24] text-slate-900 dark:text-violet-50 rounded-2xl border border-slate-200 dark:border-violet-500/30 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] overflow-hidden font-sans my-auto max-h-[calc(100vh-86px)] sm:max-h-[calc(100vh-100px)]"
        onClick={(e) => e.stopPropagation()}
        style={{
          color: "var(--theme-ink-1)",
          // Explicitly isolate ink tokens from any parent notebook paper scope
          "--color-ink-1": "var(--theme-ink-1)",
          "--color-ink-2": "var(--theme-ink-2)",
          "--color-ink-3": "var(--theme-ink-3)",
        } as React.CSSProperties}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-4 py-3.5 sm:px-6 sm:py-4 border-b border-slate-200 dark:border-violet-500/20 bg-slate-50/90 dark:bg-[#131033]/90 backdrop-blur-sm shrink-0">
          <div className="min-w-0 pr-3">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-purple-500/15 text-purple-600 dark:text-purple-300 border border-purple-500/25">
                TOPIC CHEAT SHEET
              </span>
              <span className="text-[11px] font-mono text-slate-500 dark:text-violet-300/70 truncate">
                ~{lesson.estimatedMinutes} min topic
              </span>
            </div>
            <h2
              id="cheatsheet-title"
              className="text-base sm:text-xl font-bold font-sans tracking-tight text-slate-900 dark:text-white truncate"
            >
              {title}
            </h2>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              onClick={handleCopyMarkdown}
              className="px-2.5 py-1.5 text-xs font-mono font-medium rounded-lg border border-slate-200 dark:border-violet-500/30 bg-white dark:bg-violet-950/40 hover:bg-slate-100 dark:hover:bg-violet-900/50 text-slate-700 dark:text-violet-200 transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
              title="Copy markdown format"
            >
              {copied ? (
                <>
                  <span className="text-emerald-500 dark:text-emerald-400 font-bold">✓</span>{" "}
                  <span className="hidden xs:inline">Copied</span>
                </>
              ) : (
                <>
                  <span>📋</span> <span className="hidden xs:inline">Copy</span>
                </>
              )}
            </button>
            <button
              onClick={handlePrint}
              className="hidden sm:inline-flex px-2.5 py-1.5 text-xs font-mono font-medium rounded-lg border border-slate-200 dark:border-violet-500/30 bg-white dark:bg-violet-950/40 hover:bg-slate-100 dark:hover:bg-violet-900/50 text-slate-700 dark:text-violet-200 transition-colors items-center gap-1.5 cursor-pointer shadow-sm"
              title="Print cheat sheet"
            >
              <span>🖨️</span> Print
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-200/80 hover:bg-slate-300 dark:bg-violet-950/60 dark:hover:bg-violet-900/80 text-slate-700 dark:text-violet-200 transition-colors text-base font-bold cursor-pointer border border-transparent dark:border-violet-500/20"
              aria-label="Close modal"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 text-sm">
          {/* Core Principle / Mental Model Anchor */}
          <div className="p-4 rounded-xl bg-purple-50/80 dark:bg-purple-950/35 border-l-4 border-purple-500 border-y border-r border-purple-200 dark:border-purple-500/30 shadow-sm">
            <span className="text-[11px] font-mono uppercase tracking-widest text-purple-700 dark:text-purple-300 font-bold block mb-1.5">
              ⚡ CORE PRINCIPLE & MENTAL ANCHOR
            </span>
            <p
              className="text-sm sm:text-base font-medium text-slate-900 dark:text-violet-100 leading-relaxed font-sans"
              dangerouslySetInnerHTML={{
                __html: `&ldquo;${formatMarkdownInline(summaryRule)}&rdquo;`,
              }}
            />
          </div>

          {/* 2-Column Grid: Formulas/Rules & Exam Traps */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {/* Must-Remember Formulas & Invariants */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#131135] border border-slate-200 dark:border-violet-500/25 flex flex-col shadow-sm">
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-200 dark:border-violet-500/20">
                <span className="text-base">📐</span>
                <h3 className="font-mono text-xs uppercase tracking-wider font-bold text-slate-900 dark:text-violet-100">
                  Formulas & Invariants
                </h3>
              </div>
              <ul className="space-y-3 flex-1">
                {formulasAndRules.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-[13px] text-slate-700 dark:text-violet-200/90 leading-relaxed">
                    <span className="text-purple-600 dark:text-purple-400 font-mono font-bold mt-0.5">•</span>
                    <span
                      className="flex-1"
                      dangerouslySetInnerHTML={{
                        __html: formatMarkdownInline(rule),
                      }}
                    />
                  </li>
                ))}
              </ul>
            </div>

            {/* Pitfalls & Corner Cases */}
            <div className="p-4 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-500/30 flex flex-col shadow-sm">
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-amber-200/70 dark:border-amber-500/20">
                <span className="text-base">⚠️</span>
                <h3 className="font-mono text-xs uppercase tracking-wider font-bold text-amber-800 dark:text-amber-300">
                  Exam Traps & Misconceptions
                </h3>
              </div>
              <ul className="space-y-3 flex-1">
                {pitfalls.map((pitfall, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-[13px] text-slate-700 dark:text-amber-100/90 leading-relaxed">
                    <span className="text-amber-600 dark:text-amber-400 font-mono font-bold mt-0.5">!</span>
                    <span
                      className="flex-1"
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
            <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-500/30 shadow-sm">
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-emerald-200/70 dark:border-emerald-500/20">
                <span className="text-base">🎯</span>
                <h3 className="font-mono text-xs uppercase tracking-wider font-bold text-emerald-800 dark:text-emerald-300">
                  High-Yield GATE & University Exam Tips
                </h3>
              </div>
              <ul className="space-y-2.5">
                {highYieldTips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-[13px] text-slate-700 dark:text-emerald-100/90 leading-relaxed">
                    <span className="text-emerald-600 dark:text-emerald-400 font-mono font-bold mt-0.5">✓</span>
                    <span
                      className="flex-1"
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
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#131135] border border-slate-200 dark:border-violet-500/25 shadow-sm">
              <div className="flex items-center justify-between mb-2.5 pb-2 border-b border-slate-200 dark:border-violet-500/20">
                <div className="flex items-center gap-2">
                  <span className="text-base">📊</span>
                  <h3 className="font-mono text-xs uppercase tracking-wider font-bold text-slate-800 dark:text-violet-200">
                    Visual Anchor & Decision Flow
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-slate-500 dark:text-violet-400/80">REFERENCE</span>
              </div>
              <pre className="font-mono text-xs sm:text-[13px] text-slate-800 dark:text-violet-100 leading-snug overflow-x-auto p-3.5 bg-white dark:bg-black/50 rounded-lg border border-slate-200 dark:border-violet-500/20 select-text whitespace-pre">
                {visualAnchor}
              </pre>
            </div>
          )}
        </div>

        {/* Modal Footer Folio */}
        <div className="px-4 py-3 sm:px-6 sm:py-3.5 border-t border-slate-200 dark:border-violet-500/20 bg-slate-50/90 dark:bg-[#131033]/90 flex items-center justify-between gap-3 text-xs font-mono text-slate-500 dark:text-violet-300/70 shrink-0">
          <span className="truncate">Notes From A B.Tech Brain &middot; {lesson.slug}</span>
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white dark:bg-purple-500/25 dark:hover:bg-purple-500/40 dark:text-purple-200 font-mono font-semibold text-xs border border-purple-500/30 transition-all cursor-pointer shadow-sm shrink-0"
          >
            Done Reading
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
