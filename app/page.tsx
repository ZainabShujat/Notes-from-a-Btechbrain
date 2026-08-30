import Link from "next/link";

const WORLDS = [
  {
    href: "/notes",
    verb: "I write",
    label: "Notes",
    description: "Essays, explorations, reflections, and questions about everything.",
    icon: "✍️",
  },
  {
    href: "/games",
    verb: "I play",
    label: "Games",
    description: "Browser games I've built. Play them right here.",
    icon: "🎮",
  },
  {
    href: "/work",
    verb: "I explore work",
    label: "The Work We Do",
    description: "What careers actually look like from the inside.",
    icon: "🌍",
  },
  {
    href: "/wonder",
    verb: "I wonder",
    label: "Wonder",
    description: "Strange connections, curiosity maps, and things the internet does.",
    icon: "🌀",
  },
  {
    href: "/books",
    verb: "I'm writing",
    label: "Books",
    description: "Long-form work, currently being handwritten.",
    icon: "📖",
  },
];

const THOUGHTS = [
  "Why do some careers become prestige symbols while others don't?",
  "How does an AI interview agent actually work under the hood?",
  "Why do humans find patterns in everything — even noise?",
  "What happens when you stop waiting to find your purpose?",
  "Why does debugging at 2 AM feel like therapy?",
  "What if the internet is the weirdest thing humans have ever built?",
  "Why does time feel faster the older you get?",
  "What do fractals, galaxies, and shells have in common?",
];

function getRotatingThought(): string {
  // Rotate daily based on day-of-year
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
  return THOUGHTS[dayOfYear % THOUGHTS.length];
}

export default function Home() {
  const thought = getRotatingThought();

  return (
    <main className="text-ink-2">
      {/* Portal */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 sm:px-6 md:px-8">
        {/* Subtle radial glow behind title */}
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(168, 85, 247, 0.08) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">
          {/* Identity */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight leading-[1.08]">
            <span className="text-ink-1">Notes From a </span>
            <span className="text-highlight">B.Tech Brain</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl md:text-2xl text-ink-2 max-w-xl leading-relaxed">
            A place to explore things I don&apos;t understand yet.
          </p>

          {/* Rotating thought */}
          <div className="mt-12 md:mt-16 rounded-xl border border-hairline bg-surface-1 backdrop-blur-md px-6 py-5 max-w-lg">
            <p className="text-xs uppercase tracking-[0.2em] text-ink-2 font-semibold mb-2">
              Today I&apos;m thinking about
            </p>
            <p className="text-base md:text-lg text-ink-1 leading-relaxed italic">
              &ldquo;{thought}&rdquo;
            </p>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-ink-2 animate-pulse">
          <span className="text-xs tracking-widest uppercase">Explore</span>
          <svg
            className="w-4 h-4"
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
      </section>

      {/* Five Worlds */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 md:px-8 py-16 md:py-24">
        <div className="flex flex-col gap-4">
          {WORLDS.map((world) => (
            <Link
              key={world.href}
              href={world.href}
              className="group flex items-start gap-4 md:gap-6 rounded-xl border border-hairline bg-surface-1/50 backdrop-blur-sm px-5 py-5 md:px-7 md:py-6 transition-all duration-300 hover:bg-surface-2 hover:border-hairline-strong hover:shadow-lift hover:-translate-y-0.5"
            >
              <span
                className="text-2xl md:text-3xl mt-0.5 shrink-0"
                aria-hidden="true"
              >
                {world.icon}
              </span>

              <div className="min-w-0">
                <p className="text-xs uppercase tracking-[0.18em] text-accent-soft font-semibold mb-1">
                  {world.verb}
                </p>
                <h2 className="text-lg md:text-xl font-bold text-ink-1 group-hover:text-accent-soft transition-colors">
                  {world.label}
                </h2>
                <p className="mt-1 text-sm md:text-base text-ink-2 leading-relaxed">
                  {world.description}
                </p>
              </div>

              <svg
                className="w-5 h-5 text-ink-2 group-hover:text-accent-soft shrink-0 mt-2 ml-auto transition-all duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}