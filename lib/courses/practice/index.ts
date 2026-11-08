import type { LessonExtras } from "./helpers";
import { ALGORITHMS_EXTRAS } from "./algorithms";
import { DATA_STRUCTURES_EXTRAS } from "./data-structures";
import { TOC_EXTRAS } from "./toc";
import { CN_EXTRAS } from "./cn";
import { COA_EXTRAS } from "./coa";
import { DIGITAL_LOGIC_EXTRAS } from "./digital-logic";
import { C_PROGRAMMING_EXTRAS } from "./c-programming";
import { COMPILER_DESIGN_EXTRAS } from "./compiler-design";
import { DISCRETE_MATHS_EXTRAS } from "./discrete-maths";
import { GENERAL_APTITUDE_EXTRAS } from "./general-aptitude";
import { ENGINEERING_MATHS_EXTRAS } from "./engineering-maths";
import { PROB_STATS_EXTRAS } from "./prob-stats";
import { LINEAR_ALGEBRA_EXTRAS } from "./linear-algebra";
import { CALCULUS_OPT_EXTRAS } from "./calculus-optimization";
import { ML_EXTRAS } from "./machine-learning";
import { AI_EXTRAS } from "./artificial-intelligence";

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
  ...DISCRETE_MATHS_EXTRAS,
  ...GENERAL_APTITUDE_EXTRAS,
  ...ENGINEERING_MATHS_EXTRAS,
  ...PROB_STATS_EXTRAS,
  ...LINEAR_ALGEBRA_EXTRAS,
  ...CALCULUS_OPT_EXTRAS,
  ...ML_EXTRAS,
  ...AI_EXTRAS,
};
