import Link from "next/link";

export default function Hero() {
  return (
    <section
      className="relative min-h-[92vh] flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 py-16 sm:py-20 overflow-hidden"
    >
      {/* =========================================================
          BACKGROUND LAYER: GLOW & SUBTLE ENGINEERING NOTEBOOK GRID
          ========================================================= */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 42%, rgba(168, 85, 247, 0.09) 0%, transparent 75%)",
        }}
      />
      {/* Whisper-faint notebook dot grid */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.035] dark:opacity-[0.045]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(currentColor 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="pointer-events-none absolute inset-0 z-0 hero-star-field" aria-hidden="true" />

      {/* =========================================================
          MIDGROUND LAYER: ORGANIC THINKING PATH BEHIND TITLE
          An irregular, imperfect meandering thought line like someone
          tracing an idea as they ponder. Asymmetrical, human, subtle.
          ========================================================= */}
      <div
        className="pointer-events-none absolute left-1/2 top-[40%] -translate-x-1/2 -translate-y-1/2 w-[125%] sm:w-[115%] md:w-[108%] max-w-[980px] h-[360px] md:h-[420px] select-none z-0"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 980 420"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full hero-thinking-path overflow-visible"
        >
          {/* Main asymmetrical organic thinking trace */}
          <path
            d="M 70,220 C 140,160 210,130 310,145 C 410,160 380,270 290,280 C 200,290 190,190 270,130 C 350,70 520,75 660,110 C 800,145 870,210 830,280 C 790,345 660,340 510,320 C 390,305 340,360 450,380 C 580,400 760,365 890,300"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-accent/25 dark:text-accent/20"
          />
          <path d="M 70,220 C 140,160 210,130 310,145 C 410,160 380,270 290,280 C 200,290 190,190 270,130 C 350,70 520,75 660,110 C 800,145 870,210 830,280 C 790,345 660,340 510,320 C 390,305 340,360 450,380 C 580,400 760,365 890,300" pathLength={100} stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeDasharray="0.7 99.3" className="text-highlight/55 hero-travel-light" />

          {/* Faint secondary contemplative pencil branch */}
          <path
            d="M 280,135 C 390,110 570,120 700,165 C 810,205 840,295 730,325 C 620,355 490,330 380,310"
            stroke="currentColor"
            strokeWidth="1.1"
            strokeDasharray="5 7"
            strokeLinecap="round"
            className="text-highlight/20 dark:text-highlight/15"
          />

          {/* Minimal thought junction nodes */}
          <circle
            cx="310"
            cy="145"
            r="3"
            className="fill-base stroke-accent/40 dark:stroke-accent/45"
            strokeWidth="1.2"
          />
          <circle
            cx="700"
            cy="165"
            r="3"
            className="fill-base stroke-highlight/45"
            strokeWidth="1.2"
          />
        </svg>
      </div>

      {/* =========================================================
          MIDGROUND LAYER: 3 CORE WORKING NOTEBOOK ARTIFACTS
          The three strongest, most intentional thought fragments.
          ========================================================= */}

      {/* Artifact 1: Torn note scrap — "why does this work?" (Left / mid-high) */}
      <div
        className="hidden sm:block absolute left-3 md:left-8 lg:left-14 top-20 md:top-24 z-10 hero-artifact-1"
      >
        <div className="group rounded-md border border-amber-500/25 dark:border-amber-400/20 bg-amber-500/[0.05] dark:bg-amber-400/[0.04] backdrop-blur-xs px-2.5 py-1.5 shadow-xs transition-transform duration-300 hover:rotate-0 hover:scale-105 select-none">
          <div className="flex items-center gap-1.5 font-mono text-[10px] md:text-[11px] text-amber-800/80 dark:text-amber-200/75">
            <span className="text-highlight font-bold">?</span>
            <span>why does this work?</span>
          </div>
          <div className="mt-0.5 text-[8.5px] font-mono text-ink-3/50 tracking-wider">
            [ proof pending ]
          </div>
        </div>
      </div>

      {/* Artifact 2: Code logic fragment (Right / mid-low) */}
      <div
        className="hidden md:block absolute right-4 lg:right-16 top-[58%] lg:top-[54%] z-10 hero-artifact-2"
      >
        <div className="group rounded-lg border border-hairline/70 bg-surface-1/90 dark:bg-surface-1/80 backdrop-blur-xs px-3 py-2 shadow-xs transition-transform duration-300 hover:rotate-0 hover:scale-105 select-none">
          <div className="flex items-center justify-between gap-4 border-b border-hairline/40 pb-1 mb-1.5">
            <span className="font-mono text-[9px] text-ink-3/50 tracking-widest uppercase">
              search.ts
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/60 animate-pulse" />
          </div>
          <pre className="font-mono text-[10px] text-ink-3/85 leading-tight">
            <code>
              <span className="text-accent-soft">if</span> (state ==={" "}
              <span className="text-highlight">&quot;stuck&quot;</span>) &#123;
              <br />
              {"  "}rethink(); <span className="text-ink-3/40">// O(1)</span>
              <br />
              &#125;
            </code>
          </pre>
        </div>
      </div>

      {/* Artifact 3: Mini graph diagram fragment (Top-right) */}
      <div className="hidden lg:block absolute right-8 xl:right-24 top-14 z-10 hero-artifact-3 pointer-events-none select-none">
        <div className="flex flex-col items-end gap-1">
          <svg
            className="w-24 h-6 text-ink-3/35"
            viewBox="0 0 96 24"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.2" />
            <line
              x1="16"
              y1="12"
              x2="44"
              y2="12"
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="3 2"
            />
            <circle cx="48" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.2" />
            <line
              x1="52"
              y1="12"
              x2="80"
              y2="12"
              stroke="currentColor"
              strokeWidth="1"
            />
            <circle cx="84" cy="12" r="3.5" fill="currentColor" />
          </svg>
          <span className="font-mono text-[9px] text-ink-3/40 tracking-wider">
            fig 0.1 · transitions
          </span>
        </div>
      </div>

      {/* =========================================================
          FOREGROUND / CENTER LAYER:
          THE 4 CONCEPTS & CENTRAL IDENTITY
          ========================================================= */}
      <div
        className="relative z-20 flex flex-col items-center text-center max-w-3xl mx-auto w-full"
      >
        {/* Concept 1: UNDERSTAND (Asymmetrical: top-left-of-center) */}
        <div
          className="absolute -top-11 sm:-top-13 left-[40%] sm:left-[44%] -translate-x-1/2 z-20 hero-orbit-understand"
        >
          <Link
            href="/notes#tracks"
            className="group inline-flex items-center gap-1.5 transition-all focus:outline-none focus-visible:ring-1 focus-visible:ring-accent rounded px-2.5 py-1 bg-surface-1/40 hover:bg-surface-2/80 border border-hairline/60 hover:border-accent/40 backdrop-blur-xs"
            title="Explanations, mental models, and deep dives"
          >
            {/* Open book / concept marker */}
            <svg
              className="w-3.5 h-3.5 text-accent-soft shrink-0 transition-transform duration-200 group-hover:-rotate-6"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M2 3.5C4 2.5 6 3 8 4.5C10 3 12 2.5 14 3.5V13C12 12 10 12.5 8 13.5C6 12.5 4 12 2 13V3.5Z"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinejoin="round"
              />
              <path d="M8 4.5V13.5" stroke="currentColor" strokeWidth="1.3" />
            </svg>
            <span className="text-[11px] sm:text-xs font-mono tracking-[0.22em] uppercase text-ink-3 group-hover:text-ink-1 transition-colors">
              UNDERSTAND
            </span>
          </Link>
        </div>

        {/* Concept 2: INTERACT (Asymmetrical: upper-left) */}
        <div
          className="hidden sm:block absolute top-[36%] -translate-y-1/2 -left-3 md:-left-12 lg:-left-20 z-20 hero-orbit-interact"
        >
          <Link
            href="/notes/labs"
            className="group inline-flex items-center gap-1.5 transition-all focus:outline-none focus-visible:ring-1 focus-visible:ring-accent rounded px-2.5 py-1 bg-surface-1/40 hover:bg-surface-2/80 border border-hairline/60 hover:border-accent/40 backdrop-blur-xs"
            title="Visualizers, playgrounds, and simulators"
          >
            {/* Interaction cursor glyph */}
            <svg
              className="w-3 h-3 text-accent shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              viewBox="0 0 12 12"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M1.5 1L9.5 5.5L5.5 6.5L4 10.5L1.5 1Z"
                fill="currentColor"
              />
            </svg>
            <span className="text-[11px] sm:text-xs font-mono tracking-[0.22em] uppercase text-ink-3 group-hover:text-ink-1 transition-colors">
              INTERACT
            </span>
          </Link>
        </div>

        {/* Concept 3: PRACTICE (Asymmetrical: mid-right) */}
        <div
          className="hidden sm:block absolute top-[48%] -translate-y-1/2 -right-3 md:-right-12 lg:-right-20 z-20 hero-orbit-practice"
        >
          <Link
            href="/notes/quizzes"
            className="group inline-flex items-center gap-1.5 transition-all focus:outline-none focus-visible:ring-1 focus-visible:ring-accent rounded px-2.5 py-1 bg-surface-1/40 hover:bg-surface-2/80 border border-hairline/60 hover:border-highlight/50 backdrop-blur-xs"
            title="Quizzes, GATE PYQs, and test questions"
          >
            <span className="text-[11px] sm:text-xs font-mono tracking-[0.22em] uppercase text-ink-3 group-hover:text-ink-1 transition-colors">
              PRACTICE
            </span>
            {/* Check attempt marker */}
            <span
              className="w-3.5 h-3.5 rounded-full border border-highlight/60 flex items-center justify-center text-[9px] font-bold text-highlight group-hover:bg-highlight group-hover:text-background transition-colors"
              aria-hidden="true"
            >
              ✓
            </span>
          </Link>
        </div>

        {/* CENTRAL TYPOGRAPHY (The strongest visual anchor) */}
        <h1 className="relative z-10 text-4xl sm:text-5xl md:text-7xl font-black tracking-tight leading-[1.08]">
          <span className="text-ink-1">Notes From a </span>
          <span className="text-highlight">B.Tech Brain</span>
        </h1>

        <p className="relative z-10 mt-6 text-lg sm:text-xl md:text-2xl text-ink-2 max-w-xl leading-relaxed">
          A place to explore things I don&apos;t understand yet.
        </p>

        <Link
          href="/editions"
          className="relative z-10 mt-6 inline-flex items-center gap-3 border border-ink-1/15 bg-accent-strong px-5 py-3 text-sm font-semibold text-on-accent transition-colors hover:bg-accent-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          Read the latest editions <span aria-hidden="true">↗</span>
        </Link>

        {/* Concept 4: REVISE (Asymmetrical: bottom-right-of-center) */}
        <div
          className="hidden sm:block mt-8 sm:mt-10 z-20 ml-6 hero-orbit-revise"
        >
          <Link
            href="/notes/cheat-sheets"
            className="group inline-flex items-center gap-1.5 transition-all focus:outline-none focus-visible:ring-1 focus-visible:ring-accent rounded px-2.5 py-1 bg-highlight/10 hover:bg-highlight/20 border border-highlight/30 hover:border-highlight/50 backdrop-blur-xs"
            title="Cheat sheets, formulas, and quick summaries"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-highlight shrink-0" />
            <span className="text-[11px] sm:text-xs font-mono tracking-[0.22em] uppercase text-highlight font-semibold">
              REVISE
            </span>
            <span className="text-[10px] text-highlight/70 group-hover:translate-x-0.5 transition-transform">
              →
            </span>
          </Link>
        </div>

        {/* Mobile-optimized organic layout for the 4 concepts */}
        <div className="mt-8 flex flex-col items-center gap-2.5 sm:hidden z-10 w-full px-2">
          <div className="flex items-center justify-center gap-3 w-full">
            <Link
              href="/notes/labs"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-surface-1 border border-hairline text-xs font-mono tracking-[0.18em] uppercase text-ink-3"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              INTERACT
            </Link>
            <span className="text-ink-3/30">·</span>
            <Link
              href="/notes/quizzes"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-surface-1 border border-hairline text-xs font-mono tracking-[0.18em] uppercase text-ink-3"
            >
              PRACTICE
              <span className="text-highlight text-[10px] font-bold">✓</span>
            </Link>
          </div>
          <div className="flex items-center justify-center">
            <Link
              href="/notes/cheat-sheets"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-highlight/10 border border-highlight/30 text-xs font-mono tracking-[0.18em] uppercase text-highlight"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-highlight" />
              REVISE
            </Link>
          </div>
        </div>

        {/* =========================================================
            "WHAT ARE YOU CURIOUS ABOUT?" INVITATION SECTION
            Clean, intentional prompt leading seamlessly down to #worlds
            ========================================================= */}
        <div className="mt-20 sm:mt-24 md:mt-28 flex flex-col items-center">
          <p className="text-sm sm:text-base md:text-lg uppercase tracking-[0.24em] text-ink-1 font-bold">
            What are you curious about?
          </p>

          {/* Downward arrow button with gentle hover & drift */}
          <a
            href="#latest-heading"
            className="group mt-5 flex flex-col items-center text-ink-3 hover:text-ink-1 transition-colors cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-accent rounded-full p-1"
            aria-label="Scroll down to the latest writing"
          >
            <div className="hero-arrow-drift p-2 rounded-full border border-hairline/70 hover:border-hairline-strong bg-surface-1/40 hover:bg-surface-2 transition-all">
              <svg
                className="w-4 h-4 text-ink-2 group-hover:text-ink-1 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
