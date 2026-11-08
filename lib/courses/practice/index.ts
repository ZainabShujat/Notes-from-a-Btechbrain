import type { LessonExtras } from "./helpers";
import { ALGORITHMS_EXTRAS } from "./algorithms";
import { DATA_STRUCTURES_EXTRAS } from "./data-structures";
import { TOC_EXTRAS } from "./toc";
import { CN_EXTRAS } from "./cn";
import { COA_EXTRAS } from "./coa";
import { DIGITAL_LOGIC_EXTRAS } from "./digital-logic";
import { C_PROGRAMMING_EXTRAS } from "./c-programming";
import { COMPILER_DESIGN_EXTRAS } from "./compiler-design";

/** Worked examples and practice for every subject, keyed by lesson id. */
export const LESSON_EXTRAS: LessonExtras = {
  ...ALGORITHMS_EXTRAS,
  ...DATA_STRUCTURES_EXTRAS,
  ...TOC_EXTRAS,
  ...CN_EXTRAS,
  ...COA_EXTRAS,
  ...DIGITAL_LOGIC_EXTRAS,
  ...C_PROGRAMMING_EXTRAS,
  ...COMPILER_DESIGN_EXTRAS,
};
