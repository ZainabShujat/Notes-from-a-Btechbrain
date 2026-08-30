import PageHeader from "../components/ui/PageHeader";
import { pageMetadata } from "../../lib/seo";

export const metadata = pageMetadata({
  title: "Books",
  description:
    "Long-form work currently being written — a coming-of-age exploration of building a direction when nobody gives you one.",
  path: "/books",
});

export default function BooksPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 sm:px-6 md:px-8 py-16 md:py-24">
      <PageHeader
        eyebrow="📖 What I'm writing"
        title="Books"
        description="The slow work. The things that need more than an article to say."
      />

      {/* Book I */}
      <article className="mt-8 rounded-xl border border-hairline bg-surface-1/50 backdrop-blur-sm p-6 md:p-10">
        <div className="flex items-center gap-3 mb-6">
          <span className="rounded-md bg-accent-muted px-3 py-1 text-xs font-semibold text-accent-soft tracking-wide uppercase">
            Book I
          </span>
          <span className="rounded-md bg-surface-2 px-3 py-1 text-xs font-medium text-ink-2">
            In progress
          </span>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-ink-1 leading-snug mb-4">
          Notes from a B.Tech Brain Volume 1 (Working Title)
        </h2>

        <p className="text-base md:text-lg text-ink-2 leading-relaxed mb-6">
          A coming-of-age exploration of building a direction when nobody gives
          you one. About growing up in a system that tells you to follow the path but
          never explains where it leads. About engineering, ambition, confusion,
          identity, the internet, and figuring things out — slowly, honestly, and
          sometimes in the wrong order.
        </p>

        <div className="rounded-lg bg-surface-2 px-5 py-4">
          <p className="text-sm text-ink-2 leading-relaxed">
            Currently being handwritten.
          </p>
        </div>
      </article>

      {/* Future context */}
      <div className="mt-12 text-center">
        <p className="text-sm text-ink-2 leading-relaxed max-w-md mx-auto">
          More will appear here as the writing grows — excerpts,
          illustrations, progress, and eventually the book itself.
        </p>
      </div>
    </main>
  );
}
