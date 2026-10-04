import type { Metadata } from "next";
import { pageMetadata } from "../../lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Start Here",
  description:
    "Not sure where to begin? Choose your entry point into Notes From A B.Tech Brain based on curiosity, early-career questions, or engineering reflections.",
  path: "/start-here",
});

export default function StartHereLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
