import { getAllPosts, getLatestPerCategory } from "../lib/posts";
import { upcomingSeries } from "../lib/upcoming-series";
import Hero from "./components/Hero";
import RecentReads from "./components/RecentReads";
import CategoryCard from "./components/CategoryCard";
import SeriesTrailerCard from "./components/SeriesTrailerCard";
import PostCard from "./components/PostCard";
import Link from "next/link";
import StartHereBannerWrapper from "./components/StartHereBannerWrapper";

export default async function Home() {
  const allPosts = await getAllPosts();
  const posts = allPosts.slice(0, 3); // Get latest 3 posts by date

  return (
    <main>
      <StartHereBannerWrapper />
      <Hero />
      {/* RecentReads card below Latest Drop, above buttons */}
        <div className="mt-4 w-full flex justify-center">
          <RecentReads />
        </div>
         {/* Latest Drop Card - enhanced, now below RecentReads */}
        <div className="mt-10 w-full max-w-xl mx-auto bg-white/20 border border-purple-400 rounded-3xl p-8 shadow-2xl backdrop-blur-2xl text-left flex flex-col gap-4 glow-purple"
          style={{boxShadow: '0 0 32px 8px #a855f7, 0 2px 32px 0 rgba(0,0,0,0.25), 0 0 16px 4px #a855f7', border: '2px solid #a855f7'}}>
          <div className="flex items-center gap-3 text-xl font-extrabold text-white drop-shadow-lg">
            <span className="text-2xl">📚</span> Latest Drop
          </div>
          <div className="text-2xl md:text-3xl font-bold text-white mt-2 drop-shadow-xl">
            I Wonder Why Developers Keep Reinventing the Same Apps
          </div>
          <div className="text-sm text-white/80 mt-2 flex flex-wrap gap-2">
            <span>3 min read</span>
            <span>•</span>
            <span>Tech</span>
            <span>•</span>
            <span>Behind the scenes</span>
          </div>
          <div className="mt-5">
            <Link href="post/why-developers-reinvent-apps" className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-linear-to-r from-indigo-400 via-purple-500 to-green-400 text-white font-bold shadow-xl hover:from-indigo-500 hover:to-green-500 transition text-lg">
              Start Reading <span className="text-2xl">→</span>
            </Link>
          </div>
        </div>
      
      {/* This Month's Series */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 py-8">
        <h2 className="text-center text-2xl md:text-3xl font-extrabold tracking-tight mb-4 birthday-gold-header">
          📅 This Month's Series
        </h2>
        <div className="flex justify-center mt-6">
          <div className="rounded-2xl w-full max-w-5xl p-8">
            <CategoryCard
              color="theme"
              title="I Wonder Why"
              desc="A journey of curiosity and discovery."
              href="/category/i-wonder-why"
            />
          </div>
        </div>
      </section>

      {/* Start Here Preview Section (moved below series, above main Start Here) */}
      <section className="mx-auto max-w-3xl px-4 sm:px-6 md:px-8 pt-8 pb-2">
        <div className="rounded-2xl bg-purple-900/80 dark:bg-purple-900/60 backdrop-blur-md shadow-lg p-6 md:p-8 border-l-4 border-yellow-300 mb-6">
          <h3 className="text-2xl md:text-3xl font-bold text-yellow-200 mb-2 flex items-center gap-2">
            <span className="text-3xl">⭐</span> What’s Inside <span className="text-yellow-300">Start Here</span>
          </h3>
          <p className="text-white/90 mb-3 text-base md:text-lg">The <span className="font-semibold">Start Here</span> guide helps you find your way in. Pick a starting point based on your mood or what you’re curious about:</p>
          <ul className="list-disc pl-6 space-y-1 text-white/80 text-base md:text-lg mb-2">
            <li><span className="font-semibold">🧩 Feeling curious?</span> — Mind-bending puzzles and playful logic</li>
            <li><span className="font-semibold">🧭 Feeling lost or questioning everything?</span> — Honest stories about internships, burnout, and finding your way</li>
            <li><span className="font-semibold">👀 Need to feel understood?</span> — Reflections on identity, safety, and being seen</li>
            <li><span className="font-semibold">🌱 Want a fresh start?</span> — Processing chaos and finding clarity</li>
            <li><span className="font-semibold">🔨 Building or rebuilding?</span> — Growth, setbacks, and small wins</li>
            <li><span className="font-semibold">🤖 Curious about tech & the future?</span> — Demystifying crypto and digital change</li>
          </ul>
          <p className="text-white/70 text-sm">Find the post that fits you best—or just explore. <Link href="/start-here" className="underline text-yellow-300 hover:text-yellow-200">See all starting points →</Link></p>
        </div>
      </section>


      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 py-12">
        <h2 className="text-center text-3xl md:text-4xl font-extrabold tracking-tight mb-2 text-white">
          ✨ <span className="text-purple-300">Browse by topic</span>
        </h2>
        <p className="text-center text-white/80 mt-1 text-lg md:text-xl font-medium mb-6">
          Different angles: tech, world events, and personal growth.
        </p>

        {/* Ongoing */}
        <div className="mt-6">
          <h3 className="text-center text-xl md:text-2xl font-bold mb-4 text-white">Ongoing</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <CategoryCard color="border-blue-400" title="Curiosity Series" desc="Exploring questions, ideas, and the joy of learning." href="/category/curiosity-series" />
            <CategoryCard color="border-blue-300" title="Behind the scenes" desc="A mini-series that shows behind the scenes of building projects." href="/category/behind-the-scenes" />
            <CategoryCard color="theme" title="I Wonder Why" desc="A journey of curiosity and discovery." href="/category/i-wonder-why" />
            <CategoryCard color="border-emerald-300" title="Milestone Stories and Miscellaneous" desc="Other notable posts and stories." href="/category/milestone-stories-and-miscellaneous" />
          </div>
        </div>

        {/* Monthly Themes */}
        <div className="mt-10">
          <h3 className="text-center text-xl md:text-2xl font-bold mb-4 text-white">Monthly Themes</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <CategoryCard color="border-amber-300" title="July Crisis" desc="A mini-series on student struggles." href="/category/july-crisis" />
            <CategoryCard color="border-amber-500" title="Tech Demystified" desc="Simplifying complex tech topics." href="/category/tech-demystified" />
            <CategoryCard color="border-green-300" title="Financial Month" desc="Student stories on finance." href="/category/financial-month" />
            <CategoryCard color="border-emerald-500" title="Girlhood Arc Series" desc="A documentation of the vivid experiences of a girl in STEM." href="/category/girlhood-and-stem-experiences" />
          </div>
        </div>

        {/* Retired Categories */}
        <div className="mt-10">
          <h3 className="text-center text-xl md:text-2xl font-bold mb-4 text-slate-400 dark:text-slate-100">Retired Categories</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <CategoryCard color="border-purple-500" title="Friday Insights" desc="Reflections and personal growth." href="/category/friday-insights" />
            <CategoryCard color="border-pink-400" title="World Watch" desc="Weekly geopolitical summaries." href="/category/world-watch" />
            <CategoryCard color="border-pink-300" title="Tech Pulse" desc="Latest technology trends." href="/category/tech-pulse" />
          </div>
        </div>
      </section>

      {/* Coming Soon Series */}
      {upcomingSeries.length > 0 && (
        <section className="mx-auto max-w-screen-xl px-4 sm:px-6 md:px-8 py-12">
          <h2 className="text-center text-2xl md:text-3xl font-extrabold tracking-tight mb-2">
            🎬 <span className="text-purple-600">Coming Soon</span>
          </h2>
          <p className="text-center text-slate-600 mt-1 text-lg md:text-xl font-medium mb-6">
            Exciting new series launching next month.
          </p>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingSeries.map((series) => (
              <SeriesTrailerCard
                key={series.id}
                title={series.title}
                description={series.description}
                editionCount={series.editionCount}
                launchTimeline={series.launchTimeline}
                color={series.color}
                tagline={series.tagline}
              />
            ))}
          </div>
        </section>
      )}

      {/* Recent Posts - moved just above the footer */}
      <section
        id="recent"
        className="mx-auto max-w-screen-xl px-4 sm:px-6 md:px-8 py-12"
      >
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            🗂️ Recent Posts
          </h2>
          <Link
            href="/all-posts"
            className="text-purple-600 underline text-base md:text-lg font-semibold hover:text-purple-800 transition-colors"
            prefetch={false}
          >
            See all
          </Link>
        </div>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center">
          {posts.length === 0 && (
            <p className="text-slate-600">
              No posts yet. Create one in
              <Link href="/admin" className="underline text-purple-600">
                /admin
              </Link>.
            </p>
          )}
          {posts.map((p) => (
            <PostCard
              key={p.slug}
              title={p.title}
              slug={p.slug}
              excerpt={p.excerpt}
              date={p.date}
              category={p.category}
              banner={p.banner}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

