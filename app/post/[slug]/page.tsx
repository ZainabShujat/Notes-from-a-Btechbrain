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

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-10 bg-white dark:bg-slate-900">
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