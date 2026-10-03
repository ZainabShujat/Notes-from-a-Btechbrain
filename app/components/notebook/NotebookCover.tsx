import React from "react";
import { SubjectNotebookData } from "../../../lib/notebooks/types";
import NotebookSpine from "./NotebookSpine";
import NotebookPageStack from "./NotebookPageStack";
import SubjectCoverSketch from "./SubjectCoverSketch";

export default function NotebookCover({
  notebook,
  isHovered,
  serialNumber = "01",
}: {
  notebook: SubjectNotebookData;
  isHovered?: boolean;
  serialNumber?: string;
}) {
  return (
    <div
      className={`relative w-full h-full min-h-[380px] sm:min-h-[420px] rounded-r-[6px] rounded-l-[4px] border border-[#d6cfbe] bg-[#fcfaf5] text-[#1c1917] overflow-hidden flex flex-col justify-between p-6 pl-8 sm:pl-10 select-none transition-shadow duration-300 ${
        isHovered
          ? "shadow-[0_18px_32px_-8px_rgba(0,0,0,0.28),0_4px_12px_-2px_rgba(0,0,0,0.15)]"
          : "shadow-[0_6px_18px_-4px_rgba(0,0,0,0.14),0_2px_6px_-2px_rgba(0,0,0,0.08)]"
      }`}
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      {/* ── TACTILE CLOTH SPINE TAPE (LEFT) ── */}
      <NotebookSpine
        title={notebook.title}
        code={notebook.code}
        accentHex={notebook.accentHex}
      />

      {/* ── MULTI-SHEET EDGES & PROTRUDING INDEX TAB (RIGHT & BOTTOM) ── */}
      <NotebookPageStack
        isHovered={isHovered}
        accentHex={notebook.accentHex}
      />

      {/* ── SUBTLE PAPER GRAIN & DEBOSSED INSET BORDER ── */}
      <div
        className="absolute inset-0 left-5 pointer-events-none opacity-[0.035] bg-[radial-gradient(currentColor_1px,transparent_1px)] [background-size:12px_12px]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-3 left-8 sm:left-9 rounded-[3px] border border-[#1c1917]/10 pointer-events-none"
        aria-hidden="true"
      />

      {/* ── TOP: SERIAL STAMP & ACADEMIC TITLE ── */}
      <div className="relative z-10 space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs font-bold text-[#7c3aed] tracking-wider">
            {serialNumber}
          </span>
          <div className="flex items-center gap-2">
            {notebook.isLocked && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[4px] bg-amber-500/15 border border-amber-600/30 text-amber-700 font-mono text-[9px] font-bold tracking-wider">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-2.5 h-2.5"
                  aria-hidden="true"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" fill="currentColor" fillOpacity="0.25" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  <circle cx="12" cy="16" r="1.5" fill="currentColor" />
                </svg>
                LOCKED
              </span>
            )}
            <span className="font-mono text-[10px] text-[#78716c] uppercase tracking-wider">
              {notebook.level.split("·")[0].trim()}
            </span>
          </div>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold tracking-tight leading-[1.18] font-sans text-[#1e1b4b]">
          {notebook.title}
        </h3>

        <p className="text-xs text-[#57534e] leading-relaxed line-clamp-2 max-w-[28ch]">
          {notebook.tagline}
        </p>
      </div>

      {/* ── CENTER: DELICATE HAND-DRAWN THIN-INK VECTOR SKETCH & LOCKED BADGE ── */}
      <div className="relative z-10 my-auto py-3 flex flex-col items-center justify-center">
        <div className={`transition-opacity duration-300 ${notebook.isLocked ? "opacity-65" : "opacity-100"}`}>
          <SubjectCoverSketch
            subjectId={notebook.id}
            accentHex={notebook.accentHex}
          />
        </div>

        {/* Tactile Brass Padlock SVG & Manuscript Ribbon for Unexecuted Subjects */}
        {notebook.isLocked && (
          <div className="mt-2 flex flex-col items-center gap-1.5 animate-fadeIn">
            <div className="flex items-center gap-2 px-3 py-1 rounded bg-[#fdf6e2]/95 border border-[#d97706]/40 shadow-[0_2px_8px_rgba(217,119,6,0.15)] text-[#92400e]">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 text-[#d97706]"
                aria-hidden="true"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" fill="currentColor" fillOpacity="0.2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                <circle cx="12" cy="16" r="1.5" fill="currentColor" />
                <path d="M12 17.5v2" strokeWidth="1.5" />
              </svg>
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#92400e]">
                Manuscript in Preparation
              </span>
            </div>
            <span className="font-handwriting text-xs text-[#b45309] tracking-wide font-semibold">
              ✎ drafting per syllabus audit
            </span>
          </div>
        )}
      </div>

      {/* ── BOTTOM: RESTRAINED TECHNICAL METADATA ── */}
      <div className="relative z-10 pt-2.5 border-t border-[#1c1917]/10 flex items-center justify-between text-[11px] font-mono text-[#78716c]">
        <span>
          {notebook.status === "draft"
            ? "Draft in build"
            : `${notebook.stats.sectionsCount} sections · ${notebook.stats.notesCount} notes`}
        </span>
        <span className={`text-[10px] font-semibold ${notebook.status === "draft" ? "text-amber-600" : "text-[#7c3aed]"}`}>
          {notebook.status === "draft" ? (notebook.isLocked ? "🔒 Coming later" : "Early access") : `${notebook.stats.labsCount} labs`}
        </span>
      </div>
    </div>
  );
}
