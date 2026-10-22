import Link from "next/link";

type Props = {
  basePath: string;
  subjects: { slug: string; title: string; count: number }[];
  activeSlug: string;
  activeClassName: string;
};

/** Subject chips that switch a revision page via `?subject=`, so it works without JS. */
export default function SubjectSwitcher({ basePath, subjects, activeSlug, activeClassName }: Props) {
  return (
    <nav
      aria-label="Choose subject"
      className="flex flex-nowrap md:flex-wrap items-center gap-2 mb-8 pb-4 border-b border-hairline text-xs font-mono overflow-x-auto md:overflow-visible -mx-4 px-4 sm:mx-0 sm:px-0"
    >
      <span className="shrink-0 text-ink-3 text-[11px] font-bold uppercase tracking-wider mr-1">SUBJECT:</span>
      {subjects.map((subject) => {
        const isActive = subject.slug === activeSlug;
        return (
          <Link
            key={subject.slug}
            href={`${basePath}?subject=${subject.slug}`}
            aria-current={isActive ? "page" : undefined}
            className={
              isActive
                ? `shrink-0 whitespace-nowrap px-3 py-1.5 rounded font-semibold shadow-2xs ${activeClassName}`
                : "shrink-0 whitespace-nowrap px-3 py-1.5 rounded bg-surface-2 text-ink-2 border border-hairline/60 hover:text-ink-1 hover:border-hairline transition-colors"
            }
          >
            {subject.title} ({subject.count})
          </Link>
        );
      })}
    </nav>
  );
}
