"use client";

import { useState } from "react";
import Link from "next/link";
import { SubjectNotebookData } from "../../../lib/notebooks/types";
import NotebookCover from "./NotebookCover";
import NotebookInteriorPeek from "./NotebookInteriorPeek";

export default function NotebookPreview({
  notebook,
  serialNumber = "01",
  onOpen,
}: {
  notebook: SubjectNotebookData;
  serialNumber?: string;
  onOpen: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onOpen();
    }
  };

  return (
    <div className="flex flex-col justify-between group notebook-card">
      {/* ── 3D PHYSICAL NOTEBOOK CONTAINER ── */}
      <div
        className="notebook-preview relative w-full min-h-[380px] sm:min-h-[420px] cursor-pointer rounded-r-[6px] rounded-l-[4px] outline-none select-none transition-transform duration-300"
        style={{
          perspective: "1200px",
          transform: isHovered ? "translateY(-4px)" : "translateY(0)",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onOpen}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-label={`Open ${notebook.title} Student Notebook`}
      >
        {/* ── REVEALED INTERIOR NOTEBOOK PAGE (SITS DIRECTLY INSIDE BINDING) ── */}
        <NotebookInteriorPeek
          notebook={notebook}
          serialNumber={serialNumber}
        />

        {/* ── FRONT COVER (SWINGS OPEN ON 3D SPINE HINGE ON HOVER) ── */}
        <div
          className="absolute inset-0 z-20 w-full h-full"
          style={{
            transformOrigin: "left center",
            transform: isHovered ? "rotateY(-36deg)" : "rotateY(0deg)",
            transition: "transform 0.42s cubic-bezier(0.2, 0.8, 0.2, 1)",
            boxShadow: isHovered ? "8px 12px 24px -4px rgba(0, 0, 0, 0.35)" : "none",
          }}
        >
          <NotebookCover
            notebook={notebook}
            isHovered={isHovered}
            serialNumber={serialNumber}
          />
        </div>
      </div>

      {/* ── CLEAN UNDER-NOTEBOOK ACTIONS (FLIP PAGES & OPEN NOTEBOOK) ── */}
      <div className="mt-3.5 flex items-center justify-between text-xs font-mono px-1">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onOpen();
          }}
          className="text-[#7c3aed] dark:text-[#a78bfa] hover:underline inline-flex items-center gap-1 font-semibold cursor-pointer py-1"
        >
          <span>{notebook.isLocked ? "Preview Syllabus" : "Flip Pages"}</span>
          <span className="font-handwriting text-sm font-bold">✎</span>
        </button>

        {notebook.isLocked ? (
          <span className="text-amber-600/90 dark:text-amber-400/90 font-mono text-[11px] flex items-center gap-1 select-none py-1">
            <span>In Preparation</span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-3 h-3"
              aria-hidden="true"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </span>
        ) : (
          <Link
            href={`/notes/${notebook.slug}`}
            onClick={(e) => e.stopPropagation()}
            className="text-ink-2 hover:text-[#7c3aed] font-semibold transition-colors flex items-center gap-1 cursor-pointer py-1 px-2 rounded bg-surface-2/60 hover:bg-surface-3"
          >
            <span>Open Notebook</span>
            <span aria-hidden="true">&rarr;</span>
          </Link>
        )}
      </div>
    </div>
  );
}
