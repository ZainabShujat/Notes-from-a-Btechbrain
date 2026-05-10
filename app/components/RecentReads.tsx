"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

interface ReaderHistory {
  id: string;
  post_id: string;
  post_slug: string;
  post_title: string;
  title: string;
  slug: string;
  progress: number;
  last_read_at: string;
  banner?: string;
}

export default function RecentReads() {
  const [history, setHistory] = useState<ReaderHistory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/history/recent")
      .then((res) => res.json())
      .then((data) => {
        setHistory(data.history || []);
        setLoading(false);
      });
  }, []);

  if (loading) return null;
  if (!history.length) return null;

  // Only show the most recent read
  const item = history[0];

const title =
  item.post_title ||
  item.title ||
  "Untitled Article";

const slug =
  item.post_slug ||
  item.slug;

const banner =
  item.banner ||
  "/assets/hello-banner.png";

const progress = Math.max(
  5,
  Math.min(item.progress || 0, 100)
);

if (!slug) return null;

return (
  <section className="mx-auto w-full max-w-3xl px-2 py-2 mb-2">
    <Link
      href={`/post/${slug}`}
      className="block group"
    >
      <div
        className="rounded-2xl overflow-hidden shadow-lg border border-purple-200 dark:border-purple-600 bg-white/10 backdrop-blur-2xl flex flex-row w-full mx-auto transition-transform group-hover:scale-[1.03] focus-within:scale-[1.03]"
        style={{
          boxShadow:
            "0 2px 16px 0 rgba(168,85,247,0.10), 0 1px 8px 0 rgba(0,0,0,0.10)",
        }}
      >
        {/* Banner */}
        {banner && (
          <div
            className="flex-shrink-0 flex items-center justify-center bg-black pl-3"
            style={{ width: 125, height: 95 }}
          >
            <img
              src={banner}
              alt={title}
              className="object-cover w-full h-full rounded-l-2xl"
              loading="lazy"
              style={{ background: "#0a0020" }}
            />
          </div>
        )}

        {/* Content */}
        <div className="py-3 pr-4 pl-3 flex flex-col gap-2 flex-1 min-w-0">
          <h3 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
            <span className="text-2xl">🕑</span>
            Your Last Read
          </h3>

          <span className="text-lg font-semibold text-purple-100 group-hover:text-purple-300 transition-colors underline underline-offset-2">
            {title}
          </span>

          <div className="flex flex-col gap-1 mt-2">
            <span className="inline-block px-3 py-1.5 rounded-full bg-linear-to-r from-purple-400 to-purple-600 text-white font-semibold text-xs shadow-lg w-fit">
              Continue reading <span aria-hidden>→</span>
            </span>

            <div className="flex items-center gap-2 mt-1">
              <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-2 bg-purple-400 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <span className="text-xs text-slate-400 whitespace-nowrap">
                {progress}% read
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  </section>
);
}