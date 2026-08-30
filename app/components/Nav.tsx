"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cx } from "./ui/cx";



/** The five worlds. */
const PRIMARY = [
  { href: "/notes", label: "Notes", icon: "✍️" },
  { href: "/games", label: "Games", icon: "🎮" },
  { href: "/work", label: "The Work We Do", icon: "🌍" },
  { href: "/wonder", label: "Wonder", icon: "🌀" },
  { href: "/books", label: "Books", icon: "📖" },
];

/** Quiet secondary link. */
const SECONDARY = [
  { href: "/start-here", label: "Start Here", icon: "✨" },
  { href: "/about", label: "About", icon: "👋" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [isLight, setIsLight] = useState(false);

  // Initialize theme from local storage or system preference
  useEffect(() => {
    const root = document.documentElement;
    const stored = localStorage.getItem("theme");
    if (stored === "light") {
      setIsLight(true);
      root.classList.add("light");
    } else {
      setIsLight(false);
      root.classList.remove("light");
    }
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    if (isLight) {
      root.classList.remove("light");
      localStorage.setItem("theme", "dark");
      setIsLight(false);
    } else {
      root.classList.add("light");
      localStorage.setItem("theme", "light");
      setIsLight(true);
    }
  };

  // Close the drawer whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll and close on Escape while the drawer is open.
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-hairline bg-background/80 backdrop-blur-xl">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 py-3 flex items-center justify-between gap-4">
          {/* Wordmark */}
          <Link
            href="/"
            className="flex items-center gap-3 shrink-0 rounded-md"
            aria-label="Notes From a B Tech Brain — home"
          >
            <img
              src="/thumbnail.png"
              alt=""
              className="h-11 w-11 md:h-12 md:w-12 rounded-lg object-cover border border-hairline shadow-card"
            />

            <span className="leading-tight">
              <span className="block text-sm font-semibold text-ink-1">
                Notes From a
              </span>

              <span className="block text-xs font-semibold text-highlight -mt-0.5">
                B Tech Brain
              </span>
            </span>
          </Link>

          {/* Primary — tablet and up */}
          <div className="hidden md:flex items-center gap-1 mx-auto">
            {PRIMARY.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cx(
                  "px-3 py-2 rounded-md text-sm font-semibold transition-colors",
                  isActive(item.href)
                    ? "bg-surface-2 text-ink-1"
                    : "text-ink-2 hover:text-ink-1 hover:bg-surface-1"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Secondary — desktop only, quieter than the five */}
          <div className="hidden lg:flex items-center gap-1 shrink-0">
            {SECONDARY.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cx(
                  "px-3 py-2 rounded-md text-sm transition-colors",
                  isActive(item.href)
                    ? "text-ink-1"
                    : "text-ink-3 hover:text-ink-1 hover:bg-surface-1"
                )}
              >
                {item.label}
              </Link>
            ))}

            <button
              onClick={toggleTheme}
              className="ml-2 p-2 rounded-md text-ink-3 hover:text-ink-1 hover:bg-surface-1 transition-colors"
              aria-label="Toggle theme"
            >
              {isLight ? "🌙" : "☀️"}
            </button>
          </div>

          {/* Menu button — below tablet */}
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
            className={cx(
              "md:hidden p-2.5 rounded-md border border-hairline bg-surface-1 backdrop-blur-md transition-colors",
              open ? "text-accent" : "text-ink-1 hover:bg-surface-2"
            )}
          >
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              aria-hidden="true"
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
        </nav>
      </header>

      {/* Mobile drawer */}
      <div
        className={cx(
          "md:hidden fixed inset-0 z-60 overflow-hidden transition-all duration-300",
          open ? "pointer-events-auto" : "pointer-events-none"
        )}
      >
        <div
          onClick={() => setOpen(false)}
          className={cx(
            "absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300",
            open ? "opacity-100" : "opacity-0"
          )}
        />

        <div
          id="mobile-nav"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className={cx(
            "fixed top-0 right-0 h-full w-[82%] max-w-[340px]",
            "bg-raised/95 backdrop-blur-2xl border-l border-hairline shadow-lift",
            "transition-transform duration-300 ease-out overflow-y-auto",
            open ? "translate-x-0" : "translate-x-full"
          )}
        >
          {/* Drawer header — replaces the blind pt-24 spacer */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-hairline">
            <span className="text-sm font-semibold text-ink-1">
              Notes From a{" "}
              <span className="text-highlight">B Tech Brain</span>
            </span>

            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="p-2 rounded-md text-ink-2 hover:text-ink-1 hover:bg-surface-1 transition-colors"
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="px-5 pt-6 pb-[max(2.5rem,env(safe-area-inset-bottom))] flex flex-col gap-1">
            <p className="px-3 text-xs uppercase tracking-[0.25em] text-ink-3 font-bold mb-2">
              Explore
            </p>

            {PRIMARY.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cx(
                  "block py-3 px-4 rounded-md font-semibold text-base transition-colors",
                  isActive(item.href)
                    ? "bg-surface-2 text-ink-1"
                    : "text-ink-1 hover:bg-surface-1"
                )}
              >
                <span aria-hidden="true" className="mr-2">
                  {item.icon}
                </span>
                {item.label}
              </Link>
            ))}

            <p className="px-3 pt-6 text-xs uppercase tracking-[0.25em] text-ink-3 font-bold mb-2">
              More
            </p>

            {SECONDARY.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cx(
                  "block py-3 px-4 rounded-md text-base transition-colors",
                  isActive(item.href)
                    ? "bg-surface-2 text-ink-1"
                    : "text-ink-2 hover:bg-surface-1 hover:text-ink-1"
                )}
              >
                <span aria-hidden="true" className="mr-2">
                  {item.icon}
                </span>
                {item.label}
              </Link>
            ))}

          </div>
        </div>
      </div>
    </>
  );
}
