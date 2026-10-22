"use client";

import { useEffect, useState } from "react";

const ROOT_ID = "hm-root";

function setSmil(root: HTMLElement, running: boolean) {
  root.querySelectorAll<SVGSVGElement>("svg[data-smil]").forEach((svg) => {
    if (running) svg.unpauseAnimations();
    else svg.pauseAnimations();
  });
}

/**
 * Homepage motion controls:
 * - the hero's pause/play button (freezes CSS and SMIL animation),
 * - scroll reveal for sections marked `data-reveal`: each fades in the first
 *   time it enters the viewport, then stays. Without JS nothing is hidden.
 */
export default function HomeMotion() {
  const [running, setRunning] = useState(true);

  useEffect(() => {
    const root = document.getElementById(ROOT_ID);
    if (!root) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setRunning(false);
      return;
    }

    const targets = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("hm-in");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 }
    );
    targets.forEach((el) => {
      // Only hide what is still below the fold, so nothing visible blinks out.
      if (el.getBoundingClientRect().top > window.innerHeight * 0.92) {
        el.classList.add("hm-armed");
        observer.observe(el);
      }
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const root = document.getElementById(ROOT_ID);
    if (!root) return;
    root.classList.toggle("hm-still", !running);
    setSmil(root, running);
  }, [running]);

  return (
    <button
      type="button"
      className="hm-motion-toggle"
      onClick={() => setRunning((r) => !r)}
      aria-pressed={!running}
      aria-label={running ? "Pause the homepage animation" : "Play the homepage animation"}
    >
      {running ? "Pause motion" : "Play motion"}
    </button>
  );
}
