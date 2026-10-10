import Link from "next/link";
import { LEARNING_TRACKS } from "../../../lib/notes";
import PageHeader from "../../components/ui/PageHeader";
import { pageMetadata } from "../../../lib/seo";
import type { Metadata } from "next";
import GateSubjectFilterGrid, { GateWeightageItem } from "./GateSubjectFilterGrid";

export const metadata: Metadata = pageMetadata({
  title: "GATE CS/IT & DA Preparation Hub",
  description:
    "Exam-oriented preparation for GATE Computer Science (CS/IT) and Data Science & Artificial Intelligence (DA): subject-wise marks distribution, high-yield topics, formula sheets, and verified PYQs.",
  path: "/notes/gate",
});

const GATE_WEIGHTAGE_DATA: Record<string, GateWeightageItem> = {
  // ── GATE CS/IT & Common ──
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
    highYield: "B+ Tree index calculations, Normal Forms (BCNF, 3NF), Conflict Serializable schedules, Data Warehousing",
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

  // ── GATE Data Science & AI (DA) Specific ──
  "probability-and-statistics": {
    marks: "12–15 Marks",
    highYield: "Bayes' Theorem, Conditional Expectation, Normal/Poisson Distributions, Hypothesis Testing (t-test, z-test, p-value)",
    tier: "Tier 1 (High Yield)",
  },
  "linear-algebra": {
    marks: "10–12 Marks",
    highYield: "Vector Spaces & Subspaces, SVD Factorization, Eigenvalues & Cayley-Hamilton, Projections & Least Squares",
    tier: "Tier 1 (High Yield)",
  },
  "calculus-and-optimization": {
    marks: "8–10 Marks",
    highYield: "Gradient Descent & step size, Hessian Matrix, Convex Sets & Functions, Lagrange Multipliers",
    tier: "Tier 2",
  },
  "machine-learning": {
    marks: "14–18 Marks",
    highYield: "Bias-Variance Tradeoff, SVM Max-Margin & Kernels, Decision Tree Information Gain, Cross-Entropy Loss, ROC-AUC",
    tier: "Tier 1 (High Yield)",
  },
  "artificial-intelligence": {
    marks: "8–10 Marks",
    highYield: "A* Admissible & Consistent Heuristics, Alpha-Beta Pruning, Minimax Game Trees, Propositional Inference",
    tier: "Tier 2",
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
          <li className="text-ink-1 font-semibold">GATE CS/IT & DA Hub</li>
        </ol>
      </nav>

      <PageHeader
        eyebrow="GATE CS/IT & DATA SCIENCE & AI (DA) EXAMINATION HUB"
        title="GATE Strategy, Subject Lenses & Weightage"
        description="Dual-track exam-oriented preparation for both GATE CS/IT (13 subjects) and GATE Data Science & Artificial Intelligence (DA, 8 subjects). Filter by curriculum branch, inspect high-yield numerical patterns, and dive directly into verified PYQs."
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

        <GateSubjectFilterGrid
          subjects={LEARNING_TRACKS}
          weightageData={GATE_WEIGHTAGE_DATA}
        />
      </div>
    </main>
  );
}

