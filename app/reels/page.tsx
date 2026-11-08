import Link from "next/link";
import type { CSSProperties } from "react";
import PageHeader from "../components/ui/PageHeader";
import { pageMetadata } from "../../lib/seo";
import { ALL_REELS, INSTAGRAM_URL, SERIES } from "../../lib/reels";
import ReelCover from "./ReelCover";

export const metadata = pageMetadata({
  title: "Reels",
  description:
    "Every reel from Notes From a B.Tech Brain, with the full explanation and sources behind it.",
  path: "/reels",
});

const ELSEWHERE = [
  { href: "/notes", icon: "📚", title: "Notes", body: "18 GATE notebooks with derivations, labs and cheat sheets." },
  { href: "/editions", icon: "✍️", title: "Editions", body: "Essays on burnout, ambition, girlhood and tech." },
  { href: "/wonder", icon: "🌀", title: "Wonder", body: "Short observations about the strange things we do online." },
];

export default function ReelsPage() {
  // Series in their set order; within a series, the order they were made in.
  const series = SERIES.map((s) => ({
    ...s,
    reels: ALL_REELS.filter((r) => (r.series ?? "decoded") === s.key),
  })).filter((s) => s.reels.length > 0);

  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8 pt-8 pb-16 md:pt-10 md:pb-24">
      <PageHeader
        eyebrow="🎬 Came from a reel?"
        title="The story behind every reel"
        description="Each reel is 30 seconds. Here's the rest: the full explanation, the sources, and where to go deeper."
        actions={
          INSTAGRAM_URL && (
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-hairline-strong bg-surface-2 px-5 py-2 text-sm font-semibold text-ink-1 transition-colors hover:bg-surface-3"
            >
              Follow on Instagram ↗
            </a>
          )
        }
      />

      <p className="mt-0 mb-10 text-sm font-semibold uppercase tracking-wider text-ink-3">
        {ALL_REELS.length} reels · {series.length} series
      </p>

      {series.map(({ key, label, blurb, reels }) => (
        <section key={key} className="mb-14" aria-labelledby={`series-${key}`}>
          <div className="mb-5 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h2 id={`series-${key}`} className="m-0 text-2xl md:text-3xl font-bold text-ink-1">
              {label}
            </h2>
            <p className="m-0 text-sm text-ink-3">
              {reels.length} reel{reels.length === 1 ? "" : "s"} · {blurb}
            </p>
          </div>
          <ul className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4 list-none p-0 m-0">
            {reels.map((reel) => (
              <li key={reel.slug}>
                <Link
                  href={`/reels/${reel.slug}`}
                  style={{ "--ac": reel.accent } as CSSProperties}
                  className="group block overflow-hidden rounded-xl border border-hairline bg-surface-1 transition-all duration-300 hover:-translate-y-0.5 hover:border-hairline-strong hover:shadow-lift"
                >
                  <div className="relative overflow-hidden bg-black">
                    <ReelCover reel={reel} className="transition-transform duration-500 group-hover:scale-[1.03]" />
                  </div>
                  <div className="border-t-4 border-[var(--ac)] p-3 sm:p-4">
                    <h3 className="m-0 text-sm sm:text-base font-bold leading-snug text-ink-1">{reel.title}</h3>
                    <p className="mt-1 mb-0 text-xs sm:text-sm text-ink-3">
                      {reel.facts ? "Facts and sources →" : "Read the full story →"}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}

      <section className="mt-20">
        <h2 className="text-2xl md:text-3xl font-bold text-ink-1 mb-2">
          While you&apos;re here
        </h2>
        <p className="text-ink-2 mb-6 max-w-2xl">
          The reels are the trailer. The rest of the site is the notebook.
        </p>
        <div className="grid gap-4 md:grid-cols-3">
          {ELSEWHERE.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group rounded-xl border border-hairline bg-surface-1 p-5 transition-all duration-300 hover:bg-surface-2 hover:border-hairline-strong"
            >
              <span className="text-3xl" aria-hidden="true">
                {item.icon}
              </span>
              <h3 className="mt-3 mb-1 text-lg font-bold text-ink-1 group-hover:text-accent-soft transition-colors">
                {item.title}
              </h3>
              <p className="m-0 text-sm text-ink-2 leading-relaxed">{item.body}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
