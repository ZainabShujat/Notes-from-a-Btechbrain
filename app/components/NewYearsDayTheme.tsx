/**
 * NEW YEAR'S DAY THEME
 * 
 *  TO CONTROL THIS THEME:
 * Edit app/components/theme-config.ts and set newYearsDay to true/false
 */

'use client';

import ThemeGlyph from "./ThemeGlyph";


export default function NewYearsDayTheme() {
  return (
    <>
      <div className="newyear-banner">
        <div className="banner-content">
          <span className="icon"><ThemeGlyph name="burst" /></span>
          <span className="banner-text">Happy New Year — New beginnings, endless possibilities!</span>
          <span className="icon"><ThemeGlyph name="burst" /></span>
        </div>
      </div>

      <div className="fireworks-particles" aria-hidden="true">
        {['burst', 'star', 'spark', 'burst', 'star'].map((spark, i) => (
          <div
            key={i}
            className="firework"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          >
            <ThemeGlyph name={spark} />
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
        :root[data-theme="newYearsDay"] {
          color-scheme: dark;

          --color-base: #10121f;
          --color-raised: #1a1d33;
          --color-sunken: #0a0c16;

          --color-surface-1: rgb(255 255 255 / 5%);
          --color-surface-2: rgb(255 255 255 / 9%);
          --color-surface-3: rgb(255 255 255 / 13%);
          --color-hairline: rgb(255 255 255 / 14%);
          --color-hairline-strong: rgb(255 255 255 / 26%);

          --color-ink-1: #f8fafc;
          --color-ink-2: #cbd5e1;
          --color-ink-3: #94a3b8;

          --color-accent: #ffd700;
          --color-accent-strong: #e6c200;
          --color-accent-soft: #ffe66d;
          --color-accent-muted: rgb(255 215 0 / 16%);
          --color-highlight: #4ecdc4;
          --color-on-accent: #0b0b12;

          --ground-texture: none;
          --ground-texture-opacity: 0;
          --ground-glow:
            radial-gradient(120% 85% at 50% -15%, rgb(255 215 0 / 0.28), transparent 62%),
            radial-gradient(90% 60% at 88% 12%, rgb(255 107 107 / 0.20), transparent 58%);
        }

        body {
          background: radial-gradient(circle at center, #1a1a2e 0%, #0f0f1e 100%) !important;
          background-attachment: fixed;
        }

        body > * h1, body > * h2, body > * h3 {
          color: #ffd700 !important;
        }

        body > * p:not(.border-purple-500 *, .border-pink-400 *, .border-pink-300 *, .border-amber-300 *, .border-blue-400 *),
        body > * span:not(.border-purple-500 *, .border-pink-400 *, .border-pink-300 *, .border-amber-300 *, .border-blue-400 *) {
          color: #e8e8e8 !important;
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
          background: rgba(30, 30, 46, 0.95) !important;
          backdrop-filter: blur(10px);
          border: 2px solid #ffd700 !important;
          box-shadow: 0 0 30px rgba(255, 215, 0, 0.4), 0 4px 20px rgba(0, 0, 0, 0.3) !important;
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
          color: #ffd700 !important;
        }
      `}</style>

      <style jsx>{`
        .newyear-banner {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          background: linear-gradient(90deg, #ff6b6b, #4ecdc4, #ffe66d, #4ecdc4, #ff6b6b);
          background-size: 300% 100%;
          color: white;
          padding: 14px 20px;
          text-align: center;
          z-index: 10000;
          animation: rainbow-party 5s linear infinite;
          border-bottom: 3px solid #ffd700;
        }

        .banner-content {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 16px;
          font-size: 16px;
          font-weight: 700;
          text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        }

        .icon {
          font-size: 26px;
          animation: party-pop 1s ease-in-out infinite;
        }

        @keyframes rainbow-party {
          0% { background-position: 0% 50%; }
          100% { background-position: 300% 50%; }
        }

        @keyframes party-pop {
          0%, 100% { transform: scale(1) rotate(0deg); }
          25% { transform: scale(1.2) rotate(-10deg); }
          75% { transform: scale(1.2) rotate(10deg); }
        }

        :global(body) {
          padding-top: 50px !important;
        }

        .fireworks-particles {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 9999;
          overflow: hidden;
        }

        .firework {
          position: absolute;
          font-size: 28px;
          animation: explode 3s ease-out infinite;
        }

        @keyframes explode {
          0% {
            transform: scale(0) rotate(0deg);
            opacity: 0;
          }
          50% {
            transform: scale(1.5) rotate(180deg);
            opacity: 1;
          }
          100% {
            transform: scale(0.5) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
}
