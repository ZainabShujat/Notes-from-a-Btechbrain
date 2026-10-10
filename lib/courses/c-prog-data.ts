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
    "Master pointer arithmetic, recursion tree tracing, array-decay rules, structure padding, preprocessor macros, and storage classes.",
  description:
    "A rigorous, mathematically precise study notebook covering the internal semantics, low-level memory layouts, and compilation mechanics of C: operator precedence, right-to-left associativity, short-circuit evaluation, storage classes (auto, static, extern, register), pointer arithmetic, array decay, multi-dimensional row-major mapping, double pointers, function pointers, activation records, stack frames, recursion tracing, structure padding and alignment, unions and bit-fields, dynamic memory management (malloc, calloc, realloc, free), preprocessor macro expansion, and formatted file I/O for undergraduate excellence and top-rank GATE CS/IT performance.",
  level: "Undergraduate / GATE CS",
  estimatedHours: 48,
  prerequisites: [
    "Basic computer architecture concepts (memory addresses, byte offsets)",
    "Elementary logical reasoning and problem solving",
  ],
  learningOutcomes: [
    "Predict exact evaluation order and side effects for complex C expressions using precedence and associativity rules",
    "Analyze variable scope, storage class duration (auto, static, extern, register), and linkage across compilation units",
    "Master pointer arithmetic scaling rules, array decay, multi-dimensional row-major address translation, and function pointers",
    "Trace recursive function call activation records, call trees, and persistent static variable state updates",
    "Calculate precise structure sizes including compiler padding bytes and design memory-optimized member orderings",
    "Examine union memory overlap, bit-field packing, and prevent dynamic heap memory errors (leaks, dangling pointers)",
    "Debug preprocessor macro expansion pitfalls, token-pasting operations, and evaluate scanf/printf return values",
  ],
  gateScope: "GATE 2027 CS/IT scope",
  gateBranches: ["cs"],
  gateSyllabusTopics: [
    "Programming in C: Functions, recursion, parameter passing, scope, binding, storage classes",
    "Pointers and arrays: Pointer arithmetic, multi-dimensional array mapping, array decay, function pointers",
    "Structures and unions: Memory alignment, structure padding, bit-fields, dynamic memory allocation (malloc, calloc, realloc, free)",
    "Preprocessor directives, operator precedence, associativity, sequence points, formatted I/O",
  ],
  modules: [
    // =========================================================================
    // MODULE 1: OPERATORS, PRECEDENCE & STORAGE CLASSES
    // =========================================================================
    {
      id: "c-module-1-operators-and-precedence",
      title: "Module 1: Operator Precedence, Short-Circuit & Storage Classes",
      slug: "operators-and-precedence",
      description:
        "C operator hierarchy, right-to-left associativity rules, short-circuit evaluation, sequence points, auto/static/extern/register storage classes, and lexical scoping.",
      order: 1,
      lessons: [
        {
          id: "precedence-and-short-circuit-evaluation",
          title: "Operator Precedence, Associativity & Short-Circuit Evaluation",
          slug: "precedence-and-short-circuit-evaluation",
          order: 1,
          estimatedMinutes: 30,
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
                "**Complete Precedence Tiers (Highest to Lowest):**",
                "1. **Postfix Operators (L-to-R):** Array subscript `[]`, Function call `()`, Member selection `.` and `->`, Postfix increment/decrement `x++`, `x--`.",
                "2. **Unary Operators (==pink:RIGHT-TO-LEFT!==):** Prefix increment/decrement `++x`, `--x`, Unary plus/minus `+x`, `-x`, Logical NOT `!`, Bitwise NOT `~`, Type cast `(type)`, Dereference `*p`, Address-of `&x`, `sizeof`.",
                "3. **Multiplicative (L-to-R):** `*`, `/`, `%`.",
                "4. **Additive (L-to-R):** `+`, `-`.",
                "5. **Bitwise Shift (L-to-R):** `<<`, `>>`.",
                "6. **Relational (L-to-R):** `<`, `<=`, `>`, `>=`.",
                "7. **Equality (L-to-R):** `==`, `!=`.",
                "8. **Bitwise AND (L-to-R):** `&`.",
                "9. **Bitwise XOR (L-to-R):** `^`.",
                "10. **Bitwise OR (L-to-R):** `|`.",
                "11. **Logical AND (L-to-R):** `&&` (has sequence point).",
                "12. **Logical OR (L-to-R):** `||` (has sequence point).",
                "13. **Ternary Conditional (==pink:RIGHT-TO-LEFT!==):** `? :`.",
                "14. **Assignment (==pink:RIGHT-TO-LEFT!==):** `=`, `+=`, `-=`, `*=`, `/=`, `%=`, etc.",
                "15. **Comma Operator (Lowest, L-to-R):** `,` (evaluates left operand, discards it, returns right operand).",
              ],
              callout: {
                kind: "gate-tip",
                title: "Right-to-Left Associativity Trap",
                message:
                  "Notice that ==pink:Unary operators, Ternary (? :), and Assignment (=) associate RIGHT-TO-LEFT!== For example, `a = b = c = 5` evaluates as `a = (b = (c = 5))`: assigns 5 to c, then b, then a. Similarly, `*p++` groups as `*(p++)`: dereferences the OLD pointer value, then increments the pointer address!",
              },
            },
            {
              type: "explanation",
              heading: "2. Short-Circuit Evaluation in Logical Expressions",
              body: [
                "C compilers guarantee **short-circuit evaluation** for logical AND (`&&`) and logical OR (`||`) strictly from left to right:",
                "1. **For `expr1 && expr2`:** If `expr1` evaluates to `0` (FALSE), `expr2` is **NEVER evaluated**, because the total expression is guaranteed to be 0.",
                "2. **For `expr1 || expr2`:** If `expr1` evaluates to non-zero (TRUE), `expr2` is **NEVER evaluated**, because the total expression is guaranteed to be 1.",
                "**Sequence Points:** The logical `&&`, logical `||`, ternary `? :`, and comma `,` operators introduce a ==purple:sequence point: all side effects of the left operand are fully committed== before the right operand is accessed.",
              ],
            },
            {
              type: "gate-analysis",
              heading: "3. GATE Worked Code Tracing: Short-Circuit Side Effects",
              weightage: "2 Marks (Classical GATE Snippet)",
              trap: "Never skip short-circuit evaluation! If a pre/post-increment is inside a bypassed expression, the variable's value DOES NOT change!",
              solutionSteps: [
                "Consider the following C code snippet:",
                "int a = 1, b = 0, c = 2, result;",
                "result = a-- || ++b && ++c;",
                "What are the final values of a, b, c, and result?",
                "Step 1: Parse expression precedence:",
                "  Precedence of && is higher than ||, so the expression groups as: (a--) || (++b && ++c).",
                "Step 2: Evaluate left operand of ||: '(a--)':",
                "  The current value of 'a' (1) is tested. Since 1 != 0 (TRUE), the left operand of || is TRUE!",
                "  Post-decrement side effect occurs: 'a' becomes 0.",
                "Step 3: Apply short-circuit rule for ||:",
                "  Because the left operand evaluated to TRUE, the entire right operand '(++b && ++c)' is completely BYPASSED and NEVER evaluated!",
                "  '++b' is NOT executed -> b remains 0.",
                "  '++c' is NOT executed -> c remains 2.",
                "  'result' evaluates to 1 (TRUE).",
                "Final State: a = 0, b = 0, c = 2, result = 1.",
              ],
            },
            {
              type: "resources",
              heading: "4. References & Authoritative Sources",
              sources: [
                {
                  title: "The C Programming Language (2nd Edition, ANSI C)",
                  authors: "Brian W. Kernighan, Dennis M. Ritchie",
                  year: "1988",
                  publisher: "Prentice Hall",
                  relevance:
                    "Chapter 2: Types, Operators and Expressions — the definitive canonical manual for operator precedence and sequence points.",
                },
              ],
            },
          ],
          cheatsheet: {
            title: "Operator Precedence & Short-Circuit Quick Revision",
            summaryRule: "Unary, Ternary, and Assignment operators associate Right-to-Left; logical && and || short-circuit evaluation from left to right, bypassing right operands when outcome is determined.",
            keyFormulasAndRules: [
              "Precedence order: Postfix > Unary (R-to-L) > Multiplicative > Additive > Shift > Relational > Equality > Bitwise > Logical > Ternary (R-to-L) > Assignment (R-to-L) > Comma.",
              "expr1 && expr2: If expr1 is 0, expr2 is NOT evaluated.",
              "expr1 || expr2: If expr1 is non-zero, expr2 is NOT evaluated.",
              "*p++ evaluates as *(p++): dereferences old p, then increments pointer.",
              "(*p)++ dereferences p and increments the target integer value.",
            ],
            examPitfalls: [
              "Do not assume bitwise & has higher precedence than equality ==; relational and equality operators have HIGHER precedence than bitwise operators in C!",
            ],
          },
        },
        {
          id: "storage-classes-scope-and-linkage",
          title: "Storage Classes, Variable Scope & Linkage Dynamics",
          slug: "storage-classes-scope-and-linkage",
          order: 2,
          estimatedMinutes: 28,
          tagline: "auto, register, static, and extern lifetime, memory segments, and linkage rules.",
          hasInteractive: false,
          hasGATE: true,
          hasPractice: true,
          sections: [
            {
              type: "explanation",
              heading: "1. The Four C Storage Classes & Memory Segments",
              body: [
                "Every variable in C possesses two essential attributes: **Scope** (where the variable is visible) and **Lifetime / Storage Duration** (how long its memory remains allocated):",
                "1. **`auto` (Automatic):**",
                "   - Default for local variables declared inside a block or function.",
                "   - Allocated on the **Stack segment** when the block is entered; deallocated on block exit. Default value is garbage.",
                "2. **`register`:**",
                "   - Suggests the compiler store the variable in a fast CPU register instead of RAM.",
                "   - Cannot take address using `&` (e.g. `&reg_var` is a compilation error!).",
                "3. **`static`:**",
                "   - **Local static:** Scope is confined to the declaring block, but lifetime persists throughout the entire program run in the **Data / BSS Segment**. Initialized strictly ONCE at startup (defaults to 0).",
                "   - **Global static:** Restricts visibility (internal linkage) strictly to the current `.c` compilation unit.",
                "4. **`extern`:**",
                "   - Declares a variable defined in another file (external linkage). Allocates zero new memory; simply informs the linker.",
              ],
            },
            {
              type: "gate-analysis",
              heading: "2. GATE Worked Numerical: Static Scope & Variable Shadowing",
              weightage: "2 Marks",
              trap: "Inner block declarations SHADOW outer block declarations with the same name. Static variables retain their value across function calls, but local automatic variables re-initialize every call!",
              solutionSteps: [
                "Consider the code:",
                "int x = 10; // global",
                "void print_val() {",
                "    static int x = 5;",
                "    int y = 5;",
                "    x += 2;",
                "    y += 2;",
                "    printf(\"%d %d \", x, y);",
                "}",
                "int main() {",
                "    print_val();",
                "    print_val();",
                "    return 0;",
                "}",
                "Trace output:",
                "Call 1:",
                "  static int x initialized to 5. x += 2 -> x = 7.",
                "  auto int y initialized to 5. y += 2 -> y = 7.",
                "  Prints: '7 7 '.",
                "Call 2:",
                "  static int x retains previous value 7! x += 2 -> x = 9.",
                "  auto int y is re-created on stack and initialized to 5! y += 2 -> y = 7.",
                "  Prints: '9 7 '.",
                "Total Output: '7 7 9 7 '.",
              ],
            },
            {
              type: "resources",
              heading: "3. References & Authoritative Sources",
              sources: [
                {
                  title: "Expert C Programming: Deep C Secrets",
                  authors: "Peter van der Linden",
                  year: "1994",
                  publisher: "Prentice Hall",
                  relevance:
                    "Chapter 3: Unscrambling C Declarations — storage classes, linkage, and data segment memory organization.",
                },
              ],
            },
          ],
          cheatsheet: {
            title: "Storage Classes & Scope Quick Revision",
            summaryRule: "Static variables are initialized once at startup in the Data segment (default 0); register variables cannot be referenced with &; extern provides external linkage.",
            keyFormulasAndRules: [
              "auto: Stack segment; local lifetime; garbage default.",
              "static local: Data/BSS segment; program lifetime; initialized once (0 default).",
              "static global: Internal linkage (visible only in declaring file).",
              "register: Suggested CPU register; taking address &x is illegal.",
              "extern: External linkage declaration; no memory allocated until definition.",
            ],
            examPitfalls: [
              "Do not attempt to pass the address of a register variable to scanf; scanf requires an address, causing a compile-time error.",
            ],
          },
        },
      ],
    },

    // =========================================================================
    // MODULE 2: POINTERS, ARRAYS & MEMORY ARITHMETIC
    // =========================================================================
    {
      id: "c-module-2-pointers-and-arrays",
      title: "Module 2: Pointers, Array Decay & Function Pointers",
      slug: "pointers-and-arrays",
      description:
        "Pointer arithmetic scaling, array decay, multi-dimensional array row-major offsets, double pointers, and function pointers.",
      order: 2,
      lessons: [
        {
          id: "pointer-arithmetic-and-multidimensional-arrays",
          title: "Pointer Arithmetic & Multi-Dimensional Array Subscripts",
          slug: "pointer-arithmetic-and-multidimensional-arrays",
          order: 1,
          estimatedMinutes: 30,
          tagline: "p + 1 scales by sizeof(*p), *(A + i) vs A[i], and 2D matrix row-major offsets.",
          hasInteractive: false,
          hasGATE: true,
          hasPractice: true,
          sections: [
            {
              type: "explanation",
              heading: "1. The Fundamental Mechanics of Pointer Arithmetic",
              body: [
                "A pointer variable stores a memory address. In C, adding an integer $k$ to a pointer $p$ of type $T^*$ does NOT add $k$ bytes! It adds: $k \\times \\text{sizeof}(T)$ bytes.",
                "**Pointer Scaling Rule:**",
                "$$\\text{Address}(p + k) = \\text{Address}(p) + k \\times \\text{sizeof}(*p)$$",
                "**Subscript Equivalence:**",
                "The array subscript expression $A[i]$ is syntactically translated by the compiler as $* (A + i)$. Because addition is commutative:",
                "$$A[i] \\equiv *(A + i) \\equiv *(i + A) \\equiv i[A]$$",
                "**Array Decay Rule:**",
                "In almost all C expressions, an array name of type $T[N]$ automatically decays into a pointer of type $T^*$ pointing to its first element ($&A[0]$).",
                "**The Two Exceptions to Array Decay:**",
                "1. When used as operand to `sizeof`: `sizeof(A)` yields total array capacity $N \\times \\text{sizeof}(T)$.",
                "2. When used as operand to address-of `&`: `&A` yields a pointer to the entire array of type $T(*)[N]$.",
              ],
              callout: {
                kind: "gate-tip",
                title: "A vs &A: The Crucial Type Difference",
                message:
                  "If `int A[5]` starts at address 1000: The numerical addresses of `A` and `&A` are identical (1000). But their types are completely different! `A + 1` advances by 1 integer: $1000 + 4 = 1004$. But `&A + 1` advances by the ENTIRE array: $1000 + (5 \\times 4) = 1020$!",
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
                "  M has type int(*)[4]. M + 1 skips 1 full row of 4 ints: address = 2000 + 4 * 4 = 2016.",
                "  *(M + 1) dereferences to type int*, pointing to M[1][0] at 2016.",
                "  *(M + 1) + 2 advances 2 integer elements in row 1 -> points to M[1][2] at 2016 + 8 = 2024.",
                "  *(*(M + 1) + 2) dereferences element M[1][2] = 7.",
                "Step 2: Evaluate *(*M + 1):",
                "  *M decays to pointer to M[0][0]. *M + 1 points to M[0][1].",
                "  *(*M + 1) = M[0][1] = 2.",
                "Step 3: Evaluate *(*(M + 2)):",
                "  M + 2 points to row 2. *(M + 2) points to M[2][0].",
                "  *(*(M + 2)) = M[2][0] = 9.",
              ],
            },
            {
              type: "resources",
              heading: "3. References & Authoritative Sources",
              sources: [
                {
                  title: "Expert C Programming: Deep C Secrets",
                  authors: "Peter van der Linden",
                  year: "1994",
                  publisher: "Prentice Hall",
                  relevance:
                    "Chapters 4 & 9: Pointers and Arrays — legendary explanation of why arrays and pointers are not identical and how declaration syntax works.",
                },
              ],
            },
          ],
          cheatsheet: {
            title: "Pointer Arithmetic & Array Decay Quick Revision",
            summaryRule: "Adding k to pointer p adds k * sizeof(*p) bytes; A[i] is identical to *(A + i); &A points to the entire array while A decays to a pointer to element 0.",
            keyFormulasAndRules: [
              "Address(p + k) = Address(p) + k * sizeof(*p).",
              "A[i][j] == *(*(A + i) + j).",
              "sizeof(A) yields total array bytes; sizeof(&A) yields pointer size (4 or 8 bytes).",
              "&A + 1 skips the entire array capacity.",
            ],
            examPitfalls: [
              "Remember that subtracting two pointers (p2 - p1) yields the number of ELEMENTS between them, NOT the byte count!",
            ],
          },
        },
        {
          id: "pointers-to-functions-and-string-mechanics",
          title: "Function Pointers, Callbacks & String Memory Layouts",
          slug: "pointers-to-functions-and-string-mechanics",
          order: 2,
          estimatedMinutes: 28,
          tagline: "Function pointer syntax int (*fp)(int), callbacks, and mutable char[] vs immutable char*.",
          hasInteractive: false,
          hasGATE: true,
          hasPractice: true,
          sections: [
            {
              type: "explanation",
              heading: "1. Function Pointers & Callback Architecture",
              body: [
                "In C, code resides in the **Text / Code Segment**. Every function has an entry-point memory address that can be stored in a function pointer.",
                "**Declaration Syntax:**",
                "`return_type (*pointer_name)(param_types);`",
                "- Example: `int (*fp)(int, int);` declares `fp` as a pointer to a function taking two `int` parameters and returning an `int`.",
                "- Note: `int *fp(int, int);` WITHOUT parentheses declares a function returning an `int*`!",
                "**Invocation:**",
                "If `int add(int a, int b) { return a + b; }`, then `fp = add;` or `fp = &add;`. Invoking `fp(3, 4)` or `(*fp)(3, 4)` both return `7`.",
              ],
            },
            {
              type: "explanation",
              heading: "2. String Literal Immutability: `char *s` vs `char s[]`",
              body: [
                "Strings in C are null-terminated (`'\\0'`) character sequences:",
                "1. `char s[] = \"GATE\";`:",
                "   - Allocates an array of 5 characters (`'G'`, `'A'`, `'T'`, `'E'`, `'\\0'`) on the **Stack**.",
                "   - The contents are **MUTABLE**: `s[0] = 'L';` modifies the string to `\"LATE\"` safely.",
                "2. `char *s = \"GATE\";`:",
                "   - Stores the string literal in the **Read-Only Data Segment (.rodata)**.",
                "   - The pointer `s` points to read-only memory.",
                "   - Attempting `s[0] = 'L';` causes a ==pink:Segmentation Fault / Bus Error (Undefined Behavior)==!",
              ],
            },
            {
              type: "resources",
              heading: "3. References & Authoritative Sources",
              sources: [
                {
                  title: "The C Programming Language (2nd Edition)",
                  authors: "Brian W. Kernighan, Dennis M. Ritchie",
                  year: "1988",
                  publisher: "Prentice Hall",
                  relevance:
                    "Chapter 5: Pointers and Arrays — function pointers and string pointer manipulation.",
                },
              ],
            },
          ],
          cheatsheet: {
            title: "Function Pointers & Strings Quick Revision",
            summaryRule: "Function pointer int (*fp)(int) stores code entry address; char *s points to read-only memory while char s[] allocates mutable stack memory.",
            keyFormulasAndRules: [
              "Function pointer syntax: type (*name)(args).",
              "Array of function pointers: type (*arr[N])(args).",
              "char *s = \"text\": Read-only text segment (modifying causes segmentation fault).",
              "char s[] = \"text\": Stack-allocated mutable array of size strlen + 1.",
            ],
            examPitfalls: [
              "Never forget the trailing null character '\\0' when calculating sizeof on string arrays: sizeof(\"GATE\") is 5 bytes, not 4!",
            ],
          },
        },
      ],
    },

    // =========================================================================
    // MODULE 3: FUNCTIONS, RECURSION & ACTIVATION RECORDS
    // =========================================================================
    {
      id: "c-module-3-recursion-and-stack",
      title: "Module 3: Functions, Recursion & The Call Stack",
      slug: "recursion-and-stack",
      description:
        "Function call frames, activation records, static variable retention across recursive calls, tail recursion, and tree recursion call tracing.",
      order: 3,
      lessons: [
        {
          id: "recursion-tracing-and-activation-records",
          title: "Recursion Tracing, Stack Frames & Static Variables",
          slug: "recursion-tracing-and-activation-records",
          order: 1,
          estimatedMinutes: 30,
          tagline: "Stack frames, activation trees, and static variable state accumulation.",
          hasInteractive: false,
          hasGATE: true,
          hasPractice: true,
          sections: [
            {
              type: "explanation",
              heading: "1. The Anatomy of a Function Call Frame (Activation Record)",
              body: [
                "Whenever a function is invoked, the runtime system pushes an **Activation Record (Stack Frame)** onto the call stack containing:",
                "1. **Actual Parameters:** Arguments passed to the function.",
                "2. **Return Address:** Pointer to caller's instruction immediately following the call site.",
                "3. **Dynamic Link (Frame Pointer / EBP / RBP):** Base pointer of caller's stack frame.",
                "4. **Local Automatic Variables:** Storage for variables declared inside the function.",
                "5. **Saved Registers & Temporaries:** Preserved CPU register state.",
                "**Recursion Mechanics:**",
                "Each recursive call creates its own independent frame with private local automatic variables. However, all calls share the **same global and local static variables** in the Data Segment!",
              ],
            },
            {
              type: "gate-analysis",
              heading: "2. GATE Worked Numerical: Recursion with Static Variables",
              weightage: "2 Marks (Classic GATE Trap)",
              trap: "Static variables are initialized ONLY ONCE at program startup in the Data Segment. Their values persist across all recursive calls!",
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
              heading: "3. References & Authoritative Sources",
              sources: [
                {
                  title: "Programming in ANSI C (8th Edition)",
                  authors: "E. Balagurusamy",
                  year: "2019",
                  publisher: "McGraw-Hill",
                  relevance:
                    "Chapter 9: User-Defined Functions — clear pedagogical diagrams of runtime stack frame allocations.",
                },
              ],
            },
          ],
          cheatsheet: {
            title: "Recursion & Call Stack Quick Revision",
            summaryRule: "Each recursive call pushes an activation record with fresh local variables; static variables reside in the Data segment and persist across all recursive frames.",
            keyFormulasAndRules: [
              "Activation record contains: Parameters, Return Address, Dynamic Link, Local Variables.",
              "Static variable initialized only once; retains accumulated state.",
              "Tail recursion: Recursive call is the very last operation; can be optimized to a loop with O(1) stack space.",
            ],
            examPitfalls: [
              "When unwinding expressions like fun(n-1) + x, evaluate static x at the time of addition, NOT at the time fun was originally called.",
            ],
          },
        },
        {
          id: "tail-recursion-and-parameter-passing",
          title: "Parameter Passing (Value vs Pointer) & Tail Recursion",
          slug: "tail-recursion-and-parameter-passing",
          order: 2,
          estimatedMinutes: 28,
          tagline: "Call-by-value semantics, simulating call-by-reference via pointers, and tail call elimination.",
          hasInteractive: false,
          hasGATE: true,
          hasPractice: true,
          sections: [
            {
              type: "explanation",
              heading: "1. Parameter Passing Semantics: Pure Call-by-Value",
              body: [
                "C strictly supports **Call-by-Value ONLY**:",
                "- When an argument is passed to a function, the function receives a **copy** of the value.",
                "- Modifying a parameter inside the function has zero effect on the caller's original variable.",
                "**Simulating Call-by-Reference:**",
                "- To modify caller variables, pass the **memory address** of the variable (pointer).",
                "- Even then, the pointer itself is passed by value (a copy of the address is pushed onto the stack)!",
              ],
            },
            {
              type: "resources",
              heading: "2. References & Authoritative Sources",
              sources: [
                {
                  title: "The C Programming Language (2nd Edition)",
                  authors: "Brian W. Kernighan, Dennis M. Ritchie",
                  year: "1988",
                  publisher: "Prentice Hall",
                  relevance:
                    "Chapter 4: Functions and Program Structure — call-by-value parameter passing and stack discipline.",
                },
              ],
            },
          ],
          cheatsheet: {
            title: "Parameter Passing & Tail Recursion Quick Revision",
            summaryRule: "C is strictly call-by-value; to mutate caller data, pass pointers; tail recursion allows compiler stack reuse.",
            keyFormulasAndRules: [
              "Call-by-value: Function operates on local copies of parameters.",
              "Swap requires pointers: void swap(int *a, int *b) { int t = *a; *a = *b; *b = t; }",
              "Tail recursive functions perform zero operations after the recursive call returns.",
            ],
            examPitfalls: [
              "Passing an array passes a pointer to element 0; modifying array elements inside a function WILL modify the caller's array!",
            ],
          },
        },
      ],
    },

    // =========================================================================
    // MODULE 4: STRUCTURES, UNIONS & DYNAMIC MEMORY
    // =========================================================================
    {
      id: "c-module-4-structures-and-padding",
      title: "Module 4: Structures, Unions & Memory Alignment",
      slug: "structures-and-padding",
      description:
        "Structure memory alignment, padding bytes, member reordering, unions, bit-fields, and dynamic memory allocation (malloc, calloc, realloc, free).",
      order: 4,
      lessons: [
        {
          id: "structure-padding-and-memory-allocation",
          title: "Structure Padding, Memory Alignment & Dynamic Allocation",
          slug: "structure-padding-and-memory-allocation",
          order: 1,
          estimatedMinutes: 30,
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
                "**Structure Alignment Rules (for a standard 32-bit architecture):**",
                "1. **Member Alignment:** A primitive data type of size $k$ bytes must start at a byte offset that is a multiple of $k$ (`char` [1 byte]: any offset; `short` [2 bytes]: multiple of 2; `int`/`float` [4 bytes]: multiple of 4; `double` [8 bytes]: multiple of 4 or 8).",
                "2. **Total Structure Alignment:** The total size of the structure must be an integer multiple of the LARGEST member's alignment requirement. Trailing padding is added at the end if needed.",
              ],
            },
            {
              type: "gate-analysis",
              heading: "2. GATE Worked Numerical: Calculating sizeof(struct)",
              weightage: "2 Marks",
              trap: "Don't forget the trailing padding at the end of the structure! The total size must be a multiple of the largest member's size.",
              solutionSteps: [
                "Consider the structure on a 32-bit machine where sizeof(char)=1, sizeof(short)=2, sizeof(int)=4:",
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
                "  Total structure size MUST be an integer multiple of 4.",
                "  Next multiple of 4 after 10 is 12.",
                "  Compiler inserts 2 trailing padding bytes at Offsets 10 and 11.",
                "Final sizeof(struct Node) = 12 bytes.",
              ],
            },
            {
              type: "resources",
              heading: "3. References & Authoritative Sources",
              sources: [
                {
                  title: "The C Programming Language (2nd Edition)",
                  authors: "Brian W. Kernighan, Dennis M. Ritchie",
                  year: "1988",
                  publisher: "Prentice Hall",
                  relevance:
                    "Chapter 6: Structures — official specifications of self-referential structures, unions, and bit-fields.",
                },
              ],
            },
          ],
          cheatsheet: {
            title: "Structure Padding & Alignment Quick Revision",
            summaryRule: "Members align at offsets divisible by their individual size; total struct size is padded to a multiple of the largest member's size.",
            keyFormulasAndRules: [
              "char (1B): offset % 1 == 0.",
              "short (2B): offset % 2 == 0.",
              "int (4B): offset % 4 == 0.",
              "double (8B): offset % 4 or 8 == 0.",
              "Total size % max_member_size == 0 (trailing padding added).",
              "Member reordering tip: Sort members by descending size to minimize padding bytes.",
            ],
            examPitfalls: [
              "Do not forget trailing padding: a structure ending at byte 10 with an int member will always pad to 12 bytes.",
            ],
          },
        },
        {
          id: "unions-bitfields-and-dynamic-memory",
          title: "Unions, Bit-Fields & Dynamic Memory Management",
          slug: "unions-bitfields-and-dynamic-memory",
          order: 2,
          estimatedMinutes: 28,
          tagline: "Union memory overlap, bitfield packing, malloc, calloc, realloc, and free.",
          hasInteractive: false,
          hasGATE: true,
          hasPractice: true,
          sections: [
            {
              type: "explanation",
              heading: "1. Unions & Bit-Fields",
              body: [
                "**Unions:**",
                "- In a `union`, all members share the **EXACT SAME starting memory address**.",
                "- Size of union = size of its largest member (padded to alignment requirement).",
                "- Used for memory conservation and type punning (e.g. testing endianness).",
                "**Bit-Fields:**",
                "- Allow variables of specified bit widths inside structures (e.g. `unsigned int flag : 1;`).",
                "- Multiple bit-fields pack into a single machine word.",
              ],
            },
            {
              type: "explanation",
              heading: "2. Dynamic Memory Management: Heap Mechanics",
              body: [
                "- `malloc(size)`: Allocates `size` uninitialized bytes on Heap. Returns `void*` (or `NULL` on failure).",
                "- `calloc(n, size)`: Allocates and initializes all bytes to ZERO.",
                "- `realloc(ptr, new_size)`: Resizes existing block, potentially moving it to a new heap address.",
                "- `free(ptr)`: Returns memory to heap. Does NOT set pointer to `NULL`, creating a ==pink:dangling pointer==!",
              ],
            },
            {
              type: "resources",
              heading: "3. References & Authoritative Sources",
              sources: [
                {
                  title: "Expert C Programming: Deep C Secrets",
                  authors: "Peter van der Linden",
                  year: "1994",
                  publisher: "Prentice Hall",
                  relevance:
                    "Chapter 7: Thanks for the Memory — heap fragmentation, memory leaks, and malloc internals.",
                },
              ],
            },
          ],
          cheatsheet: {
            title: "Unions & Dynamic Memory Quick Revision",
            summaryRule: "Union size equals its largest member; free(p) releases heap memory but leaves p as a dangling pointer until assigned NULL.",
            keyFormulasAndRules: [
              "Union: All members share the same starting address.",
              "malloc: Uninitialized garbage memory.",
              "calloc: Zero-initialized memory.",
              "Dangling pointer: Pointer pointing to deallocated memory.",
              "Memory leak: Heap memory allocated without corresponding free.",
            ],
            examPitfalls: [
              "Calling free on an unallocated address or double-freeing causes undefined behavior and heap corruption crashes.",
            ],
          },
        },
      ],
    },

    // =========================================================================
    // MODULE 5: PREPROCESSOR DIRECTIVES & FILE I/O
    // =========================================================================
    {
      id: "c-module-5-preprocessor-and-io",
      title: "Module 5: Preprocessor Directives, Macros & File I/O",
      slug: "preprocessor-and-io",
      description:
        "Macro text substitution, argument side effects, stringification (#), token concatenation (##), printf/scanf return values, and file streams.",
      order: 5,
      lessons: [
        {
          id: "preprocessor-macros-and-conditional-compilation",
          title: "Preprocessor Macros, Token Pasting & Side Effect Traps",
          slug: "preprocessor-macros-and-conditional-compilation",
          order: 1,
          estimatedMinutes: 28,
          tagline: "Macro text substitution, # and ## operators, and macro argument side-effect hazards.",
          hasInteractive: false,
          hasGATE: true,
          hasPractice: true,
          sections: [
            {
              type: "explanation",
              heading: "1. The C Preprocessor: Lexical Substitution",
              body: [
                "The C Preprocessor operates **before compilation**, performing pure textual substitution without type checking:",
                "**1. `#define` Macro examPitfalls:**",
                "- Macros do not evaluate arguments before substitution!",
                "- Classic bug: `#define SQUARE(x) x * x`. Then `SQUARE(2 + 3)` expands to `2 + 3 * 2 + 3 = 2 + 6 + 3 = 11`, NOT 25!",
                "- Correct rule: Always wrap both arguments and the entire macro in parentheses: `#define SQUARE(x) ((x) * (x))`.",
                "**2. Side Effect Hazard:**",
                "- If `SQUARE(i++)` is used, it expands to `((i++) * (i++))`, incrementing `i` TWICE (Undefined Behavior)!",
                "**3. Stringification (`#`) & Token Pasting (`##`):**",
                "- `#x`: Converts macro argument `x` into a string literal `\"x\"`.",
                "- `x ## y`: Concatenates tokens `x` and `y` into a single combined identifier `xy`.",
              ],
            },
            {
              type: "resources",
              heading: "2. References & Authoritative Sources",
              sources: [
                {
                  title: "The C Programming Language (2nd Edition)",
                  authors: "Brian W. Kernighan, Dennis M. Ritchie",
                  year: "1988",
                  publisher: "Prentice Hall",
                  relevance:
                    "Chapter 4: The C Preprocessor — macro definitions, conditional inclusion, and file inclusion semantics.",
                },
              ],
            },
          ],
          cheatsheet: {
            title: "Preprocessor & Macros Quick Revision",
            summaryRule: "Macros perform pure textual substitution; always parenthesize macro parameters ((x)*(x)); # stringifies and ## pastes tokens.",
            keyFormulasAndRules: [
              "#define SQUARE(x) ((x)*(x)): Parentheses prevent operator precedence errors.",
              "#param converts param to string literal \"param\".",
              "token1 ## token2 concatenates into token1token2.",
              "#ifdef / #ifndef / #endif: Conditional compilation guards against multiple inclusion.",
            ],
            examPitfalls: [
              "Never pass expressions with side effects (like i++) to macros that use their parameter more than once.",
            ],
          },
        },
        {
          id: "file-handling-and-format-specifiers",
          title: "Standard I/O, Format Specifiers & File Streams",
          slug: "file-handling-and-format-specifiers",
          order: 2,
          estimatedMinutes: 28,
          tagline: "printf/scanf return values, format specifiers, and FILE* buffered file handling.",
          hasInteractive: false,
          hasGATE: true,
          hasPractice: true,
          sections: [
            {
              type: "explanation",
              heading: "1. Formatted I/O: Return Values & Format Traps",
              body: [
                "**Return Values of `printf` and `scanf`:**",
                "- `printf(\"format\", ...)`: Returns the **total number of characters successfully printed**.",
                "  Example: `int n = printf(\"GATE\");` prints `GATE` and sets `n = 4`.",
                "- `scanf(\"format\", ...)`: Returns the **number of input items successfully matched and assigned**.",
                "  Example: `scanf(\"%d %d\", &a, &b)` returns `2` on valid integers, or `EOF` (-1) on end-of-file.",
                "**File Streams in C:**",
                "- Files are represented by `FILE*` stream pointers.",
                "- Functions: `fopen(\"file.txt\", \"r\")`, `fclose(fp)`, `fgetc(fp)`, `fputc(ch, fp)`, `fread()`, `fwrite()`, `fseek(fp, offset, SEEK_SET/CUR/END)`, `ftell(fp)`.",
              ],
            },
            {
              type: "resources",
              heading: "2. References & Authoritative Sources",
              sources: [
                {
                  title: "The C Programming Language (2nd Edition)",
                  authors: "Brian W. Kernighan, Dennis M. Ritchie",
                  year: "1988",
                  publisher: "Prentice Hall",
                  relevance:
                    "Chapter 7: Input and Output — standard I/O library and file handling functions.",
                },
              ],
            },
          ],
          cheatsheet: {
            title: "Standard I/O & Files Quick Revision",
            summaryRule: "printf returns count of characters printed; scanf returns count of items successfully matched; fseek repositions file pointer.",
            keyFormulasAndRules: [
              "printf return: Number of characters emitted.",
              "scanf return: Number of inputs matched (or EOF on failure).",
              "SEEK_SET (beginning), SEEK_CUR (current position), SEEK_END (end of file).",
              "ftell(fp): Returns current byte offset in file stream.",
            ],
            examPitfalls: [
              "Remember scanf requires memory addresses (&var for primitives, but array names without &).",
            ],
          },
        },
      ],
    },
  ],
};
