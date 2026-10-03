import { NotebookPageData } from "../../../lib/notebooks/types";
import ConceptPage from "./pages/ConceptPage";
import DiagramPage from "./pages/DiagramPage";
import WorkedExamplePage from "./pages/WorkedExamplePage";
import ComparisonPage from "./pages/ComparisonPage";
import FormulaPage from "./pages/FormulaPage";
import RevisionPage from "./pages/RevisionPage";

export default function NotebookPage({
  page,
  subjectTitle,
  totalPages,
  isLeft = false,
}: {
  page: NotebookPageData;
  subjectTitle: string;
  totalPages: number;
  isLeft?: boolean;
}) {
  return (
    <article
      className="relative w-full h-full min-h-[460px] sm:min-h-[520px] rounded-lg border border-hairline/80 notebook-sheet text-ink-2 p-5 sm:p-7 flex flex-col justify-between overflow-hidden shadow-xs select-text"
      aria-label={`${subjectTitle} - Page ${page.pageNumber}: ${page.title}`}
    >
      {/* Very faint notebook margin line on left */}
      <div
        className="absolute top-0 bottom-0 left-6 sm:left-8 w-px bg-violet-500/15 pointer-events-none"
        aria-hidden="true"
      />

      {/* ── TOP RUNNING HEADER ── */}
      <header className="relative z-10 pb-3 mb-3 border-b border-dashed border-hairline/70 flex items-center justify-between text-[11px] font-mono text-ink-3">
        <div className="flex items-center gap-2 truncate max-w-[70%]">
          <span className="font-handwriting text-base text-accent font-bold">
            ✎ {subjectTitle}
          </span>
          {page.tag && (
            <>
              <span className="opacity-40">&middot;</span>
              <span className="uppercase tracking-wider text-[10px] text-ink-2 truncate">
                {page.tag}
              </span>
            </>
          )}
        </div>
        <span className="font-mono text-xs font-semibold text-ink-1 shrink-0">
          Page {page.pageNumber} / {totalPages}
        </span>
      </header>

      {/* ── MAIN BODY CONTENT (MODULAR BY PAGE TYPE) ── */}
      <div className="relative z-10 flex-1 overflow-y-auto pr-1">
        {page.type === "concept" && (
          <ConceptPage content={page.content as any} />
        )}
        {page.type === "diagram" && (
          <DiagramPage content={page.content as any} />
        )}
        {page.type === "worked-example" && (
          <WorkedExamplePage content={page.content as any} />
        )}
        {page.type === "comparison" && (
          <ComparisonPage content={page.content as any} />
        )}
        {page.type === "formula" && (
          <FormulaPage content={page.content as any} />
        )}
        {page.type === "revision" && (
          <RevisionPage content={page.content as any} />
        )}
      </div>

      {/* ── BOTTOM FOOTER: NOTEBOOK STAMP ── */}
      <footer className="relative z-10 pt-3 mt-3 border-t border-dashed border-hairline/70 flex items-center justify-between text-[10px] font-mono text-ink-3">
        <span>NOTES FROM A B.TECH BRAIN</span>
        <span className="font-handwriting text-xs text-accent">figuring it out together →</span>
      </footer>
    </article>
  );
}
