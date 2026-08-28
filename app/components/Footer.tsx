import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-hairline bg-raised/80 backdrop-blur-xl text-ink-2">

      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 md:px-8 py-16">

        {/* Branding */}
        <div className="flex items-center gap-4 mb-10">

          <img
  src="/thumbnail.png"
  alt="Notes From a B Tech Brain"
  className="h-14 w-14 rounded-lg object-cover shadow-card border border-hairline"
/>

          <div>
            <h3 className="text-2xl font-bold tracking-tight text-highlight">
              Notes From a B Tech Brain
            </h3>

            <p className="text-ink-3 text-sm md:text-base mt-1 max-w-xl">
              A digital thinking space exploring engineering,
              curiosity, identity, and the chaos of learning.
            </p>
          </div>
        </div>

        {/* Footer Grid */}
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">

          {/* Connect */}
          <div>

            <h4 className="text-ink-1 font-semibold tracking-[0.14em] uppercase text-xs mb-4">
              Connect
            </h4>

            <div className="text-ink-3 text-sm leading-relaxed">

              <p className="mb-3">
                Built by Zainab Shujat <br />
                CSE AI/ML Student
              </p>

              <Link
                className="text-ink-2 hover:text-accent-soft transition-colors underline underline-offset-2"
                href="https://www.linkedin.com/in/zainab-shujat-56b14928b/"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </Link>

              <ul className="space-y-2 mt-4">
                <li>
                  <Link
                    className="text-ink-3 hover:text-ink-1 transition-colors"
                    href="/about"
                  >
                    About
                  </Link>
                </li>

                <li>
                  <Link
                    className="text-ink-3 hover:text-ink-1 transition-colors"
                    href="/notifications"
                  >
                    Updates
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Explore */}
          <div>

            <h4 className="text-ink-1 font-semibold tracking-[0.14em] uppercase text-xs mb-4">
              Explore
            </h4>

            <ul className="space-y-2 text-sm">

              <li>
                <Link
                  className="text-ink-3 hover:text-ink-1 transition-colors"
                  href="/start-here"
                >
                  Start Here
                </Link>
              </li>

              <li>
                <Link
                  className="text-ink-3 hover:text-ink-1 transition-colors"
                  href="/browse"
                >
                  Explore
                </Link>
              </li>

              <li>
                <Link
                  className="text-ink-3 hover:text-ink-1 transition-colors"
                  href="/map"
                >
                  Brain Map
                </Link>
              </li>

              <li>
                <Link
                  className="text-ink-3 hover:text-ink-1 transition-colors"
                  href="/category/curiosity-series"
                >
                  Curiosity Series
                </Link>
              </li>

              <li>
                <Link
                  className="text-ink-3 hover:text-ink-1 transition-colors"
                  href="/category/science-vs-sci-fi"
                >
                  Science vs. Sci-fi
                </Link>
              </li>

              <li>
                <Link
                  className="text-ink-3 hover:text-ink-1 transition-colors"
                  href="/category/behind-the-scenes"
                >
                  Behind the Scenes
                </Link>
              </li>

              <li>
                <Link
                  className="text-ink-3 hover:text-ink-1 transition-colors"
                  href="/all-posts"
                >
                  All Posts
                </Link>
              </li>

            </ul>
          </div>

          {/* Themes */}
          <div>

            <h4 className="text-ink-1 font-semibold tracking-[0.14em] uppercase text-xs mb-4">
              Current Themes
            </h4>

            <ul className="space-y-2 text-sm">

              <li>
                <Link
                  className="text-ink-3 hover:text-ink-1 transition-colors"
                  href="/category/tech-demystified"
                >
                  Tech Demystified
                </Link>
              </li>

              <li>
                <Link
                  className="text-ink-3 hover:text-ink-1 transition-colors"
                  href="/category/financial-month"
                >
                  Financial Month
                </Link>
              </li>

              <li>
                <Link
                  className="text-ink-3 hover:text-ink-1 transition-colors"
                  href="/category/girlhood-and-stem-experiences"
                >
                  Girlhood Arc Series
                </Link>
              </li>

              <li>
                <Link
                  className="text-ink-3 hover:text-ink-1 transition-colors"
                  href="/category/july-crisis"
                >
                  July Crisis
                </Link>
              </li>

            </ul>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="border-t border-hairline mt-14 pt-6 text-ink-3 text-xs flex flex-col lg:flex-row gap-3 md:justify-between">

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