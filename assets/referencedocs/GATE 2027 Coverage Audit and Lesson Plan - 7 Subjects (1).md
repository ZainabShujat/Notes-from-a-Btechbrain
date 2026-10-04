# GATE 2027 Coverage Audit and Lesson Plan - 7 Subjects

As of Oct 3, 2026 · Scope: OS, DBMS, CN, COA, TOC, C, Discrete Math

## 1. Baseline and verdict

- Baseline: official GATE 2027 CS syllabus, IIT Madras (CS\_GATE2027\_Syllabus.pdf). Third-party pages (PW, AspirantMitraa) still show wider or older topic lists; where they differ, the official PDF is used.
- Status basis: lesson titles in the audit report only. Depth inside each lesson is unverified.
- Report counts corrected: 42 modules, 52 lessons (DBMS has 12), 9 named simulators (6 OS, 3 DBMS).
- 36 of 42 modules have exactly one lesson. Every official core topic is touched by title, but most sit inside one bundled lesson.
- Largest missing official topics inside the 7 subjects: tuple calculus, monoids and groups, generating functions, functions, NAT, socket API, hardwired control, ALU design, file organization and hashing, CFL pumping lemma, storage classes and scope, preprocessor.
- Official sections with no notebook yet: Digital Logic, Data Structures (part of Programming and Data Structures), Algorithms, Compiler Design, Linear Algebra, Calculus, Probability and Statistics, General Aptitude.

## 2. Official 2027 scope: GATE tier vs B.Tech tier

- Per GO Classes, removed vs 2026: ARP, ICMP, DHCP, SMTP, FTP, UDP (Networks) and Secondary Storage / Magnetic Disk (COA). The official 2027 PDF text confirms none of these is listed.
- Official 2027 Networks text lists only: layering; switching (circuit, packet, virtual circuit) and performance metrics; error detection, MAC, Ethernet; distance vector and link state routing; IPv4 fragmentation, CIDR, NAT; TCP flow and congestion control, socket API; DNS and HTTP.
- Tier 1 = in official 2027 text. Tier 2 = B.Tech semester or adjacent topic; kept as full lessons tagged 'B.Tech only' so GATE students can skip them (see section 7).

| Subject | In my earlier gap list but NOT in official 2027 text | Treatment |
| --- | --- | --- |
| CN | UDP, ARP, ICMP, DHCP, SMTP/POP3/IMAP/FTP, IPv6, RIP/OSPF/BGP details, Hamming code, switches/VLAN/spanning tree, CSMA/CA and Wi-Fi, TCP timers/RTO, leaky and token bucket, network security (RSA, IPSec, TLS), Nyquist/Shannon | Tier 2: full lessons tagged 'B.Tech only'; UDP, ARP, DHCP, SMTP/FTP, IPv6 appear in B.Tech CN syllabi, so they stay |
| COA | Secondary storage/RAID, virtual memory (kept in OS), RISC vs CISC, Flynn, superscalar, memory interleaving | Tier 2 |
| TOC | P/NP/NP-complete, Cook-Levin (not listed under TOC or Algorithms), Mealy/Moore (belong to Digital Logic design) | Tier 2 |
| DBMS | MVD/4NF, ARIES and recovery, isolation levels, NoSQL | Tier 2 |
| OS | RAID, protection and security, real-time scheduling | Tier 2 |
| C | File I/O, command-line arguments | Tier 2: file handling is standard in first-year C courses (typical, not checked against a syllabus) |

## 3. Student-notes standard (every lesson)

1. Prerequisites box at top: 3-5 links to earlier lessons or primers, a one-line refresher each, and 3 check questions (all answered correctly = skip).
2. Order: why it exists (intuition) → definition → smallest worked example → numeric/solving template → common traps → GATE question pattern → practice (MCQ, MSQ, NAT, rising difficulty).
3. Numerics: units and assumptions box (bit vs Byte, 2^10 vs 10^3, 0-based vs 1-based, headers ignored unless stated).
4. Module 0 primers listed below are written once and linked from dependent lessons, never duplicated.
5. Each module ends with a one-page formula and trap sheet.
6. GATE-pattern sections describe the question type in original wording and link the official papers; no copied PYQ text.

## 4. Subject matrices

Status key: Covered = a lesson title matches the topic. Partial = inside a bundled lesson or only part of the topic. Missing = no title match.

### 4.1 Operating Systems (about 8-10 marks)

Module 0 primer: CPU registers, PC, SP; fetch-decode-execute; stack vs heap; interrupts and traps; memory units and address-bit arithmetic (2^n); queues and reading Gantt charts. Links in: COA M1 (addressing), C M2 (pointers).

| Official topic | Status | Add (student lessons) |
| --- | --- | --- |
| System calls | Covered | - |
| Processes, threads | Covered | - |
| Inter-process communication | Covered | pipes vs shared memory vs message queue comparison table, if absent |
| Concurrency and synchronization | Partial (one lesson) | race condition and the 3 critical-section requirements; software solutions (strict alternation, Peterson) and hardware (test-and-set, compare-and-swap); semaphore problem set (producer-consumer, readers-writers, dining philosophers, counting-semaphore NAT); monitors, condition variables, mutex vs semaphore, priority inversion |
| Deadlock | Partial (one lesson) | prevention (break each of 4 conditions); detection (wait-for graph, multi-instance detection) and recovery; Banker's NAT patterns |
| CPU scheduling | Covered (3 lessons) | aging and MLFQ (Tier 2) |
| I/O scheduling | Partial (disk scheduling only) | disk access-time numerics (seek, rotational latency, transfer) |
| Memory management | Partial (one lesson) | contiguous allocation, fragmentation, first/best/worst fit; segmentation and segmented paging; page-table size numerics; inverted and hashed page tables |
| Virtual memory | Partial (one lesson) | demand paging, page-fault service, effective access time; frame allocation, thrashing, working set |
| File systems | Partial (one lesson) | file access methods and directory structures; free-space management (bitmap, linked list); FAT; multi-level inode max-file-size NAT; journaling (Tier 2) |

### 4.2 DBMS (about 7-10 marks)

Module 0 primer: sets, relations, tuples, Cartesian product; tables as relations; trees and disk blocks (why B-trees; block-size arithmetic); logic symbols (and, or, not, exists, forall). Links in: Discrete Math M1-M2.

| Official topic | Status | Add (student lessons) |
| --- | --- | --- |
| ER model | Partial (one lesson) | weak entities, generalization/specialization, aggregation; ER-to-relational mapping (table-count NAT) |
| Relational model, keys, integrity constraints | Missing (no title) | keys (super, candidate, primary, foreign); domain, entity and referential integrity; cascade actions |
| Relational algebra | Covered | joins (natural, theta, outer), division, expression equivalence: extend current lesson |
| Tuple calculus | Missing | TRC syntax, safe expressions, quantifiers, TRC to RA translation; DRC (Tier 2) |
| SQL | Partial (one lesson) | DDL/DML and constraints; joins (inner, outer, self) and set operations; correlated subqueries, EXISTS, ALL/ANY, views |
| Normal forms | Covered (2 lessons) | candidate-key finding procedure and count NAT; lossless-join test and dependency preservation; MVD/4NF (Tier 2) |
| File organization | Missing | records to blocks (blocking factor, spanned/unspanned); heap, sorted, hashed access costs; static and extendible hashing |
| Indexing, B and B+ trees | Partial | dense/sparse, primary/clustering/secondary, multilevel index sizing; B vs B+ order and height NAT |
| Transactions | Partial | schedule notation; recoverable, cascadeless, strict; view serializability; counting serial and conflict-equivalent schedules |
| Concurrency control | Partial | 2PL variants (basic, conservative, strict, rigorous); deadlock handling (wait-die, wound-wait); timestamp ordering with Thomas write rule; multigranularity and isolation levels (Tier 2) |
| Recovery, WAL (present) | Not in official text | keep as Tier 2 |

### 4.3 Computer Networks (about 8-10 marks)

Module 0 primer: binary, decimal and dotted-decimal conversion; subnet-mask bit arithmetic; powers of 2; units (bit/Byte, Kbps = 10^3 vs KB = 2^10); modulo-2 (XOR) arithmetic and polynomials for CRC; shortest path on weighted graphs (self-contained until an Algorithms notebook exists).

| Official topic | Status | Add (student lessons) |
| --- | --- | --- |
| Principles of layering | Covered | - |
| Switching and performance metrics | Partial (delays only in a module title) | circuit vs packet vs virtual-circuit comparison with timing numerics; delay components, throughput, bandwidth-delay product, utilization |
| Error detection | Partial (CRC) | parity, checksum (one's complement), CRC generator properties |
| Medium Access Control | Partial (CSMA/CD) | pure and slotted ALOHA efficiency; CSMA persistence variants |
| Ethernet | Covered | frame format, minimum-frame and speed numerics |
| Distance vector and link state | Covered (one lesson) | split in two: DV (Bellman-Ford tables, count-to-infinity, split horizon) and LS (Dijkstra, flooding) |
| IPv4 fragmentation, CIDR | Covered | subnetting, VLSM and longest-prefix-match numerics |
| NAT | Missing | translation table, port translation, end-to-end impact |
| TCP flow and congestion control | Covered | TCP segment, sequence/ack numbering, connection management; slow start/AIMD/fast retransmit cwnd-trace NAT; link to sliding-window efficiency in M3 |
| Socket API | Missing | socket, bind, listen, accept, connect flow; TCP vs UDP semantics (UDP as comparison only) |
| DNS and HTTP | Covered | HTTP/1.0 vs 1.1 RTT numerics; DNS iterative vs recursive; caching; ensure two lessons |

### 4.4 Computer Organization and Architecture (about 7-9 marks)

Module 0 primer = Digital Logic primer: number systems and conversions; 2's complement; Boolean algebra and K-map; combinational blocks (multiplexer, decoder, adder); latches, flip-flops, registers, counters; register-transfer notation. This also covers most of the official Digital Logic section (about 6-8 marks).

| Official topic | Status | Add (student lessons) |
| --- | --- | --- |
| Instruction set and addressing modes | Covered | instruction cycle; stack and subroutine call frames |
| ALU design | Partial (IEEE 754, Booth only) | ripple vs carry-lookahead adders; overflow detection; ALU built from gates |
| Control unit: hardwired and microprogrammed | Partial (microprogrammed only) | datapath and control signals per instruction; hardwired design; horizontal vs vertical microcode and microinstruction sizing NAT |
| Memory interfacing and hierarchy | Partial (cache only) | memory interfacing (chip size, address decoding, chips needed NAT); cache write policies; multi-level AMAT exists |
| I/O interface: interrupt and DMA | Partial (DMA only) | interrupt types, vectored and priority (daisy chain); programmed I/O vs interrupt-driven vs DMA CPU-time numerics |
| Pipelining and hazards | Covered (one lesson) | split: speedup and CPI numerics; data hazards with and without forwarding (stall counts); control hazards and branch penalty; structural hazards |

### 4.5 Theory of Computation (about 6-10 marks)

Module 0 primer: alphabets, strings, languages notation (sigma-star, concatenation, reversal, L^n, L-star); set operations on languages; induction and contradiction proofs; pigeonhole principle; reading state diagrams.

| Official topic | Status | Add (student lessons) |
| --- | --- | --- |
| Regular expressions and finite automata | Partial | epsilon-NFA; RE to FA and FA to RE (Arden, state elimination); RE identities |
| Regular languages, pumping lemma | Covered | closure and decision-property table |
| Context-free grammars and PDA | Partial (one bundled lesson) | CFG derivations; simplification (null, unit, useless); GNF; PDA design (final state vs empty stack); DPDA vs NPDA; CFG to PDA |
| Context-free languages, pumping lemma | Missing | CFL pumping lemma; CFL and DCFL closure; Chomsky hierarchy |
| Turing machines and undecidability | Partial | TM design examples and variants; decidable, RE, co-RE classification and closure; reductions; Rice's theorem exists |

### 4.6 Programming in C (part of Programming and Data Structures, about 10-15 marks)

Module 0 primer: binary, hex and 2's complement; memory model (byte-addressable, stack vs heap, addresses); compile-and-run pipeline; control flow basics.

| Official topic | Status | Add (student lessons) |
| --- | --- | --- |
| Types, operators, expressions | Partial (precedence only) | data types and ranges, overflow, type conversion and promotion, signed vs unsigned comparison, bitwise operators and masks |
| Storage classes and scope | Missing (module title only) | auto, register, static, extern; scope vs lifetime; static locals |
| Functions and parameter passing | Partial | call by value vs by pointer; arrays as parameters; function pointers |
| Recursion | Covered | recursion-tree counting; tail vs non-tail; mutual recursion tracing sets |
| Arrays and strings | Partial | strings and string.h behavior; pointer-to-array vs array-of-pointers |
| Pointers and dynamic memory | Covered | malloc/calloc/realloc/free; dangling pointers; leaks; pointer to pointer; void pointer |
| Structures, unions, enums | Partial | unions, enums, bit-fields; self-referential structs (bridge to linked lists) |
| Preprocessor | Missing | macro side effects; macro vs function; define vs const |
| Output prediction | Missing | evaluation order, sequence points, undefined behavior, printf/scanf return values |

Gap outside the 7 notebooks: the same official section also lists arrays, stacks, queues, linked lists, trees, BST, binary heaps and graphs. No data-structures notebook exists; the C notebook is the natural carrier.

### 4.7 Discrete Mathematics (part of Engineering Mathematics, about 13-15 marks combined)

Module 0 primer: set and logic notation; truth tables; proof techniques (direct, contrapositive, contradiction, induction); sum and product rules; summation formulas.

| Official topic | Status | Add (student lessons) |
| --- | --- | --- |
| Propositional and first-order logic | Partial (one lesson) | normal forms (CNF, DNF); inference rules and validity; quantifier translation and negation drills |
| Sets | Missing | cardinality, power set, inclusion-exclusion on sets |
| Relations, partial orders, lattices | Partial (one lesson) | equivalence relations and partitions; closures (Warshall); counting relations; lattice types (bounded, complemented, distributive); Boolean algebra |
| Functions | Missing | injective, surjective, bijective; composition, inverse; counting functions |
| Monoids and groups | Missing | semigroup, monoid, group; subgroups, cyclic groups, Lagrange's theorem, orders in Z\_n and S\_n |
| Graphs: connectivity, matching, colouring | Partial | connectivity (cut vertex/edge); matching (Hall's theorem, bipartite, vertex cover); trees and spanning trees; Hamiltonian paths; isomorphism; handshake and degree sequences; colouring and planarity exist |
| Combinatorics: counting | Partial | permutations, combinations, stars and bars, inclusion-exclusion, derangements, binomial theorem |
| Recurrence relations | Covered | non-homogeneous recurrences |
| Generating functions | Missing (promised in module title) | ordinary GF; coefficient extraction; solving recurrences with GF |

Gap outside the 7 notebooks: Linear Algebra, Calculus, Probability and Statistics are official Engineering Mathematics topics with no notebook.

## 5. Dependencies and build order

- Discrete Math primer → TOC (languages, induction), DBMS (relations), graph lessons.
- C primer (binary, memory model) → OS memory lessons, COA addressing.
- COA Module 0 (Digital Logic) → COA ALU and control; OS memory basics.
- CN Module 0 (binary, masks, units) → IPv4/CIDR/NAT; shortest-path refresher → routing.
- Order: Discrete Math, C, TOC first (smallest, most missing official topics); then COA with Digital Logic primer; CN; DBMS; OS last (most official topics already present, mainly splitting dense lessons).

## 6. Weightage and open items

| Subject | Approx. marks (third-party estimates, 2020-2026) |
| --- | --- |
| Engineering Mathematics (all four parts) | 13-15 |
| Programming and Data Structures | 10-15 |
| Operating Systems | 8-10 |
| Computer Networks | 8-10 |
| Databases | 7-10 |
| Computer Organization | 7-9 |
| Theory of Computation | 6-10 |

- Sources disagree on exact marks; treat as approximate.
- Lesson-body depth not checked; re-audit after each subject is expanded.
- Re-check the official PDF if IIT Madras revises the syllabus again (the official page notes revised syllabi).

## 7. B.Tech view: what university exams add beyond GATE

B.Tech semester exams test topics GATE 2027 dropped (UDP, ARP, DHCP, SMTP, FTP, IPv6, cryptography) and ask theory answers worth 2, 5 or 10 marks, so every Tier 2 topic in section 2 becomes required for B.Tech.

- Tag every lesson G (GATE), B (B.Tech only) or G+B. B-only lessons carry a badge so GATE students can skip them; they are not cut from the notebook.
- Unit maps below come from AKTU (UP) 2021-22-scheme syllabi for DBMS (KCS-501), CN (KCS-603), COA (KCS-302) and Discrete Structures (KCS-303), the NRCM (Hyderabad) OS syllabus, and the RGIPT C syllabus. The TOC row is the standard university pattern and was not fetched.
- Open question: which university and scheme do your students follow? Send the syllabus PDF and this table gets matched unit by unit.

| Subject | B.Tech-only topics to add (not in GATE 2027 text) | Source |
| --- | --- | --- |
| OS | OS structures and types (batch, multiprogrammed, time-sharing, distributed, real-time); layered, monolithic and microkernel design; OS services; process system calls (fork, exec, wait, exit); multiprocessor scheduling; IPC interfaces (pipes, FIFOs, message queues, shared memory); swapping; protection; file system calls (open, read, write, close, lseek, stat) | NRCM OS syllabus, units I-V |
| DBMS | DBMS architecture, data independence, DDL/DML and interfaces; extended ER, higher-degree relationships; domain calculus; SQL data types, set operations, cursors, triggers, PL/SQL procedures; inclusion dependency, MVD, JD; distributed databases; validation-based protocol, multiple granularity, multiversion schemes; log-based recovery, checkpoints, recovery with concurrent transactions; Oracle case study | AKTU KCS-501, units I-V |
| CN | Network goals, LAN/MAN/WAN, ISP and Internet organization, devices; topologies, transmission media, signal encoding, impairments, FDM/TDM; Hamming error correction; elementary data-link protocols; channel allocation, ALOHA/CSMA variants, LAN standards, learning bridges and spanning tree; ARP, RARP, DHCP, ICMP, IPv6; static vs dynamic routing; congestion control algorithms; UDP, connection management, QoS; SMTP, FTP, remote login, network management, data compression, cryptography basics | AKTU KCS-603, units I-V |
| COA | Functional units, buses, bus types and arbitration; look-ahead carry adders; array multiplier; instruction cycle and sub-cycles, micro-operations, execution of a complete instruction; semiconductor RAM, 2D and 2.5D memory organization, ROM; peripheral devices, I/O ports, interrupt hardware, interrupt types and exceptions | AKTU KCS-302, units I-V |
| TOC | Mealy/Moore machines and conversion; Myhill-Nerode theorem; GNF; DPDA; universal TM and TM variants; linear bounded automata; PCP; P and NP introduction | Standard pattern, not fetched |
| C | Programming paradigms, algorithms and flowcharts, IDE and Linux basics; file handling; strings and standard library; structures with basic searching and sorting; stepwise refinement; case studies | RGIPT Computer Programming syllabus |
| Discrete Math | Multisets, ordered pairs; operations on relations; cosets, normal subgroups, Lagrange's theorem; modular and complete lattices; Boolean algebra axioms and theorems; tautology and satisfiability; binary trees, traversals, BST; graph representation | AKTU KCS-303, units I-V |

### Exam answer format (B-tagged and G+B lessons)

- 2 marks: definition plus one example or formula, 3 lines.
- 5 marks: definition, labelled diagram, 4-5 points or one worked step, conclusion.
- 10 marks: numerical or algorithm trace with every step shown, a diagram or table, and stated assumptions.
- Each such lesson ends with an exam-answer template: one model answer per mark size, with the marks split shown (for example diagram 2, steps 5, result 1).
- Past university papers are linked, never copied.

## 8. Diagram plan

About 60 diagrams are needed across the 7 notebooks. The renderer already has five dedicated SVG types (three-schema, memory-layout, process-pcb, architecture, seven-state); everything else below is new.

- Structures (stacks, headers, hierarchies) = static labelled SVG. Traces (Gantt, timing, B+ splits, CRC division, DV rounds) = step-through, one step per click. Curves (ALOHA, cwnd, Belady) = charts from rows.
- Every diagram carries: a title, labelled parts, one instance with real numbers filled in, and a line saying what to redraw for a 5-mark answer.
- Colours must work in light and dark; no information carried by colour alone.
- Tag: G = GATE, B = B.Tech only, G+B = both.

| Subject | Diagram | Lesson | Tag |
| --- | --- | --- | --- |
| OS | Layered vs microkernel structure | M1 | B |
| OS | Process memory layout and PCB (exists) | M2 | G+B |
| OS | Seven-state process diagram (exists) | M2 | G+B |
| OS | Gantt chart, step-through (FCFS, SJF, SRTF, RR) | M3 | G+B |
| OS | Producer-consumer and dining philosophers with semaphore values | M4 | G+B |
| OS | Resource allocation graph with a cycle; wait-for graph | M5 | G+B |
| OS | Address translation: paging with TLB, segmentation | M6 | G+B |
| OS | Page-fault handling in six steps | M7 | G+B |
| OS | Frame-table trace for FIFO, LRU, OPT; Belady fault chart (simulator exists) | M7 | G+B |
| OS | Inode with direct, single, double, triple indirect pointers | M8 | G+B |
| OS | Disk geometry (track, sector, cylinder); head path (tool exists) | M9 | G+B |
| DBMS | Three-schema architecture (exists) | M1 | G+B |
| DBMS | ER notation sheet: weak entity, ISA, aggregation, cardinality | M2 | G+B |
| DBMS | ER diagram to tables, before and after | M2 | G+B |
| DBMS | Relational algebra expression tree | M3 | G+B |
| DBMS | Decomposition tree for 3NF/BCNF showing FDs kept or lost | M5 | G+B |
| DBMS | B+ tree insert with node split, before and after (calculator exists) | M6 | G+B |
| DBMS | Extendible hash directory with global and local depth | M6 | G |
| DBMS | Transaction state diagram | M7 | G+B |
| DBMS | Two-transaction schedule timeline and precedence graph (checker exists) | M7 | G+B |
| DBMS | 2PL lock-point timeline | M7 | G+B |
| DBMS | Log with checkpoint, undo and redo regions | M8 | B |
| CN | OSI vs TCP/IP stack with header nesting on encapsulation | M1 | G+B |
| CN | Circuit vs packet switching timing | M1 | G+B |
| CN | CRC long division, modulo-2 steps | M2 | G+B |
| CN | Timing diagrams: Stop-and-Wait, Go-Back-N, Selective Repeat | M3 | G+B |
| CN | CSMA/CD collision timeline with vulnerable window | M4 | G+B |
| CN | ALOHA throughput curves, pure vs slotted | M4 | G+B |
| CN | IPv4 header in 32-bit rows | M5 | G+B |
| CN | One datagram fragmented into three | M5 | G+B |
| CN | CIDR bit-split bar: network, subnet, host | M5 | G+B |
| CN | NAT translation table flow | M5 | G |
| CN | Distance-vector round tables; Dijkstra step table | M6 | G+B |
| CN | TCP handshake and close sequence | M7 | G+B |
| CN | cwnd vs RTT: slow start, AIMD, timeout | M7 | G+B |
| CN | DNS iterative vs recursive; HTTP persistent vs non-persistent timelines | M8 | G+B |
| COA | Bus architecture and daisy-chain arbitration | M1 | B |
| COA | IEEE 754 field layout, single and double | M2 | G+B |
| COA | Booth's algorithm table; carry-look-ahead adder | M2 | G+B |
| COA | Cache address split (tag, index, offset) with mapping examples | M3 | G+B |
| COA | 2D vs 2.5D memory organization | M3 | B |
| COA | Five-stage pipeline space-time diagram with stalls and forwarding | M4 | G+B |
| COA | Datapath with control signals; microprogrammed control store | M5 | G+B |
| COA | DMA controller handshake | M5 | G+B |
| TOC | DFA/NFA diagram rendered from a transition table | M1 | G+B |
| TOC | DFA minimization table-filling triangle | M1 | G+B |
| TOC | Chomsky hierarchy as nested sets | M3 | G+B |
| TOC | Two parse trees for an ambiguous string | M3 | G+B |
| TOC | PDA diagram with stack trace | M3 | G+B |
| TOC | TM diagram with tape trace | M4 | G+B |
| TOC | Decidable, RE and non-RE regions | M4 | G+B |
| C | Flowchart symbols and one algorithm drawn | M1 | B |
| C | Memory layout (exists) | M2 | G+B |
| C | Pointer box-and-arrow for a 2D array | M2 | G+B |
| C | Recursion call tree and stack frames | M3 | G+B |
| C | Struct padding byte map | M4 | G+B |
| Discrete Math | Logic circuit and truth table for a Boolean identity | M1 | B |
| Discrete Math | Venn diagrams: set operations, inclusion-exclusion | M2 | G+B |
| Discrete Math | Hasse diagrams and lattice types | M2 | G+B |
| Discrete Math | Group Cayley table (new lesson) | M2 | G+B |
| Discrete Math | Graphs: Euler, planar, bipartite, K5, K3,3, colouring | M4 | G+B |
| Discrete Math | Binary tree with its three traversals | M4 | B |

## 9. Practice questions

All questions are original; every numeric answer was recomputed by script. Tags: GATE NAT, GATE MCQ, GATE MSQ, B.Tech 5m, B.Tech 10m. Each lesson should ship 6-10 questions in this style, rising in difficulty.

### 9.1 Operating Systems

1. &#91;GATE NAT\] Processes as (arrival, burst) in ms: P1 (0, 6), P2 (1, 3), P3 (2, 8), P4 (4, 2). Average waiting time under SRTF? **Ans: 3.5 ms.** Completion times P2 4, P4 6, P1 11, P3 19; waiting 5, 0, 9, 0.
2. &#91;GATE NAT\] 32-bit virtual addresses, 4 KB pages, 4-byte page-table entries. Minimum number of page-table levels so every table fits in one page? **Ans: 2.** A page holds 1024 entries (10 bits); the 20-bit page number needs two such levels.
3. &#91;GATE NAT\] Reference string 4 7 6 1 7 6 1 2 7 2, three frames, initially empty. Page faults under FIFO and under optimal? **Ans: FIFO 6, optimal 5** (LRU also 6).
4. &#91;B.Tech 5m\] Banker's algorithm, resources A B C. Allocation: P0 (1,0,1), P1 (2,1,0), P2 (1,1,1), P3 (0,1,2). Max: P0 (3,2,2), P1 (4,2,1), P2 (2,2,2), P3 (1,3,3). Available (2,1,1). Is the state safe? **Ans: Safe.** Need: P0 (2,2,1), P1 (2,1,1), P2 (1,1,1), P3 (1,2,1). Sequence P1, P0, P2, P3: Work becomes (4,2,1), (5,2,2), (6,3,3), then P3 fits.
5. &#91;GATE NAT\] Disk cylinders 0-199, head at 50 moving up, requests 82, 170, 43, 140, 24, 16, 190. Total head movement under SCAN (goes to the last cylinder before reversing)? **Ans: 332** = (199 - 50) + (199 - 16). LOOK would give 314.

### 9.2 DBMS

1. &#91;GATE NAT\] R(A,B,C,D,E) with A→B, BC→D, D→E, E→A. How many candidate keys, and what is the highest normal form? **Ans: 4 keys (AC, BC, CD, CE); 3NF.** Every attribute is prime so 3NF holds; A→B has a non-superkey left side, so BCNF fails.
2. &#91;GATE NAT\] Block 1024 B, key 8 B, block pointer 6 B. Maximum keys in a B+ tree internal node, maximum keys in a leaf (6 B record pointers plus one 6 B next-leaf pointer), and minimum levels to index 1,000,000 keys? **Ans: 72, 72, 4.** Both nodes satisfy 14n + 6 ≤ 1024. With full nodes: 13,889 leaves → 191 → 3 → 1 root.
3. &#91;GATE MCQ\] Schedule S: r1(A) w2(A) r2(B) w1(B), then both commit. Conflict serializable? **Ans: No.** r1(A) before w2(A) gives T1→T2; r2(B) before w1(B) gives T2→T1; the precedence graph has a cycle.
4. &#91;B.Tech 5m\] Employee(EID, Name) owns a weak entity Dependent(DepName, Age), identified by DepName plus the owner's EID. Reduce to tables. **Ans:** Employee(EID, Name) with PK EID; Dependent(EID, DepName, Age) with PK (EID, DepName) and FK EID referencing Employee, ON DELETE CASCADE.
5. &#91;B.Tech 5m\] Write SQL for employees earning more than their department's average. **Ans:** `SELECT e.* FROM Emp e WHERE e.sal > (SELECT AVG(sal) FROM Emp WHERE dept = e.dept);` The inner query is correlated on dept.

### 9.3 Computer Networks

1. &#91;GATE NAT\] Stop-and-Wait on a 1 Mbps link, 1000-byte frames, one-way propagation delay 20 ms, ACK transmission time ignored. Efficiency and throughput? **Ans: 16.67%, about 167 kbps.** Tt = 8 ms, Tp = 20 ms, efficiency = 8 / (8 + 40).
2. &#91;GATE NAT\] Same link with a sliding window. Window needed to keep the sender busy, and minimum sequence-number bits for Go-Back-N? **Ans: 6 frames; 3 bits.** Window = 1 + 2a with a = Tp / Tt = 2.5; Go-Back-N needs window + 1 = 7 numbers, and 7 ≤ 2^3.
3. &#91;GATE NAT\] A 4000-byte IP datagram (20-byte header) crosses a link with MTU 1500. Number of fragments, fragment-offset value of the last, and total size of the last? **Ans: 3; 370; 1040 bytes.** Data 3980 = 1480 + 1480 + 1020; offsets 0, 185, 370.
4. &#91;GATE NAT\] Data 1101011011 with generator x^4 + x + 1 (10011). Transmitted codeword? **Ans: 11010110111110.** The remainder is 1110.
5. &#91;GATE NAT\] Reno-style TCP: cwnd = 1 MSS at the start of RTT 1, ssthresh = 8 MSS, no loss, slow start until ssthresh then +1 MSS per RTT. cwnd at the start of RTT 7? **Ans: 11 MSS** (1, 2, 4, 8, 9, 10, 11).
6. &#91;B.Tech 5m\] Explain the TCP three-way handshake with a diagram. **Ans:** client sends SYN (seq = x); server replies SYN+ACK (seq = y, ack = x + 1); client sends ACK (ack = y + 1); the connection is established. Each SYN consumes one sequence number.

### 9.4 Computer Organization and Architecture

1. &#91;GATE NAT\] Direct-mapped cache, 64 KB, 32 B blocks, 32-bit addresses. Tag bits, and total tag-store bits with one valid bit per line? **Ans: 16; 34,816.** Offset 5, index 11, tag 16; 2048 lines × 17 bits.
2. &#91;GATE NAT\] L1 hit 1 ns, L1 miss rate 10%, L2 hit 10 ns, L2 local miss rate 20%, memory 100 ns. AMAT? **Ans: 4 ns** = 1 + 0.1 × (10 + 0.2 × 100).
3. &#91;GATE NAT\] Five-stage pipeline, one cycle per stage, 100 instructions, 20 of them cost one stall cycle each. Total cycles, and speedup over a non-pipelined machine taking 5 cycles per instruction? **Ans: 124 cycles; speedup 500 / 124 ≈ 4.03.** Cycles = 4 + 100 + 20.
4. &#91;GATE NAT\] IEEE 754 single-precision encoding of -10.25, in hex? **Ans: C1240000.** -10.25 = -1.01001 × 2^3, biased exponent 130.
5. &#91;B.Tech 5m\] Multiply -3 by 5 using 4-bit Booth's algorithm. **Ans: 11110001 (-15).** M = 1101, Q = 0101; the (Q0, Q-1) pairs are 10, 01, 10, 01, giving subtract, add, subtract, add with an arithmetic right shift after each.

### 9.5 Theory of Computation

1. &#91;GATE NAT\] Minimum number of states in a DFA accepting binary strings (MSB first) whose value is divisible by 5? **Ans: 5.** One state per remainder 0-4, all pairwise distinguishable.
2. &#91;GATE MCQ\] Which language is not regular? (a) even number of a's (b) strings ending in ab (c) {a^n b^n : n ≥ 0} (d) {a^i b^j : i, j ≥ 0}. **Ans: (c).** Pumping a block of a's inside the first n symbols breaks the equal count.
3. &#91;GATE MSQ\] Context-free languages are closed under: (a) union (b) intersection (c) complement (d) intersection with a regular language. **Ans: (a) and (d).**
4. &#91;GATE MSQ\] Which problems are undecidable? (a) membership of a string in a CFG (b) emptiness of a CFG (c) equivalence of two CFGs (d) whether a TM's language is empty. **Ans: (c) and (d).** (a) is decidable by CYK and (b) by the marking algorithm.
5. &#91;B.Tech 10m\] Design a PDA for {a^n b^n : n ≥ 1} and trace aabb. **Ans:** start stack Z, final state q2. δ(q0, a, Z) = (q0, AZ); δ(q0, a, A) = (q0, AA); δ(q0, b, A) = (q1, ε); δ(q1, b, A) = (q1, ε); δ(q1, ε, Z) = (q2, Z). Trace: (q0, aabb, Z) → (q0, abb, AZ) → (q0, bb, AAZ) → (q1, b, AZ) → (q1, ε, Z) → (q2, ε, Z), accepted.

### 9.6 Programming in C (assume 4-byte int, 8-byte pointer)

1. &#91;GATE output\] `int a[] = {2, 4, 6, 8}; int *p = a + 1; printf("%d %d", *(p + 2), p[-1]);` **Ans: 8 2.** p points at a\[1\]; p + 2 is a\[3\]; p\[-1\] is a\[0\].
2. &#91;GATE NAT\] sizeof for `struct { char c; int i; char d; }` and for the reordered `struct { char c; char d; int i; }`? **Ans: 12 and 8.** First: c at 0, 3 padding, i at 4, d at 8, 3 trailing padding. Second: c at 0, d at 1, 2 padding, i at 4.
3. &#91;GATE NAT\] `int g(int n) { if (n <= 1) return 1; return g(n-1) + g(n-2); }` Value of g(6) and total calls made, counting g(6) itself? **Ans: 13 and 25.** Calls c(n) = 1 + c(n-1) + c(n-2) with c(0) = c(1) = 1 gives 3, 5, 9, 15, 25.
4. &#91;GATE output\] `unsigned u = 1; int i = -1; printf("%s", (i < u) ? "less" : "not less");` **Ans: not less.** i converts to unsigned 4294967295, which is not below 1.
5. &#91;B.Tech 5m\] Write swap using pointers and explain why swap(int a, int b) fails. **Ans:** `void swap(int *a, int *b) { int t = *a; *a = *b; *b = t; }` called as swap(&x, &y). C passes arguments by value, so the by-value version swaps copies only.

### 9.7 Discrete Mathematics

1. &#91;GATE NAT\] Onto functions from a 4-element set to a 3-element set? **Ans: 36** = 3^4 - 3·2^4 + 3·1^4.
2. &#91;GATE NAT\] A connected planar graph has 8 vertices and 12 edges. Number of faces? **Ans: 6**, from V - E + F = 2.
3. &#91;GATE NAT\] a(n) = 5a(n-1) - 6a(n-2), a(0) = 1, a(1) = 4. Find a(3). **Ans: 46.** Roots 2 and 3 give a(n) = 2·3^n - 2^n; a(2) = 14.
4. &#91;GATE MSQ\] Which divisor lattices are complemented? (a) D6 (b) D8 (c) D12 (d) D30. **Ans: (a) and (d).** D(n) is complemented exactly when n is square-free.
5. &#91;GATE NAT\] Order of the element 4 in the additive group Z12, and the number of derangements of 4 objects? **Ans: 3 and 9.** Order = 12 / gcd(4, 12) = 3; D4 = 24 × (1 - 1 + 1/2 - 1/6 + 1/24) = 9.
6. &#91;B.Tech 5m\] Prove that in any graph the sum of vertex degrees equals twice the number of edges. **Ans:** each edge adds 1 to the degree of each of its two endpoints (2 to one vertex for a loop), so the degree sum is 2|E|. Hence the number of odd-degree vertices is even.

## 10. Formula and trap sheets

One printable page per subject, ending each module. Each row is a formula or rule plus the mistake it usually causes. State every assumption you use (tie-breaking, units, convention) in the answer.

### 10.1 Operating Systems

| Item | Formula or rule | Trap |
| --- | --- | --- |
| Turnaround, waiting, response | TAT = CT - AT; WT = TAT - BT; RT = first CPU time - AT | Response time is not waiting time under preemption |
| Round Robin | A ready process waits at most (n - 1) × q between turns | State the tie rule when an arrival coincides with a quantum expiry |
| Page-table size | entries = virtual space / page size; size = entries × PTE size | Multi-level: entries per table = page size / PTE size; levels = ceil(page-number bits / bits per level) |
| EMAT with TLB, single-level paging | h(t\_tlb + t\_mem) + (1 - h)(t\_tlb + 2 × t\_mem) | Each extra paging level adds one memory access on a miss |
| Demand paging | EAT = (1 - p) × t\_mem + p × t\_fault | Even p = 1/1000 dominates when t\_fault is in milliseconds |
| Inode capacity | N = block size / pointer size; max file = (D + N + N^2 + N^3) × block size | The disk-address width can cap the addressable blocks |
| Disk access time | seek + rotational latency + transfer; average latency = half a rotation; transfer = bytes / (bytes per track × rotations per second) | Convert RPM to rotations per second |
| Banker's algorithm | Need = Max - Allocation; run a process if Need ≤ Work, then Work += Allocation | Several safe sequences can exist; unsafe does not mean deadlocked |
| Deadlock-free resource count | n processes each needing at most m units of one resource type: deadlock-free if R ≥ n(m - 1) + 1 | Single resource type only |
| Semaphore value | value = initial - completed P + completed V; blocked processes = -value when negative | Count only completed P operations |
| Page replacement | FIFO can show Belady's anomaly; LRU and OPT never do | Compare fault counts, not hit ratios by eye |
| Peterson's solution | flag\[i\] = true; turn = j; wait while flag\[j\] and turn == j | The two assignments must stay in this order |
| Disk scheduling | SCAN goes to the end cylinder; LOOK stops at the last request; C-SCAN jumps back without servicing | Count the return sweep as head movement |

### 10.2 DBMS

| Item | Formula or rule | Trap |
| --- | --- | --- |
| Attribute closure | Add the RHS of every FD whose LHS is inside the current set; X is a superkey if X+ is all attributes | Attributes never on any RHS must be in every key |
| 2NF, 3NF, BCNF | 2NF: no partial dependency; 3NF: for X → A, X is a superkey or A is prime; BCNF: X is always a superkey | BCNF can lose dependency preservation; 3NF never does |
| Lossless join (two relations) | R1 ∩ R2 → R1 or R1 ∩ R2 → R2 | Two-relation test only; use a tableau for more |
| Dependency preservation | (F1 ∪ F2 ∪ ...)+ equals F+ | Check by closure, not by eye |
| Blocking | bfr = floor(B / R); blocks = ceil(r / bfr) | Spanned records change the arithmetic |
| Search cost | linear: b / 2 on average; binary on sorted file: ceil(log2 b); index: levels + 1 | Binary search needs a sorted file |
| Multilevel index | fo = block size / (key + pointer); levels = ceil(log base fo of first-level blocks) | Add one block access for the data block |
| B+ tree node | internal: (n + 1) × P + n × K ≤ B; leaf: n × (K + Pr) + P ≤ B | Say whether order counts pointers or keys; minimum fill varies by textbook |
| B+ tree height | minimum levels = ceil(log base (n + 1) of leaves) + 1, assuming full nodes | Maximum height uses half-full nodes |
| Conflict serializability | Precedence graph from RW, WR, WW conflicts across transactions; serializable iff acyclic | Serial order is a topological order; at most n! serial schedules |
| Recoverability | Recoverable: reader commits after writer; cascadeless: reads only committed data; strict: no read or write of uncommitted data | strict ⊂ cascadeless ⊂ recoverable |
| Two-phase locking | Growing phase then shrinking phase; strict 2PL holds exclusive locks until commit | 2PL gives conflict serializability, not deadlock freedom |
| Timestamp ordering | Read rejected if TS(T) < W-TS(Q); write rejected if TS(T) < R-TS(Q); Thomas write rule skips an obsolete write | Thomas rule admits schedules that are view but not conflict serializable |
| Deadlock prevention | Wait-die: older waits, younger dies; wound-wait: older wounds younger | Restarted transactions keep their original timestamp |
| Relational algebra and SQL | Number of tuples in R × S = tuples in R × tuples in S; natural join is at most that; SQL keeps duplicates unless DISTINCT | COUNT(\*) counts rows, COUNT(col) skips NULLs; NOT IN with a NULL in the list returns nothing |

### 10.3 Computer Networks

| Item | Formula or rule | Trap |
| --- | --- | --- |
| Delays | Tt = L / B; Tp = d / v; a = Tp / Tt; RTT = 2 × Tp plus queuing and processing | Bits vs bytes; 1 Mbps = 10^6 bit/s |
| Stop-and-Wait | efficiency = 1 / (1 + 2a); throughput = efficiency × B | Include ACK transmission time only if told |
| Sliding window | efficiency = min(1, N / (1 + 2a)); window for full use = 1 + 2a | N counts frames in the window |
| Sequence-number bits | Go-Back-N: N ≤ 2^k - 1; Selective Repeat: N ≤ 2^(k-1) | Go-Back-N receiver window is 1 |
| Bandwidth-delay product | B × RTT = data in flight needed to fill the pipe | Use RTT, not one-way delay |
| Minimum Ethernet frame | L\_min = 2 × Tp × B | The factor 2 is the round trip |
| ALOHA | Pure: S = G × e^(-2G), maximum 0.184 at G = 0.5; slotted: S = G × e^(-G), maximum 0.368 at G = 1 | G is offered load per frame time |
| CRC | Append r zeros (r = generator degree), divide modulo-2, replace zeros by the remainder; receiver remainder 0 = no error detected | Subtraction is XOR; a generator with factor x + 1 catches all odd-bit errors |
| Hamming code | 2^r ≥ m + r + 1; check bits at positions 2^i | Number positions from 1 |
| IPv4 hosts and subnets | hosts = 2^(32 - p) - 2; subnets = 2^(borrowed bits) | Network and broadcast addresses are not usable |
| Network and broadcast address | network = IP AND mask; broadcast = network + 2^(32 - p) - 1 | Compare masks bit by bit in binary |
| Fragmentation | data per fragment = floor((MTU - 20) / 8) × 8; offset = bytes before / 8; MF = 1 except on the last | Every fragment repeats the 20-byte header |
| Distance vector | d\_x(y) = min over neighbours v of c(x, v) + d\_v(y) | Count-to-infinity; split horizon and poison reverse |
| TCP windows | sender window = min(cwnd, rwnd); slow start doubles per RTT; timeout: ssthresh = cwnd / 2 and cwnd = 1; triple duplicate ACK (Reno): ssthresh = cwnd / 2 and cwnd = ssthresh | Congestion avoidance adds 1 MSS per RTT |
| HTTP RTT | Non-persistent: 2 RTT + transmit per object; persistent without pipelining: 1 RTT per object after the first connection; pipelined: about 1 RTT for all | A DNS lookup adds RTTs per server queried |
| Shannon and Nyquist | C = B × log2(1 + S/N); noiseless maximum rate = 2B × log2(L) | S/N as a ratio: S/N = 10^(dB / 10) |

### 10.4 Computer Organization and Architecture

| Item | Formula or rule | Trap |
| --- | --- | --- |
| CPU time | IC × CPI × cycle time; MIPS = clock rate / (CPI × 10^6) | Weighted CPI = sum of fraction × CPI per class |
| Amdahl's law | speedup = 1 / ((1 - f) + f / s) | f is the fraction of the original time |
| Pipeline time | (k + n - 1) × cycle; speedup = n × k / (k + n - 1), always below k | Cycle = slowest stage + register delay; each stall adds one cycle |
| Cache fields | offset = log2(block); direct-mapped index = log2(lines); k-way index = log2(lines / k); tag = address bits - index - offset | Fully associative has no index; add valid and dirty bits to the tag store |
| AMAT | hit time + miss rate × miss penalty; two levels: H1 + m1 × (H2 + m2 × T\_mem) | m2 is the local L2 miss rate in this form |
| Write policies | Write-through writes memory every time; write-back sets a dirty bit and writes on eviction | Write-allocate usually pairs with write-back |
| IEEE 754 | Single: 1/8/23 bits, bias 127; double: 1/11/52, bias 1023; value = (-1)^s × 1.m × 2^(e - bias) | e = 0 is denormal; e all ones is infinity or NaN |
| Two's complement | Range -2^(n-1) to 2^(n-1) - 1; overflow when carry into MSB differs from carry out | Adding numbers of opposite sign never overflows |
| Booth's algorithm | Pair (Q0, Q-1): 01 add M, 10 subtract M, then arithmetic right shift | Sign-extend on each shift |
| Carry look-ahead | G = A AND B; P = A XOR B; C(i+1) = G(i) + P(i) × C(i) | Delay is constant in n, not linear |
| Addressing modes | Direct: EA = A; indirect: EA = M\[A\]; register indirect: EA = R; indexed or base: EA = A + R; PC-relative: EA = PC + A | PC already points past the current instruction |
| Memory chips | chips = total bits / chip bits; address bits = log2(words) | Decoder lines come from the address bits the chip does not use |
| Microprogrammed control | control-store bits = number of microinstructions × microinstruction width | Horizontal: wide and fast; vertical: narrow with extra decoding |
| DMA | Cycle stealing: CPU loses single bus cycles; burst mode: CPU blocked for the whole block | Count the setup cost once per transfer |

### 10.5 Theory of Computation

| Item | Formula or rule | Trap |
| --- | --- | --- |
| Automata sizes | NFA with n states → DFA with at most 2^n states; product DFA for L1 ∩ L2 has m × n states | The bound is a maximum, not the minimum |
| Minimal DFA | States = number of Myhill-Nerode equivalence classes; table-filling marks distinguishable pairs | Remove unreachable states first |
| Counting states | Ends with a fixed string of length k: k + 1 states; length divisible by n: n states; value divisible by n (binary): n states | Include the dead state when the DFA must be complete |
| Regular expression identities | `(a+b)* = (a*b*)*`; `(r*)* = r*`; r + r = r; epsilon r = r; empty-set r = empty set | `a*b*` is not equal to `(a+b)*` |
| Arden's theorem | If R = Q + R P and P has no epsilon, then R = `Q P*` | Needs epsilon not in P |
| Closure: regular | Closed under union, intersection, complement, concatenation, star, reversal, difference, homomorphism, inverse homomorphism | Finite languages are always regular |
| Closure: CFL and DCFL | CFL: closed under union, concatenation, star, reversal, homomorphism, intersection with regular; not intersection, complement, difference. DCFL: closed under complement and intersection with regular; not union, concatenation, star, reversal | Complement of a CFL need not be a CFL |
| Closure: recursive and RE | Recursive: closed under union, intersection, complement, concatenation, star, reversal. RE: same except complement | L and its complement both RE implies L is recursive |
| Chomsky hierarchy | Type 3 regular (finite automaton); Type 2 context-free (PDA); Type 1 context-sensitive (linear bounded automaton); Type 0 (Turing machine) | Each type is a proper subset of the one above |
| Pumping lemma | Regular: w = xyz with length of xy at most p, length of y at least 1, and x y^i z in L for all i ≥ 0. CFL: w = uvxyz with length of vxy at most p, length of vy at least 1, and u v^i x y^i z in L for all i ≥ 0 | It proves a language is not regular or not CFL; it never proves a language is regular |
| Normal forms and parsing | CNF: A → BC or A → a; a string of length n takes 2n - 1 derivation steps in CNF; GNF: A → a followed by variables; CYK runs in O(n^3) | Remove epsilon, unit and useless productions before CNF |
| Decidability | Regular: all questions decidable. CFL: membership, emptiness, finiteness decidable; equivalence, ambiguity, universality undecidable. TM: halting, emptiness, equivalence undecidable | Rice's theorem: any non-trivial property of the language of a TM is undecidable |

### 10.6 Programming in C (typical 64-bit sizes)

| Item | Formula or rule | Trap |
| --- | --- | --- |
| Sizes | char 1, short 2, int 4, long 8, float 4, double 8, pointer 8 bytes | Sizes are implementation-defined; say the assumption |
| Struct layout | Each member sits at an offset that is a multiple of its size; struct size is a multiple of its largest member alignment; union size = largest member, rounded up | Reordering members can shrink a struct |
| Arrays and pointers | `a[i]` equals `*(a + i)`; 2D: `a[i][j]` equals `*(*(a + i) + j)`; address = base + (i × cols + j) × size | An array parameter decays to a pointer, so sizeof gives pointer size |
| Pointer arithmetic | p + n moves n × sizeof of the pointed-to type in bytes; p - q gives an element count | Only valid inside one array |
| Storage classes | auto: stack, block scope; static: fixed storage, initialized once, zero by default; extern: defined elsewhere; register: no address | A static local keeps its value between calls |
| Integers | Signed overflow is undefined; unsigned wraps modulo 2^n; usual conversions turn signed into unsigned in mixed comparisons | -1 < 1u is false |
| Evaluation | Logical AND (`&&`) and logical OR short-circuit left to right; `i++ + ++i` and `f(i++, i++)` are undefined or unspecified | Never rely on argument evaluation order |
| printf and scanf | printf returns characters printed; scanf returns items read; %d int, %u unsigned, %x hex, %c char, %s string, %f double, %p pointer | scanf needs & for non-array arguments |
| Recursion counts | Calls c(n) = 1 + c(n-1) + c(n-2) for two-way recursion; stack depth = longest chain of pending calls | Count the call itself |
| Bit tricks | `x & (x - 1)` clears the lowest set bit; `x & -x` isolates it; `n << k` = n × 2^k; set bit k with OR of `1 << k`; toggle it with XOR of `1 << k` | Shifting by the type width or more is undefined |
| Dynamic memory | malloc returns NULL on failure and uninitialized memory; calloc zeroes; free(NULL) is safe; free once only | Use after free and double free are undefined |
| Macros | `#define SQ(x) x * x` breaks for SQ(a + 1); write `((x) * (x))` | Macro arguments with side effects run more than once |

### 10.7 Discrete Mathematics

| Item | Formula or rule | Trap |
| --- | --- | --- |
| Logic | p → q equals NOT p OR q; contrapositive is equivalent; NOT (for all x P) equals exists x NOT P | Converse and inverse are not equivalent to the original |
| Counting basics | P(n, r) = n! / (n - r)!; C(n, r) = n! / (r! (n - r)!); stars and bars: x1 + ... + xk = n has C(n + k - 1, k - 1) non-negative solutions | Decide whether order matters before choosing P or C |
| Inclusion-exclusion and derangements | Onto functions m → n: sum over k of (-1)^k C(n, k) (n - k)^m; derangements D(n) = n! × (1 - 1 + 1/2! - 1/3! + ... ); D(4) = 9 | Total functions n^m, injective P(n, m) |
| Relations on n elements | All: 2^(n^2); reflexive: 2^(n^2 - n); symmetric: 2^(n(n + 1) / 2); antisymmetric: 2^n × 3^(n(n - 1) / 2) | Equivalence relations are counted by Bell numbers, not powers of 2 |
| Pigeonhole | m objects into n boxes: some box holds at least ceil(m / n) | Identify the boxes first |
| Recurrences | Characteristic roots r1, r2 give a(n) = A r1^n + B r2^n; repeated root gives (A + B n) r^n; Catalan C(n) = C(2n, n) / (n + 1) | Fit A and B from the initial values, then recheck a(2) |
| Graph basics | Sum of degrees = 2E; tree has E = V - 1; K(n) has n(n - 1) / 2 edges; Cayley: K(n) has n^(n-2) spanning trees | A graph has an even number of odd-degree vertices |
| Euler and Hamilton | Euler circuit: connected, all degrees even; Euler path: exactly 0 or 2 odd vertices | No simple degree test exists for Hamiltonian cycles |
| Planarity | V - E + F = 2 (connected); simple planar graph E ≤ 3V - 6; with no triangles E ≤ 2V - 4; K5 and K3,3 are non-planar | Count the outer face |
| Colouring and matching | Bipartite: 2 colours; K(n): n colours; odd cycle: 3; planar: at most 4. Hall: a bipartite graph has a matching saturating X iff every subset S of X has at least as many neighbours as members | A maximum matching has at most V / 2 edges |
| Posets and lattices | Partial order: reflexive, antisymmetric, transitive; lattice: every pair has a least upper bound and a greatest lower bound; D(n) is complemented iff n is square-free; Boolean algebra has 2^n elements | Hasse diagrams omit reflexive and transitive edges |
| Groups | Closure, associativity, identity, inverses; order of a in Z(n) = n / gcd(a, n); Lagrange: the order of a subgroup divides the order of the group; Z(n) has phi(n) generators | The order of an element divides the group order |
| Generating functions | 1 / (1 - x) = sum of x^n; 1 / (1 - x)^k has coefficient C(n + k - 1, k - 1) at x^n; e^x = sum of x^n / n! | Match the coefficient index before reading off the answer |

## 7. B.Tech view: what the semester exam adds

Two sample syllabi cover every GATE-listed topic and add the items below: an AKTU-pattern 2nd-year K-series scheme ([IET Lucknow, 2019-20](https://ietlucknow.ac.in/sites/default/files/syllabus/CS2_BTech_2nd_Year_K_Series_Syllabus_EFS_2019_20.pdf)) and [MIT Muzaffarpur IT, 2024-28](https://www.mitmuzaffarpur.org/wp-content/uploads/2026/05/Syllabus-IT-2024-2028-onwards.pdf), which scores each course as end-semester 70 + internal 30 with a 1-credit lab.

- Tag every lesson GATE, B.Tech or both. B.Tech-only lessons are collapsed by default so GATE students can skip them; a semester-exam student reads everything.
- Exam shape (typical, not checked for your university): 2-mark definitions; 5- and 10-mark derivations, algorithm write-ups and drawn diagrams; lab and viva.
- Each lesson ends with a short-answer set, a long-answer set with a marking outline, and a list of diagrams that earn marks.

| Subject | Named in these B.Tech syllabi, not in the GATE 2027 text |
| --- | --- |
| OS | OS classification (batch, interactive, time-sharing, real-time); structures (layered, monolithic, microkernel); sleeping barber; multiprocessor scheduling; fixed and variable partitions, protection; I/O buffering, RAID; file sharing and implementation |
| DBMS | Data abstraction and independence, DDL/DML, data models; query optimization; authentication and access control (DAC, MAC, RBAC); object-oriented, warehouse and distributed databases; recovery |
| CN | Topologies; physical-layer signals, transmission, multiplexing, switching technologies; LANs; IPv6, address mapping (ARP); UDP; client-server model; email protocols, FTP, web technologies |
| COA | Buses and arbitration; register, bus and memory transfer; stack organization; look-ahead carry adders, array multiplier, division; instruction sub-cycles and micro-operations; RISC; 2D and 2.5D memory organization, ROM, virtual memory; I/O ports, interrupt hardware, exceptions; x86; parallel processors and cache coherency; interleaving |
| TOC | Moore and Mealy machines, Myhill-Nerode; Kleene's theorem, Arden's theorem; regular grammars, CFG simplification, CNF/GNF, Chomsky hierarchy; DPDA, CFL closure and decision problems; TM modifications, universal TM, linear bounded automata, context-sensitive grammars, Church's thesis, halting problem, reductions |
| Discrete Math | Multisets; cosets, Lagrange's theorem, normal subgroups, permutation groups, homomorphisms, rings and fields; bounded, complemented and modular lattices; Boolean algebra and K-maps; inference theory; tree traversals, BST; multigraphs, bipartite graphs |
| C | Syllabus not fetched. Typical first-year content (general knowledge, unverified): file handling, strings, preprocessor, command-line arguments |

In the other direction, the AKTU-pattern Discrete unit list omits topics GATE names: connectivity, matching, recurrence relations, generating functions. Keep them tagged GATE.

### Lab corner (one block per module)

Experiments below are typical for each subject, not copied from a syllabus. Each lab block = aim, procedure, expected output, 5-8 viva questions.

| Subject | Experiments | App simulator |
| --- | --- | --- |
| OS | fork/exec/wait; scheduling (FCFS, SJF, RR); producer-consumer with semaphores; Banker's; page replacement; disk scheduling | exists for scheduler, semaphores, Banker's, page replacement, disk |
| DBMS | DDL/DML; joins and aggregates; views; triggers; ER design | exists for B+ tree, normalization, serializability; add SQL sandbox |
| CN | TCP/UDP client-server sockets; CRC and checksum; sliding window; subnetting; packet capture; DV and LS routing | add CRC, subnet calculator, sliding window, DV |
| COA | Booth multiplier; IEEE 754 converter; cache simulator; pipeline hazards; assembly | add all five |
| TOC | DFA, NFA, PDA, TM simulators; regex matching | add DFA/NFA/PDA/TM tracer |
| C | arrays, strings, pointers, structures, files, recursion programs | add memory-trace viewer |
| Discrete Math | truth-table generator; Hasse and lattice checker; graph property checker | add all three |

Open question: which university and scheme should the B.Tech tags follow? Unit order and marks differ by university.

## 8. Diagram inventory

Every lesson carries at least one diagram that a student can redraw in an exam; the list below is what each notebook needs, split into static figures and step-through tools. The report shows only five dedicated diagram types in the renderer (three-schema, memory-layout, process-pcb, architecture, seven-state) plus inline-SVG and ASCII fallbacks, so most items below are new.

- One diagram, one idea. The caption says what to notice; alt text states the same.
- Label every node, axis and unit. Same colour = same kind of thing across all notebooks.
- Worked-example overlay: the same figure is shown empty (to redraw) and filled (with a solved case).
- Algorithms get a step-through (previous/next) with the state table beside it.
- Add reusable renderer types: timeline/Gantt, state machine, tree, address-split bar, trace table.

| Subject | Static figures to add | Step-through or interactive to add |
| --- | --- | --- |
| OS | kernel structures (monolithic, layered, microkernel); Gantt templates; resource-allocation graph with a cycle; two-level page-table walk with TLB; segmentation hardware; page-fault handling steps; inode pointer tree; directory structures; file allocation (contiguous, linked, indexed, FAT); RAID 0/1/5 | Peterson and semaphore trace; dining philosophers; first/best/worst-fit allocator; effective-access-time and inode-max-size calculators |
| DBMS | ER legend and worked ER; weak entity; ISA hierarchy; ER-to-tables mapping; query tree; normalization decision flow; slotted page; extendible-hashing directory; wait-die vs wound-wait timelines; log and checkpoint timeline | ER-to-tables converter; relational-algebra evaluator on sample tables; B+ insert/delete stepper; hashing stepper; FD closure and key finder; schedule checker (2PL) |
| CN | delay timeline (transmission, propagation); circuit vs packet vs virtual-circuit timing; bit stuffing; CRC long-division table; stop-and-wait, GBN, SR timelines; CSMA/CD collision timeline; ALOHA throughput curve; Ethernet and IPv4 header layouts; fragmentation tree; CIDR split; NAT table flow; DV tables; Dijkstra table; TCP handshake and teardown; cwnd sawtooth; DNS iterative vs recursive; HTTP RTT timelines | CRC calculator; sliding-window stepper; subnet calculator; fragmentation calculator; DV stepper; cwnd plotter |
| COA | bus diagram; instruction-cycle state diagram; addressing-mode operand paths; carry-lookahead adder; Booth table; IEEE 754 field layout; hardwired vs microprogrammed control blocks; microinstruction format; memory-hierarchy pyramid; cache address splits (direct, set-associative, associative); pipeline space-time chart with stalls and forwarding; DMA controller; interrupt daisy chain | addressing-mode resolver; IEEE converter; Booth stepper; cache hit/miss simulator; pipeline-hazard stepper |
| TOC | DFA, NFA, epsilon-NFA diagrams; subset-construction table; table-filling triangle; RE-to-FA and FA-to-RE; Chomsky hierarchy as nested ellipses; derivation trees; PDA with stack contents; TM tape and transitions; recursive within RE within all languages; reduction arrow | DFA/NFA tracer; minimizer; PDA tracer; TM tracer; pumping-lemma game |
| C | stack frame per call; pointer and array box-and-arrow; 2D row-major address map; recursion tree; macro expansion trace; compile pipeline; bit-mask diagrams | memory-trace viewer (variables, pointers, stack); padding calculator; bitwise playground; precedence parser |
| Discrete Math | Venn diagrams (2 and 3 sets); function mapping diagrams; Cayley tables; lattice examples (M3, N5); graph gallery (K5, K3,3, Petersen); planar embedding with faces; bipartite matching; recurrence tree | truth-table generator; relation-property checker; Hasse and lattice checker; graph-property checker; generating-function expander |

The build-order drawing sits in section 5.

## 9. Question banks

Every lesson ships four sets: a GATE set (1-mark and 2-mark MCQ, MSQ, NAT, easy to hard), B.Tech short answers (2 marks), B.Tech long answers (5 and 10 marks, each with a marking outline), and lab viva (5-8 questions per module). All samples below are original; every numeric answer was recomputed.

- Each answer shows the method and the trap it tests, not only the key.
- NAT answers state units and rounding. MCQ distractors are the common wrong methods.
- Tag each question GATE, B.Tech or both, with difficulty 1-3.

### 9.1 Operating Systems

| Type | Sample question | Answer and method |
| --- | --- | --- |
| NAT | P1 to P4 arrive at 0, 1, 2, 3 ms with CPU bursts 6, 3, 1, 4 ms. Under SRTF, what is the average waiting time (ms)? | 2.75. Completion 14, 5, 3, 9; waiting 8, 1, 0, 2 |
| NAT | 32-bit virtual addresses, 4 KB pages, 4-byte page-table entries, single-level table. Page-table size (MB)? | 4. 2^20 entries x 4 B |
| NAT | TLB lookup 10 ns, memory access 100 ns, hit ratio 90%, single-level paging. Effective access time (ns)? | 120. 0.9 x 110 + 0.1 x 210 |
| B.Tech, 10 marks | Explain the dining philosophers problem, give a deadlock-free semaphore solution, and draw the philosopher state diagram. | Outline: problem and diagram (2); naive solution deadlocks (2); fix by limiting to 4 philosophers or asymmetric pick-up (4); starvation note (2) |

### 9.2 DBMS

| Type | Sample question | Answer and method |
| --- | --- | --- |
| NAT | R(A,B,C,D) with FDs AB to C, C to D, D to A. How many candidate keys? | 3. B is on no right side so it is in every key; keys AB, BC, BD |
| NAT | Block 1024 B, key 8 B, tree pointer 6 B. Maximum pointers in a B+ tree internal node? | 73. 6p + 8(p-1) <= 1024 gives p <= 73.7 |
| MCQ | Schedule r1(A) r2(A) w1(A) w2(A). Is it conflict serializable? | No. r2(A) before w1(A) gives T2 to T1; r1(A) before w2(A) gives T1 to T2; the cycle breaks it |
| B.Tech, 5 marks | Write SQL for the second-highest salary in Emp(id, sal) and say what it returns when there is none. | SELECT MAX(sal) FROM Emp WHERE sal < (SELECT MAX(sal) FROM Emp); returns NULL when no second distinct value exists |

### 9.3 Computer Networks

| Type | Sample question | Answer and method |
| --- | --- | --- |
| NAT | Stop-and-wait, 1000-bit frames, 1 Mbps, one-way propagation 20 ms, ACK time ignored. Utilization (%)? | 2.44. Tt = 1 ms, U = 1/(1 + 2 x 20) |
| NAT | Same link with Go-Back-N. Sequence-number bits for 100% utilization? | 6. Window 1 + 2a = 41, GBN needs 42 numbers, 2^6 = 64 |
| NAT | 192.168.40.0/22 is split into 8 equal subnets. Usable hosts per subnet? | 126. Each is a /25: 128 - 2 |
| NAT | CRC with generator x^3 + x + 1 and data 1101. Transmitted codeword? | 1101001. Append 000, remainder 001 |
| NAT | Tahoe timeout at cwnd = 24 MSS. Give cwnd at the start of RTT 0 to 5. | 1, 2, 4, 8, 12, 13. ssthresh = 12, then +1 per RTT |
| B.Tech, 10 marks | Compare pure and slotted ALOHA and derive maximum throughput. | Outline: model (2); S = G e^(-2G), max 1/(2e) = 0.184 at G = 0.5 (3); S = G e^(-G), max 1/e = 0.368 at G = 1 (3); vulnerable-period diagram (2) |

### 9.4 Computer Organization

| Type | Sample question | Answer and method |
| --- | --- | --- |
| NAT | 32-bit address, 16 KB cache, 64 B blocks, 4-way set associative. Tag bits? | 20. Offset 6, 64 sets so index 6 |
| NAT | L1 hit 1 ns, miss 10%; L2 hit 10 ns, local miss 20%; memory 100 ns. AMAT (ns)? | 4. 1 + 0.1 x (10 + 0.2 x 100) |
| NAT | 5-stage pipeline, 2 ns clock, 1000 instructions, no stalls, baseline 5 clock periods per instruction. Speedup? | 4.98. 10000 ns / 2008 ns |
| NAT | -6.75 in IEEE 754 single precision. Hex? | C0D80000. 6.75 = 1.1011 x 2^2, exponent 129 |
| B.Tech, 10 marks | Compare hardwired and microprogrammed control with block diagrams. | Outline: both diagrams (4); speed vs flexibility (3); microinstruction format (2); example (1) |

### 9.5 Theory of Computation

| Type | Sample question | Answer and method |
| --- | --- | --- |
| NAT | Minimal DFA states for binary strings (MSB first) divisible by 5? | 5. One state per remainder 0 to 4, all distinguishable |
| MSQ | Which are closed for context-free languages: union, intersection, complement, intersection with a regular language, Kleene star? | Union, intersection with a regular language, Kleene star |
| MCQ | Given a Turing machine M, is L(M) empty? | Undecidable (Rice's theorem, non-trivial property); decidable for a DFA by reachability |
| B.Tech, 5 marks | Prove that a^n b^n is not regular. | Outline: pumping length p (1); s = a^p b^p (1); y lies in the a's (1); xy^2z has more a's than b's (1); contradiction (1) |

### 9.6 Programming in C

| Type | Sample question | Answer and method |
| --- | --- | --- |
| MCQ | `char s[] = "GATE"; printf("%zu %zu", sizeof(s), strlen(s));` | 5 4. sizeof counts the terminating null |
| NAT | `int f(int n){ static int c=0; c+=n; return n<=1 ? c : f(n-1); }` What does `f(4)` return? | 10. c accumulates 4 + 3 + 2 + 1 |
| NAT | `int a[3][4]` at address 1000, int is 4 bytes. Address of `a[2][1]`? | 1036. 1000 + (2 x 4 + 1) x 4 |
| MCQ | `struct { char a; int b; char c; }` with 4-byte aligned int. sizeof? | 12. Reordering to int first gives 8 |
| B.Tech, 2 marks | `#define SQ(x) x*x` gives what for `SQ(2+3)`? | 11, since it expands to 2+3\*2+3 |

### 9.7 Discrete Mathematics

| Type | Sample question | Answer and method |
| --- | --- | --- |
| NAT | Onto functions from a 4-element set to a 3-element set? | 36. 3^4 - 3 x 2^4 + 3 x 1 |
| NAT | Labelled spanning trees of K5? | 125. Cayley: 5^3 |
| NAT | a(n) = 3a(n-1) - 2a(n-2), a(0) = 1, a(1) = 4. Find a(10). | 3070. Roots 1 and 2 give a(n) = 3 x 2^n - 2 |
| NAT | Order of the element 3 in (Z12, +)? | 4. 12 / gcd(3, 12) |
| MCQ | Negation of: for all x there exists y with x < y. | There exists x such that for all y, x >= y |
| B.Tech, 10 marks | State and prove Lagrange's theorem. | Outline: statement (1); cosets partition G (3); all cosets have equal size (3); order of G = index x order of H (2); corollary on element order (1) |

## 10. Formula and trap sheets

Each module ends with a one-page sheet: the rule, plus the trap that costs marks. Sheets below are the content for those pages; formulas are plain text and every unit assumption is in the note.

### 10.1 Operating Systems

| Rule | Note and trap |
| --- | --- |
| Turnaround = completion - arrival; waiting = turnaround - burst; response = first run - arrival | Break ties by arrival, then lower process id, unless stated |
| Page-table size = 2^(VA bits - offset bits) × PTE size | Offset bits = log2(page size); entries count pages, not frames |
| Entries per page = page size ÷ PTE size; levels = ceil(page-number bits ÷ index bits per level) | The top level may be smaller than a page |
| EAT with TLB = h(t + m) + (1 - h)(t + (k + 1)m) | k-level paging, TLB lookup t, memory m; some questions drop t |
| EAT with demand paging = (1 - p) × m + p × fault service time | p = page-fault rate; convert ms to ns first |
| Disk access = seek + rotational latency + transfer; average latency = 30000 ÷ RPM ms | Average latency is half a rotation; transfer = bytes ÷ rate |
| Need = Max - Allocation; safe if a sequence exists with Need <= Work | Add Allocation back to Work after each process finishes |
| Deadlock-free if resources >= n(k - 1) + 1 | n processes, each needing at most k of one identical resource type |
| Inode max file size = (direct + P + P^2 + P^3) × block size, P = block size ÷ pointer size | Count pointers per block, not bytes |
| Semaphore starts: mutex = 1, empty = N, full = 0 | Swapping the order of wait calls deadlocks the bounded buffer |
| FIFO can show Belady's anomaly; LRU and Optimal cannot | Stack algorithms never get worse with more frames |
| Peterson: set flag\[i\], set turn = j, wait while flag\[j\] and turn = j | Gives mutual exclusion, progress and bounded waiting for 2 processes |

### 10.2 DBMS

| Rule | Note and trap |
| --- | --- |
| Closure X+: keep adding the right side of any FD whose left side is inside the set | Attributes on no right side belong to every key |
| Binary split R1, R2 is lossless iff (R1 ∩ R2) → R1 or (R1 ∩ R2) → R2 | Lossless does not imply dependency-preserving |
| BCNF: every FD has a superkey on the left; 3NF: superkey on the left or a prime attribute on the right | 3NF always has a dependency-preserving lossless decomposition; BCNF may not |
| Blocking factor = floor(B ÷ R); blocks = ceil(r ÷ bf) | Floor first, then ceil |
| Dense index entries = r; sparse index entries = number of data blocks | Sparse needs a sorted data file |
| B+ internal order p: p × P + (p - 1) × K <= B; leaf keys m: m × (K + Pr) + P <= B | Order p is pointers; keys are p - 1 |
| Extendible hashing: directory size = 2^(global depth); local depth <= global depth | Splitting a full bucket whose local depth equals global doubles the directory |
| Conflict serializable iff the precedence graph is acyclic | Edge Ti to Tj only for conflicting operations (read-write, write-read, write-write) of different transactions |
| Serial schedules of n transactions = n! | Count equivalent serial orders from a topological sort |
| Timestamp ordering: read aborts if TS(T) < WTS(Q); write aborts if TS(T) < RTS(Q) or TS(T) < WTS(Q) | Thomas write rule skips an obsolete write (only TS(T) < WTS(Q)) instead of aborting |
| Strict within cascadeless within recoverable | Recoverable: a reader commits after the writer it read from |
| COUNT(\*) counts rows, COUNT(col) skips NULL; WHERE filters rows, HAVING filters groups | A comparison with NULL is UNKNOWN; NOT IN with a NULL in the list returns no rows |
| Natural join with no common attribute = cross product | Join size is at most |

### 10.3 Computer Networks

| Rule | Note and trap |
| --- | --- |
| Tt = L ÷ B; Tp = d ÷ v; RTT = 2 × Tp | Bits vs bytes; v is about 2 × 10^8 m/s in cable; K = 1000 for rates |
| Store-and-forward, n links, p packets of size L: total = (n + p - 1) × L ÷ B + propagation | Pipelining across links starts after the first packet |
| Bandwidth-delay product = B × RTT | Bits in flight; the window needed to fill the pipe |
| Stop-and-wait efficiency = 1 ÷ (1 + 2a), a = Tp ÷ Tt | ACK transmission time ignored unless given |
| GBN and SR efficiency = N ÷ (1 + 2a), at most 1; window for full use = 1 + 2a | Not 2a |
| Sequence numbers: GBN needs N + 1; SR needs 2N | Bits = ceil(log2 of that) |
| CRC: append r zeros (r = degree of generator); remainder is the check; codeword = k + r bits | Division is XOR with no borrow |
| Internet checksum: one's-complement sum of 16-bit words, then complement | Add the carry back in |
| Pure ALOHA S = G e^(-2G), max 0.184 at G = 0.5; slotted S = G e^(-G), max 0.368 at G = 1 | S is throughput per frame time, G is offered load |
| CSMA/CD minimum frame = 2 × Tp × B | Ethernet at 10 Mbps: 512 bits = 64 bytes; Tp is the worst-case one-way delay |
| IPv4 fragment payload is a multiple of 8 bytes except the last; offset = bytes ÷ 8; header = IHL × 4 | MTU includes the header |
| CIDR /p: 2^(32 - p) addresses, 2^(32 - p) - 2 usable hosts; network = IP AND mask; broadcast = network OR NOT mask | Count the usable hosts only when the question says so |
| Bellman-Ford: d(x, y) = min over neighbours v of c(x, v) + d(v, y) | Count-to-infinity; split horizon only reduces it |
| TCP: window = min(cwnd, rwnd); slow start doubles per RTT up to ssthresh, then +1 MSS per RTT; timeout: ssthresh = cwnd ÷ 2, cwnd = 1 MSS | Reno on 3 duplicate ACKs: cwnd = ssthresh = cwnd ÷ 2 (Tahoe restarts at 1) |
| HTTP non-persistent = 2 RTT per object; persistent with pipelining = about 1 RTT for all objects | DNS iterative: the client asks each server in turn |

### 10.4 Computer Organization

| Rule | Note and trap |
| --- | --- |
| CPU time = IC × CPI × clock period; MIPS = clock rate ÷ (CPI × 10^6) | Weighted CPI over instruction mix |
| Amdahl: speedup = 1 ÷ ((1 - f) + f ÷ s) | f is the fraction of original time that is enhanced |
| Cache: blocks = size ÷ block; sets = blocks ÷ ways; offset = log2(block); index = log2(sets); tag = address bits - index - offset | Fully associative has no index; direct-mapped has sets = blocks |
| AMAT = hit time + miss rate × miss penalty; two levels: H1 + m1 × (H2 + m2 × P) | m2 is the local miss rate of L2 |
| Pipeline time = (k + n - 1) × clock period; speedup = n × k ÷ (k + n - 1) | k stages, n instructions; stalls add straight to cycles |
| With stalls: CPI = 1 + stalls per instruction; speedup = k ÷ CPI | Same clock assumed |
| IEEE 754 single: (-1)^s × 1.f × 2^(e - 127), fields 1, 8, 23; double: bias 1023, fields 1, 11, 52 | e = 0 is denormal; all ones is infinity or NaN |
| Two's complement range: -2^(n-1) to 2^(n-1) - 1; overflow if carry into sign bit differs from carry out | Adding two like-signed numbers is the only overflow case |
| Booth recoding on (current, previous) bit: 00 gives 0, 01 gives +M, 10 gives -M, 11 gives 0 | Arithmetic right shift keeps the sign |
| Chips needed = total size ÷ chip size; address lines = log2(size) | Word-addressable vs byte-addressable changes the line count |
| Control memory = microinstructions × width; horizontal width is about one bit per control signal | Vertical encodes fields and needs decoders |
| DMA cycle stealing takes single bus cycles; burst mode holds the bus for the whole block | CPU time lost = cycles stolen |
| Indirect addressing adds one memory access per level; immediate adds none | Count operand fetches separately from instruction fetch |

## Sources

- [GATE 2027 CS syllabus PDF, IIT Madras](https://gate2027.iitm.ac.in/static/doc/GATE2027_Syllabus/CS_GATE2027_Syllabus.pdf)
- [GATE 2027 test papers and syllabus page, IIT Madras](https://gate2027.iitm.ac.in/exam_papers_and_syllabus)
- [GO Classes: GATE 2027 CSE and DA syllabus changes](https://www.goclasses.in/blog/gate-2027-cse-da-syllabus-analysis-what-has-changed-and-what-hasn-t)
- [AspirantMitraa: GATE CS 2027 syllabus and weightage](https://www.aspirantmitraa.com/exams/gate-cs-2027-syllabus)
- [PW: GATE CSE syllabus 2027](https://www.pw.live/gate/exams/gate-cse-syllabus)
