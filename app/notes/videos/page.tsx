import Link from "next/link";
import PageHeader from "../../components/ui/PageHeader";
import { pageMetadata } from "../../../lib/seo";

export const metadata = pageMetadata({
  title: "Operating Systems Video Lectures & Curated YouTube Playlists",
  description:
    "Curated video lectures for Operating Systems: Gate Smashers, Neso Academy, Knowledge Gate, Amit Khurana, Abdul Bari, and MIT 6.828.",
  path: "/notes/videos",
});

const OS_VIDEO_EDUCATORS = [
  {
    name: "Varun Singla",
    channel: "Gate Smashers · Operating Systems Full Course",
    url: "https://www.youtube.com/playlist?list=PLxCzCOWd7aiGz9donHRrE9I3Mwn6XdP8p",
    episodes: "80+ Lectures",
    topics: "5 vs 7-State Models, CPU Scheduling (RR, SJF), Banker's Algorithm, Semaphores, Multi-level Paging",
    bestFor: "Rapid intuitive conceptual mastery and step-by-step numerical examples before exams.",
    badge: "Most Popular",
  },
  {
    name: "Neso Academy",
    channel: "Neso Academy · Operating Systems Series",
    url: "https://www.youtube.com/playlist?list=PLBlnK6fEyqRbjR2jT38T3nFiIuWAHh2zH",
    episodes: "120+ Lectures",
    topics: "Process memory architecture, state transitions, TLB translation, disk scheduling, file systems",
    bestFor: "Academic whiteboard lectures, fundamental textbook clarity, and university semester examinations.",
    badge: "Foundational Clarity",
  },
  {
    name: "Sanchit Jain",
    channel: "Knowledge Gate · OS for GATE & Semester Exams",
    url: "https://www.youtube.com/playlist?list=PLmXKhU9FNesSFvj6gASuWmQd23Ul5omtD",
    episodes: "65+ Lectures",
    topics: "Exam patterns, GATE PYQ derivations, tricky corner cases, formula shortcuts, EMAT calculations",
    bestFor: "Intense numerical problem-solving and past-paper accuracy under timed conditions.",
    badge: "Exam Problem-Solving",
  },
  {
    name: "Amit Khurana",
    channel: "GATE CSE by Amit Khurana · Nirbhau OS Series",
    url: "https://www.youtube.com/playlist?list=PLC36xJgs4dxEGlPPsvshTRh35Vv-Eg_4b",
    episodes: "90+ Lectures",
    topics: "Rigorous proofs, system call intricacies, concurrency invariants, paging depth, virtual memory",
    bestFor: "High-rank GATE aspirants seeking uncompromising mathematical depth and rigorous proofs.",
    badge: "Top-Rank Depth",
  },
  {
    name: "Abdul Bari",
    channel: "Abdul Bari · Concurrency & Algorithms Visualizations",
    url: "https://www.youtube.com/@abdul_bari",
    episodes: "Select Masterclasses",
    topics: "Semaphores, Mutex, Critical Section Problem, Banker's Safety Logic, Deadlock Conditions",
    bestFor: "Visual thinkers who want to see synchronization flows and concurrency races animated.",
    badge: "Visual Masterclass",
  },
  {
    name: "Prof. Robert Morris & Frans Kaashoek",
    channel: "MIT OpenCourseWare · 6.828 Operating System Engineering",
    url: "https://ocw.mit.edu/courses/6-828-operating-system-engineering-fall-2012/",
    episodes: "Full MIT Semester",
    topics: "xv6 Kernel source code, hardware memory management unit (MMU), traps, device drivers",
    bestFor: "Undergraduates and engineers wanting to read, modify, and build real Unix kernel code.",
    badge: "MIT University Standard",
  },
];

export default function VideosPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8 py-10 md:py-16">
      {/* Breadcrumb */}
      <nav className="mb-4 text-xs font-mono text-ink-3" aria-label="Breadcrumb">
        <ol className="flex items-center gap-1.5">
          <li>
            <Link href="/notes" className="hover:text-ink-1 transition-colors">
              The Notebooks
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-ink-1 font-semibold">Video Lectures</li>
        </ol>
      </nav>

      <PageHeader
        eyebrow="CURATED VIDEO LECTURES · OPERATING SYSTEMS"
        title="Curated Video Lectures & YouTube Playlists"
        description="Carefully vetted YouTube playlists, university lectures, and educator series. Hand-selected for conceptual depth, academic rigor, and exam problem-solving."
      />

      {/* Subject Filter Bar */}
      <div className="flex flex-wrap items-center gap-2 mb-8 pb-4 border-b border-hairline text-xs font-mono">
        <span className="text-ink-3 text-[11px] font-bold uppercase tracking-wider mr-1">
          SUBJECT:
        </span>
        <span className="px-3 py-1.5 rounded bg-accent text-white font-semibold shadow-2xs">
          Operating Systems ({OS_VIDEO_EDUCATORS.length} Channels)
        </span>
        <span className="px-3 py-1.5 rounded bg-surface-2 text-ink-3 border border-hairline/60">
          DBMS (Coming Soon)
        </span>
        <span className="px-3 py-1.5 rounded bg-surface-2 text-ink-3 border border-hairline/60">
          Computer Networks (Coming Soon)
        </span>
        <span className="px-3 py-1.5 rounded bg-surface-2 text-ink-3 border border-hairline/60">
          Algorithms (Coming Soon)
        </span>
      </div>

      {/* Video Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {OS_VIDEO_EDUCATORS.map((edu, idx) => (
          <article
            key={idx}
            className="p-5 sm:p-6 rounded-xl border border-hairline bg-surface-1/70 backdrop-blur-xs flex flex-col justify-between space-y-4 shadow-2xs hover:border-hairline-strong transition-all"
          >
            <div>
              <div className="flex items-center justify-between gap-2 border-b border-hairline/60 pb-2.5 mb-3">
                <span className="text-xs font-bold text-ink-1 font-sans">
                  {edu.name}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-2 text-accent font-semibold">
                  {edu.badge}
                </span>
              </div>

              <h3 className="text-sm sm:text-base font-bold text-ink-1 mb-2 font-sans leading-snug">
                <a
                  href={edu.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors inline-flex items-center gap-1.5"
                >
                  <span>{edu.channel}</span>
                  <span className="text-xs text-ink-3">&nearr;</span>
                </a>
              </h3>

              <div className="text-xs font-mono text-ink-3 mb-2">
                <span>{edu.episodes}</span>
              </div>

              <p className="text-xs text-ink-2 leading-relaxed mb-3">
                <strong>Core Coverage:</strong> {edu.topics}
              </p>

              <div className="p-3 rounded bg-surface-2/60 border border-hairline/60 text-xs font-sans text-ink-2">
                <strong className="text-ink-1">Recommended When:</strong> {edu.bestFor}
              </div>
            </div>

            <div className="pt-3 border-t border-hairline/60 flex items-center justify-between">
              <span className="text-[11px] font-mono text-ink-3">
                Free YouTube / OCW
              </span>
              <a
                href={edu.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-accent text-white font-mono text-xs font-semibold hover:bg-accent/90 transition-colors"
              >
                <span>Watch Playlist</span>
                <span>&rarr;</span>
              </a>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
