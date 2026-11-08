import { mcq, num, practice, worked, type LessonExtras } from "./helpers";

export const PROB_STATS_EXTRAS: LessonExtras = {
  "combinatorics-probability-axioms-and-independence": [
    worked(
      "Worked example: at least one six",
      "A fair die is rolled 4 times. What is the probability of at least one six?",
      [
        ["Use the complement", "'At least one' is easiest as 1 − P(none)."],
        ["P(no six in one roll)", "5/6."],
        ["P(no six in 4 independent rolls)", "(5/6)⁴.", "625/1296", "≈ 0.482"],
        ["Answer", "1 − 0.482.", "≈ 0.518"],
      ],
      "≈ 0.518",
      "This is de Méré's problem: just over even odds, which made it a famous gambling bet."
    ),
    practice([
      num("ps-ax-1", "A and B are independent, with P(A) = 0.4 and P(B) = 0.5. What is P(A ∪ B)?", 0.7,
        "P(A) + P(B) − P(A)P(B) = 0.4 + 0.5 − 0.2 = 0.7.", "foundation", undefined, 0.001),
      mcq("ps-ax-2", "P(A) = 0.3, P(B) = 0.4 and A, B are mutually exclusive. Are they independent?", [
        ["No: P(A ∩ B) = 0 but P(A)P(B) = 0.12", true, "Exclusive events with non-zero probability are always dependent."],
        ["Yes", false, "Knowing A happened tells you B didn't."],
      ], "Exclusive means they can't happen together; independent means one doesn't affect the other's chance.", "tricky"),
      num("ps-ax-3", "Two cards are drawn without replacement from a standard deck. What is P(both are aces)? Round to 4 decimal places.", 0.0045,
        "(4/52)·(3/51) = 12/2652 ≈ 0.0045.", "gate-level", undefined, 0.0001),
    ]),
  ],

  "law-of-total-probability-and-bayes-theorem": [
    worked(
      "Worked example: which factory made the defective part?",
      "Factory 1 makes 60% of parts (2% defective); factory 2 makes 40% (3% defective). A part is defective. What's the chance it came from factory 2?",
      [
        ["Total probability of a defect", "Weight each factory's defect rate by its share.", "0.6·0.02 + 0.4·0.03", "0.024"],
        ["Bayes' theorem", "P(F₂ | D) = P(D | F₂)P(F₂) / P(D).", "0.012 / 0.024", "0.5"],
      ],
      "0.5",
      "Factory 2 makes fewer parts, but its higher defect rate makes it equally likely to blame."
    ),
    practice([
      num("ps-by-1", "Same factories. What is P(factory 1 | the part is not defective)? Round to 3 decimal places.", 0.602,
        "P(not D) = 0.976; P(not D and F₁) = 0.6·0.98 = 0.588; 0.588/0.976 ≈ 0.602.", "gate-level", undefined, 0.001),
      mcq("ps-by-2", "Bayes' theorem lets you compute:", [
        ["P(cause | evidence) from P(evidence | cause) and the prior", true, "It turns the conditional around."],
        ["The prior from the posterior alone", false, "You need the likelihood too."],
        ["Whether events are independent", false, "That's a separate check."],
      ], "Posterior ∝ likelihood × prior.", "foundation"),
      num("ps-by-3", "1% of emails are spam. A filter flags 95% of spam and 2% of genuine emails. What fraction of flagged emails are spam? Round to 3 decimal places.", 0.324,
        "0.01·0.95 = 0.0095; 0.99·0.02 = 0.0198; 0.0095/0.0293 ≈ 0.324.", "gate-level", undefined, 0.001),
    ]),
  ],

  "discrete-random-variables-pmf-binomial-poisson": [
    worked(
      "Worked example: a Poisson probability",
      "Defects occur at an average of 3 per batch, following a Poisson distribution. What is P(at most 1 defect)?",
      [
        ["Poisson PMF", "P(X = k) = e^(−λ)λᵏ/k!, with λ = 3."],
        ["k = 0 and k = 1", "e^(−3)·1 and e^(−3)·3."],
        ["Add them", "4e^(−3).", "≈ 0.199"],
      ],
      "≈ 0.199",
      "Poisson approximates Binomial(n, p) when n is large and p is small, with λ = np."
    ),
    practice([
      num("ps-dr-1", "X ~ Binomial(10, 0.4). What is Var(X)?", 2.4, "np(1 − p) = 10·0.4·0.6 = 2.4.", "foundation", undefined, 0.001),
      num("ps-dr-2", "A trial succeeds with probability 0.25. On average, how many trials until the first success (geometric distribution)?", 4, "E[X] = 1/p = 4.", "foundation"),
      mcq("ps-dr-3", "For a Poisson random variable:", [
        ["The mean equals the variance", true, "Both are λ."],
        ["The variance is the square of the mean", false, "That isn't true for Poisson."],
        ["The mean is always an integer", false, "λ can be any positive real number."],
      ], "Count data whose variance is much bigger than the mean is 'overdispersed' and not Poisson."),
    ]),
  ],

  "continuous-random-variables-pdf-uniform-exponential": [
    worked(
      "Worked example: normalise a PDF",
      "f(x) = kx on [0, 2], and 0 elsewhere. Find k, then P(X ≤ 1).",
      [
        ["Total area 1", "∫₀² kx dx = 2k = 1.", undefined, "k = 1/2"],
        ["P(X ≤ 1)", "∫₀¹ x/2 dx = 1/4.", "0.25"],
      ],
      "k = 1/2; P(X ≤ 1) = 0.25",
      "A PDF can be bigger than 1; only its total area has to be 1."
    ),
    practice([
      num("ps-cr-1", "Exponential with rate λ = 0.5. What is P(X > 2)? Round to 3 decimal places.", 0.368, "e^(−λx) = e^(−1) ≈ 0.368.", "gate-level", undefined, 0.001),
      num("ps-cr-2", "X ~ Uniform(2, 8). What is Var(X)?", 3, "(b − a)²/12 = 36/12 = 3.", "foundation"),
      mcq("ps-cr-3", "For a continuous random variable, P(X = 3) is:", [
        ["0", true, "Single points have no area under the PDF."],
        ["f(3)", false, "f(3) is a density, not a probability."],
        ["Possibly anything", false, "It's always 0."],
      ], "So P(X ≤ 3) = P(X < 3) for continuous variables.", "foundation"),
    ]),
  ],

  "normal-gaussian-distribution-and-standard-scores": [
    worked(
      "Worked example: standardise and look up",
      "X ~ N(50, 10²). Find P(X > 70).",
      [
        ["Standardise", "Z = (X − μ)/σ.", "(70 − 50)/10", "z = 2"],
        ["Look it up", "P(Z > 2) = 1 − Φ(2).", "1 − 0.9772", "≈ 0.0228"],
      ],
      "≈ 0.0228",
      "The 68-95-99.7 rule: about 95% of values lie within 2σ, so about 2.5% are above +2σ (more exactly, 2.28%)."
    ),
    practice([
      num("ps-nm-1", "X ~ N(50, 10²). What is the z-score of 65?", 1.5, "(65 − 50)/10 = 1.5.", "foundation", undefined, 0.001),
      mcq("ps-nm-2", "About what fraction of a normal distribution lies within one standard deviation of the mean?", [
        ["68%", true, "Within 2σ is about 95%, and within 3σ about 99.7%."],
        ["50%", false, "50% lies on each side of the mean."],
        ["95%", false, "That's within 2σ."],
      ], "Memorise 68-95-99.7.", "foundation"),
      mcq("ps-nm-3", "X ~ N(μ, σ²) and Y = 2X + 3. Y is distributed as:", [
        ["N(2μ + 3, 4σ²)", true, "Linear transformations keep normality; the variance scales by a²."],
        ["N(2μ + 3, 2σ²)", false, "Variance scales by a², not a."],
        ["N(2μ, 4σ² + 3)", false, "Adding a constant shifts the mean, not the variance."],
      ], "Sums of independent normals are normal too: means add and variances add."),
    ]),
  ],

  "joint-distributions-marginal-and-conditional-expectation": [
    worked(
      "Worked example: marginals and a conditional expectation",
      "X, Y ∈ {0, 1} with joint PMF p(0,0) = 0.1, p(0,1) = 0.3, p(1,0) = 0.2, p(1,1) = 0.4. Find P(X = 1), E[Y | X = 1], and check independence.",
      [
        ["Marginal of X", "P(X = 1) = 0.2 + 0.4.", "0.6"],
        ["Conditional", "P(Y = 1 | X = 1) = 0.4/0.6, and for a 0/1 variable that's also E[Y | X = 1].", "≈ 0.667"],
        ["Independence check", "P(X = 1)P(Y = 1) = 0.6·0.7 = 0.42, but p(1,1) = 0.4."],
      ],
      "P(X = 1) = 0.6; E[Y | X = 1] ≈ 0.667; X and Y are dependent",
      "Independence must hold for every cell: p(x, y) = p(x)·p(y)."
    ),
    practice([
      num("ps-jd-1", "Same joint PMF. What is E[Y]?", 0.7, "P(Y = 1) = 0.3 + 0.4 = 0.7.", "foundation", undefined, 0.001),
      num("ps-jd-2", "Same joint PMF. What is E[XY]?", 0.4, "XY is 1 only when X = Y = 1, so E[XY] = 0.4.", "gate-level", undefined, 0.001),
      mcq("ps-jd-3", "The law of total expectation says E[Y] equals:", [
        ["E[E[Y | X]]", true, "Average the conditional means, weighted by X's distribution."],
        ["E[Y | X] for any X", false, "That's a random variable, not a number."],
        ["E[X]·E[Y]", false, "That's E[XY] under independence."],
      ], "Here: 0.4·E[Y | X = 0] + 0.6·E[Y | X = 1] = 0.4·0.75 + 0.6·0.667 = 0.7. ✓"),
    ]),
  ],

  "covariance-correlation-and-bivariate-normals": [
    worked(
      "Worked example: correlation and the variance of a sum",
      "Var(X) = 4, Var(Y) = 9 and Cov(X, Y) = 3. Find the correlation, and Var(X + Y).",
      [
        ["Correlation", "ρ = Cov/(σₓσᵧ).", "3/(2·3)", "0.5"],
        ["Variance of the sum", "Var(X) + Var(Y) + 2Cov(X, Y).", "4 + 9 + 6", "19"],
      ],
      "ρ = 0.5; Var(X + Y) = 19",
      "Correlation is unit-free and lies in [−1, 1]; covariance depends on the units."
    ),
    practice([
      num("ps-cv-1", "Same numbers. What is Var(X − Y)?", 7, "4 + 9 − 2·3 = 7.", "gate-level"),
      mcq("ps-cv-2", "Zero correlation between X and Y means:", [
        ["No linear relationship; they may still be dependent", true, "For example, X uniform on [−1, 1] and Y = X² are uncorrelated but dependent."],
        ["X and Y are independent", false, "That's only guaranteed for jointly normal variables."],
        ["Y is constant", false, "No."],
      ], "Independent ⇒ uncorrelated, but not the other way, except for bivariate normals.", "tricky"),
      num("ps-cv-3", "Cov(X, Y) = 2. What is Cov(3X, −2Y)?", -12, "Cov(aX, bY) = ab·Cov(X, Y) = (3)(−2)(2) = −12."),
    ]),
  ],

  "chebyshev-inequality-lln-and-central-limit-theorem": [
    worked(
      "Worked example: the CLT for a sum",
      "Add 100 independent variables, each with mean 1 and variance 1. Estimate P(sum > 110).",
      [
        ["Mean and variance of the sum", "Means add, and so do independent variances.", "E = 100, Var = 100", "σ = 10"],
        ["Apply the CLT", "The sum is approximately N(100, 10²)."],
        ["Standardise", "z = (110 − 100)/10 = 1.", "P(Z > 1)", "≈ 0.159"],
      ],
      "≈ 0.159",
      "The CLT works whatever the shape of each variable, as long as the variance is finite."
    ),
    practice([
      num("ps-cl-1", "By Chebyshev's inequality, P(|X − μ| ≥ 3σ) is at most what? Round to 3 decimal places.", 0.111,
        "≤ 1/k² = 1/9 ≈ 0.111. For a normal distribution the true value is about 0.0027, so Chebyshev is loose but always valid.", "gate-level", undefined, 0.001),
      mcq("ps-cl-2", "The law of large numbers says the sample mean:", [
        ["Converges to the population mean as n grows", true, "That's for independent samples with a finite mean."],
        ["Becomes normally distributed", false, "That's the CLT."],
        ["Equals the population mean for n ≥ 30", false, "There's no fixed n where it's exact."],
      ], "LLN: where the mean goes. CLT: how it's spread around that value.", "foundation"),
      mcq("ps-cl-3", "Does Chebyshev's inequality need the distribution to be normal?", [
        ["No: it holds for any distribution with a finite variance", true, "That's why it's loose."],
        ["Yes", false, "It's distribution-free."],
      ], "P(|X − μ| ≥ kσ) ≤ 1/k² for every such distribution.", "foundation"),
    ]),
  ],

  "sampling-distributions-chisquare-t-and-f": [
    worked(
      "Worked example: the distribution of the sample variance",
      "A sample of n = 10 comes from N(μ, σ²). What distribution does (n − 1)S²/σ² follow, and what are its mean and variance?",
      [
        ["Standard result", "(n − 1)S²/σ² ~ χ² with n − 1 degrees of freedom."],
        ["Degrees of freedom", "n − 1 = 9: one is used up estimating the mean."],
        ["Moments of χ²ₖ", "Mean k, variance 2k.", undefined, "Mean 9, variance 18"],
      ],
      "χ² with 9 degrees of freedom: mean 9, variance 18",
      "t = (X̄ − μ)/(S/√n) has n − 1 degrees of freedom. F is a ratio of two independent χ² variables, each divided by its degrees of freedom."
    ),
    practice([
      mcq("ps-sd-1", "When do you use a t-test instead of a z-test for a mean?", [
        ["When σ is unknown and estimated by S, especially for small n", true, "Estimating σ adds uncertainty, which gives the t-distribution heavier tails."],
        ["When the data isn't numerical", false, "Neither test applies then."],
        ["When n is very large", false, "Then t and z are almost the same."],
      ], "As degrees of freedom grow, tₙ approaches N(0, 1).", "foundation"),
      num("ps-sd-2", "What is the mean of a chi-square distribution with 15 degrees of freedom?", 15, "The mean of χ²ₖ is k.", "foundation"),
      mcq("ps-sd-3", "If T ~ tₙ, then T² follows:", [
        ["F(1, n)", true, "A squared standard normal over χ²ₙ/n is F(1, n)."],
        ["χ²ₙ", false, "That ignores the denominator."],
        ["N(0, 1)", false, "Squares aren't normal."],
      ], "Useful links: Z² ~ χ²₁; t² ~ F(1, n).", "tricky"),
    ]),
  ],

  "point-estimation-mle-and-method-of-moments": [
    worked(
      "Worked example: maximum likelihood for a Bernoulli",
      "The observations 1, 0, 1, 1, 0 come from a Bernoulli(p). Find the MLE of p.",
      [
        ["Likelihood", "L(p) = p³(1 − p)²: three successes and two failures."],
        ["Log-likelihood", "ℓ(p) = 3 ln p + 2 ln(1 − p)."],
        ["Set the derivative to zero", "3/p − 2/(1 − p) = 0 gives 3 − 3p = 2p.", undefined, "p = 3/5"],
      ],
      "p̂ = 0.6",
      "For a Bernoulli, the MLE is the sample proportion; for an exponential, λ̂ = 1/x̄."
    ),
    practice([
      mcq("ps-ml-1", "Data comes from Uniform(0, θ). What is the method-of-moments estimate of θ?", [
        ["2x̄", true, "E[X] = θ/2, so set x̄ = θ/2."],
        ["The sample maximum", false, "That's the MLE."],
        ["x̄", false, "That underestimates θ by half."],
      ], "Method of moments: set the sample moments equal to the theoretical ones and solve.", "tricky"),
      mcq("ps-ml-2", "Why does the unbiased sample variance divide by n − 1?", [
        ["Using x̄ instead of μ makes the deviations slightly too small, so dividing by n would be biased low", true, "Bessel's correction fixes it."],
        ["To make it bigger in general", false, "It's specifically to remove bias."],
        ["It's a convention with no reason", false, "It exactly cancels the bias."],
      ], "The MLE of σ² for a normal divides by n, so it's biased; S² divides by n − 1."),
      num("ps-ml-3", "Exponential data with sample mean 4. What is the MLE of the rate λ?", 0.25, "λ̂ = 1/x̄ = 0.25.", "foundation", undefined, 0.001),
    ]),
  ],

  "confidence-intervals-z-t-and-chisquare-tests": [
    worked(
      "Worked example: a 95% confidence interval with known σ",
      "n = 36, x̄ = 50 and σ = 6 is known. Build a 95% confidence interval for μ.",
      [
        ["Standard error", "σ/√n.", "6/6", "1"],
        ["Critical value", "For 95%, z = 1.96."],
        ["Interval", "x̄ ± 1.96·SE.", "50 ± 1.96", "(48.04, 51.96)"],
      ],
      "(48.04, 51.96)",
      "95% describes the method: across many samples, 95% of intervals built this way contain μ."
    ),
    practice([
      num("ps-ci-1", "A chi-square goodness-of-fit test has 6 categories, and no parameters are estimated from the data. How many degrees of freedom?", 5,
        "k − 1 = 5. Subtract one more for each parameter estimated from the data."),
      mcq("ps-ci-2", "Going from a 95% to a 99% confidence interval (same data):", [
        ["The interval gets wider", true, "More confidence needs a wider net: z goes from 1.96 to 2.576."],
        ["The interval gets narrower", false, "That's backwards."],
        ["It doesn't change", false, "The critical value changes."],
      ], "To get narrower intervals at the same confidence, increase n.", "foundation"),
      mcq("ps-ci-3", "A p-value of 0.03 means:", [
        ["If H₀ were true, data at least this extreme would occur 3% of the time", true, "It's computed assuming H₀."],
        ["H₀ has a 3% chance of being true", false, "That's a common misreading."],
        ["The effect is large", false, "A p-value says nothing about effect size."],
      ], "At α = 0.05 you'd reject H₀, but that's a decision rule, not the probability that H₀ is true.", "tricky"),
    ]),
  ],
};
