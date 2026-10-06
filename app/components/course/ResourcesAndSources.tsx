import { ResourcesSection } from "../../../lib/courses/types";

export interface CuratedEducator {
  name: string;
  channelOrSeries: string;
  url: string;
  focusArea: string;
  recommendedFor: string;
}

// ─── Subject-specific educator lists ─────────────────────────────────────────

const EDUCATORS_BY_SUBJECT: Record<string, CuratedEducator[]> = {
  "operating-systems": [
    { name: "Varun Singla", channelOrSeries: "Gate Smashers · Operating Systems Full Course", url: "https://www.youtube.com/playlist?list=PLxCzCOWd7aiGz9donHRrE9I3Mwn6XdP8p", focusArea: "5 vs 7-State Models, CPU Scheduling, Banker's Algorithm, Semaphores, Multi-level Paging", recommendedFor: "Rapid intuitive conceptual mastery and step-by-step numerical examples." },
    { name: "Neso Academy", channelOrSeries: "Neso Academy · Operating Systems Series", url: "https://www.youtube.com/playlist?list=PLBlnK6fEyqRbjR2jT38T3nFiIuWAHh2zH", focusArea: "Process memory architecture, state transitions, TLB translation, disk scheduling", recommendedFor: "Academic whiteboard lectures and foundational textbook clarity." },
    { name: "Sanchit Jain", channelOrSeries: "Knowledge Gate · OS for GATE & Semester Exams", url: "https://www.youtube.com/playlist?list=PLmXKhU9FNesSFvj6gASuWmQd23Ul5omtD", focusArea: "Exam patterns, GATE PYQ derivations, tricky corner cases, formula shortcuts", recommendedFor: "Intense numerical problem-solving and past-paper accuracy." },
    { name: "Amit Khurana", channelOrSeries: "GATE CSE by Amit Khurana · Nirbhau OS Series", url: "https://www.youtube.com/playlist?list=PLC36xJgs4dxEGlPPsvshTRh35Vv-Eg_4b", focusArea: "Rigorous proofs, system call intricacies, concurrency invariants, paging depth", recommendedFor: "High-rank GATE aspirants seeking uncompromising mathematical depth." },
    { name: "Abdul Bari", channelOrSeries: "Abdul Bari · Algorithms & Concurrency Visualizations", url: "https://www.youtube.com/@abdul_bari", focusArea: "Semaphores, Mutex, Critical Section Problem, Banker's Safety Logic", recommendedFor: "Visual thinkers who want to see synchronization flows animated." },
    { name: "Prof. Robert Morris & Frans Kaashoek", channelOrSeries: "MIT OpenCourseWare · 6.828 Operating System Engineering", url: "https://ocw.mit.edu/courses/6-828-operating-system-engineering-fall-2012/", focusArea: "xv6 Kernel source code, hardware MMU, traps, device drivers", recommendedFor: "Undergraduates wanting to read and modify real Unix kernel code." },
  ],
  "dbms": [
    { name: "Sanchit Jain", channelOrSeries: "Knowledge Gate · DBMS for GATE & Semester", url: "https://www.youtube.com/playlist?list=PLmXKhU9FNesSj8DgFTKvlGBmNdxTFIyD3", focusArea: "ER diagrams, normalization, SQL, transactions, concurrency control", recommendedFor: "GATE-focused numerical problem-solving with clear worked examples." },
    { name: "Varun Singla", channelOrSeries: "Gate Smashers · DBMS Full Course", url: "https://www.youtube.com/playlist?list=PLxCzCOWd7aiFAN6I8CuViBuCdJBlcZKey", focusArea: "Relational algebra, SQL queries, B/B+ trees, file organization", recommendedFor: "Fast conceptual coverage with step-by-step GATE numericals." },
    { name: "Neso Academy", channelOrSeries: "Neso Academy · DBMS Complete Playlist", url: "https://www.youtube.com/playlist?list=PLBlnK6fEyqRi_CUQ-FDBmRtgBpOk4XYot", focusArea: "Relational model, SQL, normalization theory, ACID properties", recommendedFor: "Systematic textbook-style explanations ideal for first-time learners." },
    { name: "Ravindrababu Ravula", channelOrSeries: "Ravindrababu Ravula · DBMS Lectures", url: "https://www.youtube.com/@Ravindrababu_Ravula", focusArea: "Functional dependencies, BCNF, 3NF decomposition, transaction schedules", recommendedFor: "Deep theoretical rigor on normalization and transaction serializability." },
  ],
  "computer-networks": [
    { name: "Sanchit Jain", channelOrSeries: "Knowledge Gate · Computer Networks for GATE", url: "https://www.youtube.com/playlist?list=PLmXKhU9FNesRowxNGGzRMC3TUkJgYnTJq", focusArea: "OSI/TCP-IP layers, sliding window, CRC, subnetting, TCP congestion control", recommendedFor: "GATE-level numerical drilling and PYQ analysis." },
    { name: "Varun Singla", channelOrSeries: "Gate Smashers · Computer Networks Full Course", url: "https://www.youtube.com/playlist?list=PLxCzCOWd7aiGShFormBZvhs6quW3hVgTL", focusArea: "Ethernet, IP addressing, routing algorithms, TCP/UDP, DNS & HTTP", recommendedFor: "Step-by-step conceptual walkthroughs with worked GATE numericals." },
    { name: "Neso Academy", channelOrSeries: "Neso Academy · Computer Networks Series", url: "https://www.youtube.com/playlist?list=PLBlnK6fEyqRgMCUAG0XRw78UA8qnv6jEx", focusArea: "Data link layer, framing, error detection, medium access, TCP/IP", recommendedFor: "Clear whiteboard lectures for foundational and semester exam coverage." },
  ],
  "computer-organization": [
    { name: "Varun Singla", channelOrSeries: "Gate Smashers · COA Full Course", url: "https://www.youtube.com/playlist?list=PLxCzCOWd7aiHMonh3G6QNKq53C6oNXGrX", focusArea: "Instruction cycle, addressing modes, cache mapping, pipelining, I/O", recommendedFor: "Rapid GATE-focused conceptual coverage with numericals." },
    { name: "Sanchit Jain", channelOrSeries: "Knowledge Gate · COA for GATE", url: "https://www.youtube.com/playlist?list=PLmXKhU9FNesTpQnBB4e0sEyZEGrBNKhJ2", focusArea: "Cache bit-splitting, AMAT, pipeline CPI, IEEE 754, DMA", recommendedFor: "Past-paper-focused approach with clear COA numerical explanations." },
    { name: "Prof. Onur Mutlu", channelOrSeries: "ETH Zürich · Digital Design & Computer Architecture", url: "https://www.youtube.com/playlist?list=PL5Q2soXY2Zi9OhoVQBXYFIZywZXCPl4M_", focusArea: "Microarchitecture, pipelining, out-of-order execution, memory hierarchy", recommendedFor: "Graduate-level depth on how real modern processors are designed." },
  ],
  "data-structures": [
    { name: "Abdul Bari", channelOrSeries: "Abdul Bari · Data Structures & Algorithms", url: "https://www.youtube.com/@abdul_bari", focusArea: "Trees, graphs, hashing, sorting — with visual algorithm animations", recommendedFor: "Visual thinkers who want to see each algorithm step animated clearly." },
    { name: "Varun Singla", channelOrSeries: "Gate Smashers · Data Structures Full Course", url: "https://www.youtube.com/playlist?list=PLxCzCOWd7aiEwaANNt3OqJPVIxwp2ebiT", focusArea: "Arrays, linked lists, trees, BST, AVL, heaps, hashing — GATE numericals", recommendedFor: "GATE-targeted coverage with step-by-step GATE PYQ walkthroughs." },
  ],
  "algorithms": [
    { name: "Abdul Bari", channelOrSeries: "Abdul Bari · Algorithms", url: "https://www.youtube.com/@abdul_bari", focusArea: "Sorting, graph algorithms, dynamic programming, greedy, backtracking", recommendedFor: "Best visual explanations of algorithm design and complexity analysis." },
    { name: "Varun Singla", channelOrSeries: "Gate Smashers · Algorithms for GATE", url: "https://www.youtube.com/playlist?list=PLxCzCOWd7aiHcmS4i14bI0VrMbZTKyp2T", focusArea: "Asymptotic analysis, Master Theorem, DP, Dijkstra, Bellman-Ford", recommendedFor: "Exam-focused with GATE PYQ numericals on every major algorithm." },
  ],
  "theory-of-computation": [
    { name: "Varun Singla", channelOrSeries: "Gate Smashers · Theory of Computation", url: "https://www.youtube.com/playlist?list=PLxCzCOWd7aiFM9Lj5G9G_76adtyph52od", focusArea: "DFA/NFA, minimization, CFG, PDA, Turing machines, decidability", recommendedFor: "GATE-focused with clear minimal DFA construction and language classification." },
    { name: "Sanchit Jain", channelOrSeries: "Knowledge Gate · TOC for GATE", url: "https://www.youtube.com/playlist?list=PLmXKhU9FNesTSqP8hWDncxpZXde1EHru8", focusArea: "Regular expressions, pumping lemma, closure properties, Rice's theorem", recommendedFor: "Exam-pattern oriented with closure table drilling and decidability proofs." },
    { name: "Ravindrababu Ravula", channelOrSeries: "Ravindrababu Ravula · TOC Lectures", url: "https://www.youtube.com/@Ravindrababu_Ravula", focusArea: "Formal proofs, Myhill-Nerode theorem, undecidability reductions", recommendedFor: "Mathematically rigorous treatment for high-rank GATE aspirants." },
  ],
  "compiler-design": [
    { name: "Varun Singla", channelOrSeries: "Gate Smashers · Compiler Design", url: "https://www.youtube.com/playlist?list=PLxCzCOWd7aiEKtgkTLjYzmFjfXpMY8oux", focusArea: "Lexical analysis, parsing (LL/LR), SDT, code generation", recommendedFor: "GATE-focused with worked FIRST/FOLLOW and LR parsing table numericals." },
    { name: "Sanchit Jain", channelOrSeries: "Knowledge Gate · Compiler Design for GATE", url: "https://www.youtube.com/playlist?list=PLmXKhU9FNesSQL8bFWWRQBRKrVS0KSKme", focusArea: "Parsing conflicts, operator precedence, syntax-directed translation", recommendedFor: "Exam-oriented explanations of ambiguous grammars and parser conflicts." },
    { name: "Prof. Alex Aiken", channelOrSeries: "Stanford · Compilers (Coursera)", url: "https://www.coursera.org/learn/compilers", focusArea: "Lexing, parsing, semantic analysis, optimization, code generation", recommendedFor: "University-depth treatment of the full compiler pipeline — build a real compiler." },
  ],
  "programming-in-c": [
    { name: "Neso Academy", channelOrSeries: "Neso Academy · C Programming Full Course", url: "https://www.youtube.com/playlist?list=PLBlnK6fEyqRggZZgYpPMUxdY1CYkZtARR", focusArea: "Data types, pointers, arrays, functions, recursion, file I/O", recommendedFor: "Systematic beginner-to-advanced C with clear examples." },
    { name: "Jenny's Lectures", channelOrSeries: "Jenny's Lectures CS/IT · C Programming", url: "https://www.youtube.com/@JennyslecturesCSIT", focusArea: "Arrays, strings, pointers, structures, file handling, preprocessor", recommendedFor: "Clear step-by-step C explanations — great for semester lab preparation." },
  ],
  "discrete-mathematics": [
    { name: "Varun Singla", channelOrSeries: "Gate Smashers · Discrete Mathematics", url: "https://www.youtube.com/playlist?list=PLxCzCOWd7aiH2wwES9vPWsEL6ipTaUSl3", focusArea: "Logic, sets, relations, functions, posets, graph theory, counting", recommendedFor: "GATE-focused discrete maths with formula-sheet style rapid coverage." },
    { name: "Sanchit Jain", channelOrSeries: "Knowledge Gate · Discrete Maths for GATE", url: "https://www.youtube.com/playlist?list=PLmXKhU9FNesRQuMC2hsZPcMKQIJMFHpUG", focusArea: "Relation counting, lattices, group theory, recurrences, graph colouring", recommendedFor: "All relation/function counting formulas in exam-pattern format." },
    { name: "Prof. Trefor Bazett", channelOrSeries: "Dr. Trefor Bazett · Discrete Math Full Course", url: "https://www.youtube.com/playlist?list=PLHXZ9OQGMqxersk8fUxiUMSIx0DBqsKZS", focusArea: "Logic, proof techniques, graph theory, combinatorics, recurrences", recommendedFor: "University-level rigour with engaging visual proofs." },
  ],
  "engineering-mathematics": [
    { name: "Varun Singla", channelOrSeries: "Gate Smashers · Engineering Mathematics", url: "https://www.youtube.com/playlist?list=PLxCzCOWd7aiHg5hCK2dFtIVViSPRBfJvY", focusArea: "Linear algebra, probability, calculus, numerical methods for GATE", recommendedFor: "Efficient GATE maths coverage with high-yield topic prioritization." },
    { name: "3Blue1Brown", channelOrSeries: "3Blue1Brown · Essence of Linear Algebra", url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab", focusArea: "Vectors, matrix transformations, eigenvalues — geometric intuition", recommendedFor: "Building geometric intuition for linear algebra before solving problems." },
  ],
  "digital-logic": [
    { name: "Neso Academy", channelOrSeries: "Neso Academy · Digital Electronics Full Course", url: "https://www.youtube.com/playlist?list=PLBlnK6fEyqRjMH3mWf6kwqiTbT798eAOm", focusArea: "Boolean algebra, K-maps, combinational circuits, flip-flops, sequential logic", recommendedFor: "The most thorough digital logic series — textbook quality at no cost." },
    { name: "Varun Singla", channelOrSeries: "Gate Smashers · Digital Logic for GATE", url: "https://www.youtube.com/playlist?list=PLxCzCOWd7aiEdxyTueuqh684qNBs-7mmK", focusArea: "K-map minimization, multiplexers, decoders, flip-flop conversions, counters", recommendedFor: "GATE-focused digital logic with exam-style numericals." },
  ],
  "general-aptitude": [
    { name: "Varun Singla", channelOrSeries: "Gate Smashers · General Aptitude for GATE", url: "https://www.youtube.com/playlist?list=PLxCzCOWd7aiEKlCKMlvMqlFMFjRcJGMv2", focusArea: "Verbal ability, numerical reasoning, data interpretation, logical reasoning", recommendedFor: "GATE-specific aptitude coverage with past-paper question patterns." },
    { name: "Sanchit Jain", channelOrSeries: "Knowledge Gate · GATE Aptitude", url: "https://www.youtube.com/@Knowledgegate", focusArea: "Sentence completion, critical reasoning, numerical ability", recommendedFor: "Systematic aptitude preparation with exam-pattern questions." },
  ],
};

// ─── Module-specific Curated Recommendations for Operating Systems (Topics 1 - 9) ───

interface TopicRecommendationMeta {
  moduleTitle: string;
  topicSubtitle: string;
  educators: CuratedEducator[];
}

const OS_TOPIC_RECOMMENDATIONS: Record<string, TopicRecommendationMeta> = {
  "1": {
    moduleTitle: "Module 1: OS Foundations & Kernel Architecture",
    topicSubtitle: "Curated high-yield video lectures on Dual Mode Protection, Mode Bit Switches, Traps & System Calls:",
    educators: [
      {
        name: "Varun Singla",
        channelOrSeries: "Gate Smashers · Introduction to Operating System & Functions",
        url: "https://www.youtube.com/watch?v=vBURTt97EkA",
        focusArea: "Dual roles of OS (Resource Allocator vs Extended Machine), Kernels, and System Services",
        recommendedFor: "Crisp first-principles overview with real-world OS architecture intuition.",
      },
      {
        name: "Neso Academy",
        channelOrSeries: "Neso Academy · Dual Mode Operation & System Calls",
        url: "https://www.youtube.com/watch?v=kYJjT4329i4",
        focusArea: "User Mode vs Kernel Mode, Hardware Mode Bit (0/1), Interrupt Vector, Trap Execution",
        recommendedFor: "Textbook-exact blackboard derivations and hardware-level privilege transition diagrams.",
      },
      {
        name: "Sanchit Jain",
        channelOrSeries: "Knowledge Gate · System Calls & OS Architecture for GATE",
        url: "https://www.youtube.com/playlist?list=PLmXKhU9FNesSFvj6gASuWmQd23Ul5omtD",
        focusArea: "Privileged vs Non-Privileged instructions, Trap vs Interrupt vs Signal, GATE PYQs",
        recommendedFor: "Direct exam pattern question-solving on privileged instruction classification.",
      },
      {
        name: "Prof. Robert Morris & Frans Kaashoek",
        channelOrSeries: "MIT 6.828 · Lecture on Isolation Mechanisms, Traps & System Calls",
        url: "https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-828-operating-system-engineering-fall-2012/",
        focusArea: "xv6 Kernel source code, hardware IDT, trapframe construction, register preservation",
        recommendedFor: "Deep engineering appreciation of how real Unix kernel code handles the sysret transition.",
      },
    ],
  },
  "2": {
    moduleTitle: "Module 2: Processes, Threads & Concurrency",
    topicSubtitle: "Curated lectures on Process Lifecycle, PCB Memory Layout, Fork() System Calls & Multi-threading Models:",
    educators: [
      {
        name: "Varun Singla",
        channelOrSeries: "Gate Smashers · L-1.5: Process States in OS & Schedulers",
        url: "https://www.youtube.com/watch?v=rWFH6PLOIEI",
        focusArea: "5-State vs 7-State Process Life Cycle, Suspended states, Long/Medium/Short-term schedulers",
        recommendedFor: "Rapid intuitive mastery of process state transitions and state diagram numericals.",
      },
      {
        name: "Varun Singla",
        channelOrSeries: "Gate Smashers · L-1.12: User Level vs Kernel Level Threads",
        url: "https://www.youtube.com/watch?v=1u-iS6Yd9s0",
        focusArea: "User-Level Threads (ULT) vs Kernel-Level Threads (KLT), TCB structure, Concurrency models",
        recommendedFor: "Clear breakdown of blocking I/O behavior, thread context switches, and kernel space mapping.",
      },
      {
        name: "Neso Academy",
        channelOrSeries: "Neso Academy · fork() and exec() System Calls Walkthrough",
        url: "https://www.youtube.com/watch?v=kYJjT4329i4",
        focusArea: "fork() execution trees, Return values (PID > 0, PID == 0), Zombie and Orphan processes",
        recommendedFor: "Visual tree diagram derivations of fork() return values and process hierarchies.",
      },
      {
        name: "Sanchit Jain",
        channelOrSeries: "Knowledge Gate · Process vs Thread & Fork GATE Numericals",
        url: "https://www.youtube.com/playlist?list=PLmXKhU9FNesSFvj6gASuWmQd23Ul5omtD",
        focusArea: "GATE PYQ derivations on nested fork() loops, shared vs private thread resources, PCB fields",
        recommendedFor: "Exam trick cases on how many times printf() executes in tricky fork() loops.",
      },
    ],
  },
  "3": {
    moduleTitle: "Module 3: CPU Scheduling Algorithms",
    topicSubtitle: "Curated lectures on Gantt Charts, Preemption, FCFS Convoy Effect, Round Robin Quantum & SJF/SRTF:",
    educators: [
      {
        name: "Varun Singla",
        channelOrSeries: "Gate Smashers · L-2.3: First Come First Serve (FCFS) CPU Scheduling",
        url: "https://www.youtube.com/watch?v=k4H-Vn5Z43k",
        focusArea: "FCFS with Arrival Times, Convoy Effect illustration, Turnaround Time and Waiting Time",
        recommendedFor: "Step-by-step Gantt chart calculations with zero arithmetic ambiguity.",
      },
      {
        name: "Varun Singla",
        channelOrSeries: "Gate Smashers · L-2.7: Round Robin (RR) Scheduling Algorithm with Example",
        url: "https://www.youtube.com/watch?v=1u-iS6Yd9s0",
        focusArea: "Preemptive Ready Queue queue management, Time Quantum tuning, Context Switch overhead",
        recommendedFor: "The most reliable demonstration of ready-queue tracking during simultaneous arrivals.",
      },
      {
        name: "Neso Academy",
        channelOrSeries: "Neso Academy · CPU Scheduling Criteria & Algorithms Playlist",
        url: "https://www.youtube.com/playlist?list=PLBlnK6fEyqRbjR2jT38T3nFiIuWAHh2zH",
        focusArea: "SJF vs SRTF preemption tie-breakers, Priority Scheduling with Aging, Multi-Level Feedback Queues",
        recommendedFor: "Structured textbook-level coverage with cleanly paced whiteboard walkthroughs.",
      },
      {
        name: "Sanchit Jain",
        channelOrSeries: "Knowledge Gate · CPU Scheduling GATE PYQs & Edge Cases",
        url: "https://www.youtube.com/playlist?list=PLmXKhU9FNesSFvj6gASuWmQd23Ul5omtD",
        focusArea: "GATE tricky problems with I/O burst interleaving, non-zero arrival times, priority ties",
        recommendedFor: "Intense numerical speed practice and identifying examiner traps in Gantt charts.",
      },
    ],
  },
  "4": {
    moduleTitle: "Module 4: Process Synchronization & Concurrency",
    topicSubtitle: "Curated lectures on Critical Section Problem, Peterson's Algorithm, Semaphores & Classic Concurrency Problems:",
    educators: [
      {
        name: "Varun Singla",
        channelOrSeries: "Gate Smashers · L-3.4: Critical Section Problem (Mutual Exclusion, Progress, Bounded Waiting)",
        url: "https://www.youtube.com/watch?v=TrV_dOX_YHw",
        focusArea: "Primary vs Secondary criteria, Race Conditions, Shared memory hazards, Lock variable flaws",
        recommendedFor: "First-principles clarity on why simple software flags fail without hardware test-and-set.",
      },
      {
        name: "Varun Singla",
        channelOrSeries: "Gate Smashers · L-3.8: Semaphores & L-3.11: Producer Consumer Problem",
        url: "https://www.youtube.com/watch?v=1u-iS6Yd9s0",
        focusArea: "Counting vs Binary Semaphores, Atomic wait() and signal(), Bounded-Buffer synchronization",
        recommendedFor: "Visualizing semaphore value modifications and solving classic producer-consumer flows.",
      },
      {
        name: "Neso Academy",
        channelOrSeries: "Neso Academy · Peterson's Solution for Process Synchronization",
        url: "https://www.youtube.com/watch?v=Xh_4M7enU2M",
        focusArea: "2-Process Peterson's Solution, Proof of Mutual Exclusion, Proof of Progress and Bounded Waiting",
        recommendedFor: "Rigorous academic proof and counter-examples of synchronization invariants.",
      },
      {
        name: "Amit Khurana",
        channelOrSeries: "GATE CSE by Amit Khurana · Process Synchronization Masterclass",
        url: "https://www.youtube.com/playlist?list=PLC36xJgs4dxEGlPPsvshTRh35Vv-Eg_4b",
        focusArea: "Hardware Test-and-Set Lock (TSL), Swap instructions, Reader-Writer problem, Dining Philosophers",
        recommendedFor: "Mathematical rigor and handling high-difficulty GATE synchronization questions.",
      },
    ],
  },
  "5": {
    moduleTitle: "Module 5: Deadlocks: Principles, Prevention & Avoidance",
    topicSubtitle: "Curated lectures on Coffman Conditions, Resource Allocation Graphs (RAG), Banker's Algorithm & Safe Sequences:",
    educators: [
      {
        name: "Varun Singla",
        channelOrSeries: "Gate Smashers · L-4.5: Deadlock Avoidance Banker's Algorithm with Example",
        url: "https://www.youtube.com/watch?v=Xw2S73P0-3E",
        focusArea: "Allocation, Max, Need matrices, Available vector updates, Safe State sequence derivation",
        recommendedFor: "Bulletproof step-by-step matrix calculation workflow for semester and GATE tests.",
      },
      {
        name: "Varun Singla",
        channelOrSeries: "Gate Smashers · L-4.2 & L-4.3: Resource Allocation Graph (Single vs Multi-Instance)",
        url: "https://www.youtube.com/watch?v=1u-iS6Yd9s0",
        focusArea: "Claim edges, Request edges, Assignment edges, Cycle detection criteria in multi-instance RAG",
        recommendedFor: "Visual knot/cycle detection rules and avoiding false positives in multi-instance graphs.",
      },
      {
        name: "Neso Academy",
        channelOrSeries: "Neso Academy · Deadlock Characterization & Prevention Methods",
        url: "https://www.youtube.com/playlist?list=PLBlnK6fEyqRbjR2jT38T3nFiIuWAHh2zH",
        focusArea: "4 Coffman Conditions (Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait), Prevention vs Avoidance",
        recommendedFor: "Deep foundational theory explaining how operating systems break circular wait using resource ordering.",
      },
      {
        name: "Sanchit Jain",
        channelOrSeries: "Knowledge Gate · Banker's Resource-Request Algorithm & GATE PYQs",
        url: "https://www.youtube.com/playlist?list=PLmXKhU9FNesSFvj6gASuWmQd23Ul5omtD",
        focusArea: "Request <= Need & Request <= Available checks, Immediate grant safety testing, GATE formula shortcuts",
        recommendedFor: "Exam speed drilling on multi-resource requests without re-computing the full safety table.",
      },
    ],
  },
  "6": {
    moduleTitle: "Module 6: Main Memory Management & Paging",
    topicSubtitle: "Curated lectures on Logical-to-Physical Translation, Page Tables, TLBs, Multi-level Paging & Internal Fragmentation:",
    educators: [
      {
        name: "Varun Singla",
        channelOrSeries: "Gate Smashers · L-5.9: What is Paging & Address Translation Architecture",
        url: "https://www.youtube.com/watch?v=kNTh034379M",
        focusArea: "Logical Address bit-splitting (Page Number p, Offset d), Physical Frames (f, d), MMU hardware",
        recommendedFor: "Crystal-clear mental models of base register indexing and physical frame lookup.",
      },
      {
        name: "Varun Singla",
        channelOrSeries: "Gate Smashers · L-5.13: 2-Level Paging in Operating System | Multilevel Paging",
        url: "https://www.youtube.com/watch?v=1u-iS6Yd9s0",
        focusArea: "Outer page table size, Inner page table, PTE calculations, preventing massive page tables in RAM",
        recommendedFor: "Definitive step-by-step formula derivation for multi-level address bit partitioning.",
      },
      {
        name: "Neso Academy",
        channelOrSeries: "Neso Academy · Translation Lookaside Buffer (TLB) & Effective Memory Access Time",
        url: "https://www.youtube.com/playlist?list=PLBlnK6fEyqRbjR2jT38T3nFiIuWAHh2zH",
        focusArea: "TLB Hit Ratio, Associative hardware cache, EMAT = h*(c + m) + (1-h)*(c + 2m) derivations",
        recommendedFor: "Blackboard mathematical rigor on single-level and multi-level TLB penalty calculations.",
      },
      {
        name: "Sanchit Jain",
        channelOrSeries: "Knowledge Gate · Page Table Size & Inverted Page Table Numericals",
        url: "https://www.youtube.com/playlist?list=PLmXKhU9FNesSFvj6gASuWmQd23Ul5omtD",
        focusArea: "Page table size = (Virtual space / Page size) * PTE, Inverted Page Table hashing, GATE PYQs",
        recommendedFor: "Intense numerical drilling on calculating exact memory consumption of hierarchical tables.",
      },
    ],
  },
  "7": {
    moduleTitle: "Module 7: Virtual Memory & Page Replacement",
    topicSubtitle: "Curated lectures on Demand Paging, Page Fault Handling, FIFO, LRU, Optimal & Belady's Anomaly:",
    educators: [
      {
        name: "Varun Singla",
        channelOrSeries: "Gate Smashers · L-5.22 & L-5.25: FIFO & Least Recently Used (LRU) Page Replacement",
        url: "https://www.youtube.com/watch?v=kYJ5b9B42Yg",
        focusArea: "Reference string simulations, Page hit vs Page miss count, Stack/Clock LRU implementation",
        recommendedFor: "Clear, foolproof tabular layouts for tracking frames during page replacement exams.",
      },
      {
        name: "Varun Singla",
        channelOrSeries: "Gate Smashers · L-5.23: Belady's Anomaly in FIFO Page Replacement with Example",
        url: "https://www.youtube.com/watch?v=vXNCq0V1q1U",
        focusArea: "Belady's counter-intuitive anomaly (more frames -> more page faults), 1,2,3,4,1,2,5,1,2,3,4,5 proof",
        recommendedFor: "The canonical reference string demonstration showing why FIFO is not a stack algorithm.",
      },
      {
        name: "Neso Academy",
        channelOrSeries: "Neso Academy · Demand Paging & Effective Access Time with Page Fault Service",
        url: "https://www.youtube.com/playlist?list=PLBlnK6fEyqRbjR2jT38T3nFiIuWAHh2zH",
        focusArea: "Page Fault Interrupt lifecycle, Swap space I/O penalty, EMAT with page fault probability p",
        recommendedFor: "Deriving page fault overhead equations and disk transfer delay calculations.",
      },
      {
        name: "Amit Khurana",
        channelOrSeries: "GATE CSE by Amit Khurana · Thrashing & Working Set Model",
        url: "https://www.youtube.com/playlist?list=PLC36xJgs4dxEGlPPsvshTRh35Vv-Eg_4b",
        focusArea: "Working Set Strategy, Page Fault Frequency (PFF), Thrashing causes and degree of multiprogramming",
        recommendedFor: "Theoretical depth on CPU utilization drops and operating system thrashing prevention.",
      },
    ],
  },
  "8": {
    moduleTitle: "Module 8: File Systems & Storage Architecture",
    topicSubtitle: "Curated lectures on Unix Inode Architecture, File Allocation (Contiguous, Linked, Indexed) & Directory Structures:",
    educators: [
      {
        name: "Varun Singla",
        channelOrSeries: "Gate Smashers · L-7.7: Unix Inode Structure with Numerical Example",
        url: "https://www.youtube.com/watch?v=s5R514n-z3U",
        focusArea: "Direct block pointers (12), Single Indirect, Double Indirect, Triple Indirect block calculations",
        recommendedFor: "The most widely cited video for computing Maximum File Size supported by a Unix Inode.",
      },
      {
        name: "Neso Academy",
        channelOrSeries: "Neso Academy · The UNIX Inode & File Allocation Methods",
        url: "https://www.youtube.com/playlist?list=PLBlnK6fEyqRbjR2jT38T3nFiIuWAHh2zH",
        focusArea: "Contiguous vs Linked Allocation (FAT table) vs Indexed Allocation, Internal vs External fragmentation",
        recommendedFor: "Textbook-grade visual diagrams comparing random access speeds and storage block chains.",
      },
      {
        name: "Sanchit Jain",
        channelOrSeries: "Knowledge Gate · Inode Numerical Questions for GATE & Semesters",
        url: "https://www.youtube.com/playlist?list=PLmXKhU9FNesSFvj6gASuWmQd23Ul5omtD",
        focusArea: "Disk block size variations, Disk block address sizes, GATE PYQs on inode pointer limits",
        recommendedFor: "High-accuracy calculation templates for tricky inode capacity questions with power-of-two bytes.",
      },
      {
        name: "Ravindrababu Ravula",
        channelOrSeries: "Ravindrababu Ravula · File System Organization & Inodes",
        url: "https://www.youtube.com/@Ravindrababu_Ravula",
        focusArea: "Superblock, Inode table in disk partition, Free space management (Bit vector, Grouping, Counting)",
        recommendedFor: "Rigorous operating system storage foundations and sector-level disk layout.",
      },
    ],
  },
  "9": {
    moduleTitle: "Module 9: I/O Systems & Disk Scheduling",
    topicSubtitle: "Curated lectures on Disk Geometry, Seek Time, Rotational Latency, FCFS, SSTF, SCAN, C-SCAN & LOOK:",
    educators: [
      {
        name: "Varun Singla",
        channelOrSeries: "Gate Smashers · L-6.3 & L-6.6: Disk Scheduling Algorithms & SCAN Algorithm",
        url: "https://www.youtube.com/watch?v=kYv9i4-cR_M",
        focusArea: "SSTF starvation risks, Elevator (SCAN) algorithm, Cylinder boundaries (0 and N-1) head movements",
        recommendedFor: "Easy-to-follow cylinder timeline diagrams calculating Total Head Movement without errors.",
      },
      {
        name: "Varun Singla",
        channelOrSeries: "Gate Smashers · L-6.8 & L-6.9: C-SCAN & C-LOOK Disk Scheduling with Example",
        url: "https://www.youtube.com/watch?v=1u-iS6Yd9s0",
        focusArea: "Circular return travel, C-SCAN vs C-LOOK endpoint servicing, Uniform wait time advantages",
        recommendedFor: "Clear differentiation on when the disk head reverses at the extreme track vs the last request.",
      },
      {
        name: "Neso Academy",
        channelOrSeries: "Neso Academy · Mass Storage Structure & Disk Access Time Breakdown",
        url: "https://www.youtube.com/playlist?list=PLBlnK6fEyqRbjR2jT38T3nFiIuWAHh2zH",
        focusArea: "Disk Platter geometry, Tracks, Sectors, Seek Time + Rotational Latency (1 / 2*RPM) + Transfer Rate",
        recommendedFor: "Clean mathematical derivations of average rotational delay and disk transfer bandwidth.",
      },
      {
        name: "Sanchit Jain",
        channelOrSeries: "Knowledge Gate · Disk Scheduling GATE PYQs & Total Head Travel",
        url: "https://www.youtube.com/playlist?list=PLmXKhU9FNesSFvj6gASuWmQd23Ul5omtD",
        focusArea: "GATE PYQs on SCAN direction assumptions ('currently moving toward higher track numbers'), Cylinder math",
        recommendedFor: "Formula shortcuts for quickly subtracting max-min track positions during competitive exams.",
      },
    ],
  },
};

export default function ResourcesAndSources({
  section,
  subjectSlug,
  modNum,
  moduleTitle,
}: {
  section: ResourcesSection;
  subjectSlug?: string;
  modNum?: string;
  moduleTitle?: string;
}) {
  const { sources, stillStuck } = section;

  // Resolve topic-specific recommendation for Operating Systems if applicable
  const osTopic =
    subjectSlug === "operating-systems" && modNum && OS_TOPIC_RECOMMENDATIONS[modNum]
      ? OS_TOPIC_RECOMMENDATIONS[modNum]
      : null;

  // Resolve educators: use topic-specific for OS modules, fallback to subject-level
  const educators: CuratedEducator[] =
    osTopic?.educators ||
    (subjectSlug && EDUCATORS_BY_SUBJECT[subjectSlug]) ||
    [];

  const sectionHeaderTitle = osTopic
    ? `RECOMMENDED YOUTUBE LECTURES & EDUCATORS: ${osTopic.moduleTitle.toUpperCase()}`
    : "RECOMMENDED YOUTUBE EDUCATORS & FULL-COURSE PLAYLISTS";

  const sectionHeaderSubtitle = osTopic
    ? osTopic.topicSubtitle
    : "Curated for clarity, rigorous numerical solving, and semester excellence:";

  // Group sources academically
  const primarySources = sources.filter(
    (s) => s.type === "primary-standard" || s.type === "academic-paper"
  );
  const examSources = sources.filter(
    (s) => s.type === "gate-official" || s.type === "verified-pyq"
  );
  const learningSources = sources.filter(
    (s) =>
      s.type !== "primary-standard" &&
      s.type !== "academic-paper" &&
      s.type !== "gate-official" &&
      s.type !== "verified-pyq"
  );

  return (
    <section className="my-12 pt-8 border-t border-hairline">
      <div className="mb-6">
        <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-ink-3 block mb-1">
          SOURCE TRANSPARENCY & CITATIONS
        </span>
        <h4 className="text-lg font-bold text-ink-1 font-sans">
          Primary Academic References & Exam Sources
        </h4>
        <p className="text-xs text-ink-3 mt-1 max-w-[68ch] leading-relaxed">
          Every concept in Notes From a B.Tech Brain is synthesized from authoritative academic texts, seminal peer-reviewed research, verified exam archives, and renowned university lectures.
        </p>
      </div>

      {/* Primary Academic References */}
      {primarySources.length > 0 && (
        <div className="mb-6">
          <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-accent block mb-2">
            Primary Academic Texts
          </span>
          <div className="divide-y divide-hairline border-y border-hairline">
            {primarySources.map((src, idx) => (
              <div
                key={idx}
                className="py-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 text-xs"
              >
                <div className="min-w-0">
                  {src.url ? (
                    <a
                      href={src.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-ink-1 hover:text-accent font-sans text-sm inline-flex items-center gap-1 group transition-colors mr-2"
                    >
                      <span>{src.title}</span>
                      <span className="text-[10px] text-ink-3 group-hover:text-accent font-mono transition-colors">
                        ↗
                      </span>
                    </a>
                  ) : (
                    <span className="font-bold text-ink-1 font-sans text-sm block sm:inline mr-2">
                      {src.title}
                    </span>
                  )}
                  <span className="font-mono text-ink-3 text-[11px]">
                    by {src.authorOrInstitution} &middot; {src.topic}
                  </span>
                  {src.annotation && (
                    <p className="text-ink-2 text-xs leading-relaxed mt-1 max-w-[65ch] font-sans">
                      {src.annotation}
                    </p>
                  )}
                </div>
                <span className="font-mono text-[9px] uppercase tracking-wider text-ink-3 shrink-0">
                  ACADEMIC STANDARD
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* GATE Official Sources */}
      {examSources.length > 0 && (
        <div className="mb-6">
          <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-accent block mb-2">
            Official Examination Archives
          </span>
          <div className="divide-y divide-hairline border-y border-hairline">
            {examSources.map((src, idx) => (
              <div
                key={idx}
                className="py-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 text-xs"
              >
                <div className="min-w-0">
                  {src.url ? (
                    <a
                      href={src.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-ink-1 hover:text-accent font-sans text-sm inline-flex items-center gap-1 group transition-colors mr-2"
                    >
                      <span>{src.title}</span>
                      <span className="text-[10px] text-accent font-mono transition-colors">
                        ↗
                      </span>
                    </a>
                  ) : (
                    <span className="font-bold text-ink-1 font-sans text-sm block sm:inline mr-2">
                      {src.title}
                    </span>
                  )}
                  <span className="font-mono text-ink-3 text-[11px]">
                    {src.authorOrInstitution} &middot; {src.topic}
                  </span>
                  {src.annotation && (
                    <p className="text-ink-2 text-xs leading-relaxed mt-1 max-w-[65ch] font-sans">
                      {src.annotation}
                    </p>
                  )}
                </div>
                <span className="font-mono text-[9px] uppercase tracking-wider text-accent font-semibold shrink-0">
                  GATE CS OFFICIAL
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Curated Learning Resources */}
      {learningSources.length > 0 && (
        <div className="mb-6">
          <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-accent block mb-2">
            Curated University Lecture Series
          </span>
          <div className="divide-y divide-hairline border-y border-hairline">
            {learningSources.map((src, idx) => (
              <div
                key={idx}
                className="py-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 text-xs"
              >
                <div className="min-w-0">
                  {src.url ? (
                    <a
                      href={src.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-ink-1 hover:text-accent font-sans text-sm inline-flex items-center gap-1 group transition-colors mr-2"
                    >
                      <span>{src.title}</span>
                      <span className="text-[10px] text-ink-3 group-hover:text-accent font-mono transition-colors">
                        ↗
                      </span>
                    </a>
                  ) : (
                    <span className="font-bold text-ink-1 font-sans text-sm block sm:inline mr-2">
                      {src.title}
                    </span>
                  )}
                  <span className="font-mono text-ink-3 text-[11px]">
                    {src.authorOrInstitution} &middot; {src.topic}
                  </span>
                  {src.annotation && (
                    <p className="text-ink-2 text-xs leading-relaxed mt-1 max-w-[65ch] font-sans">
                      {src.annotation}
                    </p>
                  )}
                </div>
                <span className="font-mono text-[9px] uppercase tracking-wider text-ink-3 shrink-0">
                  LECTURE SERIES
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Alternative Curated Explanations / Lesson-Specific Links */}
      {stillStuck && stillStuck.length > 0 && (
        <div className="border border-hairline rounded p-4 sm:p-5 bg-surface-1 my-6">
          <span className="font-mono text-[10px] uppercase tracking-widest font-bold text-accent block mb-1">
            ALTERNATIVE PEDAGOGICAL PERSPECTIVES
          </span>
          <p className="text-xs text-ink-2 mb-3 max-w-[68ch]">
            If the textbook derivation did not click immediately, consult these targeted video lessons:
          </p>

          <div className="divide-y divide-hairline border-t border-hairline pt-1">
            {stillStuck.map((item, idx) => (
              <div
                key={idx}
                className="py-2.5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 text-xs"
              >
                <div>
                  <span className="font-bold text-ink-1 block">
                    {item.title}
                  </span>
                  <span className="text-ink-3 font-mono text-[11px] block">
                    {item.creator} {item.duration ? `(${item.duration})` : ""}
                  </span>
                  <p className="text-ink-2 text-xs leading-relaxed mt-0.5 max-w-[60ch]">
                    {item.whyThisHelps}
                  </p>
                </div>
                {item.url && (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 text-accent hover:text-accent-soft text-xs font-mono font-semibold transition-colors inline-flex items-center gap-1"
                  >
                    <span>Watch Lesson</span>
                    <span>↗</span>
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Subject-specific Curated YouTube Educators */}
      {educators.length > 0 && (
      <div className="mt-8 border border-hairline rounded p-4 sm:p-5 bg-surface-1">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-3">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest font-bold text-accent block mb-0.5">
              {sectionHeaderTitle}
            </span>
            <p className="text-xs text-ink-2 max-w-[68ch]">
              {sectionHeaderSubtitle}
            </p>
          </div>
        </div>

        <div className="divide-y divide-hairline border-t border-hairline">
          {educators.map((edu, idx) => (
            <div
              key={idx}
              className="py-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 text-xs"
            >
              <div className="min-w-0">
                <a
                  href={edu.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-ink-1 hover:text-accent font-sans text-sm inline-flex items-center gap-1 group transition-colors"
                >
                  <span>{edu.channelOrSeries}</span>
                  <span className="text-[10px] text-ink-3 group-hover:text-accent font-mono transition-colors">
                    ↗
                  </span>
                </a>
                <span className="block text-[11px] font-mono text-ink-3 mt-0.5">
                  Instructor: {edu.name} &middot; Covers: {edu.focusArea}
                </span>
                <p className="text-ink-2 text-xs leading-relaxed mt-1 font-sans">
                  {edu.recommendedFor}
                </p>
              </div>

              <a
                href={edu.url}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded border border-hairline bg-surface-2 hover:bg-surface-3 text-ink-2 hover:text-ink-1 font-mono text-[11px] transition-colors"
              >
                <span>Open YouTube</span>
                <span>↗</span>
              </a>
            </div>
          ))}
        </div>
      </div>
      )}
    </section>
  );
}
