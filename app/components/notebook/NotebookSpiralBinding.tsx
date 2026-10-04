import React from "react";

export default function NotebookSpiralBinding() {
  return (
    <div
      className="absolute inset-y-0 left-0 z-20 w-9 select-none pointer-events-none sm:w-10"
      aria-hidden="true"
    >
      <svg width="40" height="100%" className="block h-full w-full overflow-visible">
        <defs>
          <pattern id="notebook-spiral-pattern" width="40" height="28" patternUnits="userSpaceOnUse">
            <circle cx="7" cy="14" r="3.3" fill="var(--notebook-binding-shadow)" />
            <path
              d="M 4,20 C 9,4 31,4 36,20"
              fill="none"
              stroke="var(--notebook-binding-shadow)"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d="M 4,18 C 9,2 31,2 36,18"
              fill="none"
              stroke="var(--notebook-binding)"
              strokeWidth="2.6"
              strokeLinecap="round"
            />
            <path
              d="M 12,5 C 16,3.5 22,3.5 27,5"
              fill="none"
              stroke="var(--notebook-binding-highlight)"
              strokeWidth="0.9"
              strokeLinecap="round"
              opacity="0.55"
            />
          </pattern>
        </defs>
        <rect width="40" height="100%" fill="url(#notebook-spiral-pattern)" />
      </svg>
    </div>
  );
}
