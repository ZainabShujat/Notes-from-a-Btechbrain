"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { GLOSSARY_TERMS, GLOSSARY_MAP, GlossaryTerm } from "../../../lib/courses/glossary";

interface TermPopupState {
  term: GlossaryTerm;
  matchedText: string;
  triggerRect: DOMRect | null;
}

/**
 * Global Context / Hook provider or container for the "Don't Feel Dumb" glossary popups.
 * Listen to hover and click on elements with `data-glossary-term`.
 */
export default function DontFeelDumbProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activePopup, setActivePopup] = useState<TermPopupState | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || window.matchMedia("(pointer: coarse)").matches);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Close popup helper
  const closePopup = useCallback(() => {
    setActivePopup(null);
  }, []);

  // Handle click outside on mobile / desktop
  useEffect(() => {
    if (!activePopup) return;

    const handlePointerDown = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      // If clicking inside the popup modal or on a glossary trigger, do not close immediately
      if (target.closest(".dont-feel-dumb-popup") || target.closest("[data-glossary-term]")) {
        return;
      }
      closePopup();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closePopup();
      }
    };

    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activePopup, closePopup]);

  // Delegated event listeners for hover and click on document or container
  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const handleMouseOver = (e: MouseEvent) => {
      if (isMobile) return; // on mobile, interaction is tap-based
      const trigger = (e.target as HTMLElement)?.closest("[data-glossary-term]") as HTMLElement | null;
      if (!trigger) return;

      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
        hideTimeoutRef.current = null;
      }

      const termKey = trigger.getAttribute("data-glossary-term")?.toLowerCase();
      if (!termKey) return;
      const termData = GLOSSARY_MAP[termKey];
      if (!termData) return;

      const rect = trigger.getBoundingClientRect();
      setActivePopup({
        term: termData,
        matchedText: trigger.textContent || termData.term,
        triggerRect: rect,
      });
    };

    const handleMouseOut = (e: MouseEvent) => {
      if (isMobile) return;
      const trigger = (e.target as HTMLElement)?.closest("[data-glossary-term]");
      if (!trigger) return;

      // Small grace period so user can move mouse into popup if needed
      hideTimeoutRef.current = setTimeout(() => {
        closePopup();
      }, 180);
    };

    const handleClick = (e: MouseEvent) => {
      const trigger = (e.target as HTMLElement)?.closest("[data-glossary-term]") as HTMLElement | null;
      if (!trigger) return;

      // On mobile or touch devices (or intentional click on desktop), toggle popup
      e.preventDefault();
      e.stopPropagation();

      const termKey = trigger.getAttribute("data-glossary-term")?.toLowerCase();
      if (!termKey) return;
      const termData = GLOSSARY_MAP[termKey];
      if (!termData) return;

      const rect = trigger.getBoundingClientRect();
      setActivePopup((prev) => {
        if (prev && prev.term.term === termData.term) {
          return null; // toggle off
        }
        return {
          term: termData,
          matchedText: trigger.textContent || termData.term,
          triggerRect: rect,
        };
      });
    };

    root.addEventListener("mouseover", handleMouseOver);
    root.addEventListener("mouseout", handleMouseOut);
    root.addEventListener("click", handleClick);

    return () => {
      root.removeEventListener("mouseover", handleMouseOver);
      root.removeEventListener("mouseout", handleMouseOut);
      root.removeEventListener("click", handleClick);
    };
  }, [isMobile, closePopup]);

  return (
    <div ref={containerRef} className="dont-feel-dumb-scope contents">
      {children}

      {/* Render popup portal when an active term is selected */}
      {mounted && activePopup && (
        <DontFeelDumbModal
          popup={activePopup}
          isMobile={isMobile}
          onClose={closePopup}
          onMouseEnter={() => {
            if (hideTimeoutRef.current) {
              clearTimeout(hideTimeoutRef.current);
              hideTimeoutRef.current = null;
            }
          }}
          onMouseLeave={() => {
            if (!isMobile) {
              hideTimeoutRef.current = setTimeout(() => {
                closePopup();
              }, 180);
            }
          }}
        />
      )}
    </div>
  );
}

/**
 * The Popup Card Component.
 * On Desktop: Smart floating popover positioned above or below the hovered word.
 * On Mobile: Bottom sheet / centered modal with an explicit 'X' button to dismiss.
 */
function DontFeelDumbModal({
  popup,
  isMobile,
  onClose,
  onMouseEnter,
  onMouseLeave,
}: {
  popup: TermPopupState;
  isMobile: boolean;
  onClose: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}) {
  const { term, matchedText, triggerRect } = popup;

  // Compute desktop floating coords
  const [coords, setCoords] = useState<{ top: number; left: number; placement: "top" | "bottom" }>({
    top: 0,
    left: 0,
    placement: "bottom",
  });

  useEffect(() => {
    if (isMobile || !triggerRect) return;

    const popupWidth = 340;
    const popupHeight = 220; // approximate
    const margin = 10;

    let placement: "top" | "bottom" = "bottom";
    let top = triggerRect.bottom + margin;

    // If bottom overflow, flip to top
    if (top + popupHeight > window.innerHeight && triggerRect.top - popupHeight - margin > 0) {
      top = triggerRect.top - popupHeight - margin;
      placement = "top";
    }

    // Center horizontally aligned with trigger, clamped within viewport
    let left = triggerRect.left + triggerRect.width / 2 - popupWidth / 2;
    if (left < 16) left = 16;
    if (left + popupWidth > window.innerWidth - 16) {
      left = window.innerWidth - popupWidth - 16;
    }

    setCoords({ top, left, placement });
  }, [triggerRect, isMobile]);

  if (typeof document === "undefined") return null;

  // ── MOBILE VIEW: BOTTOM POPUP / DIALOG WITH CLOSE CROSS ──
  if (isMobile) {
    return createPortal(
      <div
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-fadeIn"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dont-feel-dumb-title"
      >
        <div
          className="dont-feel-dumb-popup popup-octagon w-full max-w-sm border border-[#d6cfbe] dark:border-[#3f3f46] bg-[#fbf9f4] dark:bg-[#18181b] text-[#1c1917] dark:text-[#f4f4f5] shadow-2xl p-5 relative overflow-hidden"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(124, 58, 237, 0.05) 1px, transparent 1px)",
            backgroundSize: "12px 12px",
          }}
        >
          {/* Header Bar */}
          <div className="flex items-start justify-between gap-3 border-b border-[#e5ded0] dark:border-[#27272a] pb-3 mb-3">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-violet-600/15 text-violet-600 dark:text-violet-400 font-handwriting text-base font-bold">
                💡
              </span>
              <div>
                <span className="font-mono text-[10px] tracking-widest uppercase font-bold text-violet-600 dark:text-violet-400 block">
                  DON&apos;T FEEL DUMB &middot; {term.category}
                </span>
                <h3 id="dont-feel-dumb-title" className="text-lg font-bold font-sans text-ink-1 leading-tight flex items-center gap-1.5">
                  <span>{term.term}</span>
                  {matchedText.toLowerCase() !== term.term.toLowerCase() && (
                    <span className="text-xs font-mono font-normal opacity-60">
                      ({matchedText})
                    </span>
                  )}
                </h3>
              </div>
            </div>

            {/* Mobile Close Button ('X') */}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 -mr-1 -mt-1 rounded-full text-ink-3 hover:text-ink-1 hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close definition"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="w-5 h-5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Simple plain-English definition */}
          <p className="text-[14px] leading-relaxed text-[#44403c] dark:text-[#d4d4d8] font-sans mb-3">
            {term.definition}
          </p>

          {/* Real-world everyday analogy */}
          {term.analogy && (
            <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/25 text-[#78350f] dark:text-[#fef3c7] text-xs leading-relaxed mb-3">
              <span className="font-bold block font-mono text-[10px] uppercase text-amber-700 dark:text-amber-300 mb-0.5">
                Real-World Analogy:
              </span>
              <span>{term.analogy}</span>
            </div>
          )}

          {/* One-line takeaway formula/rule */}
          {term.takeaway && (
            <div className="pt-2 border-t border-dashed border-[#e5ded0] dark:border-[#27272a] flex items-center justify-between text-[11px] font-mono text-ink-3">
              <span className="truncate">✎ {term.takeaway}</span>
              <button
                type="button"
                onClick={onClose}
                className="text-violet-600 dark:text-violet-400 font-semibold hover:underline shrink-0 ml-2"
              >
                Got it &rarr;
              </button>
            </div>
          )}
        </div>
      </div>,
      document.body
    );
  }

  // ── DESKTOP VIEW: SMART FLOATING TOOLTIP / CARD (OCTAGON CLIPPED CORNERS) ──
  return createPortal(
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="fixed z-50 pointer-events-auto transition-all duration-150 animate-fadeIn"
      style={{
        top: `${coords.top}px`,
        left: `${coords.left}px`,
        filter: "drop-shadow(0 14px 24px rgba(0, 0, 0, 0.28)) drop-shadow(0 4px 8px rgba(0, 0, 0, 0.12))",
      }}
    >
      <div
        className="dont-feel-dumb-popup popup-octagon w-[342px] border border-[#d6cfbe] dark:border-[#3f3f46] bg-[#fbf9f4]/98 dark:bg-[#18181b]/98 backdrop-blur-md text-[#1c1917] dark:text-[#f4f4f5] p-4.5"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(124, 58, 237, 0.05) 1px, transparent 1px)",
          backgroundSize: "12px 12px",
        }}
      >
        {/* Header Bar */}
        <div className="flex items-start justify-between gap-2 border-b border-[#e5ded0] dark:border-[#27272a] pb-2 mb-2.5">
          <div className="flex items-center gap-1.5">
            <span className="text-sm">💡</span>
            <div>
              <span className="font-mono text-[9px] tracking-widest uppercase font-bold text-violet-600 dark:text-violet-400 block leading-none">
                DON&apos;T FEEL DUMB &middot; {term.category}
              </span>
              <span className="text-base font-bold font-sans text-ink-1 leading-tight">
                {term.term}
              </span>
            </div>
          </div>

          {/* Dismiss cross */}
          <button
            type="button"
            onClick={onClose}
            className="p-1 -mr-1 -mt-1 rounded text-ink-3 hover:text-ink-1 hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close definition"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="w-4 h-4">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Definition */}
        <p className="text-[13px] leading-relaxed text-[#44403c] dark:text-[#d4d4d8] font-sans mb-2.5">
          {term.definition}
        </p>

        {/* Analogy */}
        {term.analogy && (
          <div className="p-2 rounded-md bg-amber-500/10 border border-amber-500/25 text-[#78350f] dark:text-[#fef3c7] text-[11px] leading-relaxed mb-2.5">
            <span className="font-bold font-mono text-[9px] uppercase text-amber-700 dark:text-amber-300 block mb-0.5">
              Analogy:
            </span>
            <span>{term.analogy}</span>
          </div>
        )}

        {/* Takeaway */}
        {term.takeaway && (
          <div className="pt-2 border-t border-dashed border-[#e5ded0] dark:border-[#27272a] text-[10px] font-mono text-ink-3 flex items-center justify-between">
            <span className="truncate text-violet-700 dark:text-violet-300">
              ✎ {term.takeaway}
            </span>
            <span className="opacity-50 text-[9px]">click/esc to dismiss</span>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
