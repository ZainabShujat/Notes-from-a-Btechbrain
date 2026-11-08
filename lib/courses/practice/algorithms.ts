import { mcq, num, practice, worked, type LessonExtras } from "./helpers";

export const ALGORITHMS_EXTRAS: LessonExtras = {
  "asymptotic-notations-and-complexity-bounds": [
    worked(
      "Worked example: rank five growth rates",
      "Arrange in increasing order of growth: n!, n log n, 2ⁿ, n^1.5, log(n!).",
      [
        ["Simplify log(n!)", "By Stirling's approximation, log(n!) = n log n − n log e + O(log n).", "log(n!) = Θ(n log n)", "log(n!) and n log n are the same order"],
        ["Compare n log n with n^1.5", "Divide both by n: compare log n with n^0.5. Any positive power of n beats any power of log n.", "log n = o(n^0.5)", "n log n = o(n^1.5)"],
        ["Compare n^1.5 with 2ⁿ", "Every polynomial is little-o of every exponential with base above 1.", "n^1.5 = o(2ⁿ)"],
        ["Compare 2ⁿ with n!", "n! = 1·2·…·n has n − 1 factors that are at least 2, and most are far larger.", "2ⁿ = o(n!)"],
      ],
      "log(n!) ≈ n log n  <  n^1.5  <  2ⁿ  <  n!  (log(n!) and n log n tie at Θ(n log n))",
      "Reduce each function to a standard form first: logs < polynomials < exponentials < factorials."
    ),
    practice([
      mcq("alg-asym-1", "Is 2^(n+1) = O(2ⁿ)?", [
        ["Yes", true, "2^(n+1) = 2·2ⁿ, a constant multiple of 2ⁿ."],
        ["No", false, "A constant factor of 2 never breaks big-O."],
      ], "Shifting the exponent by a constant multiplies by a constant, so the order is unchanged.", "foundation"),
      mcq("alg-asym-2", "Is 2^(2n) = O(2ⁿ)?", [
        ["Yes", false, "2^(2n) = 4ⁿ, and 4ⁿ/2ⁿ = 2ⁿ grows without bound."],
        ["No", true, "The ratio 4ⁿ/2ⁿ = 2ⁿ is not bounded by any constant."],
      ], "Doubling the exponent squares the function: 2^(2n) = (2ⁿ)², which is a different order.", "tricky"),
      mcq("alg-asym-3", "Which is true for f(n) = n² + 100n log n?", [
        ["f(n) = Θ(n log n)", false, "n² eventually dominates 100n log n."],
        ["f(n) = Θ(n²)", true, "The n² term dominates for large n, so f is bounded above and below by constants times n²."],
        ["f(n) = O(n log n)", false, "n² is not O(n log n)."],
        ["f(n) = Ω(n³)", false, "f grows only quadratically."],
      ], "Keep the fastest-growing term and drop constants: Θ(n²)."),
    ]),
  ],

  "master-theorem-and-recurrences": [
    worked(
      "Worked example: apply the Master Theorem",
      "Solve T(n) = 4T(n/2) + n².",
      [
        ["Read off a, b, f(n)", "a = 4 subproblems, each of size n/b with b = 2, plus f(n) = n² work to split and combine."],
        ["Compute n^(log_b a)", "log₂ 4 = 2.", "n^(log_b a) = n²"],
        ["Compare with f(n)", "f(n) = n² = Θ(n^(log_b a)), so the work is the same at every level of the recursion tree: Case 2."],
        ["Apply Case 2", "There are Θ(log n) levels, each doing Θ(n²) work.", "T(n) = Θ(n^(log_b a) · log n)"],
      ],
      "T(n) = Θ(n² log n)",
      "Always compute n^(log_b a) first; the case is decided only by how f(n) compares with it."
    ),
    practice([
      mcq("alg-mt-1", "T(n) = 3T(n/4) + n. What is T(n)?", [
        ["Θ(n)", true, "log₄ 3 ≈ 0.79 < 1, so f(n) = n dominates (Case 3); regularity holds since 3(n/4) ≤ 0.75n."],
        ["Θ(n log n)", false, "That would need f(n) = Θ(n^(log₄ 3)), but n grows faster."],
        ["Θ(n^0.79)", false, "That's the leaves' cost, which f(n) = n outweighs."],
        ["Θ(n²)", false, "Nothing here is quadratic."],
      ], "Compare n with n^(log₄ 3) ≈ n^0.79: f(n) is polynomially larger, so Case 3 gives Θ(f(n)) = Θ(n)."),
      mcq("alg-mt-2", "T(n) = 2T(n/2) + n log n. What is T(n)?", [
        ["Θ(n log n)", false, "f(n) is larger than n by a log factor, which adds one more log."],
        ["Θ(n log² n)", true, "Extended Case 2: f(n) = Θ(n^(log_b a) · log^k n) with k = 1 gives Θ(n log^(k+1) n)."],
        ["Θ(n²)", false, "No level does quadratic work."],
        ["The Master Theorem can't be applied at all", false, "The basic three cases don't cover it, but the extended Case 2 does."],
      ], "Each level does about n log n work and there are log n levels, so Θ(n log² n).", "tricky"),
      mcq("alg-mt-3", "T(n) = T(n − 1) + n, T(1) = 1. What is T(n)?", [
        ["Θ(n)", false, "The work is summed over n levels, not done once."],
        ["Θ(n log n)", false, "This isn't a divide-by-b recurrence."],
        ["Θ(n²)", true, "Unrolling gives n + (n − 1) + … + 1 = n(n + 1)/2."],
        ["Θ(2ⁿ)", false, "There is only one recursive call per level."],
      ], "Subtract-and-conquer: unroll the recurrence into an arithmetic series. The Master Theorem does not apply."),
    ]),
  ],

  "divide-and-conquer-and-sorting": [
    worked(
      "Worked example: worst-case comparisons in merge sort",
      "How many comparisons does merge sort make, in the worst case, to sort 8 elements?",
      [
        ["Cost of one merge", "Merging two sorted lists of total length m takes at most m − 1 comparisons: each comparison outputs one element, and the last element is placed for free."],
        ["Set up the recurrence", "W(n) = W(⌈n/2⌉) + W(⌊n/2⌋) + (n − 1), with W(1) = 0.", "W(n) = 2W(n/2) + n − 1"],
        ["Unroll for n = 8", "W(2) = 1, W(4) = 2·1 + 3 = 5, W(8) = 2·5 + 7 = 17.", undefined, "W(8) = 17"],
        ["Check with the closed form", "For n a power of 2, W(n) = n log₂ n − n + 1 = 24 − 8 + 1.", "W(8) = 17"],
      ],
      "17 comparisons",
      "Merge sort is Θ(n log n) in every case; only its constant changes with the input."
    ),
    practice([
      mcq("alg-dc-1", "Quick sort always picks the first element as the pivot. Which input of n distinct keys gives the worst case?", [
        ["A random permutation", false, "Random inputs give Θ(n log n) on average."],
        ["Already sorted input", true, "Each pivot is the smallest key, so the partitions have sizes 0 and n − 1."],
        ["An input where every element is equal", false, "The keys are distinct, so this can't happen."],
        ["No input; quick sort is always Θ(n log n)", false, "Its worst case is Θ(n²)."],
      ], "Sorted (or reverse-sorted) input makes every partition maximally unbalanced: n(n − 1)/2 comparisons.", "foundation"),
      num("alg-dc-2", "Quick sort with the first element as pivot sorts the array [1, 2, 3, 4, 5, 6]. How many comparisons does partitioning make in total?", 15,
        "Each pivot is the minimum, so the partitions compare 5 + 4 + 3 + 2 + 1 = 15 = n(n − 1)/2 times."),
      mcq("alg-dc-3", "The median-of-medians selection algorithm splits the input into groups of 5. What is its worst-case running time?", [
        ["Θ(n)", true, "T(n) ≤ T(n/5) + T(7n/10) + O(n), and since 1/5 + 7/10 < 1, the total is linear."],
        ["Θ(n log n)", false, "That's sorting; selection doesn't need to sort everything."],
        ["Θ(n²)", false, "That's randomised quickselect's worst case, which median-of-medians avoids."],
        ["Θ(log n)", false, "Every element must be looked at at least once."],
      ], "Groups of 5 guarantee the pivot discards at least 30% of the elements each round."),
    ]),
  ],

  "sorting-lower-bounds-and-linear-sorting": [
    worked(
      "Worked example: the comparison lower bound for 5 keys",
      "What is the minimum number of comparisons any comparison sort needs, in the worst case, to sort 5 distinct keys?",
      [
        ["Model the sort as a decision tree", "Every comparison sort is a binary tree of comparisons, and each of the n! orderings must reach a different leaf."],
        ["Bound the height", "A binary tree of height h has at most 2^h leaves, so 2^h ≥ n!.", "h ≥ log₂(n!)"],
        ["Plug in n = 5", "5! = 120 and log₂ 120 ≈ 6.91.", "h ≥ ⌈6.91⌉", "h ≥ 7"],
      ],
      "At least 7 comparisons",
      "The general bound log₂(n!) = Θ(n log n) is why comparison sorting can't beat n log n."
    ),
    practice([
      num("alg-lb-1", "What is the minimum worst-case number of comparisons needed to sort 4 distinct keys?", 5,
        "4! = 24 and ⌈log₂ 24⌉ = ⌈4.58⌉ = 5. (Five comparisons are also achievable.)", "foundation"),
      mcq("alg-lb-2", "Counting sort sorts n integers in the range 0 to k. What is its running time?", [
        ["Θ(n log n)", false, "Counting sort doesn't compare keys."],
        ["Θ(n + k)", true, "One pass to count n keys, one pass over the k + 1 counters, one pass to output."],
        ["Θ(nk)", false, "Each key is touched a constant number of times."],
        ["Θ(k log n)", false, "There's no logarithmic factor."],
      ], "Counting sort is linear when k = O(n); it escapes the n log n bound because it never compares two keys."),
      mcq("alg-lb-3", "Building a binary heap from n unsorted keys bottom-up takes how long?", [
        ["Θ(n)", true, "Most nodes sit near the bottom and sift down only a short way; the total is Σ h·n/2^(h+1) = O(n)."],
        ["Θ(n log n)", false, "That's n separate inserts, not bottom-up heapify."],
        ["Θ(log n)", false, "Every element must be placed."],
        ["Θ(n²)", false, "Sift-down is at most logarithmic per node."],
      ], "Bottom-up build-heap is linear; heap sort is Θ(n log n) only because of the n extract-max operations.", "tricky"),
    ]),
  ],

  "greedy-algorithms-and-matroids": [
    worked(
      "Worked example: build a Huffman code",
      "Characters a, b, c, d, e, f appear 5, 9, 12, 13, 16 and 45 times. Build a Huffman code and find the total number of bits.",
      [
        ["Merge the two smallest", "5 (a) + 9 (b) = 14.", undefined, "Pool: 12, 13, 14, 16, 45"],
        ["Merge again", "12 (c) + 13 (d) = 25.", undefined, "Pool: 14, 16, 25, 45"],
        ["Merge again", "14 + 16 (e) = 30.", undefined, "Pool: 25, 30, 45"],
        ["Merge again", "25 + 30 = 55.", undefined, "Pool: 45, 55"],
        ["Final merge", "45 (f) + 55 = 100: the root.", "Codes: f = 0, c = 100, d = 101, a = 1100, b = 1101, e = 111"],
        ["Total bits", "Multiply each frequency by its code length.", "45·1 + 12·3 + 13·3 + 5·4 + 9·4 + 16·3", "224 bits"],
      ],
      "224 bits (a fixed 3-bit code would need 300)",
      "The total cost also equals the sum of all merge results: 14 + 25 + 30 + 55 + 100 = 224."
    ),
    practice([
      num("alg-gr-1", "Activities (start, finish): (1,4), (3,5), (0,6), (5,7), (3,9), (5,9), (6,10), (8,11), (8,12), (2,14), (12,16). What is the largest number of non-overlapping activities?", 4,
        "Greedy by earliest finish: (1,4), (5,7), (8,11), (12,16). Earliest-finish is provably optimal for this problem."),
      num("alg-gr-2", "Fractional knapsack, capacity 50. Items (value, weight): (60, 10), (100, 20), (120, 30). What is the maximum value?", 240,
        "Take by value/weight ratio: 6, 5, 4. All of items 1 and 2 (weight 30, value 160), then 20/30 of item 3 (value 80): 240."),
      mcq("alg-gr-3", "For the same items but 0/1 knapsack (no fractions), does greedy-by-ratio give the optimum?", [
        ["Yes, it gives 220", false, "Greedy takes items 1 and 2 for 160, then item 3 doesn't fit."],
        ["No: greedy gives 160, the optimum is 220", true, "Items 2 and 3 (weight 50) give 220."],
        ["Yes, it gives 240", false, "240 needs a fraction of item 3, which 0/1 forbids."],
      ], "Greedy is optimal for fractional knapsack but not for 0/1, which needs dynamic programming.", "tricky"),
    ]),
  ],

  "minimum-spanning-trees": [
    worked(
      "Worked example: Kruskal's algorithm",
      "Find the minimum spanning tree weight of the graph with edges AB = 1, BC = 2, AC = 3, CD = 4, BD = 5, DE = 6, CE = 7.",
      [
        ["Sort the edges", "1 (AB), 2 (BC), 3 (AC), 4 (CD), 5 (BD), 6 (DE), 7 (CE)."],
        ["Take AB = 1 and BC = 2", "Neither makes a cycle.", undefined, "Components: {A, B, C}, {D}, {E}"],
        ["Reject AC = 3", "A and C are already connected, so AC would close a cycle."],
        ["Take CD = 4, reject BD = 5", "CD joins D; BD would then close a cycle.", undefined, "{A, B, C, D}, {E}"],
        ["Take DE = 6", "That's 4 edges for 5 vertices: the tree is complete.", "1 + 2 + 4 + 6"],
      ],
      "MST weight = 13",
      "Kruskal needs a union-find structure to test cycles; with it the algorithm runs in O(E log E)."
    ),
    practice([
      mcq("alg-mst-1", "If every edge weight in a connected graph is distinct, the minimum spanning tree is:", [
        ["Always unique", true, "With distinct weights, the cut property picks a unique lightest edge across every cut."],
        ["Unique only if the graph is a tree", false, "Uniqueness follows from distinct weights alone."],
        ["Never unique", false, "Distinct weights guarantee uniqueness."],
      ], "Distinct weights ⇒ unique MST. With ties, several MSTs can share the same total weight.", "foundation"),
      mcq("alg-mst-2", "The unique heaviest edge of some cycle in a graph:", [
        ["Is always in every MST", false, "It's the opposite."],
        ["Is never in any MST", true, "Cycle property: swapping it for another edge of the cycle would give a lighter spanning tree."],
        ["Is in the MST only if the graph is dense", false, "Density doesn't matter."],
      ], "The cycle property is the mirror image of the cut property."),
      num("alg-mst-3", "A connected graph has 12 vertices and 30 edges. How many edges does its minimum spanning tree have?", 11,
        "Every spanning tree of an n-vertex connected graph has exactly n − 1 edges.", "foundation"),
    ]),
  ],

  "greedy-vs-dynamic-programming": [
    worked(
      "Worked example: longest common subsequence",
      "Find the length of the LCS of X = ABCBDAB and Y = BDCABA.",
      [
        ["Define the table", "L[i][j] = LCS length of the first i characters of X and the first j of Y.", "L[i][j] = L[i−1][j−1] + 1 if xᵢ = yⱼ, else max(L[i−1][j], L[i][j−1])"],
        ["Fill row by row", "With 7 × 6 entries, each depending on its left, upper and diagonal neighbours."],
        ["Read the corner", "L[7][6] holds the answer.", undefined, "L[7][6] = 4"],
        ["Trace one LCS back", "Follow the diagonal moves where the characters matched.", undefined, "e.g. BCBA (BDAB is another)"],
      ],
      "LCS length = 4",
      "LCS is Θ(mn) time and space; there can be several different LCSs of the same length."
    ),
    practice([
      num("alg-dp-1", "What is the length of the longest strictly increasing subsequence of [10, 9, 2, 5, 3, 7, 101, 18]?", 4,
        "For example 2, 3, 7, 18 (or 2, 5, 7, 101). The patience-sorting method finds it in O(n log n)."),
      num("alg-dp-2", "0/1 knapsack, capacity 7. Items (weight, value): (1, 1), (3, 4), (4, 5), (5, 7). What is the maximum value?", 9,
        "Take the items of weight 3 and 4 (value 4 + 5 = 9). Weight 5 + 1 gives only 8, and weight 5 alone gives 7."),
      mcq("alg-dp-3", "Which two properties must a problem have for dynamic programming to apply?", [
        ["Greedy choice and optimal substructure", false, "The greedy choice property is what greedy algorithms need."],
        ["Overlapping subproblems and optimal substructure", true, "Optimal solutions build from optimal sub-solutions, and the same subproblems recur, so storing them pays off."],
        ["Divide and conquer and sorted input", false, "DP doesn't need sorted input."],
      ], "Overlapping subproblems is what separates DP from plain divide and conquer.", "foundation"),
    ]),
  ],

  "matrix-chain-and-advanced-dp": [
    worked(
      "Worked example: order a matrix chain",
      "Matrices A (10 × 30), B (30 × 5) and C (5 × 60). Which order of multiplication needs fewer scalar multiplications?",
      [
        ["Cost of (AB)C", "AB costs 10·30·5 = 1500 and gives a 10 × 5 matrix; times C costs 10·5·60 = 3000.", "1500 + 3000", "4500"],
        ["Cost of A(BC)", "BC costs 30·5·60 = 9000 and gives 30 × 60; A times that costs 10·30·60 = 18000.", "9000 + 18000", "27000"],
        ["Compare", "The orders differ by a factor of 6, even though the result is identical."],
      ],
      "(AB)C, with 4500 multiplications",
      "Multiplying a p × q by a q × r matrix costs pqr; the DP tries every split point k for each subchain."
    ),
    practice([
      num("alg-mcm-1", "How many different ways are there to fully parenthesise a product of 4 matrices?", 5,
        "The count is the Catalan number C(n − 1) = C(3) = 5: ((AB)C)D, (A(BC))D, (AB)(CD), A((BC)D), A(B(CD)).", "foundation"),
      num("alg-mcm-2", "Matrix dimensions 30, 35, 15, 5, 10, 20, 25 (six matrices). What is the minimum number of scalar multiplications?", 15125,
        "This is the classic CLRS instance; the optimal order is (A₁(A₂A₃))((A₄A₅)A₆).", "tricky"),
      mcq("alg-mcm-3", "What is the running time of the matrix chain DP for n matrices?", [
        ["Θ(n²)", false, "There are Θ(n²) subproblems, but each tries up to n split points."],
        ["Θ(n³)", true, "Θ(n²) table entries times O(n) choices each."],
        ["Θ(2ⁿ)", false, "That's trying every parenthesisation without memoisation."],
      ], "Θ(n³) time and Θ(n²) space."),
    ]),
  ],

  "graph-traversals-and-connectivity": [
    worked(
      "Worked example: topological sort by DFS",
      "Order the tasks so every edge points forward: undershorts → pants, pants → shoes, socks → shoes, pants → belt, shirt → belt, shirt → tie, tie → jacket, belt → jacket.",
      [
        ["Run DFS and record finish times", "A vertex finishes when all its descendants have finished."],
        ["Sort by decreasing finish time", "The vertex that finishes last has nothing that must come before it."],
        ["Read the order", "One valid result:", undefined, "socks, shirt, tie, undershorts, pants, shoes, belt, jacket"],
        ["Check every edge", "Each edge goes from earlier to later in the list, e.g. tie before jacket, pants before shoes."],
      ],
      "socks, shirt, tie, undershorts, pants, shoes, belt, jacket (one valid order)",
      "A DAG can have many topological orders. A DFS that finds a back edge proves there's a cycle, so no order exists."
    ),
    practice([
      mcq("alg-gt-1", "In a DFS of a directed graph, the graph has a cycle if and only if DFS finds:", [
        ["A tree edge", false, "Every DFS has tree edges."],
        ["A back edge", true, "A back edge points to an ancestor still on the stack, closing a cycle."],
        ["A cross edge", false, "Cross edges can exist in acyclic graphs."],
        ["A forward edge", false, "Forward edges can exist in acyclic graphs."],
      ], "Back edge ⇔ cycle. That's the test topological sort relies on."),
      mcq("alg-gt-2", "BFS on an unweighted graph from source s gives:", [
        ["Shortest path lengths (in edges) from s", true, "BFS explores in order of distance, layer by layer."],
        ["A topological order", false, "That needs DFS finish times."],
        ["A minimum spanning tree", false, "Unweighted, any spanning tree is minimum; BFS isn't special."],
      ], "BFS layers are exactly the distance classes from s.", "foundation"),
      mcq("alg-gt-3", "What is the time of BFS or DFS with an adjacency list?", [
        ["Θ(V)", false, "Every edge is also examined."],
        ["Θ(V + E)", true, "Each vertex is visited once and each adjacency list scanned once."],
        ["Θ(V²)", false, "That's with an adjacency matrix."],
        ["Θ(E log V)", false, "There's no priority queue."],
      ], "Θ(V + E) with lists, Θ(V²) with a matrix."),
    ]),
  ],

  "shortest-paths-and-np-completeness": [
    worked(
      "Worked example: Dijkstra's algorithm",
      "Edges: S→A 4, S→B 1, B→A 2, A→C 1, B→C 5. Find the shortest distances from S.",
      [
        ["Start", "d(S) = 0; everything else is ∞."],
        ["Settle S", "Relax its edges: d(A) = 4, d(B) = 1."],
        ["Settle B (smallest, 1)", "Relax B→A: 1 + 2 = 3 < 4, so d(A) = 3. Relax B→C: d(C) = 6."],
        ["Settle A (3)", "Relax A→C: 3 + 1 = 4 < 6, so d(C) = 4."],
        ["Settle C (4)", "No outgoing edges. Done."],
      ],
      "d(S) = 0, d(B) = 1, d(A) = 3, d(C) = 4",
      "Dijkstra is only correct with non-negative edge weights: a settled vertex is never improved later."
    ),
    practice([
      mcq("alg-sp-1", "Why can Dijkstra's algorithm fail with a negative edge?", [
        ["It can loop forever", false, "It still terminates."],
        ["A vertex it has already settled can later get a shorter path", true, "A negative edge reached later can lower a distance Dijkstra already treated as final."],
        ["It can't read negative numbers", false, "The arithmetic is fine; the greedy argument breaks."],
      ], "Use Bellman-Ford for negative weights; it also detects negative cycles."),
      num("alg-sp-2", "How many rounds of relaxing every edge does Bellman-Ford need for a graph with 10 vertices (with no negative cycle)?", 9,
        "A shortest path has at most V − 1 = 9 edges. One more round that still improves something proves a negative cycle.", "foundation"),
      mcq("alg-sp-3", "What is the running time of Floyd-Warshall?", [
        ["Θ(V³)", true, "Three nested loops over the vertices."],
        ["Θ(VE)", false, "That's Bellman-Ford."],
        ["Θ(E log V)", false, "That's Dijkstra with a binary heap."],
        ["Θ(V²)", false, "It needs V rounds of a V × V table."],
      ], "Floyd-Warshall gives all-pairs shortest paths in Θ(V³), and handles negative edges (but not negative cycles)."),
    ]),
  ],

  "computational-complexity-and-np-completeness": [
    worked(
      "Worked example: what a reduction proves",
      "You know 3-SAT is NP-complete, and you find a polynomial-time reduction 3-SAT ≤p CLIQUE. What can you conclude about CLIQUE?",
      [
        ["Read the reduction", "Any 3-SAT instance can be turned, in polynomial time, into a CLIQUE instance with the same yes/no answer."],
        ["Transfer hardness", "If CLIQUE could be solved in polynomial time, so could 3-SAT. So CLIQUE is at least as hard: NP-hard."],
        ["Check membership", "Given a claimed clique, you can verify it in polynomial time, so CLIQUE is in NP."],
        ["Combine", "NP-hard and in NP."],
      ],
      "CLIQUE is NP-complete",
      "Reduce from the known hard problem to the new one, never the other way round."
    ),
    practice([
      mcq("alg-np-1", "A ≤p B and B is in P. What follows?", [
        ["A is in P", true, "Run the polynomial reduction, then B's polynomial algorithm."],
        ["B is NP-complete", false, "Nothing about B's hardness follows."],
        ["A is NP-hard", false, "A is easy, not hard."],
        ["Nothing", false, "A is in P."],
      ], "Easiness flows backwards along a reduction; hardness flows forwards."),
      mcq("alg-np-2", "Which of these is in P?", [
        ["3-SAT", false, "3-SAT is NP-complete."],
        ["2-SAT", true, "2-SAT is solved in linear time using strongly connected components of its implication graph."],
        ["Vertex cover (decision version)", false, "That's NP-complete."],
        ["Hamiltonian cycle", false, "That's NP-complete."],
      ], "2-SAT is a favourite trap: it looks like SAT but is solvable in polynomial time.", "tricky"),
      mcq("alg-np-3", "The halting problem is:", [
        ["NP-complete", false, "It isn't in NP; it isn't even decidable."],
        ["NP-hard but not in NP", true, "Every NP problem reduces to it, but it's undecidable, so it can't be in NP."],
        ["In P", false, "It's undecidable."],
      ], "NP-hard doesn't mean in NP. The halting problem is the standard example."),
    ]),
  ],
};
