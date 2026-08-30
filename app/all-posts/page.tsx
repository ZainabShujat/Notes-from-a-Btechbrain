import { getCombinedPosts } from "../../lib/posts";
import ArticleSearch from "../components/ArticleSearch";
import PageHeader from "../components/ui/PageHeader";
import { pageMetadata } from "../../lib/seo";

export const metadata = pageMetadata({
  title: "All Posts",
  description:
    "Search and explore every article — by title, keyword, category, or full text.",
  path: "/all-posts",
});

export default async function AllPostsPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>;
}) {
  const allPosts = await getCombinedPosts();

  const params = await searchParams;
  const selectedTag = params?.tag || "";

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 py-16 md:py-24">
      <PageHeader
        eyebrow="The archive"
        title="All Posts"
        description={`Search through ${allPosts.length} posts by title, keywords, category, or full content.`}
      />

      <ArticleSearch
        posts={allPosts}
        initialTag={selectedTag}
      />
    </main>
  );
}
