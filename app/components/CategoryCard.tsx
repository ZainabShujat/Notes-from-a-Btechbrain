import Card from "./ui/Card";

type Props = {
  title: string;
  desc: string;
  href: string;
  /**
   * Existing call sites pass a Tailwind border class ("border-blue-400"),
   * or one of the two legacy keywords. The colour is kept as a small dot
   * rather than a coloured border, so cards share one surface treatment
   * while categories stay visually distinguishable.
   *
   * Mapped explicitly (not derived) so Tailwind can see the class names.
   */
  color?: string;
  likes?: number;
  views?: number;
};

const DOT: Record<string, string> = {
  "border-purple-500": "bg-purple-400",
  "border-pink-400": "bg-pink-400",
  "border-pink-300": "bg-pink-300",
  "border-amber-300": "bg-amber-300",
  "border-amber-500": "bg-amber-400",
  "border-green-300": "bg-green-300",
  "border-emerald-300": "bg-emerald-300",
  "border-emerald-500": "bg-emerald-400",
  "border-blue-300": "bg-blue-300",
  "border-blue-400": "bg-blue-400",
  "border-indigo-500": "bg-indigo-400",
  "border-red-400": "bg-red-400",
  "border-cyan-400": "bg-cyan-400",
  "border-green-400": "bg-green-400",
  "border-yellow-400": "bg-yellow-400",
  orange: "bg-orange-400",
  theme: "bg-indigo-400",
};

export default function CategoryCard({ color, title, desc, href }: Props) {
  const dot = (color && DOT[color]) || "bg-accent";

  // `CategoryCard` is a styling hook the seasonal theme components target.
  // Do not remove it without migrating app/components/*Theme.tsx.

  return (
      <Card href={href} padding="sm" className="CategoryCard h-full">
      <div className="flex items-start gap-3">
        <span
          aria-hidden="true"
          className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-pill ${dot}`}
        />

        <div className="min-w-0">
          <div className="font-semibold text-ink-1">{title}</div>

          <p className="mt-1 text-sm text-ink-2">{desc}</p>

          <div className="mt-3 text-xs font-medium text-accent-soft">
            Explore →
          </div>
        </div>
      </div>
    </Card>
  );
}
