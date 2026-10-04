import Link from "next/link";
import { getCourse } from "../../../lib/courses";
import PageHeader from "../../components/ui/PageHeader";
import { pageMetadata } from "../../../lib/seo";

export const metadata = pageMetadata({
  title: "Operating Systems 10-Minute Rapid Revision & Panic Sheets",
  description:
    "Timed revision designed for the 10 minutes before an exam. Core invariants, rapid memory anchors, and decision trees for Operating Systems.",
  path: "/notes/quick-revision",
});

export default function QuickRevisionPage() {
  const osCourse = getCourse("operating-systems");

  // Extract all quick-revision sections from the Operating Systems course
  const revisionSections = osCourse
    ? osCourse.modules.flatMap((m) =>
        m.lessons.flatMap((l) =>
          l.sections
            .filter((sec) => sec.type === "quick-revision")
            .map((sec) => ({
              moduleTitle: m.title.replace(/^Module \d+:\s*/i, ""),
              lessonTitle: l.title,
              lessonSlug: l.slug,
              ...(sec.type === "quick-revision" ? sec : {}),
            }))
        )
      )
    : [];

  return (
    <main className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8 py-10 md:py-16">
      {/* Breadcrumb */}
      <nav className="mb-4 text-xs font-mono text-ink-3" aria-label="Breadcrumb">
        <ol className="flex items-center gap-1.5">
          <li>
            <Link href="/notes" className="hover:text-ink-1 transition-colors">
              Notes
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/notes/gate" className="hover:text-ink-1 transition-colors">
              Revision
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-ink-1 font-semibold">10-Minute Rapid Revision</li>
        </ol>
      </nav>

      <PageHeader
        eyebrow="TIMED REVISION · 1-MINUTE PANIC SHEETS"
        title="Operating Systems 10-Minute Rapid Revision"
        description="Designed specifically for the crucial minutes before entering the exam hall. High-yield memory anchors, core mathematical invariants, and ASCII execution flowcharts."
      />

      {/* Subject Filter Bar */}
      <div className="flex flex-wrap items-center gap-2 mb-8 pb-4 border-b border-hairline text-xs font-mono">
        <span className="text-ink-3 text-[11px] font-bold uppercase tracking-wider mr-1">
          SUBJECT:
        </span>
        <span className="px-3 py-1.5 rounded bg-amber-500 text-slate-950 font-bold shadow-2xs">
          Operating Systems ({revisionSections.length} Panic Sheets)
        </span>
        <span className="px-3 py-1.5 rounded bg-surface-2 text-ink-3 border border-hairline/60">
          DBMS (Coming Soon)
        </span>
        <span className="px-3 py-1.5 rounded bg-surface-2 text-ink-3 border border-hairline/60">
          Computer Networks (Coming Soon)
        </span>
        <span className="px-3 py-1.5 rounded bg-surface-2 text-ink-3 border border-hairline/60">
          Algorithms (Coming Soon)
        </span>
      </div>

      {/* Panic Sheets Stream */}
      <div className="space-y-8">
        {revisionSections.map((rev, idx) => {
          const card = rev.oneMinutePanicCard;
          if (!card) return null;

          return (
            <article
              key={idx}
              className="p-6 rounded-xl border-l-4 border-l-amber-500 border-y border-r border-hairline bg-surface-1/70 backdrop-blur-xs space-y-5 shadow-2xs"
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 border-b border-hairline/60 pb-3">
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-500 block">
                    PANIC SHEET 0{idx + 1} &middot; {rev.moduleTitle}
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold text-ink-1 font-sans">
                    {rev.lessonTitle}
                  </h2>
                </div>

                <Link
                  href={`/notes/operating-systems/${rev.lessonSlug}`}
                  className="text-xs font-mono text-ink-3 hover:text-accent transition-colors shrink-0"
                >
                  Full Lesson &rarr;
                </Link>
              </div>

              {/* Core Invariant Anchor */}
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-ink-3 block mb-1">
                  CORE INVARIANT ANCHOR:
                </span>
                <p className="text-sm sm:text-base font-bold text-ink-1 font-sans leading-snug">
                  &ldquo;{card.coreRule}&rdquo;
                </p>
              </div>

              {/* 2-Column: Principles & Pitfalls */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-hairline">
                <div>
                  <span className="text-xs font-mono font-bold text-amber-500 uppercase tracking-wider block mb-2">
                    Must-Remember Principles:
                  </span>
                  <ul className="space-y-1.5 text-xs font-mono text-ink-2">
                    {card.mustRememberFormulas.map((rule, rIdx) => (
                      <li key={rIdx} className="flex items-start gap-2">
                        <span className="text-amber-500">&mdash;</span>
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <span className="text-xs font-mono font-bold text-rose-400 uppercase tracking-wider block mb-2">
                    Critical Exam Pitfalls:
                  </span>
                  <ul className="space-y-1.5 text-xs font-mono text-ink-2">
                    {card.criticalPitfalls.map((pitfall, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2">
                        <span className="text-rose-400">&mdash;</span>
                        <span>{pitfall}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Visual Flow / Decision Diagram */}
              {card.visualFlow && (
                <div className="pt-3 border-t border-hairline">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-500 block mb-2">
                    Visual Decision &amp; Execution Invariant:
                  </span>
                  <pre className="bg-surface-2 border border-hairline rounded p-3.5 font-mono text-[11px] text-ink-1 overflow-x-auto whitespace-pre leading-relaxed select-text shadow-2xs">
                    {card.visualFlow}
                  </pre>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </main>
  );
}
