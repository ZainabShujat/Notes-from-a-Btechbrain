"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function StartHereBanner() {
  const [dismissed, setDismissed] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setDismissed(localStorage.getItem("startHereBannerDismissed") === "true");
    }
  }, []);
  const handleDismiss = () => {
    setDismissed(true);
    if (typeof window !== "undefined") {
      localStorage.setItem("startHereBannerDismissed", "true");
    }
  };
  if (!dismissed) {
    return (
      <div className="bg-surface-1 border border-hairline backdrop-blur-md text-ink-2 px-4 py-3 flex items-center justify-between rounded-md mb-6 max-w-2xl mx-auto mt-6 shadow-card">
        <div>
          <span className="font-semibold text-ink-1">If you don’t know where to start, here’s a guide:</span>
          <Link href="/start-here" className="ml-2 underline underline-offset-2 text-accent-soft font-medium hover:text-ink-1 transition-colors">Start Here</Link>
        </div>
        <button onClick={handleDismiss} aria-label="Dismiss banner" className="ml-4 text-ink-3 hover:text-ink-1 transition-colors text-xl font-bold">×</button>
      </div>
    );
  }
  return null;
}