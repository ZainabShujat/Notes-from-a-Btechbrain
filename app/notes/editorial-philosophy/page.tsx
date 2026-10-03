import Link from "next/link";
import { pageMetadata } from "../../../lib/seo";

export const metadata = pageMetadata({
  title: "Student Editorial Philosophy",
  description:
    "The standards behind Notes From a B.Tech Brain: accurate, student-first, useful, and traceable technical notes.",
  path: "/notes/editorial-philosophy",
});

const standards = [
  ["Accuracy", "Definitions, algorithms, equations, diagrams, and examples are checked before publication."],
  ["Completeness", "A title is a promise. Every important concept, prerequisite, edge case, and practice connection must be covered."],
  ["Comprehension", "Each topic starts with the problem it solves, then builds toward precise terminology and mechanism."],
  ["Application", "Students should be able to trace a process, calculate an answer, reason about a system, or solve a representative question."],
  ["Revision value", "A student should be able to return later and reconstruct the important ideas quickly."],
];

export default function EditorialPhilosophyPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12 text-ink-2 sm:px-6 md:py-20 md:px-8">
      <nav className="mb-8 text-xs font-mono text-ink-3" aria-label="Breadcrumb">
        <Link href="/notes" className="hover:text-ink-1 transition-colors">
          The Notebooks
        </Link>
        <span className="mx-2" aria-hidden="true">/</span>
        <span className="text-ink-1">Editorial Philosophy</span>
      </nav>

      <header className="border-b border-hairline pb-10">
        <p className="mb-3 text-xs font-mono font-bold uppercase tracking-widest text-accent">
          HOW THESE NOTES ARE MADE
        </p>
        <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight text-ink-1 sm:text-5xl">
          Accurate enough to trust. Clear enough to use.
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-2">
          Notes From a B.Tech Brain is not trying to produce more study material.
          It is trying to produce study material that is actually worth revisiting
          before an exam.
        </p>
      </header>

      <section className="border-b border-hairline py-10" aria-labelledby="standard-heading">
        <p className="mb-2 text-xs font-mono font-bold uppercase tracking-widest text-accent">
          THE STANDARD
        </p>
        <h2 id="standard-heading" className="mb-6 text-2xl font-bold text-ink-1">
          Every published note must pass five tests.
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {standards.map(([title, description]) => (
            <article key={title} className="border-l-2 border-accent pl-4">
              <h3 className="font-semibold text-ink-1">{title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-ink-2">{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-b border-hairline py-10" aria-labelledby="verify-heading">
        <h2 id="verify-heading" className="mb-4 text-2xl font-bold text-ink-1">
          Verification is a process, not a claim
        </h2>
        <p className="leading-relaxed">
          Important claims are checked against an appropriate authoritative source,
          and against a second reliable source when practical. Equations, algorithms,
          examples, diagrams, and interactive behavior are verified independently.
          GATE-specific claims are kept distinct from general explanations and are
          checked against official material or authentic papers.
        </p>
        <div className="mt-6 grid gap-3 font-mono text-xs text-ink-2 sm:grid-cols-2">
          <div className="rounded border border-hairline bg-surface-1/40 p-4">
            <strong className="text-ink-1">Primary sources</strong>
            <p className="mt-1">Official syllabi, papers, specifications, documentation, and academic work.</p>
          </div>
          <div className="rounded border border-hairline bg-surface-1/40 p-4">
            <strong className="text-ink-1">Supporting references</strong>
            <p className="mt-1">Canonical textbooks, university material, NPTEL, and carefully selected explanations.</p>
          </div>
        </div>
      </section>

      <section className="border-b border-hairline py-10" aria-labelledby="teaching-heading">
        <h2 id="teaching-heading" className="mb-4 text-2xl font-bold text-ink-1">
          Explain like a senior who remembers being confused
        </h2>
        <p className="leading-relaxed">
          A good note starts with intuition: what problem does this concept solve?
          The precise definition comes next, followed by the mechanism, a concrete
          example, important edge cases, practice, and a compact revision anchor.
          Analogies can open the door, but they never replace the technical definition.
        </p>
        <ol className="mt-6 grid gap-3 sm:grid-cols-2">
          {["Why", "What", "Mental model", "How", "Example", "Edge cases", "Practice", "Revision"].map(
            (step, index) => (
              <li key={step} className="flex items-center gap-3 text-sm">
                <span className="font-mono text-xs text-accent">{String(index + 1).padStart(2, "0")}</span>
                <span className="text-ink-1">{step}</span>
              </li>
            )
          )}
        </ol>
      </section>

      <section className="border-b border-hairline py-10" aria-labelledby="exam-heading">
        <h2 id="exam-heading" className="mb-4 text-2xl font-bold text-ink-1">
          Exam content stays honest
        </h2>
        <p className="leading-relaxed">
          A verified PYQ is an authentic question with its year, source, answer,
          and reasoning preserved. Original questions are labeled GATE-style practice.
          Claims about frequency, marks, or what GATE always asks are not presented
          as facts without evidence. Exam tips are identified as practical guidance,
          not guaranteed predictions.
        </p>
      </section>

      <section className="border-b border-hairline py-10" aria-labelledby="revision-heading">
        <h2 id="revision-heading" className="mb-4 text-2xl font-bold text-ink-1">
          Short does not mean incomplete
        </h2>
        <p className="leading-relaxed">
          Cheat sheets and one-minute revisions are retrieval tools, not replacements
          for learning. They preserve definitions, conditions, formulas with variable
          meanings, algorithm steps, comparisons, exceptions, traps, and the patterns
          needed to start solving a standard question.
        </p>
      </section>

      <section className="py-10" aria-labelledby="final-heading">
        <h2 id="final-heading" className="mb-4 text-2xl font-bold text-ink-1">
          The final test
        </h2>
        <p className="leading-relaxed">
          Read the note as a beginner: can the concept be understood without five
          other tabs? Read it as an exam candidate: can it help solve something?
          Read it two weeks later: can the important ideas be reconstructed quickly?
          Then review it as a technical editor for factual errors, ambiguity,
          unsupported claims, and contradictions.
        </p>
        <blockquote className="mt-6 border-l-2 border-accent pl-4 font-serif text-xl italic text-ink-1">
          Every page should leave the student understanding something they did not
          understand before.
        </blockquote>
      </section>

      <Link href="/notes" className="text-sm font-mono font-semibold text-accent hover:underline">
        &larr; Back to the notebooks
      </Link>
    </main>
  );
}