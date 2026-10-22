/**
 * Reels and their companion pages.
 *
 * Each reel on Instagram gets a page here with the full explanation and
 * its sources, so people coming from the bio link land on the same story
 * they just watched. Content mirrors the reel's save-worthy carousel.
 */

/** Profile URL for the "Follow" buttons across /reels and the homepage. */
export const INSTAGRAM_URL: string | null = "https://www.instagram.com/notes.fromabtechbrain/";

export type ReelPillar = "decoded" | "wonder";

export const PILLARS: Record<ReelPillar, { label: string; blurb: string }> = {
  decoded: {
    label: "Decoded",
    blurb: "How everyday things actually work, from onions to browser extensions.",
  },
  wonder: {
    label: "I wonder why…",
    blurb: "Questions about the brain, attention and the way we perceive things.",
  },
};

export type Reel = {
  slug: string;
  title: string;
  pillar: ReelPillar;
  /** The line the reel opens on. */
  hook: string;
  date: string;
  cover: string;
  /** Accent colour, taken from the reel's carousel. */
  accent: string;
  /** Link to the reel itself once it's posted. */
  instagram?: string;
  /** Which block, if any, comes before the steps (as in the carousel). */
  lead?: "stat" | "list";
  steps: { heading: string; body: string }[];
  stat?: { big: string; heading: string; body: string };
  list?: { title: string; items: { icon: string; title: string; body: string }[] };
  closer: string;
  sources: string[];
  related?: { label: string; href: string }[];
};

export const REELS: Reel[] = [
  {
    slug: "candy",
    title: "This candy is glass. You can eat it.",
    pillar: "decoded",
    hook: "And every slice has the same face.",
    date: "2026-10-21",
    cover: "/assets/reels/candy.webp",
    accent: "#ff7ab8",
    steps: [
      {
        heading: "Sugar, syrup, water. 150°C.",
        body: "Hard candy is boiled to the “hard crack” stage, about 146–154°C. By then almost all the water is gone.",
      },
      {
        heading: "Crystals? No. Glass.",
        body: "Sugar wants to snap back into crystals. Corn syrup gets in the way, so it cools into an amorphous solid, the same kind of solid as window glass.",
      },
      {
        heading: "Pulled, over and over.",
        body: "Pulling and folding the warm candy traps tiny air bubbles. That's what turns clear candy white and satiny.",
      },
      {
        heading: "The picture is built huge.",
        body: "Candy makers assemble the face from coloured strips into a log as wide as your head. Every strip runs the whole length.",
      },
      {
        heading: "Then it's stretched pencil-thin.",
        body: "They roll and pull the log longer and thinner. The picture shrinks, but because every strip shrinks together, it never breaks.",
      },
      {
        heading: "Chop. Same face. Every time.",
        body: "This is Japanese Kintarō-ame, a candy tradition that goes back to the Edo period. Cut anywhere and the face is there.",
      },
    ],
    closer: "Food is secretly science.",
    sources: [
      "Photos: Asanagi (CC0), nakimusi (CC BY 2.0) via Wikimedia Commons",
      "Footage: Dishant Babariya, cottonbro studio, Magda Ehlers (Pexels)",
    ],
  },
  {
    slug: "onions",
    title: "Why onions make you cry",
    pillar: "decoded",
    hook: "You're cutting onions wrong. Your eyes are being gassed.",
    date: "2026-10-21",
    cover: "/assets/reels/onions.webp",
    accent: "#b6ff6a",
    steps: [
      {
        heading: "Two chemicals, kept apart.",
        body: "Inside every onion cell, sulfur compounds and the enzyme that attacks them are stored in separate compartments. Separate rooms.",
      },
      {
        heading: "Your knife breaks the walls.",
        body: "They mix. A second enzyme, lachrymatory-factor synthase (LFS), turns the product into a gas: syn-propanethial-S-oxide, the onion's tear gas.",
      },
      {
        heading: "The gas finds your eyes.",
        body: "It irritates the nerve endings in your cornea. Your eyes think something is burning and flood with tears to wash it out.",
      },
    ],
    stat: {
      big: "2002",
      heading: "The tear-gas enzyme was found this recently.",
      body: "Imai et al. described it in Nature. In 2013 the team won an Ig Nobel Prize for it.",
    },
    list: {
      title: "How to win",
      items: [
        { icon: "❄️", title: "Chill it first", body: "20–30 minutes in the fridge. Cold slows the reaction, so less gas escapes." },
        { icon: "🔪", title: "Use a sharp knife", body: "A clean cut breaks fewer cells than a blunt one crushing them." },
        { icon: "🌱", title: "Cut the root last", body: "The root end is especially rich in the compounds. Leave it." },
        { icon: "💨", title: "Bonus: airflow", body: "A fan or a cooker hood blows the gas away from your face." },
      ],
    },
    closer: "Next time, the onion loses.",
    sources: [
      "Imai S. et al., “An onion enzyme that makes the eyes water,” Nature 419, 685 (2002)",
      "Ig Nobel Prize in Chemistry, 2013",
    ],
  },
  {
    slug: "incognito",
    title: "Incognito doesn't make you invisible",
    pillar: "decoded",
    hook: "Three people can still see your tab.",
    date: "2026-10-20",
    cover: "/assets/reels/incognito.webp",
    accent: "#8ab4f8",
    lead: "list",
    list: {
      title: "Who can still see you",
      items: [
        { icon: "🌐", title: "The website", body: "Everything you do on it, especially if you log in." },
        { icon: "📶", title: "Whoever runs the Wi-Fi", body: "School, office, café. They can see which sites you visit." },
        { icon: "🛰️", title: "Your internet provider", body: "Same: which sites. HTTPS hides what's on the page, not where you went." },
      ],
    },
    steps: [
      {
        heading: "What it actually hides.",
        body: "Your history, cookies, site data and form entries, from other people using the same device, once you close every Incognito window. Downloads and bookmarks stay.",
      },
      {
        heading: "Not a cloak. A fake mustache.",
        body: "It stops your device remembering. It does nothing to stop the internet seeing you.",
      },
    ],
    stat: {
      big: "2024",
      heading: "Google agreed to delete billions of records.",
      body: "Settling the Brown v. Google lawsuit, Google agreed to destroy billions of data records collected from private browsing.",
    },
    closer: "Use it for gifts, not for hiding.",
    sources: [
      "Google Chrome Help, “How Incognito mode works”",
      "Brown v. Google LLC settlement (N.D. Cal., 2024)",
    ],
    related: [{ label: "Computer Networks notebook", href: "/notes/computer-networks" }],
  },
  {
    slug: "time-flies",
    title: "Why does time fly as we grow up?",
    pillar: "wonder",
    hook: "Your summers are getting shorter. It's not your fault. It's your brain.",
    date: "2026-10-19",
    cover: "/assets/reels/time-flies.webp",
    accent: "#ffcf7a",
    lead: "stat",
    stat: {
      big: "½",
      heading: "At 1, six months was half your life.",
      body: "At 20, it's barely a fortieth. Every year is a smaller slice of everything you've lived, so it feels smaller.",
    },
    steps: [
      {
        heading: "Childhood is full of firsts.",
        body: "First friendships. First fears. Everything is new, and your brain saves new things in rich detail.",
      },
      {
        heading: "Then life gets familiar.",
        body: "Same route, same desk, same week. The brain stops saving details. Days become templates instead of stories.",
      },
      {
        heading: "Fewer memories, shorter years.",
        body: "When you look back, a year with few distinct memories feels compressed, even though it was just as long.",
      },
    ],
    list: {
      title: "Slow it down again",
      items: [
        { icon: "✨", title: "Do one new thing a week", body: "New place, new food, new route. Firsts get remembered." },
        { icon: "📓", title: "Write one line a day", body: "Turns templates back into stories." },
        { icon: "👀", title: "Notice something small", body: "Even briefly. Like right now." },
      ],
    },
    closer: "Life didn't get shallow. It got familiar.",
    sources: [
      "The proportional theory of time perception",
      "Research on novelty and memory (e.g. David Eagleman)",
    ],
    related: [{ label: "Read the full essay", href: "/post/why-timespeeds-as-age" }],
  },
  {
    slug: "chrome-extensions",
    title: "What is a Chrome extension, really?",
    pillar: "decoded",
    hook: "This little piece could read everything you type.",
    date: "2026-10-18",
    cover: "/assets/reels/chrome-extensions.webp",
    accent: "#ffc14d",
    steps: [
      {
        heading: "A tiny program inside your browser.",
        body: "It's built from web code (HTML, CSS, JavaScript) plus one file, manifest.json, that tells Chrome what it's allowed to do.",
      },
      {
        heading: "It sits on top of every page.",
        body: "Its scripts can run inside the sites you open. That's how ad blockers, grammar checkers and dark-mode tools work everywhere.",
      },
      {
        heading: "Websites are walled off.",
        body: "A website only sees itself. It can't read your other tabs. An extension with access can see across all of them.",
      },
      {
        heading: "That's why Chrome asks first.",
        body: "“Read and change all your data on all websites” sounds scary because it is. It's a key to every site you visit.",
      },
    ],
    stat: {
      big: "400K",
      heading: "users hit by one hijacked update.",
      body: "In December 2024, attackers phished the developer of the Cyberhaven extension, pushed a malicious update, and stole logged-in session data from about 400,000 users.",
    },
    list: {
      title: "Stay safe",
      items: [
        { icon: "🔐", title: "Site access: “On click”", body: "Extensions → Details → Site access. It only runs when you tap it." },
        { icon: "🧹", title: "Delete what you don't use", body: "Every extension is a key you've handed out." },
        { icon: "⭐", title: "Trust the developer", body: "Known publishers, real reviews, recent updates." },
        { icon: "👀", title: "Read the permission prompt", body: "Does a calculator need “all your data”?" },
      ],
    },
    closer: "Only hand keys to people you trust.",
    sources: [
      "Chrome for Developers, “Extensions” and “Manifest file format”",
      "Cyberhaven incident disclosure, December 2024",
    ],
  },
];

export function getReel(slug: string): Reel | undefined {
  return REELS.find((r) => r.slug === slug);
}
