---
title: "Behind the Build: The Backend Detour & Designing the Pulse"
slug: "behind-the-build-backend-detour-designing-the-pulse"
date: "2025-12-17"
category: "behind-the-scenes"
excerpt: "From cloud databases and environment-variable chaos to late-night design decisions — the middle stretch where the site learned to breathe, feel, and look like home."
banner: "/assets/banners/behind-build-2.webp"
---

**Behind the Scenes — Part 2 (Days 4–6)**  
*The Making of Notes From a B. Tech Brain — Website Edition*  
*(Nov 2 – Nov 4 – Nov 30)*

If Part 1 was construction, Part 2 is wiring, polish, mood swings, and small miracles at 1 a.m.

---

### **Day 4 — 2nd November 2025**

Day 4 began with confusion and ended with connection — literally.

When I opened my project after disappearing for weeks, my brain had reset itself. MongoDB Atlas felt unfamiliar again. Environment variables felt like riddles. Netlify’s interface felt like it had shape-shifted since the last time I touched it.

But I kept going.

I created Cluster0 on MongoDB Atlas, installed the VS Code extension, wrote little playground snippets, and for the first time ever… ran a query that wrote directly into the cloud.

Seeing *“First Post from Zee”* inside the Data Explorer felt unreal. Like I had just placed my flag on a tiny moon.

Then came the server setup: `server.js`, `.env`, `mongoose.connect()` — and the beautiful message:

**“MongoDB connected successfully.”**

It felt like my project finally inhaled its first breath.

But the part that drained my soul? Netlify environment variables.

No “Site Settings.” Only “Project Configuration.” Team variables locked behind a paywall. Backend not deploying automatically with frontend.

It was a mess. But it also forced a realization:

My backend needed its own home — **Render**.

By the end of Day 4, nothing was visually different on the site. But under the hood? The heart was beating. Quietly. But beating.

---

### **Day 5 — 4th November 2025**

After the backend brain-fry, Day 5 was pure design therapy.

No APIs. No clusters. Just aesthetic justice.

The hero gradient had been bothering me for weeks. The old blue→pink felt too soft, too washed out, too “template-ish.” So I reworked it into a sharper blue→green transition — cooler, cleaner, more *Zee building her own corner of the internet*.

Then I played with depth. Indigo, cyan, emerald… until it finally felt like a creator’s desk at midnight: smart, electric, warm.

And honestly? Seeing that gradient live on Netlify gave me more dopamine than half the backend work.

This was the day I remembered something important:

**Design isn’t decoration. Design is identity.**

And for a blog that carries both my words and my world, identity matters.

Day 5 ended with no big commits, no complex logic — just a site that felt more like me than it ever had before.

---

### **Day 6 — 30th November 2025**

After almost a month of radio silence, I came back to the project feeling guilty, rusty… and weirdly excited.

Day 6 was pure cleanup mode. No fancy features, just a long overdue *“fix everything that annoys me”* session.

Here’s what finally got done:

**✔ Homepage Layout Fixes**  
The post cards were ridiculously wide — like “why is this a landscape canvas?” wide. I tightened the grid, fixed max-widths, added spacing. Instant professionalism.

**✔ Banner Rendering Fixed**  
No more awkward crops. No more cut-off edges. Just clean banners sitting exactly where they should.

**✔ Text Width Aligned With Banner**  
This single change made every article feel 10× more readable. Visual consistency matters more than people think.

**✔ Mobile Navbar (finally)**  
The navbar was ghosting on small screens — rude. Now there’s a hamburger toggle. Smooth and stable.

**✔ More Markdown Posts Added**  
I started converting my Volume I editions into `.md` files, and honestly? It felt like cataloguing memories.

Day 6 taught me something I already knew but needed to relearn:

**Small UI fixes resurrect your attachment to a project.**

By the end of the day, the site felt polished. Clean. Confident. And for the first time, I thought:

*“Okay… this looks like a real publication now.”*

---

### **A Sneak Peek into Part 3 (Days 7–9)**

If Part 2 was about polish… Part 3 is where things break, rebuild, and transform completely.

Coming next:

- The day everything crashed because of categories  
- The switch from Netlify to Vercel  
- Fixing missing slugs, invisible banners, and runtime bugs  
- The marathon uploads of all 50 editions  
- The moment the website finally became a living archive  

Part 3 is chaos and victory wrapped together — the final sprint before the site became the home it was always meant to be.
