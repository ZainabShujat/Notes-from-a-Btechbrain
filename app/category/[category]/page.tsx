import { getCombinedPosts, PostMeta } from "../../../lib/posts";
import PostCard from "../../components/PostCard";
import PageHeader from "../../components/ui/PageHeader";

type Props = {
  params: Promise<{ category: string }>; // <- params is a Promise in this runtime
};

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

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center">
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
