import { mcq, num, practice, worked, type LessonExtras } from "./helpers";

export const DISCRETE_MATHS_EXTRAS: LessonExtras = {
  "propositional-and-predicate-logic": [
    worked(
      "Worked example: prove a tautology",
      "Show that (p ∧ (p → q)) → q is a tautology.",
      [
        ["Rewrite the implication", "p → q ≡ ¬p ∨ q."],
        ["Simplify the premise", "p ∧ (¬p ∨ q) = (p ∧ ¬p) ∨ (p ∧ q) = p ∧ q."],
        ["The whole formula", "(p ∧ q) → q ≡ ¬(p ∧ q) ∨ q ≡ ¬p ∨ ¬q ∨ q."],
        ["Finish", "¬q ∨ q is always true, so the whole disjunction is."],
      ],
      "It's a tautology (this is modus ponens)",
      "Either simplify algebraically, or check that no row of the truth table makes it false."
    ),
    practice([
      mcq("dm-pl-1", "Which is equivalent to p → q?", [
        ["¬q → ¬p", true, "The contrapositive is always equivalent."],
        ["q → p", false, "That's the converse, which isn't equivalent."],
        ["¬p → ¬q", false, "That's the inverse, equivalent to the converse."],
        ["p ∧ ¬q", false, "That's the negation of p → q."],
      ], "p → q ≡ ¬p ∨ q ≡ ¬q → ¬p.", "foundation"),
      num("dm-pl-2", "How many rows does the truth table of a formula with 4 variables have?", 16, "2⁴ = 16.", "foundation"),
      mcq("dm-pl-3", "Is (p → q) → (q → p) a tautology?", [
        ["No", true, "p false and q true makes p → q true but q → p false."],
        ["Yes", false, "One row falsifies it."],
      ], "To show something isn't a tautology, one falsifying row is enough."),
    ]),
  ],

  "first-order-logic-and-quantifiers": [
    worked(
      "Worked example: negate a quantified statement",
      "Negate: ∀x ∃y (x + y = 0).",
      [
        ["Push ¬ past ∀", "¬∀x φ ≡ ∃x ¬φ.", undefined, "∃x ¬∃y (x + y = 0)"],
        ["Push ¬ past ∃", "¬∃y ψ ≡ ∀y ¬ψ.", undefined, "∃x ∀y ¬(x + y = 0)"],
        ["Simplify", "¬(x + y = 0) is x + y ≠ 0."],
      ],
      "∃x ∀y (x + y ≠ 0)",
      "Each quantifier flips as the negation passes it; the order of the quantifiers stays the same."
    ),
    practice([
      mcq("dm-fo-1", "Which formalises \"Every student likes some course\" (L(s, c) means s likes c)?", [
        ["∀s ∃c L(s, c)", true, "For each student there's a course, which may differ per student."],
        ["∃c ∀s L(s, c)", false, "That says one course is liked by every student, which is stronger."],
        ["∀c ∃s L(s, c)", false, "That says every course is liked by someone."],
      ], "Swapping ∀ and ∃ changes the meaning: ∃∀ implies ∀∃, but not the other way."),
      mcq("dm-fo-2", "Over the integers, is ∀x ∃y (y > x) true?", [
        ["Yes", true, "Take y = x + 1."],
        ["No", false, "Every integer has a larger one."],
      ], "But ∃y ∀x (y > x), a largest integer, is false.", "foundation"),
      mcq("dm-fo-3", "Which is valid (true in every interpretation)?", [
        ["∃x ∀y P(x, y) → ∀y ∃x P(x, y)", true, "If one x works for every y, then every y has some x: that same one."],
        ["∀y ∃x P(x, y) → ∃x ∀y P(x, y)", false, "Different y's may need different x's."],
      ], "This one-way implication is a GATE favourite.", "tricky"),
    ]),
  ],

  "relations-posets-and-lattices": [
    worked(
      "Worked example: count relations on a set",
      "On a set A with 3 elements, how many relations are there? How many are reflexive? How many are symmetric?",
      [
        ["All relations", "A relation is any subset of A × A, which has 9 pairs.", "2⁹", "512"],
        ["Reflexive", "The 3 pairs (a, a) must be in; the other 6 are free.", "2^(n² − n) = 2⁶", "64"],
        ["Symmetric", "Choose each diagonal pair (3) and each unordered pair {a, b} (3) freely.", "2^(n(n+1)/2) = 2⁶", "64"],
      ],
      "512 relations; 64 reflexive; 64 symmetric",
      "Reflexive and symmetric: 2^(n(n−1)/2). Equivalence relations: the Bell number Bₙ (B₃ = 5)."
    ),
    practice([
      num("dm-rel-1", "How many equivalence relations are there on a set of 3 elements?", 5,
        "They correspond to partitions of the set: the Bell number B₃ = 5."),
      num("dm-rel-2", "How many relations on a 3-element set are both reflexive and symmetric?", 8,
        "The diagonal is fixed; each of the 3 unordered pairs is in or out: 2³ = 8."),
      mcq("dm-rel-3", "The relation ≤ on the integers is:", [
        ["A partial (in fact total) order", true, "It's reflexive, antisymmetric and transitive, and any two integers are comparable."],
        ["An equivalence relation", false, "It isn't symmetric."],
        ["Neither", false, "It's an order."],
      ], "Partial order = reflexive + antisymmetric + transitive.", "foundation"),
    ]),
  ],

  "posets-hasse-diagrams-and-lattices": [
    worked(
      "Worked example: is the divisor lattice of 12 complemented?",
      "D₁₂ is the set of divisors of 12, ordered by divisibility, with meet gcd and join lcm. Is it complemented?",
      [
        ["Bounds", "The bottom is 1 and the top is 12."],
        ["A complement of 2", "We need x with gcd(2, x) = 1 and lcm(2, x) = 12."],
        ["Try the odd divisors", "x = 1 gives lcm 2; x = 3 gives lcm 6. Neither is 12."],
        ["Conclude", "2 has no complement."],
      ],
      "Not complemented (though it is distributive)",
      "Dₙ is a Boolean algebra (complemented and distributive) exactly when n is square-free, such as D₃₀."
    ),
    practice([
      num("dm-pos-1", "How many elements does the divisor lattice D₆₀ have?", 12, "60 = 2²·3·5 has (2 + 1)(1 + 1)(1 + 1) = 12 divisors.", "foundation"),
      mcq("dm-pos-2", "Which divisor lattice is a Boolean algebra?", [
        ["D₃₀", true, "30 = 2·3·5 is square-free, so each divisor has a complement (for example, 2 and 15)."],
        ["D₁₂", false, "12 = 2²·3 isn't square-free; 2 has no complement."],
        ["D₈", false, "D₈ is a chain 1 | 2 | 4 | 8, and chains with more than 2 elements aren't complemented."],
      ], "Square-free n gives a Boolean algebra Dₙ."),
      mcq("dm-pos-3", "In a lattice, the complement of an element:", [
        ["May not exist, and need not be unique unless the lattice is distributive", true, "In a distributive lattice, complements are unique when they exist."],
        ["Always exists and is unique", false, "That holds only in Boolean algebras."],
        ["Always equals the top element", false, "No."],
      ], "Bounded + complemented + distributive = Boolean algebra.", "tricky"),
    ]),
  ],

  "algebraic-structures-and-groups": [
    worked(
      "Worked example: the order of an element",
      "In the group (ℤ₆, + mod 6), what is the order of 4?",
      [
        ["Add 4 to itself", "4, then 8 mod 6 = 2, then 12 mod 6 = 0."],
        ["Stop at the identity", "0 is the identity, reached after 3 steps."],
        ["Check with the formula", "In ℤₙ, the order of k is n / gcd(n, k).", "6 / gcd(6, 4) = 6 / 2", "3"],
      ],
      "Order 3",
      "The elements of order n in ℤₙ are its generators: there are φ(n) of them."
    ),
    practice([
      num("dm-gr-1", "How many generators does the cyclic group ℤ₁₂ have?", 4, "The k with gcd(k, 12) = 1: 1, 5, 7, 11. That's φ(12) = 4.", "foundation"),
      mcq("dm-gr-2", "Is (ℤ, −) a group?", [
        ["No: subtraction isn't associative", true, "(1 − 2) − 3 = −4, but 1 − (2 − 3) = 2."],
        ["Yes, with identity 0", false, "Associativity fails."],
      ], "Check closure, associativity, identity and inverses, in that order."),
      mcq("dm-gr-3", "A monoid is:", [
        ["A set with an associative operation and an identity element", true, "Inverses aren't required."],
        ["A group where every element is its own inverse", false, "That's a special kind of group."],
        ["Any set with an operation", false, "That's a groupoid (magma)."],
      ], "Semigroup ⊂ monoid ⊂ group: add an identity, then add inverses.", "foundation"),
    ]),
  ],

  "cyclic-groups-and-lagrange-theorem": [
    worked(
      "Worked example: possible element orders",
      "A group G has order 15. Which orders can its elements have?",
      [
        ["Lagrange's theorem", "The order of any subgroup, and so of any element, divides |G|."],
        ["Divisors of 15", "1, 3, 5, 15."],
        ["What's actually forced", "Every group of order 15 is cyclic (15 = 3·5 with 3 not dividing 5 − 1), so all four orders occur."],
      ],
      "1, 3, 5 or 15",
      "Lagrange's theorem gives which orders are possible; it doesn't promise that a subgroup of every divisor exists in general."
    ),
    practice([
      mcq("dm-lg-1", "A group of prime order p must be:", [
        ["Cyclic, generated by any element except the identity", true, "Any element other than the identity has order dividing p, so order p."],
        ["Non-abelian", false, "Cyclic groups are abelian."],
        ["Trivial", false, "It has p elements."],
      ], "Prime order ⇒ cyclic ⇒ abelian.", "foundation"),
      num("dm-lg-2", "How many subgroups does the cyclic group ℤ₁₂ have?", 6, "A cyclic group has exactly one subgroup for each divisor of its order: 1, 2, 3, 4, 6, 12."),
      mcq("dm-lg-3", "Can a group of order 10 have a subgroup of order 4?", [
        ["No", true, "4 doesn't divide 10."],
        ["Yes", false, "Lagrange's theorem rules it out."],
      ], "Lagrange's theorem is often used just to rule things out.", "foundation"),
    ]),
  ],

  "combinatorics-and-recurrence-solving": [
    worked(
      "Worked example: stars and bars",
      "How many non-negative integer solutions does x₁ + x₂ + x₃ = 10 have?",
      [
        ["Model", "Arrange 10 stars and 2 bars in a row; the bars split the stars into three groups."],
        ["Count", "Choose the 2 bar positions among 12.", "C(n + k − 1, k − 1) = C(12, 2)", "66"],
      ],
      "66 solutions",
      "If each xᵢ ≥ 1, first give each variable 1: x₁ + x₂ + x₃ = 7 gives C(9, 2) = 36."
    ),
    practice([
      num("dm-cb-1", "How many derangements of 4 objects are there (no object in its own position)?", 9, "D₄ = 4!(1 − 1 + 1/2 − 1/6 + 1/24) = 9.", "gate-level"),
      num("dm-cb-2", "How many integers from 1 to 100 are divisible by 2, 3 or 5?", 74,
        "Inclusion-exclusion: 50 + 33 + 20 − 16 − 10 − 6 + 3 = 74."),
      num("dm-cb-3", "What is the fewest people needed to guarantee two share a birth month?", 13, "Pigeonhole: 12 months, so 13 people force a repeat.", "foundation"),
    ]),
  ],

  "recurrence-relations-and-generating-functions": [
    worked(
      "Worked example: solve a linear recurrence",
      "Solve aₙ = 5aₙ₋₁ − 6aₙ₋₂ with a₀ = 1 and a₁ = 4, and find a₃.",
      [
        ["Characteristic equation", "r² − 5r + 6 = 0.", "(r − 2)(r − 3) = 0", "r = 2, 3"],
        ["General form", "aₙ = c₁2ⁿ + c₂3ⁿ."],
        ["Use the initial values", "c₁ + c₂ = 1 and 2c₁ + 3c₂ = 4.", undefined, "c₂ = 2, c₁ = −1"],
        ["Closed form", "aₙ = 2·3ⁿ − 2ⁿ."],
        ["a₃", "2·27 − 8.", "46"],
      ],
      "aₙ = 2·3ⁿ − 2ⁿ, so a₃ = 46",
      "Check against the recurrence: a₂ = 5·4 − 6·1 = 14, and a₃ = 5·14 − 6·4 = 46. ✓"
    ),
    practice([
      num("dm-gf-1", "What is the coefficient of x⁵ in 1/(1 − x)³?", 21, "1/(1 − x)ᵏ = Σ C(n + k − 1, k − 1) xⁿ, so C(7, 2) = 21."),
      mcq("dm-gf-2", "The characteristic equation has a repeated root r = 2. The general solution is:", [
        ["(c₁ + c₂n)·2ⁿ", true, "A repeated root needs an extra factor of n."],
        ["c₁2ⁿ + c₂2ⁿ", false, "That's really just one constant."],
        ["c₁2ⁿ + c₂3ⁿ", false, "3 isn't a root."],
      ], "A root of multiplicity m contributes (c₁ + c₂n + … + cₘn^(m−1))rⁿ.", "tricky"),
      mcq("dm-gf-3", "Which sequence has the generating function 1/(1 − 2x)?", [
        ["1, 2, 4, 8, …", true, "1/(1 − ax) = Σ aⁿxⁿ."],
        ["1, 1, 1, 1, …", false, "That's 1/(1 − x)."],
        ["1, 2, 3, 4, …", false, "That's 1/(1 − x)²."],
      ], "Learn the basic pairs: 1/(1 − x), 1/(1 − ax), 1/(1 − x)².", "foundation"),
    ]),
  ],

  "graph-theory-fundamentals-and-connectivity": [
    worked(
      "Worked example: the most edges in a disconnected graph",
      "What is the largest number of edges a simple graph on 10 vertices can have and still be disconnected?",
      [
        ["Best split", "Make one vertex isolated and the other 9 a complete graph."],
        ["Count edges", "K₉ has C(9, 2) edges.", "9·8/2", "36"],
        ["Why that's the most", "Any other split into two parts, of sizes k and n − k, has fewer edges inside the parts."],
      ],
      "36 edges",
      "So any simple graph on n vertices with more than C(n − 1, 2) edges must be connected."
    ),
    practice([
      num("dm-gt-1", "How many edges does the complete graph K₁₀ have?", 45, "C(10, 2) = 45.", "foundation"),
      mcq("dm-gt-2", "Can a graph have degree sequence 3, 3, 3, 2, 2?", [
        ["No: the sum of degrees is 13, which is odd", true, "The handshaking lemma says the sum of degrees is 2|E|, always even."],
        ["Yes", false, "An odd degree sum is impossible."],
      ], "Every graph has an even number of odd-degree vertices.", "foundation"),
      mcq("dm-gt-3", "A connected graph has an Euler circuit if and only if:", [
        ["Every vertex has even degree", true, "Each time you enter a vertex, you must also leave it."],
        ["Exactly two vertices have odd degree", false, "That gives an Euler path, not a circuit."],
        ["It's complete", false, "K₄ has odd degrees and no Euler circuit."],
      ], "Euler: all degrees even (circuit), or exactly two odd (path)."),
    ]),
  ],

  "graph-theory-planarity-and-coloring": [
    worked(
      "Worked example: Euler's formula",
      "A connected planar graph has 10 vertices and 15 edges. How many faces does it have? And at most how many edges can a simple planar graph on 10 vertices have?",
      [
        ["Euler's formula", "v − e + f = 2."],
        ["Solve for f", "10 − 15 + f = 2.", undefined, "f = 7"],
        ["Edge bound", "Each face has at least 3 edges and each edge borders 2 faces, giving e ≤ 3v − 6.", "3·10 − 6", "24"],
      ],
      "7 faces; at most 24 edges",
      "K₅ has 10 edges > 3·5 − 6 = 9, so it's not planar. For triangle-free graphs, use e ≤ 2v − 4, which rules out K₃,₃."
    ),
    practice([
      mcq("dm-pg-1", "Why is K₃,₃ not planar?", [
        ["It has 9 edges, but a triangle-free planar graph on 6 vertices allows at most 2·6 − 4 = 8", true, "Bipartite graphs have no triangles."],
        ["It has an odd cycle", false, "Bipartite graphs have only even cycles."],
        ["It has too many vertices", false, "Vertex count alone doesn't decide planarity."],
      ], "Kuratowski: a graph is planar iff it contains no subdivision of K₅ or K₃,₃."),
      num("dm-pg-2", "What is the chromatic number of the cycle C₅?", 3, "Odd cycles need 3 colours; even cycles need 2.", "foundation"),
      num("dm-pg-3", "What is the largest chromatic number any planar graph can need?", 4, "That's the four colour theorem.", "foundation"),
    ]),
  ],

  "graph-coloring-and-matching": [
    worked(
      "Worked example: perfect matchings in K₆",
      "How many perfect matchings does the complete graph K₆ have?",
      [
        ["Match vertex 1", "It can pair with any of the other 5."],
        ["Match the next free vertex", "3 choices remain for its partner."],
        ["The last pair", "Only 1 way."],
        ["Multiply", "5 · 3 · 1.", "(2n − 1)!! for K₂ₙ", "15"],
      ],
      "15 perfect matchings",
      "A graph with an odd number of vertices can never have a perfect matching."
    ),
    practice([
      mcq("dm-mt-1", "Hall's theorem: a bipartite graph (X, Y) has a matching that covers X if and only if:", [
        ["Every subset S of X has at least |S| neighbours in Y", true, "That's Hall's marriage condition."],
        ["|X| = |Y|", false, "That's neither necessary nor sufficient for covering X."],
        ["Every vertex has degree at least 1", false, "That's too weak."],
      ], "If some set S has fewer than |S| neighbours, they can't all be matched."),
      num("dm-mt-2", "What is the chromatic number of the complete graph K₇?", 7, "Every pair of vertices is adjacent, so all colours must differ.", "foundation"),
      num("dm-mt-3", "What is the chromatic number of any bipartite graph with at least one edge?", 2, "Colour one side with one colour and the other side with the other.", "foundation"),
    ]),
  ],
};
