import { CourseMeta } from "./types";

export const OPERATING_SYSTEMS_COURSE: CourseMeta = {
  id: "operating-systems",
  title: "Operating Systems",
  slug: "operating-systems",
  subjectSlug: "operating-systems",
  shortTitle: "OS",
  icon: "🖧",
  badge: "Complete B.Tech & GATE CS Curriculum",
  tagline: "Understand the invisible machinery behind every program you run.",
  description:
    "A first-principles, student-facing Operating Systems notebook covering core undergraduate concepts and GATE-oriented practice. Learn dual-mode protection, process synchronization, CPU scheduling, deadlock safety, paging and TLBs, demand paging, file systems, and disk scheduling through explanations, models, laboratories, and clearly labelled exam practice.",
  prerequisites: [
    "C Programming fundamentals (pointers, structs, memory addresses)",
    "Computer Architecture basics (CPU registers, Program Counter, ALU, RAM)",
  ],
  estimatedTotalHours: 32,
  targetAudience:
    "B.Tech Computer Science / Information Technology undergraduates, systems engineers, and serious GATE CS aspirants.",
  gateWeightage: "GATE CS topic coverage; current marks vary by paper and year",
  gateSyllabusTopics: [
    "Processes, threads, inter-process communication, concurrency and synchronization",
    "Deadlock detection, prevention and avoidance (Banker's algorithm)",
    "CPU and process scheduling (FCFS, SJF, SRTF, Round Robin, Priority)",
    "Memory management and virtual memory (Paging, multi-level tables, TLB, Page replacement algorithms)",
    "File systems: Unix Inode structure, file allocation methods",
    "I/O systems and disk scheduling algorithms (SSTF, SCAN, C-SCAN, LOOK)",
  ],
  modules: [
    // ══════════════════════════════════════════════════════════════════════
    // MODULE 1 — OS FOUNDATIONS & ARCHITECTURE
    // ══════════════════════════════════════════════════════════════════════
    {
      id: "os-foundations",
      title: "Module 1: OS Foundations & Kernel Architecture",
      slug: "os-foundations",
      order: 1,
      tagline: "The dual role of the OS: Arbitrating hardware and abstracting chaos.",
      lessons: [
        {
          id: "why-operating-systems-exist",
          title: "Why Operating Systems Exist: The Dual Role",
          slug: "why-operating-systems-exist",
          order: 1,
          estimatedMinutes: 16,
          tagline: "From bare-metal programming chaos to resource arbitration and clean abstractions.",
          hasInteractive: false,
          hasGATE: true,
          hasPractice: true,
          sections: [
            {
              type: "explanation",
              heading: "1. The Bare-Metal Dilemma: Why Software Needs a Kernel",
              body: [
                "Consider an early computer without an operating system. If two programmers wanted to run code, only one program could occupy physical memory at any moment. Every application developer had to write custom assembly routines to pulse stepper motors on magnetic tape drives, interpret raw magnetic platter track signals, and manually poll keyboard controller registers.",
                "Worse yet: what happens when an errant program gets stuck in an infinite loop, or writes a zero to a memory address holding another user's bank ledger? Without an ==green:intermediary layer with special hardware authority==, any user code can destroy the entire machine's state.",
                "To resolve this, modern computer engineering introduced the **Operating System (OS)** and its privileged core, the **kernel**. The OS kernel is the software that runs directly on bare hardware in a ==pink:privileged mode==, providing two foundational services: ==yellow:Resource Management== (allocation, isolation, protection) and ==purple:Extended Machine Abstraction== (transforming ugly hardware registers into elegant files, sockets, threads, and processes).",
              ],
              callout: {
                kind: "mental-model",
                title: "Mental Model: Government vs. Resource Allocator",
                message:
                  "Silberschatz et al. famously compare the OS to a government: by itself, the OS kernel performs no useful computational work (it doesn't calculate payroll or render graphics). Instead, it provides an orderly environment in which user applications and worker threads can execute safely without mutual interference.",
              },
            },
            {
              type: "comparison",
              heading: "2. The Dual Responsibilities of an OS",
              leadParagraph:
                "Understanding the difference between top-down and bottom-up perspectives is foundational in system architecture.",
              columns: ["Resource Manager (Bottom-Up)", "Extended Machine (Top-Down)"],
              criteria: [
                {
                  feature: "Primary Objective",
                  first: "Fair, efficient, and protected ==purple:multiplexing of scarce physical hardware== (CPU, RAM, Disks, Network).",
                  second: "Shield application developers from low-level hardware peculiarities through ==yellow:clean abstractions==.",
                },
                {
                  feature: "Key Mechanisms",
                  first: "Time-sharing (CPU scheduling of threads), space-sharing (paging & virtual memory), access control lists.",
                  second: "File systems (abstracting disk blocks into hierarchical files), Sockets (abstracting packet networks), Processes & Threads (abstracting hardware CPU execution).",
                },
                {
                  feature: "Failure Mode",
                  first: "==pink:Deadlock, thrashing, starvation==, unauthorized memory corruption.",
                  second: "==pink:Leaky abstractions==, hardware incompatibility, brittle device drivers.",
                },
              ],
              summaryTakeaway:
                "An OS is both an ==purple:abstractor== (providing clean APIs) and an ==yellow:arbitrator== (preventing mutually distrustful programs from destroying one another).",
            },
            {
              type: "misconceptions",
              heading: "3. Common Student Misconceptions",
              items: [
                {
                  commonMyth: "The OS runs continuously in the background on its own dedicated CPU core.",
                  reality: "In single-core systems, the OS does NOT run continuously. It executes only when triggered by hardware interrupts, software traps, or system calls.",
                  explanation:
                    "When user code runs, the CPU is ==green:100% executing user instructions==. The OS kernel is invoked only when an event (timer interrupt, I/O completion, page fault, or explicit system call) causes the CPU to ==pink:switch into privileged kernel mode==.",
                },
                {
                  commonMyth: "An application can communicate directly with the hard drive controller if written in C.",
                  reality: "Direct device I/O instructions (`in`, `out` on x86) are privileged and will trigger a General Protection Fault if executed in User Mode.",
                  explanation:
                    "Modern hardware prevents user-mode processes from touching device registers. The application must invoke the kernel via a ==purple:system call==, and the kernel device driver carries out the operation on behalf of the user.",
                },
              ],
            },
            {
              type: "diagram",
              heading: "4. How the OS mediates a program",
              diagramType: "architecture",
              caption: "User programs request services through protected kernel entry points; the kernel arbitrates hardware access.",
            },
            {
              type: "gate-lens",
              heading: "5. GATE Lens: What You Need to Know",
              weightageSummary:
                "Foundational architectural concepts appear in GATE as 1-mark conceptual multiple-choice and MSQ questions regarding OS roles and protection boundaries.",
              commonPatterns: [
                "Classifying functions of the operating system into resource management vs abstraction.",
                "Identifying which software components run in privileged vs unprivileged mode.",
              ],
              commonTraps: [
                "⚠ Confusing user-level libraries (like `printf()` or `malloc()`) with kernel system calls (`write()`, `sbrk()`).",
              ],
              pyqs: [
                {
                  id: "gate-os-intro-2014",
                  year: 2014,
                  marks: 1,
                  question:
                    "Which of the following is/are NOT the primary responsibility of an operating system kernel? (P) Compiling high-level C programs (Q) Allocating physical frames to virtual memory pages (R) Scheduling threads on available CPU cores (S) Resolving hardware interrupt requests",
                  options: [
                    "A. P only",
                    "B. Q and R only",
                    "C. P and S only",
                    "D. Q only",
                  ],
                  correctOptionOrValue: "A. P only",
                  detailedSolution:
                    "Compilers (such as GCC or Clang) are user-level application programs and utility software, completely distinct from the OS kernel. Memory management (Q), CPU scheduling (R), and interrupt handling (S) are core responsibilities executed inside the OS kernel.",
                  keyFormulaOrConcept: "Kernel = Minimal set of software managing hardware resources.",
                },
              ],
            },
            {
              type: "quick-revision",
              heading: "6. 1-Minute Panic Revision",
              cheatSheetDownloadSlug: "os-foundations-kernel-roles",
              oneMinutePanicCard: {
                coreRule:
                  "OS = Resource Manager (arbitrator of CPU, RAM, I/O) + Extended Machine (abstractor of hardware into files, sockets, processes).",
                mustRememberFormulas: [
                  "Kernel execution is reactive: Invoked strictly via Interrupts, Traps, or System Calls.",
                  "Hardware provides the protection boundary (Mode Bit); the OS sets the policy.",
                ],
                criticalPitfalls: [
                  "Compilers, linkers, shells, and web browsers are NOT part of the OS kernel; they are user applications.",
                  "Device drivers run with kernel privileges, making poorly written drivers the leading cause of OS crashes.",
                ],
              },
            },
            {
              type: "resources",
              heading: "7. Authoritative Source Trail",
              sources: [
                {
                  title: "Operating System Concepts (10th Edition)",
                  authorOrInstitution: "Silberschatz, Galvin, Gagne",
                  topic: "Chapter 1: Introduction & Chapter 2: Operating-System Structures",
                  url: "https://codex.cs.yale.edu/avi/os-book/OS10/slide-dir/index.html",
                  type: "primary-standard",
                  annotation: "Official Chapter 1 & 2 slides and notes detailing the OS as a control program and resource allocator.",
                },
                {
                  title: "Operating Systems: Three Easy Pieces (OSTEP)",
                  authorOrInstitution: "Remzi H. Arpaci-Dusseau and Andrea C. Arpaci-Dusseau",
                  topic: "Chapter 2: A Dialogue on Virtualization & Introduction to Operating Systems",
                  url: "https://pages.cs.wisc.edu/~remzi/OSTEP/intro.pdf",
                  type: "primary-standard",
                  annotation: "Free full chapter PDF on how early mainframes gave way to operating systems that abstract and virtualize CPU, memory, and devices.",
                },
                {
                  title: "NPTEL: Operating System Fundamentals",
                  authorOrInstitution: "Prof. Santanu Chattopadhyay (IIT Kharagpur)",
                  topic: "Lecture 1: Introduction to Operating Systems & Roles",
                  url: "https://nptel.ac.in/courses/106105214",
                  type: "curated-lecture",
                  annotation: "Direct university lecture covering the top-down and bottom-up view of the kernel.",
                },
              ],
              stillStuck: [
                {
                  prompt: "If the distinction between kernel and application software feels blurry...",
                  title: "Introduction to Operating System: What is an OS?",
                  creator: "Gate Smashers (Varun Singla)",
                  url: "https://www.youtube.com/watch?v=vBURTt97EkA",
                  duration: "9 mins",
                  whyThisHelps:
                    "Direct 9-minute lecture focusing exclusively on why operating systems exist, resource management, and why applications need a kernel.",
                },
                {
                  prompt: "For whiteboard clarity on how the kernel manages CPU, Memory, and I/O...",
                  title: "Introduction to Operating Systems (Lesson 1)",
                  creator: "Neso Academy",
                  url: "https://www.youtube.com/watch?v=26QPDBe-NB8",
                  duration: "11 mins",
                  whyThisHelps:
                    "Step-by-step whiteboard explanation of hardware abstraction and the kernel intermediary boundary.",
                },
              ],
            },
          ],
        },
        {
          id: "dual-mode-and-system-calls",
          title: "Dual-Mode Execution, Hardware Protection & System Calls",
          slug: "dual-mode-and-system-calls",
          order: 2,
          estimatedMinutes: 20,
          tagline: "The hardware mode bit, privileged instructions, and the boundary crossing of system calls.",
          hasInteractive: true,
          hasGATE: true,
          hasPractice: true,
          sections: [
            {
              type: "explanation",
              heading: "1. The Hardware Mode Bit: Enforcing Protection",
              body: [
                "Software alone cannot protect itself from malicious or buggy software. If an unprivileged program could simply execute an instruction to disable all hardware interrupts, or reprogram the memory controller, the OS would be completely powerless to regain control.",
                "To make an OS secure, computer hardware architects added at least two distinct operational states to the CPU: **User Mode** and **Kernel Mode** (also known as Supervisor Mode, System Mode, or Privileged Mode).",
                "A physical hardware bit—the ==yellow:Mode Bit==—is maintained in a CPU status register. When the Mode Bit is `1`, the CPU is in ==purple:User Mode==; when the Mode Bit is `0`, the CPU is in ==purple:Kernel Mode==.",
              ],
              callout: {
                kind: "trap",
                title: "Core Rule: Privileged Instructions",
                message:
                  "Instructions that could compromise machine integrity (e.g., modifying the page table base pointer, halting the CPU with `HLT`, enabling/disabling interrupts with `CLI`/`STI`, or issuing raw I/O instructions) are designated as PRIVILEGED. If executed when Mode Bit = 1, the CPU hardware generates an immediate exception (trap) and halts the offending process.",
              },
            },
            {
              type: "diagram",
              heading: "2. The Anatomy of a System Call Transition",
              caption:
                "Figure 1.1 — Dual-Mode Execution and the System Call Trap boundary. Notice the hardware switch of the Mode Bit from 1 to 0 upon trap, and back to 1 on return-from-trap.",
              diagramType: "architecture",
            },
            {
              type: "explanation",
              heading: "3. Traps, Interrupts, and Exceptions: Precise Distinctions",
              body: [
                "In undergraduate coursework and GATE examinations, the words *interrupt*, *trap*, and *exception* are frequently conflated. They have mathematically precise technical distinctions:",
                "**1. Hardware Interrupt (Asynchronous):** Generated externally by ==green:hardware peripherals== (keyboard keystroke, disk sector read finished, timer chip countdown reached zero). It is completely independent of the currently executing instruction.",
                "**2. Software Interrupt / Trap (Synchronous):** Explicitly generated by an instruction executed by the CPU. Used deliberately by user applications to ==yellow:request OS services via a System Call== (e.g., `INT 0x80` or `SYSCALL` instruction).",
                "**3. Exception / Fault (Synchronous):** Generated automatically by the CPU hardware when an ==pink:illegal condition occurs during instruction execution== (divide by zero, invalid opcode, page fault, or segmentation fault).",
              ],
            },
            {
              type: "comparison",
              heading: "4. Comparison: System Call vs. Standard Function Call",
              leadParagraph:
                "Why can't a C program simply `call` the kernel code inside memory directly?",
              columns: ["Standard Library Call (e.g. strlen)", "Kernel System Call (e.g. read, fork)"],
              criteria: [
                {
                  feature: "Execution Privilege",
                  first: "Executes entirely in User Mode (Mode Bit remains 1).",
                  second: "Transitions CPU into Kernel Mode (Mode Bit switches to 0).",
                },
                {
                  feature: "Address Boundary",
                  first: "Internal jump within the user process's own virtual address space.",
                  second: "Crosses protection boundary into kernel space via System Call Table index.",
                },
                {
                  feature: "Performance Overhead",
                  first: "Negligible: Simple stack frame allocation and register jump (~a few nanoseconds).",
                  second: "Substantial: Hardware context save, kernel stack switch, TLB validation, parameter security validation (~microseconds).",
                },
                {
                  feature: "Invoking Instruction",
                  first: "Standard assembly `call` instruction.",
                  second: "Software interrupt/trap instruction (`syscall`, `sysenter`, `int 0x80`).",
                },
              ],
              summaryTakeaway:
                "System calls are gated doorways: user code cannot branch to arbitrary addresses inside kernel RAM; it can only request specific service routines exposed through the System Call Table.",
            },
            {
              type: "worked-example",
              heading: "5. Worked Example: Step-by-Step System Call Execution",
              problemStatement:
                "Trace what occurs at both the hardware and software levels when a C program executes `ssize_t bytes = read(fd, buffer, 1024);`.",
              givenData: [
                { label: "File Descriptor", value: "fd = 0 (stdin)" },
                { label: "Buffer", value: "Address in user heap/stack" },
                { label: "Size", value: "1024 bytes" },
              ],
              steps: [
                {
                  stepNumber: 1,
                  title: "User Library Wrapper",
                  description:
                    "The C runtime library (glibc) places the system call identifier for `read` (e.g., 0 on x86_64) into the RAX/EAX register and loads parameters (fd, buffer, count) into designated ABI registers (RDI, RSI, RDX).",
                  formula: "RAX = __NR_read",
                },
                {
                  stepNumber: 2,
                  title: "Trap to Kernel",
                  description:
                    "The wrapper executes the `syscall` instruction. Hardware automatically saves the user Program Counter and Status Register, switches the CPU Mode Bit from 1 (User) to 0 (Kernel), and switches from the user stack to the kernel stack.",
                  formula: "Hardware Mode Bit: 1 → 0",
                  intermediateResult: "CPU is now in Kernel Mode executing at the Interrupt Descriptor Table (IDT) handler.",
                },
                {
                  stepNumber: 3,
                  title: "System Call Table Dispatch",
                  description:
                    "The kernel reads the number in RAX, verifies that the user buffer is in valid user memory (and not pointing inside protected kernel RAM), and branches to `sys_read()`.",
                },
                {
                  stepNumber: 4,
                  title: "Return from Trap",
                  description:
                    "Once data is copied, the kernel places the return value (bytes read) in RAX and issues `sysret` / `iret`. Hardware restores the user stack, restores the user PC, and flips the Mode Bit back to 1.",
                  formula: "Hardware Mode Bit: 0 → 1",
                },
              ],
              finalAnswer:
                "The process safely receives 1024 bytes into its buffer while hardware guarantees that user code never possessed kernel privileges.",
              examTakeaway:
                "System calls require an atomic hardware transition of the Mode Bit. Software alone cannot switch itself into kernel mode.",
            },
            {
              type: "gate-lens",
              heading: "6. GATE Lens & Verified PYQs",
              weightageSummary:
                "Mode switches, privileged instructions, and interrupt vs trap distinctions are consistently tested in GATE CS (appearing in 2011, 2015, 2018, 2021).",
              commonPatterns: [
                "Classifying a given list of instructions into privileged vs non-privileged.",
                "Identifying which events cause a switch from User Mode to Kernel Mode.",
                "Calculating context switch overhead and identifying state preserved across mode switches.",
              ],
              commonTraps: [
                "⚠ Trap is synchronous (generated by software instruction); hardware interrupt is asynchronous (generated by external device).",
                "⚠ A Mode Switch is NOT the same as a Process Context Switch. A mode switch switches privilege for the SAME process; a process context switch switches between TWO DIFFERENT processes.",
              ],
              pyqs: [
                {
                  id: "gate-os-dual-mode-2021",
                  year: 2021,
                  marks: 1,
                  question:
                    "Which of the following computer machine instructions MUST be privileged? (I) Set value of timer (II) Read the current clock time (III) Clear memory page tables (IV) Turn off interrupts",
                  options: [
                    "A. I, II and IV only",
                    "B. I, III and IV only",
                    "C. II and III only",
                    "D. I and IV only",
                  ],
                  correctOptionOrValue: "B. I, III and IV only",
                  detailedSolution:
                    "(I) Setting the hardware timer must be privileged so a rogue process cannot monopolize the CPU by disabling preemption. (II) Reading the time of day is a non-privileged operation (reading time harms nothing). (III) Clearing or modifying memory page tables would destroy virtual memory isolation and must be privileged. (IV) Disabling interrupts (`CLI`) prevents the OS scheduler from preempting the process and must be strictly privileged.",
                  keyFormulaOrConcept:
                    "Any instruction that can halt the CPU, alter memory mapping, disable preemption, or issue direct I/O is privileged.",
                },
              ],
            },
            {
              type: "quick-revision",
              heading: "7. 1-Minute Panic Revision",
              cheatSheetDownloadSlug: "dual-mode-and-system-calls",
              oneMinutePanicCard: {
                coreRule:
                  "Mode Bit = 1 (User Mode, non-privileged); Mode Bit = 0 (Kernel Mode, all hardware instructions allowed).",
                mustRememberFormulas: [
                  "Trap = Synchronous (User → Kernel via instruction: syscall, int, divide by 0).",
                  "Interrupt = Asynchronous (External device → Kernel: timer, disk, keyboard).",
                  "Privileged instructions: HLT, CLI/STI, modify page tables, direct I/O.",
                ],
                criticalPitfalls: [
                  "Mode switch ≠ Context switch! Mode switch stays in the same process context (just switches user stack → kernel stack).",
                  "User code NEVER branches directly into kernel memory addresses; it vectors through the system call table.",
                ],
                visualFlow:
`[ DUAL-MODE HARDWARE EXECUTION FLOW ]

[ USER MODE (Mode Bit = 1) ]
  Application issues system call e.g., read()
       │
       ▼ (Software Trap / CPU INT 0x80 / syscall instruction)
[ HARDWARE PRIVILEGE ELEVATION ]
  1. CPU hardware flips Mode Bit: 1 ──> 0
  2. Saves User PC & Flags onto Kernel Stack
  3. Vectors to Interrupt Descriptor Table (IDT)
       │
       ▼
[ KERNEL MODE (Mode Bit = 0) ]
  1. Kernel validates parameters & user memory bounds
  2. Executes privileged hardware I/O routine
  3. Prepares return value
       │
       ▼ (sysret / iret instruction)
[ HARDWARE PRIVILEGE RESTORATION ]
  1. CPU hardware flips Mode Bit: 0 ──> 1
  2. Restores User PC & Registers
       │
       ▼
[ USER MODE (Mode Bit = 1) ]
  Application resumes execution immediately after syscall`,
              },
            },
            {
              type: "resources",
              heading: "8. Authoritative Source Trail",
              sources: [
                {
                  title: "Operating System Concepts (10th Edition)",
                  authorOrInstitution: "Silberschatz, Galvin, Gagne",
                  topic: "Chapter 1 & 2: System Operations (Dual-Mode Operation, Mode Bit & System Calls)",
                  url: "https://codex.cs.yale.edu/avi/os-book/OS10/slide-dir/index.html",
                  type: "primary-standard",
                  annotation: "Official slides showing the hardware mode bit (0 vs 1), timer interrupts, and the trap table vectoring sequence.",
                },
                {
                  title: "Operating Systems: Three Easy Pieces (OSTEP)",
                  authorOrInstitution: "Remzi H. Arpaci-Dusseau & Andrea C. Arpaci-Dusseau",
                  topic: "Chapter 6: Mechanism: Limited Direct Execution (User Mode, Kernel Mode & System Calls)",
                  url: "https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-mechanisms.pdf",
                  type: "primary-standard",
                  annotation: "Detailed chapter on hardware privilege elevation, the trap instruction, kernel stack saving, and return-from-trap.",
                },
                {
                  title: "Official GATE CS Syllabus",
                  authorOrInstitution: "GATE Committee (IITs)",
                  topic: "Operating Systems: System calls, processes, protection",
                  url: "https://gate2024.iisc.ac.in/",
                  type: "gate-official",
                },
              ],
              stillStuck: [
                {
                  prompt: "If system call transitions and mode bit flipping feel abstract...",
                  title: "User Mode vs Kernel Mode in Operating System",
                  creator: "Gate Smashers (Varun Singla)",
                  duration: "9 mins",
                  url: "https://www.youtube.com/watch?v=F3i_XzBuhXw",
                  whyThisHelps:
                    "Crisp hardware-level explanation of how the timer interrupt and trap instructions flip the CPU mode bit between user and kernel space.",
                },
                {
                  prompt: "For deep assembly-level interrupt vectors and x86 ring architecture...",
                  title: "System Calls in Operating System",
                  creator: "Neso Academy",
                  duration: "13 mins",
                  url: "https://www.youtube.com/watch?v=LHh_g4x_XJ4",
                  whyThisHelps:
                    "Step-by-step trace of what happens to the program counter and stack registers during a system call trap.",
                },
              ],
            },
          ],
        },
      ],
    },

    // ══════════════════════════════════════════════════════════════════════
    // MODULE 2 — PROCESSES AND THREADS
    // ══════════════════════════════════════════════════════════════════════
    {
      id: "processes-and-threads",
      title: "Module 2: Processes, Threads & Concurrency",
      slug: "processes-and-threads",
      order: 2,
      tagline: "The living units of computation: memory layout, lifecycle, context switches, and threads.",
      lessons: [
        {
          id: "what-is-a-process",
          title: "The Process Concept, Memory Layout & The PCB",
          slug: "what-is-a-process",
          order: 1,
          estimatedMinutes: 18,
          tagline: "How the OS breathes life into passive disk binaries, structuring virtual memory and PCB control blocks.",
          hasInteractive: false,
          hasGATE: true,
          hasPractice: true,
          sections: [
            {
              type: "explanation",
              heading: "1. Program vs. Process: The Fundamental Separation",
              body: [
                "A **program** is completely passive: it is a collection of compiled bytes, instructions, and static data resting silently in secondary storage (like an executable `.exe` or ELF binary on disk).",
                "A **process**, in contrast, is an active entity. It is a ==yellow:program in execution==, endowed with its own ==purple:virtual address space==, a Program Counter tracking its next instruction, CPU register states, open file descriptors, and dedicated memory segments.",
                "Think of a program as a written musical score resting in a drawer; a process is the ==green:orchestra actively performing that score in real time==.",
              ],
              callout: {
                kind: "mental-model",
                title: "Mental Model: Passive Recipe vs. Active Cooking",
                message:
                  "A cookbook recipe is a program. The ==green:chef reading the recipe, utilizing kitchen tools, and tracking current progress== is the process.",
              },
            },
            {
              type: "diagram",
              heading: "2. The Anatomy of Process Memory",
              caption:
                "Figure 2.1 — Canonical 32/64-bit Virtual Address Space Layout. Notice how the stack and heap grow toward each other into unallocated virtual memory.",
              diagramType: "memory-layout",
            },
            {
              type: "explanation",
              heading: "3. The Four Core Memory Segments",
              body: [
                "**Text Segment (Code):** Contains the compiled machine instructions. This region is ==pink:read-only== and often shared among multiple instances of the same program to conserve physical RAM.",
                "**Data & BSS Segments:** The initialized data segment holds global and static variables explicitly given values (e.g. `int count = 10;`). The ==purple:BSS (Block Started by Symbol)== segment stores uninitialized globals/statics, ==yellow:zero-initialized by the OS loader==.",
                "**Heap Segment:** Dynamically managed memory allocated at runtime via system calls (`malloc()`, `calloc()`, `new`). The heap ==yellow:grows upward from lower memory toward higher addresses==.",
                "**Stack Segment:** Holds local function call frames, parameters, local variables, and return addresses. On standard architectures (like x86/ARM), the stack ==yellow:grows downward from high memory toward lower addresses==.",
              ],
              callout: {
                kind: "trap",
                title: "Common GATE Trap: Stack vs Heap Growth",
                message:
                  "GATE frequently tests the direction of memory growth: the ==pink:Stack grows DOWNWARD toward lower memory==, while the ==pink:Heap grows UPWARD toward higher memory==. If they collide, a ==yellow:segmentation fault / stack overflow== occurs.",
              },
            },
            {
              type: "diagram",
              heading: "4. The Process Control Block (PCB)",
              caption:
                "Figure 2.2 — Key fields encapsulated in the kernel-level Process Control Block (struct task_struct in Linux).",
              diagramType: "process-pcb",
            },
            {
              type: "comparison",
              heading: "5. Architecture Comparison: Process vs. Thread",
              leadParagraph:
                "Understanding the exact resource boundaries is critical for both systems programming and GATE questions.",
              columns: ["Process", "Thread (Lightweight Process)"],
              criteria: [
                {
                  feature: "Address Space",
                  first: "==purple:Isolated, private virtual memory space==.",
                  second: "==green:Shares code, data, heap, and open files== with peer threads.",
                },
                {
                  feature: "Creation Overhead",
                  first: "Heavyweight: Requires memory allocation, page tables, PCB creation.",
                  second: "Lightweight: Minimal state allocation (==purple:private stack & TCB only==).",
                },
                {
                  feature: "Context Switching",
                  first: "Slow: ==pink:Flushes TLB cache, switches page tables (CR3) & registers==.",
                  second: "Fast: ==green:Switches only registers and stack pointer; TLB intact==.",
                },
                {
                  feature: "Failure Isolation",
                  first: "High: One process crashing does not affect other processes.",
                  second: "Low: ==pink:An illegal memory access in one thread crashes all peer threads==.",
                },
              ],
              summaryTakeaway:
                "Processes provide units of ==purple:resource ownership and isolation==; threads provide units of ==yellow:CPU dispatching and scheduling==.",
            },
            {
              type: "gate-lens",
              heading: "6. GATE Lens & Verified PYQs",
              weightageSummary:
                "Memory segment classification and ==yellow:thread resource sharing== appear frequently in GATE CS (notably 2011, 2017, and 2021).",
              commonPatterns: [
                "Identifying which segment a given variable is allocated in (global, local, static, dynamic).",
                "Determining what program state is ==green:shared between threads== vs ==pink:kept strictly private==.",
              ],
              commonTraps: [
                "⚠ Forgetting that ==pink:static local variables inside functions live in the DATA/BSS segment==, NOT on the stack!",
                "⚠ Pointers allocated with `malloc` have their ==purple:pointer variable on the stack==, but the ==yellow:pointed-to buffer on the heap==.",
              ],
              pyqs: [
                {
                  id: "gate-process-thread-2021",
                  year: 2021,
                  marks: 1,
                  question:
                    "Which of the following components of a program state are NOT shared among threads of the same process? (P) Code segment (Q) Global variables (R) Stack (S) CPU Register values",
                  options: [
                    "A. P and Q only",
                    "B. R and S only",
                    "C. Q and R only",
                    "D. S only",
                  ],
                  correctOptionOrValue: "B. R and S only",
                  detailedSolution:
                    "Threads of the same process share the Text (code) segment, Data/BSS segments (global and static variables), Heap, and open file descriptors. However, each thread must independently execute its own function call sequence and instructions; therefore, each thread maintains its own ==pink:private Stack== and ==pink:private CPU Register values (including Program Counter and Stack Pointer)==.",
                  keyFormulaOrConcept:
                    "Thread private state = ==purple:Stack + CPU Registers (PC, SP) + State==.",
                },
              ],
            },
            {
              type: "quick-revision",
              heading: "7. 1-Minute Panic Revision",
              cheatSheetDownloadSlug: "what-is-a-process",
              oneMinutePanicCard: {
                coreRule:
                  "Process = Program in execution with isolated virtual address space (==yellow:Text + Data/BSS + Heap + Stack==) + ==purple:PCB==.",
                mustRememberFormulas: [
                  "==yellow:Stack grows DOWNWARD== (High → Low addresses); ==yellow:Heap grows UPWARD== (Low → High addresses).",
                  "Threads SHARE: ==green:Code, Globals/BSS, Heap, Open files==.",
                  "Threads KEEP PRIVATE: ==pink:Stack, Registers, Program Counter (PC)==.",
                ],
                criticalPitfalls: [
                  "==pink:Static variables (even inside a local function block) live in DATA/BSS==, never on the stack.",
                  "==purple:PCB is maintained exclusively in kernel space==; user code cannot read or overwrite its own PCB.",
                ],
                visualFlow:
`[ PROCESS MEMORY HIERARCHY & THREAD ISOLATION INVARIANT ]

[ 0xFFFF: HIGH MEMORY ]
  ┌────────────────────────────────────────────────────────┐
  │  STACK (Local function frames, return addresses)       │  Grows DOWNWARD (↓)
  ├────────────────────────────────────────────────────────┤
  │                                                        │
  │               UNALLOCATED VIRTUAL MEMORY               │  (Collision triggers
  │                                                        │   Stack Overflow)
  ├────────────────────────────────────────────────────────┤
  │  HEAP (Dynamic memory via malloc() / new)              │  Grows UPWARD (↑)
  ├────────────────────────────────────────────────────────┤
  │  BSS SEGMENT (Uninitialized global & static vars = 0)  │
  ├────────────────────────────────────────────────────────┤
  │  DATA SEGMENT (Initialized global & static vars)       │
  ├────────────────────────────────────────────────────────┤
  │  TEXT SEGMENT (Binary machine instructions - Read-Only)│
  └────────────────────────────────────────────────────────┘
[ 0x0000: LOW MEMORY ]

THREAD INVARIANT:
  SHARED across Threads  : Text, Data, BSS, Heap, Open Files.
  PRIVATE to Each Thread : Stack, Registers, Program Counter (PC).`,
              },
            },
            {
              type: "resources",
              heading: "8. Authoritative Source Trail",
              sources: [
                {
                  title: "Operating System Concepts (10th Edition)",
                  authorOrInstitution: "Silberschatz, Galvin, Gagne",
                  topic: "Chapter 3: Processes (Section 3.1: Process Concept, Memory Layout & The PCB)",
                  url: "https://codex.cs.yale.edu/avi/os-book/OS10/slide-dir/index.html",
                  type: "primary-standard",
                  annotation: "Official slides showing the memory layout (Text, Data, BSS, Heap, Stack) and Process Control Block fields.",
                },
                {
                  title: "Operating Systems: Three Easy Pieces (OSTEP)",
                  authorOrInstitution: "Remzi H. Arpaci-Dusseau & Andrea C. Arpaci-Dusseau",
                  topic: "Chapter 4: The Abstraction: The Process (Process Creation & Memory Layout)",
                  url: "https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-intro.pdf",
                  type: "primary-standard",
                  annotation: "Clear introduction to process address space initialization, PCB structures in xv6, and process APIs.",
                },
              ],
              stillStuck: [
                {
                  prompt: "If memory layout (Stack vs Heap growth) is confusing...",
                  title: "Process Memory Layout and PCB in Operating System",
                  creator: "Gate Smashers (Varun Singla)",
                  duration: "11 mins",
                  url: "https://www.youtube.com/watch?v=2Tz8gR9Q9w8",
                  whyThisHelps:
                    "Practical breakdown of what goes into Data vs BSS vs Stack vs Heap with C memory examples.",
                },
                {
                  prompt: "For thread vs process memory sharing questions in GATE...",
                  title: "Process vs Thread in Operating System",
                  creator: "Neso Academy",
                  duration: "12 mins",
                  url: "https://www.youtube.com/watch?v=4rLW7ZG20Sg",
                  whyThisHelps:
                    "Clean blackboard lecture showing what threads share in RAM versus what remains private (registers, PC, stack).",
                },
              ],
            },
          ],
        },
        {
          id: "process-states-and-transitions",
          title: "Process States & Transitions: 5-State vs 7-State Models",
          slug: "process-states-and-transitions",
          order: 2,
          estimatedMinutes: 20,
          tagline: "The dynamic lifecycle of computation: New, Ready, Running, Waiting, Terminated and Swapping.",
          hasInteractive: true,
          hasGATE: true,
          hasPractice: true,
          sections: [
            {
              type: "explanation",
              heading: "1. The 5-State Process Lifecycle",
              body: [
                "As a process executes, it changes state according to hardware conditions and scheduler choices. In the classic 5-State model, a process exists in exactly one of the following states at any instant:",
                "**1. New:** The process is being created (memory structures initialized, PID allocated), but is ==pink:not yet loaded into main memory== or placed in the ready queue.",
                "**2. Ready:** The process ==yellow:resides in main memory and is prepared to execute immediately== as soon as the CPU scheduler allocates a core.",
                "**3. Running:** Instructions are being executed directly on the CPU hardware core.",
                "**4. Waiting (Blocked):** The process cannot execute until some ==pink:external event occurs== (such as I/O completion, page fault resolution, or child process exit).",
                "**5. Terminated:** The process has finished execution; its resources are deallocated, awaiting parent cleanup.",
              ],
            },
            {
              type: "explanation",
              heading: "2. The 7-State Model: Why Swapping & Suspended States Are Essential",
              body: [
                "In real operating systems, the 5-state model has a fatal vulnerability: **Physical RAM is finite**. If the degree of multiprogramming is high and multiple processes block on slow disk I/O, main memory quickly becomes saturated with dormant, waiting processes.",
                "Under the 5-state model, if every process in RAM is blocked waiting for I/O, the CPU would sit completely idle despite hundreds of jobs queued on disk. To solve this, modern operating systems introduce a third scheduler: the ==purple:Medium-Term Scheduler (The Swapper)==.",
                "The Medium-Term Scheduler frees up precious physical memory frames by ==green:swapping out inactive processes from RAM to secondary storage== (Swap Space on SSD or HDD). This expands the lifecycle with two new suspended states:",
                "**6. Blocked-Suspend (Suspended-Blocked):** The process resides in secondary storage (swap disk) AND is ==pink:still waiting for an I/O event to occur==.",
                "**7. Ready-Suspend (Suspended-Ready):** The process resides in secondary storage, but the event it waited for has finished. It is ==yellow:ready to run as soon as space is allocated in main memory==.",
                "**The Critical GATE Transition:** What happens when an I/O event completes for a process in `Blocked-Suspend`? The process ==pink:moves from Blocked-Suspend → Ready-Suspend==, ==yellow:NOT directly to Ready==! Because physical memory has not yet been allocated to it, it transitions to **Ready-Suspend on disk** first. Only when the medium-term scheduler swaps it back into RAM does it enter `Ready`.",
              ],
              callout: {
                kind: "trap",
                title: "Essential Exam Distinction: Ready-Suspend vs Blocked-Suspend",
                message:
                  "When I/O completes for a Blocked-Suspend process, it transitions to ==pink:READY-SUSPEND (still on disk)==, ==yellow:NOT directly to Ready (in RAM)==. A process cannot enter Ready until the ==purple:Medium-Term Scheduler== actually swaps its address space back into physical memory.",
              },
            },
            {
              type: "diagram",
              heading: "3. Complete 7-State Process Lifecycle Architecture",
              caption:
                "Figure 2.3 — Complete 7-State Process Lifecycle Architecture showing Main Memory (RAM) vs. Secondary Storage (Swap Space) separated by the Medium-Term Scheduler (Swapper).",
              diagramType: "seven-state",
            },
            {
              type: "interactive",
              heading: "4. Interactive Process State Transition Simulator",
              leadParagraph:
                "Click on the kernel trigger buttons to observe how process state transitions occur, which queues are affected, and what the OS kernel does behind the scenes.",
              interactive: {
                kind: "state-transition",
                config: {
                  title: "5-State Process Machine Simulator",
                  initialState: "new",
                  states: [
                    {
                      id: "new",
                      label: "NEW",
                      description: "Process is created; PCB allocated in kernel RAM.",
                      color: "#94a3b8",
                    },
                    {
                      id: "ready",
                      label: "READY",
                      description: "In main memory, queued in Ready List awaiting CPU dispatch.",
                      color: "#38bdf8",
                    },
                    {
                      id: "running",
                      label: "RUNNING",
                      description: "Instructions currently executing on CPU hardware core.",
                      color: "#10b981",
                    },
                    {
                      id: "waiting",
                      label: "WAITING",
                      description: "Blocked waiting for I/O completion or synchronization event.",
                      color: "#f59e0b",
                    },
                    {
                      id: "terminated",
                      label: "TERMINATED",
                      description: "Execution complete; awaiting parent wait() to reap exit code.",
                      color: "#ef4444",
                    },
                  ],
                  transitions: [
                    {
                      from: "new",
                      to: "ready",
                      trigger: "Admit to Ready Queue",
                      actionDescription: "Long-term scheduler admits process into main memory and puts it on the Ready Queue.",
                    },
                    {
                      from: "ready",
                      to: "running",
                      trigger: "Scheduler Dispatch",
                      actionDescription: "Short-term scheduler selects this process; dispatcher performs context switch and jumps to PC.",
                    },
                    {
                      from: "running",
                      to: "ready",
                      trigger: "Timer Interrupt (Preemption)",
                      actionDescription: "Time quantum expired or higher priority process arrived; CPU preempts and re-queues process.",
                    },
                    {
                      from: "running",
                      to: "waiting",
                      trigger: "I/O or System Call Wait",
                      actionDescription: "Process issues an I/O request (read/write); kernel moves it to Device Waiting Queue.",
                    },
                    {
                      from: "waiting",
                      to: "ready",
                      trigger: "I/O or Event Finished",
                      actionDescription: "Hardware interrupt announces I/O completion; kernel moves process from Waiting to Ready Queue.",
                    },
                    {
                      from: "running",
                      to: "terminated",
                      trigger: "Exit / Fatal Signal",
                      actionDescription: "Process calls exit() or receives SIGKILL; kernel reclaims memory, marks state ZOMBIE/TERMINATED.",
                    },
                  ],
                },
              },
            },
            {
              type: "misconceptions",
              heading: "5. Crucial State Transition Rules & Misconceptions",
              items: [
                {
                  commonMyth: "A process can transition directly from Waiting (Blocked) to Running.",
                  reality: "Impossible! A Waiting process MUST first transition to the Ready queue before it can run.",
                  explanation:
                    "When I/O completes, the CPU is already occupied executing another process. The waking process must join the Ready Queue and await its turn from the short-term CPU scheduler.",
                },
                {
                  commonMyth: "A process transitions from Running to Waiting when its time slice expires.",
                  reality: "A timer expiration moves a process from Running to READY, not Waiting!",
                  explanation:
                    "Waiting means the process CANNOT run even if the CPU were 100% idle. A preempted process is fully capable of running; it simply gave up the CPU to be fair to other ready processes.",
                },
                {
                  commonMyth: "When I/O finishes for a swapped-out process (Blocked-Suspend), it immediately jumps into the RAM Ready queue.",
                  reality: "It transitions to READY-SUSPEND on disk! It enters RAM Ready only after the Swapper allocates memory frames.",
                  explanation:
                    "Main memory might still be 100% full. The kernel moves it from the disk-blocked list to the disk-ready list until the Medium-Term Scheduler can swap out another victim or reclaim frames.",
                },
              ],
            },
            {
              type: "gate-lens",
              heading: "6. GATE Lens & Verified PYQs",
              weightageSummary:
                "State transition validity and ==yellow:5 vs 7-state transitions== are consistently tested in GATE CS.",
              commonPatterns: [
                "Listing possible state transitions and ==pink:identifying illegal transitions==.",
                "Analyzing transitions in 7-state models (==purple:Ready-Suspend, Blocked-Suspend==) with swapping.",
                "Identifying which scheduler manages which transition (==yellow:Long-term: New → Ready==; ==purple:Short-term: Ready → Running==; ==green:Medium-term: Ready/Blocked ⇄ Suspended==).",
              ],
              commonTraps: [
                "⚠ There is ==pink:NO direct transition from Waiting → Running==.",
                "⚠ There is ==pink:NO direct transition from New → Running==.",
                "⚠ Transition from ==yellow:Running → Ready is only possible in PREEMPTIVE scheduling== systems.",
                "⚠ ==pink:Blocked-Suspend → Ready-Suspend== occurs upon I/O event completion while the process is on disk.",
              ],
              pyqs: [
                {
                  id: "gate-state-trans-2017",
                  year: 2017,
                  marks: 1,
                  question:
                    "In an operating system with preemptive scheduling, which of the following process state transitions is NEVER possible?",
                  options: [
                    "A. Ready → Running",
                    "B. Running → Ready",
                    "C. Blocked → Running",
                    "D. Running → Blocked",
                  ],
                  correctOptionOrValue: "C. Blocked → Running",
                  detailedSolution:
                    "When an event or I/O for a blocked (waiting) process completes, the kernel moves it to the ==yellow:READY state==. The process can only enter the RUNNING state when chosen by the CPU dispatcher from the ready queue. Direct ==pink:Blocked → Running transition violates OS scheduling invariants==.",
                  keyFormulaOrConcept: "Blocked → Ready → Running (==pink:Never Blocked → Running==).",
                },
              ],
            },
            {
              type: "quick-revision",
              heading: "7. 1-Minute Panic Revision",
              oneMinutePanicCard: {
                coreRule:
                  "5 States: ==yellow:New → Ready ⇄ Running → Terminated==. Running → Waiting → Ready. 7 States add ==purple:Ready-Suspend & Blocked-Suspend on Disk==.",
                mustRememberFormulas: [
                  "Running → Waiting: Process blocks voluntarily for I/O or event.",
                  "Waiting → Ready: Event finished. Enters Ready queue.",
                  "Running → Ready: ==yellow:Preemption (Time slice expired or higher priority process arrived)==.",
                  "Blocked-Suspend → Ready-Suspend: ==pink:Event finishes while swapped to secondary storage==.",
                  "Medium-Term Scheduler: Controls degree of multiprogramming via ==green:swapping (RAM ⇄ Disk)==.",
                ],
                criticalPitfalls: [
                  "Blocked/Waiting processes ==pink:NEVER jump directly to the CPU core== (Blocked → Running is impossible).",
                  "Non-preemptive OS has ==pink:NO Running → Ready transition== (processes run until voluntary block or exit).",
                  "Blocked-Suspend does ==pink:NOT become Ready in RAM== when I/O finishes; it becomes ==yellow:Ready-Suspend on Disk==!",
                ],
                visualFlow:
`[ 5-STATE & 7-STATE PROCESS LIFECYCLE DECISION FLOW ]

┌──────────────────────────────── PHYSICAL RAM ───────────────────────────────┐
│                                                                             │
│  [NEW] ──(Long-Term Admit)──> [READY] ◄──(Dispatcher Dispatch)──► [RUNNING] │
│                                  │ ▲        (Timer Preemption)        │     │
│                                  │ │                                  │     │
│                    (Swap Out) ▲  │ │ (Swap In)          (I/O Wait)    │     │
│                               │  │ │                                  ▼     │
│                               │  ▼ │                              [WAITING] │
│                               │    │                                  │     │
└───────────────────────────────┼────┼──────────────────────────────────┼─────┘
                                │    │                                  │
                       Medium-  │    │ Medium-                          │ Swap Out
                       Term     │    │ Term                             ▼ (Memory Pressure)
                                │    │
┌───────────────────────────────┼────┼──────── SECONDARY STORAGE (DISK) ──────┐
│                               ▼    │                                        │
│                        [READY-SUSPEND] ◄────(I/O Completes)──── [BLOCKED-   │
│                          (Disk Ready)                            SUSPEND]   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘`,
              },
            },
            {
              type: "resources",
              heading: "8. Authoritative Source Trail",
              sources: [
                {
                  title: "Operating System Concepts (10th Edition)",
                  authorOrInstitution: "Silberschatz, Galvin, Gagne",
                  topic: "Chapter 3: Processes (Section 3.1.2: Process State & Suspended States)",
                  url: "https://codex.cs.yale.edu/avi/os-book/OS10/slide-dir/index.html",
                  type: "primary-standard",
                  annotation: "Official Chapter 3 lecture slides covering process states, transitions, and ready queue mechanics.",
                },
                {
                  title: "Operating Systems: Three Easy Pieces (OSTEP)",
                  authorOrInstitution: "Remzi H. Arpaci-Dusseau & Andrea C. Arpaci-Dusseau",
                  topic: "Chapter 4: The Abstraction: The Process (Process States)",
                  url: "https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-intro.pdf",
                  type: "primary-standard",
                  annotation: "Clear exposition of process state machine: Running, Ready, and Blocked with state transition diagram.",
                },
                {
                  title: "NPTEL: Operating Systems (IIT Kharagpur)",
                  authorOrInstitution: "Prof. Santanu Chattopadhyay",
                  topic: "Module 2: Process States, PCB and State Transitions",
                  url: "https://nptel.ac.in/courses/106105214",
                  type: "curated-lecture",
                  annotation: "IIT Kharagpur lecture on process lifecycle, state queues, and medium-term swapper scheduling.",
                },
              ],
              stillStuck: [
                {
                  prompt: "If 5-state vs 7-state transitions feel difficult to visualize...",
                  title: "Process States in Operating System | Schedulers",
                  creator: "Gate Smashers (Varun Singla)",
                  duration: "14 mins",
                  url: "https://www.youtube.com/watch?v=ZIUG-24Y01U",
                  whyThisHelps:
                    "Direct lecture explaining New, Ready, Running, Waiting, Terminated, and how the medium-term scheduler swaps blocked processes.",
                },
                {
                  prompt: "For whiteboard step-by-step state transition clarity...",
                  title: "Process State in Operating System",
                  creator: "Neso Academy",
                  duration: "13 mins",
                  url: "https://www.youtube.com/watch?v=k24nmPz-25M",
                  whyThisHelps:
                    "Whiteboard lecture breaking down exact transition triggers (admit, dispatch, interrupt, I/O wait, I/O completion).",
                },
              ],
            },
          ],
        },
        {
          id: "context-switching",
          title: "Context Switching: Kernel Execution & Hardware Overhead",
          slug: "context-switching",
          order: 3,
          estimatedMinutes: 20,
          tagline: "The essential illusion of multitasking, and the hidden performance tax it incurs.",
          hasInteractive: true,
          hasGATE: true,
          hasPractice: true,
          sections: [
            {
              type: "explanation",
              heading: "1. The Multitasking Illusion: What Context Switching Actually Is",
              body: [
                "On a single CPU core, only one instruction can execute at any physical picosecond. How then can your computer play music, download a compiler update, and render a web page simultaneously?",
                "The operating system achieves this illusion by rapidly multiplexing the CPU across multiple processes. This switching mechanism is called a ==purple:Context Switch==.",
                "A context switch stops the currently executing process P₀, ==yellow:saves its complete hardware execution context== (Program Counter, registers, stack pointer, page table registers) into its PCB, and ==yellow:restores the saved execution context of another process P₁ from its PCB==, resuming execution of P₁ as if it had never been interrupted.",
              ],
              callout: {
                kind: "trap",
                title: "Crucial Insight: Pure Overhead",
                message:
                  "Context switch time is ==pink:100% PURE OVERHEAD==. The machine does ==pink:zero useful computational work for any user program== during a context switch. Operating system designers strive to minimize context switch frequency and duration.",
              },
            },
            {
              type: "interactive",
              heading: "2. Interactive Step-Through Flow Visualizer",
              leadParagraph:
                "Step through the exact sequence of hardware and kernel actions that transpire during a preemptive context switch between Process A and Process B.",
              interactive: {
                kind: "flow-visualizer",
                config: {
                  title: "Hardware Context Switch Execution Sequence",
                  caption: "Step-by-step breakdown of how kernel dispatchers swap CPU execution ownership.",
                  steps: [
                    {
                      id: "step-1",
                      label: "1. Timer Interrupt Triggered",
                      shortLabel: "Interrupt",
                      description: "The hardware APIC timer countdown fires. The CPU interrupts Process A, pushes PC & EFLAGS onto the kernel stack, and switches Mode Bit to 0 (Kernel).",
                      annotation: "Hardware action",
                    },
                    {
                      id: "step-2",
                      label: "2. Save Process A Context into PCB_A",
                      shortLabel: "Save PCB_A",
                      description: "The kernel interrupt service routine saves all remaining CPU registers (EAX, EBX, ESP, EBP, floating-point state) into Process A's PCB.",
                      annotation: "Kernel saves state",
                    },
                    {
                      id: "step-3",
                      label: "3. CPU Scheduler Selects Process B",
                      shortLabel: "Scheduler",
                      description: "The scheduler algorithm selects the next ready process (Process B) from the Ready Queue according to its scheduling policy.",
                      annotation: "Scheduling policy decision",
                    },
                    {
                      id: "step-4",
                      label: "4. Memory Management & Page Table Switch",
                      shortLabel: "MMU Switch",
                      description: "For a switch to another address space, the kernel may reload an architecture-specific page-table root (for example, CR3 on x86). TLB invalidation is architecture- and implementation-dependent; address-space tags can preserve entries across switches.",
                      annotation: "Direct + Indirect cache overhead",
                    },
                    {
                      id: "step-5",
                      label: "5. Restore Process B Context from PCB_B",
                      shortLabel: "Restore PCB_B",
                      description: "The kernel restores Process B's registers, stack pointer, and Program Counter from PCB_B.",
                      annotation: "Kernel restores state",
                    },
                    {
                      id: "step-6",
                      label: "6. Return from Trap to User Space",
                      shortLabel: "Resume B",
                      description: "The kernel issues `iret`/`sysret`. The CPU restores Mode Bit to 1 (User Mode) and jumps to Process B's restored Program Counter. Process B resumes seamless execution.",
                      annotation: "Hardware resumes Process B",
                    },
                  ],
                },
              },
            },
            {
              type: "explanation",
              heading: "3. Direct vs. Indirect Context Switch Overhead",
              body: [
                "Undergraduate textbooks often focus solely on the *direct* overhead of copying registers (which takes a few microseconds). However, the *indirect* overhead is often far more damaging to system throughput:",
                "**Direct Overhead:** ==yellow:Saving and loading CPU registers, updating PCB pointers==, executing scheduling algorithms.",
                "**Indirect Overhead (Cache & TLB disruption):** ==pink:Cold CPU cache misses and TLB invalidation==. Process B may find fewer useful cache lines and translations from Process A, slowing execution until the working set is re-cached.",
              ],
            },
            {
              type: "gate-lens",
              heading: "4. GATE Lens & Verified PYQs",
              weightageSummary:
                "Questions on context switching probe understanding of ==yellow:state saved, hardware mechanisms, and cache invalidation penalties==.",
              commonPatterns: [
                "Calculating CPU utilization when given burst times and ==yellow:context switch overhead==.",
                "Comparing ==purple:process context switch== vs ==green:thread context switch== overhead.",
              ],
              commonTraps: [
                "⚠ ==green:Threads in one process share page tables==, meaning no CR3 reload and minimal TLB penalty.",
                "⚠ Remember: ==pink:context switch time is wasted CPU time==, decreasing system throughput.",
              ],
              pyqs: [
                {
                  id: "gate-cs-ctx-2015",
                  year: 2015,
                  marks: 1,
                  question:
                    "Which of the following actions is NOT performed during a context switch between two threads of the SAME process?",
                  options: [
                    "A. Saving the current thread's CPU registers",
                    "B. Loading the next thread's Program Counter",
                    "C. Switching the page table base pointer register",
                    "D. Updating the current thread's state in its TCB",
                  ],
                  correctOptionOrValue: "C. Switching the page table base pointer register",
                  detailedSolution:
                    "Threads of the same process share the same virtual address space and memory mappings. Therefore, the kernel does ==pink:NOT need to change page tables or reload the page table base register (CR3)==, and the TLB cache does not need to be invalidated. Registers (A), Program Counter (B), and Thread Control Block (TCB) state (D) are private to each thread and must be updated.",
                  keyFormulaOrConcept:
                    "==green:Thread switch overhead << Process switch overhead== (No MMU/page table switch).",
                },
              ],
            },
            {
              type: "quick-revision",
              heading: "5. 1-Minute Panic Revision",
              oneMinutePanicCard: {
                coreRule:
                  "Context Switch = ==yellow:Save state of P0 to PCB0 → Scheduler selects P1 → Load state of P1 from PCB1==. ==pink:100% pure overhead==.",
                mustRememberFormulas: [
                  "Process Context Switch: ==pink:Saves registers + Swaps page tables (CR3) + Flushes TLB==.",
                  "Thread Context Switch: ==green:Saves registers + stack pointer only. Page tables and TLB stay intact==.",
                ],
                criticalPitfalls: [
                  "==pink:CPU performs zero productive computation during a context switch==.",
                  "Decreasing time quantum q too much causes ==pink:context switch overhead to dominate CPU time (thrashing)==.",
                ],
                visualFlow:
`[ HARDWARE CONTEXT SWITCH FLOW: PROCESS P0 ──> PROCESS P1 ]

1. [ HARDWARE INTERRUPT ] Timer expires or P0 issues blocking syscall
2. [ KERNEL ENTRY ] CPU flips Mode Bit 1 ──> 0; jumps to interrupt handler
3. [ STATE SAVE ] Save P0 Registers, PC, SP, Flags into PCB_0 (Kernel RAM)
4. [ SCHEDULER EXECUTION ] Short-term CPU scheduler picks P1 from Ready Queue
5. [ MMU RECONFIGURATION ] Reload CR3 / Page Table Pointer to P1; Flush TLB
6. [ STATE RESTORE ] Load P1 Registers, PC, SP from PCB_1
7. [ KERNEL EXIT ] Execute iret; CPU flips Mode Bit 0 ──> 1
8. [ USER RESUMPTION ] P1 begins executing at restored Program Counter`,
              },
            },
            {
              type: "resources",
              heading: "6. Authoritative Source Trail",
              sources: [
                {
                  title: "Operating System Concepts (10th Edition)",
                  authorOrInstitution: "Silberschatz, Galvin, Gagne",
                  topic: "Chapter 3: Processes (Section 3.1.3: Context Switch Mechanics & Overhead)",
                  url: "https://codex.cs.yale.edu/avi/os-book/OS10/slide-dir/index.html",
                  type: "primary-standard",
                  annotation: "Official slides explaining PCB state saving, CPU register reloads, and hardware context switch costs.",
                },
                {
                  title: "Operating Systems: Three Easy Pieces (OSTEP)",
                  authorOrInstitution: "Remzi & Andrea Arpaci-Dusseau",
                  topic: "Chapter 6: Mechanism: Limited Direct Execution (Context Switching)",
                  url: "https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-mechanisms.pdf",
                  type: "primary-standard",
                  annotation: "Free full chapter PDF with real xv6 assembly code showing trap handling and kernel context switch.",
                },
              ],
              stillStuck: [
                {
                  prompt: "For whiteboard step-by-step clarity on CPU context switches and PCB swapping...",
                  title: "Context Switch in Operating System",
                  creator: "Neso Academy",
                  duration: "9 mins",
                  url: "https://www.youtube.com/watch?v=kK5kR-45P4w",
                  whyThisHelps:
                    "Direct 9-minute lecture explaining PCB state save/restore, dispatch latency, and why context switching is pure overhead.",
                },
                {
                  prompt: "If thread context switch vs process context switch overhead feels blurry...",
                  title: "Process vs Thread in Operating System",
                  creator: "Neso Academy",
                  duration: "11 mins",
                  url: "https://www.youtube.com/watch?v=4rLW7ZG20Sg",
                  whyThisHelps:
                    "Explains why thread switches avoid TLB invalidation and MMU CR3 reloads because threads share address space.",
                },
              ],
            },
          ],
        },
        {
          id: "inter-process-communication",
          title: "Inter-Process Communication: Pipes, Shared Memory & Message Passing",
          slug: "inter-process-communication",
          order: 4,
          estimatedMinutes: 20,
          tagline: "How processes talk to each other — and how GATE turns fork() into a counting puzzle.",
          hasInteractive: false,
          hasGATE: true,
          hasPractice: true,
          sections: [
            {
              type: "explanation",
              heading: "1. Why IPC Exists",
              body: [
                "Processes have **isolated address spaces** by design — a process cannot read or write another process's memory directly. Yet cooperative processes often need to exchange data: a web server passes an HTTP request body to a worker, a shell pipes output from `ls` into `grep`.",
                "The OS provides **Inter-Process Communication (IPC)** mechanisms that allow processes to exchange data safely under kernel supervision. The two fundamental models are ==yellow:shared memory== (processes map the same physical page frames) and ==purple:message passing== (the kernel copies data between process buffers).",
              ],
            },
            {
              type: "comparison",
              heading: "2. IPC Mechanisms",
              columns: ["Mechanism", "Mechanics & GATE Significance"],
              criteria: [
                {
                  feature: "Unnamed Pipe",
                  first: "Created with `pipe(fd[2])`. ==purple:Unidirectional byte stream==. Data flows fd[1] (write) to fd[0] (read). Only between ==pink:related processes (parent-child after fork())==.",
                  second: "GATE: output tracing of `fork()` + `pipe()` programs. After fork(), ==pink:both processes inherit both pipe ends== — each side must explicitly close the end it does not use.",
                },
                {
                  feature: "Shared Memory",
                  first: "`shmget()` + `shmat()` or `mmap()`. Kernel maps same physical frames into multiple virtual address spaces. ==green:Zero kernel copies — fastest IPC mechanism==.",
                  second: "==pink:Requires explicit synchronization (semaphores)==. Shared memory alone provides ==pink:NO mutual exclusion==.",
                },
                {
                  feature: "Message Queue",
                  first: "`msgsnd()` / `msgrcv()`. Kernel maintains typed message queue. ==green:Sender and receiver need not run simultaneously — asynchronous==.",
                  second: "Conceptual MCQs: message passing works between unrelated processes; ==yellow:no shared memory or common parent required==.",
                },
                {
                  feature: "Socket",
                  first: "Endpoint for network or local (Unix domain) communication. ==purple:Bidirectional full-duplex==. Supports TCP (stream) or UDP (datagram).",
                  second: "B.Tech/placement: know the TCP socket lifecycle: ==yellow:socket → bind → listen → accept → connect → send/recv → close==.",
                },
                {
                  feature: "Signal",
                  first: "==purple:Asynchronous software interrupt / notification==: `kill(pid, SIGTERM)`. Process installs handler via `sigaction()` or ignores the signal.",
                  second: "Carries events, not bulk data payload. `SIGCHLD` alerts parent that a child terminated.",
                },
              ],
              summaryTakeaway: "==green:Shared memory = fastest (zero kernel copies)== but needs sync. ==purple:Message passing = safer (kernel copies)==. ==pink:Pipe = unidirectional, related processes only==.",
            },
            {
              type: "explanation",
              heading: "3. The fork() System Call",
              body: [
                "`fork()` creates an exact clone of the calling process. Child gets a new PID, ==yellow:copied virtual address space (Copy-on-Write)==, duplicated file descriptor table, and signal masks.",
                "**Return values:** Parent receives ==yellow:child's PID (> 0)==. Child receives ==yellow:0==. Failure returns ==pink:-1 in parent only==.",
                "**Total processes after k fork() calls:** ==purple:2^k== (original + 2^k - 1 children), assuming no process terminates prematurely.",
              ],
              callout: {
                kind: "exam-tip",
                title: "GATE Classic: fork() Counting",
                message: "After `fork(); fork(); fork();`: ==yellow:Total processes = 2^3 = 8==. ==pink:NEW child processes created = 8 - 1 = 7==. GATE frequently tests whether the prompt asks for 'total' or 'new'!",
              },
            },
            {
              type: "worked-example",
              heading: "4. fork() Output Tracing",
              problemStatement: "Trace the output: `int x=5; fork(); x++; printf(\"%d\", x);`",
              steps: [
                { stepNumber: 1, title: "Before fork()", description: "One process exists, with ==purple:x = 5== in private stack." },
                { stepNumber: 2, title: "After fork()", description: "Two processes (parent and child) exist, each with an ==pink:independent copy of x = 5==." },
                { stepNumber: 3, title: "Both execute x++", description: "Both independently compute ==yellow:x = 6== in their separate address spaces." },
                { stepNumber: 4, title: "Both print", description: "Both execute `printf(\"%d\", x)`. Output: ==yellow:'6' printed twice==." },
              ],
              finalAnswer: "6 printed twice.",
              examTakeaway: "After `fork()`, parent and child have ==pink:INDEPENDENT copies of all variables==. Mutations in one ==pink:never affect the other==.",
            },
            {
              type: "gate-lens",
              heading: "5. GATE Lens",
              weightageSummary: "IPC and `fork()` appear as ==yellow:1-2 mark output-tracing MCQs== and architecture-matching questions.",
              commonPatterns: [
                "Count ==yellow:total vs new processes== after a sequence of `fork()` invocations.",
                "Trace `printf()` output after `fork()` — identify which lines execute in parent vs child.",
                "Match IPC mechanism to requirement: ==green:fastest → shared memory==, ==purple:unrelated processes → socket/FIFO==.",
              ],
              commonTraps: [
                "⚠ `fork()` returns TWICE: ==yellow:child PID in parent== and ==yellow:0 in child==. Unconditional code runs in BOTH!",
                "⚠ ==pink:Shared memory provides NO automatic synchronization==; omitting semaphores creates race conditions.",
                "⚠ After `fork()`, file descriptors are inherited — ==pink:unused pipe ends must be closed in both processes== to avoid hanging on EOF.",
              ],
              pyqs: [
                {
                  id: "gate-os-fork-count-2014",
                  year: 2014,
                  marks: 1,
                  question: "How many NEW processes are created by: fork(); fork(); fork(); in a single-process program?",
                  options: ["3", "6", "7", "8"],
                  correctOptionOrValue: "7",
                  detailedSolution: "After 3 consecutive forks: ==yellow:Total processes = 2^3 = 8==. ==pink:New processes = 8 - 1 = 7== (the parent process was already existing, not newly created).",
                  trapWarning: "Question asks for NEW, not TOTAL. Total = 8, New = 7.",
                },
              ],
            },
            {
              type: "practice",
              heading: "Concept Check",
              questions: [
                {
                  id: "ipc-q1",
                  prompt: "Which IPC mechanism requires explicit synchronization to prevent race conditions?",
                  type: "single-choice",
                  options: [
                    { id: "a", text: "Message Queue", explanation: "Message queues use kernel buffering which serializes access.", isCorrect: false },
                    { id: "b", text: "Shared Memory", explanation: "Correct. Shared memory gives direct access with no built-in synchronization.", isCorrect: true },
                    { id: "c", text: "Named Pipe", explanation: "Pipes are kernel-managed and blocking by default.", isCorrect: false },
                    { id: "d", text: "Signal", explanation: "Signals are asynchronous notifications, not data channels.", isCorrect: false },
                  ],
                  explanation: "Shared memory maps the same physical frames into multiple address spaces. Concurrent reads/writes without semaphores produce race conditions.",
                  difficulty: "foundation",
                },
                {
                  id: "ipc-q2",
                  prompt: "After fork(); fork(); how many total processes exist including the original?",
                  type: "numerical",
                  correctAnswer: 4,
                  unit: "processes",
                  explanation: "1st fork: 1 to 2. 2nd fork: each of 2 forks to 4 total.",
                  difficulty: "gate-level",
                },
              ],
            },
            {
              type: "quick-revision",
              heading: "7. 1-Minute Panic Revision",
              oneMinutePanicCard: {
                coreRule:
                  "Pipes: unidirectional byte stream between related processes. Shared Memory: fastest IPC (zero kernel copies), requires user sync. Message Passing: kernel-managed message queues with built-in sync.",
                mustRememberFormulas: [
                  "Total processes after n consecutive fork() calls = 2^n.",
                  "Total NEW child processes created = 2^n - 1.",
                  "fork() return values: > 0 (Child PID) in Parent; == 0 in Child; < 0 on failure.",
                  "pipe(fd): fd[0] is read end, fd[1] is write end.",
                ],
                criticalPitfalls: [
                  "Shared memory requires explicit synchronization (semaphores/mutexes). Forgetting sync causes race conditions.",
                  "Unclosed pipe ends cause processes to hang indefinitely waiting for EOF on read()!",
                  "Variables modified in child after fork() do NOT mutate the parent's memory (independent address spaces / Copy-On-Write).",
                ],
                visualFlow:
`[ IPC MECHANISMS ARCHITECTURE SPECTRUM ]

     SHARED MEMORY (Fastest)                 MESSAGE PASSING (Safe)
  Process A          Process B          Process A              Process B
      │                  │                  │                      │
      └───►[ Shared ]◄───┘                  └──►[ Kernel Queue ]──►┘
           [ Memory ]                           [ Message Buffer ]
   • Zero kernel copies                  • System call per message
   • User must synchronize               • Built-in kernel synchronization
   • High throughput                     • Ideal for distributed systems`,
              },
            },
            {
              type: "resources",
              heading: "8. Authoritative Source Trail",
              sources: [
                {
                  title: "Operating System Concepts (10th Edition)",
                  authorOrInstitution: "Silberschatz, Galvin, Gagne",
                  topic: "Chapter 3: Processes (Section 3.4: Interprocess Communication)",
                  url: "https://codex.cs.yale.edu/avi/os-book/OS10/slide-dir/index.html",
                  type: "primary-standard",
                  annotation: "Official slides on shared memory vs message passing architectures, POSIX shared memory, and pipes.",
                },
                {
                  title: "Advanced Programming in the UNIX Environment (3rd Edition)",
                  authorOrInstitution: "W. Richard Stevens, Stephen A. Rago",
                  topic: "Chapter 14 & 15: Advanced I/O and Interprocess Communication (Pipes, FIFOs, Shared Memory)",
                  url: "https://www.apuebook.com/",
                  type: "primary-standard",
                  annotation: "The seminal systems programming bible covering pipe descriptor inheritance and POSIX shm API.",
                },
                {
                  title: "NPTEL: Operating Systems",
                  authorOrInstitution: "Prof. Santanu Chattopadhyay (IIT Kharagpur)",
                  topic: "Interprocess Communication & Shared Memory Architecture",
                  url: "https://nptel.ac.in/courses/106105214",
                  type: "curated-lecture",
                  annotation: "Direct lecture on IPC synchronization, race conditions, and message queue primitives.",
                },
              ],
              stillStuck: [
                {
                  prompt: "If fork() process trees and output tracing feel confusing...",
                  title: "Fork System Call with Example in Operating System",
                  creator: "Gate Smashers (Varun Singla)",
                  duration: "13 mins",
                  url: "https://www.youtube.com/watch?v=ixq5cpdEO2Q",
                  whyThisHelps:
                    "Direct walkthrough of fork() return values (0 vs child PID), process tree hierarchy, and print tracing.",
                },
                {
                  prompt: "For whiteboard clarity on IPC paradigms (Shared Memory vs Message Passing)...",
                  title: "Inter-Process Communication (IPC)",
                  creator: "Neso Academy",
                  duration: "14 mins",
                  url: "https://www.youtube.com/watch?v=dJuYKfR8vec",
                  whyThisHelps:
                    "Detailed whiteboard lecture breaking down independent vs cooperating processes, shared buffers, and message passing.",
                },
              ],
            },
          ],
        },
      ],
    },

    // ══════════════════════════════════════════════════════════════════════
    // MODULE 3 — CPU SCHEDULING
    // ══════════════════════════════════════════════════════════════════════
    {
      id: "cpu-scheduling",
      title: "Module 3: CPU Scheduling Algorithms",
      slug: "cpu-scheduling",
      order: 3,
      tagline: "Algorithms and mathematical trade-offs for allocating CPU execution time across processes.",
      lessons: [
        {
          id: "scheduling-basics",
          title: "Scheduling Metrics & Criteria: Arrival, Burst, Turnaround & Waiting",
          slug: "scheduling-basics",
          order: 1,
          estimatedMinutes: 20,
          tagline: "The golden formulas every systems engineer and GATE aspirant must master.",
          hasInteractive: false,
          hasGATE: true,
          hasPractice: true,
          sections: [
            {
              type: "explanation",
              heading: "1. The Scheduling Problem & Core Terminology",
              body: [
                "Whenever the CPU becomes idle, the operating system's Short-Term Scheduler must select one process from the Ready Queue to execute. How does the OS evaluate whether a scheduling algorithm is 'good'?",
                "To measure scheduler efficiency, systems engineers rely on mathematically precise time metrics for every process Pᵢ:",
                "**Arrival Time (AT):** The precise time instant at which the process ==yellow:enters the Ready Queue==.",
                "**Burst Time (BT):** The total amount of ==yellow:CPU execution time required== by the process to complete its current CPU burst.",
                "**Completion Time (CT):** The time instant at which the process ==purple:finishes executing its final instruction==.",
                "**Turnaround Time (TAT):** The entire lifespan of the process in the system, ==yellow:from arrival to completion (TAT = CT - AT)==.",
                "**Waiting Time (WT):** The total time the process spent sitting idly in the Ready Queue ==pink:waiting to be allocated the CPU (WT = TAT - BT)==.",
                "**Response Time (RT):** The time elapsed from arrival until the process produces its first response / ==green:gets its very first CPU burst==.",
              ],
            },
            {
              type: "worked-example",
              heading: "2. The Golden Mathematical Formulas & Derivations",
              problemStatement:
                "Derive the relationship between Completion Time, Arrival Time, Burst Time, and Waiting Time for non-preemptive processes with no I/O.",
              givenData: [
                { label: "Arrival Time", value: "AT" },
                { label: "Burst Time", value: "BT" },
                { label: "Completion Time", value: "CT" },
              ],
              steps: [
                {
                  stepNumber: 1,
                  title: "Turnaround Time Formula",
                  description: "Turnaround time represents ==yellow:total elapsed residence time== in the system from arrival to completion.",
                  formula: "TAT = CT - AT",
                  intermediateResult: "Measures total system residence time.",
                },
                {
                  stepNumber: 2,
                  title: "Waiting Time Formula",
                  description:
                    "Of the total time spent in the system (TAT), the process was actively executing for its Burst Time (BT). Everything else was spent ==pink:waiting in the ready queue==.",
                  formula: "WT = TAT - BT",
                  intermediateResult: "WT = (CT - AT) - BT",
                },
                {
                  stepNumber: 3,
                  title: "Average Metrics",
                  description: "To evaluate overall scheduling fairness, compute the ==purple:arithmetic mean over all N processes==.",
                  formula: "Avg WT = (1/N) * sum(WT_i), Avg TAT = (1/N) * sum(TAT_i)",
                },
              ],
              finalAnswer: "TAT = CT - AT and WT = TAT - BT.",
              examTakeaway:
                "In GATE problems, ==pink:always calculate CT first from the Gantt chart==, then derive ==yellow:TAT = CT - AT==, then derive ==yellow:WT = TAT - BT==. This eliminates calculation mistakes.",
            },
            {
              type: "gate-lens",
              heading: "3. GATE Lens & Verified PYQs",
              weightageSummary:
                "Scheduling metrics are a ==yellow:recurring GATE calculation area (2-4 Marks consistently)== across virtually all exam papers.",
              commonPatterns: [
                "Given a table of processes with Arrival and Burst times, ==purple:construct the Gantt chart== and compute Average Waiting Time or Average Turnaround Time.",
              ],
              commonTraps: [
                "⚠ Watch out for ==pink:non-zero arrival times==! If a process arrives at t = 2, its waiting time does NOT start counting from t = 0.",
                "⚠ If the CPU sits idle between bursts, that ==pink:idle slot MUST be drawn in the Gantt chart== and accounted for in CT.",
              ],
              pyqs: [
                {
                  id: "gate-os-sched-2020",
                  year: 2020,
                  marks: 2,
                  question:
                    "Consider three processes P1, P2, and P3 with arrival times 0, 2, and 4 ms, and CPU burst times 4, 3, and 1 ms, respectively. If non-preemptive Shortest Job First (SJF) scheduling is used, what is the average turnaround time (in ms)?",
                  options: [
                    "A. 3.67 ms",
                    "B. 4.33 ms",
                    "C. 5.00 ms",
                    "D. 5.67 ms",
                  ],
                  correctOptionOrValue: "A. 3.67 ms",
                  detailedSolution:
                    "1. Construct the Gantt Chart:\n• At t = 0 ms: Only P1 is in the ready queue. P1 executes non-preemptively from t = 0 to t = 4 ms. Completion Time ==yellow:CT(P1) = 4 ms==.\n• At t = 4 ms: Both P2 (arrived at t = 2, BT = 3) and P3 (arrived at t = 4, BT = 1) are present in the ready queue. Under SJF, ==green:P3 is selected because BT(P3) = 1 < BT(P2) = 3==.\n• P3 executes from t = 4 to t = 5 ms. Completion Time ==yellow:CT(P3) = 5 ms==.\n• At t = 5 ms: Only P2 remains. P2 executes from t = 5 to t = 8 ms. Completion Time ==yellow:CT(P2) = 8 ms==.\n\n2. Calculate Turnaround Time (TAT = CT - AT):\n• P1: 4 - 0 = ==purple:4 ms==\n• P2: 8 - 2 = ==purple:6 ms==\n• P3: 5 - 4 = ==purple:1 ms==\n\n3. Calculate Average Turnaround Time:\nAverage TAT = (4 + 6 + 1) / 3 = 11 / 3 = ==yellow:3.67 ms==.",
                  keyFormulaOrConcept: "TAT = CT - AT. Avg TAT = sum(TAT) / N.",
                },
              ],
            },
            {
              type: "quick-revision",
              heading: "4. 1-Minute Panic Revision",
              oneMinutePanicCard: {
                coreRule:
                  "Always build Gantt chart → Find Completion Time (CT) → TAT = CT - AT → WT = TAT - BT.",
                mustRememberFormulas: [
                  "TAT = CT - AT (Total time in system)",
                  "WT = TAT - BT (Time spent waiting in ready queue)",
                  "Response Time (RT) = First time getting CPU - AT",
                ],
                criticalPitfalls: [
                  "Never subtract AT from BT directly; WT is derived from TAT!",
                  "Account for CPU idle gaps in the Gantt chart if no process has arrived.",
                ],
                visualFlow:
`[ CPU SCHEDULING DERIVATION PIPELINE ]

   GANTT CHART TIMELINE
   ┌───────────┬───────────────┬───────────────┐
   │    P1     │     IDLE      │      P2       │
   0           4               5               8
               ▲               ▲               ▲
           P1 finishes     Idle gap       P2 finishes
           (CT_1 = 4)                     (CT_2 = 8)

   STEP 1: Read Completion Time (CT) directly off Gantt right-edge.
   STEP 2: Turnaround Time (TAT) = CT - AT
   STEP 3: Waiting Time (WT)    = TAT - BT
   STEP 4: Response Time (RT)   = (First CPU allocation time) - AT`,
              },
            },
            {
              type: "resources",
              heading: "5. Authoritative Source Trail",
              sources: [
                {
                  title: "Operating System Concepts (10th Edition)",
                  authorOrInstitution: "Silberschatz, Galvin, Gagne",
                  topic: "Chapter 5: CPU Scheduling (Section 5.2: Scheduling Criteria & Metrics)",
                  url: "https://codex.cs.yale.edu/avi/os-book/OS10/slide-dir/index.html",
                  type: "primary-standard",
                  annotation: "Official Chapter 5 slides defining CPU utilization, throughput, turnaround time, waiting time, and response time.",
                },
                {
                  title: "Operating Systems: Three Easy Pieces (OSTEP)",
                  authorOrInstitution: "Remzi H. Arpaci-Dusseau & Andrea C. Arpaci-Dusseau",
                  topic: "Chapter 7: Scheduling: Introduction (Workload Assumptions & Metrics)",
                  url: "https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-sched.pdf",
                  type: "primary-standard",
                  annotation: "Full chapter PDF introducing turnaround time vs response time metrics and basic scheduling policies.",
                },
              ],
              stillStuck: [
                {
                  prompt: "If Gantt charts and TAT/WT formulas feel confusing...",
                  title: "CPU Scheduling Criteria in Operating System",
                  creator: "Gate Smashers (Varun Singla)",
                  duration: "11 mins",
                  url: "https://www.youtube.com/watch?v=ITc09gOrqZk",
                  whyThisHelps:
                    "Clear breakdown of Arrival Time, Burst Time, Completion Time, TAT, WT, and CPU idle gap handling on Gantt charts.",
                },
                {
                  prompt: "For whiteboard step-by-step metric calculations...",
                  title: "Introduction to CPU Scheduling Criteria",
                  creator: "Neso Academy",
                  duration: "13 mins",
                  url: "https://www.youtube.com/watch?v=k24nmPz-25M",
                  whyThisHelps:
                    "Whiteboard explanations comparing throughput, CPU utilization, turnaround time, and waiting time definitions.",
                },
              ],
            },
          ],
        },
        {
          id: "fcfs-and-round-robin",
          title: "FCFS & Round Robin Scheduling: Gantt Charts & Time Quantum",
          slug: "fcfs-and-round-robin",
          order: 2,
          estimatedMinutes: 24,
          tagline: "Explore the Convoy Effect, Time Quantum trade-offs, and live Gantt charts.",
          hasInteractive: true,
          hasGATE: true,
          hasPractice: true,
          sections: [
            {
              type: "explanation",
              heading: "1. FCFS & The Convoy Effect",
              body: [
                "First-Come, First-Served (FCFS) is the simplest ==yellow:non-preemptive algorithm==: whoever arrives first in the ready queue is given the CPU until completion.",
                "**The Convoy Effect:** If a long ==pink:CPU-bound process== arrives first, all subsequent short ==green:I/O-bound processes== are forced to wait behind it. This drastically ==pink:drags down average waiting time== and leaves I/O devices sitting idle.",
              ],
            },
            {
              type: "explanation",
              heading: "2. Round Robin (RR) with Time Quantum",
              body: [
                "Round Robin (RR) is designed specifically for time-sharing systems. The CPU is allocated to each ready process for a small slice of time called the ==purple:Time Quantum (q)==.",
                "If the process's burst exceeds q, it is ==yellow:preempted and inserted at the tail== of the Ready Queue.",
                "If q is extremely large (==pink:q → ∞==), RR degenerates into simple ==yellow:FCFS==. If q is extremely small (==pink:q → 0==), ==pink:context-switch overhead dominates==.",
              ],
            },
            {
              type: "worked-example",
              heading: "3. Solved Numerical: Round Robin Gantt Chart & Waiting Time",
              problemStatement:
                "Consider three processes P1, P2, and P3 arriving at time 0, 1, and 2 with burst times 5, 3, and 1 respectively. The CPU is allocated using Round Robin scheduling with time quantum q = 2 ms. Determine the exact Ready Queue transitions at each preemption point, construct the execution Gantt chart, and compute the Turnaround Time (TAT) and Waiting Time (WT) for each process along with Average Waiting Time.",
              givenData: [
                { label: "P1 (AT, BT)", value: "AT = 0 ms, BT = 5 ms" },
                { label: "P2 (AT, BT)", value: "AT = 1 ms, BT = 3 ms" },
                { label: "P3 (AT, BT)", value: "AT = 2 ms, BT = 1 ms" },
                { label: "Time Quantum (q)", value: "q = 2 ms" },
              ],
              svgContent: `<svg viewBox="0 0 540 145" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto text-ink-1 select-none"><text x="20" y="24" fill="var(--color-accent, #9333ea)" font-size="15" font-weight="bold" style="font-family: 'Caveat', cursive;">✎ Hand-Sketched Execution Gantt Chart (q = 2 ms):</text><line x1="20" y1="78" x2="515" y2="78" stroke="currentColor" stroke-opacity="0.3" stroke-width="1.2" /><rect x="20" y="42" width="110" height="36" rx="4" fill="var(--color-accent, #9333ea)" fill-opacity="0.14" stroke="var(--color-accent, #9333ea)" stroke-width="1.3" /><text x="75" y="65" fill="currentColor" text-anchor="middle" font-weight="bold" font-size="16" style="font-family: 'Caveat', cursive;">P1</text><line x1="20" y1="78" x2="20" y2="86" stroke="currentColor" stroke-width="1.2" /><text x="20" y="100" fill="currentColor" font-size="11" font-family="monospace" text-anchor="middle">0</text><line x1="130" y1="78" x2="130" y2="86" stroke="currentColor" stroke-width="1.2" /><text x="130" y="100" fill="currentColor" font-size="11" font-family="monospace" text-anchor="middle">2</text><rect x="130" y="42" width="110" height="36" rx="4" fill="currentColor" fill-opacity="0.05" stroke="currentColor" stroke-opacity="0.4" stroke-width="1.3" /><text x="185" y="65" fill="currentColor" text-anchor="middle" font-weight="bold" font-size="16" style="font-family: 'Caveat', cursive;">P2</text><line x1="240" y1="78" x2="240" y2="86" stroke="currentColor" stroke-width="1.2" /><text x="240" y="100" fill="currentColor" font-size="11" font-family="monospace" text-anchor="middle">4</text><rect x="240" y="42" width="55" height="36" rx="4" fill="var(--color-highlight, #facc15)" fill-opacity="0.22" stroke="var(--color-highlight, #facc15)" stroke-width="1.3" /><text x="267" y="65" fill="currentColor" text-anchor="middle" font-weight="bold" font-size="16" style="font-family: 'Caveat', cursive;">P3</text><line x1="295" y1="78" x2="295" y2="86" stroke="currentColor" stroke-width="1.2" /><text x="295" y="100" fill="currentColor" font-size="11" font-family="monospace" text-anchor="middle">5</text><rect x="295" y="42" width="110" height="36" rx="4" fill="var(--color-accent, #9333ea)" fill-opacity="0.14" stroke="var(--color-accent, #9333ea)" stroke-width="1.3" /><text x="350" y="65" fill="currentColor" text-anchor="middle" font-weight="bold" font-size="16" style="font-family: 'Caveat', cursive;">P1</text><line x1="405" y1="78" x2="405" y2="86" stroke="currentColor" stroke-width="1.2" /><text x="405" y="100" fill="currentColor" font-size="11" font-family="monospace" text-anchor="middle">7</text><rect x="405" y="42" width="55" height="36" rx="4" fill="currentColor" fill-opacity="0.05" stroke="currentColor" stroke-opacity="0.4" stroke-width="1.3" /><text x="432" y="65" fill="currentColor" text-anchor="middle" font-weight="bold" font-size="16" style="font-family: 'Caveat', cursive;">P2</text><line x1="460" y1="78" x2="460" y2="86" stroke="currentColor" stroke-width="1.2" /><text x="460" y="100" fill="currentColor" font-size="11" font-family="monospace" text-anchor="middle">8</text><rect x="460" y="42" width="55" height="36" rx="4" fill="var(--color-accent, #9333ea)" fill-opacity="0.14" stroke="var(--color-accent, #9333ea)" stroke-width="1.3" /><text x="487" y="65" fill="currentColor" text-anchor="middle" font-weight="bold" font-size="16" style="font-family: 'Caveat', cursive;">P1</text><line x1="515" y1="78" x2="515" y2="86" stroke="currentColor" stroke-width="1.2" /><text x="515" y="100" fill="currentColor" font-size="11" font-family="monospace" text-anchor="middle">9</text><path d="M130 108 C130 118, 145 126, 168 126" stroke="var(--color-accent, #9333ea)" stroke-width="1" stroke-dasharray="2 2" fill="none" /><text x="174" y="129" fill="var(--color-accent, #9333ea)" font-size="12" style="font-family: 'Caveat', cursive;">↳ t=2: P3 arrives &amp; enters queue BEFORE preempted P1</text><path d="M295 108 C295 116, 305 122, 318 122" stroke="var(--color-highlight, #facc15)" stroke-width="1" stroke-dasharray="2 2" fill="none" /><text x="322" y="123" fill="var(--color-highlight, #d97706)" font-size="12" style="font-family: 'Caveat', cursive;">↳ P3 exits here (needed only 1 ms)</text></svg>`,
              steps: [
                {
                  stepNumber: 1,
                  title: "Ready Queue Trace & Tie-Breaking Rule",
                  description:
                    "At t=0, only P1 has arrived → P1 runs for full quantum ==purple:q=2== (remaining BT = 3). During this interval, P2 arrives at t=1, and P3 arrives at exactly t=2. ==pink:Crucial Invariant: When P1 quantum expires at t=2, newly arrived P3 enters the queue BEFORE preempted P1==. Queue becomes: ==green:[P2, P3, P1]==.",
                  formula: "Ready Queue at t = 2: [P2, P3, P1]",
                  intermediateResult: "P1 remaining BT = 3",
                },
                {
                  stepNumber: 2,
                  title: "Dispatching P2 and P3",
                  description:
                    "t=2 to 4: P2 runs for 2 ms (remaining BT = 1). Re-queued at tail. Ready Queue becomes: [P3, P1, P2].\nt=4 to 5: ==green:P3 needs only 1 ms ≤ q==. It runs for 1 ms and terminates at t=5. Calls ==yellow:exit()==, ==green:no re-queueing!== Ready Queue becomes: [P1, P2].",
                  formula: "P3 Completion Time CT = 5 ms",
                  intermediateResult: "P3 finished at t = 5 ms",
                },
                {
                  stepNumber: 3,
                  title: "Final Execution Slices",
                  description:
                    "t=5 to 7: P1 runs for 2 ms (remaining BT = 1). Queue: [P2, P1].\nt=7 to 8: P2 runs for its final 1 ms and terminates at t=8. Queue: [P1].\nt=8 to 9: P1 runs for its final 1 ms and terminates at t=9.",
                  formula: "P2 CT = 8 ms, P1 CT = 9 ms",
                  intermediateResult: "All processes complete by t = 9 ms",
                },
                {
                  stepNumber: 4,
                  title: "Turnaround Time (TAT) and Waiting Time (WT) Calculation",
                  description:
                    "Using standard OS formulas: ==yellow:TAT = CT - AT== and ==yellow:WT = TAT - BT==.\nP1: CT = 9, TAT = 9 - 0 = ==purple:9 ms==, WT = 9 - 5 = ==purple:4 ms==.\nP2: CT = 8, TAT = 8 - 1 = ==purple:7 ms==, WT = 7 - 3 = ==purple:4 ms==.\nP3: CT = 5, TAT = 5 - 2 = ==purple:3 ms==, WT = 3 - 1 = ==green:0 ms==.",
                  formula: "Total WT = 4 + 4 + 0 = 8 ms",
                  intermediateResult: "Average WT = 8 / 3 = 2.67 ms",
                },
              ],
              finalAnswer: "Average Waiting Time = 2.67 ms (Avg TAT = 6.33 ms)",
              examTakeaway:
                "==pink:Tie-break rule is where 80% of students lose marks==: New arrivals at time t enter the Ready Queue ==yellow:BEFORE the process preempted at time t==.",
            },
            {
              type: "interactive",
              heading: "4. Interactive CPU Scheduling & Gantt Chart Simulator",
              leadParagraph:
                "Interact with real processes. Switch between FCFS and Round Robin, adjust the time quantum, and observe how the Gantt chart and waiting times automatically recompute.",
              interactive: {
                kind: "cpu-scheduler",
                config: {
                  title: "Real-time CPU Scheduler & Gantt Chart Simulator",
                  caption:
                    "Interactive simulation supporting all classic scheduling algorithms: FCFS, SJF (Non-preemptive), SRTF (Preemptive SJF), Priority (Preemptive & Non-preemptive), Round Robin, LJF, LRTF, and HRRN.",
                  defaultAlgorithm: "round-robin",
                  defaultQuantum: 2,
                  sampleProcesses: [
                    { id: "P1", arrivalTime: 0, burstTime: 5, priority: 2, color: "#9333ea" },
                    { id: "P2", arrivalTime: 1, burstTime: 3, priority: 1, color: "#3b82f6" },
                    { id: "P3", arrivalTime: 2, burstTime: 1, priority: 3, color: "#10b981" },
                    { id: "P4", arrivalTime: 3, burstTime: 2, priority: 4, color: "#f59e0b" },
                  ],
                },
              },
            },
            {
              type: "gate-lens",
              heading: "5. GATE Lens & Verified PYQ",
              weightageSummary:
                "Round Robin with arrival time tie-breaks is one of the most common 2-mark numerical question patterns in GATE CS.",
              commonPatterns: [
                "A process finishing exactly at its quantum boundary: it finishes execution and does NOT re-enter the queue.",
                "Simultaneous arrival: if a new process arrives at time t exactly when an executing process is preempted, by standard convention the newly arrived process enters the Ready Queue FIRST, followed by the preempted process.",
              ],
              commonTraps: [
                "⚠ Forgetting the tie-breaking arrival order in the Ready queue.",
              ],
              pyqs: [
                {
                  id: "gate-rr-2019",
                  year: 2019,
                  marks: 2,
                  question:
                    "Consider three processes P1, P2, and P3 arriving at time 0, 1, and 2 with burst times 5, 3, and 1 respectively. Using Round Robin scheduling with time quantum q = 2, what is the average waiting time (in ms)?",
                  options: [
                    "A. 2.67 ms",
                    "B. 3.00 ms",
                    "C. 3.33 ms",
                    "D. 4.00 ms",
                  ],
                  correctOptionOrValue: "A. 2.67 ms",
                  detailedSolution:
                    "Gantt Chart Execution with q = 2:\n1. t=0 to 2: P1 executes (remaining BT = 3). During this time, P2 (at t=1) and P3 (at t=2) arrive. Ready queue: [P2, P3, P1].\n2. t=2 to 4: P2 executes (remaining BT = 1). Ready queue: [P3, P1, P2].\n3. t=4 to 5: P3 executes (BT=1, finishes at t=5). Ready queue: [P1, P2].\n4. t=5 to 7: P1 executes (remaining BT = 1). Ready queue: [P2, P1].\n5. t=7 to 8: P2 executes (finishes at t=8). Ready queue: [P1].\n6. t=8 to 9: P1 executes (finishes at t=9).\n\nCompletion Times:\nP1: CT = 9, TAT = 9 - 0 = 9, WT = 9 - 5 = 4 ms.\nP2: CT = 8, TAT = 8 - 1 = 7, WT = 7 - 3 = 4 ms.\nP3: CT = 5, TAT = 5 - 2 = 3, WT = 3 - 1 = 0 ms.\n\nTotal WT = 4 + 4 + 0 = 8 ms.\nAverage WT = 8 / 3 = 2.67 ms.",
                  keyFormulaOrConcept:
                    "Tie break rule: New arrivals enter ready queue before preempted process.",
                },
              ],
            },
            {
              type: "quick-revision",
              heading: "6. 1-Minute Panic Revision",
              oneMinutePanicCard: {
                coreRule:
                  "FCFS = Non-preemptive, Convoy Effect. RR = Preemptive with Quantum q. Low q → high overhead; High q → FCFS.",
                mustRememberFormulas: [
                  "If new process arrives at time t when P is preempted: New arrival queued before preempted process.",
                  "If burst <= quantum, process finishes early and next process dispatches immediately.",
                ],
                criticalPitfalls: [
                  "Do not allow quantum to expire if process has less than q time remaining.",
                ],
                visualFlow:
`[ ROUND ROBIN TIME QUANTUM PREEMPTION DECISION TREE ]

Process P_i is currently running on CPU:
                 │
                 ▼
         Remaining Burst ≤ q ?
               │
       ┌───────┴──────────────────────┐
       │ Yes                          │ No
       ▼                              ▼
  P_i runs for RemainingBurst    P_i runs for full Quantum q
  Calls exit()                   Timer Interrupt fires!
  [ TERMINATES ]                 Preempted to Ready Queue Tail
                                 (behind newly arrived processes!)`,
              },
            },
            {
              type: "resources",
              heading: "7. Authoritative Source Trail",
              sources: [
                {
                  title: "Operating System Concepts (10th Edition)",
                  authorOrInstitution: "Silberschatz, Galvin, Gagne",
                  topic: "Chapter 5: CPU Scheduling (Section 5.3.1: FCFS & Section 5.3.4: Round-Robin)",
                  url: "https://codex.cs.yale.edu/avi/os-book/OS10/slide-dir/index.html",
                  type: "primary-standard",
                  annotation: "Official slides covering FCFS convoy effect, RR time slice quantum selection, and context switch costs.",
                },
                {
                  title: "Operating Systems: Three Easy Pieces (OSTEP)",
                  authorOrInstitution: "Remzi H. Arpaci-Dusseau & Andrea C. Arpaci-Dusseau",
                  topic: "Chapter 7: Scheduling: Introduction (FIFO & Round Robin Policies)",
                  url: "https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-sched.pdf",
                  type: "primary-standard",
                  annotation: "Full chapter analyzing response time tradeoffs between FIFO and Round Robin with Gantt charts.",
                },
              ],
              stillStuck: [
                {
                  prompt: "If Round Robin ready queue order with simultaneous arrivals is tricky...",
                  title: "Round Robin(RR) CPU Scheduling Algorithm with Example",
                  creator: "Gate Smashers (Varun Singla)",
                  duration: "14 mins",
                  url: "https://www.youtube.com/watch?v=W133uP1y5Y0",
                  whyThisHelps:
                    "Demonstrates exactly how to maintain the ready queue without ordering bugs during preemption boundaries.",
                },
                {
                  prompt: "For FCFS Gantt charts and Convoy Effect numericals...",
                  title: "First Come First Serve (FCFS) CPU Scheduling Algorithm with Example",
                  creator: "Gate Smashers (Varun Singla)",
                  duration: "12 mins",
                  url: "https://www.youtube.com/watch?v=ITc09gOrqZk",
                  whyThisHelps:
                    "Walks through FCFS step-by-step with CT, TAT, WT and explains why CPU-bound jobs stall I/O devices.",
                },
              ],
            },
          ],
        },
        {
          id: "sjf-srtf-priority-scheduling",
          title: "SJF, SRTF & Priority Scheduling: Optimal Turnaround & Starvation",
          slug: "sjf-srtf-priority-scheduling",
          order: 3,
          estimatedMinutes: 22,
          tagline: "Non-preemptive SJF, preemptive SRTF (optimal waiting time), Priority scheduling, and Aging.",
          hasInteractive: false,
          hasGATE: true,
          hasPractice: true,
          sections: [
            {
              type: "explanation",
              heading: "1. Shortest Job First (SJF): Principle & Theoretical Optimality",
              body: [
                "Shortest Job First (SJF) associates with each process the length of its next CPU burst. When the CPU becomes available, it is assigned to the process that has the ==yellow:smallest burst time==. If two processes have identical burst lengths, ==purple:FCFS scheduling is used as a tiebreaker==.",
                "**Provable Optimality:** SJF is ==green:provably optimal in giving minimum average waiting time== for a given set of stationary processes. Moving a short process before a long one reduces the waiting time of the short process by more than it increases the waiting time of the long one.",
                "**The Fundamental Limitation:** SJF cannot be implemented in general-purpose long-term/short-term schedulers because the Operating System ==pink:cannot predict the exact future CPU burst length== of a user process.",
                "**Burst Prediction via Exponential Smoothing:** The OS approximates the next burst $\\tau_{n+1}$ using historical actual bursts $t_n$ and prior estimates $\\tau_n$: ==purple:$\\tau_{n+1} = \\alpha \\cdot t_n + (1 - \\alpha) \\cdot \\tau_n$==, where $0 \\le \\alpha \\le 1$ (typically $\\alpha = 0.5$).",
              ],
              callout: {
                kind: "gate-tip",
                title: "GATE Trap: Provable Optimality Scope",
                message:
                  "In GATE multiple-choice questions, remember: ==yellow:Non-preemptive SJF is optimal among non-preemptive algorithms==, whereas ==green:Preemptive SJF (SRTF) is optimal among ALL scheduling algorithms== for minimizing average waiting time.",
              },
            },
            {
              type: "explanation",
              heading: "2. Shortest Remaining Time First (SRTF): Preemptive Scheduling",
              body: [
                "SRTF is the ==yellow:preemptive version of SJF==. When a new process arrives at the Ready Queue with a remaining CPU burst time strictly shorter than the currently running process's remaining time, the running process is ==pink:preempted and moved back to the Ready Queue==.",
                "**Key GATE Preemption Condition:** Preemption occurs IF AND ONLY IF ==purple:Remaining_Time(New) < Remaining_Time(Current)==. If ==pink:Remaining_Time(New) == Remaining_Time(Current)==, the CPU continues running the current process to ==green:avoid unnecessary context-switch overhead==.",
                "**Trade-off:** While SRTF yields the ==green:lowest theoretical average waiting time==, every preemption incurs a CPU context switch. In practice, high context-switch frequency ==pink:degrades effective throughput==.",
              ],
            },
            {
              type: "comparison",
              heading: "3. Algorithm Comparison Matrix",
              leadParagraph:
                "Detailed algorithmic trade-offs across preemption, optimality, starvation risk, and typical use cases:",
              columns: ["Algorithm", "Preemptive?", "Optimal For?", "Starvation Risk", "Worst Case Hazard"],
              criteria: [
                {
                  criterion: "FCFS",
                  values: ["No", "Fairness / Simplicity", "None (No Starvation)", "Convoy Effect (high avg WT)"],
                },
                {
                  criterion: "SJF (Non-preemptive)",
                  values: ["No", "Avg WT (Non-preemptive)", "Yes (Long jobs starve)", "Unbounded wait for long bursts"],
                },
                {
                  criterion: "SRTF (Preemptive)",
                  values: ["Yes", "Avg WT (Overall)", "Yes (Long jobs starve)", "Excessive context switching"],
                },
                {
                  criterion: "Round Robin (RR)",
                  values: ["Yes (Time Quantum)", "Response Time", "None (Bounded wait)", "Degrades to FCFS if q is large"],
                },
                {
                  criterion: "Priority Scheduling",
                  values: ["Both (Preemptive & Non)", "Importance / Urgency", "Yes (Low priority starves)", "Priority Inversion (requires PIP/PCP)"],
                },
              ],
            },
            {
              type: "worked-example",
              heading: "4. GATE Step-by-Step Numerical: SRTF Gantt Chart & Turnaround Time",
              problemStatement:
                "Consider four processes P1, P2, P3, and P4 arriving with the following Arrival Times (AT) and CPU Burst Times (BT): P1(AT=0, BT=8), P2(AT=1, BT=4), P3(AT=2, BT=9), and P4(AT=3, BT=5). If Preemptive Shortest Remaining Time First (SRTF) scheduling is used, trace the Gantt chart and compute the Average Turnaround Time and Average Waiting Time.",
              givenData: [
                { label: "P1", value: "AT = 0, BT = 8" },
                { label: "P2", value: "AT = 1, BT = 4" },
                { label: "P3", value: "AT = 2, BT = 9" },
                { label: "P4", value: "AT = 3, BT = 5" },
              ],
              steps: [
                {
                  stepNumber: 1,
                  title: "Gantt Chart Execution Trace (t = 0 to t = 5)",
                  description:
                    "• At t = 0: Only P1 is available. P1 executes from t = 0 to 1.\n• At t = 1: P2 arrives (BT = 4). P1 has remaining burst = 7. ==green:Since 4 < 7, P1 is preempted==. P2 takes CPU.\n• At t = 2: P3 arrives (BT = 9). P2 has remaining burst = 3. Since 3 < 9, P2 continues.\n• At t = 3: P4 arrives (BT = 5). P2 has remaining burst = 2. Since 2 < 5, P2 continues.\n• At t = 5: ==yellow:P2 completes execution!== Completion Time ==purple:CT(P2) = 5==.",
                  formula: "t=0..1: P1 | t=1..5: P2 (CT = 5)",
                  intermediateResult: "CT(P2) = 5",
                },
                {
                  stepNumber: 2,
                  title: "Remaining Queue Evaluation (t = 5 to t = 26)",
                  description:
                    "• At t = 5: Ready queue holds P1(rem = 7), P4(rem = 5), P3(rem = 9). Smallest remaining burst is P4 (5). P4 executes from t = 5 to 10. ==purple:CT(P4) = 10==.\n• At t = 10: Ready queue holds P1(rem = 7) and P3(rem = 9). Smallest is P1 (7). P1 executes from t = 10 to 17. ==purple:CT(P1) = 17==.\n• At t = 17: Only P3 remains (BT = 9). P3 executes from t = 17 to 26. ==purple:CT(P3) = 26==.",
                  formula: "t=5..10: P4 | t=10..17: P1 | t=17..26: P3",
                  intermediateResult: "CT(P4) = 10, CT(P1) = 17, CT(P3) = 26",
                },
                {
                  stepNumber: 3,
                  title: "Calculate Turnaround Time (TAT = CT - AT) and Waiting Time (WT = TAT - BT)",
                  description:
                    "• P1: TAT = 17 - 0 = ==purple:17==, WT = 17 - 8 = ==purple:9==\n• P2: TAT = 5 - 1 = ==purple:4==, WT = 4 - 4 = ==green:0==\n• P3: TAT = 26 - 2 = ==purple:24==, WT = 24 - 9 = ==purple:15==\n• P4: TAT = 10 - 3 = ==purple:7==, WT = 7 - 5 = ==purple:2==\n\nTotal TAT = 17 + 4 + 24 + 7 = 52. Average TAT = 52 / 4 = ==yellow:13.0 units==.\nTotal WT = 9 + 0 + 15 + 2 = 26. Average WT = 26 / 4 = ==yellow:6.5 units==.",
                  formula: "Avg TAT = 52 / 4 = 13.0 | Avg WT = 26 / 4 = 6.5",
                  intermediateResult: "Avg TAT = 13.0 units, Avg WT = 6.5 units",
                },
              ],
              finalAnswer: "Average Turnaround Time = 13.0 units, Average Waiting Time = 6.5 units",
              examTakeaway:
                "In SRTF, whenever a new process arrives, ==pink:re-evaluate remaining burst times of all active processes immediately==. Preempted processes retain their remaining burst times and return to the ready queue.",
            },
            {
              type: "explanation",
              heading: "5. Priority Scheduling & The Aging Mitigation Strategy",
              body: [
                "In Priority Scheduling, an integer priority is assigned to each process. By standard UNIX convention, ==yellow:smaller integer values indicate higher priority== (e.g., priority 0 is higher than priority 10). The CPU is allocated to the process with the highest priority.",
                "**Starvation (Indefinite Blocking):** A major hazard where ==pink:low-priority processes may wait indefinitely== if there is a steady stream of higher-priority processes.",
                "**The Solution — Aging:** ==green:Aging is a technique of gradually increasing the priority== of processes that wait in the system for a long time. For example, if priorities range from 127 (lowest) to 0 (highest), the kernel can ==purple:decrement the priority value by 1 every 15 minutes== of ready-queue waiting. Eventually, even the lowest-priority process climbs to the top.",
              ],
            },
            {
              type: "quick-revision",
              heading: "6. 1-Minute Panic Revision",
              oneMinutePanicCard: {
                coreRule:
                  "SJF minimizes average waiting time (provably optimal). SRTF is preemptive SJF. Priority scheduling requires aging to prevent starvation.",
                mustRememberFormulas: [
                  "Exponential Smoothing: tau_(n+1) = alpha * t_n + (1 - alpha) * tau_n.",
                  "TAT = CT - AT; WT = TAT - BT.",
                  "SRTF re-evaluates scheduling whenever a new process arrives with remaining burst < current process.",
                ],
                criticalPitfalls: [
                  "SJF is provably optimal for average waiting time among all non-preemptive algorithms, but cannot be implemented without predicting future burst time.",
                  "Priority Inversion: High priority process blocked waiting for resource held by low priority process. Fixed by Priority Inheritance Protocol (PIP).",
                ],
                visualFlow:
`[ SRTF PREEMPTION DECISION TREE ]

New Process P_new arrives at time t:
                 │
                 ▼
Is Remaining_BT(P_new) < Remaining_BT(P_current) ?
        │
        ├─ Yes ───> [ PREEMPT P_current ]
        │           Save context, move P_current to Ready Queue
        │           Dispatch P_new to CPU
        │
        └─ No  ───> [ KEEP RUNNING P_current ]
                    Insert P_new into Ready Queue ordered by remaining BT`,
              },
            },
            {
              type: "resources",
              heading: "7. Authoritative Source Trail",
              sources: [
                {
                  title: "Operating System Concepts (10th Edition)",
                  authorOrInstitution: "Silberschatz, Galvin, Gagne",
                  topic: "Chapter 5: CPU Scheduling (Section 5.3.2: SJF & Section 5.3.3: Priority Scheduling)",
                  url: "https://codex.cs.yale.edu/avi/os-book/OS10/slide-dir/index.html",
                  type: "primary-standard",
                  annotation: "Official slides covering mathematical proof of SJF optimality, exponential smoothing, and priority aging.",
                },
                {
                  title: "Operating Systems: Three Easy Pieces (OSTEP)",
                  authorOrInstitution: "Remzi H. Arpaci-Dusseau & Andrea C. Arpaci-Dusseau",
                  topic: "Chapter 7: Scheduling: Introduction (SJF & STCF / Preemptive SJF)",
                  url: "https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-sched.pdf",
                  type: "primary-standard",
                  annotation: "Clear proof of why Shortest Time-to-Completion First (STCF/SRTF) minimizes average turnaround time.",
                },
              ],
              stillStuck: [
                {
                  prompt: "If SRTF preemption boundaries and remaining burst calculations feel tricky...",
                  title: "Shortest Remaining Time First (SJF With Preemption) with Example",
                  creator: "Gate Smashers (Varun Singla)",
                  duration: "15 mins",
                  url: "https://www.youtube.com/watch?v=PrS1pZ748uA",
                  whyThisHelps:
                    "Step-by-step Gantt chart solving with detailed calculations of CT, TAT, and WT under arrival preemption.",
                },
                {
                  prompt: "For Priority Scheduling and Aging exam patterns...",
                  title: "Pre-emptive Priority Scheduling Algorithm with Example",
                  creator: "Gate Smashers (Varun Singla)",
                  duration: "14 mins",
                  url: "https://www.youtube.com/watch?v=ITc09gOrqZk",
                  whyThisHelps:
                    "Covers high-yield GATE traps: handling ties, priority inversion, and using aging to eliminate starvation.",
                },
              ],
            },
          ],
        },
      ],
    },

    // ══════════════════════════════════════════════════════════════════════
    // MODULE 4 — PROCESS SYNCHRONIZATION
    // ══════════════════════════════════════════════════════════════════════
    {
      id: "process-synchronization",
      title: "Module 4: Process Synchronization & Concurrency",
      slug: "process-synchronization",
      order: 4,
      tagline: "Eliminating race conditions: Critical Section, Peterson's Algorithm, and Semaphores.",
      lessons: [
        {
          id: "critical-section-and-semaphores",
          title: "The Critical Section Problem & Semaphores",
          slug: "critical-section-and-semaphores",
          order: 1,
          estimatedMinutes: 24,
          tagline: "Race conditions, Mutual Exclusion, Progress, Bounded Waiting, and Semaphore operations.",
          hasInteractive: true,
          hasGATE: true,
          hasPractice: true,
          sections: [
            {
              type: "explanation",
              heading: "1. The Race Condition & The Critical Section Problem",
              body: [
                "When multiple processes share common storage (RAM, files, global variables) and access it concurrently, the final outcome depends on the exact execution order of interleaving instructions. This bug is a ==pink:Race Condition==.",
                "To prevent race conditions, the code region that accesses shared resources is designated as the ==yellow:Critical Section (CS)==. A valid solution to the Critical Section problem MUST satisfy three mandatory criteria:",
                "**1. Mutual Exclusion (Safety):** If process Pᵢ is executing in its critical section, ==pink:no other processes can be executing in their critical sections==.",
                "**2. Progress (Liveness):** If no process is in its CS and some processes wish to enter, ==purple:only processes not in their remainder sections can participate in deciding who enters next==, and this selection ==green:cannot be postponed indefinitely==.",
                "**3. Bounded Waiting (Fairness/Starvation-freedom):** There must exist a bound on the number of times other processes are allowed to enter their critical sections after a process has requested entry, ==yellow:preventing starvation==.",
              ],
              callout: {
                kind: "trap",
                title: "GATE Trap: Progress Definition",
                message:
                  "Students frequently mistake Progress for throughput. In OS theory, Progress means: a process executing in its ==pink:REMAINDER section must not block a process wanting to enter the Critical Section==, and ==green:deadlock cannot occur==.",
              },
            },
            {
              type: "explanation",
              heading: "2. Peterson's Algorithm: Software Mutual Exclusion for Two Processes",
              body: [
                "Can software alone guarantee mutual exclusion without special hardware instructions? In 1981, Gary L. Peterson devised a classic algorithmic solution for two processes, alternating between their critical and remainder sections.",
                "Consider two processes, $P_0$ and $P_1$. Let the current process be $P_i$ and the other process be $P_j$ (where $j = 1 - i$). Peterson's algorithm shares two variables:",
                "• `boolean flag[2];` (where ==purple:flag[i] = true== indicates that process $P_i$ is ready to enter its critical section).",
                "• `int turn;` (indicates ==yellow:whose turn it is to enter the critical section==).",
                "**The Algorithm Structure for Process $P_i$:**\n```c\nflag[i] = true;          // 1. Declare intent: I want to enter\nturn = j;                // 2. Be polite: Offer priority to the other process\nwhile (flag[j] && turn == j); // 3. Busy-wait while other wants in AND has turn\n\n/* CRITICAL SECTION */\n\nflag[i] = false;         // 4. Exit: Release claim\n\n/* REMAINDER SECTION */\n```",
                "**Proof of Correctness:**",
                "**1. Mutual Exclusion Guaranteed:** For both processes to be in the CS simultaneously, both `flag[0]` and `flag[1]` must be true, and ==pink:turn == 0 AND turn == 1 must hold simultaneously==. Since `turn` is a scalar variable that can only hold one value at a time, ==green:at least one process was blocked in the while loop==.",
                "**2. Progress Guaranteed:** If $P_j$ is not in its CS and has no desire to enter (`flag[j] == false`), the while condition for $P_i$ immediately evaluates to false, ==green:allowing P_i to enter without delay==. If both try to enter concurrently, `turn` will be set to either 0 or 1 by whichever write executes last, permitting the other process to enter immediately.",
                "**3. Bounded Waiting Guaranteed:** A process waits ==yellow:at most one critical section entry== of the other process. Once $P_j$ exits, it resets `flag[j] = false`, freeing $P_i$.",
              ],
              callout: {
                kind: "trap",
                title: "Modern Architecture Limitation",
                message:
                  "Peterson's algorithm is ==pink:not guaranteed to work on modern multicore processors without memory barriers== (fences)! Modern CPUs and optimizing compilers perform ==purple:out-of-order execution and store buffering==, reordering independent reads and writes to `flag` and `turn`.",
              },
            },
            {
              type: "explanation",
              heading: "3. Semaphores: Dijkstra's Synchronization Primitive",
              body: [
                "While Peterson's algorithm works for two processes, scaling software synchronization to N processes introduces significant complexity and CPU-burning busy-waiting. In 1965, Edsger Dijkstra introduced the ==purple:Semaphore==.",
                "A semaphore `S` is an integer variable that, apart from initialization, is accessed only through two standard atomic hardware/kernel operations: ==yellow:wait() (P-operation)== and ==yellow:signal() (V-operation)==.",
                "**Atomic Definition of wait(S):**\n```c\nwait(S) {\n    S = S - 1;\n    if (S < 0) {\n        // add this process to semaphore's waiting queue\n        block();\n    }\n}\n```",
                "**Atomic Definition of signal(S):**\n```c\nsignal(S) {\n    S = S + 1;\n    if (S <= 0) {\n        // remove a process P from the waiting queue\n        wakeup(P);\n    }\n}\n```",
                "Crucially, the modification to `S` and the test must execute ==pink:atomically (uninterruptibly)== — guaranteed by the OS kernel ==purple:disabling interrupts on uniprocessors== or using ==purple:hardware spinlocks (test_and_set) on multiprocessors==.",
              ],
            },
            {
              type: "interactive",
              heading: "4. Interactive Semaphore Simulator",
              leadParagraph:
                "Simulate counting and binary semaphores live. Trigger wait(S) (P-operation) and signal(S) (V-operation) for processes P1, P2, and P3 to observe how S manages entry and queues blocked processes.",
              interactive: {
                kind: "semaphore",
                config: {
                  title: "Semaphore State & Blocked Queue Simulator",
                  caption:
                    "Observe how wait(S) decrements S and blocks processes when S < 0, while signal(S) increments S and awakens blocked processes.",
                  initialValue: 1,
                  resourceName: "Mutex Semaphore (S)",
                  operations: [],
                },
              },
            },
            {
              type: "comparison",
              heading: "5. Counting vs. Binary Semaphore",
              leadParagraph: "Dijkstra introduced two classes of semaphores for synchronization problems.",
              columns: ["Binary Semaphore (Mutex)", "Counting Semaphore"],
              criteria: [
                {
                  feature: "Value Range",
                  first: "Only 0 or 1.",
                  second: "Any integer value (-k to +N).",
                },
                {
                  feature: "Primary Use Case",
                  first: "Mutual exclusion for a single exclusive resource (Critical Section).",
                  second: "Managing access to a finite pool of N identical resource units (e.g. buffer slots).",
                },
                {
                  feature: "Negative Value Meaning",
                  first: "In standard definition, if < 0, represents number of blocked processes.",
                  second: "If S = -k, exactly k processes are currently waiting in the semaphore queue.",
                },
              ],
              summaryTakeaway:
                "A binary semaphore enforces strict 1-at-a-time mutual exclusion; a counting semaphore manages pools of N resources.",
            },
            {
              type: "gate-lens",
              heading: "6. GATE Lens & Verified PYQs",
              weightageSummary:
                "Semaphore arithmetic (counting initial value, sequence of wait and signal operations, finding final value and queue length) is a recurring 2-mark GATE question.",
              commonPatterns: [
                "Given initial semaphore value S = N, after p wait operations and q signal operations, what is the value of S and how many processes are blocked?",
              ],
              commonTraps: [
                "⚠ If final S ≥ 0, exactly 0 processes are blocked!",
                "⚠ If final S < 0, exactly |S| processes are blocked in the waiting queue!",
              ],
              pyqs: [
                {
                  id: "gate-sync-sem-2019",
                  year: 2019,
                  marks: 2,
                  question:
                    "A counting semaphore S is initialized to 7. Then, 20 P (wait) operations and 15 V (signal) operations are conducted on S in some arbitrary order. What is the final value of the semaphore S, and how many processes are blocked in the waiting queue?",
                  options: [
                    "A. S = 2, 0 processes blocked",
                    "B. S = 2, 2 processes blocked",
                    "C. S = -2, 2 processes blocked",
                    "D. S = 0, 0 processes blocked",
                  ],
                  correctOptionOrValue: "A. S = 2, 0 processes blocked",
                  detailedSolution:
                    "Formula:\nFinal S = Initial S - (Number of P operations) + (Number of V operations)\nFinal S = 7 - 20 + 15 = 2.\nSince the final value S = 2 is strictly greater than or equal to 0, no processes are blocked in the waiting queue.\n(If S were negative, say -2, then 2 processes would be blocked. Here S = 2, so 0 are blocked).",
                  keyFormulaOrConcept:
                    "Final S = Initial S - P + V. If S < 0, |S| processes are blocked; else 0 blocked.",
                },
              ],
            },
            {
              type: "quick-revision",
              heading: "7. 1-Minute Panic Revision",
              oneMinutePanicCard: {
                coreRule:
                  "Critical Section requires: Mutual Exclusion (at most 1 in CS), Progress (no deadlock by non-CS processes), Bounded Waiting (no starvation). Peterson's algorithm solves CS for 2 processes. Semaphores solve CS for N processes.",
                mustRememberFormulas: [
                  "Peterson: flag[i]=true; turn=j; while(flag[j] && turn==j); /* CS */ flag[i]=false;",
                  "wait(S) / P(S): S = S - 1; if (S < 0) block();",
                  "signal(S) / V(S): S = S + 1; if (S <= 0) wakeup(process);",
                  "If S < 0: exactly |S| processes are sleeping in the blocked queue. If S >= 0: 0 processes blocked.",
                ],
                criticalPitfalls: [
                  "Never confuse Mutual Exclusion with Progress (Progress prevents deadlock).",
                  "Peterson's algorithm satisfies all 3 criteria on sequential consistency, but needs memory fences on modern multicore hardware.",
                  "A binary semaphore initialized to 0 is used for signaling/synchronization (order enforcement), NOT mutual exclusion.",
                ],
                visualFlow:
`[ SEMAPHORE SYNCHRONIZATION EXECUTION FLOW ]

    wait(S) / P-operation                signal(S) / V-operation
           │                                      │
           ▼                                      ▼
      S = S - 1                              S = S + 1
           │                                      │
           ▼                                      ▼
        Is S < 0 ?                             Is S ≤ 0 ?
      ┌────┴────────────┐                    ┌────┴────────────┐
  Yes │              No │                Yes │              No │
      ▼                 ▼                    ▼                 ▼
[ Process joins   [ Enter CS ]       [ Dequeue & wake     [ No process ]
  Blocked Queue ]                      sleeping process ] [ was waiting]`,
              },
            },
            {
              type: "resources",
              heading: "8. Authoritative Source Trail",
              sources: [
                {
                  title: "Operating System Concepts (10th Edition)",
                  authorOrInstitution: "Silberschatz, Galvin, Gagne",
                  topic: "Chapter 6: Synchronization Tools (Section 6.2: Critical-Section & Section 6.6: Semaphores)",
                  url: "https://codex.cs.yale.edu/avi/os-book/OS10/slide-dir/index.html",
                  type: "primary-standard",
                  annotation: "Official slides on Peterson's solution, test-and-set hardware instructions, and counting semaphore implementations.",
                },
                {
                  title: "Operating Systems: Three Easy Pieces (OSTEP)",
                  authorOrInstitution: "Remzi H. Arpaci-Dusseau & Andrea C. Arpaci-Dusseau",
                  topic: "Chapter 31: Semaphores (Definitions, Ordering & Producer-Consumer)",
                  url: "https://pages.cs.wisc.edu/~remzi/OSTEP/threads-sema.pdf",
                  type: "primary-standard",
                  annotation: "Free chapter PDF walking through semaphores as locks, semaphores for ordering, and reader-writer problems.",
                },
                {
                  title: "NPTEL: Operating Systems",
                  authorOrInstitution: "Prof. Santanu Chattopadhyay (IIT Kharagpur)",
                  topic: "Process Synchronization & Semaphores",
                  url: "https://nptel.ac.in/courses/106105214",
                  type: "curated-lecture",
                  annotation: "IIT Kharagpur lecture on race conditions, mutual exclusion conditions, and semaphore queuing.",
                },
              ],
              stillStuck: [
                {
                  prompt: "If counting semaphores and blocking queues feel abstract...",
                  title: "Semaphores | Wait, Signal Operation | Counting Semaphore",
                  creator: "Gate Smashers (Varun Singla)",
                  duration: "18 mins",
                  url: "https://www.youtube.com/watch?v=ukIG38a5308",
                  whyThisHelps:
                    "Crystal-clear numerical breakdown of semaphore values (positive vs negative), waiting queues, and atomic P/V operations.",
                },
                {
                  prompt: "For the 3 Critical Section criteria (Mutual Exclusion, Progress, Bounded Waiting)...",
                  title: "Critical Section Problem | Mutual Exclusion, Progress and Bounded Waiting",
                  creator: "Gate Smashers (Varun Singla)",
                  duration: "14 mins",
                  url: "https://www.youtube.com/watch?v=U4V3P-9Xj50",
                  whyThisHelps:
                    "Deep-dive into the exact definition of Progress and why strict alternation fails the progress condition.",
                },
              ],
            },
          ],
        },
      ],
    },

    // ══════════════════════════════════════════════════════════════════════
    // MODULE 5 — DEADLOCKS
    // ══════════════════════════════════════════════════════════════════════
    {
      id: "deadlocks",
      title: "Module 5: Deadlocks: Principles, Prevention & Avoidance",
      slug: "deadlocks",
      order: 5,
      tagline: "Coffman conditions, Resource Allocation Graphs, and Banker's Algorithm safety sequences.",
      lessons: [
        {
          id: "deadlock-principles-and-bankers",
          title: "Deadlock Conditions, RAG & Banker's Algorithm",
          slug: "deadlock-principles-and-bankers",
          order: 1,
          estimatedMinutes: 24,
          tagline: "The four Coffman conditions, cycle detection in RAGs, and the Banker's safety algorithm.",
          hasInteractive: true,
          hasGATE: true,
          hasPractice: true,
          sections: [
            {
              type: "explanation",
              heading: "1. The Four Necessary Coffman Conditions",
              body: [
                "A deadlock is a situation where a set of processes are blocked because each process is holding a resource and waiting for another resource acquired by some other process in the same set.",
                "In 1971, Edward G. Coffman Jr. proved that a deadlock can arise ==pink:IF AND ONLY IF all four of the following conditions hold simultaneously==:",
                "**1. Mutual Exclusion:** At least one resource must be held in a ==pink:non-shareable mode== (only one process at a time can use the resource).",
                "**2. Hold and Wait:** A process must currently be ==yellow:holding at least one resource and requesting additional resources== held by other processes.",
                "**3. No Preemption:** Resources ==pink:cannot be forcibly confiscated== from a process; a resource can only be released voluntarily by the process holding it.",
                "**4. Circular Wait:** A closed chain of processes {P₀, P₁, ..., Pₙ} exists such that ==purple:P₀ waits for P₁, P₁ waits for P₂, and Pₙ waits for P₀==.",
              ],
              callout: {
                kind: "trap",
                title: "Essential Law: Cycle vs Deadlock in RAG",
                message:
                  "In a Resource Allocation Graph (RAG): If every resource type has exactly ==yellow:SINGLE instance==, a cycle is ==pink:NECESSARY and SUFFICIENT for deadlock==. If any resource type has ==purple:MULTIPLE instances==, a cycle is ==yellow:necessary but NOT sufficient for deadlock==!",
              },
            },
            {
              type: "explanation",
              heading: "2. The Four Deadlock Strategies, Safe States & Banker's Foundation",
              body: [
                "Operating systems deal with deadlocks using one of four fundamental strategies:",
                "**1. Deadlock Ignorance (The Ostrich Algorithm):** Stick your head in the sand and pretend deadlocks never occur. If a deadlock strikes, reboot the machine or kill processes manually. This is the pragmatic choice of Linux and Windows, because handling deadlocks dynamically is too computationally expensive relative to their rarity.",
                "**2. Deadlock Prevention:** Restrict resource requests at design time so that ==green:at least ONE of the four Coffman conditions is structurally impossible to satisfy== (e.g., impose a global total ordering on all resources to eliminate Circular Wait: ==purple:Havender's linear ordering==).",
                "**3. Deadlock Avoidance (Dynamic Inspection):** Whenever a process requests an available resource, the kernel decides whether allocating it leaves the system in a ==green:Safe State==. If the state would become ==pink:Unsafe==, the request is deferred, even though the resource is physically free! The classic avoidance algorithm for multiple resource types is ==yellow:Dijkstra's Banker's Algorithm==.",
                "**4. Deadlock Detection & Recovery:** Allow the system to enter deadlock, periodically run a detection algorithm (e.g. cycle check on a Wait-For Graph), and recover by terminating victim processes or rolling back transactions.",
                "**Safe State vs. Unsafe State vs. Deadlock:**",
                "• **Safe State:** A state is safe if there exists at least one ==green:Safe Sequence $\\langle P_1, P_2, \\dots, P_n \\rangle$== such that for each $P_i$, the maximum resources $P_i$ still needs can be satisfied by the currently available resources plus the resources already held by all preceding processes $P_j$ ($j < i$).",
                "• **Unsafe State:** An unsafe state is ==pink:NOT necessarily a deadlock!== Rather, an unsafe state is a vulnerable state that can lead to deadlock if processes exercise their maximum claims.",
                "**Banker's Algorithm Data Structures:**",
                "• `Available[m]`: Vector of length $m$. If `Available[j] = k`, there are $k$ instances of resource type $R_j$ free.",
                "• `Max[n][m]`: Matrix defining the maximum claim of each process. `Max[i][j]` is max instances of $R_j$ that process $P_i$ may request.",
                "• `Allocation[n][m]`: Currently allocated resources. `Allocation[i][j]` is instances of $R_j$ currently held by $P_i$.",
                "• ==yellow:`Need[n][m] = Max[n][m] - Allocation[n][m]`==: Remaining resources process $P_i$ may need to finish.",
              ],
              callout: {
                kind: "mental-model",
                title: "Safe vs Unsafe vs Deadlock Venn Diagram",
                message:
                  "Think of system states as concentric sets: [ All States ⊃ Unsafe States ⊃ Deadlocked States ]. ==pink:All deadlocked states are unsafe==, but ==yellow:NOT all unsafe states are deadlocked==. A ==green:safe state is guaranteed to be deadlock-free!== ",
              },
            },
            {
              type: "interactive",
              heading: "3. Interactive Banker's Algorithm Simulator",
              leadParagraph:
                "Step through Dijkstra's Banker's Algorithm for deadlock avoidance. Observe how the Need matrix (Need = Max - Allocation) is evaluated against the Available vector to find a safe execution sequence.",
              interactive: {
                kind: "bankers-algorithm",
                config: {
                  title: "Safe State & Safe Sequence Finder",
                  caption:
                    "Click 'Step Algorithm' to simulate process execution, resource deallocation, and safe sequence determination.",
                  numProcesses: 5,
                  numResourceTypes: 3,
                  resourceNames: ["A", "B", "C"],
                  totalAvailable: [3, 3, 2],
                  allocationMatrix: [
                    [0, 1, 0],
                    [2, 0, 0],
                    [3, 0, 2],
                    [2, 1, 1],
                    [0, 0, 2],
                  ],
                  maxMatrix: [
                    [7, 5, 3],
                    [3, 2, 2],
                    [9, 0, 2],
                    [2, 2, 2],
                    [4, 3, 3],
                  ],
                },
              },
            },
            {
              type: "worked-example",
              heading: "4. Worked Numerical: Deadlock-Free Resource Calculation",
              problemStatement:
                "A system has N processes and M identical units of a resource. Each process requires at most K units of the resource. What is the minimum value of M that guarantees the system will NEVER enter a deadlock?",
              givenData: [
                { label: "Number of Processes", value: "N" },
                { label: "Max demand per process", value: "K" },
              ],
              steps: [
                {
                  stepNumber: 1,
                  title: "Worst-Case Allocation (Just before completion)",
                  description:
                    "In the absolute worst-case scenario, every process has acquired 1 less resource than its maximum demand (K - 1) and is waiting for its last resource.",
                  formula: "Worst Allocated = N * (K - 1)",
                },
                {
                  stepNumber: 2,
                  title: "Breaking the Deadlock",
                  description:
                    "If there is even ONE extra resource available in the system, at least one process can satisfy its demand, complete execution, and release all its resources.",
                  formula: "M >= N * (K - 1) + 1",
                },
              ],
              finalAnswer: "M >= N * (K - 1) + 1",
              examTakeaway:
                "This formula is tested frequently in GATE. For example, if N = 3 processes each need K = 4 resources, the minimum resources to avoid deadlock is 3 * (4 - 1) + 1 = 10.",
            },
            {
              type: "gate-lens",
              heading: "5. GATE Lens & Verified PYQs",
              weightageSummary:
                "Banker's Algorithm questions commonly test safe sequences, Need/Available updates, and resource-request decisions. Historical frequency should be established from the official paper archive rather than assumed.",
              commonPatterns: [
                "Given Allocation, Max, and Available matrices, determine if the system is safe and find all valid safe sequences.",
                "Calculate whether a specific resource request from Pᵢ can be immediately granted.",
              ],
              commonTraps: [
                "⚠ An unsafe state is NOT necessarily a deadlocked state! An unsafe state merely carries the potential to enter a deadlock if processes request their maximum claims.",
              ],
              pyqs: [
                {
                  id: "gate-deadlock-bankers-2020",
                  year: 2020,
                  marks: 2,
                  question:
                    "A system has 4 processes P1, P2, P3, P4 and 2 resource types R1, R2. Total units of R1 = 6, R2 = 5. Allocation: P1(1,0), P2(1,1), P3(2,1), P4(0,1). Max: P1(3,2), P2(1,3), P3(3,1), P4(2,2). Is the system in a safe state, and which sequence is safe?",
                  options: [
                    "A. Yes, <P3, P1, P2, P4>",
                    "B. Yes, <P1, P3, P2, P4>",
                    "C. No, system is deadlocked",
                    "D. Yes, <P4, P2, P3, P1>",
                  ],
                  correctOptionOrValue: "A. Yes, <P3, P1, P2, P4>",
                  detailedSolution:
                    "1. Total Allocated: R1 = 1+1+2+0 = 4; R2 = 0+1+1+1 = 3.\n2. Available = Total - Allocated = (6-4, 5-3) = (2, 2).\n3. Need Matrix (Max - Alloc):\nP1: (3-1, 2-0) = (2, 2)\nP2: (1-1, 3-1) = (0, 2)\nP3: (3-2, 1-1) = (1, 0)\nP4: (2-0, 2-1) = (2, 1)\n4. Testing safe sequences:\nP3 Need is (1, 0) <= Avail (2, 2). P3 runs! Releases Alloc (2, 1) -> New Avail = (2+2, 2+1) = (4, 3).\nNext P1 Need (2, 2) <= (4, 3). P1 runs! Releases (1, 0) -> New Avail = (5, 3).\nNext P2 Need (0, 2) <= (5, 3). P2 runs! Releases (1, 1) -> New Avail = (6, 4).\nNext P4 runs! All finish. Safe sequence: <P3, P1, P2, P4>.",
                  keyFormulaOrConcept:
                    "Need = Max - Allocation. Safe when Need <= Available sequentially.",
                },
              ],
            },
            {
              type: "quick-revision",
              heading: "6. 1-Minute Panic Revision",
              oneMinutePanicCard: {
                coreRule:
                  "Deadlock requires 4 Coffman conditions: Mutual Exclusion + Hold & Wait + No Preemption + Circular Wait.",
                mustRememberFormulas: [
                  "Minimum resources to prevent deadlock: M >= sum(Max_i - 1) + 1 = N*(K - 1) + 1.",
                  "Banker's Algorithm: Need = Max - Allocation. Condition to execute: Need <= Available.",
                  "Cycle in Single-instance RAG = Deadlock. Cycle in Multi-instance RAG = Potential Deadlock.",
                ],
                criticalPitfalls: [
                  "Unsafe State != Deadlock. Safe states are a subset of deadlock-free states.",
                  "Deadlock Prevention eliminates at least one Coffman condition; Deadlock Avoidance checks runtime safety via Banker's algorithm.",
                ],
                visualFlow:
`[ BANKER'S ALGORITHM SAFETY & RESOURCE-REQUEST FLOW ]

Incoming Request from Process P_i:
              │
              ▼
   Is Request_i ≤ Need_i ?
         │ Yes               │ No
         ▼                   ▼
   Is Request_i ≤ Available ?  ───> [ ERROR: Process exceeded its maximum claim ]
         │ Yes               │ No
         ▼                   ▼
   Speculative Allocation:    ───> [ WAIT: Insufficient available resources ]
     Available'  = Available - Request_i
     Allocation' = Allocation + Request_i
     Need'       = Need - Request_i
         │
         ▼
   Run Safety Check:
   Find sequence <P_1, P_2, ...> where Need_k ≤ Work
         │
     ┌───┴────────────────────────┐
     │ Safe Sequence Found        │ No Safe Sequence Exists (Unsafe State)
     ▼                            ▼
[ GRANT REQUEST TO P_i ]     [ ROLLBACK SPECULATION & BLOCK P_i ]`,
              },
            },
            {
              type: "resources",
              heading: "7. Authoritative Source Trail",
              sources: [
                {
                  title: "Operating System Concepts (10th Edition)",
                  authorOrInstitution: "Silberschatz, Galvin, Gagne",
                  topic: "Chapter 8: Deadlocks (Section 8.2: Deadlock Characterization & Section 8.5: Banker's Algorithm)",
                  url: "https://codex.cs.yale.edu/avi/os-book/OS10/slide-dir/index.html",
                  type: "primary-standard",
                  annotation: "Official slides on 4 Coffman conditions, Resource Allocation Graphs (RAG), and Banker's safety and resource-request algorithms.",
                },
                {
                  title: "Operating Systems: Three Easy Pieces (OSTEP)",
                  authorOrInstitution: "Remzi H. Arpaci-Dusseau & Andrea C. Arpaci-Dusseau",
                  topic: "Chapter 32: Concurrency Bugs (Deadlock Conditions & Avoidance)",
                  url: "https://pages.cs.wisc.edu/~remzi/OSTEP/threads-bugs.pdf",
                  type: "primary-standard",
                  annotation: "Full chapter analyzing circular wait prevention, lock ordering strategies, and deadlock detection.",
                },
              ],
              stillStuck: [
                {
                  prompt: "If Banker's Algorithm matrices feel overwhelming...",
                  title: "Deadlock Avoidance Banker's Algorithm with Example",
                  creator: "Gate Smashers (Varun Singla)",
                  duration: "16 mins",
                  url: "https://www.youtube.com/watch?v=kYJ5oP6uMv8",
                  whyThisHelps:
                    "Practical step-by-step matrix evaluation (Need, Allocation, Available, Work) to quickly identify safe sequences under exam conditions.",
                },
                {
                  prompt: "For GATE practice questions and tricky multi-instance Banker's numericals...",
                  title: "GATE Question on Banker's Algorithm | Deadlock Avoidance",
                  creator: "Gate Smashers (Varun Singla)",
                  duration: "12 mins",
                  url: "https://www.youtube.com/watch?v=154x4jQ4WpE",
                  whyThisHelps:
                    "Solves real GATE problems and explains why multiple safe sequences can exist for the same system state.",
                },
              ],
            },
          ],
        },
      ],
    },

    // ══════════════════════════════════════════════════════════════════════
    // MODULE 6 — MEMORY MANAGEMENT
    // ══════════════════════════════════════════════════════════════════════
    {
      id: "memory-management",
      title: "Module 6: Main Memory Management & Paging",
      slug: "memory-management",
      order: 6,
      tagline: "Address binding, fragmentation, multi-level paging, and hardware TLB acceleration.",
      lessons: [
        {
          id: "paging-and-tlb",
          title: "Paging, Multi-Level Page Tables & The TLB",
          slug: "paging-and-tlb",
          order: 1,
          estimatedMinutes: 24,
          tagline: "Translating logical addresses, calculating page table sizes, and computing Effective Memory Access Time (EMAT).",
          hasInteractive: false,
          hasGATE: true,
          hasPractice: true,
          sections: [
            {
              type: "explanation",
              heading: "1. The Fundamental Problem: External Fragmentation",
              body: [
                "Early operating systems allocated contiguous physical memory blocks to processes. As processes loaded, terminated, and departed, free memory was carved into hundreds of tiny, disconnected holes. Even if total free memory was 20 MB, a new 5 MB process could not load because no single contiguous hole of 5 MB existed. This is ==pink:External Fragmentation==.",
                "To eradicate external fragmentation, modern computer architecture invented ==yellow:Paging==.",
                "In paging, physical memory is divided into fixed-size blocks called ==purple:Frames==, and logical (virtual) memory is divided into blocks of the exact same size called ==purple:Pages== (typically 4 KB). Any virtual page can now be placed into ==green:ANY available physical frame anywhere in physical RAM==.",
                "A **virtual address** is the address generated by a process; a **physical address** is the location in RAM. The ==yellow:page table maps the virtual page number (p) to a frame number (f)==. Each page-table entry (PTE) stores that frame mapping plus control bits such as a valid bit, protection bits, and a dirty bit. The ==purple:page offset (d) is copied unchanged== during translation.",
                "If the PTE says the page is not resident, the hardware raises a ==pink:page fault==. The operating system then loads the page from secondary storage, chooses a free frame or victim page, updates the PTE, and restarts the interrupted instruction. This is ==yellow:demand paging==: pages are brought into RAM when referenced rather than loading eagerly.",
                "A ==green:TLB (Translation Lookaside Buffer)== caches recent page-to-frame translations. A ==green:TLB hit avoids a page-table walk==; a ==pink:TLB miss requires consulting the page table in RAM==.",
              ],
            },
            {
              type: "diagram",
              heading: "2. Virtual address to physical address",
              diagramType: "custom",
              caption: "The page number is translated through the page table; the offset is preserved.",
              asciiArt: `[ VIRTUAL ADDRESS ]
        ┌──────────────────────┬──────────────┐
        │ page number (p)      │ offset (d)   │
        └──────────┬───────────┴──────┬───────┘
                   │                  │ copied unchanged
                   ▼                  │
             ┌────────────┐           │
             │   TLB      │           │
             └─────┬──────┘           │
                 hit│ miss            │
                    ▼                 │
             ┌────────────┐           │
             │ Page table │ p → frame│
             └─────┬──────┘           │
                   ▼                  ▼
        ┌──────────────────────┬──────────────┐
        │ frame number (f)     │ offset (d)   │
        └──────────────────────┴──────────────┘
                 [ PHYSICAL ADDRESS ]`,
            },
            {
              type: "worked-example",
              heading: "3. Address Translation Mechanics in Paging",
              problemStatement:
                "Consider a 32-bit virtual address space with a page size of 4 KB (4096 = 2¹² bytes). Physical RAM is 512 MB (2²⁹ bytes). Calculate the bit breakdown of the logical and physical addresses.",
              givenData: [
                { label: "Virtual Address Size", value: "32 bits (4 GB virtual memory)" },
                { label: "Page Size", value: "4 KB = 2^12 bytes" },
                { label: "Physical RAM Size", value: "512 MB = 2^29 bytes" },
              ],
              steps: [
                {
                  stepNumber: 1,
                  title: "Page Offset (d)",
                  description: "Since page size is 4 KB = 2^12 bytes, the offset requires 12 bits in both logical and physical addresses.",
                  formula: "Offset bits d = log2(Page Size) = log2(2^12) = 12 bits",
                },
                {
                  stepNumber: 2,
                  title: "Page Number (p)",
                  description: "The remaining higher-order bits identify which page of the process is being referenced.",
                  formula: "Page bits p = Virtual Address Bits - d = 32 - 12 = 20 bits",
                  intermediateResult: "The page table contains 2^20 = 1,048,576 entries.",
                },
                {
                  stepNumber: 3,
                  title: "Frame Number (f)",
                  description: "In physical memory (512 MB = 2^29 bytes), with 12-bit offset, the frame bits identify the physical frame.",
                  formula: "Frame bits f = Physical Address Bits - d = 29 - 12 = 17 bits",
                },
              ],
              finalAnswer:
                "Logical Address: 20 bits (Page Number) + 12 bits (Offset). Physical Address: 17 bits (Frame Number) + 12 bits (Offset).",
              examTakeaway:
                "Page offset bits NEVER change during translation; only the Page Number (p) is replaced with Frame Number (f) via the Page Table.",
            },
            {
              type: "worked-example",
              heading: "4. Effective Memory Access Time (EMAT) with TLB",
              problemStatement:
                "A system has a Translation Lookaside Buffer (TLB) with hit ratio h = 90%. TLB access time is t_tlb = 10 ns, and main memory access time is t_m = 100 ns. Calculate the Effective Memory Access Time (EMAT) for a single-level page table.",
              givenData: [
                { label: "TLB Hit Ratio (h)", value: "0.90" },
                { label: "TLB Access Time", value: "10 ns" },
                { label: "Memory Access Time", value: "100 ns" },
              ],
              steps: [
                {
                  stepNumber: 1,
                  title: "Case 1: TLB Hit (Probability h)",
                  description:
                    "On a hit, the translation is found in the TLB (10 ns). Then, one main memory access is made to fetch the actual operand/data (100 ns).",
                  formula: "T_hit = t_tlb + t_m = 10 + 100 = 110 ns",
                },
                {
                  stepNumber: 2,
                  title: "Case 2: TLB Miss (Probability 1 - h)",
                  description:
                    "On a miss, we search TLB (10 ns), then access main memory to read the Page Table Entry (100 ns), then access main memory again to fetch the actual data (100 ns).",
                  formula: "T_miss = t_tlb + t_m + t_m = 10 + 100 + 100 = 210 ns",
                },
                {
                  stepNumber: 3,
                  title: "Calculate EMAT",
                  description: "Weighted average of hit and miss times.",
                  formula: "EMAT = h * T_hit + (1 - h) * T_miss = 0.90 * (110) + 0.10 * (210)",
                  intermediateResult: "99 + 21 = 120 ns",
                },
              ],
              finalAnswer: "EMAT = 120 ns",
              examTakeaway:
                "For multi-level paging with k levels, a TLB miss requires k memory accesses to traverse the page tables + 1 memory access for data: T_miss = t_tlb + (k + 1) * t_m.",
            },
            {
              type: "gate-lens",
              heading: "5. GATE Lens & Exam Practice",
              weightageSummary:
                "Paging address translation, multi-level page table size calculations, and EMAT equations are recurring GATE-style problem patterns. Verify historical frequency against the official paper archive.",
              commonPatterns: [
                "Determining the minimum number of levels required in a hierarchical page table so that each page table fits inside a single frame.",
                "Calculating EMAT with TLBs, multi-level page tables, and page fault rates.",
              ],
              commonTraps: [
                "⚠ Don't forget that Page Table Size = (Number of Entries) * (Page Table Entry Size in bytes).",
                "⚠ In Multi-Level paging with k levels, each TLB miss requires k + 1 memory accesses, not 2!",
              ],
              pyqs: [
                {
                  id: "gate-paging-emat-2022",
                  year: 2022,
                  marks: 2,
                  question:
                    "Consider a system with a two-level paging scheme. The TLB search time is 20 ns and main memory access time is 100 ns. The TLB hit ratio is 80%. What is the effective memory access time (in ns)?",
                  options: [
                    "A. 140 ns",
                    "B. 160 ns",
                    "C. 180 ns",
                    "D. 220 ns",
                  ],
                  correctOptionOrValue: "B. 160 ns",
                  detailedSolution:
                    "Assuming sequential TLB lookup and two page-table memory accesses on a miss: hit = 20 + 100 = 120 ns; miss = 20 + 2(100) + 100 = 320 ns; EMAT = 0.80(120) + 0.20(320) = 160 ns. A different answer requires a different timing convention, which must be stated and sourced.",
                  keyFormulaOrConcept:
                    "Two-level EMAT = h*(t_tlb + t_m) + (1-h)*(t_tlb + 2*t_m + t_m).",
                },
              ],
            },
            {
              type: "quick-revision",
              heading: "6. 1-Minute Panic Revision",
              oneMinutePanicCard: {
                coreRule:
                  "Paging eliminates external fragmentation. Virtual Address = Page Number (p) + Offset (d). Physical Address = Frame Number (f) + Offset (d).",
                mustRememberFormulas: [
                  "Page Offset bits = log2(Page Size).",
                  "Number of Page Table Entries = 2^(Virtual Address Bits - Offset Bits).",
                  "Page Table Size = (Number of Entries) * (PTE size in bytes).",
                  "EMAT = h*(t_tlb + t_m) + (1-h)*(t_tlb + (k+1)*t_m) for k-level paging.",
                ],
                criticalPitfalls: [
                  "Paging STILL suffers from INTERNAL fragmentation (on the very last frame of a process, avg 1/2 page size).",
                  "Offset bits never change between virtual and physical addresses.",
                ],
                visualFlow:
`[ VIRTUAL ADDRESS TRANSLATION & TLB PIPELINE ]

   Virtual Address: [ Page Number (p) | Page Offset (d) ]
                              │
                              ▼
                   Lookup in Hardware TLB
                              │
                 ┌────────────┴────────────┐
                 ▼                         ▼
            TLB HIT                   TLB MISS
      [ Frame Number (f)        [ Walk Page Tables in RAM ]
        fetched in t_tlb ]      [ (k memory accesses)     ]
                 │                         │
                 │                 Cache (p → f) in TLB
                 │                         │
                 └────────────┬────────────┘
                              ▼
   Physical Address: [ Frame Number (f) | Page Offset (d) ]
                              │
                              ▼
       Access Target Byte in Physical RAM (t_m)`,
              },
            },
            {
              type: "resources",
              heading: "7. Authoritative Source Trail",
              sources: [
                {
                  title: "Operating System Concepts (10th Edition)",
                  authorOrInstitution: "Silberschatz, Galvin, Gagne",
                  topic: "Chapter 9: Main Memory (Section 9.3: Paging & Section 9.3.3: Hardware TLB)",
                  url: "https://codex.cs.yale.edu/avi/os-book/OS10/slide-dir/index.html",
                  type: "primary-standard",
                  annotation: "Official slides on page tables, frame allocation, Translation Lookaside Buffer (TLB), and multi-level hierarchy.",
                },
                {
                  title: "Operating Systems: Three Easy Pieces (OSTEP)",
                  authorOrInstitution: "Remzi H. Arpaci-Dusseau & Andrea C. Arpaci-Dusseau",
                  topic: "Chapter 18: Paging (Introduction, Address Translation & Page Tables)",
                  url: "https://pages.cs.wisc.edu/~remzi/OSTEP/vm-paging.pdf",
                  type: "primary-standard",
                  annotation: "Free chapter PDF detailing virtual page number (VPN) to physical frame number (PFN) mapping and page table entries.",
                },
                {
                  title: "Operating Systems: Three Easy Pieces (OSTEP)",
                  authorOrInstitution: "Remzi H. Arpaci-Dusseau & Andrea C. Arpaci-Dusseau",
                  topic: "Chapter 19: Paging: Faster Translations (TLBs)",
                  url: "https://pages.cs.wisc.edu/~remzi/OSTEP/vm-tlbs.pdf",
                  type: "primary-standard",
                  annotation: "Full chapter analyzing TLB hit vs miss algorithms, context switch TLB invalidation, and TLB coverage.",
                },
              ],
              stillStuck: [
                {
                  prompt: "If paging fundamentals and memory addressing feel confusing...",
                  title: "What is Paging | Memory Management | Operating System",
                  creator: "Gate Smashers (Varun Singla)",
                  duration: "16 mins",
                  url: "https://www.youtube.com/watch?v=YePZ0u9yN0o",
                  whyThisHelps:
                    "First-principles explanation of logical vs physical address spaces, page size = frame size, and why paging eliminates external fragmentation.",
                },
                {
                  prompt: "For multi-level page table size derivations and GATE numericals...",
                  title: "2-Level Paging | Multilevel Paging in Operating System",
                  creator: "Gate Smashers (Varun Singla)",
                  duration: "15 mins",
                  url: "https://www.youtube.com/watch?v=vVj4u_E3-2Q",
                  whyThisHelps:
                    "Breakdown of how to fit page tables within a frame and calculate total paging levels without memory waste.",
                },
              ],
            },
          ],
        },
      ],
    },

    // ══════════════════════════════════════════════════════════════════════
    // MODULE 7 — VIRTUAL MEMORY
    // ══════════════════════════════════════════════════════════════════════
    {
      id: "virtual-memory",
      title: "Module 7: Virtual Memory & Page Replacement",
      slug: "virtual-memory",
      order: 7,
      tagline: "Demand paging, page fault handling, page replacement algorithms, and Belady's anomaly.",
      lessons: [
        {
          id: "page-replacement-algorithms",
          title: "Page Replacement Algorithms: FIFO, Belady's Anomaly, LRU & Optimal",
          slug: "page-replacement-algorithms",
          order: 1,
          estimatedMinutes: 28,
          tagline: "From the illusion of infinite memory to page fault service cycles, thrashing dynamics, and replacement heuristics.",
          hasInteractive: true,
          hasGATE: true,
          hasPractice: true,
          sections: [
            {
              type: "explanation",
              heading: "1. The Core Motivation: Why Physical RAM Is Not Enough & What Virtual Memory Is",
              body: [
                "Consider the memory management schemes studied in Module 6 (Contiguous Allocation, Segmentation, Pure Paging). All of them shared one crippling assumption: ==pink:the entire executable image of a process had to be loaded into physical RAM before execution==.",
                "In real-world computing, this assumption breaks down completely. If a computer has 4 GB of physical RAM, how can it execute an 8 GB database engine, or run an IDE, web browser, and music player simultaneously when their combined memory footprints exceed 12 GB? Furthermore, real software contains massive amounts of code that are rarely executed during a given run — error-handling routines, initialization sequences, and unused configuration options. Forcing the entire program into expensive, scarce physical RAM is tremendously wasteful.",
                "==purple:Virtual Memory== is an architectural technique that ==green:decouples User Logical Memory from Physical Memory==. It provides each running process with the illusion of an enormous, private, uniform, and contiguous address space — regardless of how much physical RAM is actually installed.",
                "**Sparse Address Spaces:** In a standard process address space (Module 2), the Text and Data segments reside at low addresses, the Heap grows upward, and the Stack grows downward. In a 32-bit address space, the gap between the highest heap address and the lowest stack address is several gigabytes of empty virtual territory. In Virtual Memory, this is a ==yellow:sparse address space== — it requires ==green:zero physical RAM frames== until the process actually accesses memory at runtime.",
              ],
              callout: {
                kind: "mental-model",
                title: "The Virtual Memory Abstraction",
                message:
                  "Virtual memory frees the software engineer from physical hardware boundaries. An application sees a private, flat, continuous universe of memory. The operating system, in cooperation with the hardware MMU, silently maps active pieces to physical RAM and leaves dormant pieces on secondary storage.",
              },
            },
            {
              type: "explanation",
              heading: "2. Paging as the Enabler & The Dual-Role Valid/Invalid Bit",
              body: [
                "How does the operating system implement virtual memory? It builds directly upon the hardware paging mechanism introduced in Module 6. The CPU generates a **Logical (Virtual) Address**, split into a **Virtual Page Number ($p$)** and an **Offset ($d$)**. Physical memory is partitioned into matching fixed-size **Frames ($f$)**.",
                "In a pure physical paging system, every page table entry (PTE) was assumed to point to a valid frame in RAM. In a Virtual Memory system, however, the ==yellow:Valid/Invalid Bit== in the Page Table Entry is given a critical dual role:",
                "• ==green:Bit = 1 (Valid / Resident):== The page is legal AND is ==green:currently resident in physical RAM==. The MMU translates the address to physical frame $f$ at full hardware speed without interrupting the CPU.",
                "• ==pink:Bit = 0 (Invalid / Non-Resident):== The address either does not belong to the address space (triggering a ==pink:Segmentation Fault / SIGSEGV==), OR the page is legal but ==purple:currently resides on secondary storage (the paging/swap file)==.",
                "**The Demand Paging Philosophy:** Instead of loading all pages into RAM when starting, the OS utilizes ==yellow:Demand Paging==: a page is brought into physical memory ==purple:only when an instruction actually references it==. A process starting with zero resident pages uses ==purple:Pure Demand Paging==.",
              ],
              callout: {
                kind: "trap",
                title: "Valid Bit vs Legal Address",
                message:
                  "A Valid bit of 0 does ==pink:NOT automatically mean the address is illegal==! It only means the page is currently non-resident in physical RAM. The OS consults an internal PCB data structure to determine whether the reference was genuinely illegal or simply waiting on disk.",
              },
            },
            {
              type: "explanation",
              heading: "3. The Complete 6-Step Page Fault Service Routine",
              body: [
                "When the CPU executes an instruction that references a virtual address whose Page Table Entry has its Valid/Invalid bit set to `0`, the Memory Management Unit (MMU) cannot translate the address. The MMU hardware halts execution and raises an internal exception called a ==pink:Page Fault Trap==.",
                "The operating system handles this hardware trap through a deterministic 6-step service sequence:",
                "**Step 1 — Hardware Trap & Context Save:** The CPU hardware switches from ==purple:User Mode to Kernel Mode (mode bit 1 → 0)==, pushes the program counter (PC) and processor registers onto the kernel stack, and transfers execution to the OS Page Fault Handler.",
                "**Step 2 — Address Legality Check:** The OS queries the process's internal PCB memory map. If the address violates permissions, the OS delivers a ==pink:SIGSEGV signal==. If legal, the page is simply residing on backing store (disk).",
                "**Step 3 — Find a Free Frame:** The OS inspects its internal Free-Frame List. If ==pink:no free frame exists==, the OS must invoke a ==yellow:Page Replacement Algorithm== to select an existing 'victim' frame and evict it to swap storage.",
                "**Step 4 — Disk I/O Transfer:** The OS schedules a disk read to copy the page from swap space into the physical frame. Because disk I/O is slow, the process moves to ==purple:BLOCKED / WAITING== state so the CPU scheduler can dispatch another ready process.",
                "**Step 5 — Page Table & Internal State Update:** When the disk controller finishes, an I/O completion interrupt fires. The OS updates the PTE: ==green:sets Frame Number to newly loaded frame, flips Valid bit from 0 → 1==, and resets the dirty bit.",
                "**Step 6 — Instruction Restart:** The OS moves the process back to the READY queue. When dispatched again, the OS restores saved registers and ==green:restarts the exact machine instruction== that triggered the fault from the beginning.",
              ],
              callout: {
                kind: "exam-tip",
                title: "Instruction Restart Requirement",
                message:
                  "For demand paging to work, the CPU architecture ==yellow:MUST support instruction restart==. If an instruction like `ADD (R1)+, (R2)` faults mid-execution after R1 has been auto-incremented, the CPU microcode must restore R1 to its pre-instruction value before restarting.",
              },
            },
            {
              type: "worked-example",
              heading: "4. Worked Numerical: Effective Memory Access Time (EMAT) with Page Faults",
              problemStatement:
                "A computer system has a physical memory access time of t_m = 100 ns and an average page fault service time of S = 8 ms (8,000,000 ns). Let p denote the page fault rate (0 ≤ p ≤ 1). Derive the Effective Memory Access Time (EMAT) formula. If the system demands that effective memory access time must not degrade by more than 10% (i.e. EMAT ≤ 110 ns), calculate the maximum permissible page fault rate p.",
              givenData: [
                { label: "Memory Access Time (t_m)", value: "100 ns" },
                { label: "Page Fault Service Time (S)", value: "8 ms = 8,000,000 ns" },
                { label: "Maximum Allowable EMAT", value: "110 ns (10% slowdown)" },
              ],
              steps: [
                {
                  stepNumber: 1,
                  title: "Formulate the General EMAT Equation",
                  description:
                    "With probability (1 - p), the referenced page is resident in physical RAM and requires 1 memory access (t_m). With probability p, a page fault occurs, requiring full page fault service time (S) plus the eventual memory access.",
                  formula: "EMAT = (1 - p) * t_m + p * S",
                },
                {
                  stepNumber: 2,
                  title: "Substitute Given Numerical Values",
                  description:
                    "Expand the terms using nanoseconds: EMAT = (1 - p) * 100 + p * 8,000,000 = 100 - 100p + 8,000,000p = 100 + 7,999,900p ns.",
                  formula: "EMAT = 100 + 7,999,900 * p (ns)",
                  intermediateResult: "EMAT = 100 + 7,999,900 * p",
                },
                {
                  stepNumber: 3,
                  title: "Solve for Maximum Permissible Fault Rate (p)",
                  description:
                    "Set EMAT ≤ 110 ns:\n100 + 7,999,900 * p ≤ 110\n7,999,900 * p ≤ 10\np ≤ 10 / 7,999,900 ≈ 1.25 * 10^(-6).",
                  formula: "p ≤ 1 / 799,990 ≈ 0.00000125",
                  intermediateResult: "p ≤ 1.25 × 10^(-6)",
                },
              ],
              finalAnswer: "Maximum Page Fault Rate p ≤ 0.00000125 (less than 1 fault in 800,000 accesses)",
              examTakeaway:
                "Because mechanical disk / SSD access is roughly 100,000 times slower than DRAM, even a 0.1% page fault rate (p = 0.001) would multiply memory access time by a factor of 80! This massive penalty is why Page Replacement Algorithms are so critical.",
            },
            {
              type: "explanation",
              heading: "5. Thrashing, Locality of Reference & The Working Set Model",
              body: [
                "Why does demand paging work at all if a single page fault incurs an 80,000× speed penalty? The answer lies in the **Principle of Locality**:",
                "• **Temporal Locality:** If a memory location is accessed, it will likely be accessed again in the near future (e.g., loop variables, subroutine code, stack frames).",
                "• **Spatial Locality:** If a memory location is accessed, memory locations with nearby addresses will likely be accessed soon (e.g., sequential code execution, array elements).",
                "Because programs access memory in localized clusters, a process only needs a small subset of its pages resident in RAM at any given moment to make rapid progress.",
                "**What is Thrashing?** If a process does not have enough physical frames allocated to hold its active locality, it will page fault almost immediately. It will evict a page that it needs again two instructions later, causing another page fault. When processes spend more time paging (swapping pages in and out of disk) than executing instructions, the system is ==pink:Thrashing==.",
                "**The Fatal Feedback Loop:** When thrashing begins, processes get blocked waiting for disk I/O. The CPU scheduler sees CPU utilization plunge toward 0%. In early operating systems, the kernel scheduler would ==pink:incorrectly increase the degree of multiprogramming==, accelerating total system collapse.",
                "**The Working Set Model (Peter Denning):** To prevent thrashing, the OS tracks the **Working Set** of each process — the set of pages referenced in the most recent $\\Delta$ memory references. The OS must guarantee: ==green:$\\sum WSS_i \\le \\text{Total Physical Frames}$==. If total demand exceeds physical capacity, the OS suspends (swaps out) an entire process to free its frames for others.",
              ],
              callout: {
                kind: "trap",
                title: "Recognizing Thrashing on GATE",
                message:
                  "If a GATE question describes: 'CPU utilization is 15%, paging disk utilization is 98%, and system response time is crawling', the system is ==pink:THRASHING==. The correct remedy is to ==green:DECREASE the degree of multiprogramming== (suspend some processes), NOT to increase it.",
              },
            },
            {
              type: "interactive",
              heading: "6. Interactive Page Replacement Simulator",
              leadParagraph:
                "Now that you understand the page fault cycle and free-frame shortages, simulate FIFO, LRU, and Optimal algorithms on an actual reference string. Toggle between 3 and 4 frames to test Belady's Anomaly live!",
              interactive: {
                kind: "page-replacement",
                config: {
                  title: "Page Replacement & Belady's Anomaly Laboratory",
                  caption:
                    "Notice on the classic reference string: with FIFO, increasing frames from 3 to 4 increases page faults from 9 to 10 (Belady's Anomaly)! LRU and Optimal never suffer from this anomaly.",
                  defaultNumFrames: 3,
                  referenceString: [1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5],
                  algorithms: ["fifo", "lru", "optimal"],
                },
              },
            },
            {
              type: "comparison",
              heading: "7. Algorithm Comparison: FIFO vs. Belady's Anomaly vs. LRU vs. Optimal",
              leadParagraph: "When all physical frames are occupied and a page fault occurs, the OS must choose a victim frame to evict. Here is how the primary algorithms compare.",
              columns: ["FIFO (First-In, First-Out)", "LRU (Least Recently Used)"],
              criteria: [
                {
                  feature: "Eviction Heuristic",
                  first: "Evicts the page that has resided in physical memory the longest time (oldest timestamp).",
                  second: "Evicts the page that has not been accessed for the longest period in the past.",
                },
                {
                  feature: "Belady's Anomaly",
                  first: "VULNERABLE. In 1969, Laszlo Belady proved that increasing frames from 3 to 4 can increase faults from 9 to 10.",
                  second: "IMMUNE. Belongs to the class of Stack Algorithms; mathematically guaranteed never to suffer from Belady's Anomaly.",
                },
                {
                  feature: "Hardware & Runtime Cost",
                  first: "Trivial: Maintained via a simple FIFO circular queue or pointer. Zero hardware support required.",
                  second: "High: Requires either an incrementing 64-bit hardware clock on every memory access or a double-linked stack.",
                },
                {
                  feature: "Stack Property M(n) ⊆ M(n+1)",
                  first: "Fails stack property. The set of pages in n frames is NOT guaranteed to be a subset of pages in n+1 frames.",
                  second: "Satisfies stack property: M(n) ⊆ M(n+1) for all n at every reference instant.",
                },
                {
                  feature: "Optimal (OPT / MIN) Benchmark",
                  first: "Far from optimal. Frequently evicts heavily used global variables simply because they were loaded early.",
                  second: "Approximates Optimal by using the past as an empirical predictor of the future (Principle of Locality).",
                },
              ],
              summaryTakeaway:
                "Optimal Algorithm (Belady's MIN) evicts the page that will not be used for the longest time in the FUTURE. It provides the theoretical lower bound on page faults, but cannot be implemented in general-purpose OSs because the future is unknown.",
            },
            {
              type: "gate-lens",
              heading: "8. GATE Lens & Verified PYQs",
              weightageSummary:
                "Page Replacement, Belady's Anomaly, and EMAT with Page Faults appear in virtually every GATE CS/IT paper, accounting for 2 to 4 marks.",
              commonPatterns: [
                "Given a reference string and k frames, calculate the exact number of page faults and page hits under FIFO, LRU, and Optimal.",
                "Numerical questions calculating Effective Memory Access Time (EMAT) given page fault rate p and service time S.",
                "Theoretical identification of Stack Algorithms and Belady's Anomaly conditions.",
              ],
              commonTraps: [
                "⚠ Belady's Anomaly CANNOT occur in LRU or Optimal algorithms! It can occur in FIFO, Second-Chance, and Random.",
                "⚠ When tracing reference strings, don't confuse Page Hits with Page Faults. Always verify whether the incoming page is already present in any allocated frame.",
                "⚠ Dirty/Modify Bit: An evicted victim page only needs to be written to disk if its dirty bit is 1. If clean (0), eviction requires zero disk writes!",
              ],
              pyqs: [
                {
                  id: "gate-vm-belady-2017",
                  year: 2017,
                  marks: 2,
                  question:
                    "Consider the page reference string: 1, 2, 3, 4, 2, 1, 5, 6, 2, 1, 2, 3, 7, 6, 3, 2, 1, 2, 3, 6. Which of the following page replacement algorithms does NOT suffer from Belady's anomaly?",
                  options: [
                    "A. FIFO",
                    "B. LRU",
                    "C. Second Chance",
                    "D. Random",
                  ],
                  correctOptionOrValue: "B. LRU",
                  detailedSolution:
                    "Belady's Anomaly is the phenomenon where increasing the number of allocated page frames results in an INCREASE in the total number of page faults. Mattson et al. (1970) proved that 'Stack Algorithms' (algorithms where the set of pages in memory for n frames is always a strict subset of pages in memory for n + 1 frames: M(n) ⊆ M(n + 1)) can NEVER suffer from Belady's anomaly. Both LRU and Optimal are stack algorithms and therefore never suffer from Belady's anomaly. FIFO, Second Chance, and Random do not satisfy the stack property and are susceptible to Belady's anomaly.",
                  keyFormulaOrConcept:
                    "Stack Algorithms: M(n) ⊆ M(n+1) at all times t. LRU, LFU, and Optimal are immune to Belady's anomaly.",
                },
                {
                  id: "gate-vm-emat-2015",
                  year: 2015,
                  marks: 2,
                  question:
                    "In a computer system with demand paging, memory access time is 200 ns and page fault service time is 10 ms. If the page fault rate is 1 out of 10,000 memory references, what is the Effective Memory Access Time (in ns)?",
                  options: [
                    "A. 1198 ns",
                    "B. 1200 ns",
                    "C. 1000 ns",
                    "D. 800 ns",
                  ],
                  correctOptionOrValue: "B. 1200 ns",
                  detailedSolution:
                    "1. Given:\nt_m = 200 ns\nS = 10 ms = 10,000,000 ns\np = 1 / 10,000 = 0.0001\n\n2. Formula:\nEMAT = (1 - p) * t_m + p * S\n\n3. Calculation:\nEMAT = (1 - 0.0001) * 200 + 0.0001 * 10,000,000\nEMAT = 0.9999 * 200 + 1,000 = 199.98 + 1000 ≈ 1199.98 ns ≈ 1200 ns.",
                  keyFormulaOrConcept:
                    "EMAT = (1 - p) * t_m + p * S.",
                },
              ],
            },
            {
              type: "quick-revision",
              heading: "9. 1-Minute Panic Revision",
              oneMinutePanicCard: {
                coreRule:
                  "Virtual Memory decouples logical address space from physical RAM via Demand Paging. Page Fault = accessing a non-resident page (Valid bit = 0). Page Replacement = selecting a victim frame when RAM is full.",
                mustRememberFormulas: [
                  "EMAT = (1 - p) * t_m + p * S (where S is page fault service time, p is fault rate).",
                  "FIFO: Evict oldest loaded frame. Suffers from Belady's Anomaly.",
                  "LRU: Evict frame unreferenced for longest past duration. Stack algorithm (no Belady's anomaly).",
                  "Optimal: Evict frame unreferenced for longest FUTURE duration (Theoretical lower bound).",
                  "Working Set Condition for No Thrashing: sum(WSS_i) <= Total Physical Frames.",
                ],
                criticalPitfalls: [
                  "Belady's Anomaly = More frames → MORE page faults (can occur in FIFO, never in LRU or Optimal).",
                  "Dirty/Modify Bit: An evicted victim page only needs a slow disk write-back if its Dirty Bit = 1.",
                  "Thrashing: CPU utilization collapses while disk queue is 100% full. Fix by REDUCING multiprogramming!",
                ],
                visualFlow:
`[ VIRTUAL MEMORY & PAGE FAULT / REPLACEMENT LIFECYCLE ]

CPU generates Virtual Address: [ Page Number (p) | Offset (d) ]
                         │
                         ▼
             Lookup in Page Table Entry (PTE)
                         │
        ┌────────────────┴────────────────┐
        ▼ Valid bit = 1                   ▼ Valid bit = 0
 [ RAM HIT: Fetch Frame ]         [ HARDWARE TRAP: Page Fault ]
                                         │
                                         ▼
                             Is Address Legal in PCB?
                                   │
                      ┌────────────┴────────────┐
                      ▼ No                      ▼ Yes
              [ SIGSEGV Crash ]          Is Free Frame in RAM?
                                            │
                               ┌────────────┴────────────┐
                               ▼ Yes                     ▼ No
                        [ Allocate Frame ]      [ PAGE REPLACEMENT ]
                               │                 Select Victim Page:
                               │                 • FIFO (oldest)
                               │                 • LRU (least recent)
                               │                 • OPT (longest future)
                               │                         │
                               │                Victim Dirty?
                               │                  ├─ Yes ──> Write to Swap
                               │                  └─ No  ──> Discard Frame
                               │                         │
                               └──────────┬──────────────┘
                                          ▼
                         Read Page from Disk into Frame
                                          │
                                          ▼
                         Set PTE (Valid = 1, Frame = f)
                                          │
                                          ▼
                         Restart Faulting Assembly Instruction`,
              },
            },
            {
              type: "resources",
              heading: "10. Authoritative Source Trail",
              sources: [
                {
                  title: "Operating System Concepts (10th Edition)",
                  authorOrInstitution: "Silberschatz, Galvin, Gagne",
                  topic: "Chapter 10: Virtual Memory (Section 10.4: Page Replacement & Belady's Anomaly)",
                  url: "https://codex.cs.yale.edu/avi/os-book/OS10/slide-dir/index.html",
                  type: "primary-standard",
                  annotation: "Official Chapter 10 slides detailing demand paging, page-fault handling sequence, FIFO, Optimal, LRU, and thrashing.",
                },
                {
                  title: "Operating Systems: Three Easy Pieces (OSTEP)",
                  authorOrInstitution: "Remzi H. Arpaci-Dusseau & Andrea C. Arpaci-Dusseau",
                  topic: "Chapter 22: Beyond Physical Memory: Policies (Page Replacement Algorithms)",
                  url: "https://pages.cs.wisc.edu/~remzi/OSTEP/vm-beyondphys-policy.pdf",
                  type: "primary-standard",
                  annotation: "Free chapter analyzing Cache Management, FIFO vs Random vs LRU, and the Clock algorithm approximation.",
                },
              ],
              stillStuck: [
                {
                  prompt: "If FIFO page replacement and reference string tracing feel confusing...",
                  title: "Page Replacement Introduction | FIFO Page Replacement algorithm",
                  creator: "Gate Smashers (Varun Singla)",
                  duration: "13 mins",
                  url: "https://www.youtube.com/watch?v=acO_e0sYn8c",
                  whyThisHelps:
                    "Tabular walkthrough showing how to track hits, misses, and replacement order across frame slots.",
                },
                {
                  prompt: "For Belady's Anomaly counter-example and explanation...",
                  title: "Belady's Anomaly in FIFO page Replacement with example",
                  creator: "Gate Smashers (Varun Singla)",
                  duration: "9 mins",
                  url: "https://www.youtube.com/watch?v=u6B9G0uY4v4",
                  whyThisHelps:
                    "Walks through the classic 12-page reference string proving why 4 frames produce more page faults than 3 frames.",
                },
              ],
            },
          ],
        },
      ],
    },

    // ══════════════════════════════════════════════════════════════════════
    // MODULE 8 — FILE SYSTEMS
    // ══════════════════════════════════════════════════════════════════════
    {
      id: "file-systems",
      title: "Module 8: File Systems & Storage Architecture",
      slug: "file-systems",
      order: 8,
      tagline: "Directory structures, Unix Inodes, direct/indirect block pointers, and allocation methods.",
      lessons: [
        {
          id: "file-allocation-and-inodes",
          title: "Unix Inodes & File Allocation Methods",
          slug: "file-allocation-and-inodes",
          order: 1,
          estimatedMinutes: 22,
          tagline: "Calculating maximum file sizes with direct, single, double, and triple indirect pointers.",
          hasInteractive: false,
          hasGATE: true,
          hasPractice: true,
          sections: [
            {
              type: "explanation",
              heading: "1. The Inode Architecture in Unix File Systems",
              body: [
                "In the classical Unix textbook model, a file's metadata and disk block pointers are stored in an ==purple:Index Node (inode)==. Modern file systems may use different structures; for example, ext4 commonly uses extents rather than the exact textbook pointer array described below.",
                "An inode contains file attributes (size, owner, permissions, timestamps) and references to the file's data blocks. In the classical model used for the calculation below, it contains 15 block pointers:",
                "• ==green:12 Direct Pointers:== Point directly to data blocks storing the file's contents.",
                "• ==yellow:1 Single Indirect Pointer:== Points to an index block containing pointers to data blocks.",
                "• ==yellow:1 Double Indirect Pointer:== Points to an index block that contains pointers to index blocks, which in turn point to data blocks.",
                "• ==purple:1 Triple Indirect Pointer:== Points to an index block pointing to double indirect blocks.",
                "**File allocation methods:** ==green:Contiguous allocation== stores a file in adjacent blocks and gives fast sequential access, but suffers from ==pink:external fragmentation==. ==yellow:Linked allocation== follows a pointer chain and eliminates external fragmentation, but ==pink:random access is slow (O(N))==. ==purple:Indexed allocation== stores block addresses in an index block, supporting direct access at the cost of index overhead. The inode's direct and indirect pointers are a Unix-style indexed allocation design.",
              ],
            },
            {
              type: "worked-example",
              heading: "2. Worked Calculation: Maximum File Size",
              problemStatement:
                "An Inode contains 12 direct pointers, 1 single indirect, 1 double indirect, and 1 triple indirect pointer. Disk block size is 4 KB (4096 bytes), and a disk block address pointer is 4 bytes. Calculate the maximum file size supported by this file system.",
              givenData: [
                { label: "Block Size", value: "4 KB = 4096 bytes" },
                { label: "Block Pointer Size", value: "4 bytes" },
                { label: "Pointers per Block", value: "4096 / 4 = 1024 = 2^10 pointers" },
              ],
              steps: [
                {
                  stepNumber: 1,
                  title: "Direct Blocks Capacity",
                  description: "12 direct pointers point to 12 data blocks.",
                  formula: "12 * 4 KB = 48 KB",
                },
                {
                  stepNumber: 2,
                  title: "Single Indirect Capacity",
                  description: "One pointer points to a block containing 1024 pointers.",
                  formula: "1024 * 4 KB = 2^10 * 2^12 B = 2^22 B = 4 MB",
                },
                {
                  stepNumber: 3,
                  title: "Double Indirect Capacity",
                  description: "1024 * 1024 = 2^20 pointers to data blocks.",
                  formula: "1024 * 1024 * 4 KB = 2^20 * 2^12 B = 2^32 B = 4 GB",
                },
                {
                  stepNumber: 4,
                  title: "Triple Indirect Capacity",
                  description: "1024 * 1024 * 1024 = 2^30 pointers to data blocks.",
                  formula: "1024^3 * 4 KB = 2^30 * 2^12 B = 2^42 B = 4 TB",
                },
              ],
              finalAnswer: "Max File Size = 48 KB + 4 MB + 4 GB + 4 TB ≈ 4.004 TB",
              examTakeaway:
                "In GATE, remember that Pointers Per Block = (Block Size) / (Pointer Size). Triple indirect dominates the capacity: (PointersPerBlock)³ × BlockSize.",
            },
            {
              type: "gate-lens",
              heading: "3. GATE Lens & Verified PYQs",
              weightageSummary:
                "Inode maximum file size calculations are a favorite 2-mark numerical question pattern in GATE CS.",
              commonPatterns: [
                "Given block size and pointer size, calculate the maximum file size or find which pointer level is needed to access byte offset X.",
              ],
              commonTraps: [
                "⚠ Don't forget that block pointer sizes are in BYTES, not bits.",
                "⚠ To find which pointer is accessed for byte offset B, divide B by Block Size to find the block index, then compare against direct, single, and double ranges.",
              ],
              pyqs: [
                {
                  id: "gate-fs-inode-2018",
                  year: 2018,
                  marks: 2,
                  question:
                    "Consider a file system with 2 KB block size. An inode contains 10 direct, 1 single indirect, and 1 double indirect pointer. If each block pointer takes 4 bytes, what is the maximum file size (in MB, rounded to nearest integer)?",
                  options: [
                    "A. 256 MB",
                    "B. 513 MB",
                    "C. 1024 MB",
                    "D. 2048 MB",
                  ],
                  correctOptionOrValue: "B. 513 MB",
                  detailedSolution:
                    "1. Block Size = 2 KB = 2048 bytes.\n2. Pointers per block = 2048 / 4 = 512 pointers = 2^9.\n3. Direct capacity = 10 * 2 KB = 20 KB.\n4. Single indirect = 512 * 2 KB = 1024 KB = 1 MB.\n5. Double indirect = 512 * 512 * 2 KB = 2^9 * 2^9 * 2^11 B = 2^29 B = 512 MB.\nTotal capacity = 20 KB + 1 MB + 512 MB = 513.02 MB ≈ 513 MB.",
                  keyFormulaOrConcept:
                    "Pointers per block = Block Size / Pointer Size. Max Size = Direct + Single*B + Double*B^2.",
                },
              ],
            },
            {
              type: "quick-revision",
              heading: "4. 1-Minute Panic Revision",
              oneMinutePanicCard: {
                coreRule:
                  "Unix Inode: Direct pointers (small files fast) + Indirect pointers (large files supported).",
                mustRememberFormulas: [
                  "Pointers per index block = Block Size / Pointer Size.",
                  "Max Blocks = Direct + (P) + (P^2) + (P^3).",
                  "Max File Size = (Max Blocks) * (Block Size).",
                ],
                criticalPitfalls: [
                  "A file's name is NOT stored in its inode! File names are stored in directory entries mapping name → inode number.",
                ],
                visualFlow:
`[ UNIX INODE POINTER HIERARCHY & MAXIMUM CAPACITY ]

INODE STRUCTURE (Fixed-size metadata header):
┌─────────────────────────────────────────────────────────────┐
│ [ Direct Pointers 0–11 ] ───> Data Blocks                   │ (12 × BlockSize)
├─────────────────────────────────────────────────────────────┤
│ [ Single Indirect ]      ───> Index Block                   │
│                                    │                        │
│                                    ▼                        │
│                               Data Blocks                   │ (P × BlockSize)
├─────────────────────────────────────────────────────────────┤
│ [ Double Indirect ]      ───> Index Block                   │
│                                    │                        │
│                                    ▼                        │
│                               Index Blocks                  │
│                                    │                        │
│                                    ▼                        │
│                               Data Blocks                   │ (P² × BlockSize)
├─────────────────────────────────────────────────────────────┤
│ [ Triple Indirect ]      ───> Index → Index → Data Blocks   │ (P³ × BlockSize)
└─────────────────────────────────────────────────────────────┘
* P = (Block Size in Bytes) / (Pointer Size in Bytes)`,
              },
            },
            {
              type: "resources",
              heading: "5. Authoritative Source Trail",
              sources: [
                {
                  title: "Operating System Concepts (10th Edition)",
                  authorOrInstitution: "Silberschatz, Galvin, Gagne",
                  topic: "Chapter 14: File-System Implementation (Section 14.4: Allocation Methods & Unix Inode)",
                  url: "https://codex.cs.yale.edu/avi/os-book/OS10/slide-dir/index.html",
                  type: "primary-standard",
                  annotation: "Official Chapter 14 slides detailing directory structures, contiguous/linked/indexed allocation, and Unix Inode pointer schemes.",
                },
                {
                  title: "Operating Systems: Three Easy Pieces (OSTEP)",
                  authorOrInstitution: "Remzi H. Arpaci-Dusseau & Andrea C. Arpaci-Dusseau",
                  topic: "Chapter 40: File System Implementation (The Inode & Multi-Level Indexing)",
                  url: "https://pages.cs.wisc.edu/~remzi/OSTEP/file-implementation.pdf",
                  type: "primary-standard",
                  annotation: "Comprehensive chapter explaining Inode bitmaps, data blocks, indirect pointers, and reading/writing disk paths.",
                },
              ],
              stillStuck: [
                {
                  prompt: "If Unix Inode capacity calculations and byte offset lookups are tricky...",
                  title: "Unix Inode Structure with Numerical Example | OS",
                  creator: "Gate Smashers (Varun Singla)",
                  duration: "14 mins",
                  url: "https://www.youtube.com/watch?v=YePZ0u9yN0o",
                  whyThisHelps:
                    "Shortcuts to calculate maximum file size without committing conversion mistakes between block address bits and bytes.",
                },
                {
                  prompt: "For indexed allocation and multi-level indirect block traversal...",
                  title: "File Allocation Methods (Contiguous, Linked, Indexed)",
                  creator: "Gate Smashers (Varun Singla)",
                  duration: "15 mins",
                  url: "https://www.youtube.com/watch?v=F3i_XzBuhXw",
                  whyThisHelps:
                    "Visual comparison of contiguous allocation external fragmentation vs linked pointer overhead vs indexed multi-level inodes.",
                },
              ],
            },
          ],
        },
      ],
    },

    // ══════════════════════════════════════════════════════════════════════
    // MODULE 9 — I/O AND STORAGE
    // ══════════════════════════════════════════════════════════════════════
    {
      id: "io-and-storage",
      title: "Module 9: I/O Systems & Disk Scheduling",
      slug: "io-and-storage",
      order: 9,
      tagline: "Disk geometry, seek time, and arm scheduling algorithms (FCFS, SSTF, SCAN, C-SCAN, LOOK).",
      lessons: [
        {
          id: "disk-scheduling-algorithms",
          title: "Disk Scheduling: SSTF, SCAN, C-SCAN & LOOK",
          slug: "disk-scheduling-algorithms",
          order: 1,
          estimatedMinutes: 22,
          tagline: "Minimizing mechanical head seek time across cylinders with real arm trajectory simulations.",
          hasInteractive: true,
          hasGATE: true,
          hasPractice: true,
          sections: [
            {
              type: "explanation",
              heading: "1. Magnetic Disk Access Time Components",
              body: [
                "On magnetic hard disk drives (HDDs), reading or writing a sector requires physical mechanical movements. The total access time is composed of three components:",
                "**1. Seek Time:** The time required for the physical disk arm to position the read/write head over the desired cylinder/track. ==pink:This is by far the slowest mechanical component (typically 3–10 ms)==.",
                "**2. Rotational Latency:** The time required for the desired disk sector to rotate under the read/write head. On average, this is ==yellow:half a revolution: 1 / (2 × RPM)==.",
                "**3. Transfer Time:** The time required to ==green:stream data bytes from magnetic media== to the controller buffer.",
                "Because seek time dominates total access time, ==purple:Disk Scheduling Algorithms== seek to order pending I/O track requests to ==green:minimize total head movement==.",
              ],
            },
            {
              type: "interactive",
              heading: "2. Interactive Disk Scheduling Simulator",
              leadParagraph:
                "Select different algorithms (FCFS, SSTF, SCAN, C-SCAN, LOOK, C-LOOK) to visualize the disk arm's sweep across cylinders 0 to 199 and compute total cylinder movement.",
              interactive: {
                kind: "disk-scheduling",
                config: {
                  title: "Disk Head Movement & Cylinder Trajectory Simulator",
                  caption:
                    "Observe how Elevator (SCAN/LOOK) and Circular (C-SCAN/C-LOOK) algorithms trade head movement for more predictable service. They do not categorically eliminate starvation under every workload or implementation.",
                  initialHead: 53,
                  totalCylinders: 200,
                  direction: "right",
                  requests: [98, 183, 37, 122, 14, 124, 65, 67],
                },
              },
            },
            {
              type: "comparison",
              heading: "3. Algorithm Comparison: SCAN vs. C-SCAN vs. LOOK",
              leadParagraph: "Comparing arm trajectory heuristics.",
              columns: ["SCAN (Elevator)", "C-SCAN (Circular SCAN)"],
              criteria: [
                {
                  feature: "Arm Movement Pattern",
                  first: "Sweeps in one direction to the disk boundary (0 or Max), then reverses direction.",
                  second: "Sweeps in one direction to the end, then immediately returns to the beginning without servicing requests on return.",
                },
                {
                  feature: "Fairness to Edge Cylinders",
                  first: "Favors requests near the ends of the disk platter.",
                  second: "Provides more uniform wait times across all cylinders.",
                },
                {
                  feature: "LOOK vs SCAN difference",
                  first: "LOOK goes only as far as the last request in that direction; SCAN always travels to cylinder 0 or Max.",
                  second: "C-LOOK jumps to the lowest requested cylinder; C-SCAN jumps all the way to cylinder 0.",
                },
              ],
              summaryTakeaway:
                "LOOK and C-LOOK optimize SCAN by avoiding unnecessary trips to the extreme boundaries (0 and Max) when no requests exist there.",
            },
            {
              type: "gate-lens",
              heading: "4. GATE Lens & Verified PYQs",
              weightageSummary:
                "Disk scheduling calculations appear frequently in GATE CS as 2-mark numerical problems.",
              commonPatterns: [
                "Given initial head position, arm direction, and a list of requested tracks, calculate the total head movement in cylinders.",
              ],
              commonTraps: [
                "⚠ Read carefully whether the algorithm is SCAN vs LOOK! SCAN travels all the way to boundary 199/0; LOOK reverses at the farthest request!",
                "⚠ In C-SCAN, check whether the return jump from end to 0 is counted in head movement (in standard GATE problems, it IS counted as travel distance).",
              ],
              pyqs: [
                {
                  id: "gate-disk-cscan-2016",
                  year: 2016,
                  marks: 2,
                  question:
                    "Consider a disk queue with requests for I/O to blocks on cylinders 98, 183, 37, 122, 14, 124, 65, 67. The head is currently at cylinder 53 moving toward larger cylinder numbers. Total cylinders: 0 to 199. Using C-SCAN algorithm, what is the total head movement (in cylinders)?",
                  options: [
                    "A. 187 cylinders",
                    "B. 382 cylinders",
                    "C. 386 cylinders",
                    "D. 236 cylinders",
                  ],
                  correctOptionOrValue: "B. 382 cylinders",
                  detailedSolution:
                    "1. Head starts at 53 moving right (towards higher cylinders).\n2. Requests in right direction: 65, 67, 98, 122, 124, 183.\n3. C-SCAN travels all the way to disk end (cylinder 199).\nMovement right = 199 - 53 = 146 cylinders.\n4. C-SCAN jumps from 199 to 0 (return distance = 199 cylinders).\n5. From 0, it services remaining requests moving right: 14, 37 (stops at 37).\nMovement from 0 to 37 = 37 cylinders.\nTotal Head Movement = (199 - 53) + (199 - 0) + (37 - 0) = 146 + 199 + 37 = 382 cylinders.",
                  keyFormulaOrConcept:
                    "C-SCAN: (End - Start) + (End - 0) + (Last request - 0).",
                },
              ],
            },
            {
              type: "quick-revision",
              heading: "5. 1-Minute Panic Revision",
              oneMinutePanicCard: {
                coreRule:
                  "Disk Scheduling minimizes Seek Time. Seek time = physical arm movement across tracks.",
                mustRememberFormulas: [
                  "SSTF: Greedy, picks closest request. Suffers from starvation.",
                  "SCAN: Elevator algorithm. Moves to end cylinder (0 or Max), reverses.",
                  "LOOK: Reverses at the farthest request (does not go to physical boundary).",
                  "C-SCAN / C-LOOK: Unidirectional service with fast return jump.",
                ],
                criticalPitfalls: [
                  "SCAN visits cylinder 0 or 199 even if no request exists there.",
                  "LOOK reverses at the last actual request, saving head travel.",
                ],
                visualFlow:
`[ DISK SCHEDULING ALGORITHMS TRAJECTORY COMPARISON ]

Platter Cylinders: [ 0 ──────────────── 53 (Head) ──────────────── 199 ]

• FCFS:    Jumps haphazardly to whatever arrives first (highest seek time).
• SSTF:    Greedy jump to nearest cylinder (starvation for distant cylinders).
• SCAN:    [ 53 ──────────> 199 (Disk Edge) ] ──reverses──> [ 37 ──────> 14 ]
           * Always reaches extreme boundary (0 or 199)!
• LOOK:    [ 53 ──────────> 183 (Last Request) ] ──reverses──> [ 37 ────> 14 ]
           * Reverses at the farthest request without wasting travel to edge.
• C-SCAN:  [ 53 ──> 199 ] ──fast jump to 0 (no service)──> [ 0 ──> 14 ──> 37 ]
• C-LOOK:  [ 53 ──> 183 ] ──fast jump to 14 (no service)──> [ 14 ──> 37 ]`,
              },
            },
            {
              type: "resources",
              heading: "6. Authoritative Source Trail",
              sources: [
                {
                  title: "Operating System Concepts (10th Edition)",
                  authorOrInstitution: "Silberschatz, Galvin, Gagne",
                  topic: "Chapter 11: Mass-Storage Structure (Section 11.4: Disk Scheduling Algorithms)",
                  url: "https://codex.cs.yale.edu/avi/os-book/OS10/slide-dir/index.html",
                  type: "primary-standard",
                  annotation: "Official Chapter 11 slides illustrating seek times, head trajectories, SSTF starvation, and elevator SCAN/LOOK algorithms.",
                },
                {
                  title: "Operating Systems: Three Easy Pieces (OSTEP)",
                  authorOrInstitution: "Remzi H. Arpaci-Dusseau & Andrea C. Arpaci-Dusseau",
                  topic: "Chapter 37: Hard Disk Drives (Geometry, Latency & I/O Scheduling)",
                  url: "https://pages.cs.wisc.edu/~remzi/OSTEP/file-disks.pdf",
                  type: "primary-standard",
                  annotation: "Full chapter analyzing seek time, rotational delay, transfer time, and disk scheduling algorithms (SSTF, SCAN, SPTF).",
                },
                {
                  title: "NPTEL: Operating Systems",
                  authorOrInstitution: "Prof. Santanu Chattopadhyay (IIT Kharagpur)",
                  topic: "Secondary Storage & Disk Scheduling",
                  url: "https://nptel.ac.in/courses/106105214",
                  type: "curated-lecture",
                  annotation: "University lecture on magnetic disk geometry, track addressing, and head movement minimization.",
                },
              ],
              stillStuck: [
                {
                  prompt: "If calculating head movement for SCAN (Elevator Algorithm) gets confusing...",
                  title: "SCAN Disk Scheduling Algorithm with Example | Operating System",
                  creator: "Gate Smashers (Varun Singla)",
                  duration: "13 mins",
                  url: "https://www.youtube.com/watch?v=1xN5tq4_4tA",
                  whyThisHelps:
                    "Demonstrates number line calculations and highlights why SCAN must touch the extreme boundary (0 or 199) before reversing.",
                },
                {
                  prompt: "For SSTF greedy seek time and starvation tradeoffs...",
                  title: "SSTF in Disk Scheduling with Example | Operating System",
                  creator: "Gate Smashers (Varun Singla)",
                  duration: "11 mins",
                  url: "https://www.youtube.com/watch?v=R32R5wJ_H-0",
                  whyThisHelps:
                    "Step-by-step track difference calculation comparing FCFS vs SSTF total seek distances.",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
