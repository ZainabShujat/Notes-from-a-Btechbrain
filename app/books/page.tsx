import PageHeader from "../components/ui/PageHeader";
import { pageMetadata } from "../../lib/seo";
import { BOOK_PROJECTS } from "../../lib/featured-resources";

export const metadata = pageMetadata({
  title: "Books",
  description:
    BOOK_PROJECTS[0].description,
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

      {BOOK_PROJECTS.map((book, index) => (
        <article key={book.id} className="mt-8 rounded-xl border border-hairline bg-surface-1 p-6 backdrop-blur-sm md:p-10">
          <div className="mb-6 flex items-center gap-3">
            <span className="rounded-md bg-accent-muted px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent-soft">Book {index + 1}</span>
            <span className="rounded-md bg-surface-2 px-3 py-1 text-xs font-medium text-ink-2">{book.status}</span>
          </div>
          <h2 className="mb-4 text-2xl font-bold leading-snug text-ink-1 md:text-3xl">{book.title}</h2>
          <p className="mb-6 text-base leading-relaxed text-ink-2 md:text-lg">{book.description}</p>
          <div className="rounded-lg bg-surface-2 px-5 py-4"><p className="text-sm leading-relaxed text-ink-2">{book.statusNote}</p></div>
        </article>
      ))}
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
