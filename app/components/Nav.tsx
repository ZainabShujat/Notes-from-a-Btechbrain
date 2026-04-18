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
    <header className="sticky top-0 z-30 w-full border-b border-slate-200 bg-white/80 dark:bg-slate-900/80 dark:border-slate-700 backdrop-blur">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 py-3 flex items-center justify-between">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-3">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-slate-800 to-amber-600 text-slate-900 font-bold dark:bg-linear-to-br dark:from-slate-200 dark:to-amber-400 dark:text-slate-900">N</span>
          <div className="leading-tight">
            <div className="font-semibold text-slate-900">Notes From a</div>
            <div className="text-xs text-amber-600 font-semibold -mt-0.5">B Tech Brain</div>
          </div>
        </Link>

        {/* Center: Main navigation */}
        <div className="hidden md:flex items-center gap-6 text-sm mx-auto">
          <Link href="/" className="hover:underline text-slate-800 dark:hover:text-amber-400">Home</Link>
          <Link
            href="/browse"
            className="hover:underline text-purple-700 font-semibold dark:text-purple-300 px-4 py-1 rounded bg-purple-50 dark:bg-purple-900/40"
            style={{ letterSpacing: "0.01em" }}
          >
            ⭐ Explore Topics
          </Link>
          <Link href="/all-posts" className="hover:underline text-blue-700 font-semibold dark:text-blue-300">Library</Link>
          <Link href="/start-here" className="hover:underline text-green-700 font-semibold dark:text-green-300">Start Here</Link>
          <Link href="/series-hub" className="hover:underline text-slate-800 dark:hover:text-amber-400">Series</Link>
          <Link href="/themes" className="hover:underline text-slate-800 dark:hover:text-amber-400">Themes</Link>
        </div>

        {/* Right: About, Notifications, Admin */}
        <div className="hidden md:flex items-center gap-4 text-sm">
          <Link href="/about" className="hover:underline dark:hover:text-amber-400">About</Link>
          <Link href="/notifications" className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800" aria-label="Notifications">
            <span role="img" aria-label="Notifications" className="text-xl">🔔</span>
          </Link>
          <Link href="/admin" className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800" aria-label="Admin Dashboard">
            <span role="img" aria-label="Admin" className="text-xl">👤</span>
          </Link>
        </div>

        {/* Mobile admin icon button (left of hamburger) */}
        <div className="md:hidden flex items-center">
          <Link href="/notifications" className="mr-2 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800" aria-label="Notifications">
            <span role="img" aria-label="Notifications" className="text-xl">🔔</span>
          </Link>
          <Link href="/admin" className="mr-2 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800" aria-label="Admin Dashboard">
            <span role="img" aria-label="Admin" className="text-xl">👤</span>
          </Link>
          <Link href="/start-here" className="mr-2 p-2 rounded hover:bg-green-50 dark:hover:bg-green-900/30 text-green-700 dark:text-green-300 font-semibold" aria-label="Start Here">
            <span role="img" aria-label="Start Here" className="text-xl">🚩</span>
          </Link>
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="p-2 rounded-md inline-flex items-center justify-center focus:outline-none"
            style={{
              background: open ? 'rgba(251, 191, 36, 0.15)' : undefined,
            }}
          >
            {/* simple animated bars */}
            <span className="sr-only">Toggle menu</span>
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              style={{ color: open ? '#fbbf24' : 'var(--hamburger-color, #334155)' }}
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
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pt-3 pb-4 space-y-2">
          <Link
            href="/browse"
            className="block py-2 px-3 rounded bg-purple-50 text-purple-700 font-semibold dark:bg-purple-900/40 dark:text-purple-200"
            style={{ letterSpacing: "0.01em" }}
          >
            ⭐ Explore Topics
          </Link>
          <Link href="/all-posts" className="block py-2 px-2 rounded bg-blue-100 text-blue-700 font-semibold dark:bg-blue-900 dark:text-blue-200">Library</Link>
          {/* Topics link replaced by highlighted Explore Topics above */}
          <Link href="/series-hub" className="block py-2 px-2 rounded text-slate-800 hover:bg-slate-50 dark:hover:text-amber-400 dark:hover:bg-slate-800">Series</Link>
          <Link href="/themes" className="block py-2 px-2 rounded text-slate-800 hover:bg-slate-50 dark:hover:text-amber-400 dark:hover:bg-slate-800">Themes</Link>
          <Link href="/about" className="block py-2 px-2 rounded text-slate-800 hover:bg-slate-50 dark:hover:text-amber-400 dark:hover:bg-slate-800">About</Link>
        </div>
      </div>
    </header>
  );
}
