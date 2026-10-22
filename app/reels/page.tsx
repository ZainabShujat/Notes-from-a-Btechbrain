import Link from "next/link";
import type { CSSProperties } from "react";
import PageHeader from "../components/ui/PageHeader";
import { pageMetadata } from "../../lib/seo";
import { INSTAGRAM_URL, PILLARS, REELS } from "../../lib/reels";

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
  const reels = [...REELS].sort((a, b) => +new Date(b.date) - +new Date(a.date));

  return (
    <main className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8 py-16 md:py-24">
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

      <ul className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 list-none p-0 m-0">
        {reels.map((reel) => (
          <li key={reel.slug}>
            <Link
              href={`/reels/${reel.slug}`}
              style={{ "--ac": reel.accent } as CSSProperties}
              className="group block overflow-hidden rounded-xl border border-hairline bg-surface-1 transition-all duration-300 hover:-translate-y-0.5 hover:border-hairline-strong hover:shadow-lift"
            >
              <div className="relative aspect-[9/16] overflow-hidden bg-black">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={reel.cover}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <span className="absolute left-2 top-2 rounded-full bg-black/70 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-[var(--ac)]">
                  {PILLARS[reel.pillar].label}
                </span>
              </div>
              <div className="border-t-4 border-[var(--ac)] p-3 sm:p-4">
                <h2 className="m-0 text-sm sm:text-base font-bold leading-snug text-ink-1">
                  {reel.title}
                </h2>
                <p className="mt-1 mb-0 text-xs sm:text-sm text-ink-3">
                  Read the full story →
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>

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
