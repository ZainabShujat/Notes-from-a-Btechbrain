"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cx } from "./ui/cx";

/**
 * Subject-first Notes mega-menu dropdown for desktop navigation.
 * 
 * In accordance with the "Student Notebooks" architectural direction:
 * Primary object: SUBJECT NOTEBOOKS (the user's first choice).
 * Secondary: Cross-subject shortcuts (Labs, PYQs, Revision).
 */

const NOTEBOOKS_CS = [
  {
    num: "01",
    title: "Operating Systems",
    slug: "operating-systems",
    desc: "Kernel mode, CPU scheduling, concurrency, paging & inodes",
  },
  {
    num: "02",
    title: "Database Management Systems",
    slug: "dbms",
    desc: "Relational algebra, SQL, normalization, B+ trees & ACID",
  },
  {
    num: "03",
    title: "Computer Networks",
    slug: "computer-networks",
    desc: "Layering, packet delays, CRC, sliding window, CIDR & TCP",
  },
  {
    num: "04",
    title: "Computer Organization & Arch.",
    slug: "computer-organization",
    desc: "Addressing modes, IEEE 754, caches, pipelining & DMA",
  },
  {
    num: "05",
    title: "Theory of Computation",
    slug: "theory-of-computation",
    desc: "DFAs, pumping lemma, CFGs, Turing machines & Rice's theorem",
  },
  {
    num: "06",
    title: "Programming in C",
    slug: "programming-in-c",
    desc: "Pointers, 2D array decay, recursion stack & structure padding",
  },
  {
    num: "07",
    title: "Discrete Mathematics",
    slug: "discrete-mathematics",
    desc: "Predicate logic, relations, POSETs, graph coloring & planarity",
  },
  {
    num: "08",
    title: "Data Structures",
    slug: "data-structures",
    desc: "Trees, heaps, graphs, hashing & priority queues",
  },
  {
    num: "09",
    title: "Algorithms",
    slug: "algorithms",
    desc: "Asymptotic analysis, divide & conquer, greedy, DP & graphs",
  },
  {
    num: "10",
    title: "Compiler Design",
    slug: "compiler-design",
    desc: "Lexing, LL/LR parsing tables, SDT & code generation",
  },
  {
    num: "11",
    title: "Digital Logic",
    slug: "digital-logic",
    desc: "Boolean algebra, K-maps, multiplexers & sequential flip-flops",
  },
  {
    num: "12",
    title: "Engineering Mathematics",
    slug: "engineering-mathematics",
    desc: "Linear algebra, eigenvalues, calculus & probability",
  },
  {
    num: "13",
    title: "General Aptitude",
    slug: "general-aptitude",
    desc: "Numerical ability, verbal reasoning & spatial logic",
  },
];

const NOTEBOOKS_DA = [
  {
    num: "01",
    title: "General Aptitude",
    slug: "general-aptitude",
    desc: "Numerical ability, verbal reasoning & spatial logic",
  },
  {
    num: "02",
    title: "Probability & Statistics",
    slug: "probability-and-statistics",
    desc: "Bayes' theorem, random variables, hypothesis testing & p-values",
  },
  {
    num: "03",
    title: "Linear Algebra",
    slug: "linear-algebra",
    desc: "Vector spaces, SVD, eigenvalues, projections & PCA foundations",
  },
  {
    num: "04",
    title: "Calculus & Optimization",
    slug: "calculus-and-optimization",
    desc: "Gradient descent, Hessian matrix, convexity & Lagrange multipliers",
  },
  {
    num: "05",
    title: "Programming, DS & Algo",
    slug: "algorithms",
    desc: "Python/C constructs, stacks, trees, sorting & dynamic programming",
  },
  {
    num: "06",
    title: "Database Mgmt. & Warehousing",
    slug: "dbms",
    desc: "ER models, relational algebra, SQL, normalization & data warehousing",
  },
  {
    num: "07",
    title: "Machine Learning",
    slug: "machine-learning",
    desc: "Supervised & unsupervised, SVMs, decision trees, cross-entropy & ROC",
  },
  {
    num: "08",
    title: "Artificial Intelligence",
    slug: "artificial-intelligence",
    desc: "Heuristic search, A*, minimax game trees & propositional logic",
  },
];

export default function NotesDropdown() {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"cs" | "da">("cs");
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isActive = pathname.startsWith("/notes");
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);


  // Close when route changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Close when clicking outside
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  const handleMouseEnter = () => {
    clearTimeout(closeTimeoutRef.current);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => setOpen(false), 200);
  };

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        href="/notes"
        onClick={() => setOpen(false)}
        className={cx(
          "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors cursor-pointer",
          isActive
            ? "text-ink-1 bg-surface-2/80 font-semibold"
            : "text-ink-2 hover:text-ink-1 hover:bg-surface-2/50"
        )}
        aria-expanded={open}
        aria-haspopup="true"
      >
        <span>Notes</span>
        <svg
          className={cx(
            "w-3.5 h-3.5 text-ink-3 transition-transform duration-200",
            open && "rotate-180 text-ink-1"
          )}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </Link>

      {/* Mega-Menu Panel */}
      {open && (
        <div
          className={cx(
            "absolute left-1/2 -translate-x-1/2 top-full pt-2 z-50",
            "w-[760px] max-w-[calc(100vw-2rem)]",
            "animate-in fade-in-0 zoom-in-95 duration-150"
          )}
          role="menu"
          aria-label="Notes by Subject"
        >
          <div className="rounded-xl border border-hairline bg-raised shadow-2xl p-5 overflow-hidden">
            {/* Header: Editorial Subject-First Eyebrow & Branch Switcher */}
            <div className="flex items-center justify-between border-b border-hairline pb-3 mb-3.5">
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-mono font-bold tracking-widest text-accent uppercase">
                  THE NOTEBOOKS
                </span>
                {/* Branch Switcher Tabs */}
                <div className="inline-flex p-0.5 rounded-md bg-surface-2 border border-hairline">
                  <button
                    onClick={() => setActiveTab("cs")}
                    className={cx(
                      "px-2.5 py-0.5 rounded text-[11px] font-mono font-semibold transition-all cursor-pointer",
                      activeTab === "cs"
                        ? "bg-raised text-blue-600 dark:text-blue-400 shadow-xs"
                        : "text-ink-2 hover:text-ink-1"
                    )}
                  >
                    GATE CS/IT (13)
                  </button>
                  <button
                    onClick={() => setActiveTab("da")}
                    className={cx(
                      "px-2.5 py-0.5 rounded text-[11px] font-mono font-semibold transition-all cursor-pointer",
                      activeTab === "da"
                        ? "bg-raised text-purple-600 dark:text-purple-400 shadow-xs"
                        : "text-ink-2 hover:text-ink-1"
                    )}
                  >
                    GATE AI & DA (8)
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href="/notes/gate"
                  className="text-xs font-mono font-semibold text-accent hover:underline flex items-center gap-1"
                >
                  <span>GATE Hub</span>
                  <span aria-hidden="true">&rarr;</span>
                </Link>
                <span className="text-hairline">|</span>
                <Link
                  href="/notes"
                  className="text-xs font-mono text-ink-3 hover:text-ink-1 flex items-center gap-1"
                >
                  <span>All Shelf</span>
                </Link>
              </div>
            </div>

            {/* Two Column Subject Grid for Active Branch */}
            {activeTab === "cs" ? (
              <div className="grid grid-cols-2 gap-x-6 gap-y-1">
                {/* CS Column 1 */}
                <div className="space-y-1">
                  {NOTEBOOKS_CS.slice(0, 7).map((nb) => (
                    <Link
                      key={nb.slug}
                      href={`/notes/${nb.slug}`}
                      className="group block px-2.5 py-1.5 rounded-lg hover:bg-surface-2/60 transition-colors"
                    >
                      <div className="flex items-baseline gap-2">
                        <span className="font-mono text-[10px] text-ink-3 group-hover:text-accent font-semibold">
                          {nb.num}
                        </span>
                        <span className="text-xs font-semibold text-ink-1 group-hover:text-accent transition-colors font-sans truncate">
                          {nb.title}
                        </span>
                      </div>
                      <p className="text-[11px] text-ink-3 truncate pl-5">
                        {nb.desc}
                      </p>
                    </Link>
                  ))}
                </div>

                {/* CS Column 2 */}
                <div className="space-y-1">
                  {NOTEBOOKS_CS.slice(7).map((nb) => (
                    <Link
                      key={nb.slug}
                      href={`/notes/${nb.slug}`}
                      className="group block px-2.5 py-1.5 rounded-lg hover:bg-surface-2/60 transition-colors"
                    >
                      <div className="flex items-baseline gap-2">
                        <span className="font-mono text-[10px] text-ink-3 group-hover:text-accent font-semibold">
                          {nb.num}
                        </span>
                        <span className="text-xs font-semibold text-ink-1 group-hover:text-accent transition-colors font-sans truncate">
                          {nb.title}
                        </span>
                      </div>
                      <p className="text-[11px] text-ink-3 truncate pl-5">
                        {nb.desc}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-x-6 gap-y-1">
                {/* DA Column 1 */}
                <div className="space-y-1">
                  {NOTEBOOKS_DA.slice(0, 4).map((nb) => (
                    <Link
                      key={nb.slug + nb.num}
                      href={`/notes/${nb.slug}`}
                      className="group block px-2.5 py-1.5 rounded-lg hover:bg-surface-2/60 transition-colors"
                    >
                      <div className="flex items-baseline gap-2">
                        <span className="font-mono text-[10px] text-purple-600 dark:text-purple-400 group-hover:text-accent font-semibold">
                          {nb.num}
                        </span>
                        <span className="text-xs font-semibold text-ink-1 group-hover:text-purple-500 transition-colors font-sans truncate">
                          {nb.title}
                        </span>
                      </div>
                      <p className="text-[11px] text-ink-3 truncate pl-5">
                        {nb.desc}
                      </p>
                    </Link>
                  ))}
                </div>

                {/* DA Column 2 */}
                <div className="space-y-1">
                  {NOTEBOOKS_DA.slice(4).map((nb) => (
                    <Link
                      key={nb.slug + nb.num}
                      href={`/notes/${nb.slug}`}
                      className="group block px-2.5 py-1.5 rounded-lg hover:bg-surface-2/60 transition-colors"
                    >
                      <div className="flex items-baseline gap-2">
                        <span className="font-mono text-[10px] text-purple-600 dark:text-purple-400 group-hover:text-accent font-semibold">
                          {nb.num}
                        </span>
                        <span className="text-xs font-semibold text-ink-1 group-hover:text-purple-500 transition-colors font-sans truncate">
                          {nb.title}
                        </span>
                      </div>
                      <p className="text-[11px] text-ink-3 truncate pl-5">
                        {nb.desc}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Secondary Cross-Subject Shortcuts Footer */}
            <div className="mt-4 pt-3 border-t border-hairline flex items-center justify-between text-xs font-mono text-ink-3">
              <span className="text-[11px] uppercase tracking-wider text-ink-3">
                Cross-Notebook Tools:
              </span>
              <div className="flex items-center gap-3">
                <Link
                  href="/notes/labs"
                  className="hover:text-ink-1 transition-colors text-[11px]"
                >
                  Interactive Labs
                </Link>
                <span>&middot;</span>
                <Link
                  href="/notes/pyqs"
                  className="hover:text-ink-1 transition-colors text-[11px]"
                >
                  Verified PYQs
                </Link>
                <span>&middot;</span>
                <Link
                  href="/notes/cheat-sheets"
                  className="hover:text-ink-1 transition-colors text-[11px]"
                >
                  Cheat Sheets
                </Link>
                <span>&middot;</span>
                <Link
                  href="/notes/quick-revision"
                  className="hover:text-ink-1 transition-colors text-[11px]"
                >
                  10-Min Revision
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
