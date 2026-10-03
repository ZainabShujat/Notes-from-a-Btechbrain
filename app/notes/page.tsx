import Link from "next/link";
import { SUBJECT_NOTEBOOKS } from "../../lib/notebooks/data";
import NotebookShelf from "../components/notebook/NotebookShelf";
import NotesSearch from "../components/notebook/NotesSearch";
import { pageMetadata } from "../../lib/seo";

export const metadata = pageMetadata({
  title: "The Notebooks · Student-Built Technical Notes",
  description:
    "A growing library of student-researched technical notebooks for B.Tech CS and GATE preparation. Operating Systems, DBMS, Computer Networks, and more.",
  path: "/notes",
});

export default function NotesLandingPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8 py-10 md:py-16 text-ink-2">
      {/* =========================================================
          HERO: EDITORIAL LIBRARY IDENTITY (MATCHING REFERENCE IMAGE 2)
          ========================================================= */}
      <header className="border-b border-hairline pb-8 mb-0">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold tracking-widest text-[#7c3aed] dark:text-[#a78bfa] uppercase">
              NOTES
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-ink-1 tracking-tight leading-[1.05] font-sans">
              The Notebooks
            </h1>
            <p className="text-base sm:text-lg text-ink-2 font-normal font-sans pt-1">
              Student-built notes for figuring out B.Tech together.
            </p>
          </div>

          <div className="md:max-w-md pt-2">
            <p className="text-xs sm:text-sm text-ink-3 leading-relaxed">
              Browse subjects, open a notebook, and explore notes, practice, revision sheets,
              interactive models, and authoritative resources.
            </p>
            <div className="mt-3">
              <NotesSearch />
            </div>
          </div>
        </div>
      </header>

      {/* =========================================================
          SECTION 1: THE NOTEBOOKS (ACADEMIC LIBRARY SHELF)
          ========================================================= */}
      <section className="mb-20" aria-label="Academic Notebook Library Shelf">
        <NotebookShelf notebooks={SUBJECT_NOTEBOOKS} />
      </section>

      {/* =========================================================
          SECTION 2: CROSS-NOTEBOOK SHORTCUTS (SECONDARY)
          ========================================================= */}
      <section className="border-t border-hairline pt-10 mb-16" aria-labelledby="shortcuts-heading">
        <div className="mb-6">
          <p className="text-[11px] font-mono font-bold uppercase tracking-widest text-ink-3 mb-1">
            CROSS-NOTEBOOK TOOLS
          </p>
          <h2
            id="shortcuts-heading"
            className="text-xl sm:text-2xl font-bold text-ink-1 font-sans"
          >
            Looking for a specific mode across all subjects?
          </h2>
          <p className="text-xs sm:text-sm text-ink-2 mt-1">
            While each subject notebook is the primary home, these shortcuts aggregate
            specific materials across all subjects.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/notes/labs"
            className="group block p-4 rounded-[6px] border border-hairline bg-surface-1/40 hover:bg-surface-2/60 transition-all"
          >
            <div className="font-mono text-[11px] font-bold text-[#7c3aed] dark:text-[#a78bfa] uppercase mb-1">
              01 &middot; LABORATORY
            </div>
            <h3 className="font-bold text-sm text-ink-1 group-hover:text-[#7c3aed] transition-colors mb-1 font-sans">
              Interactive Simulators
            </h3>
            <p className="text-xs text-ink-3 leading-relaxed">
              11 visual tools for CPU scheduling, Banker&rsquo;s safety, B+ trees, and page replacement.
            </p>
          </Link>

          <Link
            href="/notes/pyqs"
            className="group block p-4 rounded-[6px] border border-hairline bg-surface-1/40 hover:bg-surface-2/60 transition-all"
          >
            <div className="font-mono text-[11px] font-bold text-amber-500 uppercase mb-1">
              02 &middot; EXAM PRACTICE
            </div>
            <h3 className="font-bold text-sm text-ink-1 group-hover:text-amber-500 transition-colors mb-1 font-sans">
              Verified GATE PYQs
            </h3>
            <p className="text-xs text-ink-3 leading-relaxed">
              10-year official question bank with step-by-step derivations and trap warnings.
            </p>
          </Link>

          <Link
            href="/notes/cheat-sheets"
            className="group block p-4 rounded-[6px] border border-hairline bg-surface-1/40 hover:bg-surface-2/60 transition-all"
          >
            <div className="font-mono text-[11px] font-bold text-emerald-500 uppercase mb-1">
              03 &middot; HIGH-DENSITY
            </div>
            <h3 className="font-bold text-sm text-ink-1 group-hover:text-emerald-500 transition-colors mb-1 font-sans">
              Cheat Sheets
            </h3>
            <p className="text-xs text-ink-3 leading-relaxed">
              One-page high-density mental model summaries for exam night revision.
            </p>
          </Link>

          <Link
            href="/notes/quick-revision"
            className="group block p-4 rounded-[6px] border border-hairline bg-surface-1/40 hover:bg-surface-2/60 transition-all"
          >
            <div className="font-mono text-[11px] font-bold text-rose-500 uppercase mb-1">
              04 &middot; SPEED REVIEW
            </div>
            <h3 className="font-bold text-sm text-ink-1 group-hover:text-rose-500 transition-colors mb-1 font-sans">
              10-Minute Rapid Revision
            </h3>
            <p className="text-xs text-ink-3 leading-relaxed">
              Rapid recall sheets designed to be reviewed on your phone right before entering the hall.
            </p>
          </Link>
        </div>
      </section>

      {/* =========================================================
          SECTION 3: COLLABORATION & TRANSPARENCY
          ========================================================= */}
      <section className="border-t border-hairline pt-8 text-xs font-mono text-ink-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="font-bold text-ink-1">Living Student Notebooks.</span>{" "}
          <span>Open to corrections, better analogies, and student contributions.</span>
        </div>
        <div>
          <Link
            href="/notes/editorial-philosophy"
            className="text-[#7c3aed] dark:text-[#a78bfa] hover:underline inline-flex items-center gap-1 font-semibold"
          >
            <span>Learn about our student editorial philosophy</span>
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
