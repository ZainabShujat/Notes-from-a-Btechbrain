
import Link from "next/link";
import RecentReads from "./RecentReads";
import packageJson from "../../package.json";

export default function Hero() {
  return (
    <section
      className="relative w-full flex flex-col justify-center items-center text-white overflow-hidden"
      style={{
        backgroundImage: "url(/assets/banners/galaxy-bg.webp)",
        backgroundSize: "cover",
        backgroundPosition: "center top",
        backgroundRepeat: "no-repeat"
      }}
    >
      {/* Optional: add a dark overlay for better contrast */}
      <div className="absolute inset-0 bg-[#1a1440]/80 pointer-events-none select-none" />
      <div className="relative z-10 w-full max-w-xl mx-auto px-4 py-6 text-center flex flex-col items-center">
        <h1 className="text-3xl md:text-4xl font-bold leading-tight">
          <span className="text-white">Notes From a</span> <span className="text-yellow-400 font-extrabold">BTech Brain</span>
        </h1>
        <p className="mt-2 text-base md:text-lg text-white/90">For when you’re thinking too much… and still don’t have answers</p>
  {/* Latest Drop Card - enhanced, now below RecentReads */}
        <div
          className="mt-6 w-full max-w-lg mx-auto rounded-2xl p-6 shadow-2xl backdrop-blur-2xl text-left flex flex-col gap-4 glow-purple"
          style={{
            background: "var(--background, #fff)",
            color: "var(--foreground, #18181b)",
            boxShadow: '0 0 32px 8px #a855f7, 0 2px 32px 0 rgba(0,0,0,0.25), 0 0 16px 4px #a855f7',
            border: '2px solid #a855f7'
          }}
        >
          <div className="flex items-center gap-3 text-xl font-extrabold drop-shadow-lg" style={{color: "var(--heading, #fff)"}}>
            Latest Drop
          </div>
          <div className="text-2xl md:text-3xl font-bold mt-2 drop-shadow-xl" style={{color: "var(--heading, #fff)"}}>
            The Puzzle That Broke My Brain (In the Best Way)
          </div>
          <div className="text-sm mt-2 flex flex-wrap gap-2" style={{color: "var(--foreground, #18181b)", opacity: 0.8}}>
            <span>5 min read</span>
            <span>•</span>
            <span>Curiosity Series</span>
            <span>•</span>
            <span>Partridge Puzzle</span>
            <span>•</span>
            <span>Math & Puzzles</span>
          </div>
          <div className="mt-5">
            <Link
              href="/post/the-puzzle-that-broke-my-brain"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-linear-to-r from-indigo-400 via-purple-500 to-green-400 text-white font-bold shadow-xl hover:from-indigo-500 hover:to-green-500 transition text-lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              Start Reading <span className="text-2xl">→</span>
            </Link>
          </div>
        </div>

        {/* Pill Buttons Row (no Start Here) */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center items-center w-full">
          <Link href="/browse" className="flex items-center gap-3 px-16 py-2 min-w-[260px] justify-center rounded-full bg-[#a21caf]/80 hover:bg-[#c026d3]/90 text-white font-semibold text-lg shadow transition">
            <span className="text-base">🔎</span> <span className="whitespace-nowrap">Explore&nbsp;Topics</span>
          </Link>
          <Link href="/series-hub" className="flex items-center gap-3 px-16 py-2 min-w-[260px] justify-center rounded-full bg-[#312e81]/80 hover:bg-[#3730a3]/90 text-white font-semibold text-lg shadow transition">
            <span className="text-base">📖</span> <span className="whitespace-nowrap">Past&nbsp;Series</span>
          </Link>
          <Link href="/themes" className="flex items-center gap-3 px-16 py-2 min-w-[260px] justify-center rounded-full bg-[#be185d]/80 hover:bg-[#e11d48]/90 text-white font-semibold text-lg shadow transition">
            <span className="text-base">📅</span> <span className="whitespace-nowrap">Monthly&nbsp;Themes</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
