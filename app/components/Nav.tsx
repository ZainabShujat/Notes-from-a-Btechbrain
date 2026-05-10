// app/components/Nav.tsx
"use client";

import { useState } from "react";
import Link from "next/link";

interface NavProps {
  communityEnabled?: boolean;
}

export default function Nav({ communityEnabled }: NavProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 w-full border-b backdrop-blur" style={{background: "var(--background, #fff)", color: "var(--foreground, #18181b)", borderColor: "var(--muted, #e0e0e0)"}}>
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 py-3 flex items-center justify-between" style={{color: "var(--foreground, #18181b)"}}>
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-3" style={{color: "var(--foreground, #18181b)"}}>
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-slate-800 to-amber-600 text-slate-900 font-bold dark:bg-linear-to-br dark:from-slate-200 dark:to-amber-400 dark:text-slate-900">N</span>
          <div className="leading-tight">
            <div className="font-semibold" style={{color: "var(--foreground, #18181b)"}}>Notes From a</div>
            <div className="text-xs font-semibold -mt-0.5" style={{color: "var(--heading, #fff)"}}>B Tech Brain</div>
          </div>
        </Link>

        {/* Center: Main navigation */}
        <div className="hidden md:flex items-center gap-6 text-sm mx-auto">
          <Link href="/" className="hover:underline" style={{color: "var(--foreground)"}}>Home</Link>
          <Link
            href="/browse"
            className="hover:underline font-semibold px-4 py-1 rounded"
            style={{color: "var(--foreground)", background: "var(--muted)", letterSpacing: "0.01em"}}
          >
            Explore Topics
          </Link>
          <Link href="/all-posts" className="hover:underline font-semibold" style={{color: "var(--foreground)"}}>Library</Link>
          <Link href="/start-here" className="hover:underline font-semibold" style={{color: "var(--foreground)"}}>Start Here</Link>
          <Link href="/series-hub" className="hover:underline" style={{color: "var(--foreground)"}}>Series</Link>
          <Link href="/themes" className="hover:underline" style={{color: "var(--foreground)"}}>Themes</Link>
        </div>

        {/* Right: About, Notifications, Admin */}
        <div className="hidden md:flex items-center gap-4 text-sm">
          <Link href="/about" className="hover:underline" style={{color: "var(--foreground)"}}>About</Link>
          <Link href="/notifications" className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800" aria-label="Notifications" style={{color: "var(--foreground)"}}>Notifications</Link>
          <Link href="/admin" className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800" aria-label="Admin Dashboard" style={{color: "var(--foreground)"}}>Admin</Link>
        </div>

        {/* Mobile admin icon button (left of hamburger) */}
        <div className="md:hidden flex items-center gap-2">
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="p-3 rounded-md inline-flex items-center justify-center focus:outline-none border border-gray-300 bg-white shadow-sm"
            style={{ color: open ? '#a855f7' : 'var(--foreground)' }}
          >
            <span className="sr-only">Toggle menu</span>
            <svg
              className="w-7 h-7"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                className={`transition-all duration-200 ${open ? "opacity-0" : "opacity-100"}`}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 7h16M4 12h16M4 17h16"
              />
              <path
                className={`transition-all duration-200 ${open ? "opacity-100 rotate-90" : "opacity-0"}`}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile dropdown panel */}
      <div
        className={`md:hidden bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-700 shadow-sm transition-[max-height,opacity] duration-200 overflow-hidden ${
          open ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
        }`}
        style={{background: "var(--background)", color: "var(--foreground)", overflowY: open ? 'auto' : 'hidden'}}
      >
        <div className="px-4 pt-3 pb-4 flex flex-col gap-3">
          <Link href="/" className="block py-3 px-4 rounded font-semibold text-base" style={{color: "var(--foreground)"}}>Home</Link>
          <Link href="/browse" className="block py-3 px-4 rounded font-semibold text-base" style={{background: "var(--muted)", color: "var(--foreground)", letterSpacing: "0.01em"}}>Explore Topics</Link>
          <Link href="/all-posts" className="block py-3 px-4 rounded font-semibold text-base" style={{color: "var(--foreground)"}}>Library</Link>
          <Link href="/start-here" className="block py-3 px-4 rounded font-semibold text-base" style={{color: "var(--foreground)"}}>Start Here</Link>
          <Link href="/series-hub" className="block py-3 px-4 rounded text-base" style={{color: "var(--foreground)"}}>Series</Link>
          <Link href="/themes" className="block py-3 px-4 rounded text-base" style={{color: "var(--foreground)"}}>Themes</Link>
          <Link href="/about" className="block py-3 px-4 rounded text-base" style={{color: "var(--foreground)"}}>About</Link>
          <Link href="/notifications" className="block py-3 px-4 rounded text-base" style={{color: "var(--foreground)"}}>Notifications</Link>
          <Link href="/admin" className="block py-3 px-4 rounded text-base" style={{color: "var(--foreground)"}}>Admin</Link>
        </div>
      </div>
    </header>
  );
}
