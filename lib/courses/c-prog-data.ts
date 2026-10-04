import { CourseMeta } from "./types";

export const C_PROGRAMMING_COURSE: CourseMeta = {
  id: "programming-in-c",
  title: "Programming in C",
  slug: "programming-in-c",
  subjectSlug: "programming-in-c",
  shortTitle: "C Programming",
  icon: "💻",
  color: "bg-green-400",
  tagline:
    "Master pointer arithmetic, recursion tree tracing, array-decay rules, structure padding, and preprocessor mechanics for GATE CS and coding rounds.",
  description:
    "A rigorous, deep-dive study notebook covering low-level C programming language semantics, memory layouts, pointer dereferencing algebra, activation records, and tricky compilation edge cases. Tailored specifically for undergraduate B.Tech exams and GATE CS/IT precision.",
  level: "Undergraduate / GATE CS",
  estimatedHours: 35,
  prerequisites: [
    "Basic computer literacy",
    "Elementary understanding of memory and binary representation",
  ],
  learningOutcomes: [
    "Predict exact output for complex pointer expressions, double pointers, and function pointers",
    "Trace recursive activation records and determine recursion tree call counts and return values",
    "Calculate exact structure sizes accounting for compiler alignment and padding bytes",
    "Master operator precedence, associativity, and short-circuit boolean evaluation traps",
    "Analyze static, extern, auto, and register storage class lifetime and scope rules",
    "Avoid common runtime vulnerabilities including dangling pointers, buffer overflows, and memory leaks",
  ],
  gateWeightage: "4 - 8 Marks",
  gateSyllabusTopics: [
    "Programming in C: functions, recursion, scope, binding",
    "Pointers and pointer arithmetic, arrays, multi-dimensional array mapping",
    "Structures, unions, dynamic memory allocation (malloc, calloc, free)",
    "File handling, preprocessor directives, operator precedence",
  ],
  modules: [
    // =========================================================================
    // MODULE 1: OPERATORS, PRECEDENCE & CONTROL FLOW
    // =========================================================================
    {
      id: "c-module-1-operators-and-precedence",
      title: "Module 1: Operator Precedence, Short-Circuit & Storage Classes",
      slug: "operators-and-precedence",
      description:
        "C operator hierarchy, right-to-left associativity rules, short-circuit evaluation, static variables, and lexical scoping.",
      order: 1,
      lessons: [
        {
          id: "precedence-and-short-circuit-evaluation",
          title: "Operator Precedence, Associativity & Short-Circuit Evaluation",
          slug: "precedence-and-short-circuit-evaluation",
          order: 1,
          estimatedMinutes: 22,
          tagline: "Prefix vs postfix increments, bitwise vs logical operators, and short-circuit traps.",
          hasInteractive: false,
          hasGATE: true,
          hasPractice: true,
          sections: [
            {
              type: "explanation",
              heading: "1. The C Operator Precedence & Associativity Hierarchy",
              body: [
                "Expressions in C are evaluated according to a strict priority hierarchy. When operators have equal precedence, ==purple:associativity dictates the direction of binding (Left-to-Right or Right-to-Left)==.",
                "**High-Yield Precedence Tiers:**",
                "1. **Tier 1 (Highest, L-to-R):** Function call `()`, Array subscript `[]`, Member access (`.` and `->`), Postfix increment/decrement (`x++`, `x--`).",
                "2. **Tier 2 (Unary, ==pink:RIGHT-TO-LEFT!==):** Prefix increment/decrement (`++x`, `--x`), Logical NOT (`!`), Bitwise NOT (`~`), Unary plus/minus (`+x`, `-x`), Address-of (`&x`), Dereference (`*p`), Sizeof, Cast (`(type)`).",
                "3. **Tier 3 (Multiplicative, L-to-R):** `*`, `/`, `%`.",
                "4. **Tier 4 (Additive, L-to-R):** `+`, `-`.",
                "5. **Tier 5 (Bitwise Shifts, L-to-R):** `<<`, `>>`.",
                "6. **Tier 6 (Relational, L-to-R):** `<`, `<=`, `>`, `>=`.",
                "7. **Tier 7 (Equality, L-to-R):** `==`, `!=`.",
                "8. **Tier 8 (Bitwise AND, XOR, OR, L-to-R):** `&` then `^` then `|`.",
                "9. **Tier 9 (Logical AND, OR, L-to-R):** `&&` then `||`.",
                "10. **Tier 10 (Ternary Conditional, ==pink:RIGHT-TO-LEFT==):** `? :`.",
                "11. **Tier 11 (Assignment, ==pink:RIGHT-TO-LEFT==):** `=`, `+=`, `-=`, `*=`, etc.",
                "12. **Tier 12 (Comma Operator, Lowest, L-to-R):** `,` (evaluates left operand, discards result, ==yellow:returns right operand==).",
              ],
              callout: {
                kind: "gate-tip",
                title: "Right-to-Left Associativity Trap",
                message:
                  "Notice that ==pink:Unary operators, Ternary (? :), and Assignment (=) associate RIGHT-TO-LEFT!== For example, `a = b = c = 5` evaluates as ==yellow:`a = (b = (c = 5))`==: assigns 5 to c, then b, then a.",
              },
            },
            {
              type: "explanation",
              heading: "2. Short-Circuit Evaluation in Logical Expressions",
              body: [
                "C compilers guarantee ==yellow:short-circuit evaluation for logical AND (&&) and logical OR (||)== strictly from left to right:",
                "1. **For `expr1 && expr2`:** If `expr1` evaluates to `0` (FALSE), ==pink:`expr2` is NEVER evaluated==, because the total result is guaranteed to be 0.",
                "2. **For `expr1 || expr2`:** If `expr1` evaluates to non-zero (TRUE), ==green:`expr2` is NEVER evaluated==, because the total result is guaranteed to be 1.",
                "**Sequence Points:** The logical `&&` and `||` operators introduce a ==purple:sequence point: all side effects of expr1 are fully completed== before expr2 is examined.",
              ],
            },
            {
              type: "gate-analysis",
              heading: "3. GATE Code Tracing: Short-Circuit Side Effects",
              weightage: "1-2 Marks (Classical GATE Snippet)",
              trap: "Never skip short-circuit evaluation! If a postfix increment is inside a bypassed expression, the variable's value DOES NOT change!",
              solutionSteps: [
                "Consider the following C code snippet:",
                "int a = 1, b = 0, c = 2, d = 0;",
                "int result = a-- || ++b && ++c;",
                "What are the final values of a, b, c, and result?",
                "Step 1: Analyze 'a-- || ++b && ++c':",
                "  Precedence of && is higher than ||, so expression groups as: (a--) || (++b && ++c).",
                "Step 2: Evaluate left operand of ||: 'a--':",
                "  The current value of 'a' (1) is tested. Since 1 is non-zero (TRUE), the left side of || is TRUE!",
                "  Post-decrement side effect occurs: 'a' becomes 0.",
                "Step 3: Because the left operand of || was TRUE, the entire right operand '(++b && ++c)' is SHORT-CIRCUITED and NEVER evaluated!",
                "  '++b' is NOT executed -> b remains 0.",
                "  '++c' is NOT executed -> c remains 2.",
                "  'result' becomes 1.",
                "Final State: a = 0, b = 0, c = 2, result = 1.",
              ],
            },
            {
              type: "resources",
              heading: "4. References & Curated Study Materials",
              sources: [
                {
                  title: "The C Programming Language (2nd Edition, ANSI C)",
                  authors: "Brian W. Kernighan, Dennis M. Ritchie",
                  year: "1988",
                  publisher: "Prentice Hall",
                  link: "https://www.pearson.com",
                  relevance:
                    "Chapter 2: Types, Operators and Expressions — the definitive canonical manual for operator precedence and sequence points.",
                },
              ],
              videos: [
                {
                  title: "Operator Precedence, Associativity & Short Circuit Solved GATE Questions",
                  creator: "Gate Smashers",
                  duration: "18 mins",
                  url: "https://www.youtube.com/playlist?list=PLxCzCOWd7aiGZ9donHRrE9I3Mwn6XdPvP",
                  whyThisHelps:
                    "Demonstrates tricky GATE questions involving side effects and comma operators.",
                },
              ],
            },
          ],
        },
      ],
    },

    // =========================================================================
    // MODULE 2: POINTERS & ARRAY ARITHMETIC
    // =========================================================================
    {
      id: "c-module-2-pointers-and-arrays",
      title: "Module 2: Pointers, Array Decay & Memory Arithmetic",
      slug: "pointers-and-arrays",
      description:
        "Pointer arithmetic, multi-dimensional array mapping, array of pointers vs pointer to array, and double pointers.",
      order: 2,
      lessons: [
        {
          id: "pointer-arithmetic-and-multidimensional-arrays",
          title: "Pointer Arithmetic & Multi-Dimensional Array Subscripts",
          slug: "pointer-arithmetic-and-multidimensional-arrays",
          order: 1,
          estimatedMinutes: 26,
          tagline: "p + 1 scales by sizeof(*p), *(A + i) vs A[i], and 2D matrix row-major offsets.",
          hasInteractive: false,
          hasGATE: true,
          hasPractice: true,
          sections: [
            {
              type: "explanation",
              heading: "1. The Fundamental Mechanics of Pointer Arithmetic",
              body: [
                "A pointer variable stores a memory address. In C, adding an integer k to a pointer p of type T* does NOT add k bytes! It adds: k * sizeof(T) bytes.",
                "Pointer Scaling Rule: Address(p + k) = Address(p) + k * sizeof(*p).",
                "Subscript Equivalence: The expression A[i] is syntactically identical to *(A + i). By commutativity of addition, *(A + i) == *(i + A) == i[A]!",
                "Array Decay Rule: In most expressions, the name of an array of type T[N] automatically decays into a pointer of type T* pointing to its first element (address &A[0]).",
                "Exceptions to Decay: (1) As operand to sizeof (sizeof(A) yields total array bytes N * sizeof(T)), (2) As operand to & (&A yields a pointer to the entire array of type T(*)[N]).",
              ],
              callout: {
                kind: "gate-tip",
                title: "A vs &A: The Crucial Type Difference",
                message:
                  "If int A[5] is at address 1000: The numerical values of A and &A are identical (1000). But their types are completely different! 'A + 1' points to A[1] at address 1000 + 4 = 1004. But '&A + 1' skips the ENTIRE array of 5 ints to address 1000 + (5 * 4) = 1020!",
              },
            },
            {
              type: "gate-analysis",
              heading: "2. GATE Worked Numerical: 2D Array Pointer Dereferencing",
              weightage: "2 Marks (High Frequency in GATE CS)",
              trap: "In a 2D array int M[3][4], M has type pointer-to-array of 4 ints (int(*)[4]). Dereferencing *M yields type int* pointing to M[0][0]!",
              solutionSteps: [
                "Given declaration: int M[3][4] = { {1, 2, 3, 4}, {5, 6, 7, 8}, {9, 10, 11, 12} };",
                "Assume base address of M is 2000 and sizeof(int) = 4 bytes.",
                "Evaluate the values of:",
                "1. *(*(M + 1) + 2)",
                "2. *(*M + 1)",
                "3. *(*(M + 2))",
                "Step 1: Evaluate *(*(M + 1) + 2):",
                "  M has type int(*)[4]. M + 1 skips 1 row of 4 ints: address = 2000 + 4 * 4 = 2016.",
                "  *(M + 1) is a pointer to the start of row 1 (element M[1][0]).",
                "  *(M + 1) + 2 advances 2 integer elements in row 1 -> points to M[1][2].",
                "  *(*(M + 1) + 2) dereferences M[1][2] = 7.",
                "Step 2: Evaluate *(*M + 1):",
                "  *M decays to pointer to M[0][0]. *M + 1 points to M[0][1].",
                "  *(*M + 1) = M[0][1] = 2.",
                "Step 3: Evaluate *(*(M + 2)):",
                "  M + 2 points to row 2. *(M + 2) is pointer to M[2][0].",
                "  *(*(M + 2)) = M[2][0] = 9.",
              ],
            },
            {
              type: "resources",
              heading: "3. References & Curated Study Materials",
              sources: [
                {
                  title: "Expert C Programming: Deep C Secrets",
                  authors: "Peter van der Linden",
                  year: "1994",
                  publisher: "Prentice Hall",
                  link: "https://www.pearson.com",
                  relevance:
                    "Chapters 4 & 9: Pointers and Arrays — legendary explanation of why arrays and pointers are not identical and how declaration syntax works.",
                },
              ],
              videos: [
                {
                  title: "Pointers and Multi-Dimensional Arrays in C Solved GATE PYQs",
                  creator: "Neso Academy",
                  duration: "22 mins",
                  url: "https://www.youtube.com/playlist?list=PLBlnK6fEyqRggZZgYpPMUxdY1CYkZtARR",
                  whyThisHelps:
                    "Step-by-step whiteboard drawings of row-major memory layouts and double dereferencing.",
                },
              ],
            },
          ],
        },
      ],
    },

    // =========================================================================
    // MODULE 3: RECURSION & ACTIVATION RECORDS
    // =========================================================================
    {
      id: "c-module-3-recursion-and-stack",
      title: "Module 3: Functions, Recursion & The Call Stack",
      slug: "recursion-and-stack",
      description:
        "Function call frames, activation records, static variable retention across recursive calls, and tree recursion tracing.",
      order: 3,
      lessons: [
        {
          id: "recursion-tracing-and-activation-records",
          title: "Recursion Tracing, Stack Frames & Static Variables",
          slug: "recursion-tracing-and-activation-records",
          order: 1,
          estimatedMinutes: 24,
          tagline: "Stack frames, activation trees, and static variable state accumulation.",
          hasInteractive: false,
          hasGATE: true,
          hasPractice: true,
          sections: [
            {
              type: "explanation",
              heading: "1. The Anatomy of a Function Call Frame (Activation Record)",
              body: [
                "Whenever a function is invoked in C, the compiler allocates an Activation Record (Stack Frame) on the runtime call stack containing:",
                "1. Actual Parameters: Values or addresses passed into the function.",
                "2. Return Address: Pointer to the caller's next machine instruction.",
                "3. Dynamic Link (Old Frame Pointer / Base Pointer): Pointer to the caller's stack frame.",
                "4. Local Automatic Variables: Storage allocated for variables declared inside the function.",
                "5. Saved CPU Registers and temporary evaluation variables.",
                "Recursion Mechanics: Each recursive call generates its own independent activation record with its own private copies of local automatic variables. When the function returns, its frame is popped from the stack.",
              ],
            },
            {
              type: "gate-analysis",
              heading: "2. GATE Worked Numerical: Recursion with Static Variables",
              weightage: "2 Marks (Classic GATE Trap)",
              trap: "Static variables are initialized ONLY ONCE at program startup and reside in the Data Segment (NOT on the stack!). Their values persist across all recursive calls.",
              solutionSteps: [
                "Consider the recursive function:",
                "int fun(int n) {",
                "    static int x = 0;",
                "    if (n <= 0) return 1;",
                "    x++;",
                "    return fun(n - 1) + x;",
                "}",
                "Find the value returned by fun(5).",
                "Step 1: Trace calls going down the recursion stack:",
                "  fun(5): x becomes 1; calls fun(4)",
                "  fun(4): x becomes 2; calls fun(3)",
                "  fun(3): x becomes 3; calls fun(2)",
                "  fun(2): x becomes 4; calls fun(1)",
                "  fun(1): x becomes 5; calls fun(0)",
                "  fun(0): Base case hit (n <= 0)! Returns 1. At this instant, static variable x = 5.",
                "Step 2: Trace unwinding going back up the recursion stack:",
                "  Note: In 'return fun(n - 1) + x;', when the call returns, 'x' is evaluated using its CURRENT global value (x = 5)!",
                "  fun(1) returns: fun(0) + x = 1 + 5 = 6.",
                "  fun(2) returns: fun(1) + x = 6 + 5 = 11.",
                "  fun(3) returns: fun(2) + x = 11 + 5 = 16.",
                "  fun(4) returns: fun(3) + x = 16 + 5 = 21.",
                "  fun(5) returns: fun(4) + x = 21 + 5 = 26.",
                "Final returned result = 26.",
              ],
            },
            {
              type: "resources",
              heading: "3. References & Curated Study Materials",
              sources: [
                {
                  title: "Programming in ANSI C (8th Edition)",
                  authors: "E. Balagurusamy",
                  year: "2019",
                  publisher: "McGraw-Hill",
                  link: "https://www.mheducation.com",
                  relevance:
                    "Chapter 9: User-Defined Functions — clear pedagogical diagrams of runtime stack frame allocations.",
                },
              ],
              videos: [
                {
                  title: "Recursion with Static Variables Tracing GATE CS Solved Examples",
                  creator: "Gate Smashers",
                  duration: "15 mins",
                  url: "https://www.youtube.com/playlist?list=PLxCzCOWd7aiGZ9donHRrE9I3Mwn6XdPvP",
                  whyThisHelps:
                    "Visual call-tree method to prevent arithmetic errors during recursive unwinding.",
                },
              ],
            },
          ],
        },
      ],
    },

    // =========================================================================
    // MODULE 4: STRUCTURES, UNIONS & MEMORY PADDING
    // =========================================================================
    {
      id: "c-module-4-structures-and-padding",
      title: "Module 4: Structures, Unions & Compiler Memory Padding",
      slug: "structures-and-padding",
      description:
        "Structure memory alignment, padding bytes, bit-fields, union memory sharing, and dynamic memory allocation (malloc, calloc, realloc, free).",
      order: 4,
      lessons: [
        {
          id: "structure-padding-and-memory-allocation",
          title: "Structure Padding, Memory Alignment & Dynamic Allocation",
          slug: "structure-padding-and-memory-allocation",
          order: 1,
          estimatedMinutes: 24,
          tagline: "Natural word alignment, member reordering optimization, and heap management.",
          hasInteractive: false,
          hasGATE: true,
          hasPractice: true,
          sections: [
            {
              type: "explanation",
              heading: "1. The Hardware Necessity of Structure Padding",
              body: [
                "Modern CPUs access memory in multi-byte words (e.g. 4 bytes on 32-bit systems, 8 bytes on 64-bit systems). If a 4-byte integer begins at an unaligned address (e.g., address 1001), the CPU must perform TWO separate memory read cycles and stitch the bytes together in registers.",
                "To optimize performance, C compilers insert unused filler bytes ('padding') between structure members so that every member begins at an address divisible by its natural size.",
                "Structure Alignment Rules (for a standard 32-bit architecture):",
                "1. Member Alignment: A primitive data type of size k bytes must start at a byte offset that is a multiple of k (char [1 byte]: any offset; short [2 bytes]: multiple of 2; int/float [4 bytes]: multiple of 4; double [8 bytes]: multiple of 4 or 8).",
                "2. Total Structure Alignment: The total size of the structure must be an integer multiple of the LARGEST member's alignment requirement. Trailing padding is added at the end if needed.",
              ],
            },
            {
              type: "gate-analysis",
              heading: "2. GATE Worked Numerical: Calculating sizeof(struct)",
              weightage: "2 Marks",
              trap: "Don't forget the trailing padding at the end of the structure! The total size must be a multiple of the largest member's size.",
              solutionSteps: [
                "Consider the following structure on a 32-bit machine where sizeof(char)=1, sizeof(short)=2, sizeof(int)=4:",
                "struct Node {",
                "    char a;",
                "    int b;",
                "    short c;",
                "};",
                "Find sizeof(struct Node).",
                "Step 1: Lay out members sequentially:",
                "  - 'char a' takes 1 byte at Offset 0.",
                "  - Next member is 'int b' (size 4). It MUST start at an offset divisible by 4.",
                "  - Offsets 1, 2, 3 cannot hold 'b'. The compiler inserts 3 padding bytes!",
                "  - 'int b' occupies Offsets 4, 5, 6, 7 (4 bytes).",
                "  - Next member is 'short c' (size 2). It starts at Offset 8 (8 is divisible by 2).",
                "  - 'short c' occupies Offsets 8, 9 (2 bytes).",
                "Step 2: Check total structure size so far:",
                "  Offsets 0 to 9 = 10 bytes used.",
                "Step 3: Apply Total Structure Alignment Rule:",
                "  Largest member is 'int b' (size 4 bytes).",
                "  Total structure size MUST be a multiple of 4.",
                "  Next multiple of 4 after 10 is 12.",
                "  Compiler inserts 2 trailing padding bytes at Offsets 10 and 11.",
                "Final sizeof(struct Node) = 12 bytes.",
              ],
            },
            {
              type: "resources",
              heading: "3. References & Curated Study Materials",
              sources: [
                {
                  title: "The C Programming Language (2nd Edition)",
                  authors: "Brian W. Kernighan, Dennis M. Ritchie",
                  year: "1988",
                  publisher: "Prentice Hall",
                  link: "https://www.pearson.com",
                  relevance:
                    "Chapter 6: Structures — official specifications of self-referential structures, unions, and bit-fields.",
                },
              ],
              videos: [
                {
                  title: "Structure Padding and Alignment in C with Solved Tricks",
                  creator: "Neso Academy",
                  duration: "16 mins",
                  url: "https://www.youtube.com/playlist?list=PLBlnK6fEyqRggZZgYpPMUxdY1CYkZtARR",
                  whyThisHelps:
                    "Visual memory-cell diagrams illustrating how rearranging members minimizes wasted memory.",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
