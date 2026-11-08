// Fails if a practice file targets a lesson id that doesn't exist, and
// reports which lessons still have no worked example or practice.
import { getAllCourses } from "../lib/courses";
import { LESSON_EXTRAS } from "../lib/courses/practice";

const courses = getAllCourses();
const ids = new Set(courses.flatMap((c) => c.modules.flatMap((m) => m.lessons.map((l) => l.id))));
const unknown = Object.keys(LESSON_EXTRAS).filter((id) => !ids.has(id));

for (const c of courses) {
  const lessons = c.modules.flatMap((m) => m.lessons);
  const missing = lessons.filter(
    (l) => !l.sections.some((s) => s.type === "worked-example") || !l.sections.some((s) => s.type === "practice")
  );
  console.log(`${c.slug.padEnd(32)} ${lessons.length - missing.length}/${lessons.length} complete`);
  if (process.argv.includes(c.slug)) missing.forEach((l) => console.log(`  - ${l.id}`));
}
if (unknown.length) {
  console.error("Unknown lesson ids:", unknown.join(", "));
  process.exit(1);
}
