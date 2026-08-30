import Link from "next/link";
import { OBSERVATIONS } from "./data";
import PageHeader from "../components/ui/PageHeader";
import { pageMetadata } from "../../lib/seo";
import FeedItem from "./FeedItem";

export const metadata = pageMetadata({
  title: "Wonder",
  description:
    "Strange connections, curiosity maps, and things the internet does — the weird, wonderful corner of B.Tech Brain.",
  path: "/wonder",
});

export default function WonderPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8 py-16 md:py-24">
      <PageHeader
        eyebrow="🌀 What I wonder about"
        title="Wonder"
        description="Strange connections, curiosity maps, and observations about the internet being weird."
      />

      {/* Daily Feed */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-ink-1">
            Daily Feed
          </h2>
        </div>
        <p className="text-ink-2 text-sm md:text-base mb-8 max-w-2xl leading-relaxed">
          Short observations about the strange things we do online, the
          patterns nobody talks about, and the quiet absurdity of digital life.
        </p>

        <div className="flex flex-col border-t border-hairline mt-8">
          {OBSERVATIONS.map((obs) => (
            <FeedItem key={obs.id} obs={obs} />
          ))}
        </div>
      </section>

      {/* Brain Map section */}
      <section className="mb-16">
        <Link
          href="/map"
          className="group flex items-center gap-5 rounded-xl border border-hairline bg-surface-1 backdrop-blur-sm px-6 py-6 md:px-8 md:py-8 transition-all duration-300 hover:bg-surface-2 hover:border-hairline-strong hover:shadow-lift hover:-translate-y-0.5"
        >
          <div className="flex flex-col items-center justify-center shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-xl bg-violet-500/10 border border-violet-500/20">
            <span className="text-3xl md:text-4xl" aria-hidden="true">
              🧠
            </span>
          </div>

          <div className="min-w-0">
            <h2 className="text-xl md:text-2xl font-bold text-ink-1 group-hover:text-accent-soft transition-colors">
              Brain Map
            </h2>
            <p className="mt-1 text-sm md:text-base text-ink-2 leading-relaxed">
              An interactive constellation of recurring ideas and how they
              connect — the atlas of curiosity behind every article.
            </p>
          </div>

          <svg
            className="w-6 h-6 text-ink-3 group-hover:text-accent-soft shrink-0 ml-auto transition-all duration-300 group-hover:translate-x-1"
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
      </section>

      {/* I Wonder Why Series */}
      <section className="mb-16">
        <Link
          href="/category/i-wonder-why"
          className="group flex items-center gap-5 rounded-xl border border-hairline bg-surface-1 backdrop-blur-sm px-6 py-6 md:px-8 md:py-8 transition-all duration-300 hover:bg-surface-2 hover:border-hairline-strong hover:shadow-lift hover:-translate-y-0.5"
        >
          <div className="flex flex-col items-center justify-center shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-xl bg-violet-500/10 border border-violet-500/20">
            <span className="text-3xl md:text-4xl" aria-hidden="true">
              🤔
            </span>
          </div>

          <div className="min-w-0">
            <h2 className="text-xl md:text-2xl font-bold text-ink-1 group-hover:text-accent-soft transition-colors">
              I Wonder Why Series
            </h2>
            <p className="mt-1 text-sm md:text-base text-ink-2 leading-relaxed">
              A collection of short, curious essays exploring the strange phenomena of everyday life, human behavior, and the natural world.
            </p>
          </div>

          <svg
            className="w-6 h-6 text-ink-3 group-hover:text-accent-soft shrink-0 ml-auto transition-all duration-300 group-hover:translate-x-1"
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
      </section>
    </main>
  );
}
