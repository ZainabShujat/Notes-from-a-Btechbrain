"use client";
import React from "react";

import { useEffect, useState } from "react";

export default function CommunityPage() {
  const [enabled, setEnabled] = useState<boolean | null>(null);
  useEffect(() => {
    // Fetch community_enabled from Supabase
    async function fetchEnabled() {
      const { data } = await import("../../lib/supabase").then((m) => m.supabase.from("settings").select("community_enabled").single());
      setEnabled(data?.community_enabled ?? false);
    }
    fetchEnabled();
  }, []);

  if (enabled === null) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!enabled) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-900">
        <div className="bg-white dark:bg-slate-900 rounded-lg shadow p-8 text-center">
          <h1 className="text-3xl font-bold mb-4 text-slate-900 dark:text-slate-100">Community Page</h1>
          <p className="text-gray-500 dark:text-slate-300 mb-4">This page is under construction. Please check back soon!</p>
        </div>
      </div>
    );
  }

  // ...existing code for fully built page...
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <div className="w-full bg-linear-to-br from-purple-600 to-blue-500 py-16 text-center">
        <div className="flex flex-col items-center justify-center">
          <div className="bg-white/10 rounded-full p-4 mb-4">
            <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="mx-auto text-white">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2v-8a2 2 0 012-2h2M12 12v.01M12 16h.01M8 12h.01M16 12h.01" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-black dark:text-slate-100 mb-2">Community</h1>
          <p className="text-white text-lg max-w-xl mx-auto mb-6">Connect with fellow readers, share ideas, ask questions, and participate in discussions</p>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded shadow mb-4">+ Start Discussion</button>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div className="flex gap-2">
            <select className="border rounded px-3 py-2 text-sm">
              <option>All Posts</option>
            </select>
            <select className="border rounded px-3 py-2 text-sm">
              <option>Latest First</option>
            </select>
          </div>
          <div className="text-slate-500 text-sm">0 posts</div>
        </div>
        <div className="flex flex-col items-center justify-center py-16">
          <div className="bg-slate-100 dark:bg-slate-800 rounded-full p-6 mb-4">
            <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="mx-auto text-slate-400 dark:text-slate-500">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2v-8a2 2 0 012-2h2M12 12v.01M12 16h.01M8 12h.01M16 12h.01" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold mb-2">No Posts Yet</h2>
          <p className="text-slate-500 mb-4">Be the first to start a discussion in the community!</p>
          <button className="bg-black text-white font-semibold px-6 py-2 rounded shadow">+ Start Discussion</button>
        </div>
      </div>
    </div>
  );
}
