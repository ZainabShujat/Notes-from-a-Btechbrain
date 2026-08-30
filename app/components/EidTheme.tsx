/**
 * EID THEME COMPONENT
 * 
 *  TO CONTROL THIS THEME:
 * Edit app/components/theme-config.ts and set eid to true/false
 */

'use client';


export default function EidTheme() {
  return (
    <>
      {/* Elegant Banner */}
      <div className="eid-banner">
        <div className="banner-content">
          <span className="crescent"></span>
          <span className="banner-text">Eid Mubarak — May peace and blessings be upon you</span>
          <span className="ornament"></span>
        </div>
      </div>

      {/* Geometric Islamic Patterns */}
      <div className="pattern-overlay" aria-hidden="true">
        <svg className="islamic-pattern" width="100%" height="100%">
          <defs>
            <pattern id="star-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="1" fill="rgba(212, 175, 55, 0.3)" />
              <circle cx="0" cy="0" r="1" fill="rgba(212, 175, 55, 0.2)" />
              <circle cx="100" cy="100" r="1" fill="rgba(212, 175, 55, 0.2)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#star-pattern)" />
        </svg>
      </div>

      {/* Subtle Light Particles */}
      <div className="light-particles" aria-hidden="true">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${4 + Math.random() * 3}s`,
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
        :root[data-theme="eid"] {
          color-scheme: light;

          --color-base: #f5e6d3;
          --color-raised: #ffffff;
          --color-sunken: #e8d7b8;

          --color-surface-1: rgb(15 23 42 / 4%);
          --color-surface-2: rgb(15 23 42 / 7%);
          --color-surface-3: rgb(15 23 42 / 11%);
          --color-hairline: rgb(15 23 42 / 14%);
          --color-hairline-strong: rgb(15 23 42 / 26%);

          --color-ink-1: #111827;
          --color-ink-2: #374151;
          --color-ink-3: #6b7280;

          --color-accent: #3a7d9a;
          --color-accent-strong: #2c6076;
          --color-accent-soft: #2c6076;
          --color-accent-muted: rgb(212 175 55 / 16%);
          --color-highlight: #d4af37;
          --color-on-accent: #ffffff;

          --ground-texture: none;
          --ground-texture-opacity: 0;
          --ground-glow:
            radial-gradient(120% 85% at 50% -15%, rgb(212 175 55 / 0.28), transparent 62%),
            radial-gradient(90% 60% at 88% 12%, rgb(58 125 154 / 0.20), transparent 58%);
        }

        /* Elegant Eid theme */
        body {
          background: linear-gradient(135deg, #0a192f 0%, #1e3a5f 30%, #2c5f7c 70%, #3a7d9a 100%) !important;
          background-attachment: fixed;
          position: relative;
        }

        /* Light text for body content (not in cards) */
        body > * h1, 
        body > * h2:not(.border-purple-500 *, .border-pink-400 *, .border-pink-300 *, .border-amber-300 *), 
        body > * h3, 
        body > * h4, 
        body > * h5, 
        body > * h6 {
          color: #f5e6d3 !important;
        }

        body > * p:not(.border-purple-500 *, .border-pink-400 *, .border-pink-300 *, .border-amber-300 *, .border-amber-500 *, .border-green-300 *, .border-emerald-300 *, .border-emerald-500 *, .border-blue-300 *, .border-blue-400 *),
        body > * span:not(.border-purple-500 *, .border-pink-400 *, .border-pink-300 *, .border-amber-300 *, .border-amber-500 *, .border-green-300 *, .border-emerald-300 *, .border-emerald-500 *, .border-blue-300 *, .border-blue-400 *) {
          color: #e8d7b8 !important;
        }

        /* Sophisticated card styling */
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
          background: rgba(255, 255, 255, 0.97) !important;
          backdrop-filter: blur(12px);
          border: 1px solid rgba(212, 175, 55, 0.4) !important;
          box-shadow: 
            0 4px 20px rgba(0, 0, 0, 0.1),
            0 0 40px rgba(212, 175, 55, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.8) !important;
        }

        /* Ensure ALL card text is dark and consistent */
        .border-purple-500 h1,
        .border-purple-500 h2,
        .border-purple-500 h3,
        .border-purple-500 h4,
        .border-purple-500 h5,
        .border-purple-500 p,
        .border-purple-500 span,
        .border-purple-500 a,
        .border-pink-400 h1,
        .border-pink-400 h2,
        .border-pink-400 h3,
        .border-pink-400 h4,
        .border-pink-400 h5,
        .border-pink-400 p,
        .border-pink-400 span,
        .border-pink-400 a,
        .border-pink-300 h1,
        .border-pink-300 h2,
        .border-pink-300 h3,
        .border-pink-300 h4,
        .border-pink-300 h5,
        .border-pink-300 p,
        .border-pink-300 span,
        .border-pink-300 a,
        .border-amber-300 h1,
        .border-amber-300 h2,
        .border-amber-300 h3,
        .border-amber-300 h4,
        .border-amber-300 h5,
        .border-amber-300 p,
        .border-amber-300 span,
        .border-amber-300 a,
        .border-amber-500 h1,
        .border-amber-500 h2,
        .border-amber-500 h3,
        .border-amber-500 h4,
        .border-amber-500 h5,
        .border-amber-500 p,
        .border-amber-500 span,
        .border-amber-500 a,
        .border-green-300 h1,
        .border-green-300 h2,
        .border-green-300 h3,
        .border-green-300 h4,
        .border-green-300 h5,
        .border-green-300 p,
        .border-green-300 span,
        .border-green-300 a,
        .border-emerald-300 h1,
        .border-emerald-300 h2,
        .border-emerald-300 h3,
        .border-emerald-300 h4,
        .border-emerald-300 h5,
        .border-emerald-300 p,
        .border-emerald-300 span,
        .border-emerald-300 a,
        .border-emerald-500 h1,
        .border-emerald-500 h2,
        .border-emerald-500 h3,
        .border-emerald-500 h4,
        .border-emerald-500 h5,
        .border-emerald-500 p,
        .border-emerald-500 span,
        .border-emerald-500 a,
        .border-blue-300 h1,
        .border-blue-300 h2,
        .border-blue-300 h3,
        .border-blue-300 h4,
        .border-blue-300 h5,
        .border-blue-300 p,
        .border-blue-300 span,
        .border-blue-300 a,
        .border-blue-400 h1,
        .border-blue-400 h2,
        .border-blue-400 h3,
        .border-blue-400 h4,
        .border-blue-400 h5,
        .border-blue-400 p,
        .border-blue-400 span,
        .border-blue-400 a {
          color: #1a1a1a !important;
        }
      `}</style>

      <style jsx>{`
        /* Elegant Banner */
        .eid-banner {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          width: 100%;
          background: linear-gradient(90deg, 
            rgba(10, 25, 47, 0.98), 
            rgba(30, 58, 95, 0.98), 
            rgba(10, 25, 47, 0.98)
          );
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(212, 175, 55, 0.3);
          color: #d4af37;
          padding: 14px 20px;
          text-align: center;
          z-index: 10000;
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
        }

        .banner-content {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 16px;
          font-size: 15px;
          font-weight: 400;
          letter-spacing: 0.5px;
          margin: 0 auto;
          max-width: 1200px;
        }

        .crescent {
          font-size: 20px;
          color: #d4af37;
          animation: gentle-glow 3s ease-in-out infinite;
        }

        .ornament {
          font-size: 14px;
          color: rgba(212, 175, 55, 0.7);
          animation: gentle-glow 3s ease-in-out infinite 1.5s;
        }

        .banner-text {
          color: #e8d7b8;
          font-family: Georgia, serif;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
        }

        @keyframes gentle-glow {
          0%, 100% {
            opacity: 0.7;
            filter: brightness(1);
          }
          50% {
            opacity: 1;
            filter: brightness(1.3);
          }
        }

        /* Add padding to body */
        :global(body) {
          padding-top: 50px !important;
        }

        /* Ensure nav and content appear below banner */
        :global(nav) {
          position: relative !important;
          z-index: 100 !important;
        }

        /* Geometric Pattern Overlay */
        .pattern-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
          opacity: 0.4;
        }

        .islamic-pattern {
          width: 100%;
          height: 100%;
        }

        /* Subtle Light Particles */
        .light-particles {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 9999;
          overflow: hidden;
        }

        .particle {
          position: absolute;
          width: 3px;
          height: 3px;
          background: radial-gradient(circle, rgba(212, 175, 55, 0.8) 0%, transparent 70%);
          border-radius: 50%;
          animation: float-gentle linear infinite;
        }

        @keyframes float-gentle {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 0.6;
          }
          90% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(-100vh) translateX(20px);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
}
