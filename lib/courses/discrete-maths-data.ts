import { CourseMeta } from "./types";

export const DISCRETE_MATHEMATICS_COURSE: CourseMeta = {
  id: "discrete-mathematics",
  title: "Discrete Mathematics",
  slug: "discrete-mathematics",
  subjectSlug: "discrete-mathematics",
  shortTitle: "Discrete Maths",
  icon: "🔢",
  color: "bg-indigo-400",
  tagline:
    "Master propositional logic, equivalence relations, Hasse diagrams, graph coloring, Eulerian circuits, and recurrence relations.",
  description:
    "A rigorous, foundational study notebook covering the mathematical structures that underpin all of computer science. Built specifically for B.Tech semester exams and top-rank GATE CS/IT preparation.",
  level: "Undergraduate / GATE CS",
  estimatedHours: 45,
  prerequisites: [
    "High school algebra and coordinate geometry",
    "Basic mathematical reasoning and proof techniques",
  ],
  learningOutcomes: [
    "Evaluate truth values and logical validity using truth tables and first-order predicate quantifiers",
    "Identify equivalence relations, partial orders, Hasse diagrams, and determine lattice properties",
    "Count relation types (reflexive, symmetric, transitive, anti-symmetric) on finite sets",
    "Apply the Pigeonhole Principle and Inclusion-Exclusion Principle to complex combinatorial puzzles",
    "Solve linear homogeneous and non-homogeneous recurrence relations using characteristic roots",
    "Prove graph properties using Euler's Planar Formula (V - E + F = 2) and Handshaking Lemma",
    "Determine chromatic numbers, Eulerian circuits, and Hamiltonian cycles across standard graph classes",
    "Analyze algebraic structures: monoids, groups, cyclic groups, and Lagrange's subgroup order theorem",
  ],
  gateWeightage: "7 - 10 Marks",
  gateSyllabusTopics: [
    "Propositional and first-order logic",
    "Sets, relations, functions, partial orders and lattices, groups",
    "Combinatorics: counting, recurrence relations, generating functions",
    "Graph theory: connectivity, matching, coloring, planarity, trees",
  ],
  modules: [
    // =========================================================================
    // MODULE 1: PROPOSITIONAL & FIRST-ORDER LOGIC
    // =========================================================================
    {
      id: "dm-module-1-logic",
      title: "Module 1: Propositional & First-Order Predicate Logic",
      slug: "logic-and-proofs",
      description:
        "Truth tables, logical equivalences, valid vs satisfiable arguments, quantifiers (universal and existential), and scope of negation.",
      order: 1,
      lessons: [
        {
          id: "propositional-and-predicate-logic",
          title: "Propositional Equivalences & First-Order Predicate Logic",
          slug: "propositional-and-predicate-logic",
          order: 1,
          estimatedMinutes: 24,
          tagline: "Tautologies, contrapositives, and quantifier negation ~forall x P(x) <=> exists x ~P(x).",
          hasInteractive: false,
          hasGATE: true,
          hasPractice: true,
          sections: [
            {
              type: "explanation",
              heading: "1. Propositional Logic Equivalences & Conditional Implication",
              body: [
                "A proposition is a declarative statement that is either ==yellow:TRUE or FALSE, but not both==.",
                "The Conditional Implication ($p \\rightarrow q$) is ==pink:FALSE in only one scenario: when p is TRUE and q is FALSE==. In all other cases, it is TRUE.",
                "**Key Logical Equivalences:**",
                "1. **Implication Law:** ==yellow:$p \\rightarrow q \\iff \\neg p \\lor q$==.",
                "2. **Contrapositive Law:** ==green:$p \\rightarrow q \\iff \\neg q \\rightarrow \\neg p$== (==yellow:LOGICALLY EQUIVALENT!==).",
                "3. **Converse:** $q \\rightarrow p$ (==pink:NOT logically equivalent to $p \\rightarrow q$==).",
                "4. **Inverse:** $\\neg p \\rightarrow \\neg q$ (equivalent to the converse, but ==pink:NOT the original statement==).",
                "5. **De Morgan's Laws:** ==purple:$\\neg(p \\land q) \\iff \\neg p \\lor \\neg q$==, and ==purple:$\\neg(p \\lor q) \\iff \\neg p \\land \\neg q$==.",
                "6. **Tautology vs Satisfiable:** A formula is a ==yellow:Tautology if TRUE under ALL truth assignments==. It is ==green:Satisfiable if TRUE under AT LEAST ONE assignment==. It is a ==pink:Contradiction if FALSE under ALL assignments==.",
              ],
            },
            {
              type: "explanation",
              heading: "2. First-Order Predicate Logic & Quantifiers",
              body: [
                "Predicates express properties of objects: $P(x)$ asserts property $P$ about variable $x$ belonging to a Domain of Discourse.",
                "1. **Universal Quantifier ($\\forall x P(x)$):** 'For all $x$, $P(x)$ is true'. ==yellow:True if $P(x)$ holds for every single element== in the domain. False if there exists at least one counterexample.",
                "2. **Existential Quantifier ($\\exists x P(x)$):** 'There exists an $x$ such that $P(x)$ is true'. ==green:True if $P(x)$ holds for at least one element==.",
                "**Negation Rules (De Morgan for Quantifiers):**",
                "- ==purple:$\\neg(\\forall x P(x)) \\iff \\exists x \\neg P(x)$==.",
                "- ==purple:$\\neg(\\exists x P(x)) \\iff \\forall x \\neg P(x)$==.",
                "**Order of Nested Quantifiers:**",
                "- ==pink:$\\forall x \\exists y P(x, y) \\not\\equiv \\exists y \\forall x P(x, y)$!== The right side is strictly stronger (one universal $y$ must work for all $x$).",
              ],
              callout: {
                kind: "gate-tip",
                title: "GATE Trap: Standard English Translations",
                message:
                  "'All students are smart' translates as: ==yellow:$\\forall x (Student(x) \\rightarrow Smart(x))$==. ==pink:NEVER use $\\land$ with $\\forall$ here==, because $\\forall x (Student(x) \\land Smart(x))$ means every entity in the universe is both a student and smart! Conversely, 'Some students are smart' translates as: ==green:$\\exists x (Student(x) \\land Smart(x))$==.",
              },
            },
            {
              type: "resources",
              heading: "3. References & Curated Study Materials",
              sources: [
                {
                  title: "Discrete Mathematics and Its Applications (8th Edition)",
                  authors: "Kenneth H. Rosen",
                  year: "2019",
                  publisher: "McGraw-Hill",
                  link: "https://www.mheducation.com",
                  relevance:
                    "Chapter 1: The Foundations: Logic and Proofs — the globally acclaimed textbook for formal predicate logic and quantifier negation rules.",
                },
              ],
              videos: [
                {
                  title: "First Order Predicate Logic Quantifier Translations for GATE",
                  creator: "Gate Smashers",
                  duration: "18 mins",
                  url: "https://www.youtube.com/playlist?list=PLxCzCOWd7aiHOv84107e3h_pFTXwK9_tK",
                  whyThisHelps:
                    "Eliminates common confusion between implication (->) and conjunction (/\\) with quantifiers.",
                },
              ],
            },
          ],
        },
      ],
    },

    // =========================================================================
    // MODULE 2: RELATIONS, POSETS & LATTICES
    // =========================================================================
    {
      id: "dm-module-2-relations-and-lattices",
      title: "Module 2: Sets, Relations, POSETs & Lattices",
      slug: "relations-and-lattices",
      description:
        "Equivalence relations, counting relations on finite sets, partial order relations (POSETs), Hasse diagrams, and Lattice properties.",
      order: 2,
      lessons: [
        {
          id: "relations-posets-and-lattices",
          title: "Relations, Hasse Diagrams & Lattices",
          slug: "relations-posets-and-lattices",
          order: 1,
          estimatedMinutes: 26,
          tagline: "Equivalence classes, partial orders, Least Upper Bounds (LUB), and Greatest Lower Bounds (GLB).",
          hasInteractive: false,
          hasGATE: true,
          hasPractice: true,
          sections: [
            {
              type: "explanation",
              heading: "1. Properties of Binary Relations on a Set of Size n",
              body: [
                "Let R be a binary relation on a finite set A with |A| = n elements. The Cartesian product A x A has n^2 pairs.",
                "1. Reflexive: (a, a) in R for ALL a in A. Number of reflexive relations = 2^(n^2 - n).",
                "2. Irreflexive: (a, a) NOT in R for ALL a in A. Number of irreflexive relations = 2^(n^2 - n).",
                "3. Symmetric: If (a, b) in R then (b, a) in R. Number of symmetric relations = 2^[n(n + 1)/2].",
                "4. Anti-Symmetric: If (a, b) in R and (b, a) in R, then a = b. Number of anti-symmetric relations = 2^n * 3^[n(n - 1)/2].",
                "5. Asymmetric: If (a, b) in R then (b, a) NOT in R (strictly no self-loops). Number = 3^[n(n - 1)/2].",
                "6. Equivalence Relation: A relation that is simultaneously Reflexive, Symmetric, and Transitive. Partitions set A into disjoint equivalence classes.",
                "7. Partial Order Relation (POSET): A relation that is simultaneously Reflexive, Anti-Symmetric, and Transitive.",
              ],
            },
            {
              type: "explanation",
              heading: "2. POSETs, Hasse Diagrams & Lattices",
              body: [
                "A Hasse diagram is a simplified visual representation of a finite POSET where transitive edges and reflexive self-loops are omitted, and directional arrows are replaced by vertical positioning (larger elements drawn above smaller elements).",
                "Upper Bound & Lower Bound: For a subset S of POSET (A, <=):",
                "- Upper Bound u: x <= u for all x in S.",
                "- Least Upper Bound (LUB / Supremum / Join): The smallest among all upper bounds.",
                "- Greatest Lower Bound (GLB / Infimum / Meet): The largest among all lower bounds.",
                "Definition of a Lattice: A POSET (L, <=) is called a LATTICE if EVERY pair of elements {a, b} has both a UNIQUE Least Upper Bound (a \\lor b) and a UNIQUE Greatest Lower Bound (a \\land b).",
                "Distributive Lattice: A lattice where meet and join distribute over each other: a \\land (b \\lor c) = (a \\land b) \\lor (a \\land c).",
              ],
              callout: {
                kind: "gate-tip",
                title: "How to Disprove a Lattice",
                message:
                  "Look for two elements in the Hasse diagram that have MULTIPLE minimal upper bounds (i.e. two upper bounds with neither being smaller than the other). If they have no unique LUB, it is NOT a lattice!",
              },
            },
            {
              type: "resources",
              heading: "3. References & Curated Study Materials",
              sources: [
                {
                  title: "Discrete Mathematics and Its Applications (8th Edition)",
                  authors: "Kenneth H. Rosen",
                  year: "2019",
                  publisher: "McGraw-Hill",
                  link: "https://www.mheducation.com",
                  relevance:
                    "Chapter 9: Relations — comprehensive mathematical treatments of equivalence partitions, closures, and Hasse diagram lattices.",
                },
              ],
              videos: [
                {
                  title: "How to Check if a POSET is a Lattice (GATE Solved Examples)",
                  creator: "Gate Smashers",
                  duration: "16 mins",
                  url: "https://www.youtube.com/playlist?list=PLxCzCOWd7aiHOv84107e3h_pFTXwK9_tK",
                  whyThisHelps:
                    "Clear visual rules to spot non-lattice Hasse diagrams in under 30 seconds.",
                },
              ],
            },
          ],
        },
      ],
    },

    // =========================================================================
    // MODULE 3: COMBINATORICS & RECURRENCE RELATIONS
    // =========================================================================
    {
      id: "dm-module-3-combinatorics",
      title: "Module 3: Combinatorics, Generating Functions & Recurrences",
      slug: "combinatorics-and-recurrences",
      description:
        "Pigeonhole Principle, stars and bars counting, Inclusion-Exclusion, and solving linear recurrence relations via characteristic equations.",
      order: 3,
      lessons: [
        {
          id: "combinatorics-and-recurrence-solving",
          title: "Counting, Pigeonhole Principle & Recurrence Relations",
          slug: "combinatorics-and-recurrence-solving",
          order: 1,
          estimatedMinutes: 26,
          tagline: "Stars and bars C(n + r - 1, r), pigeonhole bounds, and roots of characteristic polynomials.",
          hasInteractive: false,
          hasGATE: true,
          hasPractice: true,
          sections: [
            {
              type: "explanation",
              heading: "1. The Generalized Pigeonhole Principle",
              body: [
                "Basic Principle: If k + 1 or more pigeons are placed into k pigeonholes, then at least one pigeonhole must contain two or more pigeons.",
                "Generalized Principle: If N objects are placed into k boxes, then at least one box must contain at least ceil(N / k) objects.",
                "Inverted Formulation (Guaranteed Count): To guarantee that at least m objects belong to the same box, the total number of objects required is: N = k(m - 1) + 1.",
              ],
            },
            {
              type: "explanation",
              heading: "2. Combinations with Repetition (Stars and Bars)",
              body: [
                "The number of ways to distribute r identical items into n distinct bins (or equivalently, the number of non-negative integer solutions to x_1 + x_2 + ... + x_n = r where x_i >= 0) is given by:",
                "Formula: C(n + r - 1, r) = (n + r - 1)! / (r! * (n - 1)!).",
                "If strictly positive integer solutions are required (x_i >= 1): Give 1 item to each of the n bins first. Remaining items r' = r - n. Solutions = C(n + (r - n) - 1, r - n) = C(r - 1, n - 1).",
              ],
            },
            {
              type: "gate-analysis",
              heading: "3. GATE Worked Numerical: Solving Linear Recurrence Relations",
              weightage: "2 Marks (High Frequency)",
              trap: "If the characteristic equation has REPEATED roots (r1 = r2 = r), the general solution must include an extra term multiplied by n: a_n = (c1 + c2 * n) * r^n!",
              solutionSteps: [
                "Problem: Solve the recurrence relation: a_n = 5 * a_(n-1) - 6 * a_(n-2) for n >= 2, with initial conditions a_0 = 1, a_1 = 4.",
                "Step 1: Write characteristic equation: r^2 - 5r + 6 = 0.",
                "Step 2: Factorize roots: (r - 2)(r - 3) = 0 -> Distinct roots r_1 = 2, r_2 = 3.",
                "Step 3: General solution form: a_n = c_1 * (2^n) + c_2 * (3^n).",
                "Step 4: Apply initial conditions:",
                "  For n = 0: a_0 = c_1 * (2^0) + c_2 * (3^0) = c_1 + c_2 = 1.",
                "  For n = 1: a_1 = c_1 * (2^1) + c_2 * (3^1) = 2*c_1 + 3*c_2 = 4.",
                "Step 5: Solve linear equations:",
                "  From eq 1: c_1 = 1 - c_2.",
                "  Substitute: 2(1 - c_2) + 3*c_2 = 4 => 2 + c_2 = 4 => c_2 = 2.",
                "  Then c_1 = 1 - 2 = -1.",
                "Final Explicit Solution: a_n = 2 * (3^n) - (2^n).",
              ],
            },
            {
              type: "resources",
              heading: "4. References & Curated Study Materials",
              sources: [
                {
                  title: "Discrete Mathematics and Its Applications (8th Edition)",
                  authors: "Kenneth H. Rosen",
                  year: "2019",
                  publisher: "McGraw-Hill",
                  link: "https://www.mheducation.com",
                  relevance:
                    "Chapters 6 & 8: Counting and Advanced Counting Techniques — master source for recurrence solving and generating functions.",
                },
              ],
              videos: [
                {
                  title: "Solving Linear Homogeneous Recurrence Relations with Distinct & Repeated Roots",
                  creator: "Neso Academy",
                  duration: "18 mins",
                  url: "https://www.youtube.com/playlist?list=PLBlnK6fEyqRgMCUAG0XRw78UA8qnv6jEx",
                  whyThisHelps:
                    "Step-by-step characteristic equation roots and initial condition algebra.",
                },
              ],
            },
          ],
        },
      ],
    },

    // =========================================================================
    // MODULE 4: GRAPH THEORY
    // =========================================================================
    {
      id: "dm-module-4-graph-theory",
      title: "Module 4: Graph Theory, Planarity & Coloring",
      slug: "graph-theory",
      description:
        "Handshaking lemma, Eulerian and Hamiltonian graphs, planar graphs and Euler's formula V - E + F = 2, and chromatic numbers.",
      order: 4,
      lessons: [
        {
          id: "graph-theory-planarity-and-coloring",
          title: "Graph Theory: Eulerian, Planar Graphs & Chromatic Number",
          slug: "graph-theory-planarity-and-coloring",
          order: 1,
          estimatedMinutes: 26,
          tagline: "Handshaking lemma, Euler's formula V - E + F = 2, K_5 and K_3,3 Kuratowski bounds.",
          hasInteractive: false,
          hasGATE: true,
          hasPractice: true,
          sections: [
            {
              type: "explanation",
              heading: "1. Fundamental Graph Theorems & Handshaking Lemma",
              body: [
                "Handshaking Lemma: In any undirected graph G = (V, E), the sum of degrees of all vertices equals TWICE the number of edges: \\sum_{v \\in V} \\deg(v) = 2|E|.",
                "Corollary: The number of vertices of ODD degree in any graph is ALWAYS EVEN.",
                "Eulerian Graph Conditions:",
                "- An Eulerian Path (a trail visiting every edge exactly once) exists if and only if the graph is connected and has EXACTLY 0 or 2 vertices of odd degree.",
                "- An Eulerian Circuit (starts and ends at same vertex) exists if and only if the graph is connected and EVERY vertex has an EVEN degree.",
                "Hamiltonian Graph: A cycle visiting every VERTEX exactly once (NP-complete problem in general).",
              ],
            },
            {
              type: "explanation",
              heading: "2. Planar Graphs & Euler's Formula",
              body: [
                "A graph is Planar if it can be drawn in a plane without any edges crossing.",
                "Euler's Formula for Connected Planar Graphs: V - E + F = 2 (where V = vertices, E = edges, F = faces/regions including the unbounded outer face).",
                "Necessary Planarity Invariant: For any simple connected planar graph with V >= 3:",
                "1. If each face is bounded by at least 3 edges: E <= 3V - 6.",
                "2. If the graph is bipartite or triangle-free (each face has at least 4 edges): E <= 2V - 4.",
                "Kuratowski's Theorem: A graph is planar IF AND ONLY IF it does not contain a subgraph that is homeomorphic to (or can be formed by edge subdivisions of) K_5 (complete graph on 5 vertices) or K_3,3 (complete bipartite utility graph on 3 and 3 vertices).",
              ],
              callout: {
                kind: "gate-tip",
                title: "Proof of Non-Planarity of K_5 and K_3,3",
                message:
                  "For K_5: V = 5, E = 10. Maximum planar edges = 3(5) - 6 = 9. Since 10 > 9, K_5 CANNOT be planar! For K_3,3: V = 6, E = 9, triangle-free. Maximum planar edges = 2(6) - 4 = 8. Since 9 > 8, K_3,3 CANNOT be planar!",
              },
            },
            {
              type: "explanation",
              heading: "3. Graph Coloring & Chromatic Number chi(G)",
              body: [
                "The Chromatic Number chi(G) of a graph G is the minimum number of colors required to color the vertices such that no two adjacent vertices share the same color.",
                "Properties of Standard Graphs:",
                "- Complete Graph K_n: chi(K_n) = n.",
                "- Bipartite Graph (including trees): chi(G) = 2 (contains no odd cycles).",
                "- Cycle Graph C_n: chi(C_n) = 2 if n is even; chi(C_n) = 3 if n is odd.",
                "- Four Color Theorem: Every planar graph can be colored using AT MOST 4 colors (chi(G) <= 4).",
              ],
            },
            {
              type: "resources",
              heading: "4. References & Curated Study Materials",
              sources: [
                {
                  title: "Introduction to Graph Theory (2nd Edition)",
                  authors: "Douglas B. West",
                  year: "2000",
                  publisher: "Prentice Hall",
                  link: "https://www.pearson.com",
                  relevance:
                    "Chapters 1, 4 & 5: Fundamental Concepts, Bipartite Matching, and Planar Graphs — the definitive mathematical text for graph proofs.",
                },
              ],
              videos: [
                {
                  title: "Planar Graphs, Euler's Formula & Kuratowski's Theorem GATE Numericals",
                  creator: "Gate Smashers",
                  duration: "20 mins",
                  url: "https://www.youtube.com/playlist?list=PLxCzCOWd7aiHOv84107e3h_pFTXwK9_tK",
                  whyThisHelps:
                    "Shortcuts for checking planarity and counting faces using V - E + F = 2.",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
