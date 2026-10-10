import { CourseMeta } from "./types";

export const TOC_COURSE: CourseMeta = {
  id: "theory-of-computation",
  title: "Theory of Computation",
  slug: "theory-of-computation",
  subjectSlug: "theory-of-computation",
  shortTitle: "TOC",
  icon: "🔄",
  color: "bg-purple-400",
  tagline:
    "Master minimal DFAs, Pumping Lemmas, Pushdown Automata, Turing Machine proofs, Chomsky hierarchy, and Rice's theorem.",
  description:
    "A rigorous, mathematically formal study notebook covering automata theory, formal languages, grammars, computability, and decidability: Deterministic and Non-deterministic Finite Automata (DFA/NFA), Myhill-Nerode minimization, Arden's theorem, Pumping Lemmas for Regular and Context-Free languages, DPDA vs NPDA power asymmetry, DCFL and CFL closure properties, CYK algorithm, Turing Machine formal models, Recursive vs Recursively Enumerable languages, Halting problem diagonalization proofs, Rice's theorem, Post Correspondence Problem (PCP), and the complete 4-tier Chomsky hierarchy for undergraduate excellence and top-rank GATE CS/IT performance.",
  level: "Undergraduate / GATE CS",
  estimatedHours: 48,
  prerequisites: [
    "Discrete Mathematics (Set Theory, Equivalence Relations, Functions, Proof by Induction)",
    "Basic algorithms and propositional logic",
  ],
  learningOutcomes: [
    "Construct minimal Deterministic Finite Automata (DFA) and execute table-filling Myhill-Nerode minimization",
    "Convert between Regular Expressions and Finite Automata using Arden's theorem and state elimination",
    "Prove non-regularity and non-context-freeness rigorously using Pumping Lemmas and closure contradiction games",
    "Analyze Context-Free Grammars (CFG) for ambiguity, remove useless/unit/null productions, and compute CNF derivation steps",
    "Design Deterministic and Non-deterministic Pushdown Automata (DPDA / NPDA) and classify DCFLs vs CFLs",
    "Trace Turing Machine tape transitions and prove language recursiveness vs recursive enumerability",
    "Apply Rice's Theorem to rapidly determine the undecidability of semantic properties of Turing Machines",
    "Formulate mapping reductions and evaluate decision properties across the complete Chomsky hierarchy",
  ],
  gateScope: "GATE 2027 CS/IT scope",
  gateBranches: ["cs"],
  gateSyllabusTopics: [
    "Regular expressions and finite automata: DFA, NFA, epsilon-NFA, equivalence, state minimization, Arden's theorem",
    "Regular languages: Pumping lemma, closure properties, decision properties (emptiness, finiteness, equivalence)",
    "Context-free grammars and languages: Derivations, parse trees, ambiguity, Chomsky Normal Form (CNF), CYK algorithm",
    "Pushdown automata: DPDA, NPDA, equivalence of acceptance modes, DCFL vs CFL closure properties",
    "Turing machines and computability: Turing machine model, multi-tape equivalence, Recursive and Recursively Enumerable languages",
    "Undecidability: Halting problem, diagonalization, Post Correspondence Problem (PCP), Rice's theorem, Chomsky hierarchy",
  ],
  modules: [
    // =========================================================================
    // MODULE 1: FINITE AUTOMATA & REGULAR EXPRESSIONS
    // =========================================================================
    {
      id: "toc-module-1-finite-automata",
      title: "Module 1: Finite Automata, DFA Minimization & State Equivalence",
      slug: "finite-automata",
      description:
        "Formal 5-tuple definitions of DFA, NFA, and epsilon-NFA, subset construction powerset algorithm, modulo state counting, and Myhill-Nerode table-filling DFA minimization.",
      order: 1,
      lessons: [
        {
          id: "dfa-nfa-and-minimization",
          title: "DFA Construction, NFA Conversion & Minimization",
          slug: "dfa-nfa-and-minimization",
          order: 1,
          estimatedMinutes: 30,
          tagline: "5-tuple formalisms, trap states, subset powerset construction, and minimal state proofs.",
          hasInteractive: false,
          hasGATE: true,
          hasPractice: true,
          sections: [
            {
              type: "explanation",
              heading: "1. Formal Definition of Deterministic Finite Automata (DFA)",
              body: [
                "A **Deterministic Finite Automaton (DFA)** is a 5-tuple $M = (Q, \\Sigma, \\delta, q_0, F)$, where:",
                "1. $Q$: A finite, non-empty set of internal states.",
                "2. $\\Sigma$: A finite alphabet of input symbols.",
                "3. $\\delta$: The transition function mapping $Q \\times \\Sigma \\to Q$ (strictly deterministic: exactly one next state for every state-symbol pair).",
                "4. $q_0 \\in Q$: The unique initial start state.",
                "5. $F \\subseteq Q$: The set of accepting (final) states.",
                "**Language of a DFA:**",
                "$L(M) = \\{ w \\in \\Sigma^* \\mid \\delta^*(q_0, w) \\in F \\}$, where $\\delta^*$ is the extended transition function defined inductively by $\\delta^*(q, \\epsilon) = q$ and $\\delta^*(q, wa) = \\delta(\\delta^*(q, w), a)$.",
                "**NFA vs DFA Equivalence:**",
                "In a Non-deterministic Finite Automaton (NFA), the transition function maps $Q \\times (\\Sigma \\cup \\{\\epsilon\\}) \\to 2^Q$ (the powerset of states). Every NFA with $n$ states can be converted into an equivalent DFA via the ==purple:Subset Construction Algorithm== with at most $2^n$ states.",
              ],
              callout: {
                kind: "gate-tip",
                title: "DFA State Count Shortcuts for Modulo Conditions",
                message:
                  "For binary numbers divisible by $k$: The minimal DFA requires EXACTLY $k$ states (representing remainders $0, 1, \\dots, k-1$). For strings where the count of a symbol modulo $k$ is $r$: Exactly $k$ states. For conditions involving both length modulo $m$ and count modulo $n$: Exactly $m \\times n$ states if $\\gcd(m, n) = 1$ in the cross-product automaton!",
              },
            },
            {
              type: "gate-analysis",
              heading: "2. GATE Worked Numerical: Minimal DFA State Counting",
              weightage: "2 Marks (Compulsory Recurring Type in GATE CS)",
              trap: "Do not forget the Dead / Trap State! In DFAs, every state MUST have defined transitions for every symbol in Sigma. An invalid prefix that can never lead to an accepting string must transition to a dead trap state.",
              solutionSteps: [
                "Problem: Find the minimum number of states in a DFA accepting all binary strings over {0, 1} that start with '01' and end with '10'.",
                "Step 1: Identify shortest valid string:",
                "  Can a string of length 3 satisfy both conditions simultaneously? '010' starts with '01' and ends with '10'! Minimum length = 3.",
                "Step 2: Construct states tracking progress:",
                "  State 0 (q0, Start): Seen nothing. On '1' -> Dead state (q_dead), because the string must start with '0'. On '0' -> q1.",
                "  State 1 (q1): Seen '0'. On '0' -> Dead state (must start with '01'). On '1' -> q2.",
                "  State 2 (q2): Successfully started with '01'. Now we look for ending in '10'. Currently ends in '1'. On '1' -> stay in q2. On '0' -> q3.",
                "  State 3 (q3, Final): Started with '01' AND currently ends with '10'! Accept. If '0' arrives -> now ends with '00', not '10' -> go to q4 (seen '0' after valid start). If '1' arrives -> now ends in '1' -> back to q2.",
                "  State 4 (q4): Seen '0' after valid start. On '0' -> stay in q4. On '1' -> back to q2.",
                "  State 5 (q_dead): Trap state for invalid starting prefixes ('1...' or '00...').",
                "Total Minimal States = 6 states (q0, q1, q2, q3, q4, q_dead).",
              ],
            },
            {
              type: "explanation",
              heading: "3. Myhill-Nerode Table-Filling Minimization Algorithm",
              body: [
                "Two states $p, q \\in Q$ in a DFA are equivalent ($p \\equiv q$) if for all strings $w \\in \\Sigma^*$, $\\delta^*(p, w) \\in F \\iff \\delta^*(q, w) \\in F$. If there exists even one string $w$ such that one state lands in $F$ and the other lands outside $F$, the states are **distinguishable**.",
                "**Table-Filling Algorithm Steps:**",
                "1. Construct a lower triangular matrix for all state pairs $(p, q)$ with $p \\ne q$.",
                "2. **Base Step (0-equivalence):** Mark pair $(p, q)$ with an 'X' if one state is in $F$ and the other is in $Q \\setminus F$.",
                "3. **Inductive Step ($k$-equivalence):** For each unmarked pair $(p, q)$, examine each symbol $a \\in \\Sigma$. If the transition pair $(\\delta(p, a), \\delta(q, a))$ is already marked with 'X', mark $(p, q)$ with 'X'.",
                "4. Repeat Step 3 until a full pass makes zero new marks.",
                "5. All remaining unmarked pairs are equivalent and can be merged into single compound states.",
              ],
            },
            {
              type: "resources",
              heading: "4. References & Authoritative Sources",
              sources: [
                {
                  title: "Introduction to Automata Theory, Languages, and Computation (3rd Edition)",
                  authors: "John E. Hopcroft, Rajeev Motwani, Jeffrey D. Ullman",
                  year: "2006",
                  publisher: "Pearson",
                  relevance:
                    "Chapters 2 & 4: Finite Automata and Properties of Regular Languages — the definitive classical textbook for DFA minimization proofs.",
                },
              ],
            },
          ],
          cheatsheet: {
            title: "Finite Automata & Minimization Quick Revision",
            summaryRule: "A DFA has exactly one transition per symbol per state; Myhill-Nerode merges indistinguishable states where delta*(p, w) and delta*(q, w) have identical acceptance outcomes.",
            keyFormulasAndRules: [
              "DFA 5-tuple: M = (Q, Sigma, delta, q_0, F); delta: Q x Sigma -> Q.",
              "NFA to DFA: Maximum possible states in equivalent DFA = 2^n for an n-state NFA.",
              "Modulo k Divisibility: Binary numbers divisible by k require exactly k states.",
              "DFA Minimization: Table-filling algorithm identifies distinguishable pairs in O(|Sigma| * |Q|^2).",
            ],
            examPitfalls: [
              "Never omit the dead trap state when counting DFA states! An NFA may simply omit invalid transitions, but a DFA must explicitly route them to a non-accepting dead state.",
            ],
          },
        },
        {
          id: "regular-expressions-and-finite-state-conversion",
          title: "Regular Expressions, Arden's Theorem & State Elimination",
          slug: "regular-expressions-and-finite-state-conversion",
          order: 2,
          estimatedMinutes: 28,
          tagline: "Arden's formula R = Q + RP => R = QP*, state elimination method, and Thompson's construction.",
          hasInteractive: false,
          hasGATE: true,
          hasPractice: true,
          sections: [
            {
              type: "explanation",
              heading: "1. Regular Expressions & Arden's Theorem",
              body: [
                "A **Regular Expression (RE)** over alphabet $\\Sigma$ recursively denotes a regular language using base operations: $\\emptyset$, $\\epsilon$, symbols $a \\in \\Sigma$, union ($R_1 + R_2$), concatenation ($R_1 R_2$), and Kleene star ($R^*$).",
                "**Arden's Theorem:**",
                "Let $P$ and $Q$ be two regular expressions over $\\Sigma$. If $\\epsilon \\notin L(P)$ (i.e., $P$ does not contain the empty string), then the linear equation:",
                "$$R = Q + RP$$",
                "has a **UNIQUE** solution given by:",
                "$$R = QP^*$$",
                "**Application to Finite Automata:**",
                "For each state $q_i$ in a DFA with transitions entering from $q_j$ on symbol $a$:",
                "$$q_i = \\sum_{j} q_j a + (\\epsilon \\text{ if } q_i \\text{ is start state})$$",
                "Solve the system of simultaneous linear equations by substitution and Arden's theorem until the accepting state expressions contain only alphabet symbols.",
              ],
            },
            {
              type: "gate-analysis",
              heading: "2. GATE Worked Numerical: Converting DFA to RE via Arden's Theorem",
              weightage: "2 Marks",
              trap: "Ensure that equation is in R = Q + RP form (with R on the right of P, not PR!). If R = Q + PR, the solution is P*Q.",
              solutionSteps: [
                "Problem: Consider a DFA with states {q1, q2}, start state q1, accepting state q2. Transitions:",
                "  delta(q1, 0) = q1, delta(q1, 1) = q2",
                "  delta(q2, 0) = q2, delta(q2, 1) = q1",
                "Find the regular expression for the language accepted by this DFA.",
                "Step 1: Formulate state equations:",
                "  q1 has incoming transitions from q1 on '0', from q2 on '1', and is start state:",
                "  q1 = q1(0) + q2(1) + epsilon.",
                "  q2 has incoming transitions from q1 on '1', and from q2 on '0':",
                "  q2 = q1(1) + q2(0).",
                "Step 2: Apply Arden's Theorem to q2:",
                "  q2 = [q1(1)] + q2(0). Here Q = q1(1) and P = 0.",
                "  q2 = q1(1)(0)*.",
                "Step 3: Substitute q2 into q1 equation:",
                "  q1 = q1(0) + [q1(1)(0)*](1) + epsilon",
                "  q1 = q1 [0 + 1(0)*1] + epsilon.",
                "Step 4: Apply Arden's Theorem to q1:",
                "  q1 = epsilon * [0 + 1(0)*1]* = [0 + 1(0)*1]*.",
                "Step 5: Substitute q1 back to find accepting state q2:",
                "  q2 = [0 + 1(0)*1]* 1(0)*.",
                "  The language accepted is: (0 + 1 0* 1)* 1 0*.",
              ],
            },
            {
              type: "resources",
              heading: "3. References & Authoritative Sources",
              sources: [
                {
                  title: "Introduction to the Theory of Computation (3rd Edition)",
                  authors: "Michael Sipser",
                  year: "2012",
                  publisher: "Cengage Learning",
                  relevance:
                    "Chapter 1: Regular Languages — state elimination algorithm and conversion theorems between automata and regular expressions.",
                },
              ],
            },
          ],
          cheatsheet: {
            title: "Regular Expressions & Arden's Theorem Quick Revision",
            summaryRule: "Arden's Theorem solves R = Q + RP with unique solution R = QP* provided epsilon is not in P; state elimination removes intermediate states by creating bypass composite paths.",
            keyFormulasAndRules: [
              "Arden's Equation: R = Q + RP ==> R = QP*.",
              "If R = Q + PR ==> R = P*Q.",
              "State Elimination: Bypassing state k creates edge R_ij = R_ij + R_ik (R_kk)* R_kj.",
              "Thompson's Construction: Translates any regular expression into an epsilon-NFA with O(|r|) states.",
            ],
            examPitfalls: [
              "Check that epsilon is not in P before claiming a unique solution with Arden's theorem; if epsilon is in P, R = QP* is still a solution, but it is not unique.",
            ],
          },
        },
      ],
    },

    // =========================================================================
    // MODULE 2: REGULAR LANGUAGE PROPERTIES & PUMPING LEMMA
    // =========================================================================
    {
      id: "toc-module-2-regular-languages",
      title: "Module 2: Regular Language Properties & Pumping Lemma",
      slug: "regular-languages",
      description:
        "Non-regularity proofs via the Pumping Lemma adversarial game, comprehensive closure property matrices, and decision property algorithms for regular languages.",
      order: 2,
      lessons: [
        {
          id: "pumping-lemma-and-closure-properties",
          title: "Pumping Lemma & Closure Properties of Regular Languages",
          slug: "pumping-lemma-and-closure-properties",
          order: 1,
          estimatedMinutes: 30,
          tagline: "Adversarial pumping game, s = xyz, and complete closure property proofs.",
          hasInteractive: false,
          hasGATE: true,
          hasPractice: true,
          sections: [
            {
              type: "explanation",
              heading: "1. The Pumping Lemma for Regular Languages",
              body: [
                "The **Pumping Lemma** is a necessary (NOT sufficient!) property satisfied by all regular languages. It is used exclusively as a proof technique by contradiction to prove that a language is **NOT regular**.",
                "**Formal Statement:**",
                "If $L$ is a regular language, then there exists a constant integer pumping length $p \\ge 1$ (the number of states in the minimal DFA) such that every string $s \\in L$ with $|s| \\ge p$ can be partitioned into three substrings, $s = xyz$, satisfying all three conditions simultaneously:",
                "1. $|y| > 0$ (the pumped substring $y$ is non-empty).",
                "2. $|xy| \\le p$ (the pumped substring $y$ occurs within the first $p$ symbols of $s$).",
                "3. For all integers $i \\ge 0$: $x y^i z \\in L$ (the string can be pumped down with $i=0$ or pumped up with $i \\ge 2$).",
                "**The Adversarial Proof Game:**",
                "1. Assume $L$ is regular $\\implies$ there exists a pumping length $p$.",
                "2. Choose a clever test string $s \\in L$ expressed in terms of $p$ such that $|s| \\ge p$ (e.g., $s = 0^p 1^p$).",
                "3. By condition 2 ($|xy| \\le p$), $y$ must consist solely of the initial prefix characters (e.g., $y = 0^k$ with $k \\ge 1$).",
                "4. Pump $y$ with $i = 0$ (pump down) or $i = 2$ (pump up). The resulting string $x y^2 z$ has unequal counts, violating language membership $\\implies$ Contradiction! Hence $L$ is not regular.",
              ],
            },
            {
              type: "comparison",
              heading: "2. Master Closure Matrix of Regular Languages",
              leadParagraph:
                "Regular languages enjoy the strongest closure properties of all Chomsky hierarchy classes:",
              columns: ["Operation", "Closed?", "Proof Construction Mechanism"],
              criteria: [
                { criterion: "Union (L1 ∪ L2)", values: ["YES", "Parallel product DFA or NFA start state branching"] },
                { criterion: "Intersection (L1 ∩ L2)", values: ["YES", "Cross-product DFA with F = F1 × F2"] },
                { criterion: "Complement (L')", values: ["YES", "Swap final and non-final states of minimal DFA"] },
                { criterion: "Concatenation (L1 · L2)", values: ["YES", "Connect final states of L1 to start state of L2 via ε"] },
                { criterion: "Kleene Star (L*)", values: ["YES", "Loop final states back to start state via ε"] },
                { criterion: "Set Difference (L1 \\ L2)", values: ["YES", "L1 \\ L2 = L1 ∩ L2' (intersection with complement)"] },
                { criterion: "Reversal (L^R)", values: ["YES", "Reverse all transition arrows, swap start and final states"] },
                { criterion: "Homomorphism", values: ["YES", "Substitute each alphabet symbol with a regular expression"] },
                { criterion: "Inverse Homomorphism", values: ["YES", "Simulate DFA on mapped strings h(w)"] },
              ],
            },
            {
              type: "resources",
              heading: "3. References & Authoritative Sources",
              sources: [
                {
                  title: "Introduction to Automata Theory, Languages, and Computation (3rd Edition)",
                  authors: "John E. Hopcroft, Rajeev Motwani, Jeffrey D. Ullman",
                  year: "2006",
                  publisher: "Pearson",
                  relevance:
                    "Chapter 4: Properties of Regular Languages — classical proofs of the pumping lemma and closure theorems.",
                },
              ],
            },
          ],
          cheatsheet: {
            title: "Pumping Lemma & Closure Quick Revision",
            summaryRule: "Regular Pumping Lemma partitions s = xyz with |xy| <= p and |y| > 0; regular languages are closed under virtually all standard operations including complement, intersection, and reversal.",
            keyFormulasAndRules: [
              "Pumping conditions: |xy| <= p, |y| >= 1, x y^i z in L for all i >= 0.",
              "Pump down: i = 0 (removes y); Pump up: i = 2 (duplicates y).",
              "Regular languages are closed under: Union, Intersection, Complement, Difference, Concatenation, Star, Reversal, Homomorphism, Inverse Homomorphism.",
              "If L is regular, then Prefixes(L), Suffixes(L), and Substrings(L) are all regular.",
            ],
            examPitfalls: [
              "The Pumping Lemma cannot be used to prove a language IS regular (it is necessary, not sufficient). Use DFA construction or regular expressions to prove regularity.",
            ],
          },
        },
        {
          id: "decision-properties-of-regular-languages",
          title: "Decision Properties & Algorithms for Regular Languages",
          slug: "decision-properties-of-regular-languages",
          order: 2,
          estimatedMinutes: 28,
          tagline: "Emptiness, finiteness, membership, and equivalence decision procedures for regular sets.",
          hasInteractive: false,
          hasGATE: true,
          hasPractice: true,
          sections: [
            {
              type: "explanation",
              heading: "1. Complete Decidability of Regular Language Properties",
              body: [
                "A decision property is an algorithmic question: 'Does a given language satisfy property $P$?' with a guaranteed YES/NO termination.",
                "**Every fundamental property of Regular Languages is DECIDABLE:**",
                "1. **Membership ($w \\in L$):**",
                "   - Run string $w$ on the DFA. If it terminates in a final state, YES; otherwise NO. Complexity: $O(|w|)$.",
                "2. **Emptiness ($L = \\emptyset$):**",
                "   - Perform BFS or DFS from the start state $q_0$. If NO accepting state is reachable, $L$ is empty. Complexity: $O(|V| + |E|)$.",
                "3. **Finiteness (Is $L$ finite?):**",
                "   - Eliminate unreachable states and dead states. If the remaining transition graph contains a directed **cycle**, $L$ is infinite. If acyclic, $L$ is finite! Complexity: $O(|V| + |E|)$.",
                "4. **Equivalence ($L_1 = L_2$):**",
                "   - Construct the symmetric difference: $L_{\\Delta} = (L_1 \\cap \\overline{L_2}) \\cup (\\overline{L_1} \\cap L_2)$.",
                "   - $L_1 = L_2 \\iff L_{\\Delta} = \\emptyset$. Test emptiness on $L_{\\Delta}$!",
                "5. **Subset / Containment ($L_1 \\subseteq L_2$):**",
                "   - $L_1 \\subseteq L_2 \\iff L_1 \\cap \\overline{L_2} = \\emptyset$. Test emptiness of $L_1 \\cap \\overline{L_2}$!",
              ],
            },
            {
              type: "gate-analysis",
              heading: "2. GATE Worked Numerical: Equivalence via Symmetric Difference",
              weightage: "2 Marks",
              trap: "To test if two DFAs accept the same language, you do NOT have to test infinitely many strings. Minimize both DFAs and check graph isomorphism, or test emptiness of their symmetric difference!",
              solutionSteps: [
                "Problem: Let M1 and M2 be two DFAs over {0, 1}. Describe the exact algorithmic procedure to decide whether L(M1) = L(M2).",
                "Step 1: Construct complement of M2: Invert accepting and non-accepting states of M2 to obtain M2_bar.",
                "Step 2: Construct product automaton for L1 cap L2_bar: States are Q1 x Q2, accepting states are F1 x (Q2 \\ F2).",
                "Step 3: Construct product automaton for L1_bar cap L2: Accepting states are (Q1 \\ F1) x F2.",
                "Step 4: Combine both product automata via union: This yields the symmetric difference L_diff = (L1 \\ L2) union (L2 \\ L1).",
                "Step 5: Apply Graph Reachability (BFS/DFS) on L_diff starting from (q01, q02):",
                "  If any accepting state is reachable: L_diff != empty set ==> L1 != L2 (Output: NO).",
                "  If no accepting state is reachable: L_diff = empty set ==> L1 = L2 (Output: YES).",
              ],
            },
            {
              type: "resources",
              heading: "3. References & Authoritative Sources",
              sources: [
                {
                  title: "Introduction to Automata Theory, Languages, and Computation (3rd Edition)",
                  authors: "John E. Hopcroft, Rajeev Motwani, Jeffrey D. Ullman",
                  year: "2006",
                  publisher: "Pearson",
                  relevance:
                    "Chapter 4: Decision Properties of Regular Languages — proofs that emptiness, finiteness, and equivalence are decidable.",
                },
              ],
            },
          ],
          cheatsheet: {
            title: "Decision Properties of Regular Languages Quick Revision",
            summaryRule: "All standard decision questions for regular languages (Membership, Emptiness, Finiteness, Equivalence, Subset, Totality) are completely DECIDABLE.",
            keyFormulasAndRules: [
              "Membership w in L: Trace on DFA in O(|w|).",
              "Emptiness L = 0: Check if any final state is reachable from start state in O(V+E).",
              "Finiteness: Check for cycles on paths between start state and final states.",
              "Equivalence L1 = L2: Test if (L1 ∩ L2') ∪ (L1' ∩ L2) is empty.",
            ],
            examPitfalls: [
              "While equivalence is decidable for Regular languages, equivalence is UNDECIDABLE for Context-Free Languages!",
            ],
          },
        },
      ],
    },

    // =========================================================================
    // MODULE 3: CONTEXT-FREE GRAMMARS & NORMAL FORMS
    // =========================================================================
    {
      id: "toc-module-3-cfg-and-pda",
      title: "Module 3: Context-Free Grammars, Ambiguity & Pushdown Automata",
      slug: "cfg-and-pda",
      description:
        "Derivations, parse trees, grammar ambiguity, Chomsky Normal Form (CNF), DPDA vs NPDA, DCFL vs CFL, and acceptance by final state vs empty stack.",
      order: 3,
      lessons: [
        {
          id: "context-free-grammars-ambiguity-and-cnf",
          title: "CFG Derivations, Ambiguity Proofs & Chomsky Normal Form",
          slug: "context-free-grammars-ambiguity-and-cnf",
          order: 1,
          estimatedMinutes: 30,
          tagline: "Parse tree multiplicity, inherent ambiguity, CNF 2n-1 steps, and CYK parsing.",
          hasInteractive: false,
          hasGATE: true,
          hasPractice: true,
          sections: [
            {
              type: "explanation",
              heading: "1. Context-Free Grammars & The Ambiguity Problem",
              body: [
                "A **Context-Free Grammar (CFG)** is a 4-tuple $G = (V, T, P, S)$, where production rules have the form $A \\to \\alpha$, with $A \\in V$ (a single non-terminal variable) and $\\alpha \\in (V \\cup T)^*$.",
                "**Ambiguity in Grammars:**",
                "A grammar $G$ is **ambiguous** if there exists at least one string $w \\in L(G)$ that has **two or more distinct leftmost derivations** (or equivalently, two or more distinct parse trees).",
                "**Inherent Ambiguity:**",
                "A context-free language $L$ is **inherently ambiguous** if EVERY grammar that generates $L$ is ambiguous. Classic inherently ambiguous language:",
                "$$L = \\{ a^n b^n c^m d^m \\mid n, m \\ge 1 \\} \\cup \\{ a^n b^m c^m d^n \\mid n, m \\ge 1 \\}$$",
                "For strings where $n = m$ ($a^n b^n c^n d^n$), every grammar is forced to generate duplicate parse trees.",
                "**Chomsky Normal Form (CNF):**",
                "A grammar is in CNF if all production rules are strictly of the form: $A \\to BC$ or $A \\to a$ (where $A, B, C \\in V$ and $a \\in T$).",
                "==purple:CNF Derivation Length Theorem:== If a string $w \\in L(G)$ has length $n \\ge 1$, any derivation of $w$ in a CNF grammar requires **EXACTLY $2n - 1$ steps** (specifically: $n - 1$ rule applications of $A \\to BC$, followed by $n$ rule applications of $A \\to a$).",
              ],
            },
            {
              type: "gate-analysis",
              heading: "2. GATE Worked Numerical: Derivation Steps in CNF Grammar",
              weightage: "2 Marks (High Frequency)",
              trap: "The formula 2n - 1 applies ONLY when the grammar is in Chomsky Normal Form (CNF)! For general grammars, derivation lengths can vary.",
              solutionSteps: [
                "Problem: A context-free grammar G is in Chomsky Normal Form. A string w of length 15 is derived in G. How many derivation steps were executed?",
                "Step 1: Identify CNF production structure:",
                "  Binary productions (A -> BC) increase the count of non-terminals by 1.",
                "  To grow from 1 start symbol S to 15 non-terminals requires: 15 - 1 = 14 applications of A -> BC.",
                "Step 2: Terminal productions (A -> a):",
                "  Each of the 15 non-terminals must be converted into a terminal symbol: 15 applications of A -> a.",
                "Step 3: Total derivation steps:",
                "  Total steps = (n - 1) + n = 2n - 1 = 2(15) - 1 = 30 - 1 = 29 steps.",
              ],
            },
            {
              type: "resources",
              heading: "3. References & Authoritative Sources",
              sources: [
                {
                  title: "Introduction to Automata Theory, Languages, and Computation (3rd Edition)",
                  authors: "John E. Hopcroft, Rajeev Motwani, Jeffrey D. Ullman",
                  year: "2006",
                  publisher: "Pearson",
                  relevance:
                    "Chapter 5: Context-Free Grammars and Languages — parse trees, ambiguity, and CNF transformation algorithms.",
                },
              ],
            },
          ],
          cheatsheet: {
            title: "CFG & Chomsky Normal Form Quick Revision",
            summaryRule: "A CFG is ambiguous if some string has >= 2 distinct leftmost derivations; in CNF (A -> BC or A -> a), deriving a string of length n takes exactly 2n - 1 steps.",
            keyFormulasAndRules: [
              "CNF form: A -> BC or A -> a.",
              "CNF Derivation Steps: 2n - 1 steps for string of length n.",
              "Testing ambiguity is UNDECIDABLE for general CFGs.",
              "CYK Algorithm parses any string of length n in O(n^3 * |P|) time using dynamic programming on CNF grammars.",
            ],
            examPitfalls: [
              "Remember that the start symbol can derive epsilon (S -> epsilon) only if epsilon is in the language, in which case S cannot appear on the right side of any production in CNF.",
            ],
          },
        },
        {
          id: "cfg-ambiguity-and-pushdown-automata",
          title: "Pushdown Automata (PDA), DPDA vs NPDA & Acceptance Modes",
          slug: "cfg-ambiguity-and-pushdown-automata",
          order: 2,
          estimatedMinutes: 30,
          tagline: "Stack transitions, DPDA strictly less powerful than NPDA, and DCFL vs CFL.",
          hasInteractive: false,
          hasGATE: true,
          hasPractice: true,
          sections: [
            {
              type: "explanation",
              heading: "1. Pushdown Automata: Formal Definition & Operation",
              body: [
                "A **Pushdown Automaton (PDA)** augments a finite state automaton with an unbounded Last-In-First-Out (LIFO) stack memory.",
                "Formally defined as a 7-tuple: $M = (Q, \\Sigma, \\Gamma, \\delta, q_0, Z_0, F)$, where:",
                "- $\\Gamma$: Finite stack alphabet.",
                "- $Z_0 \\in \\Gamma$: Initial start symbol on the stack.",
                "- $\\delta$: Transition function mapping $Q \\times (\\Sigma \\cup \\{\\epsilon\\}) \\times \\Gamma \\to 2^{Q \\times \\Gamma^*}$.",
                "**Two Acceptance Modes:**",
                "1. **Acceptance by Final State ($L(M)$):** The input is fully consumed and the PDA halts in an accepting state $q \\in F$ (stack contents are ignored).",
                "2. **Acceptance by Empty Stack ($N(M)$):** The input is fully consumed and the stack becomes completely empty (state is ignored).",
                "==purple:Equivalence Theorem:== For Non-deterministic PDAs (NPDA), $L(M)$ and $N(M)$ accept the EXACT SAME class of languages (Context-Free Languages).",
              ],
            },
            {
              type: "explanation",
              heading: "2. The Power Asymmetry: DPDA vs NPDA",
              body: [
                "In finite automata, determinism and non-determinism have identical expressive power ($DFA = NFA$).",
                "**For Pushdown Automata, determinism is strictly weaker:**",
                "$$DCFL \\subsetneq CFL$$",
                "- **Deterministic Pushdown Automata (DPDA):** At most one transition is possible for any state, input symbol (or $\\epsilon$), and top-of-stack symbol. The languages accepted by DPDA are **Deterministic Context-Free Languages (DCFL)**.",
                "- **Classic Distinctions:**",
                "  - Even-length palindromes $L = \\{ w w^R \\mid w \\in \\Sigma^* \\}$ is **CFL but NOT DCFL** (requires non-determinism to guess the midpoint).",
                "  - Marked palindromes $L = \\{ w c w^R \\mid w \\in \\Sigma^* \\}$ **IS DCFL** (the center marker $c$ signals when to switch from pushing to popping).",
                "  - $L = \\{ a^n b^n \\mid n \\ge 1 \\} \\cup \\{ a^n b^{2n} \\mid n \\ge 1 \\}$ is **CFL but NOT DCFL**.",
              ],
              callout: {
                kind: "gate-tip",
                title: "DCFL vs CFL Closure Properties Contrast",
                message:
                  "DCFL is CLOSED under ==pink:COMPLEMENT==, but NOT closed under union or intersection! In contrast, CFL is CLOSED under ==green:UNION==, but NOT closed under complement or intersection! This contrast is one of the most tested theoretical facts in GATE CS.",
              },
            },
            {
              type: "comparison",
              heading: "3. Closure Properties: DCFL vs CFL",
              leadParagraph: "Side-by-side comparison of closure properties:",
              columns: ["Operation", "DCFL (DPDA)", "CFL (NPDA)"],
              criteria: [
                { criterion: "Complement", values: ["YES (Closed!)", "NO (Not closed)"] },
                { criterion: "Union", values: ["NO (Not closed)", "YES (Closed)"] },
                { criterion: "Intersection", values: ["NO (Not closed)", "NO (Not closed)"] },
                { criterion: "Intersection with Regular", values: ["YES (Closed)", "YES (Closed)"] },
                { criterion: "Concatenation", values: ["NO (Not closed)", "YES (Closed)"] },
                { criterion: "Kleene Star", values: ["NO (Not closed)", "YES (Closed)"] },
                { criterion: "Reversal", values: ["NO (Not closed)", "YES (Closed)"] },
              ],
            },
            {
              type: "resources",
              heading: "4. References & Authoritative Sources",
              sources: [
                {
                  title: "Introduction to Automata Theory, Languages, and Computation (3rd Edition)",
                  authors: "John E. Hopcroft, Rajeev Motwani, Jeffrey D. Ullman",
                  year: "2006",
                  publisher: "Pearson",
                  relevance:
                    "Chapter 6: Pushdown Automata — equivalence of final state and empty stack acceptance, and DCFL complementation proofs.",
                },
              ],
            },
          ],
          cheatsheet: {
            title: "Pushdown Automata & DCFL Quick Revision",
            summaryRule: "DPDA is strictly less powerful than NPDA; DCFL is closed under complement but not union; CFL is closed under union but not complement.",
            keyFormulasAndRules: [
              "PDA 7-tuple: M = (Q, Sigma, Gamma, delta, q_0, Z_0, F).",
              "Acceptance by Final State == Acceptance by Empty Stack for NPDA.",
              "DCFL is closed under: Complement, Intersection with Regular, Inverse Homomorphism.",
              "CFL is closed under: Union, Concatenation, Kleene Star, Reversal, Homomorphism.",
              "Neither DCFL nor CFL is closed under intersection.",
            ],
            examPitfalls: [
              "Do not assume palindromes are always non-deterministic: w c w^R has an explicit center marker and is easily recognized by a deterministic PDA.",
            ],
          },
        },
      ],
    },

    // =========================================================================
    // MODULE 4: CONTEXT-FREE PUMPING LEMMA & DECISION PROPERTIES
    // =========================================================================
    {
      id: "toc-module-4-cfl-pumping-and-decision",
      title: "Module 4: CFL Pumping Lemma & Decision Algorithms",
      slug: "cfl-pumping-and-decision",
      description:
        "Pumping lemma for context-free languages (uvxyz), proving non-CFL languages, and decision properties of context-free languages.",
      order: 4,
      lessons: [
        {
          id: "cfl-pumping-lemma-and-closure-matrix",
          title: "Pumping Lemma for CFLs & Non-Context-Free Proofs",
          slug: "cfl-pumping-lemma-and-closure-matrix",
          order: 1,
          estimatedMinutes: 28,
          tagline: "s = uvxyz decomposition, proving a^n b^n c^n is not CFL, and undecidable CFG problems.",
          hasInteractive: false,
          hasGATE: true,
          hasPractice: true,
          sections: [
            {
              type: "explanation",
              heading: "1. The Pumping Lemma for Context-Free Languages",
              body: [
                "The **Pumping Lemma for CFLs** is used to prove that a given language is NOT context-free.",
                "**Formal Statement:**",
                "If $L$ is a context-free language, there exists a pumping length $p \\ge 1$ such that every string $s \\in L$ with $|s| \\ge p$ can be divided into five pieces, $s = uvxyz$, satisfying:",
                "1. $|vxy| \\le p$ (the pumped region $vxy$ has length at most $p$).",
                "2. $|vy| \\ge 1$ ($v$ and $y$ are not both empty; at least one symbol is pumped).",
                "3. For all $i \\ge 0$: $u v^i x y^i z \\in L$ (both $v$ and $y$ are pumped simultaneously with identical powers).",
                "**Canonical Non-CFL Proofs:**",
                "- $L_1 = \\{ a^n b^n c^n \\mid n \\ge 1 \\}$: Pick $s = a^p b^p c^p$. Since $|vxy| \\le p$, $vxy$ can span at most two different symbol types (e.g., $a$'s and $b$'s, or $b$'s and $c$'s). Pumping changes the count of those symbols while leaving the third unchanged $\\implies$ Contradiction!",
                "- $L_2 = \\{ a^n b^n c^n d^n \\mid n \\ge 1 \\}$: Not CFL (requires tracking 4 counts).",
                "- $L_3 = \\{ w w \\mid w \\in \\Sigma^* \\}$: Not CFL (copying language requires cross-serial dependencies).",
                "- $L_4 = \\{ a^{p} \\mid p \\text{ is prime} \\}$: Not CFL.",
              ],
            },
            {
              type: "explanation",
              heading: "2. Decision Properties of Context-Free Languages",
              body: [
                "Unlike regular languages, many fundamental questions for CFGs are completely **UNDECIDABLE**:",
                "**Decidable Properties for CFGs:**",
                "1. **Emptiness ($L(G) = \\emptyset$):** DECIDABLE (check if start symbol $S$ derives any terminal string).",
                "2. **Finiteness (Is $L(G)$ finite?):** DECIDABLE (check for cycles in variable dependency graph of CNF).",
                "3. **Membership ($w \\in L(G)$):** DECIDABLE (via CYK dynamic programming algorithm in $O(n^3)$).",
                "**Undecidable Properties for CFGs (GATE Critical Traps):**",
                "1. **Equivalence ($L(G_1) = L(G_2)$):** ==pink:UNDECIDABLE==!",
                "2. **Totality / Universality ($L(G) = \\Sigma^*$):** ==pink:UNDECIDABLE==!",
                "3. **Inclusion ($L(G_1) \\subseteq L(G_2)$):** ==pink:UNDECIDABLE==!",
                "4. **Disjointness ($L(G_1) \\cap L(G_2) = \\emptyset$):** ==pink:UNDECIDABLE==!",
                "5. **Is $L(G)$ regular?:** ==pink:UNDECIDABLE==!",
                "6. **Is grammar $G$ ambiguous?:** ==pink:UNDECIDABLE==!",
              ],
            },
            {
              type: "resources",
              heading: "3. References & Authoritative Sources",
              sources: [
                {
                  title: "Introduction to the Theory of Computation (3rd Edition)",
                  authors: "Michael Sipser",
                  year: "2012",
                  publisher: "Cengage Learning",
                  relevance:
                    "Chapter 2: Context-Free Languages — pumping lemma proofs and undecidability reductions for context-free grammars.",
                },
              ],
            },
          ],
          cheatsheet: {
            title: "CFL Pumping Lemma & Decidability Quick Revision",
            summaryRule: "CFL Pumping partitions s = uvxyz with |vxy| <= p and |vy| >= 1; for CFGs, Emptiness, Finiteness, and Membership are Decidable, but Equivalence and Universality are Undecidable.",
            keyFormulasAndRules: [
              "CFL Pumping conditions: |vxy| <= p, |vy| >= 1, u v^i x y^i z in L for all i >= 0.",
              "Classic Non-CFLs: a^n b^n c^n, a^n b^n c^n d^n, w w, a^(n^2), a^prime.",
              "Decidable for CFG: Membership, Emptiness, Finiteness.",
              "Undecidable for CFG: Equivalence, Universality (L = Sigma*), Inclusion, Disjointness, Ambiguity.",
            ],
            examPitfalls: [
              "Do not confuse grammar ambiguity with language inherent ambiguity: a language may have an ambiguous grammar yet still be unambiguous if an alternative unambiguous grammar exists.",
            ],
          },
        },
      ],
    },

    // =========================================================================
    // MODULE 5: TURING MACHINES, COMPUTABILITY & UNDECIDABILITY
    // =========================================================================
    {
      id: "toc-module-5-turing-and-decidability",
      title: "Module 5: Turing Machines, Computability & Rice's Theorem",
      slug: "turing-and-decidability",
      description:
        "Turing machines, Recursive vs Recursively Enumerable sets, Halting problem proof by diagonalization, mapping reductions, Post Correspondence Problem, and Rice's Theorem.",
      order: 5,
      lessons: [
        {
          id: "turing-machines-and-rices-theorem",
          title: "Turing Machines, Undecidability & Rice's Theorem",
          slug: "turing-machines-and-rices-theorem",
          order: 1,
          estimatedMinutes: 30,
          tagline: "Recursive vs RE languages, Halting problem proof by diagonalization, and Rice's Theorem.",
          hasInteractive: false,
          hasGATE: true,
          hasPractice: true,
          sections: [
            {
              type: "explanation",
              heading: "1. The Formal Turing Machine Model & Language Classes",
              body: [
                "A **Turing Machine (TM)** is formally defined as a 7-tuple $M = (Q, \\Sigma, \\Gamma, \\delta, q_0, B, F)$, where:",
                "- $\\Gamma$: Tape alphabet containing $\\Sigma \\subsetneq \\Gamma$ and blank symbol $B \\in \\Gamma \\setminus \\Sigma$.",
                "- $\\delta$: Transition function mapping $Q \\times \\Gamma \\to Q \\times \\Gamma \\times \\{L, R\\}$. The read/write head modifies the current cell and steps Left ($L$) or Right ($R$).",
                "**Language Class Hierarchy:**",
                "1. **Recursively Enumerable (RE / Turing-Recognizable / Type 0):**",
                "   - A language $L$ is RE if there exists a TM $M$ such that for any string $w \\in L$, $M$ halts and accepts. If $w \\notin L$, $M$ may either halt and reject OR loop indefinitely.",
                "2. **Recursive (REC / Turing-Decidable):**",
                "   - A language $L$ is Recursive if there exists a TM (a 'Decider') that **halts on all inputs** (accepts if $w \\in L$, rejects if $w \\notin L$). Never loops forever!",
                "==purple:Fundamental Theorem:== A language $L$ is Recursive IF AND ONLY IF both $L$ and its complement $\\overline{L}$ are Recursively Enumerable ($L \\in \\text{REC} \\iff L \\in \\text{RE} \\land \\overline{L} \\in \\text{RE}$).",
              ],
            },
            {
              type: "explanation",
              heading: "2. The Halting Problem & Proof by Diagonalization",
              body: [
                "**The Halting Problem ($H_{TM}$):**",
                "$$H_{TM} = \\{ \\langle M, w \\rangle \\mid M \\text{ is a TM and } M \\text{ halts on input } w \\}$$",
                "**Turing's Diagonalization Proof (1936):**",
                "1. Assume for contradiction that there exists a decider $H$ that takes $\\langle M, w \\rangle$ and returns YES if $M$ halts on $w$, and NO if $M$ loops on $w$.",
                "2. Construct an adversarial machine $D$ that takes the encoding of any machine $\\langle M \\rangle$ as input:",
                "   - $D$ runs $H$ on $\\langle M, \\langle M \\rangle \\rangle$.",
                "   - If $H$ says YES (i.e. $M$ halts on its own code), $D$ enters an intentional infinite loop.",
                "   - If $H$ says NO (i.e. $M$ loops on its own code), $D$ immediately halts and accepts.",
                "3. What happens when $D$ is fed its own encoding: $\\langle D, \\langle D \\rangle \\rangle$?",
                "   - If $D$ halts on $\\langle D \\rangle \\implies H$ says YES $\\implies D$ loops!",
                "   - If $D$ loops on $\\langle D \\rangle \\implies H$ says NO $\\implies D$ halts!",
                "4. Both branches produce a logical impossibility $\\implies H$ cannot exist! $H_{TM}$ is **UNDECIDABLE**.",
              ],
            },
            {
              type: "explanation",
              heading: "3. Rice's Theorem for Semantic Language Properties",
              body: [
                "**Rice's Theorem** is the single fastest decision rule for GATE computability problems:",
                "> Any **non-trivial property of the LANGUAGE** recognized by a Turing Machine is **UNDECIDABLE**.",
                "**The Two Criteria for Rice's Theorem:**",
                "1. **Semantic Property:** The property must be about the language $L(M)$ accepted by the machine, NOT about the syntactic machine description (e.g., number of states, steps taken).",
                "2. **Non-Trivial:** There exists at least one TM whose language satisfies the property, and at least one TM whose language does NOT satisfy it ($P \\ne \\emptyset$ and $P \\ne \\text{All RE languages}$).",
                "**Examples of Undecidable Properties via Rice's Theorem:**",
                "- Is $L(M)$ empty? $\\implies$ Undecidable!",
                "- Is $L(M)$ finite? $\\implies$ Undecidable!",
                "- Is $L(M)$ regular? $\\implies$ Undecidable!",
                "- Is $L(M)$ context-free? $\\implies$ Undecidable!",
                "- Does $L(M)$ contain the string '101'? $\\implies$ Undecidable!",
              ],
              callout: {
                kind: "gate-tip",
                title: "Syntactic vs Semantic Distinction in Rice's Theorem",
                message:
                  "If a question asks about the CODE, HARDWARE, or EXECUTION STEPS of the Turing machine (e.g. 'Does TM M take more than 100 steps on input w?' or 'Does M have 10 states?'), Rice's Theorem DOES NOT APPLY! We can simply inspect the state table or simulate the machine for 100 steps; such questions are completely DECIDABLE.",
              },
            },
            {
              type: "resources",
              heading: "4. References & Authoritative Sources",
              sources: [
                {
                  title: "Introduction to the Theory of Computation (3rd Edition)",
                  authors: "Michael Sipser",
                  year: "2012",
                  publisher: "Cengage Learning",
                  relevance:
                    "Chapters 3, 4 & 5: Turing Machines, Decidability, and Reducibility — the gold standard for mapping reductions and undecidability proofs.",
                },
              ],
            },
          ],
          cheatsheet: {
            title: "Turing Machines & Rice's Theorem Quick Revision",
            summaryRule: "A language is Recursive iff both it and its complement are RE; any non-trivial semantic property of the language of a TM is undecidable by Rice's theorem.",
            keyFormulasAndRules: [
              "Recursive (REC): Decider halts on ALL inputs (never loops).",
              "Recursively Enumerable (RE): TM halts and accepts on valid inputs; may loop on invalid inputs.",
              "Halting Problem is RE but NOT Recursive; its complement is NOT RE.",
              "Rice's Theorem applies to ANY non-trivial semantic property of L(M).",
              "Syntactic properties of M (state count, step bounds) are DECIDABLE.",
            ],
            examPitfalls: [
              "Do not apply Rice's theorem to questions about whether M halts on a specific input string w (that is the Halting Problem directly, not a pure language property).",
            ],
          },
        },
        {
          id: "undecidability-reductions-and-pcp",
          title: "Mapping Reductions, Post Correspondence Problem & Chomsky Hierarchy",
          slug: "undecidability-reductions-and-pcp",
          order: 2,
          estimatedMinutes: 30,
          tagline: "Reductions A <=_m B, Post Correspondence Problem (PCP), and the complete 4-tier Chomsky hierarchy.",
          hasInteractive: false,
          hasGATE: true,
          hasPractice: true,
          sections: [
            {
              type: "explanation",
              heading: "1. Mapping Reductions ($A \\le_m B$) & Directionality Rules",
              body: [
                "A **mapping reduction (many-one reduction)** reduces problem $A$ to problem $B$ ($A \\le_m B$) via a computable function $f: \\Sigma^* \\to \\Sigma^*$ such that for all $w$:",
                "$$w \\in A \\iff f(w) \\in B$$",
                "**Directional Consequences of $A \\le_m B$ (Crucial GATE Logic):**",
                "1. If $B$ is **Decidable**, then $A$ is **Decidable**.",
                "2. If $A$ is **Undecidable**, then $B$ is **Undecidable**.",
                "3. If $B$ is **Recursively Enumerable (RE)**, then $A$ is **RE**.",
                "4. If $A$ is **not RE**, then $B$ is **not RE**.",
                "==pink:GATE Exam Trap:== If $A$ is decidable, it tells us NOTHING about whether $B$ is decidable! If $B$ is undecidable, it tells us NOTHING about whether $A$ is undecidable!",
              ],
            },
            {
              type: "explanation",
              heading: "2. Post Correspondence Problem (PCP)",
              body: [
                "**The Post Correspondence Problem (PCP):**",
                "Given two lists of strings over an alphabet $\\Sigma$:",
                "$A = (x_1, x_2, \\dots, x_k)$ and $B = (y_1, y_2, \\dots, y_k)$.",
                "Does there exist an index sequence $i_1, i_2, \\dots, i_m$ ($m \\ge 1$) such that:",
                "$$x_{i_1} x_{i_2} \\cdots x_{i_m} = y_{i_1} y_{i_2} \\cdots y_{i_m}$$",
                "- PCP is **UNDECIDABLE** for alphabet size $|\\Sigma| \\ge 2$ and list length $k \\ge 7$.",
                "- PCP over a unary alphabet ($|\\Sigma| = 1$) is **DECIDABLE**!",
                "- Modified PCP (MPCP), where the match must start with index 1 ($i_1 = 1$), is also **UNDECIDABLE**.",
                "- PCP is the standard intermediate tool used to prove that CFG ambiguity and CFG equivalence are undecidable.",
              ],
            },
            {
              type: "comparison",
              heading: "3. Master Chomsky Hierarchy & Cross-Class Decidability Matrix",
              leadParagraph: "Complete comparison of the 4 Chomsky language classes:",
              columns: ["Chomsky Type", "Language Class", "Automaton Model", "Grammar Production Rule"],
              criteria: [
                { criterion: "Type 3", values: ["Regular Languages", "Deterministic / Non-deterministic Finite Automaton (DFA / NFA)", "A -> aB or A -> a (Right Linear)"] },
                { criterion: "Type 2", values: ["Context-Free Languages", "Pushdown Automaton (NPDA)", "A -> α, where A in V, α in (V ∪ T)*"] },
                { criterion: "Type 1", values: ["Context-Sensitive Languages", "Linear Bounded Automaton (LBA)", "α -> β, with |α| <= |β| (non-contracting)"] },
                { criterion: "Type 0", values: ["Recursively Enumerable", "Turing Machine (TM)", "α -> β, unrestricted (α must contain a variable)"] },
              ],
            },
            {
              type: "resources",
              heading: "4. References & Authoritative Sources",
              sources: [
                {
                  title: "Introduction to the Theory of Computation (3rd Edition)",
                  authors: "Michael Sipser",
                  year: "2012",
                  publisher: "Cengage Learning",
                  relevance:
                    "Chapters 5 & 7: Undecidability and Time Complexity — mapping reductions, PCP reduction chains, and Chomsky hierarchy.",
                },
              ],
            },
          ],
          cheatsheet: {
            title: "Reductions, PCP & Chomsky Hierarchy Quick Revision",
            summaryRule: "In reduction A <=_m B: if B is decidable, A is decidable; if A is undecidable, B is undecidable; PCP is undecidable for alphabet size >= 2.",
            keyFormulasAndRules: [
              "A <=_m B: Decidability flows LEFT (B decidable => A decidable).",
              "A <=_m B: Undecidability flows RIGHT (A undecidable => B undecidable).",
              "PCP over unary alphabet (|Sigma| = 1) is DECIDABLE.",
              "Chomsky Hierarchy: Type 3 (Regular) ⊂ Type 2 (CFL) ⊂ Type 1 (CSL) ⊂ Recursive ⊂ Type 0 (RE).",
              "Context-Sensitive Languages (Type 1) are recognized by Linear Bounded Automata (LBA) and are completely DECIDABLE.",
            ],
            examPitfalls: [
              "Context-Sensitive Languages are recursive (decidable). Do not confuse CSL with Recursively Enumerable languages.",
            ],
          },
        },
      ],
    },
  ],
};
