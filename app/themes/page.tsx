import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import PageHeader from "../components/ui/PageHeader";

const themes = [
  {
    title: "July Crisis",
    desc: "A mini-series on student struggles.",
    href: "/category/july-crisis",
    icon: "📅",
    dot: "bg-red-400",
  },
  {
    title: "Tech Demystified",
    desc: "Simplifying complex tech topics.",
    href: "/category/tech-demystified",
    icon: "⚙️",
    dot: "bg-cyan-400",
  },
  {
    title: "Financial Month",
    desc: "Student stories on finance.",
    href: "/category/financial-month",
    icon: "💸",
    dot: "bg-green-400",
  },
  {
    title: "Childhood Arc",
    desc: "A documentation of the vivid experiences of a girl in STEM.",
    href: "/category/girlhood-and-stem-experiences",
    icon: "🧒",
    dot: "bg-pink-400",
  },
];

export default function ThemesPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 sm:px-6 md:px-8 py-16 md:py-24">
      <PageHeader
        eyebrow="Monthly"
        title="Themes"
        description="Explore a concept."
        align="center"
        actions={
          <Button href="/series-hub" variant="secondary" size="md">
            View All Series →
          </Button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {themes.map((theme) => (
          <Card key={theme.title} href={theme.href} className="h-full">
            <div className="flex items-center gap-3 mb-2">
              <span aria-hidden="true" className="text-2xl md:text-3xl">
                {theme.icon}
              </span>

              <span className="text-xl md:text-2xl font-semibold text-ink-1">
                {theme.title}
              </span>

              <span
                aria-hidden="true"
                className={`ml-auto h-2.5 w-2.5 shrink-0 rounded-pill ${theme.dot}`}
              />
            </div>

            <p className="text-ink-2 text-base md:text-lg m-0">{theme.desc}</p>
          </Card>
        ))}
      </div>
    </main>
  );
}
