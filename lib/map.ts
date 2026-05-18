import { PostMeta } from "./posts";

export function getRelatedPosts(
  currentPost: PostMeta,
  allPosts: PostMeta[]
) {
  return allPosts
    .filter((post) => post.slug !== currentPost.slug)
    .map((post) => {
      const currentTags = Array.isArray(currentPost.tags)
  ? currentPost.tags
  : [];

const postTags = Array.isArray(post.tags)
  ? post.tags
  : [];

      const sharedTags = currentTags.filter((tag) =>
        postTags.includes(tag)
      );

      let score = sharedTags.length;

      if (post.category === currentPost.category) {
        score += 2;
      }

      return {
        post,
        score,
        sharedTags,
      };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);
}
