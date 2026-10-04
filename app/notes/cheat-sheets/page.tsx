import Link from "next/link";
import PageHeader from "../../components/ui/PageHeader";
import { pageMetadata } from "../../../lib/seo";

export const metadata = pageMetadata({
  title: "Operating Systems Comprehensive Cheat Sheets",
  description:
    "Compact, scannable revision sheets for Operating Systems: CPU scheduling formulas, Coffman conditions, paging TLB EMAT, Banker's algorithm, and disk seek times.",
  path: "/notes/cheat-sheets",
});

const OS_CHEAT_SHEETS = [
  {
    id: "deadlocks-bankers",
    title: "Deadlocks & Banker's Algorithm Reference Sheet",
    module: "Module 5: Deadlocks",
    coreRules: [
      "4 Coffman Conditions must hold simultaneously: Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait.",
      "Deadlock Prevention removes at least ONE Coffman condition before execution.",
      "Deadlock Avoidance checks resource request dynamically (Banker's Algorithm).",
      "Deadlock-Free Bound: M ≥ N · (K - 1) + 1 where N = processes, K = max demand each, M = available resources.",
    ],
    formulas: [
      "Need[i][j] = Max[i][j] - Allocation[i][j]",
      "Safety Condition: Need[i] ≤ Work",
      "Work_new = Work_old + Allocation[i]",
    ],
    pitfalls: [
      "A cycle in a Resource Allocation Graph (RAG) is NOT sufficient for deadlock if multi-instance resources exist.",
      "Safe state guarantees NO deadlock; unsafe state MIGHT lead to deadlock, but is not automatically deadlocked.",
    ],
    lessonSlug: "deadlock-principles-and-bankers",
  },
  {
    id: "cpu-scheduling",
    title: "CPU Scheduling Algorithms & Metrics Reference Sheet",
    module: "Module 3: CPU Scheduling",
    coreRules: [
      "Turnaround Time (TAT) = Completion Time (CT) - Arrival Time (AT).",
      "Waiting Time (WT) = Turnaround Time (TAT) - Burst Time (BT).",
      "Response Time (RT) = Time when process first gets CPU - Arrival Time (AT).",
      "Shortest Job First (SJF) is mathematically optimal for minimum average WT.",
      "Round Robin performance depends heavily on time quantum q: if q is too large, it degrades to FCFS; if q is too small, context switch overhead dominates.",
    ],
    formulas: [
      "TAT = CT - AT",
      "WT = TAT - BT",
      "Highest Response Ratio Next (HRRN): Ratio = (W + S) / S",
    ],
    pitfalls: [
      "In Round Robin, always break arrival ties using process arrival order or lower PID, never assume random order.",
      "SRTF (Preemptive SJF) re-evaluates remaining time ONLY when a new process arrives or current completes.",
    ],
    lessonSlug: "cpu-scheduling-algorithms-fcfs-sjf-rr",
  },
  {
    id: "memory-paging",
    title: "Memory Management, Paging & TLB Reference Sheet",
    module: "Module 6: Memory Management",
    coreRules: [
      "Logical Address = Page Number (p) + Page Offset (d).",
      "Physical Address = Frame Number (f) + Page Offset (d).",
      "Page size MUST equal Frame size. Offset bits (d) are identical in logical and physical addresses.",
      "Number of Pages = Logical Address Space / Page Size.",
      "Page Table Size = Number of Pages · Page Table Entry (PTE) size.",
    ],
    formulas: [
      "EMAT = h · (t_tlb + t_m) + (1 - h) · (t_tlb + (k + 1) · t_m)",
      "k = Number of Page Table Levels (k=1 for single level, k=2 for two level)",
      "Offset bits d = log2(Page Size in bytes)",
    ],
    pitfalls: [
      "Do not forget that accessing the page table in RAM takes t_m time per level.",
      "If TLB lookup and memory access occur in parallel, formula changes to: EMAT = h · (t_m) + (1 - h) · (t_tlb + (k + 1) · t_m).",
    ],
    lessonSlug: "paging-and-multi-level-page-tables",
  },
  {
    id: "virtual-memory",
    title: "Virtual Memory & Page Replacement Reference Sheet",
    module: "Module 7: Virtual Memory",
    coreRules: [
      "Belady's Anomaly: For some page replacement algorithms (specifically FIFO), increasing the number of page frames can INCREASE the number of page faults.",
      "Stack algorithms (LRU, Optimal) CANNOT suffer from Belady's Anomaly because the set of pages in n frames is always a subset of pages in n+1 frames.",
      "Thrashing occurs when a process spends more time paging than executing (Sum of locality sizes > Total physical memory).",
    ],
    formulas: [
      "Effective Access Time = (1 - p) · t_m + p · (Page Fault Service Time)",
      "p = Page fault rate (typically < 0.001)",
    ],
    pitfalls: [
      "LRU requires hardware timestamp or stack support; clock algorithm (Second Chance) is its practical approximation.",
      "Optimal page replacement requires future knowledge and is used only as an impossible benchmark.",
    ],
    lessonSlug: "virtual-memory-and-page-replacement",
  },
  {
    id: "semaphores-concurrency",
    title: "Process Synchronization & Semaphores Reference Sheet",
    module: "Module 4: Concurrency",
    coreRules: [
      "3 Critical Section Requirements: Mutual Exclusion (mandatory), Progress (mandatory), Bounded Waiting (desirable).",
      "Counting Semaphore S: S > 0 indicates available resource units; S < 0 means |S| processes are currently blocked.",
      "Wait(S) or P(S): S = S - 1; if S < 0, block process.",
      "Signal(S) or V(S): S = S + 1; if S ≤ 0, wake one blocked process.",
    ],
    formulas: [
      "Final S = Initial S - (P operations) + (V operations)",
      "Blocked processes count = |S| when S < 0",
    ],
    pitfalls: [
      "Busy waiting semaphores (Spinlocks) waste CPU cycles; block-and-wake semaphores put processes into waiting state.",
      "Swapping the order of wait(mutex) and wait(empty) in Producer-Consumer causes immediate DEADLOCK.",
    ],
    lessonSlug: "process-synchronization-and-semaphores",
  },
  {
    id: "disk-storage",
    title: "Disk Scheduling & Unix Inode Reference Sheet",
    module: "Module 9: I/O & Storage",
    coreRules: [
      "FCFS: Serves requests in arrival order; high seek time.",
      "SSTF: Selects request closest to current head position; susceptible to starvation of distant requests.",
      "SCAN (Elevator): Moves in one direction servicing requests until the end boundary cylinder, then reverses.",
      "C-SCAN (Circular SCAN): Moves in one direction to the end cylinder, then jumps directly back to the opposite start cylinder without servicing on return.",
      "LOOK / C-LOOK: Like SCAN / C-SCAN, but only travels as far as the last request in each direction (no boundary travel).",
    ],
    formulas: [
      "Total Seek Distance = Sum of |Cylinder_{current} - Cylinder_{target}|",
      "Unix Inode Max File Size = (Direct + Indirect · BlockPointers + DoubleIndirect · BlockPointers² + TripleIndirect · BlockPointers³) · BlockSize",
    ],
    pitfalls: [
      "In SCAN and C-SCAN, make sure to include the boundary cylinder (0 or Max-1) if specified in the question.",
      "In LOOK and C-LOOK, NEVER travel to cylinder 0 or Max-1 unless there is an actual request at those cylinders.",
    ],
    lessonSlug: "disk-scheduling-algorithms",
  },
];

export default function CheatSheetsPage() {
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
          <li className="text-ink-1 font-semibold">Cheat Sheets</li>
        </ol>
      </nav>

      <PageHeader
        eyebrow="RAPID EXAM REFERENCE · 1-PAGE SUMMARIES"
        title="Operating Systems Cheat Sheets"
        description="High-density reference sheets designed for the student with 10 minutes before an exam. Review core invariants, calculation formulas, and subtle traps across every major topic."
      />

      {/* Subject Filter Bar */}
      <div className="flex flex-wrap items-center gap-2 mb-8 pb-4 border-b border-hairline text-xs font-mono">
        <span className="text-ink-3 text-[11px] font-bold uppercase tracking-wider mr-1">
          SUBJECT:
        </span>
        <span className="px-3 py-1.5 rounded bg-accent text-white font-semibold shadow-2xs">
          Operating Systems ({OS_CHEAT_SHEETS.length} Topic Sheets)
        </span>
        <span className="px-3 py-1.5 rounded bg-surface-2 text-ink-3 border border-hairline/60">
          DBMS (Coming Soon)
        </span>
        <span className="px-3 py-1.5 rounded bg-surface-2 text-ink-3 border border-hairline/60">
          Computer Networks (Coming Soon)
        </span>
        <span className="px-3 py-1.5 rounded bg-surface-2 text-ink-3 border border-hairline/60">
          COA (Coming Soon)
        </span>
      </div>

      {/* Sheets List */}
      <div className="space-y-8">
        {OS_CHEAT_SHEETS.map((sheet) => (
          <article
            key={sheet.id}
            id={sheet.id}
            className="p-6 rounded-xl border border-hairline bg-surface-1/70 backdrop-blur-xs space-y-5 shadow-2xs"
          >
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 border-b border-hairline/60 pb-3">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-accent block">
                  {sheet.module}
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-ink-1 font-sans">
                  {sheet.title}
                </h2>
              </div>

              <Link
                href={`/notes/operating-systems/${sheet.lessonSlug}`}
                className="text-xs font-mono text-ink-3 hover:text-accent transition-colors shrink-0"
              >
                Open Full Lesson &rarr;
              </Link>
            </div>

            {/* Core Invariants */}
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-ink-1 uppercase tracking-wider block">
                Must-Remember Principles:
              </span>
              <ul className="space-y-1.5 text-xs sm:text-sm text-ink-2 leading-relaxed">
                {sheet.coreRules.map((r, rIdx) => (
                  <li key={rIdx} className="flex items-start gap-2">
                    <span className="text-accent font-bold">&mdash;</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Formulas Box */}
            <div className="p-4 rounded-md border border-hairline bg-surface-2/60 space-y-2">
              <span className="text-xs font-mono font-bold text-accent uppercase tracking-wider block">
                Mathematical Formulas:
              </span>
              <div className="space-y-1.5 font-mono text-xs sm:text-[13px] text-ink-1">
                {sheet.formulas.map((f, fIdx) => (
                  <div
                    key={fIdx}
                    className="p-1.5 rounded bg-surface-3/40 border border-hairline/60"
                  >
                    <code>{f}</code>
                  </div>
                ))}
              </div>
            </div>

            {/* Common Pitfalls */}
            <div className="space-y-2 pt-1 border-t border-hairline/40">
              <span className="text-xs font-mono font-bold text-amber-500 uppercase tracking-wider block">
                Critical Pitfalls &amp; Exam Traps:
              </span>
              <ul className="space-y-1 text-xs text-ink-2">
                {sheet.pitfalls.map((p, pIdx) => (
                  <li key={pIdx} className="flex items-start gap-2">
                    <span className="text-rose-400 font-bold">&times;</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
