import { mcq, num, practice, worked, type LessonExtras } from "./helpers";

export const COA_EXTRAS: LessonExtras = {
  "addressing-modes-and-instruction-formats": [
    worked(
      "Worked example: fields in an instruction word",
      "A 32-bit instruction has an 8-bit opcode and two register fields for a machine with 32 registers. The rest is an immediate. How big can the immediate be?",
      [
        ["Register field size", "32 registers need log₂ 32 bits each.", "log₂ 32", "5 bits"],
        ["Two register fields", "2 × 5.", "10 bits"],
        ["What's left", "32 − 8 − 10.", "14 bits"],
        ["Signed range", "A 14-bit two's complement immediate.", "−2¹³ to 2¹³ − 1", "−8192 to 8191"],
      ],
      "14-bit immediate (−8192 to 8191 if signed)",
      "Start from the total width and subtract every field; register fields are log₂(number of registers)."
    ),
    practice([
      num("coa-am-1", "An instruction set uses 6-bit opcodes. At most how many distinct instructions can it have?", 64, "2⁶ = 64.", "foundation"),
      mcq("coa-am-2", "In which addressing mode is the operand's address the sum of a register and a constant in the instruction?", [
        ["Base (displacement) addressing", true, "EA = register + displacement; used for array elements and struct fields."],
        ["Immediate", false, "There the operand itself is in the instruction."],
        ["Register indirect", false, "That's EA = register, with no displacement."],
        ["Direct", false, "That's EA = the address field."],
      ], "Displacement addressing covers based, indexed and PC-relative modes."),
      mcq("coa-am-3", "PC-relative addressing is mainly used for:", [
        ["Branches, so code can be moved anywhere in memory", true, "The target is an offset from the current PC."],
        ["Loading constants", false, "That's immediate mode."],
        ["Accessing the stack", false, "That uses the stack pointer."],
      ], "Position-independent code relies on PC-relative branches.", "foundation"),
    ]),
  ],

  "datapath-and-instruction-cycle": [
    worked(
      "Worked example: average CPI and MIPS",
      "A program's instructions are 40% ALU (4 cycles), 30% loads (5), 20% stores (4) and 10% branches (3). The clock is 2.1 GHz. Find the CPI and the MIPS rating.",
      [
        ["Weighted CPI", "Σ fraction × cycles.", "0.4·4 + 0.3·5 + 0.2·4 + 0.1·3", "CPI = 4.2"],
        ["MIPS", "Clock rate in MHz divided by CPI.", "2100 / 4.2", "500 MIPS"],
      ],
      "CPI = 4.2, 500 MIPS",
      "CPU time = instruction count × CPI × clock period. MIPS ignores how much work each instruction does."
    ),
    practice([
      num("coa-dp-1", "A program runs 10⁹ instructions at CPI 2 on a 2 GHz clock. How long does it take, in seconds?", 1,
        "10⁹ × 2 / (2 × 10⁹) = 1 s.", "foundation", "s"),
      mcq("coa-dp-2", "In the fetch phase, the first register transfer is usually:", [
        ["MAR ← PC", true, "Put the instruction's address on the memory bus."],
        ["IR ← MDR", false, "That happens after the memory read."],
        ["PC ← PC + 1", false, "That happens alongside or after the read."],
      ], "Fetch: MAR ← PC; MDR ← M[MAR], PC ← PC + 1; IR ← MDR."),
      num("coa-dp-3", "Machine A runs a program in 10 s; machine B in 8 s. What is B's speedup over A?", 1.25,
        "Speedup = old time / new time = 10/8 = 1.25.", "foundation", undefined, 0.01),
    ]),
  ],

  "ieee-754-and-booth-multiplication": [
    worked(
      "Worked example: −6.25 in IEEE 754 single precision",
      "Encode −6.25 as a 32-bit IEEE 754 float, and give it in hex.",
      [
        ["Convert to binary", "6.25 = 4 + 2 + 0.25.", undefined, "110.01₂"],
        ["Normalise", "Move the point so there's one 1 before it.", "110.01 = 1.1001 × 2²"],
        ["Biased exponent", "2 + 127.", "129 = 10000001₂"],
        ["Sign and mantissa", "Sign 1 (negative). Mantissa: the bits after the leading 1, padded with zeros.", undefined, "1001 000… (23 bits)"],
        ["Assemble", "1 | 10000001 | 10010000000000000000000.", undefined, "C0C80000₁₆"],
      ],
      "0xC0C80000",
      "Single precision: 1 sign bit, 8 exponent bits (bias 127), 23 fraction bits with an implied leading 1."
    ),
    practice([
      mcq("coa-fp-1", "Which hex value is 0.75 in IEEE 754 single precision?", [
        ["3F400000", true, "0.75 = 1.1₂ × 2⁻¹: exponent 126 = 01111110, fraction 1000…"],
        ["3F800000", false, "That's 1.0."],
        ["BF400000", false, "That's −0.75."],
        ["40400000", false, "That's 3.0."],
      ], "Sign 0, exponent 01111110, fraction 100…: 0 01111110 1000… = 0x3F400000."),
      num("coa-fp-2", "Booth's algorithm recodes the multiplier 0111 (7). How many additions or subtractions does it perform?", 2,
        "Appending a 0 gives 0111|0: bit pair (1,0) means subtract, (1,1) and (1,1) mean nothing, (0,1) means add. So −1 + 8 = 7, with one subtraction and one addition."),
      mcq("coa-fp-3", "In IEEE 754 single precision, an exponent field of all 1s with a non-zero fraction means:", [
        ["NaN (not a number)", true, "All-ones exponent: zero fraction is ±∞, non-zero fraction is NaN."],
        ["The largest normal number", false, "That has exponent 11111110."],
        ["A denormal number", false, "Denormals have an all-zero exponent."],
      ], "Exponent 0: zero or denormal. Exponent 255: infinity or NaN.", "tricky"),
    ]),
  ],

  "division-algorithms-and-alu-overflow": [
    worked(
      "Worked example: detect two's complement overflow",
      "Add 0101 and 0100 in 4-bit two's complement. Does it overflow?",
      [
        ["Add", "0101 (5) + 0100 (4).", undefined, "1001"],
        ["Read the result", "1001 in 4-bit two's complement is −7, but 5 + 4 = 9."],
        ["The rule", "Overflow happens when the carry into the sign bit differs from the carry out of it.", "C_in(MSB) ⊕ C_out(MSB)", "1 ⊕ 0 = 1"],
      ],
      "Yes: it overflows (9 is outside −8…7)",
      "Equivalently: overflow happens exactly when two operands of the same sign give a result of the other sign."
    ),
    practice([
      mcq("coa-ov-1", "What is the range of 8-bit two's complement?", [
        ["−128 to 127", true, "−2⁷ to 2⁷ − 1."],
        ["−127 to 127", false, "That's sign-magnitude or one's complement."],
        ["0 to 255", false, "That's unsigned."],
      ], "n-bit two's complement: −2^(n−1) to 2^(n−1) − 1; there's one more negative value than positive.", "foundation"),
      mcq("coa-ov-2", "Can adding a positive and a negative two's complement number overflow?", [
        ["Never", true, "The result always lies between the two operands."],
        ["Sometimes", false, "Mixed signs can't overflow."],
        ["Always", false, "Mixed signs can't overflow."],
      ], "Only same-sign additions can overflow."),
      num("coa-ov-3", "In restoring division of an n-bit dividend by an n-bit divisor, how many iterations (shift and subtract steps) are there for n = 8?", 8,
        "One iteration per quotient bit: n iterations."),
    ]),
  ],

  "cache-mapping-and-amat-calculations": [
    worked(
      "Worked example: split an address for a direct-mapped cache",
      "A direct-mapped cache of 32 KB with 64-byte blocks, and 32-bit addresses. Find the tag, index and offset bits; then the AMAT for a 1-cycle hit, 5% miss rate and 100-cycle penalty.",
      [
        ["Offset", "64-byte blocks.", "log₂ 64", "6 bits"],
        ["Number of lines", "Cache size / block size.", "32 KB / 64 B", "512 lines"],
        ["Index", "One index value per line.", "log₂ 512", "9 bits"],
        ["Tag", "Whatever is left.", "32 − 9 − 6", "17 bits"],
        ["AMAT", "Hit time + miss rate × miss penalty.", "1 + 0.05 · 100", "6 cycles"],
      ],
      "Tag 17, index 9, offset 6; AMAT = 6 cycles",
      "Making it k-way set-associative reduces the index by log₂ k bits and grows the tag by the same amount."
    ),
    practice([
      num("coa-cm-1", "Same 32 KB cache with 64-byte blocks and 32-bit addresses, but 4-way set-associative. How many tag bits?", 19,
        "512 lines / 4 ways = 128 sets, so the index is 7 bits; the tag is 32 − 7 − 6 = 19 bits."),
      num("coa-cm-2", "L1 hit time 1 cycle, L1 miss rate 10%. L2 hit time 10 cycles, L2 local miss rate 20%, memory penalty 100 cycles. What is the AMAT?", 4,
        "AMAT = 1 + 0.1 × (10 + 0.2 × 100) = 1 + 0.1 × 30 = 4 cycles."),
      mcq("coa-cm-3", "A fully associative cache has:", [
        ["No index bits", true, "A block may go in any line, so there's nothing to index: just tag and offset."],
        ["No tag bits", false, "It needs the longest tags of all."],
        ["No offset bits", false, "Blocks still have bytes to select."],
      ], "Direct-mapped: biggest index. Fully associative: no index."),
    ]),
  ],

  "cache-replacement-write-policies-and-interleaving": [
    worked(
      "Worked example: LRU replacement",
      "A fully associative cache holds 3 blocks and uses LRU. Count the misses for the block references 1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5.",
      [
        ["1, 2, 3, 4", "Four compulsory misses; 4 evicts 1, the least recently used.", undefined, "4 misses; cache {2, 3, 4}"],
        ["1, 2, 5", "1 misses (evicts 2), 2 misses (evicts 3), 5 misses (evicts 4).", undefined, "7 misses; cache {1, 2, 5}"],
        ["1, 2", "Both hit."],
        ["3, 4, 5", "3 misses (evicts 5), 4 misses (evicts 1), 5 misses (evicts 2).", undefined, "10 misses"],
      ],
      "10 misses (2 hits)",
      "LRU is a stack algorithm: giving it more blocks can never cause more misses."
    ),
    practice([
      mcq("coa-rp-1", "With FIFO replacement, the same reference string has 9 misses with 3 blocks. How many misses with 4 blocks?", [
        ["10", true, "This is Belady's anomaly: FIFO can do worse with more space."],
        ["8", false, "That's what you'd expect, but FIFO isn't a stack algorithm."],
        ["9", false, "It gets worse, not equal."],
      ], "Belady's anomaly affects FIFO, not LRU or optimal replacement.", "tricky"),
      mcq("coa-rp-2", "A write-back cache writes a block to memory:", [
        ["Only when the block is evicted and its dirty bit is set", true, "Many writes to one block cost only one memory write."],
        ["On every write", false, "That's write-through."],
        ["Never", false, "Dirty data must reach memory eventually."],
      ], "Write-through: simple and always consistent. Write-back: less memory traffic, needs a dirty bit.", "foundation"),
      num("coa-rp-3", "A 4-way low-order interleaved memory has modules with a 40 ns access time. Ideally, how long does reading 4 consecutive words take, overlapping the accesses with a new one every 10 ns?", 70,
        "Start one module every 10 ns: the 4th access starts at 30 ns and finishes at 70 ns.", "tricky", "ns"),
    ]),
  ],

  "pipeline-hazards-and-speedup-calculations": [
    worked(
      "Worked example: speedup of a 5-stage pipeline",
      "A 5-stage pipeline runs 100 instructions with no stalls. Compare it with an unpipelined machine that takes 5 cycles per instruction (same cycle time).",
      [
        ["Pipelined cycles", "k stages + (n − 1) more cycles.", "5 + 99", "104 cycles"],
        ["Unpipelined cycles", "n × k.", "100 · 5", "500 cycles"],
        ["Speedup", "500 / 104.", "≈ 4.81"],
        ["The limit", "As n grows, the speedup approaches k = 5."],
      ],
      "Speedup ≈ 4.81",
      "With unequal stages, the clock is the slowest stage plus the latch delay, which lowers the real speedup."
    ),
    practice([
      num("coa-pp-1", "Stage delays are 150, 120, 160, 140 and 130 ns, and each pipeline latch adds 10 ns. What is the clock period, in ns?", 170,
        "The slowest stage (160) plus the latch (10) = 170 ns.", "foundation", "ns"),
      mcq("coa-pp-2", "Which hazard does forwarding (bypassing) mainly fix?", [
        ["Read-after-write data hazards", true, "The ALU result is fed directly to the next instruction, without waiting for write-back."],
        ["Structural hazards", false, "Those need more hardware."],
        ["Control hazards", false, "Those need branch prediction or delay slots."],
      ], "A load followed by its use still costs one stall cycle, even with forwarding."),
      num("coa-pp-3", "With the 170 ns clock above, how many ns does it take to run 1000 instructions with no stalls?", 170680,
        "(5 + 999) cycles × 170 ns = 1004 × 170 = 170,680 ns.", "gate-level", "ns"),
    ]),
  ],

  "structural-control-hazards-and-branch-prediction": [
    worked(
      "Worked example: the cost of branches",
      "20% of instructions are branches, and each branch costs a 3-cycle penalty. The ideal CPI is 1. What is the effective CPI?",
      [
        ["Stall cycles per instruction", "Branch frequency × penalty.", "0.2 · 3", "0.6"],
        ["Effective CPI", "Ideal CPI + stalls.", "1 + 0.6", "1.6"],
        ["Speedup lost", "The pipeline runs at 1/1.6 = 62.5% of its ideal throughput."],
      ],
      "CPI = 1.6",
      "Prediction reduces the cost to (misprediction rate × penalty); with 90% accuracy here: 1 + 0.2·0.1·3 = 1.06."
    ),
    practice([
      num("coa-br-1", "Same setup, but a predictor is right 90% of the time and only mispredictions pay the 3 cycles. What is the CPI?", 1.06,
        "1 + 0.2 × 0.1 × 3 = 1.06.", "gate-level", undefined, 0.001),
      mcq("coa-br-2", "A structural hazard happens when:", [
        ["Two instructions need the same hardware unit in the same cycle", true, "For example, a single memory port used for both fetch and load."],
        ["An instruction needs a result that isn't ready", false, "That's a data hazard."],
        ["The next instruction depends on a branch outcome", false, "That's a control hazard."],
      ], "Separate instruction and data caches remove the most common structural hazard.", "foundation"),
      mcq("coa-br-3", "A 2-bit saturating counter predictor improves on a 1-bit predictor because:", [
        ["It needs two wrong guesses in a row to flip, so loop exits mispredict once, not twice", true, "A 1-bit predictor mispredicts at the loop's last iteration and again on re-entry."],
        ["It never mispredicts", false, "It still mispredicts."],
        ["It removes branch instructions", false, "It only predicts them."],
      ], "The hysteresis makes 2-bit counters good at loops."),
    ]),
  ],

  "microprogrammed-control-and-dma": [
    worked(
      "Worked example: vertical microcode field widths",
      "A control unit has 15 control signals split into mutually exclusive groups of 3, 5 and 7 signals. How many bits does the control word need with vertical (encoded) fields, versus horizontal?",
      [
        ["Horizontal", "One bit per signal.", "15 bits"],
        ["Encode each group", "Each group also needs a 'no signal' code: 3 + 1, 5 + 1 and 7 + 1 values.", "⌈log₂ 4⌉ + ⌈log₂ 6⌉ + ⌈log₂ 8⌉"],
        ["Add up", "2 + 3 + 3.", "8 bits"],
      ],
      "8 bits vertical vs 15 bits horizontal",
      "Vertical microcode saves control-memory width but needs decoders, which adds delay. Horizontal allows more parallelism."
    ),
    practice([
      mcq("coa-mc-1", "In cycle-stealing DMA:", [
        ["The DMA controller takes the bus for one word at a time, between CPU cycles", true, "The CPU slows a little but keeps running."],
        ["The DMA controller holds the bus until the whole block is done", false, "That's burst mode."],
        ["The CPU copies every word itself", false, "That's programmed I/O."],
      ], "Burst mode: fastest transfer, but the CPU is locked out. Cycle stealing: interleaved.", "foundation"),
      num("coa-mc-2", "A control memory holds 512 microinstructions. How many bits does the next-address field need?", 9,
        "log₂ 512 = 9."),
      mcq("coa-mc-3", "Compared with hardwired control, microprogrammed control is:", [
        ["Easier to change, but usually slower", true, "Changing behaviour means rewriting control memory, not redesigning logic."],
        ["Always faster", false, "Hardwired control is usually faster."],
        ["Impossible to update", false, "That's its main advantage."],
      ], "RISC designs usually choose hardwired control for speed."),
    ]),
  ],

  "io-interrupts-and-bus-arbitration": [
    worked(
      "Worked example: CPU time spent on interrupts",
      "A device raises 10,000 interrupts per second, and each takes 50 μs to service. What fraction of CPU time goes to the device?",
      [
        ["Busy time per second", "Interrupts per second × service time.", "10,000 · 50 μs", "0.5 s"],
        ["Fraction", "Out of each 1 s.", "0.5 / 1", "50%"],
      ],
      "50% of the CPU",
      "When the interrupt load gets this high, DMA (one interrupt per block) is the usual fix."
    ),
    practice([
      mcq("coa-io-1", "In daisy-chain priority, the device with the highest priority is:", [
        ["The one electrically closest to the CPU", true, "The acknowledge signal reaches it first and stops there if it's requesting."],
        ["The one furthest from the CPU", false, "That has the lowest priority."],
        ["Chosen at random", false, "Priority is fixed by position."],
      ], "Daisy chains are simple, but distant devices can starve.", "foundation"),
      num("coa-io-2", "Polling a device costs 400 cycles and happens 1000 times a second on a 200 MHz CPU. What percentage of CPU time does polling use?", 0.2,
        "400 × 1000 = 400,000 cycles per second, out of 200,000,000: 0.2%.", "gate-level", "%", 0.01),
      mcq("coa-io-3", "Why are interrupts better than polling for a slow keyboard?", [
        ["The CPU does no work until a key is actually pressed", true, "Polling would waste cycles checking a device that's almost always idle."],
        ["Interrupts have no overhead", false, "Each interrupt has a context-saving cost."],
        ["Polling can't read keyboards", false, "It can; it's just wasteful."],
      ], "Rare events suit interrupts; very fast, constant streams can suit polling or DMA."),
    ]),
  ],
};
