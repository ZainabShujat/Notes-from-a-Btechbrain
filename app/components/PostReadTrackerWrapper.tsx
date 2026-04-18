"use client";
import PostReadTracker from "./PostReadTracker";

export default function PostReadTrackerWrapper({ slug, postId }: { slug: string; postId: string }) {
  return <PostReadTracker slug={slug} postId={postId} />;
}
