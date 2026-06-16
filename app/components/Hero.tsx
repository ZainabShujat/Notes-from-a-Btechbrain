"use client";

import Link from "next/link";
import { useState } from "react";

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
        className="absolute inset-0 w-full h-full object-cover bg-[#05031a]"
      >
        <source src={videos[currentVideo]} type="video/mp4" />
      </video>

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#05031a]/20 via-[#1a1440]/25 to-[#1a1440]/60 pointer-events-none" />

      {/* CONTENT */}
      <div className="relative z-10 min-h-[80vh] md:min-h-[95vh] px-4">

        {/* TITLE BLOCK */}
        <div className="text-center pt-12 md:pt-20">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight">
            <span className="text-white">Notes From a </span>
            <span className="text-yellow-400 font-extrabold">
              BTech Brain
            </span>
          </h1>

          <p className="mt-6 max-w-3xl mx-auto text-base sm:text-lg md:text-2xl text-white/90">
            For when you're thinking too much...
            and still don't have answers
          </p>

          <div className="mt-4 text-sm md:text-base text-white/70 tracking-wide">
            106 Editions • 15+ Series • Since April 2025
          </div>
        </div>

        {/* BUTTONS */}
        <div className="absolute bottom-12 md:bottom-20 left-1/2 -translate-x-1/2 flex flex-col sm:flex-row gap-4 justify-center items-center w-full px-4">

          <Link
            href="/browse"
            className="flex items-center gap-3 px-8 md:px-16 py-3 w-full sm:min-w-[260px] sm:w-auto justify-center rounded-full bg-[#a21caf]/80 hover:bg-[#c026d3]/90 text-white font-semibold text-lg shadow-lg transition"
          >
            🔎 Explore Topics
          </Link>

          <Link
            href="/series-hub"
            className="flex items-center gap-3 px-8 md:px-16 py-3 w-full sm:min-w-[260px] sm:w-auto justify-center rounded-full bg-[#312e81]/80 hover:bg-[#3730a3]/90 text-white font-semibold text-lg shadow-lg transition"
          >
            📖 Past Series
          </Link>

          <Link
            href="/themes"
            className="flex items-center gap-3 px-8 md:px-16 py-3 w-full sm:min-w-[260px] sm:w-auto justify-center rounded-full bg-[#be185d]/80 hover:bg-[#e11d48]/90 text-white font-semibold text-lg shadow-lg transition"
          >
            📅 Monthly Themes
          </Link>

        </div>
      </div>
    </section>
  );
}