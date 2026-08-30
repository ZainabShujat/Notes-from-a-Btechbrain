/**
 * INTERNATIONAL WOMEN'S DAY THEME
 * 
 *  TO CONTROL THIS THEME:
 * Edit app/components/theme-config.ts and set womensDay to true/false
 */

'use client';

import ThemeGlyph from "./ThemeGlyph";


export default function WomensDayTheme() {
  return (
    <>
      {/* Banner */}
      <div className="womens-banner">
        <div className="banner-content">
          <span className="icon"><ThemeGlyph name="bloom" /></span>
          <span className="banner-text">International Women's Day — Celebrate strength, resilience, and empowerment</span>
          <span className="icon"><ThemeGlyph name="bloom" /></span>
        </div>
      </div>

      {/* Floating Empowerment Symbols */}
      <div className="empowerment-particles" aria-hidden="true">
        {['bloom', 'spark', 'star', 'bloom', 'spark'].map((symbol, i) => (
          <div
            key={i}
            className="empower-symbol"
            style={{
              left: `${(i * 20) % 100}%`,
              animationDelay: `${i * 0.8}s`,
            }}
          >
            <ThemeGlyph name={symbol} />
          </div>
        ))}
      </div>

      <style jsx global>{`
        /* ============================================================
           COMPLETE COLOUR SCHEME
           Every surface, border, heading and control on the site reads
           from these tokens, so overriding them here repaints the whole
           site — including pages written after this theme.
           ============================================================ */
        :root[data-theme="womensDay"] {
          color-scheme: light;

          --color-base: #f3e5f5;
          --color-raised: #ffffff;
          --color-sunken: #e6d0ea;

          --color-surface-1: rgb(15 23 42 / 4%);
          --color-surface-2: rgb(15 23 42 / 7%);
          --color-surface-3: rgb(15 23 42 / 11%);
          --color-hairline: rgb(15 23 42 / 14%);
          --color-hairline-strong: rgb(15 23 42 / 26%);

          --color-ink-1: #111827;
          --color-ink-2: #374151;
          --color-ink-3: #6b7280;

          --color-accent: #8e24aa;
          --color-accent-strong: #6a1b9a;
          --color-accent-soft: #6a1b9a;
          --color-accent-muted: rgb(171 71 188 / 16%);
          --color-highlight: #ab47bc;
          --color-on-accent: #ffffff;

          --ground-texture: none;
          --ground-texture-opacity: 0;
          --ground-glow:
            radial-gradient(120% 85% at 50% -15%, rgb(171 71 188 / 0.28), transparent 62%),
            radial-gradient(90% 60% at 88% 12%, rgb(142 36 170 / 0.20), transparent 58%);
        }

        body {
          background: linear-gradient(135deg, #f3e5f5 0%, #e1bee7 50%, #ce93d8 100%) !important;
          background-attachment: fixed;
        }

        body > * h1, body > * h2, body > * h3 {
          color: #6a1b9a !important;
        }

        body > * p:not(.border-purple-500 *, .border-pink-400 *, .border-pink-300 *, .border-amber-300 *, .border-blue-400 *),
        body > * span:not(.border-purple-500 *, .border-pink-400 *, .border-pink-300 *, .border-amber-300 *, .border-blue-400 *) {
          color: #7b1fa2 !important;
        }

        .border-purple-500,
        .border-pink-400,
        .border-pink-300,
        .border-amber-300,
        .border-amber-500,
        .border-green-300,
        .border-emerald-300,
        .border-emerald-500,
        .border-blue-300,
        .border-blue-400 {
          background: rgba(255, 255, 255, 0.98) !important;
          backdrop-filter: blur(10px);
          border: 2px solid #ab47bc !important;
          box-shadow: 0 4px 20px rgba(171, 71, 188, 0.3), 0 0 30px rgba(186, 104, 200, 0.2) !important;
        }

        .border-purple-500 *,
        .border-pink-400 *,
        .border-pink-300 *,
        .border-amber-300 *,
        .border-amber-500 *,
        .border-green-300 *,
        .border-emerald-300 *,
        .border-emerald-500 *,
        .border-blue-300 *,
        .border-blue-400 * {
          color: #6a1b9a !important;
        }
      `}</style>

      <style jsx>{`
        .womens-banner {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          background: linear-gradient(90deg, #8e24aa, #ab47bc, #ba68c8, #ab47bc, #8e24aa);
          background-size: 300% 100%;
          color: white;
          padding: 14px 20px;
          text-align: center;
          z-index: 10000;
          animation: shimmer-purple 6s linear infinite;
        }

        .banner-content {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 16px;
          font-size: 15px;
          font-weight: 500;
        }

        .icon {
          font-size: 22px;
          animation: sparkle 2s ease-in-out infinite;
        }

        .banner-text {
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        }

        @keyframes shimmer-purple {
          0% { background-position: 0% 50%; }
          100% { background-position: 300% 50%; }
        }

        @keyframes sparkle {
          0%, 100% { 
            transform: scale(1) rotate(0deg);
            filter: brightness(1);
          }
          50% { 
            transform: scale(1.15) rotate(10deg);
            filter: brightness(1.3);
          }
        }

        :global(body) {
          padding-top: 50px !important;
        }

        .empowerment-particles {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
          overflow: hidden;
        }

        .empower-symbol {
          position: absolute;
          font-size: 30px;
          opacity: 0;
          animation: empower-rise 10s ease-in-out infinite;
        }

        @keyframes empower-rise {
          0% {
            transform: translateY(100vh) scale(0.5);
            opacity: 0;
          }
          20% { opacity: 0.6; }
          80% { opacity: 0.6; }
          100% {
            transform: translateY(-10vh) scale(1.2);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
}
