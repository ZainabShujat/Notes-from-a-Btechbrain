"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { SubjectMeta, GateBranch } from "../../../lib/notes";
import Card from "../../components/ui/Card";
import { cx } from "../../components/ui/cx";

export type GateWeightageItem = {
  marks: string;
  highYield: string;
  tier: "Tier 1 (High Yield)" | "Tier 2" | "Tier 3";
  syllabusSummary?: string;
};

interface GateSubjectFilterGridProps {
  subjects: SubjectMeta[];
  weightageData: Record<string, GateWeightageItem>;
}

export default function GateSubjectFilterGrid({
  subjects,
  weightageData,
}: GateSubjectFilterGridProps) {
  const [selectedBranch, setSelectedBranch] = useState<GateBranch | "all">("all");

  const filteredSubjects = useMemo(() => {
    if (selectedBranch === "all") return subjects;
    return subjects.filter((s) => s.gateBranches?.includes(selectedBranch));
  }, [subjects, selectedBranch]);

  const csCount = useMemo(
    () => subjects.filter((s) => s.gateBranches?.includes("cs")).length,
    [subjects]
  );

  const daCount = useMemo(
    () => subjects.filter((s) => s.gateBranches?.includes("da")).length,
    [subjects]
  );

  return (
    <div className="space-y-6">
      {/* ── BRANCH FILTER CONTROLS ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-hairline bg-surface-1/70 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold tracking-wider text-ink-3 uppercase">
            Curriculum Filter:
          </span>
          <div className="inline-flex p-1 rounded-lg bg-surface-2/80 border border-hairline/80">
            <button
              onClick={() => setSelectedBranch("all")}
              className={cx(
                "px-3 py-1.5 rounded-md text-xs font-mono font-semibold transition-all cursor-pointer",
                selectedBranch === "all"
                  ? "bg-raised text-accent shadow-sm"
                  : "text-ink-2 hover:text-ink-1"
              )}
            >
              All Subjects ({subjects.length})
            </button>
            <button
              onClick={() => setSelectedBranch("cs")}
              className={cx(
                "px-3 py-1.5 rounded-md text-xs font-mono font-semibold transition-all cursor-pointer flex items-center gap-1.5",
                selectedBranch === "cs"
                  ? "bg-raised text-blue-600 dark:text-blue-400 shadow-sm"
                  : "text-ink-2 hover:text-ink-1"
              )}
            >
              <span>GATE CS/IT</span>
              <span className="px-1.5 py-0.2 rounded text-[10px] bg-blue-500/10 text-blue-600 dark:text-blue-300">
                {csCount}
              </span>
            </button>
            <button
              onClick={() => setSelectedBranch("da")}
              className={cx(
                "px-3 py-1.5 rounded-md text-xs font-mono font-semibold transition-all cursor-pointer flex items-center gap-1.5",
                selectedBranch === "da"
                  ? "bg-raised text-purple-600 dark:text-purple-400 shadow-sm"
                  : "text-ink-2 hover:text-ink-1"
              )}
            >
              <span>GATE AI & DA</span>
              <span className="px-1.5 py-0.2 rounded text-[10px] bg-purple-500/10 text-purple-600 dark:text-purple-300">
                {daCount}
              </span>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-ink-3">
          {selectedBranch === "cs" && (
            <span className="text-blue-600 dark:text-blue-400 font-medium">
              Showing 13 Core GATE CS/IT subjects
            </span>
          )}
          {selectedBranch === "da" && (
            <span className="text-purple-600 dark:text-purple-400 font-medium">
              Showing 8 Core GATE Data Science & AI subjects
            </span>
          )}
          {selectedBranch === "all" && (
            <span>Showing combined syllabus overlap ({subjects.length} subjects)</span>
          )}
        </div>
      </div>

      {/* ── SUBJECT GRID ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredSubjects.map((subject) => {
          const gateMeta = weightageData[subject.slug] ?? {
            marks: "5–8 Marks",
            highYield: "Core concepts & PYQs",
            tier: "Tier 2",
          };

          const isCS = subject.gateBranches?.includes("cs");
          const isDA = subject.gateBranches?.includes("da");

          return (
            <Card
              key={subject.id}
              href={`/notes/${subject.slug}?view=gate`}
              padding="none"
              className="h-full hover:border-accent/40 flex flex-col justify-between"
            >
              <div className="p-5 md:p-6 flex flex-col h-full justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-accent/15 text-accent-soft border border-accent/25">
                      {gateMeta.marks}
                    </span>
                    <div className="flex items-center gap-1.5">
                      {isCS && (
                        <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-blue-500/15 text-blue-600 dark:text-blue-300 border border-blue-500/20">
                          CS
                        </span>
                      )}
                      {isDA && (
                        <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-purple-500/15 text-purple-600 dark:text-purple-300 border border-purple-500/20">
                          DA
                        </span>
                      )}
                      <span className="text-[10px] font-mono text-ink-3 ml-1">
                        {gateMeta.tier}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 mb-2">
                    <span
                      aria-hidden="true"
                      className={cx(
                        "mt-1 h-2.5 w-2.5 shrink-0 rounded-full",
                        subject.color
                      )}
                    />
                    <h3 className="font-bold text-ink-1 text-base leading-snug">
                      {subject.title}
                    </h3>
                  </div>

                  <p className="text-xs text-ink-2 leading-relaxed mb-4">
                    {subject.tagline}
                  </p>
                </div>

                <div className="pt-3 border-t border-hairline/60">
                  <span className="text-[10px] font-mono text-ink-3 uppercase block mb-1">
                    High-Yield Subtopics:
                  </span>
                  <p className="text-xs font-mono text-ink-1 line-clamp-2">
                    {gateMeta.highYield}
                  </p>
                  <div className="mt-3 flex items-center justify-between text-xs font-mono text-accent">
                    <span>Open GATE Lens →</span>
                    <span>🎯 PYQs</span>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
