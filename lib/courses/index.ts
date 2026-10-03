import { CourseMeta, LessonMeta, ModuleMeta } from "./types";
import { OPERATING_SYSTEMS_COURSE } from "./os-data";
import { DBMS_COURSE } from "./dbms-data";
import { COMPUTER_NETWORKS_COURSE } from "./cn-data";
import { COA_COURSE } from "./coa-data";
import { TOC_COURSE } from "./toc-data";
import { C_PROGRAMMING_COURSE } from "./c-prog-data";
import { DISCRETE_MATHEMATICS_COURSE } from "./discrete-maths-data";

/**
 * Course Registry.
 * Complete collection of B.Tech & GATE CS notebooks.
 */
export const COURSES: CourseMeta[] = [
  OPERATING_SYSTEMS_COURSE,
  DBMS_COURSE,
  COMPUTER_NETWORKS_COURSE,
  COA_COURSE,
  TOC_COURSE,
  C_PROGRAMMING_COURSE,
  DISCRETE_MATHEMATICS_COURSE,
];

function normalizeCourse(course: CourseMeta): CourseMeta {
  return {
    ...course,
    modules: course.modules.map((module) => ({
      ...module,
      lessons: module.lessons.map((lesson) => ({
        ...lesson,
        hasInteractive: lesson.sections.some((section) => section.type === "interactive"),
        hasGATE: lesson.sections.some((section) => section.type === "gate-lens"),
        hasPractice: lesson.sections.some((section) => section.type === "practice"),
      })),
    })),
  };
}

export function getAllCourses(): CourseMeta[] {
  return COURSES.map(normalizeCourse);
}

export function getCourse(slug: string): CourseMeta | undefined {
  const course = COURSES.find((c) => c.slug === slug || c.subjectSlug === slug);
  return course ? normalizeCourse(course) : undefined;
}

export function getLesson(
  courseSlug: string,
  lessonSlug: string
): { course: CourseMeta; module: ModuleMeta; lesson: LessonMeta } | undefined {
  const course = getCourse(courseSlug);
  if (!course) return undefined;

  for (const mod of course.modules) {
    const lesson = mod.lessons.find((l) => l.slug === lessonSlug || l.id === lessonSlug);
    if (lesson) {
      return { course, module: mod, lesson };
    }
  }

  return undefined;
}

export function getAllLessons(): { subject: string; lessonSlug: string }[] {
  const result: { subject: string; lessonSlug: string }[] = [];
  for (const course of COURSES) {
    for (const mod of course.modules) {
      for (const lesson of mod.lessons) {
        result.push({
          subject: course.slug,
          lessonSlug: lesson.slug,
        });
      }
    }
  }
  return result;
}

export function getNextAndPrevLesson(
  courseSlug: string,
  lessonSlug: string
): {
  prev: { title: string; href: string } | null;
  next: { title: string; href: string } | null;
} {
  const course = getCourse(courseSlug);
  if (!course) return { prev: null, next: null };

  const allLessonsInCourse: { title: string; href: string }[] = [];
  for (const mod of course.modules) {
    for (const l of mod.lessons) {
      allLessonsInCourse.push({
        title: l.title,
        href: `/notes/${course.slug}/${l.slug}`,
      });
    }
  }

  const currentIndex = allLessonsInCourse.findIndex((item) =>
    item.href.endsWith(`/${lessonSlug}`)
  );

  if (currentIndex === -1) return { prev: null, next: null };

  return {
    prev: currentIndex > 0 ? allLessonsInCourse[currentIndex - 1] : null,
    next:
      currentIndex < allLessonsInCourse.length - 1
        ? allLessonsInCourse[currentIndex + 1]
        : null,
  };
}
