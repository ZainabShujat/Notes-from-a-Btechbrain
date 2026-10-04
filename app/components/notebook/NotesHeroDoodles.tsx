import React from "react";

/**
 * Hand-drawn mathematical, circuit, algorithmic, and engineering doodles
 * Float delicately in the background of /notes to give a living, vibrant student desk aesthetic.
 */
export default function NotesHeroDoodles() {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0"
      aria-hidden="true"
    >
      {/* ── DOODLE 1: TOP LEFT - VIRTUAL MEMORY / PAGING TRANSLATION ARROW ── */}
      <svg
        viewBox="0 0 140 80"
        fill="none"
        className="absolute top-2 left-[-10px] sm:left-4 w-28 sm:w-36 text-violet-500/25 dark:text-violet-400/20 transform -rotate-6 transition-transform hover:scale-105"
      >
        {/* Virtual Page to Physical Frame mapping box */}
        <rect x="10" y="15" width="40" height="25" rx="3" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2" />
        <text x="30" y="31" fill="currentColor" fontSize="7" fontFamily="monospace" textAnchor="middle" fontWeight="bold">VPN #4</text>
        
        {/* Curved arrow with handwritten tag */}
        <path d="M 52 27 C 70 20, 75 35, 90 27" stroke="currentColor" strokeWidth="1.5" markerEnd="url(#arrow-head)" />
        <polygon points="90,27 84,24 85,30" fill="currentColor" />

        <rect x="94" y="15" width="40" height="25" rx="3" stroke="currentColor" strokeWidth="1.5" />
        <text x="114" y="31" fill="currentColor" fontSize="7" fontFamily="monospace" textAnchor="middle" fontWeight="bold">PFN #12</text>
        <text x="70" y="48" fill="currentColor" fontSize="10" className="font-handwriting" style={{ fontFamily: "'Caveat', cursive" }}>
          TLB Hit (98%)
        </text>
      </svg>

      {/* ── DOODLE 2: TOP CENTER - TURING TAPE / FINITE AUTOMATON DELTA ── */}
      <svg
        viewBox="0 0 160 50"
        fill="none"
        className="absolute top-1 right-[28%] hidden md:block w-40 text-amber-500/25 dark:text-amber-400/20 transform rotate-3"
      >
        {/* Tape cells */}
        <rect x="10" y="12" width="120" height="22" rx="2" stroke="currentColor" strokeWidth="1.2" />
        <line x1="34" y1="12" x2="34" y2="34" stroke="currentColor" strokeWidth="1" />
        <line x1="58" y1="12" x2="58" y2="34" stroke="currentColor" strokeWidth="1" />
        <line x1="82" y1="12" x2="82" y2="34" stroke="currentColor" strokeWidth="1" />
        <line x1="106" y1="12" x2="106" y2="34" stroke="currentColor" strokeWidth="1" />
        
        <text x="22" y="27" fill="currentColor" fontSize="9" fontFamily="monospace" textAnchor="middle">0</text>
        <text x="46" y="27" fill="currentColor" fontSize="9" fontFamily="monospace" textAnchor="middle">1</text>
        <text x="70" y="27" fill="currentColor" fontSize="9" fontFamily="monospace" textAnchor="middle">1</text>
        <text x="94" y="27" fill="currentColor" fontSize="9" fontFamily="monospace" textAnchor="middle">0</text>
        <text x="118" y="27" fill="currentColor" fontSize="9" fontFamily="monospace" textAnchor="middle">B</text>

        {/* Read head triangle */}
        <polygon points="70,38 65,46 75,46" stroke="currentColor" strokeWidth="1.2" fill="currentColor" fillOpacity="0.2" />
        <text x="135" y="27" fill="currentColor" fontSize="11" className="font-handwriting" style={{ fontFamily: "'Caveat', cursive" }}>
          δ(q0, 1)
        </text>
      </svg>

      {/* ── DOODLE 3: TOP RIGHT - BIG O ASYMPTOTIC CURVE & COMPASS ── */}
      <svg
        viewBox="0 0 120 90"
        fill="none"
        className="absolute top-2 right-4 w-28 sm:w-32 text-emerald-500/25 dark:text-emerald-400/20 transform rotate-6"
      >
        {/* Axes */}
        <line x1="15" y1="75" x2="105" y2="75" stroke="currentColor" strokeWidth="1.4" />
        <line x1="15" y1="75" x2="15" y2="15" stroke="currentColor" strokeWidth="1.4" />

        {/* Curves: n log n vs n^2 */}
        <path d="M 15 75 Q 50 65 100 35" stroke="currentColor" strokeWidth="1.6" />
        <path d="M 15 75 Q 65 60 75 15" stroke="currentColor" strokeWidth="1.4" strokeDasharray="2 2" />

        <text x="95" y="28" fill="currentColor" fontSize="9" className="font-handwriting" style={{ fontFamily: "'Caveat', cursive" }}>
          O(n log n)
        </text>
        <text x="75" y="12" fill="currentColor" fontSize="9" className="font-handwriting" style={{ fontFamily: "'Caveat', cursive" }}>
          O(n²)
        </text>
      </svg>

      {/* ── DOODLE 4: BOTTOM RIGHT - NETWORK PACKET HEADER (SYN-ACK) ── */}
      <svg
        viewBox="0 0 150 70"
        fill="none"
        className="absolute bottom-2 right-12 hidden lg:block w-36 text-cyan-500/25 dark:text-cyan-400/20 transform -rotate-3"
      >
        <rect x="10" y="10" width="130" height="24" rx="3" stroke="currentColor" strokeWidth="1.2" />
        <line x1="45" y1="10" x2="45" y2="34" stroke="currentColor" strokeWidth="1" />
        <line x1="90" y1="10" x2="90" y2="34" stroke="currentColor" strokeWidth="1" />
        
        <text x="27" y="25" fill="currentColor" fontSize="8" fontFamily="monospace" textAnchor="middle">SRC: 80</text>
        <text x="67" y="25" fill="currentColor" fontSize="8" fontFamily="monospace" textAnchor="middle">DST: 443</text>
        <text x="110" y="25" fill="currentColor" fontSize="8" fontFamily="monospace" textAnchor="middle">[SYN, ACK]</text>

        <text x="75" y="52" fill="currentColor" fontSize="11" className="font-handwriting" style={{ fontFamily: "'Caveat', cursive" }} textAnchor="middle">
          ✎ 3-way handshake established
        </text>
      </svg>

      {/* ── DOODLE 5: CENTER SUBTLE MATHEMATICAL FORMULAS (EULER, SUM) ── */}
      <div className="absolute top-[38%] left-[2%] hidden xl:flex flex-col gap-1 text-[11px] font-mono text-purple-400/20 select-none">
        <span>V - E + F = 2</span>
        <span className="font-handwriting text-sm" style={{ fontFamily: "'Caveat', cursive" }}>
          ✎ planar graph invariant
        </span>
      </div>

      <div className="absolute top-[45%] right-[2%] hidden xl:flex flex-col gap-1 text-[11px] font-mono text-amber-400/20 select-none text-right">
        <span>log₂ (N) + 1</span>
        <span className="font-handwriting text-sm" style={{ fontFamily: "'Caveat', cursive" }}>
          ✎ binary tree height bound
        </span>
      </div>
    </div>
  );
}
