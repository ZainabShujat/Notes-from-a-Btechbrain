import { CourseMeta } from "./types";
import { DA_DATA_TRANSFORMATIONS_LESSON } from "./da-transformations-data";

export const DBMS_COURSE: CourseMeta = {
  id: "dbms",
  title: "Database Management Systems",
  slug: "dbms",
  subjectSlug: "dbms",
  shortTitle: "DBMS",
  icon: "🗄️",
  color: "bg-sky-400",
  tagline:
    "Master database internals: from relational algebra and SQL optimization to B+ tree index arithmetic, normalization, and ACID transaction schedules.",
  description:
    "A rigorous, comprehensive Database Management Systems notebook designed for B.Tech semester excellence and top-percentile GATE CS preparation. Features interactive precedence graph checkers, B+ tree calculators, schema normalization solvers, and step-by-step verified GATE PYQ derivations.",
  level: "Undergraduate / GATE CS",
  estimatedHours: 42,
  prerequisites: [
    "Discrete Mathematics (Set Theory, Relations, First-Order Logic)",
    "Basic Data Structures (Arrays, Linked Lists, Balanced Search Trees)",
    "Elementary C/C++ or programming fundamentals",
  ],
  learningOutcomes: [
    "Design robust entity-relationship models and map complex participation constraints to minimal relational tables",
    "Formulate rigorous queries in Relational Algebra, Tuple Relational Calculus, and standard SQL with 3-valued NULL logic",
    "Compute attribute closures, derive minimal candidate keys, and decompose schemas into 3NF and BCNF without losing dependencies",
    "Calculate exact B+ Tree internal and leaf node orders, capacity limits, and disk I/O search access times",
    "Prove conflict serializability by constructing directed precedence graphs and detecting topological cycles",
    "Analyze Two-Phase Locking (2PL), Timestamp Ordering, Wait-Die/Wound-Wait deadlock prevention, and Write-Ahead Logging (WAL) recovery",
  ],
  gateScope: "GATE 2027 CS/IT + DA scope",
  gateBranches: ["cs", "da"],
  gateSyllabusTopics: [
    "ER-model and relational schema mapping",
    "Relational model: relational algebra, tuple calculus, SQL",
    "Integrity constraints, normal forms (1NF, 2NF, 3NF, BCNF), dependency preservation and lossless join",
    "File organization, indexing (e.g., B and B+ trees)",
    "Transactions and concurrency control (ACID, serializability, 2PL, timestamp ordering)",
    "Log-based recovery protocols and checkpointing",
    "Data warehousing: Architecture, multidimensional data models, star, snowflake and fact constellation schemas, OLAP operations",
  ],
  modules: [
    // =========================================================================
    // MODULE 1: ARCHITECTURE & DATA INDEPENDENCE
    // =========================================================================
    {
      id: "module-1-architecture",
      title: "Module 1: Database Architecture & The Three-Schema Framework",
      slug: "database-architecture",
      description:
        "The foundational philosophy of database management: overcoming file system anomalies, physical vs logical data independence, and the ANSI/SPARC three-tier architecture.",
      order: 1,
      lessons: [
        {
          id: "why-dbms-exists-and-three-schema",
          title: "Why DBMS Exists: File Systems vs DBMS & The Three-Schema Architecture",
          slug: "why-dbms-exists-and-three-schema",
          order: 1,
          estimatedMinutes: 18,
          tagline: "From flat OS files to the ANSI/SPARC three-tier abstraction and data independence.",
          hasInteractive: false,
          hasGATE: true,
          hasPractice: true,
          cheatsheet: {
            summaryRule: "Three-Schema Levels: External (Views) → Conceptual (Logical Schema) → Internal (Physical Storage). Physical data independence insulates conceptual tables from storage layout; Logical data independence insulates views from schema evolution.",
            keyFormulasAndRules: [
              "Physical Data Independence: Alter index, file layout, block format without touching conceptual schema.",
              "Logical Data Independence: Add table, split columns without breaking existing views.",
              "DDL defines conceptual tables; DSDL defines storage; DML queries data; DCL manages permissions; TCL manages transactions.",
            ],
            examPitfalls: [
              "Physical data independence is much easier to achieve and maintain than logical data independence.",
              "File systems manage bytes and files; DBMS engines manage typed relations, constraints, and ACID transactions.",
            ],
          },
          sections: [
            {
              type: "explanation",
              heading: "1. The Historical Dilemma: Why Simple File Systems Failed",
              body: [
                "Before database systems emerged in the late 1960s, organizations stored enterprise data directly in flat operating system files (CSV, fixed-width records, or custom binary structs). Every application had to implement its own parsing, locking, search indexing, and consistency checks.",
                "Storing application data directly in OS files creates five fatal engineering bottlenecks:",
                "1. ==pink:Data Redundancy & Inconsistency==: The same customer address was stored independently by billing, shipping, and customer support. Updating one file left the others stale, resulting in contradictory enterprise records.",
                "2. Difficulty in Accessing Data: Writing an ad-hoc query required writing and compiling a brand-new 200-line C program to parse the disk blocks sequentially.",
                "3. ==pink:Data Isolation & Format Brittleness==: If an engineer changed a record's postal code field from 6 digits to alphanumeric, every compiled binary across the company that touched that file crashed.",
                "4. ==yellow:Concurrency & Atomicity Failures==: If two bank tellers debited account #4102 simultaneously, interleaved OS file writes caused ==pink:Lost Updates==. If power failed mid-write, partial records corrupted the filesystem.",
                "5. ==purple:Security & Integrity Enforcement==: File systems offer coarse-grained read/write permissions at the whole-file level. They cannot enforce fine-grained rules like 'An intern can view employee names but not salary' or 'Balance must never drop below zero.'",
              ],
              callout: {
                kind: "mental-model",
                title: "Mental Model: Abstraction Over Physical Disk Blocks",
                message:
                  "Just as an Operating System abstracts raw CPU registers and disk tracks into processes and files, a DBMS abstracts raw disk pages and byte offsets into ==green:logical tables, relational constraints, and declarative query interfaces==.",
              },
            },
            {
              type: "explanation",
              heading: "2. The ANSI/SPARC Three-Schema Architecture",
              body: [
                "The core engineering breakthrough that solved the file system dilemma was ==yellow:separating the user's perception of data from its physical layout on magnetic disks==.",
                "The ANSI/SPARC framework divides database systems into three distinct abstraction layers:",
                "1. **External Level (View Layer):** Describes the ==purple:subset of the database relevant to a specific user group== while hiding the rest. A student sees their grades and tuition fees; a registrar sees academic standing; an administrator sees contact details. A single database supports many independent external views.",
                "2. **Conceptual Level (Logical Layer):** Describes ==yellow:WHAT data is stored in the entire database and the relationships among them==. This is the unified enterprise schema: tables, columns, data types, foreign keys, and integrity constraints. It completely hides physical storage details.",
                "3. **Internal Level (Physical Storage Layer):** Describes ==purple:HOW data is physically saved on persistent media==: block formats, byte offsets, compression, record clustering, hashing, and ==green:B+ tree search indices==.",
              ],
            },
            {
              type: "diagram",
              heading: "3. Architectural Abstraction Hierarchy",
              caption: "Figure 1.1 — The ANSI/SPARC Three-Schema Architecture separating external views from physical disk storage.",
              diagramType: "three-schema",
              asciiArt: `+-------------------------------------------------------------+
|                     EXTERNAL LEVEL                          |
|   [View 1: Students]     [View 2: Faculty]   [View 3: Finance] |
+-------------------------------------------------------------+
                              |
                     Logical Data Independence
                              v
+-------------------------------------------------------------+
|                     CONCEPTUAL LEVEL                        |
|   Community Logical Schema: Entities, Tables, FDs & Keys    |
|   (Relational Tables: Students, Courses, Instructors, Enr)  |
+-------------------------------------------------------------+
                              |
                    Physical Data Independence
                              v
+-------------------------------------------------------------+
|                     INTERNAL LEVEL                          |
|   Physical Storage Layout: Block Formats, Inodes, B+ Trees  |
|   (Secondary Clustered Index, Record Offsets, Page Buffers) |
+-------------------------------------------------------------+
                              |
                              v
+-------------------------------------------------------------+
|                   PHYSICAL DATABASE DISK                    |
+-------------------------------------------------------------+`,
            },
            {
              type: "comparison",
              heading: "4. Physical vs Logical Data Independence",
              leadParagraph:
                "Data independence is the capacity to change the schema at one level without forcing modifications to schemas at higher levels.",
              columns: ["Physical Data Independence", "Logical Data Independence"],
              criteria: [
                {
                  feature: "Definition",
                  first: "Capacity to ==yellow:modify the internal physical schema without altering the conceptual schema==.",
                  second: "Capacity to ==yellow:modify the conceptual logical schema without altering external views== or apps.",
                },
                {
                  feature: "Typical Changes",
                  first: "==green:Adding a B+ Tree index, switching from HDD to NVMe SSD, changing block size==, reorganizing file records.",
                  second: "==purple:Adding a new attribute to a relation, splitting a table into two normalized tables==, adding an entity.",
                },
                {
                  feature: "Implementation Difficulty",
                  first: "==green:Relatively easy to provide==. Modern DBMS engines handle this natively without breaking SQL.",
                  second: "==pink:Much harder to achieve==. Changing logical schemas often forces view definitions to be rewritten.",
                },
                {
                  feature: "Application Impact",
                  first: "==green:Zero changes to application code==. Queries execute identically, just faster or slower.",
                  second: "Existing applications remain unaffected if ==purple:appropriate views are maintained over new tables==.",
                },
              ],
              summaryTakeaway:
                "==green:Physical independence shields developers from hardware and disk storage formats==; ==purple:logical independence shields business applications from evolving enterprise requirements==.",
            },
            {
              type: "practice",
              heading: "5. Module 1 Concept Verification",
              leadParagraph: "Test your understanding of DBMS architectural boundaries and data independence.",
              questions: [
                {
                  id: "q-arch-1",
                  prompt: "Creating a secondary B+ Tree index on the 'Salary' column of an Employee table to speed up range queries is an example of exercising which property?",
                  type: "single-choice",
                  difficulty: "foundation",
                  options: [
                    {
                      id: "a",
                      text: "Physical Data Independence",
                      explanation: "Modifying physical storage structures (like adding or dropping indices) without altering the conceptual schema or application code is the exact definition of physical data independence.",
                      isCorrect: true,
                    },
                    {
                      id: "b",
                      text: "Logical Data Independence",
                      explanation: "Logical data independence involves altering table definitions, attributes, or normalization schemes without breaking user views.",
                      isCorrect: false,
                    },
                    {
                      id: "c",
                      text: "External Schema Mapping",
                      explanation: "External mapping connects user views to the conceptual schema, not index creation.",
                      isCorrect: false,
                    },
                    {
                      id: "d",
                      text: "Atomicity Preservation",
                      explanation: "Atomicity is a transaction property, not an architectural schema layer property.",
                      isCorrect: false,
                    },
                  ],
                  explanation: "Adding a secondary index alters the physical storage layer (internal schema) to optimize execution, leaving the conceptual schema and application SQL untouched.",
                },
                {
                  id: "q-arch-2",
                  prompt: "Which of the following database languages is strictly compiled into a set of internal schema instructions that define physical storage structures and access paths?",
                  type: "single-choice",
                  difficulty: "gate-level",
                  options: [
                    {
                      id: "a",
                      text: "Data Storage and Definition Language (DSDL)",
                      explanation: "DSDL specifies the internal physical schema and file organization details.",
                      isCorrect: true,
                    },
                    {
                      id: "b",
                      text: "Data Manipulation Language (DML)",
                      explanation: "DML handles data retrieval, insertion, deletion, and updates.",
                      isCorrect: false,
                    },
                    {
                      id: "c",
                      text: "Data Control Language (DCL)",
                      explanation: "DCL controls privileges and access permissions (GRANT, REVOKE).",
                      isCorrect: false,
                    },
                    {
                      id: "d",
                      text: "Transaction Control Language (TCL)",
                      explanation: "TCL handles transaction states (COMMIT, ROLLBACK, SAVEPOINT).",
                      isCorrect: false,
                    },
                  ],
                  explanation: "Storage specifications are written in Data Storage and Definition Language (DSDL), compiled by the storage engine to manage physical allocation.",
                },
              ],
            },
            {
              type: "quick-revision",
              heading: "6. 1-Minute Architecture Revision Anchor",
              oneMinutePanicCard: {
                coreRule:
                  "Three-Schema Levels: External (Views) → Conceptual (Logical Schema) → Internal (Physical Storage).",
                mustRememberFormulas: [
                  "Physical Data Independence: Alter index, file layout, block format without touching conceptual schema.",
                  "Logical Data Independence: Add table, split columns without breaking existing views.",
                  "DDL defines conceptual tables; DSDL defines storage; DML queries data; DCL manages permissions; TCL manages transactions.",
                ],
                criticalPitfalls: [
                  "Physical data independence is much easier to maintain than logical data independence.",
                  "File systems manage bytes and files; DBMS engines manage typed relations, constraints, and ACID transactions.",
                ],
              },
            },
            {
              type: "resources",
              heading: "7. Cited Literature & Primary Standards",
              sources: [
                {
                  title: "Database System Concepts (10th Edition)",
                  authorOrInstitution: "Abraham Silberschatz, Henry F. Korth, S. Sudarshan",
                  topic: "Chapter 1 & 2: Database System Architecture and Data Models",
                  url: "https://www.db-book.com/",
                  type: "primary-standard",
                  annotation: "The canonical reference for ANSI/SPARC three-tier architecture and data independence.",
                },
                {
                  title: "Database Management Systems (3rd Edition)",
                  authorOrInstitution: "Raghu Ramakrishnan, Johannes Gehrke",
                  topic: "Chapter 1: Overview of Database Systems",
                  url: "https://pages.cs.wisc.edu/~dbbook/",
                  type: "primary-standard",
                  annotation: "Comprehensive explanation of file system deficiencies vs relational database engines.",
                },
              ],
            },
          ],
        },
      ],
    },

    // =========================================================================
    // MODULE 2: ER MODELING & RELATIONAL MAPPING
    // =========================================================================
    {
      id: "module-2-er-modeling",
      title: "Module 2: Entity-Relationship & Relational Schema Mapping",
      slug: "er-modeling-and-relational-mapping",
      description:
        "Translating conceptual enterprise domains into formal Entity-Relationship models, understanding weak entities, and mastering the exact mathematical rules for minimum table reduction.",
      order: 2,
      lessons: [
        {
          id: "er-modeling-and-table-reduction",
          title: "ER & Extended ER Modeling: Constraints, Weak Entities & Minimum Tables",
          slug: "er-modeling-and-table-reduction",
          order: 1,
          estimatedMinutes: 24,
          tagline: "Entities, weak entities, cardinalities, and the mathematical rules for minimum table reduction.",
          hasInteractive: false,
          hasGATE: true,
          hasPractice: true,
          cheatsheet: {
            summaryRule: "Weak Entity Key = Identifying Owner PK + Discriminator. M:N requires 3 tables; 1:N with total participation on N-side requires 2 tables; 1:1 with total participation on both sides requires 1 table.",
            keyFormulasAndRules: [
              "M:N relationship → strictly 3 tables.",
              "1:N relationship with total on N-side → 2 tables (merge relationship into N-side table).",
              "1:1 relationship with total on both sides → 1 table.",
              "Weak entity + identifying owner → 2 tables (weak entity table absorbs identifying relationship).",
              "Multivalued attribute → separate table containing {Owner PK, Attribute}.",
            ],
            examPitfalls: [
              "Multivalued attributes ALWAYS require their own separate table with foreign key to owner.",
              "A partial key (discriminator) cannot identify a tuple across the database by itself without the owner entity's primary key.",
            ],
          },
          sections: [
            {
              type: "explanation",
              heading: "1. The Bridge From Human Requirements to Relational Schemas",
              body: [
                "Computer software fails when the database schema misinterprets real-world business constraints. ER modeling provides a formal, diagrammatic notation to capture enterprise rules before a single SQL table is created.",
                "An Entity-Relationship (ER) model abstracts the enterprise into three fundamental primitives:",
                "1. Entity Sets: Collections of distinct, identifiable objects (e.g., Employee, Department, Course).",
                "2. Attributes: Properties that describe entities (Simple vs Composite, Single-valued vs Multi-valued, Stored vs Derived).",
                "3. Relationship Sets: Associations among two or more entities (e.g., Works_In connecting Employee and Department).",
                "The most critical skill tested in B.Tech university examinations and GATE is relational synthesis: taking an ER diagram with cardinality and participation constraints and reducing it to the minimum number of relational tables without introducing redundancy or NULL clutter.",
              ],
            },
            {
              type: "explanation",
              heading: "2. Cardinality Ratios & Participation Constraints",
              body: [
                "The structural constraints of a relationship set dictate whether two tables can be safely merged into one.",
                "Mapping Cardinality (Ratios):",
                "• One-to-One (1:1): An entity in A is associated with at most one entity in B, and vice versa.",
                "• One-to-Many (1:N): An entity in A can be associated with many entities in B, but an entity in B is associated with at most one entity in A.",
                "• Many-to-Many (M:N): An entity in A can link to many entities in B, and vice versa.",
                "Participation Constraints:",
                "• Total Participation (Double Line / Existence Dependency): Every entity in the set must participate in at least one relationship instance. For example, every Loan must belong to a Customer.",
                "• Partial Participation (Single Line): Some entities may not participate. For example, some Employees may not manage any Department.",
              ],
            },
            {
              type: "explanation",
              heading: "3. Weak Entity Sets & Identifying Relationships",
              body: [
                "A weak entity set lacks sufficient attributes to form a primary key on its own.",
                "A weak entity set depends on the existence of a strong (identifying) entity set:",
                "1. Identifying Owner: The strong entity set that provides the primary key.",
                "2. Identifying Relationship: Depicted by a double diamond. The weak entity always exhibits total participation (double line) in this relationship.",
                "3. Partial Key (Discriminator): A set of attributes that distinguishes weak entities belonging to the same owner entity (depicted by a dashed underline).",
                "Primary Key Rule: Primary Key of Weak Entity = Primary Key of Identifying Owner ∪ Partial Key.",
                "Example: An employee's dependents. An Employee has primary key EmpId. The weak entity Dependent has discriminator DepName. The primary key of Dependent is (EmpId, DepName).",
              ],
            },
            {
              type: "worked-example",
              heading: "4. GATE High-Yield: Minimum Relational Table Reduction",
              problemStatement:
                "Given an ER diagram with strong entity sets E1 and E2 and binary relationship R, what is the minimum number of relational tables required to represent the schema without NULL anomalies?",
              givenData: [
                { label: "Case 1", value: "M:N Relationship (Any Participation)" },
                { label: "Case 2", value: "1:N Relationship with Total Participation on N-side" },
                { label: "Case 3", value: "1:1 Relationship with Total Participation on Both Sides" },
                { label: "Case 4", value: "Weak Entity Set W with Identifying Strong Entity E" },
              ],
              steps: [
                {
                  stepNumber: 1,
                  title: "Analyze M:N Relationships",
                  description:
                    "A Many-to-Many relationship cannot place a foreign key in either entity without creating multi-valued columns or duplicating tuples. Therefore, M:N strictly requires 3 tables: Table(E1), Table(E2), and Junction Table(R) containing (PK_E1, PK_E2, attributes_of_R).",
                  formula: "Min Tables = 3",
                },
                {
                  stepNumber: 2,
                  title: "Analyze 1:N Relationships",
                  description:
                    "In 1:N, the entity on the N-side can store the primary key of the 1-side as a foreign key. If participation on the N-side is total, NO foreign key will be NULL. Thus, E2 and R can be merged into a single table. Total tables: 2 (Table E1, and merged Table E2+R).",
                  formula: "Min Tables = 2",
                },
                {
                  stepNumber: 3,
                  title: "Analyze 1:1 with Total Participation on Both Sides",
                  description:
                    "When every entity in E1 links to exactly one entity in E2 and vice versa, both entities and the relationship can collapse into a single unified table with zero NULL values.",
                  formula: "Min Tables = 1",
                },
                {
                  stepNumber: 4,
                  title: "Analyze Weak Entity Reduction",
                  description:
                    "The weak entity table always includes the owner's primary key plus its discriminator. Because the identifying relationship has no independent existence beyond the weak entity, the identifying relationship is merged directly into the weak entity table. Total tables: 2 (Owner Table, Weak Entity Table).",
                  formula: "Min Tables = 2",
                },
              ],
              finalAnswer:
                "M:N requires 3 tables; 1:N requires 2 tables; 1:1 with total participation on both sides requires 1 table; Weak entity with owner requires 2 tables.",
              examTakeaway:
                "Never create a separate table for a weak entity's identifying relationship. It is always subsumed into the weak entity relation.",
            },
            {
              type: "practice",
              heading: "5. ER Modeling & Table Reduction Quiz",
              leadParagraph: "Solve standard GATE questions on entity mapping and constraints.",
              questions: [
                {
                  id: "q-er-1",
                  prompt: "Entity E1 has attributes (A, B) with key A. Entity E2 has attributes (C, D) with key C. Relationship R is M:N with descriptive attribute E. What is the primary key of the table representing relationship R?",
                  type: "single-choice",
                  difficulty: "foundation",
                  options: [
                    {
                      id: "a",
                      text: "(A, C)",
                      explanation: "In an M:N relationship, the composite combination of primary keys from both participating entity sets forms the primary key of the junction table.",
                      isCorrect: true,
                    },
                    {
                      id: "b",
                      text: "A",
                      explanation: "A alone would imply that each E1 entity can associate with at most one E2 entity, violating M:N.",
                      isCorrect: false,
                    },
                    {
                      id: "c",
                      text: "(A, C, E)",
                      explanation: "Descriptive attributes like E do not form part of the candidate key unless specified as a discriminator in a multi-relationship.",
                      isCorrect: false,
                    },
                    {
                      id: "d",
                      text: "C",
                      explanation: "C alone would imply a 1:N relationship.",
                      isCorrect: false,
                    },
                  ],
                  explanation: "The junction table for an M:N relationship always takes the union of the primary keys of both participating entities as its composite primary key: (A, C).",
                },
                {
                  id: "q-er-2",
                  prompt: "In an ER diagram, a weak entity set W has a partial key D. The identifying relationship R connects W to strong entity S with primary key K. What constitutes the primary key of W?",
                  type: "single-choice",
                  difficulty: "gate-level",
                  options: [
                    {
                      id: "a",
                      text: "{K, D}",
                      explanation: "The primary key of a weak entity is formed by the primary key of its identifying strong owner entity combined with its own partial key (discriminator).",
                      isCorrect: true,
                    },
                    {
                      id: "b",
                      text: "{D}",
                      explanation: "A partial key is not unique across the entire database; it only distinguishes weak entities belonging to the same owner.",
                      isCorrect: false,
                    },
                    {
                      id: "c",
                      text: "{K}",
                      explanation: "K alone identifies the owner entity, not individual weak entity instances.",
                      isCorrect: false,
                    },
                    {
                      id: "d",
                      text: "A newly generated surrogate UUID",
                      explanation: "Relational theory derives the key naturally through composition: {K, D}.",
                      isCorrect: false,
                    },
                  ],
                  explanation: "Weak entities are identified by combining the strong entity's primary key K with their own discriminator D, giving composite key {K, D}.",
                },
              ],
            },
            {
              type: "quick-revision",
              heading: "6. 1-Minute ER Modeling Mental Anchors",
              oneMinutePanicCard: {
                coreRule:
                  "Weak Entity Key = Identifying Owner PK + Discriminator. Double diamond relationship is always subsumed into weak entity table.",
                mustRememberFormulas: [
                  "M:N relationship → strictly 3 tables.",
                  "1:N relationship with total on N-side → 2 tables (merge R into N-side).",
                  "1:1 relationship with total on both sides → 1 table.",
                  "Weak entity + identifying owner → 2 tables.",
                ],
                criticalPitfalls: [
                  "Multivalued attributes ALWAYS require their own separate table with foreign key to owner.",
                  "A partial key cannot identify a tuple across the database by itself.",
                ],
              },
            },
            {
              type: "resources",
              heading: "7. Cited Literature & References",
              sources: [
                {
                  title: "The Entity-Relationship Model—Toward a Unified View of Data",
                  authorOrInstitution: "Peter Pin-Shan Chen (ACM TODS 1976)",
                  topic: "Original formalization of Entity-Relationship modeling",
                  url: "https://dl.acm.org/doi/10.1145/320434.320440",
                  type: "academic-paper",
                  annotation: "The seminal research paper that introduced ER diagrams to computer science.",
                },
                {
                  title: "Database System Concepts (10th Edition)",
                  authorOrInstitution: "Silberschatz, Korth, Sudarshan",
                  topic: "Chapter 6: Database Design Using the E-R Model",
                  url: "https://www.db-book.com/",
                  type: "primary-standard",
                  annotation: "Standard reference for relational schema reduction and constraint mapping.",
                },
              ],
            },
          ],
        },
      ],
    },

    // =========================================================================
    // MODULE 3: RELATIONAL ALGEBRA
    // =========================================================================
    {
      id: "module-3-relational-algebra",
      title: "Module 3: Relational Model, Relational Algebra & Calculus",
      slug: "relational-algebra-and-calculus",
      description:
        "The mathematical foundation of databases: procedural relational algebra, non-procedural calculus, and the famous division operator.",
      order: 3,
      lessons: [
        {
          id: "relational-algebra-and-calculus",
          title: "Relational Algebra, Tuple Calculus & The Division Operator",
          slug: "relational-algebra-and-calculus",
          order: 1,
          estimatedMinutes: 26,
          tagline: "Selection, projection, joins, division, and output cardinality bounds.",
          hasInteractive: false,
          hasGATE: true,
          hasPractice: true,
          cheatsheet: {
            summaryRule: "Selection filters rows; Projection extracts columns; Cartesian Product multiplies cardinalities; Division answers FOR ALL universal quantification queries.",
            keyFormulasAndRules: [
              "deg(R × S) = deg(R) + deg(S); card(R × S) = |R| × |S|.",
              "Natural Join R(m) ⋈ S(n) with FK = exactly m tuples.",
              "General Natural Join R(m) ⋈ S(n) bounds = [0, m × n].",
              "Division R(A, B) ÷ S(B) yields tuples in A associated with EVERY tuple in S.",
              "Set Difference R - S requires union compatibility (identical arity and compatible domains).",
            ],
            examPitfalls: [
              "Projection removes duplicates in pure relational algebra; SQL SELECT does NOT unless DISTINCT is specified.",
              "Natural join on disjoint sets of common attribute values yields an empty relation.",
            ],
          },
          sections: [
            {
              type: "explanation",
              heading: "1. Why Mathematics Governs SQL",
              body: [
                "SQL is a declarative language: you write WHAT data you want, not HOW to retrieve it. To optimize and execute your query, the database query engine translates SQL into Relational Algebra expressions.",
                "Relational Algebra is a procedural query language where queries are composed of algebraic operators applied to relations, producing new relations as results. Because relations are formal mathematical sets of tuples, Relational Algebra provides the mathematical guarantee of closure (the output of any operation is itself a relation), enabling arbitrary nesting and algebraic optimization.",
              ],
            },
            {
              type: "explanation",
              heading: "2. Fundamental & Derived Relational Operators",
              body: [
                "The 5 Primitive Operators:",
                "1. Selection (σ_p(R)): Filters rows satisfying predicate p. Preserves degree (number of columns); reduces cardinality (number of rows).",
                "2. Projection (π_{A1, A2}(R)): Extracts specified columns and eliminates duplicate rows. Reduces degree; preserves or reduces cardinality.",
                "3. Cartesian Product (R × S): Pairs every tuple of R with every tuple of S. Degree = deg(R) + deg(S); Cardinality = |R| × |S|.",
                "4. Set Union (R ∪ S): Combines tuples from union-compatible relations (same degree and domain-compatible attributes).",
                "5. Set Difference (R - S): Returns tuples present in R but absent in S.",
                "High-Yield Derived Operators:",
                "• Natural Join (R ⋈ S): Cartesian product followed by equality selection on all common attribute names, projecting out duplicate column names.",
                "• Theta Join (R ⋈_θ S): σ_θ(R × S).",
                "• Division Operator (R ÷ S): Answers queries involving the universal quantifier 'FOR ALL' (e.g., 'Find students who enrolled in all courses taught by Dr. Rao').",
              ],
            },
            {
              type: "worked-example",
              heading: "3. GATE Classic: Join Output Cardinality Bounds",
              problemStatement:
                "Relation R(A, B) has m tuples. Relation S(B, C) has n tuples. What are the minimum and maximum possible number of tuples in the Natural Join (R ⋈ S) under different key constraints?",
              givenData: [
                { label: "Case 1", value: "B is Primary Key of S and Foreign Key in R" },
                { label: "Case 2", value: "B is Primary Key of both R and S" },
                { label: "Case 3", value: "General case: B is not a key in either relation" },
              ],
              steps: [
                {
                  stepNumber: 1,
                  title: "Evaluate Case 1 (Foreign Key Reference)",
                  description:
                    "Because B is a foreign key in R referencing S, every tuple in R must match exactly one tuple in S (referential integrity). Therefore, every one of the m tuples in R finds exactly one match.",
                  formula: "|R ⋈ S| = m (Exactly m tuples)",
                },
                {
                  stepNumber: 2,
                  title: "Evaluate Case 2 (Primary Key in Both)",
                  description:
                    "If B is unique in both tables, each value can match at most once. In the best case, all keys match (min(m, n)). In the worst case, the key sets are completely disjoint.",
                  formula: "Min = 0, Max = min(m, n)",
                },
                {
                  stepNumber: 3,
                  title: "Evaluate Case 3 (General Case)",
                  description:
                    "If all m tuples in R have value B='x' and all n tuples in S have value B='x', every tuple in R matches every tuple in S. If the sets of B values are disjoint, zero tuples match.",
                  formula: "Min = 0, Max = m × n",
                },
              ],
              finalAnswer:
                "When B is FK in R referencing S: exactly m tuples. General case: Min = 0, Max = m × n.",
              examTakeaway:
                "Pay strict attention to whether the join attribute is a foreign key. Referential integrity eliminates the possibility of 0 matches.",
            },
            {
              type: "practice",
              heading: "4. Relational Algebra Concept Verification",
              leadParagraph: "Test your mastery of relational operators and join semantics.",
              questions: [
                {
                  id: "q-ra-1",
                  prompt: "Which relational algebra operator is equivalent to the SQL query: 'SELECT DISTINCT A FROM R WHERE A NOT IN (SELECT A FROM S)'?",
                  type: "single-choice",
                  difficulty: "foundation",
                  options: [
                    {
                      id: "a",
                      text: "π_A(R) - π_A(S)",
                      explanation: "Set difference directly removes all A values present in S from those present in R, matching the NOT IN logic.",
                      isCorrect: true,
                    },
                    {
                      id: "b",
                      text: "π_A(R) ∩ π_A(S)",
                      explanation: "Intersection finds elements present in both, matching 'IN', not 'NOT IN'.",
                      isCorrect: false,
                    },
                    {
                      id: "c",
                      text: "π_A(R ⋈ S)",
                      explanation: "Natural join matches rows with identical values, not exclusions.",
                      isCorrect: false,
                    },
                    {
                      id: "d",
                      text: "π_A(R) / π_A(S)",
                      explanation: "Division answers 'for all' queries, not simple set exclusion.",
                      isCorrect: false,
                    },
                  ],
                  explanation: "Set difference π_A(R) - π_A(S) extracts attributes appearing in R that do not appear in S.",
                },
              ],
            },
            {
              type: "quick-revision",
              heading: "5. 1-Minute Relational Algebra Revision Anchors",
              oneMinutePanicCard: {
                coreRule:
                  "Selection filters rows; Projection extracts columns; Cartesian Product multiplies cardinalities; Division answers FOR ALL queries.",
                mustRememberFormulas: [
                  "deg(R × S) = deg(R) + deg(S); card(R × S) = |R| × |S|.",
                  "Natural Join R(m) ⋈ S(n) with FK = exactly m tuples.",
                  "General Natural Join R(m) ⋈ S(n) bounds = [0, m × n].",
                  "Division R(A, B) ÷ S(B) yields tuples in A associated with EVERY tuple in S.",
                ],
                criticalPitfalls: [
                  "Projection removes duplicates in pure relational algebra; SQL SELECT does NOT unless DISTINCT is specified.",
                  "Natural join on disjoint sets of common attribute values yields an empty relation.",
                ],
              },
            },
            {
              type: "resources",
              heading: "6. Cited Literature & Papers",
              sources: [
                {
                  title: "A Relational Model of Data for Large Shared Data Banks",
                  authorOrInstitution: "Edgar F. Codd (Communications of the ACM, 1970)",
                  topic: "The founding paper of relational algebra and the relational model",
                  url: "https://dl.acm.org/doi/10.1145/362384.362685",
                  type: "academic-paper",
                  annotation: "Turing Award-winning paper establishing relational algebra operators.",
                },
                {
                  title: "Database System Concepts (10th Edition)",
                  authorOrInstitution: "Silberschatz, Korth, Sudarshan",
                  topic: "Chapter 2: Introduction to the Relational Model",
                  url: "https://www.db-book.com/",
                  type: "primary-standard",
                  annotation: "Rigorous treatment of fundamental and derived relational operators.",
                },
              ],
            },
          ],
        },
      ],
    },

    // =========================================================================
    // MODULE 4: SQL MASTERY
    // =========================================================================
    {
      id: "module-4-sql-mastery",
      title: "Module 4: SQL Mastery, 3-Valued Logic & Complex Subqueries",
      slug: "sql-mastery-and-subqueries",
      description:
        "The nuances of SQL execution: three-valued logic with NULLs, the famous NOT IN vs NOT EXISTS trap, aggregation with HAVING, and correlated subqueries.",
      order: 4,
      lessons: [
        {
          id: "sql-mastery-and-subqueries",
          title: "SQL Mastery: 3-Valued Logic, Aggregates & Correlated Subqueries",
          slug: "sql-mastery-and-subqueries",
          order: 1,
          estimatedMinutes: 22,
          tagline: "Execution pipeline, 3-valued truth tables, the NOT IN with NULL trap, and grouping.",
          hasInteractive: true,
          hasGATE: true,
          hasPractice: true,
          cheatsheet: {
            summaryRule: "WHERE requires TRUE to keep rows; UNKNOWN and FALSE are both discarded. Comparison with NULL (col = NULL) evaluates to UNKNOWN. COUNT(*) counts all rows; COUNT(col) counts only non-NULL entries.",
            keyFormulasAndRules: [
              "NOT IN with any NULL in subquery returns 0 rows! Always prefer NOT EXISTS.",
              "COUNT(*) counts all rows; COUNT(col) counts only non-null values.",
              "Execution order: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY.",
              "WHERE filters raw rows; HAVING filters grouped aggregates.",
              "3-Valued Logic truth tables: NULL OR TRUE = TRUE; NULL AND FALSE = FALSE; NULL OR FALSE = UNKNOWN.",
            ],
            examPitfalls: [
              "Never write WHERE col = NULL; write WHERE col IS NULL.",
              "Column aliases created in SELECT cannot be referenced in WHERE.",
            ],
          },
          sections: [
            {
              type: "explanation",
              heading: "1. The Subtlety of Production SQL",
              body: [
                "Most students know basic SELECT * FROM Table WHERE id = 1. But competitive examinations and production database engines test corner cases: what happens when NULLs appear in subqueries, how outer joins interact with aggregate filters, and how correlated subqueries execute.",
                "SQL operates under Three-Valued Logic (3VL) with truth values TRUE, FALSE, and UNKNOWN. Missing data (NULL) is not zero or an empty string—it represents unknown or inapplicable information. Failing to understand 3VL leads to silent data bugs in production banking systems and lost marks in GATE exams.",
              ],
            },
            {
              type: "explanation",
              heading: "2. Three-Valued Logic & The Dangerous NULL Trap",
              body: [
                "Any comparison with NULL (even NULL = NULL) evaluates to UNKNOWN, never TRUE.",
                "Truth Tables with UNKNOWN:",
                "• AND: TRUE AND UNKNOWN = UNKNOWN, FALSE AND UNKNOWN = FALSE.",
                "• OR: TRUE OR UNKNOWN = TRUE, FALSE OR UNKNOWN = UNKNOWN.",
                "• NOT: NOT UNKNOWN = UNKNOWN.",
                "The Infamous 'NOT IN' with NULL Trap:",
                "Consider table R with values {1, NULL}. What does 'SELECT * FROM S WHERE x NOT IN (SELECT a FROM R)' return?",
                "x NOT IN (1, NULL) expands logically to: (x ≠ 1) AND (x ≠ NULL).",
                "Because (x ≠ NULL) always evaluates to UNKNOWN, the expression becomes: (x ≠ 1) AND UNKNOWN.",
                "• If x = 1: FALSE AND UNKNOWN = FALSE.",
                "• If x = 2: TRUE AND UNKNOWN = UNKNOWN.",
                "In SQL, a WHERE clause only keeps rows that evaluate strictly to TRUE! Because the result is either FALSE or UNKNOWN for every possible value of x, the query returns EMPTY (0 rows)!",
                "The Production Solution: Always use NOT EXISTS instead of NOT IN when subquery columns can contain NULLs.",
              ],
            },
            {
              type: "explanation",
              heading: "3. SQL Query Logical Execution Order",
              body: [
                "SQL is written in one order but executed by the database engine in a strictly defined logical pipeline:",
                "1. FROM / JOIN     -> Identify data sources & compute Cartesian cross-products",
                "2. WHERE           -> Filter individual rows before grouping",
                "3. GROUP BY        -> Partition rows into buckets by group keys",
                "4. HAVING          -> Filter aggregated groups (can use COUNT, SUM, AVG)",
                "5. SELECT          -> Compute output projections & expressions",
                "6. DISTINCT        -> Eliminate duplicate output tuples",
                "7. ORDER BY        -> Sort final output rows (can use aliases defined in SELECT)",
                "8. LIMIT / OFFSET  -> Slice final row window",
                "Key Rule: You can never use a column alias defined in SELECT inside the WHERE clause because WHERE executes before SELECT!",
              ],
            },
            {
              type: "interactive",
              heading: "4. University Exam Question-to-SQL Translation Studio",
              leadParagraph:
                "Step-by-step interactive derivation: see how English problem descriptions are decomposed into relational target attributes, subquery correlation anchors, WHERE vs HAVING filters, and row-by-row live evaluation traces.",
              interactive: {
                kind: "question-to-sql",
              },
            },
            {
              type: "practice",
              heading: "5. SQL Nuances & 3-Valued Logic Quiz",
              leadParagraph: "Verify your understanding of SQL corner cases and execution pipelines.",
              questions: [
                {
                  id: "q-sql-1",
                  prompt: "Given a table T with 4 rows where column 'val' has values: 10, 20, NULL, 30. What is the result of 'SELECT COUNT(*), COUNT(val) FROM T'?",
                  type: "single-choice",
                  difficulty: "foundation",
                  options: [
                    {
                      id: "a",
                      text: "4, 3",
                      explanation: "COUNT(*) counts all rows regardless of NULLs. COUNT(column_name) counts only non-NULL occurrences.",
                      isCorrect: true,
                    },
                    {
                      id: "b",
                      text: "4, 4",
                      explanation: "COUNT(val) ignores NULLs, so it returns 3.",
                      isCorrect: false,
                    },
                    {
                      id: "c",
                      text: "3, 3",
                      explanation: "COUNT(*) includes the row containing NULL.",
                      isCorrect: false,
                    },
                    {
                      id: "d",
                      text: "NULL, NULL",
                      explanation: "Aggregate functions return integers, never NULL for count.",
                      isCorrect: false,
                    },
                  ],
                  explanation: "COUNT(*) returns 4 (total rows in table), while COUNT(val) ignores the NULL entry and returns 3.",
                },
              ],
            },
            {
              type: "quick-revision",
              heading: "6. 1-Minute SQL Revision Card",
              oneMinutePanicCard: {
                coreRule:
                  "WHERE requires TRUE to keep rows; UNKNOWN and FALSE are both discarded. (col = NULL) is always UNKNOWN.",
                mustRememberFormulas: [
                  "NOT IN with any NULL in subquery returns 0 rows! Always prefer NOT EXISTS.",
                  "COUNT(*) counts all rows; COUNT(col) counts only non-null values.",
                  "Execution order: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY.",
                  "WHERE filters raw rows; HAVING filters grouped aggregates.",
                ],
                criticalPitfalls: [
                  "Never write WHERE col = NULL; write WHERE col IS NULL.",
                  "Column aliases created in SELECT cannot be referenced in WHERE.",
                ],
              },
            },
            {
              type: "resources",
              heading: "6. Cited Literature & SQL Standards",
              sources: [
                {
                  title: "SQL and Relational Theory: How to Write Accurate SQL Code",
                  authorOrInstitution: "C. J. Date (O'Reilly Media)",
                  topic: "Three-Valued Logic and SQL null semantics",
                  url: "https://www.oreilly.com/library/view/sql-and-relational/9781449319748/",
                  type: "primary-standard",
                  annotation: "The definitive analysis of SQL design flaws and 3-valued logic pitfalls.",
                },
                {
                  title: "Database System Concepts (10th Edition)",
                  authorOrInstitution: "Silberschatz, Korth, Sudarshan",
                  topic: "Chapters 3, 4 & 5: Structured Query Language (SQL)",
                  url: "https://www.db-book.com/",
                  type: "primary-standard",
                  annotation: "Standard undergraduate textbook covering subqueries and complex joins.",
                },
              ],
            },
          ],
        },
      ],
    },

    // =========================================================================
    // MODULE 5: FUNCTIONAL DEPENDENCIES & NORMALIZATION
    // =========================================================================
    {
      id: "module-5-normalization",
      title: "Module 5: Functional Dependencies & Normalization (1NF to BCNF)",
      slug: "functional-dependencies-and-normalization",
      description:
        "The formal mathematics of schema design: Armstrong's axioms, attribute closures, candidate key derivation, normal form testing, and lossless decomposition proofs.",
      order: 5,
      lessons: [
        {
          id: "functional-dependencies-and-normalization",
          title: "Functional Dependencies, Candidate Keys & Normal Forms (1NF to BCNF)",
          slug: "functional-dependencies-and-normalization",
          order: 1,
          estimatedMinutes: 28,
          tagline: "Armstrong axioms, attribute closures, 1NF to BCNF testing, and lossless decomposition.",
          hasInteractive: true,
          hasGATE: true,
          hasPractice: true,
          cheatsheet: {
            summaryRule: "2NF = No Partial Dependency (prime subset -> non-prime). 3NF = For all X -> Y, X is Superkey OR Y is Prime. BCNF = For all X -> Y, X MUST be a Superkey.",
            keyFormulasAndRules: [
              "Superkey count with single key size k: 2^(n - k).",
              "Lossless Decomposition Condition: (R1 ∩ R2) → R1 or (R1 ∩ R2) → R2.",
              "3NF always guarantees dependency preservation; BCNF may lose dependencies.",
              "Attributes that never appear on the RHS of any FD MUST be in every candidate key.",
              "Armstrong's Axioms: Reflexivity (Y ⊆ X ⇒ X → Y), Augmentation (X → Y ⇒ XZ → YZ), Transitivity (X → Y ∧ Y → Z ⇒ X → Z).",
            ],
            examPitfalls: [
              "A partial dependency only exists when a PROPER SUBSET of a candidate key determines a non-prime attribute.",
              "If all candidate keys are single attributes, 2NF is automatically satisfied without checking!",
            ],
          },
          sections: [
            {
              type: "explanation",
              heading: "1. The Quest for Redundancy-Free Schema Design",
              body: [
                "Poorly designed database schemas suffer from three catastrophic anomalies: Insertion Anomaly (cannot record a department without hiring an employee), Deletion Anomaly (deleting the last student in a course erases the course record), and Update Anomaly (changing an address requires updating 10,000 duplicate rows).",
                "Normalization is the formal mathematical decomposition of relations to eliminate redundant storage without losing information. It relies on Functional Dependencies (FDs): constraints asserting that knowing the value of attribute set X uniquely determines the value of attribute set Y (X → Y).",
              ],
            },
            {
              type: "explanation",
              heading: "2. Armstrong's Axioms & Attribute Closure",
              body: [
                "Armstrong's 3 Primary Axioms (Sound and Complete):",
                "1. Reflexivity: If Y ⊆ X, then X → Y (e.g., AB → A).",
                "2. Augmentation: If X → Y, then XZ → YZ for any Z.",
                "3. Transitivity: If X → Y and Y → Z, then X → Z.",
                "Secondary Derived Rules:",
                "• Union: If X → Y and X → Z, then X → YZ.",
                "• Decomposition: If X → YZ, then X → Y and X → Z.",
                "• Pseudotransitivity: If X → Y and WY → Z, then WX → Z.",
                "The Attribute Closure Algorithm (X+):",
                "To find all attributes determined by set X under dependencies F, initialize Closure = X. Repeatedly add RHS of any FD whose LHS is inside Closure until Closure stops expanding. If X+ equals all attributes of R, then X is a Superkey!",
              ],
            },
            {
              type: "interactive",
              heading: "3. Interactive Normalization & Candidate Key Engine",
              leadParagraph:
                "Experiment with relations and functional dependencies. Click attributes to compute their live attribute closure, derive all minimal candidate keys, and check 1NF, 2NF, 3NF, and BCNF compliance.",
              interactive: {
                kind: "normalization-analyzer",
                config: {
                  title: "Functional Dependency & Normal Form Evaluator",
                  caption: "Compute attribute closures and test 1NF, 2NF, 3NF, and BCNF conditions.",
                  defaultRelation: "R(A, B, C, D)",
                  defaultAttributes: ["A", "B", "C", "D"],
                  defaultFDs: [
                    { lhs: ["A", "B"], rhs: ["C"] },
                    { lhs: ["C"], rhs: ["D"] },
                    { lhs: ["D"], rhs: ["A"] },
                  ],
                },
              },
            },
            {
              type: "explanation",
              heading: "4. The Normal Form Hierarchy: 1NF → 2NF → 3NF → BCNF",
              body: [
                "Every normal form is strictly stricter than the one before it: BCNF ⊂ 3NF ⊂ 2NF ⊂ 1NF.",
                "1. First Normal Form (1NF): Every attribute value must be atomic (no arrays, lists, sets, or nested relations).",
                "2. Second Normal Form (2NF): Relation is in 1NF AND no non-prime attribute is partially dependent on any candidate key. (Violation: If candidate key is AB, and A → C where C is non-prime).",
                "3. Third Normal Form (3NF): Relation is in 2NF AND for every non-trivial FD X → Y, either X is a Superkey OR Y is a Prime Attribute. 3NF guarantees both Lossless Join AND Dependency Preservation!",
                "4. Boyce-Codd Normal Form (BCNF): For every non-trivial FD X → Y, X must strictly be a Superkey. BCNF eliminates all FD redundancy, but some schemas cannot achieve BCNF without losing dependency preservation!",
              ],
            },
            {
              type: "worked-example",
              heading: "5. GATE Classic: Counting Superkeys from Candidate Keys",
              problemStatement:
                "A relation R(A, B, C, D, E) has exactly one candidate key: AB. How many total superkeys exist for relation R?",
              givenData: [
                { label: "Total Attributes n", value: "5 (A, B, C, D, E)" },
                { label: "Candidate Key Size k", value: "2 (Attributes A and B)" },
              ],
              steps: [
                {
                  stepNumber: 1,
                  title: "Understand the Definition of Superkey",
                  description:
                    "A superkey is any superset of a candidate key. Therefore, every superkey must contain both attributes A and B.",
                },
                {
                  stepNumber: 2,
                  title: "Count Freedom for Remaining Attributes",
                  description:
                    "The remaining attributes {C, D, E} can either be included or excluded from the superkey. There are n - k = 5 - 2 = 3 independent choices.",
                  formula: "Choices = 2^(n - k)",
                },
                {
                  stepNumber: 3,
                  title: "Calculate Total Superkeys",
                  description:
                    "2^(5 - 2) = 2^3 = 8 superkeys: {AB, ABC, ABD, ABE, ABCD, ABCE, ABDE, ABCDE}.",
                  formula: "Total Superkeys = 8",
                },
              ],
              finalAnswer: "8 total superkeys exist.",
              examTakeaway:
                "When multiple candidate keys exist, use the Principle of Inclusion-Exclusion: |SK(K1 ∪ K2)| = |SK(K1)| + |SK(K2)| - |SK(K1 ∩ K2)|.",
            },
            {
              type: "practice",
              heading: "6. Normalization Concept Verification",
              leadParagraph: "Solve high-frequency GATE normalization problems.",
              questions: [
                {
                  id: "q-norm-1",
                  prompt: "Relation R(A, B, C, D) has FDs: {A → B, B → C, C → D}. What is the candidate key and the highest normal form of R?",
                  type: "single-choice",
                  difficulty: "foundation",
                  options: [
                    {
                      id: "a",
                      text: "Key: A; Highest NF: 2NF",
                      explanation: "A is the only key (A+=ABCD). Since the key has only 1 attribute, no partial dependency can exist (2NF holds). But B→C and C→D have LHS that are not superkeys and RHS that are not prime (3NF fails).",
                      isCorrect: true,
                    },
                    {
                      id: "b",
                      text: "Key: A; Highest NF: 3NF",
                      explanation: "B→C violates 3NF because B is not a superkey and C is not prime.",
                      isCorrect: false,
                    },
                    {
                      id: "c",
                      text: "Key: ABCD; Highest NF: 1NF",
                      explanation: "A alone determines all attributes, so ABCD is not a minimal candidate key.",
                      isCorrect: false,
                    },
                    {
                      id: "d",
                      text: "Key: A; Highest NF: BCNF",
                      explanation: "BCNF requires every determinant to be a superkey, which B and C are not.",
                      isCorrect: false,
                    },
                  ],
                  explanation: "Key is A. 2NF holds because single-attribute keys cannot have partial dependencies. 3NF fails on B→C (transitive dependency). Highest normal form is 2NF.",
                },
              ],
            },
            {
              type: "quick-revision",
              heading: "7. 1-Minute Normalization Revision Anchors",
              oneMinutePanicCard: {
                coreRule:
                  "2NF = No Partial Dependency; 3NF = LHS Superkey OR RHS Prime; BCNF = LHS must be Superkey.",
                mustRememberFormulas: [
                  "Superkey count with single key size k: 2^(n - k).",
                  "Lossless condition: (R1 ∩ R2) → R1 or (R1 ∩ R2) → R2.",
                  "3NF always guarantees dependency preservation; BCNF may lose dependencies.",
                  "Attributes that never appear on the RHS of any FD MUST be in every candidate key.",
                ],
                criticalPitfalls: [
                  "A partial dependency only exists when a PROPER SUBSET of a key determines a non-prime attribute.",
                  "If all candidate keys are single attributes, 2NF is automatically satisfied!",
                ],
              },
            },
            {
              type: "resources",
              heading: "8. Cited Literature & Formal Proofs",
              sources: [
                {
                  title: "Further Normalization of the Data Base Relational Model",
                  authorOrInstitution: "Edgar F. Codd (Courant Computer Science Symposia, 1971)",
                  topic: "Introduction of 2NF and 3NF",
                  url: "https://dl.acm.org/doi/10.1145/320434.320440",
                  type: "academic-paper",
                  annotation: "Foundational paper formalizing functional dependencies and relational decomposition.",
                },
                {
                  title: "Database System Concepts (10th Edition)",
                  authorOrInstitution: "Silberschatz, Korth, Sudarshan",
                  topic: "Chapter 7: Relational Database Design",
                  url: "https://www.db-book.com/",
                  type: "primary-standard",
                  annotation: "Canonical reference for minimal cover and lossless decomposition algorithms.",
                },
              ],
            },
          ],
        },
      ],
    },

    // =========================================================================
    // MODULE 6: STORAGE, INDEXING & B/B+ TREES
    // =========================================================================
    {
      id: "module-6-indexing",
      title: "Module 6: Storage, Indexing & B/B+ Trees",
      slug: "b-plus-trees-and-indexing",
      description:
        "The physical engine under the hood: primary vs secondary indexing, B+ Tree internal vs leaf node order inequalities, capacity formulas, and disk block I/O access costs.",
      order: 6,
      lessons: [
        {
          id: "b-plus-trees-and-indexing",
          title: "B & B+ Trees, Multi-Level Indexing & Disk I/O Arithmetic",
          slug: "b-plus-trees-and-indexing",
          order: 1,
          estimatedMinutes: 25,
          tagline: "Internal and leaf node order inequalities, B+ tree splits, and disk I/O calculations.",
          hasInteractive: true,
          hasGATE: true,
          hasPractice: true,
          cheatsheet: {
            summaryRule: "B+ Tree: Keys only in internal nodes; keys + data pointers in leaves; leaves linked horizontally. Internal order: p · Pb + (p - 1) · K ≤ B. Leaf order: m · (K + Pr) + Pb ≤ B.",
            keyFormulasAndRules: [
              "Internal order inequality: p · Pb + (p - 1) · K ≤ B.",
              "Leaf order inequality: m · (K + Pr) + Pb ≤ B.",
              "Min keys non-root internal: ⌈p/2⌉ - 1. Min keys non-root leaf: ⌈m/2⌉.",
              "Root min keys: 1 key (2 pointers). Max keys: p - 1.",
              "Disk I/Os for search = Height + 1 (Height index blocks + 1 data block).",
            ],
            examPitfalls: [
              "In internal nodes, pointers are p and keys are p - 1; in leaf nodes, pointers and keys are both m (plus 1 next block pointer).",
              "Range queries in B+ Trees do not traverse back up to the root; they walk horizontally along the leaf pointers.",
            ],
          },
          sections: [
            {
              type: "explanation",
              heading: "1. The Disk I/O Bottleneck",
              body: [
                "Main memory access takes ~100 nanoseconds; reading a disk block takes ~5-10 milliseconds (50,000× slower!). An enterprise table with 10 million rows cannot be scanned sequentially on every query.",
                "Indexing creates balanced multi-level search trees on disk that reduce search complexity from linear O(N) block scans to O(log_p N) disk block transfers. In real systems, a B+ Tree with height 3 can index billions of records while requiring only 3 disk reads to locate any record.",
              ],
            },
            {
              type: "explanation",
              heading: "2. B-Tree vs B+ Tree: Why B+ Trees Rule Databases",
              body: [
                "Modern database engines (MySQL InnoDB, PostgreSQL, Oracle) exclusively use B+ Trees rather than standard B-Trees.",
                "The Core Difference:",
                "• Standard B-Tree: Stores keys AND actual data record pointers in both internal nodes and leaf nodes. Because record pointers take up space in internal nodes, the fanout (node order p) is small, resulting in taller trees and more disk I/Os.",
                "• B+ Tree: Stores ONLY search keys and block pointers in internal nodes. All data record pointers reside strictly in the leaf nodes. Furthermore, all leaf nodes are connected via a doubly-linked list.",
                "Why B+ Trees are Superior:",
                "1. Massive Fanout: Internal nodes don't store record pointers, allowing many more keys per disk block (higher order p), yielding shallower trees.",
                "2. Blazing Range Queries: Finding values between ₹10,000 and ₹50,000 in a B-Tree requires costly in-order tree traversal across random disk blocks. In a B+ Tree, search locates the first leaf block, then simply walks the linked list horizontally along contiguous disk blocks.",
              ],
            },
            {
              type: "interactive",
              heading: "3. Interactive B+ Tree Order & Capacity Calculator",
              leadParagraph:
                "Enter your disk block size, key size, and pointer sizes to solve the exact algebraic inequalities for internal and leaf node orders and compute tree height and I/O costs.",
              interactive: {
                kind: "b-plus-tree-calculator",
                config: {
                  title: "B+ Tree Node Order & Capacity Calculator",
                  caption: "Solves p * P_b + (p - 1) * Key <= BlockSize and leaf inequalities.",
                  defaultBlockSize: 512,
                  defaultKeySize: 10,
                  defaultBlockPointerSize: 8,
                  defaultRecordPointerSize: 8,
                },
              },
            },
            {
              type: "worked-example",
              heading: "4. GATE Classic: B+ Tree Node Order Numerical",
              problemStatement:
                "A database disk block is 512 bytes. Search key size is 10 bytes. Block pointer size is 8 bytes. Record pointer size is 8 bytes. Calculate the maximum order of (1) an Internal node, and (2) a Leaf node.",
              givenData: [
                { label: "Block Size (B)", value: "512 Bytes" },
                { label: "Search Key (K)", value: "10 Bytes" },
                { label: "Block Pointer (Pb)", value: "8 Bytes" },
                { label: "Record Pointer (Pr)", value: "8 Bytes" },
              ],
              steps: [
                {
                  stepNumber: 1,
                  title: "Derive Internal Node Order p",
                  description:
                    "An internal node of order p contains p block pointers and (p - 1) search keys. Total size cannot exceed block size B.",
                  formula: "p · Pb + (p - 1) · K ≤ B",
                  intermediateResult: "p · 8 + (p - 1) · 10 ≤ 512 ⇒ 18p - 10 ≤ 512 ⇒ 18p ≤ 522 ⇒ p = 29",
                },
                {
                  stepNumber: 2,
                  title: "Derive Leaf Node Order m",
                  description:
                    "A leaf node stores m search key-record pointer pairs and 1 block pointer to the next leaf node.",
                  formula: "m · (K + Pr) + Pb ≤ B",
                  intermediateResult: "m · (10 + 8) + 8 ≤ 512 ⇒ 18m ≤ 504 ⇒ m = 28",
                },
              ],
              finalAnswer: "Order of Internal node p = 29; Order of Leaf node m = 28.",
              examTakeaway:
                "In internal nodes: (p - 1) keys and p block pointers. In leaf nodes: m (key + record pointer) pairs plus 1 next-leaf block pointer.",
            },
            {
              type: "practice",
              heading: "5. B+ Tree Indexing Quiz",
              leadParagraph: "Test your understanding of tree height and node split bounds.",
              questions: [
                {
                  id: "q-b-1",
                  prompt: "In a B+ Tree where internal nodes have maximum order p = 10, what is the minimum number of keys an internal node (other than root) must contain?",
                  type: "single-choice",
                  difficulty: "foundation",
                  options: [
                    {
                      id: "a",
                      text: "4 keys",
                      explanation: "Minimum pointers in non-root internal node is ⌈p/2⌉ = ⌈10/2⌉ = 5. Minimum keys = pointers - 1 = 5 - 1 = 4.",
                      isCorrect: true,
                    },
                    {
                      id: "b",
                      text: "5 keys",
                      explanation: "5 is the minimum number of pointers, not keys.",
                      isCorrect: false,
                    },
                    {
                      id: "c",
                      text: "1 key",
                      explanation: "Only the root node can have as few as 1 key.",
                      isCorrect: false,
                    },
                    {
                      id: "d",
                      text: "9 keys",
                      explanation: "9 is the maximum number of keys (p - 1).",
                      isCorrect: false,
                    },
                  ],
                  explanation: "For internal node of order p, min pointers = ⌈p/2⌉ = 5, so min keys = ⌈p/2⌉ - 1 = 4 keys.",
                },
              ],
            },
            {
              type: "quick-revision",
              heading: "6. 1-Minute B+ Tree Revision Card",
              oneMinutePanicCard: {
                coreRule:
                  "B+ Tree: Keys only in internal nodes; keys + data pointers in leaves; leaves linked horizontally.",
                mustRememberFormulas: [
                  "Internal order inequality: p · Pb + (p - 1) · K ≤ B.",
                  "Leaf order inequality: m · (K + Pr) + Pb ≤ B.",
                  "Min keys non-root internal: ⌈p/2⌉ - 1. Min keys non-root leaf: ⌈m/2⌉.",
                  "Root min keys: 1 key (2 pointers). Max keys: p - 1.",
                  "Disk I/Os for search = Height + 1 (Height index blocks + 1 data block).",
                ],
                criticalPitfalls: [
                  "In internal nodes, pointers are p and keys are p - 1; in leaf nodes, pointers and keys are both m (plus 1 next block pointer).",
                  "Range queries in B+ Trees do not traverse back up to the root; they walk horizontally along the leaf pointers.",
                ],
              },
            },
            {
              type: "resources",
              heading: "7. Cited Literature & Classic Papers",
              sources: [
                {
                  title: "The Ubiquitous B-Tree",
                  authorOrInstitution: "Douglas Comer (ACM Computing Surveys, 1979)",
                  topic: "Comprehensive survey of B-Tree and B+ Tree data structures",
                  url: "https://dl.acm.org/doi/10.1145/356770.356776",
                  type: "academic-paper",
                  annotation: "The classic paper defining B-tree variants, split mechanics, and storage efficiency.",
                },
                {
                  title: "Database System Concepts (10th Edition)",
                  authorOrInstitution: "Silberschatz, Korth, Sudarshan",
                  topic: "Chapter 14: Indexing and Hashing",
                  url: "https://www.db-book.com/",
                  type: "primary-standard",
                  annotation: "Standard reference for B+ tree insertion splits, deletion borrow/merges, and order algebra.",
                },
              ],
            },
          ],
        },
      ],
    },

    // =========================================================================
    // MODULE 7: TRANSACTIONS & CONCURRENCY CONTROL
    // =========================================================================
    {
      id: "module-7-transactions",
      title: "Module 7: Transactions & Concurrency Control",
      slug: "transactions-and-serializability",
      description:
        "ACID guarantees, transaction state machines, precedence graph cycle detection for conflict serializability, and schedule recoverability classes.",
      order: 7,
      lessons: [
        {
          id: "transactions-and-serializability",
          title: "ACID Invariants, Precedence Graphs & Conflict Serializability",
          slug: "transactions-and-serializability",
          order: 1,
          estimatedMinutes: 28,
          tagline: "ACID, conflicting operations, precedence graphs, cycles, and recoverability classes.",
          hasInteractive: true,
          hasGATE: true,
          hasPractice: true,
          cheatsheet: {
            summaryRule: "Conflicting pair = Same data item, different transactions, AT LEAST ONE WRITE. A schedule is Conflict Serializable iff its directed Precedence Graph is ACYCLIC.",
            keyFormulasAndRules: [
              "Precedence Graph: Edge Ti → Tj exists if Ti executes an operation that conflicts with a subsequent operation of Tj.",
              "Acyclic precedence graph? Topological sort gives equivalent serial schedule!",
              "Recoverable: Ti commits before Tj commits (where Tj reads a value written by Ti).",
              "Cascadeless: Ti commits before Tj READS the value written by Ti.",
              "Strict: Ti commits before Tj reads OR writes the item written by Ti.",
            ],
            examPitfalls: [
              "Two READ operations on the same data item never conflict with each other.",
              "A schedule can be conflict serializable but still non-recoverable! Serializability and Recoverability are independent dimensions.",
            ],
          },
          sections: [
            {
              type: "explanation",
              heading: "1. The Chaos of Interleaved Executions",
              body: [
                "When thousands of users execute bank transfers simultaneously, executing them sequentially one-by-one destroys throughput. But interleaving their operations blindly causes Lost Updates, Dirty Reads, and Inconsistent Summaries.",
                "A Transaction is a logical unit of database processing that includes one or more database access operations. To maintain database consistency amidst failures and concurrency, the DBMS must guarantee the famous ACID Properties:",
                "• Atomicity: All-or-nothing execution. Managed by the recovery log (Undo mechanism).",
                "• Consistency: Database transitions from one valid state satisfying all integrity constraints to another valid state.",
                "• Isolation: Concurrently executing transactions are shielded from each other's uncommitted intermediate states. Managed by the Concurrency Control Manager.",
                "• Durability: Once a transaction commits, its updates persist permanently even if the power fails 1 millisecond later. Managed by Write-Ahead Logging (Redo mechanism).",
              ],
            },
            {
              type: "explanation",
              heading: "2. Conflict Serializability & Precedence Graphs",
              body: [
                "A schedule is Conflict Serializable if it is conflict-equivalent to some serial execution of the same transactions.",
                "What Constitutes a Conflicting Operation?",
                "Two operations I_i and I_j belonging to different transactions are in conflict if and only if:",
                "1. They belong to different transactions (T_i ≠ T_j),",
                "2. They access the exact same data item X,",
                "3. At least one of them is a WRITE (W(X)).",
                "The Three Conflicting Pairs:",
                "• R_i(X) and W_j(X) (Read-Write conflict / Anti-dependency)",
                "• W_i(X) and R_j(X) (Write-Read conflict / Dirty Read hazard)",
                "• W_i(X) and W_j(X) (Write-Write conflict / Blind Write hazard)",
                "The Precedence Graph (Serialization Graph) Test:",
                "1. Create a node for each participating transaction T_i.",
                "2. Draw a directed edge T_i → T_j if T_i executes a conflicting operation on item X before T_j executes its conflicting operation on X.",
                "3. Theorem: A schedule is Conflict Serializable IF AND ONLY IF its precedence graph contains NO DIRECTED CYCLES (is a DAG).",
                "4. If acyclic, the Topological Sort of the graph yields the exact equivalent serial schedule!",
              ],
            },
            {
              type: "interactive",
              heading: "3. Interactive Precedence Graph & Serializability Checker",
              leadParagraph:
                "Select classic GATE schedule presets or test your own interleaved operations. The simulator automatically identifies conflicting pairs, builds the directed precedence graph, detects cycles, and derives the equivalent serial schedule.",
              interactive: {
                kind: "serializability-checker",
                config: {
                  title: "Precedence Graph & Conflict Serializability Engine",
                  caption: "Identifies conflicting operations and tests precedence graphs for directed cycles.",
                  defaultSchedule: [
                    { id: "1", transaction: "T1", op: "R", item: "X" },
                    { id: "2", transaction: "T2", op: "R", item: "X" },
                    { id: "3", transaction: "T1", op: "W", item: "X" },
                    { id: "4", transaction: "T2", op: "W", item: "X" },
                  ],
                  sampleSchedules: [
                    {
                      name: "GATE Cycle Hazard (T1 ↔ T2)",
                      description: "R1(X) R2(X) W1(X) W2(X): Creates T2→T1 and T1→T2 cycle.",
                      schedule: [
                        { id: "1", transaction: "T1", op: "R", item: "X" },
                        { id: "2", transaction: "T2", op: "R", item: "X" },
                        { id: "3", transaction: "T1", op: "W", item: "X" },
                        { id: "4", transaction: "T2", op: "W", item: "X" },
                      ],
                    },
                    {
                      name: "Conflict Serializable (T2 → T1)",
                      description: "R2(X) W2(X) R1(X) W1(X): Acyclic directed graph.",
                      schedule: [
                        { id: "1", transaction: "T2", op: "R", item: "X" },
                        { id: "2", transaction: "T2", op: "W", item: "X" },
                        { id: "3", transaction: "T1", op: "R", item: "X" },
                        { id: "4", transaction: "T1", op: "W", item: "X" },
                      ],
                    },
                    {
                      name: "3-Transaction Pipeline (T1 → T2 → T3)",
                      description: "Multi-item dependencies across X and Y.",
                      schedule: [
                        { id: "1", transaction: "T1", op: "W", item: "X" },
                        { id: "2", transaction: "T2", op: "R", item: "X" },
                        { id: "3", transaction: "T2", op: "W", item: "Y" },
                        { id: "4", transaction: "T3", op: "R", item: "Y" },
                      ],
                    },
                  ],
                },
              },
            },
            {
              type: "explanation",
              heading: "4. Schedule Recoverability Hierarchy",
              body: [
                "Serializability guarantees correctness, but recoverability guarantees that an unexpected crash will not leave the database in an unrecoverable corrupted state.",
                "1. Recoverable Schedule: If transaction T_j reads a value written by T_i, then T_i must commit BEFORE T_j commits.",
                "Why: If T_j commits first and T_i aborts, T_j committed invalid dirty data that cannot be rolled back!",
                "2. Cascadeless Schedule (Avoids Cascading Aborts): If T_j reads a value written by T_i, then T_i must commit BEFORE T_j even performs its READ.",
                "Why: Prevents domino-effect aborts where aborting T_1 forces 50 downstream transactions to be cancelled.",
                "3. Strict Schedule: If T_j wants to Read OR Write an item written by T_i, T_i must commit or abort first.",
                "The Universal Schedule Subset Hierarchy: All Schedules ⊃ Recoverable ⊃ Cascadeless ⊃ Strict.",
              ],
            },
            {
              type: "practice",
              heading: "5. Serializability & Concurrency Quiz",
              leadParagraph: "Solve classic GATE questions on serializability and schedules.",
              questions: [
                {
                  id: "q-tx-1",
                  prompt: "Consider schedule S: r1(X); r2(X); w1(X); w2(X). Which of the following is true?",
                  type: "single-choice",
                  difficulty: "foundation",
                  options: [
                    {
                      id: "a",
                      text: "S is not conflict serializable because its precedence graph contains a cycle",
                      explanation: "r2(X) precedes w1(X) giving edge T2→T1. r1(X) precedes w2(X) giving edge T1→T2. The cycle T1↔T2 proves non-serializability.",
                      isCorrect: true,
                    },
                    {
                      id: "b",
                      text: "S is conflict serializable with equivalent serial order T1 → T2",
                      explanation: "The edge T2→T1 contradicts the serial order T1→T2.",
                      isCorrect: false,
                    },
                    {
                      id: "c",
                      text: "S is conflict serializable with equivalent serial order T2 → T1",
                      explanation: "The edge T1→T2 contradicts the serial order T2→T1.",
                      isCorrect: false,
                    },
                    {
                      id: "d",
                      text: "S is view serializable without blind writes",
                      explanation: "A schedule with no blind writes is view serializable if and only if it is conflict serializable.",
                      isCorrect: false,
                    },
                  ],
                  explanation: "Conflicting pairs r2(X)-w1(X) forces T2→T1, while r1(X)-w2(X) forces T1→T2. The cycle between T1 and T2 proves S is not conflict serializable.",
                },
              ],
            },
            {
              type: "quick-revision",
              heading: "6. 1-Minute Concurrency Revision Card",
              oneMinutePanicCard: {
                coreRule:
                  "Conflicting pair = Same item, different tx, AT LEAST ONE WRITE. Cycle in precedence graph = NOT Conflict Serializable.",
                mustRememberFormulas: [
                  "Precedence Graph: Ti → Tj if Ti does conflicting op before Tj.",
                  "Acyclic graph? Topological sort gives equivalent serial schedule!",
                  "Recoverable: Ti commits before Tj commits (where Tj reads from Ti).",
                  "Cascadeless: Ti commits before Tj READS from Ti.",
                  "Strict: Ti commits before Tj reads OR writes X.",
                ],
                criticalPitfalls: [
                  "Two READ operations on the same data item never conflict with each other.",
                  "A schedule can be conflict serializable but still non-recoverable!",
                ],
              },
            },
            {
              type: "resources",
              heading: "7. Cited Literature & Classic Papers",
              sources: [
                {
                  title: "The Notions of Consistency and Predicate Locks in a Database System",
                  authorOrInstitution: "K. P. Eswaran, J. N. Gray, R. A. Lorie, I. L. Traiger (CACM 1976)",
                  topic: "The founding paper on serializability theory and Two-Phase Locking",
                  url: "https://dl.acm.org/doi/10.1145/360363.360369",
                  type: "academic-paper",
                  annotation: "Turing Award-winning paper that mathematically proved conflict serializability theorems.",
                },
                {
                  title: "Database System Concepts (10th Edition)",
                  authorOrInstitution: "Silberschatz, Korth, Sudarshan",
                  topic: "Chapter 17: Transactions & Concurrency Control",
                  url: "https://www.db-book.com/",
                  type: "primary-standard",
                  annotation: "Standard reference for precedence graph construction and recoverability definitions.",
                },
              ],
            },
          ],
        },
      ],
    },

    // =========================================================================
    // MODULE 8: CONCURRENCY PROTOCOLS & RECOVERY
    // =========================================================================
    {
      id: "module-8-protocols-and-recovery",
      title: "Module 8: Concurrency Protocols, Deadlocks & Crash Recovery",
      slug: "locking-protocols-and-recovery",
      description:
        "Practical enforcement: Two-Phase Locking (2PL) variants, Timestamp Ordering Protocol, Wait-Die/Wound-Wait deadlock prevention, and Write-Ahead Logging (WAL) recovery.",
      order: 8,
      lessons: [
        {
          id: "locking-protocols-and-recovery",
          title: "Two-Phase Locking (2PL), Timestamp Ordering & Write-Ahead Logging",
          slug: "locking-protocols-and-recovery",
          order: 1,
          estimatedMinutes: 24,
          tagline: "2PL variants, Wait-Die vs Wound-Wait, and Write-Ahead Logging crash recovery.",
          hasInteractive: false,
          hasGATE: true,
          hasPractice: true,
          cheatsheet: {
            summaryRule: "Strict 2PL holds exclusive write locks until transaction commit (guarantees cascadelessness). Conservative 2PL acquires all locks prior to execution (deadlock-free). Write-Ahead Logging (WAL) flushes log records before dirty buffer pages.",
            keyFormulasAndRules: [
              "Basic 2PL: Growing phase (acquire locks only) -> Shrinking phase (release locks only). Guarantees conflict serializability.",
              "Strict 2PL: Holds exclusive locks until commit. Guarantees conflict serializability + strict recoverability. Still prone to deadlocks.",
              "Rigorous 2PL: Holds ALL locks (shared and exclusive) until commit.",
              "Wait-Die (Non-preemptive): Old waits for Young; Young dies if requesting lock held by Old.",
              "Wound-Wait (Preemptive): Old wounds Young (preempts lock); Young waits for Old.",
              "Crash Recovery (WAL): Committed before crash? REDO using log after-image. Uncommitted before crash? UNDO using log before-image.",
            ],
            examPitfalls: [
              "Deadlocks can still occur in Strict 2PL and Rigorous 2PL!",
              "Redo requires the log's AFTER-image; Undo requires the log's BEFORE-image.",
            ],
          },
          sections: [
            {
              type: "explanation",
              heading: "1. From Theory to Engine Implementation",
              body: [
                "Testing precedence graphs after the fact is impossible in real database servers: an engine cannot wait for a day of transactions to run and then check if a cycle occurred. Instead, database engines use concurrency protocols (like 2PL) that guarantee serializability proactively.",
                "Concurrency control protocols ensure that interleaved executions are guaranteed to produce conflict serializable schedules on the fly. Meanwhile, the Crash Recovery Subsystem guarantees that if the server loses power during a write operation, the database can reconstruct committed states and roll back half-finished transactions.",
              ],
            },
            {
              type: "explanation",
              heading: "2. Two-Phase Locking (2PL) Protocol & Its Variants",
              body: [
                "The 2PL Rule: A transaction must acquire all its locks before releasing any lock. It consists of two phases:",
                "1. Growing Phase: Locks may be acquired, but NO locks can be released.",
                "2. Lock Point: The exact moment when the transaction acquires its final lock.",
                "3. Shrinking Phase: Locks may be released, but NO new locks can be acquired.",
                "The 4 Major Variants of 2PL:",
                "• Basic 2PL: Follows the 2 phases. Guarantees conflict serializability, but can suffer from deadlocks and cascading aborts.",
                "• Conservative 2PL (Static 2PL): Transaction locks ALL needed items before execution begins. If any item is unavailable, it waits without locking anything. Guarantees Deadlock-Free execution, but reduces concurrency.",
                "• Strict 2PL: Transaction holds all its Exclusive (X) write locks until after it commits or aborts. Guarantees Cascadelessness and Strict Recoverability! (Does NOT prevent deadlock).",
                "• Rigorous 2PL: Transaction holds ALL locks (Shared and Exclusive) until after commit. Guarantees that the serialization order matches the exact commit order.",
              ],
            },
            {
              type: "comparison",
              heading: "3. Comparison Matrix of 2PL Variants",
              leadParagraph: "A quick summary of the guarantees and tradeoffs across 2PL protocols.",
              columns: ["Protocol Variant", "Guarantees & Characteristics"],
              criteria: [
                {
                  feature: "Basic 2PL",
                  first: "Standard Growing & Shrinking phases.",
                  second: "Guarantees Conflict Serializability; Vulnerable to Deadlocks & Cascading Aborts.",
                },
                {
                  feature: "Conservative 2PL",
                  first: "Pre-claims all locks prior to execution start.",
                  second: "Guarantees Conflict Serializability + Deadlock Freedom; Poor concurrency.",
                },
                {
                  feature: "Strict 2PL",
                  first: "Holds Exclusive (Write) locks until commit/abort.",
                  second: "Guarantees Conflict Serializability + Cascadeless / Strict Recoverability; Deadlocks possible.",
                },
                {
                  feature: "Rigorous 2PL",
                  first: "Holds both Shared (Read) and Exclusive (Write) locks until commit.",
                  second: "Serial order matches commit order; Most commonly implemented in commercial RDBMS.",
                },
              ],
              summaryTakeaway:
                "Strict 2PL and Rigorous 2PL are the industry standards because preventing cascading aborts is mandatory for enterprise reliability.",
            },
            {
              type: "explanation",
              heading: "4. Deadlock Prevention: Wait-Die vs Wound-Wait",
              body: [
                "Assign each transaction T_i a unique timestamp TS(T_i) based on start time. Older transactions have smaller timestamps (TS(T_old) < TS(T_young)).",
                "1. Wait-Die Scheme (Non-preemptive):",
                "When T_i requests a lock held by T_j:",
                "• If T_i is older (TS(T_i) < TS(T_j)): T_i is allowed to WAIT.",
                "• If T_i is younger (TS(T_i) > TS(T_j)): T_i is killed (DIES) and restarts with its original timestamp.",
                "Mnemonic: The old wait; the young die.",
                "2. Wound-Wait Scheme (Preemptive):",
                "When T_i requests a lock held by T_j:",
                "• If T_i is older (TS(T_i) < TS(T_j)): T_i preempts (WOUNDS) T_j, forcing T_j to abort and release its lock.",
                "• If T_i is younger (TS(T_i) > TS(T_j)): T_i is allowed to WAIT.",
                "Mnemonic: The old wound the young; the young wait.",
                "Result: Both schemes guarantee Deadlock Freedom because wait edges can only flow in one direction in the timestamp timeline!",
              ],
            },
            {
              type: "explanation",
              heading: "5. Crash Recovery & Write-Ahead Logging (WAL)",
              body: [
                "The Write-Ahead Logging (WAL) Protocol:",
                "1. Before any data page is written to disk, its corresponding log record (containing old value and new value) must be flushed to persistent disk log storage.",
                "2. A transaction cannot be acknowledged as committed until its <Ti, COMMIT> log record has been safely flushed to disk.",
                "Checkpointing & The Undo/Redo Algorithm:",
                "To avoid scanning the log back to the beginning of time upon reboot, the DBMS periodically writes a Checkpoint:",
                "1. Flushes all dirty buffer pool pages to disk.",
                "2. Writes a <CHECKPOINT> log entry and flushes the log.",
                "Recovery on Restart:",
                "• REDO List: Transactions that wrote <Ti, COMMIT> into the log before crash. Their updates are reapplied to disk to guarantee Durability.",
                "• UNDO List: Transactions that started (<Ti, START>) but never committed before the crash. Their partial writes are rolled back using the log's before-image to guarantee Atomicity.",
              ],
            },
            {
              type: "practice",
              heading: "6. Locking & Recovery Quiz",
              leadParagraph: "Test your understanding of 2PL, deadlock schemes, and WAL recovery.",
              questions: [
                {
                  id: "q-proto-1",
                  prompt: "Which of the following properties is guaranteed by the Strict Two-Phase Locking (Strict 2PL) protocol?",
                  type: "single-choice",
                  difficulty: "foundation",
                  options: [
                    {
                      id: "a",
                      text: "Conflict serializability and strict (hence cascadeless) recoverability",
                      explanation: "Strict 2PL holds exclusive locks until commit, guaranteeing conflict serializability and eliminating dirty read hazards, ensuring strict recoverability.",
                      isCorrect: true,
                    },
                    {
                      id: "b",
                      text: "Freedom from deadlocks",
                      explanation: "Strict 2PL does not prevent deadlocks; transactions can still wait on locks held by each other in cycles.",
                      isCorrect: false,
                    },
                    {
                      id: "c",
                      text: "View serializability without conflict serializability",
                      explanation: "Strict 2PL enforces conflict serializability, not just view serializability.",
                      isCorrect: false,
                    },
                    {
                      id: "d",
                      text: "Immediate commit without logging",
                      explanation: "Logging is an orthogonal requirement for durability.",
                      isCorrect: false,
                    },
                  ],
                  explanation: "Strict 2PL guarantees both conflict serializability and strict recoverability (avoiding cascading aborts). It does NOT prevent deadlocks.",
                },
              ],
            },
            {
              type: "quick-revision",
              heading: "7. 1-Minute Protocols & Recovery Revision Card",
              oneMinutePanicCard: {
                coreRule:
                  "Strict 2PL holds write locks until commit (cascadeless). Conservative 2PL pre-claims all locks (deadlock-free). WAL flushes log before dirty pages.",
                mustRememberFormulas: [
                  "Wait-Die: Old waits, Young dies (non-preemptive).",
                  "Wound-Wait: Old wounds young, Young waits (preemptive).",
                  "Committed before crash? REDO. Uncommitted before crash? UNDO.",
                  "Strict 2PL guarantees Cascadelessness and Strict Recoverability, but NOT Deadlock freedom.",
                ],
                criticalPitfalls: [
                  "Deadlocks can still occur in Strict 2PL and Rigorous 2PL!",
                  "Redo requires the log's AFTER-image; Undo requires the log's BEFORE-image.",
                ],
              },
            },
            {
              type: "resources",
              heading: "8. Cited Literature & Classic Papers",
              sources: [
                {
                  title: "ARIES: A Transaction Recovery Method Supporting Fine-Granularity Locking and Partial Rollbacks",
                  authorOrInstitution: "C. Mohan, Don Haderle, Bruce Lindsay, Hamid Pirahesh, Peter Schwarz (ACM TODS 1992)",
                  topic: "The landmark industry recovery algorithm used in IBM DB2, SQL Server, and SQLite",
                  url: "https://dl.acm.org/doi/10.1145/128765.128770",
                  type: "academic-paper",
                  annotation: "The definitive research paper on Write-Ahead Logging and repeating history during crash recovery.",
                },
                {
                  title: "Transaction Processing: Concepts and Techniques",
                  authorOrInstitution: "Jim Gray, Andreas Reuter (Morgan Kaufmann)",
                  topic: "Chapters 7 & 10: Concurrency Control and Recovery Management",
                  url: "https://www.sciencedirect.com/book/9781558601901/transaction-processing",
                  type: "primary-standard",
                  annotation: "The bible of transaction systems engineering by Turing Award winner Jim Gray.",
                },
              ],
            },
          ],
        },
      ],
    },
    // =========================================================================
    // MODULE 9: DATA WAREHOUSING & MULTIDIMENSIONAL MODELING (GATE DA CORE)
    // =========================================================================
    {
      syllabusScope: "GATE 2027 DA-specific warehouse and transformation material; not CS/IT core",
      id: "module-9-data-warehousing",
      title: "Module 9: Data Warehousing & Multidimensional Modeling",
      slug: "data-warehousing-olap",
      description:
        "Data warehouse architecture, ETL staging, multidimensional data models, Star vs Snowflake schemas, and OLAP algebra (roll-up, drill-down, slice, dice).",
      order: 9,
      lessons: [
        {
          id: "data-warehousing-olap-schemas",
          syllabusScope: "GATE 2027 DA core",
          title: "Data Warehousing, Multidimensional OLAP Models & Star/Snowflake Schemas",
          slug: "data-warehousing-olap-schemas",
          order: 1,
          estimatedMinutes: 30,
          tagline: "ETL staging, dimension vs fact tables, star vs snowflake normalizations, and OLAP slicing/dicing operations.",
          hasInteractive: false,
          hasGATE: true,
          hasPractice: true,
          cheatsheet: {
            summaryRule: "Data Warehouses separate analytical OLAP workloads from transactional OLTP. Fact tables hold numeric additive measures; Dimension tables hold descriptive hierarchies. Star schema denormalizes dimensions; Snowflake schema normalizes dimensions into BCNF/3NF.",
            keyFormulasAndRules: [
              "OLTP vs OLAP: OLTP is write-heavy, 3NF/BCNF normalized, row-oriented, ACID transactional. OLAP is read-heavy, star/snowflake denormalized, column-oriented, analytical aggregate queries.",
              "Fact Table: Contains composite primary key (concatenation of foreign keys to all dimension tables) and numerical measures (additive e.g. sales, semi-additive e.g. bank balance, non-additive e.g. unit price/ratios).",
              "Star Schema: Single central fact table directly referencing completely denormalized, un-normalized dimension tables (simple queries, fast joins, higher data redundancy).",
              "Snowflake Schema: Dimension tables are normalized into sub-dimension hierarchies (e.g., Item -> Brand -> Category). Reduces redundancy, but requires multi-table joins.",
              "Fact Constellation (Galaxy Schema): Multiple fact tables sharing common conformed dimension tables (e.g., Sales Fact and Shipping Fact sharing Date and Store dimensions).",
              "OLAP Operations: (1) Roll-up (aggregation/climbing hierarchy e.g. day -> month), (2) Drill-down (disaggregation/descending hierarchy e.g. quarter -> month), (3) Slice (fixing one dimension e.g. Time = '2024'), (4) Dice (sub-cube selection along multiple dimensions), (5) Pivot (rotating cube axes).",
              "OLAP Architectures: ROLAP (Relational OLAP, star schemas in RDBMS), MOLAP (Multidimensional OLAP, pre-computed dense arrays/tensors), HOLAP (Hybrid OLAP, detailed data in ROLAP, aggregated summaries in MOLAP).",
            ],
            examPitfalls: [
              "A measure cannot be added across dimensions if it is non-additive (e.g., averaging percentages or profit margins across stores requires recomputing numerator and denominator).",
              "Snowflake schema reduces storage redundancy compared to Star schema, but degrades query performance due to additional JOIN operations.",
            ],
          },
          sections: [
            {
              type: "explanation",
              heading: "1. The Architectural Divide: OLTP vs Data Warehousing (OLAP)",
              body: [
                "Operational database systems (**OLTP — On-Line Transaction Processing**) are engineered for high-concurrency, short write transactions that insert, update, and delete individual records (e.g., ATM withdrawals, e-commerce checkouts). OLTP databases prioritize ACID transactions and 3NF/BCNF normalization to eliminate write update anomalies.",
                "In contrast, a **Data Warehouse (OLAP — On-Line Analytical Processing)** is an enterprise repository constructed for consolidated decision-support queries scanning millions of historical records (e.g., 'What was the year-over-year revenue growth across electronics in the Southern region?').",
                "**The Three-Tier Architecture:**",
                "1. **Bottom Tier (Data Sources & Staging)**: Heterogeneous operational databases (SQL, ERP, flat files) undergo **ETL (Extract, Transform, Load)** to clean, reconcile, and format data into persistent staging areas.",
                "2. **Middle Tier (OLAP Server)**: An analytical engine organizing data into multidimensional cubes (ROLAP, MOLAP, or HOLAP).",
                "3. **Top Tier (Front-End Clients)**: Business intelligence dashboards, report generators, and data mining algorithms.",
              ],
              callout: {
                kind: "mental-model",
                title: "Why Not Run Analytics Directly on OLTP?",
                message: "A massive analytical aggregate query on an OLTP database would lock entire tables, exhaust buffer pools, and block real-time customer transactions. Decoupling analytics into a Data Warehouse isolates operational throughput from reporting overhead.",
              },
            },
            {
              type: "explanation",
              heading: "2. Multidimensional Modeling: Facts, Dimensions & Measures",
              body: [
                "A **Multidimensional Data Model** views data in the form of a data cube defined by **Dimensions** and **Measures**.",
                "**Fact Table:** A central table storing quantitative numerical metrics of a business process (e.g., quantity sold, revenue, shipping cost). Its primary key is a composite key consisting of foreign keys referencing all connected dimension tables.",
                "**Dimension Tables:** Surrounding tables containing descriptive attributes and hierarchical categorization levels (e.g., `Time`: day -> month -> quarter -> year; `Location`: street -> city -> state -> country; `Product`: item -> brand -> category).",
                "**Taxonomy of Measures:**",
                "1. **Additive Measures**: Can be summed meaningfully across all dimensions (e.g., `sales_amount`, `units_sold`).",
                "2. **Semi-Additive Measures**: Can be summed across some dimensions but not others (e.g., `account_balance` can be summed across accounts or branches, but NOT across time).",
                "3. **Non-Additive Measures**: Cannot be summed across any dimension (e.g., `unit_price`, `percentage_discount`, `temperature`). Must be aggregated using ratios of sums rather than sum of ratios.",
              ],
            },
            {
              type: "comparison",
              heading: "3. Schema Architecture Comparison: Star vs Snowflake vs Constellation",
              leadParagraph: "Comparing the three primary multidimensional database schema paradigms in analytical engineering.",
              columns: ["Star Schema", "Snowflake Schema", "Fact Constellation (Galaxy)"],
              criteria: [
                {
                  criterion: "Dimension Normalization",
                  values: [
                    "Completely denormalized (1 table per dimension)",
                    "Fully normalized into 3NF/BCNF sub-dimensions",
                    "Can be shared normalized or denormalized",
                  ],
                },
                {
                  criterion: "Query Join Complexity",
                  values: [
                    "Minimal (single join between fact and each dimension)",
                    "High (requires multi-table snowflake chain joins)",
                    "Moderate to high (depends on query span)",
                  ],
                },
                {
                  criterion: "Data Redundancy",
                  values: [
                    "High (attributes repeated in dimension tables)",
                    "Low (redundancy eliminated via normalization)",
                    "Low to moderate",
                  ],
                },
                {
                  criterion: "Fact Tables Count",
                  values: [
                    "Single central fact table",
                    "Single central fact table",
                    "Multiple central fact tables sharing conformed dimensions",
                  ],
                },
                {
                  criterion: "Typical Usage",
                  values: [
                    "Departmental Data Marts & high-speed reporting",
                    "Large data warehouses with complex hierarchies",
                    "Enterprise data warehouses modeling multiple business processes",
                  ],
                },
              ],
            },
            {
              type: "explanation",
              heading: "4. OLAP Algebra: Roll-Up, Drill-Down, Slice, Dice & Pivot",
              body: [
                "OLAP engines provide five core interactive operations to navigate multidimensional data cubes:",
                "1. **Roll-up (Drill-Up / Aggregation)**: Performs data aggregation either by climbing up a dimension hierarchy (e.g., aggregating daily sales into monthly totals) or by dimension reduction (dropping a dimension entirely from the cube).",
                "2. **Drill-down (Roll-Down)**: The reverse of roll-up: introduces finer detail by stepping down a dimension hierarchy (e.g., expanding quarterly revenue into monthly figures) or by adding a new dimension.",
                "3. **Slice**: Performs a selection on one dimension of the cube, resulting in a sub-cube of lower dimensionality (e.g., selecting `Time = 'Q1'` produces a 2D slice across Product and Location).",
                "4. **Dice**: Defines a sub-cube by applying selection conditions on two or more dimensions (e.g., `Location in ('CA', 'NY')` AND `Time in ('Q1', 'Q2')` AND `Item in ('Laptop')`).",
                "5. **Pivot (Rotate)**: Visual rotation of axes to view the data from different perspectives (e.g., swapping row and column dimensions in a cross-tabulated spreadsheet).",
              ],
            },
            {
              type: "gate-analysis",
              heading: "5. GATE Worked Example: Dimensional Table Cardinality & Cube Sizing",
              weightage: "2 Marks (GATE DA)",
              trap: "Remember that an n-dimensional data cube has 2^n cuboids (including the 0-D apex cuboid and 1-D base cuboids).",
              solutionSteps: [
                "Problem Statement (Modeled on GATE DA Pattern):",
                "A data warehouse contains a Star Schema with a central Fact table and 4 Dimension tables: Date, Store, Customer, and Product.",
                "Given parameters:",
                "  - Date dimension has 365 rows (1 year).",
                "  - Store dimension has 50 rows.",
                "  - Customer dimension has 10,000 rows.",
                "  - Product dimension has 200 rows.",
                "  - The Fact table contains 2,000,000 transaction records.",
                "  - Each Fact record stores: 4 foreign keys (4 bytes each) and 2 measures: 'units_sold' (4 bytes) and 'total_amount' (8 bytes).",
                "Calculate: (a) Total number of possible cuboids in the data cube, (b) The maximum possible theoretical cell capacity in the base cuboid, and (c) The raw storage size of the Fact table.",
                "Step 1: Compute total number of cuboids:",
                "  A data cube with n dimensions has 2^n distinct cuboids (each corresponding to a subset of dimensions).",
                "  Here n = 4.",
                "  Total cuboids = 2^4 = 16 cuboids.",
                "Step 2: Compute theoretical maximum cell capacity of base cuboid:",
                "  The base cuboid represents all combinations of all 4 dimensions:",
                "  Max cells = |Date| * |Store| * |Customer| * |Product|",
                "  Max cells = 365 * 50 * 10,000 * 200 = 36,500,000,000 cells (36.5 billion cells).",
                "  Notice: since the actual Fact table has 2,000,000 records, the data cube density is: 2,000,000 / 36.5 billion ≈ 0.0055% (an extremely sparse data cube, typical of real OLAP engines).",
                "Step 3: Calculate Fact table storage size:",
                "  Bytes per record = (4 FKs * 4 bytes) + 4 bytes (units) + 8 bytes (amount)",
                "  Bytes per record = 16 + 4 + 8 = 28 bytes.",
                "  Total Fact table raw size = 2,000,000 records * 28 bytes = 56,000,000 bytes = 56 MB.",
                "Conclusion: 16 cuboids; theoretical capacity = 36.5B cells; Fact table size = 56 MB.",
              ],
            },
            {
              type: "resources",
              heading: "6. Authoritative References",
              sources: [
                {
                  title: "The Data Warehouse Toolkit: The Definitive Guide to Dimensional Modeling (3rd Edition)",
                  authorOrInstitution: "Ralph Kimball, Margy Ross (Wiley)",
                  topic: "The industry standard reference on dimensional modeling, star schemas, and fact tables",
                  url: "https://www.wiley.com/en-us/The+Data+Warehouse+Toolkit",
                  type: "primary-standard",
                  relevance: "Definitive methodology for dimensional business intelligence architectures.",
                },
                {
                  title: "Data Mining: Concepts and Techniques (3rd Edition)",
                  authorOrInstitution: "Jiawei Han, Micheline Kamber, Jian Pei (Morgan Kaufmann)",
                  topic: "Chapter 4: Data Warehousing and Online Analytical Processing",
                  type: "primary-standard",
                  relevance: "Formal multidimensional data model, OLAP cuboids, and snowflake algebra.",
                },
              ],
            },
          ],
        },
        DA_DATA_TRANSFORMATIONS_LESSON,
      ],
    },
  ],
};
