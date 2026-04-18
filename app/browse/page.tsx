import Link from "next/link";

const topics = [
  {
    title: "Curiosity Series",
    desc: "Exploring questions, ideas, and the joy of learning.",
    href: "/category/curiosity-series",
    icon: "✨",
    color: "text-purple-200",
    border: "border-purple-400",
  },
  {
    title: "Behind the Scenes",
    desc: "A mini-series that shows behind the scenes of building projects.",
    href: "/category/behind-the-scenes",
    icon: "📦",
    color: "text-pink-200",
    border: "border-pink-400",
  },
  {
    title: "I Wonder Why",
    desc: "A journey of curiosity and discovery.",
    href: "/category/i-wonder-why",
    icon: "🤔",
    color: "text-blue-200",
    border: "border-blue-400",
  },
  {
    title: "Milestone Stories",
    desc: "Other notable posts and stories.",
    href: "/category/milestone-stories-and-miscellaneous",
    icon: "🏆",
    color: "text-yellow-200",
    border: "border-yellow-400",
  },
];

export default function BrowsePage() {
  return (
    <main
      className="relative min-h-screen w-full flex flex-col items-center justify-start px-4 py-12"
      style={{
        backgroundImage: "url(/assets/banners/galaxy-bg.webp)",
        backgroundSize: "cover",
        backgroundPosition: "center top",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-[#1a1440]/70 pointer-events-none select-none" />
      <div className="relative z-10 w-full max-w-3xl mx-auto flex flex-col items-center">
        <div className="flex flex-col items-center mb-8">
          <span className="text-3xl mb-2">✨</span>
          <h1 className="text-3xl md:text-4xl font-bold mb-1 text-white">Explore Topics</h1>
          <p className="text-center text-purple-100 text-lg">How your brain organizes ideas.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          {topics.map((topic) => (
            <Link
              key={topic.title}
              href={topic.href}
              className={`relative block rounded-2xl p-6 bg-white/10 border-2 ${topic.border} shadow-lg backdrop-blur-md hover:bg-white/20 transition group`}
              style={{ boxShadow: "0 4px 32px 0 rgba(80, 0, 120, 0.15)" }}
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl md:text-3xl drop-shadow-lg">{topic.icon}</span>
                <span className={`text-xl md:text-2xl font-semibold ${topic.color}`}>{topic.title}</span>
              </div>
              <div className="text-slate-200 text-base md:text-lg opacity-90">{topic.desc}</div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
