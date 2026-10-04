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
      robots: { index: false, follow: false },
    };
  }

  const { lesson, course } = data;
  const isComplete = course.slug === "operating-systems";

  if (!isComplete) {
    return {
      title: `${lesson.title} · ${course.title}`,
      description: lesson.tagline || `Student notes on ${lesson.title} in ${course.title}.`,
      robots: { index: false, follow: true },
    };
  }

  const pageTitle = `${lesson.title} · ${course.title}`;
  const description =
    lesson.tagline ||
    `Interactive student notes on ${lesson.title} in ${course.title}. Part of B.Tech & GATE CS curriculum.`;
  const url = `${SITE_URL}/notes/${course.slug}/${lesson.slug}`;
  const ogImage = absoluteUrl(null);

  return {
    title: pageTitle,
    description,
    alternates: { canonical: url },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
    openGraph: {
      type: "article",
      siteName: SITE_NAME,
      title: pageTitle,
      description,
      url,
      images: [{ url: ogImage, alt: lesson.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: [ogImage],
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

  const lessonUrl = `${SITE_URL}/notes/${course.slug}/${lesson.slug}`;
  const courseUrl = `${SITE_URL}/notes/${course.slug}`;

  return (
    <>
      {/* Structured data: Article/LearningResource & BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TechArticle",
            headline: lesson.title,
            description: lesson.tagline,
            url: lessonUrl,
            inLanguage: "en-US",
            isPartOf: {
              "@type": "Course",
              name: course.title,
              description: course.description,
              url: courseUrl,
            },
            author: {
              "@type": "Person",
              name: "Zainab Shujat",
              url: "https://zainabshujat.dev/",
            },
            publisher: {
              "@type": "Organization",
              name: SITE_NAME,
              url: SITE_URL,
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: SITE_URL,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Notes",
                item: `${SITE_URL}/notes`,
              },
              {
                "@type": "ListItem",
                position: 3,
                name: course.title,
                item: courseUrl,
              },
              {
                "@type": "ListItem",
                position: 4,
                name: lesson.title,
                item: lessonUrl,
              },
            ],
          }),
        }}
      />
      <CourseLayout
        course={course}
        currentModule={module}
        currentLesson={lesson}
        prevLesson={prev}
        nextLesson={next}
      >
        <LessonRenderer lesson={lesson} moduleTitle={module.title} subjectSlug={course.subjectSlug} />
      </CourseLayout>
    </>
  );
}
