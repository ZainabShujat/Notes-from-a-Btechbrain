/**
 * TEACHERS DAY THEME
 * 
 *  TO CONTROL THIS THEME:
 * Edit app/components/theme-config.ts and set teachersDay to true/false
 */

'use client';

import ThemeGlyph from "./ThemeGlyph";


export default function TeachersDayTheme() {
  return (
    <>
      {/* Banner */}
      <div className="teachers-banner">
        <div className="banner-content">
          <span className="icon"><ThemeGlyph name="book" /></span>
          <span className="banner-text">Happy Teachers Day — Thank you for lighting the path of knowledge</span>
          <span className="icon"><ThemeGlyph name="book" /></span>
        </div>
      </div>

      {/* Floating Educational Symbols */}
      <div className="education-particles" aria-hidden="true">
        {['book', 'nib', 'spark', 'book', 'nib', 'spark', 'book'].map((symbol, i) => (
          <div
            key={i}
            className="edu-symbol"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${8 + Math.random() * 4}s`,
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
        :root[data-theme="teachersDay"] {
          color-scheme: light;

          --color-base: #fff3e0;
          --color-raised: #ffffff;
          --color-sunken: #ffe0b2;

          --color-surface-1: rgb(15 23 42 / 4%);
          --color-surface-2: rgb(15 23 42 / 7%);
          --color-surface-3: rgb(15 23 42 / 11%);
          --color-hairline: rgb(15 23 42 / 14%);
          --color-hairline-strong: rgb(15 23 42 / 26%);

          --color-ink-1: #111827;
          --color-ink-2: #374151;
          --color-ink-3: #6b7280;

          --color-accent: #f57c00;
          --color-accent-strong: #c96400;
          --color-accent-soft: #c96400;
          --color-accent-muted: rgb(255 152 0 / 16%);
          --color-highlight: #ff9800;
          --color-on-accent: #ffffff;

          --ground-texture: none;
          --ground-texture-opacity: 0;
          --ground-glow:
            radial-gradient(120% 85% at 50% -15%, rgb(255 152 0 / 0.28), transparent 62%),
            radial-gradient(90% 60% at 88% 12%, rgb(255 224 178 / 0.20), transparent 58%);
        }

        body {
          background: linear-gradient(135deg, #fff3e0 0%, #ffe0b2 50%, #ffcc80 100%) !important;
          background-attachment: fixed;
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
          border: 2px solid #ff9800 !important;
          box-shadow: 0 4px 20px rgba(255, 152, 0, 0.2) !important;
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
          color: #e65100 !important;
        }
      `}</style>

      <style jsx>{`
        .teachers-banner {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          background: linear-gradient(90deg, #f57c00, #ff9800, #f57c00);
          background-size: 200% 100%;
          color: white;
          padding: 14px 20px;
          text-align: center;
          z-index: 10000;
          animation: slide 5s linear infinite;
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
          animation: bounce-icon 2s ease-in-out infinite;
        }

        @keyframes slide {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes bounce-icon {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }

        :global(body) {
          padding-top: 50px !important;
        }

        .education-particles {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
          overflow: hidden;
        }

        .edu-symbol {
          position: absolute;
          font-size: 28px;
          opacity: 0.5;
          animation: rise linear infinite;
        }

        @keyframes rise {
          0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
          10%, 90% { opacity: 0.5; }
          100% {
            transform: translateY(-10vh) rotate(180deg);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
}
