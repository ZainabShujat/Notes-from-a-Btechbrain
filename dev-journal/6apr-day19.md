---
title: "Dev Journal – Day 19"
date: "2026-04-06"
summary: "Homepage Polish, Post Card Redesign, and Blog Readability Fixes"
---


# 📝 Day 19 – April 6, 2026

**Focus:** Homepage & Navigation Redesign, Card Visual Identity, and Blog Readability

Today was a marathon session of UI and UX upgrades, touching nearly every part of the site:

- 🚀 **Hero Section & Navigation Overhaul**
	- Rebuilt the homepage hero section for clarity and focus.
	- Updated navigation: made the "Start Here" button much larger and more prominent in the navbar, with a glowing effect for instant attention.
	- Removed all floating/hover "Start Here" buttons for a cleaner, less distracting experience.

- ✨ **Section & Panel Visuals**
	- Transformed the "Start Here" section into a glass blur panel with a border glow, making it stand out as the main call-to-action.
	- Added a guiding line: “Pick based on how you feel, not what you think you should read.”
	- Rewrote and restructured the "Start Here" page for clarity, emotion, and a more inviting flow.

- 🪄 **Post Card Redesign**
	- Made post cards uniform in size and aspect ratio for a consistent grid.
	- Banner images are now the full visual identity of each card—fully visible, centered, never cropped or blurred.
	- Category tags are now more translucent and always pinned to the top-left corner.
	- Card content (title, excerpt, meta) is now a subtle overlay at the bottom, with a gradient fade for readability.
	- Added a featured card option: the first card can be larger or span two columns for extra emphasis.

- 🖱️ **Micro-Interactions & Animation**
	- Added subtle but premium hover animations: cards lift, images zoom, and the CTA button glows and lifts on hover.
	- CTA button text changed to “Dive in →” for a more confident, on-brand vibe.

- 🏷️ **Category & Tag Polish**
	- Made tags more translucent and visually balanced, so they never overpower the card image.

- 📝 **Blog Content Readability**
	- Forced pure black text for all blog articles, removing all text shadows and color overrides.
	- Tracked down and fixed global CSS that was making text grey/white (via `color: var(--muted)` on p/li/small in globals.css).
	- Scoped a `.blog-content` class and CSS rule to enforce black text and no shadow, while restoring Tailwind prose formatting for proper spacing, headings, and structure.

- 🐛 **Debugging & Iteration**
	- Multiple rounds of micro-tweaks to text color, overlays, and card layout based on live feedback and screenshots.
	- Ensured all changes worked in both light and dark mode, and that no global style leaks affected the blog content.

---

**Takeaway:**
A full visual and UX makeover, from navigation to content, can transform the feel of a site. Today’s changes make the blog more inviting, readable, and visually consistent—ready for new readers and future growth.
