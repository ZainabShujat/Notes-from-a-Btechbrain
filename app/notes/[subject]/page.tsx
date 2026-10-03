import { notFound } from "next/navigation";
import Link from "next/link";
import { LEARNING_TRACKS } from "../../../lib/notes";
import { getCourse, getAllCourses } from "../../../lib/courses";
import { SITE_NAME, SITE_URL, absoluteUrl } from "../../../lib/seo";
import type { Metadata } from "next";

type PageProps = {
  params: Promise<{ subject: string }>;
  searchParams: Promise<{ view?: string; tab?: string }>;
};

/** Static params for all known subjects */
export async function generateStaticParams() {
  const trackSlugs = LEARNING_TRACKS.map((s) => s.slug);
  const courseSlugs = getAllCourses().map((c) => c.slug);
  const allUnique = Array.from(new Set([...trackSlugs, ...courseSlugs]));
  return allUnique.map((subject) => ({ subject }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { subject } = await params;
  const track = LEARNING_TRACKS.find((s) => s.slug === subject);
  const course = getCourse(subject);

  if (!track && !course) {
    return { title: "Subject not found", robots: { index: false } };
  }

  const title = course ? course.title : track?.title ?? "Subject";
  const description =
    course?.tagline ??
    track?.tagline ??
    `Comprehensive student notes, interactive labs, verified PYQs, and revision for ${title}.`;
  const url = `${SITE_URL}/notes/${subject}`;

  return {
    title: `${title} · Student Notebook | ${SITE_NAME}`,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      siteName: SITE_NAME,
      title: `${title} Notebook | ${SITE_NAME}`,
      description,
      url,
      images: [{ url: absoluteUrl(null), alt: title }],
    },
  };
}

export default async function SubjectNotebookPage({
  params,
  searchParams,
}: PageProps) {
  const { subject } = await params;
  const { view } = await searchParams;
  const isGateMode = view === "gate";

  const track = LEARNING_TRACKS.find((s) => s.slug === subject);
  const course = getCourse(subject);

  if (!track && !course) return notFound();

  if (course && course.slug !== "operating-systems") {
    return (
      <main className="mx-auto max-w-3xl px-4 py-16 text-ink-2 sm:px-6 md:px-8 md:py-24">
        <nav className="mb-8 text-xs font-mono text-ink-3" aria-label="Breadcrumb">
          <Link href="/notes" className="hover:text-ink-1 transition-colors">The Notebooks</Link>
          <span className="mx-2" aria-hidden="true">/</span>
          <span className="text-ink-1">{course.title}</span>
        </nav>
        <p className="mb-3 text-xs font-mono font-bold uppercase tracking-widest text-amber-500">
          NOTEBOOK IN BUILD
        </p>
        <h1 className="text-4xl font-extrabold tracking-tight text-ink-1 sm:text-5xl">
          {course.title}
        </h1>
        <p className="mt-5 text-lg leading-relaxed">
          Some working drafts exist, but this notebook is not complete or fully verified yet.
          The available material should not be treated as a finished course.
        </p>
        <Link
          href="/notes/operating-systems"
          className="mt-8 inline-flex items-center gap-2 rounded bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent/90"
        >
          Explore Operating Systems <span aria-hidden="true">&rarr;</span>
        </Link>
      </main>
    );
  }

  // If a full interactive notebook exists for this subject
  if (course) {
    const totalLessons = course.modules.reduce(
      (acc, m) => acc + m.lessons.length,
      0
    );
    const totalInteractive = course.modules.reduce(
      (acc, m) => acc + m.lessons.filter((l) => l.hasInteractive).length,
      0
    );
    const firstLesson = course.modules[0]?.lessons[0];

    // Collect all PYQs from lessons
    const allPYQs = course.modules.flatMap((m) =>
      m.lessons.flatMap((l) =>
        l.sections
          .filter((sec) => sec.type === "gate-lens")
          .flatMap((sec) => (sec.type === "gate-lens" ? sec.pyqs : []))
      )
    );

    // Collect all Interactive Labs
    const allLabs = course.modules.flatMap((m) =>
      m.lessons
        .filter((l) => l.hasInteractive)
        .map((l) => ({
          lessonTitle: l.title,
          lessonSlug: l.slug,
          moduleTitle: m.title,
          tagline: l.tagline,
        }))
    );

    return (
      <main className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8 py-10 md:py-16 text-ink-2">
        {/* =========================================================
            BREADCRUMB & NOTEBOOK BADGE
            ========================================================= */}
        <nav className="mb-4 text-xs font-mono text-ink-3" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1.5">
            <li>
              <Link href="/notes" className="hover:text-ink-1 transition-colors">
                The Notebooks
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-ink-1 font-semibold">{course.title}</li>
          </ol>
        </nav>

        {/* =========================================================
            NOTEBOOK HEADER: QUIET, EDITORIAL, INTELLECTUAL
            ========================================================= */}
        <header className="border-b border-hairline pb-8 mb-8">
          <div className="flex items-center gap-2 mb-2.5">
            <span className="text-[11px] font-mono font-bold tracking-widest text-accent uppercase">
              SUBJECT NOTEBOOK
            </span>
            <span className="text-hairline font-mono text-xs">|</span>
            <span className="text-xs font-mono text-ink-3">
              Computer Science &middot; B.Tech &middot; GATE CS
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-ink-1 tracking-tight leading-[1.12] mb-3 font-sans">
            {course.title}
          </h1>

          <p className="text-base sm:text-lg text-ink-2 max-w-3xl leading-relaxed mb-3 font-serif italic">
            &ldquo;{course.tagline}&rdquo;
          </p>

          <p className="text-xs sm:text-sm text-ink-2 leading-relaxed max-w-3xl mb-5">
            {course.description}
          </p>

          {/* Action & Typographic Statistics Line (No Pills) */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
            <div className="flex items-center gap-3">
              {firstLesson && (
                <Link
                  href={`/notes/${course.slug}/${firstLesson.slug}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded bg-accent text-white font-mono text-xs font-bold hover:bg-accent/90 transition-all cursor-pointer shadow-2xs"
                >
                  <span>Open Notes</span>
                  <span aria-hidden="true">&rarr;</span>
                </Link>
              )}
              <Link
                href={`#learn-btech`}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded border border-hairline hover:bg-surface-2 text-xs font-mono font-semibold text-ink-1 transition-colors"
              >
                <span>Study Sequence</span>
              </Link>
              <Link
                href={`/notes/${course.slug}?view=gate#learn-gate`}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded border border-hairline hover:bg-surface-2 text-xs font-mono font-semibold text-amber-500 transition-colors"
              >
                <span>GATE Exam Lens</span>
              </Link>
            </div>

            <div className="font-mono text-xs text-ink-3 tracking-wider">
              <span className="font-bold text-ink-1">
                {String(course.modules.length).padStart(2, "0")} SECTIONS
              </span>{" "}
              &middot;{" "}
              <span className="font-bold text-ink-1">
                {String(totalLessons).padStart(2, "0")} NOTES
              </span>{" "}
              &middot;{" "}
              <span className="font-bold text-ink-1">
                {String(totalInteractive).padStart(2, "0")} LABS
              </span>
            </div>
          </div>
        </header>

        {/* =========================================================
            NOTEBOOK MODE NAVIGATION BAR
            ========================================================= */}
        <nav
          className="sticky top-[68px] z-20 -mx-4 px-4 sm:-mx-6 sm:px-6 md:-mx-8 md:px-8 py-3 bg-surface-1/90 backdrop-blur-md border-b border-hairline mb-10 overflow-x-auto select-none"
          aria-label="Notebook Mode Navigation"
        >
          <div className="flex items-center gap-6 min-w-max text-xs font-mono uppercase tracking-wider">
            <a
              href="#learn"
              className="text-ink-1 hover:text-accent font-bold transition-colors"
            >
              1. Learn
            </a>
            <span className="text-hairline">|</span>
            <a
              href="#practice"
              className="text-ink-2 hover:text-accent font-semibold transition-colors"
            >
              2. Practice
            </a>
            <span className="text-hairline">|</span>
            <a
              href="#revise"
              className="text-ink-2 hover:text-accent font-semibold transition-colors"
            >
              3. Revise
            </a>
            <span className="text-hairline">|</span>
            <a
              href="#explore"
              className="text-ink-2 hover:text-accent font-semibold transition-colors"
            >
              4. Explore
            </a>
            <span className="text-hairline">|</span>
            <a
              href="#contribute"
              className="text-ink-3 hover:text-accent font-semibold transition-colors"
            >
              5. Contribute
            </a>
          </div>
        </nav>

        {/* =========================================================
            SECTION 1: LEARN (STRUCTURED STUDY SEQUENCE & EXAM LENS)
            ========================================================= */}
        <section id="learn" className="scroll-mt-32 space-y-8 mb-16">
          <div className="border-b border-hairline pb-2 flex items-baseline justify-between">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-accent block">
                MODE 01 &middot; UNDERSTAND &amp; LEARN
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-ink-1 font-sans">
                Structured Notes &amp; Exam Lens
              </h2>
            </div>
            <div className="text-xs font-mono text-ink-3">
              Two parallel study perspectives
            </div>
          </div>

          {/* Sub-Lens A: B.Tech Study Sequence */}
          <div id="learn-btech" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-ink-1">
                A &middot; B.Tech Structured Study Sequence
              </h3>
              <span className="text-xs font-mono text-ink-3">
                {course.modules.length} Sections &middot; Full Curriculum
              </span>
            </div>

            <div className="space-y-4">
              {course.modules.map((mod, modIdx) => (
                <div
                  key={mod.id}
                  className="rounded border border-hairline bg-surface-1/40 p-4 sm:p-5"
                >
                  <div className="flex items-baseline justify-between gap-4 border-b border-hairline pb-2.5 mb-3">
                    <div className="flex items-baseline gap-2.5">
                      <span className="font-mono text-xs font-bold text-accent">
                        {String(modIdx + 1).padStart(2, "0")}
                      </span>
                      <h4 className="text-sm sm:text-base font-bold text-ink-1 font-sans">
                        {mod.title.replace(/^Module \d+:\s*/i, "")}
                      </h4>
                    </div>
                    <span className="text-[11px] font-mono text-ink-3 shrink-0">
                      {mod.lessons.length} note{mod.lessons.length > 1 ? "s" : ""}
                    </span>
                  </div>

                  {mod.description && (
                    <p className="text-xs text-ink-2 leading-relaxed mb-3.5">
                      {mod.description}
                    </p>
                  )}

                  {/* Individual Notes in Section */}
                  <div className="divide-y divide-hairline">
                    {mod.lessons.map((lesson, lIdx) => (
                      <div
                        key={lesson.id}
                        className="py-2.5 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2"
                      >
                        <div className="space-y-0.5">
                          <Link
                            href={`/notes/${course.slug}/${lesson.slug}`}
                            className="text-xs sm:text-sm font-medium text-ink-1 hover:text-accent transition-colors font-sans flex items-baseline gap-2"
                          >
                            <span className="font-mono text-[10px] text-ink-3">
                              {modIdx + 1}.{lIdx + 1}
                            </span>
                            <span>{lesson.title}</span>
                          </Link>
                          <p className="text-[11px] text-ink-3 pl-5">
                            {lesson.tagline}
                          </p>
                        </div>

                        <div className="flex items-center gap-3 pl-5 sm:pl-0 shrink-0 text-[11px] font-mono text-ink-3">
                          {lesson.hasInteractive && (
                            <span className="text-accent font-semibold">
                              Lab included
                            </span>
                          )}
                          <span>~{lesson.estimatedMinutes}m</span>
                          <Link
                            href={`/notes/${course.slug}/${lesson.slug}`}
                            className="text-accent hover:underline"
                          >
                            Read &rarr;
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sub-Lens B: GATE CS Exam Lens */}
          <div id="learn-gate" className="pt-6 border-t border-hairline space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-amber-500">
                  B &middot; GATE CS/IT Exam Lens &amp; Weightage
                </h3>
                <p className="text-xs text-ink-2 mt-0.5">
                  High-frequency calculation topics, mark weights, and common calculation traps.
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-amber-500 shrink-0">
                {course.gateWeightage} Total
              </span>
            </div>

            <div className="p-4 rounded border border-hairline bg-surface-1/30 space-y-3">
              <span className="font-mono text-xs font-bold text-ink-1 block">
                Syllabus Topics (GATE 2027 Alignment):
              </span>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-ink-2 font-mono">
                {(course.gateSyllabusTopics || []).map((topic, tIdx) => (
                  <li key={tIdx} className="flex items-start gap-2">
                    <span className="text-amber-500 font-bold">&bull;</span>
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 2: PRACTICE (PYQS & INTERACTIVE LABS)
            ========================================================= */}
        <section id="practice" className="scroll-mt-32 space-y-8 mb-16 border-t border-hairline pt-10">
          <div className="border-b border-hairline pb-2 flex items-baseline justify-between">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-500 block">
                MODE 02 &middot; ACTIVE PRACTICE
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-ink-1 font-sans">
                Interactive Labs &amp; Verified PYQs
              </h2>
            </div>
            <span className="text-xs font-mono text-ink-3">
              {allLabs.length} Simulators &middot; {allPYQs.length} Verified Questions
            </span>
          </div>

          {/* Interactive Laboratories */}
          {allLabs.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-ink-1">
                Visual Interactive Laboratories
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {allLabs.map((lab, idx) => (
                  <Link
                    key={idx}
                    href={`/notes/${course.slug}/${lab.lessonSlug}`}
                    className="group block p-4 rounded border border-hairline bg-surface-1/40 hover:bg-surface-2/60 transition-all"
                  >
                    <div className="text-[10px] font-mono text-accent font-bold uppercase mb-1">
                      {lab.moduleTitle.replace(/^Module \d+:\s*/i, "")}
                    </div>
                    <h4 className="text-xs sm:text-sm font-bold text-ink-1 group-hover:text-accent transition-colors font-sans mb-1">
                      {lab.lessonTitle}
                    </h4>
                    <p className="text-[11px] text-ink-3 line-clamp-2">
                      {lab.tagline}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Verified GATE PYQs */}
          {allPYQs.length > 0 && (
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-ink-1">
                  Verified GATE Previous Year Questions
                </h3>
                <span className="text-[11px] font-mono text-ink-3">
                  Step-by-step verified derivations
                </span>
              </div>

              <div className="space-y-3">
                {allPYQs.slice(0, 4).map((pyq, pIdx) => (
                  <div
                    key={pIdx}
                    className="p-4 rounded border border-hairline bg-surface-1/40 text-xs space-y-2"
                  >
                    <div className="flex items-baseline justify-between font-mono text-[11px]">
                      <span className="text-amber-500 font-bold">
                        GATE CS {pyq.year} &middot; {pyq.marks} Mark{pyq.marks > 1 ? "s" : ""}
                      </span>
                      {pyq.keyFormulaOrConcept && (
                        <span className="text-ink-3">
                          {pyq.keyFormulaOrConcept}
                        </span>
                      )}
                    </div>
                    <p className="text-ink-1 font-medium font-sans">
                      {pyq.question}
                    </p>
                    <div className="p-2.5 rounded bg-surface-2/60 border border-hairline text-ink-2 font-mono text-[11px]">
                      <span className="font-bold text-amber-500 block mb-0.5">
                        Answer: {pyq.correctOptionOrValue}
                      </span>
                      <p className="font-sans text-[11px] leading-relaxed whitespace-pre-line text-ink-3">
                        {pyq.detailedSolution}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* =========================================================
            SECTION 3: REVISE (CHEAT SHEETS & RAPID REVIEW)
            ========================================================= */}
        <section id="revise" className="scroll-mt-32 space-y-6 mb-16 border-t border-hairline pt-10">
          <div className="border-b border-hairline pb-2 flex items-baseline justify-between">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-rose-500 block">
                MODE 03 &middot; HIGH-SPEED RETRIEVAL
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-ink-1 font-sans">
                Revision &amp; Rapid Review Sheets
              </h2>
            </div>
            <span className="text-xs font-mono text-ink-3">
              One-page mental models
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
            <Link
              href={`/notes/cheat-sheets`}
              className="p-4 rounded border border-hairline bg-surface-1/40 hover:bg-surface-2/60 transition-all block space-y-1"
            >
              <span className="text-[10px] font-bold text-rose-500 uppercase">
                ONE-PAGE SUMMARY
              </span>
              <h4 className="text-sm font-bold text-ink-1 font-sans">
                {course.title} Cheat Sheet
              </h4>
              <p className="text-[11px] text-ink-3 font-sans">
                High-density summary of algorithms, formulas, and asymptotic bounds.
              </p>
            </Link>

            <Link
              href={`/notes/quick-revision`}
              className="p-4 rounded border border-hairline bg-surface-1/40 hover:bg-surface-2/60 transition-all block space-y-1"
            >
              <span className="text-[10px] font-bold text-amber-500 uppercase">
                LAST-MINUTE REVIEW
              </span>
              <h4 className="text-sm font-bold text-ink-1 font-sans">
                10-Minute Rapid Revision
              </h4>
              <p className="text-[11px] text-ink-3 font-sans">
                The critical invariants and calculation shortcuts to review right before the exam.
              </p>
            </Link>
          </div>
        </section>

        {/* =========================================================
            SECTION 4: EXPLORE (TEXTBOOKS & VIDEO SOURCES)
            ========================================================= */}
        <section id="explore" className="scroll-mt-32 space-y-6 mb-16 border-t border-hairline pt-10">
          <div className="border-b border-hairline pb-2 flex items-baseline justify-between">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-violet-500 block">
                MODE 04 &middot; ACADEMIC CITATION TRAIL
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-ink-1 font-sans">
                Authoritative Textbooks &amp; Video Lectures
              </h2>
            </div>
            <span className="text-xs font-mono text-ink-3">
              Primary Sources
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="space-y-2">
              <span className="font-mono text-[11px] font-bold text-ink-1 uppercase tracking-wider block">
                Recommended Textbooks
              </span>
              <p className="text-ink-2 leading-relaxed font-sans">
                All notes in this notebook cross-reference standard academic literature. We do not
                pretend student notes substitute for classical texts — they guide you through them.
              </p>
            </div>

            <div className="space-y-2 border-t md:border-t-0 md:border-l border-hairline pt-4 md:pt-0 md:pl-6">
              <span className="font-mono text-[11px] font-bold text-ink-1 uppercase tracking-wider block">
                Video Lecture Playlists
              </span>
              <p className="text-ink-2 leading-relaxed font-sans">
                Curated lectures from verified educators (Gate Smashers, Neso Academy, Knowledge Gate,
                and MIT OCW) selected specifically for difficult concept visualizations.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 5: CONTRIBUTE (OPEN STUDENT COLLABORATION)
            ========================================================= */}
        <section id="contribute" className="scroll-mt-32 border-t border-hairline pt-10 mb-8">
          <div className="rounded-xl border border-hairline bg-surface-1/60 p-6 sm:p-8 space-y-4">
            <div className="space-y-1">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-accent block">
                MODE 05 &middot; OPEN STUDENT COLLABORATION
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-ink-1 font-sans">
                These notes are open and maintained together.
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-ink-2 leading-relaxed max-w-2xl font-sans">
              Found a factual mistake? Have a clearer explanation or mental model? Created a useful
              diagram or worked out a tricky GATE question? Help make this notebook better for every
              student who opens it next.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-1 text-xs font-mono">
              <a
                href="https://github.com/ZainabShujat/Btech-blog/issues/new"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded bg-surface-2 border border-hairline text-ink-1 font-semibold hover:border-hairline-strong transition-colors"
              >
                <span>Suggest a correction</span>
                <span aria-hidden="true">&rarr;</span>
              </a>
              <a
                href="https://github.com/ZainabShujat/Btech-blog"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded bg-surface-2 border border-hairline text-accent font-semibold hover:border-hairline-strong transition-colors"
              >
                <span>Contribute a note</span>
                <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
        </section>
      </main>
    );
  }

  // Fallback for upcoming subject tracks without interactive course data yet
  return (
    <main className="mx-auto max-w-4xl px-4 sm:px-6 md:px-8 py-12 md:py-20 text-ink-2">
      <nav className="mb-4 text-xs font-mono text-ink-3" aria-label="Breadcrumb">
        <ol className="flex items-center gap-1.5">
          <li>
            <Link href="/notes" className="hover:text-ink-1 transition-colors">
              The Notebooks
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-ink-1 font-semibold">{track?.title}</li>
        </ol>
      </nav>

      <header className="border-b border-hairline pb-6 mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[11px] font-mono font-bold tracking-widest text-accent uppercase">
            NOTEBOOK IN PROGRESS
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-ink-1 tracking-tight mb-2 font-sans">
          {track?.title}
        </h1>
        <p className="text-base text-ink-2 italic font-serif">
          &ldquo;{track?.tagline}&rdquo;
        </p>
      </header>

      <div className="rounded border border-hairline bg-surface-1/40 p-6 space-y-4 text-xs">
        <p className="text-sm text-ink-1 font-semibold">
          This subject notebook is currently being researched and synthesized.
        </p>
        <p className="text-ink-2 leading-relaxed">
          We are drafting structured notes, interactive visualizations, and verified GATE derivations
          for {track?.title}. If you have notes or want to help author this notebook, contribute on GitHub.
        </p>
        <div className="pt-2">
          <Link
            href="/notes"
            className="text-accent hover:underline font-mono font-semibold"
          >
            &larr; Back to all notebooks
          </Link>
        </div>
      </div>
    </main>
  );
}
