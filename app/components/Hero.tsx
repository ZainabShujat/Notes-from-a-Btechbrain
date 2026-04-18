
import Link from "next/link";
import packageJson from "../../package.json";

export default function Hero() {
  return (
    <section
      className="relative w-full flex flex-col justify-center items-center text-white overflow-hidden"
      style={{
        backgroundImage: "url(/assets/banners/galaxy-bg.png)",
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
        <p className="mt-2 text-base md:text-lg text-white/90">A thinking space for curious, confused, and building minds</p>

        {/* Featured Card */}
        <div className="mt-6 w-full max-w-lg mx-auto bg-white/10 border border-white/20 rounded-2xl p-5 shadow-lg backdrop-blur-md text-left flex flex-col gap-2">
          <div className="flex items-center gap-2 text-base font-semibold text-white">
            <span className="text-xl">📚</span> Latest Drop
          </div>
          <div className="text-lg md:text-xl font-medium text-white mt-1">
            I Wonder Why Developers Keep Reinventing the Same Apps
          </div>
          <div className="text-xs text-white/70 mt-1 flex flex-wrap gap-2">
            <span>3 min read</span>
            <span>•</span>
            <span>Tech</span>
            <span>•</span>
            <span>Behind the scenes</span>
          </div>
          <div className="mt-3">
            <Link href="post/why-developers-reinvent-apps" className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-green-400 text-white font-semibold shadow hover:from-indigo-600 hover:to-green-500 transition">
              Start Reading <span className="text-lg">→</span>
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
