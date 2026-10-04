"use client";

import React, { useState } from "react";

interface ExamSqlProblem {
  id: string;
  title: string;
  examQuestion: string;
  universityFrequency: string;
  difficulty: "Foundation" | "Intermediate" | "Advanced GATE";
  targetAttributes: string[];
  tablesInvolved: string[];
  stepAnalysis: {
    step1_decomposition: {
      summary: string;
      outputColumns: string;
      sourceTables: string;
      studentTakeaway: string;
    };
    step2_scope: {
      summary: string;
      filterType: "WHERE" | "HAVING" | "Correlated Subquery" | "Division / NOT EXISTS" | "Self-Join";
      whyFilter: string;
      commonTrap: string;
    };
    step3_innerQuery: {
      summary: string;
      innerSql: string;
      correlationExplanation: string;
    };
    step4_assembly: {
      finalSql: string;
      explanationLines: { clause: string; purpose: string }[];
    };
    step5_trace: {
      sampleDataDescription: string;
      inputRows: {
        id: string;
        name: string;
        dept: string;
        val: number;
        comparisonMetric: string;
        evaluatesTo: boolean;
        reason: string;
      }[];
      finalResultHeaders: string[];
      finalResultRows: string[][];
    };
  };
}

const EXAM_SQL_PROBLEMS: ExamSqlProblem[] = [
  // ── PROBLEM 1: CORRELATED SUBQUERY ──────────────────────────────────────
  {
    id: "correlated-dept-avg",
    title: "1. Employees Earning More Than Their Department's Average",
    examQuestion:
      "Write an SQL query to find the employee name, department ID, and salary of all employees who earn strictly more than the average salary of their own department.",
    universityFrequency: "Asked in 90% of University DBMS Semester Exams & Technical Interviews",
    difficulty: "Intermediate",
    targetAttributes: ["emp_name", "dept_id", "salary"],
    tablesInvolved: ["Employee (emp_id, emp_name, dept_id, salary)"],
    stepAnalysis: {
      step1_decomposition: {
        summary: "Identify the requested output columns and source relations.",
        outputColumns: "SELECT emp_name, dept_id, salary",
        sourceTables: "Single table: Employee (aliased as E1 for outer query)",
        studentTakeaway:
          "✎ When an exam question says 'more than the average of THEIR OWN department', each employee must be compared against a different calculated value. This signals a Correlated Subquery!",
      },
      step2_scope: {
        summary: "Determine where the filtering happens: WHERE vs HAVING vs Subquery.",
        filterType: "Correlated Subquery",
        whyFilter:
          "We cannot write 'WHERE salary > AVG(salary)' because aggregate functions cannot appear directly in a WHERE clause! Furthermore, the average depends on the employee's specific department.",
        commonTrap:
          "FATAL EXAM ERROR: Writing 'SELECT emp_name FROM Employee WHERE salary > AVG(salary) GROUP BY dept_id'. In standard SQL, you cannot select unaggregated columns like emp_name alongside GROUP BY without grouping by them!",
      },
      step3_innerQuery: {
        summary: "Construct the inner department average query.",
        innerSql: "SELECT AVG(E2.salary) FROM Employee E2 WHERE E2.dept_id = E1.dept_id",
        correlationExplanation:
          "Notice 'WHERE E2.dept_id = E1.dept_id'. The inner subquery is parameterized by the outer employee's department ID (E1.dept_id). For every outer row E1, the inner query computes the average of only that employee's peers.",
      },
      step4_assembly: {
        finalSql: `SELECT E1.emp_name, E1.dept_id, E1.salary
FROM Employee E1
WHERE E1.salary > (
    SELECT AVG(E2.salary)
    FROM Employee E2
    WHERE E2.dept_id = E1.dept_id
);`,
        explanationLines: [
          { clause: "FROM Employee E1", purpose: "Alias outer table so inner query can refer to E1's current row." },
          { clause: "WHERE E1.salary > (...)", purpose: "Row predicate comparing outer employee's salary to subquery result." },
          { clause: "SELECT AVG(E2.salary)", purpose: "Calculates the average salary for the matched department." },
          { clause: "WHERE E2.dept_id = E1.dept_id", purpose: "The correlation wire: binds inner search to outer employee's dept." },
          { clause: "SELECT E1.emp_name, ...", purpose: "Projects the requested columns only for rows where predicate is TRUE." },
        ],
      },
      step5_trace: {
        sampleDataDescription:
          "Sample table Employee with 5 rows across Dept 10 (Engineering, avg $75k) and Dept 20 (Marketing, avg $71k).",
        inputRows: [
          {
            id: "E101",
            name: "Alice",
            dept: "10 (Eng)",
            val: 85000,
            comparisonMetric: "Dept 10 Avg = $75,000",
            evaluatesTo: true,
            reason: "$85,000 > $75,000 is TRUE → Alice is KEPT",
          },
          {
            id: "E102",
            name: "Bob",
            dept: "10 (Eng)",
            val: 65000,
            comparisonMetric: "Dept 10 Avg = $75,000",
            evaluatesTo: false,
            reason: "$65,000 > $75,000 is FALSE → Bob is DROPPED",
          },
          {
            id: "E103",
            name: "Charlie",
            dept: "10 (Eng)",
            val: 75000,
            comparisonMetric: "Dept 10 Avg = $75,000",
            evaluatesTo: false,
            reason: "$75,000 > $75,000 is strictly FALSE → Charlie is DROPPED",
          },
          {
            id: "E104",
            name: "Diana",
            dept: "20 (Mkt)",
            val: 92000,
            comparisonMetric: "Dept 20 Avg = $71,000",
            evaluatesTo: true,
            reason: "$92,000 > $71,000 is TRUE → Diana is KEPT",
          },
          {
            id: "E105",
            name: "Evan",
            dept: "20 (Mkt)",
            val: 50000,
            comparisonMetric: "Dept 20 Avg = $71,000",
            evaluatesTo: false,
            reason: "$50,000 > $71,000 is FALSE → Evan is DROPPED",
          },
        ],
        finalResultHeaders: ["emp_name", "dept_id", "salary"],
        finalResultRows: [
          ["Alice", "10", "$85,000"],
          ["Diana", "20", "$92,000"],
        ],
      },
    },
  },

  // ── PROBLEM 2: N-TH HIGHEST SALARY WITHOUT LIMIT ──────────────────────────
  {
    id: "second-highest-salary",
    title: "2. Second Highest Salary (Without LIMIT / TOP)",
    examQuestion:
      "Write an ANSI SQL query to find the second highest salary from the Employee table without using vendor-specific syntax like LIMIT, OFFSET, or TOP.",
    universityFrequency: "Classic GATE CS Question & Universal Viva / Exam Problem",
    difficulty: "Foundation",
    targetAttributes: ["MAX(salary)"],
    tablesInvolved: ["Employee (salary)"],
    stepAnalysis: {
      step1_decomposition: {
        summary: "Translate 'Second Highest' into relational mathematics.",
        outputColumns: "SELECT MAX(salary)",
        sourceTables: "Employee",
        studentTakeaway:
          "✎ In relational theory, the second highest value is simply the MAXIMUM value among all values that are strictly less than the overall maximum!",
      },
      step2_scope: {
        summary: "Identify the mathematical constraint.",
        filterType: "WHERE",
        whyFilter:
          "Overall Max = MAX(salary). The 2nd highest is MAX(salary) WHERE salary < (Overall Max).",
        commonTrap:
          "Using 'ORDER BY salary DESC LIMIT 1 OFFSET 1'. LIMIT is not standard SQL in Oracle/MSSQL/DB2 and receives zero marks in university theory papers!",
      },
      step3_innerQuery: {
        summary: "Find the absolute highest salary.",
        innerSql: "SELECT MAX(salary) FROM Employee",
        correlationExplanation:
          "This is an Uncorrelated subquery. It computes the single scalar maximum salary across the entire company once.",
      },
      step4_assembly: {
        finalSql: `SELECT MAX(salary) AS second_highest_salary
FROM Employee
WHERE salary < (
    SELECT MAX(salary)
    FROM Employee
);`,
        explanationLines: [
          { clause: "SELECT MAX(salary)", purpose: "Finds the peak salary among the filtered subset." },
          { clause: "WHERE salary < (...)", purpose: "Excludes the true highest salary from consideration." },
          { clause: "SELECT MAX(salary) FROM Employee", purpose: "The inner query calculates the absolute company-wide maximum." },
        ],
      },
      step5_trace: {
        sampleDataDescription: "Sample salaries: [95000, 95000, 80000, 70000, 50000].",
        inputRows: [
          {
            id: "1",
            name: "CEO",
            dept: "Exec",
            val: 95000,
            comparisonMetric: "Max = $95,000",
            evaluatesTo: false,
            reason: "$95,000 < $95,000 is FALSE (Highest excluded)",
          },
          {
            id: "2",
            name: "VP",
            dept: "Exec",
            val: 95000,
            comparisonMetric: "Max = $95,000",
            evaluatesTo: false,
            reason: "Duplicate highest salary also safely excluded",
          },
          {
            id: "3",
            name: "Director",
            dept: "Tech",
            val: 80000,
            comparisonMetric: "Max = $95,000",
            evaluatesTo: true,
            reason: "$80,000 < $95,000 is TRUE → Candidate for 2nd highest",
          },
          {
            id: "4",
            name: "Lead",
            dept: "Tech",
            val: 70000,
            comparisonMetric: "Max = $95,000",
            evaluatesTo: true,
            reason: "$70,000 < $95,000 is TRUE",
          },
        ],
        finalResultHeaders: ["second_highest_salary"],
        finalResultRows: [["$80,000"]],
      },
    },
  },

  // ── PROBLEM 3: DIVISION / UNIVERSAL QUANTIFICATION ────────────────────────
  {
    id: "division-all-courses",
    title: "3. Relational Division: Students Enrolled in ALL Courses",
    examQuestion:
      "Find the student ID and name of all students who have enrolled in EVERY course offered by the Computer Science department.",
    universityFrequency: "GATE CS Classical Hard Question & Final Exam Distinction Problem",
    difficulty: "Advanced GATE",
    targetAttributes: ["S.student_id", "S.student_name"],
    tablesInvolved: [
      "Student S (student_id, student_name)",
      "Course C (course_id, dept)",
      "Enrollment E (student_id, course_id)",
    ],
    stepAnalysis: {
      step1_decomposition: {
        summary: "Understand Universal Quantification (∀) in SQL.",
        outputColumns: "SELECT S.student_id, S.student_name FROM Student S",
        sourceTables: "Student S, Course C, Enrollment E",
        studentTakeaway:
          "✎ SQL has no FOR ALL operator! In first-order logic: 'Student S is enrolled in ALL CS courses' is equivalent to 'There DOES NOT EXIST a CS course in which Student S is NOT enrolled' (Double Negation).",
      },
      step2_scope: {
        summary: "Translate ∀ into NOT EXISTS ... NOT EXISTS.",
        filterType: "Division / NOT EXISTS",
        whyFilter:
          "Double negation: (∀ x P(x)) ≡ ¬(∃ x ¬P(x)). We check that there is NO course in CS where NO enrollment record exists for this student.",
        commonTrap:
          "Trying to count courses with 'COUNT(*) = 5'. If CS department adds a new course tomorrow, a hardcoded count query breaks immediately!",
      },
      step3_innerQuery: {
        summary: "Formulate the negative correlation.",
        innerSql: `NOT EXISTS (
    SELECT * FROM Course C
    WHERE C.dept = 'CS'
    AND NOT EXISTS (
        SELECT * FROM Enrollment E
        WHERE E.student_id = S.student_id
          AND E.course_id = C.course_id
    )
)`,
        correlationExplanation:
          "The innermost query tests if student S took course C. The middle query finds CS courses the student missed. The outer query picks students who missed ZERO courses.",
      },
      step4_assembly: {
        finalSql: `SELECT S.student_id, S.student_name
FROM Student S
WHERE NOT EXISTS (
    -- Find CS courses that this student did NOT enroll in
    SELECT C.course_id
    FROM Course C
    WHERE C.dept = 'CS'
      AND NOT EXISTS (
          SELECT 1
          FROM Enrollment E
          WHERE E.student_id = S.student_id
            AND E.course_id = C.course_id
      )
);`,
        explanationLines: [
          { clause: "FROM Student S", purpose: "Iterate through each candidate student." },
          { clause: "WHERE NOT EXISTS (...)", purpose: "Keep student only if the subquery returns zero rows (no missing courses)." },
          { clause: "FROM Course C WHERE dept = 'CS'", purpose: "Identify all required courses to be checked." },
          { clause: "AND NOT EXISTS (Enrollment E)", purpose: "Check whether this student is missing this particular course." },
        ],
      },
      step5_trace: {
        sampleDataDescription: "CS Department offers 2 required courses: CS101 and CS102.",
        inputRows: [
          {
            id: "S1",
            name: "John",
            dept: "Takes CS101, CS102",
            val: 2,
            comparisonMetric: "Missing CS Courses: 0",
            evaluatesTo: true,
            reason: "Missing courses query is EMPTY → NOT EXISTS evaluates to TRUE (KEPT)",
          },
          {
            id: "S2",
            name: "Emma",
            dept: "Takes only CS101",
            val: 1,
            comparisonMetric: "Missing CS Courses: 1 (CS102)",
            evaluatesTo: false,
            reason: "Missing courses query returns {CS102} → NOT EXISTS evaluates to FALSE (DROPPED)",
          },
        ],
        finalResultHeaders: ["student_id", "student_name"],
        finalResultRows: [["S1", "John"]],
      },
    },
  },

  // ── PROBLEM 4: GROUP BY vs HAVING ─────────────────────────────────────────
  {
    id: "group-by-having-filter",
    title: "4. Department Salaries: WHERE vs GROUP BY vs HAVING",
    examQuestion:
      "Find the department ID, employee count, and average salary for all departments that have strictly more than 2 employees with an average salary exceeding $60,000, sorted by department ID.",
    universityFrequency: "University Mid-Term & End-Term Essential Question",
    difficulty: "Foundation",
    targetAttributes: ["dept_id", "COUNT(*)", "AVG(salary)"],
    tablesInvolved: ["Employee (dept_id, salary)"],
    stepAnalysis: {
      step1_decomposition: {
        summary: "Identify group aggregates and projections.",
        outputColumns: "SELECT dept_id, COUNT(*) AS emp_count, ROUND(AVG(salary), 2) AS avg_salary",
        sourceTables: "Employee",
        studentTakeaway:
          "✎ Grouping problem: whenever results must be summarized 'per department', you must use GROUP BY dept_id.",
      },
      step2_scope: {
        summary: "Decide WHERE vs HAVING for filtering.",
        filterType: "HAVING",
        whyFilter:
          "Both conditions ('more than 2 employees' and 'average salary > 60000') apply to the ENTIRE DEPARTMENT GROUP, not to individual employees! Conditions on group aggregates MUST go into HAVING, never WHERE.",
        commonTrap:
          "Putting 'WHERE COUNT(*) > 2'. WHERE filters individual tuples before grouping exists. Aggregate functions are forbidden in WHERE!",
      },
      step3_innerQuery: {
        summary: "No subquery needed; standard grouping pipeline.",
        innerSql: "GROUP BY dept_id HAVING COUNT(*) > 2 AND AVG(salary) > 60000",
        correlationExplanation:
          "HAVING acts like a second WHERE clause that executes strictly AFTER the GROUP BY has bucketed rows into departmental sets.",
      },
      step4_assembly: {
        finalSql: `SELECT 
    dept_id, 
    COUNT(*) AS emp_count, 
    ROUND(AVG(salary), 2) AS avg_salary
FROM Employee
GROUP BY dept_id
HAVING COUNT(*) > 2 
   AND AVG(salary) > 60000
ORDER BY dept_id ASC;`,
        explanationLines: [
          { clause: "FROM Employee", purpose: "Step 1: Load employee records." },
          { clause: "GROUP BY dept_id", purpose: "Step 2: Partition rows into separate buckets per department ID." },
          { clause: "HAVING COUNT(*) > 2 AND AVG(salary) > 60000", purpose: "Step 3: Discard departments failing the group thresholds." },
          { clause: "SELECT dept_id, COUNT(*), AVG(salary)", purpose: "Step 4: Compute final projection." },
          { clause: "ORDER BY dept_id ASC", purpose: "Step 5: Sort final surviving groups." },
        ],
      },
      step5_trace: {
        sampleDataDescription: "Evaluating 3 departments: Dept 10 (3 staff), Dept 20 (4 staff), Dept 30 (2 staff).",
        inputRows: [
          {
            id: "D10",
            name: "Engineering",
            dept: "Dept 10",
            val: 75000,
            comparisonMetric: "Count = 3, Avg = $75,000",
            evaluatesTo: true,
            reason: "Count(3) > 2 AND Avg($75k) > $60k → TRUE (KEPT)",
          },
          {
            id: "D20",
            name: "Operations",
            dept: "Dept 20",
            val: 45000,
            comparisonMetric: "Count = 4, Avg = $45,000",
            evaluatesTo: false,
            reason: "Count(4) > 2 is TRUE, but Avg($45k) > $60k is FALSE → DROPPED",
          },
          {
            id: "D30",
            name: "Research",
            dept: "Dept 30",
            val: 85000,
            comparisonMetric: "Count = 2, Avg = $85,000",
            evaluatesTo: false,
            reason: "Avg($85k) > $60k is TRUE, but Count(2) > 2 is FALSE → DROPPED",
          },
        ],
        finalResultHeaders: ["dept_id", "emp_count", "avg_salary"],
        finalResultRows: [["10", "3", "$75,000.00"]],
      },
    },
  },
];

export default function QuestionToSQLStudio() {
  const [selectedProblemIndex, setSelectedProblemIndex] = useState<number>(0);
  const [activeStepTab, setActiveStepTab] = useState<number>(1); // 1 to 5
  const [activeOrderClause, setActiveOrderClause] = useState<string>("FROM");

  const problem = EXAM_SQL_PROBLEMS[selectedProblemIndex];
  const steps = problem.stepAnalysis;

  const handleNextStep = () => {
    if (activeStepTab < 5) setActiveStepTab(activeStepTab + 1);
  };

  const handlePrevStep = () => {
    if (activeStepTab > 1) setActiveStepTab(activeStepTab - 1);
  };

  const handleReset = () => {
    setActiveStepTab(1);
  };

  return (
    <div className="w-full my-10 border border-[#e2d9cc] bg-[#faf7f2] shadow-sm overflow-hidden font-sans shape-octagon">
      {/* ── TOP HEADER ── */}
      <div className="p-4 sm:p-6 border-b border-[#e2d9cc] bg-[#f5ede0]/60 flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 bg-violet-700 text-white font-mono text-[10px] font-bold uppercase tracking-wider shape-octagon-sm">
              EXAM STUDIO
            </span>
            <span className="font-mono text-xs text-[#64748b]">
              Question-to-SQL Systematic Translation Flow
            </span>
          </div>
          <h3 className="font-handwriting text-2xl sm:text-3xl font-bold text-[#1e1b4b]">
            Translating University Exam Questions into Production SQL
          </h3>
          <p className="text-xs text-[#475569] max-w-[70ch]">
            In university exams, professors test your ability to decompose natural language problem statements into logical relational algebra pipelines. Follow this 5-step heuristic to never lose marks.
          </p>
        </div>

        {/* Problem Selector */}
        <div className="w-full sm:w-auto">
          <label htmlFor="problem-picker" className="block text-[11px] font-mono text-[#64748b] mb-1">
            Select Exam Question:
          </label>
          <select
            id="problem-picker"
            value={selectedProblemIndex}
            onChange={(e) => {
              setSelectedProblemIndex(Number(e.target.value));
              setActiveStepTab(1);
            }}
            className="w-full sm:w-auto px-3.5 py-2 border border-[#d6cfbe] bg-white text-[#1e1b4b] font-mono text-xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent shape-octagon-sm"
          >
            {EXAM_SQL_PROBLEMS.map((p, idx) => (
              <option key={p.id} value={idx}>
                {p.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ── ACTIVE EXAM QUESTION BANNER ── */}
      <div className="p-4 sm:p-5 bg-white border-b border-[#e2d9cc] space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="font-mono text-[11px] font-bold text-violet-700 uppercase tracking-wider">
            Exam Problem Statement
          </span>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 bg-amber-500/15 border border-amber-500/30 text-amber-900 font-mono text-[10px] font-semibold shape-octagon-sm">
              {problem.universityFrequency}
            </span>
            <span className="px-2.5 py-1 bg-[#f5ede0] border border-[#d6cfbe] text-[#334155] font-mono text-[10px] shape-octagon-sm">
              {problem.difficulty}
            </span>
          </div>
        </div>
        <p className="font-serif italic text-base sm:text-lg text-[#1e1b4b] leading-relaxed pl-3 border-l-2 border-violet-600">
          &ldquo;{problem.examQuestion}&rdquo;
        </p>
      </div>

      {/* ── STEP-BY-STEP TRANSLATION CONTROLLER ── */}
      <div className="px-4 sm:px-6 py-3 border-b border-[#e2d9cc] bg-[#f5ede0]/40 flex flex-wrap items-center justify-between gap-3">
        {/* Navigation buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleReset}
            className="px-3 py-1.5 border border-[#d6cfbe] bg-white hover:bg-black/5 text-[#1e1b4b] font-mono text-xs flex items-center gap-1 cursor-pointer shape-octagon-sm"
          >
            <span>⏮</span>
            <span className="hidden sm:inline">Reset</span>
          </button>
          <button
            type="button"
            onClick={handlePrevStep}
            disabled={activeStepTab <= 1}
            className="px-3 py-1.5 border border-[#d6cfbe] bg-white hover:bg-black/5 text-[#1e1b4b] disabled:opacity-40 font-mono text-xs flex items-center gap-1 cursor-pointer shape-octagon-sm"
          >
            <span>◀</span>
            <span>Prev Step</span>
          </button>
          <button
            type="button"
            onClick={handleNextStep}
            disabled={activeStepTab >= 5}
            className="px-3.5 py-1.5 bg-violet-700 hover:bg-violet-800 text-white font-mono text-xs font-bold flex items-center gap-1 cursor-pointer shadow-sm shape-octagon-sm"
          >
            <span>Next Step</span>
            <span>▶</span>
          </button>
        </div>

        {/* 5-Step Process Indicator Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1">
          {[
            { num: 1, label: "1. Deconstruct" },
            { num: 2, label: "2. Scope & Filter" },
            { num: 3, label: "3. Inner Logic" },
            { num: 4, label: "4. Assemble SQL" },
            { num: 5, label: "5. Data Trace" },
          ].map((s) => (
            <button
              key={s.num}
              type="button"
              onClick={() => setActiveStepTab(s.num)}
              className={`px-3 py-1 text-xs font-mono font-semibold transition-all cursor-pointer whitespace-nowrap shape-octagon-sm ${
                activeStepTab === s.num
                  ? "bg-violet-700 text-white shadow-sm ring-1 ring-violet-400"
                  : activeStepTab > s.num
                  ? "bg-emerald-500/15 text-emerald-800 border border-emerald-500/30"
                  : "bg-white border border-[#d6cfbe] text-[#475569] hover:text-[#1e1b4b]"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── STEP CONTENT AREA ── */}
      <div className="p-5 sm:p-7 min-h-[280px]">
        {/* STEP 1: DECONSTRUCTION */}
        {activeStepTab === 1 && (
          <div className="space-y-4 animate-fadeIn">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-accent uppercase">
                Step 1: Entity &amp; Output Attribute Extraction
              </span>
            </div>
            <p className="text-sm text-ink-2 leading-relaxed">
              {steps.step1_decomposition.summary}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-md bg-surface-1 border border-hairline space-y-2">
                <span className="text-[11px] font-mono font-bold text-ink-3 uppercase">
                  Target Projection (What will SELECT output?)
                </span>
                <p className="font-mono text-sm font-bold text-accent">
                  {steps.step1_decomposition.outputColumns}
                </p>
              </div>

              <div className="p-4 rounded-md bg-surface-1 border border-hairline space-y-2">
                <span className="text-[11px] font-mono font-bold text-ink-3 uppercase">
                  Candidate Data Sources (FROM Clause)
                </span>
                <p className="font-mono text-xs text-ink-1">
                  {steps.step1_decomposition.sourceTables}
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded bg-violet-500/10 dark:bg-violet-500/15 border border-violet-500/30 text-ink-1 font-handwriting text-base sm:text-lg">
              {steps.step1_decomposition.studentTakeaway}
            </div>
          </div>
        )}

        {/* STEP 2: SCOPE & FILTERING ANALYSIS */}
        {activeStepTab === 2 && (
          <div className="space-y-4 animate-fadeIn">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-accent uppercase">
                Step 2: Filtering Heuristic &mdash; WHERE vs HAVING vs Subquery
              </span>
            </div>
            <p className="text-sm text-ink-2 leading-relaxed">
              {steps.step2_scope.summary}
            </p>

            <div className="p-4 rounded-md bg-surface-1 border border-hairline space-y-2">
              <span className="text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase">
                Decision: {steps.step2_scope.filterType}
              </span>
              <p className="text-xs text-ink-2 leading-relaxed">
                {steps.step2_scope.whyFilter}
              </p>
            </div>

            <div className="p-4 rounded-md bg-rose-500/10 dark:bg-rose-500/15 border border-rose-500/30 space-y-1.5">
              <span className="font-mono font-bold text-xs text-rose-700 dark:text-rose-300 uppercase flex items-center gap-1">
                <span>⚠️ University Exam Red Flag:</span>
              </span>
              <p className="text-xs text-rose-900 dark:text-rose-200 leading-relaxed">
                {steps.step2_scope.commonTrap}
              </p>
            </div>
          </div>
        )}

        {/* STEP 3: INNER LOGIC FORMULATION */}
        {activeStepTab === 3 && (
          <div className="space-y-4 animate-fadeIn">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-accent uppercase">
                Step 3: Constructing the Inner Subquery / Group Logic
              </span>
            </div>
            <p className="text-sm text-ink-2 leading-relaxed">
              {steps.step3_innerQuery.summary}
            </p>

            <div className="p-4 rounded-md bg-[#1e1e2e] text-[#cdd6f4] font-mono text-xs sm:text-sm border border-hairline overflow-x-auto">
              <pre>{steps.step3_innerQuery.innerSql}</pre>
            </div>

            <div className="p-4 rounded-md bg-surface-1 border border-hairline space-y-1">
              <span className="font-mono text-xs font-bold text-accent uppercase">
                Why this inner logic works:
              </span>
              <p className="text-xs text-ink-2 leading-relaxed">
                {steps.step3_innerQuery.correlationExplanation}
              </p>
            </div>
          </div>
        )}

        {/* STEP 4: SQL ASSEMBLY */}
        {activeStepTab === 4 && (
          <div className="space-y-4 animate-fadeIn">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase">
                Step 4: Final Complete SQL Statement
              </span>
            </div>

            {/* Code Block */}
            <div className="p-4 sm:p-5 rounded-md bg-[#181825] text-[#cdd6f4] font-mono text-xs sm:text-sm border border-hairline overflow-x-auto shadow-inner leading-relaxed">
              <pre>{steps.step4_assembly.finalSql}</pre>
            </div>

            {/* Clause-by-clause commentary table */}
            <div className="space-y-2">
              <span className="font-mono text-xs font-bold text-ink-3 uppercase">
                Clause-by-Clause Translation Breakdown:
              </span>
              <div className="space-y-1.5 font-mono text-xs">
                {steps.step4_assembly.explanationLines.map((line, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded bg-surface-1 border border-hairline flex flex-col sm:flex-row sm:items-center justify-between gap-1"
                  >
                    <span className="font-bold text-accent shrink-0">{line.clause}</span>
                    <span className="text-ink-2 font-sans text-xs">{line.purpose}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: LIVE DATA WALKTHROUGH & ROW EVALUATION TRACE */}
        {activeStepTab === 5 && (
          <div className="space-y-5 animate-fadeIn">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-accent uppercase">
                Step 5: Execution Trace on Sample Database Records
              </span>
            </div>
            <p className="text-xs text-ink-2">
              {steps.step5_trace.sampleDataDescription}
            </p>

            {/* Row by row evaluation list */}
            <div className="space-y-2 overflow-x-auto">
              <div className="grid grid-cols-12 gap-2 text-[10px] font-mono text-ink-3 uppercase px-3 py-1 border-b border-hairline">
                <span className="col-span-1">ID</span>
                <span className="col-span-2">Name</span>
                <span className="col-span-2">Dept / Value</span>
                <span className="col-span-3">Benchmark</span>
                <span className="col-span-2">Evaluation</span>
                <span className="col-span-2">Outcome</span>
              </div>

              {steps.step5_trace.inputRows.map((r) => (
                <div
                  key={r.id}
                  className={`grid grid-cols-12 gap-2 p-3 rounded border text-xs font-mono items-center transition-colors ${
                    r.evaluatesTo
                      ? "bg-emerald-500/10 border-emerald-500/30 text-ink-1"
                      : "bg-surface-1 border-hairline text-ink-3"
                  }`}
                >
                  <span className="col-span-1 font-bold">{r.id}</span>
                  <span className="col-span-2 font-semibold text-ink-1">{r.name}</span>
                  <span className="col-span-2 font-mono text-[11px]">{r.dept} (${r.val.toLocaleString()})</span>
                  <span className="col-span-3 text-[11px] opacity-80">{r.comparisonMetric}</span>
                  <span className="col-span-2">
                    {r.evaluatesTo ? (
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-bold text-[10px]">
                        ✓ TRUE
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded bg-rose-500/15 text-rose-700 dark:text-rose-300 font-bold text-[10px]">
                        ✗ FALSE
                      </span>
                    )}
                  </span>
                  <span className="col-span-2 text-[11px] font-sans font-medium">
                    {r.evaluatesTo ? "Kept in Output" : "Filtered Out"}
                  </span>
                </div>
              ))}
            </div>

            {/* Final Query Output Table */}
            <div className="mt-4 p-4 rounded-md bg-surface-1 border border-hairline space-y-2">
              <span className="font-mono text-xs font-bold text-accent uppercase flex items-center gap-1.5">
                <span>Final Output Relation (Tuple Result Set):</span>
              </span>
              <div className="overflow-x-auto">
                <table className="w-full text-xs font-mono text-left border-collapse">
                  <thead>
                    <tr className="border-b border-hairline text-ink-3">
                      {steps.step5_trace.finalResultHeaders.map((h, i) => (
                        <th key={i} className="py-1.5 px-3 uppercase tracking-wider">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {steps.step5_trace.finalResultRows.map((row, rIdx) => (
                      <tr key={rIdx} className="border-b border-hairline/50 font-bold text-ink-1">
                        {row.map((cell, cIdx) => (
                          <td key={cIdx} className="py-2 px-3 text-emerald-600 dark:text-emerald-400">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── LOGICAL SQL CLAUSE EXECUTION ORDER EXPLORER ── */}
      <div className="p-4 sm:p-5 border-t border-[#e2d9cc] dark:border-[#2e2a42] bg-[#f5ede0]/40 dark:bg-[#1a1b2d]/50 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="font-mono text-xs font-bold text-ink-3 uppercase tracking-wider">
            Engine Deep Dive: Logical Order of Execution vs Written Syntax
          </span>
          <span className="font-handwriting text-sm text-accent">
            ✎ SQL is written in one order, but executed in this strict 8-step pipeline
          </span>
        </div>

        {/* Pipeline Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs">
          {[
            { tag: "FROM", desc: "1. FROM / JOIN: Computes Cartesian product and identifies source tables." },
            { tag: "WHERE", desc: "2. WHERE: Evaluates boolean predicates row-by-row before any grouping." },
            { tag: "GROUP BY", desc: "3. GROUP BY: Partitions surviving rows into discrete buckets." },
            { tag: "HAVING", desc: "4. HAVING: Filters aggregated groups (COUNT, SUM, AVG allowed)." },
            { tag: "SELECT", desc: "5. SELECT: Projections, calculations, and column aliases evaluated." },
            { tag: "DISTINCT", desc: "6. DISTINCT: Eliminates duplicate output rows." },
            { tag: "ORDER BY", desc: "7. ORDER BY: Sorts the final result set." },
            { tag: "LIMIT", desc: "8. LIMIT / OFFSET: Slices the requested row window." },
          ].map((item) => (
            <button
              key={item.tag}
              type="button"
              onClick={() => setActiveOrderClause(item.tag)}
              className={`px-3 py-1 text-[11px] font-bold transition-colors cursor-pointer shape-octagon-sm ${
                activeOrderClause === item.tag
                  ? "bg-violet-700 text-white shadow-sm"
                  : "bg-white border border-[#d6cfbe] text-[#334155] hover:bg-[#f5ede0]"
              }`}
            >
              {item.tag}
            </button>
          ))}
        </div>

        {/* Selected clause explanation */}
        <div className="p-3 rounded bg-surface-1 border border-hairline text-xs font-mono text-ink-2">
          {activeOrderClause === "FROM" && (
            <p><strong>1. FROM / JOIN:</strong> Determines the universe of discourse. Tables are identified and cross-joined. If table is missing, execution halts with relation does not exist.</p>
          )}
          {activeOrderClause === "WHERE" && (
            <p><strong>2. WHERE:</strong> Filters individual tuples. Cannot refer to column aliases declared in SELECT (e.g. WHERE total &gt; 100 fails if total is aliased in SELECT). Cannot contain aggregate functions!</p>
          )}
          {activeOrderClause === "GROUP BY" && (
            <p><strong>3. GROUP BY:</strong> Divides surviving rows into groups by unique combinations of grouping keys. From this point forward, individual rows cannot be accessed directly without an aggregate function.</p>
          )}
          {activeOrderClause === "HAVING" && (
            <p><strong>4. HAVING:</strong> Predicate filter applied strictly to groups. Evaluated AFTER aggregation. (e.g. HAVING COUNT(*) &gt; 5).</p>
          )}
          {activeOrderClause === "SELECT" && (
            <p><strong>5. SELECT:</strong> Mathematical expressions evaluated and columns projected. Aliases become available here.</p>
          )}
          {activeOrderClause === "DISTINCT" && (
            <p><strong>6. DISTINCT:</strong> Sorter or hash set removes duplicate rows from the projected columns.</p>
          )}
          {activeOrderClause === "ORDER BY" && (
            <p><strong>7. ORDER BY:</strong> Final sorting. Because SELECT has finished, ORDER BY CAN use column aliases and expressions defined in SELECT.</p>
          )}
          {activeOrderClause === "LIMIT" && (
            <p><strong>8. LIMIT / OFFSET:</strong> Paginates the output, returning the top N rows.</p>
          )}
        </div>
      </div>
    </div>
  );
}
