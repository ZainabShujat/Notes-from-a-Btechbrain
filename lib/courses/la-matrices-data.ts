import type { LessonMeta } from "./types";

const DA_SYLLABUS = {
  title: "GATE 2027 DA syllabus",
  authorOrInstitution: "IIT Madras",
  url: "https://gate2027.iitm.ac.in/static/doc/GATE2027_Syllabus/DA_GATE2027_Syllabus.pdf",
  type: "gate-official" as const,
};

const STRANG = {
  title: "Introduction to Linear Algebra",
  authors: "Gilbert Strang",
  publisher: "Wellesley-Cambridge Press",
  type: "primary-standard" as const,
};

const MIT_1806 = {
  title: "MIT 18.06 Linear Algebra (OpenCourseWare)",
  authorOrInstitution: "MIT OpenCourseWare, Gilbert Strang",
  url: "https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/",
  type: "curated-lecture" as const,
};

export const LA_LU_DECOMPOSITION_LESSON: LessonMeta = {
  id: "lu-decomposition-and-triangular-solves",
  title: "LU Decomposition: Elimination You Can Reuse",
  slug: "lu-decomposition-and-triangular-solves",
  order: 3,
  estimatedMinutes: 25,
  tagline: "Gaussian elimination, written down once as A = LU, so every new right-hand side costs almost nothing.",
  hasInteractive: false,
  hasGATE: true,
  hasPractice: true,
  syllabusScope: "GATE 2027 DA core: LU decomposition (also named in the CS/IT Engineering Mathematics syllabus)",
  cheatsheet: {
    summaryRule:
      "Elimination without row exchanges factors A = LU: U is the upper-triangular result of elimination, and L is unit lower-triangular holding the multipliers l_ij used to clear each entry.",
    keyFormulasAndRules: [
      "Multiplier l_ij = (entry being cleared) / (pivot). It goes into L at position (i, j).",
      "Solve Ax = b in two triangular steps: Ly = b (forward substitution), then Ux = y (back substitution).",
      "det(A) = det(L)·det(U) = product of U's diagonal (L has 1s on its diagonal).",
      "LU without row exchanges exists and is unique (with unit L) when every leading principal submatrix A_k is invertible.",
      "If a zero pivot appears, exchange rows: PA = LU with a permutation matrix P.",
      "Cost: factoring ≈ (2/3)n³ operations; each extra right-hand side ≈ 2n².",
    ],
    examPitfalls: [
      "The multipliers go into L with a plus sign, even though you subtract them during elimination.",
      "A nonsingular matrix can still lack an LU factorization without pivoting, for example [[0,1],[1,0]].",
      "Don't refactor A for each new b. Reuse L and U.",
    ],
  },
  sections: [
    {
      type: "explanation",
      heading: "1. Elimination, remembered",
      body: [
        "**Prerequisites:** row reduction from [Systems of linear equations and Gaussian elimination](/notes/linear-algebra/systems-of-linear-equations-and-gaussian-elimination).",
        "Gaussian elimination turns A into an upper-triangular U by subtracting multiples of pivot rows. LU decomposition simply ==yellow:keeps a record of those multiples==. Put each multiplier l_ij (the amount of row j subtracted from row i) into a lower-triangular matrix L with 1s on its diagonal. Then A = LU exactly.",
        "Why bother? Solving Ax = b by elimination costs about (2/3)n³ operations. Once you have L and U, each new right-hand side needs only two triangular solves, about 2n² operations. In data work you often solve with the same matrix many times, so this saving matters.",
      ],
      callout: {
        kind: "intuition",
        title: "Undo the subtractions",
        message:
          "Elimination subtracts l_ij × (row j) from row i. To rebuild A from U you add those multiples back, which is why the multipliers appear in L with a plus sign.",
      },
    },
    {
      type: "worked-example",
      heading: "2. Worked example: factor, then solve",
      problemStatement: "Factor A = [[2,1,1],[4,3,3],[8,7,9]] as LU, find det(A), and solve Ax = b for b = [4, 10, 24].",
      steps: [
        { stepNumber: 1, title: "Clear column 1", description: "Pivot 2. Row 2 − 2·Row 1 and Row 3 − 4·Row 1.", formula: "l21 = 4/2 = 2, l31 = 8/2 = 4", intermediateResult: "[[2,1,1],[0,1,1],[0,3,5]]" },
        { stepNumber: 2, title: "Clear column 2", description: "Pivot 1. Row 3 − 3·Row 2.", formula: "l32 = 3/1 = 3", intermediateResult: "U = [[2,1,1],[0,1,1],[0,0,2]]" },
        { stepNumber: 3, title: "Assemble L", description: "Place each multiplier below the diagonal of the identity.", intermediateResult: "L = [[1,0,0],[2,1,0],[4,3,1]]" },
        { stepNumber: 4, title: "Determinant", description: "det(L) = 1, so det(A) is the product of U's diagonal.", formula: "det(A) = 2 · 1 · 2", intermediateResult: "4" },
        { stepNumber: 5, title: "Forward substitution, Ly = b", description: "y1 = 4; y2 = 10 − 2·4 = 2; y3 = 24 − 4·4 − 3·2 = 2.", intermediateResult: "y = [4, 2, 2]" },
        { stepNumber: 6, title: "Back substitution, Ux = y", description: "x3 = 2/2 = 1; x2 = 2 − 1 = 1; x1 = (4 − 1 − 1)/2 = 1.", intermediateResult: "x = [1, 1, 1]" },
      ],
      finalAnswer: "L = [[1,0,0],[2,1,0],[4,3,1]], U = [[2,1,1],[0,1,1],[0,0,2]], det(A) = 4, x = [1, 1, 1].",
      examTakeaway: "Check by multiplying L·U back: row 3 is 4·[2,1,1] + 3·[0,1,1] + [0,0,2] = [8,7,9].",
    },
    {
      type: "explanation",
      heading: "3. When LU needs a row exchange",
      body: [
        "Elimination fails when a pivot is zero. For A = [[0,1],[1,0]], the very first pivot is 0, so no LU without row exchanges exists, even though A is invertible.",
        "The fix is to swap rows first. Collect the swaps in a permutation matrix P and factor ==purple:PA = LU==. Numerical libraries also swap rows to put the largest available entry in the pivot position (partial pivoting), because tiny pivots amplify rounding errors.",
        "A clean test: LU with unit L exists and is unique when ==green:every leading principal submatrix A_1, A_2, …, A_n is invertible== (each top-left k×k block has non-zero determinant).",
      ],
    },
    {
      type: "practice",
      heading: "Practice",
      questions: [
        {
          id: "la-lu-1",
          prompt: "During elimination on a 3×3 matrix you perform Row 2 − 5·Row 1. Which entry of L becomes 5?",
          type: "single-choice",
          options: [
            { id: "a", text: "l21 (row 2, column 1)", isCorrect: true, explanation: "The multiplier that clears entry (2,1) is stored at L(2,1)." },
            { id: "b", text: "l12", isCorrect: false, explanation: "L is lower-triangular; l12 is above the diagonal and is 0." },
            { id: "c", text: "l21 = −5", isCorrect: false, explanation: "Multipliers are stored with a plus sign." },
          ],
          explanation: "L(i, j) holds the multiple of row j subtracted from row i.",
          difficulty: "foundation",
        },
        {
          id: "la-lu-2",
          prompt: "If A = LU with U = [[3,1,2],[0,−2,4],[0,0,5]] and L unit lower-triangular, what is det(A)?",
          type: "numerical",
          correctAnswer: -30,
          tolerance: 0,
          explanation: "det(A) = 3 · (−2) · 5 = −30, since det(L) = 1.",
          difficulty: "gate-level",
        },
        {
          id: "la-lu-3",
          prompt: "Which matrix has no LU factorization without row exchanges?",
          type: "single-choice",
          options: [
            { id: "a", text: "[[0,2],[3,1]]", isCorrect: true, explanation: "The first leading principal minor is 0, so the first pivot is 0." },
            { id: "b", text: "[[2,0],[3,1]]", isCorrect: false, explanation: "Leading minors are 2 and 2, both non-zero." },
          ],
          explanation: "Check the top-left 1×1, 2×2, … determinants.",
          difficulty: "tricky",
        },
      ],
    },
    {
      type: "quick-revision",
      heading: "One-minute revision",
      oneMinutePanicCard: {
        coreRule: "A = LU: U from elimination, L holds the multipliers (with 1s on the diagonal).",
        mustRememberFormulas: ["Ly = b, then Ux = y", "det(A) = product of U's diagonal", "Zero pivot ⇒ PA = LU"],
        criticalPitfalls: ["Multipliers enter L with a plus sign", "Invertible does not guarantee LU without pivoting", "Reuse L, U for each new b"],
      },
    },
    {
      type: "resources",
      heading: "References",
      sources: [
        { ...DA_SYLLABUS, topic: "Linear Algebra: Gaussian elimination, LU decomposition." },
        { ...STRANG, topic: "Chapter 2: elimination as A = LU, and PA = LU with row exchanges." },
        { ...MIT_1806, topic: "Lecture 4: factorization into A = LU." },
      ],
    },
  ],
};

export const LA_BLOCK_AND_IDEMPOTENT_LESSON: LessonMeta = {
  id: "partitioned-and-idempotent-matrices",
  title: "Partitioned (Block) Matrices and Idempotent Matrices",
  slug: "partitioned-and-idempotent-matrices",
  order: 3,
  estimatedMinutes: 26,
  tagline: "Treat big matrices as grids of smaller ones, and meet the matrices that do the same thing twice.",
  hasInteractive: false,
  hasGATE: true,
  hasPractice: true,
  syllabusScope:
    "GATE 2027 DA core: partition matrix and idempotent matrix properties. Orthogonal and projection matrices and quadratic forms are taught in the QR and spectral-theorem lessons and linked here.",
  cheatsheet: {
    summaryRule:
      "Partitioned matrices multiply like ordinary matrices with blocks in place of numbers (when the block sizes match). An idempotent matrix satisfies P² = P: its eigenvalues are only 0 and 1, and its rank equals its trace.",
    keyFormulasAndRules: [
      "[A B; C D]·[E F; G H] = [AE+BG, AF+BH; CE+DG, CF+DH] (block sizes must be compatible).",
      "Block triangular: det[A B; 0 D] = det(A)·det(D) (A and D square).",
      "Schur complement: if A is invertible, det[A B; C D] = det(A)·det(D − C A⁻¹ B).",
      "Block diagonal inverse: [A 0; 0 D]⁻¹ = [A⁻¹ 0; 0 D⁻¹].",
      "Idempotent P: eigenvalues ∈ {0, 1}, P is diagonalizable, rank(P) = trace(P).",
      "If P is idempotent, so is I − P, and P(I − P) = 0.",
      "An idempotent P is an orthogonal projection exactly when P is also symmetric (Pᵀ = P).",
      "Hat matrix H = X(XᵀX)⁻¹Xᵀ is symmetric and idempotent; trace(H) = number of columns of X (full column rank).",
    ],
    examPitfalls: [
      "Block products keep the order: write AE + BG, never EA + GB. Blocks do not commute.",
      "det[A B; C D] is not det(A)det(D) − det(B)det(C) in general.",
      "Not every idempotent matrix is symmetric: [[1,1],[0,0]] is idempotent but projects obliquely.",
    ],
  },
  sections: [
    {
      type: "explanation",
      heading: "1. Partitioned matrices",
      body: [
        "Draw horizontal and vertical lines through a matrix and each piece becomes a ==purple:block==. A 4×4 matrix can be seen as a 2×2 grid of 2×2 blocks, written M = [A B; C D].",
        "The useful fact is that ==yellow:block matrices multiply exactly like ordinary 2×2 matrices==, provided each block product is defined: the top-left block of MN is AE + BG, and so on. Because matrix multiplication does not commute, keep every product in its original order.",
        "Block structure shows up all over data science. Splitting a design matrix into feature groups, writing a covariance matrix as [Σ11 Σ12; Σ21 Σ22] for conditional distributions, and building block-diagonal models for independent sub-problems all rely on it.",
      ],
    },
    {
      type: "explanation",
      heading: "2. Determinants and inverses of block matrices",
      body: [
        "If the lower-left block is zero, the matrix is ==green:block upper-triangular==, and its determinant is the product of the diagonal blocks' determinants: det[A B; 0 D] = det(A)·det(D). The same holds for block lower-triangular and block diagonal matrices.",
        "For a general [A B; C D] with A invertible, eliminate C using block row operations. What remains in the bottom-right is the ==purple:Schur complement== S = D − C A⁻¹ B, giving det[A B; C D] = det(A)·det(S).",
        "A block diagonal matrix inverts block by block: [A 0; 0 D]⁻¹ = [A⁻¹ 0; 0 D⁻¹].",
      ],
    },
    {
      type: "worked-example",
      heading: "3. Worked example: a 4×4 determinant in two lines",
      problemStatement: "Find det(M) for M = [[2,1,5,7],[1,1,3,2],[0,0,3,0],[0,0,4,2]].",
      steps: [
        { stepNumber: 1, title: "Spot the blocks", description: "Partition into 2×2 blocks. The lower-left block is all zeros, so M is block upper-triangular.", intermediateResult: "A = [[2,1],[1,1]], D = [[3,0],[4,2]]" },
        { stepNumber: 2, title: "Determinants of the diagonal blocks", description: "det(A) = 2·1 − 1·1 and det(D) = 3·2 − 0·4.", intermediateResult: "det(A) = 1, det(D) = 6" },
        { stepNumber: 3, title: "Multiply", description: "The off-diagonal block B does not affect the answer.", formula: "det(M) = det(A)·det(D)", intermediateResult: "6" },
      ],
      finalAnswer: "det(M) = 6.",
      examTakeaway: "Before expanding a big determinant, look for a zero block. It can turn a 4×4 into two 2×2s.",
    },
    {
      type: "explanation",
      heading: "4. Idempotent matrices",
      body: [
        "A square matrix P is ==yellow:idempotent== if P² = P. Applying it twice does nothing more than applying it once, which is exactly what a projection does: once a vector has been projected, projecting again leaves it where it is.",
        "If Pv = λv, then λv = Pv = P²v = λ²v, so λ² = λ and ==green:every eigenvalue is 0 or 1==. Idempotent matrices are always diagonalizable, so their rank (the number of eigenvalue-1 directions) equals their trace.",
        "I − P is idempotent too, and P(I − P) = 0. Together they split every vector into a part in the range of P and a part in the null space of P.",
        "An idempotent P is an ==purple:orthogonal projection exactly when it is symmetric==. A non-symmetric idempotent such as [[1,1],[0,0]] still projects onto a line, but along a slanted direction rather than straight down. Orthogonal projection matrices like A(AᵀA)⁻¹Aᵀ are covered in [inner product spaces, Gram-Schmidt and QR](/notes/linear-algebra/inner-product-spaces-gram-schmidt-and-qr-decomposition), and quadratic forms in [symmetric matrices and the spectral theorem](/notes/linear-algebra/symmetric-matrices-spectral-theorem-and-positive-definiteness).",
      ],
      callout: {
        kind: "exam-tip",
        title: "The hat matrix in regression",
        message:
          "In least squares, H = X(XᵀX)⁻¹Xᵀ maps observed y to fitted ŷ. It is symmetric and idempotent, so its eigenvalues are 0s and 1s and trace(H) = rank(H) = number of columns of X (when X has full column rank).",
      },
    },
    {
      type: "practice",
      heading: "Practice",
      questions: [
        {
          id: "la-block-1",
          prompt: "M = [A B; 0 D] where A is 3×3 with det(A) = 2 and D is 2×2 with det(D) = −4. What is det(M)?",
          type: "numerical",
          correctAnswer: -8,
          tolerance: 0,
          explanation: "Block upper-triangular, so det(M) = det(A)·det(D) = 2·(−4) = −8. B does not matter.",
          difficulty: "foundation",
        },
        {
          id: "la-idem-1",
          prompt: "P is a 5×5 idempotent matrix with trace(P) = 3. What is rank(P)?",
          type: "numerical",
          correctAnswer: 3,
          tolerance: 0,
          explanation: "Eigenvalues are 0 or 1 and P is diagonalizable, so rank = number of 1s = trace = 3.",
          difficulty: "gate-level",
        },
        {
          id: "la-idem-2",
          prompt: "Which statement about P = [[1,1],[0,0]] is true?",
          type: "single-choice",
          options: [
            { id: "a", text: "P is idempotent but not an orthogonal projection", isCorrect: true, explanation: "P² = P, but Pᵀ ≠ P, so it projects along a slanted direction." },
            { id: "b", text: "P is an orthogonal projection", isCorrect: false, explanation: "Orthogonal projections must be symmetric." },
            { id: "c", text: "P is not idempotent", isCorrect: false, explanation: "Multiply it out: P² = [[1,1],[0,0]] = P." },
          ],
          explanation: "Idempotent + symmetric ⇔ orthogonal projection.",
          difficulty: "tricky",
        },
        {
          id: "la-idem-3",
          prompt: "If P is idempotent, which of these must also be idempotent?",
          type: "single-choice",
          options: [
            { id: "a", text: "I − P", isCorrect: true, explanation: "(I − P)² = I − 2P + P² = I − P." },
            { id: "b", text: "2P", isCorrect: false, explanation: "(2P)² = 4P ≠ 2P unless P = 0." },
            { id: "c", text: "P + I", isCorrect: false, explanation: "(P + I)² = 3P + I ≠ P + I unless P = 0." },
          ],
          explanation: "Expand the square and use P² = P.",
          difficulty: "foundation",
        },
      ],
    },
    {
      type: "quick-revision",
      heading: "One-minute revision",
      oneMinutePanicCard: {
        coreRule: "Blocks multiply like numbers (in order). Idempotent: P² = P, eigenvalues 0/1, rank = trace.",
        mustRememberFormulas: [
          "det[A B; 0 D] = det A · det D",
          "det[A B; C D] = det A · det(D − CA⁻¹B)",
          "(I − P)² = I − P",
          "Orthogonal projection ⇔ P² = P and Pᵀ = P",
        ],
        criticalPitfalls: ["Blocks don't commute", "det of a block matrix is not ad − bc of block determinants", "Idempotent need not be symmetric"],
      },
    },
    {
      type: "resources",
      heading: "References",
      sources: [
        { ...DA_SYLLABUS, topic: "Linear Algebra: projection, orthogonal, idempotent and partition matrices and their properties." },
        { ...STRANG, topic: "Block multiplication and elimination by blocks; projections and least squares." },
        { ...MIT_1806, topic: "Lectures on projections and least squares (projection matrices, P² = P)." },
      ],
    },
  ],
};
