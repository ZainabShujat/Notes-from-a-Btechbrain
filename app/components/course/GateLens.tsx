"use client";

import { useState } from "react";
import { GateLensSection } from "../../../lib/courses/types";

export default function GateLens({ section }: { section: GateLensSection }) {
  const [openPYQs, setOpenPYQs] = useState<Record<string, boolean>>({});

  const togglePYQ = (id: string) => {
    setOpenPYQs((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="my-10 border-t border-dashed border-hairline/80 pt-6">
      {/* Section Header */}
      <div className="mb-5">
        <span className="font-mono text-[10px] uppercase tracking-widest text-accent font-bold block mb-1">
          GATE LENS &middot; EXAM PREPARATION
        </span>
        <h3 className="font-handwriting text-2xl sm:text-3xl font-bold text-ink-1">
          {section.heading || "Examination Relevance & Historical Patterns"}
        </h3>
        <p className="text-xs text-ink-3 mt-1 max-w-[68ch] leading-relaxed font-sans">
          Syllabus focus, recurring numerical patterns, common traps, and clearly labelled exam practice. Questions remain source-pending until an official paper and answer key are attached.
        </p>
      </div>

      {/* Weightage Note on Paper */}
      <div className="my-5 pl-4 border-l-2 border-accent text-xs sm:text-sm font-sans text-ink-2">
        <span className="font-mono text-[10px] uppercase tracking-widest text-accent font-bold block mb-0.5">
          EXAM WEIGHTAGE &amp; FOCUS:
        </span>
        <p className="leading-relaxed text-ink-1">{section.weightageSummary}</p>
      </div>

      {/* Two-Column Pattern & Trap Marginalia */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
        {/* Common Patterns */}
        <div className="pl-3.5 border-l-2 border-accent/40 space-y-2">
          <span className="font-handwriting text-lg sm:text-xl font-bold text-accent block">
            recurring exam patterns:
          </span>
          <ul className="space-y-2 text-xs sm:text-sm text-ink-2 font-sans">
            {section.commonPatterns.map((pat, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-accent font-mono text-xs mt-0.5">&bull;</span>
                <span className="leading-relaxed">{pat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Common Traps */}
        <div className="pl-3.5 border-l-2 border-accent/80 space-y-2">
          <span className="font-handwriting text-lg sm:text-xl font-bold text-accent block">
            ⚠ common student traps:
          </span>
          <ul className="space-y-2 text-xs sm:text-sm text-ink-2 font-sans">
            {section.commonTraps.map((trap, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-accent font-mono text-xs mt-0.5">&bull;</span>
                <span className="leading-relaxed">{trap.replace(/^⚠\s*/, "")}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Exam questions: source status is intentionally explicit */}
      {section.pyqs && section.pyqs.length > 0 && (
        <div className="space-y-4 pt-4 border-t border-dashed border-hairline/70">
          <div className="flex items-baseline justify-between mb-2">
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-ink-1">
              Exam Practice / Source Verification Required
            </h4>
            <span className="text-[11px] font-mono text-ink-3">
              {section.pyqs.length} problem{section.pyqs.length > 1 ? "s" : ""}
            </span>
          </div>

          {section.pyqs.map((pyq) => {
            const isOpen = !!openPYQs[pyq.id];

            return (
              <div
                key={pyq.id}
                className="p-4 sm:p-5 rounded border border-dashed border-hairline/80 bg-surface-1/30 font-sans"
              >
                <div className="flex items-center justify-between gap-3 mb-2.5 pb-2 border-b border-dashed border-hairline/60">
                  <span className="text-xs font-mono font-bold text-accent">
                    GATE-style question &middot; {pyq.marks} Mark{pyq.marks > 1 ? "s" : ""}
                  </span>
                  {pyq.keyFormulaOrConcept && (
                    <span className="text-[11px] font-mono text-ink-3">
                      {pyq.keyFormulaOrConcept}
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-ink-1 font-mono whitespace-pre-line leading-relaxed mb-4">
                  {pyq.question}
                </p>

                {pyq.options && pyq.options.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4 text-xs font-mono">
                    {pyq.options.map((opt, oIdx) => (
                      <div
                        key={oIdx}
                        className="py-1.5 px-2.5 rounded border border-hairline/60 bg-surface-1/50 text-ink-2"
                      >
                        {opt}
                      </div>
                    ))}
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => togglePYQ(pyq.id)}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-accent hover:underline cursor-pointer"
                >
                  <span>{isOpen ? "Hide Detailed Derivation ▲" : "Reveal Student Derivation ▼"}</span>
                </button>

                {isOpen && (
                  <div className="mt-4 pt-4 border-t border-dashed border-hairline/80 space-y-3 font-mono">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xs text-ink-3 uppercase">Correct Option:</span>
                      <span className="highlighter-yellow text-xs sm:text-sm font-bold text-ink-1 px-2 py-0.5">
                        {pyq.correctOptionOrValue}
                      </span>
                    </div>

                    <div className="pl-3.5 border-l-2 border-accent/40 space-y-1">
                      <span className="font-handwriting text-base font-bold text-accent block">
                        ✎ Step-by-Step Derivation:
                      </span>
                      <p className="text-xs text-ink-2 whitespace-pre-line leading-relaxed">
                        {pyq.detailedSolution}
                      </p>
                    </div>

                    {pyq.keyFormulaOrConcept && (
                      <div className="text-xs text-ink-3 font-mono pt-2 border-t border-dashed border-hairline/60">
                        <strong className="text-ink-1">Core Rule:</strong> {pyq.keyFormulaOrConcept}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
