/**
 * BIRTHDAY THEME (Turning 20)
 * 
 * 🌌 TO CONTROL THIS THEME:
 * Edit app/components/theme-config.ts and set birthday to true/false
 */

'use client';


export default function BirthdayTheme() {
  return (
    <>
      <div className="birthday-banner">
        <div className="banner-content">
          <span className="constellation">✨</span>
          <span className="banner-text">Celebrating the Admin's 20th Birthday!</span>
          <span className="constellation">✨</span>
        </div>
      </div>

      {/* Twinkling stars background */}
      <div className="cosmos-bg" aria-hidden="true" suppressHydrationWarning>
        {Array.from({ length: 60 }).map((_, i) => (
          <div
            key={`star-${i}`}
            className="star-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
            }}
            suppressHydrationWarning
          />
        ))}
      </div>

      {/* Shooting stars */}
      <div className="shooting-stars" aria-hidden="true" suppressHydrationWarning>
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={`shoot-${i}`}
            className="shooting-star"
            style={{
              top: `${Math.random() * 50}%`,
              animationDelay: `${Math.random() * 8 + 2}s`,
            }}
            suppressHydrationWarning
          />
        ))}
      </div>

      {/* Constellation patterns */}
      <div className="constellation-pattern" aria-hidden="true">
        <svg width="100%" height="100%" style={{ position: 'fixed', top: 0, left: 0, opacity: 0.15, pointerEvents: 'none' }}>
          <defs>
            <linearGradient id="constGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffd700" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#c0c0c0" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          {/* Simple constellation pattern */}
          <circle cx="20%" cy="20%" r="2" fill="#ffd700" />
          <circle cx="25%" cy="15%" r="1.5" fill="#c0c0c0" />
          <circle cx="30%" cy="22%" r="1.8" fill="#ffd700" />
          <line x1="20%" y1="20%" x2="25%" y2="15%" stroke="url(#constGrad)" strokeWidth="0.5" />
          <line x1="25%" y1="15%" x2="30%" y2="22%" stroke="url(#constGrad)" strokeWidth="0.5" />
          
          <circle cx="70%" cy="30%" r="2" fill="#ffd700" />
          <circle cx="75%" cy="25%" r="1.5" fill="#c0c0c0" />
          <circle cx="78%" cy="35%" r="1.8" fill="#ffd700" />
          <line x1="70%" y1="30%" x2="75%" y2="25%" stroke="url(#constGrad)" strokeWidth="0.5" />
          <line x1="75%" y1="25%" x2="78%" y2="35%" stroke="url(#constGrad)" strokeWidth="0.5" />

          <circle cx="50%" cy="70%" r="2" fill="#ffd700" />
          <circle cx="55%" cy="75%" r="1.5" fill="#c0c0c0" />
          <circle cx="48%" cy="78%" r="1.8" fill="#ffd700" />
          <line x1="50%" y1="70%" x2="55%" y2="75%" stroke="url(#constGrad)" strokeWidth="0.5" />
          <line x1="55%" y1="75%" x2="48%" y2="78%" stroke="url(#constGrad)" strokeWidth="0.5" />
        </svg>
      </div>

      <style jsx global>{`

        body {
          background: linear-gradient(135deg, #0a1128 0%, #1a1f3a 30%, #2d1b4e 60%, #1a1f3a 100%) !important;
          background-attachment: fixed;
          padding-top: 50px !important;
        }

        /* Headings: gold for highlight, strong shadow for contrast */
        body > * h1, 
        body > * h2, 
        body > * h3 {
          color: #ffd700 !important;
          text-shadow: 0 0 15px #1a1f3a, 0 0 15px rgba(255, 215, 0, 0.5);
        }

        /* Subheadings: off-white for contrast */
        body > * h4,
        body > * h5 {
          color: #e8d7b8 !important;
        }

        /* Main text: always light on dark, never yellow on white */
        body > * p,
        body > * span,
        body > * li {
          color: #f0f0f0 !important;
        }

        /* Settings, cards, and buttons: force dark backgrounds and light text */
        .settings-card, .CategoryCard, .dashboard-card, .theme-selection-card, .button, .btn, .save-theme-btn {
          background: #181c2a !important;
          color: #f0f0f0 !important;
          border: 1px solid rgba(255, 215, 0, 0.4) !important;
          box-shadow: 0 4px 30px rgba(0,0,0,0.3), 0 0 20px rgba(255,215,0,0.1);
        }

        /* Highlighted/selected theme: gold border, dark background, light text */
        .theme-selection-card.selected, .theme-selection-card[aria-checked="true"], .theme-selection-card.active {
          background: #23264a !important;
          color: #ffd700 !important;
          border: 2px solid #ffd700 !important;
        }

        /* Button hover/focus: gold background, dark text for contrast */
        .button:hover, .btn:hover, .save-theme-btn:hover {
          background: #ffd700 !important;
          color: #181c2a !important;
        }

        /* Ensure all radio/checkbox labels in settings are readable */
        .theme-selection-card label, .settings-card label {
          color: #f0f0f0 !important;
        }

        /* Fix for analytics/community/settings dashboard cards */
        .dashboard-card {
          background: #181c2a !important;
          color: #ffd700 !important;
        }

        /* Prevent yellow text on white backgrounds anywhere */
        .bg-white, .bg-light, .white-bg, .light-bg {
          background: #181c2a !important;
          color: #f0f0f0 !important;
        }

        /* Galaxy-shimmer card styling */
        .CategoryCard {
          background: #181c2a !important;
          border: 1px solid rgba(255, 215, 0, 0.4) !important;
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3), 0 0 20px rgba(255, 215, 0, 0.1);
          position: relative;
          overflow: hidden;
        }

        .CategoryCard::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(45deg, 
            transparent 30%, 
            rgba(255, 215, 0, 0.1) 50%, 
            transparent 70%);
          animation: shimmer 3s infinite;
          pointer-events: none;
        }

        /* Card text styling */
        .border-purple-500 h1,
        .border-purple-500 h2,
        .border-purple-500 h3,
        .border-pink-400 h1,
        .border-pink-400 h2,
        .border-pink-400 h3,
        .border-pink-300 h1,
        .border-pink-300 h2,
        .border-pink-300 h3,
        .border-amber-300 h1,
        .border-amber-300 h2,
        .border-amber-300 h3,
        .border-amber-500 h1,
        .border-amber-500 h2,
        .border-amber-500 h3,
        .border-green-300 h1,
        .border-green-300 h2,
        .border-green-300 h3,
        .border-emerald-300 h1,
        .border-emerald-300 h2,
        .border-emerald-300 h3,
        .border-emerald-500 h1,
        .border-emerald-500 h2,
        .border-emerald-500 h3,
        .border-blue-300 h1,
        .border-blue-300 h2,
        .border-blue-300 h3,
        .border-blue-400 h1,
        .border-blue-400 h2,
        .border-blue-400 h3 {
          color: #ffd700 !important;
          text-shadow: 0 0 10px rgba(255, 215, 0, 0.4);
        }

        .border-purple-500 h4,
        .border-purple-500 h5,
        .border-purple-500 p,
        .border-purple-500 span,
        .border-purple-500 a,
        .border-pink-400 h4,
        .border-pink-400 h5,
        .border-pink-400 p,
        .border-pink-400 span,
        .border-pink-400 a,
        .border-pink-300 h4,
        .border-pink-300 h5,
        .border-pink-300 p,
        .border-pink-300 span,
        .border-pink-300 a,
        .border-amber-300 h4,
        .border-amber-300 h5,
        .border-amber-300 p,
        .border-amber-300 span,
        .border-amber-300 a,
        .border-amber-500 h4,
        .border-amber-500 h5,
        .border-amber-500 p,
        .border-amber-500 span,
        .border-amber-500 a,
        .border-green-300 h4,
        .border-green-300 h5,
        .border-green-300 p,
        .border-green-300 span,
        .border-green-300 a,
        .border-emerald-300 h4,
        .border-emerald-300 h5,
        .border-emerald-300 p,
        .border-emerald-300 span,
        .border-emerald-300 a,
        .border-emerald-500 h4,
        .border-emerald-500 h5,
        .border-emerald-500 p,
        .border-emerald-500 span,
        .border-emerald-500 a,
        .border-blue-300 h4,
        .border-blue-300 h5,
        .border-blue-300 p,
        .border-blue-300 span,
        .border-blue-300 a,
        .border-blue-400 h4,
        .border-blue-400 h5,
        .border-blue-400 p,
        .border-blue-400 span,
        .border-blue-400 a {
          color: #e8d7b8 !important;
        }
      `}</style>

      <style jsx>{`
        /* Banner */

        .birthday-banner {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          width: 100vw;
          background: linear-gradient(90deg, 
            #1a1f3a 0%, 
            #2d1b4e 25%,
            #4a1a4a 50%,
            #2d1b4e 75%,
            #1a1f3a 100%);
          padding: 12px 20px;
          z-index: 10000;
          box-shadow: 
            0 4px 20px rgba(0, 0, 0, 0.5),
            0 0 40px rgba(255, 215, 0, 0.3);
          border-bottom: 2px solid rgba(255, 215, 0, 0.5);
        }

        .banner-content {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 15px;
          font-family: 'Georgia', serif;
          width: 100vw;
          text-align: center;
        }

        .banner-text {
          font-size: 1.1rem;
          font-weight: 600;
          background: linear-gradient(135deg, #ffd700, #c0c0c0, #ffd700);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradientShift 3s ease infinite;
          letter-spacing: 0.5px;
          text-align: center;
        }

        .constellation {
          font-size: 1.5rem;
          animation: glow 2s ease-in-out infinite;
        }

        /* Cosmos background */
        .cosmos-bg {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
          overflow: hidden;
          opacity: 0.18;
        }

        .star-twinkle {
          position: absolute;
          background: radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 70%);
          border-radius: 50%;
          animation: twinkle 3s ease-in-out infinite;
        }

        /* Shooting stars */
        .shooting-stars {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 2;
          overflow: hidden;
        }

        .shooting-star {
          position: absolute;
          right: 0;
          width: 100px;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.8), transparent);
          transform: rotate(-45deg);
          animation: shoot 10s linear infinite;
          opacity: 0;
        }

        @keyframes twinkle {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.5);
          }
        }

        @keyframes shoot {
          0% {
            transform: translateX(0) translateY(0) rotate(-45deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 0.5;
          }
          100% {
            transform: translateX(-1000px) translateY(500px) rotate(-45deg);
            opacity: 0;
          }
        }

        @keyframes glow {
          0%, 100% {
            text-shadow: 0 0 10px rgba(255, 215, 0, 0.6);
          }
          50% {
            text-shadow: 0 0 20px rgba(255, 215, 0, 1);
          }
        }

        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%) translateY(-100%);
          }
          100% {
            transform: translateX(100%) translateY(100%);
          }
        }

        @media (max-width: 768px) {
          .banner-text {
            font-size: 0.9rem;
          }
          
          .constellation {
            font-size: 1.2rem;
          }
        }
      `}</style>
    </>
  );
}
