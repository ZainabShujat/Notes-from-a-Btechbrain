import React from "react";

export default function StickyNote({
  children,
  title,
  rotation = "-1deg",
  tone = "yellow",
  className = "",
}: {
  children: React.ReactNode;
  title?: string;
  rotation?: string;
  tone?: "yellow" | "pink";
  className?: string;
}) {
  const toneClasses = tone === "pink"
    ? "bg-[#fbcfe8] text-[#831843] border-[#f472b6]/80"
    : "bg-[#fef08a] text-[#713f12] border-[#fde047]/80";

  return (
    <aside
      className={`my-6 w-full max-w-2xl p-4 rounded-[2px] ${toneClasses} shadow-md select-text ${className}`}
      style={{
        transform: `rotate(${rotation})`,
        boxShadow: "2px 4px 12px -2px rgba(0, 0, 0, 0.15), 0 1px 3px rgba(0, 0, 0, 0.1)",
      }}
      aria-label="Student Sticky Note"
    >
      <div className="flex items-start gap-2">
        <span className={`text-sm leading-none shrink-0 mt-0.5 ${tone === "pink" ? "text-pink-700" : "text-amber-600"}`}>★</span>
        <div className="space-y-1">
          {title && (
            <div className={`font-handwriting font-bold text-sm uppercase tracking-wide ${tone === "pink" ? "text-[#9d174d]" : "text-[#854d0e]"}`}>
              {title}
            </div>
          )}
          <div className="font-handwriting text-sm sm:text-base leading-snug font-medium">
            {children}
          </div>
        </div>
      </div>
    </aside>
  );
}
