export default function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 md:px-8 py-12">
      <h1 className="text-4xl font-bold mb-6 text-slate-900 dark:text-slate-100">About Me</h1>

      <p className="text-lg text-slate-900 dark:text-slate-100 leading-relaxed mb-4">
        Hi, I’m <span className="font-semibold">Zainab Shujat</span> — a B.Tech CSE (AIML) student,
        an aspiring web developer, and the writer behind 
        <span className="font-semibold"> Notes From a B.Tech Brain</span>.
        I build things, write things, and try to make sense of the world around me through both.
      </p>

      <p className="text-lg text-slate-900 dark:text-slate-100 leading-relaxed mb-6">
        This blog is where I explore technology, geopolitics, student life, soft skills,
        and personal growth. It started as a weekly newsletter on LinkedIn and slowly 
        grew into a space where I document my journey — the wins, the chaos, and the learning.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4 text-slate-900 dark:text-slate-100">What I Do</h2>
      <ul className="list-disc pl-6 space-y-2 text-slate-900 dark:text-slate-100 text-lg">
        <li>Write weekly editions on tech, world events, and personal reflections</li>
        <li>Build projects with HTML, CSS, JavaScript, React, and Next.js</li>
        <li>Study Machine Learning and AI fundamentals</li>
        <li>Document life as a girl in STEM</li>
        <li>Share insights on productivity, communication, and emotional intelligence</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-10 mb-4 text-slate-900 dark:text-slate-100">My Goals</h2>
      <p className="text-lg text-slate-900 dark:text-slate-100 leading-relaxed mb-6">
        I want to grow as a developer, become financially independent, and build a space 
        where students like me feel seen — especially those who don’t fit neatly into 
        “college clubs” but still dream big.  
      </p>

      <p className="text-lg text-slate-900 dark:text-slate-100 leading-relaxed mb-6">
        Long-term? I want to publish a book, build useful products, and create a body of 
        work I’m proud of. This site is the first step.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4 text-slate-900 dark:text-slate-100">Site Version Timeline</h2>
      <div className="mb-10">
        <ul className="list-disc pl-6 space-y-2 text-slate-900 dark:text-slate-100 text-lg">
          <li><span className="font-semibold">v0.1.0</span> — Initial static blog outline, basic structure and landing page.</li>
          <li><span className="font-semibold">v0.2.0</span> — Added multiple pages for richer navigation and content separation.</li>
          <li><span className="font-semibold">v0.3.0</span> — Introduced categories for better content organization.</li>
          <li><span className="font-semibold">v0.4.0</span> — Enabled individual posts, making the blog dynamic.</li>
          <li><span className="font-semibold">v0.5.0</span> — Implemented navigation bar and improved user flow.</li>
          <li><span className="font-semibold">v0.6.0</span> — Launched "Coming Soon" section to preview upcoming features.</li>
          <li><span className="font-semibold">v0.7.0</span> — Added likes and views, introducing interactivity and engagement.</li>
          <li><span className="font-semibold">v0.7.5</span> — Added browse by keywords, categories, and title for easier content discovery.</li>
          <li><span className="font-semibold">v0.9.0</span> — Introduced themes and admin section for a more robust, interactive experience.</li>
          <li>
            <span className="font-semibold">v0.9.0</span>
            — Buying custom domain and setting up the full site.
          </li>
          <li>
            <span className="relative inline-flex items-center">
              <span className="font-semibold">v1.0.0</span>
              <span className="ml-2 relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
            </span>
            — Full community page and commenting mechanism.
          </li>
        </ul>
        <p className="text-slate-900 dark:text-slate-100 text-base mt-4">
          <span className="font-semibold">Why v0.9.0?</span> Each version marks a meaningful step in the site's growth. v0.9.0 reflects a platform that’s not just a blog, but a growing community with dynamic content, admin tools, and user engagement features. The journey continues!
        </p>
      </div>
      <h2 className="text-2xl font-semibold mt-10 mb-4 text-slate-900 dark:text-slate-100">Portfolio</h2>
      <p className="text-lg text-slate-900 dark:text-slate-100 leading-relaxed mb-6">
        Curious about my work? Check out my portfolio site:
        {" "}
        <a
          href="https://zainabshujat.dev/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-blue-600 dark:text-blue-300 font-medium hover:text-blue-800 dark:hover:text-blue-400 transition-colors"
        >
          zainabshujat.dev
        </a>
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4 text-slate-900 dark:text-slate-100">Let’s Connect</h2>
      <p className="text-lg text-slate-900 dark:text-slate-100 leading-relaxed">
        Reach out on{" "}
        <a href="https://www.linkedin.com/in/zainab-shujat-web-developer" 
           target="_blank" 
           className="underline text-purple-600 dark:text-purple-300 font-medium">
          LinkedIn
        </a>{" "}
        — I’d love to talk, learn, and grow together.
      </p>
    </main>
  );
}
