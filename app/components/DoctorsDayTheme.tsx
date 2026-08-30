/**
 * DOCTORS DAY / HEALTHCARE THEME
 * 
 *  TO CONTROL THIS THEME:
 * Edit app/components/theme-config.ts and set doctorsDay to true/false
 */

'use client';

import ThemeGlyph from "./ThemeGlyph";


export default function DoctorsDayTheme() {
  return (
    <>
      {/* Banner */}
      <div className="doctors-banner">
        <div className="banner-content">
          <span className="icon"><ThemeGlyph name="cross" /></span>
          <span className="banner-text">Doctors Day — Honoring those who heal and care</span>
          <span className="icon"><ThemeGlyph name="cross" /></span>
        </div>
      </div>

      {/* Floating Medical Symbols */}
      <div className="medical-particles" aria-hidden="true" style={{ opacity: 0.18 }}>
        {['cross', 'drop', 'heart', 'cross', 'drop'].map((symbol, i) => (
          <div
            key={i}
            className="medical-symbol"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${5 + Math.random() * 3}s`,
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
        :root[data-theme="doctorsDay"] {
          color-scheme: light;

          --color-base: #e3f2fd;
          --color-raised: #ffffff;
          --color-sunken: #bbdefb;

          --color-surface-1: rgb(15 23 42 / 4%);
          --color-surface-2: rgb(15 23 42 / 7%);
          --color-surface-3: rgb(15 23 42 / 11%);
          --color-hairline: rgb(15 23 42 / 14%);
          --color-hairline-strong: rgb(15 23 42 / 26%);

          --color-ink-1: #111827;
          --color-ink-2: #374151;
          --color-ink-3: #6b7280;

          --color-accent: #1976d2;
          --color-accent-strong: #125aa0;
          --color-accent-soft: #0d47a1;
          --color-accent-muted: rgb(144 202 249 / 16%);
          --color-highlight: #1565c0;
          --color-on-accent: #ffffff;

          --ground-texture: none;
          --ground-texture-opacity: 0;
          --ground-glow:
            radial-gradient(120% 85% at 50% -15%, rgb(144 202 249 / 0.28), transparent 62%),
            radial-gradient(90% 60% at 88% 12%, rgb(187 222 251 / 0.20), transparent 58%);
        }

        body {
          background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 50%, #90caf9 100%) !important;
          background-attachment: fixed;
        }

        .CategoryCard {
          background: rgba(255, 255, 255, 0.98) !important;
          backdrop-filter: blur(10px);
          border: 2px solid #1976d2 !important;
          box-shadow: 0 4px 20px rgba(25, 118, 210, 0.2), 0 0 30px rgba(239, 83, 80, 0.1) !important;
        }

        .CategoryCard * {
          color: #1565c0 !important;
        }
      `}</style>

      <style jsx>{`
        .doctors-banner {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          background: linear-gradient(90deg, #1976d2, #42a5f5, #1976d2);
          background-size: 200% 100%;
          color: white;
          padding: 14px 20px;
          text-align: center;
          z-index: 10000;
          animation: wave 4s ease-in-out infinite;
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
          animation: heartbeat 1.5s ease-in-out infinite;
        }

        @keyframes wave {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          15% { transform: scale(1.2); }
          30% { transform: scale(1); }
        }

        :global(body) {
          padding-top: 50px !important;
        }

        .medical-particles {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
          overflow: hidden;
        }

        .medical-symbol {
          position: absolute;
          font-size: 24px;
          opacity: 0.4;
          animation: float-medical linear infinite;
        }

        @keyframes float-medical {
          0% {
            transform: translateY(100vh);
            opacity: 0;
          }
          10%, 90% { opacity: 0.4; }
          100% {
            transform: translateY(-10vh);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
}
