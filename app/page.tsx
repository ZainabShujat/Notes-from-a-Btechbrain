import { getAllPosts, getLatestPerCategory } from "../lib/posts";
import { upcomingSeries } from "../lib/upcoming-series";
import Hero from "./components/Hero";
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

      {/* Start Here Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 py-12">
        <div className="max-w-2xl mx-auto rounded-2xl bg-black/20 dark:bg-black/30 backdrop-blur-md shadow-lg p-8 flex flex-col items-center border-2 border-yellow-200" style={{boxShadow: '0 0 32px 4px rgba(168,85,247,0.25)'}}>
          <h2 className="text-center text-3xl md:text-4xl font-extrabold tracking-tight mb-2 text-white">
            ⭐ <span className="text-yellow-400">Start Here</span>
          </h2>
          <p className="text-center text-white/80 mt-1 text-lg md:text-xl font-medium mb-6">
            Not sure where to begin? This is your guide to the best starting points, handpicked for new readers.
          </p>
          <Link href="/start-here">
            <span className="inline-block px-8 py-3 rounded-full bg-purple-700 hover:bg-purple-800 text-white font-bold text-lg shadow-lg transition-colors border-4 border-white/20">
              Guide Me
            </span>
          </Link>
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
              No posts yet. Create one in{" "}
              <Link href="/admin" className="underline text-purple-600">
                /admin
              </Link>
              .
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
