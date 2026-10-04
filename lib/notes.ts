/**
 * Notes data model — the structured learning system.
 *
 * This file defines the data architecture for B.Tech / GATE CS learning
 * tracks. It is designed to be extensible: new subjects, topics, and
 * interactive experiences can be added without changing the page
 * components or requiring a redesign.
 */

// ─── Source Transparency ────────────────────────────────────────────

export type SourceKind =
  | "standard-reference"
  | "external-source"
  | "gate-official"
  | "user-written"
  | "original-analogy"
  | "synthesized"
  | "site-example";

export type Source = {
  title: string;
  url?: string;
  kind: SourceKind;
  note?: string;
};

// ─── Concept-Level Model ────────────────────────────────────────────

export type ConceptMeta = {
  title: string;
  slug: string;

  /** Understand */
  explanation?: string;
  mentalModel?: string;
  examples?: string[];
  visuals?: string[];

  /** Play / Interact */
  interactive?: {
    type: string;
    label: string;
    slug: string;
  }[];

  /** Practice */
  commonMistakes?: string[];
  miniQuiz?: { question: string; answer: string }[];
  pyqs?: { year: number; question: string; answer?: string }[];

  /** GATE lens */
  gateConnection?: string;
  gatePatterns?: string[];

  /** Revision */
  quickRevision?: string;
  formulas?: string[];

  /** Cross-links */
  relatedEditions?: string[]; // edition slugs
  relatedGames?: string[];

  /** Sources */
  sources?: Source[];
};

// ─── Topic ──────────────────────────────────────────────────────────

export type TopicMeta = {
  title: string;
  slug: string;
  concepts: ConceptMeta[];
  /** Optional short tagline for the topic. */
  tagline?: string;
};

// ─── Module ─────────────────────────────────────────────────────────

export type ModuleMeta = {
  title: string;
  slug: string;
  topics: TopicMeta[];
};

// ─── Subject ────────────────────────────────────────────────────────

export type SubjectMeta = {
  id: string;
  title: string;
  slug: string;
  shortTitle: string;
  icon: string;
  color: string;
  tagline: string;
  topicCount: number;
  highlights: string[];
  modules: ModuleMeta[];
  /** Will interactive labs be available? */
  hasLabs: boolean;
  hasPYQs: boolean;
};

// ─── Resource ───────────────────────────────────────────────────────

export type ExternalResource = {
  title: string;
  source: string;
  url: string;
  why: string;
  level?: "beginner" | "intermediate" | "advanced";
  type: "course" | "video" | "book" | "website" | "tool";
};

// ─── Revision ───────────────────────────────────────────────────────

export type RevisionSheet = {
  title: string;
  slug: string;
  subjectId: string;
  type: "cheat-sheet" | "10-min" | "5-min" | "1-min" | "formula-sheet";
  content?: string; // markdown or structured data
};

// ─── Practice ───────────────────────────────────────────────────────

export type PracticeItem = {
  title: string;
  slug: string;
  subjectId: string;
  type: "pyq" | "quiz" | "interactive-lab";
  year?: number;
  questionCount?: number;
};

// ─── Learning Tracks ────────────────────────────────────────────────

export const LEARNING_TRACKS: SubjectMeta[] = [
  {
    id: "general-aptitude",
    title: "General Aptitude",
    slug: "general-aptitude",
    shortTitle: "Aptitude",
    icon: "🧠",
    color: "bg-amber-400",
    tagline: "Verbal, numerical, and logical reasoning for GATE.",
    topicCount: 8,
    highlights: ["Verbal reasoning", "Numerical ability"],
    modules: [],
    hasLabs: false,
    hasPYQs: true,
  },
  {
    id: "engineering-mathematics",
    title: "Engineering Mathematics",
    slug: "engineering-mathematics",
    shortTitle: "Engg. Maths",
    icon: "📐",
    color: "bg-blue-400",
    tagline: "The mathematical foundation behind every CS concept.",
    topicCount: 10,
    highlights: ["Linear Algebra", "Probability", "Calculus"],
    modules: [],
    hasLabs: false,
    hasPYQs: true,
  },
  {
    id: "discrete-mathematics",
    title: "Discrete Mathematics",
    slug: "discrete-mathematics",
    shortTitle: "Discrete Maths",
    icon: "🔢",
    color: "bg-indigo-400",
    tagline: "Sets, relations, logic, and graphs — the language of CS.",
    topicCount: 9,
    highlights: ["Graph theory", "Combinatorics", "Mathematical logic"],
    modules: [],
    hasLabs: false,
    hasPYQs: true,
  },
  {
    id: "digital-logic",
    title: "Digital Logic",
    slug: "digital-logic",
    shortTitle: "Digital Logic",
    icon: "⚡",
    color: "bg-yellow-400",
    tagline: "From Boolean algebra to sequential circuits.",
    topicCount: 8,
    highlights: ["K-maps", "Flip-flops", "Logic gate builder"],
    modules: [],
    hasLabs: true,
    hasPYQs: true,
  },
  {
    id: "computer-organization",
    title: "Computer Organization & Architecture",
    slug: "computer-organization",
    shortTitle: "COA",
    icon: "🖥️",
    color: "bg-cyan-400",
    tagline: "How the hardware underneath actually works.",
    topicCount: 10,
    highlights: ["Pipelining", "Cache", "Instruction cycle"],
    modules: [],
    hasLabs: true,
    hasPYQs: true,
  },
  {
    id: "programming-in-c",
    title: "Programming in C",
    slug: "programming-in-c",
    shortTitle: "C Programming",
    icon: "💻",
    color: "bg-green-400",
    tagline: "Pointers, memory, and the art of thinking in C.",
    topicCount: 10,
    highlights: ["Pointers", "Memory management", "Recursion"],
    modules: [],
    hasLabs: true,
    hasPYQs: true,
  },
  {
    id: "data-structures",
    title: "Data Structures",
    slug: "data-structures",
    shortTitle: "DS",
    icon: "🌳",
    color: "bg-emerald-400",
    tagline: "The building blocks of efficient programs.",
    topicCount: 12,
    highlights: ["Trees", "Graphs", "Hashing"],
    modules: [],
    hasLabs: true,
    hasPYQs: true,
  },
  {
    id: "algorithms",
    title: "Algorithms",
    slug: "algorithms",
    shortTitle: "Algorithms",
    icon: "⚙️",
    color: "bg-teal-400",
    tagline: "Sorting, searching, and solving the unsolvable.",
    topicCount: 14,
    highlights: ["Sorting visualizer", "DP", "Graph algorithms"],
    modules: [],
    hasLabs: true,
    hasPYQs: true,
  },
  {
    id: "theory-of-computation",
    title: "Theory of Computation",
    slug: "theory-of-computation",
    shortTitle: "TOC",
    icon: "🔄",
    color: "bg-purple-400",
    tagline: "What can be computed — and what can't.",
    topicCount: 10,
    highlights: ["DFA/NFA simulator", "PDA", "Turing machines"],
    modules: [],
    hasLabs: true,
    hasPYQs: true,
  },
  {
    id: "compiler-design",
    title: "Compiler Design",
    slug: "compiler-design",
    shortTitle: "Compilers",
    icon: "🔧",
    color: "bg-orange-400",
    tagline: "How your code becomes a running program.",
    topicCount: 9,
    highlights: ["Lexical analysis", "Parsing", "Code generation"],
    modules: [],
    hasLabs: true,
    hasPYQs: true,
  },
  {
    id: "operating-systems",
    title: "Operating Systems",
    slug: "operating-systems",
    shortTitle: "OS",
    icon: "🖧",
    color: "bg-rose-400",
    tagline: "Understand the invisible machinery behind every program you run.",
    topicCount: 12,
    highlights: ["Process scheduling", "Memory management", "Deadlocks"],
    modules: [],
    hasLabs: true,
    hasPYQs: true,
  },
  {
    id: "dbms",
    title: "Database Management Systems",
    slug: "dbms",
    shortTitle: "DBMS",
    icon: "🗄️",
    color: "bg-sky-400",
    tagline: "From tables to transactions.",
    topicCount: 10,
    highlights: ["SQL Lab", "Normalization", "Transactions"],
    modules: [],
    hasLabs: true,
    hasPYQs: true,
  },
  {
    id: "computer-networks",
    title: "Computer Networks",
    slug: "computer-networks",
    shortTitle: "CN",
    icon: "🌐",
    color: "bg-violet-400",
    tagline: "How data travels across the world in milliseconds.",
    topicCount: 11,
    highlights: ["TCP/IP", "Subnetting", "Routing"],
    modules: [],
    hasLabs: true,
    hasPYQs: true,
  },
];

// ─── Section Definitions (for Notes landing page) ───────────────────

export const NOTES_SECTIONS = {
  study: {
    title: "Study",
    icon: "📚",
    description: "Structured learning material for B.Tech and GATE CS/IT.",
    items: [
      { label: "B.Tech", href: "/notes/btech", icon: "🎓" },
      { label: "GATE CS", href: "/notes/gate", icon: "🏛️" },
    ],
  },
  practice: {
    title: "Practice",
    icon: "✏️",
    description: "Test your understanding with real questions.",
    items: [
      { label: "PYQs", href: "/notes/pyqs", icon: "📝" },
      { label: "Quizzes", href: "/notes/quizzes", icon: "❓" },
      { label: "Interactive Labs", href: "/notes/labs", icon: "🧪" },
    ],
  },
  revision: {
    title: "Revision",
    icon: "⚡",
    description: "Quick reviews when time is short.",
    items: [
      { label: "Cheat Sheets", href: "/notes/cheat-sheets", icon: "📋" },
      { label: "10-Minute Revision", href: "/notes/quick-revision", icon: "⏱️" },
      { label: "Formula Sheets", href: "/notes/formulas", icon: "📊" },
    ],
  },
  resources: {
    title: "Resources",
    icon: "🔗",
    description: "Curated links to the best external material.",
    items: [
      { label: "Courses", href: "/notes/courses", icon: "🎯" },
      { label: "Videos", href: "/notes/videos", icon: "🎬" },
      { label: "Books", href: "/notes/books", icon: "📖" },
    ],
  },
} as const;
