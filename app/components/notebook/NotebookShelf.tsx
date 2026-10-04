import { SubjectNotebookData } from "../../../lib/notebooks/types";
import SubjectNotebook from "./SubjectNotebook";

export default function NotebookShelf({
  notebooks,
}: {
  notebooks: SubjectNotebookData[];
}) {
  return (
    <div className="space-y-8">
      {/* ── SHELF HEADER ── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-hairline pb-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-[4px] bg-[#7c3aed]/15 text-[#7c3aed] text-xs">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="w-3.5 h-3.5">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
              </svg>
            </span>
            <span className="text-[11px] font-mono font-bold tracking-widest text-[#7c3aed] dark:text-[#a78bfa] uppercase">
              STUDY SHELF &middot; {notebooks.length} NOTEBOOKS
            </span>
          </div>
          <p className="text-xs font-mono text-ink-3">
            Pick up any notebook to flip through handwritten notes, diagrams, and formulas.
          </p>
        </div>

        <div className="flex items-center gap-3 text-[11px] font-mono text-ink-3">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Interactive Labs Active</span>
          </span>
          <span className="hidden md:inline-block text-hairline">|</span>
          <span className="hidden md:flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-violet-500" />
            <span>Verified Formulas</span>
          </span>
        </div>
      </div>

      {/* ── NOTEBOOK GRID / PHYSICAL LIBRARY SHELF ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-9">
        {notebooks.map((nb, idx) => {
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
