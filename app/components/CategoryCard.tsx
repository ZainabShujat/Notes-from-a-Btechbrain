import Link from "next/link";

type Props = {
  title: string;
  desc: string;
  href: string;
  color?: string;
  likes?: number; // <-- add this
  views?: number; // <-- add this
};

export default function CategoryCard({ color, title, desc, href }: Props) {
  // Always use gold border for theme card in Birthday Theme
  const borderClass = color === 'theme' ? 'border-amber-300' : color;
  return (
    <Link
      href={href}
      className={`CategoryCard block rounded-xl bg-[#181c2a] shadow-md border ${borderClass} border-t-4 p-5 transition`}
      style={{ color: '#f0f0f0' }}
    >
      <div className="font-semibold" style={{ color: '#ffd700', textShadow: '0 0 10px #1a1f3a, 0 0 10px #ffd70088' }}>{title}</div>
      <p className="mt-1 text-sm" style={{ color: '#f0f0f0' }}>{desc}</p>
      <div className="mt-2 text-xs" style={{ color: '#b983ff' }}>Explore →</div>
    </Link>
  );
}