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
    "A rigorous, mathematically formal study notebook covering automata theory, formal languages, grammars, computability, and decidability. Built specifically for B.Tech university curricula and top-percentile GATE CS/IT performance.",
  level: "Undergraduate / GATE CS",
  estimatedHours: 38,
  prerequisites: [
    "Discrete Mathematics (Set Theory, Relations, Functions, Proof by Induction)",
    "Basic algorithms and propositional logic",
  ],
  learningOutcomes: [
    "Design minimal Deterministic Finite Automata (DFA) and apply table-filling minimization algorithms",
    "Convert Non-deterministic Finite Automata (NFA) to equivalent DFAs using subset construction",
    "Prove non-regularity of formal languages using the Pumping Lemma and closure properties",
    "Construct Context-Free Grammars (CFG) and analyze grammar ambiguity and Chomsky Normal Form (CNF)",
    "Design deterministic and non-deterministic Pushdown Automata (DPDA / NPDA) and classify DCFLs vs CFLs",
    "Construct Turing Machines for multi-symbol pattern matching and classify recursive vs recursively enumerable sets",
    "Apply Rice's Theorem to rapidly determine undecidability of non-trivial semantic properties of Turing Machines",
  ],
  gateWeightage: "6 - 9 Marks",
  gateSyllabusTopics: [
    "Regular expressions and finite automata (DFA, NFA, minimization)",
    "Context-free grammars and push-down automata (DPDA, NPDA)",
    "Regular and context-free languages, pumping lemma, closure properties",
    "Turing machines and undecidability (Halting problem, Rice's theorem)",
  ],
  modules: [
    // =========================================================================
    // MODULE 1: FINITE AUTOMATA & MINIMIZATION
    // =========================================================================
    {
      id: "toc-module-1-finite-automata",
      title: "Module 1: Finite Automata & DFA Minimization",
      slug: "finite-automata",
      description:
        "Formal definitions of DFA, NFA, epsilon-NFA, subset construction algorithm, and Myhill-Nerode table-filling DFA minimization.",
      order: 1,
      lessons: [
        {
          id: "dfa-nfa-and-minimization",
          title: "DFA Construction, NFA Conversion & Minimization",
          slug: "dfa-nfa-and-minimization",
          order: 1,
          estimatedMinutes: 24,
          tagline: "5-tuple formalisms, trap states, subset powerset construction, and minimal state proofs.",
          hasInteractive: false,
          hasGATE: true,
          hasPractice: true,
          sections: [
            {
              type: "explanation",
              heading: "1. Formal Definition of Deterministic Finite Automata (DFA)",
              body: [
                "A Deterministic Finite Automaton (DFA) is formally defined as a 5-tuple: M = (Q, Sigma, delta, q_0, F), where:",
                "1. Q: A finite non-empty set of internal states.",
                "2. Sigma: A finite non-empty set of input symbols (the alphabet).",
                "3. delta: The transition function mapping Q x Sigma -> Q (strictly deterministic: exactly one transition per state-symbol pair).",
                "4. q_0 in Q: The unique initial starting state.",
                "5. F subset of Q: The set of accepting (final) states (can be empty, accepting the empty language).",
                "Language of DFA: L(M) = { w in Sigma* | delta*(q_0, w) in F }, where delta* is the extended transition function.",
                "NFA vs DFA: In a Non-deterministic Finite Automaton (NFA), delta maps Q x (Sigma union {epsilon}) -> 2^Q (powerset). For an NFA with n states, the equivalent minimal DFA has at most 2^n states.",
              ],
              callout: {
                kind: "gate-tip",
                title: "DFA State Count Shortcuts for Modulo Conditions",
                message:
                  "For strings representing binary numbers divisible by k: The minimal DFA requires EXACTLY k states (representing remainders 0, 1, ..., k-1). For strings where the count of a specific symbol is divisible by k: Exactly k states.",
              },
            },
            {
              type: "gate-analysis",
              heading: "2. GATE Worked Numerical: Minimal DFA State Counting",
              weightage: "2 Marks (Compulsory Type in GATE CS)",
              trap: "Remember the Dead / Trap State! In DFAs, every state MUST have transitions for every symbol in Sigma. An invalid prefix leading to impossibility must enter a dead state.",
              solutionSteps: [
                "Problem: Find the minimum number of states in a DFA accepting all binary strings over {0, 1} that start with '01' and end with '10'.",
                "Step 1: Analyze minimum valid string:",
                "  Can a string of length 3 satisfy both? '010' starts with '01' and ends with '10'! Length = 3.",
                "Step 2: Construct states tracking progress:",
                "  State 0 (q0, Start): Seen nothing. On '1' -> Dead state (q_dead), because it must start with '0'. On '0' -> q1.",
                "  State 1 (q1): Seen '0'. On '0' -> Dead state (must start with '01'). On '1' -> q2.",
                "  State 2 (q2): Successfully started with '01'. Now we look for ending in '10'. Currently ends in '1'. On '1' -> stay in q2. On '0' -> q3.",
                "  State 3 (q3, Final): Started with '01' AND currently ends with '10'! Accept. If '0' arrives -> now ends with '00', not '10' -> go to q4 (seen '0' after valid start). If '1' arrives -> now ends in '1' -> back to q2.",
                "  State 4 (q4): Seen '0' after valid start. On '0' -> stay in q4. On '1' -> back to q2.",
                "  State 5 (q_dead): Trap state for invalid starting prefixes.",
                "Total Minimal States = 6 states (q0, q1, q2, q3, q4, q_dead).",
              ],
            },
            {
              type: "explanation",
              heading: "3. Myhill-Nerode Table-Filling Minimization Algorithm",
              body: [
                "Two states p and q in a DFA are equivalent (indistinguishable) if for all strings w in Sigma*, delta*(p, w) in F <=> delta*(q, w) in F.",
                "Table-Filling Algorithm Steps:",
                "1. Construct a triangular table for all pairs (p, q) with p != q.",
                "2. Base Step (0-equivalence): Mark (p, q) with an 'X' if one state is in F and the other is not in F.",
                "3. Induction Step (k-equivalence): For each unmarked pair (p, q), if for any input symbol a in Sigma, the pair (delta(p, a), delta(q, a)) is already marked with 'X', then mark (p, q) with 'X'.",
                "4. Repeat Step 3 until no new pairs can be marked.",
                "5. Combine all remaining unmarked pairs into single merged equivalent states.",
              ],
            },
            {
              type: "resources",
              heading: "4. References & Curated Study Materials",
              sources: [
                {
                  title: "Introduction to Automata Theory, Languages, and Computation (3rd Edition)",
                  authors: "John E. Hopcroft, Rajeev Motwani, Jeffrey D. Ullman",
                  year: "2006",
                  publisher: "Pearson",
                  link: "https://www.pearson.com",
                  relevance:
                    "Chapters 2 & 4: Finite Automata and Properties of Regular Languages — the definitive classical textbook for DFA minimization proofs.",
                },
              ],
              videos: [
                {
                  title: "DFA Construction Tricks & Minimal State Counting for GATE",
                  creator: "Gate Smashers",
                  duration: "20 mins",
                  url: "https://www.youtube.com/playlist?list=PLxCzCOWd7aiFM9Lj5G9G_76adtyph52od",
                  whyThisHelps:
                    "Shortcuts for substring, prefix, and suffix state counting without drawing massive diagrams.",
                },
                {
                  title: "Myhill-Nerode Table Filling DFA Minimization Solved Step-by-Step",
                  creator: "Knowledge Gate",
                  duration: "18 mins",
                  url: "https://www.youtube.com/playlist?list=PLmXKhU9FNesTSqP8hWDncxpZXde1EHru8",
                  whyThisHelps:
                    "Detailed worked examples of table marking and equivalence partition merging.",
                },
              ],
            },
          ],
        },
      ],
    },

    // =========================================================================
    // MODULE 2: REGULAR EXPRESSIONS & PUMPING LEMMA
    // =========================================================================
    {
      id: "toc-module-2-regular-languages",
      title: "Module 2: Regular Expressions, Closure Properties & Pumping Lemma",
      slug: "regular-languages",
      description:
        "Arden's Theorem, converting DFA to Regular Expressions, closure properties of regular sets, and non-regularity proofs via Pumping Lemma.",
      order: 2,
      lessons: [
        {
          id: "pumping-lemma-and-closure-properties",
          title: "Pumping Lemma & Closure Properties of Regular Languages",
          slug: "pumping-lemma-and-closure-properties",
          order: 1,
          estimatedMinutes: 24,
          tagline: "Arden's formula R = Q + RP => R = QP*, pumping adversarial game, and closure tables.",
          hasInteractive: false,
          hasGATE: true,
          hasPractice: true,
          sections: [
            {
              type: "explanation",
              heading: "1. Arden's Theorem: Extracting Regular Expressions from DFAs",
              body: [
                "Arden's Theorem provides an algebraic method to solve linear state equations: If P and Q are two regular expressions over Sigma and P does not contain the empty string epsilon, then the equation R = Q + RP has a UNIQUE solution given by: R = QP*.",
                "Application to DFAs: For each state q_i, write an equation: q_i = sum(q_j * a) + (epsilon if q_i is start state). Use substitution and Arden's theorem to express accepting states purely in terms of input symbols.",
              ],
            },
            {
              type: "explanation",
              heading: "2. The Pumping Lemma for Regular Languages",
              body: [
                "The Pumping Lemma is a necessary (NOT sufficient!) condition for a language to be regular. It is used exclusively to prove that a language is NOT regular by contradiction.",
                "Formal Statement: If L is a regular language, then there exists an integer pumping length p >= 1 such that every string s in L with |s| >= p can be divided into three pieces, s = xyz, satisfying:",
                "1. For each i >= 0: x * (y^i) * z in L (the string can be 'pumped').",
                "2. |y| > 0 (the pumped substring y is non-empty).",
                "3. |xy| <= p (the pumped substring y occurs within the first p characters).",
                "Contradiction Game: To prove L is not regular, pick an adversarial string s in L of length >= p (expressed in terms of p, e.g., s = 0^p 1^p). Because |xy| <= p, y consists purely of 0s. Pumping y with i = 0 or i = 2 creates unequal counts of 0s and 1s, producing a contradiction!",
              ],
            },
            {
              type: "comparison",
              heading: "3. Closure Properties of Regular Languages",
              leadParagraph:
                "Regular languages possess the most extensive closure properties of all Chomsky language classes:",
              columns: ["Operation", "Closed?", "Reason / Proof Intuition"],
              criteria: [
                { criterion: "Union (L1 union L2)", values: ["Yes", "Parallel product automaton / NFA epsilon-branching"] },
                { criterion: "Intersection (L1 cap L2)", values: ["Yes", "Cross-product DFA construction"] },
                { criterion: "Complement (L')", values: ["Yes", "Swap final and non-final states of minimal DFA"] },
                { criterion: "Concatenation (L1 . L2)", values: ["Yes", "Link final states of L1 to start of L2 via epsilon"] },
                { criterion: "Kleene Star (L*)", values: ["Yes", "Loop final states back to start state via epsilon"] },
                { criterion: "Difference (L1 - L2)", values: ["Yes", "L1 - L2 = L1 cap L2' (intersection with complement)"] },
                { criterion: "Reversal (L^R)", values: ["Yes", "Reverse all transition arrows and swap start/final states"] },
                { criterion: "Homomorphism & Substitution", values: ["Yes", "Replace alphabet symbols with regular expressions"] },
              ],
            },
            {
              type: "resources",
              heading: "4. References & Curated Study Materials",
              sources: [
                {
                  title: "Introduction to the Theory of Computation (3rd Edition)",
                  authors: "Michael Sipser",
                  year: "2012",
                  publisher: "Cengage Learning",
                  link: "https://www.cengage.com",
                  relevance:
                    "Chapter 1: Regular Languages — the most intuitive pedagogical formulation of the Pumping Lemma adversarial game.",
                },
              ],
              videos: [
                {
                  title: "Pumping Lemma for Regular Languages Solved with Contradiction",
                  creator: "Gate Smashers",
                  duration: "18 mins",
                  url: "https://www.youtube.com/playlist?list=PLxCzCOWd7aiFM9Lj5G9G_76adtyph52od",
                  whyThisHelps:
                    "Practical rules to pick string s and decompose xyz to crack any non-regularity proof.",
                },
              ],
            },
          ],
        },
      ],
    },

    // =========================================================================
    // MODULE 3: CONTEXT-FREE GRAMMARS & PUSH-DOWN AUTOMATA
    // =========================================================================
    {
      id: "toc-module-3-cfg-and-pda",
      title: "Module 3: Context-Free Grammars (CFG) & Pushdown Automata (PDA)",
      slug: "cfg-and-pda",
      description:
        "Derivations, parse trees, ambiguity, Chomsky Normal Form (CNF), DPDA vs NPDA, DCFL vs CFL, and stack acceptance modes.",
      order: 3,
      lessons: [
        {
          id: "cfg-ambiguity-and-pushdown-automata",
          title: "CFG Ambiguity, CNF & Pushdown Automata (PDA)",
          slug: "cfg-ambiguity-and-pushdown-automata",
          order: 1,
          estimatedMinutes: 26,
          tagline: "Parse tree multiplicity, DPDA strictly less powerful than NPDA, and DCFL closure.",
          hasInteractive: false,
          hasGATE: true,
          hasPractice: true,
          sections: [
            {
              type: "explanation",
              heading: "1. Context-Free Grammars & The Ambiguity Problem",
              body: [
                "A CFG is a 4-tuple G = (V, T, P, S), where productions have the form: A -> alpha, with A in V (a single non-terminal variable) and alpha in (V union T)*.",
                "Ambiguity: A CFG is ambiguous if there exists at least one string w in L(G) that has TWO OR MORE distinct leftmost derivations (or equivalently, two or more distinct parse trees).",
                "Inherent Ambiguity: A context-free language L is inherently ambiguous if EVERY possible grammar generating L is ambiguous (e.g., L = { a^n b^n c^m d^m } union { a^n b^m c^m d^n }).",
                "Chomsky Normal Form (CNF): Every production is of the form: A -> BC or A -> a (where B, C in V and a in T). If a string w has length n (n >= 1), any derivation of w in a CNF grammar requires EXACTLY 2n - 1 derivation steps!",
              ],
            },
            {
              type: "explanation",
              heading: "2. Pushdown Automata: DPDA vs NPDA",
              body: [
                "A PDA enhances a finite automaton with an unbounded Last-In-First-Out (LIFO) stack. Transition: delta(q, a, X) = (p, gamma), meaning: in state q, reading symbol a (or epsilon) with top-of-stack X, transition to state p and replace X with string gamma.",
                "Acceptance Modes: Acceptance by Final State (L(M)) and Acceptance by Empty Stack (N(M)). Both accept the EXACT SAME class of languages for NPDA.",
                "The Fundamental Asymmetry:",
                "- For Finite Automata: Deterministic FA (DFA) == Non-deterministic FA (NFA) in expressive power.",
                "- For Pushdown Automata: Deterministic PDA (DPDA) is STRICTLY LESS POWERFUL than Non-deterministic PDA (NPDA)!",
                "- Languages accepted by DPDA are called Deterministic Context-Free Languages (DCFL).",
                "- Languages accepted by NPDA are Context-Free Languages (CFL).",
                "- Classic Example: Even-length palindromes L = { w w^R } is CFL (needs NPDA to guess the center), but NOT DCFL. Marked palindromes L = { w c w^R } IS DCFL.",
              ],
            },
            {
              type: "comparison",
              heading: "3. Closure Properties: DCFL vs CFL",
              leadParagraph:
                "Critical GATE distinctions between deterministic and non-deterministic context-free languages:",
              columns: ["Operation", "DCFL (DPDA)", "CFL (NPDA)"],
              criteria: [
                { criterion: "Complement", values: ["YES (Closed!)", "NO (Not closed)"] },
                { criterion: "Union", values: ["NO (Not closed)", "YES (Closed)"] },
                { criterion: "Intersection", values: ["NO (Not closed)", "NO (Not closed)"] },
                { criterion: "Intersection with Regular", values: ["YES (Closed)", "YES (Closed)"] },
                { criterion: "Concatenation", values: ["NO (Not closed)", "YES (Closed)"] },
                { criterion: "Kleene Star", values: ["NO (Not closed)", "YES (Closed)"] },
              ],
            },
            {
              type: "resources",
              heading: "4. References & Curated Study Materials",
              sources: [
                {
                  title: "Introduction to Automata Theory, Languages, and Computation (3rd Edition)",
                  authors: "John E. Hopcroft, Rajeev Motwani, Jeffrey D. Ullman",
                  year: "2006",
                  publisher: "Pearson",
                  link: "https://www.pearson.com",
                  relevance:
                    "Chapters 5 & 6: Context-Free Grammars and Pushdown Automata — rigorous proofs of CNF step bounds and empty-stack vs final-state equivalence.",
                },
              ],
              videos: [
                {
                  title: "Pushdown Automata (DPDA vs NPDA) & DCFL Closure Secrets",
                  creator: "Gate Smashers",
                  duration: "22 mins",
                  url: "https://www.youtube.com/playlist?list=PLxCzCOWd7aiFM9Lj5G9G_76adtyph52od",
                  whyThisHelps:
                    "Explains why DCFL is closed under complement but not union or intersection.",
                },
              ],
            },
          ],
        },
      ],
    },

    // =========================================================================
    // MODULE 4: TURING MACHINES, DECIDABILITY & RICE'S THEOREM
    // =========================================================================
    {
      id: "toc-module-4-turing-and-decidability",
      title: "Module 4: Turing Machines, Decidability & Rice's Theorem",
      slug: "turing-and-decidability",
      description:
        "Turing machine definitions, the Halting Problem, Recursive vs Recursively Enumerable languages, and Rice's Theorem.",
      order: 4,
      lessons: [
        {
          id: "turing-machines-and-rices-theorem",
          title: "Turing Machines, Undecidability & Rice's Theorem",
          slug: "turing-machines-and-rices-theorem",
          order: 1,
          estimatedMinutes: 26,
          tagline: "Recursive vs RE languages, Halting problem proof by diagonalization, and Rice's Theorem.",
          hasInteractive: false,
          hasGATE: true,
          hasPractice: true,
          sections: [
            {
              type: "explanation",
              heading: "1. The Chomsky Hierarchy & The Turing Machine",
              body: [
                "A Turing Machine (TM) is a 7-tuple M = (Q, Sigma, Gamma, delta, q_0, B, F), where Gamma is the tape alphabet (Sigma subset of Gamma) and B is the blank symbol.",
                "Transition function delta: Q x Gamma -> Q x Gamma x {L, R}. The read/write head can modify tape cells and move in both directions.",
                "Language Classes:",
                "1. Recursively Enumerable (RE / Turing-Recognizable / Type 0): A language L is RE if there exists a TM M such that for every w in L, M halts and accepts. For w not in L, M may either halt and reject OR loop forever.",
                "2. Recursive (REC / Decidable): A language L is Recursive if there exists a TM (a 'Decider') that HALTS on ALL inputs (accepts if w in L, rejects if w not in L). Never loops indefinitely!",
                "Theorem: A language L is Recursive IF AND ONLY IF both L and its complement L' are Recursively Enumerable (L in RE and L' in RE <=> L in REC).",
              ],
            },
            {
              type: "explanation",
              heading: "2. The Halting Problem & Reducibility",
              body: [
                "The Halting Problem (H_TM): Given the description of a Turing Machine M and an input string w, does M halt on w?",
                "Proof by Diagonalization (Alan Turing, 1936): H_TM is undecidable. There is no general algorithm that can determine whether an arbitrary program will halt.",
                "H_TM is Recursively Enumerable (we can simulate M on w: if it halts, we accept), but NOT Recursive (if it loops, we can never be certain). Therefore, the complement of the Halting Problem (H'_TM) is NOT even Recursively Enumerable!",
              ],
            },
            {
              type: "explanation",
              heading: "3. Rice's Theorem for Semantic Properties of Turing Machines",
              body: [
                "Rice's Theorem is the single most powerful shortcut for GATE computability questions. It states:",
                "'Any non-trivial property of the LANGUAGE recognized by a Turing Machine is UNDECIDABLE.'",
                "Conditions for Rice's Theorem Part 1 (Undecidability):",
                "1. It must be a SEMANTIC property (a property of the language L(M), NOT the syntactic structure of M itself like 'does M have 5 states' or 'does M halt in 100 steps' — those are syntactic and decidable!).",
                "2. It must be NON-TRIVIAL: There exists at least one TM whose language satisfies the property, and at least one TM whose language does NOT satisfy it.",
                "Examples of Undecidable Properties by Rice's Theorem:",
                "- 'Is L(M) empty?' (L(M) = empty set) -> Undecidable!",
                "- 'Is L(M) finite?' -> Undecidable!",
                "- 'Is L(M) regular?' -> Undecidable!",
                "- 'Does L(M) contain the string 01?' -> Undecidable!",
              ],
              callout: {
                kind: "gate-tip",
                title: "Syntactic vs Semantic Distinction in Rice's Theorem",
                message:
                  "If a question asks about the CODE or HARDWARE of the Turing machine (e.g. 'Does TM M take more than 50 steps on input w?'), Rice's Theorem DOES NOT APPLY! We can simply simulate the machine for 50 steps and see; it is completely DECIDABLE.",
              },
            },
            {
              type: "resources",
              heading: "4. References & Curated Study Materials",
              sources: [
                {
                  title: "Introduction to the Theory of Computation (3rd Edition)",
                  authors: "Michael Sipser",
                  year: "2012",
                  publisher: "Cengage Learning",
                  link: "https://www.cengage.com",
                  relevance:
                    "Chapters 3, 4 & 5: Turing Machines, Decidability, and Reducibility — the gold standard for mapping reductions and undecidability proofs.",
                },
              ],
              videos: [
                {
                  title: "Rice's Theorem with 10 Solved GATE Questions in 15 Minutes",
                  creator: "Gate Smashers",
                  duration: "15 mins",
                  url: "https://www.youtube.com/playlist?list=PLxCzCOWd7aiFM9Lj5G9G_76adtyph52od",
                  whyThisHelps:
                    "Demonstrates how to identify non-trivial language properties in seconds on exam papers.",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
