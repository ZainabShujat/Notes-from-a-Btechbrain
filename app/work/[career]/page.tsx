import { notFound } from "next/navigation";
import Link from "next/link";
import { DOMAINS } from "../data";
import PageHeader from "../../components/ui/PageHeader";
import { pageMetadata } from "../../../lib/seo";

type Props = {
  params: Promise<{ career: string }>;
};

function findCareer(slug: string) {
  for (const domain of DOMAINS) {
    const career = domain.careers.find((c) => c.slug === slug);
    if (career) return { career, domain };
  }
  return null;
}

export async function generateMetadata({ params }: Props) {
  const { career: slug } = await params;
  const result = findCareer(slug);
  if (!result) return {};
  return pageMetadata({
    title: result.career.title,
    description: result.career.description,
    path: `/work/${slug}`,
  });
}

export async function generateStaticParams() {
  return DOMAINS.flatMap((domain) =>
    domain.careers.map((career) => ({ career: career.slug }))
  );
}

export default async function CareerPage({ params }: Props) {
  const { career: slug } = await params;
  const result = findCareer(slug);

  if (!result) notFound();

  const { career, domain } = result;

  return (
    <main className="mx-auto max-w-3xl px-4 sm:px-6 md:px-8 py-16 md:py-24">
      <div className="mb-8">
        <Link
          href="/work"
          className="text-sm text-accent-soft underline underline-offset-2 hover:text-ink-1 transition-colors"
        >
          ← Back to Worlds of Work
        </Link>
      </div>

      <PageHeader
        eyebrow={`${domain.icon} ${domain.title}`}
        title={career.title}
        description={career.description}
      />

      <div className="mt-12 rounded-xl border border-hairline bg-surface-1 backdrop-blur-md p-6 md:p-8">
        <p className="text-sm text-ink-3 leading-relaxed">
          This career world is being explored as part of the{" "}
          <span className="font-semibold text-ink-2">Work We Do</span> series.
          Articles, career profiles, comparisons, and reflections will appear
          here as the series grows.
        </p>
        <div className="mt-6">
          <Link
            href="/notes"
            className="text-sm text-accent-soft underline underline-offset-2 hover:text-ink-1 transition-colors font-semibold"
          >
            Browse Notes for related writing →
          </Link>
        </div>
      </div>
    </main>
  );
}
