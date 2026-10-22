import type { LessonMeta } from "./types";

export const ML_CROSS_VALIDATION_LESSON: LessonMeta = {
  id: "cross-validation-holdout-kfold-and-loocv",
  title: "Cross-Validation: Hold-Out, k-Fold and Leave-One-Out",
  slug: "cross-validation-holdout-kfold-and-loocv",
  order: 2,
  estimatedMinutes: 26,
  tagline: "How to estimate test error honestly when you only have one dataset, and how leakage quietly ruins it.",
  hasInteractive: false,
  hasGATE: true,
  hasPractice: true,
  syllabusScope: "GATE 2027 DA core: cross-validation methods such as leave-one-out (LOO) and k-fold cross-validation",
  cheatsheet: {
    summaryRule:
      "Cross-validation estimates how a model will do on unseen data by repeatedly training on part of the data and testing on the part it did not see, then averaging the test errors.",
    keyFormulasAndRules: [
      "Hold-out: one train/validation split. Cheap, but the estimate depends on which points land in the validation set.",
      "k-fold: split into k folds; for i = 1..k train on the other k − 1 and test on fold i. CV_(k) = (1/k) Σ MSE_i.",
      "k-fold needs k model fits; every point is tested exactly once.",
      "LOOCV is k-fold with k = n: n fits, each trained on n − 1 points.",
      "Least-squares shortcut: CV_(n) = (1/n) Σ ((yᵢ − ŷᵢ) / (1 − hᵢ))², where hᵢ is the i-th diagonal of the hat matrix.",
      "LOOCV has lower bias but higher variance than 5- or 10-fold CV.",
    ],
    examPitfalls: [
      "Fit scaling, imputation and feature selection inside each training fold only, never on the full data first.",
      "After choosing a model with CV, refit it on all the data.",
      "For imbalanced classes use stratified folds; for time series, never shuffle future data into training.",
    ],
  },
  sections: [
    {
      type: "explanation",
      heading: "1. Why training error lies",
      body: [
        "**Prerequisites:** bias-variance trade-off and evaluation metrics from [model evaluation, ROC-AUC and bias-variance](/notes/machine-learning/model-evaluation-roc-auc-and-bias-variance).",
        "A model is fitted to make its training error small, so training error is an ==yellow:optimistic== estimate of how it will do on new data. A flexible enough model can drive training error to zero and still predict badly.",
        "We want the test error, but we usually have one dataset and no separate test set. Cross-validation simulates a test set by ==green:holding some data out of training, measuring error on it, and repeating==.",
      ],
    },
    {
      type: "comparison",
      heading: "2. Three ways to hold data out",
      columns: ["Hold-out", "k-fold (k = 5 or 10)", "Leave-one-out (LOOCV)"],
      criteria: [
        { criterion: "Model fits", values: ["1", "k", "n"] },
        { criterion: "Training set size", values: ["Often 50–80% of n", "n(k − 1)/k", "n − 1"] },
        { criterion: "Bias of the error estimate", values: ["Highest: trains on the least data", "Moderate", "Lowest: trains on almost all data"] },
        { criterion: "Variance of the estimate", values: ["High: depends on one random split", "Moderate", "Higher than k-fold: the n fits are almost identical, so their errors are highly correlated"] },
        { criterion: "Randomness", values: ["Changes with the split", "Changes with the fold assignment", "None: there is only one way to leave one out"] },
      ],
      summaryTakeaway: "5- or 10-fold CV is the usual default: close to LOOCV's low bias, with lower variance and far fewer fits.",
    },
    {
      type: "worked-example",
      heading: "3. Worked example: 5-fold CV by hand",
      problemStatement:
        "A dataset has n = 100 points. You run 5-fold cross-validation on a regression model, and the five held-out folds give mean squared errors 4.0, 5.0, 3.0, 4.5 and 3.5. How many points does each fit train on, and what is the CV estimate?",
      steps: [
        { stepNumber: 1, title: "Fold size", description: "Five equal folds of 100 points.", intermediateResult: "20 points per fold" },
        { stepNumber: 2, title: "Training size", description: "Each fit trains on the other four folds.", intermediateResult: "80 points per fit, 5 fits in total" },
        { stepNumber: 3, title: "Average the fold errors", description: "Equal fold sizes, so a simple mean works.", formula: "CV₍₅₎ = (4.0 + 5.0 + 3.0 + 4.5 + 3.5) / 5", intermediateResult: "CV₍₅₎ = 4.0" },
      ],
      finalAnswer: "Each fit trains on 80 points, and the 5-fold CV estimate of test MSE is 4.0.",
      examTakeaway: "LOOCV on the same data would need 100 fits, each on 99 points.",
    },
    {
      type: "explanation",
      heading: "4. The LOOCV shortcut for least squares",
      body: [
        "For linear regression fitted by least squares, you do not need n separate fits. With ŷᵢ the fitted value from the full model and hᵢ the leverage (the i-th diagonal entry of the hat matrix H = X(XᵀX)⁻¹Xᵀ):",
        "==purple:CV₍ₙ₎ = (1/n) Σ ((yᵢ − ŷᵢ) / (1 − hᵢ))²==",
        "Each ordinary residual is inflated by 1/(1 − hᵢ). High-leverage points pull the fit towards themselves, so their full-data residual understates how wrong the model would be without them. The hat matrix is symmetric and idempotent, which is covered in [partitioned and idempotent matrices](/notes/linear-algebra/partitioned-and-idempotent-matrices).",
      ],
      callout: {
        kind: "exam-tip",
        title: "Quick check",
        message:
          "A point with residual 2 and leverage 0.5 has a leave-one-out residual of 2 / (1 − 0.5) = 4. The shortcut is exact for least-squares linear regression, not for models like k-NN or neural networks.",
      },
    },
    {
      type: "explanation",
      heading: "5. Using CV well: model selection and leakage",
      body: [
        "CV is mostly used to ==yellow:choose between models or settings==: k in k-NN, λ in ridge regression, tree depth. Compute the CV error for each candidate, pick the lowest, then refit that choice on all the data.",
        "**Leakage** is the classic trap. If you standardise features, fill missing values or select features using the whole dataset before splitting, information from the validation fold has already shaped the training. The CV error then looks better than reality. ==green:Every data-dependent step must be fitted inside each training fold==, then applied to that fold's validation part.",
        "For classification with rare classes, use ==purple:stratified k-fold== so every fold has a similar class balance. For time-ordered data, train on the past and validate on the future instead of shuffling.",
      ],
    },
    {
      type: "practice",
      heading: "Practice",
      questions: [
        {
          id: "ml-cv-1",
          prompt: "How many times is the model trained in 10-fold cross-validation on 500 data points?",
          type: "numerical",
          correctAnswer: 10,
          tolerance: 0,
          explanation: "k-fold trains once per fold, regardless of n.",
          difficulty: "foundation",
        },
        {
          id: "ml-cv-2",
          prompt: "With n = 200 and 5-fold CV, how many points is each model trained on?",
          type: "numerical",
          correctAnswer: 160,
          tolerance: 0,
          explanation: "Each fold has 40 points; training uses the other 4 folds, so 4 × 40 = 160.",
          difficulty: "foundation",
        },
        {
          id: "ml-cv-3",
          prompt: "Compared with 10-fold CV, the LOOCV estimate of test error typically has:",
          type: "single-choice",
          options: [
            { id: "a", text: "Lower bias and higher variance", isCorrect: true, explanation: "It trains on n − 1 points (less bias), but its n training sets overlap almost completely, so the errors are highly correlated (more variance)." },
            { id: "b", text: "Higher bias and lower variance", isCorrect: false, explanation: "That describes 10-fold relative to LOOCV, the other way round." },
            { id: "c", text: "Lower bias and lower variance", isCorrect: false, explanation: "There is a trade-off; LOOCV does not win on both." },
          ],
          explanation: "Fewer folds: more bias, less variance.",
          difficulty: "gate-level",
        },
        {
          id: "ml-cv-4",
          prompt: "You standardise all features using the mean and standard deviation of the full dataset, then run 5-fold CV. What is wrong?",
          type: "single-choice",
          options: [
            { id: "a", text: "Validation data influenced the preprocessing, so the CV error is optimistic", isCorrect: true, explanation: "Fit the scaler on each training fold only." },
            { id: "b", text: "Nothing: standardisation does not use the labels", isCorrect: false, explanation: "Leakage can come from features too, not only labels." },
          ],
          explanation: "Any step that learns from data belongs inside the fold.",
          difficulty: "tricky",
        },
      ],
    },
    {
      type: "quick-revision",
      heading: "One-minute revision",
      oneMinutePanicCard: {
        coreRule: "Train on part, test on the rest, repeat, average. k-fold = k fits; LOOCV = n fits.",
        mustRememberFormulas: [
          "CV₍ₖ₎ = (1/k) Σ MSEᵢ",
          "Train size in k-fold = n(k − 1)/k",
          "LOOCV (least squares) = (1/n) Σ ((yᵢ − ŷᵢ)/(1 − hᵢ))²",
        ],
        criticalPitfalls: ["LOOCV: low bias, high variance", "No preprocessing on the full data before splitting", "Refit the chosen model on all data", "Stratify classes; don't shuffle time series"],
      },
    },
    {
      type: "resources",
      heading: "References",
      sources: [
        { title: "GATE 2027 DA syllabus", authorOrInstitution: "IIT Madras", url: "https://gate2027.iitm.ac.in/static/doc/GATE2027_Syllabus/DA_GATE2027_Syllabus.pdf", type: "gate-official", topic: "Machine Learning: cross-validation methods such as LOO and k-fold." },
        { title: "An Introduction to Statistical Learning", authors: "Gareth James, Daniela Witten, Trevor Hastie, Robert Tibshirani", url: "https://www.statlearning.com/", type: "primary-standard", topic: "Chapter 5 (Resampling Methods): validation set, LOOCV and its least-squares shortcut, k-fold, bias-variance of CV." },
        { title: "The Elements of Statistical Learning", authors: "Trevor Hastie, Robert Tibshirani, Jerome Friedman", publisher: "Springer", type: "primary-standard", topic: "Section 7.10: cross-validation, including the wrong and right way to do it with feature selection." },
      ],
    },
  ],
};
