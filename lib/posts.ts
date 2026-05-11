import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { supabase } from "./supabase";

const postsDir = path.join(process.cwd(), "content", "posts");

export type PostMeta = {
  title: string;
  slug: string;
  date: string;
created_at: string;
  category: string;
  subcategory?: string;
  excerpt?: string;
  banner?: string;
  content?: string; // ⭐ For full-content search
  theme?: string;
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
export async function getCombinedPosts(): Promise<PostMeta[]> {
  console.log(process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  const markdownPosts = await getAllPosts();

  const { data: supabasePosts, error } = await supabase
    .from("posts")
    .select("*")
    .eq("published", true);

  if (error) {
    console.error("[getCombinedPosts] supabase failed:", error);
    return markdownPosts;
  }

  const normalizedSupabasePosts: PostMeta[] = (supabasePosts || []).map(
    (post: any) => ({
      title: post.title,
      slug: post.slug,
      date: post.date || "",
      created_at: post.created_at || "",
      category: post.category || "uncategorized",
      excerpt: post.excerpt || "",
      banner: post.banner || "",
      content: post.content || "",
      subcategory: post.subcategory || "",
      theme: post.theme || "",
    })
  );

  const combined = [...markdownPosts, ...normalizedSupabasePosts];

  return combined.sort((a, b) => {
    const dateA = new Date(a.date || a.created_at).getTime();
    const dateB = new Date(b.date || b.created_at).getTime();

    return dateB - dateA;
  });
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


