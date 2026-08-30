"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import notifications from "../notifications";

export default function UpdatesWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);

  // Get the 3 most recent updates
  const recentUpdates = notifications.slice(0, 3);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (widgetRef.current && !widgetRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={widgetRef} className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Popup Window */}
      {isOpen && (
        <div className="mb-4 w-[320px] sm:w-[380px] max-w-[calc(100vw-3rem)] overflow-hidden rounded-xl border border-hairline bg-surface-1/95 backdrop-blur-xl shadow-lift transform origin-bottom-right transition-all duration-300">
          <div className="flex items-center justify-between border-b border-hairline px-5 py-4 bg-surface-2">
            <div className="flex flex-col">
              <h3 className="font-bold text-ink-1 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                For the Devs
              </h3>
              <p className="text-xs text-ink-3 mt-0.5">Latest site updates</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-ink-3 hover:text-ink-1 transition-colors rounded-md hover:bg-hairline"
              aria-label="Close updates"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          
          <div className="max-h-[350px] overflow-y-auto px-5 py-2">
            <div className="flex flex-col gap-6 my-4">
              {recentUpdates.map((update) => (
                <div key={update.id} className="relative pl-4 border-l-2" style={{ borderColor: update.color || 'var(--color-accent-soft)' }}>
                  <div className="flex items-baseline justify-between mb-1">
                    <span className="text-xs font-semibold tracking-wide text-ink-1">
                      {update.version}
                    </span>
                    <span className="text-xs text-ink-3">
                      {new Date(update.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-ink-1 mb-1">{update.title}</h4>
                  <p 
                    className="text-sm text-ink-2 leading-relaxed line-clamp-3"
                    dangerouslySetInnerHTML={{ __html: update.message }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-hairline bg-surface-2 p-4">
            <Link 
              href="/notifications"
              onClick={() => setIsOpen(false)}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-accent py-2.5 text-sm font-semibold text-on-accent transition-colors hover:bg-accent-strong"
            >
              View all updates
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"></path>
                <path d="M12 5l7 7-7 7"></path>
              </svg>
            </Link>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex h-14 w-14 items-center justify-center rounded-full bg-accent text-on-accent shadow-lift transition-transform hover:scale-105 active:scale-95"
        aria-label="Toggle site updates"
      >
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
          </svg>
        )}
      </button>
    </div>
  );
}
