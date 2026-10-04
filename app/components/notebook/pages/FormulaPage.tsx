import { FormulaContent } from "../../../../lib/notebooks/types";

export default function FormulaPage({ content }: { content: FormulaContent }) {
  return (
    <div className="space-y-4 pt-1">
      {/* Header */}
      <div>
        <span className="text-[10px] font-mono uppercase tracking-widest text-amber-700 font-bold block mb-1">
          EQUATIONS &amp; MATHEMATICAL PRINCIPLES
        </span>
        <h3 className="text-lg sm:text-xl font-bold text-[#1e1b4b] font-sans leading-tight">
          {content.heading}
        </h3>
      </div>

      {content.handwrittenNote && (
        <p className="font-handwriting text-base sm:text-lg text-[#7c3aed] font-semibold leading-snug">
          {content.handwrittenNote}
        </p>
      )}

      {/* Formula List */}
      <div className="space-y-3">
        {content.formulas.map((f, i) => (
          <div key={i} className="p-3.5 rounded-lg border border-[#d6cfbe] bg-white/70 space-y-1.5">
            <span className="text-xs font-mono font-bold text-[#7c3aed] uppercase block">
              {f.name}
            </span>
            <div className="font-mono text-xs sm:text-sm text-[#1c1917] bg-[#faf8f5] p-2.5 rounded border border-[#d6cfbe]">
              {f.formula}
            </div>
            <p className="text-xs text-[#374151] leading-relaxed">{f.explanation}</p>
            {f.variables && f.variables.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-1.5 border-t border-[#e7e5e4] text-[11px] font-mono text-[#78716c]">
                {f.variables.map((v, vIdx) => (
                  <span key={vIdx}>
                    <strong className="text-[#1c1917]">{v.symbol}</strong>: {v.meaning}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {content.pitfall && (
        <div className="p-3 rounded-lg border border-amber-400 bg-amber-50 text-xs text-[#78350f]">
          <span className="font-handwriting text-base text-amber-700 font-bold block mb-0.5">
            ✎ ⚠ watch out:
          </span>
          <p>{content.pitfall}</p>
        </div>
      )}
    </div>
  );
}
