import { CourseMeta } from "./types";

export const COA_COURSE: CourseMeta = {
  id: "computer-organization",
  title: "Computer Organization & Architecture",
  slug: "computer-organization",
  subjectSlug: "computer-organization",
  shortTitle: "COA",
  icon: "🖥️",
  color: "bg-cyan-400",
  tagline:
    "Master CPU pipelining, cache bit-splitting arithmetic, IEEE 754 float encoding, Booth's multiplication, and microprogrammed control units.",
  description:
    "A rigorous, mathematically precise study notebook covering the internal architecture and operational hardware of modern computing systems. Designed for undergraduate university excellence and top-rank GATE CS/IT performance.",
  level: "Undergraduate / GATE CS",
  estimatedHours: 42,
  prerequisites: [
    "Digital Logic (Boolean algebra, flip-flops, multiplexers, decoders)",
    "Elementary C Programming (Pointers, binary data representation)",
  ],
  learningOutcomes: [
    "Calculate exact tag, index, and offset bits for direct, associative, and set-associative caches",
    "Compute Average Memory Access Time (AMAT) across multi-level hierarchical memory architectures",
    "Design expanding opcodes and calculate instruction field capacities for multi-address architectures",
    "Solve instruction pipeline timing, cycle counts, stall bubbles, and operand forwarding paths",
    "Encode and decode IEEE 754 single and double precision floating-point numbers",
    "Execute Booth's 2's complement multiplication and analyze arithmetic overflow conditions",
    "Calculate horizontal vs vertical microinstruction control store capacities and field widths",
    "Analyze DMA cycle-stealing vs burst mode CPU utilization during high-speed I/O transfers",
  ],
  gateWeightage: "6 - 10 Marks",
  gateSyllabusTopics: [
    "Machine instructions and addressing modes",
    "ALU, data-path and control unit (hardwired and microprogrammed)",
    "Instruction pipelining, pipeline hazards (structural, data, control)",
    "Memory hierarchy: cache memory mapping (direct, associative, set-associative), AMAT, replacement",
    "I/O interface: interrupt and DMA (cycle stealing, burst transfer)",
  ],
  modules: [
    // =========================================================================
    // MODULE 1: INSTRUCTIONS & ADDRESSING MODES
    // =========================================================================
    {
      id: "coa-module-1-instructions-and-addressing",
      title: "Module 1: Machine Instructions & Addressing Modes",
      slug: "instructions-and-addressing",
      description:
        "Instruction cycle, 0/1/2/3-address formats, expanding opcodes, and effective address computation across classical addressing modes.",
      order: 1,
      lessons: [
        {
          id: "addressing-modes-and-instruction-formats",
          title: "Addressing Modes, Effective Address & Expanding Opcodes",
          slug: "addressing-modes-and-instruction-formats",
          order: 1,
          estimatedMinutes: 24,
          tagline: "EA calculations, memory reference counting, and opcode bit allocations.",
          hasInteractive: false,
          hasGATE: true,
          hasPractice: true,
          sections: [
            {
              type: "explanation",
              heading: "1. The Classical Addressing Modes & Effective Address (EA)",
              body: [
                "An addressing mode specifies the rule for interpreting or modifying the address field of the instruction before the operand is actually accessed. The address of the target operand in memory is called the Effective Address (EA).",
                "Key Addressing Modes:",
                "1. Immediate Mode: Operand is contained directly within the instruction itself (e.g., ADD R1, #5). EA = None. Zero memory references to fetch operand.",
                "2. Register Mode: Operand resides in a CPU register (e.g., ADD R1, R2). EA = Register address. Zero memory references.",
                "3. Direct (Absolute) Mode: The address field contains the exact memory address of the operand (e.g., ADD R1, 1000). EA = Address field (A). Requires 1 memory reference.",
                "4. Indirect Mode: The address field contains a pointer to the memory location that holds the operand's actual address (e.g., ADD R1, @1000). EA = Memory[A]. Requires 2 memory references.",
                "5. Register Indirect Mode: The instruction specifies a CPU register that holds the effective memory address (e.g., ADD R1, (R2)). EA = [R2]. Requires 1 memory reference.",
                "6. Indexed Mode: EA = Base Address (in instruction) + Index Register (IR). Ideal for sequential array traversal (A[i]).",
                "7. Base Register Mode: EA = Base Register (BR) + Displacement. Used for program relocation in memory.",
                "8. Relative Mode: EA = Program Counter (PC) + Offset. Crucial for position-independent conditional branch instructions.",
                "9. Auto-Increment / Auto-Decrement: EA = [R]; then R <- R + d (or R <- R - d; then EA = [R]). Ideal for stack implementations.",
              ],
              callout: {
                kind: "gate-tip",
                title: "Memory Accesses for Instruction Execution",
                message:
                  "Always count the instruction fetch itself! For example, an instruction 'ADD (R1)' requires: 1 memory access to fetch the instruction + 1 memory access to read the operand from memory address in R1 = Total 2 memory accesses.",
              },
            },
            {
              type: "gate-analysis",
              heading: "2. GATE Worked Numerical: Expanding Opcode Design",
              weightage: "2 Marks (Compulsory Type in GATE CS)",
              trap: "Every unassigned code at a higher level multiplies by 2^k at the next level, where k is the number of bits in the freed operand field!",
              solutionSteps: [
                "Problem: A 16-bit instruction format has 4-bit operand register addresses. The processor supports 3-address, 2-address, and 1-address instructions.",
                "There are 14 three-address instructions and 30 two-address instructions. Find the maximum number of 1-address instructions that can be formulated.",
                "Step 1: Format breakdown for 16-bit word with 4-bit fields:",
                "  3-address format: [Opcode (4 bits)] [Reg1 (4 bits)] [Reg2 (4 bits)] [Reg3 (4 bits)].",
                "  A 4-bit opcode allows 2^4 = 16 total patterns.",
                "Step 2: 14 three-address instructions are used: 16 - 14 = 2 prefixes remain available for expansion.",
                "Step 3: In 2-address format: [Opcode (4 bits)] [Prefix from Reg1 (4 bits)] [Reg2 (4 bits)] [Reg3 (4 bits)].",
                "  Each free prefix expands into 2^4 = 16 two-address instructions.",
                "  Total possible 2-address instructions = 2 * 16 = 32.",
                "  30 two-address instructions are used: 32 - 30 = 2 prefixes remain free for 1-address expansion.",
                "Step 4: In 1-address format: The next 4-bit register field is freed.",
                "  Each of the 2 remaining prefixes expands into 2^4 = 16 one-address instructions.",
                "  Maximum 1-address instructions = 2 * 16 = 32 instructions.",
              ],
            },
            {
              type: "resources",
              heading: "3. References & Curated Study Materials",
              sources: [
                {
                  title: "Computer Organization and Embedded Systems (6th Edition)",
                  authors: "Carl Hamacher, Zvonko Vranesic, Safwat Zaky, Naraig Manjikian",
                  year: "2011",
                  publisher: "McGraw-Hill",
                  link: "https://www.mheducation.com",
                  relevance:
                    "Chapter 2: Machine Instructions and Programs — rigorous classification of instruction formats, memory operand access cycles, and assembly semantics.",
                },
                {
                  title: "Computer System Architecture (3rd Edition)",
                  authors: "M. Morris Mano",
                  year: "1993",
                  publisher: "Pearson",
                  link: "https://www.pearson.com",
                  relevance:
                    "Chapter 8: Central Processing Unit — classical textbook diagrams of addressing modes and stack organization.",
                },
              ],
              videos: [
                {
                  title: "Addressing Modes with Effective Address Numerical Examples",
                  creator: "Gate Smashers",
                  duration: "19 mins",
                  url: "https://www.youtube.com/playlist?list=PLxCzCOWd7aiHMonh3G6QNKq53C6oNXGrX",
                  whyThisHelps:
                    "Clear breakdown of memory reference counting and PC-relative offset calculations.",
                },
              ],
            },
          ],
        },
      ],
    },

    // =========================================================================
    // MODULE 2: ALU & COMPUTER ARITHMETIC
    // =========================================================================
    {
      id: "coa-module-2-alu-and-arithmetic",
      title: "Module 2: ALU, IEEE 754 Floating Point & Booth's Multiplication",
      slug: "alu-and-arithmetic",
      description:
        "2's complement arithmetic, overflow detection, Booth's multiplication algorithm, restoring/non-restoring division, and IEEE 754 single/double precision encoding.",
      order: 2,
      lessons: [
        {
          id: "ieee-754-and-booth-multiplication",
          title: "IEEE 754 Floating Point & Booth's Algorithm",
          slug: "ieee-754-and-booth-multiplication",
          order: 1,
          estimatedMinutes: 26,
          tagline: "Single/Double precision bit layouts, normalized/denormalized values, and Booth bit-pair recoding.",
          hasInteractive: false,
          hasGATE: true,
          hasPractice: true,
          sections: [
            {
              type: "explanation",
              heading: "1. The IEEE 754 Floating-Point Representation Standard",
              body: [
                "The IEEE 754 standard encodes real numbers in the normalized scientific form: (-1)^S * (1.M) * 2^(E - Bias).",
                "1. Single Precision (32 bits):",
                "  - Sign (S): 1 bit (0 = positive, 1 = negative).",
                "  - Exponent (E): 8 bits (biased by Bias = 127). Raw E ranges from 1 to 254 (0 and 255 are reserved). True exponent e = E - 127.",
                "  - Mantissa / Fraction (M): 23 bits (with an implicit leading 1: 1.M).",
                "2. Double Precision (64 bits):",
                "  - Sign (S): 1 bit.",
                "  - Exponent (E): 11 bits (biased by Bias = 1023). Raw E ranges from 1 to 2046. True exponent e = E - 1023.",
                "  - Mantissa (M): 52 bits (implicit leading 1: 1.M).",
                "Special IEEE 754 Encodings:",
                "- Zero: E = 0, M = 0 (both +0.0 and -0.0 exist depending on S).",
                "- Denormalized (Subnormal) Numbers: E = 0, M != 0. Value = (-1)^S * (0.M) * 2^(-126) for single precision. Eliminates abrupt underflow!",
                "- Infinity (+/- inf): E = 255 (all 1s), M = 0.",
                "- Not a Number (NaN): E = 255 (all 1s), M != 0 (e.g. 0/0, sqrt(-1)).",
              ],
            },
            {
              type: "gate-analysis",
              heading: "2. GATE Worked Numerical: Encoding Real Decimal to IEEE 754 Hex",
              weightage: "2 Marks",
              trap: "Remember the bias is 127! When converting the true binary exponent e, calculate stored exponent E = e + 127 in unsigned 8-bit binary.",
              solutionSteps: [
                "Problem: Convert the decimal number -13.625 into IEEE 754 single-precision floating-point format and express the result in hexadecimal.",
                "Step 1: Determine Sign bit: Number is negative -> S = 1.",
                "Step 2: Convert magnitude to binary:",
                "  Integer part 13 = 1101_2.",
                "  Fractional part 0.625 = 0.5 + 0.125 = 2^-1 + 2^-3 = 0.101_2.",
                "  13.625 = 1101.101_2.",
                "Step 3: Normalize to 1.M * 2^e form:",
                "  1101.101 = 1.101101 * 2^3 -> True exponent e = 3.",
                "  Mantissa M = 10110100000000000000000 (padded with trailing zeros to 23 bits).",
                "Step 4: Compute Biased Exponent E:",
                "  E = e + Bias = 3 + 127 = 130 = 10000010_2 (8 bits).",
                "Step 5: Assemble 32 bits:",
                "  [S (1 bit)] [E (8 bits)] [M (23 bits)]",
                "  1 10000010 10110100000000000000000",
                "Step 6: Regroup into 4-bit nibbles for Hexadecimal:",
                "  1100 0001 0101 1010 0000 0000 0000 0000",
                "  Hexadecimal Representation = 0xC15A0000.",
              ],
            },
            {
              type: "explanation",
              heading: "3. Booth's Multiplication Algorithm for Signed 2's Complement",
              body: [
                "Booth's algorithm multiplies two signed 2's complement numbers without sign extension or separate magnitude handling, treating strings of consecutive 1s efficiently.",
                "Hardware Datapath: Accumulator (A, initialized to 0), Multiplier register (Q), extra bit Q_-1 (initialized to 0), and Multiplicand register (M).",
                "At each step, examine the two lowest bits: (Q_0, Q_-1):",
                "1. If 10: A <- A - M (beginning of a block of 1s); then Arithmetic Right Shift (ARS) [A, Q, Q_-1].",
                "2. If 01: A <- A + M (end of a block of 1s); then Arithmetic Right Shift (ARS) [A, Q, Q_-1].",
                "3. If 00 or 11: No addition/subtraction; simply Arithmetic Right Shift (ARS) [A, Q, Q_-1].",
                "Repeat for n cycles (where n is the number of bits in the multiplier). The final product is stored across [A, Q].",
              ],
              callout: {
                kind: "gate-tip",
                title: "Arithmetic Right Shift (ARS) Invariant",
                message:
                  "In Arithmetic Right Shift, the sign bit (MSB of A) is PRESERVED and duplicated into the next position: A[n-1] remains A[n-1]. In Logical Right Shift, a 0 is always shifted into MSB.",
              },
            },
            {
              type: "resources",
              heading: "4. References & Curated Study Materials",
              sources: [
                {
                  title: "Computer Architecture: A Quantitative Approach (6th Edition)",
                  authors: "John L. Hennessy, David A. Patterson",
                  year: "2017",
                  publisher: "Morgan Kaufmann",
                  link: "https://www.elsevier.com",
                  relevance:
                    "Appendix J: Computer Arithmetic — authoritative mathematical analysis of IEEE 754 rounding modes, guard bits, and Booth multiplication recoding.",
                },
              ],
              videos: [
                {
                  title: "IEEE 754 Floating Point Representation Solved Examples",
                  creator: "Neso Academy",
                  duration: "21 mins",
                  url: "https://www.youtube.com/playlist?list=PLBlnK6fEyqRgMCUAG0XRw78UA8qnv6jEx",
                  whyThisHelps:
                    "Detailed walk-through of biased exponents, hidden bit conventions, and special condition encodings.",
                },
                {
                  title: "Booth's Algorithm for Signed Multiplication Step-by-Step",
                  creator: "Gate Smashers",
                  duration: "18 mins",
                  url: "https://www.youtube.com/playlist?list=PLxCzCOWd7aiHMonh3G6QNKq53C6oNXGrX",
                  whyThisHelps:
                    "Clear tabular execution of Booth cycles showing arithmetic right shifts on negative numbers.",
                },
              ],
            },
          ],
        },
      ],
    },

    // =========================================================================
    // MODULE 3: MEMORY HIERARCHY & CACHE DESIGN
    // =========================================================================
    {
      id: "coa-module-3-memory-hierarchy-and-cache",
      title: "Module 3: Memory Hierarchy, Cache Mapping & AMAT",
      slug: "memory-hierarchy-and-cache",
      description:
        "Direct-mapped, fully associative, and k-way set-associative cache bit splitting, Average Memory Access Time (AMAT), and write policies.",
      order: 3,
      lessons: [
        {
          id: "cache-mapping-and-amat-calculations",
          title: "Cache Memory: Direct, Associative, Set-Associative & AMAT",
          slug: "cache-mapping-and-amat-calculations",
          order: 1,
          estimatedMinutes: 28,
          tagline: "Tag/Index/Offset bit splitting, multi-level cache AMAT, and write-back policies.",
          hasInteractive: false,
          hasGATE: true,
          hasPractice: true,
          sections: [
            {
              type: "explanation",
              heading: "1. The Principle of Locality & The Three Cache Mapping Techniques",
              body: [
                "Caches exploit Temporal Locality (recently referenced items will likely be referenced again soon) and Spatial Locality (items with nearby addresses will likely be referenced soon).",
                "Physical Address Division:",
                "1. Block (Byte) Offset bits = log2(Block Size in bytes). Identifies the exact byte within the cache line.",
                "2. Direct-Mapped Cache: Each main memory block maps to exactly ONE cache line: Cache Line = (Block Address) mod (Total Cache Lines).",
                "   Address Split: [ Tag Bits | Index Bits (log2 Lines) | Block Offset Bits ].",
                "3. Fully Associative Cache: A memory block can be placed in ANY available cache line. No conflict misses; requires expensive parallel comparators for every line.",
                "   Address Split: [ Tag Bits | Block Offset Bits ] (No Index bits!).",
                "4. k-way Set-Associative Cache: Cache lines are partitioned into Sets of k lines each. A block maps to a specific set: Set = (Block Address) mod (Total Sets). Within the set, it can occupy any of the k lines.",
                "   Address Split: [ Tag Bits | Set Index Bits (log2 Sets) | Block Offset Bits ].",
              ],
              callout: {
                kind: "gate-tip",
                title: "Fundamental Formula for Number of Sets",
                message:
                  "Total Sets = (Total Cache Capacity) / (Block Size * k). For example, a 64 KB 4-way set-associative cache with 32-byte blocks has: Sets = 64 KB / (32 B * 4) = 65,536 / 128 = 512 sets => 9 Set Index bits.",
              },
            },
            {
              type: "gate-analysis",
              heading: "2. GATE Worked Numerical: Cache Bit-Splitting Arithmetic",
              weightage: "2 Marks (High Frequency in GATE CS)",
              trap: "Do NOT confuse Cache Lines with Cache Sets in set-associative caches! Number of Sets = Lines / k.",
              solutionSteps: [
                "Problem: A computer system has a 32-bit physical byte address. The memory hierarchy includes a 64 KB 4-way set-associative cache with 64-byte block size. Find:",
                "1. Number of Offset bits, Set bits, and Tag bits.",
                "2. Total cache memory overhead (tag directory size) assuming 1 valid bit and 1 dirty bit per line.",
                "Step 1: Offset bits = log2(Block Size) = log2(64 bytes) = 6 bits.",
                "Step 2: Total Cache Lines = Cache Size / Block Size = 64 KB / 64 B = 1024 lines.",
                "Step 3: Total Sets = Lines / k = 1024 / 4 = 256 sets.",
                "Step 4: Set Index bits = log2(256) = 8 bits.",
                "Step 5: Tag bits = Total Address bits - Set bits - Offset bits = 32 - 8 - 6 = 18 bits.",
                "Step 6: Tag Directory Overhead calculation:",
                "  Each line stores: Tag (18 bits) + Valid bit (1 bit) + Dirty bit (1 bit) = 20 bits per line.",
                "  Total lines = 1024.",
                "  Tag Directory Size = 1024 * 20 bits = 20,480 bits = 2560 bytes = 2.5 KB.",
              ],
            },
            {
              type: "explanation",
              heading: "3. Average Memory Access Time (AMAT) Formulation",
              body: [
                "AMAT models the effective latency perceived by the CPU when accessing memory:",
                "Single-Level Cache: AMAT = Hit_Time + (Miss_Rate * Miss_Penalty).",
                "Two-Level Cache Hierarchy (L1 and L2):",
                "AMAT = L1_Hit_Time + L1_Miss_Rate * (L2_Hit_Time + L2_Local_Miss_Rate * Main_Memory_Access_Time).",
                "Global Miss Rate vs Local Miss Rate:",
                "- Local Miss Rate of L2 = (L2 Misses) / (L1 Misses).",
                "- Global Miss Rate of L2 = (L2 Misses) / (Total CPU Memory References) = L1_Miss_Rate * L2_Local_Miss_Rate.",
              ],
            },
            {
              type: "gate-analysis",
              heading: "4. GATE Worked Numerical: Multi-Level Cache AMAT",
              weightage: "2 Marks",
              trap: "Always check whether L2 miss rate is given as LOCAL miss rate or GLOBAL miss rate!",
              solutionSteps: [
                "Problem: An L1 cache has hit time = 1 ns and miss rate = 8%. An L2 cache has hit time = 8 ns and local miss rate = 15%. Main memory access time is 100 ns. Calculate the overall AMAT.",
                "Step 1: Apply multi-level AMAT equation:",
                "  AMAT = T_L1 + M_L1 * (T_L2 + M_L2 * T_MM)",
                "Step 2: Substitute values:",
                "  AMAT = 1 ns + 0.08 * (8 ns + 0.15 * 100 ns)",
                "Step 3: Evaluate inner term:",
                "  8 ns + 15 ns = 23 ns (Effective penalty of an L1 miss).",
                "Step 4: Complete calculation:",
                "  AMAT = 1 ns + (0.08 * 23 ns) = 1 ns + 1.84 ns = 2.84 ns.",
              ],
            },
            {
              type: "resources",
              heading: "5. References & Curated Study Materials",
              sources: [
                {
                  title: "Computer Organization and Design: The Hardware/Software Interface (5th Edition)",
                  authors: "David A. Patterson, John L. Hennessy",
                  year: "2013",
                  publisher: "Morgan Kaufmann",
                  link: "https://www.elsevier.com",
                  relevance:
                    "Chapter 5: Large and Fast: Exploiting Memory Hierarchy — the gold-standard reference for cache architectures, AMAT derivations, and multi-level memory benchmarking.",
                },
              ],
              videos: [
                {
                  title: "Cache Mapping Techniques: Direct, Associative, Set-Associative Solved Numericals",
                  creator: "Gate Smashers",
                  duration: "25 mins",
                  url: "https://www.youtube.com/playlist?list=PLxCzCOWd7aiHMonh3G6QNKq53C6oNXGrX",
                  whyThisHelps:
                    "Complete coverage of bit splitting, tag comparison logic, and memory overhead calculation.",
                },
                {
                  title: "Average Memory Access Time (AMAT) Multi-Level Derivations",
                  creator: "Knowledge Gate",
                  duration: "16 mins",
                  url: "https://www.youtube.com/playlist?list=PLmXKhU9FNesTpQnBB4e0sEyZEGrBNKhJ2",
                  whyThisHelps:
                    "Clear distinction between local and global miss rates in past GATE papers.",
                },
              ],
            },
          ],
        },
      ],
    },

    // =========================================================================
    // MODULE 4: INSTRUCTION PIPELINING & HAZARDS
    // =========================================================================
    {
      id: "coa-module-4-instruction-pipelining",
      title: "Module 4: Instruction Pipelining, Hazards & Performance",
      slug: "instruction-pipelining",
      description:
        "5-stage pipeline, speedup formulas, structural hazards, data hazards (RAW, WAR, WAW), operand forwarding, and branch penalties.",
      order: 4,
      lessons: [
        {
          id: "pipeline-hazards-and-speedup-calculations",
          title: "Instruction Pipelining: Stages, Speedup & Hazards",
          slug: "pipeline-hazards-and-speedup-calculations",
          order: 1,
          estimatedMinutes: 28,
          tagline: "Clock period = max(stage) + latch, RAW data stalls, forwarding, and branch penalties.",
          hasInteractive: false,
          hasGATE: true,
          hasPractice: true,
          sections: [
            {
              type: "explanation",
              heading: "1. The Pipelined Processor Principle & Speedup",
              body: [
                "Pipelining overlaps the execution of multiple instructions simultaneously across independent hardware stages. The classic RISC integer pipeline has 5 stages:",
                "1. IF (Instruction Fetch): Fetch instruction from instruction cache using PC; increment PC.",
                "2. ID / RF (Instruction Decode / Register Fetch): Decode opcode and read operand registers.",
                "3. EX (Execute / ALU): Perform arithmetic/logic operation or calculate effective memory address.",
                "4. MEM (Memory Access): Read or write data from/to data cache (only for LOAD/STORE instructions).",
                "5. WB (Write Back): Write the ALU result or loaded data back into the destination register.",
                "Clock Cycle Time (T_clock): The pipeline stage with the longest propagation delay dictates the clock frequency. T_clock = max(Stage_Delay_i) + Latch_Delay.",
                "Ideal Speedup (S): For n instructions on a k-stage pipeline:",
                "Non-pipelined time T_nonpipe = n * k * T_clock.",
                "Pipelined time T_pipe = [k + (n - 1)] * T_clock.",
                "Speedup S = (n * k) / (k + n - 1). As n -> infinity, Speedup -> k (number of stages).",
              ],
            },
            {
              type: "explanation",
              heading: "2. The Three Pipeline Hazards & Solutions",
              body: [
                "A hazard is any condition that prevents the next instruction from executing in its designated clock cycle.",
                "1. Structural Hazard (Resource Conflict): Hardware cannot support all possible combinations of instructions in the same cycle (e.g., a single memory port accessed by both IF and MEM simultaneously). Solution: Separate Instruction and Data memories (Harvard architecture / split L1 caches).",
                "2. Data Hazard: Instruction depends on the result of a prior instruction that is still in the pipeline. Three types: RAW (Read-After-Write, True dependency), WAR (Write-After-Read, Anti-dependency), WAW (Write-After-Write, Output dependency). Only RAW occurs in in-order pipelines!",
                "   Remedies for RAW: (a) Hardware Stalling (inserting pipeline bubbles), (b) Operand Forwarding / Bypassing (routing ALU output from EX/MEM or MEM/WB register directly back to ALU input, eliminating stalls), (c) Compiler code reordering.",
                "3. Control Hazard (Branch Hazard): Pipelining makes decisions on conditional branch instructions before the branch condition and target address are resolved. Remedies: Branch prediction, Branch Target Buffer (BTB), Delayed Branching.",
              ],
              callout: {
                kind: "gate-tip",
                title: "Register File Half-Cycle Assumption",
                message:
                  "In GATE problems, unless stated otherwise, assume: Registers are written during the FIRST half of the clock cycle (WB stage), and read during the SECOND half (ID stage). This allows an instruction to read the newly written value in the same clock cycle without an extra stall!",
              },
            },
            {
              type: "gate-analysis",
              heading: "3. GATE Worked Numerical: Unequal Stage Delays & Effective CPI",
              weightage: "2 Marks (High Frequency)",
              trap: "Clock cycle is set by the SLOWEST stage + latch delay! Non-pipelined time is the SUM of stage delays (without latches).",
              solutionSteps: [
                "Problem: A 5-stage pipeline has stage delays of 150 ps, 120 ps, 200 ps, 160 ps, and 100 ps. The pipeline register (latch) delay is 20 ps. 25% of instructions are conditional branches causing 2 stall cycles. For a large program of 10^6 instructions, find:",
                "1. Clock cycle time.",
                "2. Effective CPI.",
                "3. Speedup over a non-pipelined processor.",
                "Step 1: Clock Cycle Time = max(150, 120, 200, 160, 100) + 20 ps = 200 ps + 20 ps = 220 ps.",
                "Step 2: Effective CPI = Ideal CPI + Branch Penalty = 1 + (0.25 * 2) = 1 + 0.5 = 1.5 cycles/instruction.",
                "Step 3: Average time per instruction in pipelined execution = CPI * T_clock = 1.5 * 220 ps = 330 ps.",
                "Step 4: Non-pipelined execution time per instruction = Sum of stage delays = 150 + 120 + 200 + 160 + 100 = 730 ps.",
                "Step 5: Speedup S = Non-pipelined time / Pipelined time = 730 ps / 330 ps approx 2.21.",
              ],
            },
            {
              type: "resources",
              heading: "4. References & Curated Study Materials",
              sources: [
                {
                  title: "Computer Organization and Design RISC-V Edition",
                  authors: "David A. Patterson, John L. Hennessy",
                  year: "2017",
                  publisher: "Morgan Kaufmann",
                  link: "https://www.elsevier.com",
                  relevance:
                    "Chapter 4: The Processor — rigorous timing diagrams of 5-stage pipeline data forwarding and hazard detection units.",
                },
              ],
              videos: [
                {
                  title: "Instruction Pipelining, Hazards & Operand Forwarding Solved Examples",
                  creator: "Gate Smashers",
                  duration: "24 mins",
                  url: "https://www.youtube.com/playlist?list=PLxCzCOWd7aiHMonh3G6QNKq53C6oNXGrX",
                  whyThisHelps:
                    "Step-by-step pipeline timing tables showing exact stall bubble counts with and without forwarding.",
                },
              ],
            },
          ],
        },
      ],
    },

    // =========================================================================
    // MODULE 5: CONTROL UNIT & I/O
    // =========================================================================
    {
      id: "coa-module-5-control-unit-and-io",
      title: "Module 5: Control Unit Design, DMA & Interrupts",
      slug: "control-unit-and-io",
      description:
        "Hardwired vs microprogrammed control units, horizontal vs vertical microinstructions, programmed I/O, interrupts, and DMA transfer modes.",
      order: 5,
      lessons: [
        {
          id: "microprogrammed-control-and-dma",
          title: "Microprogrammed Control Units & DMA Transfer Modes",
          slug: "microprogrammed-control-and-dma",
          order: 1,
          estimatedMinutes: 22,
          tagline: "Horizontal/Vertical control words, control store sizing, and DMA cycle stealing.",
          hasInteractive: false,
          hasGATE: true,
          hasPractice: true,
          sections: [
            {
              type: "explanation",
              heading: "1. Control Unit Design: Hardwired vs Microprogrammed",
              body: [
                "The Control Unit (CU) orchestrates the datapath by generating binary control signals for ALU operations, register transfers, and memory read/writes.",
                "1. Hardwired Control: Implemented using combinational logic gates, decoders, and finite state machines (FSM). Fast execution speed (ideal for RISC), but rigid and difficult to modify or debug.",
                "2. Microprogrammed Control: Control signals are stored as binary words ('microinstructions') in a specialized internal ROM called Control Memory (CM). Flexible and easy to update (ideal for CISC), but slower due to memory access overhead.",
                "Horizontal vs Vertical Microinstructions:",
                "- Horizontal Microinstruction: Every control signal is represented by a dedicated bit (1 bit per signal). No decoder needed. Extremely wide control word (e.g. 50-100 bits), maximum parallel signal activation, high memory consumption.",
                "- Vertical Microinstruction: Mutually exclusive control signals are grouped and encoded into binary fields. A field of n signals requires ceil(log2(n + 1)) bits (the +1 represents the inactive/no-op state). Narrow control word, requires decoders, slightly slower.",
              ],
            },
            {
              type: "gate-analysis",
              heading: "2. GATE Worked Numerical: Horizontal vs Vertical Control Word Width",
              weightage: "2 Marks",
              trap: "Remember the +1 for the NO-OP (inactive) state in each vertical field! A field with 7 control signals needs ceil(log2(7 + 1)) = 3 bits.",
              solutionSteps: [
                "Problem: A processor has 32 control signals divided into 4 mutually exclusive groups containing 7, 12, 5, and 8 signals respectively. The control memory contains 512 words. Find:",
                "1. Control word size for horizontal microprogramming.",
                "2. Control word size for vertical microprogramming.",
                "3. Total bits saved in the control store.",
                "Step 1: Horizontal control word: Direct 1 bit per signal = 32 bits.",
                "Step 2: Vertical control word: Encode each group with an idle (no-op) state:",
                "  Group 1 (7 signals): ceil(log2(7 + 1)) = ceil(log2 8) = 3 bits.",
                "  Group 2 (12 signals): ceil(log2(12 + 1)) = ceil(log2 13) = 4 bits.",
                "  Group 3 (5 signals): ceil(log2(5 + 1)) = ceil(log2 6) = 3 bits.",
                "  Group 4 (8 signals): ceil(log2(8 + 1)) = ceil(log2 9) = 4 bits.",
                "  Total vertical control bits = 3 + 4 + 3 + 4 = 14 bits.",
                "Step 3: Total control memory bits:",
                "  Horizontal Control Memory = 512 * 32 = 16,384 bits.",
                "  Vertical Control Memory = 512 * 14 = 7,168 bits.",
                "  Bits saved = 16,384 - 7,168 = 9,216 bits (56.25% reduction).",
              ],
            },
            {
              type: "explanation",
              heading: "3. Direct Memory Access (DMA) & Transfer Modes",
              body: [
                "DMA enables high-speed peripheral devices (disks, network cards) to transfer blocks of data directly to/from main memory without continuous CPU intervention.",
                "Three DMA Operational Modes:",
                "1. Burst Mode (Block Transfer): The DMA controller takes control of the system bus and transfers an entire block of data continuously. The CPU is completely halted from accessing memory during the transfer.",
                "2. Cycle Stealing Mode: The DMA controller 'steals' one bus cycle from the CPU at a time (interleaving memory cycles between CPU and DMA). The CPU is slowed down slightly, but not blocked.",
                "3. Transparent (Hidden) Mode: The DMA controller only transfers data when the CPU is executing internal operations (like ALU operations) and is not using the system bus. Zero CPU performance penalty.",
              ],
            },
            {
              type: "resources",
              heading: "4. References & Curated Study Materials",
              sources: [
                {
                  title: "Computer System Architecture (3rd Edition)",
                  authors: "M. Morris Mano",
                  year: "1993",
                  publisher: "Pearson",
                  link: "https://www.pearson.com",
                  relevance:
                    "Chapter 7: Microprogrammed Control and Chapter 11: Input-Output Organization — classical diagrams of DMA bus grant/request arbitration.",
                },
              ],
              videos: [
                {
                  title: "Microprogrammed Control Unit: Horizontal vs Vertical Microinstructions",
                  creator: "Gate Smashers",
                  duration: "16 mins",
                  url: "https://www.youtube.com/playlist?list=PLxCzCOWd7aiHMonh3G6QNKq53C6oNXGrX",
                  whyThisHelps:
                    "Clear formula explanations for calculating control store dimensions and decoder requirements.",
                },
                {
                  title: "DMA Controller Working & Cycle Stealing vs Burst Mode Explained",
                  creator: "Neso Academy",
                  duration: "18 mins",
                  url: "https://www.youtube.com/playlist?list=PLBlnK6fEyqRgMCUAG0XRw78UA8qnv6jEx",
                  whyThisHelps:
                    "Animated timing diagrams showing bus arbitration between CPU and DMA.",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
