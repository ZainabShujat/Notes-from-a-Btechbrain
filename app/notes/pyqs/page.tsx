import Link from "next/link";
import { getCourse } from "../../../lib/courses";
import PageHeader from "../../components/ui/PageHeader";
import { pageMetadata } from "../../../lib/seo";

export const metadata = pageMetadata({
  title: "GATE CS Previous Year Questions (PYQs) · Operating Systems",
  description:
    "Authentic GATE CS/IT previous year questions for Operating Systems: CPU scheduling, paging, deadlocks, semaphores, and disk scheduling with step-by-step solutions.",
  path: "/notes/pyqs",
});

export default function PYQsPage() {
  const osCourse = getCourse("operating-systems");

  // Extract all PYQs from the Operating Systems course
  const osPYQs = osCourse
    ? osCourse.modules.flatMap((m) =>
        m.lessons.flatMap((l) =>
          l.sections
            .filter((sec) => sec.type === "gate-lens")
            .flatMap((sec) =>
              sec.type === "gate-lens"
                ? sec.pyqs.map((q) => ({
                    ...q,
                    lessonTitle: l.title,
                    lessonSlug: l.slug,
                    moduleTitle: m.title.replace(/^Module \d+:\s*/i, ""),
                  }))
                : []
            )
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
              Practice
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-ink-1 font-semibold">Previous Year Questions</li>
        </ol>
      </nav>

      <PageHeader
        eyebrow="AUTHENTIC GATE CS ARCHIVE · 1998–2024"
        title="Previous Year Questions (PYQs)"
        description="Authentic examination questions with verified official answer keys, step-by-step mathematical derivations, formula references, and critical trap warnings."
      />

      {/* Subject Filter Bar */}
      <div className="flex flex-wrap items-center gap-2 mb-8 pb-4 border-b border-hairline text-xs font-mono">
        <span className="text-ink-3 text-[11px] font-bold uppercase tracking-wider mr-1">
          SUBJECT:
        </span>
        <span className="px-3 py-1.5 rounded bg-accent text-white font-semibold shadow-2xs">
          Operating Systems ({osPYQs.length} PYQs)
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

      {/* Operating Systems PYQ Archive */}
      <section className="space-y-6">
        <div className="flex items-baseline justify-between border-b border-hairline pb-2">
          <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-ink-1">
            Operating Systems &middot; Authentic GATE CS Archive
          </h2>
          <span className="text-xs font-mono text-amber-500 font-semibold">
            {osPYQs.length} Verified Questions with Solutions
          </span>
        </div>

        <div className="space-y-6">
          {osPYQs.map((pyq, idx) => (
            <article
              key={pyq.id || idx}
              className="p-5 sm:p-6 rounded-lg border border-hairline bg-surface-1/70 backdrop-blur-xs space-y-4 shadow-2xs"
            >
              {/* Question Meta Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-hairline/60 pb-3">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                    GATE CS {pyq.year}
                  </span>
                  <span className="font-mono text-xs text-ink-3">
                    &middot; {pyq.marks} Mark{pyq.marks > 1 ? "s" : ""}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-[11px] font-mono text-ink-3">
                  <span className="text-ink-2 font-medium">{pyq.moduleTitle}</span>
                  <span>&middot;</span>
                  <Link
                    href={`/notes/operating-systems/${pyq.lessonSlug}`}
                    className="text-accent hover:underline"
                  >
                    {pyq.lessonTitle} &rarr;
                  </Link>
                </div>
              </div>

              {/* Concept Tag */}
              {pyq.keyFormulaOrConcept && (
                <div className="text-xs font-mono text-ink-3">
                  <strong className="text-ink-1 font-semibold">Tested Principle:</strong>{" "}
                  <span className="text-accent font-semibold">{pyq.keyFormulaOrConcept}</span>
                </div>
              )}

              {/* Question Text */}
              <div className="text-sm sm:text-base text-ink-1 font-sans leading-relaxed">
                <p className="font-medium">{pyq.question}</p>
              </div>

              {/* Multiple Choice Options (if present) */}
              {pyq.options && pyq.options.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-xs pt-1">
                  {pyq.options.map((opt, oIdx) => (
                    <div
                      key={oIdx}
                      className="p-2.5 rounded bg-surface-2/70 text-ink-2 border border-hairline/60 flex items-start gap-2"
                    >
                      <span className="text-accent font-bold">
                        ({String.fromCharCode(65 + oIdx)})
                      </span>
                      <span>{opt.replace(/^[A-D]\.\s*/, "")}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Detailed Solution Box */}
              <div className="p-4 rounded-md border border-amber-500/30 bg-surface-2/80 space-y-2 text-xs">
                <div className="flex items-center justify-between border-b border-hairline/60 pb-1.5">
                  <span className="font-mono font-bold text-amber-500 dark:text-amber-400">
                    Official Answer: {pyq.correctOptionOrValue}
                  </span>
                  <span className="text-[10px] font-mono text-ink-3 uppercase tracking-wider">
                    Step-by-Step Derivation
                  </span>
                </div>
                <p className="text-ink-2 leading-relaxed whitespace-pre-line font-sans text-xs sm:text-[13px]">
                  {pyq.detailedSolution}
                </p>
              </div>

              {/* Common Pitfall / Trap Warning */}
              {pyq.trapWarning && (
                <div className="flex items-start gap-2 text-xs font-mono text-rose-400 pt-1">
                  <span className="font-bold shrink-0">[Exam Pitfall]:</span>
                  <span>{pyq.trapWarning}</span>
                </div>
              )}
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
