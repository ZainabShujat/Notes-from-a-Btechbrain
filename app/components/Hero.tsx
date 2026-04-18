
import Link from "next/link";
import RecentReads from "./RecentReads";
import packageJson from "../../package.json";

export default function Hero() {
  return (
    <section
      className="relative w-full min-h-[50vh] flex flex-col justify-center items-center text-white overflow-hidden"
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
