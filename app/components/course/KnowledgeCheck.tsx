"use client";

import { useState } from "react";
import { QuizQuestion } from "../../../lib/courses/types";

export default function KnowledgeCheck({
  questions,
  heading,
  leadParagraph,
}: {
  questions: QuizQuestion[];
  heading?: string;
  leadParagraph?: string;
}) {
  const [userAnswers, setUserAnswers] = useState<Record<string, string | number>>({});
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});

  const handleSelectOption = (questionId: string, optionId: string) => {
    setUserAnswers((prev) => ({ ...prev, [questionId]: optionId }));
    setRevealed((prev) => ({ ...prev, [questionId]: true }));
  };

  const handleNumericalSubmit = (questionId: string, val: number) => {
    setUserAnswers((prev) => ({ ...prev, [questionId]: val }));
    setRevealed((prev) => ({ ...prev, [questionId]: true }));
  };

  return (
    <div className="my-10 border-t border-dashed border-hairline/80 pt-6">
      <span className="font-mono text-[10px] uppercase tracking-widest text-accent font-bold block mb-1">
        STUDENT PRACTICE &middot; CONCEPT DRILL
      </span>
      {heading && (
        <h3 className="font-handwriting text-2xl sm:text-3xl font-bold text-ink-1 mb-2">
          {heading}
        </h3>
      )}
      {leadParagraph && (
        <p className="text-sm text-ink-2 mb-6 leading-relaxed max-w-[68ch] font-sans">
          {leadParagraph}
        </p>
      )}

      <div className="space-y-6">
        {questions.map((q, idx) => {
          const isRevealed = !!revealed[q.id];
          const selectedOptionId = userAnswers[q.id];

          return (
            <div
              key={q.id}
              className="p-5 sm:p-6 rounded border border-dashed border-hairline/80 bg-surface-1/30 font-sans"
            >
              <div className="flex items-baseline justify-between gap-3 mb-3 border-b border-dashed border-hairline/70 pb-2">
                <span className="text-xs font-mono uppercase tracking-wider text-ink-1 font-bold">
                  Problem {idx + 1} &middot; {q.difficulty.toUpperCase()}
                </span>
                {q.gateContext && (
                  <span className="text-[11px] font-mono text-accent">
                    {q.gateContext}
                  </span>
                )}
              </div>

              <p className="text-sm sm:text-base font-semibold text-ink-1 mb-4 leading-relaxed whitespace-pre-line font-sans">
                {q.prompt}
              </p>

              {/* Single / Multiple Choice Options */}
              {q.options && q.options.length > 0 && (
                <div className="space-y-2 mb-4">
                  {q.options.map((opt) => {
                    const isSelected = selectedOptionId === opt.id;
                    const isCorrect = opt.isCorrect;

                    let btnStyle =
                      "border-hairline/70 bg-surface-1/50 hover:bg-surface-2 text-ink-2";
                    if (isRevealed) {
                      if (isCorrect) {
                        btnStyle =
                          "border-accent/80 bg-accent/10 text-ink-1 font-semibold";
                      } else if (isSelected && !isCorrect) {
                        btnStyle =
                          "border-hairline bg-surface-2/40 text-ink-3 line-through";
                      } else {
                        btnStyle = "border-hairline/50 bg-surface-1/30 opacity-40";
                      }
                    }

                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => handleSelectOption(q.id, opt.id)}
                        disabled={isRevealed}
                        className={`w-full text-left p-3 rounded border text-xs sm:text-sm font-sans transition-colors flex items-start gap-3 cursor-pointer disabled:cursor-default ${btnStyle}`}
                      >
                        <span className="font-mono text-xs mt-0.5 uppercase opacity-75 shrink-0">
                          [{opt.id}]
                        </span>
                        <span className="leading-relaxed">{opt.text}</span>
                        {isRevealed && isCorrect && (
                          <span className="ml-auto text-accent font-bold shrink-0 font-mono text-xs">
                            ✓ CORRECT
                          </span>
                        )}
                        {isRevealed && isSelected && !isCorrect && (
                          <span className="ml-auto text-ink-3 font-bold shrink-0 font-mono text-xs">
                            ✗ INCORRECT
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Numerical Question Input */}
              {q.type === "numerical" && (
                <div className="mb-4">
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      placeholder="Enter numerical answer"
                      disabled={isRevealed}
                      defaultValue={userAnswers[q.id] !== undefined ? String(userAnswers[q.id]) : ""}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          const val = parseFloat((e.target as HTMLInputElement).value);
                          if (!isNaN(val)) handleNumericalSubmit(q.id, val);
                        }
                      }}
                      className="px-3 py-1.5 rounded border border-hairline bg-surface-2 text-ink-1 text-sm font-mono w-48 focus:outline-none focus:border-accent"
                    />
                    {q.unit && (
                      <span className="text-xs font-mono text-ink-3">
                        {q.unit}
                      </span>
                    )}
                    {!isRevealed && (
                      <button
                        type="button"
                        onClick={(e) => {
                          const input = (e.currentTarget.previousElementSibling?.previousElementSibling ||
                            e.currentTarget.previousElementSibling) as HTMLInputElement;
                          const val = parseFloat(input?.value);
                          if (!isNaN(val)) handleNumericalSubmit(q.id, val);
                        }}
                        className="px-3.5 py-1.5 rounded bg-accent text-white text-xs font-mono font-semibold hover:bg-accent/90 transition-colors cursor-pointer"
                      >
                        Check Answer
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Explanation Reveal */}
              {isRevealed && (
                <div className="mt-4 p-4 rounded bg-surface-2/60 border border-hairline">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <span className="text-xs font-mono font-bold text-accent">
                      Derivation & Technical Rationale:
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-ink-2 leading-relaxed whitespace-pre-line font-sans">
                    {q.explanation}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
