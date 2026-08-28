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
  tags?: string[];
  cluster?: string;
pathway?: string;
importance?: number;
related?: string[];
mapDescription?: string;
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
  "/assets/banners/hello-banner.png";

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
        className="rounded-lg overflow-hidden shadow-card hover:shadow-lift border border-hairline hover:border-hairline-strong bg-surface-1 backdrop-blur-md flex flex-row w-full mx-auto transition-[transform,box-shadow,border-color] duration-200 group-hover:-translate-y-0.5"
      >
        {/* Banner */}
        {banner && (
          <div
            className="flex-shrink-0 flex items-center justify-center bg-sunken pl-3"
            style={{ width: 125, height: 95 }}
          >
            <img
              src={banner}
              alt={title}
              className="object-cover w-full h-full rounded-l-2xl"
              loading="lazy"
              style={{ background: "var(--color-sunken)" }}
            />
          </div>
        )}

        {/* Content */}
        <div className="py-3 pr-4 pl-3 flex flex-col gap-2 flex-1 min-w-0">
          <h3 className="text-xl font-bold text-ink-1 mb-1 flex items-center gap-2">
            <span className="text-2xl">🕑</span>
            Your Last Read
          </h3>

          <span className="text-lg font-semibold text-ink-2 group-hover:text-accent-soft transition-colors underline underline-offset-2">
            {title}
          </span>

          <div className="flex flex-col gap-1 mt-2">
            <span className="inline-block px-3 py-1.5 rounded-pill bg-accent text-white font-semibold text-xs shadow-card w-fit">
              Continue reading <span aria-hidden>→</span>
            </span>

            <div className="flex items-center gap-2 mt-1">
              <div className="w-full h-2 bg-surface-2 rounded-pill overflow-hidden">
                <div
                  className="h-2 bg-accent rounded-pill transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <span className="text-xs text-ink-3 whitespace-nowrap">
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