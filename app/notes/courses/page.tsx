import Link from "next/link";
import PageHeader from "../../components/ui/PageHeader";
import { pageMetadata } from "../../../lib/seo";
import { getAllCourses } from "../../../lib/courses";

import { NOINDEX } from "../../../lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Subject Notebooks Archive",
  ...NOINDEX,
};

export default function CoursesPage() {
  const courses = getAllCourses();

  const UPCOMING_SUBJECTS = [
    {
      title: "Computer Organization & Architecture (COA)",
      slug: "computer-organization",
      tagline: "Pipeline hazards, cache mapping inequalities, addressing modes, and datapath control.",
      gate: "7–10 Marks",
      interactive: "Pipeline stall visualizer & cache hit calculator",
    },
    {
      title: "Digital Logic & Design",
      slug: "digital-logic",
      tagline: "Boolean minimization, K-Maps, combinational circuits, and flip-flops.",
      gate: "5–7 Marks",
      interactive: "Interactive Circuit Builder & K-Map solver",
    },
    {
      title: "Data Structures & Algorithms",
      slug: "data-structures",
      tagline: "Pointers, recursion trees, dynamic programming tables, and asymptotic bounds.",
      gate: "12–16 Marks",
      interactive: "Step-through sorting & tree balance simulator",
    },
    {
      title: "Computer Networks",
      slug: "computer-networks",
      tagline: "Packet flow, sliding window flow control, subnetting, and TCP state machine.",
      gate: "7–9 Marks",
      interactive: "Subnetting calculator & sliding window animator",
    },
    {
      title: "Theory of Computation",
      slug: "theory-of-computation",
      tagline: "DFA/NFA equivalence, regular expressions, pumping lemma, and Turing machines.",
      gate: "7–9 Marks",
      interactive: "DFA simulator & regex-to-automata engine",
    },
  ];

  return (
    <main className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8 py-10 md:py-16">
      {/* Breadcrumb */}
      <nav className="mb-6 text-xs font-mono text-ink-3" aria-label="Breadcrumb">
        <ol className="flex items-center gap-1.5">
          <li>
            <Link href="/notes" className="hover:text-ink-1 transition-colors">
              Notes
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-ink-1 font-semibold">Subject Notes</li>
        </ol>
      </nav>

      <PageHeader
        eyebrow="Notes From a B.Tech Brain · Student Study Notes"
        title="Subject Notes Library"
        description="Rigorous, authentic study notes compiled for university semesters and GATE CS. Focused on conceptual intuition, step-by-step mathematical proofs, embedded laboratory simulators, and verified PYQs."
      />

      {/* Available Subject Notes */}
      <section className="space-y-6 mb-16">
        <div className="flex items-center justify-between border-b border-hairline pb-3">
          <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-ink-1">
            Complete Subject Notes
          </h2>
          <span className="text-xs font-mono text-accent">
            ● Full topics &amp; labs available
          </span>
        </div>

        <div className="divide-y divide-hairline border-y border-hairline">
          {courses.map((course) => {
            const totalLessons = course.modules.reduce(
              (acc, m) => acc + m.lessons.length,
              0
            );
            const totalInteractive = course.modules.reduce(
              (acc, m) => acc + m.lessons.filter((l) => l.hasInteractive).length,
              0
            );
            const firstLesson = course.modules[0]?.lessons[0];

            return (
              <div
                key={course.id}
                className="py-6 sm:py-8 flex flex-col md:flex-row md:items-start justify-between gap-6"
              >
                <div className="space-y-3 max-w-2xl">
                  {/* Clean typographic stats line (No pills) */}
                  <div className="font-mono text-xs text-ink-3 tracking-wider uppercase">
                    <span className="text-accent font-semibold">STUDENT NOTES</span>
                    <span className="mx-2 text-hairline">·</span>
                    <span>GATE: {course.gateWeightage}</span>
                    <span className="mx-2 text-hairline">·</span>
                    <span>~{course.estimatedTotalHours}H READ TIME</span>
                  </div>

                  <Link href={`/notes/${course.slug}`} className="block">
                    <h3 className="text-xl sm:text-2xl font-bold text-ink-1 hover:text-accent transition-colors font-sans">
                      {course.title}
                    </h3>
                  </Link>

                  <p className="text-sm font-serif italic text-ink-2">
                    &ldquo;{course.tagline}&rdquo;
                  </p>

                  <p className="text-xs sm:text-sm text-ink-2 leading-relaxed">
                    {course.description}
                  </p>

                  {/* Typographic counts */}
                  <div className="font-mono text-xs text-ink-3 pt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="font-semibold text-ink-1">
                      {course.modules.length} Modules
                    </span>
                    <span>·</span>
                    <span className="font-semibold text-ink-1">
                      {totalLessons} Topics
                    </span>
                    <span>·</span>
                    <span className="text-accent font-semibold">
                      {totalInteractive} Interactive Labs
                    </span>
                    <span>·</span>
                    <span className="text-amber-500 font-semibold">
                      Verified PYQs Included
                    </span>
                  </div>
                </div>

                <div className="flex flex-row md:flex-col gap-3 shrink-0 pt-2">
                  <Link
                    href={`/notes/${course.slug}`}
                    className="px-4 py-2 rounded border border-hairline hover:bg-surface-2 text-center text-xs font-mono font-medium text-ink-1 transition-all"
                  >
                    View Outline
                  </Link>
                  {firstLesson && (
                    <Link
                      href={`/notes/${course.slug}/${firstLesson.slug}`}
                      className="px-4 py-2 rounded bg-accent hover:bg-accent/90 text-white text-center text-xs font-mono font-bold transition-all shadow-2xs"
                    >
                      Start Reading →
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Upcoming Subject Notes Roadmap */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-hairline pb-3">
          <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-ink-1">
            Subjects in Preparation
          </h2>
          <span className="text-xs font-mono text-ink-3">
            Active drafting
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {UPCOMING_SUBJECTS.map((item) => (
            <div
              key={item.slug}
              className="p-5 rounded border border-hairline bg-surface-1/40 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-ink-3 mb-2">
                  <span className="text-amber-500 font-semibold">{item.gate}</span>
                  <span className="text-[10px] uppercase tracking-wider text-ink-3">
                    In Drafting
                  </span>
                </div>
                <h3 className="font-bold text-ink-1 text-sm sm:text-base mb-1 font-sans">
                  {item.title}
                </h3>
                <p className="text-xs text-ink-2 leading-relaxed mb-3">
                  {item.tagline}
                </p>
              </div>

              <div className="pt-3 border-t border-hairline/60 flex items-center justify-between text-[11px] font-mono">
                <span className="text-accent">
                  Interactive Lab Planned
                </span>
                <Link
                  href={`/notes/${item.slug}`}
                  className="text-ink-3 hover:text-ink-1 transition-colors"
                >
                  View Track →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
