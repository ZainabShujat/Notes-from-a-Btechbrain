# Project Context: Notes From A B.Tech Brain

## Overview
**Notes From A B.Tech Brain** is an undergraduate computer science and GATE preparation platform built using Next.js (App Router), TypeScript, and Tailwind CSS. The platform delivers deep, first-principles academic notebooks, interactive models, verified GATE PYQ analyses, and structured revision guides for engineering students and competitive examination aspirants.

## Target Curricula & Exam Tracks
The platform supports two official GATE tracks:

### 1. GATE Computer Science & Information Technology (CS/IT) — 13 Subjects
1. General Aptitude (`general-aptitude`)
2. Engineering Mathematics (`engineering-mathematics`)
3. Discrete Mathematics (`discrete-mathematics`)
4. Digital Logic (`digital-logic`)
5. Computer Organization and Architecture (`computer-organization`)
6. Programming in C (`programming-in-c`)
7. Data Structures (`data-structures`)
8. Algorithms (`algorithms`)
9. Theory of Computation (`theory-of-computation`)
10. Compiler Design (`compiler-design`)
11. Operating Systems (`operating-systems`) — *Reference Implementation*
12. Database Management Systems (`dbms`)
13. Computer Networks (`computer-networks`)

### 2. GATE Data Science & Artificial Intelligence (DA) — 8 Subjects
1. General Aptitude (`general-aptitude` — shared with CS/IT)
2. Probability and Statistics (`probability-and-statistics`)
3. Linear Algebra (`linear-algebra`)
4. Calculus and Optimization (`calculus-and-optimization`)
5. Programming, Data Structures and Algorithms (`data-structures` / `algorithms` / `programming-in-c` — shared)
6. Database Management and Warehousing (`dbms` — shared)
7. Machine Learning (`machine-learning`)
8. Artificial Intelligence (`artificial-intelligence`)

## Architecture & Data Layers
1. **Subject Metadata & Track Registry (`lib/notes.ts`)**:
   - High-level subject definitions (`LEARNING_TRACKS`), tags, highlights, branch mappings (`gateBranches: ["cs", "da"]`), and topic counts.
2. **Detailed Course Content Registry (`lib/courses/`)**:
   - Declarative `CourseMeta`, `ModuleMeta`, and `LessonMeta` structures.
   - Rich section polymorphism: `explanation`, `diagram`, `interactive`, `comparison`, `code`, `worked-example`, `misconceptions`, `practice`, `gate-lens`, `gate-analysis`, `quick-revision`, `resources`.
3. **Interactive Notebook Flip & Card Registry (`lib/notebooks/`)**:
   - Page-turn physical notebook representation (`SUBJECT_NOTEBOOKS`), cheatsheets, and glimpse extractors (`lib/notebooks/glimpse.ts`).
4. **Presentation & Routes (`app/notes/`)**:
   - `/notes`: Main notebook shelf and curriculum selection.
   - `/notes/gate`: Dual-track GATE CS/IT and DA branch-filtered matrix, weightage breakdowns, and high-yield topic lenses.
   - `/notes/[subject]`: Subject overview, modular curriculum breakdown, and study sequencing.
   - `/notes/[subject]/[lessonSlug]`: Individual interactive lesson reader with paper page-turn animations, cheatsheet modals, and practice engines.
