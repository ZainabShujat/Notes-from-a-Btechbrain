# COA, Theory of Computation, C Programming and Discrete Maths: B.Tech + GATE study guide

Same format as the OS + DBMS and CN + COA pages: topic map, diagrams to draw, questions with answers. B.Tech lens = semester and placement emphasis. GATE lens = official GATE 2027 CS syllabus scope. COA already has a page in the CN + COA guide, so the COA section here is an extension with new numericals and theory.

## Computer Organization and Architecture (extension)

**Already in the CN + COA page:** cache bit-splitting, AMAT, pipeline cycles, CPI with branches, chip counting, indirect addressing. This section adds what that page skips.

| Topic | B.Tech lens | GATE lens |
| --- | --- | --- |
| Number representation | Sign-magnitude, 1's and 2's complement, IEEE 754 single/double, Booth, restoring and non-restoring division | Range of n-bit 2's complement, overflow detection, float encoding and decoding, special values (0, inf, NaN, denormals) |
| Control unit | Hardwired vs microprogrammed, horizontal vs vertical microinstructions, micro-sequencer | Control-word width with field encoding, control-store size |
| Instruction formats | 0/1/2/3-address machines, stack machines, RISC vs CISC | Expanding opcode counts, instruction length from fields |
| I/O | Polling, interrupts, DMA modes, bus arbitration (daisy chain, polling, independent request) | CPU fraction consumed by interrupts or polling, DMA cycle-stealing overhead |
| Pipelining and performance | Hazards, forwarding, branch prediction, Flynn's taxonomy | Clock period from stage delays, speedup, Amdahl's law, MIPS and CPI |

### COA: diagrams to draw

- IEEE 754 single-precision layout: 1 sign, 8 exponent (bias 127), 23 mantissa; double: 1, 11 (bias 1023), 52.
- Booth multiplier datapath: accumulator A, multiplier Q, extra bit Q-1, multiplicand M, add or subtract on bit pairs 01 and 10.
- Horizontal vs vertical microinstruction word: one bit per signal vs encoded fields plus decoders.
- Daisy-chain bus arbitration: the grant line passes device to device; priority by position.
- Unequal-stage pipeline timing with latch overhead.

### COA: GATE-style numericals

1. Encode -6.5 in IEEE 754 single precision. Give the hex.

6.5 = 110.1 in binary = 1.101 × 2^2. Sign 1, exponent 127 + 2 = 129 = 10000001, mantissa 101 followed by zeros. Bits: 1 10000001 10100000000000000000000 = **C0D00000**.

2. 8-bit 2's complement: add 01100100 (100) and 00111100 (60). Result and overflow?

Sum = 10100000, which reads as -96. Both operands are positive but the sign bit is 1, so overflow. The range is -128 to 127; the true sum 160 does not fit.

3. A 16-bit instruction has 4-bit operand fields. There are 14 three-address and 31 two-address instructions. Maximum one-address instructions?

Three-address uses 14 of 16 top-nibble codes; 2 remain. Each gives 16 two-address codes, so 32; 31 are used, leaving 1. That one prefix gives 16 one-address codes. Answer: **16**.

4. A control unit needs 25 signals in three mutually exclusive groups of 7, 15 and 3. Horizontal width vs vertical (field-encoded) width?

Horizontal: 25 bits. Vertical: each field needs ceil(log2(n+1)) bits (the +1 is the no-op): 3 + 4 + 2 = **9 bits**.

5. A device interrupts 100 times per second; each ISR takes 0.5 ms. Fraction of CPU time spent in the ISR?

100 × 0.5 ms = 50 ms per second = **5%**.

6. Stage delays 5, 6, 11 and 8 ns; pipeline latch delay 1 ns. Clock period and speedup for many instructions?

Clock = max stage + latch = 11 + 1 = 12 ns. Non-pipelined time per instruction = 30 ns. Speedup = 30 / 12 = **2.5**.

7. L1 hit 1 ns, L1 miss rate 10%; L2 hit 10 ns, L2 local miss rate 20%; memory 100 ns. AMAT?

1 + 0.1 × (10 + 0.2 × 100) = 1 + 0.1 × 30 = **4 ns**.

8. 40% of a program's time is sped up 4x. Overall speedup?

1 / (0.6 + 0.4/4) = 1 / 0.7 ≈ **1.43**.

9. CPI = 2, clock 2 GHz. MIPS rating?

2000 MHz / 2 = **1000 MIPS**.

10. 32-bit address, 8 KB fully associative cache, 16 B blocks. Tag bits and number of lines?

Offset 4 bits, no index. Tag = 28 bits. Lines = 8 KB / 16 B = 512.

### COA: B.Tech theory

- Explain Booth's algorithm and multiply two given 4-bit numbers step by step.
- Explain IEEE 754 single and double formats; convert a decimal to float and back.
- Compare horizontal and vertical microprogramming; draw the microprogrammed control unit.
- Explain daisy-chain, polling and independent-request bus arbitration.
- Compare programmed I/O, interrupt-driven I/O and DMA with a timing argument.
- Explain Flynn's taxonomy and the Amdahl's-law limit on speedup.

## Theory of Computation / Automata

**GATE 2027 official list:** regular expressions and finite automata; context-free grammars and push-down automata; regular and context-free languages, pumping lemma; Turing machines and undecidability. Typical weight is a few marks per paper (approximate, varies by year). The closure and decidability tables below are the highest-yield memorisation.

| Topic | B.Tech lens | GATE lens |
| --- | --- | --- |
| 1. Basics | Alphabet, string, language, operations, proofs by induction | Rarely asked alone |
| 2. Finite automata | DFA, NFA, epsilon-NFA, NFA to DFA, minimisation, Moore and Mealy machines | Minimal DFA state count, design a DFA for a condition, NFA to DFA size, language accepted. Very frequent |
| 3. Regular expressions and languages | RE to FA and back, Arden's theorem, pumping lemma, closure properties | Equivalent REs, is-it-regular questions, closure reasoning, Myhill-Nerode classes |
| 4. Context-free grammars | Derivations, parse trees, ambiguity, simplification, CNF and GNF | Number of derivation steps, ambiguity, language of a grammar, CFG design |
| 5. Pushdown automata | DPDA vs NPDA, acceptance by final state or empty stack, PDA to CFG | Is it DCFL or CFL, stack behaviour, closure properties. Frequent |
| 6. Pumping lemma and non-CFLs | Pumping lemma for regular and CFL | Choose the right language class for a given language |
| 7. Turing machines | Standard TM, variants, universal TM, recursive and recursively enumerable | TM design, language class of a TM |
| 8. Decidability | Halting problem, reductions, Post correspondence problem | Which problems are decidable, Rice's theorem, closure of recursive and RE languages. Very frequent |

### TOC: diagrams to draw

- DFA transition diagrams for: ends with 01, number of 0s divisible by 3, contains substring 101, length divisible by n.
- NFA to DFA subset-construction table.
- Chomsky hierarchy as nested sets: regular inside DCFL inside CFL inside CSL inside recursive inside RE.
- PDA transition diagram for a^n b^n and for palindromes with a centre marker.
- Turing machine tape with head for a^n b^n c^n (mark and sweep).
- Two parse trees for an ambiguous expression grammar.

### TOC: reference tables (memorise)

| Closure under | Regular | DCFL | CFL | Recursive | RE |
| --- | --- | --- | --- | --- | --- |
| Union | Yes | No | Yes | Yes | Yes |
| Intersection | Yes | No | No | Yes | Yes |
| Complement | Yes | Yes | No | Yes | No |
| Concatenation | Yes | No | Yes | Yes | Yes |
| Kleene star | Yes | No | Yes | Yes | Yes |
| Reversal | Yes | No | Yes | Yes | Yes |
| Intersection with regular | Yes | Yes | Yes | Yes | Yes |

| Problem | Regular | CFL | Recursive / TM |
| --- | --- | --- | --- |
| Membership | Decidable | Decidable | Decidable for recursive, undecidable for RE |
| Emptiness | Decidable | Decidable | Undecidable |
| Finiteness | Decidable | Decidable | Undecidable |
| Equivalence | Decidable | Undecidable (decidable for DPDAs) | Undecidable |
| Ambiguity of a CFG | n/a | Undecidable | n/a |
| Universality (accepts everything) | Decidable | Undecidable | Undecidable |

### TOC: GATE-style numericals

1. Minimal DFA states for strings over {0,1} that end in 01?

**3** states: no progress, seen a 0, seen 01.

2. Minimal DFA states for strings over {0,1} where the number of 0s is divisible by 3?

**3** states, tracking the count mod 3 (the 1s loop on every state).

3. Minimal DFA for strings over {a,b} whose 3rd symbol from the right is a?

An NFA needs 4 states, but the minimal DFA must remember the last 3 symbols: 2^3 = **8** states. The classic NFA-to-DFA blowup example.

4. An NFA has n states. Upper bound on states of the equivalent DFA?

**2^n**, one per subset of NFA states.

5. Minimal DFA for (a+b)\*abb?

**4** states, tracking the longest suffix that matches a prefix of abb.

6. Minimal DFA (with dead state) accepting exactly the strings of length n over {a,b}?

**n + 2** states: n + 1 length-counting states plus 1 dead state.

7. Is {a^n b^n : n >= 0} regular? Context-free? Deterministic?

Not regular (pumping the a block breaks the count). Context-free with grammar S -> aSb or epsilon, and deterministic (DCFL).

8. Classify {ww}, {w w^R} and {a^n b^n c^n}.

{ww} is not context-free (context-sensitive). {w w^R} is context-free but not deterministic (the PDA must guess the middle). {a^n b^n c^n} is not context-free (context-sensitive).

9. A CFG in Chomsky normal form generates a string of length n (n >= 1). Derivation steps?

**2n - 1**: n - 1 binary rules to get n variables, then n terminal rules. For n = 5, that is 9.

10. Decidable or not: membership for a CFG, emptiness of a CFG, equivalence of two CFGs, does a TM halt on blank tape?

Membership: decidable (CYK, O(n^3)). Emptiness of a CFG: decidable. Equivalence of two CFGs: undecidable. Halting on blank tape: undecidable.

11. Rice's theorem in one line?

Every non-trivial property of the language of a TM (what it accepts, not how it runs) is undecidable. Examples: L(M) is empty, L(M) is regular.

12. Number of Myhill-Nerode equivalence classes of a regular language?

Equal to the number of states of its minimal DFA. Infinitely many classes means the language is not regular.

### TOC: B.Tech theory

- Convert a given NFA to a DFA; minimise a given DFA with the table-filling method.
- Convert a regular expression to an epsilon-NFA, and an FA to a regular expression using Arden's theorem.
- State and use the pumping lemma for regular languages; show a given language is not regular.
- Simplify a CFG (remove epsilon, unit and useless productions); convert to CNF and GNF.
- Construct a PDA for a given language; convert a PDA to a CFG.
- Explain the Chomsky hierarchy with the machine for each class.
- Design a Turing machine for a^n b^n or for binary increment; describe the universal TM.
- State the halting problem, prove it undecidable, and explain reductions and the Post correspondence problem.

## Programming in C

**GATE 2027 official list (Programming and Data Structures):** programming in C; recursion; arrays, stacks, queues, linked lists, trees, binary search trees, binary heaps, graphs. This section covers the C language and recursion side only. Trace-the-output questions are the standard GATE pattern. B.Tech labs and viva add file handling, dynamic memory and the preprocessor.

| Topic | B.Tech lens | GATE lens |
| --- | --- | --- |
| 1. Basics | Data types, operators, precedence, type conversion, printf and scanf | Integer division, modulus sign, implicit conversion, short-circuit evaluation |
| 2. Control flow | if, switch with fall-through, for, while, do-while, break, continue, goto | Loop tracing, nested loops, switch fall-through output |
| 3. Functions and recursion | Call by value, scope, storage classes (auto, static, extern, register), recursion | Recursion tracing, number of calls, static variables, stack depth. Very frequent |
| 4. Arrays and strings | One- and two-dimensional arrays, string library, passing arrays to functions | Address of a\[i\]\[j\], sizeof on arrays, null terminator effects |
| 5. Pointers | Pointer arithmetic, pointer to pointer, arrays vs pointers, function pointers | Output of pointer programs, arithmetic scaled by element size. Very frequent |
| 6. Structures, unions, enums | Declaration, nesting, structure padding, union memory sharing | sizeof a structure with padding, union overlay |
| 7. Dynamic memory | malloc, calloc, realloc, free, memory leaks, dangling pointers | Linked-list code using malloc, what the code produces |
| 8. Preprocessor and bit operations | Macros, #include, conditional compilation, bitwise operators | Macro side effects, bit manipulation outputs |
| 9. File handling (B.Tech) | fopen, fread, fwrite, fseek, modes, EOF | Not in the 2027 list |

### C: diagrams to draw

- Process memory layout: text, initialised data, bss, heap (grows up), stack (grows down).
- Stack frames for a recursive call chain, showing each call's parameters and return point.
- Pointer and array picture: an int array with p, p+1, p+2 arrows; pointer-to-pointer with two arrows.
- Linked-list node boxes with next pointers; insertion and deletion at head, tail and middle.
- Structure layout with padding bytes shown; union overlay of members.

### C: GATE-style numericals (assume a typical 64-bit compiler: char 1, int 4, long 8, pointer 8)

1. What are -7 / 2 and -7 % 3?

C99 truncates toward zero: -7 / 2 = **-3** and -7 % 3 = **-1** (the remainder takes the sign of the dividend).

2. With the macro SQ(x) defined as x\*x, what is SQ(2+3)?

It expands to `2+3*2+3` = **11**, not 25. Fix it with parentheses: `((x)*(x))`.

3. A function declares static int c = 0 and returns ++c. Return values over three calls?

**1, 2, 3**. The static variable is initialised once and keeps its value between calls.

4. int a\[\] = {1,2,3,4}; int \*p = a; printf of \*(p+2). Output?

**3**. p + 2 moves two ints forward from a\[0\].

5. int \*p holds the address 1000. What is p + 3 as an address?

**1012**. Pointer arithmetic scales by sizeof(int) = 4.

6. int a\[3\]\[4\]. Address of a\[2\]\[1\] in terms of base B?

Row-major: B + (2 × 4 + 1) × 4 = **B + 36**.

7. char s\[\] = "GATE". sizeof(s) and strlen(s)?

sizeof = **5** (includes the null terminator); strlen = **4**.

8. Total calls made by naive recursive fib(5), with fib(0) = fib(1) = 1 as base cases?

Calls C(n) = C(n-1) + C(n-2) + 1 with C(0) = C(1) = 1: 1, 1, 3, 5, 9, 15. Answer: **15** calls.

9. Bitwise results for 5 and 3: AND, OR, XOR; NOT of 5; and 1 shifted left by 4?

5 AND 3 = **1**, 5 OR 3 = **7**, 5 XOR 3 = **6**, NOT 5 = **-6** (2's complement), 1 << 4 = **16**.

10. int a = 2, b = 3; a = b++ \* 2;. Values of a and b?

b++ uses 3, then increments: a = **6**, b = **4**.

11. float f = 7/2;. What does f hold?

**3.0**. Integer division happens first (7/2 = 3), then conversion to float.

12. What does i = i++ + ++i; do?

Undefined behaviour: i is modified more than once without a sequence point. A careful exam question avoids it; if you see it, the answer is undefined.

### C: B.Tech theory and viva

- Explain data types, operator precedence and associativity with examples.
- Compare call by value and call by reference (via pointers); explain storage classes.
- Explain pointers, pointer arithmetic, pointer to pointer and arrays vs pointers.
- Differences between structure and union; what is structure padding?
- Explain malloc, calloc, realloc and free; what are dangling pointers and memory leaks?
- Explain recursion with factorial, Fibonacci and Tower of Hanoi; compare with iteration.
- Explain macros vs functions; what are the pitfalls of macros?
- File handling: modes of fopen, and copying a file character by character.
- Write programs: reverse a string, matrix multiply, bubble sort, linked-list insert and delete.

## Discrete Mathematics

**GATE 2027 official list (Engineering Mathematics):** propositional and first-order logic; sets, relations, functions, partial orders and lattices; monoids and groups; graphs (connectivity, matching, colouring); combinatorics (counting, recurrence relations, generating functions). Probability, linear algebra and calculus sit in the same syllabus section but are outside this subject. Typical weight is several marks per paper (approximate).

| Topic | B.Tech lens | GATE lens |
| --- | --- | --- |
| 1. Logic | Propositions, connectives, truth tables, equivalences, normal forms, rules of inference, predicates and quantifiers | Tautology checks, logical equivalence, negating quantified statements, English to logic. Frequent |
| 2. Sets, relations, functions | Set operations, relation properties, equivalence relations, closures, function types | Counting relations of each type, equivalence classes, injective, surjective and bijective counts. Very frequent |
| 3. Posets and lattices | Hasse diagrams, chains, maximal and minimal elements, lattices, Boolean algebra | Is it a lattice, complemented or distributive, divisibility posets. Frequent |
| 4. Algebraic structures | Groups, subgroups, cyclic groups, Lagrange's theorem, rings and fields | Group axioms check, element orders, number of generators, subgroup counts |
| 5. Counting | Sum and product rules, permutations, combinations, pigeonhole, inclusion-exclusion | Arrangements with repeats, solutions to equations, derangements. Very frequent |
| 6. Recurrences and generating functions | Solving linear recurrences, Tower of Hanoi, generating functions | Homogeneous and non-homogeneous recurrences, coefficient extraction |
| 7. Graph theory | Types of graphs, paths, Euler and Hamilton, trees, planarity, colouring, matching | Handshake lemma, tree counting, planarity bounds, chromatic number, Hall's theorem. Very frequent |

### DM: diagrams to draw

- Hasse diagrams for divisors of 12, divisors of 30, and the power set of a 3-element set.
- Digraph and matrix forms of a relation; reflexive, symmetric and transitive checks.
- Venn diagram for three sets with inclusion-exclusion regions.
- Graph drawings: K5, K3,3, Petersen graph, a bipartite graph with a matching.
- Euler path and circuit examples with degree annotations.
- Spanning tree of a weighted graph.

### DM: formula sheet

- Relations on an n-element set: total 2^(n^2); reflexive 2^(n^2 - n); symmetric 2^(n(n+1)/2); antisymmetric 2^n × 3^(n(n-1)/2).
- Functions from an m-set to an n-set: n^m; injective n!/(n-m)!; bijections n! when m = n. Equivalence relations are counted by Bell numbers 1, 2, 5, 15, 52.
- Graphs: sum of degrees = 2 × edges; K\_n has n(n-1)/2 edges; spanning trees of K\_n = n^(n-2); planar simple graph e <= 3v - 6 (and e <= 2v - 4 if triangle-free); Euler: v - e + f = 2.
- Counting: derangements D\_3 = 2, D\_4 = 9; Catalan C\_n = C(2n, n)/(n+1); stars and bars for non-negative solutions: C(n + k - 1, k - 1).

### DM: GATE-style numericals

1. For a 3-element set: total relations, reflexive, symmetric, antisymmetric?

Total 2^9 = **512**. Reflexive 2^6 = **64**. Symmetric 2^6 = **64**. Antisymmetric 2^3 × 3^3 = 8 × 27 = **216**.

2. Functions from a 3-set to a 4-set: total and injective? Surjective functions from a 4-set onto a 3-set?

Total 4^3 = **64**; injective 4 × 3 × 2 = **24**. Surjective 4 to 3: S(4,3) × 3! = 6 × 6 = **36**.

3. Number of equivalence relations on a 3-element set?

Bell(3) = **5** (one with a single class, three with a 2+1 split, one with all singletons).

4. Divisor posets of 30 and 12: Boolean algebra?

Divisors of 30 form a Boolean algebra B3 (8 elements, 30 is square-free). Divisors of 12 form a lattice but not a Boolean algebra: some elements (such as 2) have no complement.

5. A simple graph has 10 vertices, all of degree 4. Edges?

4 × 10 / 2 = **20** edges (handshake lemma).

6. Spanning trees of K5? Edges of K6?

5^3 = **125**. K6 has 6 × 5 / 2 = **15** edges.

7. Arrangements of the letters of MISSISSIPPI?

11! / (4! × 4! × 2!) = 39,916,800 / 1152 = **34,650**.

8. Non-negative integer solutions of x1 + x2 + x3 = 10? Coefficient of x^10 in 1/(1-x)^3?

Stars and bars: C(12, 2) = **66**. The generating-function coefficient is the same, **66**.

9. Solve T(n) = 2T(n-1) + 1 with T(0) = 0.

T(n) = **2^n - 1** (Tower of Hanoi moves).

10. Solve a\_n = 3a\_(n-1) - 2a\_(n-2) with a\_0 = 1, a\_1 = 3.

Characteristic roots 1 and 2, so a\_n = A + B·2^n. From a\_0 and a\_1: B = 2, A = -1. So a\_n = **2^(n+1) - 1** (check: a\_2 = 7).

11. Numbers from 1 to 100 divisible by 2 or 3?

50 + 33 - 16 = **67** (inclusion-exclusion).

12. Minimum people needed to guarantee 3 share a birth month?

Pigeonhole: 2 × 12 + 1 = **25**.

13. Number of generators of the cyclic group Z\_12? Number of subgroups?

Generators = phi(12) = **4** (1, 5, 7, 11). Subgroups = number of divisors of 12 = **6**.

14. Negate: for all x there exists y such that P(x, y).

There exists x such that for all y, **not P(x, y)**. Quantifiers flip and the negation moves inside.

15. Is ((p -> q) and (q -> r)) -> (p -> r) a tautology? How many Boolean functions of 2 variables?

Yes, it is hypothetical syllogism. Boolean functions of n variables: 2^(2^n), so for n = 2 there are **16**.

### DM: B.Tech theory

- Prove logical equivalences with truth tables and identities; convert a formula to CNF and DNF.
- Use rules of inference to prove an argument valid; translate sentences into predicate logic.
- Check a relation for reflexive, symmetric, antisymmetric, transitive; find its transitive closure with Warshall's algorithm.
- Draw Hasse diagrams; find upper and lower bounds, lub and glb; decide if a poset is a lattice.
- Define a group; prove subgroup criteria; state Lagrange's theorem; give examples of cyclic groups.
- Solve counting problems with permutations, combinations, pigeonhole and inclusion-exclusion.
- Solve linear recurrences with constant coefficients; form generating functions.
- Graph theory: Euler and Hamilton conditions, tree properties, planarity (Kuratowski), colouring, matching and Hall's theorem.

## How to use this

- **Semester exams:** write each theory answer once with its diagram; redraw the hand-drawn lists from memory. Practise the TOC closure and decidability tables until you can write them blind.
- **GATE:** COA: drill expanding opcodes, float encoding and multi-level AMAT. TOC: minimal DFA counting and language-class identification. C: trace output, recursion and pointer arithmetic daily. DM: relation and function counting, recurrences, graph formulas. Then solve previous-year papers topic by topic.
- **Books:** Hamacher or Mano for COA; Sipser or Hopcroft-Ullman for TOC; Kernighan and Ritchie or Balaguruswamy for C; Rosen for Discrete Maths.
