export default function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 md:px-8 py-12 text-white relative">
      {/* Blurred overlay for readability */}
      <div
        className="absolute inset-0 w-full h-full z-0 pointer-events-none"
        style={{
          backdropFilter: "blur(12px)",
          background: "rgba(20,16,40,0.32)",
        }}
      />

      <div className="relative z-10">
        <h1 className="text-4xl font-bold mb-6 text-white">
          About Notes From a B Tech Brain
        </h1>

        <p className="text-lg text-white/90 leading-relaxed mb-4">
          Notes From a B Tech Brain is a digital thinking space built at the
          intersection of engineering, curiosity, creativity, and becoming.
        </p>

        <p className="text-lg text-white/90 leading-relaxed mb-4">
          What started as a small LinkedIn newsletter slowly evolved into
          something larger: a living archive of questions, experiments,
          observations, breakdowns, rebuilds, and late-night realizations.
        </p>

        <p className="text-lg text-white/90 leading-relaxed mb-6">
          Some pieces explore technology and engineering. Others explore
          identity, ambition, burnout, uncertainty, learning, or the strange
          emotional side of growing up in the digital age.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4 text-white">
          What This Space Is
        </h2>

        <p className="text-lg text-white/90 leading-relaxed mb-4">
          This is not a polished productivity blog. It is not a perfect
          technical publication either.
        </p>

        <ul className="list-disc pl-6 space-y-2 text-white/90 text-lg mb-4">
          <li>curiosity meets confusion</li>
          <li>logic meets emotion</li>
          <li>and growth happens in public</li>
        </ul>

        <p className="text-lg text-white/90 leading-relaxed mb-6">
          It’s a space for thinking in public.
          <br />
          A place where engineering, creativity, identity, ambition,
          uncertainty, and experimentation are all allowed to exist together.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4 text-white">
          What You’ll Find Here
        </h2>

        <ul className="list-disc pl-6 space-y-2 text-white/90 text-lg mb-6">
          <li>
            Curiosity Series → puzzles, rabbit holes, and strange questions
          </li>
          <li>
            Science vs. Sci-fi → where imagination meets real technology
          </li>
          <li>
            Tech Demystified → difficult ideas explained simply
          </li>
          <li>
            Behind the Scenes → honest documentation of building publicly
          </li>
          <li>
            Girlhood Arc Series → reflections on identity, STEM, and growth
          </li>
          <li>
            Monthly Themes → curated explorations around evolving ideas
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-10 mb-4 text-white">
          Why This Exists
        </h2>

        <p className="text-lg text-white/90 leading-relaxed mb-6">
          Because learning is rarely linear.
          <br />
          Because curiosity deserves space outside exams and algorithms.
          <br />
          Because there should be room online for people who are both
          analytical and emotional, ambitious and uncertain, technical and
          creative at the same time.
          <br />
          <br />
          This site exists as documentation:
          not of perfection,
          but of progression.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4 text-white">
          The Philosophy
        </h2>

        <p className="text-lg text-white/90 leading-relaxed mb-6">
          Build things.
          <br />
          Question things.
          <br />
          Explain things.
          <br />
          Feel things.
          <br />
          Repeat.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4 text-white">
          The Builder Behind It
        </h2>

        <p className="text-lg text-white/90 leading-relaxed mb-4">
          The site is created and maintained by{" "}
          <span className="font-semibold">Zainab Shujat</span>, a CSE AI/ML
          student exploring technology, writing, systems, storytelling, and
          digital experiences through both code and reflection.
        </p>

        <p className="text-lg text-white/90 leading-relaxed mb-6">
          Everything here, from the writing system to the evolving platform
          itself, is being built and refined in public.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4 text-white">
          Ongoing Evolution
        </h2>

        <div className="mb-10">
          <p className="text-white/90 text-lg mb-2">
            Notes From a B Tech Brain is intentionally unfinished.
          </p>

          <ul className="list-disc pl-6 space-y-2 text-white/90 text-lg">
            <li>
              <span className="font-semibold">v0.1</span> → Static blog
              beginnings
            </li>

            <li>
              <span className="font-semibold">v0.3</span> → Structured content
              systems
            </li>

            <li>
              <span className="font-semibold">v0.5</span> → Navigation & UX
              redesigns
            </li>

            <li>
              <span className="font-semibold">v0.7</span> → Engagement features
              & interaction
            </li>

            <li>
              <span className="font-semibold">v0.9</span> → Backend publishing &
              platform shift
            </li>
          </ul>

          <p className="text-white/90 text-lg mt-4">
            Every redesign, feature, article, and experiment reflects a
            different stage of learning.
            <br />
            The platform grows alongside the person building it.
            <br />
            <br />
            And it’s still becoming.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-10 mb-4 text-white">
          Portfolio
        </h2>

        <p className="text-lg text-white/90 leading-relaxed mb-6">
          If you want to see what I’m building beyond writing:
          <br />
          <span role="img" aria-label="point right">
            👉
          </span>{" "}
          <a
            href="https://zainabshujat.dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-600 dark:text-blue-300 font-medium hover:text-blue-800 dark:hover:text-blue-400 transition-colors"
          >
            zainabshujat.dev
          </a>
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4 text-white">
          Let’s Connect
        </h2>

        <p className="text-lg text-white/90 leading-relaxed">
          If something here resonates,
          <br />
          or you’re building something of your own—
          <br />
          Let’s talk.
          <br />
          I’m always up for real conversations.
        </p>
      </div>
    </main>
  );
}