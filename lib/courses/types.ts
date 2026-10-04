/**
 * Reusable Course & Lesson Data Architecture
 * Notes From a B.Tech Brain
 *
 * Separates CONTENT from PRESENTATION from INTERACTION.
 * Any engineering subject can be expressed through these declarative types.
 */

// ─── Source & Reference Types ────────────────────────────────────────

export type SourceType =
  | "primary-standard"   // e.g. Silberschatz, Tanenbaum, Cormen
  | "academic-paper"     // e.g. Original research papers
  | "gate-official"      // e.g. Official GATE syllabus / IIT papers
  | "curated-lecture"    // e.g. NPTEL, MIT OCW, Stanford
  | "verified-pyq";      // e.g. GATEOverflow verified past questions

export interface SourceReference {
  title: string;
  authorOrInstitution?: string;
  authors?: string;
  year?: string;
  publisher?: string;
  topic?: string;
  url?: string;
  link?: string;
  relevance?: string;
  type?: SourceType;
  annotation?: string;
}

export interface StillStuckResource {
  prompt?: string; // e.g. "If CPU scheduling feels too abstract..."
  title: string;
  creator: string;
  url: string;
  whyThisHelps: string;
  duration?: string;
}

// ─── Interactive Component Configurations ─────────────────────────────

export interface FlowStep {
  id: string;
  label: string;
  shortLabel?: string;
  description: string;
  annotation?: string;
  status?: "pending" | "active" | "completed";
}

export interface FlowVisualizerConfig {
  title: string;
  caption?: string;
  steps: FlowStep[];
  allowLoop?: boolean;
}

export interface ProcessScheduleItem {
  id: string;
  arrivalTime: number;
  burstTime: number;
  priority?: number;
  color?: string;
}

export interface CPUSchedulerConfig {
  title: string;
  caption?: string;
  defaultAlgorithm: "fcfs" | "sjf-nonpreemptive" | "sjf-preemptive" | "priority-nonpreemptive" | "priority-preemptive" | "round-robin" | "ljf" | "lrtf" | "hrrn";
  defaultQuantum?: number;
  sampleProcesses: ProcessScheduleItem[];
}

export interface StateTransitionConfig {
  title: string;
  initialState: string;
  states: {
    id: string;
    label: string;
    description: string;
    color: string;
  }[];
  transitions: {
    from: string;
    to: string;
    trigger: string;
    actionDescription: string;
  }[];
}

export interface BankersAlgorithmConfig {
  title: string;
  caption?: string;
  numProcesses: number;
  numResourceTypes: number;
  resourceNames: string[];
  totalAvailable: number[];
  allocationMatrix: number[][];
  maxMatrix: number[][];
}

export interface PageReplacementConfig {
  title: string;
  caption?: string;
  defaultNumFrames: number;
  referenceString: number[];
  algorithms: ("fifo" | "lru" | "optimal")[];
}

export interface DiskSchedulingConfig {
  title: string;
  caption?: string;
  initialHead: number;
  totalCylinders: number;
  direction?: "left" | "right";
  requests: number[];
}

export interface SemaphoreSimulatorConfig {
  title: string;
  caption?: string;
  initialValue: number;
  resourceName: string;
  operations: {
    id: string;
    process: string;
    operation: "wait" | "signal";
  }[];
}

export interface SerializabilityCheckerConfig {
  title: string;
  caption?: string;
  defaultSchedule: {
    id: string;
    transaction: string;
    op: "R" | "W";
    item: string;
  }[];
  sampleSchedules?: {
    name: string;
    description: string;
    schedule: { id: string; transaction: string; op: "R" | "W"; item: string }[];
  }[];
}

export interface BPlusTreeCalculatorConfig {
  title: string;
  caption?: string;
  defaultBlockSize: number;
  defaultKeySize: number;
  defaultBlockPointerSize: number;
  defaultRecordPointerSize: number;
}

export interface NormalizationAnalyzerConfig {
  title: string;
  caption?: string;
  defaultRelation: string;
  defaultAttributes: string[];
  defaultFDs: { lhs: string[]; rhs: string[] }[];
}

export type InteractiveBlockConfig =
  | { kind: "flow-visualizer"; config: FlowVisualizerConfig }
  | { kind: "cpu-scheduler"; config: CPUSchedulerConfig }
  | { kind: "state-transition"; config: StateTransitionConfig }
  | { kind: "bankers-algorithm"; config: BankersAlgorithmConfig }
  | { kind: "page-replacement"; config: PageReplacementConfig }
  | { kind: "disk-scheduling"; config: DiskSchedulingConfig }
  | { kind: "semaphore"; config: SemaphoreSimulatorConfig }
  | { kind: "serializability-checker"; config: SerializabilityCheckerConfig }
  | { kind: "b-plus-tree-calculator"; config: BPlusTreeCalculatorConfig }
  | { kind: "normalization-analyzer"; config: NormalizationAnalyzerConfig }
  | { kind: "question-to-sql"; config?: Record<string, any> }
  | { kind: "live-diagram"; config?: { presetKey?: string } };

// ─── Practice & Quiz Types ───────────────────────────────────────────

export interface QuizOption {
  id: string;
  text: string;
  explanation: string;
  isCorrect: boolean;
}

export interface QuizQuestion {
  id: string;
  prompt: string;
  type: "single-choice" | "multiple-choice" | "numerical" | "true-false";
  options?: QuizOption[];
  correctAnswer?: string | number; // for numerical
  unit?: string;
  tolerance?: number; // for numerical (+/- 0.1)
  explanation: string;
  difficulty: "foundation" | "gate-level" | "tricky";
  gateContext?: string; // e.g. "GATE CS 2021 (1 Mark)"
}

export interface GatePYQ {
  id: string;
  year: number;
  session?: string;
  marks: 1 | 2;
  question: string;
  options?: string[];
  correctOptionOrValue: string;
  detailedSolution: string;
  trapWarning?: string;
  keyFormulaOrConcept?: string;
}

// ─── Lesson Section Block Types ──────────────────────────────────────

export interface ExplanationSection {
  type: "explanation";
  id?: string;
  heading?: string;
  body: string[]; // array of markdown/HTML-friendly paragraphs
  callout?: {
    kind: "intuition" | "trap" | "mental-model" | "exam-tip" | "gate-tip";
    title: string;
    message: string;
  };
}

export interface DiagramSection {
  type: "diagram";
  id?: string;
  heading?: string;
  caption: string;
  svgContent?: string;
  asciiArt?: string;
  diagramType:
    | "memory-layout"
    | "process-pcb"
    | "architecture"
    | "seven-state"
    | "er-diagram"
    | "precedence-graph"
    | "b-tree"
    | "b-plus-tree"
    | "three-schema"
    | "tcp-handshake"
    | "pipeline-hazards"
    | "dfa-state"
    | "transaction-states"
    | "custom";
}

export interface InteractiveSection {
  type: "interactive";
  id?: string;
  heading?: string;
  leadParagraph?: string;
  interactive: InteractiveBlockConfig;
}

export interface ComparisonSection {
  type: "comparison";
  id?: string;
  heading?: string;
  leadParagraph?: string;
  columns: string[];
  criteria: {
    feature?: string;
    criterion?: string;
    first?: string;
    second?: string;
    values?: string[];
  }[];
  summaryTakeaway?: string;
}

export interface CodeWalkthroughSection {
  type: "code";
  id?: string;
  heading?: string;
  language: string;
  code: string;
  filename?: string;
  explanations: {
    lines?: string; // e.g. "1-4"
    note: string;
  }[];
}

export interface WorkedExampleSection {
  type: "worked-example";
  id?: string;
  heading?: string;
  problemStatement: string;
  givenData?: { label: string; value: string }[];
  svgContent?: string;
  notes?: string[];
  steps: {
    stepNumber: number;
    title: string;
    description: string;
    formula?: string;
    intermediateResult?: string;
  }[];
  finalAnswer: string;
  examTakeaway?: string;
}

export interface MisconceptionsSection {
  type: "misconceptions";
  id?: string;
  heading?: string;
  items: {
    commonMyth: string;
    reality: string;
    explanation: string;
  }[];
}

export interface PracticeQuizSection {
  type: "practice";
  id?: string;
  heading?: string;
  leadParagraph?: string;
  questions: QuizQuestion[];
}

export interface GateLensSection {
  type: "gate-lens";
  id?: string;
  heading?: string;
  weightageSummary: string; // e.g. "Appears in nearly 85% of GATE CS papers (typically 1-2 marks)"
  commonPatterns: string[];
  commonTraps: string[];
  pyqs: GatePYQ[];
}

export interface GateAnalysisSection {
  type: "gate-analysis";
  id?: string;
  heading?: string;
  weightage?: string;
  trap?: string;
  solutionSteps: string[];
}

export interface QuickRevisionSection {
  type: "quick-revision";
  id?: string;
  heading?: string;
  oneMinutePanicCard: {
    coreRule: string;
    mustRememberFormulas: string[];
    criticalPitfalls: string[];
    visualFlow?: string;
  };
  cheatSheetDownloadSlug?: string;
}

export interface ResourcesSection {
  type: "resources";
  id?: string;
  heading?: string;
  sources: SourceReference[];
  videos?: StillStuckResource[];
  stillStuck?: StillStuckResource[];
}

export type LessonSection =
  | ExplanationSection
  | DiagramSection
  | InteractiveSection
  | ComparisonSection
  | CodeWalkthroughSection
  | WorkedExampleSection
  | MisconceptionsSection
  | PracticeQuizSection
  | GateLensSection
  | GateAnalysisSection
  | QuickRevisionSection
  | ResourcesSection;

// ─── Course & Module Structure ────────────────────────────────────────

export interface LessonCheatSheet {
  title?: string;
  summaryRule: string;
  keyFormulasAndRules: string[];
  examPitfalls: string[];
  highYieldTips?: string[];
  visualAnchor?: string;
}

export interface LessonMeta {
  id: string;
  title: string;
  slug: string;
  order: number;
  estimatedMinutes: number;
  tagline: string;
  hasInteractive: boolean;
  hasGATE: boolean;
  hasPractice: boolean;
  cheatsheet?: LessonCheatSheet;
  sections: LessonSection[];
}

export interface ModuleMeta {
  id: string;
  title: string;
  slug: string;
  order: number;
  tagline?: string;
  description?: string;
  lessons: LessonMeta[];
}

export interface CourseMeta {
  id: string;
  title: string;
  slug: string;
  subjectSlug: string; // maps to Subject in lib/notes.ts
  shortTitle: string;
  icon: string;
  badge?: string;
  color?: string;
  level?: string;
  tagline: string;
  description: string;
  prerequisites: string[];
  estimatedTotalHours?: number;
  estimatedHours?: number;
  targetAudience?: string;
  learningOutcomes?: string[];
  gateWeightage: string; // e.g. "8–10 Marks in GATE CS/IT"
  gateSyllabusTopics?: string[];
  modules: ModuleMeta[];
}
