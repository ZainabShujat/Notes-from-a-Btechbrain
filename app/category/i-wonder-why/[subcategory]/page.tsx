import { getCombinedPosts, PostMeta } from '../../../../lib/posts';
import PostCard from '../../../components/PostCard';
import { notFound } from 'next/navigation';

const subcategoryMap = {
  'language-thought-inner-experience': 'Language, Thought & Inner Experience',
  'memory-time-mind': 'Memory, Time & the Mind',
  'curiosity-patterns-being-human': 'Curiosity, Patterns & Being Human',
  'math-structure-quiet-beauty': 'Math, Structure & Quiet Beauty',
  'code-work-learning-hard-way': 'Code, Work & Learning the Hard Way',
  'dreams-imagination-inner-narratives': 'Dreams, Imagination & Inner Narratives',
};

export default async function IWYSubcategoryPage({ params }: { params: Promise<{ subcategory: string }> }) {
  const { subcategory } = await params;

  const subcategoryName = subcategoryMap[subcategory as keyof typeof subcategoryMap];
  if (!subcategoryName) return notFound();

  const posts = await getCombinedPosts();
  const filtered = posts.filter(
    (p: PostMeta) =>
      (p.category || '').toLowerCase() === 'i-wonder-why' &&
      (p.subcategory || '').toLowerCase() === (subcategoryName || '').toLowerCase()
  );

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 py-16 md:py-24">
      <a
        href="/category/i-wonder-why"
        className="inline-block mb-6 text-accent-soft hover:text-ink-1 transition-colors underline underline-offset-2 text-sm"
        aria-label="Back to I Wonder Why"
      >
        ← Back to I Wonder Why
      </a>
      <h1 className="text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.1] tracking-tight text-ink-1 capitalize text-center mb-8">
        {subcategoryName}
      </h1>
      {filtered.length === 0 && (
        <p className="mt-4 text-ink-3 text-center">No posts in this subcategory yet.</p>
      )}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center">
        {filtered.map((p: PostMeta) => (
          <PostCard
            key={p.slug}
            title={p.title}
            slug={p.slug}
            excerpt={p.excerpt}
            date={p.date}
            created_at={p.created_at}
            category={p.category}
            banner={p.banner}
            tags={p.tags}
          />
        ))}
      </div>
    </main>
  );
}
