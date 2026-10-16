import Link from "next/link";
import { getCombinedPosts } from "../lib/posts";
import { OBSERVATIONS } from "./wonder/data";
import { SUBJECT_NOTEBOOKS } from "../lib/notebooks/data";
import { COURSE_LABS } from "../lib/labs";
import MorphEmblem from "./components/home/MorphEmblem";
import HomeMotion from "./components/home/HomeMotion";
import "./components/home/home.css";

export const metadata = {
  title: "Notes From a B.Tech Brain: the night-before notes for every B.Tech subject",
  description:
    "Free, student-written notes, one-page cheat sheets, and interactive labs for every B.Tech CSE subject, with GATE mapping where it helps.",
};

const VIBE_POST_SLUG = "vibe-coding-without-losing-brain";
const FEATURED_NOTEBOOKS = ["operating-systems", "dbms", "computer-networks"];

/** Loops at the top left, runs down the margins, and crosses only between sections. */
const THREAD_PATH =
  "M -30,110 C 60,40 150,80 156,160 C 162,250 70,268 62,206 C 54,140 140,118 176,176 " +
  "C 220,250 110,500 64,720 C 40,830 90,880 260,890 C 520,905 820,850 1110,900 " +
  "C 1190,960 1170,1350 1150,1640 C 1130,1860 1180,1960 960,1990 " +
  "C 700,2020 300,1960 120,2120 C 40,2200 50,2420 70,2600 C 90,2760 400,2800 760,2790 " +
  "C 1000,2785 1160,2840 1240,2960";

/** Deterministic star field so server and client render the same sky. */
const STARS = (() => {
  let seed = 7;
  const rnd = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  return Array.from({ length: 80 }, () => {
    const size = rnd() < 0.85 ? 1.5 : 2.6;
    return {
      left: `${(rnd() * 100).toFixed(2)}%`,
      top: `${(rnd() * 100).toFixed(2)}%`,
      size,
      delay: `-${(rnd() * 4).toFixed(2)}s`,
      duration: `${(3 + rnd() * 4).toFixed(2)}s`,
    };
  });
})();

/** Go-Back-N with window 4 when frame 2 is lost: 0 1 2x 3 4 5, then 2 3 4 5 again. */
const WIRE: { n: number; kind: "ok" | "lost" | "drop" | "re" }[] = [
  { n: 0, kind: "ok" }, { n: 1, kind: "ok" }, { n: 2, kind: "lost" }, { n: 3, kind: "drop" }, { n: 4, kind: "drop" },
  { n: 5, kind: "drop" }, { n: 2, kind: "re" }, { n: 3, kind: "re" }, { n: 4, kind: "re" }, { n: 5, kind: "re" },
];

function shortDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? ""
    : new Intl.DateTimeFormat("en", { month: "short", day: "numeric" }).format(date).toUpperCase();
}

const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? "" : "s"}`;

export default async function Home() {
  const posts = await getCombinedPosts();
  const editions = posts.filter((post) => post.slug && post.title && post.category?.toLowerCase() !== "i-wonder-why");
  const edition = editions.find((post) => post.slug !== VIBE_POST_SLUG);
  const wonder = OBSERVATIONS[0];

  const subjectCount = SUBJECT_NOTEBOOKS.length;
  const noteCount = SUBJECT_NOTEBOOKS.reduce((sum, nb) => sum + nb.stats.notesCount, 0);
  const labCount = COURSE_LABS.length;
  const featured = FEATURED_NOTEBOOKS.map((id) => SUBJECT_NOTEBOOKS.find((nb) => nb.id === id)).filter(
    (nb): nb is (typeof SUBJECT_NOTEBOOKS)[number] => Boolean(nb)
  );

  return (
    <div id="hm-root" className="hm-root bg-base text-ink-1">
      <svg className="hm-thread" data-smil aria-hidden="true" viewBox="0 0 1200 3000" preserveAspectRatio="none">
        <defs>
          <linearGradient id="hm-thread-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#c4b5fd" />
            <stop offset="0.45" stopColor="#a855f7" />
            <stop offset="1" stopColor="#facc15" />
          </linearGradient>
        </defs>
        <path d={THREAD_PATH} fill="none" stroke="rgba(168,85,247,0.10)" strokeWidth="9" vectorEffect="non-scaling-stroke" strokeLinecap="round" />
        <path
          className="hm-thread-main"
          pathLength={1}
          d={THREAD_PATH}
          fill="none"
          stroke="url(#hm-thread-grad)"
          strokeOpacity="0.42"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
          strokeLinecap="round"
        />
        <g className="hm-spark">
          <circle r="9" fill="rgba(250,204,21,0.35)">
            <animateMotion dur="28s" repeatCount="indefinite" path={THREAD_PATH} />
          </circle>
          <circle r="3" fill="#fffbe6" fillOpacity="0.9">
            <animateMotion dur="28s" repeatCount="indefinite" path={THREAD_PATH} />
          </circle>
        </g>
      </svg>

      <div className="hm-layer">
        {/* ============ HERO ============ */}
        <section aria-labelledby="hero-title" className="hm-hero">
          <div className="hm-sky" aria-hidden="true">
            <div className="hm-nebula" style={{ width: 1100, height: 760, background: "radial-gradient(closest-side, rgba(147,51,234,0.42), rgba(147,51,234,0.12) 55%, transparent)" }} />
            <div className="hm-nebula" style={{ width: 520, height: 360, left: "62%", top: "60%", background: "radial-gradient(closest-side, rgba(250,204,21,0.16), transparent)", animationDelay: "-4s" }} />
            <div className="hm-dots" />
            {STARS.map((s, i) => (
              <span
                key={i}
                className="hm-star"
                style={{ left: s.left, top: s.top, width: s.size, height: s.size, animationDelay: s.delay, animationDuration: s.duration }}
              />
            ))}
            <span className="hm-shooting" style={{ left: "88%", top: "8%" }} />
            <span className="hm-shooting" style={{ left: "58%", top: "2%", width: 110, animationDelay: "5.5s" }} />
          </div>

          <div className="hm-scrap hm-f1" aria-hidden="true" style={{ left: "2%", top: "38%", width: 168, background: "#fef3c7", color: "#3b2a05", padding: "10px 14px 12px", borderRadius: "4px 14px 6px 10px", boxShadow: "0 18px 40px -12px rgba(0,0,0,.7)" }}>
            <div className="hm-hand" style={{ fontSize: 24, lineHeight: 1, fontWeight: 700 }}>? why does this work?</div>
            <div className="hm-mono" style={{ fontSize: 10, marginTop: 6, opacity: 0.6, letterSpacing: ".08em" }}>[ proof pending ]</div>
          </div>
          <div className="hm-scrap hm-f2" aria-hidden="true" style={{ right: "1.5%", top: "38%", width: 186, background: "rgba(13,11,34,0.92)", border: "1px solid rgba(168,85,247,0.5)", borderRadius: 12, padding: "10px 14px", boxShadow: "0 0 40px -6px rgba(168,85,247,.55)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,.1)", paddingBottom: 6, marginBottom: 8 }}>
              <span className="hm-mono" style={{ fontSize: 10, color: "#948cb5", letterSpacing: ".14em" }}>SEARCH.TS</span>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#34d399", boxShadow: "0 0 10px #34d399" }} />
            </div>
            <pre className="hm-mono" style={{ margin: 0, fontSize: 12, lineHeight: 1.5, color: "#c9c2e4" }}>
              <span style={{ color: "#c4b5fd" }}>if</span> (state === <span style={{ color: "#facc15" }}>&quot;stuck&quot;</span>) {"{"}
              {"\n  "}rethink(); <span style={{ color: "#5d5680" }}>{"// O(1)"}</span>
              {"\n}"}
            </pre>
          </div>

          <div className="relative z-[2] mx-auto flex w-full max-w-[1100px] flex-col items-center px-5 pt-5 pb-1.5 text-center">
            <MorphEmblem notebookCount={subjectCount} labCount={labCount} />
            <p className="hm-rise hm-hand m-0 mb-1.5 -rotate-2 text-accent-soft" style={{ fontSize: "clamp(24px, 2.6cqi, 34px)" }}>
              the night-before notes for every B.Tech subject
            </p>
            <h1 id="hero-title" className="hm-title hm-rise" style={{ animationDelay: ".1s" }}>
              <span className="hm-title-top">Notes From a</span>
              <span className="relative inline-block pb-[.1em]">
                <span className="hm-brain-word">B.Tech Brain</span>
                <svg aria-hidden="true" viewBox="0 0 600 30" preserveAspectRatio="none" className="absolute left-[2%] bottom-[-.05em] h-[.22em] w-[96%] overflow-visible">
                  <path className="hm-marker" pathLength={1} d="M 6,20 C 120,6 260,26 380,14 C 470,6 540,12 594,10" fill="none" stroke="#a855f7" strokeWidth="9" strokeLinecap="round" opacity=".85" />
                </svg>
              </span>
            </h1>
            <p className="hm-rise mt-4 max-w-[36ch] text-ink-2" style={{ fontSize: "clamp(17px, 1.7cqi, 22px)", animationDelay: ".25s" }}>
              A place to explore things I don&apos;t understand yet, and to make sure you understand them by morning.
            </p>
            <div className="hm-rise mt-5 flex flex-wrap justify-center gap-3" style={{ animationDelay: ".4s" }}>
              <Link href="/notes" className="hm-btn hm-btn-primary">
                Open the notes <span aria-hidden="true">→</span>
              </Link>
              <Link href="/notes/cheat-sheets" className="hm-btn hm-btn-secondary">
                Exam tomorrow? Cheat sheets
              </Link>
            </div>
            <p className="hm-rise hm-mono mt-3.5 text-[12px] tracking-[.14em] text-ink-3" style={{ animationDelay: ".55s" }}>
              {subjectCount} SUBJECTS · {noteCount} NOTES · {labCount} LABS · FREE, NO SIGN-UP
            </p>
          </div>

          <div className="relative z-[2] flex flex-col items-center px-5 pt-[18px] pb-[22px]">
            <p className="m-0 text-[15px] font-bold uppercase tracking-[.24em]">What are you curious about?</p>
            <a href="#everything" aria-label="Scroll to what's on the site" className="hm-drift mt-2 grid h-[46px] w-[46px] place-items-center rounded-full border border-hairline-strong text-ink-2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M19 14l-7 7-7-7M12 21V3" />
              </svg>
            </a>
          </div>

          <HomeMotion />
        </section>

        {/* ============ A BIT OF EVERYTHING ============ */}
        <section id="everything" aria-labelledby="mix-title" className="mx-auto max-w-[1280px] px-5 pt-7 pb-10">
          <div className="mb-[18px]" data-reveal>
            <p className="hm-hand m-0 -rotate-2 origin-left text-[28px] text-accent-soft">what&apos;s in here</p>
            <h2 id="mix-title" className="m-0 font-black leading-none tracking-[-0.04em]" style={{ fontSize: "clamp(38px, 5cqi, 72px)" }}>
              A bit of <span className="text-highlight">everything.</span>
            </h2>
          </div>

          <div className="hm-bento">
            <div className="hm-tile hm-tile-lead hm-t-notes" data-reveal>
              <span className="hm-mono hm-kicker">NOTEBOOKS · {subjectCount} SUBJECTS</span>
              <h3 className="hm-tile-title" style={{ fontSize: "clamp(28px, 3.2cqi, 44px)" }}>
                The whole B.Tech syllabus, written the way a friend would explain it.
              </h3>
              <div className="mt-1 flex flex-col gap-2">
                {featured.map((nb) => (
                  <Link key={nb.id} href={`/notes/${nb.slug}`} className="hm-row">
                    <span className="hm-mono hm-code">{nb.id === "operating-systems" ? "OS" : nb.id === "dbms" ? "DBMS" : "CN"}</span>
                    <span className="flex-1">{nb.title}</span>
                    <span className="hm-mono hm-meta">
                      {plural(nb.stats.notesCount, "note")}
                      {nb.stats.labsCount > 0 && ` · ${plural(nb.stats.labsCount, "lab")}`}
                    </span>
                  </Link>
                ))}
              </div>
              <Link href="/notes" className="hm-cta" style={{ color: "var(--theme-highlight)" }}>
                Browse all {subjectCount} subjects →
              </Link>
            </div>

            <div className="hm-tile hm-t-lab" data-reveal>
              <span className="hm-mono hm-kicker">LABS · {labCount} TO PLAY WITH</span>
              <h3 className="hm-tile-title">Lose a frame. Watch Go-Back-N resend it.</h3>
              <div role="img" aria-label="Frames 0 to 5 are sent, frame 2 is lost, then frames 2 to 5 are sent again" className="hm-mono flex flex-wrap gap-1.5">
                {WIRE.map((f, i) => (
                  <span
                    key={i}
                    className={`hm-frame ${f.kind === "lost" ? "hm-lose hm-frame-ok" : `hm-send hm-frame-${f.kind}`}`}
                    style={{ animationDelay: `${(0.3 + i * 0.25).toFixed(2)}s` }}
                  >
                    {f.n}
                  </span>
                ))}
              </div>
              <p className="hm-hand m-0 text-[22px] text-highlight">go on, try breaking it</p>
              <Link href="/notes/labs" className="hm-cta">Open the labs →</Link>
            </div>

            <div className="hm-tile hm-t-sheet" data-reveal>
              <span className="hm-mono hm-kicker">CHEAT SHEETS</span>
              <div className="-rotate-[1.5deg] rounded-lg bg-[#f5f3ff] px-4 py-3.5 text-[#1e1b3a] shadow-[0_14px_30px_-12px_rgba(0,0,0,.8)]">
                <div className="mb-2 border-b-[1.5px] border-[#ddd6fe] pb-1.5 text-lg font-black">Paging · 1 page</div>
                <div className="text-sm leading-normal">
                  Offset bits = <span className="hm-mono bg-[#fde047] px-1">log₂(page size)</span>
                </div>
                <div className="mt-1 text-sm leading-normal text-[#9f1239]">
                  <strong>Trap:</strong> offset bits match in logical and physical addresses.
                </div>
              </div>
              <Link href="/notes/cheat-sheets" className="hm-cta">One for every topic →</Link>
            </div>

            <Link href={`/wonder/${wonder.id}`} className="hm-tile hm-t-wonder" data-reveal style={{ background: "radial-gradient(120% 90% at 0% 0%, rgba(168,85,247,.28), color-mix(in srgb, var(--theme-raised) 92%, transparent) 70%)", borderColor: "rgba(196,181,253,.3)" }}>
              <span className="hm-mono hm-kicker">WONDER · {shortDate(wonder.date)}</span>
              <p className="hm-hand m-0 text-[28px] leading-none text-accent-soft">I wonder why…</p>
              <h3 className="hm-tile-title">{wonder.title}</h3>
              <span className="hm-cta">Read Wonder →</span>
            </Link>

            <Link href="/map" className="hm-tile hm-t-map" data-reveal>
              <span className="hm-mono hm-kicker">BRAIN MAP</span>
              <svg aria-hidden="true" viewBox="0 0 260 120" className="h-[110px] w-full">
                <g stroke="rgba(196,181,253,.45)" strokeWidth="1.2">
                  <line x1="40" y1="60" x2="110" y2="28" /><line x1="110" y1="28" x2="190" y2="44" /><line x1="110" y1="28" x2="130" y2="92" />
                  <line x1="40" y1="60" x2="130" y2="92" /><line x1="190" y1="44" x2="226" y2="96" /><line x1="130" y1="92" x2="226" y2="96" />
                </g>
                <circle cx="40" cy="60" r="7" fill="#a855f7" /><circle cx="110" cy="28" r="9" fill="#facc15" /><circle cx="190" cy="44" r="6" fill="#c4b5fd" />
                <circle cx="130" cy="92" r="7" fill="#a855f7" /><circle cx="226" cy="96" r="5" fill="#c4b5fd" />
              </svg>
              <h3 className="hm-tile-title text-xl">See how every note, lab and essay connects.</h3>
              <span className="hm-cta">Explore the map →</span>
            </Link>

            <Link href="/vibe-coding" className="hm-tile hm-t-vibe" data-reveal>
              <span className="hm-mono hm-kicker">VIBE CODING</span>
              <h3 className="hm-tile-title">AI can write the code. You&apos;re still responsible for what it does.</h3>
              <span className="hm-hand text-[22px] text-highlight">how to vibe code without losing your brain</span>
            </Link>

            {edition && (
              <Link href={`/post/${edition.slug}`} className="hm-tile hm-t-ed" data-reveal>
                <span className="hm-mono hm-kicker">EDITION · LONG READ</span>
                <h3 className="hm-tile-title">{edition.title}</h3>
                <span className="hm-hand text-[22px] text-highlight">the long one</span>
              </Link>
            )}
          </div>
        </section>

        {/* ============ LAST-MINUTE ============ */}
        <section aria-labelledby="lm-title" className="relative py-3.5" data-reveal>
          <div className="-rotate-[1.4deg] bg-[#facc15] text-[#1a1405] shadow-[0_0_80px_-10px_rgba(250,204,21,.45)]">
            <div className="mx-auto flex max-w-[1280px] rotate-[1.4deg] flex-wrap items-center justify-between gap-5 px-5 py-8">
              <div className="flex-[1_1_440px]">
                <p className="hm-hand m-0 text-[28px] text-[#7c3aed]">read this in the exam queue</p>
                <h2 id="lm-title" className="m-0 font-black text-[#1a1405] leading-[.95] tracking-[-0.045em]" style={{ fontSize: "clamp(44px, 6.4cqi, 96px)" }}>
                  Exam tomorrow?
                </h2>
                <p className="mt-3 max-w-[46ch] text-[19px] font-medium">
                  A one-page cheat sheet for every topic, and 10-minute revision cards to skim on your phone. All {subjectCount} subjects.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/notes/cheat-sheets" className="hm-btn bg-[#05031a] text-[#facc15]">Cheat sheets →</Link>
                <Link href="/notes/quick-revision" className="hm-btn border-2 border-[#05031a] text-[#1a1405]">10-minute revision →</Link>
              </div>
            </div>
          </div>
        </section>

        {/* ============ PERSONAL ============ */}
        <section aria-labelledby="me-title" className="mx-auto max-w-[1280px] px-5 pt-9 pb-12" data-reveal>
          <div className="max-w-[640px] -rotate-1 rounded-[6px_18px_8px_14px] bg-[#fef3c7] px-7 py-6 text-[#3b2a05] shadow-[0_24px_60px_-18px_rgba(0,0,0,.8)]">
            {/* TODO(Zainab): replace this placeholder with your own note. */}
            <h2 id="me-title" className="hm-hand m-0 text-[34px] text-[#3b2a05] font-bold leading-[1.1]">
              I&apos;m Zainab, a final-year B.Tech student. I wrote these while learning this stuff myself.
            </h2>
            <div className="mt-2.5 flex flex-wrap gap-x-[18px] gap-y-1 text-[15px] font-bold">
              <Link href="/about" className="inline-flex min-h-11 items-center text-[#6d28d9] underline">About me</Link>
              <a href="https://zainabshujat.dev" target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center text-[#6d28d9] underline">Portfolio</a>
              <a href="https://www.linkedin.com/in/zainab-shujat-56b14928b/" target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center text-[#6d28d9] underline">
                Follow on LinkedIn
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
