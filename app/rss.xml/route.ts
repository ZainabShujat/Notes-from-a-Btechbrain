import { NextResponse } from "next/server";
import { getCombinedPosts, PostMeta } from "../../lib/posts";
import {
  SITE_URL,
  SITE_NAME,
  SITE_DESCRIPTION,
  AUTHOR_NAME,
  absoluteUrl,
} from "../../lib/seo";

export const revalidate = 3600;

function xmlEscape(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function summarize(post: PostMeta) {
  const source = post.excerpt || post.content || "";
  const stripped = source
    .replace(/<[^>]*>/g, " ")
    .replace(/[#*_`>]/g, "")
    .replace(/\s+/g, " ")
    .trim();

  return stripped.length > 300 ? `${stripped.slice(0, 297)}…` : stripped;
}

export async function GET() {
  let posts: PostMeta[] = [];

  try {
    posts = await getCombinedPosts();
  } catch {
    posts = [];
  }

  const items = posts
    .slice()
    .sort(
      (a, b) =>
        new Date(b.date || b.created_at).getTime() -
        new Date(a.date || a.created_at).getTime()
    )
    .slice(0, 50)
    .map((post) => {
      const url = `${SITE_URL}/post/${post.slug}`;
      const when = post.date || post.created_at;
      const pubDate = when
        ? new Date(when).toUTCString()
        : new Date().toUTCString();

      const enclosure = post.banner
        ? `<enclosure url="${xmlEscape(absoluteUrl(post.banner))}" type="image/${
            post.banner.endsWith(".png") ? "png" : "jpeg"
          }" length="0" />`
        : "";

      const category = post.category
        ? `<category>${xmlEscape(post.category)}</category>`
        : "";

      return `    <item>
      <title>${xmlEscape(post.title)}</title>
      <link>${xmlEscape(url)}</link>
      <guid isPermaLink="true">${xmlEscape(url)}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${xmlEscape(summarize(post))}</description>
      ${category}
      ${enclosure}
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${xmlEscape(SITE_NAME)}</title>
    <link>${SITE_URL}</link>
    <description>${xmlEscape(SITE_DESCRIPTION)}</description>
    <language>en</language>
    <managingEditor>${xmlEscape(AUTHOR_NAME)}</managingEditor>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control":
        "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
