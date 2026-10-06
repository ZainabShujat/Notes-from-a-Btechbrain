"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CourseMeta, LessonMeta, ModuleMeta } from "../../../lib/courses/types";
import NotebookSpiralBinding from "../notebook/NotebookSpiralBinding";
import DontFeelDumbProvider from "./DontFeelDumbProvider";

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
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDesktopSidebarCollapsed, setIsDesktopSidebarCollapsed] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState<string>("");
  const [turnDirection, setTurnDirection] = useState<"next" | "prev" | null>(null);
  const isNavigatingRef = useRef(false);

  // Clear transition when the current lesson changes (new page settled)
  useEffect(() => {
    setTurnDirection(null);
    isNavigatingRef.current = false;
  }, [currentLesson?.id]);

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

  const handleNavigate = (direction: "next" | "prev", href: string) => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;

    // Prefetch target route for instantaneous rendering
    try {
      router.prefetch(href);
    } catch {
      // Ignore prefetch errors
    }

    // Check prefers-reduced-motion
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      router.push(href);
      return;
    }

    setTurnDirection(direction);

    // Timing tuned for 520ms page turn animation
    setTimeout(() => {
      router.push(href);
    }, 480);
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
        e.preventDefault();
        handleNavigate("prev", prevLesson.href);
      } else if (e.key === "ArrowRight" && nextLesson) {
        e.preventDefault();
        handleNavigate("next", nextLesson.href);
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

  // Track scroll position to detect current subhead in sidebar
  useEffect(() => {
    const handleScroll = () => {
      if (onThisPageSections.length === 0) return;

      let currentId = onThisPageSections[0].id;

      for (const sec of onThisPageSections) {
        const el = document.getElementById(sec.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 160) {
            currentId = sec.id;
          }
        }
      }

      setActiveSectionId(currentId);
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
          TOP BREADCRUMB STRIP (Sticky when sidebar is closed, keeps exact width)
          ========================================================= */}
      <div className={`w-full border-b border-hairline bg-surface-1/95 backdrop-blur-md px-4 sm:px-6 py-2.5 transition-all z-30 ${isDesktopSidebarCollapsed ? "sticky top-[61px] md:top-[68px]" : ""}`}>
        <div className="w-full flex items-center justify-between gap-4">
          <div className="min-w-0 flex-1 flex items-center gap-3">
            {/* Desktop Sidebar Toggle Button */}
            <button
              type="button"
              onClick={() => setIsDesktopSidebarCollapsed(!isDesktopSidebarCollapsed)}
              className="hidden lg:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[5px] border border-hairline/80 bg-surface-2 hover:bg-surface-3 text-xs font-mono text-ink-1 transition-all cursor-pointer shadow-xs hover:border-hairline-strong shrink-0"
              title={isDesktopSidebarCollapsed ? "Show Table of Contents Sidebar" : "Collapse Sidebar"}
              aria-label={isDesktopSidebarCollapsed ? "Show Sidebar" : "Hide Sidebar"}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5 text-accent">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <line x1="9" y1="3" x2="9" y2="21" />
              </svg>
              <span>{isDesktopSidebarCollapsed ? "Show Sidebar" : "Hide Sidebar"}</span>
            </button>

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
          </div>

          {/* Right Action: Mobile Syllabus toggle & topic orientation */}
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
      </div>

      {isSidebarOpen && (
        <>
          <button
            type="button"
            aria-label="Close notes outline"
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 top-[61px] md:top-[68px] z-40 bg-black/45 lg:hidden"
          />
          <aside
            aria-label="Mobile subject outline"
            className="fixed right-0 top-[61px] md:top-[68px] z-50 flex h-[calc(100vh-61px)] md:h-[calc(100vh-68px)] w-[min(86vw,22rem)] flex-col overflow-y-auto border-l border-hairline bg-raised p-5 shadow-2xl lg:hidden"
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
            LEFT SIDEBAR: TABLE OF CONTENTS (Collapsible on Desktop)
            ========================================================= */}
        {!isDesktopSidebarCollapsed && (
          <aside
            aria-label="Table of Contents"
            className="hidden lg:flex flex-col w-72 shrink-0 sticky top-[61px] md:top-[68px] h-[calc(100vh-61px)] md:h-[calc(100vh-68px)] overflow-y-auto border-r border-hairline/80 bg-surface-1/10 p-5 select-none transition-all duration-300"
          >
            {/* Notebook Header */}
            <div className="border-b border-hairline/80 pb-3 mb-4 flex items-start justify-between gap-2">
              <div>
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
              <button
                type="button"
                onClick={() => setIsDesktopSidebarCollapsed(true)}
                className="text-ink-3 hover:text-ink-1 p-1 rounded hover:bg-surface-2 transition-colors cursor-pointer"
                title="Collapse sidebar"
                aria-label="Collapse sidebar"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                  <path d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                </svg>
              </button>
            </div>

            {/* Module List with Circular Badges */}
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
        )}

        {/* =========================================================
            MAIN READING CANVAS (The Page IS the UI)
            Occupies clean width with font scaling when sidebar is collapsed
            ========================================================= */}
        <DontFeelDumbProvider>
          <div className="flex-1 min-w-0 w-full max-w-[1200px] mx-auto notebook-perspective-stage">
            <main
              className={`relative flex-1 min-w-0 w-full mx-auto transition-all duration-300 ${
                isDesktopSidebarCollapsed
                  ? "pl-11 xs:pl-12 sm:pl-14 pr-3.5 sm:pr-8 md:pl-20 md:pr-12 lg:pl-24 lg:pr-16 py-6 sm:py-10 md:py-16 notebook-reading-page notebook-vertical-margin-rule notebook-viewport-scaled notebook-expanded rounded-xl sm:rounded-2xl my-2 sm:my-3 md:my-6 border border-hairline/70"
                  : "pl-11 xs:pl-12 sm:pl-14 pr-3.5 sm:pr-8 md:pl-20 md:pr-12 lg:pl-24 lg:pr-16 py-6 sm:py-8 md:py-12 notebook-reading-page notebook-vertical-margin-rule notebook-viewport-scaled rounded-xl sm:rounded-2xl my-2 sm:my-3 md:my-6 border border-hairline/70"
              } ${
                turnDirection === "next"
                  ? "notebook-page-turning-next"
                  : turnDirection === "prev"
                  ? "notebook-page-turning-prev"
                  : ""
              } overflow-visible`}
            >
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
                    onClick={(e) => {
                      if (!e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey && e.button === 0) {
                        e.preventDefault();
                        handleNavigate("prev", prevLesson.href);
                      }
                    }}
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
                    onClick={(e) => {
                      if (!e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey && e.button === 0) {
                        e.preventDefault();
                        handleNavigate("next", nextLesson.href);
                      }
                    }}
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
        </DontFeelDumbProvider>
      </div>
    </div>
  );
}
