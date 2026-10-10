"use client";

import { useState, useMemo } from "react";
import { SubjectNotebookData } from "../../../lib/notebooks/types";
import SubjectNotebook from "./SubjectNotebook";
import { cx } from "../ui/cx";

export default function NotebookShelf({
  notebooks,
}: {
  notebooks: SubjectNotebookData[];
}) {
  const [filterBranch, setFilterBranch] = useState<"all" | "cs" | "da">("all");

  const filteredNotebooks = useMemo(() => {
    if (filterBranch === "all") return notebooks;
    return notebooks.filter((nb) => nb.gateBranches?.includes(filterBranch));
  }, [notebooks, filterBranch]);

  const csCount = useMemo(
    () => notebooks.filter((nb) => nb.gateBranches?.includes("cs")).length,
    [notebooks]
  );

  const daCount = useMemo(
    () => notebooks.filter((nb) => nb.gateBranches?.includes("da")).length,
    [notebooks]
  );

  return (
    <div className="space-y-8">
      {/* ── SHELF HEADER & BRANCH TABS ── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-hairline pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-[4px] bg-[#7c3aed]/15 text-[#7c3aed] text-xs">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="w-3.5 h-3.5">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
              </svg>
            </span>
            <span className="text-[11px] font-mono font-bold tracking-widest text-[#7c3aed] dark:text-[#a78bfa] uppercase">
              STUDY SHELF &middot; {filteredNotebooks.length} OF {notebooks.length} NOTEBOOKS
            </span>
          </div>
          <p className="text-xs font-mono text-ink-3">
            Pick up any notebook to flip through handwritten notes, diagrams, and formulas.
          </p>
        </div>

        {/* Branch Filter Switcher */}
        <div className="flex items-center gap-2">
          <div className="inline-flex p-1 rounded-lg bg-surface-2/90 border border-hairline">
            <button
              onClick={() => setFilterBranch("all")}
              className={cx(
                "px-2.5 py-1 rounded text-xs font-mono font-medium transition-colors cursor-pointer",
                filterBranch === "all"
                  ? "bg-raised text-accent font-semibold shadow-xs"
                  : "text-ink-2 hover:text-ink-1"
              )}
            >
              All ({notebooks.length})
            </button>
            <button
              onClick={() => setFilterBranch("cs")}
              className={cx(
                "px-2.5 py-1 rounded text-xs font-mono font-medium transition-colors cursor-pointer flex items-center gap-1",
                filterBranch === "cs"
                  ? "bg-raised text-blue-600 dark:text-blue-400 font-semibold shadow-xs"
                  : "text-ink-2 hover:text-ink-1"
              )}
            >
              <span>GATE CS/IT</span>
              <span className="text-[10px] px-1 rounded bg-blue-500/10 text-blue-600 dark:text-blue-300">
                {csCount}
              </span>
            </button>
            <button
              onClick={() => setFilterBranch("da")}
              className={cx(
                "px-2.5 py-1 rounded text-xs font-mono font-medium transition-colors cursor-pointer flex items-center gap-1",
                filterBranch === "da"
                  ? "bg-raised text-purple-600 dark:text-purple-400 font-semibold shadow-xs"
                  : "text-ink-2 hover:text-ink-1"
              )}
            >
              <span>GATE AI & DA</span>
              <span className="text-[10px] px-1 rounded bg-purple-500/10 text-purple-600 dark:text-purple-300">
                {daCount}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* ── NOTEBOOK GRID / PHYSICAL LIBRARY SHELF ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-9">
        {filteredNotebooks.map((nb, idx) => {
          const serialNum = String(idx + 1).padStart(2, "0");
          return (
            <SubjectNotebook
              key={nb.id}
              notebook={nb}
              serialNumber={serialNum}
              priority={idx < 3}
            />
          );
        })}
      </div>
    </div>
  );
}

