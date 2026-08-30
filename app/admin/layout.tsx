import type { Metadata } from "next";
import { NOINDEX } from "../../lib/seo";

// The studio must never appear in search results.
export const metadata: Metadata = { title: "Admin", ...NOINDEX };

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
