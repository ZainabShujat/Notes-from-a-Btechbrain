"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { CourseMeta, LessonMeta, ModuleMeta } from "../../../lib/courses/types";
import NotebookSpiralBinding from "../notebook/NotebookSpiralBinding";

export default function CourseLayout({
  course,
  currentModule,
  currentLesson,
  prevLesson,
  nextLesson,
  children,
}: {
  course: CourseMeta;
  currentModule?: ModuleMeta;
  currentLesson?: LessonMeta;
  prevLesson?: { title: string; href: string } | null;
  nextLesson?: { title: string; href: string } | null;
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState<string>("");
  const [activeSectionHeading, setActiveSectionHeading] = useState<string>("");

  // Track expanded modules in sidebar (default to current module expanded)
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    course.modules.forEach((m) => {
      initial[m.id] = currentModule?.id === m.id;
    });
    return initial;
  });

  const toggleModule = (modId: string) => {
    setExpandedModules((prev) => ({
      ...prev,
      [modId]: !prev[modId],
    }));
  };

  // Keyboard navigation for previous/next lessons
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }
      if (e.key === "ArrowLeft" && prevLesson) {
        window.location.href = prevLesson.href;
      } else if (e.key === "ArrowRight" && nextLesson) {
        window.location.href = nextLesson.href;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [prevLesson, nextLesson]);

  // Total lessons and current index
  const allLessonsInCourse: LessonMeta[] = course.modules.flatMap(
    (m) => m.lessons
  );
  const totalLessons = allLessonsInCourse.length;
  const currentLessonIndex = currentLesson
    ? allLessonsInCourse.findIndex((l) => l.id === currentLesson.id) + 1
    : 1;

  // Extract in-page sections for "On this page" TOC
  const onThisPageSections =
    currentLesson?.sections
      .map((s, idx) => ({
        id: s.id || `section-${idx}`,
        heading:
          s.heading ||
          (s.type === "quick-revision"
            ? "1-Minute Rapid Revision"
            : s.type === "gate-lens"
            ? "GATE Lens & Verified PYQs"
            : s.type === "resources"
            ? "Authoritative Source Trail"
            : null),
      }))
      .filter((item): item is { id: string; heading: string } =>
        Boolean(item.heading)
      ) || [];

  // Track scroll position to activate sticky title and detect current subhead
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 90);

      if (onThisPageSections.length === 0) return;

      let currentId = onThisPageSections[0].id;
      let currentHeading = onThisPageSections[0].heading;

      for (const sec of onThisPageSections) {
        const el = document.getElementById(sec.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 160) {
            currentId = sec.id;
            currentHeading = sec.heading;
          }
        }
      }

      setActiveSectionId(currentId);
      setActiveSectionHeading(currentHeading);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentLesson, onThisPageSections]);

  useEffect(() => {
    if (!isSidebarOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsSidebarOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isSidebarOpen]);

  return (
    <div className="flex flex-col bg-background text-ink-2 w-full max-w-full overflow-x-clip">
      {/* =========================================================
          STICKY TOP HEADER BAR (Minimal & Editorial)
          Sticks right below global site Nav
          ========================================================= */}
      <header className="sticky top-[61px] md:top-[68px] z-30 w-full border-b border-hairline bg-surface-1/95 backdrop-blur-md px-4 sm:px-6 py-2.5 transition-all">
        <div className="w-full flex items-center justify-between gap-4">
          <div className="min-w-0 flex-1">
            {!isScrolled ? (
              <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs font-mono text-ink-3 truncate">
                <Link
                  href="/notes"
                  className="hover:text-ink-1 transition-colors shrink-0"
                >
                  Notes
                </Link>
                <span>/</span>
                <Link
                  href={`/notes/${course.slug}`}
                  className="hover:text-ink-1 transition-colors font-medium text-ink-2 truncate"
                >
                  {course.title}
                </Link>
                {currentModule && (
                  <>
                    <span className="hidden sm:inline">/</span>
                    <span className="hidden sm:inline truncate text-ink-3">
                      {currentModule.title.replace(/^Module \d+:\s*/i, "")}
                    </span>
                  </>
                )}
                {currentLesson && (
                  <>
                    <span>/</span>
                    <span className="text-ink-1 font-semibold truncate">
                      {currentLesson.title}
                    </span>
                  </>
                )}
              </nav>
            ) : (
              <div className="flex flex-col justify-center min-w-0">
                <div className="text-xs sm:text-sm font-bold text-ink-1 truncate tracking-tight font-sans">
                  {currentLesson ? currentLesson.title : course.title}
                </div>
                {activeSectionHeading && (
                  <div className="text-[11px] text-accent font-mono truncate flex items-center gap-1 mt-0.5">
                    <span className="opacity-60">↳</span>
                    <span className="truncate">{activeSectionHeading}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Action: Mobile Syllabus toggle & desktop orientation */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden inline-flex items-center gap-1.5 px-2.5 py-1 rounded border border-hairline bg-surface-2 hover:bg-surface-3 text-xs font-mono text-ink-1 transition-colors shrink-0 cursor-pointer"
              aria-expanded={isSidebarOpen}
              aria-label="Toggle syllabus outline"
            >
              <span>Notes Outline</span>
              <span className="text-accent text-[11px] font-bold">
                ({String(currentLessonIndex).padStart(2, "0")}/{String(totalLessons).padStart(2, "0")})
              </span>
            </button>

            <div className="hidden lg:flex items-center gap-2.5 text-xs font-mono text-ink-3">
              <Link
                href={`/notes/${course.slug}`}
                className="hover:text-accent transition-colors"
              >
                Outline
              </Link>
              <span>·</span>
              <span>
                Topic {String(currentLessonIndex).padStart(2, "0")} of {String(totalLessons).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>
      </header>

      {isSidebarOpen && (
        <>
          <button
            type="button"
            aria-label="Close notes outline"
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 top-[61px] z-40 bg-black/45 lg:hidden"
          />
          <aside
            aria-label="Mobile subject outline"
            className="fixed right-0 top-[61px] z-50 flex h-[calc(100vh-61px)] w-[min(86vw,22rem)] flex-col overflow-y-auto border-l border-hairline bg-raised p-5 shadow-2xl lg:hidden"
          >
            <div className="mb-5 flex items-start justify-between gap-3 border-b border-hairline/80 pb-3">
              <div>
                <Link
                  href={`/notes/${course.slug}`}
                  onClick={() => setIsSidebarOpen(false)}
                  className="block text-sm font-bold uppercase tracking-wider text-ink-1 hover:text-accent"
                >
                  {course.title}
                </Link>
                <div className="mt-1 text-[11px] font-mono text-ink-3">
                  {course.modules.length} topics &middot; {totalLessons} notes
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsSidebarOpen(false)}
                aria-label="Close notes outline"
                className="rounded border border-hairline px-2 py-1 text-lg leading-none text-ink-2 hover:bg-surface-2"
              >
                &times;
              </button>
            </div>

            <div className="space-y-3 font-mono text-xs">
              {course.modules.map((mod, modIdx) => {
                const isCurrentMod = currentModule?.id === mod.id;
                const isExpanded = !!expandedModules[mod.id];
                const modTitleClean = mod.title.replace(/^Module \d+:\s*/i, "");

                return (
                  <div key={mod.id}>
                    <button
                      type="button"
                      onClick={() => toggleModule(mod.id)}
                      className={`w-full py-1 text-left flex items-center justify-between gap-2.5 ${isCurrentMod ? "text-ink-1 font-semibold" : "text-ink-2"}`}
                    >
                      <span className="flex min-w-0 items-center gap-2.5">
                        <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] ${isCurrentMod ? "border border-accent/40 bg-accent/20 text-accent" : "border border-hairline bg-surface-2 text-ink-3"}`}>
                          {modIdx + 1}
                        </span>
                        <span className="truncate font-sans leading-snug">{modTitleClean}</span>
                      </span>
                      <span className="shrink-0 text-ink-3">{isExpanded ? "▾" : "▸"}</span>
                    </button>

                    {isExpanded && (
                      <div className="my-1.5 ml-7 space-y-1 border-l border-hairline/70 pl-2 font-sans">
                        {mod.lessons.map((lesson, lessonIdx) => {
                          const isCurrent = currentLesson?.id === lesson.id;
                          return (
                            <Link
                              key={lesson.id}
                              href={`/notes/${course.slug}/${lesson.slug}`}
                              onClick={() => setIsSidebarOpen(false)}
                              aria-current={isCurrent ? "page" : undefined}
                              className={`block rounded-[5px] px-2 py-2 text-xs leading-snug ${isCurrent ? "border border-accent/30 bg-accent/15 font-semibold text-accent" : "text-ink-3 hover:bg-surface-1 hover:text-ink-1"}`}
                            >
                              <span className="flex items-baseline gap-1.5">
                                <span className="shrink-0 font-mono text-[10px] opacity-70">{modIdx + 1}.{lessonIdx + 1}</span>
                                <span>{lesson.title}</span>
                              </span>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </aside>
        </>
      )}

      <div className="flex-1 flex w-full max-w-full relative overflow-x-clip">
        {/* =========================================================
            LEFT SIDEBAR: TABLE OF CONTENTS
            Clean, quiet typographic outline of the engineering notebook
            ========================================================= */}
        <aside
          aria-label="Table of Contents"
          className="hidden lg:flex flex-col w-72 shrink-0 sticky top-[102px] md:top-[110px] h-[calc(100vh-102px)] md:h-[calc(100vh-110px)] overflow-y-auto border-r border-hairline/80 bg-surface-1/10 p-5 select-none"
        >
          {/* Notebook Header */}
          <div className="border-b border-hairline/80 pb-3 mb-4">
            <Link
              href={`/notes/${course.slug}`}
              className="text-sm font-bold text-ink-1 hover:text-accent transition-colors block uppercase tracking-wider font-sans"
            >
              {course.title}
            </Link>
            <div className="text-[11px] text-ink-3 font-mono mt-1">
              {course.modules.length} topics &middot; {totalLessons} notes
            </div>
          </div>

          {/* Module List with Circular Badges (Matching Image 1) */}
          <div className="flex-1 space-y-3 font-mono text-xs">
            {course.modules.map((mod, modIdx) => {
              const isCurrentMod = currentModule?.id === mod.id;
              const isExpanded = !!expandedModules[mod.id];
              const modTitleClean = mod.title.replace(/^Module \d+:\s*/i, "");

              return (
                <div key={mod.id} className="group">
                  {/* Module Heading with Circular Badge */}
                  <button
                    type="button"
                    onClick={() => toggleModule(mod.id)}
                    className={`w-full text-left py-1 flex items-center justify-between gap-2.5 transition-colors cursor-pointer ${
                      isCurrentMod ? "text-ink-1 font-semibold" : "text-ink-2 hover:text-ink-1"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span
                        className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono shrink-0 transition-colors ${
                          isCurrentMod
                            ? "bg-accent/20 text-accent font-bold border border-accent/40"
                            : "bg-surface-2 text-ink-3 border border-hairline"
                        }`}
                      >
                        {modIdx + 1}
                      </span>
                      <span className="text-xs truncate font-sans tracking-tight leading-snug">
                        {modTitleClean}
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-ink-3 opacity-60 shrink-0">
                      {isExpanded ? "▾" : "▸"}
                    </span>
                  </button>

                  {/* Topics List Inside Module */}
                  {isExpanded && (
                    <div className="ml-7 pl-2 border-l border-hairline/70 space-y-1 my-1.5 font-sans">
                      {mod.lessons.map((l, lIdx) => {
                        const isCurrent = currentLesson?.id === l.id;
                        const subLessonNum = `${modIdx + 1}.${lIdx + 1}`;

                        return (
                          <div key={l.id}>
                            <Link
                              href={`/notes/${course.slug}/${l.slug}`}
                              aria-current={isCurrent ? "page" : undefined}
                              className={`block text-xs py-1.5 px-2 rounded-[5px] transition-colors leading-snug ${
                                isCurrent
                                  ? "bg-accent/15 text-accent font-semibold border border-accent/30 shadow-xs"
                                  : "text-ink-3 hover:text-ink-1 hover:bg-surface-1"
                              }`}
                            >
                              <span className="flex items-baseline gap-1.5">
                                <span className="font-mono text-[10px] opacity-70 shrink-0">
                                  {subLessonNum}
                                </span>
                                <span className="truncate">
                                  {l.title}
                                </span>
                              </span>
                            </Link>

                            {/* In-Page Subheadings Under Active Topic */}
                            {isCurrent && onThisPageSections.length > 0 && (
                              <nav className="my-1 ml-4 pl-2 border-l border-accent/30 space-y-1">
                                {onThisPageSections.map((sec, sIdx) => {
                                  const isActive = activeSectionId === sec.id;
                                  const cleanHeading = sec.heading.replace(/^\d+\.\s*/, "");
                                  return (
                                    <a
                                      key={sIdx}
                                      href={`#${sec.id}`}
                                      className={`block py-0.5 text-[11px] rounded transition-colors leading-snug font-sans truncate ${
                                        isActive
                                          ? "text-accent font-semibold"
                                          : "text-ink-3/80 hover:text-ink-1"
                                      }`}
                                    >
                                      <span className="opacity-40 font-mono mr-1">&middot;</span>
                                      {cleanHeading}
                                    </a>
                                  );
                                })}
                              </nav>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </aside>

        {/* =========================================================
            MAIN READING CANVAS (The Page IS the UI)
            An actual open engineering student notebook sheet
            ========================================================= */}
        <main className="relative flex-1 min-w-0 w-full max-w-[1200px] mx-auto pl-10 pr-4 sm:pl-14 sm:pr-8 md:pl-20 md:pr-12 lg:pl-24 lg:pr-16 py-8 md:py-12 overflow-visible notebook-reading-page notebook-vertical-margin-rule rounded-xl sm:rounded-2xl my-3 md:my-6 border border-hairline/70">
          <NotebookSpiralBinding />

          {/* Quiet Student Notebook Folio Line */}
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 pb-3 mb-8 border-b border-dashed border-hairline/80 text-ink-3 text-xs font-mono">
            <div className="flex items-baseline gap-2">
              <span className="text-ink-2 font-medium font-mono text-[11px]">
                {course.title.toUpperCase()}
              </span>
              <span className="opacity-40">/</span>
              <span className="text-ink-3 text-[11px] font-sans">
                Student Engineering Notebook
              </span>
            </div>
            <div className="text-[11px] text-ink-3/80 flex items-center gap-1.5 font-mono">
              <span>Page {String(currentLessonIndex).padStart(2, "0")}</span>
              <span className="opacity-40">&middot;</span>
              <span className="text-accent font-handwriting text-sm">
                notes
              </span>
            </div>
          </div>

          {children}

          {/* Previous / Next Topic Navigation */}
          {(prevLesson || nextLesson) && (
            <nav
              aria-label="Topic navigation"
              className="mt-16 pt-8 border-t border-dashed border-hairline/80 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 w-full min-w-0"
            >
              {prevLesson ? (
                <Link
                  href={prevLesson.href}
                  className="flex flex-col py-3 px-4 rounded-[6px] border border-hairline/70 bg-surface-1/40 hover:bg-surface-2 transition-colors text-left flex-1 min-w-0"
                >
                  <span className="text-[10px] font-mono uppercase tracking-wider text-ink-3 mb-1">
                    &larr; Previous Note
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-ink-1 truncate font-sans">
                    {prevLesson.title}
                  </span>
                </Link>
              ) : (
                <div className="flex-1" />
              )}

              {nextLesson ? (
                <Link
                  href={nextLesson.href}
                  className="flex flex-col py-3 px-4 rounded-[6px] border border-accent/40 bg-accent/5 hover:bg-accent/10 hover:border-accent transition-all text-right flex-1 min-w-0"
                >
                  <span className="text-[10px] font-mono uppercase tracking-wider text-accent font-semibold mb-1">
                    Next Note &rarr;
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-ink-1 truncate font-sans">
                    {nextLesson.title}
                  </span>
                </Link>
              ) : (
                <div className="flex-1" />
              )}
            </nav>
          )}
        </main>
      </div>
    </div>
  );
}
