import { mcq, num, practice, worked, type LessonExtras } from "./helpers";

export const ML_EXTRAS: LessonExtras = {
  "ols-linear-regression-normal-equations": [
    worked(
      "Worked example: fit a line by least squares",
      "Fit y = β₀ + β₁x to the points (1, 2), (2, 3), (3, 5), then predict y at x = 4.",
      [
        ["Means", "x̄ = 2, ȳ = 10/3."],
        ["Slope", "β₁ = Σ(x − x̄)(y − ȳ) / Σ(x − x̄)².", "3 / 2", "1.5"],
        ["Intercept", "β₀ = ȳ − β₁x̄.", "10/3 − 3", "1/3"],
        ["Predict", "1/3 + 1.5·4.", "≈ 6.33"],
      ],
      "y = 1/3 + 1.5x; prediction at 4 ≈ 6.33",
      "In matrix form: β = (XᵀX)⁻¹Xᵀy, the normal equations."
    ),
    practice([
      mcq("ml-ols-1", "OLS minimises:", [
        ["The sum of squared vertical residuals", true, "Σ(yᵢ − ŷᵢ)²."],
        ["The sum of absolute residuals", false, "That's least absolute deviations."],
        ["Perpendicular distances to the line", false, "That's total least squares (like PCA)."],
      ], "Squared loss makes OLS sensitive to outliers.", "foundation"),
      mcq("ml-ols-2", "When does XᵀX fail to be invertible?", [
        ["When features are perfectly collinear, or there are more features than samples", true, "Then the columns of X are dependent."],
        ["When y has noise", false, "Noise doesn't affect invertibility."],
        ["Never", false, "It often fails in high dimensions."],
      ], "Ridge regression adds λI, which makes XᵀX + λI invertible."),
      num("ml-ols-3", "A regression's residual sum of squares is 20% of the total sum of squares (SSres/SStot = 0.2). What is R²?", 0.8, "R² = 1 − SSres/SStot = 0.8.", "foundation", undefined, 0.001),
    ]),
  ],

  "ridge-and-lasso-regularization": [
    worked(
      "Worked example: ridge shrinks a coefficient",
      "With one feature and no intercept, xᵀy = 6 and xᵀx = 2. Compare the OLS coefficient with ridge at λ = 1.",
      [
        ["OLS", "β = xᵀy / xᵀx.", "6/2", "3"],
        ["Ridge", "β = xᵀy / (xᵀx + λ).", "6/3", "2"],
        ["Effect", "The penalty λβ² pulls the coefficient towards 0."],
      ],
      "OLS 3, ridge 2",
      "As λ → ∞, ridge coefficients go to 0 but never exactly reach it. Lasso's L1 penalty can make them exactly 0."
    ),
    practice([
      mcq("ml-rg-1", "Which regularisation tends to give sparse models, with some coefficients exactly zero?", [
        ["Lasso (L1)", true, "The L1 ball has corners on the axes, where the optimum often lands."],
        ["Ridge (L2)", false, "L2 shrinks smoothly but rarely to exactly 0."],
        ["Neither", false, "Lasso does."],
      ], "Elastic net mixes L1 and L2 penalties.", "foundation"),
      mcq("ml-rg-2", "Increasing λ in ridge regression mostly:", [
        ["Increases bias and decreases variance", true, "Simpler models fit the training data less closely but vary less."],
        ["Decreases bias and increases variance", false, "That's reversed."],
        ["Has no effect on test error", false, "Choosing λ well is the whole point of cross-validation."],
      ], "Regularisation trades a little bias for less variance."),
      num("ml-rg-3", "Same data (xᵀy = 6, xᵀx = 2). What λ makes the ridge coefficient 1.5?", 2, "6/(2 + λ) = 1.5 gives 2 + λ = 4, so λ = 2."),
    ]),
  ],

  "logistic-regression-and-cross-entropy": [
    worked(
      "Worked example: a logistic prediction and its loss",
      "A logistic model gives z = w·x + b = 2 for an example whose true label is 1. Find the predicted probability and the cross-entropy loss.",
      [
        ["Sigmoid", "p = 1/(1 + e^(−z)).", "1/(1 + e^(−2))", "≈ 0.881"],
        ["Loss for y = 1", "−ln p.", "−ln 0.881", "≈ 0.127"],
        ["If the label were 0", "−ln(1 − p) ≈ 2.13: a confident wrong answer costs much more."],
      ],
      "p ≈ 0.881, loss ≈ 0.127",
      "The decision boundary is w·x + b = 0, where p = 0.5."
    ),
    practice([
      num("ml-lr-1", "What is the cross-entropy loss when the true label is 1 and the predicted probability is 0.8? Round to 3 decimal places.", 0.223, "−ln 0.8 ≈ 0.223.", "gate-level", undefined, 0.001),
      num("ml-lr-2", "What is σ(0), the sigmoid at zero?", 0.5, "1/(1 + 1) = 0.5.", "foundation", undefined, 0.001),
      mcq("ml-lr-3", "Logistic regression is a linear classifier because:", [
        ["Its decision boundary w·x + b = 0 is a hyperplane", true, "The sigmoid is monotonic, so thresholding p is the same as thresholding w·x + b."],
        ["Its output is a straight line", false, "The output is an S-shaped probability."],
        ["It uses squared loss", false, "It uses cross-entropy (log loss)."],
      ], "Non-linear boundaries need feature engineering or kernels."),
    ]),
  ],

  "knn-and-naive-bayes-classifiers": [
    worked(
      "Worked example: one-word Naive Bayes",
      "40% of emails are spam. The word 'free' appears in 50% of spam and 10% of non-spam. An email contains 'free'. What is P(spam | free)?",
      [
        ["Spam path", "P(spam)·P(free | spam).", "0.4·0.5", "0.20"],
        ["Ham path", "P(ham)·P(free | ham).", "0.6·0.1", "0.06"],
        ["Normalise", "0.20/(0.20 + 0.06).", "≈ 0.769"],
      ],
      "≈ 0.769",
      "With several words, Naive Bayes multiplies their likelihoods, assuming the words are independent given the class."
    ),
    practice([
      mcq("ml-nb-1", "In k-NN, a very small k (like k = 1) gives:", [
        ["Low bias and high variance: the boundary follows every noisy point", true, "k = 1 memorises the training data."],
        ["High bias and low variance", false, "That's a large k."],
        ["No training at all, but slow predictions", false, "That's true of any k, not specific to small k."],
      ], "Increasing k smooths the decision boundary.", "foundation"),
      mcq("ml-nb-2", "Why does k-NN need feature scaling?", [
        ["Distances are dominated by features with large ranges", true, "Income in rupees would swamp age in years."],
        ["It doesn't", false, "Unscaled features distort distances."],
        ["So the model trains faster", false, "There's no training step to speed up."],
      ], "Standardise or min-max scale features before any distance-based method."),
      mcq("ml-nb-3", "Laplace smoothing in Naive Bayes stops:", [
        ["An unseen word from making a class probability exactly zero", true, "Add a pseudo-count (usually 1) to every count."],
        ["Overfitting to frequent words", false, "That's not its purpose."],
        ["The independence assumption failing", false, "Smoothing doesn't change that assumption."],
      ], "One zero factor would wipe out the whole product of likelihoods."),
    ]),
  ],

  "linear-discriminant-analysis": [
    worked(
      "Worked example: how many discriminant directions?",
      "LDA on a dataset with 3 classes and 10 features. At most how many discriminant directions does it find?",
      [
        ["Between-class scatter", "It's built from the C class means around the overall mean."],
        ["Rank", "Those C deviation vectors are tied together (they sum to 0), so the rank is at most C − 1."],
        ["Answer", "min(C − 1, number of features).", "min(2, 10)", "2"],
      ],
      "2 directions",
      "LDA maximises between-class scatter relative to within-class scatter. PCA ignores the labels entirely."
    ),
    practice([
      mcq("ml-lda-1", "LDA assumes each class is Gaussian with:", [
        ["Its own mean but a shared covariance matrix", true, "The shared covariance is what makes the boundaries linear."],
        ["Its own covariance matrix", false, "That's QDA, which gives quadratic boundaries."],
        ["The same mean", false, "Then nothing could be separated."],
      ], "QDA drops the shared covariance assumption.", "foundation"),
      num("ml-lda-2", "With 5 classes and 3 features, at most how many LDA directions are there?", 3, "min(C − 1, d) = min(4, 3) = 3."),
      mcq("ml-lda-3", "Compared with PCA, LDA:", [
        ["Uses the class labels to choose directions that separate the classes", true, "It's supervised."],
        ["Is unsupervised", false, "That's PCA."],
        ["Always keeps more dimensions", false, "It keeps at most C − 1."],
      ], "PCA keeps variance; LDA keeps separability."),
    ]),
  ],

  "decision-trees-id3-and-cart": [
    worked(
      "Worked example: information gain",
      "A node has 9 positive and 5 negative examples. A split gives children [6+, 2−] and [3+, 3−]. Find the information gain.",
      [
        ["Parent entropy", "H(9/14, 5/14).", undefined, "≈ 0.940"],
        ["Child entropies", "H(6/8, 2/8) ≈ 0.811 and H(3/6, 3/6) = 1."],
        ["Weighted child entropy", "(8/14)·0.811 + (6/14)·1.", "≈ 0.892"],
        ["Gain", "0.940 − 0.892.", "≈ 0.048"],
      ],
      "Information gain ≈ 0.048",
      "This is the Wind attribute in Mitchell's PlayTennis example; ID3 picks the attribute with the highest gain."
    ),
    practice([
      num("ml-dt-1", "What is the Gini impurity of a node that is 50% one class and 50% the other?", 0.5, "1 − (0.5² + 0.5²) = 0.5.", "foundation", undefined, 0.001),
      num("ml-dt-2", "What is the entropy (base 2) of a node with 4 positive and 4 negative examples?", 1, "Equal classes: −2·(½ log₂ ½) = 1.", "foundation"),
      mcq("ml-dt-3", "Why does information gain favour attributes with many values (like an ID number)?", [
        ["Each value isolates a few examples into pure leaves, so the gain looks huge", true, "That doesn't generalise."],
        ["It doesn't", false, "It's a well-known bias."],
        ["Because those attributes are numerical", false, "The problem is many distinct values."],
      ], "C4.5 uses the gain ratio to correct this bias.", "tricky"),
    ]),
  ],

  "ensemble-methods-bagging-and-boosting": [
    worked(
      "Worked example: majority vote of three classifiers",
      "Three independent classifiers are each right 70% of the time. How often is their majority vote right?",
      [
        ["All three right", "0.7³.", "0.343"],
        ["Exactly two right", "3 · 0.7² · 0.3.", "0.441"],
        ["Majority right", "0.343 + 0.441.", "0.784"],
      ],
      "78.4%",
      "Ensembles help only if the members' mistakes aren't strongly correlated. That's why bagging uses different bootstrap samples."
    ),
    practice([
      mcq("ml-en-1", "Bagging mainly reduces:", [
        ["Variance", true, "Averaging many overfit models smooths out their individual noise."],
        ["Bias", false, "That's what boosting mainly reduces."],
        ["Training time", false, "Bagging trains many models."],
      ], "Random forests add feature subsampling, which decorrelates the trees further.", "foundation"),
      mcq("ml-en-2", "In AdaBoost, after each round, examples the current model gets wrong:", [
        ["Get more weight", true, "The next weak learner focuses on them."],
        ["Are removed", false, "They're re-weighted, not removed."],
        ["Get less weight", false, "That's reversed."],
      ], "Boosting builds models one after another, each fixing the previous ones' errors."),
      num("ml-en-3", "A bootstrap sample of n examples (drawn with replacement) leaves out about what fraction of the original data, for large n? Round to 3 decimal places.", 0.368,
        "(1 − 1/n)ⁿ → 1/e ≈ 0.368. Those 'out-of-bag' examples give a free validation set.", "tricky", undefined, 0.001),
    ]),
  ],

  "support-vector-machines-hard-and-soft-margin": [
    worked(
      "Worked example: the width of the margin",
      "A trained hard-margin SVM has w = (3, 4). How wide is its margin?",
      [
        ["Margin formula", "The distance between w·x + b = 1 and w·x + b = −1 is 2/‖w‖."],
        ["‖w‖", "√(9 + 16).", "5"],
        ["Width", "2/5.", "0.4"],
      ],
      "0.4",
      "Maximising the margin is the same as minimising ½‖w‖², subject to yᵢ(w·xᵢ + b) ≥ 1."
    ),
    practice([
      mcq("ml-svm-1", "Which training points decide an SVM's boundary?", [
        ["Only the support vectors: the points on or inside the margin", true, "Their KKT multipliers are non-zero; every other point's multiplier is 0."],
        ["Every training point equally", false, "Points far from the margin have no effect."],
        ["Only misclassified points", false, "Correct points on the margin matter too."],
      ], "Move a non-support vector slightly and the boundary doesn't change.", "foundation"),
      mcq("ml-svm-2", "In a soft-margin SVM, a large C:", [
        ["Punishes margin violations heavily, giving a narrower margin and less bias", true, "As C → ∞ it approaches a hard margin."],
        ["Makes the margin wider", false, "A small C does that."],
        ["Removes the kernel", false, "Unrelated."],
      ], "C plays the role of an inverse regularisation strength."),
      num("ml-svm-3", "An SVM has ‖w‖ = 0.5. What is the margin width?", 4, "2/‖w‖ = 2/0.5 = 4."),
    ]),
  ],

  "kernel-trick-and-non-linear-svms": [
    worked(
      "Worked example: what a polynomial kernel computes",
      "In 2D, the kernel K(x, z) = (x·z + 1)² corresponds to a feature map φ. How many dimensions does φ have?",
      [
        ["Expand", "(x₁z₁ + x₂z₂ + 1)² gives terms in x₁², x₂², x₁x₂, x₁, x₂ and 1."],
        ["Match a feature map", "φ(x) = (x₁², x₂², √2x₁x₂, √2x₁, √2x₂, 1)."],
        ["Count", "6 features.", undefined, "6"],
      ],
      "6 dimensions",
      "The kernel computes φ(x)·φ(z) without ever building φ. The RBF kernel corresponds to an infinite-dimensional φ."
    ),
    practice([
      mcq("ml-kr-1", "A valid kernel's Gram matrix must be:", [
        ["Symmetric positive semidefinite", true, "That's Mercer's condition."],
        ["Diagonal", false, "No."],
        ["Invertible", false, "Not required."],
      ], "Sums and products of valid kernels are valid kernels.", "tricky"),
      mcq("ml-kr-2", "In the RBF kernel exp(−γ‖x − z‖²), a very large γ makes the model:", [
        ["Overfit: each point influences only a tiny neighbourhood", true, "The boundary wraps tightly around individual points."],
        ["Underfit", false, "That's a very small γ."],
        ["Linear", false, "No."],
      ], "Tune γ and C together, usually by grid search."),
      mcq("ml-kr-3", "The kernel trick works because the SVM dual depends on the data only through:", [
        ["Inner products xᵢ·xⱼ", true, "Replace each one with K(xᵢ, xⱼ)."],
        ["The labels alone", false, "It needs the features too."],
        ["The feature means", false, "No."],
      ], "Any algorithm written purely in terms of inner products can be kernelised.", "foundation"),
    ]),
  ],

  "multilayer-perceptrons-and-activation-functions": [
    worked(
      "Worked example: count the parameters",
      "A fully connected network has 3 inputs, one hidden layer of 4 units and 2 outputs, with biases. How many parameters?",
      [
        ["Input to hidden", "3·4 weights + 4 biases.", "16"],
        ["Hidden to output", "4·2 weights + 2 biases.", "10"],
        ["Total", "16 + 10.", "26"],
      ],
      "26 parameters",
      "Each layer adds (inputs × outputs) + outputs parameters."
    ),
    practice([
      mcq("ml-mlp-1", "Why can't a single-layer perceptron learn XOR?", [
        ["XOR isn't linearly separable", true, "No single line separates (0,1) and (1,0) from (0,0) and (1,1)."],
        ["It has too few inputs", false, "XOR has just 2 inputs."],
        ["Its activation is wrong", false, "No linear boundary works, whatever the activation."],
      ], "One hidden layer with a non-linear activation solves XOR.", "foundation"),
      mcq("ml-mlp-2", "Without non-linear activations, a deep network is equivalent to:", [
        ["A single linear layer", true, "A composition of linear maps is linear."],
        ["A decision tree", false, "No."],
        ["A network with ReLU", false, "ReLU is the non-linearity that prevents this."],
      ], "The non-linearity is what gives depth its power."),
      num("ml-mlp-3", "What is the derivative of ReLU at x = 3?", 1, "ReLU(x) = max(0, x) has slope 1 for x > 0.", "foundation"),
    ]),
  ],

  "backpropagation-and-neural-optimization": [
    worked(
      "Worked example: one gradient step by hand",
      "The model is ŷ = wx with loss L = (ŷ − t)². With x = 2, t = 3 and w = 1, take one gradient step with η = 0.1.",
      [
        ["Forward pass", "ŷ = 1·2.", "2"],
        ["Chain rule", "dL/dw = 2(ŷ − t)·x.", "2(2 − 3)·2", "−4"],
        ["Update", "w ← w − η·dL/dw.", "1 − 0.1·(−4)", "1.4"],
      ],
      "w = 1.4 (the new prediction is 2.8, closer to 3)",
      "Backpropagation is this chain rule applied layer by layer, reusing intermediate results."
    ),
    practice([
      num("ml-bp-1", "The sigmoid's derivative is σ(x)(1 − σ(x)). What is its largest value?", 0.25, "It peaks at x = 0: 0.5·0.5 = 0.25.", "gate-level", undefined, 0.001),
      mcq("ml-bp-2", "Why do deep networks with sigmoid activations suffer from vanishing gradients?", [
        ["Each layer multiplies the gradient by a sigmoid derivative of at most 0.25", true, "Over 10 layers, the gradient can shrink by 0.25¹⁰ ≈ 10⁻⁶."],
        ["Sigmoids are too slow to compute", false, "Speed isn't the issue."],
        ["The learning rate is always too large", false, "That causes exploding updates, not vanishing gradients."],
      ], "ReLU, residual connections and careful initialisation help."),
      mcq("ml-bp-3", "Momentum in gradient descent:", [
        ["Accumulates past gradients to speed up consistent directions and damp oscillations", true, "v ← βv + ∇L; w ← w − ηv."],
        ["Resets the weights each epoch", false, "No."],
        ["Is the same as a larger learning rate", false, "It adapts to the direction of past gradients."],
      ], "Adam combines momentum with per-parameter learning rates."),
    ]),
  ],

  "clustering-kmeans-kmedoids-and-hierarchical": [
    worked(
      "Worked example: one k-means iteration",
      "Points 1, 2, 10, 11 on a line; k = 2 with starting centroids 1 and 10. Do one iteration.",
      [
        ["Assign", "1 and 2 are closest to 1; 10 and 11 are closest to 10.", undefined, "{1, 2} and {10, 11}"],
        ["Update the centroids", "Mean of each cluster.", undefined, "1.5 and 10.5"],
        ["Check for convergence", "Reassigning changes nothing, so it has converged."],
      ],
      "Clusters {1, 2} and {10, 11}, centroids 1.5 and 10.5",
      "k-means minimises within-cluster squared distance. It converges, but only to a local optimum that depends on the start."
    ),
    practice([
      mcq("ml-cl-1", "Why use k-medoids instead of k-means?", [
        ["It's more robust to outliers, since centres must be actual data points", true, "One extreme point can't drag a medoid far."],
        ["It's always faster", false, "It's usually slower."],
        ["It doesn't need k", false, "It still needs k."],
      ], "k-medoids also works with any dissimilarity measure, not just Euclidean distance.", "foundation"),
      mcq("ml-cl-2", "Single-linkage hierarchical clustering tends to:", [
        ["Form long, straggly chains", true, "Clusters merge whenever any two points are close."],
        ["Form compact, round clusters", false, "That's complete linkage."],
        ["Need k in advance", false, "Hierarchical methods give a whole dendrogram."],
      ], "Cut the dendrogram at a chosen height to get the clusters."),
      num("ml-cl-3", "Points 0, 2 and 10 are in one k-means cluster. What is its centroid?", 4, "(0 + 2 + 10)/3 = 4."),
    ]),
  ],

  "dimensionality-reduction-pca-and-tsne": [
    worked(
      "Worked example: how many components to keep",
      "The covariance matrix's eigenvalues are 5, 3, 1 and 1. How many principal components are needed to keep at least 90% of the variance?",
      [
        ["Total variance", "5 + 3 + 1 + 1.", "10"],
        ["Running total", "5 (50%), 8 (80%), 9 (90%)."],
        ["Answer", "90% is reached with 3 components.", undefined, "3"],
      ],
      "3 components",
      "PCA is linear and keeps global variance; t-SNE is non-linear and keeps local neighbourhoods, mainly for visualisation."
    ),
    practice([
      mcq("ml-dr-1", "Which is true of t-SNE?", [
        ["It preserves local neighbourhoods, and distances between far-apart clusters mean little", true, "Use it to look at clusters, not to measure them."],
        ["It's a linear projection, like PCA", false, "It's non-linear."],
        ["It can directly map new points after training", false, "Standard t-SNE has no mapping for unseen data."],
      ], "Cluster sizes and gaps in a t-SNE plot can be misleading.", "tricky"),
      mcq("ml-dr-2", "Before PCA, you should usually:", [
        ["Centre the data, and standardise it if the features use different units", true, "Otherwise large-scale features dominate the components."],
        ["Sort the data", false, "Order doesn't matter."],
        ["Remove half the features", false, "That's PCA's job."],
      ], "PCA on standardised data uses the correlation matrix.", "foundation"),
      num("ml-dr-3", "Eigenvalues 6, 2 and 2. What fraction of the variance does the first component keep?", 0.6, "6/10 = 0.6.", "foundation", undefined, 0.001),
    ]),
  ],

  "model-evaluation-roc-auc-and-bias-variance": [
    worked(
      "Worked example: precision, recall and F1",
      "A classifier gives TP = 40, FP = 10, FN = 20 and TN = 30. Find the accuracy, precision, recall and F1.",
      [
        ["Accuracy", "(TP + TN)/total.", "70/100", "0.70"],
        ["Precision", "TP/(TP + FP): of everything predicted positive, how much was right.", "40/50", "0.80"],
        ["Recall", "TP/(TP + FN): of all real positives, how many were found.", "40/60", "≈ 0.667"],
        ["F1", "The harmonic mean of precision and recall.", "2·0.8·0.667/(0.8 + 0.667)", "≈ 0.727"],
      ],
      "Accuracy 0.70, precision 0.80, recall ≈ 0.667, F1 ≈ 0.727",
      "On imbalanced data, accuracy misleads: always predicting the majority class can look excellent."
    ),
    practice([
      mcq("ml-ev-1", "A classifier with AUC = 0.5 is:", [
        ["No better than random guessing", true, "The ROC curve is the diagonal."],
        ["Perfect", false, "That's AUC = 1."],
        ["Always wrong", false, "That's AUC = 0, which you could fix by flipping its answers."],
      ], "AUC is the probability that a random positive scores higher than a random negative.", "foundation"),
      mcq("ml-ev-2", "Training error is low but test error is high. The model has:", [
        ["High variance (overfitting)", true, "It memorised noise in the training set."],
        ["High bias (underfitting)", false, "That shows as high training error too."],
        ["The right complexity", false, "The gap says otherwise."],
      ], "Fix overfitting with more data, regularisation or a simpler model."),
      num("ml-ev-3", "A disease affects 1% of people. A model always predicts 'healthy'. What is its accuracy, in %?", 99,
        "It's right for the 99% who are healthy, but its recall is 0.", "tricky", "%"),
    ]),
  ],
};
