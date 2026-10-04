"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { SubjectNotebookData } from "../../../lib/notebooks/types";
import { getSubjectGlimpse } from "../../../lib/notebooks/glimpse";
import NotebookSpiralBinding from "./NotebookSpiralBinding";
import DontFeelDumbProvider from "../course/DontFeelDumbProvider";
import { highlightGlossaryTerms } from "../../../lib/courses/glossary";

interface NotebookModalViewerProps {
  notebook: SubjectNotebookData;
  onClose: () => void;
  initialCardIndex?: number;
}

export default function NotebookModalViewer({
  notebook,
  onClose,
  initialCardIndex = 0,
}: NotebookModalViewerProps) {
  const [currentCard, setCurrentCard] = useState(initialCardIndex);
  const [direction, setDirection] = useState<"next" | "prev" | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent background scrolling while preview modal is open
  useEffect(() => {
    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    const originalOverscroll = document.body.style.overscrollBehavior;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    document.body.style.overscrollBehavior = "none";

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.body.style.overscrollBehavior = originalOverscroll;
    };
  }, []);

  // Keyboard navigation: Arrow keys flip pages, Escape closes
  const handleNext = useCallback(() => {
    if (isAnimating) return;
    if (currentCard < 3) {
      setDirection("next");
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentCard((prev) => Math.min(prev + 1, 3));
        setIsAnimating(false);
        setDirection(null);
      }, 240);
    }
  }, [currentCard, isAnimating]);

  const handlePrev = useCallback(() => {
    if (isAnimating) return;
    if (currentCard > 0) {
      setDirection("prev");
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentCard((prev) => Math.max(prev - 1, 0));
        setIsAnimating(false);
        setDirection(null);
      }, 240);
    }
  }, [currentCard, isAnimating]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      } else if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev, onClose]);

  // Touch swipe support for mobile
  const touchStartXRef = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartXRef.current;
    touchStartXRef.current = null;
    if (deltaX < -40) {
      handleNext();
    } else if (deltaX > 40) {
      handlePrev();
    }
  };

  // Pull authentic data glimpse
  const glimpse = getSubjectGlimpse(notebook);

  // Helper for selective highlighter styles
  const getHighlightStyle = (color: "purple" | "yellow" | "pink" | "green") => {
    switch (color) {
      case "purple":
        return "bg-[#ede9fe] text-[#4c1d95] border-l-2 border-[#7c3aed]";
      case "yellow":
        return "bg-[#fef9c3] text-[#713f12] border-l-2 border-[#eab308]";
      case "pink":
        return "bg-[#fce7f3] text-[#831843] border-l-2 border-[#ec4899]";
      case "green":
        return "bg-[#dcfce7] text-[#14532d] border-l-2 border-[#16a34a]";
      default:
        return "bg-[#fef9c3] text-[#713f12] border-l-2 border-[#eab308]";
    }
  };

  const cardLabels = [
    "Core Notes",
    glimpse.anchor?.type === "diagram" ? "Diagram" : "Formula",
    glimpse.labElement ? "Lab Glimpse" : "Exam Takeaway",
    "Open Notebook",
  ];

  if (!mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in-0 duration-200"
      role="dialog"
      aria-modal="true"
      aria-label={`${notebook.title} Notebook Glimpse`}
    >
      {/* ── DESK BACKDROP (DIMMED ROOM) ── */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* ── THE PHYSICAL NOTEBOOK OBJECT (SPIRAL + PAGES MOVE AS ONE) ── */}
      <DontFeelDumbProvider>
        <div
          ref={containerRef}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="relative z-10 w-full max-w-[660px] h-[92vh] max-h-[560px] sm:h-[540px] flex flex-col rounded-r-2xl rounded-l-md border border-[#d6cfbe] bg-[#faf8f5] shadow-[0_24px_64px_-12px_rgba(0,0,0,0.65),0_0_0_1px_rgba(0,0,0,0.08)] overflow-hidden select-none animate-in zoom-in-95 duration-200"
          style={{
            boxShadow:
              "0 20px 50px -10px rgba(0,0,0,0.7), 0 0 0 1px rgba(0,0,0,0.1), inset -2px 0 6px rgba(0,0,0,0.03)",
          }}
        >
        {/* Subtle physical notebook top header bar */}
        <div className="shrink-0 flex items-center justify-between px-3 sm:px-5 py-2.5 border-b border-[#e5ded0] bg-[#f5f0e6]/70 z-20">
          <div className="flex items-center gap-2 min-w-0">
            <span
              className="font-mono text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 shadow-xs text-white shape-octagon-sm"
              style={{ backgroundColor: glimpse.accentHex }}
            >
              {glimpse.subjectCode}
            </span>
            <span className="text-[#a8a29e] text-xs">/</span>
            <h2 className="text-xs sm:text-sm font-mono font-bold text-[#1c1917] truncate">
              {glimpse.subjectTitle}
            </h2>
            <span className="hidden sm:inline-block text-[11px] font-mono text-[#78716c] truncate">
              · {glimpse.level}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {glimpse.isBuilt && (
              <Link
                href={`/notes/${glimpse.slug}`}
                className="hidden sm:inline-flex items-center gap-1 text-xs font-mono font-bold text-[#7c3aed] hover:underline px-2.5 py-1 hover:bg-black/5 shape-octagon-sm"
              >
                <span>Subject Hub</span>
                <span>&rarr;</span>
              </Link>
            )}

            <button
              type="button"
              onClick={onClose}
              className="px-2.5 py-1 text-xs font-mono font-bold text-[#57534e] hover:text-[#1c1917] hover:bg-black/8 transition-colors border border-[#d6cfbe] cursor-pointer shape-octagon-sm"
              aria-label="Close Notebook Preview"
            >
              ✕ Close
            </button>
          </div>
        </div>

        {/* ── NOTEBOOK BODY WITH REAL SPIRAL BINDING & PHYSICAL PAGES ── */}
        <div className="flex-1 min-h-0 w-full relative flex overflow-hidden bg-[#faf8f5]">
          {/* Real physical spiral wire rings attached to the notebook edge */}
          <NotebookSpiralBinding />

          {/* Paper Texture Lines / Grid Canvas */}
          <div
            className="flex-1 min-h-0 h-full overflow-hidden flex flex-col pl-9 sm:pl-11 pr-3 sm:pr-5 py-3 relative bg-[#faf8f5]"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(124, 58, 237, 0.12) 1px, transparent 1px), radial-gradient(rgba(30, 27, 75, 0.05) 1px, transparent 0)",
              backgroundSize: "100% 100%, 16px 16px",
              backgroundPosition: "0 0, 0 0",
            }}
          >
            {/* Red Margin Line on the left */}
            <div
              className="absolute top-0 bottom-0 left-9 sm:left-11 w-[1px] bg-rose-400/35 pointer-events-none"
              aria-hidden="true"
            />

            {/* ── CARD CONTENT AREA (FLIPPABLE STUDENT PAGES) ── */}
            <div
              className={`flex-1 min-h-0 flex flex-col justify-between transition-all duration-200 ${
                isAnimating
                  ? direction === "next"
                    ? "opacity-40 translate-x-2"
                    : "opacity-40 -translate-x-2"
                  : "opacity-100 translate-x-0"
              }`}
            >
              {/* ────────────────────────────────────────────────────────────
                  CARD 1: SUBJECT IDENTITY & 2–3 REAL SNIPPETS
                 ──────────────────────────────────────────────────────────── */}
              {currentCard === 0 && (
                <div className="flex-1 min-h-0 flex flex-col justify-between overflow-hidden">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="font-handwriting text-base sm:text-lg text-[#7c3aed] font-bold">
                        ✎ field notes &amp; core mental models
                      </span>
                      <span className="text-[10px] font-mono text-[#78716c] uppercase tracking-wider bg-black/5 px-2 py-0.5 rounded">
                        Glimpse 1 of 4
                      </span>
                    </div>

                    <p className="text-xs sm:text-[13px] text-[#44403c] italic mb-3 font-serif leading-snug">
                      &ldquo;{glimpse.tagline}&rdquo;
                    </p>
                  </div>

                  {glimpse.isBuilt ? (
                    <div className="flex-1 min-h-0 flex flex-col justify-around gap-2 my-1">
                      {glimpse.snippets.slice(0, 3).map((snippet, idx) => (
                        <div
                          key={idx}
                          className={`p-2 sm:p-2.5 rounded-md ${getHighlightStyle(
                            snippet.highlightColor
                          )} shadow-2xs`}
                        >
                          <div className="flex items-center justify-between gap-2 mb-0.5">
                            <span className="font-mono text-[11px] sm:text-xs font-bold tracking-tight">
                              {snippet.title}
                            </span>
                            {snippet.sourceContext && (
                              <span className="text-[9px] font-mono opacity-70 uppercase">
                                {snippet.sourceContext}
                              </span>
                            )}
                          </div>
                          <p
                            className="text-[11px] sm:text-xs font-sans leading-relaxed line-clamp-2"
                            dangerouslySetInnerHTML={{
                              __html: highlightGlossaryTerms(snippet.body),
                            }}
                          />
                          {snippet.handwrittenAnnotation && (
                            <p className="font-handwriting text-xs sm:text-sm mt-0.5 font-bold tracking-wide opacity-95">
                              {snippet.handwrittenAnnotation}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    /* DRAFT STATE: AUTHENTIC "STILL BEING BUILT" */
                    <div className="flex-1 min-h-0 flex flex-col justify-center items-center text-center p-4 rounded-xl border border-dashed border-[#d6cfbe] bg-amber-50/50">
                      <span className="font-mono text-xs uppercase tracking-widest text-amber-800 font-bold mb-1">
                        Manuscript in Preparation
                      </span>
                      <p className="font-handwriting text-lg sm:text-xl text-[#78350f] font-bold mb-2">
                        ✎ Standard references currently being audited &amp; verified.
                      </p>
                      <p className="text-xs text-[#57534e] max-w-md leading-relaxed mb-3">
                        We don&apos;t publish simulated or incomplete summaries. Complete verified formulas, numerical derivations, and interactive labs are queued for release.
                      </p>
                      {glimpse.draftSyllabus && glimpse.draftSyllabus.length > 0 && (
                        <div className="w-full text-left bg-white/70 p-2.5 rounded border border-[#e5ded0]">
                          <span className="font-mono text-[10px] text-[#78716c] uppercase block mb-1">
                            Audited Syllabus Modules:
                          </span>
                          <ul className="text-[11px] font-mono text-[#44403c] space-y-1">
                            {glimpse.draftSyllabus.map((item, i) => (
                              <li key={i} className="truncate">
                                • {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="shrink-0 pt-2 flex items-center justify-between border-t border-[#e5ded0] text-[11px] font-mono text-[#78716c]">
                    <span>
                      {glimpse.stats.lessonsCount} lessons · {glimpse.stats.labsCount} labs
                    </span>
                    <button
                      type="button"
                      onClick={handleNext}
                      className="text-[#7c3aed] font-bold hover:underline inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>Flip to Diagram / Anchor</span>
                      <span>&rarr;</span>
                    </button>
                  </div>
                </div>
              )}

              {/* ────────────────────────────────────────────────────────────
                  CARD 2: ONE DIAGRAM / FORMULA / REVISION ANCHOR
                 ──────────────────────────────────────────────────────────── */}
              {currentCard === 1 && (
                <div className="flex-1 min-h-0 flex flex-col justify-between overflow-hidden">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="font-handwriting text-base sm:text-lg text-[#7c3aed] font-bold">
                      ✎ {glimpse.anchor.title}
                    </span>
                    <span className="text-[10px] font-mono text-[#78716c] uppercase tracking-wider bg-black/5 px-2 py-0.5 rounded">
                      Glimpse 2 of 4 · {glimpse.anchor.badge}
                    </span>
                  </div>

                  {/* Diagram or Formula Canvas */}
                  <div className="flex-1 min-h-0 flex flex-col justify-center rounded-xl border border-dashed border-[#d6cfbe] bg-white/80 p-3 shadow-2xs my-1">
                    {glimpse.anchor.type === "diagram" && glimpse.anchor.svgKey === "os-process-lifecycle" ? (
                      <div className="w-full flex flex-col items-center justify-center">
                        <svg
                          viewBox="0 0 460 160"
                          fill="none"
                          className="w-full max-h-[140px] text-ink-1 font-mono text-[9px] select-none"
                        >
                          <rect x="15" y="10" width="430" height="85" rx="6" stroke="#a855f7" strokeWidth="1" strokeDasharray="3 3" fill="#f3e8ff" fillOpacity="0.2" />
                          <text x="25" y="24" fill="#7c3aed" fontWeight="bold" fontSize="8">MAIN MEMORY (RAM)</text>
                          
                          <rect x="30" y="40" width="55" height="24" rx="4" fill="#faf8f5" stroke="#78716c" strokeWidth="1" />
                          <text x="57" y="55" fill="#1c1917" fontWeight="bold" textAnchor="middle">NEW</text>
                          
                          <path d="M85 52 L115 52" stroke="#78716c" strokeWidth="1.2" />
                          
                          <rect x="120" y="40" width="65" height="24" rx="4" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.2" />
                          <text x="152" y="55" fill="#4c1d95" fontWeight="bold" textAnchor="middle">READY</text>
                          
                          <path d="M185 47 L245 47" stroke="#16a34a" strokeWidth="1.2" />
                          <text x="215" y="43" fill="#16a34a" fontSize="7" textAnchor="middle">Dispatch →</text>
                          
                          <path d="M245 57 L185 57" stroke="#eab308" strokeWidth="1.2" />
                          <text x="215" y="65" fill="#ca8a04" fontSize="7" textAnchor="middle">← Preempt</text>
                          
                          <rect x="250" y="40" width="70" height="24" rx="4" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.2" />
                          <text x="285" y="55" fill="#14532d" fontWeight="bold" textAnchor="middle">RUNNING</text>
                          
                          <path d="M320 52 L365 52" stroke="#78716c" strokeWidth="1.2" />
                          <rect x="370" y="40" width="60" height="24" rx="4" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.2" />
                          <text x="400" y="55" fill="#991b1b" fontWeight="bold" textAnchor="middle">EXIT</text>
                          
                          {/* Disk swap */}
                          <rect x="15" y="105" width="430" height="48" rx="6" fill="#fef3c7" fillOpacity="0.3" stroke="#eab308" strokeWidth="1" />
                          <text x="25" y="120" fill="#a16207" fontWeight="bold" fontSize="8">SWAP DISK (SECONDARY STORAGE)</text>
                          <rect x="110" y="124" width="95" height="22" rx="4" fill="#faf8f5" stroke="#7c3aed" strokeWidth="1" />
                          <text x="157" y="139" fill="#4c1d95" fontWeight="bold" fontSize="8" textAnchor="middle">READY-SUSPEND</text>
                          
                          <rect x="245" y="124" width="105" height="22" rx="4" fill="#faf8f5" stroke="#eab308" strokeWidth="1" />
                          <text x="297" y="139" fill="#a16207" fontWeight="bold" fontSize="8" textAnchor="middle">BLOCKED-SUSPEND</text>
                        </svg>
                        <p className="font-handwriting text-xs text-[#7c3aed] font-bold mt-1">
                          ✎ Ready-Suspend swaps to disk during thrashing to free RAM frames!
                        </p>
                      </div>
                    ) : glimpse.anchor.type === "diagram" && glimpse.anchor.svgKey === "cn-osi-layers" ? (
                      <div className="w-full flex flex-col justify-center space-y-1 font-mono text-[10px]">
                        <div className="flex items-center justify-between p-1.5 rounded bg-violet-50 border border-violet-200">
                          <span className="font-bold text-violet-900">L7–L5 Application</span>
                          <span className="text-violet-700">HTTP / DNS / TLS</span>
                          <span className="font-handwriting text-xs text-violet-900 font-bold">Data</span>
                        </div>
                        <div className="flex items-center justify-between p-1.5 rounded bg-indigo-50 border border-indigo-200">
                          <span className="font-bold text-indigo-900">L4 Transport</span>
                          <span className="text-indigo-700">TCP / UDP (Ports)</span>
                          <span className="font-handwriting text-xs text-indigo-900 font-bold">Segment</span>
                        </div>
                        <div className="flex items-center justify-between p-1.5 rounded bg-emerald-50 border border-emerald-200">
                          <span className="font-bold text-emerald-900">L3 Network</span>
                          <span className="text-emerald-700">IPv4 / IPv6 (Routers)</span>
                          <span className="font-handwriting text-xs text-emerald-900 font-bold">Packet</span>
                        </div>
                        <div className="flex items-center justify-between p-1.5 rounded bg-amber-50 border border-amber-200">
                          <span className="font-bold text-amber-900">L2 Data Link</span>
                          <span className="text-amber-700">Ethernet / MAC / CRC</span>
                          <span className="font-handwriting text-xs text-amber-900 font-bold">Frame</span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center text-center p-2">
                        {glimpse.anchor.mainFormula && (
                          <div className="px-3 py-2 rounded-lg bg-yellow-100/70 border border-yellow-300 text-yellow-950 font-mono text-xs sm:text-sm font-bold tracking-tight mb-2 shadow-2xs">
                            {glimpse.anchor.mainFormula}
                          </div>
                        )}
                        <p
                          className="text-xs sm:text-[13px] text-[#44403c] font-sans max-w-md leading-relaxed"
                          dangerouslySetInnerHTML={{
                            __html: highlightGlossaryTerms(glimpse.anchor.takeaway || ""),
                          }}
                        />
                      </div>
                    )}

                    {/* Common Exam Trap Marginalia */}
                    {glimpse.anchor.trapWarning && (
                      <div className="mt-2 p-2 rounded bg-rose-50 border-l-2 border-rose-500 text-rose-900 text-[11px] font-sans flex items-start gap-1.5">
                        <span className="font-bold">⚠️ Trap:</span>
                        <span className="leading-snug">{glimpse.anchor.trapWarning}</span>
                      </div>
                    )}
                  </div>

                  <div className="shrink-0 pt-2 flex items-center justify-between border-t border-[#e5ded0] text-[11px] font-mono text-[#78716c]">
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="hover:underline cursor-pointer"
                    >
                      &larr; Previous Page
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      className="text-[#7c3aed] font-bold hover:underline inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>Flip to Lab / Interactive</span>
                      <span>&rarr;</span>
                    </button>
                  </div>
                </div>
              )}

              {/* ────────────────────────────────────────────────────────────
                  CARD 3: INTERACTIVE / LAB ELEMENT GLIMPSE
                 ──────────────────────────────────────────────────────────── */}
              {currentCard === 2 && (
                <div className="flex-1 min-h-0 flex flex-col justify-between overflow-hidden">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="font-handwriting text-base sm:text-lg text-[#7c3aed] font-bold">
                      ✎ {glimpse.labElement ? glimpse.labElement.title : "Exam Revision Anchor"}
                    </span>
                    <span className="text-[10px] font-mono text-[#78716c] uppercase tracking-wider bg-black/5 px-2 py-0.5 rounded">
                      Glimpse 3 of 4
                    </span>
                  </div>

                  {glimpse.labElement ? (
                    <div className="flex-1 min-h-0 flex flex-col justify-around rounded-xl border border-dashed border-[#d6cfbe] bg-[#faf8f5] p-3 shadow-2xs my-1">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-violet-600 animate-ping" />
                          <span className="font-mono text-xs font-bold text-[#1c1917]">
                            {glimpse.labElement.badge}
                          </span>
                        </div>
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono bg-violet-500/15 text-[#7c3aed] px-2 py-0.5 rounded font-bold border border-violet-500/20">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3 h-3">
                            <polygon points="5 3 19 12 5 21 5 3" fill="currentColor" fillOpacity="0.3" />
                          </svg>
                          Live Simulator
                        </span>
                      </div>

                      <p className="text-xs text-[#57534e] leading-relaxed font-sans">
                        {glimpse.labElement.lead}
                      </p>

                      {/* Mocked Interactive Controls / State preview */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 my-1">
                        {glimpse.labElement.interactivePreview.map((item, idx) => (
                          <div
                            key={idx}
                            className="p-2 rounded bg-white border border-[#e5ded0] flex flex-col justify-between shadow-2xs"
                          >
                            <span className="text-[9px] font-mono uppercase text-[#78716c]">
                              {item.label}
                            </span>
                            <span className="font-mono text-[11px] font-bold text-[#1c1917] truncate mt-0.5">
                              {item.value}
                            </span>
                            {item.tag && (
                              <span className="text-[9px] font-handwriting text-[#7c3aed] font-bold mt-0.5">
                                ✎ {item.tag}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>

                      <div className="p-2 rounded bg-violet-50/80 border border-violet-200 text-violet-900 text-[11px] font-mono flex items-center justify-between">
                        <span>{glimpse.labElement.actionHint}</span>
                        <span className="text-[#7c3aed] font-bold">Try inside hub &rarr;</span>
                      </div>
                    </div>
                  ) : (
                    /* Fallback: Revision Card if no interactive lab configured */
                    <div className="flex-1 min-h-0 flex flex-col justify-center rounded-xl border border-dashed border-[#d6cfbe] bg-white/70 p-4 shadow-2xs my-1">
                      <span className="font-mono text-xs uppercase text-emerald-800 font-bold mb-1">
                        Verified Study Manuscript
                      </span>
                      <p className="text-xs text-[#44403c] leading-relaxed mb-3">
                        Every lesson in this subject includes structured explanations, verified derivations, and GATE-aligned PYQs with trap warnings.
                      </p>
                      <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-950 font-mono text-xs">
                        ✓ 100% textbook verified derivations
                        <br />
                        ✓ Zero hallucinated proofs
                        <br />
                        ✓ Interactive step-by-step visualizations
                      </div>
                    </div>
                  )}

                  <div className="shrink-0 pt-2 flex items-center justify-between border-t border-[#e5ded0] text-[11px] font-mono text-[#78716c]">
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="hover:underline cursor-pointer"
                    >
                      &larr; Previous Page
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      className="text-[#7c3aed] font-bold hover:underline inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>Flip to Final Syllabus &amp; Action</span>
                      <span>&rarr;</span>
                    </button>
                  </div>
                </div>
              )}

              {/* ────────────────────────────────────────────────────────────
                  CARD 4: TOPIC COUNTS & "OPEN NOTEBOOK →" (THE HERO ACTION)
                 ──────────────────────────────────────────────────────────── */}
              {currentCard === 3 && (
                <div className="flex-1 min-h-0 flex flex-col justify-between overflow-hidden">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="font-handwriting text-base sm:text-lg text-[#7c3aed] font-bold">
                      ✎ complete subject curriculum
                    </span>
                    <span className="text-[10px] font-mono text-[#78716c] uppercase tracking-wider bg-black/5 px-2 py-0.5 rounded">
                      Glimpse 4 of 4 · Ready to Dive In
                    </span>
                  </div>

                  {/* Quantitative Subject Snapshot */}
                  <div className="flex-1 min-h-0 flex flex-col justify-around rounded-xl border border-dashed border-[#d6cfbe] bg-white/80 p-4 shadow-2xs my-1">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center">
                      <div className="p-2.5 rounded-lg bg-[#faf8f5] border border-[#e5ded0] flex flex-col items-center">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-[#78716c] mb-1 opacity-70">
                          <rect x="3" y="3" width="7" height="7" rx="1.5" />
                          <rect x="14" y="3" width="7" height="7" rx="1.5" />
                          <rect x="14" y="14" width="7" height="7" rx="1.5" />
                          <rect x="3" y="14" width="7" height="7" rx="1.5" />
                        </svg>
                        <span className="font-mono text-xl sm:text-2xl font-bold text-[#1c1917] block leading-none">
                          {glimpse.stats.modulesCount}
                        </span>
                        <span className="text-[10px] font-mono uppercase text-[#78716c] mt-1">
                          Modules
                        </span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-[#faf8f5] border border-[#e5ded0] flex flex-col items-center">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-[#7c3aed] mb-1 opacity-70">
                          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                        </svg>
                        <span className="font-mono text-xl sm:text-2xl font-bold text-[#7c3aed] block leading-none">
                          {glimpse.stats.lessonsCount}
                        </span>
                        <span className="text-[10px] font-mono uppercase text-[#78716c] mt-1">
                          Full Lessons
                        </span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-[#faf8f5] border border-[#e5ded0] flex flex-col items-center">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-[#10b981] mb-1 opacity-70">
                          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" fill="currentColor" fillOpacity="0.2" />
                        </svg>
                        <span className="font-mono text-xl sm:text-2xl font-bold text-[#10b981] block leading-none">
                          {glimpse.stats.labsCount}
                        </span>
                        <span className="text-[10px] font-mono uppercase text-[#78716c] mt-1">
                          Interactive Labs
                        </span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-[#faf8f5] border border-[#e5ded0] flex flex-col items-center">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-[#f59e0b] mb-1 opacity-70">
                          <circle cx="12" cy="12" r="10" />
                          <path d="m9 12 2 2 4-4" />
                        </svg>
                        <span className="font-mono text-xl sm:text-2xl font-bold text-[#f59e0b] block leading-none">
                          {glimpse.stats.pyqsCount > 0 ? glimpse.stats.pyqsCount : "Compulsory"}
                        </span>
                        <span className="text-[10px] font-mono uppercase text-[#78716c] mt-1">
                          GATE PYQs
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-[#57534e] text-center font-sans max-w-md mx-auto leading-relaxed my-1">
                      Ready to master {glimpse.subjectTitle}? Step into the full notebook for first-principles derivations, interactive laboratory environments, and verified exam solutions.
                    </p>

                    {/* HERO PRIMARY ACTION */}
                    <div className="flex flex-col items-center justify-center gap-2 pt-1">
                      {glimpse.isBuilt ? (
                        <Link
                          href={`/notes/${glimpse.slug}`}
                          className="w-full sm:w-auto px-7 py-3 font-mono text-sm font-bold text-white shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.99] transition-all inline-flex items-center justify-center gap-2 cursor-pointer shape-octagon-sm"
                          style={{
                            backgroundColor: glimpse.accentHex || "#7c3aed",
                          }}
                        >
                          <span>Open Notebook</span>
                          <span>&rarr;</span>
                        </Link>
                      ) : (
                        <div className="p-3 bg-amber-50 border border-amber-300 text-amber-900 text-xs font-mono text-center shape-octagon-sm">
                          🔒 Curriculum in preparation. Follow syllabus roadmap updates.
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="shrink-0 pt-2 flex items-center justify-between border-t border-[#e5ded0] text-[11px] font-mono text-[#78716c]">
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="hover:underline cursor-pointer"
                    >
                      &larr; Previous Page
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrentCard(0)}
                      className="px-3 py-1 bg-[#7c3aed]/10 border border-[#7c3aed]/30 text-[#7c3aed] font-mono text-xs font-bold hover:bg-[#7c3aed]/20 cursor-pointer shape-octagon-sm"
                    >
                      Restart Glimpse ↺
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── NOTEBOOK BOTTOM FOOTER WITH PHYSICAL CARD DOTS & CONTROLS ── */}
        <div className="shrink-0 flex items-center justify-between px-3 sm:px-6 py-2.5 border-t border-[#e5ded0] bg-[#f5f0e6]/70 z-20">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentCard === 0 || isAnimating}
            className="inline-flex items-center gap-1 px-3 py-1 border border-[#d6cfbe] bg-white/80 hover:bg-white text-xs font-mono font-semibold text-[#1c1917] disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer shadow-2xs shape-octagon-sm"
          >
            <span>&larr;</span>
            <span className="hidden sm:inline">Flip Back</span>
          </button>

          {/* Quick Page Jump Tabs */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {cardLabels.map((lbl, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  if (!isAnimating && idx !== currentCard) {
                    setDirection(idx > currentCard ? "next" : "prev");
                    setIsAnimating(true);
                    setTimeout(() => {
                      setCurrentCard(idx);
                      setIsAnimating(false);
                      setDirection(null);
                    }, 200);
                  }
                }}
                className={`transition-all cursor-pointer font-mono text-[10px] px-2.5 py-0.5 shape-octagon-sm ${
                  currentCard === idx
                    ? "bg-[#7c3aed] text-white font-bold shadow-2xs"
                    : "bg-[#e5ded0] text-[#57534e] hover:bg-[#d6cfbe]"
                }`}
                aria-label={`Jump to ${lbl}`}
              >
                <span className="sm:hidden">{idx + 1}</span>
                <span className="hidden sm:inline">{lbl}</span>
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={handleNext}
            disabled={currentCard === 3 || isAnimating}
            className="inline-flex items-center gap-1 px-3 py-1 border border-[#d6cfbe] bg-white/80 hover:bg-white text-xs font-mono font-semibold text-[#1c1917] disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer shadow-2xs shape-octagon-sm"
          >
            <span className="hidden sm:inline">Flip Forward</span>
            <span>&rarr;</span>
          </button>
        </div>
      </div>
      </DontFeelDumbProvider>
    </div>,
    document.body
  );
}
