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
import { getCombinedPosts, getPostBySlug } from "../../../lib/posts";
import {
  SITE_NAME,
  SITE_URL,
  AUTHOR_NAME,
  absoluteUrl,
} from "../../../lib/seo";
import type { Metadata } from "next";
import { supabase } from "../../../lib/supabase";
// Client wrapper for PostReadTracker (must be imported after all Node.js/server imports)
import PostReadTrackerWrapper from "../../components/PostReadTrackerWrapper";
import { getRelatedPosts } from "../../../lib/map";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function plainExcerpt(text: string | undefined, fallback: string) {
  if (!text) return fallback;
  const stripped = text.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  if (!stripped) return fallback;
  return stripped.length > 160 ? `${stripped.slice(0, 157)}…` : stripped;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: "Post not found", robots: { index: false, follow: false } };
  }

  const url = `${SITE_URL}/post/${slug}`;
  const description = plainExcerpt(
    post.excerpt || post.content,
    `${post.title} — an article on ${SITE_NAME}.`
  );
  const image = absoluteUrl(post.banner);
  const published = post.date || post.created_at;

  return {
    title: post.title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      siteName: SITE_NAME,
      title: post.title,
      description,
      url,
      images: [{ url: image, alt: post.title }],
      publishedTime: published
        ? new Date(published).toISOString()
        : undefined,
      authors: [AUTHOR_NAME],
      section: post.category,
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: [image],
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

 const filePath = path.join(
  process.cwd(),
  "content",
  "posts",
  `${slug}.md`
);

let data;
let contentHtml = "";

if (fs.existsSync(filePath)) {
  // MARKDOWN POST

  const raw = fs.readFileSync(filePath, "utf8");

  const parsed = matter(raw);

  data = parsed.data;

  const processed = await remark()
    .use(html)
    .process(parsed.content);

  contentHtml = processed.toString();

} else {

  // SUPABASE POST

  const { data: dbPost, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !dbPost) {
    return notFound();
  }

  data = dbPost;

  contentHtml = dbPost.content;
}

  // Related articles logic
  const allPosts = await getCombinedPosts();
  const related = getRelatedPosts(data, allPosts)
  .slice(0, 3);

  return (
    <main className="max-w-4xl mx-auto my-10 px-4 sm:px-6 md:px-8 py-10 bg-surface-1 border border-hairline backdrop-blur-md text-ink-2 rounded-lg shadow-card">
      {/* Structured data — lets Google show this as a rich result
          rather than a plain link. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: data.title,
            image: [absoluteUrl(data.banner)],
            datePublished: data.date || data.created_at
              ? new Date(data.date || data.created_at).toISOString()
              : undefined,
            dateModified: data.updated_at
              ? new Date(data.updated_at).toISOString()
              : data.date || data.created_at
                ? new Date(data.date || data.created_at).toISOString()
                : undefined,
            author: {
              "@type": "Person",
              name: AUTHOR_NAME,
              url: "https://zainabshujat.dev/",
            },
            publisher: {
              "@type": "Organization",
              name: SITE_NAME,
              logo: {
                "@type": "ImageObject",
                url: absoluteUrl("/thumbnail.png"),
              },
            },
            mainEntityOfPage: `${SITE_URL}/post/${slug}`,
            articleSection: data.category,
            keywords: Array.isArray(data.tags) ? data.tags.join(", ") : undefined,
          }),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
              {
                "@type": "ListItem",
                position: 2,
                name: data.category || "Posts",
                item: `${SITE_URL}/category/${data.category || ""}`,
              },
              {
                "@type": "ListItem",
                position: 3,
                name: data.title,
                item: `${SITE_URL}/post/${slug}`,
              },
            ],
          }),
        }}
      />

      {/* Track this post as read for the current session */}
      <PostReadTrackerWrapper slug={slug} postId={data?.id || slug} />
      <h1 className="text-3xl md:text-4xl font-bold text-highlight">{data.title}</h1>
      <div className="flex items-center gap-4 mt-2 text-ink-3">
        <span>{new Date(
  data.date || data.created_at
).toLocaleDateString()}</span>
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
      <hr className="my-12 border-t border-hairline" />

      {/* Related articles section - truly outside the article */}

      {related.length > 0 && (
        <section className="w-full py-12">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4 text-ink-1 flex items-center gap-4">
            <span role="img" aria-label="Related">🔗</span> Related Articles
          </h2>
          <br /> {/* Extra spacing before the grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
            {related.map((p) => (
              <div key={p.post.slug} className="min-w-0 w-full">
                <PostCard
                  title={p.post.title}
                  slug={p.post.slug}
                  tags={p.post.tags}
                  excerpt={p.post.excerpt}
                  date={p.post.date || p.post.created_at}
                  category={p.post.category}
                  banner={p.post.banner}
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