// app/post/[slug]/page.tsx
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import { remark } from "remark";
import html from "remark-html";
import Link from "next/link";
import BackButton from "../../components/BackButton";
import ViewCounter from "../../components/ViewCounter";
import LikeButton from "../../components/LikeButton";
import PostCard from "../../components/PostCard";
import { getAllPosts } from "lib/posts";
// Client wrapper for PostReadTracker (must be imported after all Node.js/server imports)
import PostReadTrackerWrapper from "../../components/PostReadTrackerWrapper";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  const filePath = path.join(process.cwd(), "content", "posts", `${slug}.md`);
  if (!fs.existsSync(filePath)) return notFound();

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  const processed = await remark().use(html).process(content);
  const contentHtml = processed.toString();

  // Related articles logic
  const allPosts = await getAllPosts();
  const related = allPosts.filter(
    (p) =>
      p.slug !== slug &&
      (p.category === data.category || (data.theme && p.theme === data.theme))
  ).slice(0, 3); // Show up to 3 related

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-10 bg-white dark:bg-slate-900">
      {/* Track this post as read for the current session */}
      <PostReadTrackerWrapper slug={slug} postId={data?.id || slug} />
      <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100">{data.title}</h1>
      <div className="flex items-center gap-4 mt-2 text-slate-900 dark:text-slate-300">
        <span>{new Date(data.date).toLocaleDateString()}</span>
        <span>·</span>
        <span>{data.category}</span>
        <span>·</span>
        <ViewCounter slug={slug} />
      </div>

      <div className="mt-4">
        <LikeButton slug={slug} />
      </div>

      {data?.banner && (
        <figure className="w-full rounded-lg mb-6">
          <img
            src={data.banner || ""}
            alt={data.title}
            className="w-full h-auto rounded-lg mx-auto"
            loading="lazy"
          />
        </figure>
      )}


      <article
        className="prose prose-slate mt-6 max-w-none blog-content"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />

      {/* Divider for clarity */}
      <hr className="my-12 border-t-2 border-purple-200 dark:border-purple-700" />
      

      {/* Related articles section - truly outside the article */}

      {related.length > 0 && (
        <section className="w-full py-12">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-4 text-purple-700 dark:text-purple-300 flex items-center gap-4">
            <span role="img" aria-label="Related">🔗</span> Related Articles
          </h2>
          <br /> {/* Extra spacing before the grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
            {related.map((p) => (
              <div key={p.slug} className="min-w-0 w-full">
                <PostCard
                  title={p.title}
                  slug={p.slug}
                  excerpt={p.excerpt}
                  date={p.date}
                  category={p.category}
                  banner={p.banner}
                />
              </div>
            ))}
          </div>
        </section>
      )}
      <div className="mt-10">
        <BackButton />
      </div>
      
    </main>
  );
}

// .blog-content, .blog-content p, .blog-content li, .blog-content small {
//   color: #000 !important;
//   text-shadow: none !important;
// }

// app/lib/posts.ts (or wherever PostMeta is defined)
export interface PostMeta {
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  banner?: string;
  series?: string;
  theme?: string; // <-- Add this line
  // ...any other fields
}