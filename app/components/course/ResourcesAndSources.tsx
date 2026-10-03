import { ResourcesSection } from "../../../lib/courses/types";

export interface CuratedEducator {
  name: string;
  channelOrSeries: string;
  url: string;
  focusArea: string;
  recommendedFor: string;
}

// ─── Subject-specific educator lists ─────────────────────────────────────────

const EDUCATORS_BY_SUBJECT: Record<string, CuratedEducator[]> = {
  "operating-systems": [
    { name: "Varun Singla", channelOrSeries: "Gate Smashers · Operating Systems Full Course", url: "https://www.youtube.com/playlist?list=PLxCzCOWd7aiGz9donHRrE9I3Mwn6XdP8p", focusArea: "5 vs 7-State Models, CPU Scheduling, Banker's Algorithm, Semaphores, Multi-level Paging", recommendedFor: "Rapid intuitive conceptual mastery and step-by-step numerical examples." },
    { name: "Neso Academy", channelOrSeries: "Neso Academy · Operating Systems Series", url: "https://www.youtube.com/playlist?list=PLBlnK6fEyqRbjR2jT38T3nFiIuWAHh2zH", focusArea: "Process memory architecture, state transitions, TLB translation, disk scheduling", recommendedFor: "Academic whiteboard lectures and foundational textbook clarity." },
    { name: "Sanchit Jain", channelOrSeries: "Knowledge Gate · OS for GATE & Semester Exams", url: "https://www.youtube.com/playlist?list=PLmXKhU9FNesSFvj6gASuWmQd23Ul5omtD", focusArea: "Exam patterns, GATE PYQ derivations, tricky corner cases, formula shortcuts", recommendedFor: "Intense numerical problem-solving and past-paper accuracy." },
    { name: "Amit Khurana", channelOrSeries: "GATE CSE by Amit Khurana · Nirbhau OS Series", url: "https://www.youtube.com/playlist?list=PLC36xJgs4dxEGlPPsvshTRh35Vv-Eg_4b", focusArea: "Rigorous proofs, system call intricacies, concurrency invariants, paging depth", recommendedFor: "High-rank GATE aspirants seeking uncompromising mathematical depth." },
    { name: "Abdul Bari", channelOrSeries: "Abdul Bari · Algorithms & Concurrency Visualizations", url: "https://www.youtube.com/@abdul_bari", focusArea: "Semaphores, Mutex, Critical Section Problem, Banker's Safety Logic", recommendedFor: "Visual thinkers who want to see synchronization flows animated." },
    { name: "Prof. Robert Morris & Frans Kaashoek", channelOrSeries: "MIT OpenCourseWare · 6.828 Operating System Engineering", url: "https://ocw.mit.edu/courses/6-828-operating-system-engineering-fall-2012/", focusArea: "xv6 Kernel source code, hardware MMU, traps, device drivers", recommendedFor: "Undergraduates wanting to read and modify real Unix kernel code." },
  ],
  "dbms": [
    { name: "Sanchit Jain", channelOrSeries: "Knowledge Gate · DBMS for GATE & Semester", url: "https://www.youtube.com/playlist?list=PLmXKhU9FNesSj8DgFTKvlGBmNdxTFIyD3", focusArea: "ER diagrams, normalization, SQL, transactions, concurrency control", recommendedFor: "GATE-focused numerical problem-solving with clear worked examples." },
    { name: "Varun Singla", channelOrSeries: "Gate Smashers · DBMS Full Course", url: "https://www.youtube.com/playlist?list=PLxCzCOWd7aiFAN6I8CuViBuCdJBlcZKey", focusArea: "Relational algebra, SQL queries, B/B+ trees, file organization", recommendedFor: "Fast conceptual coverage with step-by-step GATE numericals." },
    { name: "Neso Academy", channelOrSeries: "Neso Academy · DBMS Complete Playlist", url: "https://www.youtube.com/playlist?list=PLBlnK6fEyqRi_CUQ-FDBmRtgBpOk4XYot", focusArea: "Relational model, SQL, normalization theory, ACID properties", recommendedFor: "Systematic textbook-style explanations ideal for first-time learners." },
    { name: "Ravindrababu Ravula", channelOrSeries: "Ravindrababu Ravula · DBMS Lectures", url: "https://www.youtube.com/@Ravindrababu_Ravula", focusArea: "Functional dependencies, BCNF, 3NF decomposition, transaction schedules", recommendedFor: "Deep theoretical rigor on normalization and transaction serializability." },
  ],
  "computer-networks": [
    { name: "Sanchit Jain", channelOrSeries: "Knowledge Gate · Computer Networks for GATE", url: "https://www.youtube.com/playlist?list=PLmXKhU9FNesRowxNGGzRMC3TUkJgYnTJq", focusArea: "OSI/TCP-IP layers, sliding window, CRC, subnetting, TCP congestion control", recommendedFor: "GATE-level numerical drilling and PYQ analysis." },
    { name: "Varun Singla", channelOrSeries: "Gate Smashers · Computer Networks Full Course", url: "https://www.youtube.com/playlist?list=PLxCzCOWd7aiGShFormBZvhs6quW3hVgTL", focusArea: "Ethernet, IP addressing, routing algorithms, TCP/UDP, DNS & HTTP", recommendedFor: "Step-by-step conceptual walkthroughs with worked GATE numericals." },
    { name: "Neso Academy", channelOrSeries: "Neso Academy · Computer Networks Series", url: "https://www.youtube.com/playlist?list=PLBlnK6fEyqRgMCUAG0XRw78UA8qnv6jEx", focusArea: "Data link layer, framing, error detection, medium access, TCP/IP", recommendedFor: "Clear whiteboard lectures for foundational and semester exam coverage." },
  ],
  "computer-organization": [
    { name: "Varun Singla", channelOrSeries: "Gate Smashers · COA Full Course", url: "https://www.youtube.com/playlist?list=PLxCzCOWd7aiHMonh3G6QNKq53C6oNXGrX", focusArea: "Instruction cycle, addressing modes, cache mapping, pipelining, I/O", recommendedFor: "Rapid GATE-focused conceptual coverage with numericals." },
    { name: "Sanchit Jain", channelOrSeries: "Knowledge Gate · COA for GATE", url: "https://www.youtube.com/playlist?list=PLmXKhU9FNesTpQnBB4e0sEyZEGrBNKhJ2", focusArea: "Cache bit-splitting, AMAT, pipeline CPI, IEEE 754, DMA", recommendedFor: "Past-paper-focused approach with clear COA numerical explanations." },
    { name: "Prof. Onur Mutlu", channelOrSeries: "ETH Zürich · Digital Design & Computer Architecture", url: "https://www.youtube.com/playlist?list=PL5Q2soXY2Zi9OhoVQBXYFIZywZXCPl4M_", focusArea: "Microarchitecture, pipelining, out-of-order execution, memory hierarchy", recommendedFor: "Graduate-level depth on how real modern processors are designed." },
  ],
  "data-structures": [
    { name: "Abdul Bari", channelOrSeries: "Abdul Bari · Data Structures & Algorithms", url: "https://www.youtube.com/@abdul_bari", focusArea: "Trees, graphs, hashing, sorting — with visual algorithm animations", recommendedFor: "Visual thinkers who want to see each algorithm step animated clearly." },
    { name: "Varun Singla", channelOrSeries: "Gate Smashers · Data Structures Full Course", url: "https://www.youtube.com/playlist?list=PLxCzCOWd7aiEwaANNt3OqJPVIxwp2ebiT", focusArea: "Arrays, linked lists, trees, BST, AVL, heaps, hashing — GATE numericals", recommendedFor: "GATE-targeted coverage with step-by-step GATE PYQ walkthroughs." },
  ],
  "algorithms": [
    { name: "Abdul Bari", channelOrSeries: "Abdul Bari · Algorithms", url: "https://www.youtube.com/@abdul_bari", focusArea: "Sorting, graph algorithms, dynamic programming, greedy, backtracking", recommendedFor: "Best visual explanations of algorithm design and complexity analysis." },
    { name: "Varun Singla", channelOrSeries: "Gate Smashers · Algorithms for GATE", url: "https://www.youtube.com/playlist?list=PLxCzCOWd7aiHcmS4i14bI0VrMbZTKyp2T", focusArea: "Asymptotic analysis, Master Theorem, DP, Dijkstra, Bellman-Ford", recommendedFor: "Exam-focused with GATE PYQ numericals on every major algorithm." },
  ],
  "theory-of-computation": [
    { name: "Varun Singla", channelOrSeries: "Gate Smashers · Theory of Computation", url: "https://www.youtube.com/playlist?list=PLxCzCOWd7aiFM9Lj5G9G_76adtyph52od", focusArea: "DFA/NFA, minimization, CFG, PDA, Turing machines, decidability", recommendedFor: "GATE-focused with clear minimal DFA construction and language classification." },
    { name: "Sanchit Jain", channelOrSeries: "Knowledge Gate · TOC for GATE", url: "https://www.youtube.com/playlist?list=PLmXKhU9FNesTSqP8hWDncxpZXde1EHru8", focusArea: "Regular expressions, pumping lemma, closure properties, Rice's theorem", recommendedFor: "Exam-pattern oriented with closure table drilling and decidability proofs." },
    { name: "Ravindrababu Ravula", channelOrSeries: "Ravindrababu Ravula · TOC Lectures", url: "https://www.youtube.com/@Ravindrababu_Ravula", focusArea: "Formal proofs, Myhill-Nerode theorem, undecidability reductions", recommendedFor: "Mathematically rigorous treatment for high-rank GATE aspirants." },
  ],
  "compiler-design": [
    { name: "Varun Singla", channelOrSeries: "Gate Smashers · Compiler Design", url: "https://www.youtube.com/playlist?list=PLxCzCOWd7aiEKtgkTLjYzmFjfXpMY8oux", focusArea: "Lexical analysis, parsing (LL/LR), SDT, code generation", recommendedFor: "GATE-focused with worked FIRST/FOLLOW and LR parsing table numericals." },
    { name: "Sanchit Jain", channelOrSeries: "Knowledge Gate · Compiler Design for GATE", url: "https://www.youtube.com/playlist?list=PLmXKhU9FNesSQL8bFWWRQBRKrVS0KSKme", focusArea: "Parsing conflicts, operator precedence, syntax-directed translation", recommendedFor: "Exam-oriented explanations of ambiguous grammars and parser conflicts." },
    { name: "Prof. Alex Aiken", channelOrSeries: "Stanford · Compilers (Coursera)", url: "https://www.coursera.org/learn/compilers", focusArea: "Lexing, parsing, semantic analysis, optimization, code generation", recommendedFor: "University-depth treatment of the full compiler pipeline — build a real compiler." },
  ],
  "programming-in-c": [
    { name: "Neso Academy", channelOrSeries: "Neso Academy · C Programming Full Course", url: "https://www.youtube.com/playlist?list=PLBlnK6fEyqRggZZgYpPMUxdY1CYkZtARR", focusArea: "Data types, pointers, arrays, functions, recursion, file I/O", recommendedFor: "Systematic beginner-to-advanced C with clear examples." },
    { name: "Jenny's Lectures", channelOrSeries: "Jenny's Lectures CS/IT · C Programming", url: "https://www.youtube.com/@JennyslecturesCSIT", focusArea: "Arrays, strings, pointers, structures, file handling, preprocessor", recommendedFor: "Clear step-by-step C explanations — great for semester lab preparation." },
  ],
  "discrete-mathematics": [
    { name: "Varun Singla", channelOrSeries: "Gate Smashers · Discrete Mathematics", url: "https://www.youtube.com/playlist?list=PLxCzCOWd7aiH2wwES9vPWsEL6ipTaUSl3", focusArea: "Logic, sets, relations, functions, posets, graph theory, counting", recommendedFor: "GATE-focused discrete maths with formula-sheet style rapid coverage." },
    { name: "Sanchit Jain", channelOrSeries: "Knowledge Gate · Discrete Maths for GATE", url: "https://www.youtube.com/playlist?list=PLmXKhU9FNesRQuMC2hsZPcMKQIJMFHpUG", focusArea: "Relation counting, lattices, group theory, recurrences, graph colouring", recommendedFor: "All relation/function counting formulas in exam-pattern format." },
    { name: "Prof. Trefor Bazett", channelOrSeries: "Dr. Trefor Bazett · Discrete Math Full Course", url: "https://www.youtube.com/playlist?list=PLHXZ9OQGMqxersk8fUxiUMSIx0DBqsKZS", focusArea: "Logic, proof techniques, graph theory, combinatorics, recurrences", recommendedFor: "University-level rigour with engaging visual proofs." },
  ],
  "engineering-mathematics": [
    { name: "Varun Singla", channelOrSeries: "Gate Smashers · Engineering Mathematics", url: "https://www.youtube.com/playlist?list=PLxCzCOWd7aiHg5hCK2dFtIVViSPRBfJvY", focusArea: "Linear algebra, probability, calculus, numerical methods for GATE", recommendedFor: "Efficient GATE maths coverage with high-yield topic prioritization." },
    { name: "3Blue1Brown", channelOrSeries: "3Blue1Brown · Essence of Linear Algebra", url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab", focusArea: "Vectors, matrix transformations, eigenvalues — geometric intuition", recommendedFor: "Building geometric intuition for linear algebra before solving problems." },
  ],
  "digital-logic": [
    { name: "Neso Academy", channelOrSeries: "Neso Academy · Digital Electronics Full Course", url: "https://www.youtube.com/playlist?list=PLBlnK6fEyqRjMH3mWf6kwqiTbT798eAOm", focusArea: "Boolean algebra, K-maps, combinational circuits, flip-flops, sequential logic", recommendedFor: "The most thorough digital logic series — textbook quality at no cost." },
    { name: "Varun Singla", channelOrSeries: "Gate Smashers · Digital Logic for GATE", url: "https://www.youtube.com/playlist?list=PLxCzCOWd7aiEdxyTueuqh684qNBs-7mmK", focusArea: "K-map minimization, multiplexers, decoders, flip-flop conversions, counters", recommendedFor: "GATE-focused digital logic with exam-style numericals." },
  ],
  "general-aptitude": [
    { name: "Varun Singla", channelOrSeries: "Gate Smashers · General Aptitude for GATE", url: "https://www.youtube.com/playlist?list=PLxCzCOWd7aiEKlCKMlvMqlFMFjRcJGMv2", focusArea: "Verbal ability, numerical reasoning, data interpretation, logical reasoning", recommendedFor: "GATE-specific aptitude coverage with past-paper question patterns." },
    { name: "Sanchit Jain", channelOrSeries: "Knowledge Gate · GATE Aptitude", url: "https://www.youtube.com/@Knowledgegate", focusArea: "Sentence completion, critical reasoning, numerical ability", recommendedFor: "Systematic aptitude preparation with exam-pattern questions." },
  ],
};

export default function ResourcesAndSources({
  section,
  subjectSlug,
}: {
  section: ResourcesSection;
  subjectSlug?: string;
}) {
  const { sources, stillStuck } = section;

  // Resolve educator list for this specific subject
  const educators: CuratedEducator[] =
    (subjectSlug && EDUCATORS_BY_SUBJECT[subjectSlug]) || [];

  // Group sources academically
  const primarySources = sources.filter(
    (s) => s.type === "primary-standard" || s.type === "academic-paper"
  );
  const examSources = sources.filter(
    (s) => s.type === "gate-official" || s.type === "verified-pyq"
  );
  const learningSources = sources.filter(
    (s) =>
      s.type !== "primary-standard" &&
      s.type !== "academic-paper" &&
      s.type !== "gate-official" &&
      s.type !== "verified-pyq"
  );

  return (
    <section className="my-12 pt-8 border-t border-hairline">
      <div className="mb-6">
        <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-ink-3 block mb-1">
          SOURCE TRANSPARENCY & CITATIONS
        </span>
        <h4 className="text-lg font-bold text-ink-1 font-sans">
          Primary Academic References & Exam Sources
        </h4>
        <p className="text-xs text-ink-3 mt-1 max-w-[68ch] leading-relaxed">
          Every concept in Notes From a B.Tech Brain is synthesized from authoritative academic texts, seminal peer-reviewed research, verified exam archives, and renowned university lectures.
        </p>
      </div>

      {/* Primary Academic References */}
      {primarySources.length > 0 && (
        <div className="mb-6">
          <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-accent block mb-2">
            Primary Academic Texts
          </span>
          <div className="divide-y divide-hairline border-y border-hairline">
            {primarySources.map((src, idx) => (
              <div
                key={idx}
                className="py-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 text-xs"
              >
                <div className="min-w-0">
                  {src.url ? (
                    <a
                      href={src.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-ink-1 hover:text-accent font-sans text-sm inline-flex items-center gap-1 group transition-colors mr-2"
                    >
                      <span>{src.title}</span>
                      <span className="text-[10px] text-ink-3 group-hover:text-accent font-mono transition-colors">
                        ↗
                      </span>
                    </a>
                  ) : (
                    <span className="font-bold text-ink-1 font-sans text-sm block sm:inline mr-2">
                      {src.title}
                    </span>
                  )}
                  <span className="font-mono text-ink-3 text-[11px]">
                    by {src.authorOrInstitution} &middot; {src.topic}
                  </span>
                  {src.annotation && (
                    <p className="text-ink-2 text-xs leading-relaxed mt-1 max-w-[65ch] font-sans">
                      {src.annotation}
                    </p>
                  )}
                </div>
                <span className="font-mono text-[9px] uppercase tracking-wider text-ink-3 shrink-0">
                  ACADEMIC STANDARD
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* GATE Official Sources */}
      {examSources.length > 0 && (
        <div className="mb-6">
          <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-accent block mb-2">
            Official Examination Archives
          </span>
          <div className="divide-y divide-hairline border-y border-hairline">
            {examSources.map((src, idx) => (
              <div
                key={idx}
                className="py-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 text-xs"
              >
                <div className="min-w-0">
                  {src.url ? (
                    <a
                      href={src.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-ink-1 hover:text-accent font-sans text-sm inline-flex items-center gap-1 group transition-colors mr-2"
                    >
                      <span>{src.title}</span>
                      <span className="text-[10px] text-accent font-mono transition-colors">
                        ↗
                      </span>
                    </a>
                  ) : (
                    <span className="font-bold text-ink-1 font-sans text-sm block sm:inline mr-2">
                      {src.title}
                    </span>
                  )}
                  <span className="font-mono text-ink-3 text-[11px]">
                    {src.authorOrInstitution} &middot; {src.topic}
                  </span>
                  {src.annotation && (
                    <p className="text-ink-2 text-xs leading-relaxed mt-1 max-w-[65ch] font-sans">
                      {src.annotation}
                    </p>
                  )}
                </div>
                <span className="font-mono text-[9px] uppercase tracking-wider text-accent font-semibold shrink-0">
                  GATE CS OFFICIAL
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Curated Learning Resources */}
      {learningSources.length > 0 && (
        <div className="mb-6">
          <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-accent block mb-2">
            Curated University Lecture Series
          </span>
          <div className="divide-y divide-hairline border-y border-hairline">
            {learningSources.map((src, idx) => (
              <div
                key={idx}
                className="py-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 text-xs"
              >
                <div className="min-w-0">
                  {src.url ? (
                    <a
                      href={src.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-ink-1 hover:text-accent font-sans text-sm inline-flex items-center gap-1 group transition-colors mr-2"
                    >
                      <span>{src.title}</span>
                      <span className="text-[10px] text-ink-3 group-hover:text-accent font-mono transition-colors">
                        ↗
                      </span>
                    </a>
                  ) : (
                    <span className="font-bold text-ink-1 font-sans text-sm block sm:inline mr-2">
                      {src.title}
                    </span>
                  )}
                  <span className="font-mono text-ink-3 text-[11px]">
                    {src.authorOrInstitution} &middot; {src.topic}
                  </span>
                  {src.annotation && (
                    <p className="text-ink-2 text-xs leading-relaxed mt-1 max-w-[65ch] font-sans">
                      {src.annotation}
                    </p>
                  )}
                </div>
                <span className="font-mono text-[9px] uppercase tracking-wider text-ink-3 shrink-0">
                  LECTURE SERIES
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Alternative Curated Explanations / Lesson-Specific Links */}
      {stillStuck && stillStuck.length > 0 && (
        <div className="border border-hairline rounded p-4 sm:p-5 bg-surface-1 my-6">
          <span className="font-mono text-[10px] uppercase tracking-widest font-bold text-accent block mb-1">
            ALTERNATIVE PEDAGOGICAL PERSPECTIVES
          </span>
          <p className="text-xs text-ink-2 mb-3 max-w-[68ch]">
            If the textbook derivation did not click immediately, consult these targeted video lessons:
          </p>

          <div className="divide-y divide-hairline border-t border-hairline pt-1">
            {stillStuck.map((item, idx) => (
              <div
                key={idx}
                className="py-2.5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 text-xs"
              >
                <div>
                  <span className="font-bold text-ink-1 block">
                    {item.title}
                  </span>
                  <span className="text-ink-3 font-mono text-[11px] block">
                    {item.creator} {item.duration ? `(${item.duration})` : ""}
                  </span>
                  <p className="text-ink-2 text-xs leading-relaxed mt-0.5 max-w-[60ch]">
                    {item.whyThisHelps}
                  </p>
                </div>
                {item.url && (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 text-accent hover:text-accent-soft text-xs font-mono font-semibold transition-colors inline-flex items-center gap-1"
                  >
                    <span>Watch Lesson</span>
                    <span>↗</span>
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Subject-specific Curated YouTube Educators */}
      {educators.length > 0 && (
      <div className="mt-8 border border-hairline rounded p-4 sm:p-5 bg-surface-1">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-3">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest font-bold text-accent block mb-0.5">
              RECOMMENDED YOUTUBE EDUCATORS & FULL-COURSE PLAYLISTS
            </span>
            <p className="text-xs text-ink-2 max-w-[68ch]">
              Curated for clarity, rigorous numerical solving, and semester excellence:
            </p>
          </div>
        </div>

        <div className="divide-y divide-hairline border-t border-hairline">
          {educators.map((edu, idx) => (
            <div
              key={idx}
              className="py-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 text-xs"
            >
              <div className="min-w-0">
                <a
                  href={edu.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-ink-1 hover:text-accent font-sans text-sm inline-flex items-center gap-1 group transition-colors"
                >
                  <span>{edu.channelOrSeries}</span>
                  <span className="text-[10px] text-ink-3 group-hover:text-accent font-mono transition-colors">
                    ↗
                  </span>
                </a>
                <span className="block text-[11px] font-mono text-ink-3 mt-0.5">
                  Instructor: {edu.name} &middot; Covers: {edu.focusArea}
                </span>
                <p className="text-ink-2 text-xs leading-relaxed mt-1 font-sans">
                  {edu.recommendedFor}
                </p>
              </div>

              <a
                href={edu.url}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded border border-hairline bg-surface-2 hover:bg-surface-3 text-ink-2 hover:text-ink-1 font-mono text-[11px] transition-colors"
              >
                <span>Open YouTube</span>
                <span>↗</span>
              </a>
            </div>
          ))}
        </div>
      </div>
      )}
    </section>
  );
}
