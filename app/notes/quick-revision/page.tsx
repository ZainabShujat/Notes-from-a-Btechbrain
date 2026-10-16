import Link from "next/link";
import { getSubjectRevision, REVISION_SUBJECTS } from "../../../lib/courses/revision";
import PageHeader from "../../components/ui/PageHeader";
import SubjectSwitcher from "../../components/ui/SubjectSwitcher";
import { pageMetadata } from "../../../lib/seo";

export const metadata = pageMetadata({
  title: "10-Minute Rapid Revision & Panic Sheets",
  description:
    "Timed revision for the 10 minutes before an exam: core rules, must-remember formulas, and common traps for every B.Tech subject notebook.",
  path: "/notes/quick-revision",
});

const DEFAULT_SUBJECT = "operating-systems";

export default async function QuickRevisionPage({
  searchParams,
}: {
  searchParams: Promise<{ subject?: string }>;
}) {
  const { subject } = await searchParams;
  const activeSlug = REVISION_SUBJECTS.some((s) => s.slug === subject) ? subject! : DEFAULT_SUBJECT;
  const activeTitle = REVISION_SUBJECTS.find((s) => s.slug === activeSlug)!.title;
  const subjects = REVISION_SUBJECTS.map((s) => ({
    ...s,
    count: getSubjectRevision(s.slug).filter((r) => r.panicCard).length,
  }));
  const revisionSections = getSubjectRevision(activeSlug).filter((r) => r.panicCard);

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
        title={`${activeTitle} 10-Minute Rapid Revision`}
        description="For the last few minutes before the exam hall: one core rule per topic, the formulas you must remember, and the traps that cost marks."
      />

      <SubjectSwitcher
        basePath="/notes/quick-revision"
        subjects={subjects}
        activeSlug={activeSlug}
        activeClassName="bg-amber-500 text-slate-950"
      />

      {/* Panic Sheets Stream */}
      <div className="space-y-8">
        {revisionSections.map((rev, idx) => {
          const card = rev.panicCard;
          if (!card) return null;

          return (
            <article
              key={idx}
              className="p-6 rounded-xl border-l-4 border-l-amber-500 border-y border-r border-hairline bg-surface-1/70 backdrop-blur-xs space-y-5 shadow-2xs"
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 border-b border-hairline/60 pb-3">
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-500 block">
                    PANIC SHEET {String(idx + 1).padStart(2, "0")} &middot; {rev.moduleTitle}
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold text-ink-1 font-sans">
                    {rev.lessonTitle}
                  </h2>
                </div>

                <Link
                  href={`/notes/${activeSlug}/${rev.lessonSlug}`}
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
