// This file generates a proper XML sitemap for search engines like Google.
import { NextResponse } from 'next/server';
import { getCombinedPosts, PostMeta } from '../../lib/posts';
export const dynamic = 'force-dynamic';
export const revalidate = 0;


export async function GET() {
  const baseUrl = 'https://btechbrain.zainabshujat.dev';

  let posts: PostMeta[] = [];
  try {
    posts = await getCombinedPosts();
  } catch (error) {
    posts = [];
  }

  const staticPages = [
    '',
    'browse',
    'about',
    'start-here',
    'series-hub',
    'admin',
    'community',
    'write/new-post',
    'themes',
    'notifications',
  ];

  const categories = [
    'friday-insights',
    'world-watch',
    'tech-pulse',
    'july-crisis',
    'science-vs-sci-fi',
    'tech-demystified',
    'financial-month',
    'milestone-stories-and-miscellaneous',
    'girlhood-and-stem-experiences',
    'behind-the-scenes',
    'curiosity-series',
  ];

  function xmlEscape(str: string) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  let urls = [
    ...staticPages.map((page) =>
      `<url><loc>${baseUrl}/${page}</loc></url>`
    ),
    ...categories.map((cat) =>
      `<url><loc>${baseUrl}/category/${cat}</loc></url>`
    ),
    ...posts.map((post) =>
      `<url><loc>${baseUrl}/post/${xmlEscape(post.slug)}</loc><lastmod>${post.date ? new Date(post.date).toISOString() : new Date().toISOString()}</lastmod></url>`
    ),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls.join('\n') +
    `\n</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
