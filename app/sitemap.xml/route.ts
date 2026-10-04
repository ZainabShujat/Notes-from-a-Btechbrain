// This file generates a proper XML sitemap for search engines like Google.
import { NextResponse } from 'next/server';
import { getCombinedPosts, PostMeta } from '../../lib/posts';
import { SITE_URL } from '../../lib/seo';

// Rebuilt at most once an hour rather than on every crawler hit.
export const revalidate = 3600;

export async function GET() {
  const baseUrl = SITE_URL;

  let posts: PostMeta[] = [];
  try {
    posts = await getCombinedPosts();
  } catch {
    posts = [];
  }

  // Legitimate public pages only.
  // Private/admin/write/api endpoints are strictly excluded.
  const staticPages = [
    '',
    'notes',
    'notes/operating-systems',
    'editions',
    'work',
    'wonder',
    'games',
    'books',
    'about',
    'start-here',
    'all-posts',
    'map',
  ];

  // Complete, verified lessons from the Operating Systems notebook
  const completeLessonPages = [
    'notes/operating-systems/why-operating-systems-exist',
    'notes/operating-systems/dual-mode-and-system-calls',
    'notes/operating-systems/what-is-a-process',
    'notes/operating-systems/process-states-and-transitions',
    'notes/operating-systems/context-switching',
    'notes/operating-systems/inter-process-communication',
    'notes/operating-systems/scheduling-basics',
    'notes/operating-systems/fcfs-and-round-robin',
    'notes/operating-systems/sjf-srtf-priority-scheduling',
    'notes/operating-systems/critical-section-and-semaphores',
    'notes/operating-systems/deadlock-principles-and-bankers',
    'notes/operating-systems/paging-and-tlb',
    'notes/operating-systems/page-replacement-algorithms',
    'notes/operating-systems/file-allocation-and-inodes',
    'notes/operating-systems/disk-scheduling-algorithms',
  ];

  // Derived from the posts themselves so the sitemap cannot drift out of
  // sync with what the site actually publishes.
  const categories = Array.from(
    new Set(
      posts
        .map((p) => (p.category || '').trim().toLowerCase())
        .filter(Boolean)
    )
  ).sort();

  const iWonderWhySubcategories = [
    'language-thought-inner-experience',
    'memory-time-mind',
    'curiosity-patterns-being-human',
    'math-structure-quiet-beauty',
    'code-work-learning-hard-way',
    'dreams-imagination-inner-narratives',
  ];

  function xmlEscape(str: string) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  }

  const urls = [
    ...staticPages.map(
      (page) =>
        `<url><loc>${baseUrl}${page ? `/${page}` : '/'}</loc></url>`
    ),

    ...completeLessonPages.map(
      (page) =>
        `<url><loc>${baseUrl}/${xmlEscape(page)}</loc></url>`
    ),

    ...categories.map(
      (cat) => `<url><loc>${baseUrl}/category/${xmlEscape(cat)}</loc></url>`
    ),

    ...iWonderWhySubcategories.map(
      (sub) =>
        `<url><loc>${baseUrl}/category/i-wonder-why/${xmlEscape(sub)}</loc></url>`
    ),

    ...posts.map((post) => {
      const when = post.date || post.created_at;
      let lastmod = new Date().toISOString();
      if (when) {
        const parsed = new Date(when);
        if (!isNaN(parsed.getTime())) {
          lastmod = parsed.toISOString();
        }
      }

      return `<url><loc>${baseUrl}/post/${xmlEscape(post.slug)}</loc><lastmod>${lastmod}</lastmod></url>`;
    }),
  ];

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls.join('\n') +
    `\n</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
