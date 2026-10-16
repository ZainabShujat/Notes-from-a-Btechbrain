import Link from "next/link";
import PageHeader from "../components/ui/PageHeader";
import { pageMetadata } from "../../lib/seo";

export const metadata = pageMetadata({
  title: "Vibe Coding Without Losing Your Brain",
  description:
    "How to use AI coding tools mindfully as a B.Tech student: stay in charge of the code, check what the agent did, and know when not to hand over control.",
  path: "/vibe-coding",
});

/** The areas entries will be grouped under. Each entry will follow: concept, do, don't, why it matters, a 30-second check, sources. */
const PILLARS = [
  { name: "Security", line: "Generated code that works but lets the wrong people in." },
  { name: "Data & secrets", line: "API keys, .env files, and anything that should never reach git." },
  { name: "Reliability", line: "What happens when the network, the disk, or the other service fails." },
  { name: "Performance", line: "Code that is fine with ten rows and falls over with ten thousand." },
  { name: "Deployment", line: "The gap between 'works on my machine' and works for everyone." },
  { name: "Architecture & scaling", line: "Keeping a codebase coherent when an AI writes a lot of it." },
  { name: "Observability", line: "Knowing where to look when something breaks in production." },
  { name: "Process", line: "Git, small changes, and reviewing every diff before you accept it." },
  { name: "Prompting", line: "Giving the agent goals and checks instead of a solution to copy." },
  { name: "Staying sharp", line: "Debugging and reasoning skills you keep using, so you don't lose them." },
];

export default function VibeCodingPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 md:px-8 md:py-16">
      <PageHeader
        eyebrow="VIBE CODING"
        title="Vibe code without losing your brain"
        description="AI can write the code, but you're still responsible for what it does. This section is about doing it mindfully, or choosing not to."
      />

      <section aria-labelledby="rule-title" className="mt-10 rounded-2xl border border-hairline bg-surface-1 p-6">
        <h2 id="rule-title" className="text-xl font-bold text-ink-1">The one rule</h2>
        <p className="mt-3 leading-relaxed text-ink-2">
          Autopilot is the biggest mistake. Before you accept anything an agent wrote, you should be able to explain every
          change, point to a check that would fail if it broke, and say where you would look first if it failed. When you
          can&apos;t, writing that part by hand is a real option, not a failure.
        </p>
      </section>

      <section aria-labelledby="pillars-title" className="mt-12">
        <h2 id="pillars-title" className="text-2xl font-bold text-ink-1">What this section will cover</h2>
        <p className="mt-2 text-ink-3">
          Each entry will follow the same shape: the concept, what to do, what not to do, why it matters, a 30-second check
          you can run on your own code, and its sources.
        </p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {PILLARS.map((pillar) => (
            <li key={pillar.name} className="rounded-xl border border-hairline bg-surface-1 p-4">
              <span className="block font-semibold text-ink-1">{pillar.name}</span>
              <span className="mt-1 block text-sm text-ink-3">{pillar.line}</span>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="read-title" className="mt-12">
        <h2 id="read-title" className="text-2xl font-bold text-ink-1">Read so far</h2>
        <Link
          href="/post/vibe-coding-without-losing-brain"
          className="mt-4 block rounded-xl border border-hairline bg-surface-1 p-5 transition-colors hover:bg-surface-2"
        >
          <span className="block text-xs font-mono uppercase tracking-wider text-ink-3">Edition</span>
          <span className="mt-1 block text-lg font-semibold text-ink-1">The Code Was the Last Thing I Did</span>
        </Link>
      </section>
    </main>
  );
}
