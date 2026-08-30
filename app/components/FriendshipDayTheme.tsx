/**
 * FRIENDSHIP DAY THEME
 * 
 *  TO CONTROL THIS THEME:
 * Edit app/components/theme-config.ts and set friendshipDay to true/false
 */

'use client';

import ThemeGlyph from "./ThemeGlyph";


export default function FriendshipDayTheme() {
  return (
    <>
      <div className="friendship-banner">
        <div className="banner-content">
          <span className="icon"><ThemeGlyph name="heart" /></span>
          <span className="banner-text">Happy Friendship Day — Celebrating the bonds that make life beautiful</span>
          <span className="icon"><ThemeGlyph name="heart" /></span>
        </div>
      </div>

      <div className="hearts-particles" aria-hidden="true">
        {['heart', 'spark', 'star', 'heart', 'spark'].map((heart, i) => (
          <div
            key={i}
            className="heart"
            style={{
              left: `${(i * 20) % 100}%`,
              animationDelay: `${i * 0.6}s`,
            }}
          >
            <ThemeGlyph name={heart} />
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
        :root[data-theme="friendshipDay"] {
          color-scheme: dark;

          --color-base: #0f3350;
          --color-raised: #19547b;
          --color-sunken: #0a2438;

          --color-surface-1: rgb(255 255 255 / 5%);
          --color-surface-2: rgb(255 255 255 / 9%);
          --color-surface-3: rgb(255 255 255 / 13%);
          --color-hairline: rgb(255 255 255 / 14%);
          --color-hairline-strong: rgb(255 255 255 / 26%);

          --color-ink-1: #f8fafc;
          --color-ink-2: #cbd5e1;
          --color-ink-3: #94a3b8;

          --color-accent: #ffd89b;
          --color-accent-strong: #f0c072;
          --color-accent-soft: #ffe4b8;
          --color-accent-muted: rgb(255 216 155 / 16%);
          --color-highlight: #ffd89b;
          --color-on-accent: #0b0b12;

          --ground-texture: none;
          --ground-texture-opacity: 0;
          --ground-glow:
            radial-gradient(120% 85% at 50% -15%, rgb(255 216 155 / 0.28), transparent 62%),
            radial-gradient(90% 60% at 88% 12%, rgb(25 84 123 / 0.20), transparent 58%);
        }

        body {
          background: linear-gradient(135deg, #ffd89b 0%, #19547b 100%) !important;
          background-attachment: fixed;
        }

        body > * h1, body > * h2, body > * h3 {
          color: #fff !important;
        }

        body > * p:not(.border-purple-500 *, .border-pink-400 *, .border-pink-300 *, .border-amber-300 *, .border-blue-400 *),
        body > * span:not(.border-purple-500 *, .border-pink-400 *, .border-pink-300 *, .border-amber-300 *, .border-blue-400 *) {
          color: #f8f9fa !important;
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
          border: 2px solid #ffd89b !important;
          box-shadow: 0 4px 20px rgba(255, 216, 155, 0.4) !important;
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
          color: #19547b !important;
        }
      `}</style>

      <style jsx>{`
        .friendship-banner {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          background: linear-gradient(90deg, #19547b, #ffd89b, #19547b);
          background-size: 200% 100%;
          color: white;
          padding: 14px 20px;
          text-align: center;
          z-index: 10000;
          animation: joy-wave 7s ease-in-out infinite;
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
          animation: celebrate 2.5s ease-in-out infinite;
        }

        @keyframes joy-wave {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes celebrate {
          0%, 100% { transform: rotate(-5deg) scale(1); }
          50% { transform: rotate(5deg) scale(1.1); }
        }

        :global(body) {
          padding-top: 50px !important;
        }

        .hearts-particles {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
          overflow: hidden;
        }

        .heart {
          position: absolute;
          font-size: 30px;
          animation: float-up 10s ease-in-out infinite;
        }

        @keyframes float-up {
          0% {
            transform: translateY(110vh) scale(0.8);
            opacity: 0;
          }
          20% { opacity: 0.8; }
          80% { opacity: 0.8; }
          100% {
            transform: translateY(-10vh) scale(1.2);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
}
