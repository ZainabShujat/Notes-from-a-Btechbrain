import Card from "../components/ui/Card";
import PageHeader from "../components/ui/PageHeader";

const topics = [
  {
    title: "Curiosity Series",
    desc: "Exploring questions, ideas, and the joy of learning.",
    href: "/category/curiosity-series",
    icon: "✨",
    dot: "bg-purple-400",
  },
  {
    title: "Behind the Scenes",
    desc: "A mini-series that shows behind the scenes of building projects.",
    href: "/category/behind-the-scenes",
    icon: "📦",
    dot: "bg-pink-400",
  },
  {
    title: "I Wonder Why",
    desc: "A journey of curiosity and discovery.",
    href: "/category/i-wonder-why",
    icon: "🤔",
    dot: "bg-blue-400",
  },
  {
    title: "Milestone Stories",
    desc: "Other notable posts and stories.",
    href: "/category/milestone-stories-and-miscellaneous",
    icon: "🏆",
    dot: "bg-yellow-400",
  },
];

export default function BrowsePage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 sm:px-6 md:px-8 py-16 md:py-24">
      <PageHeader
        eyebrow="Explore"
        title="Explore Topics"
        description="How your brain organizes ideas."
        align="center"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {topics.map((topic) => (
          <Card key={topic.title} href={topic.href} className="h-full">
            <div className="flex items-center gap-3 mb-2">
              <span aria-hidden="true" className="text-2xl md:text-3xl">
                {topic.icon}
              </span>

              <span className="text-xl md:text-2xl font-semibold text-ink-1">
                {topic.title}
              </span>

              <span
                aria-hidden="true"
                className={`ml-auto h-2.5 w-2.5 shrink-0 rounded-pill ${topic.dot}`}
              />
            </div>

            <p className="text-ink-2 text-base md:text-lg m-0">{topic.desc}</p>
          </Card>
        ))}
      </div>
    </main>
  );
}
