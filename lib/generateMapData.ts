
import { getAllPosts } from "./posts";

export type GraphNode = {
  id: string;

  label: string;

  size: "large" | "medium" | "small";

  count: number;

  tier: "small" | "medium" | "large";

  distance: number;

  color: {
    base: string;
    glow: string;
  };

  connectedTags: string[];

  articles: {
    title: string;
    slug: string;
  }[];
};

const gradients = [
  {
    base: "#c084fc",
    glow: "#e9d5ff",
  },

  {
    base: "#22d3ee",
    glow: "#67e8f9",
  },

  {
    base: "#fb7185",
    glow: "#fda4af",
  },

  {
    base: "#4ade80",
    glow: "#86efac",
  },

  {
    base: "#f59e0b",
    glow: "#fcd34d",
  },

  {
    base: "#818cf8",
    glow: "#a5b4fc",
  },
];

export async function generateMapData() {
  const posts = await getAllPosts();

  const tagCounts = new Map<
    string,
    number
  >();

  const tagConnections = new Map<
    string,
    Map<string, number>
  >();

  const tagArticles = new Map<
    string,
    {
      title: string;
      slug: string;
    }[]
  >();

  posts.forEach((post) => {
    const tags = Array.isArray(post.tags)
      ? post.tags
      : [];

    tags.forEach((tag) => {
      const cleanTag = tag
        .toLowerCase()
        .trim();

      tagCounts.set(
        cleanTag,
        (tagCounts.get(cleanTag) || 0) + 1
      );

      if (
        !tagArticles.has(cleanTag)
      ) {
        tagArticles.set(
          cleanTag,
          []
        );
      }

      tagArticles
        .get(cleanTag)
        ?.push({
          title: post.title,
          slug: post.slug,
        });

      if (
        !tagConnections.has(
          cleanTag
        )
      ) {
        tagConnections.set(
          cleanTag,
          new Map()
        );
      }

      tags.forEach((relatedTag) => {
        const cleanRelated =
          relatedTag
            .toLowerCase()
            .trim();

        if (
          cleanRelated === cleanTag
        )
          return;

        const current =
          tagConnections
            .get(cleanTag)
            ?.get(
              cleanRelated
            ) || 0;

        tagConnections
          .get(cleanTag)
          ?.set(
            cleanRelated,
            current + 1
          );
      });
    });
  });

  const nodes: GraphNode[] = Array.from(tagCounts.entries())
    .filter(([_, count]) => count > 2)
    .map(([tag, count], index) => {
      const connected = Array.from(tagConnections.get(tag)?.entries() || [])
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([tag]) => tag);

      const tier = count >= 10 ? "large" : count >= 5 ? "medium" : "small";

      const distance = tier === "large" ? 1 : tier === "medium" ? 0.78 : 0.58;

      return {
        id: tag,

        label: tag,

        count,

        size: tier,

        tier,

        distance,

        color: gradients[index % gradients.length],

        connectedTags: connected,

        articles: tagArticles.get(tag) || [],
      };
    })
    .sort((a, b) => b.count - a.count);

  return nodes;
}

