import { mcq, num, practice, worked, type LessonExtras } from "./helpers";

export const ENGINEERING_MATHS_EXTRAS: LessonExtras = {
  "matrices-and-eigenvalues": [
    worked(
      "Worked example: rank by row reduction",
      "Find the rank of A = [[1, 2, 3], [2, 4, 6], [1, 1, 1]].",
      [
        ["R₂ − 2R₁", "Row 2 becomes [0, 0, 0]: it was a multiple of row 1."],
        ["R₃ − R₁", "Row 3 becomes [0, −1, −2]."],
        ["Count pivots", "The non-zero rows are [1, 2, 3] and [0, −1, −2].", undefined, "2 pivots"],
      ],
      "Rank 2",
      "Rank = number of pivots = number of independent rows = number of independent columns. det(A) = 0 here, so the rank is below 3."
    ),
    practice([
      mcq("em-mx-1", "A 3 × 3 matrix has determinant 0. Its rank is:", [
        ["At most 2", true, "A zero determinant means the rows are dependent."],
        ["Exactly 3", false, "That needs a non-zero determinant."],
        ["Always 0", false, "Only the zero matrix has rank 0."],
      ], "Full rank ⇔ non-zero determinant ⇔ invertible.", "foundation"),
      num("em-mx-2", "A is a 4 × 6 matrix of rank 3. What is the dimension of its null space?", 3, "Rank-nullity: nullity = number of columns − rank = 6 − 3 = 3."),
      num("em-mx-3", "What is det of the upper triangular matrix [[2, 5, 1], [0, 3, 7], [0, 0, 4]]?", 24, "For a triangular matrix, det = product of the diagonal: 2·3·4 = 24.", "foundation"),
    ]),
  ],

  "eigenvalues-eigenvectors-and-cayley-hamilton": [
    worked(
      "Worked example: eigenvalues of a 2 × 2 matrix",
      "Find the eigenvalues of A = [[2, 1], [1, 2]], and use Cayley-Hamilton to express A⁻¹.",
      [
        ["Characteristic equation", "det(A − λI) = (2 − λ)² − 1 = 0.", "λ² − 4λ + 3 = 0"],
        ["Solve", "(λ − 1)(λ − 3) = 0.", undefined, "λ = 1, 3"],
        ["Check", "Sum = 4 = trace; product = 3 = det. ✓"],
        ["Cayley-Hamilton", "A satisfies its own equation: A² − 4A + 3I = 0."],
        ["Inverse", "Multiply by A⁻¹: A − 4I + 3A⁻¹ = 0.", "A⁻¹ = (4I − A)/3"],
      ],
      "Eigenvalues 1 and 3; A⁻¹ = (4I − A)/3",
      "Use trace = sum of eigenvalues and det = product to check answers instantly."
    ),
    practice([
      num("em-ev-1", "A 3 × 3 matrix has eigenvalues 1, 2 and 4. What is its determinant?", 8, "The product of the eigenvalues: 1·2·4 = 8.", "foundation"),
      num("em-ev-2", "Same matrix. What is the trace of A²?", 21, "The eigenvalues of A² are 1, 4 and 16; their sum is 21."),
      mcq("em-ev-3", "The eigenvalues of a real symmetric matrix are always:", [
        ["Real", true, "And its eigenvectors for different eigenvalues are orthogonal."],
        ["Positive", false, "They can be negative or zero."],
        ["Distinct", false, "They can repeat."],
      ], "Symmetric ⇒ real eigenvalues and orthogonally diagonalisable."),
    ]),
  ],

  "limits-calculus-and-optimization": [
    worked(
      "Worked example: a 0/0 limit",
      "Find lim (x → 0) (1 − cos x) / x².",
      [
        ["Check the form", "At x = 0 it's 0/0, so L'Hôpital's rule applies."],
        ["Differentiate once", "sin x / 2x, still 0/0."],
        ["Differentiate again", "cos x / 2 → 1/2."],
        ["Check with a series", "1 − cos x = x²/2 − x⁴/24 + …, so the ratio tends to 1/2."],
      ],
      "1/2",
      "Memorise sin x/x → 1, (1 − cos x)/x² → 1/2, and (1 + 1/n)ⁿ → e."
    ),
    practice([
      num("em-lm-1", "Find lim (x → 0) sin 3x / x.", 3, "sin 3x / x = 3 · (sin 3x / 3x) → 3·1 = 3.", "foundation"),
      mcq("em-lm-2", "What is lim (n → ∞) (1 + 2/n)ⁿ?", [
        ["e²", true, "(1 + a/n)ⁿ → eᵃ."],
        ["e", false, "That's for a = 1."],
        ["1", false, "1^∞ is an indeterminate form, not 1."],
      ], "Indeterminate 1^∞: write it as exp(n·ln(1 + a/n)) → eᵃ."),
      mcq("em-lm-3", "Is f(x) = |x| differentiable at x = 0?", [
        ["No: the left derivative is −1 and the right is +1", true, "It's continuous there, but has a corner."],
        ["Yes", false, "The one-sided derivatives differ."],
      ], "Differentiable ⇒ continuous, but not the other way round.", "foundation"),
    ]),
  ],

  "mean-value-theorems-and-taylor-series": [
    worked(
      "Worked example: Lagrange's mean value theorem",
      "For f(x) = x³ on [0, 2], find the c guaranteed by the mean value theorem.",
      [
        ["Average slope", "(f(2) − f(0)) / (2 − 0).", "(8 − 0) / 2", "4"],
        ["Set f'(c) equal to it", "f'(x) = 3x².", "3c² = 4"],
        ["Solve, inside (0, 2)", "c = 2/√3.", undefined, "c ≈ 1.155"],
      ],
      "c = 2/√3 ≈ 1.155",
      "Rolle's theorem is the special case f(a) = f(b), where the slope is 0."
    ),
    practice([
      num("em-mv-1", "For f(x) = x² − 4x on [0, 4], what value of c does Rolle's theorem give?", 2, "f(0) = f(4) = 0, and f'(c) = 2c − 4 = 0 gives c = 2.", "foundation"),
      mcq("em-mv-2", "What is the coefficient of x³ in the Maclaurin series of eˣ?", [
        ["1/6", true, "eˣ = Σ xⁿ/n!, and 1/3! = 1/6."],
        ["1/3", false, "Divide by 3!, not 3."],
        ["1", false, "That's the coefficient of x⁰ and x¹."],
      ], "sin x = x − x³/6 + …; cos x = 1 − x²/2 + …; eˣ = 1 + x + x²/2 + x³/6 + …"),
      mcq("em-mv-3", "The mean value theorem needs f to be:", [
        ["Continuous on [a, b] and differentiable on (a, b)", true, "Both conditions are required."],
        ["Differentiable at a and b only", false, "That's not enough."],
        ["A polynomial", false, "Any function meeting the conditions works."],
      ], "f(x) = |x| on [−1, 1] fails differentiability at 0, and indeed no c works."),
    ]),
  ],

  "single-and-multivariable-maxima-minima": [
    worked(
      "Worked example: a two-variable minimum",
      "Find the minimum of f(x, y) = x² + y² − 2x − 4y.",
      [
        ["Critical point", "fₓ = 2x − 2 = 0 and f_y = 2y − 4 = 0.", undefined, "(1, 2)"],
        ["Second derivatives", "r = fₓₓ = 2, s = fₓᵧ = 0, t = f_yy = 2."],
        ["Test", "rt − s² = 4 > 0 and r > 0, so it's a minimum."],
        ["Value", "f(1, 2) = 1 + 4 − 2 − 8.", "−5"],
      ],
      "Minimum −5 at (1, 2)",
      "rt − s² > 0: an extremum (minimum if r > 0, maximum if r < 0). rt − s² < 0: a saddle point."
    ),
    practice([
      mcq("em-mm-1", "For f(x) = x³ − 3x, which is right?", [
        ["Local maximum 2 at x = −1; local minimum −2 at x = 1", true, "f'(x) = 3x² − 3 = 0 gives x = ±1; f'' = 6x is negative at −1 and positive at 1."],
        ["Local minimum at x = −1", false, "f''(−1) = −6 < 0, so it's a maximum."],
        ["No extrema", false, "There are two."],
      ], "Use the second derivative test at each critical point.", "foundation"),
      num("em-mm-2", "What is the largest value of f(x) = −x² + 6x + 1?", 10, "The vertex is at x = 3: f(3) = −9 + 18 + 1 = 10.", "foundation"),
      mcq("em-mm-3", "f(x, y) = x² − y² has a critical point at (0, 0). It is:", [
        ["A saddle point", true, "rt − s² = (2)(−2) − 0 = −4 < 0."],
        ["A minimum", false, "f decreases along the y-axis."],
        ["A maximum", false, "f increases along the x-axis."],
      ], "Saddle: up in one direction, down in another."),
    ]),
  ],

  "definite-and-improper-integrals": [
    worked(
      "Worked example: integration by parts",
      "Evaluate ∫₀¹ x eˣ dx.",
      [
        ["Choose the parts", "u = x (so du = dx) and dv = eˣ dx (so v = eˣ)."],
        ["Apply ∫u dv = uv − ∫v du", "x eˣ − ∫eˣ dx = (x − 1)eˣ."],
        ["Evaluate", "[(x − 1)eˣ] from 0 to 1 = 0 − (−1).", "1"],
      ],
      "1",
      "LIATE (log, inverse trig, algebraic, trig, exponential) is a good guide for picking u."
    ),
    practice([
      num("em-in-1", "Evaluate ∫₀^π sin x dx.", 2, "[−cos x] from 0 to π = 1 + 1 = 2.", "foundation"),
      num("em-in-2", "Evaluate ∫₀^∞ x³ e^(−x) dx.", 6, "That's the gamma function Γ(4) = 3! = 6."),
      mcq("em-in-3", "Does ∫₁^∞ 1/x dx converge?", [
        ["No: it diverges", true, "The integral is ln x, which grows without bound."],
        ["Yes, to 1", false, "That's ∫₁^∞ 1/x² dx."],
      ], "∫₁^∞ 1/xᵖ dx converges exactly when p > 1.", "tricky"),
    ]),
  ],

  "bayes-theorem-and-distributions": [
    worked(
      "Worked example: a medical test and Bayes' theorem",
      "1% of people have a disease. A test catches 99% of cases, but also flags 5% of healthy people. Someone tests positive. What's the chance they have the disease?",
      [
        ["True positives", "P(D)·P(+ | D).", "0.01 · 0.99", "0.0099"],
        ["False positives", "P(not D)·P(+ | not D).", "0.99 · 0.05", "0.0495"],
        ["Bayes' theorem", "True positives over all positives.", "0.0099 / (0.0099 + 0.0495)", "≈ 0.167"],
      ],
      "About 16.7%",
      "When a disease is rare, false positives outnumber true ones. Always weigh the result by the base rate."
    ),
    practice([
      num("em-by-1", "Box A has 2 red and 3 blue balls; box B has 4 red and 1 blue. A box is picked at random, then a ball. What is P(red)? Give a decimal.", 0.6,
        "½·(2/5) + ½·(4/5) = 0.2 + 0.4 = 0.6.", "foundation", undefined, 0.001),
      num("em-by-2", "Same setup: the ball drawn is red. What is the probability it came from box B? Round to 3 decimal places.", 0.667,
        "P(B | red) = 0.4 / 0.6 = 2/3 ≈ 0.667.", "gate-level", undefined, 0.001),
      mcq("em-by-3", "Events A and B are independent when:", [
        ["P(A ∩ B) = P(A)·P(B)", true, "Equivalently, P(A | B) = P(A)."],
        ["A and B can't both happen", false, "That's mutually exclusive, which is the opposite of independent when both have positive probability."],
        ["P(A) = P(B)", false, "Equal probabilities say nothing about dependence."],
      ], "Mutually exclusive events with non-zero probability are always dependent.", "tricky"),
    ]),
  ],

  "expectation-variance-and-moments": [
    worked(
      "Worked example: expectation and variance of a die",
      "Find E[X] and Var(X) for one roll of a fair six-sided die.",
      [
        ["Mean", "(1 + 2 + … + 6)/6.", "21/6", "3.5"],
        ["E[X²]", "(1 + 4 + 9 + 16 + 25 + 36)/6.", "91/6"],
        ["Variance", "E[X²] − (E[X])².", "91/6 − 49/4", "35/12 ≈ 2.917"],
      ],
      "E[X] = 3.5, Var(X) = 35/12 ≈ 2.917",
      "Var(aX + b) = a²·Var(X): adding a constant never changes the spread."
    ),
    practice([
      num("em-ex-1", "Var(X) = 4. What is Var(3X + 5)?", 36, "Var(aX + b) = a²·Var(X) = 9·4 = 36.", "foundation"),
      num("em-ex-2", "X and Y are independent, with Var(X) = 2 and Var(Y) = 3. What is Var(X − Y)?", 5,
        "For independent variables, Var(X − Y) = Var(X) + Var(Y) = 5. Variances add even when you subtract.", "tricky"),
      num("em-ex-3", "E[X] = 2 and E[Y] = 5. What is E[3X + 2Y]?", 16, "Expectation is linear: 3·2 + 2·5 = 16, independent or not.", "foundation"),
    ]),
  ],

  "discrete-and-continuous-probability-distributions": [
    worked(
      "Worked example: binomial and Poisson",
      "(a) A fair coin is tossed 10 times: P(exactly 5 heads)? (b) Calls arrive as a Poisson process averaging 2 per minute: P(no calls in a minute)?",
      [
        ["Binomial formula", "P(X = k) = C(n, k) pᵏ (1 − p)^(n − k)."],
        ["(a)", "C(10, 5)/2¹⁰.", "252/1024", "≈ 0.246"],
        ["Poisson formula", "P(X = k) = e^(−λ) λᵏ / k!."],
        ["(b)", "k = 0, λ = 2.", "e^(−2)", "≈ 0.135"],
      ],
      "(a) ≈ 0.246   (b) ≈ 0.135",
      "Binomial mean np, variance np(1 − p). Poisson mean = variance = λ."
    ),
    practice([
      mcq("em-ds-1", "Which continuous distribution is memoryless?", [
        ["Exponential", true, "P(X > s + t | X > s) = P(X > t)."],
        ["Normal", false, "It isn't memoryless."],
        ["Uniform", false, "It isn't memoryless."],
      ], "Exponential (continuous) and geometric (discrete) are the only memoryless distributions.", "foundation"),
      num("em-ds-2", "What is the variance of the uniform distribution on [0, 1]? Give a decimal to 4 places.", 0.0833,
        "(b − a)²/12 = 1/12 ≈ 0.0833.", "gate-level", undefined, 0.0005),
      num("em-ds-3", "X ~ Binomial(n = 20, p = 0.3). What is E[X]?", 6, "np = 20·0.3 = 6.", "foundation"),
    ]),
  ],

  "descriptive-statistics-and-central-limit-theorem": [
    worked(
      "Worked example: the standard error of a mean",
      "A population has standard deviation σ = 10. You take a random sample of size 100. What is the standard deviation of the sample mean?",
      [
        ["Formula", "The standard error of the mean is σ/√n."],
        ["Plug in", "10/√100.", "10/10", "1"],
        ["What the CLT adds", "For large n, the sample mean is approximately normal, whatever the population's shape."],
      ],
      "1",
      "To halve the standard error, you need 4 times as many samples."
    ),
    practice([
      mcq("em-st-1", "What are the median and mode of 3, 1, 4, 1, 5?", [
        ["Median 3, mode 1", true, "Sorted: 1, 1, 3, 4, 5. The middle value is 3; the most frequent is 1."],
        ["Median 4, mode 1", false, "Sort the data before taking the middle value."],
        ["Median 3, mode 3", false, "1 appears twice."],
      ], "The mean is 14/5 = 2.8, pulled below the median by the two 1s.", "foundation"),
      num("em-st-2", "Same population (σ = 10). How big a sample gives a standard error of 0.5?", 400, "σ/√n = 0.5 gives √n = 20, so n = 400."),
      mcq("em-st-3", "In a right-skewed distribution, usually:", [
        ["Mean > median > mode", true, "The long right tail pulls the mean up."],
        ["Mean < median < mode", false, "That's left-skewed."],
        ["All three are equal", false, "That's symmetric."],
      ], "Incomes are the classic right-skewed example."),
    ]),
  ],
};
