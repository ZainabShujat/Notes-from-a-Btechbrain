import { SubjectNotebookData } from "./types";

export const SUBJECT_NOTEBOOKS: SubjectNotebookData[] = [
  // ── 01. OPERATING SYSTEMS ──────────────────────────────────────
  {
    id: "operating-systems",
    title: "Operating Systems",
    code: "CS-01",
    slug: "operating-systems",
    tagline: "The invisible machinery underneath every program you run.",
    description: "From hardware abstraction and dual-mode traps to preemptive CPU scheduling, semaphore synchronization, inverted page tables, and virtual memory thrashing.",
    level: "B.Tech · GATE CS",
    accentColor: "violet",
    accentHex: "#a855f7",
    stats: {
      sectionsCount: 9,
      notesCount: 15,
      labsCount: 7,
      pyqsCount: 0,
    },
    coverAnnotation: "✎ built from standard references; exam sources pending verification",
    previewSnippets: [
      {
        title: "Dual Mode & Traps",
        teaser: "Hardware flips Mode Bit (1 → 0) on INT 0x80",
        type: "concept",
      },
      {
        title: "7-State Process Lifecycle",
        teaser: "Ready-Suspend vs Blocked-Suspend swap boundaries",
        type: "diagram",
      },
      {
        title: "Paging & EMAT Derivation",
        teaser: "TLB Hit (95%) vs Miss Penalty with two-level walk",
        type: "worked-example",
      },
    ],
    pages: [
      {
        id: "os-p1",
        pageNumber: 1,
        title: "Why Operating Systems Exist: The Dual Role",
        type: "concept",
        tag: "Core Mental Model",
        content: {
          heading: "1. The Dual Nature of an Operating System",
          subheading: "Resource Manager (Bottom-Up) + Extended Machine (Top-Down)",
          handwrittenNote: "✎ think of it like a government: produces no wealth directly, but makes orderly society possible",
          paragraphs: [
            "Consider an early computer without an operating system. If two programmers wanted to run code, only one program could occupy physical memory at any moment. Every application developer had to write custom assembly routines to pulse stepper motors on magnetic tape drives and interpret raw track pulses.",
            "Worse yet: what happens when an errant program gets stuck in an infinite loop, or writes a zero to a memory address holding another user's bank ledger? Without an intermediary layer with special hardware authority, any user code can destroy the entire machine's state.",
          ],
          callout: {
            kind: "mental-model",
            title: "Kernel Mode vs User Mode",
            message: "Hardware provides a physical Mode Bit in the processor status register (PSR). User applications run with Bit=1 (unprivileged). The kernel runs with Bit=0 (privileged). A user program can NEVER execute I/O instructions directly.",
          },
          bullets: [
            "Extended Machine (Top-Down): Abstraction. Turns messy hardware registers into clean files, sockets, and threads.",
            "Resource Manager (Bottom-Up): Arbitration. Multiplexes CPU, RAM, and I/O devices fairly and securely across competing tasks.",
          ],
          keyTakeaway: "Security is impossible without hardware-enforced privilege boundaries.",
        },
      },
      {
        id: "os-p2",
        pageNumber: 2,
        title: "The 7-State Process Lifecycle",
        type: "diagram",
        tag: "Kernel Architecture",
        content: {
          heading: "2. Process Lifecycle & Swapping Dynamics",
          subheading: "Active RAM Region vs Secondary Storage (Swap Disk)",
          handwrittenNote: "✎ Ready-Suspend: same as Ready, but process memory has been evicted to disk swap space",
          customKey: "os-process-lifecycle",
          caption: "Figure 1.1: 7-State Process Model with Long, Medium, and Short-Term Schedulers.",
          notes: [
            "Short-Term Scheduler (CPU Dispatcher): milliseconds scale, moves process from Ready to Running.",
            "Medium-Term Scheduler (Swapper): seconds scale, handles RAM thrashing by evicting blocked/ready processes to disk.",
            "Long-Term Scheduler (Job Scheduler): admits new batch jobs into memory.",
          ],
        },
      },
      {
        id: "os-p3",
        pageNumber: 3,
        title: "Effective Memory Access Time (EMAT)",
        type: "worked-example",
        tag: "Numerical Derivation",
        content: {
          heading: "3. Worked Numerical: Two-Level Paging with TLB",
          examContext: "GATE CS 2021 & Semester End-Term Classical Problem",
          problem: "A system uses two-level paging. Main memory access time is 100 ns. TLB lookup time is 20 ns. The TLB hit ratio is 90%. What is the Effective Memory Access Time (EMAT)?",
          given: [
            { label: "Memory Access (m)", value: "100 ns" },
            { label: "TLB Access (t)", value: "20 ns" },
            { label: "Hit Ratio (h)", value: "90% (0.90)" },
            { label: "Paging Levels", value: "2 levels" },
          ],
          steps: [
            {
              stepNumber: 1,
              title: "Analyze Case 1: TLB Hit",
              formula: "T_{hit} = t_{TLB} + m",
              explanation: "If the page translation is found in the TLB, we access the TLB once and main memory once for data.",
              result: "20 + 100 = 120 ns",
            },
            {
              stepNumber: 2,
              title: "Analyze Case 2: TLB Miss",
              formula: "T_{miss} = t_{TLB} + (Levels \\times m) + m",
              explanation: "With 2-level paging, a TLB miss requires accessing Outer Page Table (100ns), Inner Page Table (100ns), and target Data (100ns).",
              result: "20 + 200 + 100 = 320 ns",
            },
            {
              stepNumber: 3,
              title: "Combine with Probability Weights",
              formula: "EMAT = h \\times T_{hit} + (1 - h) \\times T_{miss}",
              explanation: "Substitute h = 0.90 and (1 - h) = 0.10 into the weighted average equation.",
              result: "0.90 × 120 + 0.10 × 320 = 108 + 32 = 140 ns",
            },
          ],
          finalAnswer: "EMAT = 140 ns",
          handwrittenTakeaway: "✎ common trap: remember that an N-level page table requires N memory lookups for translation + 1 for data!",
        },
      },
      {
        id: "os-p4",
        pageNumber: 4,
        title: "Monolithic vs Microkernel Architecture",
        type: "comparison",
        tag: "System Design",
        content: {
          heading: "4. Architectural Tradeoff: Monolithic vs Microkernel",
          columns: ["Monolithic Kernel (Linux, BSD)", "Microkernel (Mach, QNX, seL4)"],
          rows: [
            {
              criterion: "Privilege Level",
              col1: "Everything (VFS, IPC, drivers, network stack, scheduler) runs in Ring 0.",
              col2: "Only primitive IPC, basic scheduling, and virtual memory run in Ring 0.",
            },
            {
              criterion: "IPC Overhead",
              col1: "Zero IPC cost: functions call each other directly via C function pointers.",
              col2: "High IPC overhead: message passing between user-space servers requires context switches.",
            },
            {
              criterion: "Fault Isolation",
              col1: "A single buggy GPU driver dereferencing NULL causes a kernel panic / blue screen.",
              col2: "A crashed driver server simply restarts without taking down the operating system.",
            },
            {
              criterion: "Codebase Size",
              col1: "Enormous: 30+ million lines of C in modern Linux kernel.",
              col2: "Minimal: ~10,000 lines of mathematically verified code in seL4.",
            },
          ],
          handwrittenTakeaway: "✎ Linux chose Monolithic for raw performance; safety-critical aerospace systems choose Microkernels.",
        },
      },
      {
        id: "os-p5",
        pageNumber: 5,
        title: "1-Minute Rapid Exam Revision",
        type: "revision",
        tag: "Exam Anchor",
        content: {
          heading: "5. Core Invariant & Rapid Memory Anchor",
          coreRule: "Deadlock requires all 4 Coffman conditions simultaneously. Break just ONE condition, and deadlock is mathematically impossible.",
          mustRemember: [
            "Banker's Algorithm: Need[i][j] = Max[i][j] - Allocation[i][j]. Work starts at Available.",
            "Belady's Anomaly: FIFO page replacement can cause MORE page faults when frame allocation INCREASES. Optimal & LRU are stack algorithms and never suffer from Belady's anomaly.",
            "Preemptive Priority Scheduling: Priority inversion occurs when a low-priority task holds a lock needed by high priority. Fix: Priority Inheritance Protocol.",
          ],
          criticalTraps: [
            "Trap 1: Counting semaphore wait() decrements FIRST. If s < 0, the absolute value |s| equals the number of blocked processes in the queue.",
            "Trap 2: Turnaround Time = Completion Time - Arrival Time. Waiting Time = Turnaround Time - Burst Time.",
          ],
        },
      },
    ],
  },

  // ── 02. DATABASE MANAGEMENT SYSTEMS ────────────────────────────
  {
    id: "dbms",
    status: "active",
    title: "Database Management Systems",
    code: "CS-02",
    slug: "dbms",
    tagline: "From flat files to ACID transactions, B+ trees & concurrency control.",
    description: "Relational algebra expressions, Boyce-Codd Normal Form decomposition, clustered B+ tree indexing math, conflict serializability graphs, and WAL recovery.",
    level: "B.Tech · GATE CS & DA",
    accentColor: "indigo",
    accentHex: "#6366f1",
    stats: {
      sectionsCount: 9,
      notesCount: 9,
      labsCount: 4,
      pyqsCount: 0,
    },
    coverAnnotation: "✎ benchmark complete · verified with Korth, Navathe & Ramakrishnan",
    previewSnippets: [
      {
        title: "Three-Schema Architecture",
        teaser: "Physical Data Independence vs Logical Data Independence",
        type: "diagram",
      },
      {
        title: "B+ Tree Order Derivation",
        teaser: "Node size = Block Size (4096B) ceiling calculations",
        type: "worked-example",
      },
      {
        title: "Conflict Serializability",
        teaser: "Precedence graph cycles & topological sort validation",
        type: "concept",
      },
    ],
    pages: [
      {
        id: "dbms-p1",
        pageNumber: 1,
        title: "The ANSI/SPARC Three-Schema Architecture",
        type: "concept",
        tag: "Foundational Architecture",
        content: {
          heading: "1. Data Abstraction & Data Independence",
          subheading: "Why Applications Shouldn't Care How Records Are Laid Out on Disk",
          handwrittenNote: "✎ in flat files, if you add a column, every C program reading that file crashes. DBMS solves this!",
          paragraphs: [
            "Early data processing relied on flat file systems where application code was tightly coupled to physical record structures on disk. If a DBA added a zip code field to the customer record, every compiled payroll executable reading that file immediately broke.",
            "The ANSI/SPARC Three-Schema Architecture decouples database definition into three distinct levels: External (Views), Conceptual (Logical Tables), and Internal (Physical File Storage).",
          ],
          callout: {
            kind: "intuition",
            title: "Physical vs Logical Data Independence",
            message: "Physical Data Independence means you can change B+ trees to Hash clusters on disk without changing SQL queries. Logical Data Independence means you can add/split tables without breaking user views.",
          },
          bullets: [
            "External Level: Tailored virtual views for different user roles (e.g. Student GPA view vs Bursar tuition view).",
            "Conceptual Level: The complete logical schema—tables, primary keys, foreign keys, and integrity constraints.",
            "Internal Level: Physical record byte offsets, slotted page layouts, compression, and clustered indices.",
          ],
          keyTakeaway: "Logical independence is strictly harder to achieve than physical independence.",
        },
      },
      {
        id: "dbms-p2",
        pageNumber: 2,
        title: "Three-Schema Architecture Diagram",
        type: "diagram",
        tag: "System Diagram",
        content: {
          heading: "2. Mapping Layers & Independence Boundaries",
          subheading: "External / Conceptual Mapping & Conceptual / Internal Mapping",
          handwrittenNote: "✎ notice how views shield client apps from logical table changes",
          customKey: "dbms-three-schema",
          caption: "Figure 2.1: ANSI/SPARC Three-Schema Abstraction with Physical Storage.",
          notes: [
            "External/Conceptual Mapping: Defines SQL views over underlying base relations.",
            "Conceptual/Internal Mapping: Directs the DBMS query optimizer on which index or table-scan to execute.",
          ],
        },
      },
      {
        id: "dbms-p3",
        pageNumber: 3,
        title: "B+ Tree Order & Fanout Derivation",
        type: "worked-example",
        tag: "Storage Numerical",
        content: {
          heading: "3. Worked Numerical: B+ Tree Node Order Calculation",
          examContext: "Standard GATE CS Numerical Pattern (2 Marks)",
          problem: "A file system has a block size of 4096 bytes. In a B+ tree, search keys are 12 bytes long, block pointers are 8 bytes long, and record pointers are 10 bytes long. Calculate the maximum order p of an internal node and a leaf node.",
          given: [
            { label: "Block Size (B)", value: "4096 bytes" },
            { label: "Search Key (K)", value: "12 bytes" },
            { label: "Block Pointer (P)", value: "8 bytes" },
            { label: "Record Pointer (Pr)", value: "10 bytes" },
          ],
          steps: [
            {
              stepNumber: 1,
              title: "Internal Node Equation",
              formula: "p \\times P + (p - 1) \\times K \\le B",
              explanation: "An internal node of order p stores p block pointers and (p - 1) search keys.",
              result: "8p + 12(p - 1) ≤ 4096  =>  20p - 12 ≤ 4096  =>  20p ≤ 4108",
            },
            {
              stepNumber: 2,
              title: "Solve Internal Order (p)",
              formula: "p = \\lfloor 4108 / 20 \\rfloor",
              explanation: "Order must be an integer, so take the floor of the fraction.",
              result: "p = 205 (Internal Node Order)",
            },
            {
              stepNumber: 3,
              title: "Leaf Node Equation",
              formula: "q \\times (K + P_r) + P \\le B",
              explanation: "A leaf node stores pairs of (Key + Record Pointer) plus 1 block pointer to the next leaf sibling.",
              result: "q × (12 + 10) + 8 ≤ 4096  =>  22q ≤ 4088  =>  q = 185",
            },
          ],
          finalAnswer: "Internal Order = 205, Leaf Capacity = 185 records",
          handwrittenTakeaway: "✎ watch out: internal nodes point to other disk blocks (P); leaf nodes point to actual records (Pr) plus 1 sibling block pointer (P)!",
        },
      },
      {
        id: "dbms-p4",
        pageNumber: 4,
        title: "B-Tree vs B+ Tree Comparison",
        type: "comparison",
        tag: "Data Structures",
        content: {
          heading: "4. Storage Comparison: B-Tree vs B+ Tree",
          columns: ["Standard B-Tree", "B+ Tree (Modern DBMS Standard)"],
          rows: [
            {
              criterion: "Data Location",
              col1: "Data record pointers are stored in both internal nodes and leaf nodes.",
              col2: "Data record pointers are stored EXCLUSIVELY in leaf nodes. Internal nodes hold keys only.",
            },
            {
              criterion: "Internal Fanout",
              col1: "Lower fanout: because internal nodes store data pointers, fewer keys fit in a 4KB block.",
              col2: "Massive fanout: without data pointers, hundreds of keys fit in each index block.",
            },
            {
              criterion: "Range Query Speed",
              col1: "Slow: requires an in-order tree traversal jumping randomly across disk blocks.",
              col2: "Ultra-fast: leaf nodes form a doubly linked list; just seek first leaf and scan sequentially.",
            },
            {
              criterion: "Tree Height",
              col1: "Taller tree due to lower fanout, requiring more disk I/O operations per search.",
              col2: "Extremely short (often height 3 or 4 for billions of rows), minimizing disk head seeks.",
            },
          ],
          handwrittenTakeaway: "✎ B+ Trees are used in MySQL InnoDB and PostgreSQL because range queries (WHERE age BETWEEN 20 AND 30) are lightning fast!",
        },
      },
      {
        id: "dbms-p5",
        pageNumber: 5,
        title: "1-Minute Rapid Exam Revision",
        type: "revision",
        tag: "Exam Anchor",
        content: {
          heading: "5. Normalization & Serializability Cheat Card",
          coreRule: "Lossless Join Decomposition is non-negotiable. If R1 ∩ R2 does NOT form a candidate key of at least one sub-relation, the decomposition loses information.",
          mustRemember: [
            "BCNF: For every functional dependency X → Y, X must be a Super Key.",
            "3NF: For every X → Y, either X is a Super Key OR Y is a Prime Attribute (member of candidate key).",
            "Conflict Serializability: Construct a precedence graph with directed edges Ti → Tj for conflicting operations (W-R, R-W, W-W). The schedule is conflict serializable iff the graph is ACYCLIC.",
          ],
          criticalTraps: [
            "Trap 1: View Serializability is NP-Complete, but Conflict Serializability is O(V + E) using DFS cycle check.",
            "Trap 2: Strict 2PL guarantees both serializability and freedom from cascading aborts.",
          ],
        },
      },
    ],
  },

  // ── 03. ALGORITHMS ─────────────────────────────────────────────
  {
    id: "algorithms",
    title: "Algorithms",
    code: "CS-12 / DA-05",
    slug: "algorithms",
    tagline: "Asymptotic complexity, divide and conquer, dynamic programming & graphs.",
    description: "Recurrence relations via Master Theorem, greedy matroid optimality, Bellman-Ford negative cycle detection, 0/1 Knapsack DP tables, and NP-completeness reductions.",
    level: "B.Tech · GATE CS & DA (7–10 Marks)",
    accentColor: "emerald",
    accentHex: "#10b981",
    stats: {
      sectionsCount: 5,
      notesCount: 11,
      labsCount: 0,
      pyqsCount: 0,
    },
    coverAnnotation: "✎ verified with CLRS, Kleinberg-Tardos & Garey-Johnson · 11 lessons",
    status: "active",
    gateBranches: ["cs", "da"],
    previewSnippets: [
      {
        title: "Master Theorem Masterclass",
        teaser: "3 fundamental cases for divide & conquer recurrences",
        type: "formula",
      },
      {
        title: "BFS vs DFS Graph Traversal",
        teaser: "Queue FIFO wavefront vs Stack backtracking path",
        type: "diagram",
      },
      {
        title: "0/1 Knapsack DP Matrix",
        teaser: "State transitions: DP[i, w] = max(exclude, include)",
        type: "worked-example",
      },
    ],
    pages: [
      {
        id: "algo-p1",
        pageNumber: 1,
        title: "The Master Theorem for Divide & Conquer",
        type: "concept",
        tag: "Complexity Analysis",
        content: {
          heading: "1. Solving Recurrences: T(n) = aT(n/b) + f(n)",
          subheading: "Comparing the Work at Leaves with the Work at the Root",
          handwrittenNote: "✎ always compare f(n) with n^{log_b(a)}. Whoever dominates wins!",
          paragraphs: [
            "In divide-and-conquer algorithms, a problem of size n is divided into a subproblems, each of size n/b. The work required to divide the problem and combine the subproblem solutions is represented by f(n).",
            "The total number of leaves in the recursion tree is n^{log_b(a)}. The Master Theorem simply compares the asymptotic growth of the leaves against the work done at the root f(n).",
          ],
          callout: {
            kind: "exam-tip",
            title: "The Three Classic Cases",
            message: "Case 1: If f(n) = O(n^{log_b(a) - ε}), leaves dominate → T(n) = Θ(n^{log_b(a)}).\nCase 2: If f(n) = Θ(n^{log_b(a)}), work is equal across levels → T(n) = Θ(n^{log_b(a)} log n).\nCase 3: If f(n) = Ω(n^{log_b(a) + ε}) and regularity holds, root dominates → T(n) = Θ(f(n)).",
          },
          bullets: [
            "MergeSort: T(n) = 2T(n/2) + Θ(n). a=2, b=2. n^{log_2(2)} = n^1. Matches f(n) → Case 2: Θ(n log n).",
            "Strassen Matrix Mult: T(n) = 7T(n/2) + Θ(n^2). log_2(7) ≈ 2.81 > 2 → Case 1: Θ(n^{2.81}).",
            "Binary Search: T(n) = T(n/2) + Θ(1). a=1, b=2. n^{log_2(1)} = n^0 = 1. Matches f(n) → Case 2: Θ(log n).",
          ],
          keyTakeaway: "Master theorem fails if a is not a constant or if b is not a fixed divisor (e.g. T(n) = T(n-1) + 1).",
        },
      },
      {
        id: "algo-p2",
        pageNumber: 2,
        title: "BFS vs DFS Traversal Frontiers",
        type: "diagram",
        tag: "Graph Algorithms",
        content: {
          heading: "2. Graph Exploration: Breadth-First vs Depth-First",
          subheading: "Shortest Unweighted Paths (Queue) vs Topological Ordering (Stack)",
          handwrittenNote: "✎ BFS guarantees shortest path in unweighted graphs; DFS finds back-edges for cycle detection",
          customKey: "algo-bfs-dfs",
          caption: "Figure 3.1: BFS level-order wavefront vs DFS tree edge / back edge discovery.",
          notes: [
            "BFS uses a FIFO Queue: discovers all vertices at distance d before touching distance d+1.",
            "DFS uses a LIFO Stack: penetrates as deep as possible along a branch before backtracking.",
            "Back edges in a directed graph prove the existence of a cycle!",
          ],
        },
      },
      {
        id: "algo-p3",
        pageNumber: 3,
        title: "0/1 Knapsack Dynamic Programming",
        type: "worked-example",
        tag: "DP Derivation",
        content: {
          heading: "3. Step-by-Step DP Matrix Construction",
          examContext: "Classical Algorithm Design Problem",
          problem: "Given knapsack capacity W = 4 kg, and 3 items with (Weight, Value): Item 1 = (1kg, $15), Item 2 = (2kg, $20), Item 3 = (3kg, $30). Compute the maximum value.",
          given: [
            { label: "Capacity (W)", value: "4 kg" },
            { label: "Item 1", value: "wt=1, val=$15" },
            { label: "Item 2", value: "wt=2, val=$20" },
            { label: "Item 3", value: "wt=3, val=$30" },
          ],
          steps: [
            {
              stepNumber: 1,
              title: "State Definition & Base Cases",
              formula: "DP[i][w] = \\max(DP[i-1][w], \\; val_i + DP[i-1][w - wt_i])",
              explanation: "Row i corresponds to items 1..i; Column w corresponds to capacity 0..W. Row 0 and Col 0 are initialized to 0.",
              result: "DP matrix of size 4 × 5 initialized",
            },
            {
              stepNumber: 2,
              title: "Fill Row 1 (Item 1: wt=1, val=15)",
              formula: "For w ≥ 1: DP[1][w] = 15",
              explanation: "Item 1 fits in any capacity w ≥ 1.",
              result: "Row 1: [0, 15, 15, 15, 15]",
            },
            {
              stepNumber: 3,
              title: "Fill Row 2 (Item 2: wt=2, val=20)",
              formula: "w=3: max(15, 20 + DP[1][1]=15) = 35",
              explanation: "At w=3, we can take Item 2 ($20) + Item 1 ($15) = $35.",
              result: "Row 2: [0, 15, 20, 35, 35]",
            },
            {
              stepNumber: 4,
              title: "Fill Row 3 (Item 3: wt=3, val=30)",
              formula: "w=4: max(35, 30 + DP[2][1]=15) = 45",
              explanation: "At w=4, taking Item 3 ($30) + Item 1 ($15) gives $45 > $35.",
              result: "Row 3: [0, 15, 20, 35, 45]",
            },
          ],
          finalAnswer: "Max Value = $45 (Items 1 and 3)",
          handwrittenTakeaway: "✎ total space complexity can be optimized from O(n·W) to O(W) using a single 1D array filled from right to left!",
        },
      },
      {
        id: "algo-p4",
        pageNumber: 4,
        title: "Dijkstra vs Bellman-Ford Comparison",
        type: "comparison",
        tag: "Shortest Paths",
        content: {
          heading: "4. Single Source Shortest Path Tradeoffs",
          columns: ["Dijkstra's Algorithm", "Bellman-Ford Algorithm"],
          rows: [
            {
              criterion: "Time Complexity",
              col1: "O((V + E) log V) with Min-Heap / Priority Queue.",
              col2: "O(V · E) with simple edge relaxation loops.",
            },
            {
              criterion: "Negative Edge Weights",
              col1: "FAILS completely if negative edge weights exist (greedy assumption broken).",
              col2: "Handles negative edge weights correctly.",
            },
            {
              criterion: "Negative Cycle Detection",
              col1: "Cannot detect negative cycles.",
              col2: "Detects negative weight cycles: relaxes edges a V-th time; if any dist decreases, cycle exists.",
            },
            {
              criterion: "Algorithmic Paradigm",
              col1: "Greedy: permanently finalizes closest unvisited vertex.",
              col2: "Dynamic Programming: iteratively propagates relaxation along paths of length 1..V-1.",
            },
          ],
          handwrittenTakeaway: "✎ If all weights are positive, always pick Dijkstra. If negative edges exist or cycle detection is required, pick Bellman-Ford.",
        },
      },
      {
        id: "algo-p5",
        pageNumber: 5,
        title: "1-Minute Rapid Exam Revision",
        type: "revision",
        tag: "Exam Anchor",
        content: {
          heading: "5. Algorithm Complexity & Recurrence Cheat Card",
          coreRule: "Greedy algorithms make a locally optimal choice in hopes of finding a global optimum. Dynamic programming explores all overlapping subproblems with memoization.",
          mustRemember: [
            "Floyd-Warshall: All-Pairs Shortest Path in O(V^3). Distance matrix D[i][j] = min(D[i][j], D[i][k] + D[k][j]).",
            "Kruskal's Algorithm: Sort edges O(E log E) + Disjoint Set Union (DSU) with path compression O(E α(V)).",
            "Prim's Algorithm: O((V + E) log V) using Min-Heap, grows a single connected tree outward.",
          ],
          criticalTraps: [
            "Trap 1: Topological Sort is valid ONLY for Directed Acyclic Graphs (DAGs).",
            "Trap 2: 0/1 Knapsack is NP-Complete (pseudo-polynomial O(n·W)), whereas Fractional Knapsack is Greedy O(n log n).",
          ],
        },
      },
    ],
  },

  // ── 04. COMPUTER NETWORKS ──────────────────────────────────────
  {
    id: "computer-networks",
    status: "active",
    title: "Computer Networks",
    code: "CS-03",
    slug: "computer-networks",
    tagline: "How packet flows, sliding windows, CIDR subnetting & TCP traverse the globe.",
    description: "Transmission vs propagation delay equations, sliding window efficiency, Go-Back-N vs Selective Repeat, CRC polynomials, CIDR subnet masking, and TCP congestion control.",
    level: "B.Tech · GATE CS",
    accentColor: "cyan",
    accentHex: "#06b6d4",
    stats: {
      sectionsCount: 9,
      notesCount: 10,
      labsCount: 6,
      pyqsCount: 36,
    },
    coverAnnotation: "✎ benchmark complete",
    previewSnippets: [
      {
        title: "OSI vs TCP/IP Layering",
        teaser: "Encapsulation: Data → Segment → Packet → Frame → Bits",
        type: "diagram",
      },
      {
        title: "Sliding Window Efficiency",
        teaser: "Formula: η = N / (1 + 2a), where a = T_prop / T_tx",
        type: "formula",
      },
      {
        title: "TCP Congestion Control",
        teaser: "Slow Start, Congestion Avoidance, Fast Retransmit (Tahoe vs Reno)",
        type: "concept",
      },
    ],
    pages: [
      {
        id: "cn-p1",
        pageNumber: 1,
        title: "Packet Switching Delays & Bandwidth-Delay Product",
        type: "concept",
        tag: "Physical & Link",
        content: {
          heading: "1. The Four Fundamental Delays in Packet Switching",
          subheading: "Nodal Delay = Processing + Queuing + Transmission + Propagation",
          handwrittenNote: "✎ transmission delay is pumping bits onto the wire; propagation delay is light traveling through glass",
          paragraphs: [
            "A packet encounters four sources of delay at each intermediate router on the Internet: Nodal Processing delay ($d_{proc}$), Queuing delay ($d_{queue}$), Transmission delay ($d_{trans} = L / R$), and Propagation delay ($d_{prop} = d / s$).",
            "Students frequently confuse transmission and propagation. Transmission delay depends on packet length L and link bandwidth R. Propagation delay depends purely on physical distance d and the speed of light in fiber s ($2 \\times 10^8$ m/s).",
          ],
          callout: {
            kind: "exam-tip",
            title: "Bandwidth-Delay Product (BDP)",
            message: "BDP = Bandwidth × RTT. It measures the maximum number of bits that can be in flight in the network 'pipe' at any single instant.",
          },
          bullets: [
            "Transmission: L / R. If you increase link bandwidth, transmission delay drops.",
            "Propagation: d / s. Bandwidth does NOT change propagation delay; only shorter distance does.",
          ],
          keyTakeaway: "In satellite links, propagation delay dominates; on 100Gbps LANs, transmission delay is negligible.",
        },
      },
      {
        id: "cn-p2",
        pageNumber: 2,
        title: "OSI 7-Layer vs TCP/IP 4-Layer Architecture",
        type: "diagram",
        tag: "Layering Model",
        content: {
          heading: "2. Protocol Stack & Data Encapsulation",
          subheading: "Header Prepending & Peer-to-Peer Logical Communication",
          handwrittenNote: "✎ Application (data) → Transport (segment) → Network (packet) → Data Link (frame) → Physical (bits)",
          customKey: "cn-osi-layers",
          caption: "Figure 4.1: End-to-end data encapsulation through router hops.",
          notes: [
            "Routers operate up to Layer 3 (Network Layer, IP header).",
            "Switches operate up to Layer 2 (Data Link Layer, MAC header).",
            "End hosts process all 7 layers.",
          ],
        },
      },
      {
        id: "cn-p3",
        pageNumber: 3,
        title: "Sliding Window Protocols: GBN vs Selective Repeat",
        type: "comparison",
        tag: "Flow Control",
        content: {
          heading: "3. Flow Control: Go-Back-N vs Selective Repeat",
          columns: ["Go-Back-N (GBN)", "Selective Repeat (SR)"],
          rows: [
            {
              criterion: "Sender Window Size (Ws)",
              col1: "Ws = 2^k - 1 (for k-bit sequence numbers).",
              col2: "Ws = 2^{k - 1}.",
            },
            {
              criterion: "Receiver Window Size (Wr)",
              col1: "Wr = 1 (rejects out-of-order packets immediately).",
              col2: "Wr = Ws = 2^{k - 1} (buffers out-of-order packets).",
            },
            {
              criterion: "Retransmission on Loss",
              col1: "Retransmits packet N and ALL subsequent packets in flight.",
              col2: "Retransmits ONLY the individual lost packet (individual timers).",
            },
            {
              criterion: "ACK Type",
              col1: "Cumulative ACK: ACK n confirms all packets up to n.",
              col2: "Individual Selective ACK (SACK): confirms specific packet.",
            },
          ],
          handwrittenTakeaway: "✎ Condition to prevent sequence number wrap-around ambiguity: Ws + Wr ≤ 2^k.",
        },
      },
      {
        id: "cn-p4",
        pageNumber: 4,
        title: "1-Minute Rapid Exam Revision",
        type: "revision",
        tag: "Exam Anchor",
        content: {
          heading: "4. Computer Networks Rapid Memory Anchor",
          coreRule: "Stop-and-Wait efficiency is η = 1 / (1 + 2a), where a = T_prop / T_trans. For 100% efficiency in pipeline protocols, window size must be N ≥ 1 + 2a.",
          mustRemember: [
            "CRC Division: For a generator polynomial of degree r, append r zeros to the data. Modulo-2 division (XOR) yields an r-bit remainder.",
            "Subnetting: /24 has 256 IPs (254 usable). /26 has 64 IPs (62 usable, subtracting Network ID & Broadcast ID).",
            "TCP Reno vs Tahoe: Tahoe resets cwnd to 1 on ANY loss. Reno resets cwnd to cwnd/2 on 3 duplicate ACKs (Fast Recovery).",
          ],
          criticalTraps: [
            "Trap 1: CSMA/CD minimum frame length equation is L_min = 2 × T_prop × Bandwidth.",
            "Trap 2: Distance Vector routing suffers from Count-to-Infinity. Link State (Dijkstra) does not.",
          ],
        },
      },
    ],
  },

  // ── 05. COMPUTER ORGANIZATION & ARCHITECTURE ───────────────────
  {
    id: "computer-organization",
    status: "active",
    title: "Computer Organization & Architecture",
    code: "CS-04",
    slug: "computer-organization",
    tagline: "Master instruction formats, addressing modes, IEEE 754 floats, Booth's multiplication, cache mapping, AMAT, 5-stage pipelining hazards, microprogramming, and DMA.",
    description: "Addressing modes, expanding opcodes, datapath timing, IEEE 754 floating-point standard, Booth's multiplication, restoring/non-restoring division, cache bit-splitting, multi-level AMAT, 5-stage RISC instruction pipelining, RAW hazard forwarding, branch penalties, hardwired and microprogrammed control units, and interrupt/DMA I/O transfer.",
    level: "B.Tech · GATE CS",
    accentColor: "amber",
    accentHex: "#f59e0b",
    stats: {
      sectionsCount: 5,
      notesCount: 10,
      labsCount: 0,
      pyqsCount: 0,
    },
    coverAnnotation: "✎ verified with Patterson-Hennessy & Hamacher",
    previewSnippets: [
      {
        title: "Instruction Pipeline Hazards",
        teaser: "RAW, WAR, WAW data dependencies & branch penalties",
        type: "diagram",
      },
      {
        title: "Cache Mapping Math",
        teaser: "Tag, Set Index, and Block Offset bit allocation",
        type: "formula",
      },
    ],
    pages: [
      {
        id: "coa-p1",
        pageNumber: 1,
        title: "Pipelining & Speedup Derivation",
        type: "concept",
        tag: "Processor Design",
        content: {
          heading: "1. The 5-Stage Classic RISC Pipeline",
          subheading: "Instruction Fetch (IF) → Decode (ID) → Execute (EX) → Memory (MEM) → Writeback (WB)",
          handwrittenNote: "✎ pipelining increases instruction throughput; it does NOT reduce latency of an individual instruction!",
          paragraphs: [
            "In an unpipelined processor, an instruction must complete all stages before the next instruction begins execution. In a pipelined processor, multiple instructions execute concurrently across different stages.",
            "For n instructions executed on a k-stage pipeline with clock cycle time τ: the unpipelined execution time is $T_{seq} = n \\times k \\times \\tau$. Pipelined execution time is $T_{pipe} = (k + n - 1) \\times \\tau$.",
          ],
          callout: {
            kind: "exam-tip",
            title: "Ideal Pipeline Speedup",
            message: "Speedup S = T_seq / T_pipe = (n × k × τ) / ((k + n - 1) × τ). As n → ∞, Speedup S → k (the number of stages).",
          },
          bullets: [
            "Structural Hazard: Hardware resource collision (e.g. unified memory accessed for both IF and MEM simultaneously).",
            "Data Hazard (RAW): An instruction depends on the result of an earlier instruction still in the pipeline.",
            "Control Hazard: Branch outcome not known until EX or MEM stage.",
          ],
          keyTakeaway: "Operand forwarding resolves RAW hazards without stalls if the producer is ALU and consumer is ALU.",
        },
      },
      {
        id: "coa-p2",
        pageNumber: 2,
        title: "Pipeline Hazards & Operand Forwarding",
        type: "diagram",
        tag: "Hardware Architecture",
        content: {
          heading: "2. Forwarding Datapath: EX/MEM → ID/EX",
          subheading: "Bypassing the Register File to Prevent Stalls",
          handwrittenNote: "✎ forwarding feeds ALU result directly into the next cycle's ALU input multiplexer",
          customKey: "coa-pipeline-hazards",
          caption: "Figure 5.1: 5-Stage RISC Datapath with ALU-to-ALU Forwarding Path.",
          notes: [
            "Load-Use hazard: Cannot be solved by forwarding alone! A 1-cycle stall is strictly required when a load is followed immediately by an arithmetic instruction using its result.",
          ],
        },
      },
      {
        id: "coa-p3",
        pageNumber: 3,
        title: "1-Minute Rapid Exam Revision",
        type: "revision",
        tag: "Exam Anchor",
        content: {
          heading: "3. Computer Organization Cheat Card",
          coreRule: "In set-associative cache mapping: Physical Address Bits = Tag Bits + Set Index Bits + Block Offset Bits.",
          mustRemember: [
            "IEEE 754 Single Precision: 32 bits = 1 Sign + 8 Exponent (bias 127) + 23 Mantissa. Value = (-1)^S × 1.M × 2^{E - 127}.",
            "Little Endian: Least significant byte stored at the lowest memory address.",
            "Booth's Algorithm: Inspect bits (Qi, Qi+1). (0, 1) → Add multiplicand. (1, 0) → Subtract multiplicand. (0, 0) or (1, 1) → Arithmetic Right Shift only.",
          ],
          criticalTraps: [
            "Trap 1: Number of sets = Cache Size / (Associativity × Block Size).",
            "Trap 2: Write-back caches require a Dirty Bit per cache line; write-through caches do not.",
          ],
        },
      },
    ],
  },

  // ── 06. THEORY OF COMPUTATION ──────────────────────────────────
  {
    id: "theory-of-computation",
    status: "active",
    title: "Theory of Computation",
    code: "CS-05",
    slug: "theory-of-computation",
    tagline: "Master minimal DFAs, Pumping Lemmas, Pushdown Automata, Turing Machine proofs, Chomsky hierarchy, and Rice's theorem.",
    description: "Deterministic and Non-deterministic Finite Automata (DFA/NFA), Myhill-Nerode minimization, Arden's theorem, Pumping Lemmas for Regular and Context-Free languages, DPDA vs NPDA power asymmetry, DCFL and CFL closure properties, CYK algorithm, Turing Machine formal models, Recursive vs Recursively Enumerable languages, Halting problem diagonalization proofs, Rice's theorem, Post Correspondence Problem (PCP), and the complete 4-tier Chomsky hierarchy.",
    level: "B.Tech · GATE CS",
    accentColor: "rose",
    accentHex: "#f43f5e",
    stats: {
      sectionsCount: 5,
      notesCount: 10,
      labsCount: 0,
      pyqsCount: 0,
    },
    coverAnnotation: "✎ verified with Hopcroft-Ullman & Sipser",
    previewSnippets: [
      {
        title: "DFA State Transition",
        teaser: "5-tuple definition: (Q, Σ, δ, q0, F) and dead states",
        type: "diagram",
      },
      {
        title: "Chomsky Hierarchy",
        teaser: "Regular ⊂ CFL ⊂ CSL ⊂ Recursive ⊂ RE",
        type: "concept",
      },
    ],
    pages: [
      {
        id: "toc-p1",
        pageNumber: 1,
        title: "The Chomsky Hierarchy & Machine Equivalence",
        type: "concept",
        tag: "Formal Automata",
        content: {
          heading: "1. The Four Language Classes and Their Automata",
          subheading: "Finite Automata → Pushdown Automata → Linear Bounded Automata → Turing Machines",
          handwrittenNote: "✎ Regular has zero memory; CFL has stack memory; Turing Machine has infinite tape",
          paragraphs: [
            "The Chomsky hierarchy classifies formal grammars and languages by their expressive power. Every regular language is context-free, every context-free language is context-sensitive, and every context-sensitive language is decidable (recursive).",
            "A language like L = {a^n b^n | n ≥ 0} cannot be recognized by a Finite Automaton because an FA has finite states and cannot count an unbounded n. A Pushdown Automaton uses a stack to match counts.",
          ],
          callout: {
            kind: "exam-tip",
            title: "Rice's Theorem",
            message: "Any non-trivial semantic property of the language recognized by a Turing Machine is UNDECIDABLE. (e.g. Is L(M) empty? Is L(M) regular? Does L(M) contain the string 'hello'?).",
          },
          bullets: [
            "Type 3: Regular (DFA/NFA) — Kleene closure, union, intersection closed.",
            "Type 2: Context-Free (NPDA) — NOT closed under intersection or complementation!",
            "Type 1: Context-Sensitive (LBA).",
            "Type 0: Recursively Enumerable (Turing Machine).",
          ],
          keyTakeaway: "Halting Problem of Turing Machine is undecidable and semi-decidable (recursively enumerable).",
        },
      },
      {
        id: "toc-p2",
        pageNumber: 2,
        title: "DFA State Transition Graph",
        type: "diagram",
        tag: "Automata Graph",
        content: {
          heading: "2. Minimal DFA for Substrings and Divisibility",
          subheading: "State Elimination & Myhill-Nerode Equivalence Classes",
          handwrittenNote: "✎ DFA for strings containing '010': state tracks length of matched prefix",
          customKey: "toc-dfa-state",
          caption: "Figure 6.1: Deterministic Finite Automaton with alphabet Σ = {0, 1}.",
          notes: [
            "Every NFA with k states can be converted to an equivalent DFA with at most 2^k states.",
          ],
        },
      },
      {
        id: "toc-p3",
        pageNumber: 3,
        title: "1-Minute Rapid Exam Revision",
        type: "revision",
        tag: "Exam Anchor",
        content: {
          heading: "3. Theory of Computation Cheat Card",
          coreRule: "Regular languages are closed under ALL boolean operations (Union, Intersection, Complement, Reverse, Kleene Star). Context-Free Languages are NOT closed under Intersection or Complement.",
          mustRemember: [
            "Pumping Lemma for Regular: string s = xyz with |y| ≥ 1 and |xy| ≤ p, such that x y^i z ∈ L for all i ≥ 0.",
            "DPDA vs NPDA: Deterministic CFLs are a STRICT subset of non-deterministic CFLs. DCFLs are closed under complementation!",
            "Undecidable for CFL: Ambiguity of CFG is undecidable. Equivalence L(G1) = L(G2) for CFGs is undecidable.",
          ],
          criticalTraps: [
            "Trap 1: If L is regular, then Subset(L) is NOT necessarily regular (e.g. {a^n b^n} is a subset of a*b*).",
            "Trap 2: Every finite language is REGULAR.",
          ],
        },
      },
    ],
  },

  // ── 07. PROGRAMMING IN C ───────────────────────────────────────
  {
    id: "programming-in-c",
    status: "active",
    title: "Programming in C",
    code: "CS-06",
    slug: "programming-in-c",
    tagline: "Master pointer arithmetic, recursion tree tracing, array-decay rules, structure padding, preprocessor macros, and storage classes.",
    description: "Operator precedence, right-to-left associativity, short-circuit evaluation, storage classes (auto, static, extern, register), pointer arithmetic, array decay, multi-dimensional row-major mapping, double pointers, function pointers, activation records, stack frames, recursion tracing, structure padding and alignment, unions and bit-fields, dynamic memory management (malloc, calloc, realloc, free), preprocessor macro expansion, and formatted file I/O.",
    level: "B.Tech · GATE CS",
    accentColor: "teal",
    accentHex: "#14b8a6",
    stats: {
      sectionsCount: 5,
      notesCount: 10,
      labsCount: 0,
      pyqsCount: 0,
    },
    coverAnnotation: "✎ verified with Kernighan-Ritchie & ISO C99 Standard",
    previewSnippets: [
      {
        title: "2D Array Pointer Decay",
        teaser: "arr vs &arr vs arr[0]: scale factor differences in bytes",
        type: "diagram",
      },
      {
        title: "Structure Padding & Alignment",
        teaser: "Offset rules: members aligned to multiples of their own size",
        type: "concept",
      },
    ],
    pages: [
      {
        id: "c-p1",
        pageNumber: 1,
        title: "Pointers & 2D Array Memory Decay",
        type: "concept",
        tag: "Memory Model",
        content: {
          heading: "1. The Truth About Array Names in C",
          subheading: "Why an Array is NOT a Pointer Variable, but Decays to One",
          handwrittenNote: "✎ sizeof(arr) gives total array bytes; but passing arr into a function decays it to a bare pointer!",
          paragraphs: [
            "In C, an array name is a constant label for a contiguous memory block. Except when used as the operand of `sizeof` or the address-of operator `&`, an array expression of type 'array of T' automatically decays into a pointer of type 'pointer to T' pointing to the first element.",
            "For a 2D array `int arr[3][4]`: `arr` has type `int (*)[4]` (pointer to an array of 4 integers). `*arr` has type `int*` (pointer to the first integer). `&arr` has type `int (*)[3][4]` (pointer to the entire 2D matrix). All three share the exact same numeric memory address, but their pointer arithmetic scale factors differ completely!",
          ],
          callout: {
            kind: "trap",
            title: "Pointer Arithmetic Scale Factor",
            message: "arr + 1 jumps 4 * sizeof(int) = 16 bytes.\n&arr + 1 jumps 3 * 4 * sizeof(int) = 48 bytes.\n*arr + 1 jumps 1 * sizeof(int) = 4 bytes.",
          },
          bullets: [
            "`*(arr + i) + j` is exactly equivalent to `&arr[i][j]`.",
            "`*(*(arr + i) + j)` is exactly equivalent to `arr[i][j]`.",
          ],
          keyTakeaway: "C arrays are row-major: elements of the first row are placed in contiguous memory before elements of the second row.",
        },
      },
      {
        id: "c-p2",
        pageNumber: 2,
        title: "Pointer Arithmetic & Memory Map",
        type: "diagram",
        tag: "Memory Map",
        content: {
          heading: "2. Contiguous Physical Memory Layout of 2D Array",
          subheading: "Row-Major Ordering & Byte Offset Calculations",
          handwrittenNote: "✎ memory address of arr[i][j] = Base + (i * Cols + j) * sizeof(Type)",
          customKey: "c-pointer-memory",
          caption: "Figure 7.1: Physical address byte offsets in an int arr[3][4] memory layout.",
          notes: [
            "In 1D array decay: int arr[5]; &arr + 1 skips all 5 integers.",
          ],
        },
      },
      {
        id: "c-p3",
        pageNumber: 3,
        title: "1-Minute Rapid Exam Revision",
        type: "revision",
        tag: "Exam Anchor",
        content: {
          heading: "3. C Programming Exam Trap Card",
          coreRule: "Structure alignment: Every struct member must begin at an offset that is an integer multiple of its own data type size. Total struct size must be an integer multiple of the largest member.",
          mustRemember: [
            "Precedence: *p++ evaluates as *(p++). Post-increment has higher precedence than dereference *.",
            "Static variables in functions are allocated in the BSS/Data segment, initialized once at program load, and persist across function calls.",
            "String literals (char *s = 'hello') are stored in read-only text segment. Modifying s[0] causes a Segmentation Fault. Use char s[] = 'hello' for mutable arrays.",
          ],
          criticalTraps: [
            "Trap 1: sizeof(char) is ALWAYS 1 by definition in the C standard.",
            "Trap 2: In C, parameters are passed strictly BY VALUE. To achieve pass-by-reference, explicitly pass a pointer.",
          ],
        },
      },
    ],
  },

  // ── 08. DISCRETE MATHEMATICS ───────────────────────────────────
  {
    id: "discrete-mathematics",
    status: "active",
    title: "Discrete Mathematics",
    code: "CS-07",
    slug: "discrete-mathematics",
    tagline: "Master mathematical logic, first-order quantifiers, relation closures, POSET lattices, cyclic groups, combinatorics, recurrence relations, planar graphs, and chromatic coloring.",
    description: "A rigorous, foundational study notebook covering propositional logic equivalences, first-order predicate quantifiers, relation counting, Hasse diagrams, complemented distributive lattices, group theory and Lagrange's theorem, generating functions, Euler's planar formula, and Hall's matching theorem for B.Tech semester exams and top-rank GATE CS/IT & DA preparation.",
    level: "B.Tech · GATE CS & DA",
    accentColor: "indigo",
    accentHex: "#6366f1",
    stats: {
      sectionsCount: 5,
      notesCount: 11,
      labsCount: 0,
      pyqsCount: 0,
    },
    coverAnnotation: "✎ verified with Kenneth Rosen & Tremblay-Manohar",
    previewSnippets: [
      {
        title: "POSETs & Hasse Diagrams",
        teaser: "Reflexive, Antisymmetric, Transitive relations and Lattices",
        type: "concept",
      },
      {
        title: "Planar Graph Euler Formula",
        teaser: "V - E + F = 2 and edge boundary inequalities",
        type: "formula",
      },
    ],
    pages: [
      {
        id: "dm-p1",
        pageNumber: 1,
        title: "Partial Orders, Hasse Diagrams & Lattices",
        type: "concept",
        tag: "Relation Theory",
        content: {
          heading: "1. What Makes a Relation a POSET?",
          subheading: "Reflexive + Antisymmetric + Transitive",
          handwrittenNote: "✎ a Lattice is a POSET where every pair of elements has a unique LUB (join ∨) and GLB (meet ∧)",
          paragraphs: [
            "A binary relation R on set A is a Partial Order if it satisfies three axioms: Reflexivity (aRa for all a), Antisymmetry (if aRb and bRa then a = b), and Transitivity (if aRb and bRc then aRc). The pair (A, R) is called a POSET.",
            "A Hasse diagram is a visual graph of a finite POSET where transitive edges and reflexive self-loops are omitted, and larger elements are positioned above smaller elements.",
          ],
          callout: {
            kind: "exam-tip",
            title: "Lattice Verification Rule",
            message: "For any two elements x and y in a lattice, their Least Upper Bound (LUB = x ∨ y) and Greatest Lower Bound (GLB = x ∧ y) must exist AND be unique.",
          },
          bullets: [
            "Divisibility Relation on D_30 = {1, 2, 3, 5, 6, 10, 15, 30} forms a complemented distributive lattice (Boolean Algebra).",
            "Total Order: A partial order where every pair of elements is comparable (a ≤ b or b ≤ a).",
          ],
          keyTakeaway: "Every finite distributive lattice is isomorphic to a ring of sets (Birkhoff's representation theorem).",
        },
      },
      {
        id: "dm-p2",
        pageNumber: 2,
        title: "1-Minute Rapid Exam Revision",
        type: "revision",
        tag: "Exam Anchor",
        content: {
          heading: "2. Discrete Mathematics Cheat Card",
          coreRule: "Euler's Formula for connected planar graphs: V - E + F = 2. For any simple connected planar graph with V ≥ 3: E ≤ 3V - 6.",
          mustRemember: [
            "K_5 (complete graph on 5 vertices) and K_{3,3} (complete bipartite) are NON-PLANAR (Kuratowski's Theorem).",
            "Handshaking Lemma: The sum of degrees of all vertices equals 2 × Number of Edges: ∑ deg(v) = 2E.",
            "Logical Implication: p → q is equivalent to ¬p ∨ q. The contrapositive (¬q → ¬p) is logically equivalent to the original statement.",
          ],
          criticalTraps: [
            "Trap 1: The converse (q → p) and inverse (¬p → ¬q) are NOT logically equivalent to p → q.",
            "Trap 2: A graph has an Eulerian circuit iff it is connected and EVERY vertex has an EVEN degree.",
          ],
        },
      },
    ],
  },

  // ── 09. DATA STRUCTURES ────────────────────────────────────────
  {
    id: "data-structures",
    title: "Data Structures",
    code: "CS-11 / DA-05",
    slug: "data-structures",
    tagline: "The building blocks of efficient programs: balanced trees, heaps & hashing.",
    description: "Singly and doubly linked lists, stack evaluation of postfix expressions, queue implementations, AVL tree rotations, binary heaps, and collision resolution hashing.",
    level: "B.Tech · GATE CS & DA (6–8 Marks)",
    accentColor: "violet",
    accentHex: "#8b5cf6",
    stats: {
      sectionsCount: 5,
      notesCount: 10,
      labsCount: 0,
      pyqsCount: 0,
    },
    coverAnnotation: "✎ verified with CLRS, Horowitz-Sahni & Weiss · 10 lessons",
    status: "active",
    gateBranches: ["cs", "da"],
    previewSnippets: [
      {
        title: "AVL Tree Rotations",
        teaser: "LL, RR, LR, RL balancing rotations and balance factor ∈ {-1, 0, 1}",
        type: "concept",
      },
      {
        title: "Binary Heap Operations",
        teaser: "Build-Heap runs in O(n) linear time, NOT O(n log n)",
        type: "formula",
      },
    ],
    pages: [
      {
        id: "ds-p1",
        pageNumber: 1,
        title: "Self-Balancing Trees: AVL Rotations",
        type: "concept",
        tag: "Trees",
        content: {
          heading: "1. AVL Trees & Strict Height Balance",
          subheading: "Maintaining O(log n) Worst-Case Guarantees",
          handwrittenNote: "✎ Balance Factor = Height(Left) - Height(Right). Must stay in {-1, 0, +1}.",
          paragraphs: [
            "In an ordinary Binary Search Tree, inserting sorted data degenerates the tree into a linked list with O(n) search time. AVL trees enforce height balance after every insertion and deletion.",
            "When an insertion causes a node's balance factor to become +2 or -2, four rotation cases restore balance: Single Left (RR), Single Right (LL), Left-Right (LR), and Right-Left (RL).",
          ],
          callout: {
            kind: "exam-tip",
            title: "Minimum Nodes in AVL Tree of Height h",
            message: "N(h) = N(h-1) + N(h-2) + 1. Base cases: N(0) = 1, N(1) = 2, N(2) = 4, N(3) = 7. Growth mirrors the Fibonacci sequence.",
          },
          bullets: [
            "LL Imbalance: Fixed by a Single Right Rotation at critical node.",
            "RR Imbalance: Fixed by a Single Left Rotation at critical node.",
            "LR Imbalance: Fixed by Left rotation on child, then Right rotation on parent.",
            "RL Imbalance: Fixed by Right rotation on child, then Left rotation on parent.",
          ],
          keyTakeaway: "AVL trees are more strictly balanced than Red-Black trees, making AVL faster for lookup-intensive workloads.",
        },
      },
      {
        id: "ds-p2",
        pageNumber: 2,
        title: "1-Minute Rapid Exam Revision",
        type: "revision",
        tag: "Exam Anchor",
        content: {
          heading: "2. Data Structures Cheat Card",
          coreRule: "Build-Heap from an arbitrary array runs in O(n) time using bottom-up heapify. Successive insertions take O(n log n).",
          mustRemember: [
            "Postfix Evaluation: Read left to right. Push operands to stack. When operator encountered, pop top two operands, evaluate, push result.",
            "Binary Tree Traversal: In-order + Pre-order uniquely reconstructs a binary tree. In-order traversal of a BST ALWAYS yields sorted order.",
            "Hash Table Open Addressing: Quadratic probing suffers from secondary clustering. Double hashing eliminates both primary and secondary clustering.",
          ],
          criticalTraps: [
            "Trap 1: Pre-order + Post-order does NOT uniquely determine a general binary tree (unambiguous only for strictly full binary trees).",
            "Trap 2: Deleting from a singly linked list given only a pointer to that node: copy next node's data into current node and delete next node O(1).",
          ],
        },
      },
    ],
  },

  // ── 10. COMPILER DESIGN ────────────────────────────────────────
  {
    id: "compiler-design",
    title: "Compiler Design",
    code: "CS-13",
    slug: "compiler-design",
    tagline: "How high-level syntax translates into executable machine instructions.",
    description: "Lexical analysis DFAs, FIRST & FOLLOW sets, LL(1) parsing tables, LR(0)/SLR(1)/LALR(1)/CLR(1) state items, syntax-directed translation, and basic blocks.",
    level: "B.Tech · GATE CS",
    accentColor: "amber",
    accentHex: "#d97706",
    stats: {
      sectionsCount: 5,
      notesCount: 10,
      labsCount: 0,
      pyqsCount: 0,
    },
    coverAnnotation: "✎ benchmark complete · verified against standard dragon book references",
    isLocked: false,
    status: "active",
    previewSnippets: [
      {
        title: "Parsing Table Hierarchy",
        teaser: "LR(0) ⊂ SLR(1) ⊂ LALR(1) ⊂ CLR(1)",
        type: "concept",
      },
      {
        title: "FIRST and FOLLOW Rules",
        teaser: "Predictive LL(1) parsing table construction mechanics",
        type: "formula",
      },
    ],
    pages: [
      {
        id: "cd-p1",
        pageNumber: 1,
        title: "Bottom-Up LR Parsing Hierarchy",
        type: "concept",
        tag: "Syntax Analysis",
        content: {
          heading: "1. The Four LR Parsers and Their Power",
          subheading: "LR(0) → SLR(1) → LALR(1) → CLR(1)",
          handwrittenNote: "✎ CLR(1) is the most powerful; LALR(1) merges identical core states to keep tables tiny (used in Yacc/Bison)",
          paragraphs: [
            "Bottom-up parsers construct a parse tree from the leaves up to the root by identifying 'handles' and executing Shift and Reduce actions.",
            "LR(0) makes reduce decisions without lookahead. SLR(1) uses FOLLOW sets to restrict reductions. CLR(1) incorporates lookaheads directly into the items. LALR(1) merges states with identical LR(0) cores.",
          ],
          callout: {
            kind: "exam-tip",
            title: "Parser Power Relation",
            message: "LL(1) ⊂ SLR(1) ⊂ LALR(1) ⊂ CLR(1). CLR(1) recognizes the largest class of deterministic context-free grammars.",
          },
          bullets: [
            "LALR(1) has the EXACT same number of states as SLR(1) and LR(0).",
            "Merging states in LALR(1) can never produce Shift-Reduce conflicts, but CAN produce Reduce-Reduce conflicts.",
          ],
          keyTakeaway: "Every LL(1) grammar is an LR(1) grammar, but not all LR(1) grammars are LL(1).",
        },
      },
      {
        id: "cd-p2",
        pageNumber: 2,
        title: "1-Minute Rapid Exam Revision",
        type: "revision",
        tag: "Exam Anchor",
        content: {
          heading: "2. Compiler Design Cheat Card",
          coreRule: "A grammar with left recursion can NEVER be parsed by top-down LL(1) parsers.",
          mustRemember: [
            "S-attributed definitions evaluate synthesized attributes bottom-up during LR parsing.",
            "L-attributed definitions allow synthesized attributes and inherited attributes from parent and left siblings only.",
            "Static single-assignment form (SSA): each variable is defined exactly once, simplifying register allocation and dead code elimination.",
          ],
          criticalTraps: [
            "Trap 1: Ambiguous grammars are NEVER LL(k) or LR(k) for any k.",
            "Trap 2: Lexical analysis does NOT detect undeclared variables or type mismatches (that is Semantic Analysis).",
          ],
        },
      },
    ],
  },

  // ── 11. DIGITAL LOGIC ──────────────────────────────────────────
  {
    id: "digital-logic",
    title: "Digital Logic",
    code: "CS-10",
    slug: "digital-logic",
    tagline: "From Boolean algebra and K-maps to synchronous sequential circuits.",
    description: "Karnaugh map minimization with don't-care conditions, multiplexer logic synthesizers, decoders, full adders, flip-flop conversions, and synchronous counter design.",
    level: "B.Tech · GATE CS",
    accentColor: "teal",
    accentHex: "#0d9488",
    stats: {
      sectionsCount: 5,
      notesCount: 10,
      labsCount: 0,
      pyqsCount: 0,
    },
    coverAnnotation: "✎ benchmark complete · verified against standard mano references",
    isLocked: false,
    status: "active",
    previewSnippets: [
      {
        title: "K-Map Gray Code Grouping",
        teaser: "Prime implicants, essential prime implicants & don't cares",
        type: "concept",
      },
      {
        title: "Multiplexer Logic Synthesis",
        teaser: "Implementing any n-variable function using a 2^{n-1} to 1 MUX",
        type: "formula",
      },
    ],
    pages: [
      {
        id: "dl-p1",
        pageNumber: 1,
        title: "Multiplexers as Universal Logic Modules",
        type: "concept",
        tag: "Combinational Circuits",
        content: {
          heading: "1. Implementing Boolean Functions with MUX",
          subheading: "Synthesizing n-Variable Logic with a 2^{n-1} to 1 Multiplexer",
          handwrittenNote: "✎ connect n-1 variables to select lines; connect 0, 1, variable, or complement to inputs",
          paragraphs: [
            "A multiplexer is a combinational circuit that selects binary information from one of $2^n$ input lines and directs it to a single output line based on n selection lines.",
            "Because an n-to-1 MUX generates all minterms of the select inputs, any n-variable Boolean function can be implemented using a $2^{n-1}$ to 1 MUX without any external logic gates.",
          ],
          callout: {
            kind: "exam-tip",
            title: "Universal Gates",
            message: "NAND and NOR are universal gates. A 2-to-1 MUX is also a universal logic element (can implement NOT, AND, OR, XOR).",
          },
          bullets: [
            "Full Adder using 4-to-1 MUX: Sum = A ⊕ B ⊕ Cin; Carry = AB + Cin(A ⊕ B).",
            "Shannon's Expansion Theorem: f(A, B, C) = A · f(1, B, C) + A' · f(0, B, C).",
          ],
          keyTakeaway: "Multiplexer implementations require fewer pins and chips than discrete gate implementations.",
        },
      },
      {
        id: "dl-p2",
        pageNumber: 2,
        title: "1-Minute Rapid Exam Revision",
        type: "revision",
        tag: "Exam Anchor",
        content: {
          heading: "2. Digital Logic Cheat Card",
          coreRule: "In synchronous counters, all flip-flops are clocked simultaneously by the same master clock. In ripple (asynchronous) counters, the output of one flip-flop clocks the next.",
          mustRemember: [
            "JK Flip-Flop Characteristic Equation: Q_{next} = J Q' + K' Q. Toggle occurs when J=1, K=1.",
            "T Flip-Flop Equation: Q_{next} = T ⊕ Q.",
            "De Morgan's Laws: (A + B)' = A' · B' and (A · B)' = A' + B'.",
          ],
          criticalTraps: [
            "Trap 1: Race-around condition occurs in JK latch when J=1, K=1, and clock pulse duration tp > propagation delay tg. Solution: Master-Slave or Edge-Triggered flip-flops.",
            "Trap 2: A Mod-N counter has N distinct states (0 to N-1) and requires ⌈log2(N)⌉ flip-flops.",
          ],
        },
      },
    ],
  },

  // ── 12. ENGINEERING MATHEMATICS ────────────────────────────────
  {
    id: "engineering-mathematics",
    title: "Engineering Mathematics",
    code: "CS-12",
    slug: "engineering-mathematics",
    tagline: "Linear algebra, matrix eigenvalues, vector calculus & probability distributions.",
    description: "Matrix rank, system of linear equations consistency, eigenvalues and eigenvectors, Cayley-Hamilton theorem, Bayes' Theorem, Poisson and normal distributions.",
    level: "B.Tech · GATE CS",
    accentColor: "indigo",
    accentHex: "#4f46e5",
    stats: {
      sectionsCount: 5,
      notesCount: 10,
      labsCount: 2,
      pyqsCount: 40,
    },
    coverAnnotation: "✎ benchmark complete",
    status: "active",
    previewSnippets: [
      {
        title: "Eigenvalues & Cayley-Hamilton",
        teaser: "Sum = Trace(A), Product = Det(A), Matrix satisfies own char poly",
        type: "concept",
      },
      {
        title: "Bayes Theorem & Conditional Prob",
        teaser: "Posterior = (Likelihood × Prior) / Evidence",
        type: "formula",
      },
    ],
    pages: [
      {
        id: "em-p1",
        pageNumber: 1,
        title: "Eigenvalues, Eigenvectors & Cayley-Hamilton",
        type: "concept",
        tag: "Linear Algebra",
        content: {
          heading: "1. Spectral Theory of Square Matrices",
          subheading: "Characteristic Equation: det(A - λI) = 0",
          handwrittenNote: "✎ Sum of eigenvalues = Trace (sum of main diagonal elements); Product = Determinant!",
          paragraphs: [
            "An eigenvector x of a square matrix A is a non-zero vector that, when multiplied by A, simply scales by a factor λ (the eigenvalue): Ax = λx.",
            "The Cayley-Hamilton theorem states that every square matrix satisfies its own characteristic equation. This provides an elegant method to calculate high powers of matrices $A^n$ and matrix inverses $A^{-1}$.",
          ],
          callout: {
            kind: "exam-tip",
            title: "Properties of Eigenvalues",
            message: "1. Eigenvalues of a triangular matrix are its main diagonal elements.\n2. Eigenvalues of a real symmetric matrix are ALWAYS real.\n3. Eigenvalues of an orthogonal matrix have absolute value |λ| = 1.",
          },
          bullets: [
            "If A has eigenvalues λ1, λ2, ..., λn, then A^k has eigenvalues λ1^k, λ2^k, ..., λn^k.",
            "A is invertible (non-singular) if and only if 0 is NOT an eigenvalue of A.",
          ],
          keyTakeaway: "Eigenvector directions remain invariant under the linear transformation represented by A.",
        },
      },
      {
        id: "em-p2",
        pageNumber: 2,
        title: "1-Minute Rapid Exam Revision",
        type: "revision",
        tag: "Exam Anchor",
        content: {
          heading: "2. Engineering Mathematics Cheat Card",
          coreRule: "System of linear equations AX = B: Consistent with unique solution iff Rank(A) = Rank([A|B]) = n (number of variables). Consistent with infinite solutions iff Rank(A) = Rank([A|B]) < n.",
          mustRemember: [
            "Bayes' Rule: P(A|B) = P(B|A) · P(A) / P(B).",
            "Poisson Distribution: P(X = k) = (λ^k · e^{-λ}) / k!. Mean = λ, Variance = λ.",
            "Normal Distribution: 68.2% data within μ ± σ; 95.4% within μ ± 2σ; 99.7% within μ ± 3σ.",
          ],
          criticalTraps: [
            "Trap 1: If Rank(A) ≠ Rank([A|B]), the system is INCONSISTENT (zero solutions).",
            "Trap 2: For independent events, P(A ∩ B) = P(A) · P(B); for mutually exclusive events, P(A ∩ B) = 0.",
          ],
        },
      },
    ],
  },

  // ── 13. GENERAL APTITUDE ───────────────────────────────────────
  {
    id: "general-aptitude",
    title: "General Aptitude",
    code: "CS-13",
    slug: "general-aptitude",
    tagline: "Numerical ability, verbal reasoning, spatial logic & analytical speed.",
    description: "Percentages, profit and loss, ratios, time and work, permutation and combinations, probability, syllogisms, and paper-folding spatial reasoning.",
    level: "B.Tech · GATE CS (15 Marks)",
    accentColor: "emerald",
    accentHex: "#059669",
    stats: {
      sectionsCount: 5,
      notesCount: 10,
      labsCount: 2,
      pyqsCount: 35,
    },
    coverAnnotation: "✎ benchmark complete",
    isLocked: false,
    status: "active",
    previewSnippets: [
      {
        title: "Time & Work Reciprocal Model",
        teaser: "Work done = Rate × Time, and LCM units method",
        type: "concept",
      },
      {
        title: "Spatial Reasoning Shortcuts",
        teaser: "Mirror planes, paper folding & cube rotation invariants",
        type: "formula",
      },
    ],
    pages: [
      {
        id: "ga-p1",
        pageNumber: 1,
        title: "Time & Work: The LCM Unit Method",
        type: "concept",
        tag: "Quantitative Aptitude",
        content: {
          heading: "1. Solving Work Problems Without Fractions",
          subheading: "Convert Total Work to LCM of Individual Time Periods",
          handwrittenNote: "✎ avoid 1/x + 1/y fraction math. Pick Total Work = LCM(days) and work with integer daily efficiencies!",
          paragraphs: [
            "Conventional school arithmetic solves time and work problems using fractions ($1/12 + 1/15$). In competitive examinations where speed is vital, the LCM method eliminates fractions completely.",
            "If Person A completes a job in 12 days and Person B in 15 days: let Total Work = LCM(12, 15) = 60 units. A's daily rate is $60/12 = 5$ units/day. B's daily rate is $60/15 = 4$ units/day. Combined rate = 9 units/day. Time taken = $60 / 9 = 6.67$ days.",
          ],
          callout: {
            kind: "exam-tip",
            title: "Pipes & Cisterns Inversion",
            message: "Inlet pipes add positive work (+ units/hr); leak/drain pipes perform negative work (- units/hr).",
          },
          bullets: [
            "Efficiency is inversely proportional to time taken when work is constant.",
            "Work = Efficiency × Time.",
          ],
          keyTakeaway: "Integer unit models reduce calculation errors by over 80% under timed exam pressure.",
        },
      },
      {
        id: "ga-p2",
        pageNumber: 2,
        title: "1-Minute Rapid Exam Revision",
        type: "revision",
        tag: "Exam Anchor",
        content: {
          heading: "2. General Aptitude Speed Card",
          coreRule: "Relative Speed: Moving in opposite directions → S1 + S2. Moving in same direction → |S1 - S2|.",
          mustRemember: [
            "Percentage Successive Change: Net % = a + b + (ab / 100).",
            "Permutation vs Combination: Order matters → nPr. Order does not matter (selection) → nCr.",
            "Syllogisms: 'Some A are B' does NOT imply 'Some A are not B'. Use Venn diagrams to check validity.",
          ],
          criticalTraps: [
            "Trap 1: Average speed for equal distance d at speeds u and v is harmonic mean: (2uv) / (u + v), NOT the arithmetic average!",
            "Trap 2: When a train crosses a platform of length P, distance traveled is Length of Train + Length of Platform.",
          ],
        },
      },
    ],
    gateBranches: ["cs", "da"],
  },

  // ── 14. PROBABILITY & STATISTICS (GATE DA) ──────────────────────
  {
    id: "probability-and-statistics",
    title: "Probability and Statistics",
    code: "DA-02",
    slug: "probability-and-statistics",
    tagline: "Random variables, conditional probability, distributions, and hypothesis tests.",
    description: "Sample spaces, Bayes' theorem, discrete and continuous random variables, expectation, variance, joint distributions, correlation, Central Limit Theorem, and statistical inference.",
    level: "B.Tech · GATE DA (12–15 Marks)",
    accentColor: "cyan",
    accentHex: "#06b6d4",
    stats: {
      sectionsCount: 5,
      notesCount: 11,
      labsCount: 0,
      pyqsCount: 0,
    },
    coverAnnotation: "✎ verified with Ross, Wasserman & Wackerly · 11 lessons",
    status: "active",
    gateBranches: ["da"],
    previewSnippets: [
      {
        title: "Bayes' Theorem & Likelihood",
        teaser: "Posterior P(A|B) = P(B|A)P(A) / P(B)",
        type: "formula",
      },
      {
        title: "Central Limit Theorem (CLT)",
        teaser: "Sample mean converges to Normal N(μ, σ²/n) as n → ∞",
        type: "concept",
      },
    ],
    pages: [
      {
        id: "ps-p1",
        pageNumber: 1,
        title: "Conditional Probability & Bayes' Inversion",
        type: "concept",
        tag: "Core Mental Model",
        content: {
          heading: "1. The Geometry of Conditional Probability",
          subheading: "Restricting the Universe from Sample Space S to Evidence Event B",
          handwrittenNote: "✎ P(A|B) simply rescales the Venn intersection P(A ∩ B) by the new universal area P(B)",
          paragraphs: [
            "In probability theory, observing an event B eliminates all outcomes outside B. The conditional probability of A given B is the fraction of B that is also occupied by A: P(A|B) = P(A ∩ B) / P(B).",
            "Bayes' Theorem reverses this relationship, allowing us to update prior beliefs P(A) into posterior probabilities P(A|B) using the likelihood P(B|A) of observing evidence B under hypothesis A.",
          ],
          callout: {
            kind: "exam-tip",
            title: "Total Probability Law",
            message: "For a partition {A1, A2, ..., An} of S: P(B) = Σ P(B|Ai) · P(Ai). Always compute the denominator carefully using this expansion.",
          },
          bullets: [
            "Independence: P(A ∩ B) = P(A) · P(B).",
            "Conditional Independence: P(A ∩ B | C) = P(A | C) · P(B | C).",
            "Expectation: E[aX + b] = a E[X] + b (Linearity holds always, even without independence!).",
          ],
          keyTakeaway: "Variance does NOT have linearity: Var(X + Y) = Var(X) + Var(Y) + 2 Cov(X, Y).",
        },
      },
      {
        id: "ps-p2",
        pageNumber: 2,
        title: "1-Minute Rapid Exam Revision",
        type: "revision",
        tag: "Exam Anchor",
        content: {
          heading: "2. Probability & Stats Cheat Card",
          coreRule: "Normal Distribution Standard: Z = (X - μ) / σ ~ N(0, 1). Sample mean standard error = σ / √n.",
          mustRemember: [
            "Poisson Distribution: P(X = k) = (λ^k · e^-λ) / k! with E[X] = λ and Var(X) = λ.",
            "Exponential Distribution: f(x) = λ e^{-λx} (x ≥ 0), Mean = 1/λ, Memoryless property.",
            "Covariance: Cov(X, Y) = E[XY] - E[X]E[Y]. Pearson correlation r = Cov(X, Y) / (σX σY) ∈ [-1, 1].",
          ],
          criticalTraps: [
            "Trap 1: Zero covariance does NOT always imply independence (unless X and Y are bivariate normal).",
            "Trap 2: In hypothesis testing, Type I error = rejecting true H0 (α); Type II error = failing to reject false H0 (β). Power = 1 - β.",
          ],
        },
      },
    ],
  },

  // ── 15. LINEAR ALGEBRA (GATE DA) ────────────────────────────────
  {
    id: "linear-algebra",
    title: "Linear Algebra",
    slug: "linear-algebra",
    shortTitle: "Linear Algebra",
    icon: "📐",
    code: "DA-03",
    tagline: "Vector spaces, orthogonal projections, SVD, and PCA foundations.",
    description: "Matrices, determinants, rank-nullity theorem, Gram-Schmidt orthogonalization, symmetric matrices, positive definiteness, Singular Value Decomposition (SVD), and Principal Component Analysis (PCA).",
    level: "B.Tech · GATE DA (10–12 Marks)",
    accentColor: "indigo",
    accentHex: "#4f46e5",
    stats: {
      sectionsCount: 5,
      notesCount: 11,
      labsCount: 0,
      pyqsCount: 0,
    },
    coverAnnotation: "✎ verified with Strang, Lay & Deisenroth · 11 lessons",
    status: "active",
    gateBranches: ["da"],
    previewSnippets: [
      {
        title: "Singular Value Decomposition (SVD)",
        teaser: "A = U Σ V^T factorizes any rectangular matrix",
        type: "concept",
      },
      {
        title: "Orthogonal Projections & Least Squares",
        teaser: "Normal equation: A^T A x̂ = A^T b",
        type: "formula",
      },
    ],
    pages: [
      {
        id: "la-p1",
        pageNumber: 1,
        title: "Four Fundamental Subspaces & Rank-Nullity",
        type: "concept",
        tag: "Vector Space Geometry",
        content: {
          heading: "1. The Geometry of Linear Transformations",
          subheading: "Column Space C(A), Row Space C(A^T), Null Space N(A), and Left Null Space N(A^T)",
          handwrittenNote: "✎ N(A) is the orthogonal complement of the Row Space in R^n!",
          paragraphs: [
            "Every m×n matrix A defines four fundamental subspaces. The Rank-Nullity Theorem states that dimension of Column Space + dimension of Null Space = n (number of columns): dim C(A) + dim N(A) = n.",
            "In data science, when features exceed samples or are colinear, the Null Space is non-trivial, requiring regularization (L2 ridge) or pseudo-inverses via SVD.",
          ],
          callout: {
            kind: "mental-model",
            title: "SVD: Geometry of Stretching and Rotating",
            message: "A = U Σ V^T. V rotates the domain, Σ stretches along axes by singular values σi, and U rotates in the codomain. Singular values σi = √(λi(A^T A)).",
          },
          bullets: [
            "Positive Definite Matrix: x^T A x > 0 for all x ≠ 0. All eigenvalues are strictly positive.",
            "PCA maximizes variance along eigenvectors of the sample covariance matrix (X^T X / n).",
            "Frobenius norm: ||A||_F = √(Σ σi²).",
          ],
          keyTakeaway: "Best rank-k approximation of A is obtained by truncating SVD to the top k singular values (Eckart-Young-Mirsky Theorem).",
        },
      },
      {
        id: "la-p2",
        pageNumber: 2,
        title: "1-Minute Rapid Exam Revision",
        type: "revision",
        tag: "Exam Anchor",
        content: {
          heading: "2. Linear Algebra DA Cheat Card",
          coreRule: "Least Squares: When Ax = b has no solution, best fit projection solves (A^T A) x̂ = A^T b.",
          mustRemember: [
            "Trace(A) = Σ λi (Sum of eigenvalues); Det(A) = Π λi (Product of eigenvalues).",
            "Symmetric Matrix: All eigenvalues are real; eigenvectors corresponding to distinct eigenvalues are mutually orthogonal.",
            "Orthogonal Matrix Q: Q^T Q = I, preserving vector lengths ||Qx|| = ||x|| and dot products.",
          ],
          criticalTraps: [
            "Trap 1: Rank(AB) ≤ min(Rank(A), Rank(B)). Product rank cannot exceed component rank.",
            "Trap 2: If A is m×n with rank r, non-zero singular values of A are exactly r in number.",
          ],
        },
      },
    ],
  },

  // ── 16. CALCULUS & OPTIMIZATION (GATE DA) ───────────────────────
  {
    id: "calculus-and-optimization",
    title: "Calculus and Optimization",
    slug: "calculus-and-optimization",
    shortTitle: "Calculus & Opt",
    icon: "📈",
    code: "DA-04",
    tagline: "Multivariable gradients, Hessian matrices, and convex optimization.",
    description: "Limits, continuity, directional derivatives, gradient vectors, Hessian matrix, Taylor series, unconstrained optimization, gradient descent variants, Lagrange multipliers, and convex sets/functions.",
    level: "B.Tech · GATE DA (8–10 Marks)",
    accentColor: "fuchsia",
    accentHex: "#d946ef",
    stats: {
      sectionsCount: 5,
      notesCount: 10,
      labsCount: 0,
      pyqsCount: 0,
    },
    coverAnnotation: "✎ verified with Boyd, Nocedal & Stewart · 10 lessons",
    status: "active",
    gateBranches: ["da"],
    previewSnippets: [
      {
        title: "Gradient Descent & Learning Rate",
        teaser: "x_{t+1} = x_t - η ∇f(x_t) updates against gradient",
        type: "concept",
      },
      {
        title: "Hessian & Second Derivative Test",
        teaser: "Positive definite Hessian → strictly local minimum",
        type: "formula",
      },
    ],
    pages: [
      {
        id: "co-p1",
        pageNumber: 1,
        title: "Multivariable Gradients & Extremum Points",
        type: "concept",
        tag: "Optimization Core",
        content: {
          heading: "1. Directional Derivatives & Gradient Ascent/Descent",
          subheading: "∇f points in the direction of steepest ascent with magnitude equal to rate of increase",
          handwrittenNote: "✎ at any point x, directional derivative Du f(x) = ∇f(x) · u is maximized when unit vector u aligns with ∇f(x)",
          paragraphs: [
            "In machine learning, loss functions L(θ) are optimized over high-dimensional parameter spaces. The gradient ∇L contains partial derivatives with respect to each parameter.",
            "To find critical points, we set ∇f(x) = 0. The Hessian matrix H (matrix of second-order partial derivatives) classifies the point: if H is positive definite, x is a strict local minimum; if negative definite, a local maximum; if indefinite, a saddle point.",
          ],
          callout: {
            kind: "mental-model",
            title: "Convex Function Invariant",
            message: "For a convex function, any local minimum is guaranteed to be a GLOBAL minimum. Jensen's inequality: f(E[X]) ≤ E[f(X)].",
          },
          bullets: [
            "Convex set: Line segment joining any two points in the set lies entirely within the set.",
            "Gradient Descent update: θ ← θ - η ∇L(θ), where η is the learning rate.",
            "Constrained Optimization: Method of Lagrange Multipliers introduces λ to solve ∇f = λ ∇g.",
          ],
          keyTakeaway: "Convexity ensures optimization landscapes have no deceptive local minima.",
        },
      },
      {
        id: "co-p2",
        pageNumber: 2,
        title: "1-Minute Rapid Exam Revision",
        type: "revision",
        tag: "Exam Anchor",
        content: {
          heading: "2. Calculus & Optimization Cheat Card",
          coreRule: "Second Order Test: ∇f(x*) = 0 with H(x*) > 0 (positive definite) → Local Minimum.",
          mustRemember: [
            "Chain Rule: ∂z/∂t = (∂z/∂x)(∂x/∂t) + (∂z/∂y)(∂y/∂t). Backpropagation in neural networks is recursive chain rule.",
            "L-Hopital's Rule applies to indeterminate forms 0/0 and ∞/∞ by taking derivatives of numerator and denominator.",
            "Convex Function: f(αx + (1-α)y) ≤ α f(x) + (1-α) f(y) for all α ∈ [0, 1].",
          ],
          criticalTraps: [
            "Trap 1: If Det(H) = 0 at a critical point, the second derivative test is INCONCLUSIVE (higher order terms needed).",
            "Trap 2: Gradient descent with too large learning rate η oscillates or diverges; too small η converges too slowly.",
          ],
        },
      },
    ],
  },

  // ── 17. MACHINE LEARNING (GATE DA) ──────────────────────────────
  {
    id: "machine-learning",
    title: "Machine Learning",
    slug: "machine-learning",
    shortTitle: "Machine Learning",
    icon: "🤖",
    code: "DA-07",
    tagline: "Supervised and unsupervised models, decision trees, SVMs, and neural networks.",
    description: "Linear & logistic regression, Ridge & Lasso regularization, decision trees, entropy and information gain, SVM and kernel trick, k-Nearest Neighbors, k-Means clustering, PCA, and model evaluation metrics (ROC-AUC, Precision, Recall).",
    level: "B.Tech · GATE DA (14–18 Marks)",
    accentColor: "violet",
    accentHex: "#8b5cf6",
    stats: {
      sectionsCount: 5,
      notesCount: 14,
      labsCount: 0,
      pyqsCount: 0,
    },
    coverAnnotation: "✎ verified with Hastie, Bishop & Murphy · 14 lessons",
    status: "active",
    gateBranches: ["da"],
    previewSnippets: [
      {
        title: "Bias-Variance Tradeoff",
        teaser: "Expected Test Error = Bias² + Variance + Irreducible Error",
        type: "concept",
      },
      {
        title: "Support Vector Machines (SVM)",
        teaser: "Max-margin hyperplane: min ½ ||w||² s.t. y_i (w·x_i + b) ≥ 1",
        type: "formula",
      },
    ],
    pages: [
      {
        id: "ml-p1",
        pageNumber: 1,
        title: "Bias-Variance Decomposition & Regularization",
        type: "concept",
        tag: "Statistical Learning",
        content: {
          heading: "1. Model Complexity & Generalization",
          subheading: "MSE = (Bias[f̂(x)])² + Var(f̂(x)) + σ²",
          handwrittenNote: "✎ High Bias = Underfitting (model too simple). High Variance = Overfitting (model memorizing noise)!",
          paragraphs: [
            "The fundamental goal of machine learning is generalization to unseen test data. Underfitting occurs when the hypothesis class lacks expressiveness to capture data patterns (high bias). Overfitting occurs when the model fits training noise and performs poorly on validation sets (high variance).",
            "Regularization constrains parameter weights to combat overfitting: L2 Ridge Regression adds λ ||w||² (shrinks weights continuously), while L1 Lasso Regression adds λ ||w||_1 (induces sparse feature selection).",
          ],
          callout: {
            kind: "exam-tip",
            title: "Confusion Matrix & Evaluation Metrics",
            message: "Precision = TP / (TP + FP). Recall (Sensitivity) = TP / (TP + FN). Specificity = TN / (TN + FP). F1 Score is the harmonic mean: 2PR / (P + R).",
          },
          bullets: [
            "Decision Trees: Split attributes chosen by maximizing Information Gain = Entropy(Parent) - Σ ( |Dv| / |D| ) Entropy(Dv).",
            "k-NN: Non-parametric, lazy learner; decision boundary becomes smoother as k increases.",
            "k-Means: Iteratively assigns points to nearest centroid and recalculates centroids; sensitive to initial seed and outliers.",
          ],
          keyTakeaway: "ROC Curve plots True Positive Rate vs False Positive Rate. AUC = 1 indicates a perfect classifier.",
        },
      },
      {
        id: "ml-p2",
        pageNumber: 2,
        title: "1-Minute Rapid Exam Revision",
        type: "revision",
        tag: "Exam Anchor",
        content: {
          heading: "2. Machine Learning Cheat Card",
          coreRule: "Logistic Regression Sigmoid: σ(z) = 1 / (1 + e^-z). Loss: Binary Cross-Entropy -[y log p + (1-y) log(1-p)].",
          mustRemember: [
            "SVM Margin: Distance between support vectors = 2 / ||w||. Dual formulation depends only on dot products x_i · x_j.",
            "Kernel Trick: Replaces dot products with K(x, z) = Φ(x)·Φ(z) without explicitly calculating high-dimensional mapping Φ.",
            "Entropy of binary target with probability p: H(p) = -p log2(p) - (1-p) log2(1-p). Max entropy = 1 at p = 0.5.",
          ],
          criticalTraps: [
            "Trap 1: Feature scaling (standardization) is MANDATORY for distance-based algorithms (k-NN, SVM, k-Means, PCA) but not for decision trees.",
            "Trap 2: Ridge regression shrinks coefficients close to zero but NEVER sets them exactly to zero, unlike Lasso (L1).",
          ],
        },
      },
    ],
  },

  // ── 18. ARTIFICIAL INTELLIGENCE (GATE DA) ────────────────────────
  {
    id: "artificial-intelligence",
    title: "Artificial Intelligence",
    slug: "artificial-intelligence",
    shortTitle: "AI",
    icon: "🧠",
    code: "DA-08",
    tagline: "Search strategies, heuristic A*, adversarial game trees, and logic.",
    description: "State space representation, uninformed search (BFS, DFS, Uniform Cost), informed search (Greedy Best-First, A* search, admissibility & consistency), Adversarial search (Minimax, Alpha-Beta pruning), and Propositional logic inference.",
    level: "B.Tech · GATE DA (8–10 Marks)",
    accentColor: "pink",
    accentHex: "#ec4899",
    stats: {
      sectionsCount: 5,
      notesCount: 10,
      labsCount: 2,
      pyqsCount: 20,
    },
    coverAnnotation: "✎ benchmark complete",
    status: "active",
    gateBranches: ["da"],
    previewSnippets: [
      {
        title: "A* Search & Admissible Heuristics",
        teaser: "f(n) = g(n) + h(n) with h(n) ≤ h*(n) guarantees optimal path",
        type: "concept",
      },
      {
        title: "Alpha-Beta Pruning Invariant",
        teaser: "Prune subtree when α ≥ β (Minimax equivalent but faster)",
        type: "formula",
      },
    ],
    pages: [
      {
        id: "ai-p1",
        pageNumber: 1,
        title: "Heuristic Search & The A* Algorithm",
        type: "concept",
        tag: "Informed Search",
        content: {
          heading: "1. State Space Search & Heuristics",
          subheading: "f(n) = g(n) + h(n): Actual Cost from Start + Estimated Cost to Goal",
          handwrittenNote: "✎ If heuristic h(n) is admissible (never overestimates), A* tree search is GUARANTEED to find the optimal path!",
          paragraphs: [
            "Search algorithms explore state spaces from a start state to a goal state. Uninformed searches like BFS are complete and find shortest paths on unweighted graphs, but have exponential memory complexity O(b^d).",
            "A* search incorporates domain knowledge via a heuristic function h(n). For graph search (where visited nodes are avoided), the heuristic must be consistent (satisfy triangle inequality: h(n) ≤ c(n, a, n') + h(n')). Consistency implies admissibility.",
          ],
          callout: {
            kind: "exam-tip",
            title: "Alpha-Beta Pruning Rules",
            message: "Alpha (α) is the best value MAX can guarantee so far. Beta (β) is the best value MIN can guarantee so far. Prune if α ≥ β. Order of visiting nodes dramatically affects pruning efficiency (optimal ordering achieves O(b^{d/2})).",
          },
          bullets: [
            "BFS: Complete, Optimal for uniform step cost, Time O(b^d), Space O(b^d).",
            "DFS: Not complete in infinite spaces, Not optimal, Time O(b^m), Space O(bm).",
            "Iterative Deepening (IDDFS): Combines completeness of BFS with linear memory O(bd) of DFS.",
          ],
          keyTakeaway: "Admissible heuristics guarantee optimal solutions; consistent heuristics guarantee that the first time a node is expanded, its optimal path has been found.",
        },
      },
      {
        id: "ai-p2",
        pageNumber: 2,
        title: "1-Minute Rapid Exam Revision",
        type: "revision",
        tag: "Exam Anchor",
        content: {
          heading: "2. Artificial Intelligence Cheat Card",
          coreRule: "A* Condition: h(n) ≤ h*(n) (Admissible) → Optimal for Tree Search. h(n) ≤ c(n, a, n') + h(n') (Consistent) → Optimal for Graph Search.",
          mustRemember: [
            "Minimax value at MAX node = max(children); at MIN node = min(children).",
            "Propositional Logic: Modus Ponens: From P and P → Q, infer Q. Resolution rule: (A ∨ B) ∧ (¬B ∨ C) ⊨ A ∨ C.",
            "Tautology is true under all truth assignments; Contradiction is false under all truth assignments.",
          ],
          criticalTraps: [
            "Trap 1: Pruned branches in Alpha-Beta NEVER change the final minimax value at the root node.",
            "Trap 2: Greedy Best-First Search uses ONLY f(n) = h(n); it is NOT optimal and NOT complete in infinite state spaces.",
          ],
        },
      },
    ],
  },
];

/** Helper to retrieve a notebook by slug */
export function getSubjectNotebook(slug: string): SubjectNotebookData | undefined {
  return SUBJECT_NOTEBOOKS.find((nb) => nb.slug === slug || nb.id === slug);
}
