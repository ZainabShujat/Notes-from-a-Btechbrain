---
title: "Behind the Build — Breaking, Rebuilding & Going Live"
slug: "behind-the-build-breaking-rebuilding-going-live"
date: "2025-12-21"
category: "behind-the-scenes"
excerpt: "The sprint, the crash, the pivot, and the moment the site finally became a living archive."
banner: "/assets/banners/behind-build-3.webp"
tags:
- tech-journey
- learning
- adaptation
- reflection
- systems
- milestones
- storytelling
---

**Behind the Scenes — Part 3 (Days 7–9)**  
*The Making of Notes From a B. Tech Brain — Website Edition*  
*(Dec 1 – Dec 3 – Dec 4)*

If Part 2 was about polish, Part 3 is the storm before the publication — the sprint, the crash, the pivot, the rebuild.

This is the arc where the website becomes a real home.

---

### **Day 7 — 1st December 2025**  
**The Day Everything Broke… and Then Made Sense**

Day 7 started with a big decision — one I kept delaying for months:

**Switching from MERN back to pure frontend.**

It wasn’t a downgrade. It was a clarity move.

The backend dream was beautiful. Databases, API endpoints, and admin editors — but it was slowing the entire ship down. Every time the blog grew faster than the backend, I felt stuck in a loop of *“wait till the server catches up.”*

And then reality hit:

This is a writing publication. A home for newsletters. Not a fintech dashboard.

The backend wasn’t serving the project anymore — it was delaying it.

So I let it go.

I stripped the architecture back to its cleanest form: **Next.js + Markdown + Git-powered publishing.** Simple. Elegant. Fast. And perfect for Volume I.

Then I introduced categories, thinking it would be an innocent organising step.

Yeah… no.

Pages broke. Routing broke. Some posts disappeared. Some pages refused to render entirely. Netlify started spitting errors at me with the confidence of someone who pays rent.

It was chaos.

But also the push I needed. Because once I reorganised the folder structure, cleaned the slugs, and mapped categories to routes, the website suddenly felt properly designed — not just arranged.

Day 7 was the day I accepted that simplicity isn’t just cleaner… sometimes it’s smarter.

---

### **Day 8 — 3rd December 2025**  
**The Great Migration: Netlify → Vercel**

Netlify was fine… until it wasn’t.

The moment I needed environment variables or backend linking or literally anything slightly advanced, Netlify turned into:

*“Please upgrade to the Pro Plan.”*

Absolutely not. I’m a student, not a SaaS donor.

Meanwhile, Vercel was sitting there offering:

- Better Next.js support  
- Cleaner logs  
- Seamless deployments  
- No membership guilt-tripping  
- A dashboard that doesn’t look like it was designed during a power cut  

So I moved.

The migration was instant. The relief was real.

But of course, the website decided to humble me immediately.

As soon as I deployed to Vercel:

- slugs broke  
- images disappeared  
- favicon went missing  
- build logs turned into a mystery novel  
- Next.js threw a tantrum about “missing pages that definitely existed”  

For a few minutes, the site looked like it wanted to retire permanently.

But slowly — and I mean slowly — we fixed each issue:

- Corrected folder paths  
- Rebuilt the public directory  
- Cleaned up TypeScript warnings  
- Reconnected dynamic routes  
- Regenerated slugs  
- Repaired category indexing  

By the end of Day 8, Vercel was running the site smoothly — clean build, stable routes, and consistent UI.

It felt like the project had finally moved into a real house after months of living in a rented room.

---

### **Day 9 — 4th December 2025**  
**The Upload Marathon & The Final Homecoming**

Day 9 was the quietest chaos.

This was the day we uploaded:

**All. Fifty. Editions.**

Every category. Every banner. Every markdown file. Every slug.

Friday Insights. Tech Pulse. World Watch. Clarity Crisis. Tech Demystified. Financial Month. Girlhood & STEM. Milestones & Miscellaneous. The 50th Edition Special.

It was an archive-building marathon: hours of organising, renaming, checking dates, aligning banners, matching slugs, correcting typos, fixing spacing, attaching images, ensuring no markdown gets angry at an emoji.

And somewhere in that marathon, something shifted:

The site no longer felt like a *“project.”* It felt like a **publication.** A real one.

Scrolling through the homepage suddenly felt like scrolling through a year of my life — the growth, the confusion, the softness, the tech, the discipline, the girlhood, the building.

Every category looked like a book. Every edition looked like a chapter. Every page felt like a piece of the evolution.

By the end of Day 9, the website wasn’t just functional — it was alive.

The archive was complete. The structure was intentional. The identity was clear.

And for the first time, I stepped back from the screen and thought:

*“This is ready to be seen.”*

---

### **Closing — The Chapter Before the Next Chapter**

Part 3 marks the end of the *foundation era.*

From here, the site isn’t something I’m building — it’s something I’m growing.

What comes after Day 9?

You’ll see:

- polishing the category covers into book-style cards  
- connecting this site to my new portfolio  
- starting Volume II with stronger structure  
- adding dev journals as a section  
- and maybe, one day… bringing back the full-stack dream with a proper backend when the time is right  

But for now, the foundation is done. The archive stands complete. The home exists.

And the girl who once scribbled a “Loading…” doodle in April… now has a full publication living online.

If I hadn’t kept the dates intact, it would almost look like this was all made in under a fortnight. But building something this layered while juggling college, an internship, assignments, and life is never that simple. That’s exactly why the timeline matters. It shows the pace, the pauses, the context, and the quiet persistence behind every pixel.

The site didn’t happen overnight. But it happened — and that’s what makes it real.
