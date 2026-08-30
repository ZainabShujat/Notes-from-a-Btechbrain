import Link from "next/link";
import PageHeader from "../components/ui/PageHeader";
import { pageMetadata } from "../../lib/seo";

export const metadata = pageMetadata({
  title: "About",
  description:
    "The intellectual home of Zainab Shujat — a place where writing, building, career exploration, and curiosity all live together.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 md:px-8 py-16 md:py-24">
      <div>
        <PageHeader eyebrow="About" title="About Notes From a B Tech Brain" />

        <p className="text-lg text-ink-2 leading-relaxed mb-4">
          Notes From a B Tech Brain is an intellectual home — a place where
          writing, building, career exploration, and curiosity all live
          together.
        </p>

        <p className="text-lg text-ink-2 leading-relaxed mb-4">
          What started as a small LinkedIn newsletter slowly evolved into
          something larger: a living archive of questions, experiments,
          observations, breakdowns, rebuilds, and late-night realizations.
        </p>

        <p className="text-lg text-ink-2 leading-relaxed mb-6">
          It is not a blog. It is not a portfolio. It is a place for curious
          people figuring things out.
        </p>

        <h2 className="text-2xl font-semibold mt-12 mb-4 text-ink-1">
          What You&apos;ll Find Here
        </h2>

        <div className="space-y-3 mb-8">
          <Link
            href="/notes"
            className="block rounded-lg bg-surface-1 border border-hairline px-5 py-3 hover:bg-surface-2 transition-colors"
          >
            <span className="font-semibold text-ink-1">✍️ Notes</span>
            <span className="text-ink-3 text-sm ml-2">
              — Essays, explorations, and reflections
            </span>
          </Link>
          <Link
            href="/builds"
            className="block rounded-lg bg-surface-1 border border-hairline px-5 py-3 hover:bg-surface-2 transition-colors"
          >
            <span className="font-semibold text-ink-1">🔨 Builds</span>
            <span className="text-ink-3 text-sm ml-2">
              — Things I&apos;ve made and what I learned
            </span>
          </Link>
          <Link
            href="/work"
            className="block rounded-lg bg-surface-1 border border-hairline px-5 py-3 hover:bg-surface-2 transition-colors"
          >
            <span className="font-semibold text-ink-1">
              🌍 Worlds of Work
            </span>
            <span className="text-ink-3 text-sm ml-2">
              — Career exploration from the inside
            </span>
          </Link>
          <Link
            href="/wonder"
            className="block rounded-lg bg-surface-1 border border-hairline px-5 py-3 hover:bg-surface-2 transition-colors"
          >
            <span className="font-semibold text-ink-1">🌀 Wonder</span>
            <span className="text-ink-3 text-sm ml-2">
              — Strange connections and internet observations
            </span>
          </Link>
          <Link
            href="/books"
            className="block rounded-lg bg-surface-1 border border-hairline px-5 py-3 hover:bg-surface-2 transition-colors"
          >
            <span className="font-semibold text-ink-1">📖 Books</span>
            <span className="text-ink-3 text-sm ml-2">
              — Long-form writing in progress
            </span>
          </Link>
        </div>

        {/* Origin video — demoted hero */}
        <h2 className="text-2xl font-semibold mt-12 mb-4 text-ink-1">
          Where It Started
        </h2>

        <div className="rounded-xl overflow-hidden border border-hairline mb-6">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full aspect-video object-cover"
          >
            <source src="/videos/brain-hero-1.mp4" type="video/mp4" />
          </video>
        </div>

        <p className="text-lg text-ink-2 leading-relaxed mb-6">
          From a static blog to a structured content system to a CMS to a
          platform — and now into a world. Nine versions deep, every
          redesign reflects a different stage of learning.
        </p>

        <h2 className="text-2xl font-semibold mt-12 mb-4 text-ink-1">
          The Builder
        </h2>

        <p className="text-lg text-ink-2 leading-relaxed mb-4">
          Created and maintained by{" "}
          <span className="font-semibold text-ink-1">Zainab Shujat</span>, a
          CSE AI/ML student exploring technology, writing, systems,
          storytelling, and digital experiences through both code and
          reflection.
        </p>

        <p className="text-lg text-ink-2 leading-relaxed mb-6">
          Everything here — from the writing to the platform itself — is
          being built and refined in public.
        </p>

        <h2 className="text-2xl font-semibold mt-12 mb-4 text-ink-1">
          Ongoing Evolution
        </h2>

        <div className="mb-10">
          <p className="text-ink-2 text-lg mb-2">
            Notes From a B Tech Brain is intentionally unfinished.
          </p>

          <ul className="list-disc pl-6 space-y-2 text-ink-2 text-lg">
            <li>
              <span className="font-semibold text-ink-1">v0.1</span> → Static
              blog beginnings
            </li>
            <li>
              <span className="font-semibold text-ink-1">v0.3</span> →
              Structured content systems
            </li>
            <li>
              <span className="font-semibold text-ink-1">v0.5</span> →
              Navigation &amp; UX redesigns
            </li>
            <li>
              <span className="font-semibold text-ink-1">v0.7</span> →
              Engagement features &amp; interaction
            </li>
            <li>
              <span className="font-semibold text-ink-1">v0.9</span> → Backend
              publishing &amp; platform shift
            </li>
            <li>
              <span className="font-semibold text-highlight">v1.0</span> → The
              world
            </li>
          </ul>

          <p className="text-ink-2 text-lg mt-4">
            The platform grows alongside the person building it.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-12 mb-4 text-ink-1">
          Portfolio
        </h2>

        <p className="text-lg text-ink-2 leading-relaxed mb-6">
          If you want to see what I&apos;m building beyond writing:
          <br />
          <span role="img" aria-label="point right">
            👉
          </span>{" "}
          <a
            href="https://zainabshujat.dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 text-accent-soft font-medium hover:text-ink-1 transition-colors"
          >
            zainabshujat.dev
          </a>
        </p>

        <h2 className="text-2xl font-semibold mt-12 mb-4 text-ink-1">
          Let&apos;s Connect
        </h2>

        <p className="text-lg text-ink-2 leading-relaxed">
          If something here resonates,
          <br />
          or you&apos;re building something of your own —
          <br />
          Let&apos;s talk.
          <br />
          I&apos;m always up for real conversations.
        </p>
      </div>
    </main>
  );
}