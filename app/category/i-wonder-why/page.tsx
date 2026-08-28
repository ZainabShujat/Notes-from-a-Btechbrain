import Link from 'next/link';
import Card from '../../components/ui/Card';
import PageHeader from '../../components/ui/PageHeader';

const subcategories = [
  {
    key: 'language-thought-inner-experience',
    title: 'Language, Thought & Inner Experience',
    description: 'How thinking and language feel from the inside',
  },
  {
    key: 'memory-time-mind',
    title: 'Memory, Time & the Mind',
    description: 'How the brain experiences time, memory, and familiarity',
  },
  {
    key: 'curiosity-patterns-being-human',
    title: 'Curiosity, Patterns & Being Human',
    description: 'Instincts we don’t consciously choose',
  },
  {
    key: 'math-structure-quiet-beauty',
    title: 'Math, Structure & Quiet Beauty',
    description: 'Math not as formulas, but as something felt and seen',
  },
  {
    key: 'code-work-learning-hard-way',
    title: 'Code, Work & Learning the Hard Way',
    description: 'Tech as lived experience, not hustle content',
  },
  {
    key: 'dreams-imagination-inner-narratives',
    title: 'Dreams, Imagination & Inner Narratives',
    description: 'What the mind does when control relaxes',
  },
];

export default function IWYCategoryPage() {
  return (
    <main className="max-w-3xl mx-auto py-16 md:py-24 px-4">
      <PageHeader
        eyebrow="Retired series"
        title="I Wonder Why"
        description="Essays about thinking, noticing, and learning slowly. Explore by subcategory:"
        align="center"
      />
      <div className="grid gap-6 md:grid-cols-2">
        {subcategories.map((sub) => (
          <Card key={sub.key} href={`/category/i-wonder-why/${sub.key}`} className="h-full">
            <h2 className="text-xl font-semibold mb-2 text-ink-1">{sub.title}</h2>
            <p className="text-ink-2 m-0">{sub.description}</p>
          </Card>
        ))}
      </div>
    </main>
  );
}
