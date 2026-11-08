import { mcq, num, practice, worked, type LessonExtras } from "./helpers";

export const DIGITAL_LOGIC_EXTRAS: LessonExtras = {
  "boolean-algebra-canonical-forms": [
    worked(
      "Worked example: simplify a sum of minterms",
      "Simplify f(A, B, C) = Σm(1, 3, 5, 7).",
      [
        ["List the minterms", "1 = 001, 3 = 011, 5 = 101, 7 = 111."],
        ["Look for the common bit", "C = 1 in every one, and A and B take all four combinations."],
        ["Factor", "f = C·(A'B' + A'B + AB' + AB) = C·1."],
      ],
      "f = C",
      "When a set of minterms covers every combination of some variables, those variables drop out."
    ),
    practice([
      num("dl-ba-1", "How many distinct Boolean functions of 3 variables are there?", 256, "Each of the 2³ = 8 input rows can output 0 or 1: 2⁸ = 256.", "foundation"),
      num("dl-ba-2", "How many self-dual Boolean functions of 3 variables are there?", 16,
        "A self-dual function is fixed by its values on half the inputs (each input and its complement are tied): 2^(2^(n−1)) = 2⁴ = 16.", "tricky"),
      mcq("dl-ba-3", "Which is the simplified form of A + A'B?", [
        ["A + B", true, "Absorption: A + A'B = (A + A')(A + B) = A + B."],
        ["AB", false, "That's too restrictive."],
        ["A", false, "That loses the A'B case."],
      ], "A + A'B = A + B is one of the most useful identities.", "foundation"),
    ]),
  ],

  "k-maps-and-minimization": [
    worked(
      "Worked example: a four-variable K-map",
      "Minimise f(A, B, C, D) = Σm(0, 2, 5, 7, 8, 10, 13, 15).",
      [
        ["Plot the minterms", "0, 2, 8, 10 are the four corners; 5, 7, 13, 15 form the centre square."],
        ["Group the corners", "The corners wrap around into one group of 4: B = 0 and D = 0.", undefined, "B'D'"],
        ["Group the centre", "5, 7, 13 and 15 all have B = 1 and D = 1.", undefined, "BD"],
        ["Combine", "Two essential prime implicants cover everything."],
      ],
      "f = B'D' + BD (that is, B XNOR D)",
      "K-maps wrap left to right and top to bottom, so the four corners are adjacent."
    ),
    practice([
      mcq("dl-km-1", "What is the minimal SOP of f(A, B, C) = Σm(0, 1, 2, 3)?", [
        ["A'", true, "All four minterms have A = 0."],
        ["A'B'", false, "That only covers 0 and 1."],
        ["B + C", false, "That's a different function."],
      ], "A group of 4 in a 3-variable map eliminates 2 variables.", "foundation"),
      num("dl-km-2", "In an n-variable K-map, a group of 8 cells eliminates how many variables?", 3, "2³ = 8, so 3 variables change across the group and drop out."),
      mcq("dl-km-3", "What are 'don't care' cells used for?", [
        ["They can be counted as 1 or 0, whichever makes the groups bigger", true, "They are input combinations that never happen, or whose output doesn't matter."],
        ["They must always be grouped", false, "Only group them when it helps."],
        ["They must be left out of every group", false, "Using them can shrink the expression."],
      ], "Don't cares are free: use them to make groups larger, ignore them otherwise."),
    ]),
  ],

  "number-representations-arithmetic": [
    worked(
      "Worked example: −13 in 8-bit two's complement",
      "Represent −13 in 8-bit two's complement.",
      [
        ["+13 in binary", "13 = 8 + 4 + 1.", undefined, "00001101"],
        ["Invert the bits", "One's complement.", undefined, "11110010"],
        ["Add 1", "Two's complement.", undefined, "11110011"],
        ["Check", "−128 + 64 + 32 + 16 + 2 + 1 = −13."],
      ],
      "11110011",
      "Shortcut: copy bits from the right up to and including the first 1, then invert the rest."
    ),
    practice([
      num("dl-nr-1", "Convert (2AF)₁₆ to decimal.", 687, "2·256 + 10·16 + 15 = 512 + 160 + 15 = 687.", "foundation"),
      mcq("dl-nr-2", "Which representation has two encodings of zero?", [
        ["Sign-magnitude and one's complement", true, "Both have +0 and −0."],
        ["Two's complement", false, "Two's complement has exactly one zero."],
        ["Unsigned binary", false, "That has one zero."],
      ], "That's one reason hardware uses two's complement."),
      num("dl-nr-3", "What decimal value does the 8-bit two's complement pattern 10000000 represent?", -128,
        "The sign bit has weight −2⁷ = −128, and every other bit is 0.", "tricky"),
    ]),
  ],

  "adders-subtractors-cla-delay": [
    worked(
      "Worked example: ripple-carry delay",
      "A 16-bit ripple-carry adder uses full adders whose carry-out takes 2 gate delays after the carry-in arrives. What is the worst-case delay for the final carry?",
      [
        ["Worst case", "The carry ripples through all 16 stages."],
        ["Delay per stage", "2 gate delays per carry."],
        ["Total", "16 × 2.", "32 gate delays"],
      ],
      "32 gate delays",
      "A carry-lookahead adder computes every carry from generate and propagate signals in a fixed number of levels, independent of n for one block."
    ),
    practice([
      mcq("dl-ad-1", "In a carry-lookahead adder, Gᵢ and Pᵢ are:", [
        ["Gᵢ = AᵢBᵢ and Pᵢ = Aᵢ ⊕ Bᵢ", true, "Generate when both bits are 1; propagate when exactly one is."],
        ["Gᵢ = Aᵢ + Bᵢ and Pᵢ = AᵢBᵢ", false, "Those are swapped and wrong."],
        ["Gᵢ = Aᵢ ⊕ Bᵢ and Pᵢ = AᵢBᵢ", false, "Swapped."],
      ], "Cᵢ₊₁ = Gᵢ + PᵢCᵢ. Unrolling that gives every carry directly."),
      num("dl-ad-2", "How many full adders does an n-bit ripple-carry adder need, for n = 8?", 8, "One per bit position (the first can be a half adder if there's no carry-in).", "foundation"),
      mcq("dl-ad-3", "How does an adder subtract A − B in two's complement?", [
        ["XOR every bit of B with 1 and set the carry-in to 1", true, "That computes A + B' + 1 = A − B."],
        ["Invert A", false, "B is the one negated."],
        ["Use a separate subtractor circuit", false, "One adder handles both with XOR gates."],
      ], "One control line feeds the XORs and the carry-in, switching between add and subtract."),
    ]),
  ],

  "multiplexers-and-adders": [
    worked(
      "Worked example: a function from a 4:1 multiplexer",
      "Implement f(A, B, C) = Σm(1, 2, 6, 7) with a 4:1 MUX, using A and B as the select lines.",
      [
        ["Group by A, B", "For each AB pair, see how f depends on C."],
        ["AB = 00", "Minterms 0, 1: f is 1 only for C = 1.", undefined, "I₀ = C"],
        ["AB = 01", "Minterms 2, 3: f is 1 only for C = 0.", undefined, "I₁ = C'"],
        ["AB = 10", "Minterms 4, 5: never 1.", undefined, "I₂ = 0"],
        ["AB = 11", "Minterms 6, 7: always 1.", undefined, "I₃ = 1"],
      ],
      "I₀ = C, I₁ = C', I₂ = 0, I₃ = 1",
      "A 2ⁿ:1 MUX can implement any function of n + 1 variables, with the extra variable (or its complement, 0 or 1) on the inputs."
    ),
    practice([
      num("dl-mx-1", "How many 2:1 multiplexers are needed to build a 16:1 multiplexer?", 15, "A tree: 8 + 4 + 2 + 1 = 15. In general n − 1 for an n:1 MUX.", "foundation"),
      num("dl-mx-2", "How many select lines does a 32:1 multiplexer have?", 5, "log₂ 32 = 5.", "foundation"),
      mcq("dl-mx-3", "A half adder's sum and carry are:", [
        ["S = A ⊕ B, C = AB", true, "Sum is the XOR; carry is the AND."],
        ["S = AB, C = A ⊕ B", false, "Swapped."],
        ["S = A + B, C = AB", false, "OR would be wrong when both are 1."],
      ], "A full adder is two half adders plus an OR gate."),
    ]),
  ],

  "decoders-encoders-converters": [
    worked(
      "Worked example: build a large decoder",
      "Build a 5-to-32 decoder from 3-to-8 decoders (with enables) and one 2-to-4 decoder.",
      [
        ["Outputs needed", "32 outputs, and each 3-to-8 decoder gives 8.", "32 / 8", "4 decoders"],
        ["Split the input", "The 3 low bits go to all four 3-to-8 decoders."],
        ["Enable one at a time", "The 2 high bits feed a 2-to-4 decoder, whose outputs enable exactly one 3-to-8 decoder."],
      ],
      "Four 3-to-8 decoders plus one 2-to-4 decoder",
      "Any function can be built from a decoder plus OR gates: one OR per output, over that function's minterm lines."
    ),
    practice([
      mcq("dl-de-1", "A 4-input priority encoder (D₃ highest) gets inputs D₀ = 1 and D₂ = 1. What does it output?", [
        ["10 (the index of D₂)", true, "The highest-priority active input wins."],
        ["00", false, "D₀ has lower priority."],
        ["11", false, "D₃ is 0."],
      ], "A priority encoder also has a 'valid' output for when no input is active.", "foundation"),
      num("dl-de-2", "How many outputs does a 4-to-16 decoder have active (equal to 1) at a time, when enabled?", 1, "Exactly one output, the minterm of the input."),
      mcq("dl-de-3", "In Gray code, consecutive values differ in:", [
        ["Exactly one bit", true, "That's why Gray code is used for K-map ordering and rotary encoders."],
        ["Two bits", false, "Only one."],
        ["The sign bit only", false, "Gray code has no sign bit."],
      ], "Binary to Gray: g = b ⊕ (b >> 1)."),
    ]),
  ],

  "comparators-programmable-logic": [
    worked(
      "Worked example: ROM size for a multiplier",
      "What size of ROM implements a 4-bit × 4-bit unsigned multiplier as a lookup table?",
      [
        ["Address lines", "Both operands together: 4 + 4 bits.", "2⁸", "256 words"],
        ["Word width", "The largest product is 15 × 15 = 225, which needs 8 bits.", "8 bits"],
        ["Total size", "Words × width.", "256 × 8", "2048 bits"],
      ],
      "256 × 8 = 2048 bits",
      "A ROM can implement any function, but its size doubles with every extra input bit."
    ),
    practice([
      mcq("dl-pl-1", "A PLA differs from a ROM because:", [
        ["A PLA's AND plane is programmable, so it holds only the product terms it needs", true, "A ROM's AND plane is a fixed full decoder of every minterm."],
        ["A PLA has no OR plane", false, "A PLA has both planes programmable."],
        ["A ROM can't implement every function", false, "A ROM can implement any function."],
      ], "ROM: fixed AND, programmable OR. PAL: programmable AND, fixed OR. PLA: both programmable."),
      mcq("dl-pl-2", "In a 1-bit magnitude comparator, the output for A = B is:", [
        ["A XNOR B", true, "1 exactly when the bits are equal."],
        ["A ⊕ B", false, "That's 1 when they differ."],
        ["AB'", false, "That's A > B."],
      ], "A > B is AB', A < B is A'B, and A = B is the XNOR.", "foundation"),
      num("dl-pl-3", "How many words does a ROM need to implement a 6-input function?", 64, "2⁶ = 64 addresses, one per input combination.", "foundation"),
    ]),
  ],

  "flip-flops-and-counters": [
    worked(
      "Worked example: the fastest clock for a ripple counter",
      "A 4-bit ripple counter uses flip-flops with a 10 ns clock-to-output delay. What is the highest clock frequency at which all outputs settle within one clock period?",
      [
        ["Worst-case ripple", "A change can pass through all 4 flip-flops.", "4 × 10 ns", "40 ns"],
        ["Maximum frequency", "One over the settling time.", "1 / 40 ns", "25 MHz"],
      ],
      "25 MHz",
      "A synchronous counter clocks every flip-flop together, so its limit is one flip-flop delay plus the logic, not n delays."
    ),
    practice([
      num("dl-ff-1", "How many flip-flops does a mod-60 counter need?", 6, "2⁵ = 32 < 60 ≤ 64 = 2⁶.", "foundation"),
      mcq("dl-ff-2", "A JK flip-flop with J = K = 1 on a clock edge:", [
        ["Toggles", true, "That's the T flip-flop behaviour."],
        ["Resets to 0", false, "That's J = 0, K = 1."],
        ["Holds its value", false, "That's J = K = 0."],
      ], "JK: 00 hold, 01 reset, 10 set, 11 toggle.", "foundation"),
      mcq("dl-ff-3", "In a D flip-flop, the next state Q⁺ is:", [
        ["D", true, "Q⁺ = D: it stores whatever is on D at the clock edge."],
        ["Q'", false, "That's a toggling flip-flop."],
        ["D ⊕ Q", false, "That's a T flip-flop with T = D."],
      ], "Characteristic equations: D: Q⁺ = D. T: Q⁺ = T ⊕ Q. JK: Q⁺ = JQ' + K'Q."),
    ]),
  ],

  "counter-synthesis-mod-n": [
    worked(
      "Worked example: a mod-6 counter from a 3-bit counter",
      "Make a 3-bit binary up-counter count 0 to 5 and then return to 0, using an asynchronous reset.",
      [
        ["Flip-flops", "6 states need 3 flip-flops (2³ = 8 ≥ 6)."],
        ["Detect 6", "6 = 110: Q₂ = 1 and Q₁ = 1."],
        ["Reset", "Feed Q₂·Q₁ into the active-high clear, so the counter drops to 000 as soon as it reaches 110."],
        ["Effect", "110 appears only for a moment (a glitch), so the visible states are 0 to 5."],
      ],
      "CLR = Q₂Q₁",
      "A synchronous design avoids the glitch: derive each flip-flop's input from the excitation table, using 6 and 7 as don't cares."
    ),
    practice([
      num("dl-cs-1", "How many unused states does a mod-10 counter built from 4 flip-flops have?", 6, "16 − 10 = 6 states (10 to 15) are never used.", "foundation"),
      mcq("dl-cs-2", "In a synchronous counter design, the excitation table tells you:", [
        ["What each flip-flop's inputs must be for every present-to-next state change", true, "For example, a JK going 0 → 1 needs J = 1, K = don't care."],
        ["The output sequence only", false, "That's the state table."],
        ["The clock frequency", false, "That comes from timing."],
      ], "State table → excitation table → K-map per input → circuit."),
      mcq("dl-cs-3", "Which flip-flop transition needs J = X (don't care), K = 1 in a JK flip-flop?", [
        ["1 → 0", true, "Either reset (J = 0, K = 1) or toggle (J = 1, K = 1) works."],
        ["0 → 1", false, "That needs J = 1, K = X."],
        ["0 → 0", false, "That needs J = 0, K = X."],
      ], "JK excitation: 0→0: 0X, 0→1: 1X, 1→0: X1, 1→1: X0.", "tricky"),
    ]),
  ],

  "fsm-shift-registers-timing": [
    worked(
      "Worked example: a sequence detector",
      "How many states does a Mealy machine need to detect the bit pattern 1011, with overlapping matches allowed?",
      [
        ["States = progress so far", "S0: nothing matched. S1: seen '1'. S2: seen '10'. S3: seen '101'."],
        ["On a full match", "In S3, input 1 completes 1011: output 1."],
        ["Handle the overlap", "The trailing '1' of 1011 can start a new match, so go to S1, not S0."],
      ],
      "4 states (Mealy)",
      "A Moore machine needs one more state, because its output depends only on the state: here 5."
    ),
    practice([
      num("dl-fsm-1", "How many distinct states does a 4-bit Johnson (twisted-ring) counter cycle through?", 8, "A Johnson counter with n flip-flops has 2n states.", "foundation"),
      num("dl-fsm-2", "How many distinct states does a 4-bit ring counter cycle through?", 4, "A ring counter with n flip-flops has n states (a single circulating 1)."),
      mcq("dl-fsm-3", "Setup time is the time that:", [
        ["The input must be stable before the clock edge", true, "Violating it can make the flip-flop metastable."],
        ["The input must stay stable after the clock edge", false, "That's hold time."],
        ["The output takes after the clock edge", false, "That's clock-to-output delay."],
      ], "Minimum clock period = clock-to-Q + logic delay + setup time."),
    ]),
  ],
};
