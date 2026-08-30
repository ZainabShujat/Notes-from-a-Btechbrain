/**
 * WINTER THEME
 *
 * A theme is a complete colour-scheme takeover. It does that by
 * re-declaring the design tokens under :root[data-theme="winter"] —
 * ThemeLoader stamps that attribute on <html>.
 *
 * Because every surface, border, heading and control on the site reads
 * from these tokens, overriding them here repaints the entire site,
 * including pages that didn't exist when this theme was written.
 * No per-class overrides, no !important.
 *
 * Enable from Admin → Settings → Theme.
 */

"use client";

export default function WinterTheme() {
  return (
    <>
      {/* Festive banner */}
      <div className="winter-banner">
        <div className="banner-content">
          <span className="banner-emoji">❄️</span>
          <span className="banner-text">
            Happy Holidays! Wishing you a magical season &amp; a Happy New Year✨
          </span>
          <span className="banner-emoji">🎄</span>
        </div>
      </div>

      {/* Snowfall */}
      <div className="snowfall" aria-hidden="true" suppressHydrationWarning>
        {Array.from({ length: 24 }).map((_, i) => {
          const left = Math.floor((i * 37) % 100);
          const duration = 2.2 + (i % 3) + Math.random() * 1.2;
          const delay = (i * 0.7) % 8;
          const size = 12 + (i % 8) + Math.random() * 12;

          return (
            <div
              key={i}
              className="snowflake"
              style={{
                left: `${left}%`,
                animationDuration: `${duration}s`,
                animationDelay: `${delay}s`,
                fontSize: `${size}px`,
              }}
              suppressHydrationWarning
            >
              ❄
            </div>
          );
        })}
      </div>

      <style jsx global>{`
        /* ============================================================
           THE ENTIRE COLOUR SCHEME
           Winter inverts the site: a pale, frosted, daylight palette
           instead of the violet night.
           ============================================================ */
        :root[data-theme="winter"] {
          color-scheme: light;

          /* Ground — pale sky instead of deep space */
          --color-base: #eff6ff;
          --color-raised: #ffffff;
          --color-sunken: #dbeafe;

          /* Surfaces — dark translucency now that the ground is light */
          --color-surface-1: rgb(15 23 42 / 4%);
          --color-surface-2: rgb(15 23 42 / 7%);
          --color-surface-3: rgb(15 23 42 / 11%);
          --color-hairline: rgb(30 64 175 / 16%);
          --color-hairline-strong: rgb(30 64 175 / 30%);

          /* Ink — dark slate on light, the inverse of the night scheme */
          --color-ink-1: #0f172a;
          --color-ink-2: #334155;
          --color-ink-3: #64748b;

          /* Accent — winter sky */
          --color-accent: #0ea5e9;
          --color-accent-strong: #0284c7;
          --color-accent-soft: #0369a1;
          --color-accent-muted: rgb(14 165 233 / 14%);
          --color-highlight: #1e3a8a;
          --color-on-accent: #ffffff;

          /* Ground layers — frost instead of galaxy */
          --ground-texture: none;
          --ground-texture-opacity: 0;
          --ground-glow:
            radial-gradient(120% 85% at 50% -15%, rgb(125 211 252 / 0.55), transparent 62%),
            radial-gradient(90% 60% at 88% 12%, rgb(56 189 248 / 0.28), transparent 58%),
            radial-gradient(80% 55% at 8% 88%, rgb(191 219 254 / 0.6), transparent 60%);
        }

        /* Give the fixed banner room without shifting the whole layout. */
        :root[data-theme="winter"] body {
          padding-top: 0;
        }

        /* ============================================================
           DECORATIONS
           ============================================================ */
        .snowfall {
          position: fixed;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
          z-index: 40;
        }

        .snowflake {
          position: absolute;
          top: -10%;
          color: #ffffff;
          text-shadow: 0 0 6px rgba(14, 165, 233, 0.8);
          animation-name: fall;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          will-change: transform;
        }

        @keyframes fall {
          0% {
            transform: translateY(-10vh) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.9;
          }
          100% {
            transform: translateY(110vh) rotate(360deg);
            opacity: 0.15;
          }
        }

        .winter-banner {
          width: 100%;
          background: linear-gradient(90deg, #0ea5e9, #38bdf8, #0ea5e9);
          color: #ffffff;
          padding: 10px 20px;
          text-align: center;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
        }

        .banner-content {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 12px;
          font-size: 15px;
          font-weight: 600;
          margin: 0 auto;
        }

        /* Snow is decoration, not information. */
        @media (prefers-reduced-motion: reduce) {
          .snowfall {
            display: none;
          }
        }
      `}</style>
    </>
  );
}
