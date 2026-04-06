import Link from "next/link";

const themes = [
  {
    title: "July Crisis",
    desc: "A mini-series on student struggles.",
    href: "/category/july-crisis",
    icon: "📅",
    color: "text-red-700",
    border: "border-red-400",
  },
  {
    title: "Tech Demystified",
    desc: "Simplifying complex tech topics.",
    href: "/category/tech-demystified",
    icon: "⚙️",
    color: "text-cyan-700",
    border: "border-cyan-400",
  },
  {
    title: "Financial Month",
    desc: "Student stories on finance.",
    href: "/category/financial-month",
    icon: "💸",
    color: "text-green-700",
    border: "border-green-400",
  },
  {
    title: "Childhood Arc",
    desc: "A documentation of the vivid experiences of a girl in STEM.",
    href: "/category/girlhood-and-stem-experiences",
    icon: "🧒",
    color: "text-pink-700",
    border: "border-pink-400",
  },
];

export default function ThemesPage() {
  return (
    <main
      className="relative min-h-screen w-full flex flex-col items-center justify-start px-4 py-12"
      style={{
        backgroundImage: "url(/assets/banners/galaxy-bg.png)",
        backgroundSize: "cover",
        backgroundPosition: "center top",
        backgroundRepeat: "no-repeat",
        filter: "brightness(1.1) saturate(1.2)",
      }}
    >
      <div className="absolute inset-0 bg-white/60 pointer-events-none select-none" style={{mixBlendMode: 'lighten'}} />
      <div className="relative z-10 w-full max-w-3xl mx-auto flex flex-col items-center">
        <div className="flex flex-col items-center mb-8">
          <span className="text-3xl mb-2">📅</span>
          <h1 className="text-3xl md:text-4xl font-bold mb-1 text-slate-900">Themes</h1>
          <p className="text-center text-slate-700 text-lg">Explore a concept</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          {themes.map((theme) => (
            <Link
              key={theme.title}
              href={theme.href}
              className={`relative block rounded-2xl p-6 bg-white/30 border-2 ${theme.border} shadow-lg backdrop-blur-md hover:bg-white/50 transition group`}
              style={{ boxShadow: "0 4px 32px 0 rgba(80, 0, 120, 0.10)" }}
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl md:text-3xl drop-shadow-lg">{theme.icon}</span>
                <span className={`text-xl md:text-2xl font-semibold ${theme.color}`}>{theme.title}</span>
              </div>
              <div className="text-slate-700 text-base md:text-lg opacity-90">{theme.desc}</div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
