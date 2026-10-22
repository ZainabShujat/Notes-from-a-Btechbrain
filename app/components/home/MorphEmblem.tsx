import { getMorph, MORPH_DURATION, MORPH_LABELS } from "../../../lib/home/morph";

type Props = {
  notebookCount: number;
  labCount: number;
};

const LABEL_PROPS = {
  x: 150,
  y: 328,
  textAnchor: "middle",
  fontSize: 19,
  fontWeight: 700,
  letterSpacing: 1.6,
  className: "hm-mono",
} as const;

/**
 * The hero emblem. SMIL does the morphing, so it runs without client JS;
 * CSS swaps in the still brain for reduced motion or when paused.
 */
export default function MorphEmblem({ notebookCount, labCount }: Props) {
  const m = getMorph();
  const labels = MORPH_LABELS.map((label, i) => ({
    ...label,
    text:
      i === 1 ? `UNDERSTAND · ${notebookCount} notebooks` : i === 2 ? `INTERACT · ${labCount} labs` : label.text,
  }));
  const anim = { dur: MORPH_DURATION, repeatCount: "indefinite", keyTimes: m.keyTimes };

  return (
    <div className="hm-emblem hm-rise">
      <svg
        className="hm-emblem-anim"
        data-smil
        viewBox="0 0 300 340"
        role="img"
        aria-label="A brain that morphs into a notebook, a lab gear, a cheat sheet and a lightbulb: the sections of this site"
      >
        <defs>
          <linearGradient id="hm-mstroke" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#a855f7">
              <animate attributeName="stop-color" values={m.stopA} {...anim} />
            </stop>
            <stop offset="1" stopColor="#facc15">
              <animate attributeName="stop-color" values={m.stopB} {...anim} />
            </stop>
          </linearGradient>
          <radialGradient id="hm-mfill" cx="0.4" cy="0.35" r="0.75">
            <stop offset="0" stopColor="rgba(250,204,21,0.30)" />
            <stop offset="0.6" stopColor="rgba(168,85,247,0.22)" />
            <stop offset="1" stopColor="rgba(168,85,247,0.04)" />
          </radialGradient>
          <filter id="hm-mglow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="7" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <circle cx="150" cy="150" r="138" fill="none" stroke="rgba(196,181,253,0.16)" strokeDasharray="2 6" />
        <path
          d={m.still}
          fill="url(#hm-mfill)"
          stroke="url(#hm-mstroke)"
          strokeWidth="3.2"
          strokeLinejoin="round"
          filter="url(#hm-mglow)"
        >
          <animate attributeName="d" values={m.values} calcMode="spline" keySplines={m.keySplines} {...anim} />
        </path>
        <g>
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 150 150"
            to="360 150 150"
            dur="14s"
            repeatCount="indefinite"
          />
          <circle cx="150" cy="12" r="3.5" fill="#facc15" />
          <circle cx="288" cy="150" r="2.4" fill="#c4b5fd" />
          <circle cx="52" cy="250" r="2" fill="#f5f3ff" />
        </g>
        {labels.map((label, i) => (
          <text key={label.text} {...LABEL_PROPS} fill={label.color} opacity={i === 0 ? 1 : 0}>
            {label.text}
            <animate attributeName="opacity" values={m.labelOpacity[i]} {...anim} />
          </text>
        ))}
      </svg>

      <svg className="hm-emblem-still" viewBox="0 0 300 340" role="img" aria-label="A brain, the emblem of this site">
        <path d={m.still} fill="rgba(168,85,247,0.18)" stroke="#a855f7" strokeWidth="3.2" strokeLinejoin="round" />
        <text {...LABEL_PROPS} fill={labels[0].color}>
          {labels[0].text}
        </text>
      </svg>
    </div>
  );
}
