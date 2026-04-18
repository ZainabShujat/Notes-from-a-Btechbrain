"use client";
import Link from "next/link";
import BackButton from "../components/BackButton";
import { useEffect, useRef } from "react";
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
  // Back button logic: go back if possible, else go home
  const hasHistory = useRef(false);
  useEffect(() => {
    if (window && window.history && window.history.length > 1) {
      hasHistory.current = true;
    }
  }, []);
  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = "/";
    }
  };
  return (
    <main className="w-full max-w-4xl mx-auto px-4 sm:px-8 md:px-12 py-16 text-white relative">
      {/* Blurred overlay for readability */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none" style={{backdropFilter: 'blur(7px)', background: 'rgba(20,16,40,0.22)'}} />
      <div className="relative z-10">
        <button
          type="button"
          onClick={handleBack}
          className="mb-8 inline-flex items-center gap-2 px-5 py-2.5 rounded bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium transition dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-100"
        >
          ← Back
        </button>
        <motion.h1
          className="text-6xl font-extrabold mb-4 text-white text-left"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Start Here
        </motion.h1>
        <motion.p
          className="text-xl text-purple-200 mb-2 font-medium text-left"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          Pick based on how you feel, not what you think you should read.
        </motion.p>
        <motion.p
          className="mb-14 text-2xl text-white/90 max-w-3xl text-left"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          Not sure where to begin? Pick what feels closest to you right now.
        </motion.p>

        <div className="space-y-16">
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
              <span className="text-3xl font-bold text-white">Feeling curious?</span>
            </div>
            <Link href="/post/the-puzzle-that-broke-my-brain" className="text-2xl font-bold text-white hover:text-blue-200 underline underline-offset-2">
              The Puzzle That Broke My Brain
            </Link>
            <p className="text-slate-200 text-lg mt-1">A beautiful logic rabbit hole that’ll mess with your brain (in a good way).</p>
            <span className="text-base text-slate-400 mt-2"><Link href="/post/the-puzzle-that-broke-my-brain">→ Read</Link></span>
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
              <span className="text-3xl font-bold text-white">Feeling stuck or questioning everything?</span>
            </div>
            <Link href="/post/internship-illusions" className="text-2xl font-bold text-white hover:text-blue-200 underline underline-offset-2">
              Internship Illusions
            </Link>
            <p className="text-slate-200 text-lg mt-1">What no one tells you about internships, burnout, and self-worth.</p>
            <span className="text-base text-slate-400 mt-2"><Link href="/post/internship-illusions">→ Read</Link></span>
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
              <span className="text-3xl font-bold text-white">Need to feel understood?</span>
            </div>
            <Link href="/post/girlhood-in-defense-mode" className="text-2xl font-bold text-white hover:text-blue-200 underline underline-offset-2">
              Girlhood in Defense Mode
            </Link>
            <p className="text-slate-200 text-lg mt-1">On growing up with invisible rules and constant awareness.</p>
            <span className="text-base text-slate-400 mt-2"><Link href="/post/girlhood-in-defense-mode">→ Read</Link></span>
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
              <span className="text-3xl font-bold text-white">Trying to restart?</span>
            </div>
            <Link href="/post/a-beginning-amidst-the-chaos" className="text-2xl font-bold text-white hover:text-blue-200 underline underline-offset-2">
              A Beginning Amidst the Chaos
            </Link>
            <p className="text-slate-200 text-lg mt-1">A reset. A fresh start. A space to figure things out again.</p>
            <span className="text-base text-slate-400 mt-2"><Link href="/post/a-beginning-amidst-the-chaos">→ Read</Link></span>
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
              <span className="text-3xl font-bold text-white">Rebuilding your life?</span>
            </div>
            <Link href="/post/september-in-a-nutshell" className="text-2xl font-bold text-white hover:text-blue-200 underline underline-offset-2">
              September In a Nutshell
            </Link>
            <p className="text-slate-200 text-lg mt-1">Small wins, setbacks, and what growth actually looks like.</p>
            <span className="text-base text-slate-400 mt-2"><Link href="/post/september-in-a-nutshell">→ Read</Link></span>
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
              <span className="text-3xl font-bold text-white">Curious about the future?</span>
            </div>
            <Link href="/post/crypto-and-the-future-of-digital-currency" className="text-2xl font-bold text-white hover:text-blue-200 underline underline-offset-2">
              Crypto and the Future of Digital Currency
            </Link>
            <p className="text-slate-200 text-lg mt-1">A no-BS intro to crypto and why it actually matters.</p>
            <span className="text-base text-slate-400 mt-2"><Link href="/post/crypto-and-the-future-of-digital-currency">→ Read</Link></span>
          </motion.section>
        </div>
      </div>
    </main>
  );
}
