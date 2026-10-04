/**
 * "Don't Feel Dumb" Glossary Terms & Intuitive Definitions
 * For words students often encounter in notes that seem fundamental but are rarely
 * explained plainly without excessive academic jargon.
 */

export interface GlossaryTerm {
  /** The canonical display term */
  term: string;
  /** Primary match word / singular form */
  match: string;
  /** Plural or alternative matches (lowercase) */
  aliases?: string[];
  /** Pronunciation or category hint (e.g. "Core OS", "Hardware/Memory", "Concurrency") */
  category: string;
  /** The friendly, punchy, intuitive "Don't Feel Dumb" explanation */
  definition: string;
  /** Real-world everyday analogy that immediately clicks */
  analogy?: string;
  /** One-line takeaway formula/rule */
  takeaway?: string;
}

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  // ── CORE OS & ARCHITECTURE ──────────────────────────────────
  {
    term: "Kernel",
    match: "kernel",
    aliases: ["kernels"],
    category: "Core OS",
    definition: "The core master program of the operating system that runs with full hardware privileges. It is the boss that controls CPU, memory, and devices.",
    analogy: "Think of it as the backstage crew in a theater—you never see them on stage, but nothing works without them.",
    takeaway: "The only code with Mode Bit = 0 (Privileged Mode).",
  },
  {
    term: "Thread",
    match: "thread",
    aliases: ["threads", "threading"],
    category: "Concurrency",
    definition: "A lightweight worker inside a process. Multiple threads share the same memory space but can run code at the same time on different CPU cores.",
    analogy: "Like multiple chefs cooking in the exact same kitchen, sharing the fridge and stove.",
    takeaway: "Shares code, data, and open files; keeps its own private PC, stack, and registers.",
  },
  {
    term: "Process",
    match: "process",
    aliases: ["processes"],
    category: "Execution",
    definition: "A program currently in execution, with its own private virtual memory space, stack, heap, and system resources.",
    analogy: "Like an entire separate restaurant with its own walled kitchen and private ingredients.",
    takeaway: "Isolated by hardware. One process crashing cannot corrupt another.",
  },
  {
    term: "System Call",
    match: "system call",
    aliases: ["system calls", "syscall", "syscalls"],
    category: "Protection Boundary",
    definition: "A formal request from a user program asking the kernel to do something restricted on its behalf, like writing to disk or sending network packets.",
    analogy: "Like ordering through a bank teller window instead of walking into the bank vault yourself.",
    takeaway: "The only safe gateway from User Mode (Bit 1) to Kernel Mode (Bit 0).",
  },
  {
    term: "Context Switch",
    match: "context switch",
    aliases: ["context switches", "context switching"],
    category: "CPU Scheduling",
    definition: "The CPU saving the current state (registers, program counter) of one running process and loading the saved state of another process.",
    analogy: "Bookmarking your page, putting the book away, and opening a different book to where you last left off.",
    takeaway: "Pure operating system overhead—the CPU does not execute any user work during a context switch.",
  },
  {
    term: "Interrupt",
    match: "interrupt",
    aliases: ["interrupts", "interrupted"],
    category: "Hardware Signals",
    definition: "An asynchronous electrical signal sent by hardware (like keyboard, mouse, or timer) telling the CPU: 'Stop what you are doing right now and look at me!'",
    analogy: "A phone ringing or a knock on your door while you are reading.",
    takeaway: "Forces the CPU to pause user instructions and jump to an Interrupt Service Routine (ISR).",
  },
  {
    term: "Trap",
    match: "trap",
    aliases: ["traps"],
    category: "Software Signals",
    definition: "A synchronous exception generated directly by the running instruction itself, either intentionally (syscall) or accidentally (divide by zero).",
    analogy: "Tripping over a rug while walking forward—it happens precisely on your own step.",
    takeaway: "Synchronous: reproducible at the exact same instruction step every time.",
  },
  {
    term: "Preemption",
    match: "preemption",
    aliases: ["preempt", "preempted", "preemptive"],
    category: "CPU Scheduling",
    definition: "The OS forcibly taking the CPU away from a running process before it voluntarily finishes, usually when its time slice expires or a higher-priority task arrives.",
    analogy: "A referee blowing the whistle and pulling a player off the field because their turn is up.",
    takeaway: "Requires a hardware timer interrupt; prevents rogue programs from hogging the CPU.",
  },
  {
    term: "Semaphore",
    match: "semaphore",
    aliases: ["semaphores"],
    category: "Synchronization",
    definition: "An integer synchronization variable with atomic wait() and signal() operations used to control access to shared finite resources.",
    analogy: "A bowl containing a fixed number of restroom keys. Take a key to enter; return it when leaving. If empty, wait.",
    takeaway: "Counting semaphore allows N concurrent accesses; Binary semaphore (0 or 1) acts like a mutex lock.",
  },
  {
    term: "Deadlock",
    match: "deadlock",
    aliases: ["deadlocks", "deadlocked"],
    category: "Concurrency",
    definition: "A permanent stalemate where every process in a group is waiting for a resource currently held by another process in that same group.",
    analogy: "Two polite people meeting in a narrow doorway, each refusing to step through until the other moves first.",
    takeaway: "Requires Coffman's 4 conditions: Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait.",
  },
  {
    term: "Thrashing",
    match: "thrashing",
    aliases: ["thrashed"],
    category: "Virtual Memory",
    definition: "A state where the system spends almost all its time swapping pages between RAM and disk, with virtually zero useful CPU work being done.",
    analogy: "Spending 55 minutes searching through stacked boxes for textbooks and only 5 minutes actually studying.",
    takeaway: "Occurs when the sum of active processes' working sets exceeds total physical RAM frames.",
  },
  {
    term: "Page Fault",
    match: "page fault",
    aliases: ["page faults"],
    category: "Virtual Memory",
    definition: "An interrupt raised when a program tries to access a virtual memory address that is valid, but currently not loaded in physical RAM.",
    analogy: "Reaching into your drawer for your passport and finding an 'in storage unit' note instead—you must go fetch it.",
    takeaway: "Not an error! It is the normal mechanism OS uses to fetch needed code from disk on demand.",
  },
  {
    term: "TLB",
    match: "tlb",
    aliases: ["translation lookaside buffer"],
    category: "Memory Hardware",
    definition: "Translation Lookaside Buffer: A tiny, blazing-fast hardware cache on the CPU chip that remembers recent Virtual-to-Physical page address translations.",
    analogy: "A cheat sheet on your desk with the 10 most common phone numbers, saving you from opening the big phone book.",
    takeaway: "Turns slow 2-level memory walks into single-cycle hardware lookups on a hit.",
  },
  {
    term: "Atomic",
    match: "atomic",
    aliases: ["atomicity"],
    category: "Concurrency / DB",
    definition: "An operation that executes completely as an all-or-nothing step, with no intermediate state visible to any other thread or processor.",
    analogy: "Flipping a light switch: the light is either fully ON or fully OFF, never halfway.",
    takeaway: "Cannot be interrupted halfway through. If it fails, nothing is altered.",
  },
  {
    term: "Race Condition",
    match: "race condition",
    aliases: ["race conditions"],
    category: "Concurrency",
    definition: "A software bug where the final outcome depends on the unpredictable order or timing in which multiple threads execute.",
    analogy: "Two people simultaneously withdrawing the last $100 from the same bank account from two different ATMs.",
    takeaway: "Prevented by protecting the Critical Section with mutual exclusion.",
  },
  {
    term: "Virtual Memory",
    match: "virtual memory",
    aliases: ["virtual address space"],
    category: "Memory Management",
    definition: "A hardware-assisted illusion that gives every single program the belief that it has its own continuous, private, multi-gigabyte memory space.",
    analogy: "Every student getting an apartment layout numbered Rooms 1 to 100, even though they live in different buildings across the city.",
    takeaway: "Provides memory protection and enables running programs larger than physical RAM.",
  },
  {
    term: "Starvation",
    match: "starvation",
    aliases: ["starved", "indefinite blocking"],
    category: "Scheduling",
    definition: "A process being perpetually denied the CPU or a resource because higher-priority processes keep arriving and taking precedence.",
    analogy: "Standing in line at a club while VIP ticket holders keep cutting ahead of you forever.",
    takeaway: "Solved using Aging (gradually increasing a waiting process's priority over time).",
  },
  {
    term: "PCB",
    match: "pcb",
    aliases: ["process control block"],
    category: "Core OS",
    definition: "Process Control Block: The data structure the OS maintains for each process, storing its PID, state, PC, registers, open files, and memory limits.",
    analogy: "A patient's hospital chart clipped to the end of the bed recording vital stats, history, and status.",
    takeaway: "The identity card of a process; saved and restored during every context switch.",
  },
  {
    term: "Mode Bit",
    match: "mode bit",
    aliases: ["mode bits"],
    category: "Hardware Protection",
    definition: "A single physical flip-flop in the CPU status register that defines whether the current code is running as unprivileged User Mode (1) or privileged Kernel Mode (0).",
    analogy: "A physical badge: wearing the staff badge lets you unlock the server room; visitor badge does not.",
    takeaway: "User code cannot clear this bit; only hardware traps and interrupts flip it to 0.",
  },
  {
    term: "Throughput",
    match: "throughput",
    aliases: ["throughputs"],
    category: "Performance Metrics",
    definition: "The total number of processes or units of work completed per unit of time (e.g. jobs per minute).",
    analogy: "How many cars pass through a highway toll booth in one hour.",
    takeaway: "Higher is better; maximized by keeping the CPU constantly busy with ready work.",
  },
  {
    term: "Turnaround Time",
    match: "turnaround time",
    aliases: ["turnaround times", "tat"],
    category: "Scheduling Metrics",
    definition: "The total elapsed time from the moment a process arrives to the exact moment it finishes execution completely.",
    analogy: "The total time from ordering your food at a restaurant counter until you walk out having eaten it.",
    takeaway: "Turnaround Time = Completion Time - Arrival Time = Burst Time + Waiting Time.",
  },
  {
    term: "Waiting Time",
    match: "waiting time",
    aliases: ["waiting times"],
    category: "Scheduling Metrics",
    definition: "The total amount of time a process spent sitting passively in the Ready Queue waiting to be assigned CPU time.",
    analogy: "The time you spent waiting in line at the restaurant counter before your order started being prepared.",
    takeaway: "Waiting Time = Turnaround Time - Burst Time.",
  },
  {
    term: "Critical Section",
    match: "critical section",
    aliases: ["critical sections"],
    category: "Synchronization",
    definition: "A specific block of code where shared resources (memory, variables, files) are accessed, which must not be executed by more than one thread simultaneously.",
    analogy: "An airplane restroom: only one person should be inside at any given time.",
    takeaway: "Must satisfy Mutual Exclusion, Progress, and Bounded Waiting.",
  },
  {
    term: "Spooling",
    match: "spooling",
    aliases: ["spooled"],
    category: "I/O Systems",
    definition: "Simultaneous Peripheral Operations On-Line: Buffering I/O jobs on a fast disk temporary queue so slow devices (like printers) don't stall fast CPUs.",
    analogy: "An inbox tray on a manager's desk where documents are placed until the manager is ready to sign them.",
    takeaway: "Overcomes speed mismatch between fast CPUs and slow mechanical peripherals.",
  },
  {
    term: "Mutex",
    match: "mutex",
    aliases: ["mutexes", "mutual exclusion lock"],
    category: "Synchronization",
    definition: "A binary lock (Mutual Exclusion) used to protect a critical section. Only the thread that locked the mutex is allowed to unlock it.",
    analogy: "A single physical restroom key attached to a heavy spoon: only the person holding it can unlock the door.",
    takeaway: "Has strict ownership: the thread that acquired the mutex must be the one to release it.",
  },
];

/** Quick lookup dictionary for terms indexed by their lowercased match keys */
export const GLOSSARY_MAP: Record<string, GlossaryTerm> = (() => {
  const map: Record<string, GlossaryTerm> = {};
  for (const item of GLOSSARY_TERMS) {
    map[item.match.toLowerCase()] = item;
    if (item.aliases) {
      for (const a of item.aliases) {
        map[a.toLowerCase()] = item;
      }
    }
  }
  return map;
})();

/**
 * Sorted list of all phrases/words to match, longest phrases first
 * so multi-word terms like "critical section", "context switch", "system call"
 * match before individual words.
 */
const ALL_GLOSSARY_PHRASES: { phrase: string; canonical: string }[] = (() => {
  const list: { phrase: string; canonical: string }[] = [];
  for (const term of GLOSSARY_TERMS) {
    list.push({ phrase: term.match, canonical: term.match });
    if (term.aliases) {
      for (const alias of term.aliases) {
        list.push({ phrase: alias, canonical: term.match });
      }
    }
  }
  // Sort longest phrases first
  list.sort((a, b) => b.phrase.length - a.phrase.length);
  return list;
})();

/**
 * Inlines dotted-line trigger spans for glossary terms in text/HTML without
 * disrupting existing HTML tags, attributes, or code blocks.
 */
export function highlightGlossaryTerms(html: string): string {
  if (!html) return html;

  // Split by HTML tags so we only replace text within actual content nodes
  const parts = html.split(/(<[^>]+>)/g);

  let inCodeOrLink = 0;

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    if (part.startsWith("<")) {
      const lower = part.toLowerCase();
      if (
        lower.startsWith("<code") ||
        lower.startsWith("<pre") ||
        lower.startsWith("<a ") ||
        lower === "<a>" ||
        lower.startsWith("<button") ||
        lower.startsWith("<svg")
      ) {
        inCodeOrLink++;
      } else if (
        lower.startsWith("</code") ||
        lower.startsWith("</pre") ||
        lower.startsWith("</a") ||
        lower.startsWith("</button") ||
        lower.startsWith("</svg")
      ) {
        inCodeOrLink = Math.max(0, inCodeOrLink - 1);
      }
      continue;
    }

    if (inCodeOrLink > 0 || !part.trim()) {
      continue;
    }

    // Build unified pattern of all phrases
    // Pattern matches any of the terms as discrete words
    const pattern = new RegExp(
      `\\b(${ALL_GLOSSARY_PHRASES.map((p) => p.phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})\\b`,
      "gi"
    );

    parts[i] = part.replace(pattern, (match) => {
      const lower = match.toLowerCase();
      const termEntry = GLOSSARY_MAP[lower];
      const canonical = termEntry ? termEntry.match : lower;
      return `<span class="dont-feel-dumb-term" data-glossary-term="${canonical}">${match}</span>`;
    });
  }

  return parts.join("");
}

