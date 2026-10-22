import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { remark } from "remark";
import html from "remark-html";
import { getCombinedPosts } from "../../../lib/posts";
import { buildMagazines, formatRange, MAGAZINES, titleInMagazine } from "../../../lib/magazines";
import { pageMetadata } from "../../../lib/seo";
import MagazineCover from "../MagazineCover";
import MagazineReader, { type ReaderEdition } from "../MagazineReader";
import "../magazines.css";

type PageProps = {
  params: Promise<{ magazine: string }>;
};

async function getMagazine(slug: string) {
  const posts = await getCombinedPosts();
  return buildMagazines(posts).find((m) => m.slug === slug);
}

export async function generateStaticParams() {
  return MAGAZINES.map((m) => ({ magazine: m.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { magazine: slug } = await params;
  const magazine = await getMagazine(slug);
  if (!magazine) return { title: "Not found" };

  return pageMetadata({
    title: magazine.title,
    description: `${magazine.tagline} ${magazine.posts.length} editions, read cover to cover.`.trim(),
    path: `/editions/${magazine.slug}`,
    image: [...magazine.posts].reverse().find((p) => p.banner)?.banner,
  });
}

export default async function MagazinePage({ params }: PageProps) {
  const { magazine: slug } = await params;
  const magazine = await getMagazine(slug);
  if (!magazine) notFound();

  // Same pipeline as the post page, so an edition reads the same in both places.
  const editions: ReaderEdition[] = await Promise.all(
    magazine.posts.map(async (post) => ({
      slug: post.slug,
      title: titleInMagazine(post.title, magazine.title),
      date: post.date || post.created_at,
      banner: post.banner,
      html: (await remark().use(html).process(post.content || "")).toString(),
    }))
  );

  return (
    <MagazineReader
      title={magazine.title}
      tagline={magazine.tagline}
      range={formatRange(magazine.oldest, magazine.newest)}
      accent={magazine.accent}
      cover={<MagazineCover magazine={magazine} size="lg" />}
      editions={editions}
    />
  );
}
