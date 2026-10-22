import Link from "next/link";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { pageMetadata } from "../../../lib/seo";
import { getReel, INSTAGRAM_URL, PILLARS, REELS, type Reel } from "../../../lib/reels";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return REELS.map((reel) => ({ slug: reel.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const reel = getReel(slug);
  if (!reel) return { title: "Not found" };

  return pageMetadata({
    title: reel.title,
    description: `${reel.hook} The full explanation and sources behind the reel.`,
    path: `/reels/${reel.slug}`,
    image: reel.cover,
  });
}

export default async function ReelPage({ params }: PageProps) {
  const { slug } = await params;
  const reel = getReel(slug);
  if (!reel) notFound();

  const index = REELS.indexOf(reel);
  const next = REELS[(index + 1) % REELS.length];
  const followUrl = reel.instagram ?? INSTAGRAM_URL;

  return (
    <main
      style={{ "--ac": reel.accent } as CSSProperties}
      className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8 py-12 md:py-20"
    >
      <Link href="/reels" className="text-sm font-semibold text-ink-3 hover:text-ink-1 transition-colors">
        ← All reels
      </Link>

      <div className="mt-8 grid gap-10 md:grid-cols-[260px_1fr] md:gap-14">
        <aside className="md:sticky md:top-28 md:self-start">
          <div className="mx-auto max-w-[220px] overflow-hidden rounded-xl border border-hairline bg-black shadow-lift md:max-w-none">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={reel.cover} alt={`Cover of the reel: ${reel.title}`} className="aspect-[9/16] w-full object-cover" />
          </div>
          {followUrl && (
            <a
              href={followUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex justify-center rounded-full border-2 border-[var(--ac)] px-4 py-2 text-sm font-bold text-ink-1 transition-colors hover:bg-surface-2"
            >
              {reel.instagram ? "Watch the reel ↗" : "Follow on Instagram ↗"}
            </a>
          )}
        </aside>

        <article className="min-w-0">
          <p className="m-0 text-xs font-bold uppercase tracking-[0.18em] text-ink-3">
            <span className="mr-2 inline-block h-2 w-2 rounded-full bg-[var(--ac)]" aria-hidden="true" />
            {PILLARS[reel.pillar].label}
          </p>
          <h1 className="mt-3 mb-0 text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.1] tracking-tight text-ink-1">
            {reel.title}
          </h1>
          <p className="mt-4 mb-0 text-lg text-ink-2 italic leading-relaxed">{reel.hook}</p>

          {reel.lead === "stat" && reel.stat && <Stat stat={reel.stat} />}
          {reel.lead === "list" && reel.list && <List list={reel.list} />}

          <ol className="mt-10 list-none space-y-6 p-0">
            {reel.steps.map((step, i) => (
              <li key={step.heading} className="flex gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--ac)] text-base font-black text-[#120e22]">
                  {i + 1}
                </span>
                <div>
                  <h2 className="m-0 text-xl font-bold text-ink-1">{step.heading}</h2>
                  <p className="mt-1 mb-0 text-ink-2 leading-relaxed">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>

          {reel.lead !== "stat" && reel.stat && <Stat stat={reel.stat} />}
          {reel.lead !== "list" && reel.list && <List list={reel.list} />}

          <p className="mt-12 mb-0 border-l-4 border-[var(--ac)] pl-4 text-2xl font-bold leading-snug text-ink-1">
            {reel.closer}
          </p>

          {reel.related && (
            <div className="mt-8 flex flex-wrap gap-3">
              {reel.related.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-full border border-hairline-strong bg-surface-2 px-4 py-2 text-sm font-semibold text-ink-1 transition-colors hover:bg-surface-3"
                >
                  {link.label} →
                </Link>
              ))}
            </div>
          )}

          <section className="mt-12 border-t border-hairline pt-6">
            <h2 className="m-0 text-xs font-bold uppercase tracking-[0.18em] text-ink-3">Sources</h2>
            <ul className="mt-3 mb-0 space-y-1.5 pl-5 text-sm text-ink-2 leading-relaxed">
              {reel.sources.map((source) => (
                <li key={source}>{source}</li>
              ))}
            </ul>
          </section>

          {next !== reel && (
            <Link
              href={`/reels/${next.slug}`}
              className="group mt-12 flex items-center justify-between gap-4 rounded-xl border border-hairline bg-surface-1 p-5 transition-all duration-300 hover:bg-surface-2 hover:border-hairline-strong"
            >
              <div>
                <p className="m-0 text-xs font-bold uppercase tracking-[0.18em] text-ink-3">Next reel</p>
                <p className="mt-1 mb-0 text-lg font-bold text-ink-1 group-hover:text-accent-soft transition-colors">
                  {next.title}
                </p>
              </div>
              <span className="text-xl text-ink-3 transition-transform group-hover:translate-x-1" aria-hidden="true">
                →
              </span>
            </Link>
          )}
        </article>
      </div>
    </main>
  );
}

/** A dark panel in both themes, so the light reel accents stay readable. */
function Stat({ stat }: { stat: NonNullable<Reel["stat"]> }) {
  return (
    <div className="mt-10 rounded-xl bg-[#0f0c1c] p-6 md:p-8 text-white">
      <p className="m-0 text-6xl md:text-7xl font-black tracking-tight text-[var(--ac)]">{stat.big}</p>
      <p className="mt-3 mb-0 text-xl font-bold">{stat.heading}</p>
      <p className="mt-2 mb-0 text-white/80 leading-relaxed">{stat.body}</p>
    </div>
  );
}

function List({ list }: { list: NonNullable<Reel["list"]> }) {
  return (
    <section className="mt-10">
      <h2 className="m-0 text-2xl font-bold text-ink-1">{list.title}</h2>
      <ul className="mt-4 mb-0 grid list-none gap-3 p-0 sm:grid-cols-2">
        {list.items.map((item) => (
          <li key={item.title} className="flex gap-3 rounded-xl border border-hairline bg-surface-1 p-4">
            <span className="text-2xl leading-none" aria-hidden="true">
              {item.icon}
            </span>
            <div>
              <p className="m-0 font-bold text-ink-1">{item.title}</p>
              <p className="mt-1 mb-0 text-sm text-ink-2 leading-relaxed">{item.body}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
