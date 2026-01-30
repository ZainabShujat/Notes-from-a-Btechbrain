import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const postsDir = path.join(process.cwd(), "content", "posts");

export type PostMeta = {
  title: string;
  slug: string;
  date: string;
  category: string;
  subcategory?: string;
  excerpt?: string;
  banner?: string;
  content?: string; // ⭐ For full-content search
};


export async function getAllPosts(): Promise<PostMeta[]> {
  try {
    // if folder missing or empty, return []
    if (!fs.existsSync(postsDir)) return [];
    const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".md"));
    const posts = files.map((file) => {
      const raw = fs.readFileSync(path.join(postsDir, file), "utf8");
      const { data, content } = matter(raw);
      return { ...data, content } as PostMeta;
    });
    return posts.sort((a, b) => +new Date(b.date) - +new Date(a.date));
  } catch (e) {
    console.error("[getAllPosts] failed:", e);
    return [];
  }
}
// lib/posts.ts
// Defensive getLatestPerCategory - handles missing category or categories array
export function getLatestPerCategory(posts: Array<any>) {
  const seen = new Map<string, any>();

  for (const p of posts) {
    // Normalize category:
    // - if frontmatter has `category` (string) use it
    // - else if frontmatter has `categories` (array) use first element
    // - else fallback to 'uncategorized'
    let rawCat: any = undefined;

    // p may already have normalized props, or store frontmatter in p.frontmatter
    if (typeof p.category === "string" && p.category.trim() !== "") {
      rawCat = p.category;
    } else if (Array.isArray(p.categories) && p.categories.length > 0 && typeof p.categories[0] === "string") {
      rawCat = p.categories[0];
    } else if (p.frontmatter && typeof p.frontmatter.category === "string" && p.frontmatter.category.trim() !== "") {
      rawCat = p.frontmatter.category;
    } else if (p.frontmatter && Array.isArray(p.frontmatter.categories) && p.frontmatter.categories.length > 0 && typeof p.frontmatter.categories[0] === "string") {
      rawCat = p.frontmatter.categories[0];
    } else {
      rawCat = "uncategorized";
    }

    const cat = String(rawCat).toLowerCase();

    if (!seen.has(cat)) {
      seen.set(cat, p); // first encountered post (assumes posts sorted newest-first)
    }
  }

  // return posts (latest per category) as an array preserving insertion order
  return Array.from(seen.values());
}


