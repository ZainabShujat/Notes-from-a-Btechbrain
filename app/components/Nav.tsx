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
        <Link href="/" className="flex items-center gap-3">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-slate-800 to-amber-600 text-white font-bold dark:bg-linear-to-br dark:from-slate-200 dark:to-amber-400 dark:text-slate-900">N</span>
          <div className="leading-tight">
            <div className="font-semibold">Notes From a</div>
            <div className="text-xs text-amber-600 font-semibold -mt-0.5">B Tech Brain</div>
          </div>
        </Link>

        {/* Desktop admin icon button (top right) */}
        <div className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/" className="hover:underline dark:hover:text-amber-400">Home</Link>
          <Link href="/start-here" className="hover:underline text-purple-700 font-semibold dark:text-purple-300">Start Here</Link>
          <Link href="/series-hub" className="hover:underline text-blue-700 font-semibold dark:text-blue-300">Series Hub</Link>
          <Link href="/browse" className="hover:underline dark:hover:text-amber-400">Browse</Link>
          <Link href="/about" className="hover:underline dark:hover:text-amber-400">About</Link>
          <Link href="/notifications" className="hover:underline text-green-700 font-semibold dark:text-green-300">Notifications</Link>
          <Link href="/community" className="hover:underline dark:hover:text-amber-400">Community</Link>
          <Link href="/admin" className="ml-4 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800" aria-label="Admin Dashboard">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </Link>
          {/* Community tab, only show if enabled in settings (pseudo, needs prop) */}
          {/* {communityEnabled && (
            <Link href="/community" className="hover:underline dark:hover:text-amber-400">Community</Link>
          )} */}
        </div>

        {/* Mobile admin icon button (left of hamburger) */}
        <div className="md:hidden flex items-center">
          <Link href="/notifications" className="mr-2 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800" aria-label="Notifications">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </Link>
          <Link href="/admin" className="mr-2 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800" aria-label="Admin Dashboard">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
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
          open ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pt-3 pb-4 space-y-2">
          <Link href="/" className="block py-2 px-2 rounded hover:bg-slate-50 dark:hover:bg-slate-800">Home</Link>
          <Link href="/start-here" className="block py-2 px-2 rounded bg-purple-100 text-purple-700 font-semibold dark:bg-purple-900 dark:text-purple-200">Start Here</Link>
          <Link href="/series-hub" className="block py-2 px-2 rounded bg-blue-100 text-blue-700 font-semibold dark:bg-blue-900 dark:text-blue-200">Series Hub</Link>
          <Link href="/browse" className="block py-2 px-2 rounded hover:bg-slate-50 dark:hover:bg-slate-800">Browse</Link>
          <Link href="/about" className="block py-2 px-2 rounded hover:bg-slate-50 dark:hover:bg-slate-800">About</Link>
          <Link href="/community" className="block py-2 px-2 rounded hover:bg-slate-50 dark:hover:bg-slate-800">Community</Link>
          <Link href="/category/tech-pulse" className="block py-2 px-2 rounded hover:bg-slate-50 dark:hover:bg-slate-800">Tech Pulse</Link>
          <Link href="/category/world-watch" className="block py-2 px-2 rounded hover:bg-slate-50 dark:hover:bg-slate-800">World Watch</Link>
        </div>
      </div>
    </header>
  );
}
