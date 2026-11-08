import type { LessonSection, PracticeQuizSection, QuizQuestion, WorkedExampleSection } from "../types";

/**
 * Worked examples and practice questions added to lessons that were
 * explanation-only, keyed by lesson id. They're merged in at load time
 * (see normalizeCourse), just before each lesson's resources section.
 */
export type LessonExtras = Record<string, LessonSection[]>;

type Difficulty = QuizQuestion["difficulty"];

/** A single-answer question. Each option is [text, isCorrect, why]. */
export function mcq(
  id: string,
  prompt: string,
  options: [string, boolean, string][],
  explanation: string,
  difficulty: Difficulty = "gate-level"
): QuizQuestion {
  return {
    id,
    prompt,
    type: "single-choice",
    options: options.map(([text, isCorrect, why], i) => ({
      // Shown as the option's label, and only needs to be unique within its question.
      id: String.fromCharCode(97 + i),
      text,
      isCorrect,
      explanation: why,
    })),
    explanation,
    difficulty,
  };
}

/** A numerical-answer question. */
export function num(
  id: string,
  prompt: string,
  correctAnswer: number,
  explanation: string,
  difficulty: Difficulty = "gate-level",
  unit?: string,
  tolerance = 0
): QuizQuestion {
  return { id, prompt, type: "numerical", correctAnswer, unit, tolerance, explanation, difficulty };
}

/** A worked example. Each step is [title, description, formula?, result?]. */
export function worked(
  heading: string,
  problemStatement: string,
  steps: [string, string, string?, string?][],
  finalAnswer: string,
  examTakeaway?: string,
  givenData?: { label: string; value: string }[]
): WorkedExampleSection {
  return {
    type: "worked-example",
    heading,
    problemStatement,
    givenData,
    steps: steps.map(([title, description, formula, intermediateResult], i) => ({
      stepNumber: i + 1,
      title,
      description,
      formula,
      intermediateResult,
    })),
    finalAnswer,
    examTakeaway,
  };
}

export function practice(questions: QuizQuestion[], heading = "Practice: test yourself"): PracticeQuizSection {
  return {
    type: "practice",
    heading,
    leadParagraph: "Original practice questions in the GATE style, with worked explanations. Not past-paper questions.",
    questions,
  };
}

/** Puts the extra sections before the lesson's resources, or at the end. */
export function withExtras(sections: LessonSection[], extras?: LessonSection[]): LessonSection[] {
  if (!extras?.length) return sections;
  const at = sections.findIndex((s) => s.type === "resources");
  return at === -1 ? [...sections, ...extras] : [...sections.slice(0, at), ...extras, ...sections.slice(at)];
}
