"use client";

import { useEffect } from "react";
import { SubjectNotebookData } from "../../../lib/notebooks/types";
import NotebookFlipController from "./NotebookFlipController";

export default function NotebookModalViewer({
  notebook,
  onClose,
  initialPageIndex = 0,
}: {
  notebook: SubjectNotebookData;
  onClose: () => void;
  initialPageIndex?: number;
}) {
  // Prevent background scrolling while notebook is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 animate-in fade-in-0 duration-200"
      role="dialog"
      aria-modal="true"
      aria-label={`${notebook.title} Interactive Notebook`}
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Main Notebook Reading Container */}
      <div className="relative z-10 w-full max-w-4xl bg-raised border border-hairline rounded-2xl shadow-2xl p-4 sm:p-6 overflow-hidden max-h-[92vh] flex flex-col animate-in zoom-in-95 duration-200">
        <NotebookFlipController
          notebook={notebook}
          onClose={onClose}
          initialPageIndex={initialPageIndex}
        />
      </div>
    </div>
  );
}
