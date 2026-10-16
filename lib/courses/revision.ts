import { COURSES, getCourse } from "./index";
import { OS_LESSON_CHEATSHEETS } from "./os-cheatsheets";
import { LessonCheatSheet, QuickRevisionSection } from "./types";

export type PanicCard = QuickRevisionSection["oneMinutePanicCard"];

export type LessonRevision = {
  moduleTitle: string;
  lessonTitle: string;
  lessonSlug: string;
  sheet?: LessonCheatSheet;
  panicCard?: PanicCard;
};

/** Subjects in course-registry order, for the revision subject switchers. */
export const REVISION_SUBJECTS = COURSES.map((course) => ({
  slug: course.slug,
  title: course.title,
}));

/**
 * Every lesson's existing revision material for one subject. Cheat sheets come
 * from `lesson.cheatsheet` (or the OS sheet map); the panic card comes from the
 * lesson's quick-revision section, else is read off the cheat sheet so every
 * subject gets a 10-minute view without new content being written.
 */
export function getSubjectRevision(subjectSlug: string): LessonRevision[] {
  const course = getCourse(subjectSlug);
  if (!course) return [];

  return course.modules.flatMap((module) =>
    module.lessons.map((lesson) => {
      const sheet = lesson.cheatsheet ?? OS_LESSON_CHEATSHEETS[lesson.slug];
      const quickRevision = lesson.sections.find(
        (s): s is QuickRevisionSection => s.type === "quick-revision"
      );
      const panicCard =
        quickRevision?.oneMinutePanicCard ??
        (sheet && {
          coreRule: sheet.summaryRule,
          mustRememberFormulas: sheet.keyFormulasAndRules,
          criticalPitfalls: sheet.examPitfalls,
          visualFlow: sheet.visualAnchor,
        });

      return {
        moduleTitle: module.title.replace(/^Module \d+:\s*/i, ""),
        lessonTitle: lesson.title,
        lessonSlug: lesson.slug,
        sheet,
        panicCard: panicCard || undefined,
      };
    })
  );
}
