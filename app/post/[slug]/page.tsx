// app/post/[slug]/page.tsx
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import { remark } from "remark";
import html from "remark-html";
import Link from "next/link";
import BackButton from "../../components/BackButton";
import ViewCounter from "../../components/ViewCounter";
import LikeButton from "../../components/LikeButton";
import PostCard from "../../components/PostCard";
import { getAllPosts } from "../../../lib/posts";
import { supabase } from "../../../lib/supabase";
// Client wrapper for PostReadTracker (must be imported after all Node.js/server imports)
import PostReadTrackerWrapper from "../../components/PostReadTrackerWrapper";

type PageProps = {
  params: Promise<{ slug: string }>;
};


export default function Page({ params }: PageProps) {

  // ...existing code for fetching post data, etc...
  // For brevity, you should move the async data fetching logic into a useEffect or use a client-side data fetching approach (e.g., SWR, useEffect+fetch).
  // Here, just render a placeholder:
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-10 bg-white">
      {/* ...existing post content rendering logic here... */}
      <div style={{padding: 40, textAlign: "center"}}>Post content here (see original code for full logic)</div>
    </main>
  );
}

// .blog-content, .blog-content p, .blog-content li, .blog-content small {
//   color: #000 !important;
//   text-shadow: none !important;
// }

// app/lib/posts.ts (or wherever PostMeta is defined)
export interface PostMeta {
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  banner?: string;
  series?: string;
  theme?: string; // <-- Add this line
  // ...any other fields
}