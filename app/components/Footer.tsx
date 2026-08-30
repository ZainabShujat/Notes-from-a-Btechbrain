import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-hairline bg-raised/80 backdrop-blur-xl text-ink-2 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <Link href="/" className="text-highlight font-semibold hover:text-ink-1 transition-colors">
            Notes From a B.Tech Brain
          </Link>
          <p className="text-ink-2 text-sm">
            © {new Date().getFullYear()} Zainab Shujat
          </p>
        </div>
        <div className="flex flex-wrap gap-6 text-sm text-ink-2">
          <Link href="/about" className="hover:text-ink-1 transition-colors">About</Link>
          <Link href="/notes" className="hover:text-ink-1 transition-colors">Notes</Link>
          <Link href="/wonder" className="hover:text-ink-1 transition-colors">Wonder</Link>
          <Link href="https://zainabshujat.dev" target="_blank" rel="noreferrer" className="hover:text-ink-1 transition-colors">Portfolio</Link>
          <Link href="https://www.linkedin.com/in/zainab-shujat-56b14928b/" target="_blank" rel="noreferrer" className="hover:text-ink-1 transition-colors">LinkedIn</Link>
        </div>
      </div>
    </footer>
  );
}