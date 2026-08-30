"use client";
import { useState } from "react";
import notifications from "../notifications";
import Button from "./ui/Button";
import PageHeader from "./ui/PageHeader";

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
    <div className="w-full">
      {/* Version color legend removed as requested */}
      <ul className="flex flex-col gap-4 list-none p-0 m-0">
        {currentNotifications.map((note) => (
          <li
            key={note.id}
            className="pl-4 py-3 pr-4 bg-surface-1 border border-hairline rounded-md backdrop-blur-md"
            style={{ borderLeft: `6px solid ${note.color}` }}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs text-ink-3">{note.date}</span>
              <span className="text-xs font-semibold" style={{ color: note.color }}>{note.version}</span>
            </div>
            <div className="font-semibold text-ink-1">{note.title}</div>
            <div className="text-ink-2" dangerouslySetInnerHTML={{ __html: note.message }} />
          </li>
        ))}
      </ul>
      <div className="flex justify-between items-center mt-6">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          Previous
        </Button>
        <span className="text-sm text-ink-3">
          Page {page} of {totalPages}
        </span>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
