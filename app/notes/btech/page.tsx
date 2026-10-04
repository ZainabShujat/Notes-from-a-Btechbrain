import Link from "next/link";
import { LEARNING_TRACKS } from "../../../lib/notes";
import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";
import { cx } from "../../components/ui/cx";
import { pageMetadata } from "../../../lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = pageMetadata({
  title: "B.Tech Study Tracks",
  description:
    "Structured study notes for B.Tech CS/IT subjects — intuitive explanations, interactive laboratory simulators, and university exam preparation.",
  path: "/notes/btech",
});

export default function BtechPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8 py-10 md:py-16">
      {/* Breadcrumb */}
      <nav className="mb-6 text-xs font-mono text-ink-3" aria-label="Breadcrumb">
        <ol className="flex items-center gap-1.5">
          <li>
            <Link href="/notes" className="hover:text-ink-1 transition-colors">
              Notes
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-ink-1 font-semibold">B.Tech Study Tracks</li>
        </ol>
      </nav>

      <PageHeader
        eyebrow="B.TECH COMPUTER SCIENCE & IT"
        title="B.Tech Study Tracks"
        description="Authentic student notes across core engineering subjects — first-principles explanations, interactive laboratory simulators, and semester exam mastery."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {LEARNING_TRACKS.map((subject) => (
          <Card
            key={subject.id}
            href={`/notes/${subject.slug}?view=btech`}
            padding="none"
            className="h-full hover:border-hairline-strong rounded-md"
          >
            <div className="p-5 md:p-6 flex flex-col h-full justify-between">
              <div>
                <div className="flex items-start gap-3 mb-3">
                  <span
                    aria-hidden="true"
                    className={cx(
                      "mt-1 h-2.5 w-2.5 shrink-0 rounded-full",
                      subject.color
                    )}
                  />
                  <h3 className="font-bold text-ink-1 text-base md:text-lg leading-snug font-sans">
                    {subject.title}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-ink-2 leading-relaxed mb-4">
                  {subject.tagline}
                </p>
              </div>

              <div className="pt-3 border-t border-hairline/60">
                <div className="flex flex-wrap gap-2 text-[11px] font-mono text-ink-3 mb-3">
                  <span>{subject.topicCount} topics</span>
                  {subject.hasLabs && (
                    <>
                      <span>&middot;</span>
                      <span className="text-accent font-semibold">Laboratory Simulators</span>
                    </>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs font-mono text-ink-1">
                  <span>Explore B.Tech Syllabus</span>
                  <span>&rarr;</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </main>
  );
}
