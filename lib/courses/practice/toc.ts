import { mcq, num, practice, worked, type LessonExtras } from "./helpers";

export const TOC_EXTRAS: LessonExtras = {
  "dfa-nfa-and-minimization": [
    worked(
      "Worked example: a DFA for binary numbers divisible by 3",
      "Design the minimal DFA over {0, 1} that accepts binary strings whose value is divisible by 3 (reading the most significant bit first).",
      [
        ["Track the remainder", "Only the value mod 3 matters, so use states r0, r1, r2."],
        ["Work out a transition", "Reading bit b turns value v into 2v + b, so the remainder goes from r to (2r + b) mod 3.", "δ(r, b) = (2r + b) mod 3"],
        ["Fill in the table", "r0: 0 → r0, 1 → r1. r1: 0 → r2, 1 → r0. r2: 0 → r1, 1 → r2."],
        ["Start and accept", "Start in r0 (the empty string has value 0); accept in r0."],
        ["Check it's minimal", "The three remainders behave differently on some suffix, so none can be merged."],
      ],
      "3 states: r0 (start and accepting), r1, r2",
      "For 'value mod k' over base b, the DFA needs k states, with transition r → (b·r + digit) mod k."
    ),
    practice([
      num("toc-dfa-1", "How many states does the minimal DFA over {a, b} need for strings ending in ab?", 3,
        "Track how much of 'ab' you've just seen: nothing, 'a', or 'ab'. Those three classes are distinct, and there are no others."),
      num("toc-dfa-2", "How many states does the minimal DFA need for strings over {a, b} with an even number of a's and a number of b's divisible by 3?", 6,
        "This is the product of a 2-state and a 3-state counter: 2 × 3 = 6, and all six pairs are distinguishable."),
      mcq("toc-dfa-3", "An NFA has n states. The subset construction gives an equivalent DFA with at most:", [
        ["n states", false, "Some languages need exponentially more."],
        ["2ⁿ states", true, "Each DFA state is a subset of the NFA's states."],
        ["n² states", false, "That's the bound for the product construction, not subsets."],
      ], "The bound is tight: 'the n-th symbol from the end is a' needs 2ⁿ DFA states but only n + 1 NFA states.", "foundation"),
    ]),
  ],

  "regular-expressions-and-finite-state-conversion": [
    worked(
      "Worked example: Arden's theorem",
      "A DFA gives the equation R = 0 + R1 for the language R reaching a state. Solve for R.",
      [
        ["State Arden's theorem", "If R = Q + RP and P doesn't contain ε, the unique solution is R = QP*."],
        ["Match the terms", "Q = 0 and P = 1."],
        ["Apply it", "R = 0 1*."],
        ["Check", "0 1* = 0 + (0 1*)1, which is 0 plus every string 0 1⁺: the equation holds."],
      ],
      "R = 01*",
      "For several states, write one equation per state and eliminate them one at a time with Arden's rule."
    ),
    practice([
      mcq("toc-re-1", "Which regular expression describes binary strings with no two consecutive 1s?", [
        ["(0 + 10)*(ε + 1)", true, "Every 1 is followed by a 0, except possibly a final 1."],
        ["(0 + 1)*", false, "That's every string."],
        ["(01)*", false, "That misses 0, 00, 100 and many others."],
        ["0*1*", false, "That allows 011."],
      ], "Think of it as blocks: each '1' must be immediately closed by a '0', with one possible 1 at the end."),
      num("toc-re-2", "How many strings of length 4 over {0, 1} have no two consecutive 1s?", 8,
        "The counts follow Fibonacci numbers: lengths 1, 2, 3, 4 give 2, 3, 5, 8."),
      mcq("toc-re-3", "Is (a + b)* = (a*b*)*?", [
        ["Yes", true, "a*b* includes a and b, so its star generates every string."],
        ["No", false, "Every string over {a, b} is a concatenation of single letters, each in a*b*."],
      ], "Starring any set that contains every single letter gives Σ*.", "tricky"),
    ]),
  ],

  "pumping-lemma-and-closure-properties": [
    worked(
      "Worked example: aⁿbⁿ is not regular",
      "Use the pumping lemma to prove L = { aⁿbⁿ : n ≥ 0 } is not regular.",
      [
        ["Assume it's regular", "Then it has a pumping length p."],
        ["Pick a string", "Take s = aᵖbᵖ, which is in L and has length 2p ≥ p."],
        ["Split it", "Any split s = xyz with |xy| ≤ p and |y| ≥ 1 puts y entirely inside the a's: y = aᵏ with k ≥ 1."],
        ["Pump", "xy²z = a^(p+k) bᵖ has more a's than b's, so it's not in L."],
        ["Conclude", "Every allowed split fails, which contradicts the lemma."],
      ],
      "L is not regular",
      "The pumping lemma can only prove a language is not regular. Passing it proves nothing."
    ),
    practice([
      mcq("toc-pl-1", "Which language is regular?", [
        ["{ aⁿbᵐ : n, m ≥ 0 }", true, "That's a*b*."],
        ["{ aⁿbⁿ : n ≥ 0 }", false, "It needs unbounded counting."],
        ["{ aᵖ : p is prime }", false, "The primes have no periodic pattern, so pumping breaks it."],
        ["{ ww : w ∈ {a, b}* }", false, "It needs to remember all of w."],
      ], "Independent counts are regular; matched counts are not.", "foundation"),
      mcq("toc-pl-2", "Regular languages are NOT closed under which operation?", [
        ["Complement", false, "Swap the accepting states of a DFA."],
        ["Intersection", false, "Use the product construction."],
        ["Infinite union", true, "Every single string is regular, and the union of all {aⁿbⁿ} is not."],
        ["Reversal", false, "Reverse every edge of an NFA."],
      ], "Closure holds for finite unions only.", "tricky"),
      mcq("toc-pl-3", "L is regular and M is not. What can you say about L ∪ M?", [
        ["It's always regular", false, "Take L = ∅: then L ∪ M = M, which isn't regular."],
        ["It's never regular", false, "Take L = Σ*: then L ∪ M = Σ*, which is regular."],
        ["It might or might not be regular", true, "Both outcomes happen, as the examples show."],
      ], "Mixing a regular and a non-regular language tells you nothing on its own."),
    ]),
  ],

  "decision-properties-of-regular-languages": [
    worked(
      "Worked example: is a DFA's language infinite?",
      "A DFA has n states. How can you decide whether its language is infinite?",
      [
        ["Use the pumping argument", "Any accepted string of length ≥ n passes through some state twice, giving a loop that can be pumped forever."],
        ["Bound the search", "If L is infinite, it contains a string with length between n and 2n − 1: take the shortest one of length at least n, and pump down once."],
        ["The test", "Check every string with length from n to 2n − 1. Or, in graph terms, look for a cycle on some path from the start to an accepting state."],
      ],
      "L is infinite iff it accepts some string of length n to 2n − 1",
      "Emptiness, finiteness, membership and equivalence are all decidable for regular languages."
    ),
    practice([
      mcq("toc-dp-1", "Is it decidable whether two DFAs accept the same language?", [
        ["Yes", true, "Minimise both and compare, or check that their symmetric difference is empty."],
        ["No", false, "Equivalence is undecidable for CFGs, not DFAs."],
      ], "Equivalence is decidable for regular languages and undecidable for context-free ones.", "foundation"),
      mcq("toc-dp-2", "How do you decide whether L(D) is empty for a DFA D?", [
        ["Check whether any accepting state is reachable from the start", true, "A graph search, O(states + transitions)."],
        ["Try every string up to length 2ⁿ", false, "That works, but it's needlessly slow."],
        ["It's undecidable", false, "Emptiness is easy for DFAs."],
      ], "Emptiness = reachability of an accepting state."),
      mcq("toc-dp-3", "Is it decidable whether L(D) = Σ* for a DFA D?", [
        ["Yes", true, "Complement D (swap accepting states) and test emptiness."],
        ["No", false, "That's the CFG version."],
      ], "'Is it everything?' is decidable for DFAs but undecidable for CFGs: another classic contrast.", "tricky"),
    ]),
  ],

  "context-free-grammars-ambiguity-and-cnf": [
    worked(
      "Worked example: derivation length in Chomsky Normal Form",
      "A grammar in Chomsky Normal Form derives a string of length 5. How many steps does the derivation take?",
      [
        ["CNF rules", "Every rule is A → BC or A → a."],
        ["Grow to n variables", "Each A → BC step adds one symbol. Going from S to n variables takes n − 1 steps."],
        ["Turn variables into terminals", "Each A → a step turns one variable into a terminal: n steps."],
        ["Total", "(n − 1) + n = 2n − 1.", "2·5 − 1", "9"],
      ],
      "9 steps",
      "Derivation length 2n − 1 is why the CYK algorithm's table is n × n."
    ),
    practice([
      num("toc-cfg-1", "In the ambiguous grammar E → E + E | a, how many parse trees does a + a + a have?", 2,
        "Group as (a + a) + a or a + (a + a): the Catalan number C₂ = 2."),
      num("toc-cfg-2", "Same grammar, how many parse trees does a + a + a + a have?", 5,
        "With k operators the count is the Catalan number C_k; C₃ = 5."),
      mcq("toc-cfg-3", "Is it decidable whether an arbitrary CFG is ambiguous?", [
        ["Yes", false, "It isn't."],
        ["No", true, "Ambiguity of CFGs is undecidable (by reduction from the Post Correspondence Problem)."],
      ], "Some context-free languages are inherently ambiguous: every grammar for them is ambiguous.", "tricky"),
    ]),
  ],

  "cfg-ambiguity-and-pushdown-automata": [
    worked(
      "Worked example: a PDA for aⁿbⁿ",
      "Design a PDA for { aⁿbⁿ : n ≥ 0 }.",
      [
        ["Push on a", "In state q0, each a pushes an A."],
        ["Switch on b", "On the first b, move to q1 and pop an A."],
        ["Pop on each b", "In q1, each b pops an A. An a in q1 is rejected."],
        ["Accept", "Accept when the input ends and only the bottom marker is left."],
      ],
      "Two states; the stack counts the a's",
      "This PDA is deterministic. Choosing where the middle is, as in wwᴿ, needs nondeterminism."
    ),
    practice([
      mcq("toc-pda-1", "Which language needs a nondeterministic PDA?", [
        ["{ wcwᴿ }", false, "The marker c says where the middle is, so a DPDA works."],
        ["{ wwᴿ }", true, "Without a marker, the machine must guess the middle."],
        ["{ aⁿbⁿ }", false, "A DPDA handles it."],
      ], "DCFLs are a strict subset of CFLs; even-length palindromes are the standard separating example."),
      mcq("toc-pda-2", "For nondeterministic PDAs, acceptance by final state and by empty stack:", [
        ["Recognise the same class of languages", true, "Each can be converted into the other."],
        ["Recognise different classes", false, "That difference only appears for DPDAs."],
      ], "For DPDAs, empty-stack acceptance gives only the prefix-free DCFLs.", "tricky"),
      mcq("toc-pda-3", "A PDA with two stacks is as powerful as:", [
        ["A one-stack PDA", false, "Two stacks can simulate a tape."],
        ["A Turing machine", true, "The two stacks hold the tape to the left and right of the head."],
        ["A finite automaton", false, "It's far more powerful."],
      ], "One stack gives context-free; two stacks give Turing-complete.", "foundation"),
    ]),
  ],

  "cfl-pumping-lemma-and-closure-matrix": [
    worked(
      "Worked example: aⁿbⁿcⁿ is not context-free",
      "Prove L = { aⁿbⁿcⁿ : n ≥ 0 } is not context-free.",
      [
        ["Assume it is", "Then it has a CFL pumping length p."],
        ["Pick a string", "s = aᵖbᵖcᵖ."],
        ["Split it", "s = uvxyz with |vxy| ≤ p and |vy| ≥ 1. Since |vxy| ≤ p, vxy touches at most two of the three letters."],
        ["Pump", "uv²xy²z increases at most two of the counts, so they can't all stay equal."],
        ["Conclude", "Every split fails: L is not context-free."],
      ],
      "L is not context-free",
      "The key fact is |vxy| ≤ p: the pumped window is too narrow to reach all three blocks."
    ),
    practice([
      mcq("toc-cfl-1", "Context-free languages are closed under:", [
        ["Intersection", false, "{aⁿbⁿcᵐ} ∩ {aᵐbⁿcⁿ} = {aⁿbⁿcⁿ}, which isn't context-free."],
        ["Complement", false, "Closure under complement plus union would give closure under intersection."],
        ["Union, concatenation and Kleene star", true, "Combine the grammars with a new start symbol."],
      ], "CFLs: union, concatenation, star, homomorphism and reversal yes; intersection and complement no.", "foundation"),
      mcq("toc-cfl-2", "The intersection of a context-free language and a regular language is:", [
        ["Always context-free", true, "Run the PDA and the DFA side by side: the product is still a PDA."],
        ["Always regular", false, "Intersecting with Σ* keeps the CFL unchanged."],
        ["Possibly not context-free", false, "It's always context-free."],
      ], "This closure property is a handy way to prove that a language is not context-free."),
      mcq("toc-cfl-3", "Is { aⁿbᵐcⁿ : n, m ≥ 0 } context-free?", [
        ["Yes", true, "S → aSc | B, B → bB | ε. Only one pair of counts must match."],
        ["No", false, "Only a's and c's are matched, which one stack can do."],
      ], "One matched pair is context-free; two interlocking pairs (aⁿbᵐcⁿdᵐ) are not.", "tricky"),
    ]),
  ],

  "turing-machines-and-rices-theorem": [
    worked(
      "Worked example: applying Rice's theorem",
      "Is it decidable whether a Turing machine M accepts the empty language?",
      [
        ["Is it a property of the language?", "'L(M) = ∅' depends only on what M accepts, not how: a semantic property."],
        ["Is it non-trivial?", "Some machines accept nothing and others accept something."],
        ["Apply Rice's theorem", "Every non-trivial semantic property of recursively enumerable languages is undecidable."],
      ],
      "Undecidable",
      "Rice's theorem doesn't cover syntactic properties such as 'M has 5 states', which you can check directly."
    ),
    practice([
      mcq("toc-tm-1", "Which question about a Turing machine M is decidable?", [
        ["Does M have at least 5 states?", true, "Read M's description: a syntactic property."],
        ["Is L(M) finite?", false, "Semantic and non-trivial, so Rice's theorem applies."],
        ["Does M accept the string 0?", false, "That's essentially the acceptance problem."],
        ["Is L(M) regular?", false, "Semantic and non-trivial."],
      ], "Properties of the machine's code are often decidable; properties of its language usually are not.", "foundation"),
      mcq("toc-tm-2", "The halting problem is:", [
        ["Recursive (decidable)", false, "It's undecidable."],
        ["Recursively enumerable but not recursive", true, "Simulate M on w and accept if it halts; you can confirm yes, but never be sure of no."],
        ["Not recursively enumerable", false, "That's its complement."],
      ], "If both a language and its complement are RE, it's recursive. So the halting problem's complement is not RE."),
      mcq("toc-tm-3", "Which class is closed under complement?", [
        ["Recursive languages", true, "Swap accept and reject: a decider always halts."],
        ["Recursively enumerable languages", false, "The halting problem is RE but its complement isn't."],
      ], "Recursive: closed under complement. RE: closed under union and intersection, not complement.", "tricky"),
    ]),
  ],

  "undecidability-reductions-and-pcp": [
    worked(
      "Worked example: a Post Correspondence Problem match",
      "Dominoes (top/bottom): 1 = b/ca, 2 = a/ab, 3 = ca/a, 4 = abc/c. Check that the sequence 2, 1, 3, 2, 4 is a match.",
      [
        ["Join the tops", "a + b + ca + a + abc.", undefined, "abcaaabc"],
        ["Join the bottoms", "ab + ca + a + ab + c.", undefined, "abcaaabc"],
        ["Compare", "They're identical, so it's a match."],
      ],
      "It's a match: both sides read abcaaabc (8 symbols)",
      "Checking a proposed match is easy. Deciding whether any match exists is undecidable in general."
    ),
    practice([
      mcq("toc-red-1", "A ≤m B and A is undecidable. What follows about B?", [
        ["B is undecidable", true, "A decider for B would give one for A, via the reduction."],
        ["B is decidable", false, "That would make A decidable."],
        ["Nothing", false, "Hardness carries forward along the reduction."],
      ], "To prove a new problem undecidable, reduce a known undecidable problem to it.", "foundation"),
      mcq("toc-red-2", "The Post Correspondence Problem over a one-letter alphabet is:", [
        ["Decidable", true, "With one letter only lengths matter, which is a simple arithmetic question."],
        ["Undecidable", false, "Undecidability needs at least two letters."],
      ], "PCP is undecidable for alphabets of size ≥ 2 and decidable for unary ones.", "tricky"),
      mcq("toc-red-3", "Which ordering of the Chomsky hierarchy is correct?", [
        ["Regular ⊂ CFL ⊂ CSL ⊂ RE", true, "Each containment is strict."],
        ["CFL ⊂ Regular ⊂ CSL ⊂ RE", false, "Regular languages are the smallest class."],
        ["Regular ⊂ CSL ⊂ CFL ⊂ RE", false, "Context-free languages sit inside the context-sensitive ones."],
      ], "Type 3 ⊂ Type 2 ⊂ Type 1 ⊂ Type 0; recursive languages sit strictly between CSL and RE."),
    ]),
  ],
};
