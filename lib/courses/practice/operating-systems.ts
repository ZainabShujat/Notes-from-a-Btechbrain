import { mcq, num, practice, worked, type LessonExtras } from "./helpers";

/** OS lessons already had most worked examples; this fills the remaining gaps and adds practice. */
export const OS_EXTRAS: LessonExtras = {
  "why-operating-systems-exist": [
    worked(
      "Worked example: why multiprogramming raises CPU use",
      "Each process waits for I/O 80% of the time. With 4 processes in memory, what is the CPU utilisation? (Assume the waits are independent.)",
      [
        ["CPU is idle only when everyone waits", "P(all 4 waiting) = 0.8⁴.", "0.4096"],
        ["Utilisation", "1 − 0.8⁴.", "≈ 0.59"],
        ["With 1 process", "1 − 0.8 = 0.2: the CPU would sit idle 80% of the time."],
      ],
      "About 59% (versus 20% with one process)",
      "That's the core reason operating systems keep several programs in memory and switch between them."
    ),
    practice([
      mcq("os-why-1", "The main reason an OS switches the CPU between programs is to:", [
        ["Keep the CPU busy while some programs wait for I/O", true, "Multiprogramming overlaps computation with I/O."],
        ["Make every program run faster on its own", false, "Each program may even run a little slower."],
        ["Save memory", false, "Keeping more programs in memory uses more of it."],
      ], "Utilisation with n processes is about 1 − pⁿ, where p is the I/O wait fraction.", "foundation"),
      num("os-why-2", "Processes wait for I/O 50% of the time. What is the CPU utilisation with 3 processes? Give a decimal.", 0.875,
        "1 − 0.5³ = 0.875.", "gate-level", undefined, 0.001),
    ]),
  ],

  "dual-mode-and-system-calls": [
    practice([
      mcq("os-dm-1", "Which instruction must be privileged (kernel mode only)?", [
        ["Disabling interrupts", true, "A user program could otherwise take over the CPU for good."],
        ["Reading the time of day", false, "That's usually harmless."],
        ["Adding two registers", false, "Ordinary arithmetic is never privileged."],
      ], "Privileged: I/O instructions, interrupt control, timer setup, changing memory-protection registers.", "foundation"),
      num("os-dm-2", "A program makes one read() system call that completes without blocking. How many mode switches happen?", 2,
        "User → kernel on the trap, then kernel → user on return."),
      mcq("os-dm-3", "A system call is different from an ordinary function call because it:", [
        ["Traps into the kernel and switches the CPU into kernel mode", true, "That's how user code reaches protected services."],
        ["Runs faster", false, "It's slower, because of the mode switch."],
        ["Can't take arguments", false, "Arguments go in registers or memory."],
      ], "Library wrappers like printf eventually call system calls like write."),
    ]),
  ],

  "what-is-a-process": [
    worked(
      "Worked example: counting processes after fork()",
      "A program runs fork(); fork(); fork(); and then each process prints once. How many lines are printed, and how many child processes are created?",
      [
        ["Each fork doubles the count", "Every existing process, parent or child, runs the next fork."],
        ["After three forks", "1 → 2 → 4 → 8.", "2³", "8 processes"],
        ["Children", "Everything except the original.", "8 − 1", "7"],
      ],
      "8 lines; 7 child processes",
      "n consecutive forks give 2ⁿ processes. A fork inside an if (for example if (fork() == 0)) changes the count."
    ),
    practice([
      num("os-pr-1", "for (int i = 0; i < 2; i++) fork(); How many processes exist at the end, including the original?", 4, "Two forks in a row: 2² = 4.", "foundation"),
      mcq("os-pr-2", "Threads of the same process share:", [
        ["The code, the global data and the heap", true, "Each thread has its own stack and registers."],
        ["Their stacks", false, "Each thread has its own stack."],
        ["Nothing", false, "Sharing memory is what makes threads light."],
      ], "That sharing is why threads need synchronisation."),
      mcq("os-pr-3", "fork() returns 0 in:", [
        ["The child process", true, "The parent gets the child's PID instead."],
        ["The parent process", false, "The parent gets a positive PID."],
        ["Both", false, "They get different values."],
      ], "A negative return means fork failed.", "foundation"),
    ]),
  ],

  "process-states-and-transitions": [
    worked(
      "Worked example: what triggers each transition",
      "A process is running when (1) its time slice ends, then later (2) it requests disk I/O, then (3) the disk finishes. Trace its states.",
      [
        ["Time slice ends", "The timer interrupts and the scheduler takes the CPU back.", undefined, "Running → Ready"],
        ["Requests I/O", "It can't continue until the data arrives.", undefined, "Running → Blocked (Waiting)"],
        ["Disk finishes", "The interrupt makes it runnable again, but it must wait for the scheduler.", undefined, "Blocked → Ready"],
      ],
      "Running → Ready → (dispatched) Running → Blocked → Ready",
      "A blocked process never goes straight to Running: it always passes through Ready."
    ),
    practice([
      mcq("os-st-1", "Which transition is impossible in the standard five-state model?", [
        ["Blocked → Running", true, "It must become Ready and be dispatched first."],
        ["Ready → Running", false, "That's a dispatch."],
        ["Running → Blocked", false, "That's an I/O request."],
        ["Running → Ready", false, "That's preemption."],
      ], "Only the scheduler moves processes from Ready to Running.", "foundation"),
      num("os-st-2", "A machine has 4 CPU cores and 20 processes. At most how many can be in the Running state at once?", 4, "One running process per core."),
      mcq("os-st-3", "A process that has finished but whose parent hasn't called wait() yet is a:", [
        ["Zombie", true, "Its exit status waits to be collected."],
        ["Orphan", false, "An orphan's parent has died; init adopts it."],
        ["Daemon", false, "That's a background service."],
      ], "Zombies hold a process table entry but no memory or CPU."),
    ]),
  ],

  "context-switching": [
    worked(
      "Worked example: the cost of context switches",
      "A round-robin quantum is 10 ms and each context switch takes 1 ms. What fraction of CPU time does useful work?",
      [
        ["One cycle", "10 ms of work, then 1 ms of switching.", "11 ms"],
        ["Useful fraction", "10/11.", "≈ 90.9%"],
        ["With a 1 ms quantum", "1/(1 + 1) = 50%: half the CPU wasted."],
      ],
      "≈ 90.9%",
      "A small quantum feels more responsive but wastes more time switching. Real switches take microseconds, and quanta milliseconds."
    ),
    practice([
      mcq("os-cs-1", "What does a context switch save into the outgoing process's PCB?", [
        ["Its registers, program counter and state", true, "Enough to resume exactly where it stopped."],
        ["Its whole address space", false, "Memory stays where it is; only the page-table pointer changes."],
        ["Only its PID", false, "Far more is needed."],
      ], "Switching between threads of the same process is cheaper: no address-space switch.", "foundation"),
      num("os-cs-2", "Quantum 4 ms, switch cost 1 ms. What percentage of CPU time is useful?", 80, "4/(4 + 1) = 80%.", "gate-level", "%"),
    ]),
  ],

  "scheduling-basics": [
    practice([
      mcq("os-sb-1", "Turnaround time is:", [
        ["Completion time − arrival time", true, "The total time from arrival to finish."],
        ["Burst time − waiting time", false, "That's backwards."],
        ["The time until the first response", false, "That's response time."],
      ], "Waiting time = turnaround − burst. Response time = first run − arrival.", "foundation"),
      num("os-sb-2", "A process arrives at 2 ms, needs 5 ms of CPU and finishes at 12 ms. What is its waiting time?", 5,
        "Turnaround = 12 − 2 = 10; waiting = 10 − 5 = 5 ms.", "foundation", "ms"),
      mcq("os-sb-3", "Which scheduling criterion matters most for interactive users?", [
        ["Response time", true, "Users notice how quickly the system reacts."],
        ["Throughput", false, "That matters more for batch jobs."],
        ["CPU utilisation", false, "Users don't see it directly."],
      ], "Batch systems favour throughput; interactive systems favour response time."),
    ]),
  ],

  "fcfs-and-round-robin": [
    practice([
      num("os-rr-1", "P1 = 24 ms, P2 = 3 ms and P3 = 3 ms all arrive at time 0 in that order. What is the average waiting time under FCFS, in ms?", 17,
        "Waits are 0, 24 and 27: (0 + 24 + 27)/3 = 17 ms. That's the convoy effect.", "foundation", "ms"),
      num("os-rr-2", "Same processes, Round Robin with a 4 ms quantum. What is the average waiting time? Round to 2 decimal places.", 5.67,
        "P1 runs 0–4, P2 4–7, P3 7–10, then P1 10–30. Waits are 6, 4 and 7, which average 5.67 ms.", "gate-level", "ms", 0.01),
      mcq("os-rr-3", "Round Robin with a very large quantum behaves like:", [
        ["FCFS", true, "Every process finishes inside its first slice."],
        ["SJF", false, "Round Robin never looks at burst lengths."],
        ["Priority scheduling", false, "No."],
      ], "A very small quantum approaches processor sharing, but switching overhead grows."),
    ]),
  ],

  "sjf-srtf-priority-scheduling": [
    practice([
      num("os-sj-1", "Processes (arrival, burst): P1 (0, 8), P2 (1, 4), P3 (2, 9), P4 (3, 5). What is the average waiting time under SRTF (preemptive SJF)?", 6.5,
        "Waits: P1 9, P2 0, P3 15, P4 2. (9 + 0 + 15 + 2)/4 = 6.5 ms.", "gate-level", "ms", 0.01),
      num("os-sj-2", "Same processes under non-preemptive SJF. What is the average waiting time?", 7.75,
        "P1 runs 0–8 (no one else has arrived at 0), then P2 8–12, P4 12–17, P3 17–26. Waits: 0, 7, 9, 15, which average 7.75 ms.", "gate-level", "ms", 0.01),
      mcq("os-sj-3", "The main risk of priority scheduling is:", [
        ["Starvation of low-priority processes", true, "Fix it with ageing: raise the priority of processes that have waited long."],
        ["Too many context switches", false, "That's a small quantum's problem."],
        ["It can't be preemptive", false, "It can be."],
      ], "SJF is priority scheduling with priority = predicted burst length, so it can starve long jobs too.", "foundation"),
    ]),
  ],

  "critical-section-and-semaphores": [
    worked(
      "Worked example: a counting semaphore's value",
      "A counting semaphore starts at 10. Processes then perform 6 wait (P) operations and 4 signal (V) operations, with no process blocking. What is its value?",
      [
        ["Each P", "Decrements by 1.", "10 − 6", "4"],
        ["Each V", "Increments by 1.", "4 + 4", "8"],
      ],
      "8",
      "The value counts free resources. If it would drop below 0, the process blocks instead (or, in some definitions, the negative value counts the waiting processes)."
    ),
    practice([
      mcq("os-cr-1", "A correct critical-section solution needs:", [
        ["Mutual exclusion, progress and bounded waiting", true, "All three are required."],
        ["Mutual exclusion only", false, "It must also avoid deadlock and starvation."],
        ["Busy waiting", false, "Busy waiting is allowed, but not required."],
      ], "Peterson's solution satisfies all three for two processes.", "foundation"),
      mcq("os-cr-2", "Two semaphores S and Q both start at 1. P0 runs wait(S); wait(Q); and P1 runs wait(Q); wait(S). What can happen?", [
        ["Deadlock: each holds one and waits for the other", true, "Circular wait on S and Q."],
        ["Nothing can go wrong", false, "The opposite lock orders can interleave badly."],
        ["Starvation only", false, "Both can block forever, which is deadlock."],
      ], "Always acquire locks in one global order to prevent this."),
      num("os-cr-3", "A counting semaphore starts at 3. Five processes each call wait() and nobody calls signal(). How many processes are blocked?", 2,
        "The first three pass (3 → 0); the other two block."),
    ]),
  ],

  "deadlock-principles-and-bankers": [
    practice([
      num("os-dl-1", "3 processes each need up to 2 units of one resource type. What is the fewest units that guarantees no deadlock?", 4,
        "n(k − 1) + 1 = 3·1 + 1 = 4: even if everyone holds k − 1, one more unit lets someone finish."),
      mcq("os-dl-2", "Which of the four deadlock conditions does ordering all resources (and acquiring them in that order) break?", [
        ["Circular wait", true, "A cycle would need some process to go against the order."],
        ["Mutual exclusion", false, "Resources are still exclusive."],
        ["Hold and wait", false, "Processes can still hold one resource while waiting for another."],
        ["No preemption", false, "Nothing is taken away."],
      ], "Prevention breaks one of the four conditions; avoidance (Banker's) only grants requests that keep the system safe."),
      mcq("os-dl-3", "An unsafe state in Banker's algorithm means:", [
        ["No order is guaranteed to let every process finish; deadlock is possible", true, "Unsafe ≠ deadlocked."],
        ["The system is deadlocked", false, "Unsafe states can still avoid deadlock."],
        ["A process has crashed", false, "Unrelated."],
      ], "Safe ⇒ no deadlock. Unsafe ⇒ deadlock may happen.", "tricky"),
    ]),
  ],

  "paging-and-tlb": [
    practice([
      num("os-pg-1", "TLB lookup 20 ns, memory access 100 ns, TLB hit ratio 80%. What is the effective access time, in ns?", 140,
        "Hit: 20 + 100 = 120. Miss: 20 + 100 (page table) + 100 = 220. 0.8·120 + 0.2·220 = 140 ns.", "gate-level", "ns"),
      num("os-pg-2", "A 32-bit virtual address space with 4 KB pages. How many entries does a single-level page table have?", 1048576,
        "2³² / 2¹² = 2²⁰ = 1,048,576 entries (4 MB at 4 bytes each, which is why multi-level tables exist).", "foundation"),
      mcq("os-pg-3", "Paging removes external fragmentation but can cause:", [
        ["Internal fragmentation in the last page of a process", true, "On average half a page is wasted per process."],
        ["More external fragmentation", false, "Any free frame can be used."],
        ["No fragmentation at all", false, "Internal fragmentation remains."],
      ], "Bigger pages: smaller page tables but more internal fragmentation."),
    ]),
  ],

  "page-replacement-algorithms": [
    practice([
      num("os-prp-1", "3 frames, reference string 7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2. How many page faults with FIFO?", 10,
        "Simulating FIFO with 3 frames gives 10 faults."),
      num("os-prp-2", "Same string and frames. How many faults with LRU?", 9, "LRU evicts the page used least recently: 9 faults."),
      num("os-prp-3", "Same string and frames. How many faults with the optimal algorithm?", 7,
        "Optimal evicts the page used furthest in the future: 7 faults, the lowest possible."),
    ]),
  ],

  "file-allocation-and-inodes": [
    practice([
      mcq("os-fa-1", "An inode has 12 direct pointers, one single-indirect and one double-indirect pointer. Blocks are 4 KB and pointers 4 bytes. Roughly how big can a file be?", [
        ["About 4 GB", true, "(12 + 1024 + 1024²) × 4 KB ≈ 4.004 GiB; the double-indirect block dominates."],
        ["48 KB", false, "That's the direct blocks only."],
        ["About 4 MB", false, "That leaves out the double-indirect blocks."],
      ], "Each indirect level multiplies the reach by (block size / pointer size) = 1024."),
      mcq("os-fa-2", "Which allocation method gives fast random access but suffers from external fragmentation?", [
        ["Contiguous allocation", true, "Block i is at start + i, but files need one continuous run of free space."],
        ["Linked allocation", false, "That's slow for random access."],
        ["Indexed allocation", false, "Its cost is the index block itself."],
      ], "FAT is linked allocation with the links kept in a table, which makes random access faster.", "foundation"),
      num("os-fa-3", "Blocks are 4 KB and pointers 4 bytes. How many block pointers fit in one indirect block?", 1024, "4096 / 4 = 1024.", "foundation"),
    ]),
  ],

  "disk-scheduling-algorithms": [
    worked(
      "Worked example: FCFS vs SSTF vs SCAN",
      "Requests for cylinders 98, 183, 37, 122, 14, 124, 65, 67. The head is at 53 on a disk with cylinders 0 to 199. Find the total head movement for FCFS, SSTF and SCAN (moving towards 0 first).",
      [
        ["FCFS", "Visit them in the order given.", undefined, "640 cylinders"],
        ["SSTF", "Always go to the nearest request: 65, 67, 37, 14, 98, 122, 124, 183.", undefined, "236 cylinders"],
        ["SCAN towards 0", "Go down to cylinder 0, serving 37 and 14, then reverse up to 183.", "53 + 183", "236 cylinders"],
        ["LOOK towards 0", "Like SCAN, but turn at 14 instead of 0.", "(53 − 14) + (183 − 14)", "208 cylinders"],
      ],
      "FCFS 640, SSTF 236, SCAN 236, LOOK 208",
      "SSTF can starve requests far from the head; SCAN and LOOK guarantee every request gets served."
    ),
    practice([
      mcq("os-ds-1", "Which disk scheduling algorithm can starve far-away requests?", [
        ["SSTF", true, "A stream of nearby requests can keep the head away forever."],
        ["SCAN", false, "The sweep reaches every cylinder."],
        ["FCFS", false, "FCFS is fair, just slow."],
      ], "SSTF is like SJF for disks: good on average, unfair at the extremes.", "foundation"),
      mcq("os-ds-2", "C-SCAN differs from SCAN because it:", [
        ["Serves requests in one direction only, then jumps back to the start", true, "That gives more even waiting times across cylinders."],
        ["Never reaches the disk's ends", false, "That's LOOK."],
        ["Always serves the nearest request", false, "That's SSTF."],
      ], "Whether the jump back counts as head movement differs between textbooks, so GATE questions say which they mean."),
    ]),
  ],
};
