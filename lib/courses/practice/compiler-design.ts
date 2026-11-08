import { mcq, num, practice, worked, type LessonExtras } from "./helpers";

export const COMPILER_DESIGN_EXTRAS: LessonExtras = {
  "lexical-analysis-tokens-buffers": [
    worked(
      "Worked example: count the tokens",
      "How many tokens does the lexer produce for:  int main() { int a = 10, b; return a + b; }",
      [
        ["Keywords and identifiers", "int, main, int, a, b, return, a, b: 8 tokens."],
        ["Punctuation and operators", "( ) { = , ; + ; }: 9 tokens."],
        ["Constants", "10: 1 token."],
        ["Total", "Whitespace isn't a token.", "8 + 9 + 1", "18"],
      ],
      "18 tokens",
      "A token is a category (identifier, keyword, number); a lexeme is the actual text matched (main, 10)."
    ),
    practice([
      mcq("cd-lx-1", "The lexer reads \"<=\". Which token does it return?", [
        ["LE (less than or equal)", true, "The longest-match rule prefers the longest lexeme that forms a token."],
        ["LT, then EQ", false, "That breaks the longest-match rule."],
        ["An error", false, "<= is a valid operator."],
      ], "Longest match first; if two patterns match the same length, the one listed first wins.", "foundation"),
      num("cd-lx-2", "How many tokens are in  x = y * 2 + z;", 8, "x, =, y, *, 2, +, z, ;: 8 tokens."),
      mcq("cd-lx-3", "Which error can the lexical analyser detect?", [
        ["An illegal character, such as @ in C code", true, "No token pattern matches it."],
        ["A missing semicolon", false, "That's a syntax error, found by the parser."],
        ["An undeclared variable", false, "That's a semantic error."],
      ], "The lexer only knows token patterns; structure and meaning come later."),
    ]),
  ],

  "regular-expressions-to-lexical-dfa": [
    worked(
      "Worked example: keywords vs identifiers",
      "A lexer has patterns for the keyword if and for identifiers [a-z][a-z0-9]*. Which token do the inputs \"if\" and \"ifx\" produce?",
      [
        ["\"if\"", "Both patterns match the same 2 characters. The tie goes to the pattern listed first: the keyword.", undefined, "IF"],
        ["\"ifx\"", "The identifier pattern matches 3 characters, longer than the keyword's 2. Longest match wins.", undefined, "ID(ifx)"],
      ],
      "\"if\" → keyword IF; \"ifx\" → identifier",
      "Real lexers often match every word as an identifier, then look it up in a keyword table."
    ),
    practice([
      mcq("cd-re-1", "Lexer generators like lex and flex turn the token patterns into:", [
        ["A DFA (through an NFA and the subset construction)", true, "The DFA is then usually minimised and stored as a table."],
        ["A PDA", false, "Token patterns are regular, so no stack is needed."],
        ["A parse tree", false, "That's the parser's output."],
      ], "Regex → NFA (Thompson) → DFA (subset construction) → minimal DFA.", "foundation"),
      mcq("cd-re-2", "Why can't a regular expression check that brackets are balanced?", [
        ["Balanced brackets need unbounded counting, which no finite automaton can do", true, "That's why nesting is handled by the parser."],
        ["Brackets are special characters in regex", false, "Escaping them doesn't help."],
        ["It can, with enough states", false, "Not for unbounded nesting depth."],
      ], "Lexing is regular; parsing is context-free."),
      num("cd-re-3", "In Thompson's construction, how many new states does the a* construction add around the NFA for a?", 2,
        "A new start state and a new accept state, joined to the inner NFA with ε-transitions.", "tricky"),
    ]),
  ],

  "first-follow-and-ll1-parsing": [
    worked(
      "Worked example: FIRST and FOLLOW",
      "For E → T E',  E' → + T E' | ε,  T → F T',  T' → * F T' | ε,  F → ( E ) | id, find FIRST(E), FOLLOW(E), FOLLOW(T) and FOLLOW(F).",
      [
        ["FIRST(F)", "F begins with ( or id.", undefined, "{ (, id }"],
        ["FIRST(T) and FIRST(E)", "T starts with F, and E starts with T.", undefined, "{ (, id }"],
        ["FOLLOW(E)", "E is the start symbol, so $; and E appears inside ( E ).", undefined, "{ ), $ }"],
        ["FOLLOW(T)", "FIRST(E') minus ε, which is +; and since E' can vanish, everything in FOLLOW(E).", undefined, "{ +, ), $ }"],
        ["FOLLOW(F)", "FIRST(T') minus ε, which is *; and since T' can vanish, FOLLOW(T).", undefined, "{ *, +, ), $ }"],
      ],
      "FIRST(E) = { (, id }; FOLLOW(E) = { ), $ }; FOLLOW(T) = { +, ), $ }; FOLLOW(F) = { *, +, ), $ }",
      "FOLLOW sets never contain ε. Add FOLLOW(A) to FOLLOW(B) whenever B is at the end of an A rule, or followed by something that can vanish."
    ),
    practice([
      mcq("cd-ff-1", "In the grammar above, what is FIRST(E')?", [
        ["{ +, ε }", true, "E' either starts with + or derives ε."],
        ["{ + }", false, "E' → ε adds ε."],
        ["{ +, ), $ }", false, "That's FOLLOW(T) territory, not FIRST."],
      ], "FIRST includes ε exactly when the symbol can derive the empty string.", "foundation"),
      mcq("cd-ff-2", "In the same grammar, what is FOLLOW(E')?", [
        ["{ ), $ }", true, "E' always ends an E rule, so FOLLOW(E') = FOLLOW(E)."],
        ["{ +, ), $ }", false, "+ is in FIRST(E'), not FOLLOW(E')."],
        ["{ $ }", false, "E also appears inside parentheses."],
      ], "A variable at the right end of a rule inherits the FOLLOW set of the rule's left side."),
      mcq("cd-ff-3", "A grammar with left recursion, such as E → E + T | T, is:", [
        ["Never LL(1)", true, "A top-down parser would expand E forever; FIRST sets of the two alternatives overlap."],
        ["Always LL(1)", false, "Left recursion rules LL(1) out."],
        ["LL(1) if it's unambiguous", false, "Unambiguous left-recursive grammars still aren't LL(1)."],
      ], "Remove left recursion (as in the E' grammar above) before building an LL(1) table."),
    ]),
  ],

  "ll1-predictive-parsing-tables": [
    worked(
      "Worked example: is this grammar LL(1)?",
      "Is S → a S b | ε LL(1)?",
      [
        ["FIRST of each alternative", "FIRST(a S b) = { a }. FIRST(ε) = { ε }."],
        ["FOLLOW(S)", "S is the start symbol, so $; and it appears before b.", undefined, "{ b, $ }"],
        ["The LL(1) condition", "For S → ε, the lookahead set is FOLLOW(S) = { b, $ }. It must not overlap { a }."],
        ["Check", "{ a } ∩ { b, $ } = ∅: no table cell has two entries."],
      ],
      "Yes, it's LL(1)",
      "LL(1): for each pair of alternatives, FIRST sets are disjoint; when one can derive ε, FIRST of the other must not meet FOLLOW."
    ),
    practice([
      mcq("cd-ll-1", "For S → a A | a B, is the grammar LL(1)?", [
        ["No: both alternatives start with a", true, "The table cell [S, a] gets two entries. Left-factoring fixes it: S → a S', S' → A | B."],
        ["Yes", false, "One symbol of lookahead can't choose between them."],
      ], "A common prefix needs left-factoring before LL(1) parsing.", "foundation"),
      mcq("cd-ll-2", "An LL(1) parser reads the input:", [
        ["Left to right, building a leftmost derivation", true, "That's what the two Ls mean; the 1 is one token of lookahead."],
        ["Right to left", false, "Both LL and LR read left to right."],
        ["Building a rightmost derivation in reverse", false, "That's LR."],
      ], "LL: top-down, leftmost derivation. LR: bottom-up, rightmost derivation in reverse."),
      mcq("cd-ll-3", "An empty cell in an LL(1) table means:", [
        ["A syntax error if the parser reaches it", true, "No rule applies for that variable and lookahead."],
        ["Use the ε-rule", false, "ε-rules have their own cells, under FOLLOW symbols."],
        ["Shift the token", false, "LL parsers don't shift; they match."],
      ], "Error recovery often fills empty cells with synchronising actions."),
    ]),
  ],

  "shift-reduce-and-lr0-items": [
    worked(
      "Worked example: LR(0) items of one rule",
      "List the LR(0) items of A → X Y Z.",
      [
        ["Place the dot", "An item is the rule with a dot showing how much of the right side has been seen."],
        ["Every position", "A → •XYZ, A → X•YZ, A → XY•Z, A → XYZ•."],
        ["Count", "A right side of length n gives n + 1 items.", "3 + 1", "4"],
      ],
      "4 items",
      "A → XYZ• is a complete item: it calls for a reduction by A → XYZ."
    ),
    practice([
      num("cd-sr-1", "How many LR(0) items does the rule A → ε have?", 1, "Only A → •, which is already complete.", "tricky"),
      mcq("cd-sr-2", "A shift-reduce conflict means:", [
        ["In some state the parser could either shift the next token or reduce by a rule", true, "The table can't decide, so the grammar isn't in that LR class."],
        ["Two different rules could be used to reduce", false, "That's a reduce-reduce conflict."],
        ["The input has a syntax error", false, "Conflicts are a property of the grammar, not the input."],
      ], "The dangling else is the classic shift-reduce conflict; yacc resolves it by shifting.", "foundation"),
      mcq("cd-sr-3", "A handle is:", [
        ["The substring matching a rule's right side whose reduction is one step of the rightmost derivation in reverse", true, "Bottom-up parsing reduces handles one at a time."],
        ["Any substring that matches some right side", false, "Reducing the wrong match can get stuck."],
        ["The start symbol", false, "That's the goal."],
      ], "Finding the handle is the whole job of an LR parser."),
    ]),
  ],

  "lr-parsing-and-conflicts": [
    worked(
      "Worked example: why SLR(1) fails",
      "S → L = R | R,  L → * R | id,  R → L. Why does an SLR(1) table get a conflict?",
      [
        ["The problem state", "After reading an L, a state holds S → L • = R and R → L •."],
        ["SLR's rule", "Reduce R → L on every token in FOLLOW(R). Since S → L = R and R → L, = is in FOLLOW(R)."],
        ["The conflict", "On =, the parser can shift (for S → L • = R) or reduce (R → L). It's a shift-reduce conflict."],
        ["What LALR does", "With exact lookaheads, R → L • in this state can only be followed by $, so there's no conflict."],
      ],
      "Not SLR(1), but LALR(1)",
      "SLR uses whole FOLLOW sets, which are too coarse here. LALR and CLR track which tokens can really follow in each state."
    ),
    practice([
      mcq("cd-lr-1", "Which LR method recognises the most grammars?", [
        ["Canonical LR(1)", true, "LR(0) ⊂ SLR(1) ⊂ LALR(1) ⊂ CLR(1)."],
        ["SLR(1)", false, "It's weaker than LALR(1)."],
        ["LR(0)", false, "That's the weakest."],
      ], "More power costs more states: CLR(1) tables can be much larger.", "foundation"),
      mcq("cd-lr-2", "Can an LR(0) parser handle the grammar S → a | a b?", [
        ["No: after a, it can't decide between reducing S → a and shifting b", true, "LR(0) reduces without lookahead, so a complete item plus a shift item conflict."],
        ["Yes", false, "LR(0) can't look ahead to see the b."],
      ], "Adding one token of lookahead (SLR) fixes it: reduce only on $."),
      mcq("cd-lr-3", "Every LL(1) grammar is also:", [
        ["LR(1)", true, "LR(1) is strictly more powerful than LL(1)."],
        ["LR(0)", false, "Some LL(1) grammars have ε-rules that LR(0) can't handle."],
        ["Ambiguous", false, "LL(1) grammars are never ambiguous."],
      ], "LL(1) ⊂ LR(1); no ambiguous grammar is LL(k) or LR(k).", "tricky"),
    ]),
  ],

  "clr1-lalr1-parsing-state-merging": [
    worked(
      "Worked example: what merging states can break",
      "LALR(1) merges CLR(1) states that have the same core (the same items, ignoring lookaheads). Which conflicts can merging create?",
      [
        ["Shift-reduce", "A shift doesn't depend on lookaheads, and the reductions' lookaheads come from states that each had no conflict. Merging can't create a shift-reduce conflict."],
        ["Reduce-reduce", "Two states could each reduce different rules on different tokens. Merged, both reductions can end up on the same token."],
      ],
      "Only reduce-reduce conflicts, never shift-reduce",
      "LALR(1) has the same number of states as SLR(1) and LR(0), far fewer than CLR(1)."
    ),
    practice([
      mcq("cd-la-1", "Compared with the LR(0) automaton, how many states does an LALR(1) parser have?", [
        ["The same number", true, "LALR(1) merges CLR(1) states down to the LR(0) cores."],
        ["More", false, "That's CLR(1)."],
        ["Fewer", false, "It's exactly the same set of cores."],
      ], "yacc and bison build LALR(1) parsers for this reason.", "foundation"),
      mcq("cd-la-2", "A grammar is CLR(1) and merging its states gives a conflict. That conflict is:", [
        ["Reduce-reduce", true, "Merging can't create shift-reduce conflicts."],
        ["Shift-reduce", false, "It's impossible."],
        ["Either kind", false, "Only reduce-reduce."],
      ], "So a grammar can be CLR(1) but not LALR(1).", "tricky"),
      mcq("cd-la-3", "An LR(1) item [A → α • β, a] means:", [
        ["α has been seen, β is still expected, and a may follow A", true, "The lookahead a matters only when the item is complete."],
        ["The next input symbol must be a", false, "Only when reducing."],
        ["A will be reduced right now", false, "Only when β is empty."],
      ], "Lookaheads in LR(1) items are exact, unlike SLR's FOLLOW sets."),
    ]),
  ],

  "sdt-and-code-optimization": [
    worked(
      "Worked example: infix to postfix with an SDT",
      "The rules E → E + T { print('+') },  E → T,  T → T * F { print('*') },  T → F,  F → num { print(num) } parse 2 + 3 * 4. What is printed?",
      [
        ["Actions run at reductions", "Each print happens when its rule is reduced, bottom-up."],
        ["2", "F → 2 reduces first: print 2."],
        ["3 and 4", "F → 3 prints 3, F → 4 prints 4, then T → T * F prints *."],
        ["The +", "Finally E → E + T prints +."],
      ],
      "2 3 4 * +",
      "Actions at the end of a rule run in postorder, which is why this scheme produces postfix."
    ),
    practice([
      mcq("cd-sd-1", "An S-attributed definition uses:", [
        ["Only synthesised attributes", true, "Values flow up from children, so one bottom-up pass works."],
        ["Only inherited attributes", false, "That's not the definition."],
        ["Attributes in any order", false, "That might not be computable at all."],
      ], "Every S-attributed definition is also L-attributed.", "foundation"),
      mcq("cd-sd-2", "Replacing x = 3 * 4 with x = 12 at compile time is:", [
        ["Constant folding", true, "Expressions with constant operands are evaluated by the compiler."],
        ["Dead code elimination", false, "That removes unused code."],
        ["Loop-invariant code motion", false, "That moves code out of loops."],
      ], "Constant propagation then substitutes known values into later uses."),
      mcq("cd-sd-3", "Strength reduction replaces:", [
        ["An expensive operation with a cheaper one, like i * 4 with repeated addition", true, "This is most common for induction variables in loops."],
        ["A variable with a constant", false, "That's constant propagation."],
        ["A loop with recursion", false, "No."],
      ], "For example, x * 2 can become x + x, or x << 1."),
    ]),
  ],

  "intermediate-code-generation-tac-ssa": [
    worked(
      "Worked example: three-address code, then a DAG",
      "Write three-address code for a = b * -c + b * -c, then simplify it using a DAG.",
      [
        ["Plain TAC", "t1 = -c; t2 = b * t1; t3 = -c; t4 = b * t3; t5 = t2 + t4; a = t5.", undefined, "6 statements"],
        ["Spot the repeats", "-c and b * -c are each computed twice."],
        ["With a DAG", "Each subexpression becomes one node: t1 = -c; t2 = b * t1; t3 = t2 + t2; a = t3.", undefined, "4 statements"],
      ],
      "6 statements plainly, 4 after common-subexpression elimination",
      "A DAG for a basic block shares identical subexpressions automatically."
    ),
    practice([
      mcq("cd-ic-1", "Quadruples and triples differ because:", [
        ["Triples refer to results by their position, so moving statements breaks references", true, "Quadruples name a result field, so they're easy to reorder."],
        ["Triples have more fields", false, "Triples have three, quadruples four."],
        ["Quadruples can't express assignments", false, "They can."],
      ], "Indirect triples add a list of pointers, so statements can be reordered.", "foundation"),
      mcq("cd-ic-2", "In SSA form:", [
        ["Every variable is assigned exactly once, with φ-functions where control paths meet", true, "This makes many optimisations simpler."],
        ["Variables are never reassigned in the source", false, "SSA is a compiler representation, not a source rule."],
        ["There are no temporaries", false, "SSA has many versioned names."],
      ], "x = 1 in one branch and x = 2 in the other become x1 and x2, joined by x3 = φ(x1, x2)."),
      num("cd-ic-3", "How many three-address statements does x = (a + b) * (a + b) need with common-subexpression elimination?", 2,
        "t1 = a + b; x = t1 * t1."),
    ]),
  ],

  "basic-blocks-cfg-dag-optimizations": [
    worked(
      "Worked example: find the basic blocks",
      "Code:  (1) i = 1  (2) t = i * 4  (3) a[t] = 0  (4) i = i + 1  (5) if i <= 10 goto (2)  (6) x = 5. Split it into basic blocks.",
      [
        ["Leader rules", "The first statement, any jump target, and any statement right after a jump are leaders."],
        ["Leaders here", "(1) is the first; (2) is a jump target; (6) follows a jump.", undefined, "1, 2, 6"],
        ["Blocks", "Each runs from a leader up to the next leader.", undefined, "B1 = {1}, B2 = {2–5}, B3 = {6}"],
        ["Control flow", "B1 → B2; B2 → B2 (the loop); B2 → B3."],
      ],
      "3 basic blocks",
      "Within a basic block, control enters only at the top and leaves only at the bottom, which is what makes local optimisation safe."
    ),
    practice([
      mcq("cd-bb-1", "In a control-flow graph, a back edge usually means:", [
        ["A loop", true, "An edge to a block that dominates its source forms a natural loop."],
        ["Dead code", false, "Dead code is unreachable."],
        ["A function call", false, "Calls aren't CFG edges within a function."],
      ], "Loop optimisations start by finding back edges.", "foundation"),
      mcq("cd-bb-2", "Liveness analysis tells you:", [
        ["Which variables may still be read before being overwritten", true, "That drives register allocation and dead-store removal."],
        ["Which statements can never run", false, "That's reachability."],
        ["Which expressions have known constant values", false, "That's constant propagation."],
      ], "Liveness is a backward data-flow analysis; reaching definitions is a forward one."),
      num("cd-bb-3", "Code: (1) a = 1 (2) if a > 0 goto (4) (3) b = 2 (4) c = 3. How many basic blocks does it have?", 3,
        "The leaders are (1) as the first statement, (3) after the jump, and (4) as its target: blocks {1, 2}, {3}, {4}."),
    ]),
  ],
};
