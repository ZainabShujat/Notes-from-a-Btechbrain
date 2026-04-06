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
      <div className="bg-purple-100 border border-purple-300 text-purple-900 px-4 py-3 flex items-center justify-between rounded mb-6 max-w-2xl mx-auto mt-6 shadow">
        <div>
          <span className="font-semibold">If you don’t know where to start, here’s a guide:</span>
          <Link href="/start-here" className="ml-2 underline text-purple-700 font-medium hover:text-purple-900">Start Here</Link>
        </div>
        <button onClick={handleDismiss} aria-label="Dismiss banner" className="ml-4 text-purple-700 hover:text-purple-900 text-xl font-bold">×</button>
      </div>
    );
  }
  return null;
}