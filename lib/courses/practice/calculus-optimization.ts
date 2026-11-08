import { mcq, num, practice, worked, type LessonExtras } from "./helpers";

export const CALCULUS_OPT_EXTRAS: LessonExtras = {
  "limits-continuity-and-mean-value-theorems": [
    worked(
      "Worked example: a squeeze-theorem limit",
      "Find lim (x → 0) x·sin(1/x).",
      [
        ["Bound the oscillating part", "−1 ≤ sin(1/x) ≤ 1 for x ≠ 0."],
        ["Multiply by |x|", "−|x| ≤ x·sin(1/x) ≤ |x|."],
        ["Squeeze", "Both bounds tend to 0, so the middle does too."],
      ],
      "0",
      "sin(1/x) alone has no limit at 0, but multiplying by x crushes the oscillation."
    ),
    practice([
      num("co-lm-1", "For f(x) = x² on [1, 3], which c does the mean value theorem give?", 2, "Average slope (9 − 1)/2 = 4 = f'(c) = 2c, so c = 2.", "foundation"),
      mcq("co-lm-2", "f is continuous on [a, b] with f(a) < 0 < f(b). What does the intermediate value theorem guarantee?", [
        ["Some c in (a, b) has f(c) = 0", true, "A continuous function can't jump over 0."],
        ["f is differentiable", false, "Continuity doesn't imply differentiability."],
        ["f has a maximum at c", false, "That's a different theorem."],
      ], "This is the basis of the bisection method for finding roots."),
      mcq("co-lm-3", "Is f(x) = (x² − 1)/(x − 1) continuous at x = 1?", [
        ["No: it isn't defined there, though the limit is 2", true, "It's a removable discontinuity: define f(1) = 2 to fix it."],
        ["Yes", false, "f(1) is undefined."],
      ], "Continuous at a means f(a) exists and equals the limit.", "tricky"),
    ]),
  ],

  "taylor-series-and-single-variable-extrema": [
    worked(
      "Worked example: find and classify the extrema",
      "Find the local extrema of f(x) = x⁴ − 4x³.",
      [
        ["Critical points", "f'(x) = 4x³ − 12x² = 4x²(x − 3).", undefined, "x = 0, 3"],
        ["x = 3", "f''(x) = 12x² − 24x, and f''(3) = 36 > 0.", undefined, "local minimum, f(3) = −27"],
        ["x = 0", "f''(0) = 0, so the test is inconclusive. f' is negative on both sides of 0 (from the x² factor and x − 3 < 0)."],
        ["Conclude", "f keeps decreasing through 0: no extremum there."],
      ],
      "Only one extremum: a local (and global) minimum of −27 at x = 3",
      "When f'' = 0, check the sign of f' on both sides, or use a higher derivative."
    ),
    practice([
      mcq("co-ty-1", "What is the second-order Taylor polynomial of ln(1 + x) about 0?", [
        ["x − x²/2", true, "ln(1 + x) = x − x²/2 + x³/3 − …"],
        ["x + x²/2", false, "The signs alternate."],
        ["1 + x − x²/2", false, "ln(1) = 0, so there's no constant term."],
      ], "Know the series for eˣ, sin x, cos x, ln(1 + x) and 1/(1 − x).", "foundation"),
      num("co-ty-2", "What is the largest value of f(x) = x(4 − x)?", 4, "f'(x) = 4 − 2x = 0 at x = 2, and f(2) = 4."),
      num("co-ty-3", "What is the coefficient of x⁴ in the Maclaurin series of cos x? Give a decimal to 4 places.", 0.0417,
        "cos x = 1 − x²/2 + x⁴/24 − …, and 1/24 ≈ 0.0417.", "gate-level", undefined, 0.0005),
    ]),
  ],

  "partial-derivatives-gradient-and-directional-derivatives": [
    worked(
      "Worked example: a directional derivative",
      "f(x, y) = x²y + y³. Find ∇f at (1, 2), the directional derivative along (3, 4), and the steepest rate of increase.",
      [
        ["Partials", "fₓ = 2xy and f_y = x² + 3y².", "∇f(1, 2) = (4, 13)"],
        ["Unit direction", "(3, 4)/5."],
        ["Directional derivative", "∇f · u.", "(4·3 + 13·4)/5 = 64/5", "12.8"],
        ["Steepest rate", "|∇f| in the direction of ∇f.", "√(16 + 169)", "≈ 13.6"],
      ],
      "∇f = (4, 13); D_u f = 12.8; steepest ≈ 13.6",
      "The gradient points uphill fastest, and is perpendicular to the level curves."
    ),
    practice([
      num("co-pd-1", "f(x, y) = 3x + 4y. What is the largest directional derivative at any point?", 5, "|∇f| = |(3, 4)| = 5.", "foundation"),
      mcq("co-pd-2", "In which direction is the directional derivative zero?", [
        ["Perpendicular to the gradient (along the level curve)", true, "∇f · u = 0 when u ⊥ ∇f."],
        ["Along the gradient", false, "That's the maximum."],
        ["Opposite to the gradient", false, "That's the minimum (most negative)."],
      ], "Moving along a level curve doesn't change f."),
      num("co-pd-3", "f(x, y) = x²y. What is ∂²f/∂x∂y at (1, 1)?", 2, "∂f/∂x = 2xy; then ∂/∂y gives 2x = 2 at x = 1."),
    ]),
  ],

  "multivariate-taylor-series-and-unconstrained-extrema": [
    worked(
      "Worked example: classify a critical point with the Hessian",
      "f(x, y) = x² + 3xy + y². Classify the critical point at the origin.",
      [
        ["Gradient", "(2x + 3y, 3x + 2y) = 0 only at (0, 0)."],
        ["Hessian", "H = [[2, 3], [3, 2]]."],
        ["Eigenvalues", "5 and −1: one positive, one negative."],
      ],
      "A saddle point",
      "Hessian positive definite: minimum. Negative definite: maximum. Indefinite: saddle. Singular: the test is inconclusive."
    ),
    practice([
      mcq("co-mt-1", "The Hessian at a critical point is positive definite. The point is:", [
        ["A strict local minimum", true, "f curves upward in every direction."],
        ["A strict local maximum", false, "That's negative definite."],
        ["A saddle point", false, "That's indefinite."],
      ], "That's the second-order sufficient condition.", "foundation"),
      num("co-mt-2", "What is the minimum value of f(x, y) = x² + y² − 2x − 4y?", -5, "At (1, 2): 1 + 4 − 2 − 8 = −5."),
      mcq("co-mt-3", "The second-order Taylor expansion of f around x₀ is:", [
        ["f(x₀) + ∇f·(x − x₀) + ½(x − x₀)ᵀH(x − x₀)", true, "The quadratic term uses the Hessian."],
        ["f(x₀) + H(x − x₀)", false, "That's missing the gradient and has the wrong form."],
        ["f(x₀)·∇f", false, "No."],
      ], "Newton's method minimises exactly this quadratic model at each step."),
    ]),
  ],

  "convex-sets-convex-functions-and-jensens-inequality": [
    worked(
      "Worked example: Jensen's inequality",
      "X is 0 or 2 with equal probability, and f(x) = x². Compare E[f(X)] with f(E[X]).",
      [
        ["E[X]", "(0 + 2)/2.", "1"],
        ["f(E[X])", "1².", "1"],
        ["E[f(X)]", "(0 + 4)/2.", "2"],
        ["Compare", "For convex f, E[f(X)] ≥ f(E[X]): 2 ≥ 1. ✓"],
      ],
      "E[f(X)] = 2 ≥ f(E[X]) = 1",
      "The gap E[X²] − (E[X])² is exactly Var(X)."
    ),
    practice([
      mcq("co-cv-1", "Which function is convex on all of ℝ?", [
        ["eˣ", true, "f'' = eˣ > 0 everywhere."],
        ["x³", false, "f'' = 6x is negative for x < 0."],
        ["sin x", false, "It curves both ways."],
        ["ln x", false, "It's concave, and only defined for x > 0."],
      ], "A twice-differentiable function is convex iff f'' ≥ 0 (or its Hessian is positive semidefinite).", "foundation"),
      mcq("co-cv-2", "The intersection of two convex sets is:", [
        ["Always convex", true, "A segment that lies in both sets lies in their intersection."],
        ["Never convex", false, "No."],
        ["Convex only if they overlap", false, "The empty set counts as convex too."],
      ], "Unions of convex sets, though, usually aren't convex."),
      mcq("co-cv-3", "For a convex function, a local minimum is:", [
        ["Always a global minimum", true, "That's why convex problems are 'easy'."],
        ["Sometimes only local", false, "Not for convex functions."],
        ["Always unique", false, "Strict convexity is needed for uniqueness."],
      ], "Non-convex problems such as neural network training can get stuck in local minima.", "tricky"),
    ]),
  ],

  "lagrangian-duality-and-slaters-condition": [
    worked(
      "Worked example: the dual of a tiny problem",
      "Minimise x² subject to x ≥ 1. Find the dual and check for strong duality.",
      [
        ["Lagrangian", "L(x, λ) = x² − λ(x − 1), with λ ≥ 0."],
        ["Minimise over x", "∂L/∂x = 2x − λ = 0 gives x = λ/2.", "g(λ) = −λ²/4 + λ"],
        ["Maximise the dual", "g'(λ) = −λ/2 + 1 = 0 gives λ = 2.", "g(2) = 1"],
        ["Primal optimum", "x = 1 gives x² = 1."],
        ["Compare", "Dual 1 = primal 1: strong duality, as Slater's condition (x = 2 is strictly feasible) promises."],
      ],
      "Primal = dual = 1, with λ* = 2",
      "Weak duality (dual ≤ primal, for minimisation) always holds; strong duality needs conditions like Slater's."
    ),
    practice([
      mcq("co-du-1", "Weak duality for a minimisation problem says:", [
        ["The dual optimum is at most the primal optimum", true, "Any dual feasible value is a lower bound."],
        ["They're always equal", false, "That's strong duality, which needs extra conditions."],
        ["The dual is at least the primal", false, "That's reversed."],
      ], "The difference is the duality gap.", "foundation"),
      mcq("co-du-2", "Slater's condition for a convex problem asks for:", [
        ["A strictly feasible point (all inequality constraints strictly satisfied)", true, "That guarantees a zero duality gap."],
        ["A unique optimum", false, "Not required."],
        ["Linear constraints only", false, "Not required."],
      ], "Slater's condition is a constraint qualification: it makes the KKT conditions necessary."),
      num("co-du-3", "In the worked example, what is the optimal multiplier λ*?", 2, "From g'(λ) = 0: λ* = 2, which also equals the derivative of x² at x = 1."),
    ]),
  ],

  "method-of-lagrange-multipliers-for-equality-constraints": [
    worked(
      "Worked example: maximise a product under a sum constraint",
      "Maximise f(x, y) = xy subject to x + y = 10.",
      [
        ["Lagrangian", "L = xy − λ(x + y − 10)."],
        ["Stationary conditions", "y − λ = 0, x − λ = 0, and x + y = 10."],
        ["Solve", "x = y = λ, so 2λ = 10.", undefined, "x = y = 5, λ = 5"],
        ["Value", "5·5.", "25"],
      ],
      "Maximum 25 at x = y = 5",
      "At the optimum, ∇f is parallel to ∇g. λ measures how fast the optimum changes as the constraint loosens."
    ),
    practice([
      num("co-lg-1", "What is the minimum of x² + y² subject to x + y = 2?", 2, "By symmetry x = y = 1, giving 1 + 1 = 2."),
      mcq("co-lg-2", "At a constrained optimum found by Lagrange multipliers:", [
        ["∇f = λ∇g", true, "The gradient of the objective is parallel to the gradient of the constraint."],
        ["∇f = 0", false, "That's for unconstrained problems."],
        ["λ = 0 always", false, "Only if the constraint isn't binding."],
      ], "Geometrically, the level curve of f just touches the constraint curve.", "foundation"),
      num("co-lg-3", "Maximise xy subject to x + y = 20. What is the maximum value?", 100, "x = y = 10, so xy = 100."),
    ]),
  ],

  "karush-kuhn-tucker-kkt-conditions-and-complementary-slackness": [
    worked(
      "Worked example: KKT with an active constraint",
      "Minimise (x − 2)² subject to x ≤ 1.",
      [
        ["Unconstrained optimum", "x = 2, which breaks x ≤ 1. So the constraint will be active."],
        ["Stationarity", "2(x − 2) + μ = 0, with the constraint written as g(x) = x − 1 ≤ 0."],
        ["Set x = 1", "2(1 − 2) + μ = 0.", undefined, "μ = 2 ≥ 0 ✓"],
        ["Complementary slackness", "μ·(x − 1) = 2·0 = 0. ✓"],
      ],
      "x* = 1 with μ = 2",
      "Complementary slackness: either the constraint is active, or its multiplier is 0."
    ),
    practice([
      mcq("co-kkt-1", "At a KKT point, an inactive constraint (gᵢ(x*) < 0) has multiplier:", [
        ["μᵢ = 0", true, "Complementary slackness: μᵢgᵢ(x*) = 0."],
        ["μᵢ > 0", false, "Only active constraints can have a positive multiplier."],
        ["μᵢ < 0", false, "Inequality multipliers are never negative."],
      ], "That's why SVMs depend only on their support vectors: the other points have zero multipliers.", "foundation"),
      mcq("co-kkt-2", "For a convex problem satisfying Slater's condition, the KKT conditions are:", [
        ["Necessary and sufficient for optimality", true, "Convexity makes them sufficient; Slater makes them necessary."],
        ["Only necessary", false, "Convexity adds sufficiency."],
        ["Irrelevant", false, "They characterise the optimum exactly."],
      ], "That's the foundation of the SVM dual."),
      num("co-kkt-3", "Minimise (x − 2)² subject to x ≤ 3. What is x*?", 2, "The unconstrained optimum x = 2 already satisfies x ≤ 3, so the constraint is inactive and μ = 0."),
    ]),
  ],

  "gradient-descent-learning-rates-and-convergence-analysis": [
    worked(
      "Worked example: gradient descent on x²",
      "Minimise f(x) = x² from x₀ = 8 with learning rate η = 0.25. Find x₁, x₂ and x₃, and the range of η that converges.",
      [
        ["Update rule", "x ← x − η·f'(x) = x − 0.25·2x = 0.5x."],
        ["Iterate", "8 → 4 → 2 → 1.", undefined, "x₃ = 1"],
        ["When it converges", "xₖ₊₁ = (1 − 2η)xₖ converges iff |1 − 2η| < 1.", "0 < η < 1"],
      ],
      "x₁ = 4, x₂ = 2, x₃ = 1; converges for 0 < η < 1",
      "For an L-smooth function, η < 2/L guarantees descent. Here f'' = 2 = L, so the bound is η < 1."
    ),
    practice([
      mcq("co-gd-1", "On f(x) = x², what happens with η = 1.5?", [
        ["It diverges: x is multiplied by −2 every step", true, "1 − 2·1.5 = −2, so |xₖ| doubles."],
        ["It converges more slowly", false, "It doesn't converge at all."],
        ["It converges in one step", false, "That's η = 0.5."],
      ], "A learning rate that's too big overshoots and oscillates outwards."),
      num("co-gd-2", "f(x) = x², x₀ = 3, η = 0.5. What is x₁?", 0, "x₁ = x₀ − 0.5·2·x₀ = 0: one step lands exactly on the minimum.", "foundation"),
      mcq("co-gd-3", "Stochastic gradient descent differs from batch gradient descent because it:", [
        ["Estimates the gradient from one example (or a mini-batch) per step", true, "Cheaper steps, with noisier progress."],
        ["Uses the exact gradient over all data", false, "That's batch gradient descent."],
        ["Needs no learning rate", false, "It needs one, usually decaying over time."],
      ], "The noise in SGD can even help escape shallow local minima."),
    ]),
  ],

  "second-order-optimization-newtons-method": [
    worked(
      "Worked example: Newton's method for √2",
      "Use Newton's method on g(x) = x² − 2, starting from x₀ = 1, for two steps.",
      [
        ["Update", "x ← x − g(x)/g'(x) = x − (x² − 2)/(2x)."],
        ["Step 1", "1 − (1 − 2)/2.", "1.5"],
        ["Step 2", "1.5 − (2.25 − 2)/3.", "≈ 1.41667"],
        ["Compare", "√2 ≈ 1.41421: the error drops roughly quadratically."],
      ],
      "x₁ = 1.5, x₂ ≈ 1.41667",
      "To minimise f, apply the same idea to f': x ← x − f'(x)/f''(x)."
    ),
    practice([
      num("co-nw-1", "Minimise f(x) = x² − 4x with Newton's method from x₀ = 10. What is x₁?", 2,
        "x₁ = 10 − f'(10)/f''(10) = 10 − 16/2 = 2. On a quadratic, Newton reaches the minimum in one step.", "foundation"),
      mcq("co-nw-2", "Newton's method converges:", [
        ["Quadratically near the solution, when the Hessian there is invertible", true, "The number of correct digits roughly doubles each step."],
        ["Linearly, always", false, "That's gradient descent."],
        ["From any starting point", false, "It can diverge from a bad start."],
      ], "Each step needs the Hessian, which costs O(n³) to invert; quasi-Newton methods such as BFGS approximate it."),
      mcq("co-nw-3", "Why isn't plain Newton's method used to train large neural networks?", [
        ["The Hessian has n² entries, too many to store or invert for millions of parameters", true, "First-order methods scale far better."],
        ["It needs a learning rate", false, "Plain Newton doesn't."],
        ["It only works in one dimension", false, "It works in any dimension."],
      ], "Adam and SGD scale linearly with the number of parameters."),
    ]),
  ],
};
