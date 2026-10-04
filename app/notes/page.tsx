import Link from "next/link";
import { SUBJECT_NOTEBOOKS } from "../../lib/notebooks/data";
import NotebookShelf from "../components/notebook/NotebookShelf";
import NotesSearch from "../components/notebook/NotesSearch";
import NotesHeroDoodles from "../components/notebook/NotesHeroDoodles";
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
      {/* Structured data: Breadcrumbs */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://btechbrain.zainabshujat.dev",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Notes",
                item: "https://btechbrain.zainabshujat.dev/notes",
              },
            ],
          }),
        }}
      />
      {/* =========================================================
          HERO: EDITORIAL LIBRARY IDENTITY WITH HAND-DRAWN DOODLES
          ========================================================= */}
      <header className="relative border-b border-hairline pb-10 mb-0 overflow-hidden">
        {/* Floating hand-drawn engineering vector doodles */}
        <NotesHeroDoodles />

        <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[5px] bg-[#7c3aed]/15 border border-[#7c3aed]/30 text-xs font-mono font-bold tracking-widest text-[#7c3aed] dark:text-[#a78bfa] uppercase">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className="w-3.5 h-3.5">
                  <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                NOTES
              </span>
              <span className="font-handwriting text-base text-[#7c3aed] font-bold">
                ✎ peer-researched manuscripts
              </span>
            </div>

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
        <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-ink-3">
                CROSS-NOTEBOOK TOOLS
              </span>
              <span className="text-xs font-handwriting text-amber-500 font-bold">
                ✎ fast-track modes
              </span>
            </div>
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
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/notes/labs"
            className="group relative overflow-hidden block p-4 rounded-[8px] border border-hairline bg-surface-1/40 hover:bg-surface-2/70 hover:border-[#7c3aed]/50 transition-all shadow-xs hover:shadow-md hover:-translate-y-0.5"
          >
            {/* Visual background vector shape */}
            <svg
              viewBox="0 0 100 100"
              className="absolute -right-4 -bottom-4 w-20 h-20 text-[#7c3aed]/10 group-hover:text-[#7c3aed]/20 transition-colors pointer-events-none"
              fill="none"
              stroke="currentColor"
            >
              <rect x="20" y="20" width="60" height="60" rx="8" strokeWidth="3" />
              <circle cx="50" cy="50" r="16" strokeWidth="2.5" />
              <path d="M50 20 L50 34" strokeWidth="2.5" />
              <path d="M50 66 L50 80" strokeWidth="2.5" />
              <path d="M20 50 L34 50" strokeWidth="2.5" />
              <path d="M66 50 L80 50" strokeWidth="2.5" />
            </svg>

            <div className="flex items-center justify-between mb-2">
              <div className="font-mono text-[11px] font-bold text-[#7c3aed] dark:text-[#a78bfa] uppercase">
                01 &middot; LABORATORY
              </div>
              <span className="w-6 h-6 rounded flex items-center justify-center bg-[#7c3aed]/10 text-[#7c3aed] text-xs">
                ⚡
              </span>
            </div>
            <h3 className="font-bold text-sm text-ink-1 group-hover:text-[#7c3aed] transition-colors mb-1 font-sans">
              Interactive Simulators
            </h3>
            <p className="text-xs text-ink-3 leading-relaxed relative z-10">
              11 visual tools for CPU scheduling, Banker&rsquo;s safety, B+ trees, and page replacement.
            </p>
          </Link>

          <Link
            href="/notes/pyqs"
            className="group relative overflow-hidden block p-4 rounded-[8px] border border-hairline bg-surface-1/40 hover:bg-surface-2/70 hover:border-amber-500/50 transition-all shadow-xs hover:shadow-md hover:-translate-y-0.5"
          >
            {/* Visual background vector shape */}
            <svg
              viewBox="0 0 100 100"
              className="absolute -right-4 -bottom-4 w-20 h-20 text-amber-500/10 group-hover:text-amber-500/20 transition-colors pointer-events-none"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="50" cy="50" r="32" strokeWidth="3" strokeDasharray="6 3" />
              <polygon points="50,28 62,65 38,65" strokeWidth="2" fill="currentColor" fillOpacity="0.3" />
            </svg>

            <div className="flex items-center justify-between mb-2">
              <div className="font-mono text-[11px] font-bold text-amber-500 uppercase">
                02 &middot; EXAM PRACTICE
              </div>
              <span className="w-6 h-6 rounded flex items-center justify-center bg-amber-500/10 text-amber-500 text-xs">
                🎯
              </span>
            </div>
            <h3 className="font-bold text-sm text-ink-1 group-hover:text-amber-500 transition-colors mb-1 font-sans">
              Verified GATE PYQs
            </h3>
            <p className="text-xs text-ink-3 leading-relaxed relative z-10">
              10-year official question bank with step-by-step derivations and trap warnings.
            </p>
          </Link>

          <Link
            href="/notes/cheat-sheets"
            className="group relative overflow-hidden block p-4 rounded-[8px] border border-hairline bg-surface-1/40 hover:bg-surface-2/70 hover:border-emerald-500/50 transition-all shadow-xs hover:shadow-md hover:-translate-y-0.5"
          >
            {/* Visual background vector shape */}
            <svg
              viewBox="0 0 100 100"
              className="absolute -right-4 -bottom-4 w-20 h-20 text-emerald-500/10 group-hover:text-emerald-500/20 transition-colors pointer-events-none"
              fill="none"
              stroke="currentColor"
            >
              <rect x="25" y="18" width="50" height="64" rx="4" strokeWidth="3" />
              <line x1="35" y1="32" x2="65" y2="32" strokeWidth="2.5" />
              <line x1="35" y1="45" x2="65" y2="45" strokeWidth="2.5" />
              <line x1="35" y1="58" x2="55" y2="58" strokeWidth="2.5" />
            </svg>

            <div className="flex items-center justify-between mb-2">
              <div className="font-mono text-[11px] font-bold text-emerald-500 uppercase">
                03 &middot; HIGH-DENSITY
              </div>
              <span className="w-6 h-6 rounded flex items-center justify-center bg-emerald-500/10 text-emerald-500 text-xs">
                ⚡
              </span>
            </div>
            <h3 className="font-bold text-sm text-ink-1 group-hover:text-emerald-500 transition-colors mb-1 font-sans">
              Cheat Sheets
            </h3>
            <p className="text-xs text-ink-3 leading-relaxed relative z-10">
              One-page high-density mental model summaries for exam night revision.
            </p>
          </Link>

          <Link
            href="/notes/quick-revision"
            className="group relative overflow-hidden block p-4 rounded-[8px] border border-hairline bg-surface-1/40 hover:bg-surface-2/70 hover:border-rose-500/50 transition-all shadow-xs hover:shadow-md hover:-translate-y-0.5"
          >
            {/* Visual background vector shape */}
            <svg
              viewBox="0 0 100 100"
              className="absolute -right-4 -bottom-4 w-20 h-20 text-rose-500/10 group-hover:text-rose-500/20 transition-colors pointer-events-none"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="50" cy="50" r="32" strokeWidth="3" />
              <polyline points="50,28 50,50 64,50" strokeWidth="3" strokeLinecap="round" />
            </svg>

            <div className="flex items-center justify-between mb-2">
              <div className="font-mono text-[11px] font-bold text-rose-500 uppercase">
                04 &middot; SPEED REVIEW
              </div>
              <span className="w-6 h-6 rounded flex items-center justify-center bg-rose-500/10 text-rose-500 text-xs">
                ⏱️
              </span>
            </div>
            <h3 className="font-bold text-sm text-ink-1 group-hover:text-rose-500 transition-colors mb-1 font-sans">
              10-Minute Rapid Revision
            </h3>
            <p className="text-xs text-ink-3 leading-relaxed relative z-10">
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
