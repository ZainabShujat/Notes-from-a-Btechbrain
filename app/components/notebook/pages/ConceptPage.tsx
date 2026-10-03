import { ConceptPageContent } from "../../../../lib/notebooks/types";

export default function ConceptPage({ content }: { content: ConceptPageContent }) {
  return (
    <div className="space-y-4">
      {/* Page Header */}
      <div>
        {content.subheading && (
          <span className="text-[10px] font-mono uppercase tracking-widest text-ink-3 block mb-1">
            {content.subheading}
          </span>
        )}
        <h3 className="font-handwriting text-2xl sm:text-3xl font-bold text-ink-1 leading-tight">
          <span className="bg-violet-500/10 dark:bg-violet-500/20 px-2 py-0.5 rounded-[3px]">
            {content.heading}
          </span>
        </h3>
      </div>

      {/* Handwritten Student Observation / Annotation */}
      {content.handwrittenNote && (
        <div className="py-1 px-2.5 rounded bg-accent/5 border-l-2 border-accent/60">
          <p className="font-handwriting text-base sm:text-lg text-accent font-semibold leading-snug">
            {content.handwrittenNote}
          </p>
        </div>
      )}

      {/* Primary Reading Paragraphs */}
      <div className="space-y-3 text-xs sm:text-sm text-ink-2 leading-relaxed font-sans">
        {content.paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      {/* Key Bullets */}
      {content.bullets && content.bullets.length > 0 && (
        <ul className="space-y-1.5 pt-1 text-xs sm:text-sm text-ink-2">
          {content.bullets.map((b, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-accent font-bold text-xs mt-0.5">&bull;</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Callout Card (Student Note Artifact) */}
      {content.callout && (
        <div
          className={`p-3.5 rounded-lg border text-xs sm:text-sm ${
            content.callout.kind === "trap"
              ? "border-amber-500/40 bg-amber-500/5 text-ink-2"
              : "border-accent/40 bg-accent/5 text-ink-2"
          }`}
        >
          <div className="flex items-center gap-1.5 mb-1">
            <span
              className={`font-handwriting text-base font-bold ${
                content.callout.kind === "trap" ? "text-amber-500" : "text-accent"
              }`}
            >
              {content.callout.kind === "trap"
                ? "✎ ⚠ common trap:"
                : content.callout.kind === "exam-tip"
                ? "✎ ★ remember for exam:"
                : "✎ core intuition:"}
            </span>
            <span className="text-[10px] font-mono uppercase font-bold text-ink-3">
              {content.callout.title}
            </span>
          </div>
          <p className="leading-relaxed">{content.callout.message}</p>
        </div>
      )}

      {/* Key Takeaway */}
      {content.keyTakeaway && (
        <div className="pt-2 border-t border-hairline/60">
          <p className="font-handwriting text-base text-accent font-semibold">
            ✎ Takeaway: {content.keyTakeaway}
          </p>
        </div>
      )}
    </div>
  );
}
