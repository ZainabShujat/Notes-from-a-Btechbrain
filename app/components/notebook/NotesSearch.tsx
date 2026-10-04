"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { getAllCourses } from "../../../lib/courses";
import { SUBJECT_NOTEBOOKS } from "../../../lib/notebooks/data";

type SearchResult = {
  title: string;
  description: string;
  href: string;
  kind: "Subject" | "Note";
};

const SEARCH_RESULTS: SearchResult[] = [
  ...SUBJECT_NOTEBOOKS.flatMap((notebook) => [
    {
      title: notebook.title,
      description: notebook.tagline,
      href: `/notes/${notebook.slug}`,
      kind: "Subject" as const,
    },
    ...notebook.pages.map((page) => ({
      title: page.title,
      description: `${notebook.title} · ${page.tag ?? page.type}`,
      href: `/notes/${notebook.slug}#${page.id}`,
      kind: "Note" as const,
    })),
  ]),
  ...getAllCourses().flatMap((course) => [
    {
      title: course.title,
      description: course.tagline,
      href: `/notes/${course.slug}`,
      kind: "Subject" as const,
    },
    ...course.modules.flatMap((module) =>
      module.lessons.map((lesson) => ({
        title: lesson.title,
        description: `${course.title} · ${lesson.tagline}`,
        href: `/notes/${course.slug}/${lesson.slug}`,
        kind: "Note" as const,
      }))
    ),
  ]),
];

export default function NotesSearch() {
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLowerCase();

  const results = useMemo(() => {
    if (!normalizedQuery) return [];

    return SEARCH_RESULTS.filter((result) =>
      `${result.title} ${result.description}`.toLowerCase().includes(normalizedQuery)
    ).slice(0, 8);
  }, [normalizedQuery]);

  return (
    <div className="relative">
      <label className="relative block md:ml-auto md:max-w-xs">
        <span className="sr-only">Search notes</span>
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search notes and subjects..."
          aria-label="Search notes and subjects"
          className="w-full rounded-[6px] border border-hairline bg-surface-1/60 px-3.5 py-2 pl-9 text-xs font-mono text-ink-1 outline-none transition-all placeholder:text-ink-3 focus:border-[#7c3aed] focus:bg-surface-1"
        />
        <svg
          className="pointer-events-none absolute left-3 top-2.5 h-3.5 w-3.5 text-ink-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
        </svg>
      </label>

      {normalizedQuery && (
        <div className="absolute left-4 right-4 top-[4.25rem] z-30 overflow-hidden rounded-[6px] border border-hairline bg-surface-1 shadow-lg sm:left-6 sm:right-6 md:left-auto md:right-8 md:w-[28rem]">
          {results.length > 0 ? (
            <ul aria-label="Search results" className="divide-y divide-hairline">
              {results.map((result) => (
                <li key={`${result.kind}-${result.href}`}>
                  <Link
                    href={result.href}
                    onClick={() => setQuery("")}
                    className="block px-4 py-3 transition-colors hover:bg-surface-2"
                  >
                    <span className="block text-sm font-semibold text-ink-1">{result.title}</span>
                    <span className="mt-0.5 block text-[11px] text-ink-3">
                      {result.kind} · {result.description}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-4 py-5 text-xs font-mono text-ink-3">
              No notes or subjects match &ldquo;{query}&rdquo;.
            </p>
          )}
        </div>
      )}
    </div>
  );
}