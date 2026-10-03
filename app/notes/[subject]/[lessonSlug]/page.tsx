import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import { getLesson, getAllLessons, getNextAndPrevLesson } from "../../../../lib/courses";
import CourseLayout from "../../../components/course/CourseLayout";
import LessonRenderer from "../../../components/course/LessonRenderer";
import { SITE_NAME, SITE_URL, absoluteUrl } from "../../../../lib/seo";

type PageProps = {
  params: Promise<{ subject: string; lessonSlug: string }>;
};

export async function generateStaticParams() {
  const allLessons = getAllLessons();
  return allLessons.map((item) => ({
    subject: item.subject,
    lessonSlug: item.lessonSlug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { subject, lessonSlug } = await params;
  const data = getLesson(subject, lessonSlug);

  if (!data) {
    return {
      title: "Lesson Not Found",
      robots: { index: false },
    };
  }

  const { lesson, course } = data;
  const url = `${SITE_URL}/notes/${course.slug}/${lesson.slug}`;

  return {
    title: `${lesson.title} · ${course.title}`,
    description: lesson.tagline,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      siteName: SITE_NAME,
      title: `${lesson.title} | ${course.title} | ${SITE_NAME}`,
      description: lesson.tagline,
      url,
      images: [{ url: absoluteUrl(null), alt: lesson.title }],
    },
  };
}

export default async function LessonPage({ params }: PageProps) {
  const { subject, lessonSlug } = await params;
  const data = getLesson(subject, lessonSlug);

  if (!data) return notFound();

  const { course, module, lesson } = data;
  if (course.slug !== "operating-systems") {
    redirect(`/notes/${course.slug}`);
  }
  const { prev, next } = getNextAndPrevLesson(course.slug, lesson.slug);

  return (
    <CourseLayout
      course={course}
      currentModule={module}
      currentLesson={lesson}
      prevLesson={prev}
      nextLesson={next}
    >
      <LessonRenderer lesson={lesson} moduleTitle={module.title} subjectSlug={course.subjectSlug} />
    </CourseLayout>
  );
}
