import Link from "next/link";
import { getCombinedPosts } from "../lib/posts";
import { OBSERVATIONS } from "./wonder/data";

const WORLDS = [
  {
    href: "/notes",
    verb: "READ",
    label: "Notes",
    description: "Essays, explorations, reflections, and questions about everything.",
    icon: "✍️",
  },
  {
    href: "/work",
    verb: "EXPLORE",
    label: "The Work We Do",
    description: "What careers actually look like from the inside.",
    icon: "🌍",
  },
  {
    href: "/wonder",
    verb: "WONDER",
    label: "Wonder",
    description: "Strange connections, curiosity maps, and things the internet does.",
    icon: "🌀",
  },
  {
    href: "/games",
    verb: "BUILD",
    label: "Games",
    description: "Browser games I've built. Play them right here.",
    icon: "🎮",
  },
  {
    href: "/books",
    verb: "GO DEEPER",
    label: "Books",
    description: "Long-form work, currently being handwritten.",
    icon: "📖",
  },
];

export default async function Home() {
  // Fetch latest interesting things
  const posts = await getCombinedPosts();
  const latestNote = posts[0];
  const latestWonder = OBSERVATIONS[0];

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

          {/* Core Prompt */}
          <div className="mt-16 md:mt-24">
            <p className="text-sm md:text-base uppercase tracking-[0.2em] text-ink-1 font-bold">
              What are you curious about?
            </p>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-ink-2 animate-pulse">
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
      <section className="mx-auto max-w-4xl px-4 sm:px-6 md:px-8 pb-16 md:pb-24">
        <div className="flex flex-col gap-4">
          {WORLDS.map((world) => (
            <Link
              key={world.href}
              href={world.href}
              className="group flex items-start gap-4 md:gap-6 rounded-xl border border-hairline bg-surface-1 backdrop-blur-sm px-5 py-5 md:px-7 md:py-6 transition-all duration-300 hover:bg-surface-2 hover:border-hairline-strong hover:shadow-lift hover:-translate-y-0.5"
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

      {/* Featured Wonder */}
      {latestWonder && (
        <section className="mx-auto max-w-2xl px-4 sm:px-6 md:px-8 pb-16 md:pb-24 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-ink-3 mb-4">
            Something worth wandering into
          </p>
          <Link href={`/wonder/${latestWonder.id}`} className="group block">
            <h3 className="text-xl md:text-2xl font-bold text-ink-1 group-hover:text-accent-soft transition-colors leading-snug mb-3">
              {latestWonder.title}
            </h3>
            <p className="text-sm md:text-base text-ink-2 leading-relaxed mb-4 line-clamp-2 max-w-lg mx-auto">
              {latestWonder.body}
            </p>
            <span className="text-sm font-medium text-ink-3 group-hover:text-accent-soft transition-colors">
              Read →
            </span>
          </Link>
        </section>
      )}

      {/* Helpful links below */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 md:px-8 pb-24 md:pb-32 flex flex-col items-center justify-center gap-6 text-sm text-ink-3">
        <Link href="/map" className="hover:text-ink-1 hover:underline underline-offset-4 transition-colors">
          The Brain Map →
        </Link>
        <Link href="/start-here" className="hover:text-ink-1 hover:underline underline-offset-4 transition-colors">
          Not sure where to begin? Start Here →
        </Link>
      </section>

    </main>
  );
}
