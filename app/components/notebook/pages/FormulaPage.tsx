import { FormulaContent } from "../../../../lib/notebooks/types";

export default function FormulaPage({ content }: { content: FormulaContent }) {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <span className="text-[10px] font-mono uppercase tracking-widest text-amber-500 font-bold block mb-1">
          EQUATIONS &amp; MATHEMATICAL PRINCIPLES
        </span>
        <h3 className="text-lg sm:text-xl font-bold text-ink-1 font-sans leading-tight">
          {content.heading}
        </h3>
      </div>

      {content.handwrittenNote && (
        <p className="font-handwriting text-base sm:text-lg text-accent font-semibold leading-snug">
          {content.handwrittenNote}
        </p>
      )}

      {/* Formula List */}
      <div className="space-y-3">
        {content.formulas.map((f, i) => (
          <div key={i} className="p-3 rounded-lg border border-hairline/80 bg-surface-1/40 space-y-1.5">
            <span className="text-xs font-mono font-bold text-accent uppercase block">
              {f.name}
            </span>
            <div className="font-mono text-xs sm:text-sm text-ink-1 bg-surface-2/60 p-2 rounded border border-hairline/40">
              {f.formula}
            </div>
            <p className="text-xs text-ink-2 leading-relaxed">{f.explanation}</p>
            {f.variables && f.variables.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-1 border-t border-hairline/40 text-[11px] font-mono text-ink-3">
                {f.variables.map((v, vIdx) => (
                  <span key={vIdx}>
                    <strong className="text-ink-1">{v.symbol}</strong>: {v.meaning}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {content.pitfall && (
        <div className="p-2.5 rounded-lg border border-amber-500/40 bg-amber-500/5 text-xs text-ink-2">
          <span className="font-handwriting text-base text-amber-500 font-bold block mb-0.5">
            ✎ ⚠ watch out:
          </span>
          <p>{content.pitfall}</p>
        </div>
      )}
    </div>
  );
}
