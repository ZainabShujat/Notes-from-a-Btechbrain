import Link from "next/link";
import { getCombinedPosts } from "../../lib/posts";
import { buildMagazines, formatRange } from "../../lib/magazines";
import PageHeader from "../components/ui/PageHeader";
import { pageMetadata } from "../../lib/seo";
import MagazineCover from "./MagazineCover";
import "./magazines.css";

export const metadata = pageMetadata({
  title: "Editions",
  description:
    "Every series from Notes From a B.Tech Brain, bound as its own magazine. Pick one off the shelf and read it cover to cover.",
  path: "/editions",
});

export default async function EditionsPage() {
  const posts = await getCombinedPosts();
  const magazines = buildMagazines(posts);

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 py-16 md:py-24">
      <PageHeader
        eyebrow="✍️ What I write"
        title="The magazine shelf"
        description={`${posts.length} editions, bound into ${magazines.length} magazines. Pick one off the shelf and read it cover to cover.`}
        actions={
          <Link
            href="/all-posts"
            className="inline-flex items-center rounded-full border border-hairline-strong bg-surface-2 px-5 py-2 text-sm font-semibold text-ink-1 transition-colors hover:bg-surface-3"
          >
            Search every edition →
          </Link>
        }
      />

      <ul className="mz-shelf grid list-none grid-cols-2 gap-x-6 gap-y-16 p-0 sm:grid-cols-3 lg:grid-cols-4 lg:gap-x-10">
        {magazines.map((mag) => (
          <li key={mag.slug} className="mz-slot">
            <Link href={`/editions/${mag.slug}`} className="block" aria-label={`Read ${mag.title}`}>
              <MagazineCover magazine={mag} />
            </Link>
            <div className="mt-6">
              <h2 className="m-0 text-base font-bold leading-snug text-ink-1">{mag.title}</h2>
              <p className="mt-1 mb-0 text-xs font-semibold uppercase tracking-wider text-ink-3">
                {formatRange(mag.oldest, mag.newest)}
              </p>
              {mag.tagline && <p className="mt-2 mb-0 text-sm leading-relaxed text-ink-2">{mag.tagline}</p>}
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
