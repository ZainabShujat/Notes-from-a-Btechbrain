import { getCombinedPosts, PostMeta } from "../../../lib/posts";
import PostCard from "../../components/PostCard";
import PageHeader from "../../components/ui/PageHeader";
import { pageMetadata } from "../../../lib/seo";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ category: string }>; // <- params is a Promise in this runtime
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const name = category
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  const posts = await getCombinedPosts();
  const count = posts.filter(
    (p: PostMeta) => (p.category || "").toLowerCase() === category.toLowerCase()
  ).length;

  // Use the newest post in the category as the share image.
  const cover = posts.find(
    (p: PostMeta) =>
      (p.category || "").toLowerCase() === category.toLowerCase() && p.banner
  )?.banner;

  return pageMetadata({
    title: name,
    description: `${count} article${count === 1 ? "" : "s"} in ${name} on Notes From a BTech Brain.`,
    path: `/category/${category}`,
    image: cover,
  });
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params; // await the promise
  const cat = category.toLowerCase();

  const posts = await getCombinedPosts();
  const filtered = posts.filter(
    (p: PostMeta) => (p.category || "").toLowerCase() === cat
  );

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 py-16 md:py-24">
      <PageHeader
        eyebrow="Category"
        title={<span className="capitalize">{category.replace(/-/g, " ")}</span>}
        description={`${filtered.length} post${filtered.length === 1 ? "" : "s"}`}
      />

      {filtered.length === 0 && (
        <p className="mt-4 text-ink-3">No posts in this category yet.</p>
      )}

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((p: PostMeta) => (
          <PostCard
            key={p.slug}
            title={p.title}
            slug={p.slug}
            tags={p.tags}
            excerpt={p.excerpt}
            date={p.date}
            created_at={p.created_at}
            category={p.category}
            banner={p.banner}

          />
        ))}
      </div>
    </main>
  );
}
