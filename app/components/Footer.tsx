import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#071028]/95 text-white mt-20 border-t border-purple-500/20 shadow-[0_-10px_40px_rgba(168,85,247,0.08)]">

      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 md:px-8 py-16">

        {/* Branding */}
        <div className="flex items-center gap-4 mb-10">

          <img
  src="/thumbnail.png"
  alt="Notes From a B Tech Brain"
  className="h-14 w-14 rounded-2xl object-cover shadow-lg border border-purple-500/20"
/>

          <div>
            <h3 className="text-2xl font-extrabold tracking-tight text-yellow-300">
              Notes From a B Tech Brain
            </h3>

            <p className="text-slate-400 text-sm md:text-base mt-1 max-w-xl">
              A digital thinking space exploring engineering,
              curiosity, identity, and the chaos of learning.
            </p>
          </div>
        </div>

        {/* Footer Grid */}
        <div className="grid gap-10 md:grid-cols-3">

          {/* Connect */}
          <div>

            <h4 className="text-purple-200 font-bold tracking-wide uppercase text-sm mb-4">
              Connect
            </h4>

            <div className="text-slate-400 text-sm leading-relaxed">

              <p className="mb-3">
                Built by Zainab Shujat <br />
                CSE AI/ML Student
              </p>

              <Link
                className="hover:text-purple-200 transition underline"
                href="https://www.linkedin.com/in/zainab-shujat-56b14928b/"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </Link>
            </div>
          </div>

          {/* Explore */}
          <div>

            <h4 className="text-purple-200 font-bold tracking-wide uppercase text-sm mb-4">
              Explore
            </h4>

            <ul className="space-y-2 text-sm">

              <li>
                <Link
                  className="text-slate-400 hover:text-purple-200 transition"
                  href="/start-here"
                >
                  Start Here
                </Link>
              </li>

              <li>
                <Link
                  className="text-slate-400 hover:text-purple-200 transition"
                  href="/category/curiosity-series"
                >
                  Curiosity Series
                </Link>
              </li>

              <li>
                <Link
                  className="text-slate-400 hover:text-purple-200 transition"
                  href="/category/science-vs-sci-fi"
                >
                  Science vs. Sci-fi
                </Link>
              </li>

              <li>
                <Link
                  className="text-slate-400 hover:text-purple-200 transition"
                  href="/category/behind-the-scenes"
                >
                  Behind the Scenes
                </Link>
              </li>

              <li>
                <Link
                  className="text-slate-400 hover:text-purple-200 transition"
                  href="/all-posts"
                >
                  All Posts
                </Link>
              </li>

            </ul>
          </div>

          {/* Themes */}
          <div>

            <h4 className="text-purple-200 font-bold tracking-wide uppercase text-sm mb-4">
              Current Themes
            </h4>

            <ul className="space-y-2 text-sm">

              <li>
                <Link
                  className="text-slate-400 hover:text-purple-200 transition"
                  href="/category/tech-demystified"
                >
                  Tech Demystified
                </Link>
              </li>

              <li>
                <Link
                  className="text-slate-400 hover:text-purple-200 transition"
                  href="/category/financial-month"
                >
                  Financial Month
                </Link>
              </li>

              <li>
                <Link
                  className="text-slate-400 hover:text-purple-200 transition"
                  href="/category/girlhood-and-stem-experiences"
                >
                  Girlhood Arc Series
                </Link>
              </li>

              <li>
                <Link
                  className="text-slate-400 hover:text-purple-200 transition"
                  href="/category/july-crisis"
                >
                  July Crisis
                </Link>
              </li>

            </ul>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="border-t border-slate-800 mt-14 pt-6 text-slate-500 text-xs flex flex-col lg:flex-row gap-3 md:justify-between">

          <span>
            © {new Date().getFullYear()} Notes From a B Tech Brain.
            All rights reserved.
          </span>

          <span className="italic">
            Built slowly between semesters, curiosity spirals,
            and late-night debugging sessions.
          </span>
        </div>
      </div>
    </footer>
  );
}