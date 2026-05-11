import { getCombinedPosts } from "../lib/posts";
import Hero from "./components/Hero";
import RecentReads from "./components/RecentReads";
import CategoryCard from "./components/CategoryCard";
import PostCard from "./components/PostCard";
import Link from "next/link";
import StartHereBannerWrapper from "./components/StartHereBannerWrapper";
import { supabase } from "../lib/supabase";

export default async function Home() {
  const posts = (await getCombinedPosts())
  .sort(
    (a, b) =>
      new Date(b.date || b.created_at).getTime() -
      new Date(a.date || a.created_at).getTime()
  )
  .slice(0, 3);
  return (
    <main className="bg-linear-to-br from-violet-900 to-zinc-950 text-white">
      
      {/* Hero */}
      <StartHereBannerWrapper />
      <Hero />

      {/* Recent Reads */}
      <div className="mt-4 w-full flex justify-center px-4">
        <RecentReads />
      </div>

      {/* This Month's Series */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 py-10">
        <h2 className="text-center text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-2">
          📅 This Month’s <span className="text-purple-300">Series</span>
        </h2>

        <p className="text-center text-zinc-400 text-lg md:text-xl mb-8">
          Current featured explorations and themed writing.
        </p>

        <div className="flex justify-center">
          <div className="rounded-2xl w-full max-w-5xl">
            <CategoryCard
              color="orange"
              title="science vs. sci-fi"
              desc="Exploring the intersection of science and science fiction."
              href="/category/science-vs-sci-fi"
            />
          </div>
        </div>
      </section>

      {/* Start Here Preview */}
      <section className="mx-auto max-w-3xl px-4 sm:px-6 md:px-8 py-8">
        <div className="rounded-2xl bg-purple-900/70 backdrop-blur-md shadow-lg p-6 md:p-8 border border-purple-700/40">
          
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 flex items-center gap-2">
            ⭐ What’s Inside{" "}
            <span className="text-yellow-300">Start Here</span>
          </h3>

          <p className="text-zinc-200 mb-4 text-base md:text-lg">
            The <span className="font-semibold">Start Here</span> guide helps
            you find your way in. Pick a starting point based on your mood or
            what you’re curious about:
          </p>

          <ul className="list-disc pl-6 space-y-2 text-zinc-300 text-base md:text-lg mb-4">
            <li>
              <span className="font-semibold text-white">
                🧩 Feeling curious?
              </span>{" "}
              — Mind-bending puzzles and playful logic
            </li>

            <li>
              <span className="font-semibold text-white">
                🧭 Feeling lost or questioning everything?
              </span>{" "}
              — Honest stories about internships, burnout, and finding your way
            </li>

            <li>
              <span className="font-semibold text-white">
                👀 Need to feel understood?
              </span>{" "}
              — Reflections on identity, safety, and being seen
            </li>

            <li>
              <span className="font-semibold text-white">
                🌱 Want a fresh start?
              </span>{" "}
              — Processing chaos and finding clarity
            </li>

            <li>
              <span className="font-semibold text-white">
                🔨 Building or rebuilding?
              </span>{" "}
              — Growth, setbacks, and small wins
            </li>

            <li>
              <span className="font-semibold text-white">
                🤖 Curious about tech & the future?
              </span>{" "}
              — Demystifying crypto and digital change
            </li>
          </ul>

          <p className="text-zinc-400 text-sm">
            Find the post that fits you best or just explore.{" "}
            <Link
              href="/start-here"
              className="underline text-yellow-300 hover:text-yellow-200 transition-colors"
            >
              See all starting points →
            </Link>
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 py-12">

        <h2 className="text-center text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-2">
          ✨ Browse by <span className="text-purple-300">topic</span>
        </h2>

        <p className="text-center text-zinc-400 mt-1 text-lg md:text-xl font-medium mb-8">
          Different angles: tech, world events, and personal growth.
        </p>

        {/* Ongoing */}
        <div className="mt-8">
          <h3 className="text-center text-xl md:text-2xl font-bold mb-5 text-zinc-100">
            Ongoing
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">

            <CategoryCard
              color="border-blue-400"
              title="Curiosity Series"
              desc="Exploring questions, ideas, and the joy of learning."
              href="/category/curiosity-series"
            />

            <CategoryCard
              color="border-blue-300"
              title="Behind the scenes"
              desc="A mini-series that shows behind the scenes of building projects."
              href="/category/behind-the-scenes"
            />
            <CategoryCard
              color="orange"
              title="Science vs. Sci-fi"
              desc="Exploring the intersection of science and science fiction."
              href="/category/science-vs-sci-fi"
            />

            <CategoryCard
              color="border-emerald-300"
              title="Milestone Stories and Miscellaneous"
              desc="Other notable posts and stories."
              href="/category/milestone-stories-and-miscellaneous"
            />
          </div>
        </div>

        {/* Monthly Themes */}
        <div className="mt-12">
          <h3 className="text-center text-xl md:text-2xl font-bold mb-5 text-zinc-100">
            Monthly Themes
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">

            <CategoryCard
              color="border-amber-300"
              title="July Crisis"
              desc="A mini-series on student struggles."
              href="/category/july-crisis"
            />


            <CategoryCard
              color="border-amber-500"
              title="Tech Demystified"
              desc="Simplifying complex tech topics."
              href="/category/tech-demystified"
            />

            <CategoryCard
              color="border-green-300"
              title="Financial Month"
              desc="Student stories on finance."
              href="/category/financial-month"
            />

            <CategoryCard
              color="border-emerald-500"
              title="Girlhood Arc Series"
              desc="A documentation of the vivid experiences of a girl in STEM."
              href="/category/girlhood-and-stem-experiences"
            />

          </div>
        </div>

        {/* Retired */}
        <div className="mt-12">
          <h3 className="text-center text-xl md:text-2xl font-bold mb-5 text-zinc-400">
            Retired Categories
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <CategoryCard
              color="theme"
              title="I Wonder Why"
              desc="A journey of curiosity and discovery."
              href="/category/i-wonder-why"
            />

            <CategoryCard
              color="border-purple-500"
              title="Friday Insights"
              desc="Reflections and personal growth."
              href="/category/friday-insights"
            />

            <CategoryCard
              color="border-pink-400"
              title="World Watch"
              desc="Weekly geopolitical summaries."
              href="/category/world-watch"
            />

            <CategoryCard
              color="border-pink-300"
              title="Tech Pulse"
              desc="Latest technology trends."
              href="/category/tech-pulse"
            />
          </div>
        </div>
      </section>

      {/* Recent Posts */}
      <section
        id="recent"
        className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 py-12"
      >
        <div className="flex items-center justify-between mb-4">

          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
            🗂️ Recent <span className="text-purple-300">Posts</span>
          </h2>

          <Link
            href="/all-posts"
            className="text-purple-400 underline text-base md:text-lg font-semibold hover:text-purple-300 transition-colors"
            prefetch={false}
          >
            See all
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center">

          {posts.length === 0 && (
            <p className="text-zinc-500">
              No posts yet. Create one in{" "}
              <Link
                href="/write/new-post"
                className="underline text-purple-400"
              >
                the editor
              </Link>
            </p>
          )}

          {posts.map((p) => (
            <PostCard
              key={p.slug}
              title={p.title}
              slug={p.slug}
              excerpt={p.excerpt}
              date={p.date}
              created_at={p.created_at}
              category={p.category}
              banner={p.banner}
            />
          ))}
        </div>
      </section>
    </main>
  );
}