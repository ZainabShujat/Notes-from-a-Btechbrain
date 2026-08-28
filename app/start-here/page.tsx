"use client";
import Link from "next/link";
import BackButton from "../components/BackButton";
import PageHeader from "../components/ui/PageHeader";
import { motion } from "framer-motion";

const moodIcons: Record<string, string> = {
  "If you’re curious": "🧩",
  "If you’re curious (about tech and the future)": "🤖",
  "If you feel lost (or are questioning the system)": "🧭",
  "If you need to feel seen": "👀",
  "If you feel lost (or want a fresh start)": "🌱",
  "If you’re building (or rebuilding)": "🔨",
};

const articles = [
  {
    title: "The Puzzle That Broke My Brain (In the Best Way)",
    slug: "the-puzzle-that-broke-my-brain",
    mood: "If you’re curious",
    description:
      "Dive into a mathematically rare coincidence and follow a mind-bending puzzle that rekindles a love for math and tech. Perfect for anyone who enjoys playful, beautiful logic.",
  },
  {
    title: "Internship Illusions",
    slug: "internship-illusions",
    mood: "If you feel lost (or are questioning the system)",
    description:
      "A candid look at the realities of student internships, especially unpaid ones, and the lessons about self-worth, burnout, and financial awareness that come with them. Great for students navigating early career choices.",
  },
  {
    title: "Girlhood in Defense Mode",
    slug: "girlhood-in-defense-mode",
    mood: "If you need to feel seen",
    description:
      "An honest reflection on growing up as a girl, the invisible calculations for safety, and how caution becomes second nature. This piece resonates with anyone who’s ever felt the weight of unspoken rules.",
  },
  {
    title: "A Beginning Amidst the Chaos",
    slug: "a-beginning-amidst-the-chaos",
    mood: "If you feel lost (or want a fresh start)",
    description:
      "The author introduces their newsletter as a way to process life’s chaos, offering a space for reflection, tech updates, and honest college diaries. Ideal for readers seeking community and clarity.",
  },
  {
    title: "September In a Nutshell",
    slug: "september-in-a-nutshell",
    mood: "If you’re building (or rebuilding)",
    description:
      "A month-in-review that captures unexpected changes, small wins, and personal growth through setbacks. Encourages readers to find meaning in both progress and loss.",
  },
  {
    title: "💰Crypto and the Future of Digital Currency",
    slug: "crypto-and-the-future-of-digital-currency",
    mood: "If you’re curious (about tech and the future)",
    description:
      "A clear, approachable guide to what crypto is, why it matters, and how it’s changing the way we think about money. Great for anyone wanting to demystify digital currencies.",
  },
];


const grouped = articles.reduce((acc, article) => {
  if (!acc[article.mood]) acc[article.mood] = [];
  acc[article.mood].push(article);
  return acc;
}, {} as Record<string, typeof articles>);

export default function StartHerePage() {
  return (
    <main className="w-full max-w-4xl mx-auto px-4 sm:px-8 md:px-12 py-16 md:py-24">
      <div>
        <div className="mb-8">
          <BackButton />
        </div>
        <PageHeader
          eyebrow="Pick based on how you feel, not what you think you should read"
          title="Start Here"
          description="Not sure where to begin? Pick what feels closest to you right now."
        />

        <div className="flex flex-col gap-14">
          {/* 🧩 Feeling curious? */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-3 text-left"
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">🧩</span>
              <span className="text-2xl md:text-3xl font-bold text-ink-1">Feeling curious?</span>
            </div>
            <Link href="/post/the-puzzle-that-broke-my-brain" className="text-xl md:text-2xl font-bold text-ink-1 hover:text-accent-soft transition-colors underline underline-offset-2">
              The Puzzle That Broke My Brain
            </Link>
            <p className="text-ink-2 text-base md:text-lg mt-1">A beautiful logic rabbit hole that’ll mess with your brain (in a good way).</p>
            <span className="text-sm text-accent-soft mt-2"><Link href="/post/the-puzzle-that-broke-my-brain">→ Read</Link></span>
          </motion.section>
          {/* 🧭 Feeling stuck or questioning everything? */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-3 text-left"
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">🧭</span>
              <span className="text-2xl md:text-3xl font-bold text-ink-1">Feeling stuck or questioning everything?</span>
            </div>
            <Link href="/post/internship-illusions" className="text-xl md:text-2xl font-bold text-ink-1 hover:text-accent-soft transition-colors underline underline-offset-2">
              Internship Illusions
            </Link>
            <p className="text-ink-2 text-base md:text-lg mt-1">What no one tells you about internships, burnout, and self-worth.</p>
            <span className="text-sm text-accent-soft mt-2"><Link href="/post/internship-illusions">→ Read</Link></span>
          </motion.section>
          {/* 👀 Need to feel understood? */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-3 text-left"
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">👀</span>
              <span className="text-2xl md:text-3xl font-bold text-ink-1">Need to feel understood?</span>
            </div>
            <Link href="/post/girlhood-in-defense-mode" className="text-xl md:text-2xl font-bold text-ink-1 hover:text-accent-soft transition-colors underline underline-offset-2">
              Girlhood in Defense Mode
            </Link>
            <p className="text-ink-2 text-base md:text-lg mt-1">On growing up with invisible rules and constant awareness.</p>
            <span className="text-sm text-accent-soft mt-2"><Link href="/post/girlhood-in-defense-mode">→ Read</Link></span>
          </motion.section>
          {/* 🌱 Trying to restart? */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-3 text-left"
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">🌱</span>
              <span className="text-2xl md:text-3xl font-bold text-ink-1">Trying to restart?</span>
            </div>
            <Link href="/post/a-beginning-amidst-the-chaos" className="text-xl md:text-2xl font-bold text-ink-1 hover:text-accent-soft transition-colors underline underline-offset-2">
              A Beginning Amidst the Chaos
            </Link>
            <p className="text-ink-2 text-base md:text-lg mt-1">A reset. A fresh start. A space to figure things out again.</p>
            <span className="text-sm text-accent-soft mt-2"><Link href="/post/a-beginning-amidst-the-chaos">→ Read</Link></span>
          </motion.section>
          {/* 🔨 Rebuilding your life? */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-3 text-left"
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">🔨</span>
              <span className="text-2xl md:text-3xl font-bold text-ink-1">Rebuilding your life?</span>
            </div>
            <Link href="/post/september-in-a-nutshell" className="text-xl md:text-2xl font-bold text-ink-1 hover:text-accent-soft transition-colors underline underline-offset-2">
              September In a Nutshell
            </Link>
            <p className="text-ink-2 text-base md:text-lg mt-1">Small wins, setbacks, and what growth actually looks like.</p>
            <span className="text-sm text-accent-soft mt-2"><Link href="/post/september-in-a-nutshell">→ Read</Link></span>
          </motion.section>
          {/* 🤖 Curious about the future? */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-3 text-left"
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">🤖</span>
              <span className="text-2xl md:text-3xl font-bold text-ink-1">Curious about the future?</span>
            </div>
            <Link href="/post/crypto-and-the-future-of-digital-currency" className="text-xl md:text-2xl font-bold text-ink-1 hover:text-accent-soft transition-colors underline underline-offset-2">
              Crypto and the Future of Digital Currency
            </Link>
            <p className="text-ink-2 text-base md:text-lg mt-1">A no-BS intro to crypto and why it actually matters.</p>
            <span className="text-sm text-accent-soft mt-2"><Link href="/post/crypto-and-the-future-of-digital-currency">→ Read</Link></span>
          </motion.section>
        </div>
      </div>
    </main>
  );
}
