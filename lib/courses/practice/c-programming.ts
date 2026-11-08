import { mcq, num, practice, worked, type LessonExtras } from "./helpers";

export const C_PROGRAMMING_EXTRAS: LessonExtras = {
  "precedence-and-short-circuit-evaluation": [
    worked(
      "Worked example: short-circuit side effects",
      "int a = 0, b = 1;  if (a && b++) { }  printf(\"%d\", b);  What is printed?",
      [
        ["Evaluate the left operand", "a is 0, which is false."],
        ["Short-circuit", "For &&, a false left side decides the result, so the right side is never evaluated."],
        ["Effect on b", "b++ never runs, so b stays 1."],
      ],
      "1",
      "&& skips its right side when the left is false; || skips it when the left is true. Side effects there may never happen."
    ),
    practice([
      num("c-pr-1", "What is the value of 2 + 3 * 4 % 5 in C?", 4,
        "* and % have equal precedence and group left to right: 3 * 4 = 12, 12 % 5 = 2, then 2 + 2 = 4.", "foundation"),
      num("c-pr-2", "int x = (1, 2, 3); What is x?", 3,
        "The comma operator evaluates left to right and yields the last operand. The parentheses matter: without them, = binds tighter than the comma.", "tricky"),
      mcq("c-pr-3", "int a = 5; What is a > 3 ? 10 : 20?", [
        ["10", true, "The condition is true, so the first branch is chosen."],
        ["20", false, "That's for a false condition."],
        ["1", false, "?: returns a branch value, not the truth value."],
      ], "The conditional operator has very low precedence, just above assignment and comma.", "foundation"),
    ]),
  ],

  "storage-classes-scope-and-linkage": [
    worked(
      "Worked example: a static local variable",
      "int f(void) { static int c = 0; return ++c; }  What do three calls f(); f(); f() return?",
      [
        ["Initialised once", "A static local gets static storage: it's initialised once, before the program starts."],
        ["Keeps its value", "It isn't reset on each call: c goes 1, then 2, then 3."],
      ],
      "1, 2, 3",
      "Without static, c would be a fresh automatic variable every call, and f() would always return 1."
    ),
    practice([
      mcq("c-sc-1", "A global variable declared static is visible:", [
        ["Only within its own source file", true, "static at file scope gives internal linkage."],
        ["In every file of the program", false, "That's a non-static global (external linkage)."],
        ["Only inside one function", false, "That's a local variable."],
      ], "static means different things inside a function (lifetime) and at file scope (linkage).", "tricky"),
      mcq("c-sc-2", "What does extern int n; do?", [
        ["Declares n without defining it; the definition is elsewhere", true, "It tells the compiler n exists with external linkage."],
        ["Defines n and sets it to 0", false, "extern with no initialiser doesn't define it."],
        ["Makes n a constant", false, "That's const."],
      ], "Each external variable must be defined in exactly one place.", "foundation"),
      mcq("c-sc-3", "Which is not allowed for a register variable?", [
        ["Taking its address with &", true, "C forbids & on register variables, since they may live in a CPU register."],
        ["Using it in arithmetic", false, "That's fine."],
        ["Assigning to it", false, "That's fine."],
      ], "register is only a hint today, but the & restriction still applies in C."),
    ]),
  ],

  "pointer-arithmetic-and-multidimensional-arrays": [
    worked(
      "Worked example: pointers into a 2D array",
      "int a[3][4]; with 4-byte ints, and a starting at address 1000. Find the addresses of a + 1 and *(a + 1) + 2, and what *(*(a + 1) + 2) is.",
      [
        ["The type of a", "In expressions a decays to int (*)[4], a pointer to a row of 4 ints, so steps are 16 bytes."],
        ["a + 1", "One row on.", "1000 + 16", "1016"],
        ["*(a + 1) + 2", "*(a + 1) is row 1, an int*; adding 2 moves 2 ints, 8 bytes.", "1016 + 8", "1024"],
        ["Dereference", "*(*(a + 1) + 2) is the same as a[1][2]."],
      ],
      "a + 1 = 1016; *(a + 1) + 2 = 1024; the value is a[1][2]",
      "Pointer arithmetic scales by the size of what the pointer points to. Always work out that type first."
    ),
    practice([
      num("c-pa-1", "int a[3][4]; with 4-byte ints. What is sizeof(a)?", 48, "3 × 4 × 4 = 48 bytes.", "foundation", "bytes"),
      mcq("c-pa-2", "int a[3][4]; int *p = &a[0][0]; Which element is *(p + 5)?", [
        ["a[1][1]", true, "Row-major: element 5 is row 5 / 4 = 1, column 5 % 4 = 1."],
        ["a[0][5]", false, "Column 5 doesn't exist; it wraps into the next row."],
        ["a[5][0]", false, "That's out of bounds."],
      ], "Flatten with index = row × columns + column."),
      num("c-pa-3", "int arr[] = {10, 20, 30, 40}; int *p = arr + 1; What is *(p + 2)?", 40, "p points to 20 (index 1); p + 2 points to index 3, which is 40.", "foundation"),
    ]),
  ],

  "pointers-to-functions-and-string-mechanics": [
    worked(
      "Worked example: strlen vs sizeof",
      "char s[] = \"hello\";  What are strlen(s) and sizeof(s)?",
      [
        ["Array size", "The array holds 5 characters plus the terminating '\\0'.", "sizeof(s)", "6"],
        ["String length", "strlen counts up to, but not including, the '\\0'.", "strlen(s)", "5"],
      ],
      "strlen(s) = 5, sizeof(s) = 6",
      "If s were declared char *s = \"hello\", sizeof(s) would be the size of a pointer instead."
    ),
    practice([
      mcq("c-fp-1", "char *s = \"abc\"; s[0] = 'x'; What happens?", [
        ["Undefined behaviour: string literals may be in read-only memory", true, "Modifying a string literal is undefined; it often crashes."],
        ["s becomes \"xbc\"", false, "That would be true for char s[] = \"abc\"."],
        ["A compile-time error", false, "It usually compiles; it's a run-time problem."],
      ], "Use char s[] = \"abc\" to get a modifiable copy.", "tricky"),
      mcq("c-fp-2", "Which declares p as a pointer to a function taking an int and returning an int?", [
        ["int (*p)(int);", true, "The parentheses bind * to p before the parameter list applies."],
        ["int *p(int);", false, "That declares a function returning int*."],
        ["int p*(int);", false, "That isn't valid C."],
      ], "Read declarations from the name outwards: p is a pointer to a function (int) returning int."),
      num("c-fp-3", "What does printf(\"%d\", printf(\"hello\")); print after \"hello\"?", 5, "printf returns how many characters it printed. The inner call prints hello and returns 5.", "tricky"),
    ]),
  ],

  "recursion-tracing-and-activation-records": [
    worked(
      "Worked example: count the calls of a naive recursion",
      "int f(int n) { return n <= 1 ? 1 : f(n - 1) + f(n - 2); }  How many calls does f(5) make in total, including the first?",
      [
        ["Recurrence for calls", "C(n) = 1 + C(n − 1) + C(n − 2), with C(0) = C(1) = 1."],
        ["Build up", "C(2) = 3, C(3) = 5, C(4) = 9, C(5) = 15."],
      ],
      "15 calls",
      "C(n) = 2·Fib(n + 1) − 1: the call count grows exponentially, which is why memoisation helps."
    ),
    practice([
      num("c-rc-1", "Same function. How many calls does f(6) make?", 25, "C(6) = 1 + C(5) + C(4) = 1 + 15 + 9 = 25."),
      num("c-rc-2", "int g(int n) { if (n == 0) return 0; return n + g(n - 1); } What is g(4)?", 10, "4 + 3 + 2 + 1 + 0 = 10.", "foundation"),
      mcq("c-rc-3", "What does each recursive call push onto the call stack?", [
        ["An activation record: parameters, local variables and the return address", true, "That's why very deep recursion overflows the stack."],
        ["Only the return value", false, "Much more is saved."],
        ["Nothing; recursion doesn't use the stack", false, "Every call gets a frame."],
      ], "The maximum stack depth equals the deepest chain of active calls."),
    ]),
  ],

  "tail-recursion-and-parameter-passing": [
    worked(
      "Worked example: swapping by value vs by pointer",
      "void s1(int a, int b) { int t = a; a = b; b = t; }  void s2(int *a, int *b) { int t = *a; *a = *b; *b = t; }  With x = 1 and y = 2, compare s1(x, y) and s2(&x, &y).",
      [
        ["s1", "C passes arguments by value: a and b are copies, so x and y don't change.", undefined, "x = 1, y = 2"],
        ["s2", "The pointers are copies, but they point at x and y, so writing through them changes the originals.", undefined, "x = 2, y = 1"],
      ],
      "s1 leaves x and y unchanged; s2 swaps them",
      "C has only call by value. 'Pass by reference' in C means passing a pointer by value."
    ),
    practice([
      mcq("c-tr-1", "A function is tail-recursive when:", [
        ["The recursive call is the very last thing it does", true, "Nothing is left to do after the call returns, so the frame can be reused."],
        ["It calls itself twice", false, "That's tree recursion."],
        ["It has no base case", false, "That never terminates."],
      ], "A compiler can turn tail recursion into a loop, using O(1) stack.", "foundation"),
      mcq("c-tr-2", "Which version of factorial is tail-recursive?", [
        ["int f(int n, int acc) { return n == 0 ? acc : f(n - 1, n * acc); }", true, "The multiplication happens before the call, so the call is last."],
        ["int f(int n) { return n == 0 ? 1 : n * f(n - 1); }", false, "The multiply runs after the call returns."],
      ], "An accumulator parameter is the usual way to make a function tail-recursive."),
      num("c-tr-3", "void inc(int *p) { (*p)++; }  int x = 5; inc(&x); inc(&x); What is x?", 7, "Each call increments x through the pointer: 5 → 6 → 7.", "foundation"),
    ]),
  ],

  "structure-padding-and-memory-allocation": [
    worked(
      "Worked example: structure padding",
      "Assuming 4-byte ints aligned to 4 bytes: what is sizeof(struct { char c; int i; char d; })? And after reordering to { int i; char c; char d; }?",
      [
        ["Original order", "c at offset 0; 3 bytes of padding so i starts at offset 4; i fills 4 to 7; d at 8."],
        ["Tail padding", "The size must be a multiple of the largest alignment (4): 9 rounds up to 12.", undefined, "12 bytes"],
        ["Reordered", "i at 0 to 3, c at 4, d at 5; 6 rounds up to 8.", undefined, "8 bytes"],
      ],
      "12 bytes, versus 8 after reordering",
      "Sort members from largest to smallest alignment to reduce padding. Exact sizes depend on the platform."
    ),
    practice([
      num("c-sp-1", "Same assumptions (4-byte int, aligned to 4). What is sizeof(struct { char a; char b; int c; })?", 8, "a at 0, b at 1, 2 bytes padding, c at 4 to 7: 8 bytes."),
      mcq("c-sp-2", "What does malloc return when it can't allocate the memory?", [
        ["NULL", true, "Always check the result before using it."],
        ["A pointer to a zero-size block", false, "That can happen for malloc(0), not on failure."],
        ["It ends the program", false, "It returns NULL instead."],
      ], "calloc also zeroes the memory; realloc may move the block.", "foundation"),
      mcq("c-sp-3", "Using a pointer after calling free on it is:", [
        ["Undefined behaviour (a dangling pointer)", true, "The memory may be reused for something else."],
        ["Safe, if nothing else was allocated", false, "It's still undefined behaviour."],
        ["Stopped by the compiler", false, "Compilers generally can't detect it."],
      ], "A common habit: set the pointer to NULL right after freeing it."),
    ]),
  ],

  "unions-bitfields-and-dynamic-memory": [
    worked(
      "Worked example: the size of a union",
      "Assuming 4-byte ints: what is sizeof(union { int i; char c[4]; double d; }) on a platform where double is 8 bytes, aligned to 8?",
      [
        ["Members share storage", "A union is as large as its largest member, padded to the strictest alignment."],
        ["Largest member", "double d: 8 bytes."],
        ["Alignment", "8 is already a multiple of 8."],
      ],
      "8 bytes",
      "Only one member holds a meaningful value at a time; reading another member reinterprets the same bytes."
    ),
    practice([
      num("c-un-1", "Assuming 4-byte ints, what is sizeof(union { int i; char c[4]; })?", 4, "Both members are 4 bytes and they overlap.", "foundation", "bytes"),
      mcq("c-un-2", "struct { unsigned a : 3; } s; s.a = 9; What is s.a?", [
        ["1", true, "A 3-bit field stores only the value mod 8: 9 mod 8 = 1."],
        ["9", false, "9 needs 4 bits."],
        ["7", false, "That's the largest value, but there's no saturation."],
      ], "Unsigned bit-fields wrap modulo 2^width.", "tricky"),
      mcq("c-un-3", "A memory leak happens when:", [
        ["Allocated memory is no longer reachable and was never freed", true, "For example, overwriting the only pointer to a malloc'd block."],
        ["free is called twice", false, "That's a double free, which is undefined behaviour."],
        ["A local variable goes out of scope", false, "Automatic storage is reclaimed automatically."],
      ], "Every malloc needs exactly one matching free.", "foundation"),
    ]),
  ],

  "preprocessor-macros-and-conditional-compilation": [
    worked(
      "Worked example: why macros need parentheses",
      "#define SQ(x) x * x   What is SQ(2 + 3)? And with #define SQ(x) ((x) * (x))?",
      [
        ["Plain text substitution", "SQ(2 + 3) becomes 2 + 3 * 2 + 3."],
        ["Evaluate", "Multiplication first: 2 + 6 + 3.", "11"],
        ["The fixed macro", "((2 + 3) * (2 + 3)).", "25"],
      ],
      "11 with the unsafe macro, 25 with the parenthesised one",
      "Parenthesise every parameter and the whole body. Arguments with side effects, like SQ(i++), are still evaluated twice."
    ),
    practice([
      num("c-pp-1", "#define DOUBLE(x) x + x   What is 3 * DOUBLE(2)?", 8, "It expands to 3 * 2 + 2 = 6 + 2 = 8, not 12.", "tricky"),
      mcq("c-pp-2", "When are macros expanded?", [
        ["Before compilation, by the preprocessor", true, "The compiler never sees the macro names, only their expansions."],
        ["At run time", false, "Macros don't exist at run time."],
        ["During linking", false, "Linking happens after compilation."],
      ], "The order is preprocess, compile, assemble, link.", "foundation"),
      mcq("c-pp-3", "What does #ifndef HEADER_H / #define HEADER_H / … / #endif do in a header file?", [
        ["Prevents the header being included twice in one file", true, "That's an include guard."],
        ["Makes the header private", false, "It doesn't change visibility."],
        ["Speeds up running the program", false, "It only affects compilation."],
      ], "#pragma once does the same job on most compilers."),
    ]),
  ],

  "file-handling-and-format-specifiers": [
    worked(
      "Worked example: width and precision",
      "What does printf(\"[%6.2f]\", 3.14159) print?",
      [
        ["Precision", ".2 rounds to 2 decimal places.", undefined, "3.14"],
        ["Width", "6 is the minimum field width; 3.14 is 4 characters, so 2 spaces of padding go on the left."],
      ],
      "[  3.14]",
      "A '-' flag (%-6.2f) left-aligns instead; width never truncates a longer value."
    ),
    practice([
      mcq("c-fh-1", "Which fopen mode opens an existing file for both reading and writing, without truncating it?", [
        ["\"r+\"", true, "The file must already exist; its contents are kept."],
        ["\"w+\"", false, "That truncates the file, or creates it."],
        ["\"a+\"", false, "Writes always go to the end."],
        ["\"r\"", false, "That's read-only."],
      ], "r: read. w: truncate and write. a: append. A + adds the other direction.", "foundation"),
      mcq("c-fh-2", "fgets(buf, 10, fp) reads at most:", [
        ["9 characters, then adds '\\0'", true, "It reserves one byte for the terminator, and keeps the newline if one fits."],
        ["10 characters", false, "One byte is for the terminator."],
        ["One line, of any length", false, "It's bounded by the size argument."],
      ], "That bound is why fgets is safe and gets (now removed from C) was not."),
      mcq("c-fh-3", "What does printf(\"%x\", 255) print?", [
        ["ff", true, "%x prints lowercase hexadecimal."],
        ["255", false, "That's %d."],
        ["377", false, "That's %o (octal)."],
      ], "%d decimal, %o octal, %x hex, %c character, %s string, %p pointer.", "foundation"),
    ]),
  ],
};
