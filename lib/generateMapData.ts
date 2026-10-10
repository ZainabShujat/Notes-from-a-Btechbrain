import { getAllCourses } from "./courses";
import { getAllPosts } from "./posts";
import { OBSERVATIONS } from "../app/wonder/data";
import { BOOK_PROJECTS, PUBLISHED_GAMES } from "./featured-resources";
import { COURSE_LABS } from "./labs";

type ResourceType = "edition" | "wander" | "subject" | "lesson" | "experience" | "game" | "series" | "project";

export type BrainMapNode = {
  id: string;
  type: ResourceType;
  title: string;
  href: string;
  description?: string;
  date?: string;
  category?: string;
  tags: string[];
  parentId?: string;
};

export type BrainMapEdge = {
  id: string;
  source: string;
  target: string;
  relation: "contains" | "has-experience" | "references" | "related-to" | "classified-under";
  provenance: string;
};

export type BrainMapData = { nodes: BrainMapNode[]; edges: BrainMapEdge[] };

function shortText(value?: string, max = 280) {
  if (!value) return undefined;
  const text = value.replace(/<[^>]*>/g, " ").replace(/[#>*_`\[\]()]/g, " ").replace(/\s+/g, " ").trim();
  return text ? text.slice(0, max) : undefined;
}

function unique(values: (string | undefined)[]) {
  return [...new Set(values.map((value) => value?.trim()).filter((value): value is string => Boolean(value)))];
}

export async function generateMapData(): Promise<BrainMapData> {
  const [posts, courses] = await Promise.all([getAllPosts(), Promise.resolve(getAllCourses())]);
  const nodes: BrainMapNode[] = [];
  const edges: BrainMapEdge[] = [];
  const attachedLabIds = new Set<string>();

  for (const post of posts) {
    if (!post.slug || !post.title) continue;
    nodes.push({
      id: `edition:${post.slug}`,
      type: "edition",
      title: post.title,
      href: `/post/${post.slug}`,
      description: shortText(post.mapDescription || post.excerpt || post.content),
      date: post.date || post.created_at,
      category: post.category,
      tags: unique(Array.isArray(post.tags) ? post.tags : []),
    });
  }

  for (const note of OBSERVATIONS) {
    nodes.push({ id: `wander:${note.id}`, type: "wander", title: note.title, href: `/wonder/${note.id}`, description: shortText(note.body), date: note.date, tags: ["Wander"] });
  }

  for (const course of courses) {
    const subjectId = `subject:${course.slug}`;
    nodes.push({ id: subjectId, type: "subject", title: course.title, href: `/notes/${course.slug}`, description: shortText(course.description), category: course.gateBranches?.map((branch) => `GATE ${branch.toUpperCase()}`).join(" · ") || "Learning notebook", tags: unique([course.shortTitle, ...(course.gateBranches || []).map((branch) => `GATE ${branch.toUpperCase()}`)]) });

    for (const module of course.modules) {
      for (const lesson of module.lessons) {
        const lessonId = `lesson:${course.slug}:${lesson.slug}`;
        nodes.push({ id: lessonId, type: "lesson", title: lesson.title, href: `/notes/${course.slug}/${lesson.slug}`, description: shortText(lesson.tagline), category: module.title, tags: [course.shortTitle, module.title], parentId: subjectId });
        edges.push({ id: `${subjectId}->${lessonId}`, source: subjectId, target: lessonId, relation: "contains", provenance: `Registered in ${course.title}` });

        lesson.sections.forEach((section, index) => {
          if (section.type !== "interactive") return;
          const catalogLab = COURSE_LABS.find((lab) => lab.courseSlug === course.slug && lab.lessonSlug === lesson.slug && !attachedLabIds.has(lab.id));
          if (catalogLab) attachedLabIds.add(catalogLab.id);
          const anchor = section.id || `section-${index}`;
          const experienceId = `experience:${course.slug}:${lesson.slug}:${anchor}`;
          const configTitle = section.interactive.config && "title" in section.interactive.config ? section.interactive.config.title : undefined;
          const title = catalogLab?.title || section.heading || configTitle || `${lesson.title} interactive`;
          nodes.push({ id: experienceId, type: "experience", title, href: `${lessonId.replace(/^lesson:/, "/notes/").replace(/:/g, "/")}#${anchor}`, description: shortText(catalogLab?.description || section.leadParagraph || lesson.tagline), category: module.title, tags: unique([course.shortTitle, module.title, ...(catalogLab?.tags || [])]), parentId: lessonId });
          edges.push({ id: `${lessonId}->${experienceId}`, source: lessonId, target: experienceId, relation: "has-experience", provenance: "Interactive section in this lesson" });
        });
      }
    }
  }

  for (const lab of COURSE_LABS) {
    if (attachedLabIds.has(lab.id)) continue;
    const lessonId = `lesson:${lab.courseSlug}:${lab.lessonSlug}`;
    const experienceId = `experience:lab:${lab.id}`;
    nodes.push({ id: experienceId, type: "experience", title: lab.title, href: `/notes/${lab.courseSlug}/${lab.lessonSlug}`, description: shortText(lab.description), category: lab.subjectName, tags: unique([lab.subjectName, ...lab.tags]), parentId: lessonId });
    if (nodes.some((node) => node.id === lessonId)) {
      edges.push({ id: `${lessonId}->${experienceId}:has-experience`, source: lessonId, target: experienceId, relation: "has-experience", provenance: "Dedicated laboratory record links this tool to its lesson" });
    }
  }
  const categoryGroups = new Map<string, string[]>();
  for (const post of posts) {
    if (!post.slug || !post.category?.trim()) continue;
    const category = post.category.trim().toLowerCase();
    const members = categoryGroups.get(category) || [];
    members.push(`edition:${post.slug}`);
    categoryGroups.set(category, members);
  }
  for (const [category, members] of categoryGroups) {
    if (members.length < 2) continue;
    const title = category.split(/[-_\s]+/).filter(Boolean).map((word) => word[0].toUpperCase() + word.slice(1)).join(" ");
    const id = `series:${category}`;
    nodes.push({ id, type: "series", title, href: `/category/${encodeURIComponent(category)}`, description: `${members.length} editions are filed in this publication category.`, category, tags: ["Edition category"] });
    for (const member of members) edges.push({ id: `${member}->${id}:classified-under`, source: member, target: id, relation: "classified-under", provenance: "Edition category metadata" });
  }

  for (const book of BOOK_PROJECTS) {
    nodes.push({ id: `project:${book.id}`, type: "project", title: book.title, href: book.href, description: shortText(book.description), tags: ["Book", book.status] });
  }

  for (const game of PUBLISHED_GAMES) {
    nodes.push({ id: `game:${game.id}`, type: "game", title: game.title, href: game.href, description: game.description, tags: ["Browser game", "Interactive"] });
  }
  const nodeByPath = new Map(nodes.map((node) => [node.href.split("#")[0], node]));
  const nodeById = new Map(nodes.map((node) => [node.id, node]));
  const addEdge = (source: string, target: string, relation: BrainMapEdge["relation"], provenance: string) => {
    if (source === target || !nodeById.has(source) || !nodeById.has(target)) return;
    const id = `${source}->${target}:${relation}`;
    if (!edges.some((edge) => edge.id === id)) edges.push({ id, source, target, relation, provenance });
  };

  // Only explicit related-slug metadata and links written into the edition are treated as relationships.
  for (const post of posts) {
    const source = `edition:${post.slug}`;
    for (const slug of Array.isArray(post.related) ? post.related : []) addEdge(source, `edition:${slug}`, "related-to", "Explicit related-edition metadata");
    const body = post.content || "";
    const links = [...body.matchAll(/(?:https?:\/\/([^/\s)]+))?(\/(?:post|wonder|notes)\/[a-zA-Z0-9_./-]+)/g)];
    for (const match of links) {
      const host = match[1]?.toLowerCase();
      if (host && !["btechbrain.zainabshujat.dev", "btechbrain.vercel.app"].includes(host)) continue;
      const path = match[2].replace(/[.,;!?]+$/, "");
      const target = nodeByPath.get(path);
      if (target) addEdge(source, target.id, "references", "Internal link in edition text");
    }
  }
  const uniqueNodes = [...new Map(nodes.map((node) => [node.id, node])).values()];
  const validIds = new Set(uniqueNodes.map((node) => node.id));
  const uniqueEdges = [...new Map(edges.filter((edge) => validIds.has(edge.source) && validIds.has(edge.target)).map((edge) => [edge.id, edge])).values()];
  return { nodes: uniqueNodes, edges: uniqueEdges };
}
