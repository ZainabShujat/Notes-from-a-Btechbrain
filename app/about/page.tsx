export default function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 md:px-8 py-12 text-white relative">
      {/* Blurred overlay for readability */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none" style={{backdropFilter: 'blur(12px)', background: 'rgba(20,16,40,0.32)'}} />
      <div className="relative z-10">
        <h1 className="text-4xl font-bold mb-6 text-white">About Me</h1>

        <p className="text-lg text-white/90 leading-relaxed mb-4">
          Hi, I’m <span className="font-semibold">Zainab Shujat</span> — a B.Tech CSE (AIML) student, builder, and writer behind <span className="font-semibold">Notes From a B.Tech Brain</span>.
        </p>
        <p className="text-lg text-white/90 leading-relaxed mb-4">
          I build things. I write things. And somewhere in between, I try to make sense of what I’m learning, feeling, and figuring out in real time.
        </p>
        <p className="text-lg text-white/90 leading-relaxed mb-6">
          This blog started as a weekly LinkedIn newsletter. Now, it’s a growing digital space — part blog, part thinking lab, part documentation of a life that refuses to stay in one box.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4 text-white">What This Space Is</h2>
        <p className="text-lg text-white/90 leading-relaxed mb-4">
          This isn’t just a “tech blog.”
        </p>
        <ul className="list-disc pl-6 space-y-2 text-white/90 text-lg mb-4">
          <li>curiosity meets confusion</li>
          <li>logic meets emotion</li>
          <li>and growth happens in public</li>
        </ul>
        <p className="text-lg text-white/90 leading-relaxed mb-6">
          I write about tech, student life, personal growth, and the weird in-between phases no one really prepares you for.<br/>
          Some posts are structured.<br/>
          Some are messy.<br/>
          All of them are honest.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4 text-white">What I Do</h2>
        <ul className="list-disc pl-6 space-y-2 text-white/90 text-lg mb-6">
          <li>Write weekly editions across tech, world events, and reflections</li>
          <li>Build projects using HTML, CSS, JavaScript, React, and Next.js</li>
          <li>Study AI/ML while trying to actually understand it (not just pass exams)</li>
          <li>Document my journey as a girl in STEM</li>
          <li>Break down ideas around productivity, communication, and emotional intelligence</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-10 mb-4 text-white">Why This Exists</h2>
        <p className="text-lg text-white/90 leading-relaxed mb-6">
          I’m not trying to be the “perfect student.” I’m trying to become someone who builds, thinks, and expresses clearly.<br/>
          And I know there are others like me—<br/>
          people who don’t fit neatly into college boxes,<br/>
          but still want to create something meaningful.<br/>
          This space is for them too.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4 text-white">What I’m Building Toward</h2>
        <div className="mb-6">
          <div className="mb-2 font-semibold">Short term:</div>
          <ul className="list-disc pl-6 space-y-2 text-white/90 text-lg mb-4">
            <li>Becoming a better developer</li>
            <li>Becoming financially independent</li>
            <li>Building things that actually matter</li>
          </ul>
          <div className="mb-2 font-semibold">Long term:</div>
          <ul className="list-disc pl-6 space-y-2 text-white/90 text-lg">
            <li>Publishing a book</li>
            <li>Creating products people genuinely use</li>
            <li>Building a body of work I’m proud of</li>
          </ul>
          <p className="text-white/90 text-lg mt-4">This site? It’s not a side project. It’s the foundation.</p>
        </div>

        <h2 className="text-2xl font-semibold mt-10 mb-4 text-white">Site Evolution</h2>
        <div className="mb-10">
          <p className="text-white/90 text-lg mb-2">This site didn’t appear fully formed. It was built, broken, and rebuilt—version by version.</p>
          <ul className="list-disc pl-6 space-y-2 text-white/90 text-lg">
            <li><span className="font-semibold">v0.1</span> → Static blog</li>
            <li><span className="font-semibold">v0.3</span> → Structured content</li>
            <li><span className="font-semibold">v0.5</span> → Navigation & UX improvements</li>
            <li><span className="font-semibold">v0.7</span> → Engagement (likes, views)</li>
            <li><span className="font-semibold">v0.9</span> → Themes, admin system, full platform shift</li>
          </ul>
          <p className="text-white/90 text-lg mt-4">Each version is a snapshot of me learning in public.<br/>And I’m not done yet.</p>
        </div>

        <h2 className="text-2xl font-semibold mt-10 mb-4 text-white">Portfolio</h2>
        <p className="text-lg text-white/90 leading-relaxed mb-6">
          If you want to see what I’m building beyond writing:<br/>
          <span role="img" aria-label="point right">👉</span> <a
            href="https://zainabshujat.dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-600 dark:text-blue-300 font-medium hover:text-blue-800 dark:hover:text-blue-400 transition-colors"
          >
            zainabshujat.dev
          </a>
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4 text-white">Let’s Connect</h2>
        <p className="text-lg text-white/90 leading-relaxed">
          If something here resonates,<br/>
          or you’re building something of your own—<br/>
          Let’s talk.<br/>
          I’m always up for real conversations.
        </p>
      </div>
    </main>
  );
}
