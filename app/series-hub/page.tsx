import Link from "next/link";
import PageHeader from "../components/ui/PageHeader";
import Panel from "../components/ui/Panel";

const seriesList = [
  {
    title: "Friday Insights",
    description:
      "A reflective, empathetic series that explores the emotional undercurrents of everyday life–grief, resilience, growth, and the invisible battles we all carry. With a gentle, honest tone, these pieces invite readers to pause, feel, and find comfort in shared human experiences. Newcomers will discover wisdom in vulnerability and the reassurance that they’re not alone in their struggles.",
    category: "friday-insights",
    recommended: "September In a Nutshell",
  },
  {
    title: "World Watch",
    description:
      "A weekly digest of global events, World Watch distills complex international news–trade, politics, climate, sports–into clear, accessible stories. The tone is informative yet approachable, making world affairs feel relevant and understandable. Readers gain a broader perspective on current events and the interconnectedness of our world, all without jargon or overwhelm.",
    category: "world-watch",
    recommended: null,
  },
  {
    title: "Tech Pulse",
    description:
      "Tech Pulse captures the fast-moving world of technology, especially AI, with clarity and excitement. Each edition highlights key developments, explains why they matter, and connects them to everyday life. The writing is crisp and jargon-free, making even the most advanced topics feel approachable. Readers will stay updated and inspired, no matter their tech background.",
    category: "tech-pulse",
    recommended: null,
  },
  {
    title: "Girlhood and STEM Experiences",
    description:
      "A thoughtful exploration of what it means to be a girl in STEM, this series challenges stereotypes and celebrates genuine curiosity. The writing is honest and empowering, addressing the pressures, doubts, and triumphs unique to women in technical fields. New readers will find validation, encouragement, and a sense of community.",
    category: "girlhood-and-stem-experiences",
    recommended: "Girlhood in Defense Mode",
  },
];

export default function SeriesHubPage() {
  return (
    <main className="w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-16 md:py-24">
      <PageHeader
        eyebrow="Series"
        title="Series Hub"
        description="Explore the different universes of this blog. Each series is a journey–find the one that speaks to you, or sample them all."
      />

      <div className="flex flex-col gap-6">
        {seriesList.map((series) => (
          <Panel key={series.title} padding="lg" className="w-full">
            <h2 className="text-2xl md:text-3xl font-bold text-ink-1 mb-3 w-full wrap-break-word">{series.title}</h2>
            <p className="text-base md:text-lg text-ink-2 mb-4 w-full max-w-4xl">{series.description}</p>
            <Link
              href={`/category/${series.category}`}
              className="inline-block text-accent-soft underline underline-offset-2 font-semibold hover:text-ink-1 transition-colors text-base mb-2"
            >
              View all posts →
            </Link>
            {series.recommended && (
              <div className="mt-2">
                <span className="text-xs text-ink-3 mr-1">Recommended starting piece:</span>
                <Link
                  href={`/post/${series.recommended.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`}
                  className="text-accent-soft underline underline-offset-2 hover:text-ink-1 transition-colors text-base font-semibold"
                >
                  {series.recommended}
                </Link>
              </div>
            )}
          </Panel>
        ))}
      </div>
    </main>
  );
}
