import type { PostMeta } from "./posts";

/**
 * Every post category is published as its own magazine on /editions.
 * The cover is a collage of the banners of the editions inside it.
 */
export type MagazineMeta = {
  /** Matches the post `category` field. */
  slug: string;
  title: string;
  tagline: string;
  /** Accent for the masthead band and spine. */
  accent: string;
};

export const MAGAZINES: MagazineMeta[] = [
  { slug: "when-sci-fi-meets-science", title: "When Sci-Fi Meets Science", tagline: "What our favourite films get right, and wrong, about the universe.", accent: "#7dd3fc" },
  { slug: "i-wonder-why", title: "I Wonder Why", tagline: "Small questions about memory, language, time and being human.", accent: "#c4b5fd" },
  { slug: "curiosity-series", title: "Curiosity Edition", tagline: "Puzzles, science stories and the things that broke my brain.", accent: "#fde047" },
  { slug: "behind-the-scenes", title: "Behind the Build", tagline: "How this site and its side projects actually got made.", accent: "#fb923c" },
  { slug: "girlhood-and-stem-experiences", title: "Girlhood & STEM", tagline: "Growing up, equality and being a girl in engineering.", accent: "#f9a8d4" },
  { slug: "financial-month", title: "Financial Month", tagline: "Money, internships and the skills that quietly pay.", accent: "#86efac" },
  { slug: "friday-insights", title: "Friday Insights", tagline: "Weekly reflections on ambition, time and the plans that changed.", accent: "#fca5a5" },
  { slug: "tech-demystified", title: "Tech Demystified", tagline: "Blockchain, crypto and the tech everyone talks about, explained.", accent: "#67e8f9" },
  { slug: "july-crisis", title: "The July Crisis", tagline: "Self-love, discipline, direction and building through burnout.", accent: "#fdba74" },
  { slug: "world-watch", title: "World Watch", tagline: "A weekly look at geopolitics, markets and the world outside.", accent: "#a5b4fc" },
  { slug: "tech-pulse", title: "Tech Pulse", tagline: "Weekly notes on AI and the tech headlines worth keeping.", accent: "#5eead4" },
  { slug: "milestone-stories-and-miscellaneous", title: "Milestones & Miscellany", tagline: "Beginnings, resets, letters to past selves and everything between.", accent: "#e9d5ff" },
];

export type Magazine = MagazineMeta & {
  /** Oldest first, the order the series was written in. */
  posts: PostMeta[];
  newest: string;
  oldest: string;
};

const time = (p: PostMeta) => new Date(p.date || p.created_at || 0).getTime() || 0;

function titleCase(slug: string) {
  return slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

/**
 * Groups posts into magazines, newest magazine first. Categories without
 * an entry above still get a plain magazine so no post goes missing.
 */
export function buildMagazines(posts: PostMeta[]): Magazine[] {
  const byCategory = new Map<string, PostMeta[]>();
  for (const post of posts) {
    if (!post.slug || !post.title) continue;
    const key = (post.category || "uncategorized").toLowerCase();
    byCategory.set(key, [...(byCategory.get(key) ?? []), post]);
  }

  return [...byCategory.entries()]
    .map(([slug, list]) => {
      const meta = MAGAZINES.find((m) => m.slug === slug) ?? {
        slug,
        title: titleCase(slug),
        tagline: "",
        accent: "#c4b5fd",
      };
      const sorted = [...list].sort((a, b) => time(a) - time(b));
      return {
        ...meta,
        posts: sorted,
        oldest: sorted[0].date || sorted[0].created_at,
        newest: sorted[sorted.length - 1].date || sorted[sorted.length - 1].created_at,
      };
    })
    .sort((a, b) => new Date(b.newest).getTime() - new Date(a.newest).getTime());
}

/** "When Sci-Fi Meets Science: Arrival" reads as just "Arrival" inside its own magazine. */
export function titleInMagazine(title: string, magazineTitle: string) {
  const prefix = magazineTitle.toLowerCase();
  if (!title.toLowerCase().startsWith(prefix)) return title;
  const rest = title.slice(prefix.length).replace(/^\s*[:|—–-]\s*/, "");
  // Only strip when a separator followed the series name.
  return rest && rest !== title.slice(prefix.length) ? rest : title;
}

export function formatRange(oldest: string, newest: string) {
  const fmt = (v: string) =>
    new Intl.DateTimeFormat("en", { month: "short", year: "numeric" }).format(new Date(v));
  const a = fmt(oldest);
  const b = fmt(newest);
  return a === b ? a : `${a} – ${b}`;
}
