/**
 * FATHER'S DAY THEME
 * 
 *  TO CONTROL THIS THEME:
 * Edit app/components/theme-config.ts and set fathersDay to true/false
 */

'use client';

import ThemeGlyph from "./ThemeGlyph";


export default function FathersDayTheme() {
  return (
    <>
      <div className="fathers-banner">
        <div className="banner-content">
          <span className="icon"><ThemeGlyph name="ribbon" /></span>
          <span className="banner-text">Happy Father's Day — Honoring strength, guidance, and unconditional love</span>
          <span className="icon"><ThemeGlyph name="ribbon" /></span>
        </div>
      </div>

      <div className="stars-bg" aria-hidden="true">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="star-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <style jsx global>{`
        /* ============================================================
           COMPLETE COLOUR SCHEME
           Every surface, border, heading and control on the site reads
           from these tokens, so overriding them here repaints the whole
           site — including pages written after this theme.
           ============================================================ */
        :root[data-theme="fathersDay"] {
          color-scheme: dark;

          --color-base: #1c262b;
          --color-raised: #263238;
          --color-sunken: #151d21;

          --color-surface-1: rgb(255 255 255 / 5%);
          --color-surface-2: rgb(255 255 255 / 9%);
          --color-surface-3: rgb(255 255 255 / 13%);
          --color-hairline: rgb(255 255 255 / 14%);
          --color-hairline-strong: rgb(255 255 255 / 26%);

          --color-ink-1: #f8fafc;
          --color-ink-2: #cbd5e1;
          --color-ink-3: #94a3b8;

          --color-accent: #78909c;
          --color-accent-strong: #607d8b;
          --color-accent-soft: #cfd8dc;
          --color-accent-muted: rgb(96 125 139 / 16%);
          --color-highlight: #cfd8dc;
          --color-on-accent: #0b0b12;

          --ground-texture: none;
          --ground-texture-opacity: 0;
          --ground-glow:
            radial-gradient(120% 85% at 50% -15%, rgb(96 125 139 / 0.28), transparent 62%),
            radial-gradient(90% 60% at 88% 12%, rgb(69 90 100 / 0.20), transparent 58%);
        }

        body {
          background: linear-gradient(135deg, #263238 0%, #37474f 50%, #546e7a 100%) !important;
          background-attachment: fixed;
        }

        body > * h1, body > * h2, body > * h3 {
          color: #cfd8dc !important;
        }

        body > * p:not(.border-purple-500 *, .border-pink-400 *, .border-pink-300 *, .border-amber-300 *, .border-blue-400 *),
        body > * span:not(.border-purple-500 *, .border-pink-400 *, .border-pink-300 *, .border-amber-300 *, .border-blue-400 *) {
          color: #b0bec5 !important;
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
          background: rgba(255, 255, 255, 0.95) !important;
          backdrop-filter: blur(10px);
          border: 2px solid #607d8b !important;
          box-shadow: 0 4px 20px rgba(96, 125, 139, 0.4) !important;
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
          color: #263238 !important;
        }
      `}</style>

      <style jsx>{`
        .fathers-banner {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          background: linear-gradient(90deg, #455a64, #607d8b, #455a64);
          background-size: 200% 100%;
          color: white;
          padding: 14px 20px;
          text-align: center;
          z-index: 10000;
          animation: strong-wave 5s ease-in-out infinite;
          border-bottom: 3px solid #78909c;
        }

        .banner-content {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 16px;
          font-size: 15px;
          font-weight: 600;
          letter-spacing: 0.5px;
        }

        .icon {
          font-size: 22px;
          animation: stand-tall 2s ease-in-out infinite;
        }

        @keyframes strong-wave {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes stand-tall {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.08); }
        }

        :global(body) {
          padding-top: 50px !important;
        }

        .stars-bg {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
        }

        .star-particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: #90a4ae;
          border-radius: 50%;
          animation: twinkle-star 3s ease-in-out infinite;
        }

        @keyframes twinkle-star {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.5); }
        }
      `}</style>
    </>
  );
}
