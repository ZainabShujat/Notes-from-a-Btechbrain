"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { SubjectNotebookData } from "../../../lib/notebooks/types";
import NotebookPage from "./NotebookPage";
import NotebookSpiralBinding from "./NotebookSpiralBinding";

export default function NotebookFlipController({
  notebook,
  onClose,
  initialPageIndex = 0,
}: {
  notebook: SubjectNotebookData;
  onClose?: () => void;
  initialPageIndex?: number;
}) {
  const [currentPage, setCurrentPage] = useState(initialPageIndex);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<"next" | "prev" | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalPages = notebook.pages.length;

  const handleNext = useCallback(() => {
    if (currentPage < totalPages - 1 && !isFlipping) {
      setIsFlipping(true);
      setFlipDirection("next");
      setTimeout(() => {
        setCurrentPage((prev) => prev + 1);
        setIsFlipping(false);
        setFlipDirection(null);
      }, 350);
    }
  }, [currentPage, totalPages, isFlipping]);

  const handlePrev = useCallback(() => {
    if (currentPage > 0 && !isFlipping) {
      setIsFlipping(true);
      setFlipDirection("prev");
      setTimeout(() => {
        setCurrentPage((prev) => prev - 1);
        setIsFlipping(false);
        setFlipDirection(null);
      }, 350);
    }
  }, [currentPage, isFlipping]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      } else if (e.key === "Escape" && onClose) {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev, onClose]);

  // Touch Swipe Support
  const touchStartXRef = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartXRef.current;
    touchStartXRef.current = null;
    if (deltaX < -50) {
      handleNext();
    } else if (deltaX > 50) {
      handlePrev();
    }
  };

  const activePageData = notebook.pages[currentPage];

  return (
    <div
      ref={containerRef}
      className="flex flex-col h-full w-full select-none overflow-hidden bg-[#faf8f5] text-[#1c1917]"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* ── FIXED TOP BAR (NEVER OVERLAPPED) ── */}
      <div className="shrink-0 flex items-center justify-between px-4 sm:px-6 py-3 border-b border-[#e5ded0] bg-[#faf8f5] z-20">
        <div className="flex items-center gap-2 truncate">
          <span className="font-mono text-[11px] font-bold text-[#7c3aed] uppercase tracking-wider bg-violet-500/10 px-2 py-0.5 rounded">
            {notebook.code}
          </span>
          <span className="text-[#d6cfbe]">|</span>
          <span className="text-xs font-mono font-semibold text-[#1c1917] truncate">
            {notebook.title}
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <Link
            href={`/notes/${notebook.slug}`}
            className="hidden sm:inline-flex items-center gap-1 text-xs font-mono font-semibold text-[#7c3aed] hover:underline"
          >
            <span>Subject Hub</span>
            <span>&rarr;</span>
          </Link>

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="px-2.5 py-1 rounded text-xs font-mono font-bold text-[#57534e] hover:text-[#1c1917] hover:bg-black/5 transition-colors border border-[#d6cfbe] cursor-pointer"
              aria-label="Close Notebook"
            >
              ✕ Close
            </button>
          )}
        </div>
      </div>

      {/* ── SCROLLABLE READING PAGE AREA WITH PHYSICAL SPIRAL BINDING ── */}
      <div className="flex-1 min-h-0 w-full overflow-hidden flex relative z-10 bg-[#faf8f5]">
        {/* Physical Spiral Binding Rings on Left */}
        <NotebookSpiralBinding />

        {/* The Actual Page Sheet */}
        <div className="flex-1 min-h-0 h-full overflow-hidden flex flex-col pl-7 sm:pl-9 pr-1">
          {activePageData ? (
            <NotebookPage
              page={activePageData}
              subjectTitle={notebook.title}
              totalPages={totalPages}
            />
          ) : null}
        </div>
      </div>

      {/* ── BOTTOM PAGE NAVIGATION CONTROLS ── */}
      <div className="shrink-0 pt-3 mt-1 border-t border-[#e2d9cc] px-2 flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Previous Button */}
        <button
          type="button"
          onClick={handlePrev}
          disabled={currentPage === 0 || isFlipping}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md border border-[#d6cfbe] bg-white/70 hover:bg-white text-xs font-mono font-semibold text-[#1c1917] disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer w-full sm:w-auto justify-center shadow-xs"
        >
          <span>&larr;</span>
          <span>Previous Page</span>
        </button>

        {/* Page Dots / Progress Indicator */}
        <div className="flex items-center gap-1.5">
          {notebook.pages.map((p, idx) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setCurrentPage(idx)}
              className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                currentPage === idx
                  ? "bg-[#7c3aed] w-4"
                  : "bg-[#d6cfbe] hover:bg-[#78716c]"
              }`}
              aria-label={`Jump to page ${idx + 1}`}
            />
          ))}
          <span className="font-mono text-xs text-[#78716c] ml-2 font-medium">
            Page {currentPage + 1} of {totalPages}
          </span>
        </div>

        {/* Next Button */}
        <button
          type="button"
          onClick={handleNext}
          disabled={currentPage === totalPages - 1 || isFlipping}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md border border-[#7c3aed]/40 bg-[#7c3aed] text-white hover:bg-[#6d28d9] text-xs font-mono font-bold disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer w-full sm:w-auto justify-center shadow-xs"
        >
          <span>Next Page</span>
          <span>&rarr;</span>
        </button>
      </div>
    </div>
  );
}
