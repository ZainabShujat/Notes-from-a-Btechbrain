import { WorkedExampleContent } from "../../../../lib/notebooks/types";

export default function WorkedExamplePage({ content }: { content: WorkedExampleContent }) {
  return (
    <div className="space-y-3.5 pt-1">
      {/* Header */}
      <div>
        {content.examContext && (
          <span className="text-[10px] font-mono uppercase tracking-widest text-amber-700 font-bold block mb-1">
            {content.examContext}
          </span>
        )}
        <h3 className="font-handwriting text-2xl sm:text-3xl font-bold text-[#1e1b4b] leading-tight">
          <span className="bg-violet-500/10 px-2 py-0.5 rounded-[3px]">
            {content.heading}
          </span>
        </h3>
      </div>

      {/* Problem Statement */}
      <div className="p-3.5 rounded-lg border border-[#d6cfbe] bg-white/70 text-xs sm:text-sm text-[#1c1917] leading-relaxed">
        <span className="text-[10px] font-mono font-bold uppercase text-[#7c3aed] block mb-1">
          Problem Statement:
        </span>
        {content.problem}
      </div>

      {/* Given Data Grid */}
      {content.given && content.given.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
          {content.given.map((g, i) => (
            <div key={i} className="p-2 rounded border border-[#d6cfbe] bg-white/50">
              <span className="text-[#78716c] text-[9px] uppercase block">{g.label}</span>
              <span className="font-bold text-[#1c1917]">{g.value}</span>
            </div>
          ))}
        </div>
      )}

      {/* Step by step derivation */}
      <div className="space-y-2.5 pt-1">
        {content.steps.map((st) => (
          <div key={st.stepNumber} className="pl-3 border-l-2 border-[#7c3aed] space-y-1">
            <span className="text-xs font-mono font-bold text-[#7c3aed]">
              Step {st.stepNumber}: {st.title}
            </span>
            <p className="text-xs text-[#374151] leading-relaxed">{st.explanation}</p>
            {st.formula && (
              <div className="font-mono text-[11px] text-[#1c1917] bg-white/80 px-2.5 py-1 rounded border border-[#d6cfbe]">
                {st.formula}
              </div>
            )}
            {st.result && (
              <span className="text-xs font-mono text-emerald-700 font-bold block">
                ↳ Result: {st.result}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Final Answer */}
      <div className="p-2.5 rounded-lg border border-emerald-500/40 bg-emerald-500/10 flex items-center justify-between text-xs sm:text-sm font-mono">
        <span className="text-emerald-400 font-bold uppercase">Final Answer:</span>
        <span className="text-ink-1 font-bold">{content.finalAnswer}</span>
      </div>

      {/* Handwritten Takeaway */}
      {content.handwrittenTakeaway && (
        <p className="font-handwriting text-base text-amber-500 font-semibold pt-1">
          {content.handwrittenTakeaway}
        </p>
      )}
    </div>
  );
}
