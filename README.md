# 🧠 Notes From a B Tech Brain  
**A student-built digital magazine exploring technology, world events, and personal growth – from a B.Tech student’s perspective.**

## 📈 Analytics & SEO
- **Google Analytics:** Integrated for real-time traffic, engagement, and audience insights.
- **Google Search Console:** Connected for search performance monitoring and site health.
- **Dynamic Open Graph (OG) Images:** Next.js Edge-rendered custom social cards for every post and feed item.

---

## 🎯 Project Vision

**Live at:** [https://btechbrain.zainabshujat.dev/](https://btechbrain.zainabshujat.dev/)

*Notes From a B Tech Brain* is a living digital magazine that has evolved from a simple newsletter into a fully-functional platform featuring **50+ published articles** across a structured "5 Worlds" architecture. What started as three weekly newsletter streams has grown into a comprehensive student publication.

The platform is structured into 5 Core Worlds:
- **✍️ Notes** – Essays, explorations, and reflections
- **🌍 Worlds of Work** – Career exploration from the inside
- **🌀 Wonder** – A Daily Feed timeline of strange internet connections and observations
- **📖 Books** – Long-form writing in progress
- **🎮 Games** – Interactive logic and physics games

---

## 💡 What This Project Does

A fully-functional Next.js platform that:
- Serves as a **digital archive** of 50+ published articles
- Features an interactive **Brain Map** (force-directed graph) linking recurring ideas
- Runs a custom chronological **Daily Feed** timeline with likes and shareability
- Implements **responsive design** optimized for all device sizes
- Provides flawless **Light & Dark mode** toggling using CSS-first variable architecture
- Deployed continuously via **Vercel** with custom domain and analytics

---

## ⚙️ Current Stack

| Layer | Technology | Purpose |
|-------|-------------|----------|
| **Framework** | Next.js 16 (App Router) | React-based framework with server components |
| **Frontend** | React 19 + TypeScript | Modern component-based architecture |
| **Styling** | Tailwind CSS v4 | Utility-first responsive design system |
| **Content** | Markdown + gray-matter | File-based content with frontmatter parsing |
| **Visualization**| d3-force & framer-motion | Interactive visual graphs and smooth animations |
| **Typography** | @tailwindcss/typography | Enhanced prose styling for article content |
| **Hosting** | Vercel | Continuous deployment, CDN, and custom domain |

---

## 🚀 Current Status (August 2026)

* ✅ **v1.1.0 Live**: Fully migrated to the 5 Worlds architecture
* ✅ Dynamic Open Graph (OG) Image generation using Next.js Edge runtime
* ✅ Interactive **Brain Map** visualizing idea constellations
* ✅ **Wonder** section completely overhauled into an X-style timeline feed
* ✅ Games Hub integrated with embedded interactive iframe projects
* ✅ CSS Theme Engine refactored for flawless Dark/Light mode integration
* ✅ Orphaned legacy routes and structures (Builds, Community, old Admin) cleaned up

---

## 📊 Content Statistics

- **Total Articles:** 50+  
- **Active Worlds:** 5 
- **Latest Milestone:** v1.1.0 Released (August 2026)  
- **Content Types:** Personal essays, tech explainers, daily micro-observations, interactive maps
- **Engagement:** Views and likes are integrated via Supabase.

---

## 🛠️ Key Features

- **Brain Map Visualization:**
  - A client-side, interactive, force-directed graph built with d3-force that maps out the underlying connections between articles, tags, and overarching themes.

- **Wonder Daily Feed:**
  - A chronological, scrollable timeline for micro-observations. Complete with individual routing, persistent liking, and quick-share copy links.

- **Dynamic Open Graph Generation:**
  - Automatic rendering of social media preview cards that match the site's dark mode aesthetic, generated on the fly when sharing links on iMessage, Twitter, or LinkedIn.

- **CSS Theme Engine:**
  - Robust dark/light mode toggling utilizing Tailwind v4 and raw CSS variables, ensuring 0 flicker and seamless transitions across all complex UI layers.

- **Games Hub:**
  - Fully playable embedded web games seamlessly integrated into the site layout for an interactive break from reading.

- **Visible Views & Likes:**
  - Each post displays real-time view and like counts via a Supabase backend.

- **Category-Based Navigation:**  
  Clean dynamic routes (`/post/[slug]`, `/category/[category]`, `/wonder/[id]`).

---

## 🔮 Future Enhancements

- **Subscriptions Backend:**  
  Rebuilding the newsletter subscriber infrastructure using Supabase and Resend.
- **Reading Time Estimates:**  
  Automatic calculation of article reading time.  
- **Tag System Expansion:**  
  Tying the frontend tag filters directly into the Brain Map node structures.

---

## 🧭 Long-Term Vision

The project will evolve into a personal storytelling and tech-magazine ecosystem that:  
- Blends writing, design, and engineering.  
- Demonstrates how a student can build a media brand from scratch.  
- Eventually becomes a **portfolio piece**, a **blog**, and a **living resume** – all in one.

---

## 👩‍💻 Author

**Zainab Shujat**  
> *"Frontend taught me how to create. Backend taught me how to sustain.  
This project is where both sides of my brain finally meet."*

---

## 🗓️ Development Journey

| Phase | Goal | Status |
|-------|------|--------|
| **Phase 1-4** | Initial frontend, markdown processing, 50+ articles | ✅ Completed |
| **Phase 5-8** | Production deployment, SEO, Theme controls, Categories | ✅ Completed |
| **Phase 9** | Supabase views/likes and initial database connection | ✅ Completed |
| **Phase 10** | Brain Map force-graph visualization | ✅ Completed |
| **Phase 11** | Site Architecture simplification (5 Worlds) | ✅ Completed |
| **Phase 12** | Wonder Timeline, OG Images, Games Hub | ✅ Completed |
| **Phase 13** | Newsletter subscriptions rebuilt | 🔜 Next Up |

---

## 🎓 Technical Learnings

This project demonstrates:
- **Next.js 16 App Router** patterns with server and client components
- **TypeScript** for type-safe React development
- **Tailwind CSS v4** utility-first styling approach
- **Next.js ImageResponse (Edge)** for dynamic OG card generation
- **d3-force integration** with React for data visualization
- **Markdown processing** with gray-matter and remark
- **Continuous deployment** workflows with Vercel
