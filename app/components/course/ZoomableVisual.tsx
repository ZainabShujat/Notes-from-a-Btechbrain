"use client";

import { useState, useRef, useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";

export default function ZoomableVisual({
  children,
  label = "Open visual fullscreen",
}: {
  children: ReactNode;
  label?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [fitsViewport, setFitsViewport] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [contentHeight, setContentHeight] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Track height of modal inner contents to size the wrapper accurately when scaled
  useEffect(() => {
    if (!isOpen) return;
    const updateHeight = () => {
      const el = modalContentRef.current?.firstElementChild as HTMLElement | null;
      if (el) {
        setContentHeight(el.scrollHeight || el.offsetHeight);
      }
    };
    updateHeight();
    const interval = setInterval(updateHeight, 200);
    return () => clearInterval(interval);
  }, [isOpen]);

  // Detect whether on mobile screen vs desktop/tablet
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Detect if diagram content truly overflows container or viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const checkOverflow = () => {
      // Find largest child element inside container (like an SVG or table or pre block)
      const child = el.firstElementChild as HTMLElement | null;
      const childScrollWidth = child ? child.scrollWidth : el.scrollWidth;
      const clientWidth = el.clientWidth;
      
      // Only considered overflowing if the content genuinely exceeds container clientWidth by more than 24px
      const overflows = clientWidth > 0 && childScrollWidth > clientWidth + 24;
      setIsOverflowing(overflows);
    };

    checkOverflow();

    const resizeObserver = new ResizeObserver(() => {
      checkOverflow();
    });
    resizeObserver.observe(el);
    if (el.firstElementChild) {
      resizeObserver.observe(el.firstElementChild);
    }

    window.addEventListener("resize", checkOverflow, { passive: true });
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", checkOverflow);
    };
  }, []);

  // Modal internal zoom level (defaults to 50% so full diagram fits in viewport)
  const [modalZoom, setModalZoom] = useState<number>(0.5);

  // Escape key closes modal & lock background scroll strictly on both html & body
  useEffect(() => {
    if (!isOpen) return;

    // Reset default modal zoom to 50% whenever opened
    setModalZoom(0.5);

    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    const originalOverscroll = document.body.style.overscrollBehavior;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    document.body.style.overscrollBehavior = "none";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.body.style.overscrollBehavior = originalOverscroll;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <div className="zoomable-visual relative min-w-0 max-w-full my-3">
        {/* Content canvas with optional shrink/auto-fit */}
        <div
          ref={containerRef}
          className={`relative min-w-0 max-w-full rounded-lg transition-all ${
            fitsViewport
              ? "diagram-fit-enabled overflow-hidden"
              : "overflow-x-auto"
          }`}
        >
          {children}
        </div>

        {/* Top-right quick expand / toggle controls — ONLY shown when content actually leaks/overflows the container */}
        {isOverflowing && (
          <div className="absolute right-3 top-3 z-10 flex items-center gap-2">
            {/* Fit toggle button for desktop */}
            {!isMobile && (
              <button
                type="button"
                onClick={() => setFitsViewport(!fitsViewport)}
                className="px-2.5 py-1 text-[11px] font-mono font-semibold text-[#1e1b4b] bg-white hover:bg-white/95 border border-[#d6cfbe] shadow-sm rounded-md transition-colors cursor-pointer"
                title={fitsViewport ? "Switch to scrollable original size" : "Shrink diagram to fit page"}
              >
                {fitsViewport ? "Original Size" : "Fit Screen"}
              </button>
            )}

            {/* Fullscreen Expand button */}
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="px-3 py-1 text-[11px] font-mono font-bold text-white bg-violet-700 hover:bg-violet-800 shadow-sm rounded-md transition-colors cursor-pointer flex items-center gap-1.5"
              aria-label={label}
              title={label}
            >
              <span>Expand</span>
              <span className="text-xs leading-none">⤢</span>
            </button>
          </div>
        )}
      </div>

      {/* True Portal-based Fullscreen popup modal centered above the entire window */}
      {isOpen && mounted && createPortal(
        <div
          className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-md p-4 sm:p-6 md:p-8 flex flex-col items-center justify-center animate-in fade-in duration-200 select-none overscroll-none"
          role="dialog"
          aria-modal="true"
          aria-label={label}
          onWheel={(e) => {
            // Prevent background page from catching wheel bounce
            e.stopPropagation();
          }}
          onTouchMove={(e) => {
            // Prevent background touch scrolling on mobile
            e.stopPropagation();
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsOpen(false);
          }}
        >
          {/* Top Bar with Zoom Controls & Dismiss */}
          <div className="w-full max-w-5xl flex items-center justify-between pb-2.5 shrink-0">
            {/* Quick zoom level pills */}
            <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-sm border border-white/20 px-2 py-1 shape-octagon-sm text-xs font-mono text-white">
              <span className="text-[11px] opacity-75 mr-1 font-bold">Zoom:</span>
              <button
                type="button"
                onClick={() => setModalZoom(0.5)}
                className={`px-2 py-0.5 transition-colors cursor-pointer shape-octagon-sm ${
                  modalZoom === 0.5
                    ? "bg-violet-600 text-white font-bold"
                    : "text-white/80 hover:bg-white/20"
                }`}
                title="50% Zoom - Fit entire diagram in viewport"
              >
                50% (Fit All)
              </button>
              <button
                type="button"
                onClick={() => setModalZoom(0.75)}
                className={`px-2 py-0.5 transition-colors cursor-pointer shape-octagon-sm ${
                  modalZoom === 0.75
                    ? "bg-violet-600 text-white font-bold"
                    : "text-white/80 hover:bg-white/20"
                }`}
                title="75% Zoom"
              >
                75%
              </button>
              <button
                type="button"
                onClick={() => setModalZoom(1)}
                className={`px-2 py-0.5 transition-colors cursor-pointer shape-octagon-sm ${
                  modalZoom === 1
                    ? "bg-violet-600 text-white font-bold"
                    : "text-white/80 hover:bg-white/20"
                }`}
                title="100% Zoom - Actual Size"
              >
                100%
              </button>
            </div>

            {/* Close button */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="cursor-pointer border border-white/40 bg-black/80 hover:bg-black px-4 py-1.5 text-xs font-mono font-bold text-white transition-all shadow-md flex items-center gap-1.5 shape-octagon-sm"
              aria-label="Close expanded visual"
            >
              <span>close</span>
              <span className="text-sm leading-none">✕</span>
            </button>
          </div>

          {/* Centered Modal Card matching Pic 2 with 50% default zoom scale */}
          <div
            className="w-full max-w-5xl max-h-[88vh] overflow-y-auto overflow-x-hidden overscroll-contain rounded-2xl bg-[#faf7f2] shadow-2xl border border-[#d6cfbe] p-2 sm:p-4 md:p-6 text-[#1e1b4b]"
            onWheel={(e) => {
              // Ensure scroll events inside modal don't bubble or propagate to background
              e.stopPropagation();
            }}
          >
            <div
              ref={modalContentRef}
              className="w-full transition-all duration-200 flex justify-center"
              style={{
                height: contentHeight ? `${Math.ceil(contentHeight * modalZoom)}px` : "auto",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <div
                className="zoomable-modal-content transition-transform duration-200"
                style={{
                  transform: `scale(${modalZoom})`,
                  transformOrigin: "top center",
                  width: `${(100 / modalZoom).toFixed(1)}%`,
                  maxWidth: `${(100 / modalZoom).toFixed(1)}%`,
                }}
              >
                {children}
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
