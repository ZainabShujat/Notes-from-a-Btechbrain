import { mcq, num, practice, worked, type LessonExtras } from "./helpers";

export const AI_EXTRAS: LessonExtras = {
  "uninformed-search-strategies": [
    worked(
      "Worked example: how many nodes BFS generates",
      "A search tree has branching factor b = 2, and the shallowest goal is at depth d = 3. In the worst case, how many nodes does BFS generate (counting the root)?",
      [
        ["Nodes per level", "1, 2, 4, 8 for depths 0 to 3."],
        ["Add them", "1 + b + b² + b³.", "1 + 2 + 4 + 8", "15"],
      ],
      "15 nodes",
      "BFS is O(b^d) in both time and memory. Memory is usually what runs out first."
    ),
    practice([
      mcq("ai-un-1", "Which search is complete and optimal for unit step costs, but uses only O(bd) memory?", [
        ["Iterative deepening DFS", true, "It repeats depth-limited DFS with growing limits."],
        ["BFS", false, "It's complete and optimal, but needs O(b^d) memory."],
        ["DFS", false, "It isn't complete in infinite spaces, and isn't optimal."],
      ], "IDS redoes shallow levels, but that overhead is only a constant factor.", "foundation"),
      mcq("ai-un-2", "Uniform-cost search expands the node with the lowest:", [
        ["Path cost g(n)", true, "It's Dijkstra's algorithm, applied to search."],
        ["Heuristic h(n)", false, "That's greedy best-first search."],
        ["Depth", false, "That's BFS."],
      ], "UCS is optimal for any non-negative step costs."),
      mcq("ai-un-3", "DFS on an infinite tree with a goal at depth 3 might:", [
        ["Never find the goal, going down an infinite branch", true, "DFS isn't complete on infinite spaces."],
        ["Always find it in exactly 3 steps", false, "It may pick the wrong branch first."],
        ["Use exponential memory", false, "DFS memory is linear in depth."],
      ], "Depth limits or iterative deepening fix this."),
    ]),
  ],

  "uninformed-and-a-star-search": [
    worked(
      "Worked example: run A*",
      "Edges: S→A 1, S→B 4, A→B 2, A→G 5, B→G 1. Heuristic: h(S) = 3, h(A) = 2, h(B) = 1, h(G) = 0. Find the path A* returns.",
      [
        ["Expand S", "A: g = 1, f = 3. B: g = 4, f = 5."],
        ["Expand A (f = 3)", "B through A: g = 3, f = 4, which beats 5. G through A: g = 6, f = 6."],
        ["Expand B (f = 4)", "G through B: g = 4, f = 4, which beats 6."],
        ["Expand G (f = 4)", "Goal reached."],
        ["Check the heuristic", "Every h is at most the true remaining cost (S 4, A 3, B 1), so it's admissible and A* is optimal."],
      ],
      "S → A → B → G, cost 4",
      "f(n) = g(n) + h(n). An admissible h never overestimates; a consistent h also guarantees optimality in graph search."
    ),
    practice([
      mcq("ai-as-1", "With h(n) = 0 everywhere, A* behaves like:", [
        ["Uniform-cost search", true, "f = g."],
        ["Greedy best-first search", false, "That uses f = h."],
        ["DFS", false, "No."],
      ], "Better (larger but still admissible) heuristics expand fewer nodes.", "foundation"),
      mcq("ai-as-2", "For the 8-puzzle, which heuristic is admissible and dominates the other?", [
        ["Total Manhattan distance, which dominates misplaced tiles", true, "Each misplaced tile needs at least one move, often more."],
        ["Misplaced tiles, which dominates Manhattan distance", false, "Manhattan distance is always at least as large."],
        ["Neither is admissible", false, "Both are."],
      ], "If h₂ ≥ h₁ and both are admissible, h₂ expands no more nodes."),
      mcq("ai-as-3", "If the heuristic overestimates the true cost somewhere, A*:", [
        ["May return a suboptimal path", true, "It might never expand the node on the cheaper path."],
        ["Still returns the optimal path", false, "Admissibility is what guarantees optimality."],
        ["Won't terminate", false, "It terminates in finite graphs."],
      ], "Weighted A* overestimates on purpose, trading optimality for speed."),
    ]),
  ],

  "local-search-and-optimization": [
    worked(
      "Worked example: simulated annealing acceptance",
      "Simulated annealing, maximising an objective, considers a move that worsens it by Δ = 2 at temperature T = 1. With what probability does it accept?",
      [
        ["Rule", "Better moves are always taken; a worse move is taken with probability e^(−Δ/T)."],
        ["Compute", "e^(−2/1).", "≈ 0.135"],
        ["As it cools", "At T = 0.5: e^(−4) ≈ 0.018. Bad moves get rarer as T drops."],
      ],
      "≈ 0.135",
      "Accepting some bad moves lets annealing escape local optima that trap plain hill climbing."
    ),
    practice([
      mcq("ai-ls-1", "Hill climbing can get stuck at:", [
        ["Local maxima, plateaus and ridges", true, "It only ever moves uphill."],
        ["The global maximum only", false, "Stopping there would be a success."],
        ["Nowhere: it always finds the global optimum", false, "No."],
      ], "Random restarts are a simple fix.", "foundation"),
      mcq("ai-ls-2", "In a genetic algorithm, crossover:", [
        ["Combines parts of two parent solutions into a child", true, "Mutation then adds small random changes."],
        ["Randomly changes one gene", false, "That's mutation."],
        ["Removes the weakest solutions", false, "That's selection."],
      ], "Selection, crossover, mutation, repeat."),
      num("ai-ls-3", "Simulated annealing at T = 2 considers a move that's worse by Δ = 2. What is the acceptance probability? Round to 3 decimal places.", 0.368,
        "e^(−2/2) = e^(−1) ≈ 0.368.", "gate-level", undefined, 0.001),
    ]),
  ],

  "constraint-satisfaction-problems-ac3": [
    worked(
      "Worked example: make an arc consistent",
      "X, Y ∈ {1, 2, 3} with the constraint X < Y. Apply arc consistency in both directions.",
      [
        ["Arc X → Y", "Keep x only if some y > x exists. x = 3 has none.", undefined, "X ∈ {1, 2}"],
        ["Arc Y → X", "Keep y only if some x < y exists. y = 1 has none.", undefined, "Y ∈ {2, 3}"],
        ["Recheck", "Every remaining value has support, so it's stable."],
      ],
      "X ∈ {1, 2}, Y ∈ {2, 3}",
      "AC-3 re-queues the arcs pointing into a variable whenever that variable's domain shrinks."
    ),
    practice([
      mcq("ai-csp-1", "The minimum-remaining-values (MRV) heuristic picks:", [
        ["The variable with the fewest legal values left", true, "'Fail first': spot dead ends early."],
        ["The value that rules out the fewest options for others", false, "That's least-constraining value, which orders values."],
        ["A random variable", false, "No."],
      ], "MRV picks the variable; least-constraining value picks its value.", "foundation"),
      num("ai-csp-2", "What is the fewest colours needed so that no two neighbouring states of mainland Australia (WA, NT, SA, Q, NSW, V) share a colour?", 3,
        "SA, WA and NT all border each other (a triangle), so 2 colours aren't enough; Russell & Norvig give a 3-colouring."),
      mcq("ai-csp-3", "Forward checking, after assigning a variable:", [
        ["Removes inconsistent values from its unassigned neighbours' domains", true, "An empty domain triggers backtracking straight away."],
        ["Checks every constraint in the whole problem", false, "That's full arc consistency."],
        ["Assigns the neighbours too", false, "It only prunes."],
      ], "AC-3 (maintaining arc consistency) prunes more than forward checking."),
    ]),
  ],

  "minimax-and-alpha-beta-pruning": [
    worked(
      "Worked example: minimax with pruning",
      "The root is a MAX node with two MIN children. The left child's leaves are 3, 12, 8; the right child's are 2, 4, 6. Find the root's value and which leaves get pruned (left to right).",
      [
        ["Left MIN node", "min(3, 12, 8) = 3, so α = 3 at the root."],
        ["Right MIN node, first leaf", "It sees 2. This MIN node's value can only be ≤ 2, which is less than α = 3."],
        ["Prune", "MAX will never choose this branch, so leaves 4 and 6 are skipped."],
        ["Root", "max(3, ≤ 2) = 3."],
      ],
      "Value 3; leaves 4 and 6 are pruned",
      "With perfect move ordering, alpha-beta examines about O(b^(d/2)) nodes, letting it search twice as deep."
    ),
    practice([
      mcq("ai-ab-1", "Alpha-beta pruning changes the minimax value at the root:", [
        ["Never", true, "It only skips branches that can't affect the result."],
        ["Sometimes", false, "The value is always the same."],
        ["Always", false, "No."],
      ], "Pruning only saves work; good move ordering saves more.", "foundation"),
      num("ai-ab-2", "In the best case, alpha-beta's effective branching factor is about √b. For b = 36, what is that?", 6, "√36 = 6."),
      mcq("ai-ab-3", "At a MIN node, a branch is pruned when:", [
        ["The node's current value is ≤ α, the best MAX can already guarantee above", true, "MAX will avoid this node anyway."],
        ["Its value is ≥ β", false, "That condition prunes at MAX nodes."],
        ["Any leaf is negative", false, "No."],
      ], "MIN nodes cut on ≤ α; MAX nodes cut on ≥ β.", "tricky"),
    ]),
  ],

  "games-with-chance-expectiminimax": [
    worked(
      "Worked example: choose under chance",
      "MAX picks a move. Move A leads to a chance node: 4 or 10, each with probability 0.5. Move B leads to: 6 with probability 0.9, or 20 with probability 0.1. Which move does expectiminimax choose?",
      [
        ["Value of A", "0.5·4 + 0.5·10.", "7"],
        ["Value of B", "0.9·6 + 0.1·20.", "7.4"],
        ["MAX's choice", "max(7, 7.4).", "B"],
      ],
      "Move B, with expected value 7.4",
      "Unlike minimax, expectiminimax depends on the actual scale of the values, not just their order."
    ),
    practice([
      num("ai-ex-1", "A chance node has outcomes 10 (probability 0.3) and 2 (probability 0.7). What is its value?", 4.4, "0.3·10 + 0.7·2 = 3 + 1.4 = 4.4.", "foundation", undefined, 0.001),
      mcq("ai-ex-2", "Multiplying every leaf value by a positive constant in an expectiminimax tree:", [
        ["Keeps the best move the same", true, "Expectations scale by the same factor."],
        ["Can change the best move", false, "That happens with non-linear transforms, not positive scaling."],
      ], "Only positive linear transformations are safe; squaring the values, for example, can change the choice.", "tricky"),
      mcq("ai-ex-3", "Which game needs chance nodes?", [
        ["Backgammon (dice)", true, "The dice add randomness between moves."],
        ["Chess", false, "Chess is deterministic."],
        ["Tic-tac-toe", false, "It's deterministic."],
      ], "Card games add hidden information too, which needs other techniques.", "foundation"),
    ]),
  ],

  "propositional-logic-and-sat": [
    worked(
      "Worked example: entailment by resolution",
      "The knowledge base is {P → Q, P}. Show it entails Q, using resolution.",
      [
        ["Write it in CNF", "P → Q becomes ¬P ∨ Q. With P, the clauses are {¬P ∨ Q}, {P}."],
        ["Add the negated goal", "Add ¬Q."],
        ["Resolve", "¬P ∨ Q with P gives Q; Q with ¬Q gives the empty clause."],
        ["Conclude", "Contradiction, so the KB entails Q."],
      ],
      "KB ⊨ Q",
      "To prove KB ⊨ α by resolution, show KB ∧ ¬α is unsatisfiable."
    ),
    practice([
      num("ai-pl-1", "How many of the 4 truth assignments to A and B satisfy A ∨ B?", 3, "Only A = B = false fails.", "foundation"),
      mcq("ai-pl-2", "A sentence is valid when:", [
        ["It's true in every model", true, "Such as P ∨ ¬P."],
        ["It's true in some model", false, "That's satisfiable."],
        ["It's false in every model", false, "That's unsatisfiable."],
      ], "α is valid ⇔ ¬α is unsatisfiable."),
      mcq("ai-pl-3", "DPLL improves on checking every truth table row by:", [
        ["Unit propagation, pure-literal elimination and early termination", true, "It prunes large parts of the search space."],
        ["Trying assignments at random", false, "That's WalkSAT, a local search method."],
        ["Converting the formula to DNF", false, "DNF can blow up exponentially."],
      ], "Modern SAT solvers (CDCL) add clause learning on top of DPLL."),
    ]),
  ],

  "fol-unification-and-resolution": [
    worked(
      "Worked example: unify two atoms",
      "Find the most general unifier of Knows(John, x) and Knows(y, Mother(y)).",
      [
        ["First arguments", "John and y: substitute y/John."],
        ["Second arguments", "x and Mother(y), which becomes Mother(John) after the first substitution: x/Mother(John)."],
        ["Check", "Both atoms become Knows(John, Mother(John))."],
      ],
      "{ y/John, x/Mother(John) }",
      "The occurs check stops x from unifying with f(x), which would need an infinite term."
    ),
    practice([
      mcq("ai-fo-1", "Can Knows(John, x) and Knows(x, Elizabeth) be unified as written?", [
        ["No: x can't be both John and Elizabeth", true, "Rename the variables apart first (x₁, x₂), and then they unify."],
        ["Yes, with x/John", false, "Then the second argument would need Elizabeth = John."],
      ], "Always standardise variables apart between clauses before resolving.", "tricky"),
      mcq("ai-fo-2", "Skolemisation replaces ∃y in ∀x ∃y Loves(x, y) with:", [
        ["A function of x: Loves(x, F(x))", true, "The y may depend on x, so it becomes a Skolem function."],
        ["A constant: Loves(x, C)", false, "That would claim one y works for every x."],
        ["Nothing: just drop ∃y", false, "That changes the meaning."],
      ], "An ∃ that isn't inside any ∀ becomes a Skolem constant."),
      mcq("ai-fo-3", "Resolution in first-order logic is:", [
        ["Refutation-complete: if KB ⊨ α, it will derive a contradiction from KB ∧ ¬α", true, "But FOL entailment is only semi-decidable, so it may run forever when KB ⊭ α."],
        ["A decision procedure that always terminates", false, "Not for FOL."],
        ["Unsound", false, "It's sound."],
      ], "Propositional entailment is decidable; first-order entailment is only semi-decidable.", "foundation"),
    ]),
  ],

  "bayesian-networks-and-d-separation": [
    worked(
      "Worked example: count the parameters",
      "Binary variables A and B have no parents, and binary C has parents A and B. How many independent parameters does the network need, compared with the full joint distribution?",
      [
        ["A and B", "One number each: P(A) and P(B).", "2"],
        ["C", "One number P(C | a, b) for each of the 4 parent combinations.", "4"],
        ["Network total", "2 + 4.", "6"],
        ["Full joint", "2³ − 1.", "7"],
      ],
      "6, versus 7 for the full joint",
      "The saving grows fast: each node needs 2^(number of parents) numbers, instead of 2ⁿ − 1 for the joint."
    ),
    practice([
      mcq("ai-bn-1", "In the chain A → B → C:", [
        ["A and C are independent given B", true, "Knowing B blocks the path."],
        ["A and C are always independent", false, "Without B, information flows through."],
        ["A and C are dependent given B", false, "Observing B blocks a chain."],
      ], "Chains and forks are blocked by observing the middle node.", "foundation"),
      mcq("ai-bn-2", "In the collider A → C ← B (A and B have no other connection):", [
        ["A and B are independent, but become dependent once C is observed", true, "That's 'explaining away'."],
        ["A and B are independent given C", false, "Observing a collider unblocks the path."],
        ["A and B are always dependent", false, "With C unobserved, they're independent."],
      ], "Colliders behave the opposite way to chains and forks.", "tricky"),
      num("ai-bn-3", "A binary node has 3 binary parents. How many rows does its conditional probability table have?", 8, "One row per parent combination: 2³ = 8."),
    ]),
  ],

  "probabilistic-inference-in-belief-networks": [
    worked(
      "Worked example: inference by enumeration",
      "Network A → B, with P(A) = 0.3, P(B | A) = 0.9 and P(B | ¬A) = 0.2. You observe B. What is P(A | B)?",
      [
        ["Total probability of B", "Sum over A.", "0.3·0.9 + 0.7·0.2", "0.41"],
        ["Joint with A", "P(A, B) = 0.3·0.9.", "0.27"],
        ["Normalise", "0.27/0.41.", "≈ 0.659"],
      ],
      "P(A | B) ≈ 0.659",
      "Variable elimination does the same sums in a smart order, reusing intermediate results instead of enumerating everything."
    ),
    practice([
      num("ai-in-1", "Same network. What is P(A | ¬B)? Round to 3 decimal places.", 0.051,
        "P(¬B) = 0.59; P(A, ¬B) = 0.3·0.1 = 0.03; 0.03/0.59 ≈ 0.051.", "gate-level", undefined, 0.001),
      mcq("ai-in-2", "Exact inference in a general Bayesian network is:", [
        ["NP-hard", true, "That's why approximate methods such as sampling exist."],
        ["Always linear time", false, "Only for polytrees (singly connected networks)."],
        ["Undecidable", false, "It's decidable, just expensive."],
      ], "Polytrees allow linear-time exact inference.", "foundation"),
      mcq("ai-in-3", "Likelihood weighting improves on rejection sampling by:", [
        ["Fixing the evidence variables and weighting each sample by how likely the evidence is", true, "No samples are thrown away."],
        ["Ignoring the evidence", false, "No."],
        ["Sampling only the root nodes", false, "No."],
      ], "Rejection sampling wastes most samples when the evidence is unlikely."),
    ]),
  ],
};
