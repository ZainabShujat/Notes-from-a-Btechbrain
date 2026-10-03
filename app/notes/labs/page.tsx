import Link from "next/link";
import PageHeader from "../../components/ui/PageHeader";
import { pageMetadata } from "../../../lib/seo";

export const metadata = pageMetadata({
  title: "Interactive Operating Systems Laboratories & Simulators",
  description:
    "Explore 8 hands-on OS simulators: Banker's algorithm, CPU scheduling Gantt charts, 7-state process machines, page replacement, and disk trajectories.",
  path: "/notes/labs",
});

const OS_LABS = [
  {
    id: "bankers-algorithm",
    title: "Banker's Algorithm Safe State & Sequence Finder",
    module: "Module 5: Deadlocks",
    lessonSlug: "deadlock-principles-and-bankers",
    description:
      "Interactive multi-resource matrix calculator. Dynamically adjust Allocation, Max, and Available vectors to trace safe sequences and detect deadlock-prone unsafe states step-by-step.",
    tags: ["Deadlock Avoidance", "Safe State", "Matrix Arithmetic", "GATE Numerical"],
    features: ["Matrix computation", "Step-by-step execution", "Deadlock trap check"],
  },
  {
    id: "cpu-scheduler",
    title: "CPU Scheduling Gantt Chart & Metrics Simulator",
    module: "Module 3: CPU Scheduling",
    lessonSlug: "cpu-scheduling-algorithms-fcfs-sjf-rr",
    description:
      "Simulate FCFS, SJF (Preemptive/Non-preemptive), and Round Robin with adjustable time quanta. Visualizes the Gantt chart, ready queue, and computes exact average Waiting Time (WT) and Turnaround Time (TAT).",
    tags: ["Round Robin", "SJF/SRTF", "Gantt Chart", "Response Ratio"],
    features: ["Interactive time quantum", "Animated Gantt chart", "Average metric breakdown"],
  },
  {
    id: "process-state-machine",
    title: "5-State vs 7-State Process Lifecycle Machine",
    module: "Module 2: Processes & Concurrency",
    lessonSlug: "process-states-and-transitions",
    description:
      "Explore process transitions between New, Ready, Running, Waiting, Terminated, Suspend-Ready, and Suspend-Blocked. Traces memory swapping between RAM and swap space.",
    tags: ["State Transitions", "Suspend-Ready", "Memory Swapping", "Medium-Term Scheduler"],
    features: ["State transition machine", "Swap space visualizer", "Event trigger testing"],
  },
  {
    id: "dual-mode-flow",
    title: "Dual-Mode Execution & System Call Boundary Visualizer",
    module: "Module 1: OS Foundations",
    lessonSlug: "dual-mode-and-system-calls",
    description:
      "Step through the hardware mode bit transition (0 for kernel mode, 1 for user mode), trap instruction issuance, interrupt vector table (IVT) indexing, and safe return to user space.",
    tags: ["Mode Bit", "Trap Instruction", "Interrupt Vector Table", "Privilege Rings"],
    features: ["Hardware mode bit toggle", "Register preservation", "Ring 0 vs Ring 3"],
  },
  {
    id: "page-replacement",
    title: "Page Replacement Simulator (FIFO, LRU, Optimal)",
    module: "Module 7: Virtual Memory",
    lessonSlug: "virtual-memory-and-page-replacement",
    description:
      "Simulate page fault rates across FIFO, Least Recently Used (LRU), and Optimal algorithms on custom reference strings. Directly verify Belady's Anomaly by changing frame counts.",
    tags: ["FIFO vs LRU vs Optimal", "Belady's Anomaly", "Page Fault Rate", "Stack Algorithms"],
    features: ["Reference string input", "Frame size adjustment", "Page hit/miss telemetry"],
  },
  {
    id: "disk-scheduling",
    title: "Disk Head Trajectory & Seek Distance Simulator",
    module: "Module 9: I/O & Storage",
    lessonSlug: "disk-scheduling-algorithms",
    description:
      "Trace mechanical arm movement across disk cylinders for FCFS, SSTF, SCAN, C-SCAN, and LOOK algorithms. Calculates total cylinder seek distance and boundary turnaround points.",
    tags: ["SCAN / C-SCAN", "SSTF Seek Time", "Total Head Movement", "Starvation Analysis"],
    features: ["Cylinder trajectory plotting", "Seek distance calculation", "Algorithm comparison"],
  },
  {
    id: "semaphore-tracker",
    title: "Counting & Binary Semaphore Resource Tracker",
    module: "Module 4: Concurrency",
    lessonSlug: "process-synchronization-and-semaphores",
    description:
      "Visualizes the wait queue and value changes for P(S) and V(S) operations. Demonstrates how semaphores maintain mutual exclusion and prevent race conditions in critical sections.",
    tags: ["Semaphores", "Mutual Exclusion", "Wait Queue", "Critical Section"],
    features: ["Wait / Signal operations", "Queue blockage simulation", "Bounded buffer testing"],
  },
  {
    id: "context-switching",
    title: "Context Switching PCB Snapshot Visualizer",
    module: "Module 2: Processes & Concurrency",
    lessonSlug: "context-switching-and-pcb",
    description:
      "Shows how the operating system saves process registers, program counter, and stack pointers into the Process Control Block (PCB) before restoring the next ready process.",
    tags: ["Process Control Block", "Context Switch Cost", "Register State", "TLB Flush"],
    features: ["PCB memory layout", "Switch overhead timeline", "Hardware state preservation"],
  },
];

const DBMS_LABS = [
  {
    id: "serializability-checker",
    title: "Precedence Graph & Conflict Serializability Checker",
    module: "Module 7: Transactions & Concurrency",
    courseSlug: "dbms",
    lessonSlug: "transactions-and-serializability",
    description:
      "Interactive conflict serializability analyzer. Detects conflicting read/write pairs across concurrent transactions, builds the directed precedence graph, spots cycles, and computes the equivalent topological serial schedule.",
    tags: ["Conflict Serializability", "Precedence Graph", "Cycle Detection", "Topological Sort"],
    features: ["Interactive schedule presets", "Real-time conflicting pair detection", "Cycle isolation & topological sort"],
  },
  {
    id: "b-plus-tree-calc",
    title: "B+ Tree Node Order, Capacity & Height Calculator",
    module: "Module 6: Storage & Indexing",
    courseSlug: "dbms",
    lessonSlug: "b-plus-trees-and-indexing",
    description:
      "Solve the exact algebraic inequalities for internal node order p and leaf node order m based on block, key, and pointer sizes. Estimates tree height and disk block I/O accesses for tables.",
    tags: ["B+ Tree Orders", "Block Inequality", "Tree Height", "Disk I/O Cost"],
    features: ["Internal order inequality solver", "Leaf order inequality solver", "Multi-level table capacity estimator"],
  },
  {
    id: "normalization-analyzer",
    title: "Functional Dependency, Candidate Key & Normalization Engine",
    module: "Module 5: Normalization",
    courseSlug: "dbms",
    lessonSlug: "functional-dependencies-and-normalization",
    description:
      "Interactive relational schema evaluator. Compute live attribute closures (X+), derive all minimal candidate keys, and check relations against 1NF, 2NF, 3NF, and BCNF with violation callouts.",
    tags: ["Attribute Closure", "Candidate Keys", "Armstrong's Axioms", "BCNF vs 3NF"],
    features: ["Live attribute closure calculator", "Minimal candidate key generator", "Normal form evaluation breakdown"],
  },
];

export default function LabsPage() {
  const ALL_LABS = [
    ...OS_LABS.map((l) => ({ ...l, courseSlug: "operating-systems", subjectName: "Operating Systems" })),
    ...DBMS_LABS.map((l) => ({ ...l, subjectName: "Database Management Systems" })),
  ];

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
            <Link href="/notes/btech" className="hover:text-ink-1 transition-colors">
              Practice
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-ink-1 font-semibold">Interactive Laboratories</li>
        </ol>
      </nav>

      <PageHeader
        eyebrow="HANDS-ON SIMULATION · LEARN BY DOING"
        title="Interactive Laboratories & Visualizers"
        description="Step-by-step interactive concept simulators embedded directly into the course curriculum. Experiment with scheduling parameters, memory allocations, precedence graphs, and indexing trees in real time."
      />

      {/* Subject Filter Bar */}
      <div className="flex flex-wrap items-center gap-2 mb-8 pb-4 border-b border-hairline text-xs font-mono">
        <span className="text-ink-3 text-[11px] font-bold uppercase tracking-wider mr-1">
          ACTIVE SUBJECTS:
        </span>
        <span className="px-3 py-1.5 rounded bg-accent text-white font-semibold shadow-2xs">
          Operating Systems ({OS_LABS.length} Labs)
        </span>
        <span className="px-3 py-1.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/40 font-semibold shadow-2xs">
          DBMS ({DBMS_LABS.length} Labs)
        </span>
        <span className="px-3 py-1.5 rounded bg-surface-2 text-ink-3 border border-hairline/60">
          COA (In Development)
        </span>
        <span className="px-3 py-1.5 rounded bg-surface-2 text-ink-3 border border-hairline/60">
          Digital Logic (In Development)
        </span>
        <span className="px-3 py-1.5 rounded bg-surface-2 text-ink-3 border border-hairline/60">
          Computer Networks (In Development)
        </span>
      </div>

      {/* Labs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {ALL_LABS.map((lab, idx) => (
          <div
            key={lab.id}
            className="p-5 sm:p-6 rounded-xl border border-hairline bg-surface-1/70 backdrop-blur-xs flex flex-col justify-between space-y-4 shadow-2xs hover:border-accent/40 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between gap-2 border-b border-hairline/60 pb-2.5 mb-3">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-accent">
                  LAB 0{idx + 1} &middot; {lab.module}
                </span>
                <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-accent/15 text-accent font-semibold uppercase">
                  Interactive
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-ink-1 mb-2 font-sans leading-snug">
                {lab.title}
              </h3>

              <p className="text-xs sm:text-sm text-ink-2 leading-relaxed mb-4">
                {lab.description}
              </p>

              {/* Feature Highlights */}
              <div className="space-y-1 mb-4">
                {lab.features.map((feat, fIdx) => (
                  <div key={fIdx} className="flex items-center gap-2 text-xs font-mono text-ink-3">
                    <span className="text-accent">&check;</span>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-hairline/60 flex items-center justify-between">
              <div className="flex flex-wrap gap-1.5">
                {lab.tags.slice(0, 2).map((t, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-[10px] font-mono text-ink-3 px-1.5 py-0.5 rounded bg-surface-2"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <Link
                href={`/notes/${lab.courseSlug}/${lab.lessonSlug}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-accent text-white font-mono text-xs font-semibold hover:bg-accent/90 transition-colors cursor-pointer"
              >
                <span>Launch Lab</span>
                <span>&rarr;</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
