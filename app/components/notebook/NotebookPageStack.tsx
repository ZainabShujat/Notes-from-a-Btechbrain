import React from "react";

export default function NotebookPageStack({
  isHovered,
  accentHex = "#7c3aed",
}: {
  isHovered?: boolean;
  accentHex?: string;
}) {
  return (
    <div className="notebook-page-stack pointer-events-none">
      {/* ── PROTRUDING RIGHT INDEX TAB / BOOKMARK ── */}
      <div
        className={`absolute -right-3 top-16 w-3.5 h-9 rounded-r-[3px] shadow-xs z-0 transition-transform duration-300 pointer-events-none flex items-center justify-center ${
          isHovered ? "translate-x-1" : "translate-x-0"
        }`}
        style={{
          backgroundColor: accentHex,
          boxShadow: "1px 1px 3px rgba(0, 0, 0, 0.2)",
        }}
        aria-hidden="true"
      >
        <span className="w-1 h-3 rounded-full bg-white/30" />
      </div>

      {/* ── RIGHT EDGE MULTI-SHEET PAPER STACK ── */}
      <div
        className={`absolute top-1.5 bottom-1.5 -right-2 w-2 rounded-r-[2px] bg-[#f5f1e8] border-y border-r border-[#d4cfc5] transition-transform duration-300 pointer-events-none ${
          isHovered ? "translate-x-0.5" : "translate-x-0"
        }`}
        style={{
          boxShadow: "2px 3px 8px -1px rgba(0, 0, 0, 0.18)",
        }}
        aria-hidden="true"
      >
        {/* Subtle lined pattern simulating hundreds of compressed paper leaves */}
        <div className="w-full h-full opacity-35 bg-[repeating-linear-gradient(to_bottom,transparent,transparent_2px,rgba(0,0,0,0.12)_2px,rgba(0,0,0,0.12)_3px)]" />
      </div>

      {/* ── BOTTOM EDGE MULTI-SHEET PAPER STACK ── */}
      <div
        className={`absolute -bottom-1.5 left-5 right-0.5 h-1.5 rounded-b-[2px] bg-[#eae5db] border-x border-b border-[#d4cfc5] transition-transform duration-300 pointer-events-none ${
          isHovered ? "translate-y-0.5" : "translate-y-0"
        }`}
        style={{
          boxShadow: "0 4px 6px -2px rgba(0, 0, 0, 0.2)",
        }}
        aria-hidden="true"
      />
    </div>
  );
}
