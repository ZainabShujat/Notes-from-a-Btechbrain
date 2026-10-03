import { RevisionContent } from "../../../../lib/notebooks/types";

export default function RevisionPage({ content }: { content: RevisionContent }) {
  return (
    <div className="space-y-4 pt-1">
      {/* Header */}
      <div>
        <span className="text-[10px] font-mono uppercase tracking-widest text-amber-700 font-bold block mb-1">
          EXAM REVISION LAYER &middot; MEMORY ANCHOR
        </span>
        <h3 className="text-lg sm:text-xl font-bold text-[#1e1b4b] font-sans leading-tight">
          {content.heading}
        </h3>
      </div>

      {/* Core Invariant Banner */}
      <div className="p-3.5 rounded-lg border-l-4 border-l-amber-500 border border-[#d6cfbe] bg-[#fef9c3]/50 space-y-1">
        <span className="font-handwriting text-lg text-amber-800 font-bold block">
          ✎ core invariant &amp; rule:
        </span>
        <p className="text-xs sm:text-sm font-bold text-[#1c1917] leading-snug font-sans">
          &ldquo;{content.coreRule}&rdquo;
        </p>
      </div>

      {/* Two Column Memory & Traps */}
      <div className="space-y-3 pt-1">
        <div>
          <span className="font-handwriting text-base text-[#7c3aed] font-bold block mb-1">
            ✎ must-remember principles:
          </span>
          <ul className="space-y-1.5 text-xs text-[#374151]">
            {content.mustRemember.map((m, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-[#7c3aed] text-xs font-bold">&mdash;</span>
                <span className="leading-relaxed">{m}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <span className="font-handwriting text-base text-rose-600 font-bold block mb-1">
            ✎ ⚠ critical exam pitfalls:
          </span>
          <ul className="space-y-1.5 text-xs text-[#374151]">
            {content.criticalTraps.map((t, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-rose-600 text-xs font-bold">&mdash;</span>
                <span className="leading-relaxed">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
