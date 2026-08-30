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

      {/* Dynamic Content Surface */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 md:px-8 pb-24 md:pb-32">
        <div className="border-t border-hairline pt-16">
          <h2 className="text-xl md:text-2xl font-bold text-ink-1 mb-8">Currently Exploring</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Featured Note */}
            {latestNote && (
              <Link 
                href={`/post/${latestNote.slug}`}
                className="group flex flex-col justify-between rounded-xl border border-hairline bg-surface-1 p-6 transition-all hover:border-hairline-strong hover:bg-surface-2 hover:-translate-y-0.5 hover:shadow-lift"
              >
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xs font-semibold uppercase tracking-widest text-accent-soft">Recent Note</span>
                    <span className="w-1 h-1 rounded-full bg-hairline-strong"></span>
                    <span className="text-xs text-ink-3">
                      {new Date(latestNote.date || latestNote.created_at).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-ink-1 group-hover:text-accent-soft transition-colors line-clamp-2 leading-snug">
                    {latestNote.title}
                  </h3>
                  {latestNote.excerpt && (
                    <p className="mt-3 text-sm text-ink-2 line-clamp-3 leading-relaxed">
                      {latestNote.excerpt}
                    </p>
                  )}
                </div>
                <div className="mt-6 flex items-center text-xs font-semibold text-ink-3 group-hover:text-accent-soft transition-colors">
                  Read full note →
                </div>
              </Link>
            )}

            {/* Featured Wonder */}
            {latestWonder && (
              <Link 
                href={`/wonder/${latestWonder.id}`}
                className="group flex flex-col justify-between rounded-xl border border-hairline bg-surface-1 p-6 transition-all hover:border-hairline-strong hover:bg-surface-2 hover:-translate-y-0.5 hover:shadow-lift"
              >
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xs font-semibold uppercase tracking-widest text-accent-soft">Wonder</span>
                    <span className="w-1 h-1 rounded-full bg-hairline-strong"></span>
                    <span className="text-xs text-ink-3">
                      {new Date(latestWonder.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-ink-1 group-hover:text-accent-soft transition-colors leading-snug">
                    {latestWonder.title}
                  </h3>
                  <p className="mt-3 text-sm text-ink-2 line-clamp-3 leading-relaxed">
                    {latestWonder.body}
                  </p>
                </div>
                <div className="mt-6 flex items-center text-xs font-semibold text-ink-3 group-hover:text-accent-soft transition-colors">
                  View thought →
                </div>
              </Link>
            )}
          </div>
        </div>
      </section>

    </main>
  );
}
