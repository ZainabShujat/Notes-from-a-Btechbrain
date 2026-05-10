"use client";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // On mount, check localStorage or system preference
    const saved = localStorage.getItem("theme");
    if (saved === "dark" || (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      setIsDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
      setIsDark(false);
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle dark/light mode"
      className="px-3 py-1 rounded border border-gray-400 bg-white dark:bg-gray-800 dark:text-white text-gray-800 shadow"
      style={{ position: "fixed", top: 16, right: 16, zIndex: 1000 }}
    >
      {isDark ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}
