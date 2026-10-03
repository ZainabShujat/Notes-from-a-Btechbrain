import { ComparisonContent } from "../../../../lib/notebooks/types";

export default function ComparisonPage({ content }: { content: ComparisonContent }) {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <span className="text-[10px] font-mono uppercase tracking-widest text-ink-3 block mb-1">
          ARCHITECTURAL COMPARISON &amp; TRADEOFFS
        </span>
        <h3 className="text-lg sm:text-xl font-bold text-ink-1 font-sans leading-tight">
          {content.heading}
        </h3>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto rounded-xl border border-hairline/80 bg-surface-1/30">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-hairline bg-surface-2/60 text-ink-3 font-mono uppercase text-[10px]">
              <th className="py-2.5 px-3 font-semibold">Aspect</th>
              <th className="py-2.5 px-3 font-semibold text-accent">{content.columns[0]}</th>
              <th className="py-2.5 px-3 font-semibold text-ink-1">{content.columns[1]}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-hairline text-ink-2">
            {content.rows.map((r, i) => (
              <tr key={i} className="hover:bg-surface-2/20">
                <td className="py-2 px-3 font-mono font-bold text-ink-1 text-[11px]">{r.criterion}</td>
                <td className="py-2 px-3 leading-relaxed">{r.col1}</td>
                <td className="py-2 px-3 leading-relaxed">{r.col2}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Handwritten Takeaway */}
      {content.handwrittenTakeaway && (
        <div className="py-2 px-3 rounded bg-accent/5 border-l-2 border-accent/60">
          <p className="font-handwriting text-base text-accent font-semibold leading-snug">
            {content.handwrittenTakeaway}
          </p>
        </div>
      )}
    </div>
  );
}
