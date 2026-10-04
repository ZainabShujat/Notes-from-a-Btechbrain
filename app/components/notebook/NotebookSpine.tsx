import React from "react";

export default function NotebookSpine({
  title,
  code,
  accentHex = "#7c3aed",
}: {
  title: string;
  code: string;
  accentHex?: string;
}) {
  return (
    <div
      className="notebook-spine absolute top-0 bottom-0 left-0 w-5 sm:w-6 z-20 rounded-l-[4px] border-r border-black/20 flex flex-col justify-between items-center py-3.5 select-none pointer-events-none overflow-hidden"
      style={{
        backgroundColor: accentHex,
        boxShadow: "inset -2px 0 4px rgba(0, 0, 0, 0.25), inset 1px 0 2px rgba(255, 255, 255, 0.2)",
      }}
      aria-hidden="true"
    >
      {/* Subtle cloth weave texture overlay */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(rgba(0,0,0,0.4)_1px,transparent_1px)] [background-size:3px_3px]"
      />

      {/* Subtle Spine Seam / Crease highlight */}
      <div className="absolute top-0 bottom-0 right-[3px] w-[1px] bg-black/20" />

      {/* Top stamped code */}
      <span className="relative z-10 text-[8px] font-mono font-bold text-white/80 tracking-tighter uppercase">
        {code}
      </span>

      {/* Vertical Spine Title (Quiet embossed foil look) */}
      <div
        className="relative z-10 rotate-180 [writing-mode:vertical-rl] text-[9px] font-mono font-semibold tracking-widest text-white/75 uppercase truncate max-h-[150px]"
        style={{ textShadow: "0 1px 1px rgba(0, 0, 0, 0.4)" }}
      >
        {title}
      </div>

      {/* Bottom small cloth bookmark notch or stitch */}
      <div className="relative z-10 w-1.5 h-1.5 rounded-full bg-white/40 border border-black/20" />
    </div>
  );
}
