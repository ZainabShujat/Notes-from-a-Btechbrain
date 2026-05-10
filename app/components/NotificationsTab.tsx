"use client";
import { useState } from "react";
import notifications from "../notifications";

const PAGE_SIZE = 7;


// Collect all unique versions and their colors from notifications
const versionColors = Array.from(
  notifications
    .reduce((map, n) => map.set(n.version, n.color), new Map())
    .entries()
).map(([version, color]) => ({ version, color }));

export default function NotificationsTab() {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(notifications.length / PAGE_SIZE);
  const startIdx = (page - 1) * PAGE_SIZE;
  const endIdx = startIdx + PAGE_SIZE;
  const currentNotifications = notifications.slice(startIdx, endIdx);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-slate-900 rounded-lg shadow-lg mt-8">
      <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-slate-100">Site Updates & Notifications</h2>
      {/* Version color legend removed as requested */}
      <ul className="space-y-4">
        {currentNotifications.map((note) => (
          <li
            key={note.id}
            className="pl-4 py-2 bg-slate-50 dark:bg-slate-800 rounded"
            style={{ borderLeft: `6px solid ${note.color}` }}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs text-slate-500 dark:text-slate-400">{note.date}</span>
              <span className="text-xs font-semibold" style={{ color: note.color }}>{note.version}</span>
            </div>
            <div className="font-semibold text-slate-900 dark:text-slate-100">{note.title}</div>
            <div className="text-slate-700 dark:text-slate-200" dangerouslySetInnerHTML={{ __html: note.message }} />
          </li>
        ))}
      </ul>
      <div className="flex justify-between items-center mt-6">
        <button
          className="px-3 py-1 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 disabled:opacity-50"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span className="text-sm text-slate-600 dark:text-slate-300">
          Page {page} of {totalPages}
        </span>
        <button
          className="px-3 py-1 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 disabled:opacity-50"
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
