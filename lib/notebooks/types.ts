/**
 * Subject Notebook & Interactive Page Flip Types
 * 
 * Formal Technical Library + Student's Actual Notebook
 */

export type NotebookPageType =
  | "concept"
  | "diagram"
  | "worked-example"
  | "comparison"
  | "formula"
  | "revision";

export interface ConceptPageContent {
  heading: string;
  subheading?: string;
  handwrittenNote?: string;
  paragraphs: string[];
  callout?: {
    kind: "trap" | "exam-tip" | "mental-model" | "intuition";
    title: string;
    message: string;
  };
  bullets?: string[];
  keyTakeaway?: string;
}

export interface DiagramPageContent {
  heading: string;
  subheading?: string;
  handwrittenNote?: string;
  customKey:
    | "os-process-lifecycle"
    | "os-memory-layout"
    | "dbms-three-schema"
    | "dbms-b-plus-tree"
    | "algo-bfs-dfs"
    | "algo-dp-knapsack"
    | "cn-osi-layers"
    | "coa-pipeline-hazards"
    | "toc-dfa-state"
    | "c-pointer-memory";
  caption?: string;
  annotations?: string[];
  notes?: string[];
}

export interface WorkedExampleContent {
  heading: string;
  examContext?: string;
  problem: string;
  given?: { label: string; value: string }[];
  steps: {
    stepNumber: number;
    title: string;
    formula?: string;
    explanation: string;
    result?: string;
  }[];
  finalAnswer: string;
  handwrittenTakeaway?: string;
}

export interface ComparisonContent {
  heading: string;
  columns: [string, string];
  rows: {
    criterion: string;
    col1: string;
    col2: string;
  }[];
  handwrittenTakeaway?: string;
}

export interface FormulaContent {
  heading: string;
  handwrittenNote?: string;
  formulas: {
    name: string;
    formula: string;
    explanation: string;
    variables?: { symbol: string; meaning: string }[];
  }[];
  pitfall?: string;
}

export interface RevisionContent {
  heading: string;
  coreRule: string;
  mustRemember: string[];
  criticalTraps: string[];
}

export interface NotebookPageData {
  id: string;
  pageNumber: number;
  title: string;
  type: NotebookPageType;
  tag?: string;
  previewSnippet?: string;
  content:
    | ConceptPageContent
    | DiagramPageContent
    | WorkedExampleContent
    | ComparisonContent
    | FormulaContent
    | RevisionContent;
}

export interface SubjectNotebookData {
  id: string;
  title: string;
  code: string;
  slug: string;
  tagline: string;
  description: string;
  level: string;
  accentColor: "violet" | "emerald" | "amber" | "cyan" | "indigo" | "rose" | "teal";
  accentHex: string;
  stats: {
    sectionsCount: number;
    notesCount: number;
    labsCount: number;
    pyqsCount: number;
  };
  coverAnnotation: string;
  isLocked?: boolean;
  status?: "active" | "draft" | "planned";
  previewSnippets: {
    title: string;
    teaser: string;
    type: NotebookPageType;
  }[];
  pages: NotebookPageData[];
}
