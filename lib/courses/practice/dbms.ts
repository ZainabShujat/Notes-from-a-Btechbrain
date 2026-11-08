import { mcq, num, practice, worked, type LessonExtras } from "./helpers";

/** DBMS lessons already had practice; this adds the missing worked examples. */
export const DBMS_EXTRAS: LessonExtras = {
  "why-dbms-exists-and-three-schema": [
    worked(
      "Worked example: which kind of data independence?",
      "A DBA (1) moves a table onto a faster disk and adds an index, then (2) splits the Customer table into two tables, while keeping a view that looks like the old one. Which kind of independence protects applications in each case?",
      [
        ["Change 1", "Only storage and access paths change; the conceptual schema stays the same.", undefined, "Physical data independence"],
        ["Change 2", "The conceptual schema changes, but the external view (what applications query) stays the same.", undefined, "Logical data independence"],
      ],
      "(1) Physical independence; (2) logical independence",
      "Logical independence is harder to achieve, because many changes to the conceptual schema do leak into the views."
    ),
  ],

  "sql-mastery-and-subqueries": [
    worked(
      "Worked example: GROUP BY with HAVING",
      "Emp(dept, salary) has rows (A, 100), (A, 200), (B, 50), (B, 70), (C, 300). What does SELECT dept, AVG(salary) FROM Emp GROUP BY dept HAVING COUNT(*) > 1 return?",
      [
        ["Group", "A: {100, 200}; B: {50, 70}; C: {300}."],
        ["Filter the groups", "HAVING keeps the groups with more than one row: A and B."],
        ["Aggregate", "AVG for A = 150; for B = 60."],
      ],
      "(A, 150) and (B, 60)",
      "WHERE filters rows before grouping; HAVING filters groups after. COUNT(*) counts rows, NULLs included."
    ),
  ],

  "transactions-and-serializability": [
    worked(
      "Worked example: test for conflict serializability",
      "Schedule: r1(A), w2(A), w1(A). Is it conflict serializable?",
      [
        ["Find conflicting pairs", "Operations from different transactions on the same item, at least one a write."],
        ["r1(A) before w2(A)", "This adds the edge T1 → T2."],
        ["w2(A) before w1(A)", "This adds the edge T2 → T1."],
        ["Precedence graph", "T1 → T2 → T1 is a cycle."],
      ],
      "Not conflict serializable",
      "No cycle in the precedence graph ⇔ conflict serializable; any topological order of the graph gives an equivalent serial schedule."
    ),
  ],

  "locking-protocols-and-recovery": [
    worked(
      "Worked example: undo/redo recovery from a log",
      "The log reads: <T1 start>, <T1, A, 10, 20>, <T1 commit>, <T2 start>, <T2, B, 5, 15>, and then the system crashes. Each update record is <T, item, old value, new value>. What does recovery do?",
      [
        ["Classify the transactions", "T1 has a commit record; T2 doesn't."],
        ["Redo T1", "Reapply its new values: A = 20."],
        ["Undo T2", "Restore its old values: B = 5."],
      ],
      "After recovery: A = 20, B = 5",
      "Write-ahead logging means the log record reaches disk before the data page, which is what makes undo possible."
    ),
  ],

  "data-warehousing-olap-schemas": [
    worked(
      "Worked example: how many cuboids?",
      "A data cube has 3 dimensions: product, region and month. How many group-by combinations (cuboids) does the full CUBE operator compute?",
      [
        ["Each dimension is in or out", "Every subset of the dimensions gives one group-by."],
        ["Count the subsets", "2³.", "8"],
        ["List them", "(), (P), (R), (M), (P, R), (P, M), (R, M), (P, R, M)."],
      ],
      "8 cuboids",
      "With concept hierarchies (for example day → month → year), the count becomes the product of (levels + 1) over the dimensions."
    ),
    practice([
      mcq("db-dw-1", "A star schema has:", [
        ["One central fact table joined to denormalised dimension tables", true, "Simple joins and fast queries."],
        ["Dimension tables split into many normalised sub-tables", false, "That's a snowflake schema."],
        ["No foreign keys", false, "The fact table holds keys to every dimension."],
      ], "A snowflake schema normalises the dimensions, saving space at the cost of more joins.", "foundation"),
      mcq("db-dw-2", "Moving from monthly sales to yearly sales is called:", [
        ["Roll-up", true, "Climbing a concept hierarchy, which aggregates the data."],
        ["Drill-down", false, "That's going from yearly to monthly."],
        ["Slice", false, "Slice fixes one dimension to a single value."],
      ], "Roll-up, drill-down, slice, dice and pivot are the core OLAP operations."),
      num("db-dw-3", "A cube has 4 dimensions and no hierarchies. How many cuboids does CUBE compute?", 16, "2⁴ = 16.", "foundation"),
    ]),
  ],
};
