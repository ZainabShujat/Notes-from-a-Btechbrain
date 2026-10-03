"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { SubjectNotebookData } from "../../../lib/notebooks/types";
import NotebookPage from "./NotebookPage";

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
      className="flex flex-col h-full max-h-[85vh] w-full max-w-4xl mx-auto select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* ── TOP CONTROL BAR ── */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-hairline px-2 text-ink-3">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-bold text-accent uppercase tracking-wider">
            {notebook.code} &middot; OPEN NOTEBOOK
          </span>
          <span className="text-hairline">|</span>
          <span className="text-xs font-mono text-ink-2 truncate max-w-[200px] sm:max-w-none">
            {notebook.title}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Transition link to full subject hub */}
          <Link
            href={`/notes/${notebook.slug}`}
            className="hidden sm:inline-flex items-center gap-1 text-xs font-mono font-semibold text-accent hover:underline cursor-pointer"
          >
            <span>Enter Full Subject Hub</span>
            <span>&rarr;</span>
          </Link>

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded text-ink-3 hover:text-ink-1 hover:bg-surface-2 text-xs font-mono cursor-pointer transition-colors"
              aria-label="Close Notebook"
            >
              ✕ Close
            </button>
          )}
        </div>
      </div>

      {/* ── 3D NOTEBOOK STAGE WITH PAGE-FLIP ── */}
      <div className="relative flex-1 min-h-0 notebook-perspective flex items-center justify-center p-2 sm:p-4">
        {/* Physical Left Binding Seam Simulation on Desktop */}
        <div
          className="relative w-full h-full max-w-2xl notebook-3d-preserve transition-transform duration-300"
          style={{
            transform:
              isFlipping && flipDirection === "next"
                ? "rotateY(-4deg)"
                : isFlipping && flipDirection === "prev"
                ? "rotateY(4deg)"
                : "none",
          }}
        >
          {/* Active Physical Page Sheet */}
          <div
            className={`w-full h-full notebook-3d-preserve transition-all duration-300 ${
              isFlipping && flipDirection === "next"
                ? "notebook-origin-left -rotate-y-12 opacity-80"
                : isFlipping && flipDirection === "prev"
                ? "notebook-origin-right rotate-y-12 opacity-80"
                : ""
            }`}
          >
            {activePageData ? (
              <NotebookPage
                page={activePageData}
                subjectTitle={notebook.title}
                totalPages={totalPages}
              />
            ) : null}
          </div>
        </div>
      </div>

      {/* ── BOTTOM PAGE NAVIGATION CONTROLS ── */}
      <div className="pt-3 mt-2 border-t border-hairline px-2 flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Previous Button */}
        <button
          type="button"
          onClick={handlePrev}
          disabled={currentPage === 0 || isFlipping}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-hairline bg-surface-1 hover:bg-surface-2 text-xs font-mono font-semibold text-ink-2 hover:text-ink-1 disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer w-full sm:w-auto justify-center"
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
                  ? "bg-accent w-4"
                  : "bg-surface-3 hover:bg-ink-3"
              }`}
              aria-label={`Jump to page ${idx + 1}`}
            />
          ))}
          <span className="font-mono text-xs text-ink-3 ml-2">
            {currentPage + 1} of {totalPages}
          </span>
        </div>

        {/* Next Button */}
        <button
          type="button"
          onClick={handleNext}
          disabled={currentPage === totalPages - 1 || isFlipping}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-accent/40 bg-accent/10 hover:bg-accent/20 text-xs font-mono font-bold text-accent disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer w-full sm:w-auto justify-center"
        >
          <span>Next Page</span>
          <span>&rarr;</span>
        </button>
      </div>
    </div>
  );
}
