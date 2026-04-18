"use client";
import { useEffect } from "react";

export default function PostReadTracker({ slug, postId }: { slug: string; postId: string }) {
  useEffect(() => {
    fetch(`/api/history/${slug}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ post_id: postId }),
    });
  }, [slug, postId]);
  return null;
}
