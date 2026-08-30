import Link from "next/link";
import { getCombinedPosts } from "../lib/posts";
import Button from "./components/ui/Button";
import PostCard from "./components/PostCard";
import { NOINDEX } from "../lib/seo";

export const metadata = { title: "Lost the thread", ...NOINDEX };

const DESTINATIONS = [
  {
    href: "/start-here",
    label: "Start Here",
    hint: "Pick a way in based on how you feel",
  },
  {
    href: "/browse",
    label: "Explore",
    hint: "Every topic, series and theme",
  },
  {
    href: "/all-posts",
    label: "All Posts",
    hint: "Search the whole archive",
  },
  {
    href: "/map",
    label: "Brain Map",
    hint: "See how the ideas connect",
  },
];

export default async function NotFound() {
  // A dead end is the worst place to stop, so offer something real to read.
  let recent: Awaited<ReturnType<typeof getCombinedPosts>> = [];

  try {
    recent = (await getCombinedPosts())
      .sort(
        (a, b) =>
          new Date(b.date || b.created_at).getTime() -
          new Date(a.date || a.created_at).getTime()
      )
      .slice(0, 3);
  } catch {
    recent = [];
  }

  return (
    <main className="mx-auto w-full max-w-5xl px-4 sm:px-6 md:px-8 py-16 md:py-24">
      <section className="flex flex-col items-center text-center">
        {/* A stray node, drifting off the map. */}
        <svg
          viewBox="0 0 320 160"
          className="w-full max-w-md h-auto"
          role="img"
          aria-label="A constellation with one node drifting away from the rest"
        >
          <g
            stroke="var(--color-hairline-strong)"
            strokeWidth="1"
            fill="none"
          >
            <path d="M40 96 L84 60 L132 82 L176 48 L214 76" />
            <path d="M84 60 L96 108 L132 82" />
            <path d="M176 48 L188 96 L214 76" />
          </g>

          <g fill="var(--color-accent-soft)">
            <circle cx="40" cy="96" r="3.5" />
            <circle cx="84" cy="60" r="5" />
            <circle cx="132" cy="82" r="4" />
            <circle cx="96" cy="108" r="3" />
            <circle cx="176" cy="48" r="5" />
            <circle cx="188" cy="96" r="3" />
            <circle cx="214" cy="76" r="4" />
          </g>

          {/* the lost one */}
          <g className="stray">
            <circle
              cx="278"
              cy="122"
              r="7"
              fill="var(--color-highlight)"
              opacity="0.9"
            />
            <circle
              cx="278"
              cy="122"
              r="15"
              fill="none"
              stroke="var(--color-highlight)"
              strokeWidth="1"
              opacity="0.35"
            />
          </g>

          <path
            d="M222 88 C 246 98, 262 108, 272 116"
            stroke="var(--color-hairline)"
            strokeWidth="1"
            strokeDasharray="3 5"
            fill="none"
          />
        </svg>

        <p className="mt-8 text-xs font-semibold uppercase tracking-[0.18em] text-ink-3">
          404 — off the map
        </p>

        <h1 className="mt-4 text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.1] tracking-tight text-ink-1">
          This page isn&rsquo;t part of the map
        </h1>

        <p className="mt-4 max-w-xl text-base md:text-lg text-ink-2">
          The link may be broken, the post may have been renamed, or this
          thought may never have made it out of the drafts folder. Either way,
          there&rsquo;s plenty else to wander into.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button href="/" variant="primary" size="lg">
            Back to the homepage
          </Button>

          <Button href="/all-posts" variant="secondary" size="lg">
            Search all posts
          </Button>
        </div>
      </section>

      {/* Signposts */}
      <nav
        aria-label="Suggested destinations"
        className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        {DESTINATIONS.map((d) => (
          <Link
            key={d.href}
            href={d.href}
            className="group flex items-center justify-between gap-4 rounded-lg border border-hairline bg-surface-1 p-5 backdrop-blur-md transition-[transform,background-color,border-color] duration-200 hover:-translate-y-0.5 hover:bg-surface-2 hover:border-hairline-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <span className="min-w-0">
              <span className="block font-semibold text-ink-1">{d.label}</span>
              <span className="mt-0.5 block text-sm text-ink-2">{d.hint}</span>
            </span>

            <span
              aria-hidden="true"
              className="shrink-0 text-accent-soft transition-transform duration-200 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        ))}
      </nav>

      {recent.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-ink-3">
            Or start with something recent
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {recent.map((p) => (
              <PostCard
                key={p.slug}
                title={p.title}
                slug={p.slug}
                excerpt={p.excerpt}
                date={p.date}
                created_at={p.created_at}
                category={p.category}
                banner={p.banner}
                tags={p.tags}
              />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
