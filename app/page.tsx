import Link from "next/link";
import { getCombinedPosts, type PostMeta } from "../lib/posts";
import { OBSERVATIONS } from "./wonder/data";
import { SUBJECT_NOTEBOOKS } from "../lib/notebooks/data";
import Hero from "./components/Hero";

export const metadata = {
  title: "Notes From a B.Tech Brain — Ideas worth following",
  description:
    "A student-built digital publication connecting curious essays, careful technical notes, interactive experiments, and the ideas between them.",
};

function excerpt(post: PostMeta) {
  if (post.excerpt?.trim()) return post.excerpt.trim();
  return (post.content || "").replace(/[#>*_`\[\]()]/g, " ").replace(/\s+/g, " ").trim().slice(0, 190);
}

function formatDate(value?: string) {
  if (!value) return "";
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? ""
    : new Intl.DateTimeFormat("en", { month: "long", day: "numeric", year: "numeric" }).format(date);
}

function StoryLink({ post, className = "" }: { post: PostMeta; className?: string }) {
  return (
    <Link href={`/post/${post.slug}`} className={`group ${className}`}>
      <h3 className="text-ink-1 transition-colors group-hover:text-accent-soft">{post.title}</h3>
      {excerpt(post) && <p className="mt-2 text-ink-3 leading-relaxed">{excerpt(post)}</p>}
      {formatDate(post.date) && <time className="mt-3 block font-mono text-[11px] uppercase tracking-wider text-ink-3/75">{formatDate(post.date)}</time>}
    </Link>
  );
}

export default async function Home() {
  const posts = await getCombinedPosts();
  const editions = posts.filter((post) => post.slug && post.title && post.category?.toLowerCase() !== "i-wonder-why");
  const featured = editions[0];
  const recentEditions = editions.slice(1, 4);
  const notebooks = SUBJECT_NOTEBOOKS.filter((book) => !book.isLocked && book.status !== "planned").slice(0, 3);
  const wonderNotes = OBSERVATIONS.slice(0, 3);
  const topics: { eyebrow: string; title: string; story?: PostMeta; href?: string; linkLabel?: string }[] = [
    { eyebrow: "Systems & the invisible", title: "What happens beneath the interface?", href: "/notes/operating-systems", linkLabel: "Open the Operating Systems notebook" },
    { eyebrow: "Mind, habit & attention", title: "Why do ordinary things feel the way they do?", story: posts.find((p) => p.slug === "why-the-brain-loves-patterns") },
    { eyebrow: "Making & meaning", title: "What do we learn by building in public?", story: posts.find((p) => p.slug === "vibe-coding-without-losing-brain") },
    { eyebrow: "Student life, honestly", title: "How does ambition fit inside a real life?", story: posts.find((p) => p.slug === "when-passion-meets-paycheck") },
  ];

  return (
    <main className="text-ink-2">
      <Hero />

      <section className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-12 pb-24 md:pb-32" aria-labelledby="latest-heading">
        <div className="mb-8 flex items-end justify-between gap-4 border-b border-hairline pb-4">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent-soft">From the publication</p>
            <h2 id="latest-heading" className="mt-2 text-2xl font-semibold tracking-tight text-ink-1 sm:text-3xl">Ideas to spend a little time with.</h2>
          </div>
          <Link href="/editions" className="hidden text-sm font-medium text-ink-3 underline decoration-hairline underline-offset-4 transition-colors hover:text-ink-1 sm:inline">All editions <span aria-hidden="true">↗</span></Link>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          {featured ? (
            <article className="relative flex min-h-[300px] flex-col justify-end overflow-hidden border border-hairline bg-surface-1 p-6 sm:min-h-[370px] sm:p-10">
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-70 dark:opacity-50" style={{ background: "radial-gradient(ellipse at 88% 18%, color-mix(in srgb, var(--color-accent) 18%, transparent), transparent 48%), linear-gradient(145deg, transparent 45%, color-mix(in srgb, var(--color-highlight) 7%, transparent))" }} />
              <div aria-hidden="true" className="pointer-events-none absolute right-[-2rem] top-[-3rem] hidden h-64 w-64 rounded-full border border-accent/15 sm:block"><span className="absolute left-1/2 top-1/2 h-2 w-2 rounded-full bg-highlight/70" /></div>
              <div className="relative max-w-xl">
                <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.2em] text-accent-soft">The latest edition <span className="px-2 text-ink-3/50">/</span> {featured.category?.replaceAll("-", " ")}</p>
                <Link href={`/post/${featured.slug}`} className="group">
                  <h3 className="max-w-2xl text-3xl font-semibold leading-[1.08] tracking-tight text-ink-1 transition-colors group-hover:text-accent-soft sm:text-5xl">{featured.title}</h3>
                  <p className="mt-5 max-w-lg text-base leading-relaxed text-ink-2 sm:text-lg">{excerpt(featured)}</p>
                  <span className="mt-8 inline-flex items-center gap-3 border-b border-accent/40 pb-1 text-sm font-semibold text-ink-1">Read the edition <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span></span>
                </Link>
              </div>
            </article>
          ) : <div className="border border-hairline p-8">New editions are on their way.</div>}

          <div className="flex flex-col justify-between">
            <div>
              <div className="mb-2 flex items-center justify-between">
                <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-3">More from the journal</h3>
                <span aria-hidden="true" className="text-highlight">✳</span>
              </div>
              <div className="divide-y divide-hairline">
                {recentEditions.map((post) => (
                  <StoryLink key={post.slug} post={post} className="block py-5 first:pt-4" />
                ))}
              </div>
            </div>
            <div className="mt-8 border-l-2 border-highlight/50 pl-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-3">A small observation</p>
              {wonderNotes[0] && <Link href={`/wonder/${wonderNotes[0].id}`} className="group mt-2 block">
                <h3 className="text-xl font-medium text-ink-1 group-hover:text-accent-soft">{wonderNotes[0].title}</h3>
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-3">{wonderNotes[0].body}</p>
                <span className="mt-3 inline-block text-xs font-semibold text-highlight">Follow the thought →</span>
              </Link>}
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-px border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-3">
          {wonderNotes.slice(1).map((note) => <Link key={note.id} href={`/wonder/${note.id}`} className="group bg-base p-5 transition-colors hover:bg-surface-1 sm:p-6">
            <time className="font-mono text-[10px] uppercase tracking-widest text-ink-3">Wonder · {formatDate(note.date)}</time>
            <h3 className="mt-3 text-lg font-medium leading-snug text-ink-1 group-hover:text-accent-soft">{note.title}</h3>
            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-3">{note.body}</p>
          </Link>)}
        </div>
      </section>

      <section className="border-y border-hairline bg-surface-1/50" aria-labelledby="notebooks-heading">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20 lg:px-12 lg:py-28">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent-soft">Made to learn by doing</p>
            <h2 id="notebooks-heading" className="mt-4 max-w-lg text-4xl font-semibold leading-[1.05] tracking-tight text-ink-1 sm:text-5xl">Good notes should change how a problem looks.</h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-ink-3">Student-built technical notebooks move from intuition to precise explanations, worked examples, and tools you can actually try.</p>
            <Link href="/notes" className="mt-7 inline-flex items-center gap-2 border-b border-ink-3/40 pb-1 text-sm font-semibold text-ink-1 hover:border-accent-soft">Step inside the notebooks <span aria-hidden="true">↗</span></Link>
          </div>
          <div className="space-y-0">
            {notebooks.map((book, index) => <Link href={`/notes/${book.slug}`} key={book.id} className="group grid gap-4 border-t border-hairline py-6 sm:grid-cols-[4rem_1fr_auto] sm:items-center sm:py-8">
              <span className="font-mono text-xs text-ink-3/70">0{index + 1}</span>
              <span>
                <span className="block text-2xl font-medium tracking-tight text-ink-1 transition-colors group-hover:text-accent-soft sm:text-3xl">{book.title}</span>
                <span className="mt-2 block max-w-xl text-sm leading-relaxed text-ink-3">{book.tagline}</span>
                {book.previewSnippets[0] && <span className="mt-3 inline-block border-l border-highlight/50 pl-3 font-mono text-xs text-ink-3">Inside: {book.previewSnippets[0].title}</span>}
              </span>
              <span className="hidden text-2xl text-ink-3 transition-transform group-hover:translate-x-1 sm:block" aria-hidden="true">→</span>
            </Link>)}
            <Link href="/notes/labs" className="mt-4 flex flex-col justify-between gap-4 border border-accent/25 bg-accent/5 p-6 transition-colors hover:bg-accent/10 sm:flex-row sm:items-center sm:p-7">
              <span><span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent-soft">Open the lab</span><span className="mt-2 block text-xl font-medium text-ink-1">Make the algorithm move.</span><span className="mt-1 block text-sm text-ink-3">Explore the interactive simulators for scheduling, memory, and more.</span></span>
              <span aria-hidden="true" className="text-2xl text-accent-soft">↗</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-24 sm:px-8 lg:px-12 lg:py-32" aria-labelledby="map-heading">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div className="relative order-2 aspect-[1.08] overflow-hidden border border-hairline bg-[#11121b] p-5 sm:p-8 lg:order-1" aria-label="Illustration of ideas connected across the publication">
            <div aria-hidden="true" className="absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(rgba(196,181,253,.32) .7px, transparent .7px)", backgroundSize: "19px 19px" }} />
            <svg viewBox="0 0 560 430" className="relative h-full w-full" fill="none" role="img" aria-labelledby="brain-map-illustration-title">
              <title id="brain-map-illustration-title">An editorial sketch of connected ideas: systems, memory, attention, making, and wonder</title>
              <g stroke="#a78bfa" strokeOpacity=".24" strokeWidth="1.2">
                <path d="M280 210 130 104M280 210 430 90M280 210 470 270M280 210 330 365M280 210 92 315M130 104 430 90M430 90 470 270M470 270 330 365M330 365 92 315M92 315 130 104" />
                <path d="M130 104 330 365M430 90 92 315" strokeOpacity=".1" />
              </g>
              <g fill="#171927" stroke="#8b7acb" strokeOpacity=".68">
                <circle cx="130" cy="104" r="33"/><circle cx="430" cy="90" r="26"/><circle cx="470" cy="270" r="31"/><circle cx="330" cy="365" r="24"/><circle cx="92" cy="315" r="27"/>
              </g>
              <circle cx="280" cy="210" r="49" fill="#29213c" stroke="#c4b5fd" strokeOpacity=".85" />
              <circle cx="280" cy="210" r="4" fill="#f5d47b" />
              <g fill="#d8d2eb" fontFamily="ui-monospace, monospace" fontSize="11" letterSpacing="1.5">
                <text x="95" y="110">SYSTEMS</text><text x="399" y="95">MEMORY</text><text x="441" y="276">ATTENTION</text><text x="306" y="370">MAKING</text><text x="55" y="320">WONDER</text>
              </g>
              <text x="280" y="205" fill="#fff" textAnchor="middle" fontFamily="ui-sans-serif, sans-serif" fontSize="14" fontWeight="600">one idea</text>
              <text x="280" y="225" fill="#c4b5fd" textAnchor="middle" fontFamily="ui-sans-serif, sans-serif" fontSize="14">leads to another</text>
              <g fill="#f5d47b" fillOpacity=".7"><circle cx="190" cy="150" r="2"/><circle cx="381" cy="182" r="1.5"/><circle cx="205" cy="310" r="1.7"/><circle cx="360" cy="316" r="1.5"/></g>
            </svg>
            <span className="absolute bottom-4 left-5 font-mono text-[9px] uppercase tracking-[0.2em] text-white/45 sm:bottom-6 sm:left-8">A map of recurring ideas · 01—∞</span>
          </div>
          <div className="order-1 lg:order-2">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-highlight">The ideas are connected</p>
            <h2 id="map-heading" className="mt-4 text-4xl font-semibold leading-[1.05] tracking-tight text-ink-1 sm:text-6xl">A publication with a mind of its own.</h2>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-2">An essay about memory sits beside a note on operating systems. A question about attention meets a story about making. The Brain Map follows those quiet threads across the archive.</p>
            <Link href="/map" className="mt-8 inline-flex items-center gap-3 text-sm font-semibold text-ink-1 group">Explore the Brain Map <span aria-hidden="true" className="text-highlight transition-transform group-hover:translate-x-1">→</span></Link>
          </div>
        </div>
      </section>

      <section className="border-t border-hairline bg-surface-1/40" aria-labelledby="breadth-heading">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="grid gap-8 border-b border-hairline pb-10 md:grid-cols-[0.7fr_1.3fr] md:items-end">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent-soft">A curious mind rarely stays in one lane</p>
            <h2 id="breadth-heading" className="max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight text-ink-1 sm:text-6xl">From the kernel to the corners of being human.</h2>
          </div>
          <div className="grid gap-x-12 md:grid-cols-2">
            {topics.map((topic, index) => <div key={topic.eyebrow} className="border-b border-hairline py-7 sm:py-9">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-3">0{index + 1} / {topic.eyebrow}</span>
              <p className="mt-3 text-xl font-medium leading-snug text-ink-1 sm:text-2xl">{topic.title}</p>
              {topic.href ? <Link href={topic.href} className="group mt-4 inline-flex items-center gap-2 text-sm text-ink-3 hover:text-ink-1">{topic.linkLabel}<span className="text-highlight transition-transform group-hover:translate-x-1" aria-hidden="true">→</span></Link> : topic.story ? <Link href={`/post/${topic.story.slug}`} className="group mt-4 inline-flex items-center gap-2 text-sm text-ink-3 hover:text-ink-1">{topic.story.title}<span className="text-highlight transition-transform group-hover:translate-x-1" aria-hidden="true">→</span></Link> : <Link href="/editions" className="mt-4 inline-flex items-center gap-2 text-sm text-ink-3 hover:text-ink-1">Find a thread in the editions <span className="text-highlight" aria-hidden="true">→</span></Link>}
            </div>)}
          </div>
          <div className="mt-14 flex flex-col items-start justify-between gap-6 border-t border-hairline pt-8 sm:flex-row sm:items-center">
            <p className="max-w-xl text-lg leading-relaxed text-ink-2">Follow a question, find a new one, and see where it takes you.</p>
            <Link href="/editions" className="inline-flex items-center gap-3 bg-accent-strong px-6 py-3 text-sm font-semibold text-on-accent transition-colors hover:bg-accent-soft">Explore the publication <span aria-hidden="true">↗</span></Link>
          </div>
          {wonderNotes[1] && <p className="mt-10 text-xs text-ink-3">Recently wondered: <Link href={`/wonder/${wonderNotes[1].id}`} className="underline decoration-hairline underline-offset-4 hover:text-ink-1">{wonderNotes[1].title}</Link></p>}
        </div>
      </section>
    </main>
  );
}
