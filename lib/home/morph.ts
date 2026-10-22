/**
 * Shapes for the homepage emblem morph: brain -> notebook -> lab gear ->
 * cheat sheet -> lightbulb -> brain. Every shape is resampled to the same
 * number of points, starting at the top and running clockwise, so SVG SMIL
 * can interpolate the `d` attribute between them without JavaScript.
 */

type Point = [number, number];

const N = 180;
const TAU = Math.PI * 2;

/** Seconds each shape rests, and seconds spent morphing to the next. */
const HOLD = 1.1;
const MOVE = 0.6;
const SHAPES = 5;

export const MORPH_DURATION = `${(SHAPES * (HOLD + MOVE)).toFixed(1)}s`;

export const MORPH_LABELS = [
  { text: "a B.Tech brain", color: "var(--theme-highlight)" },
  { text: "UNDERSTAND · notebooks", color: "var(--theme-accent-soft)" },
  { text: "INTERACT · labs", color: "var(--theme-highlight)" },
  { text: "REVISE · cheat sheets", color: "var(--theme-ink-1)" },
  { text: "WONDER · curious questions", color: "var(--theme-highlight)" },
];

function radial(fn: (t: number) => Point): Point[] {
  return Array.from({ length: N }, (_, k) => fn(-Math.PI / 2 + (TAU * k) / N));
}

function arc(cx: number, cy: number, r: number, a0: number, a1: number, steps: number): Point[] {
  return Array.from({ length: steps + 1 }, (_, i) => {
    const a = ((a0 + ((a1 - a0) * i) / steps) * Math.PI) / 180;
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  });
}

/** Evenly respaces a closed outline to N points by arc length. */
function resample(pts: Point[]): Point[] {
  const closed = [...pts, pts[0]];
  const seg: number[] = [];
  let total = 0;
  for (let i = 0; i < closed.length - 1; i++) {
    const l = Math.hypot(closed[i + 1][0] - closed[i][0], closed[i + 1][1] - closed[i][1]);
    seg.push(l);
    total += l;
  }
  const out: Point[] = [];
  let i = 0;
  let acc = 0;
  for (let k = 0; k < N; k++) {
    const target = (total * k) / N;
    while (i < seg.length - 1 && acc + seg[i] < target) {
      acc += seg[i];
      i++;
    }
    const f = seg[i] ? (target - acc) / seg[i] : 0;
    out.push([
      closed[i][0] + (closed[i + 1][0] - closed[i][0]) * f,
      closed[i][1] + (closed[i + 1][1] - closed[i][1]) * f,
    ]);
  }
  return out;
}

const toPath = (pts: Point[]) =>
  "M" + pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" L") + " Z";

/** Side-view brain: frontal lobe left, cerebellum and stem bottom right, folds rippled along the edge. */
function brain(): Point[] {
  const base = resample([
    [150, 52], [200, 50], [240, 66], [266, 96], [276, 132], [270, 168], [252, 192],
    [258, 212], [244, 232], [214, 236], [196, 222], [188, 236], [182, 262], [168, 262],
    [170, 232], [150, 222], [118, 224], [96, 214], [66, 206], [40, 182], [28, 150],
    [32, 114], [50, 82], [80, 60], [112, 50],
  ]);
  return base.map((pt, k) => {
    const prev = base[(k - 1 + N) % N];
    const next = base[(k + 1) % N];
    const tx = next[0] - prev[0];
    const ty = next[1] - prev[1];
    const len = Math.hypot(tx, ty) || 1;
    const onStem = pt[1] > 236 && pt[0] > 160 && pt[0] < 192;
    const bump = onStem ? 0 : 5 * Math.sin((k * TAU * 15) / N);
    return [pt[0] + (ty / len) * bump, pt[1] - (tx / len) * bump];
  });
}

const book = () =>
  resample([[150, 96], [205, 70], [262, 74], [262, 222], [205, 218], [150, 244], [95, 218], [38, 222], [38, 74], [95, 70]]);

const gear = () =>
  radial((t) => {
    const r = 92 + 17 * Math.tanh(3.5 * Math.sin(8 * t));
    return [150 + r * Math.cos(t), 150 + r * Math.sin(t)];
  });

const sheet = () => resample([[150, 40], [196, 40], [226, 70], [226, 262], [150, 262], [74, 262], [74, 40]]);

const bulb = () =>
  resample([
    ...arc(150, 118, 78, -90, 48, 40),
    [182, 206], [182, 236], [170, 252], [130, 252], [118, 236], [118, 206],
    ...arc(150, 118, 78, 132, 270, 40),
  ]);

/** Rest on each shape, then morph: s0 s0 s1 s1 ... s4 s4 s0. */
const ORDER = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 0];

export function getMorph() {
  const shapes = [brain(), book(), gear(), sheet(), bulb()].map(toPath);
  const total = SHAPES * (HOLD + MOVE);
  const times = [0];
  for (let i = 0; i < SHAPES; i++) {
    times.push(times[times.length - 1] + HOLD);
    times.push(times[times.length - 1] + MOVE);
  }
  const stopA = ["#a855f7", "#c4b5fd", "#facc15", "#f5f3ff", "#fde047"];
  const stopB = ["#facc15", "#a855f7", "#a855f7", "#facc15", "#a855f7"];

  return {
    still: shapes[0],
    values: ORDER.map((i) => shapes[i]).join(";"),
    keyTimes: times.map((t) => (t / total).toFixed(4)).join(";"),
    keySplines: ORDER.slice(1).map((_, j) => (j % 2 === 0 ? "0 0 1 1" : "0.7 0 0.3 1")).join(";"),
    stopA: ORDER.map((i) => stopA[i]).join(";"),
    stopB: ORDER.map((i) => stopB[i]).join(";"),
    labelOpacity: MORPH_LABELS.map((_, n) =>
      ORDER.map((__, j) => (j === 2 * n || j === 2 * n + 1 || (n === 0 && j === 10) ? 1 : 0)).join(";")
    ),
  };
}
