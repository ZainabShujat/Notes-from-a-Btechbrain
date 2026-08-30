/**
 * MOTHER'S DAY THEME
 * 
 *  TO CONTROL THIS THEME:
 * Edit app/components/theme-config.ts and set mothersDay to true/false
 */

'use client';

import ThemeGlyph from "./ThemeGlyph";


export default function MothersDayTheme() {
  return (
    <>
      <div className="mothers-banner">
        <div className="banner-content">
          <span className="icon"><ThemeGlyph name="bloom" /></span>
          <span className="banner-text">Happy Mother's Day — Celebrating the hearts that nurture and inspire</span>
          <span className="icon"><ThemeGlyph name="bloom" /></span>
        </div>
      </div>

      <div className="flowers-particles" aria-hidden="true">
        {['bloom', 'leaf', 'heart', 'bloom', 'leaf', 'heart', 'bloom'].map((flower, i) => (
          <div
            key={i}
            className="flower"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${6 + Math.random() * 3}s`,
            }}
          >
            <ThemeGlyph name={flower} />
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
        :root[data-theme="mothersDay"] {
          color-scheme: light;

          --color-base: #fce4ec;
          --color-raised: #ffffff;
          --color-sunken: #f8bbd0;

          --color-surface-1: rgb(15 23 42 / 4%);
          --color-surface-2: rgb(15 23 42 / 7%);
          --color-surface-3: rgb(15 23 42 / 11%);
          --color-hairline: rgb(15 23 42 / 14%);
          --color-hairline-strong: rgb(15 23 42 / 26%);

          --color-ink-1: #111827;
          --color-ink-2: #374151;
          --color-ink-3: #6b7280;

          --color-accent: #c2185b;
          --color-accent-strong: #9c134a;
          --color-accent-soft: #9c134a;
          --color-accent-muted: rgb(244 143 177 / 16%);
          --color-highlight: #ec407a;
          --color-on-accent: #ffffff;

          --ground-texture: none;
          --ground-texture-opacity: 0;
          --ground-glow:
            radial-gradient(120% 85% at 50% -15%, rgb(244 143 177 / 0.28), transparent 62%),
            radial-gradient(90% 60% at 88% 12%, rgb(236 64 122 / 0.20), transparent 58%);
        }

        body {
          background: linear-gradient(135deg, #fce4ec 0%, #f8bbd0 50%, #f48fb1 100%) !important;
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
          border: 2px solid #ec407a !important;
          box-shadow: 0 4px 20px rgba(236, 64, 122, 0.25) !important;
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
          color: #880e4f !important;
        }
      `}</style>

      <style jsx>{`
        .mothers-banner {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          background: linear-gradient(90deg, #ec407a, #f06292, #ec407a);
          background-size: 200% 100%;
          color: white;
          padding: 14px 20px;
          text-align: center;
          z-index: 10000;
          animation: warm-glow 5s ease-in-out infinite;
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
          font-size: 24px;
          animation: bloom 3s ease-in-out infinite;
        }

        .banner-text {
          font-family: Georgia, serif;
        }

        @keyframes warm-glow {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes bloom {
          0%, 100% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.1) rotate(5deg); }
        }

        :global(body) {
          padding-top: 50px !important;
        }

        .flowers-particles {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
          overflow: hidden;
        }

        .flower {
          position: absolute;
          font-size: 32px;
          opacity: 0;
          animation: petal-fall linear infinite;
        }

        @keyframes petal-fall {
          0% {
            transform: translateY(-10vh) rotate(0deg);
            opacity: 0;
          }
          10% { opacity: 0.7; }
          90% { opacity: 0.7; }
          100% {
            transform: translateY(110vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
}
