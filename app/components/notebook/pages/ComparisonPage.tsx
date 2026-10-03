import { ComparisonContent } from "../../../../lib/notebooks/types";

export default function ComparisonPage({ content }: { content: ComparisonContent }) {
  return (
    <div className="space-y-4 pt-1">
      {/* Header */}
      <div>
        <span className="text-[10px] font-mono uppercase tracking-widest text-[#78716c] block mb-1">
          ARCHITECTURAL COMPARISON &amp; TRADEOFFS
        </span>
        <h3 className="text-lg sm:text-xl font-bold text-[#1e1b4b] font-sans leading-tight">
          {content.heading}
        </h3>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto rounded-xl border border-[#d6cfbe] bg-white/70">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-[#d6cfbe] bg-[#f5ede0]/60 text-[#78716c] font-mono uppercase text-[10px]">
              <th className="py-2.5 px-3 font-semibold">Aspect</th>
              <th className="py-2.5 px-3 font-semibold text-[#7c3aed]">{content.columns[0]}</th>
              <th className="py-2.5 px-3 font-semibold text-[#1c1917]">{content.columns[1]}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e7e5e4] text-[#374151]">
            {content.rows.map((r, i) => (
              <tr key={i} className="hover:bg-black/[0.02]">
                <td className="py-2.5 px-3 font-mono font-bold text-[#1c1917] text-[11px]">{r.criterion}</td>
                <td className="py-2.5 px-3 leading-relaxed">{r.col1}</td>
                <td className="py-2.5 px-3 leading-relaxed">{r.col2}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Handwritten Takeaway */}
      {content.handwrittenTakeaway && (
        <div className="py-2 px-3 rounded bg-violet-500/10 border-l-2 border-[#7c3aed]">
          <p className="font-handwriting text-base text-[#7c3aed] font-semibold leading-snug">
            {content.handwrittenTakeaway}
          </p>
        </div>
      )}
    </div>
  );
}
