"use client";

import { useState } from "react";
import Button from "./ui/Button";

export default function Hero() {
  const videos = [
    "/videos/brain-hero-1.mp4",
    "/videos/brain-hero-2.mp4",
    "/videos/brain-hero-3.mp4",
  ];

  const [currentVideo, setCurrentVideo] = useState(0);

  return (
    <section className="relative w-full min-h-[80vh] md:min-h-[95vh] text-white overflow-hidden">

      {/* VIDEO */}
      <video
        key={currentVideo}
        autoPlay
        muted
        playsInline
        onEnded={() =>
          setCurrentVideo((prev) => (prev + 1) % videos.length)
        }
        className="absolute inset-0 w-full h-full object-cover bg-base"
      >
        <source src={videos[currentVideo]} type="video/mp4" />
      </video>

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-b from-base/20 via-sunken/30 to-base/80 pointer-events-none" />

      {/* CONTENT */}
      <div className="relative z-10 min-h-[80vh] md:min-h-[95vh] px-4">

        {/* TITLE BLOCK */}
        <div className="text-center pt-12 md:pt-20">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight">
            <span className="text-white">Notes From a </span>
            <span className="text-highlight font-extrabold">
              BTech Brain
            </span>
          </h1>

          <p className="mt-6 max-w-3xl mx-auto text-base sm:text-lg md:text-2xl text-ink-1/90">
            For when you're thinking too much...
            and still don't have answers
          </p>

          <div className="mt-4 text-sm md:text-base text-ink-2 tracking-wide">
            106 Editions • 15+ Series • Since April 2025
          </div>
        </div>

        {/* BUTTONS */}
        <div className="absolute bottom-12 md:bottom-20 left-1/2 -translate-x-1/2 flex flex-col sm:flex-row gap-4 justify-center items-center w-full px-4">

          <Button
            href="/browse"
            variant="pill-accent"
            size="lg"
            className="w-full sm:w-auto sm:min-w-[260px]"
          >
            🔎 Explore Topics
          </Button>

          <Button
            href="/series-hub"
            variant="pill"
            size="lg"
            className="w-full sm:w-auto sm:min-w-[260px]"
          >
            📖 Past Series
          </Button>

          <Button
            href="/themes"
            variant="pill"
            size="lg"
            className="w-full sm:w-auto sm:min-w-[260px]"
          >
            📅 Monthly Themes
          </Button>

        </div>
      </div>
    </section>
  );
}