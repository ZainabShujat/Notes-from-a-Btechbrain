import React from "react";
import { SubjectNotebookData } from "../../../lib/notebooks/types";
import SubjectCoverSketch from "./SubjectCoverSketch";

export default function NotebookInteriorPeek({
  notebook,
  serialNumber = "01",
}: {
  notebook: SubjectNotebookData;
  serialNumber?: string;
}) {
  // Extract or fall back to high-yield student notes for this subject
  const snippet = notebook.previewSnippets?.[0] || {
    title: "Core Mechanics",
    teaser: "Hardware & software architectural boundaries",
  };

  const stickyNoteText = getSubjectStickyNote(notebook.id);
  const diagramKey = notebook.id;

  return (
    <div
      className="notebook-interior-peek absolute inset-0 rounded-r-[6px] rounded-l-[4px] border border-[#d6cfbe] bg-[#fbf9f4] text-[#1c1917] overflow-hidden flex flex-col justify-between p-5 pl-7 select-none shadow-[inset_3px_0_6px_rgba(0,0,0,0.06)]"
      style={{
        backgroundImage: "radial-gradient(circle, rgba(124, 58, 237, 0.08) 1.2px, transparent 1.2px)",
        backgroundSize: "16px 16px",
      }}
      aria-hidden="true"
    >
      {/* ── LEFT SPINE FOLD / SEAM SHADOW ── */}
      <div className="absolute top-0 bottom-0 left-0 w-3.5 bg-gradient-to-r from-black/20 via-black/5 to-transparent pointer-events-none" />

      {/* ── TOP RUNNING FOLIO & MODULE NUMBER ── */}
      <div className="relative z-10 border-b border-dashed border-[#1c1917]/15 pb-2 flex items-baseline justify-between">
        <span className="font-handwriting text-xs text-[#7c3aed] font-bold">
          ✎ {notebook.title} &middot; Notes
        </span>
        <span className="font-mono text-[9px] text-[#78716c] uppercase tracking-wider">
          Sec 01 / {String(notebook.stats.sectionsCount).padStart(2, "0")}
        </span>
      </div>

      {/* ── HANDWRITTEN SECTION HEADING IN VIOLET INK ── */}
      <div className="relative z-10 pt-2 space-y-1">
        <h4 className="font-handwriting text-xl sm:text-2xl font-bold text-[#7c3aed] leading-tight">
          {snippet.title}
        </h4>
        <p className="text-[11px] font-sans text-[#44403c] leading-snug line-clamp-2">
          {snippet.teaser}
        </p>
      </div>

      {/* ── TECHNICAL SKETCH IN INTERIOR ── */}
      <div className="relative z-10 my-auto py-1 flex items-center justify-center scale-90">
        <SubjectCoverSketch
          subjectId={notebook.id}
          accentHex={notebook.accentHex}
        />
      </div>

      {/* ── AUTHENTIC YELLOW STICKY NOTE (TILTED WITH REAL PUSHPIN & STAR) ── */}
      <div
        className="relative z-10 -mr-1 mt-1 p-2.5 rounded-[2px] bg-[#fef08a] text-[#713f12] text-[10px] font-handwriting leading-tight shadow-xs border border-[#fde047]/60"
        style={{
          transform: "rotate(-1.5deg)",
          boxShadow: "1px 2px 5px rgba(0, 0, 0, 0.12)",
        }}
      >
        {/* Brass pushpin pinning the sticky note to paper */}
        <div className="absolute -top-1.5 right-3 pointer-events-none select-none" aria-hidden="true">
          <svg viewBox="0 0 20 20" className="w-3.5 h-3.5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">
            <circle cx="10" cy="10" r="5" fill="#f59e0b" stroke="#b45309" strokeWidth="1" />
            <circle cx="10" cy="10" r="2.2" fill="#fef3c7" />
          </svg>
        </div>

        <div className="flex items-start gap-1">
          <span className="text-amber-600 text-xs leading-none">★</span>
          <p className="font-medium text-[11px] sm:text-xs">
            {stickyNoteText}
          </p>
        </div>
      </div>

      {/* ── BOTTOM STAMP: FLIP PROMPT ── */}
      <div className="relative z-10 pt-2 border-t border-dashed border-[#1c1917]/15 flex items-center justify-between text-[10px] font-mono text-[#78716c]">
        <span className="text-[9px]">Click to study notebook</span>
        <span className="text-[#7c3aed] font-bold">&rarr;</span>
      </div>
    </div>
  );
}

function getSubjectStickyNote(id: string): string {
  switch (id) {
    case "operating-systems":
      return "Key idea: A process must move between states based on hardware events.";
    case "dbms":
      return "Key rule: 2PL guarantees serializability; Strict 2PL prevents cascading rollbacks!";
    case "computer-networks":
      return "Remember: TCP handles end-to-end reliability; IP is best-effort datagram.";
    case "data-structures":
      return "Balance condition: In an AVL tree, balance factor = |hL - hR| <= 1.";
    case "algorithms":
      return "Greedy choice property: Local optimal choice leads to global optimum.";
    case "theory-of-computation":
      return "DFA = NFA in expressive power. Regular languages are closed under complement.";
    case "compiler-design":
      return "LR(1) has more states than LALR(1); LALR merges identical core states.";
    case "coa":
      return "Pipeline speedup = n*k / (k + n - 1) -> approaches k for large n.";
    case "digital-logic":
      return "NAND and NOR are universal gates: any Boolean function can be built with them.";
    case "c-programming":
      return "Arrays decay to pointers in expressions, but sizeof(arr) retains total size!";
    case "discrete-mathematics":
      return "Pigeonhole Principle: If n items put into m containers (n > m), at least one has >= 2.";
    case "engineering-mathematics":
      return "Eigenvalues of symmetric matrices are always real; eigenvectors are orthogonal.";
    case "general-aptitude":
      return "Relative speed: In opposite direction add speeds; in same direction subtract.";
    default:
      return "Carefully derived through past papers, standard references, and student notes.";
  }
}
