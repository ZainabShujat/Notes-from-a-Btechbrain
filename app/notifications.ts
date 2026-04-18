  
// This file contains update notifications for the site.
// Add new updates as objects in the array below.

const notifications = [
  {
    id: 24,
    date: "2026-04-18",
    title: "Related Articles UI Polished",
    message: "Related articles cards are now perfect squares, larger, and span the full width of the content area. The category pill is lighter and more transparent for a softer look.",
    version: "v0.9.2",
    color: "#2563eb", // blue
  },
  {
    id: 23,
    date: "2026-04-18",
    title: "About Page Rewritten",
    message: "The About section now has a more personal, conversational introduction, clearer sections on what this space is, why it exists, and what I'm building toward. Portfolio and contact links remain as before.",
    version: "v0.9.2",
    color: "#2563eb", // blue
  },
  {
    id: 20,
    date: "2026-04-06",
    title: "Full UI/UX Makeover & Card Redesign",
    message: "Homepage hero and navigation rebuilt for clarity. 'Start Here' is now a glowing glass panel. Navbar button is bigger and bolder. All floating/hover Start Here buttons removed for focus.",
    version: "v0.9.1",
    color: "#a855f7", // purple
  },
  {
    id: 21,
    date: "2026-04-06",
    title: "Cards & Visual Identity Overhaul",
    message: "Post cards are now uniform in size, with full banner images, translucent tags, and a featured card option. Card overlays and gradient fades improve readability. Subtle hover animations and glowing CTAs add polish.",
    version: "v0.9.1",
    color: "#a855f7", // purple
  },
  {
    id: 22,
    date: "2026-04-06",
    title: "Blog Readability & Content Polish",
    message: "All blog content now uses pure black text with no shadow for maximum readability. Fixed global CSS overrides and restored proper prose formatting for paragraphs and spacing.",
    version: "v0.9.1",
    color: "#a855f7", // purple
  },
  {
    id: 19,
    date: "2026-02-05",
    title: "v0.9.0 Released!",
    message: "Custom domain (zainabshujat.dev) is live, new admin section, improved themes, and notifications tab added!",
    version: "v0.9.0",
    color: "#22c55e", // green
  },
  {
    id: 18,
    date: "2026-02-01",
    title: "'I Wonder Why' Category Launched",
    message: "Added all 17 'I Wonder Why' posts and organized them into subcategories for easier browsing.",
    version: "v0.9.0",
    color: "#22c55e", // green
  },
  {
    id: 17,
    date: "2026-01-10",
    title: "Custom Domain & SEO Integration",
    message: "Got GitHub Student Pack, bought custom domain, set up subdomain, and integrated Google Analytics & Search Console.",
    version: "v0.9.0",
    color: "#22c55e", // green
  },
  {
    id: 16,
    date: "2026-01-03",
    title: "Supabase Auth & Comment System Attempt",
    message: "Planned and scaffolded comment/community system with Supabase, but rolled back due to build blockers. Hard reset to clean state.",
    version: "v0.9.0",
    color: "#22c55e", // green
  },
  {
    id: 15,
    date: "2026-01-02",
    title: "Home Page UX & Universal Theming",
    message: "Home page navigation reworked, universal theming for all category cards, and snowflake polish for winter theme.",
    version: "v0.9.0",
    color: "#22c55e", // green
  },
  {
    id: 14,
    date: "2025-12-28",
    title: "Admin Panel & Community Tab Logic",
    message: "Admin dashboard polished, theme controls improved, and Community tab logic added (with under construction message).",
    version: "v0.8.0",
    color: "#2563eb", // blue
  },
  {
    id: 13,
    date: "2025-12-25",
    title: "Sitemap & Build Troubleshooting",
    message: "Dynamic sitemap.xml route built, Googlebot debugging, and Next.js 16+ Turbopack/webpack build fixes.",
    version: "v0.8.0",
    color: "#2563eb", // blue
  },
  {
    id: 12,
    date: "2025-12-24",
    title: "Dark Mode & Theme Tweaks",
    message: "Full dark mode support, theme component improvements, and UI/UX bug fixes for banners, cards, and layout.",
    version: "v0.8.0",
    color: "#2563eb", // blue
  },
  {
    id: 11,
    date: "2025-12-23",
    title: "Platform Glow-Up: Search, Stats, SEO",
    message: "Added series previews, full-content search, sitemap.xml, robots.txt, Google Search Console, and Supabase-powered view/like counters.",
    version: "v0.8.0",
    color: "#2563eb", // blue
  },
  {
    id: 10,
    date: "2025-12-22",
    title: "Winter Theme & Snowflakes",
    message: "Site got a winter makeover: icy gradients, snowflake animations, and frosted category cards. Major theme and accessibility polish.",
    version: "v0.8.0",
    color: "#2563eb", // blue
  },
  {
    id: 9,
    date: "2025-12-04",
    title: "Upload Marathon: 50 Editions!",
    message: "Uploaded and formatted all 50 newsletter editions as Markdown with banners and categories. Seven months of writing, now organized!",
    version: "v0.7.0",
    color: "#f59e42", // orange
  },
  {
    id: 8,
    date: "2025-12-03",
    title: "Goodbye Netlify, Hello Vercel",
    message: "Switched deployment to Vercel. Instantly stable, fast, and smooth. The project feels like a real publication!",
    version: "v0.7.0",
    color: "#f59e42", // orange
  },
  {
    id: 7,
    date: "2025-12-01",
    title: "Category Crisis & Site Implosion",
    message: "Added 8 new categories and restructured posts. Major Next.js errors, but the blog now has real weight and structure.",
    version: "v0.6.0",
    color: "#a855f7", // purple
  },
  {
    id: 6,
    date: "2025-11-30",
    title: "Homepage & Mobile Menu Fixes",
    message: "Homepage grid, banners, and typography polished. Mobile hamburger menu added. More newsletter posts converted to Markdown.",
    version: "v0.5.0",
    color: "#f43f5e", // pink
  },
  {
    id: 5,
    date: "2025-11-04",
    title: "Visual Polish & Hero Gradient",
    message: "Hero section got a new blue-green gradient. Design now feels more like 'me' and less like a template.",
    version: "v0.4.0",
    color: "#0ea5e9", // sky
  },
  {
    id: 4,
    date: "2025-11-02",
    title: "Cloud Database Connected",
    message: "MongoDB Atlas cluster set up, first document created, and backend connected. Environment variables and Netlify config added.",
    version: "v0.3.0",
    color: "#facc15", // yellow
  },
  {
    id: 3,
    date: "2025-10-27",
    title: "First Express Server & MongoDB Atlas",
    message: "Connected Express server to MongoDB Atlas. The blog is officially full-stack-in-progress!",
    version: "v0.2.0",
    color: "#6366f1", // indigo
  },
  {
    id: 2,
    date: "2025-10-01",
    title: "Backend Mindset Shift",
    message: "Started exploring backend tech: Node.js, Express, MongoDB, and APIs. Planning to make the blog full stack.",
    version: "v0.1.0",
    color: "#14b8a6", // teal
  },
  {
    id: 1,
    date: "2025-09-28",
    title: "Project Kickoff!",
    message: "Launched Notes From a BTech Brain with Next.js, Tailwind, and Markdown support. First deployment live on Netlify!",
    version: "v1.0.0",
    color: "#fbbf24", // gold
  },
];

export default notifications;
