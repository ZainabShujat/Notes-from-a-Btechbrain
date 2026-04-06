import { getAllPosts } from "../../lib/posts";
import ArticleSearch from "../components/ArticleSearch";

export const metadata = {
  title: "All Posts | Notes Brain",
  description: "Search and explore all posts",
};

export default async function AllPostsPage() {
  const allPosts = await getAllPosts();

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 py-12 text-slate-900 dark:text-slate-100">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-200 dark:text-slate-100 mb-2">
          All Posts
        </h1>
        <p className="text-slate-300 dark:text-slate-100">
          Search through {allPosts.length} posts by title, keywords, category, or full content
        </p>
      </div>
      <ArticleSearch posts={allPosts} />
    </main>
  );
}
