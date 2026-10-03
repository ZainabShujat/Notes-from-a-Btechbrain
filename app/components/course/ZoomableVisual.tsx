"use client";

import { useState, type ReactNode } from "react";

export default function ZoomableVisual({
  children,
  label = "Open visual fullscreen",
}: {
  children: ReactNode;
  label?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="zoomable-visual relative min-w-0 max-w-full">
        <div className="max-w-full overflow-hidden md:overflow-visible">
          {children}
        </div>
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="absolute right-2 top-2 z-10 rounded-md border border-hairline bg-raised/90 px-2.5 py-1.5 text-[11px] font-mono text-ink-1 shadow-sm backdrop-blur-sm transition-colors hover:bg-surface-2 md:hidden"
          aria-label={label}
        >
          Expand
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-[70] bg-black/75 p-3 sm:p-6" role="dialog" aria-modal="true" aria-label={label}>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="absolute right-3 top-3 z-10 rounded-md border border-white/20 bg-black/70 px-3 py-2 text-xs font-mono text-white"
            aria-label="Close expanded visual"
          >
            Close
          </button>
          <div className="flex h-full w-full items-center justify-center overflow-auto rounded-lg bg-background/95 p-3 sm:p-6">
            <div className="max-h-full w-full max-w-5xl overflow-auto">
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
