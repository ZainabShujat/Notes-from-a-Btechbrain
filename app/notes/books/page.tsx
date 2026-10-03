import Link from "next/link";
import PageHeader from "../../components/ui/PageHeader";
import { pageMetadata } from "../../../lib/seo";

export const metadata = pageMetadata({
  title: "Operating Systems Textbooks & Reference Guide",
  description:
    "Curated textbooks and academic references for Operating Systems: Silberschatz, OSTEP, Tanenbaum, and Stallings with chapter mappings for B.Tech & GATE.",
  path: "/notes/books",
});

interface BookResource {
  title: string;
  authors: string;
  edition: string;
  popularName: string;
  coverBadge: string;
  summary: string;
  bestFor: string;
  gateRelevance: string;
  keyChapters: string[];
  courseModuleLinks: { label: string; href: string }[];
  accessUrl?: string;
  accessLabel?: string;
}

const OS_TEXTBOOKS: BookResource[] = [
  {
    title: "Operating System Concepts",
    authors: "Abraham Silberschatz, Peter B. Galvin, Greg Gagne",
    edition: "10th Edition (Wiley)",
    popularName: "The Dinosaur Book",
    coverBadge: "Standard Reference",
    summary:
      "The undisputed gold standard across global computer science universities and national competitive exams. Balances high-level architectural abstractions with clean pseudo-code algorithms.",
    bestFor:
      "Every CS student starting Operating Systems. The baseline standard for all GATE CS theoretical definitions and standard nomenclature.",
    gateRelevance:
      "95% syllabus alignment. GATE problem setters frequently quote its exact definitions for state transitions, deadlock conditions, and paging invariants.",
    keyChapters: [
      "Ch 3: Processes (PCB, Context Switching, Inter-Process Communication)",
      "Ch 5: CPU Scheduling (FCFS, SJF, SRTF, Round Robin, Multilevel Queues)",
      "Ch 6 & 7: Synchronization Tools & Examples (Peterson's, Semaphores, Classic IPC)",
      "Ch 8: Deadlocks (4 Necessary Conditions, Resource Allocation Graphs, Banker's Safety)",
      "Ch 9 & 10: Main Memory & Virtual Memory (Paging, TLB, Page Faults, EMAT, FIFO/LRU/Optimal)",
      "Ch 11 & 14: Mass-Storage Structure & File System Internals (FCFS, SSTF, SCAN, Inodes)",
    ],
    courseModuleLinks: [
      { label: "OS Foundations", href: "/notes/operating-systems/why-operating-systems-exist" },
      { label: "Process Lifecycle", href: "/notes/operating-systems/process-lifecycle-and-states" },
      { label: "Deadlocks & Banker's", href: "/notes/operating-systems/deadlock-principles-and-bankers" },
      { label: "Memory Paging", href: "/notes/operating-systems/paging-and-address-translation" },
    ],
  },
  {
    title: "Operating Systems: Three Easy Pieces (OSTEP)",
    authors: "Remzi H. Arpaci-Dusseau & Andrea C. Arpaci-Dusseau",
    edition: "Version 1.10 (Open Access / Univ. of Wisconsin-Madison)",
    popularName: "OSTEP",
    coverBadge: "Free & Open Access",
    summary:
      "A masterpiece of pedagogical clarity structured around the three pillars of operating systems: Virtualization, Concurrency, and Persistence. Features clean, compilable C code examples and witty conceptual dialogs.",
    bestFor:
      "Engineers who want to actually understand how an OS executes code rather than memorizing definitions. Outstanding for product engineering interviews.",
    gateRelevance:
      "Invaluable for tricky multi-level paging translation arithmetic, address calculation corner cases, and concurrency race condition intuition.",
    keyChapters: [
      "Virtualization (Ch 4-23): Mechanism (Limited Direct Execution), CPU Scheduling, Address Spaces, Paging, TLBs, Multi-level Paging",
      "Concurrency (Ch 26-32): Thread API, Locks, Condition Variables, Semaphores, Concurrency Bugs",
      "Persistence (Ch 36-44): I/O Devices, Hard Disk Drives, File System Implementation, Crash Consistency, FSCK & Journaling",
    ],
    accessUrl: "https://pages.cs.wisc.edu/~remzi/OSTEP/",
    accessLabel: "Read Free Online (Official Author Website)",
    courseModuleLinks: [
      { label: "Dual-Mode Architecture", href: "/notes/operating-systems/dual-mode-and-system-calls" },
      { label: "Synchronization & Peterson's", href: "/notes/operating-systems/synchronization-and-petersons" },
      { label: "Virtual Memory & Inverted Paging", href: "/notes/operating-systems/virtual-memory-and-inverted-paging" },
    ],
  },
  {
    title: "Modern Operating Systems",
    authors: "Andrew S. Tanenbaum & Herbert Bos",
    edition: "4th Edition (Pearson)",
    popularName: "MOS",
    coverBadge: "Systems Rigor",
    summary:
      "Written by Andrew Tanenbaum (creator of MINIX, which inspired Linux), this text dives deep into low-level architectural reality, microkernel vs monolithic trade-offs, and hardware interaction.",
    bestFor:
      "Deep systems engineering, understanding the POSIX system call interface, and master's level OS coursework.",
    gateRelevance:
      "Exceptional for hardware-level interrupts, clock interrupts, TLB hardware vs software handling, and disk cylinder-head-sector geometry calculations.",
    keyChapters: [
      "Ch 2: Processes and Threads (Interprocess communication, Sleep & Wakeup, Race conditions)",
      "Ch 3: Memory Management (Swapping, Page replacement algorithms, Working set model)",
      "Ch 4: File Systems (Directory structures, Disk space management, Reliability)",
      "Ch 5: Input/Output (DMA controllers, Interrupt handlers, Device drivers)",
      "Ch 10 & 11: Case Studies (Linux & Windows Internals)",
    ],
    courseModuleLinks: [
      { label: "Process Lifecycle", href: "/notes/operating-systems/process-lifecycle-and-states" },
      { label: "Virtual Memory Deep-Dive", href: "/notes/operating-systems/virtual-memory-and-inverted-paging" },
      { label: "Storage & File Systems", href: "/notes/operating-systems/storage-and-file-systems" },
    ],
  },
  {
    title: "Operating Systems: Internals and Design Principles",
    authors: "William Stallings",
    edition: "9th Edition (Pearson)",
    popularName: "Stallings OS",
    coverBadge: "Exemplary Diagrams",
    summary:
      "Renowned for its crystal-clear architectural schematics, state-machine diagrams, and rigorous step-by-step trace tables. Extensively prescribed in Indian university curricula.",
    bestFor:
      "B.Tech university semester exams (VTU, AKTU, Anna Univ, Pune Univ, Mumbai Univ) that reward precise flowcharts, formal definition lists, and comparison tables.",
    gateRelevance:
      "Very strong coverage of 5-state vs 7-state suspended process transitions, memory segmentation combined with paging, and real-time scheduling bounds.",
    keyChapters: [
      "Ch 3: Process Description and Control (Process control structures, 7-state transition model)",
      "Ch 5 & 6: Concurrency: Mutual Exclusion & Deadlock (Monitors, Message passing, Banker's matrices)",
      "Ch 7 & 8: Memory Management & Virtual Memory (Dynamic partitioning, Buddy system, Page size trade-offs)",
      "Ch 9 & 10: Uniprocessor & Multiprocessor Scheduling (Fair-share scheduling, Thread scheduling)",
    ],
    courseModuleLinks: [
      { label: "Process 5 vs 7-State Lab", href: "/notes/labs" },
      { label: "Banker's Algorithm Simulator", href: "/notes/labs" },
      { label: "Formula Sheet", href: "/notes/formulas" },
    ],
  },
  {
    title: "Advanced Programming in the UNIX Environment (APUE)",
    authors: "W. Richard Stevens & Stephen A. Rago",
    edition: "3rd Edition (Addison-Wesley)",
    popularName: "The Unix Bible",
    coverBadge: "Systems Programming",
    summary:
      "The definitive manual for how user-space software interacts with the Unix/Linux kernel via system calls. A hands-on companion that brings theoretical OS concepts into production C code.",
    bestFor:
      "Software engineers preparing for systems engineering, kernel development, or backend infrastructure interviews at top tech companies.",
    gateRelevance:
      "Essential for mastering C-level `fork()`, `exec()`, `waitpid()`, and signal handling questions that appear in GATE and technical interviews.",
    keyChapters: [
      "Ch 3: File I/O (File descriptors, open, read, write, lseek, dup2)",
      "Ch 8: Process Control (fork, exit, wait, exec family, race conditions)",
      "Ch 10: Signals (Signal masks, sigaction, reentrancy)",
      "Ch 11 & 12: Threads & Thread Control (POSIX pthread_create, mutexes, rwlocks)",
      "Ch 15: Interprocess Communication (Pipes, FIFOs, Shared Memory, Message Queues)",
    ],
    courseModuleLinks: [
      { label: "Dual-Mode & System Calls", href: "/notes/operating-systems/dual-mode-and-system-calls" },
      { label: "Interactive Labs", href: "/notes/labs" },
    ],
  },
];

const STUDY_STRATEGIES = [
  {
    target: "GATE CS Preparation",
    focus: "Problem-solving accuracy, numerical corner cases, and standard definitions.",
    recommendation:
      "Use Silberschatz as your primary reference for definitions and formulas. Use OSTEP chapters on Paging and Address Translation for deep numerical clarity. Practice every topic immediately in our PYQ Archive and Formula Vault.",
    primaryBook: "Silberschatz (Ch 3, 5, 6, 7, 8, 9, 10) + OSTEP",
  },
  {
    target: "B.Tech Semester Exams (University Topper Track)",
    focus: "Structured answers, state diagrams, comparison tables, and full-length derivations.",
    recommendation:
      "Study Stallings and Silberschatz. Draw formal state transition diagrams (especially 5-state vs 7-state suspended models) and show complete step-by-step matrix tables for Banker's Algorithm and Page Replacement.",
    primaryBook: "William Stallings + Silberschatz",
  },
  {
    target: "Systems Engineering & Tech Interviews",
    focus: "Hands-on POSIX API mastery, concurrency debugging, memory hierarchy, and file systems.",
    recommendation:
      "Read OSTEP cover-to-cover (free online) and follow up with APUE (Stevens) to write real multi-threaded C code with locks, condition variables, and custom allocators.",
    primaryBook: "OSTEP (Free) + Stevens APUE",
  },
];

export default function NoteBooksPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8 py-10 md:py-16">
      <PageHeader
        eyebrow="📖 Curated Academic Resources"
        title="Operating Systems Textbooks & Reference Guide"
        description="The definitive textbooks recommended for B.Tech semester mastery, GATE CS preparation, and systems programming. Complete with chapter mappings, study tracks, and free open-access sources."
      />

      {/* Target Study Strategy Cards */}
      <section className="mb-14">
        <h2 className="text-xl font-bold text-ink-1 mb-4 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary" aria-hidden="true" />
          Recommended Reading Strategies by Goal
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {STUDY_STRATEGIES.map((strat, i) => (
            <div
              key={i}
              className="rounded-xl border border-hairline bg-surface-1/70 p-5 flex flex-col justify-between"
            >
              <div>
                <span className="inline-block text-[11px] font-mono tracking-wider uppercase text-primary mb-2">
                  Track {i + 1}
                </span>
                <h3 className="text-base font-bold text-ink-1 mb-2">{strat.target}</h3>
                <p className="text-xs text-ink-2 mb-3 leading-relaxed">{strat.focus}</p>
                <p className="text-xs text-ink-3 leading-relaxed border-t border-hairline/60 pt-3">
                  {strat.recommendation}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-hairline/60 text-[11px] font-mono text-ink-2">
                <span className="text-ink-3">Recommended:</span>{" "}
                <span className="text-ink-1 font-semibold">{strat.primaryBook}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Curated Textbooks */}
      <section className="space-y-8 mb-16">
        <div className="flex items-center justify-between border-b border-hairline pb-3">
          <h2 className="text-xl font-bold text-ink-1 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary" aria-hidden="true" />
            Standard Textbooks & Engineering References
          </h2>
          <span className="text-xs font-mono text-ink-3">5 Curated Classics</span>
        </div>

        {OS_TEXTBOOKS.map((book, idx) => (
          <article
            key={idx}
            className="rounded-xl border border-hairline bg-surface-1/60 backdrop-blur-md p-6 md:p-8 hover:border-hairline-strong transition-all duration-150"
          >
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span className="text-[11px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                    {book.coverBadge}
                  </span>
                  <span className="text-xs font-mono text-ink-3">
                    Known as &ldquo;{book.popularName}&rdquo;
                  </span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-ink-1 tracking-tight">
                  {book.title}
                </h3>
                <p className="text-xs md:text-sm text-ink-2 font-mono mt-1">
                  {book.authors} · <span className="text-ink-3">{book.edition}</span>
                </p>
              </div>

              {book.accessUrl && (
                <a
                  href={book.accessUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors self-start shrink-0"
                >
                  <span>{book.accessLabel || "Read Free Online"}</span>
                  <span aria-hidden="true">↗</span>
                </a>
              )}
            </div>

            <p className="text-sm text-ink-2 leading-relaxed mb-5">
              {book.summary}
            </p>

            {/* Context & Syllabus alignment */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5 p-4 rounded-lg bg-surface-0/60 border border-hairline text-xs">
              <div>
                <span className="font-semibold text-ink-1 block mb-1">🎯 Best Used For:</span>
                <p className="text-ink-2 leading-relaxed">{book.bestFor}</p>
              </div>
              <div>
                <span className="font-semibold text-ink-1 block mb-1">🏛️ GATE & B.Tech Relevance:</span>
                <p className="text-ink-2 leading-relaxed">{book.gateRelevance}</p>
              </div>
            </div>

            {/* Key Chapters */}
            <div className="mb-5">
              <h4 className="text-xs font-mono uppercase tracking-wider text-ink-3 mb-2">
                High-Yield Chapters To Focus On:
              </h4>
              <ul className="space-y-1.5 text-xs text-ink-2">
                {book.keyChapters.map((ch, cIdx) => (
                  <li key={cIdx} className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>{ch}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links to Our Platform Modules */}
            <div className="pt-4 border-t border-hairline/60 flex flex-wrap items-center gap-2">
              <span className="text-xs text-ink-3 font-mono mr-1">Study Companion on BTech Brain:</span>
              {book.courseModuleLinks.map((mod, mIdx) => (
                <Link
                  key={mIdx}
                  href={mod.href}
                  className="text-xs font-medium text-primary hover:text-primary-hover px-2.5 py-1 rounded bg-surface-2 border border-hairline hover:border-hairline-strong transition-all inline-flex items-center gap-1"
                >
                  <span>{mod.label}</span>
                  <span aria-hidden="true" className="text-[10px]">→</span>
                </Link>
              ))}
            </div>
          </article>
        ))}
      </section>

      {/* Comparative Matrix Table */}
      <section className="mb-14">
        <h2 className="text-xl font-bold text-ink-1 mb-4 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary" aria-hidden="true" />
          Textbook Comparison Matrix
        </h2>
        <div className="overflow-x-auto rounded-xl border border-hairline bg-surface-1/40">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-hairline bg-surface-2/60 text-ink-3 font-mono uppercase tracking-wider">
                <th className="py-3 px-4 font-medium">Textbook</th>
                <th className="py-3 px-4 font-medium">GATE Alignment</th>
                <th className="py-3 px-4 font-medium">Semester Exam Fit</th>
                <th className="py-3 px-4 font-medium">Code/Systems Depth</th>
                <th className="py-3 px-4 font-medium">Primary Strength</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline text-ink-2">
              <tr>
                <td className="py-3 px-4 font-semibold text-ink-1">Silberschatz (Dinosaur)</td>
                <td className="py-3 px-4 text-emerald-400 font-medium">⭐⭐⭐⭐⭐ (Gold Std)</td>
                <td className="py-3 px-4 text-emerald-400 font-medium">⭐⭐⭐⭐⭐</td>
                <td className="py-3 px-4">⭐⭐⭐ (Pseudo-code)</td>
                <td className="py-3 px-4">Standard definitions & universal syllabus baseline</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-ink-1">OSTEP (Arpaci-Dusseau)</td>
                <td className="py-3 px-4 text-amber-400 font-medium">⭐⭐⭐⭐ (High)</td>
                <td className="py-3 px-4">⭐⭐⭐⭐</td>
                <td className="py-3 px-4 text-emerald-400 font-medium">⭐⭐⭐⭐⭐ (Compilable C)</td>
                <td className="py-3 px-4">Paging, TLBs & locks taught with unrivaled clarity (Free)</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-ink-1">Tanenbaum (MOS)</td>
                <td className="py-3 px-4">⭐⭐⭐ (Moderate)</td>
                <td className="py-3 px-4">⭐⭐⭐⭐</td>
                <td className="py-3 px-4 text-emerald-400 font-medium">⭐⭐⭐⭐⭐ (Kernel Depth)</td>
                <td className="py-3 px-4">Architectural rigor, MINIX/Linux case studies</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-ink-1">William Stallings</td>
                <td className="py-3 px-4 text-amber-400 font-medium">⭐⭐⭐⭐ (High)</td>
                <td className="py-3 px-4 text-emerald-400 font-medium">⭐⭐⭐⭐⭐ (Top Choice)</td>
                <td className="py-3 px-4">⭐⭐⭐</td>
                <td className="py-3 px-4">State diagrams, comparison tables, university format</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-ink-1">Stevens & Rago (APUE)</td>
                <td className="py-3 px-4">⭐⭐ (Specific C Qs)</td>
                <td className="py-3 px-4">⭐⭐ (Systems Lab)</td>
                <td className="py-3 px-4 text-emerald-400 font-medium">⭐⭐⭐⭐⭐ (Production Unix)</td>
                <td className="py-3 px-4">Practical fork(), signals, IPC, and POSIX threads</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Cross-Link Hub */}
      <section className="rounded-xl border border-hairline bg-gradient-to-r from-surface-1 to-surface-2 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-lg font-bold text-ink-1 mb-1">
            Ready to test textbook concepts against real exam questions?
          </h3>
          <p className="text-xs md:text-sm text-ink-2 max-w-xl">
            Read chapter theory in your textbook, then practice immediate concept verification in our interactive quizzes, simulators, and GATE PYQ archive.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <Link
            href="/notes/quizzes"
            className="px-4 py-2 rounded-lg text-xs font-semibold bg-primary text-white hover:bg-primary-hover transition-colors"
          >
            Take OS Quiz
          </Link>
          <Link
            href="/notes/formulas"
            className="px-4 py-2 rounded-lg text-xs font-semibold bg-surface-3 text-ink-1 border border-hairline hover:border-hairline-strong transition-colors"
          >
            Formula Vault
          </Link>
          <Link
            href="/notes/pyqs"
            className="px-4 py-2 rounded-lg text-xs font-semibold bg-surface-3 text-ink-1 border border-hairline hover:border-hairline-strong transition-colors"
          >
            GATE PYQs
          </Link>
        </div>
      </section>
    </main>
  );
}
