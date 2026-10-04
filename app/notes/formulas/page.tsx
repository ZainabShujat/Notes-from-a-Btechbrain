import Link from "next/link";
import PageHeader from "../../components/ui/PageHeader";
import { pageMetadata } from "../../../lib/seo";

export const metadata = pageMetadata({
  title: "Operating Systems Mathematical Formula Vault",
  description:
    "Complete compilation of Operating Systems formulas for GATE CS: EMAT, page table levels, deadlock-free resources, CPU scheduling metrics, and Unix Inode size.",
  path: "/notes/formulas",
});

const FORMULA_GROUPS = [
  {
    category: "Memory Management & Paging",
    formulas: [
      {
        name: "Effective Memory Access Time (EMAT) with TLB",
        equation: "EMAT = h · (t_tlb + t_m) + (1 - h) · (t_tlb + (k + 1) · t_m)",
        variables: [
          "h = TLB Hit Ratio (between 0.0 and 1.0)",
          "t_tlb = TLB lookup / search time (e.g. 10–20 ns)",
          "t_m = Main memory (RAM) access time (e.g. 100 ns)",
          "k = Number of page table levels (k=1 for single-level, k=2 for two-level, etc.)",
        ],
        notes:
          "On a TLB hit, the CPU accesses TLB then RAM once: (t_tlb + t_m). On a TLB miss, the CPU accesses TLB, traverses all k levels of page tables in RAM, and then accesses the actual data in RAM: (t_tlb + (k + 1) · t_m).",
      },
      {
        name: "Parallel TLB Lookup Variant",
        equation: "EMAT = h · (t_m) + (1 - h) · (t_tlb + (k + 1) · t_m)",
        variables: [
          "Used when the problem states TLB and Cache/RAM are looked up simultaneously.",
        ],
        notes: "Carefully check if the exam question states sequential search or parallel lookup.",
      },
      {
        name: "Page Table & Address Translation Invariants",
        equation: "Number of Pages = 2^(Logical Address Bits - Offset Bits) = LAS / Page Size",
        variables: [
          "LAS = Logical Address Space",
          "Offset bits d = log2(Page Size in bytes)",
          "Frame bits f = log2(PAS / Page Size) where PAS = Physical Address Space",
          "Page Table Size = Number of Pages · Page Table Entry (PTE) size",
        ],
        notes: "Page size and Frame size are always strictly identical.",
      },
    ],
  },
  {
    category: "Deadlocks & Resource Allocation",
    formulas: [
      {
        name: "Deadlock-Free Resource Condition (Pigeonhole Invariant)",
        equation: "M ≥ N · (K - 1) + 1",
        variables: [
          "M = Minimum total instances of the resource required to guarantee NO deadlock",
          "N = Total number of active concurrent processes",
          "K = Maximum resource demand of each process (each process requires at most K units)",
        ],
        notes:
          "Worst-case deadlock allocation happens when all N processes hold K-1 instances and wait for the last unit (total allocated = N · (K - 1)). Adding 1 more unit ensures at least one process can finish.",
      },
      {
        name: "Heterogeneous Demands Deadlock Bound",
        equation: "M ≥ ∑ (Max_Demand(P_i) - 1) + 1",
        variables: [
          "Used when processes have differing maximum resource demands K1, K2, ..., Kn.",
        ],
        notes: "Sum the (Max - 1) for every individual process, then add 1.",
      },
      {
        name: "Banker's Algorithm Need Matrix",
        equation: "Need[i][j] = Max[i][j] - Allocation[i][j]",
        variables: [
          "Work Vector initially = Available Vector",
          "Process P_i is safe if: Need[i] ≤ Work",
          "New Work = Work + Allocation[i]",
        ],
        notes: "Once P_i finishes, it releases ALL its currently allocated resources back to Work.",
      },
    ],
  },
  {
    category: "CPU Scheduling Metrics",
    formulas: [
      {
        name: "Turnaround Time (TAT)",
        equation: "TAT = CT - AT",
        variables: [
          "CT = Completion Time (exact moment process finishes all execution)",
          "AT = Arrival Time (exact moment process enters the Ready queue)",
        ],
        notes: "Always find CT from the completed Gantt chart first, then subtract AT.",
      },
      {
        name: "Waiting Time (WT)",
        equation: "WT = TAT - BT",
        variables: [
          "BT = CPU Burst Time (total execution time required by the process)",
          "TAT = Turnaround Time",
        ],
        notes: "Waiting time is the total idle time spent in the Ready queue waiting for CPU.",
      },
      {
        name: "Highest Response Ratio Next (HRRN)",
        equation: "Response Ratio = (W + S) / S = 1 + (W / S)",
        variables: [
          "W = Waiting time spent in ready queue so far",
          "S = Expected CPU service / burst time",
        ],
        notes: "Prevents starvation of long processes while still favoring shorter jobs.",
      },
    ],
  },
  {
    category: "Process Synchronization & Semaphores",
    formulas: [
      {
        name: "Semaphore Value Balance Equation",
        equation: "Final S = Initial S - (Number of P operations) + (Number of V operations)",
        variables: [
          "P(S) or wait(S): decrements S by 1",
          "V(S) or signal(S): increments S by 1",
          "If Final S < 0, exactly |Final S| processes are currently blocked in the queue",
          "If Final S ≥ 0, exactly 0 processes are blocked in the queue",
        ],
        notes: "Tested every year in GATE to verify blocked process counts.",
      },
    ],
  },
  {
    category: "Storage Systems & Disk Scheduling",
    formulas: [
      {
        name: "Total Head Movement (Seek Distance)",
        equation: "Total Seek = ∑ |Cylinder_{current} - Cylinder_{next}|",
        variables: [
          "Evaluated sequentially across the servicing order determined by the algorithm (SSTF, SCAN, LOOK, C-SCAN, C-LOOK).",
        ],
        notes: "SCAN travels to the end boundary cylinder (0 or Max-1); LOOK only travels to the furthest request.",
      },
      {
        name: "Unix Inode Maximum File Size Formula",
        equation: "Max File Size = (Direct + Indirect · P + DoubleIndirect · P² + TripleIndirect · P³) · BlockSize",
        variables: [
          "P = Number of disk block pointers per block = Block Size / Pointer Size",
          "Direct = Number of direct block pointers (typically 12)",
          "Indirect = Number of single indirect pointers (typically 1)",
          "DoubleIndirect = Number of double indirect pointers (typically 1)",
        ],
        notes: "Ensure all units are converted consistently to Bytes before multiplying by Block Size.",
      },
    ],
  },
];

export default function FormulaSheetsPage() {
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
          <li className="text-ink-1 font-semibold">Formula Sheets</li>
        </ol>
      </nav>

      <PageHeader
        eyebrow="MATHEMATICAL VAULT · GATE CS/IT"
        title="Operating Systems Formula Vault"
        description="Comprehensive mathematical compilation: exact formulas, variable definitions, boundary constraints, and practical calculation shortcuts."
      />

      {/* Subject Filter Bar */}
      <div className="flex flex-wrap items-center gap-2 mb-8 pb-4 border-b border-hairline text-xs font-mono">
        <span className="text-ink-3 text-[11px] font-bold uppercase tracking-wider mr-1">
          SUBJECT:
        </span>
        <span className="px-3 py-1.5 rounded bg-accent text-white font-semibold shadow-2xs">
          Operating Systems (All Formulas)
        </span>
        <span className="px-3 py-1.5 rounded bg-surface-2 text-ink-3 border border-hairline/60">
          Computer Architecture (Coming Soon)
        </span>
        <span className="px-3 py-1.5 rounded bg-surface-2 text-ink-3 border border-hairline/60">
          Algorithms (Coming Soon)
        </span>
        <span className="px-3 py-1.5 rounded bg-surface-2 text-ink-3 border border-hairline/60">
          Discrete Maths (Coming Soon)
        </span>
      </div>

      {/* Formula Sections */}
      <div className="space-y-10">
        {FORMULA_GROUPS.map((group, gIdx) => (
          <section key={gIdx} className="space-y-4">
            <div className="border-b border-hairline pb-2">
              <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-ink-1">
                {group.category}
              </h2>
            </div>

            <div className="space-y-4">
              {group.formulas.map((f, fIdx) => (
                <div
                  key={fIdx}
                  className="p-5 rounded-xl border border-hairline bg-surface-1/70 backdrop-blur-xs space-y-3 shadow-2xs"
                >
                  <h3 className="text-sm sm:text-base font-bold text-ink-1 font-sans">
                    {f.name}
                  </h3>

                  {/* Formula Box */}
                  <div className="p-3 rounded-lg bg-surface-2 border border-hairline/80 font-mono text-xs sm:text-sm font-bold text-accent overflow-x-auto">
                    <code>{f.equation}</code>
                  </div>

                  {/* Variables */}
                  <div className="space-y-1 pt-1">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-ink-3 block">
                      Variables &amp; Constraints:
                    </span>
                    <ul className="space-y-1 text-xs font-mono text-ink-2">
                      {f.variables.map((v, vIdx) => (
                        <li key={vIdx} className="flex items-start gap-2">
                          <span className="text-accent">&bull;</span>
                          <span>{v}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Practical Notes */}
                  {f.notes && (
                    <p className="text-xs text-ink-3 font-sans leading-relaxed pt-1 border-t border-hairline/60">
                      <strong>Exam Application:</strong> {f.notes}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
