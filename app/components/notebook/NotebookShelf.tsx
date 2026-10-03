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
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 border-b border-hairline pb-2">
        <div>
          <div className="text-[11px] font-mono font-bold tracking-widest text-[#7c3aed] dark:text-[#a78bfa] uppercase mb-1">
            LIBRARY SHELF &middot; {notebooks.length} ACADEMIC NOTEBOOKS
          </div>
          <p className="text-xs font-mono text-ink-3">
            Click any notebook to flip open its pages, or enter its complete subject hub.
          </p>
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
