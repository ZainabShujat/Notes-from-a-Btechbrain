import Link from "next/link";
import { getAllCourses } from "../../../lib/courses";
import PageHeader from "../../components/ui/PageHeader";
import KnowledgeCheck from "../../components/course/KnowledgeCheck";
import { pageMetadata } from "../../../lib/seo";
import { PracticeQuizSection } from "../../../lib/courses/types";

export const metadata = pageMetadata({
  title: "Engineering Quizzes & Concept Checks",
  description:
    "Interactive quizzes on Operating Systems, Database Management Systems, and core CS subjects with instant feedback and explanations.",
  path: "/notes/quizzes",
});

interface EnrichedQuizSection extends PracticeQuizSection {
  courseTitle: string;
  courseSlug: string;
  moduleTitle: string;
  lessonTitle: string;
  lessonSlug: string;
}

export default function QuizzesPage() {
  const courses = getAllCourses();

  // Extract all practice quiz blocks across all available active courses
  const quizSections: EnrichedQuizSection[] = courses.flatMap((course) =>
    course.modules.flatMap((m) =>
      m.lessons.flatMap((l) =>
        l.sections
          .filter((sec): sec is PracticeQuizSection => sec.type === "practice")
          .map((sec) => ({
            ...sec,
            courseTitle: course.title,
            courseSlug: course.slug,
            moduleTitle: m.title.replace(/^Module \d+:\s*/i, ""),
            lessonTitle: l.title,
            lessonSlug: l.slug,
          }))
      )
    )
  );

  const totalQuestions = quizSections.reduce(
    (acc, q) => acc + (q.questions?.length || 0),
    0
  );

  return (
    <main className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8 py-10 md:py-16">
      {/* Breadcrumb */}
      <nav className="mb-4 text-xs font-mono text-ink-3" aria-label="Breadcrumb">
        <ol className="flex items-center gap-1.5">
          <li>
            <Link href="/notes" className="hover:text-ink-1 transition-colors">
              Notes
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/notes/btech" className="hover:text-ink-1 transition-colors">
              Practice
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-ink-1 font-semibold">Quizzes</li>
        </ol>
      </nav>

      <PageHeader
        eyebrow="CONCEPTUAL VERIFICATION · SELF-ASSESSMENT"
        title="Interactive Quizzes & Concept Checks"
        description="Test your first-principles understanding of operating systems concepts, execution models, and numerical derivations with instant feedback and complete rationales."
      />

      {/* Subject Filter Bar */}
      <div className="flex flex-wrap items-center gap-2 mb-8 pb-4 border-b border-hairline text-xs font-mono">
        <span className="text-ink-3 text-[11px] font-bold uppercase tracking-wider mr-1">
          SUBJECT:
        </span>
        <span className="px-3 py-1.5 rounded bg-accent text-white font-semibold shadow-2xs">
          Operating Systems ({totalQuestions} Questions)
        </span>
        <span className="px-3 py-1.5 rounded bg-surface-2 text-ink-3 border border-hairline/60">
          DBMS (Coming Soon)
        </span>
        <span className="px-3 py-1.5 rounded bg-surface-2 text-ink-3 border border-hairline/60">
          Computer Networks (Coming Soon)
        </span>
        <span className="px-3 py-1.5 rounded bg-surface-2 text-ink-3 border border-hairline/60">
          Digital Logic (Coming Soon)
        </span>
      </div>

      {/* Quizzes by Topic */}
      <div className="space-y-12">
        {quizSections.map((sec, sIdx) => (
          <div
            key={sIdx}
            className="p-6 rounded-xl border border-hairline bg-surface-1/60 backdrop-blur-xs space-y-4 shadow-2xs"
          >
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 border-b border-hairline/60 pb-3">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-accent block">
                  {sec.courseTitle} &middot; {sec.moduleTitle}
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-ink-1 font-sans">
                  {sec.heading || sec.lessonTitle}
                </h2>
              </div>
              <Link
                href={`/notes/${sec.courseSlug}/${sec.lessonSlug}`}
                className="text-xs font-mono text-ink-3 hover:text-accent transition-colors shrink-0"
              >
                Review Full Lesson &rarr;
              </Link>
            </div>

            {sec.questions && sec.questions.length > 0 && (
              <KnowledgeCheck
                questions={sec.questions}
                leadParagraph={sec.leadParagraph}
              />
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
