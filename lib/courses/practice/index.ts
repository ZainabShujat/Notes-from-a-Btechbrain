import type { LessonExtras } from "./helpers";
import { ALGORITHMS_EXTRAS } from "./algorithms";
import { DATA_STRUCTURES_EXTRAS } from "./data-structures";
import { TOC_EXTRAS } from "./toc";
import { CN_EXTRAS } from "./cn";

/** Worked examples and practice for every subject, keyed by lesson id. */
export const LESSON_EXTRAS: LessonExtras = {
  ...ALGORITHMS_EXTRAS,
  ...DATA_STRUCTURES_EXTRAS,
  ...TOC_EXTRAS,
  ...CN_EXTRAS,
};
