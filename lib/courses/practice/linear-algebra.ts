import { mcq, num, practice, worked, type LessonExtras } from "./helpers";

export const LINEAR_ALGEBRA_EXTRAS: LessonExtras = {
  "vector-spaces-subspaces-and-linear-independence": [
    worked(
      "Worked example: the dimension of a span",
      "Find the dimension of span{(1, 0, 1), (0, 1, 1), (1, 1, 2)}.",
      [
        ["Look for a dependency", "(1, 0, 1) + (0, 1, 1) = (1, 1, 2): the third vector is the sum of the first two."],
        ["Check the first two", "Neither is a multiple of the other, so they're independent."],
        ["Dimension", "The number of vectors in a basis of the span.", undefined, "2"],
      ],
      "Dimension 2 (a plane through the origin)",
      "Put the vectors in the rows of a matrix: the dimension of the span is its rank."
    ),
    practice([
      mcq("la-vs-1", "Is the set { (x, y) : x + y = 1 } a subspace of ℝ²?", [
        ["No: it doesn't contain the zero vector", true, "0 + 0 ≠ 1. Every subspace must contain 0."],
        ["Yes: it's a line", false, "Only lines through the origin are subspaces."],
      ], "Quick test: is 0 in the set, and is it closed under addition and scaling?", "foundation"),
      mcq("la-vs-2", "Can 4 vectors in ℝ³ be linearly independent?", [
        ["No", true, "ℝ³ has dimension 3, so at most 3 vectors can be independent."],
        ["Yes, if none is a multiple of another", false, "Pairwise non-parallel isn't enough."],
      ], "More vectors than the dimension are always dependent.", "foundation"),
      num("la-vs-3", "What is the dimension of the space of all 2 × 2 real matrices?", 4, "Four independent entries; the basis is the four matrices with a single 1."),
    ]),
  ],

  "four-fundamental-subspaces-and-rank-nullity": [
    worked(
      "Worked example: the four subspaces of a 3 × 5 matrix",
      "A is 3 × 5 with rank 2. Find the dimensions of its column space, row space, null space and left null space.",
      [
        ["Column and row space", "Both have dimension equal to the rank.", undefined, "2 and 2"],
        ["Null space (in ℝ⁵)", "Rank-nullity: n − r.", "5 − 2", "3"],
        ["Left null space (in ℝ³)", "m − r.", "3 − 2", "1"],
      ],
      "Column 2, row 2, null 3, left null 1",
      "The row space is orthogonal to the null space; the column space is orthogonal to the left null space."
    ),
    practice([
      num("la-fs-1", "A 6 × 4 matrix has a null space of dimension 1. What is its rank?", 3, "Rank = number of columns − nullity = 4 − 1 = 3.", "foundation"),
      mcq("la-fs-2", "Ax = b has a solution exactly when:", [
        ["b is in the column space of A", true, "Ax is a combination of A's columns."],
        ["b is in the null space of A", false, "Null space vectors map to 0."],
        ["A is square", false, "Rectangular systems can be solvable too."],
      ], "Equivalently, rank(A) = rank([A | b])."),
      num("la-fs-3", "A 5 × 5 matrix is invertible. What is the dimension of its null space?", 0, "Invertible means only x = 0 solves Ax = 0.", "foundation"),
    ]),
  ],

  "linear-transformations-matrix-representation-and-change-of-basis": [
    worked(
      "Worked example: the matrix of a transformation",
      "Find the matrix of T(x, y) = (x + y, x − y), and check whether T is invertible.",
      [
        ["Images of the basis vectors", "T(1, 0) = (1, 1) and T(0, 1) = (1, −1)."],
        ["Put them in columns", "A = [[1, 1], [1, −1]]."],
        ["Invertible?", "det A = −1 − 1 = −2 ≠ 0.", undefined, "Yes"],
      ],
      "A = [[1, 1], [1, −1]], and T is invertible",
      "The columns of a transformation's matrix are the images of the basis vectors."
    ),
    practice([
      mcq("la-lt-1", "Which matrix rotates ℝ² by 90° anticlockwise?", [
        ["[[0, −1], [1, 0]]", true, "(1, 0) goes to (0, 1) and (0, 1) goes to (−1, 0)."],
        ["[[0, 1], [−1, 0]]", false, "That's clockwise."],
        ["[[1, 0], [0, −1]]", false, "That's a reflection in the x-axis."],
      ], "Rotation by θ: [[cos θ, −sin θ], [sin θ, cos θ]].", "foundation"),
      mcq("la-lt-2", "Projection of ℝ³ onto the xy-plane has a kernel of:", [
        ["The z-axis", true, "Exactly the vectors (0, 0, z) project to 0."],
        ["The xy-plane", false, "That's the image."],
        ["Only {0}", false, "Then the projection would be invertible."],
      ], "Kernel and image dimensions add up to the dimension of the domain: 1 + 2 = 3."),
      mcq("la-lt-3", "If A represents T in one basis, in a new basis with change-of-basis matrix P it becomes:", [
        ["P⁻¹AP", true, "Convert to the old basis, apply A, then convert back."],
        ["PAP", false, "That isn't a similarity."],
        ["A + P", false, "No."],
      ], "Similar matrices share eigenvalues, trace, determinant and rank."),
    ]),
  ],

  "systems-of-linear-equations-and-gaussian-elimination": [
    worked(
      "Worked example: a system with no solution",
      "Solve x + y = 2 and 2x + 2y = 5.",
      [
        ["Eliminate", "R₂ − 2R₁ gives 0 = 1."],
        ["Compare ranks", "rank(A) = 1, but rank([A | b]) = 2."],
        ["Conclude", "The two lines are parallel and distinct."],
      ],
      "No solution (inconsistent)",
      "rank A = rank [A | b] = n: one solution. Equal ranks below n: infinitely many. Unequal ranks: none."
    ),
    practice([
      mcq("la-sy-1", "A homogeneous system Ax = 0 with more unknowns than equations has:", [
        ["Infinitely many solutions", true, "The rank is at most the number of equations, which is less than n, so there are free variables."],
        ["Exactly one solution", false, "There are free variables."],
        ["No solution", false, "x = 0 always works."],
      ], "Homogeneous systems are always consistent.", "foundation"),
      num("la-sy-2", "For which k does the system x + 2y = 3, 2x + ky = 6 have infinitely many solutions?", 4, "k = 4 makes the second equation exactly twice the first."),
      mcq("la-sy-3", "Gaussian elimination on an n × n system takes about:", [
        ["n³/3 multiplications, so O(n³)", true, "Each of the n pivots updates a shrinking square below it."],
        ["O(n²)", false, "That's back-substitution alone."],
        ["O(n)", false, "Too few."],
      ], "Factor A = LU once, and each new right-hand side costs only O(n²)."),
    ]),
  ],

  "determinants-properties-and-matrix-inverses": [
    worked(
      "Worked example: determinant rules",
      "A is 3 × 3 with det A = 5. Find det(2A), det(A⁻¹) and det(Aᵀ A).",
      [
        ["Scaling", "Each of the 3 rows is multiplied by 2.", "2³·5", "40"],
        ["Inverse", "det(A⁻¹) = 1/det A.", "1/5", "0.2"],
        ["Product", "det(AᵀA) = det Aᵀ · det A = (det A)².", "25"],
      ],
      "40, 0.2, 25",
      "det(kA) = kⁿ det A for an n × n matrix, a very common trap."
    ),
    practice([
      num("la-dt-1", "What is det [[1, 2], [3, 4]]?", -2, "1·4 − 2·3 = −2.", "foundation"),
      mcq("la-dt-2", "Swapping two rows of a matrix:", [
        ["Changes the sign of the determinant", true, "Every swap multiplies det by −1."],
        ["Leaves it unchanged", false, "That's adding a multiple of one row to another."],
        ["Doubles it", false, "No."],
      ], "Adding a multiple of a row: no change. Scaling a row by k: × k. Swapping: × −1."),
      num("la-dt-3", "A 4 × 4 matrix has det 3. What is det(−A)?", 3, "(−1)⁴·3 = 3: an even dimension cancels the sign.", "tricky"),
    ]),
  ],

  "eigenvalues-eigenvectors-and-characteristic-polynomial": [
    worked(
      "Worked example: eigenvalues and an eigenvector",
      "Find the eigenvalues of A = [[4, 1], [2, 3]] and an eigenvector for the larger one.",
      [
        ["Characteristic polynomial", "det(A − λI) = (4 − λ)(3 − λ) − 2.", "λ² − 7λ + 10"],
        ["Roots", "(λ − 2)(λ − 5) = 0.", undefined, "λ = 2, 5"],
        ["Eigenvector for 5", "(A − 5I)v = 0: [[−1, 1], [2, −2]]v = 0 gives v₁ = v₂.", undefined, "v = (1, 1)"],
      ],
      "λ = 2, 5; an eigenvector for 5 is (1, 1)",
      "Check: trace 7 = 2 + 5 and det 10 = 2·5. And A(1, 1) = (5, 5). ✓"
    ),
    practice([
      mcq("la-ev-1", "What are the eigenvalues of an upper triangular matrix?", [
        ["Its diagonal entries", true, "det(A − λI) is the product of (aᵢᵢ − λ)."],
        ["Always 0 and 1", false, "No."],
        ["The entries above the diagonal", false, "Those don't affect the eigenvalues."],
      ], "That's also true for lower triangular and diagonal matrices.", "foundation"),
      num("la-ev-2", "A has eigenvalues 2 and −3. What is the largest eigenvalue of A²?", 9, "A² has eigenvalues 4 and 9."),
      mcq("la-ev-3", "λ = 0 is an eigenvalue of A exactly when:", [
        ["A is singular", true, "Ax = 0·x has a non-zero solution."],
        ["A is symmetric", false, "Unrelated."],
        ["A is the identity", false, "The identity's eigenvalues are all 1."],
      ], "det A = product of the eigenvalues, so a zero eigenvalue means det A = 0."),
    ]),
  ],

  "diagonalizability-algebraic-geometric-multiplicity": [
    worked(
      "Worked example: a matrix that can't be diagonalised",
      "Is A = [[1, 1], [0, 1]] diagonalisable?",
      [
        ["Eigenvalues", "Triangular, so λ = 1 twice.", undefined, "Algebraic multiplicity 2"],
        ["Eigenvectors", "(A − I)v = [[0, 1], [0, 0]]v = 0 forces v₂ = 0.", undefined, "Only multiples of (1, 0)"],
        ["Geometric multiplicity", "1 < 2, so there aren't enough eigenvectors for a basis."],
      ],
      "Not diagonalisable",
      "Diagonalisable ⇔ for every eigenvalue, geometric multiplicity = algebraic multiplicity."
    ),
    practice([
      mcq("la-dg-1", "A 3 × 3 matrix has three distinct eigenvalues. Is it diagonalisable?", [
        ["Yes, always", true, "Eigenvectors for distinct eigenvalues are independent."],
        ["Only if it's symmetric", false, "Distinct eigenvalues are enough."],
        ["It can't be decided", false, "It's guaranteed."],
      ], "Distinct eigenvalues ⇒ diagonalisable. The converse fails: the identity has repeated eigenvalues but is diagonal.", "foundation"),
      num("la-dg-2", "What is the geometric multiplicity of λ = 2 for A = 2I (3 × 3)?", 3, "A − 2I = 0, so every vector is an eigenvector."),
      mcq("la-dg-3", "If A = PDP⁻¹, then A¹⁰ equals:", [
        ["PD¹⁰P⁻¹", true, "The inner P⁻¹P pairs cancel."],
        ["P¹⁰D¹⁰P⁻¹⁰", false, "Too many factors."],
        ["D¹⁰", false, "That's only true when P = I."],
      ], "Diagonalisation turns matrix powers into powers of the diagonal entries."),
    ]),
  ],

  "cayley-hamilton-theorem-and-minimal-polynomial": [
    worked(
      "Worked example: minimal polynomials",
      "Find the minimal polynomials of A = [[2, 0], [0, 2]] and B = [[2, 1], [0, 2]].",
      [
        ["Shared characteristic polynomial", "Both are (λ − 2)²."],
        ["A", "A − 2I = 0 already, so degree 1 is enough.", undefined, "m_A(λ) = λ − 2"],
        ["B", "B − 2I = [[0, 1], [0, 0]] ≠ 0, but (B − 2I)² = 0.", undefined, "m_B(λ) = (λ − 2)²"],
      ],
      "m_A = λ − 2; m_B = (λ − 2)²",
      "A matrix is diagonalisable iff its minimal polynomial has no repeated roots, which is why B isn't."
    ),
    practice([
      mcq("la-ch-1", "The Cayley-Hamilton theorem says:", [
        ["Every square matrix satisfies its own characteristic polynomial", true, "p(A) = 0, where p(λ) = det(A − λI)."],
        ["Every matrix is diagonalisable", false, "That's false."],
        ["det A equals the trace", false, "No."],
      ], "The minimal polynomial divides the characteristic polynomial and has the same roots.", "foundation"),
      mcq("la-ch-2", "A satisfies A² − 5A + 6I = 0. Then A⁻¹ is:", [
        ["(5I − A)/6", true, "Multiply by A⁻¹: A − 5I + 6A⁻¹ = 0."],
        ["(A − 5I)/6", false, "The sign is flipped."],
        ["6A − 5I", false, "No."],
      ], "Cayley-Hamilton gives inverses and high powers without heavy computation."),
      num("la-ch-3", "What is the degree of the minimal polynomial of the 4 × 4 identity matrix?", 1, "I − 1·I = 0, so m(λ) = λ − 1.", "foundation"),
    ]),
  ],

  "inner-product-spaces-gram-schmidt-and-qr-decomposition": [
    worked(
      "Worked example: Gram-Schmidt",
      "Turn u₁ = (1, 1) and u₂ = (1, 0) into an orthonormal basis.",
      [
        ["First vector", "Normalise u₁.", "e₁ = (1, 1)/√2"],
        ["Remove u₂'s component along e₁", "v₂ = u₂ − (u₂·e₁)e₁ = (1, 0) − ½(1, 1).", undefined, "(½, −½)"],
        ["Normalise", "|v₂| = 1/√2.", "e₂ = (1, −1)/√2"],
        ["Check", "e₁·e₂ = (1 − 1)/2 = 0. ✓"],
      ],
      "e₁ = (1, 1)/√2, e₂ = (1, −1)/√2",
      "QR decomposition records this process: Q holds the eᵢ and R the coefficients."
    ),
    practice([
      num("la-gs-1", "What is the length of the projection of (3, 4) onto the unit vector (1, 0)?", 3, "(3, 4)·(1, 0) = 3.", "foundation"),
      mcq("la-gs-2", "For an orthogonal matrix Q:", [
        ["QᵀQ = I, so Q⁻¹ = Qᵀ", true, "Its columns are orthonormal."],
        ["Q is always symmetric", false, "A rotation isn't symmetric."],
        ["det Q = 0", false, "det Q is ±1."],
      ], "Orthogonal matrices preserve lengths and angles."),
      num("la-gs-3", "What is the angle, in degrees, between (1, 0) and (1, 1)?", 45, "cos θ = 1/√2, so θ = 45°.", "foundation", "°"),
    ]),
  ],

  "symmetric-matrices-spectral-theorem-and-positive-definiteness": [
    worked(
      "Worked example: test for positive definiteness",
      "Is A = [[2, 1], [1, 2]] positive definite? What about B = [[1, 2], [2, 1]]?",
      [
        ["A: leading minors", "2 > 0 and det A = 3 > 0.", undefined, "positive definite"],
        ["A: eigenvalues", "1 and 3, both positive. ✓"],
        ["B: leading minors", "1 > 0, but det B = 1 − 4 = −3 < 0.", undefined, "not positive definite"],
        ["B: eigenvalues", "3 and −1: one is negative."],
      ],
      "A is positive definite; B is indefinite",
      "For a symmetric matrix: positive definite ⇔ all eigenvalues > 0 ⇔ all leading principal minors > 0 (Sylvester's criterion)."
    ),
    practice([
      mcq("la-pd-1", "The spectral theorem says a real symmetric matrix:", [
        ["Can be written QΛQᵀ, with Q orthogonal and Λ diagonal and real", true, "Orthogonal diagonalisation."],
        ["Has only positive eigenvalues", false, "Eigenvalues can be negative."],
        ["Is always invertible", false, "The zero matrix is symmetric."],
      ], "Symmetric ⇒ real eigenvalues and orthonormal eigenvectors.", "foundation"),
      mcq("la-pd-2", "xᵀAx > 0 for every non-zero x means A is:", [
        ["Positive definite", true, "That's the definition."],
        ["Orthogonal", false, "Unrelated."],
        ["Singular", false, "Positive definite matrices are invertible."],
      ], "Positive definite Hessians mark strict local minima, which links this to optimisation."),
      num("la-pd-3", "For which value of k is [[1, k], [k, 4]] positive semidefinite but not positive definite (k > 0)?", 2, "det = 4 − k² = 0 at k = 2: one eigenvalue becomes 0.", "tricky"),
    ]),
  ],

  "singular-value-decomposition-and-pca": [
    worked(
      "Worked example: how much variance a principal component explains",
      "A centred dataset's covariance matrix has eigenvalues 4 and 1. How much variance does the first principal component explain?",
      [
        ["Total variance", "The sum of the eigenvalues (the trace).", "4 + 1", "5"],
        ["First component", "Its eigenvalue over the total.", "4/5", "80%"],
      ],
      "80%",
      "PCA's components are the eigenvectors of the covariance matrix, which are the right singular vectors of the centred data matrix."
    ),
    practice([
      mcq("la-svd-1", "What are the singular values of [[3, 0], [0, −2]]?", [
        ["3 and 2", true, "Singular values are the square roots of the eigenvalues of AᵀA = diag(9, 4); they're never negative."],
        ["3 and −2", false, "Singular values are non-negative."],
        ["9 and 4", false, "Those are the eigenvalues of AᵀA."],
      ], "For a symmetric matrix, the singular values are the absolute values of the eigenvalues.", "foundation"),
      num("la-svd-2", "A matrix has singular values 5, 2, 0 and 0. What is its rank?", 2, "The rank is the number of non-zero singular values."),
      mcq("la-svd-3", "The best rank-k approximation of A (Eckart-Young) is:", [
        ["The SVD truncated to the k largest singular values", true, "It minimises the error in both the spectral and Frobenius norms."],
        ["The first k columns of A", false, "No."],
        ["A rounded to k digits", false, "No."],
      ], "That's the maths behind image compression and PCA."),
    ]),
  ],
};
