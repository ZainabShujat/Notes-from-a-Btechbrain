import type { Metadata } from "next";
import { NOINDEX } from "../../lib/seo";

export const metadata: Metadata = { title: "Editor", ...NOINDEX };

export default function WriteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
