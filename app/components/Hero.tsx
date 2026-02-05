
import Link from "next/link";
import packageJson from "../../package.json";

export default function Hero() {
  return (
    <section className="relative w-full">
      <div className="absolute inset-0 bg-linear-to-r from-blue-600 via-cyan-500 to-emerald-400 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-8 py-20 text-center text-white dark:text-white">
        <p className="inline-block rounded-full bg-white/15 dark:bg-slate-800/40 px-3 py-1 text-xs tracking-wide">
          Weekly Newsletter
        </p>
        <h1 className="mt-4 text-4xl md:text-5xl font-bold">
          Notes From a <span className="text-yellow-300 dark:text-yellow-200">B Tech Brain</span>
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-white/90 dark:text-slate-200">
          Insights on technology, geopolitics, and growth — from a student’s perspective.
        </p>

        <div className="mt-6 flex items-center justify-center gap-3">
          <Link
            href="/browse"
            className="rounded-md bg-white text-purple-700 dark:bg-slate-800 dark:text-purple-200 px-4 py-2 font-medium"
          >
            Browse Articles
          </Link>
        </div>

        <div className="mt-6 text-xs text-white/80 dark:text-slate-300 flex items-center justify-center gap-4">
          <span>10+ categories</span>
          <span>•</span>
          <span>75+ editions</span>
          <span>•</span>
          <span>student POV</span>
          <span>•</span>
          <span>v0.9.0</span>
        </div>
      </div>
    </section>
  );
}
