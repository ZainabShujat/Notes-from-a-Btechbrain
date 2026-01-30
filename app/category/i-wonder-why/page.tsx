import Link from 'next/link';

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
    <main className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">I Wonder Why</h1>
      <div className="text-center mb-2">
        <span className="block text-base text-gray-500 italic">Essays about thinking, noticing, and learning slowly.</span>
      </div>
      <p className="mb-10 text-center text-lg text-gray-600">Explore by subcategory:</p>
      <div className="grid gap-6 md:grid-cols-2">
        {subcategories.map((sub) => (
          <Link
            key={sub.key}
            href={`/category/i-wonder-why/${sub.key}`}
            className="block border rounded-lg p-6 hover:shadow-lg transition bg-white"
          >
            <h2 className="text-xl font-semibold mb-2">{sub.title}</h2>
            <p className="text-gray-500">{sub.description}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
