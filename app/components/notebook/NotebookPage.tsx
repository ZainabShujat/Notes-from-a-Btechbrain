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
      className="relative flex flex-col h-full w-full overflow-hidden bg-[#faf8f5] text-[#1c1917] px-4 sm:px-6 py-2 select-text"
      style={{
        backgroundImage: "radial-gradient(circle, rgba(30, 27, 75, 0.07) 1.1px, transparent 1.1px)",
        backgroundSize: "22px 22px",
      }}
      aria-label={`${subjectTitle} - Page ${page.pageNumber}: ${page.title}`}
    >
      {/* Classic vertical red/pink notebook margin line */}
      <div
        className="absolute top-0 bottom-0 left-3 sm:left-4 w-px bg-rose-400/35 pointer-events-none"
        aria-hidden="true"
      />

      {/* ── TOP RUNNING FOLIO (ACADEMIC NOTEBOOK HEADER) ── */}
      <header className="shrink-0 pb-2 mb-2 border-b border-dashed border-[#1c1917]/15 flex items-center justify-between text-[11px] font-mono text-[#57534e]">
        <div className="flex items-center gap-2 truncate max-w-[75%] pl-4 sm:pl-5">
          <span className="font-handwriting text-base text-[#7c3aed] font-bold">
            ✎ {subjectTitle}
          </span>
          {page.tag && (
            <>
              <span className="opacity-40">&middot;</span>
              <span className="uppercase tracking-wider text-[10px] text-[#44403c] font-medium truncate">
                {page.tag}
              </span>
            </>
          )}
        </div>
        <span className="font-mono text-xs font-semibold text-[#1c1917] shrink-0">
          Page {page.pageNumber} / {totalPages}
        </span>
      </header>

      {/* ── MAIN BODY CONTENT (SMOOTH INTERNAL SCROLL, PROPER INK PADDING) ── */}
      <div className="flex-1 min-h-0 overflow-y-auto pl-4 sm:pl-5 pr-2 pb-6 pt-1 text-[#1c1917]">
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
