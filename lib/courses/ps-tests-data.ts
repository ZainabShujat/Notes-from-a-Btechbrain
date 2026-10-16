import type { LessonMeta } from "./types";

export const PS_T_AND_CHISQUARE_TESTS_LESSON: LessonMeta = {
  id: "t-tests-and-chi-squared-tests",
  title: "t-Tests and Chi-Squared Tests: Which One, and Why",
  slug: "t-tests-and-chi-squared-tests",
  order: 2,
  estimatedMinutes: 30,
  tagline: "Pick the right test in ten seconds, get the degrees of freedom right, and stop losing marks on assumptions.",
  hasInteractive: false,
  hasGATE: true,
  hasPractice: true,
  syllabusScope: "GATE 2027 DA core: z-test, t-test, chi-squared test, t and chi-squared distributions",
  cheatsheet: {
    summaryRule:
      "Use z when the population standard deviation is known (or n is large), t when it is estimated from a small sample, and chi-squared for counts in categories (goodness of fit or independence).",
    keyFormulasAndRules: [
      "One-sample t: t = (x̄ − μ₀) / (s / √n), df = n − 1.",
      "Paired t: run a one-sample t on the differences d, df = n − 1 (n = number of pairs).",
      "Two-sample pooled t: t = (x̄₁ − x̄₂) / (s_p √(1/n₁ + 1/n₂)), s_p² = ((n₁−1)s₁² + (n₂−1)s₂²)/(n₁+n₂−2), df = n₁ + n₂ − 2.",
      "Chi-squared statistic: χ² = Σ (O − E)² / E.",
      "Goodness of fit: df = k − 1 − (number of parameters estimated from the data).",
      "Independence in an r × c table: E = (row total × column total) / N, df = (r − 1)(c − 1).",
    ],
    examPitfalls: [
      "Paired data (same students before and after) is not two independent samples.",
      "Chi-squared works on counts, never on percentages or means.",
      "Each expected count should be at least about 5 for the chi-squared approximation to hold.",
      "Failing to reject H₀ is not proof that H₀ is true.",
    ],
  },
  sections: [
    {
      type: "explanation",
      heading: "1. Which test? Decide before you calculate",
      body: [
        "**Prerequisites:** the testing framework (H₀, H₁, α, p-value, rejection region) from [confidence intervals and the z, t and chi-square tests](/notes/probability-and-statistics/confidence-intervals-z-t-and-chisquare-tests), and the t and chi-squared distributions from [sampling distributions](/notes/probability-and-statistics/sampling-distributions-chisquare-t-and-f).",
        "Most mistakes happen before any arithmetic, when the wrong test gets picked. Ask two questions. ==yellow:Is the data numeric measurements or counts in categories?== Counts point to chi-squared. ==yellow:For measurements, do you know the population standard deviation σ?== If yes (or n is large), use z. If you estimate it with the sample standard deviation s, use t.",
        "The t distribution looks like the normal distribution but has heavier tails, because s itself varies from sample to sample. As df grows, t approaches the standard normal, which is why large samples can use z.",
      ],
    },
    {
      type: "comparison",
      heading: "2. The decision table",
      columns: ["Situation", "Test and statistic", "Degrees of freedom"],
      criteria: [
        { criterion: "One mean, σ known", values: ["Mean of a measurement vs a claimed μ₀", "z = (x̄ − μ₀)/(σ/√n)", "none (standard normal)"] },
        { criterion: "One mean, σ unknown", values: ["Small sample, roughly normal population", "t = (x̄ − μ₀)/(s/√n)", "n − 1"] },
        { criterion: "Before vs after on the same units", values: ["Paired measurements", "one-sample t on differences d", "n − 1 (pairs)"] },
        { criterion: "Two independent groups", values: ["Equal variances assumed", "pooled two-sample t", "n₁ + n₂ − 2"] },
        { criterion: "Counts vs expected proportions", values: ["One categorical variable, k categories", "χ² goodness of fit", "k − 1 − (parameters estimated)"] },
        { criterion: "Are two categories related?", values: ["Contingency table, r rows × c columns", "χ² test of independence", "(r − 1)(c − 1)"] },
      ],
      summaryTakeaway: "Measurements and known σ: z. Measurements and estimated σ: t. Counts: χ².",
    },
    {
      type: "worked-example",
      heading: "3. Worked example: one-sample t-test",
      problemStatement:
        "A canteen claims its thali weighs 50 g of dal on average. You weigh 9 servings and get a mean of 52 g with sample standard deviation 3 g. At α = 0.05 (two-sided), is the claim contradicted?",
      givenData: [
        { label: "n", value: "9" },
        { label: "x̄", value: "52 g" },
        { label: "s", value: "3 g" },
        { label: "μ₀", value: "50 g" },
      ],
      steps: [
        { stepNumber: 1, title: "Pick the test", description: "σ is unknown and n is small, so use a one-sample t-test.", intermediateResult: "H₀: μ = 50, H₁: μ ≠ 50" },
        { stepNumber: 2, title: "Statistic", description: "Standard error s/√n = 3/3 = 1.", formula: "t = (52 − 50) / 1", intermediateResult: "t = 2.0" },
        { stepNumber: 3, title: "Critical value", description: "df = n − 1 = 8. For a two-sided test at α = 0.05, use t(0.975, 8).", intermediateResult: "t_crit = 2.306" },
        { stepNumber: 4, title: "Decide", description: "|2.0| < 2.306, so the statistic is not in the rejection region.", intermediateResult: "Fail to reject H₀" },
      ],
      finalAnswer: "t = 2.0 with 8 df is below 2.306, so at the 5% level the data does not contradict the 50 g claim.",
      examTakeaway: "Had σ = 3 been known, z = 2.0 > 1.96 would reject. The heavier t tail is exactly why the conclusion flips.",
    },
    {
      type: "worked-example",
      heading: "4. Worked example: chi-squared goodness of fit",
      problemStatement: "A die is rolled 60 times with counts 8, 12, 9, 11, 6, 14 for faces 1 to 6. At α = 0.05, is the die fair?",
      steps: [
        { stepNumber: 1, title: "Expected counts", description: "A fair die gives 60/6 = 10 for every face.", intermediateResult: "E = 10 for all six faces" },
        { stepNumber: 2, title: "Statistic", description: "Squared deviations are 4, 4, 1, 1, 16, 16.", formula: "χ² = (4 + 4 + 1 + 1 + 16 + 16) / 10", intermediateResult: "χ² = 4.2" },
        { stepNumber: 3, title: "Degrees of freedom", description: "k = 6 categories and no parameters estimated from the data.", intermediateResult: "df = 5" },
        { stepNumber: 4, title: "Decide", description: "The critical value χ²(0.05, 5) is 11.070. 4.2 < 11.070.", intermediateResult: "Fail to reject H₀" },
      ],
      finalAnswer: "χ² = 4.2 with 5 df is well below 11.070, so there is no evidence the die is unfair.",
      examTakeaway: "Subtract one extra degree of freedom for every parameter you estimate from the same data (for example, a Poisson mean).",
    },
    {
      type: "worked-example",
      heading: "5. Worked example: chi-squared test of independence",
      problemStatement:
        "80 students: of 40 who made their own notes, 30 passed and 10 failed; of 40 who did not, 20 passed and 20 failed. At α = 0.05, is passing independent of making notes?",
      steps: [
        { stepNumber: 1, title: "Totals", description: "Passed 50, failed 30, N = 80; each row has 40.", intermediateResult: "Row totals 40, 40; column totals 50, 30" },
        { stepNumber: 2, title: "Expected counts", description: "E = row total × column total / N.", formula: "40·50/80 = 25, 40·30/80 = 15", intermediateResult: "E = [[25, 15], [25, 15]]" },
        { stepNumber: 3, title: "Statistic", description: "Every cell is 5 away from its expected count.", formula: "χ² = 25/25 + 25/15 + 25/25 + 25/15", intermediateResult: "χ² ≈ 5.33" },
        { stepNumber: 4, title: "Decide", description: "df = (2 − 1)(2 − 1) = 1, and χ²(0.05, 1) = 3.841. 5.33 > 3.841.", intermediateResult: "Reject H₀" },
      ],
      finalAnswer: "χ² ≈ 5.33 with 1 df exceeds 3.841, so passing and note-making are associated at the 5% level.",
      examTakeaway: "Association is not causation: this test cannot say that making notes caused the passing.",
      notes: ["Some textbooks apply Yates' continuity correction to 2 × 2 tables. Follow whichever convention the question uses; this example uses the uncorrected statistic."],
    },
    {
      type: "misconceptions",
      heading: "6. Common mix-ups",
      items: [
        { commonMyth: "Before-and-after scores are two samples, so use a two-sample t-test.", reality: "They are paired. Test the differences with a one-sample t.", explanation: "Pairing removes the variation between individuals, so the two-sample test wastes power and uses the wrong df." },
        { commonMyth: "You can run a chi-squared test on percentages.", reality: "Chi-squared needs raw counts.", explanation: "The statistic depends on sample size. 30% of 10 and 30% of 1000 carry very different evidence." },
        { commonMyth: "Not rejecting H₀ means H₀ is true.", reality: "It means the data did not provide enough evidence against it.", explanation: "Small samples often fail to reject even when an effect exists." },
      ],
    },
    {
      type: "practice",
      heading: "Practice",
      questions: [
        {
          id: "ps-tests-1",
          prompt: "A 3 × 4 contingency table is tested for independence. How many degrees of freedom does the chi-squared statistic have?",
          type: "numerical",
          correctAnswer: 6,
          tolerance: 0,
          explanation: "(r − 1)(c − 1) = 2 · 3 = 6.",
          difficulty: "foundation",
        },
        {
          id: "ps-tests-2",
          prompt: "12 students take a test before and after a revision session. Which test compares the means correctly?",
          type: "single-choice",
          options: [
            { id: "a", text: "Paired t-test with 11 df", isCorrect: true, explanation: "Same students twice: test the 12 differences, df = 12 − 1." },
            { id: "b", text: "Pooled two-sample t-test with 22 df", isCorrect: false, explanation: "The two sets of scores are not independent." },
            { id: "c", text: "Chi-squared test of independence", isCorrect: false, explanation: "The data are measurements, not category counts." },
          ],
          explanation: "Same units measured twice means paired.",
          difficulty: "gate-level",
        },
        {
          id: "ps-tests-3",
          prompt: "Counts in 5 categories are tested against a Poisson model whose mean was estimated from the same data. What is the df?",
          type: "numerical",
          correctAnswer: 3,
          tolerance: 0,
          explanation: "k − 1 − 1 = 5 − 1 − 1 = 3, losing one more df for the estimated mean.",
          difficulty: "tricky",
        },
        {
          id: "ps-tests-4",
          prompt: "Why does a t-test need a larger statistic than a z-test to reject at the same α with a small sample?",
          type: "single-choice",
          options: [
            { id: "a", text: "Estimating σ with s adds uncertainty, so the t distribution has heavier tails", isCorrect: true, explanation: "Heavier tails push the critical value further out." },
            { id: "b", text: "The t-test uses a smaller α", isCorrect: false, explanation: "α is whatever you choose; it is the same for both." },
          ],
          explanation: "As df grows, t approaches the standard normal and the gap closes.",
          difficulty: "foundation",
        },
      ],
    },
    {
      type: "quick-revision",
      heading: "One-minute revision",
      oneMinutePanicCard: {
        coreRule: "Counts → χ². Measurements with known σ → z. Measurements with estimated σ → t.",
        mustRememberFormulas: [
          "t = (x̄ − μ₀)/(s/√n), df = n − 1",
          "Pooled t: df = n₁ + n₂ − 2",
          "χ² = Σ(O − E)²/E",
          "Independence: df = (r−1)(c−1); fit: df = k − 1 − estimated params",
        ],
        criticalPitfalls: ["Paired ≠ two-sample", "Counts, not percentages", "Expected counts ≥ ~5", "Fail to reject ≠ accept"],
      },
    },
    {
      type: "resources",
      heading: "References",
      sources: [
        { title: "GATE 2027 DA syllabus", authorOrInstitution: "IIT Madras", url: "https://gate2027.iitm.ac.in/static/doc/GATE2027_Syllabus/DA_GATE2027_Syllabus.pdf", type: "gate-official", topic: "Probability and Statistics: t-distribution, chi-squared distribution, z-test, t-test, chi-squared test." },
        { title: "NIST/SEMATECH e-Handbook of Statistical Methods", authorOrInstitution: "NIST", url: "https://www.itl.nist.gov/div898/handbook/", type: "primary-standard", topic: "t-tests, chi-square goodness of fit, contingency tables, critical value tables." },
        { title: "Applied Statistics and Probability for Engineers", authors: "Douglas C. Montgomery, George C. Runger", publisher: "Wiley", type: "primary-standard", topic: "Hypothesis tests on means, paired comparisons, goodness of fit and contingency tables." },
      ],
    },
  ],
};
