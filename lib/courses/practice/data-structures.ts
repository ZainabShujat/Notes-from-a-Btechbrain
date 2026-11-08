import { mcq, num, practice, worked, type LessonExtras } from "./helpers";

export const DATA_STRUCTURES_EXTRAS: LessonExtras = {
  "arrays-stacks-and-queues": [
    worked(
      "Worked example: address of an array element",
      "int A[10][20] starts at address 1000, with 4-byte ints and 0-based indices. Find the address of A[5][7] in row-major and in column-major order.",
      [
        ["Row-major: count elements before it", "5 full rows of 20, then 7 more in row 5.", "5·20 + 7", "107 elements"],
        ["Row-major address", "Multiply by the element size and add the base.", "1000 + 107·4", "1428"],
        ["Column-major: count elements before it", "7 full columns of 10, then 5 more in column 7.", "7·10 + 5", "75 elements"],
        ["Column-major address", "Same scaling.", "1000 + 75·4", "1300"],
      ],
      "Row-major: 1428. Column-major: 1300.",
      "Row-major: base + (i·cols + j)·size. Column-major: base + (j·rows + i)·size. Check whether indices start at 0 or 1."
    ),
    practice([
      mcq("ds-stk-1", "Convert the infix expression a + b * c − d to postfix.", [
        ["a b c * + d −", true, "* binds tighter, so b c * comes first; + and − are left-associative, so + is applied before − d."],
        ["a b + c * d −", false, "That computes (a + b) * c."],
        ["a b c d − * +", false, "That computes a + b * (c − d)."],
      ], "Use the operator stack: pop operators of higher or equal precedence before pushing a new one.", "foundation"),
      num("ds-stk-2", "Evaluate the postfix expression 2 3 4 * + 5 −.", 9,
        "Push 2, 3, 4. * gives 12; + gives 2 + 12 = 14; push 5; − gives 14 − 5 = 9.", "foundation"),
      mcq("ds-stk-3", "Which can a stack implement directly?", [
        ["Checking that brackets are balanced", true, "Push each opener and pop on each closer; a mismatch or a leftover opener means unbalanced."],
        ["Breadth-first search", false, "BFS needs a queue."],
        ["A priority queue with O(1) extract-min", false, "That needs a heap or similar."],
      ], "Stacks fit any last-in, first-out problem: brackets, recursion, undo, expression evaluation."),
    ]),
  ],

  "queues-and-linked-lists": [
    worked(
      "Worked example: a circular queue's full condition",
      "A circular queue uses an array of size 8 with front and rear indices, keeping one slot empty to tell full from empty. How many elements can it hold?",
      [
        ["Empty condition", "front == rear."],
        ["Full condition", "(rear + 1) mod n == front: one slot stays unused, otherwise full would also look like front == rear."],
        ["Capacity", "n − 1 elements.", "8 − 1", "7"],
      ],
      "7 elements",
      "Alternatively keep a count variable; then all n slots can be used."
    ),
    practice([
      mcq("ds-ll-1", "In a singly linked list with only a head pointer, which operation is O(1)?", [
        ["Insert at the head", true, "Point the new node at the old head, then move head."],
        ["Delete the last node", false, "You must walk to the second-to-last node: O(n)."],
        ["Insert at the tail", false, "Without a tail pointer you must walk the list: O(n)."],
        ["Find the middle node", false, "That needs a traversal."],
      ], "Keep a tail pointer to make tail insertion O(1); deleting the tail still needs O(n) in a singly linked list.", "foundation"),
      mcq("ds-ll-2", "A queue is built from two stacks (push to S1; to dequeue, pop S2, refilling it from S1 when empty). What is the amortised cost per operation?", [
        ["O(1)", true, "Each element moves from S1 to S2 at most once, so n operations cost O(n) in total."],
        ["O(n)", false, "Only a single dequeue can be O(n); the average is constant."],
        ["O(log n)", false, "No step is logarithmic."],
      ], "Amortised analysis: count total work over a sequence, not the worst single step.", "tricky"),
      num("ds-ll-3", "A circular queue has size 10 with front = 7 and rear = 2 (rear points to the next free slot). How many elements are in it?", 5,
        "(rear − front + n) mod n = (2 − 7 + 10) mod 10 = 5: slots 7, 8, 9, 0 and 1."),
    ]),
  ],

  "binary-trees-and-traversals": [
    worked(
      "Worked example: rebuild a tree from two traversals",
      "Preorder: A B D E C F. Inorder: D B E A F C. Find the postorder.",
      [
        ["The root", "The first preorder symbol is the root: A."],
        ["Split the inorder", "Left of A in the inorder is D B E (left subtree); right is F C (right subtree)."],
        ["Left subtree", "Its preorder is B D E: root B, with D on its left and E on its right."],
        ["Right subtree", "Its preorder is C F: root C; F is left of C in the inorder, so F is C's left child."],
        ["Postorder", "Left, right, root, recursively.", undefined, "D E B F C A"],
      ],
      "Postorder: D E B F C A",
      "Inorder plus preorder (or postorder) fixes a binary tree uniquely. Preorder plus postorder alone does not."
    ),
    practice([
      num("ds-bt-1", "A binary tree has 10 nodes with two children. How many leaves does it have?", 11,
        "In any binary tree, leaves = (nodes with 2 children) + 1.", "foundation"),
      num("ds-bt-2", "How many structurally different binary trees have 3 nodes?", 5,
        "The Catalan number C₃ = (1/4)·C(6, 3) = 5."),
      num("ds-bt-3", "What is the largest number of nodes in a binary tree of height 4 (a single node has height 0)?", 31,
        "A full tree of height h has 2^(h+1) − 1 nodes: 2⁵ − 1 = 31.", "foundation"),
    ]),
  ],

  "binary-search-trees": [
    worked(
      "Worked example: delete a node with two children",
      "Keys 50, 30, 70, 20, 40, 60, 80 are inserted in that order. Delete 50.",
      [
        ["Shape of the tree", "50 is the root; 30 (with 20, 40) on the left; 70 (with 60, 80) on the right."],
        ["Find the inorder successor", "The smallest key in 50's right subtree: go right to 70, then left as far as possible.", undefined, "Successor = 60"],
        ["Replace and remove", "Copy 60 into the root, then delete the original 60, which is a leaf."],
        ["Result", "Root 60; left subtree 30 (20, 40); right subtree 70 with only 80."],
      ],
      "The new root is 60",
      "The inorder predecessor (the largest key on the left, here 40) works just as well; GATE questions say which one they mean."
    ),
    practice([
      num("ds-bst-1", "How many different BSTs can store the keys 1, 2, 3?", 5,
        "Each choice of root splits the rest; the count is the Catalan number C₃ = 5.", "foundation"),
      mcq("ds-bst-2", "n keys are inserted into an empty BST in increasing order. What is the height?", [
        ["n − 1", true, "Each key becomes the right child of the previous one: a chain."],
        ["log₂ n", false, "That's a balanced tree."],
        ["n/2", false, "The chain uses every node."],
      ], "Sorted insertion is the BST worst case, which is why balanced trees such as AVL exist."),
      num("ds-bst-3", "In the BST built from 50, 30, 70, 20, 40, 60, 80, what is the inorder successor of 30?", 40,
        "30 has a right subtree (just 40), so its successor is the minimum of that subtree: 40."),
    ]),
  ],

  "binary-trees-bst-and-avl": [
    worked(
      "Worked example: the fewest nodes in an AVL tree",
      "What is the minimum number of nodes in an AVL tree of height 5 (a single node has height 0)?",
      [
        ["Set up the recurrence", "The sparsest AVL tree of height h has a root, one subtree of height h − 1 and one of height h − 2.", "N(h) = N(h−1) + N(h−2) + 1"],
        ["Base cases", "N(0) = 1 and N(1) = 2."],
        ["Build up", "N(2) = 4, N(3) = 7, N(4) = 12, N(5) = 20.", undefined, "N(5) = 20"],
      ],
      "20 nodes",
      "N(h) grows like Fibonacci numbers, which is why an AVL tree's height is O(log n)."
    ),
    practice([
      num("ds-avl-1", "What is the minimum number of nodes in an AVL tree of height 4 (single node = height 0)?", 12,
        "N(4) = N(3) + N(2) + 1 = 7 + 4 + 1 = 12."),
      mcq("ds-avl-2", "Inserting 1, 2, 3 into an empty AVL tree triggers which rebalancing?", [
        ["A single left rotation at 1", true, "After inserting 3, node 1 has balance −2 and the imbalance is right-right, so one left rotation makes 2 the root."],
        ["A double (right-left) rotation", false, "That's for a right-left shape, such as inserting 1, 3, 2."],
        ["None", false, "The tree becomes a chain of height 2, which violates the AVL property."],
      ], "Same-side imbalance (LL or RR) needs one rotation; zig-zag (LR or RL) needs two.", "foundation"),
      mcq("ds-avl-3", "Keys 1, 3, 2 are inserted into an empty AVL tree. What is the root afterwards?", [
        ["1", false, "1 becomes unbalanced."],
        ["2", true, "The right-left case needs a right rotation at 3, then a left rotation at 1, leaving 2 at the root."],
        ["3", false, "3 moves down to become 2's right child."],
      ], "A zig-zag insertion is fixed by a double rotation that lifts the middle key to the top."),
    ]),
  ],

  "b-trees-and-b-plus-trees": [
    worked(
      "Worked example: order of a B-tree node",
      "A disk block holds 512 bytes. A key takes 8 bytes and a block pointer 4 bytes. What is the largest order p (number of child pointers) of a B-tree internal node, ignoring record pointers?",
      [
        ["What a node of order p holds", "p child pointers and p − 1 keys."],
        ["Fit it in a block", "4p + 8(p − 1) ≤ 512.", "12p − 8 ≤ 512"],
        ["Solve", "p ≤ 520/12 = 43.3, so p = 43.", undefined, "p = 43"],
      ],
      "Order p = 43",
      "B+ tree leaves are different: they hold (key, record pointer) pairs plus one next-leaf pointer, so recompute for them."
    ),
    practice([
      num("ds-bt-4", "Same block (512 bytes), key 8 bytes, record pointer 4 bytes, next-leaf pointer 4 bytes. How many keys fit in a B+ tree leaf?", 42,
        "n(8 + 4) + 4 ≤ 512 gives 12n ≤ 508, so n = 42."),
      num("ds-bt-5", "In a B-tree of order 5 (at most 5 children), what is the minimum number of keys in a non-root node?", 2,
        "A non-root node has at least ⌈m/2⌉ = 3 children, so at least 2 keys."),
      mcq("ds-bt-6", "Why do databases prefer B+ trees to B-trees for indexes?", [
        ["Leaves are linked, so range scans are sequential, and internal nodes hold only keys, so the fan-out is higher", true, "Higher fan-out means a shorter tree and fewer disk reads."],
        ["B+ trees never need to split nodes", false, "Both split on overflow."],
        ["B+ trees store each key only once", false, "B+ trees repeat keys: internal keys are copies of leaf keys."],
      ], "B+ trees: all records in the leaves, leaves chained, internal nodes as a pure index."),
    ]),
  ],

  "heaps-and-priority-queues": [
    worked(
      "Worked example: insert into a max-heap",
      "The max-heap array is [90, 70, 80, 40, 50, 60] (0-indexed). Insert 85.",
      [
        ["Append", "85 goes to index 6, the next free spot.", undefined, "[90, 70, 80, 40, 50, 60, 85]"],
        ["Compare with the parent", "The parent of index 6 is index (6 − 1)/2 = 2, holding 80. 85 > 80, so swap.", undefined, "[90, 70, 85, 40, 50, 60, 80]"],
        ["Compare again", "The parent of index 2 is index 0, holding 90. 85 < 90, so stop."],
      ],
      "[90, 70, 85, 40, 50, 60, 80]",
      "Sift-up costs at most the height, O(log n). Children of i are 2i + 1 and 2i + 2 when indexing from 0."
    ),
    practice([
      num("ds-hp-1", "How many leaves does a binary heap with 10 elements have?", 5,
        "Indices ⌊n/2⌋ to n − 1 (0-based) are leaves: n − ⌊n/2⌋ = 10 − 5 = 5.", "foundation"),
      mcq("ds-hp-2", "Where can the smallest element of a max-heap be?", [
        ["At the root", false, "The root holds the maximum."],
        ["In any leaf", true, "Any node with a child is larger than that child, so the minimum must be a leaf."],
        ["Only at the last index", false, "It can be in any leaf."],
      ], "So finding the minimum of a max-heap means scanning about n/2 leaves.", "tricky"),
      mcq("ds-hp-3", "What is the cost of extract-max on a binary heap of n elements?", [
        ["O(1)", false, "Reading the max is O(1), but removing it requires repairing the heap."],
        ["O(log n)", true, "Move the last element to the root and sift it down the height of the tree."],
        ["O(n)", false, "Only one path is repaired."],
      ], "Peek O(1), insert O(log n), extract O(log n), build O(n)."),
    ]),
  ],

  "heaps-and-hash-tables": [
    worked(
      "Worked example: linear probing",
      "A table of size 10 uses h(k) = k mod 10 with linear probing. Insert 43, 165, 62, 123, 142 in order.",
      [
        ["43 and 165", "43 → slot 3, 165 → slot 5. No collisions."],
        ["62", "62 → slot 2, which is free."],
        ["123", "Slot 3 is taken by 43; probe 4, which is free.", undefined, "123 in slot 4"],
        ["142", "Slot 2 is taken; 3, 4 and 5 are taken too; slot 6 is free.", undefined, "142 in slot 6"],
      ],
      "Slots 2: 62, 3: 43, 4: 123, 5: 165, 6: 142",
      "Primary clustering: runs of filled slots grow and lengthen every probe that lands in them."
    ),
    practice([
      num("ds-ht-1", "With linear probing at load factor α = 0.5, what is the expected number of probes for an unsuccessful search, using ½(1 + 1/(1 − α)²)?", 2.5,
        "½(1 + 1/0.25) = ½(1 + 4) = 2.5.", "gate-level", "probes", 0.01),
      mcq("ds-ht-2", "Quadratic probing mainly avoids:", [
        ["Primary clustering", true, "Probes jump by 1, 4, 9 and so on instead of stepping into the same run."],
        ["Secondary clustering", false, "Keys with the same home slot still follow the same sequence; double hashing fixes that."],
        ["All collisions", false, "Collisions still happen; only the probe pattern changes."],
      ], "Linear: primary clustering. Quadratic: secondary clustering. Double hashing: neither."),
      mcq("ds-ht-3", "In open addressing, why can't you simply empty a slot to delete a key?", [
        ["It would break the probe chains of keys inserted after it", true, "A later search would stop at the empty slot and miss keys stored beyond it; use a 'deleted' marker instead."],
        ["Deletion is impossible in hashing", false, "It's possible, just with markers."],
        ["It would change the hash function", false, "The function is fixed."],
      ], "Deleted slots get a tombstone: searches pass over them, inserts may reuse them.", "tricky"),
    ]),
  ],

  "chaining-universal-hashing-and-load-factors": [
    worked(
      "Worked example: expected search cost with chaining",
      "2000 keys are stored in a chained hash table with 500 slots, assuming simple uniform hashing. What is the expected cost of an unsuccessful search?",
      [
        ["Load factor", "α = n/m.", "2000/500", "α = 4"],
        ["Unsuccessful search", "Hash to a slot, then scan its whole chain, whose expected length is α.", "Θ(1 + α)"],
        ["Plug in", "One hash computation plus about 4 key comparisons."],
      ],
      "About 1 + 4 = 5 steps (4 key comparisons on average)",
      "Chaining stays usable even with α > 1; open addressing needs α < 1."
    ),
    practice([
      num("ds-ch-1", "A chained table has m = 100 slots and n = 250 keys. What is the load factor?", 2.5,
        "α = n/m = 250/100 = 2.5.", "foundation", undefined, 0.01),
      mcq("ds-ch-2", "With a universal family of hash functions, the probability that two distinct keys collide is at most:", [
        ["1/m", true, "That's the definition of a universal family."],
        ["1/n", false, "The bound depends on the table size m."],
        ["1/2", false, "It shrinks as the table grows."],
      ], "Universal hashing gives expected O(1 + α) performance for any input, because the function is picked at random."),
      mcq("ds-ch-3", "With chaining and simple uniform hashing, a successful search takes on average:", [
        ["Θ(1 + α)", true, "Expected comparisons are about 1 + α/2."],
        ["Θ(α²)", false, "The cost is linear in α."],
        ["Θ(log n)", false, "Chains are not sorted trees."],
      ], "Both successful and unsuccessful searches are Θ(1 + α)."),
    ]),
  ],

  "disjoint-set-union": [
    worked(
      "Worked example: union by rank keeps trees short",
      "Using union by rank only (no path compression), what is the greatest possible height of a tree containing 16 elements?",
      [
        ["What rank means", "A tree's rank increases only when two trees of equal rank are joined."],
        ["The size argument", "A tree of rank r has at least 2^r elements, by induction: joining two rank r − 1 trees doubles the minimum size."],
        ["Apply it to n = 16", "2^r ≤ 16, so r ≤ 4, and height equals rank without path compression.", "r ≤ log₂ 16", "4"],
      ],
      "Height at most 4 (= log₂ 16)",
      "Add path compression and each operation costs O(α(n)) amortised, where α is the inverse Ackermann function: effectively constant."
    ),
    practice([
      num("ds-dsu-1", "Ten elements start as singletons. After union(1,2), union(3,4), union(2,4), union(5,6) and union(1,3), how many sets are there?", 6,
        "{1, 2, 3, 4}, {5, 6}, and the singletons {7}, {8}, {9}, {10}. The last union joins sets that are already one."),
      mcq("ds-dsu-2", "With union by rank and path compression, the amortised cost of an operation is:", [
        ["O(log n)", false, "That's union by rank alone."],
        ["O(α(n))", true, "Tarjan's bound, with the inverse Ackermann function α(n) ≤ 4 for any practical n."],
        ["O(1) exactly", false, "It's not exactly constant, though very close."],
      ], "That near-constant bound is why Kruskal's algorithm is dominated by sorting the edges.", "tricky"),
      mcq("ds-dsu-3", "Kruskal's algorithm uses union-find to:", [
        ["Test whether an edge would form a cycle", true, "An edge (u, v) makes a cycle exactly when find(u) = find(v)."],
        ["Sort the edges", false, "Sorting is a separate step."],
        ["Find shortest paths", false, "That's a different problem."],
      ], "Each accepted edge is a union; each candidate edge needs two finds.", "foundation"),
    ]),
  ],
};
