"use client";

import { useState } from "react";
import Link from "next/link";

interface NavProps {
  communityEnabled?: boolean;
}

export default function Nav({ communityEnabled }: NavProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header
        className="sticky top-0 z-30 w-full border-b backdrop-blur"
        style={{
          background: "var(--background, #fff)",
          color: "var(--foreground, #18181b)",
          borderColor: "var(--muted, #e0e0e0)",
        }}
      >
        <nav
          className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 py-3 flex items-center justify-between"
          style={{ color: "var(--foreground, #18181b)" }}
        >
          {/* Left: Logo */}
          <Link
            href="/"
            className="flex items-center gap-3"
            style={{ color: "var(--foreground, #18181b)" }}
          >
            <img
              src="/thumbnail.png"
              alt="Notes From a B Tech Brain"
              className="h-14 w-14 rounded-2xl object-cover shadow-lg border border-purple-500/20"
            />

            <div className="leading-tight">
              <div
                className="font-semibold"
                style={{ color: "var(--foreground, #18181b)" }}
              >
                Notes From a
              </div>

              <div
                className="text-xs font-semibold -mt-0.5"
                style={{ color: "var(--heading, #fff)" }}
              >
                B Tech Brain
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-6 text-sm mx-auto">
            <Link
              href="/"
              className="hover:underline"
              style={{ color: "var(--foreground)" }}
            >
              Home
            </Link>

            <Link
              href="/map"
              className="hover:underline font-semibold px-4 py-1 rounded"
              style={{
                color: "var(--foreground)",
                background: "var(--muted)",
              }}
            >
              🗺 Map
            </Link>

            <Link
              href="/all-posts"
              className="hover:underline font-semibold"
              style={{ color: "var(--foreground)" }}
            >
              Library
            </Link>

            <Link
              href="/start-here"
              className="hover:underline font-semibold"
              style={{ color: "var(--foreground)" }}
            >
              Start Here
            </Link>

            <Link
              href="/write/new-post"
              className="hover:underline font-semibold px-4 py-1 rounded bg-purple-100 text-purple-700 ml-1"
              style={{
                color: "#a855f7",
                background: "#f3e8ff",
              }}
            >
              Write
            </Link>
          </div>

          {/* Desktop Right */}
          <div className="hidden lg:flex items-center gap-4 text-sm">
            <Link
              href="/about"
              className="hover:underline"
              style={{ color: "var(--foreground)" }}
            >
              About
            </Link>

            <Link
              href="/notifications"
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Notifications"
              style={{ color: "var(--foreground)" }}
            >
              Notifications
            </Link>

            <Link
              href="/admin"
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Admin Dashboard"
              style={{ color: "var(--foreground)" }}
            >
              Admin
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <div className="lg:hidden flex items-center">
            <button
              aria-label="Toggle menu"
              onClick={() => setOpen((v) => !v)}
              className="p-3 rounded-xl border border-slate-300/40 bg-white/80 backdrop-blur-lg shadow-sm"
              style={{
                color: open ? "#a855f7" : "var(--foreground)",
              }}
            >
              <svg
                className="w-7 h-7"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                {open ? (
                  <path
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 7h16M4 12h16M4 17h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Overlay */}
      <div
        className={`lg:hidden fixed inset-0 z-40 overflow-hidden transition-all duration-300 ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Drawer */}
        <div
          className={`fixed top-0 right-0 h-full w-[82%] max-w-[340px]
          bg-[#0d1020]/95 backdrop-blur-2xl border-l border-white/10
          shadow-2xl transition-transform duration-300 ease-out overflow-y-auto ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="px-5 pt-24 pb-10 flex flex-col gap-2">
            {/* Explore */}
            <p className="px-3 text-xs uppercase tracking-[0.25em] text-slate-500 font-bold mb-2">
              Explore
            </p>

            <Link
              href="/"
              className="block py-3 px-4 rounded-xl font-semibold text-base text-white hover:bg-white/5 transition"
            >
              🏠 Home
            </Link>

            <Link
              href="/all-posts"
              className="block py-3 px-4 rounded-xl font-semibold text-base text-white hover:bg-white/5 transition"
            >
              📚 Library
            </Link>

            <Link
              href="/start-here"
              className="block py-3 px-4 rounded-xl font-semibold text-base text-white hover:bg-white/5 transition"
            >
              ✨ Start Here
            </Link>


            {/* Platform */}
            <p className="px-3 pt-6 text-xs uppercase tracking-[0.25em] text-slate-500 font-bold mb-2">
              Platform
            </p>

            <Link
              href="/map"
              className="block py-3 px-4 rounded-xl text-base text-white hover:bg-white/5 transition"
            >
              🗺️ Map
            </Link>

            <Link
              href="/notifications"
              className="block py-3 px-4 rounded-xl text-base text-white hover:bg-white/5 transition"
            >
              🔔 Notifications
            </Link>

            <Link
              href="/about"
              className="block py-3 px-4 rounded-xl text-base text-white hover:bg-white/5 transition"
            >
              📖 About
            </Link>

            {/* Creator */}
            <p className="px-3 pt-6 text-xs uppercase tracking-[0.25em] text-slate-500 font-bold mb-2">
              Creator
            </p>

            <Link
              href="/write/new-post"
              className="block py-4 px-5 rounded-2xl text-base font-semibold text-purple-100 border border-purple-300/20 shadow-xl transition"
              style={{
                background:
                  "linear-gradient(to right, rgba(168,85,247,0.22), rgba(192,132,252,0.12))",
              }}
            >
              ✍️ Write
            </Link>

            <Link
              href="/admin"
              className="block py-3 px-4 rounded-xl text-sm text-slate-400 hover:bg-white/5 hover:text-white transition"
            >
              ⚙️ Admin
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}