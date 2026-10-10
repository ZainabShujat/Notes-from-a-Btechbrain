export const OS_LABS = [
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
    lessonSlug: "fcfs-and-round-robin",
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
    lessonSlug: "page-replacement-algorithms",
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
    lessonSlug: "critical-section-and-semaphores",
    description:
      "Visualizes the wait queue and value changes for P(S) and V(S) operations. Demonstrates how semaphores maintain mutual exclusion and prevent race conditions in critical sections.",
    tags: ["Semaphores", "Mutual Exclusion", "Wait Queue", "Critical Section"],
    features: ["Wait / Signal operations", "Queue blockage simulation", "Bounded buffer testing"],
  },
  {
    id: "context-switching",
    title: "Context Switching PCB Snapshot Visualizer",
    module: "Module 2: Processes & Concurrency",
    lessonSlug: "context-switching",
    description:
      "Shows how the operating system saves process registers, program counter, and stack pointers into the Process Control Block (PCB) before restoring the next ready process.",
    tags: ["Process Control Block", "Context Switch Cost", "Register State", "TLB Flush"],
    features: ["PCB memory layout", "Switch overhead timeline", "Hardware state preservation"],
  },
];

export const DBMS_LABS = [
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

export const COURSE_LABS = [
  ...OS_LABS.map((lab) => ({ ...lab, courseSlug: "operating-systems", subjectName: "Operating Systems" })),
  ...DBMS_LABS.map((lab) => ({ ...lab, subjectName: "Database Management Systems" })),
];