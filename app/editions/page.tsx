import { getCombinedPosts } from "../../lib/posts";
import ArticleSearch from "../components/ArticleSearch";
import PageHeader from "../components/ui/PageHeader";
import { pageMetadata } from "../../lib/seo";

export const metadata = pageMetadata({
  title: "Editions",
  description:
    "Essays, explorations, reflections, and questions — the published writing archive of Notes From a B.Tech Brain.",
  path: "/editions",
});

export default async function EditionsPage({
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
        eyebrow="✍️ What I write"
        title="Editions"
        description={`${allPosts.length} essays, explorations, reflections, and questions. Search by title, keyword, category, or full text.`}
      />

      <ArticleSearch posts={allPosts} initialTag={selectedTag} />
    </main>
  );
}
