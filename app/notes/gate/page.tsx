import Link from "next/link";
import { LEARNING_TRACKS } from "../../../lib/notes";
import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";
import { cx } from "../../components/ui/cx";
import { pageMetadata } from "../../../lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = pageMetadata({
  title: "GATE CS Preparation Hub",
  description:
    "Exam-oriented preparation for GATE Computer Science: subject-wise marks distribution, high-yield topics, formula sheets, and verified PYQs.",
  path: "/notes/gate",
});

const GATE_WEIGHTAGE_DATA: Record<
  string,
  { marks: string; highYield: string; tier: "Tier 1 (High Yield)" | "Tier 2" | "Tier 3" }
> = {
  "operating-systems": {
    marks: "8–10 Marks",
    highYield: "CPU Scheduling (RR, SJF), Paging & TLB EMAT, Banker's Safe State, Semaphores",
    tier: "Tier 1 (High Yield)",
  },
  "data-structures": {
    marks: "6–8 Marks",
    highYield: "Binary Search Trees, AVL Trees, Heap operations, Hashing collision resolution",
    tier: "Tier 1 (High Yield)",
  },
  algorithms: {
    marks: "6–8 Marks",
    highYield: "Asymptotic bounds, Divide & Conquer (Master Theorem), DP, Dijkstra & Bellman-Ford",
    tier: "Tier 1 (High Yield)",
  },
  "theory-of-computation": {
    marks: "7–9 Marks",
    highYield: "DFA minimization, Closure properties, Decidability, Regular expressions",
    tier: "Tier 1 (High Yield)",
  },
  "compiler-design": {
    marks: "4–6 Marks",
    highYield: "FIRST & FOLLOW, LL(1) / LR(1) parsing tables, Syntax-Directed Translation (SDT)",
    tier: "Tier 2",
  },
  "computer-organization": {
    marks: "7–9 Marks",
    highYield: "Pipelining hazards & speedup, Cache mapping (Direct, Set-Associative), IEEE 754",
    tier: "Tier 1 (High Yield)",
  },
  "digital-logic": {
    marks: "5–7 Marks",
    highYield: "K-Map minimization, Multiplexers & Decoders, Flip-Flops & Counter state cycles",
    tier: "Tier 2",
  },
  dbms: {
    marks: "6–8 Marks",
    highYield: "B+ Tree index calculations, Normal Forms (BCNF, 3NF), Conflict Serializable schedules",
    tier: "Tier 1 (High Yield)",
  },
  "computer-networks": {
    marks: "7–9 Marks",
    highYield: "IPv4 Subnetting & CIDR, Sliding Window (Go-Back-N, SR), TCP Congestion Control",
    tier: "Tier 1 (High Yield)",
  },
  "discrete-mathematics": {
    marks: "7–9 Marks",
    highYield: "Propositional logic & inference, Graph coloring & isomorphism, Generating functions",
    tier: "Tier 1 (High Yield)",
  },
  "engineering-mathematics": {
    marks: "4–6 Marks",
    highYield: "Eigenvalues & Eigenvectors, System of Linear Equations, Bayes' Theorem, Calculus",
    tier: "Tier 2",
  },
  "programming-in-c": {
    marks: "4–6 Marks",
    highYield: "Pointer arithmetic, Recursion tree tracing, Operator precedence, Storage classes",
    tier: "Tier 2",
  },
  "general-aptitude": {
    marks: "15 Marks",
    highYield: "Numerical ability, Spatial aptitude, Reading comprehension, Syllogisms",
    tier: "Tier 1 (High Yield)",
  },
};

export default function GatePage() {
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
          <li className="text-ink-1 font-semibold">GATE CS Preparation Hub</li>
        </ol>
      </nav>

      <PageHeader
        eyebrow="GATE CS/IT EXAMINATION HUB"
        title="GATE CS Strategy & Subject War-Rooms"
        description="Exam-oriented preparation for the Graduate Aptitude Test in Engineering. Filter by mark weightage, review high-yield numerical patterns, and dive directly into verified PYQ archives."
      />

      {/* Quick Action Exam Shortcuts Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <Link
          href="/notes/formulas"
          className="p-4 rounded-md border border-hairline bg-surface-1 hover:bg-surface-2 transition-colors flex items-center justify-between"
        >
          <div>
            <span className="text-xs font-mono font-bold text-accent block">
              Formula Vault
            </span>
            <span className="text-xs text-ink-2">
              Essential mathematical equations & bounds
            </span>
          </div>
          <span className="text-accent text-sm font-mono">&rarr;</span>
        </Link>

        <Link
          href="/notes/cheat-sheets"
          className="p-4 rounded-md border border-hairline bg-surface-1 hover:bg-surface-2 transition-colors flex items-center justify-between"
        >
          <div>
            <span className="text-xs font-mono font-bold text-ink-1 block">
              Panic Reference Sheets
            </span>
            <span className="text-xs text-ink-2">
              High-density rapid review summaries
            </span>
          </div>
          <span className="text-ink-1 text-sm font-mono">&rarr;</span>
        </Link>

        <Link
          href="/notes/pyqs"
          className="p-4 rounded-md border border-hairline bg-surface-1 hover:bg-surface-2 transition-colors flex items-center justify-between"
        >
          <div>
            <span className="text-xs font-mono font-bold text-ink-1 block">
              Verified Examination PYQs
            </span>
            <span className="text-xs text-ink-2">
              Official problems with step-by-step solutions
            </span>
          </div>
          <span className="text-ink-3 text-sm font-mono">&rarr;</span>
        </Link>
      </div>

      {/* Subject-Wise Exam Lenses Grid */}
      <div className="space-y-4 mb-8">
        <div className="flex items-center justify-between border-b border-hairline pb-2">
          <h2 className="text-lg font-bold text-ink-1">
            Subject-Wise GATE Lenses & Weightage
          </h2>
          <span className="text-xs font-mono text-ink-3">
            Click any subject to open its GATE Exam Lens
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {LEARNING_TRACKS.map((subject) => {
            const gateMeta = GATE_WEIGHTAGE_DATA[subject.slug] ?? {
              marks: "5–8 Marks",
              highYield: "Core concepts & PYQs",
              tier: "Tier 2",
            };

            return (
              <Card
                key={subject.id}
                href={`/notes/${subject.slug}?view=gate`}
                padding="none"
                className="h-full hover:border-accent/40"
              >
                <div className="p-5 md:p-6 flex flex-col h-full justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-accent/15 text-accent-soft border border-accent/25">
                        {gateMeta.marks}
                      </span>
                      <span className="text-[10px] font-mono text-ink-3">
                        {gateMeta.tier}
                      </span>
                    </div>

                    <div className="flex items-start gap-2.5 mb-2">
                      <span
                        aria-hidden="true"
                        className={cx(
                          "mt-1 h-2.5 w-2.5 shrink-0 rounded-full",
                          subject.color
                        )}
                      />
                      <h3 className="font-bold text-ink-1 text-base leading-snug">
                        {subject.title}
                      </h3>
                    </div>

                    <p className="text-xs text-ink-2 leading-relaxed mb-4">
                      {subject.tagline}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-hairline/60">
                    <span className="text-[10px] font-mono text-ink-3 uppercase block mb-1">
                      High-Yield Subtopics:
                    </span>
                    <p className="text-xs font-mono text-ink-1 line-clamp-2">
                      {gateMeta.highYield}
                    </p>
                    <div className="mt-3 flex items-center justify-between text-xs font-mono text-accent">
                      <span>Open GATE Lens →</span>
                      <span>🎯 PYQs</span>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </main>
  );
}
