import { DOMAINS, PHASE_2, PHASE_3, PHASE_4 } from "./data";
import PageHeader from "../components/ui/PageHeader";
import { pageMetadata } from "../../lib/seo";

export const metadata = pageMetadata({
  title: "The Work We Do",
  description: "An exploration of professions across medicine, tech, science, law, and more, plus systems, comparisons, and reflections.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8 py-16 md:py-24">
      <PageHeader
        eyebrow="🌍 What I explore"
        title="The Work We Do"
        description="Not career advice. Career exploration. What do these professions actually look like — the systems, the trade-offs, the people?"
      />

      {/* Phase 1: Worlds of Work */}
      <section className="mb-16">
        <h2 className="text-2xl md:text-3xl font-bold text-ink-1 mb-6">Phase 1: Worlds of Work</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {DOMAINS.map((domain) => (
            <div key={domain.id} className="rounded-xl border border-hairline bg-surface-1 backdrop-blur-sm p-5 hover:bg-surface-2 transition-colors">
              <h3 className="font-semibold text-ink-1 mb-2">{domain.name}</h3>
              <p className="text-sm text-ink-2 leading-relaxed">
                {domain.examples.join(", ")}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Phase 2: Understanding Systems */}
      <section className="mb-16 rounded-xl border border-hairline bg-surface-1/30 p-6 md:p-8">
        <h2 className="text-2xl font-bold text-ink-1 mb-6 flex items-center gap-3">
          <span>🧠</span> Phase 2: Understanding Systems
        </h2>
        <ul className="space-y-4">
          {PHASE_2.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3 text-ink-2 text-base md:text-lg">
              <span className="text-accent-soft mt-1">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Phase 3: Comparisons */}
      <section className="mb-16 rounded-xl border border-hairline bg-surface-1/30 p-6 md:p-8">
        <h2 className="text-2xl font-bold text-ink-1 mb-6 flex items-center gap-3">
          <span>⚖️</span> Phase 3: Comparisons
        </h2>
        <ul className="space-y-4">
          {PHASE_3.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3 text-ink-2 text-base md:text-lg">
              <span className="text-accent-soft mt-1">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Phase 4: Reflection */}
      <section className="mb-8 rounded-xl border border-hairline bg-surface-1/30 p-6 md:p-8">
        <h2 className="text-2xl font-bold text-ink-1 mb-6 flex items-center gap-3">
          <span>🌱</span> Phase 4: Reflection
        </h2>
        <ul className="space-y-4">
          {PHASE_4.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3 text-ink-2 text-base md:text-lg">
              <span className="text-accent-soft mt-1">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

    </main>
  );
}
