# 🧠 Notes From a B Tech Brain  
**A student-built digital magazine and technical engineering archive exploring computer science, systems engineering, personal growth, and technology.**

[![Next.js 16](https://img.shields.io/badge/Next.js-16.1.1-black?logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![Status](https://img.shields.io/badge/Release-v1.2.0-purple)](#-current-status-october-2026)

---

## 🎯 Project Vision

**Live at:** [https://btechbrain.zainabshujat.dev/](https://btechbrain.zainabshujat.dev/)

*Notes From a B Tech Brain* is a living digital magazine and technical learning ecosystem designed from a student's perspective. It bridges editorial storytelling with deep, rigorous engineering scholarship. What began as a personal newsletter has expanded into a complete publication platform featuring **50+ essays** alongside an in-depth **academic engineering notebook library** built for B.Tech CS coursework and GATE preparation.

### The Core Worlds:
- **✍️ Editions** – Essays, editorial reflections, and technical deep-dives
- **📓 The Notebooks (`/notes`)** – Peer-researched, curriculum-mapped CS notebooks (Operating Systems, DBMS, Networks, COA, etc.)
- **🌍 The Work We Do** – Industry analysis, systems design, and engineering practices from the inside
- **🌀 Wonder** – A chronological micro-observation timeline exploring strange internet artifacts and human-computer interactions
- **📖 Books** – Reading notes and long-form literature guides
- **🎮 Games** – Interactive logic and physics minigames built for interactive breaks

---

## 🚀 What's New in v1.2.0 (October 2026)

### 1. 📓 Student Engineering Notebooks (`/notes`)
- **Realistic Physical Skeuomorphic Design**: Visual notebooks featuring ring bindings, margin rule lines, realistic paper textures, bookmark ribbons, and interactive peek dialogs.
- **GATE CS 2027 Syllabus Alignment**: Mapped directly against core engineering curricula with verified numerical problems, standard textbook references, and PYQs.
- **Dedicated Subtopic Cheat Sheets**: Every lesson contains a rapid-revision modal summarizing the core principle, must-remember invariants, exam traps, and printable markdown summaries.
- **"Don't Feel Dumb" In-Context Glossary**: Interactive terminology system throughout lesson prose providing 1-sentence explanations and everyday analogies.
- **Chamfered Octagon Popups**: Distinctive clipped-corner octagon geometry (`clip-path`) styled across definition cards, cheat sheets, and site update dialogs.

### 2. ⚡ Interactive CS Laboratory Simulators
- **Comprehensive CPU Scheduling Simulator**: Live Gantt chart, timeline execution, and metrics (waiting time, turnaround time, response time) for:
  - FCFS (First-Come, First-Served)
  - SJF (Shortest Job First - Non-preemptive)
  - SRTF (Shortest Remaining Time First - Preemptive)
  - Non-Preemptive Priority Scheduling
  - Preemptive Priority Scheduling
  - Round Robin (with configurable time quantum $q$)
- **Banker's Algorithm & Deadlock Avoidance**: Interactive allocation/max/available resource matrix with dynamic request evaluation and safe sequence computation.
- **Relational DBMS Analyzers**: Serializability conflict-graph visualizer and BCNF/3NF normalization step-by-step validator.
- **Virtual Memory & Page Replacement**: Interactive FIFO, LRU, and Optimal page replacement comparison tables with Belady's anomaly illustrations.

---

## ⚙️ Technical Architecture & Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Framework** | Next.js 16 (App Router + Turbopack) | Server Components, static generation (`SSG`), and Edge API routes |
| **Language** | TypeScript 5 | End-to-end type safety across lesson data, schemas, and components |
| **Frontend UI** | React 19 | Client interactivity, portals, and custom modal architectures |
| **Styling** | Tailwind CSS v4 + Vanilla CSS | Raw CSS variables, dynamic color themes, and custom polygon `clip-path` geometry |
| **Visualizations** | d3-force, SVG & HTML5 Canvas | Brain Map graph and real-time execution simulators |
| **Typography** | Editorial Serif & Handwriting Fonts | Editorial layout combining Caveat, serif headlines, and monospace code blocks |
| **Search & SEO** | JSON-LD, Sitemap generator, OpenGraph Edge | Comprehensive search engine indexing and social cards |
| **Hosting** | Vercel | Global edge CDN, automated CI/CD pipeline |

---

## 🛠️ Key Architectural Highlights

### 📐 Clipped Octagon Design System
```css
/* Chamfered Octagonal Popup Geometry */
.popup-octagon {
  clip-path: polygon(
    14px 0%, calc(100% - 14px) 0%,
    100% 14px, 100% calc(100% - 14px),
    calc(100% - 14px) 100%, 14px 100%,
    0% calc(100% - 14px), 0% 14px
  );
}
```
All floating popups (glossary cards, rapid revision sheets, and dev updates) utilize clean polygon chamfering paired with outer `filter: drop-shadow(...)` wrappers for depth.

### 🔔 Universal Notification & Updates System
- Universal bell button in top header bar with live notification pulse.
- Global event-driven architecture (`toggle-updates`) allowing any component across the site to trigger updates.
- Smart route sensitivity: floating bells auto-hide on reading screens (`/notes/*`) to preserve an uncluttered manuscript reading experience.

---

## 📦 Getting Started Locally

### Prerequisites
- Node.js `v20+` or `v24+`
- npm `v10+`

### Installation
```bash
# 1. Clone the repository
git clone https://github.com/ZainabShujat/Btech-blog.git
cd notes-brain

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the application.

### Validation & Production Build
```bash
# Run TypeScript compilation check
npx tsc --noEmit

# Run Next.js production build
npm run build
```

---

## 👩‍💻 Author

**Zainab Shujat**  
- Website: [https://zainabshujat.dev/](https://zainabshujat.dev/)  
- Publication: [https://btechbrain.zainabshujat.dev/](https://btechbrain.zainabshujat.dev/)  

> *"Frontend taught me how to create. Backend taught me how to sustain.  
> This project is where both sides of my brain meet."*

---

## 📄 License
This project is open-source under the [MIT License](LICENSE).
