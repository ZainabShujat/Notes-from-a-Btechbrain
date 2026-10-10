import React from "react";

export default function SubjectCoverSketch({
  subjectId,
  accentHex = "#7c3aed",
}: {
  subjectId: string;
  accentHex?: string;
}) {
  const inkColor = "#1e1b4b"; // Deep violet-black ink for fine line drawings

  switch (subjectId) {
    // ── 01. OPERATING SYSTEMS ──────────────────────────────────────
    case "operating-systems":
      // Stacked virtual memory / abstraction layers with subtle isometric perspective
      return (
        <svg
          viewBox="0 0 160 110"
          fill="none"
          className="w-full max-w-[140px] h-auto mx-auto select-none opacity-90 group-hover:scale-105 transition-all duration-300"
          aria-hidden="true"
        >
          {/* Bottom Layer - Hardware */}
          <polygon
            points="80,92 135,74 80,56 25,74"
            fill="currentColor"
            fillOpacity="0.04"
            stroke={inkColor}
            strokeWidth="1.2"
          />
          {/* Middle Layer - Kernel Space */}
          <polygon
            points="80,72 135,54 80,36 25,54"
            fill={accentHex}
            fillOpacity="0.1"
            stroke={accentHex}
            strokeWidth="1.3"
          />
          {/* Top Layer - User Space */}
          <polygon
            points="80,52 135,34 80,16 25,34"
            fill="currentColor"
            fillOpacity="0.04"
            stroke={inkColor}
            strokeWidth="1.2"
          />
          {/* Dashed vertical connecting lines */}
          <line x1="80" y1="16" x2="80" y2="92" stroke={inkColor} strokeWidth="1" strokeDasharray="2 2" strokeOpacity="0.4" />
          <line x1="25" y1="34" x2="25" y2="74" stroke={inkColor} strokeWidth="1" strokeDasharray="2 2" strokeOpacity="0.3" />
          <line x1="135" y1="34" x2="135" y2="74" stroke={inkColor} strokeWidth="1" strokeDasharray="2 2" strokeOpacity="0.3" />
        </svg>
      );

    // ── 02. DATABASE MANAGEMENT SYSTEMS ────────────────────────────
    case "dbms":
      // Database cylinder connected to relational table schema
      return (
        <svg
          viewBox="0 0 160 110"
          fill="none"
          className="w-full max-w-[140px] h-auto mx-auto select-none opacity-90 group-hover:scale-105 transition-all duration-300"
          aria-hidden="true"
        >
          {/* Cylinder Top */}
          <ellipse cx="48" cy="34" rx="18" ry="7" fill="#faf8f5" stroke={accentHex} strokeWidth="1.3" />
          {/* Cylinder Body */}
          <path d="M 30 34 v 34 c 0 4 8 7 18 7 s 18 -3 18 -7 v -34" stroke={accentHex} strokeWidth="1.3" fill="none" />
          <path d="M 30 50 c 0 4 8 7 18 7 s 18 -3 18 -7" stroke={accentHex} strokeWidth="1" strokeDasharray="2 2" fill="none" />

          {/* Connection pointer line */}
          <line x1="66" y1="52" x2="94" y2="52" stroke={inkColor} strokeWidth="1.2" strokeDasharray="3 2" />
          <polygon points="96,52 90,49 90,55" fill={inkColor} />

          {/* Relational Table Schema */}
          <rect x="98" y="30" width="42" height="42" rx="2" fill="#faf8f5" stroke={inkColor} strokeWidth="1.2" />
          <rect x="98" y="30" width="42" height="12" fill={accentHex} fillOpacity="0.12" stroke={inkColor} strokeWidth="1" />
          <line x1="98" y1="54" x2="140" y2="54" stroke={inkColor} strokeWidth="0.8" strokeDasharray="1.5 1.5" />
          <line x1="112" y1="30" x2="112" y2="72" stroke={inkColor} strokeWidth="1" />
          <line x1="126" y1="30" x2="126" y2="72" stroke={inkColor} strokeWidth="0.8" strokeDasharray="1.5 1.5" />
        </svg>
      );

    // ── 03. ALGORITHMS ─────────────────────────────────────────────
    case "algorithms":
      // Dynamic graph cycle with directed curved spline arrows
      return (
        <svg
          viewBox="0 0 160 110"
          fill="none"
          className="w-full max-w-[140px] h-auto mx-auto select-none opacity-90 group-hover:scale-105 transition-all duration-300"
          aria-hidden="true"
        >
          {/* Curved connecting paths */}
          <path
            d="M 68 34 C 40 45, 40 75, 52 82"
            stroke={inkColor}
            strokeWidth="1.2"
            fill="none"
          />
          <path
            d="M 66 88 C 80 94, 100 94, 108 85"
            stroke={inkColor}
            strokeWidth="1.2"
            fill="none"
          />
          <path
            d="M 115 72 C 122 55, 110 38, 92 34"
            stroke={inkColor}
            strokeWidth="1.2"
            fill="none"
          />
          {/* Small arrowheads */}
          <polygon points="53,84 48,78 57,78" fill={inkColor} />
          <polygon points="110,84 104,88 106,79" fill={inkColor} />
          <polygon points="90,34 96,30 96,38" fill={inkColor} />

          {/* Nodes */}
          <circle cx="80" cy="30" r="9" fill="#faf8f5" stroke={accentHex} strokeWidth="1.5" />
          <circle cx="80" cy="30" r="3" fill={accentHex} />
          <circle cx="56" cy="85" r="9" fill="#faf8f5" stroke={inkColor} strokeWidth="1.2" />
          <circle cx="114" cy="80" r="9" fill="#faf8f5" stroke={inkColor} strokeWidth="1.2" />
        </svg>
      );

    // ── 04. COMPUTER NETWORKS ──────────────────────────────────────
    case "computer-networks":
      // Wireframe globe connected to workstation nodes
      return (
        <svg
          viewBox="0 0 160 110"
          fill="none"
          className="w-full max-w-[140px] h-auto mx-auto select-none opacity-90 group-hover:scale-105 transition-all duration-300"
          aria-hidden="true"
        >
          {/* Central Globe */}
          <circle cx="80" cy="40" r="18" fill="#faf8f5" stroke={accentHex} strokeWidth="1.3" />
          <ellipse cx="80" cy="40" rx="9" ry="18" stroke={inkColor} strokeWidth="1" strokeDasharray="2 2" />
          <line x1="62" y1="40" x2="98" y2="40" stroke={inkColor} strokeWidth="1" />

          {/* Network cables */}
          <line x1="70" y1="56" x2="45" y2="82" stroke={inkColor} strokeWidth="1" />
          <line x1="90" y1="56" x2="115" y2="82" stroke={inkColor} strokeWidth="1" />

          {/* Workstation 1 */}
          <rect x="34" y="80" width="22" height="15" rx="1.5" fill="#faf8f5" stroke={inkColor} strokeWidth="1.2" />
          <line x1="45" y1="95" x2="45" y2="99" stroke={inkColor} strokeWidth="1.2" />
          <line x1="39" y1="99" x2="51" y2="99" stroke={inkColor} strokeWidth="1.2" />

          {/* Workstation 2 */}
          <rect x="104" y="80" width="22" height="15" rx="1.5" fill="#faf8f5" stroke={inkColor} strokeWidth="1.2" />
          <line x1="115" y1="95" x2="115" y2="99" stroke={inkColor} strokeWidth="1.2" />
          <line x1="109" y1="99" x2="121" y2="99" stroke={inkColor} strokeWidth="1.2" />
        </svg>
      );

    // ── 05. COMPUTER ORGANIZATION & ARCHITECTURE ───────────────────
    case "computer-organization":
    case "coa":
      // CPU Microprocessor Datapath: ALU chevron, Register box, Data Bus, Clock Pulse
      return (
        <svg
          viewBox="0 0 160 110"
          fill="none"
          className="w-full max-w-[140px] h-auto mx-auto select-none opacity-90 group-hover:scale-105 transition-all duration-300"
          aria-hidden="true"
        >
          {/* Main 8-bit System Bus */}
          <line x1="20" y1="84" x2="140" y2="84" stroke={inkColor} strokeWidth="2" />
          <line x1="20" y1="88" x2="140" y2="88" stroke={inkColor} strokeWidth="0.8" strokeDasharray="3 2" />

          {/* ALU Trapezoid / Chevron */}
          <polygon
            points="42,28 88,28 78,54 65,48 52,54"
            fill="#faf8f5"
            stroke={accentHex}
            strokeWidth="1.4"
          />
          {/* ALU Inputs from top */}
          <line x1="50" y1="18" x2="50" y2="28" stroke={inkColor} strokeWidth="1.2" />
          <line x1="80" y1="18" x2="80" y2="28" stroke={inkColor} strokeWidth="1.2" />
          <polygon points="50,28 47,23 53,23" fill={inkColor} />
          <polygon points="80,28 77,23 83,23" fill={inkColor} />

          {/* Register Block [R0..Rn] */}
          <rect x="102" y="26" width="36" height="30" rx="2" fill="#faf8f5" stroke={inkColor} strokeWidth="1.2" />
          <line x1="102" y1="36" x2="138" y2="36" stroke={inkColor} strokeWidth="0.8" />
          <line x1="102" y1="46" x2="138" y2="46" stroke={inkColor} strokeWidth="0.8" />
          <circle cx="107" cy="31" r="1.5" fill={accentHex} />

          {/* Bus Drop Connections */}
          <line x1="65" y1="48" x2="65" y2="84" stroke={accentHex} strokeWidth="1.2" strokeDasharray="2 2" />
          <polygon points="65,84 62,78 68,78" fill={accentHex} />
          <line x1="120" y1="56" x2="120" y2="84" stroke={inkColor} strokeWidth="1.2" strokeDasharray="2 2" />

          {/* Clock Pulse Square Wave below Bus */}
          <path
            d="M 30 98 h 6 v -6 h 6 v 6 h 6 v -6 h 6 v 6 h 6"
            stroke={accentHex}
            strokeWidth="1"
            fill="none"
          />
        </svg>
      );

    // ── 06. THEORY OF COMPUTATION ──────────────────────────────────
    case "theory-of-computation":
    case "toc":
      // Automaton state machine (q0 -> q1 accept state) with Turing Tape
      return (
        <svg
          viewBox="0 0 160 110"
          fill="none"
          className="w-full max-w-[140px] h-auto mx-auto select-none opacity-90 group-hover:scale-105 transition-all duration-300"
          aria-hidden="true"
        >
          {/* Start arrow */}
          <line x1="18" y1="48" x2="36" y2="48" stroke={inkColor} strokeWidth="1.2" />
          <polygon points="36,48 31,45 31,51" fill={inkColor} />

          {/* State q0 */}
          <circle cx="50" cy="48" r="14" fill="#faf8f5" stroke={inkColor} strokeWidth="1.2" />
          <circle cx="50" cy="48" r="2.5" fill={inkColor} />

          {/* Transition q0 -> q1 (top arc) */}
          <path d="M 62 40 C 76 30, 92 30, 106 40" stroke={accentHex} strokeWidth="1.3" fill="none" />
          <polygon points="106,40 99,37 102,44" fill={accentHex} />

          {/* Transition q1 -> q0 (bottom arc) */}
          <path d="M 106 56 C 92 66, 76 66, 62 56" stroke={inkColor} strokeWidth="1.2" fill="none" />
          <polygon points="62,56 69,59 66,52" fill={inkColor} />

          {/* Accept State q1 (double circle) */}
          <circle cx="120" cy="48" r="14" fill="#faf8f5" stroke={inkColor} strokeWidth="1.2" />
          <circle cx="120" cy="48" r="11" fill="none" stroke={accentHex} strokeWidth="1.4" />

          {/* Turing Tape Cells at Base */}
          <g transform="translate(35, 78)">
            <rect x="0" y="0" width="18" height="16" fill="#faf8f5" stroke={inkColor} strokeWidth="1" />
            <rect x="18" y="0" width="18" height="16" fill="#faf8f5" stroke={accentHex} strokeWidth="1.2" fillOpacity="0.1" />
            <rect x="36" y="0" width="18" height="16" fill="#faf8f5" stroke={inkColor} strokeWidth="1" />
            <rect x="54" y="0" width="18" height="16" fill="#faf8f5" stroke={inkColor} strokeWidth="1" />
            <rect x="72" y="0" width="18" height="16" fill="#faf8f5" stroke={inkColor} strokeWidth="1" />
            {/* Read Head Marker */}
            <polygon points="27,-3 23,-8 31,-8" fill={accentHex} />
          </g>
        </svg>
      );

    // ── 07. PROGRAMMING IN C ───────────────────────────────────────
    case "programming-in-c":
    case "c-programming":
      // Pointers, Dereferencing & Contiguous Memory Cells
      return (
        <svg
          viewBox="0 0 160 110"
          fill="none"
          className="w-full max-w-[140px] h-auto mx-auto select-none opacity-90 group-hover:scale-105 transition-all duration-300"
          aria-hidden="true"
        >
          {/* Pointer variable box 'ptr' */}
          <rect x="22" y="38" width="34" height="26" rx="2" fill="#faf8f5" stroke={inkColor} strokeWidth="1.2" />
          <circle cx="39" cy="51" r="3.5" fill={accentHex} />
          {/* Pointer label line */}
          <line x1="22" y1="46" x2="56" y2="46" stroke={inkColor} strokeWidth="0.8" strokeDasharray="1.5 1.5" />

          {/* Pointer curved arrow connecting to target memory cell */}
          <path d="M 39 51 C 60 51, 68 28, 92 42" stroke={accentHex} strokeWidth="1.4" fill="none" />
          <polygon points="94,43 87,40 89,47" fill={accentHex} />

          {/* Contiguous Memory Blocks (Array / Struct Frame) */}
          <g transform="translate(95, 25)">
            <rect x="0" y="0" width="40" height="18" fill="#faf8f5" stroke={inkColor} strokeWidth="1" />
            <rect x="0" y="18" width="40" height="18" fill={accentHex} fillOpacity="0.12" stroke={accentHex} strokeWidth="1.3" />
            <rect x="0" y="36" width="40" height="18" fill="#faf8f5" stroke={inkColor} strokeWidth="1" />
            {/* Hex Memory Address tick marks */}
            <line x1="-6" y1="9" x2="0" y2="9" stroke={inkColor} strokeWidth="0.8" />
            <line x1="-6" y1="27" x2="0" y2="27" stroke={accentHex} strokeWidth="1" />
            <line x1="-6" y1="45" x2="0" y2="45" stroke={inkColor} strokeWidth="0.8" />
          </g>

          {/* C Language Monogram Syntax Symbol */}
          <path d="M 32 78 C 24 78, 20 84, 20 92 C 20 100, 24 106, 32 106" stroke={inkColor} strokeWidth="1.4" fill="none" strokeLinecap="round" />
          <line x1="38" y1="88" x2="48" y2="88" stroke={accentHex} strokeWidth="1.2" />
          <line x1="43" y1="83" x2="43" y2="93" stroke={accentHex} strokeWidth="1.2" />
        </svg>
      );

    // ── 08. DISCRETE MATHEMATICS ───────────────────────────────────
    case "discrete-mathematics":
    case "discrete-maths":
      // Graph Theory, POSET Hasse Lattice & Euler-Venn Geometry
      return (
        <svg
          viewBox="0 0 160 110"
          fill="none"
          className="w-full max-w-[140px] h-auto mx-auto select-none opacity-90 group-hover:scale-105 transition-all duration-300"
          aria-hidden="true"
        >
          {/* Overlapping Venn Set Boundaries */}
          <ellipse cx="62" cy="55" rx="30" ry="24" stroke={inkColor} strokeWidth="1.1" fill="#faf8f5" fillOpacity="0.3" />
          <ellipse cx="98" cy="55" rx="30" ry="24" stroke={accentHex} strokeWidth="1.3" fill={accentHex} fillOpacity="0.08" />

          {/* Intersecting Hasse Diagram Lattice Diamond in Center */}
          <line x1="80" y1="28" x2="62" y2="52" stroke={inkColor} strokeWidth="1.2" />
          <line x1="80" y1="28" x2="98" y2="52" stroke={inkColor} strokeWidth="1.2" />
          <line x1="62" y1="52" x2="80" y2="76" stroke={inkColor} strokeWidth="1.2" />
          <line x1="98" y1="52" x2="80" y2="76" stroke={inkColor} strokeWidth="1.2" />

          {/* Lattice Vertices */}
          <circle cx="80" cy="28" r="4.5" fill="#faf8f5" stroke={accentHex} strokeWidth="1.4" />
          <circle cx="62" cy="52" r="4" fill="#faf8f5" stroke={inkColor} strokeWidth="1.2" />
          <circle cx="98" cy="52" r="4" fill="#faf8f5" stroke={inkColor} strokeWidth="1.2" />
          <circle cx="80" cy="76" r="4.5" fill="#faf8f5" stroke={inkColor} strokeWidth="1.2" />

          {/* Central Intersection Highlight Dot */}
          <circle cx="80" cy="52" r="2.5" fill={accentHex} />
        </svg>
      );

    // ── 09. DATA STRUCTURES ────────────────────────────────────────
    case "data-structures":
      // Balanced Binary Tree with index array register
      return (
        <svg
          viewBox="0 0 160 110"
          fill="none"
          className="w-full max-w-[140px] h-auto mx-auto select-none opacity-90 group-hover:scale-105 transition-all duration-300"
          aria-hidden="true"
        >
          {/* Branch lines */}
          <line x1="80" y1="26" x2="46" y2="54" stroke={inkColor} strokeWidth="1.2" />
          <line x1="80" y1="26" x2="114" y2="54" stroke={inkColor} strokeWidth="1.2" />
          <line x1="46" y1="54" x2="28" y2="82" stroke={inkColor} strokeWidth="1.2" />
          <line x1="46" y1="54" x2="64" y2="82" stroke={inkColor} strokeWidth="1.2" />
          <line x1="114" y1="54" x2="96" y2="82" stroke={inkColor} strokeWidth="1.2" />
          <line x1="114" y1="54" x2="132" y2="82" stroke={inkColor} strokeWidth="1.2" />

          {/* Root node */}
          <circle cx="80" cy="26" r="9" fill="#faf8f5" stroke={accentHex} strokeWidth="1.5" />
          <circle cx="80" cy="26" r="3" fill={accentHex} />
          {/* Level 1 nodes */}
          <circle cx="46" cy="54" r="8" fill="#faf8f5" stroke={inkColor} strokeWidth="1.2" />
          <circle cx="114" cy="54" r="8" fill="#faf8f5" stroke={inkColor} strokeWidth="1.2" />
          {/* Level 2 leaves */}
          <circle cx="28" cy="82" r="6" fill="#faf8f5" stroke={inkColor} strokeWidth="1" />
          <circle cx="64" cy="82" r="6" fill="#faf8f5" stroke={accentHex} strokeWidth="1.2" fillOpacity="0.1" />
          <circle cx="96" cy="82" r="6" fill="#faf8f5" stroke={inkColor} strokeWidth="1" />
          <circle cx="132" cy="82" r="6" fill="#faf8f5" stroke={inkColor} strokeWidth="1" />
        </svg>
      );

    // ── 10. COMPILER DESIGN ────────────────────────────────────────
    case "compiler-design":
      // Syntax Parse Tree & Scanner Lexer Pipeline
      return (
        <svg
          viewBox="0 0 160 110"
          fill="none"
          className="w-full max-w-[140px] h-auto mx-auto select-none opacity-90 group-hover:scale-105 transition-all duration-300"
          aria-hidden="true"
        >
          {/* Source Code Stream Token Bracket */}
          <path d="M 24 30 L 18 30 L 18 80 L 24 80" stroke={inkColor} strokeWidth="1.2" />
          <line x1="22" y1="42" x2="34" y2="42" stroke={inkColor} strokeWidth="1" />
          <line x1="22" y1="54" x2="32" y2="54" stroke={accentHex} strokeWidth="1.2" />
          <line x1="22" y1="66" x2="28" y2="66" stroke={inkColor} strokeWidth="1" />

          {/* Lexer Arrow to Central AST Syntax Node */}
          <line x1="38" y1="54" x2="56" y2="54" stroke={inkColor} strokeWidth="1.2" strokeDasharray="2 2" />
          <polygon points="56,54 50,51 50,57" fill={inkColor} />

          {/* AST Parse Tree: Root Operator (+) */}
          <circle cx="82" cy="34" r="10" fill="#faf8f5" stroke={accentHex} strokeWidth="1.4" />
          {/* Plus glyph inside root */}
          <line x1="82" y1="29" x2="82" y2="39" stroke={accentHex} strokeWidth="1.3" />
          <line x1="77" y1="34" x2="87" y2="34" stroke={accentHex} strokeWidth="1.3" />

          {/* Tree branches */}
          <line x1="75" y1="42" x2="60" y2="66" stroke={inkColor} strokeWidth="1.2" />
          <line x1="89" y1="42" x2="108" y2="66" stroke={inkColor} strokeWidth="1.2" />

          {/* Left Leaf: Identifier 'id' */}
          <rect x="48" y="66" width="22" height="18" rx="2" fill="#faf8f5" stroke={inkColor} strokeWidth="1.2" />
          <line x1="54" y1="75" x2="64" y2="75" stroke={inkColor} strokeWidth="1" />

          {/* Right Subtree: Operator (*) */}
          <circle cx="112" cy="75" r="9" fill="#faf8f5" stroke={accentHex} strokeWidth="1.2" fillOpacity="0.1" />
          <line x1="108" y1="71" x2="116" y2="79" stroke={accentHex} strokeWidth="1.2" />
          <line x1="116" y1="71" x2="108" y2="79" stroke={accentHex} strokeWidth="1.2" />

          {/* Sub-branches to leaves */}
          <line x1="106" y1="83" x2="96" y2="98" stroke={inkColor} strokeWidth="1" />
          <line x1="118" y1="83" x2="128" y2="98" stroke={inkColor} strokeWidth="1" />
          <circle cx="96" cy="98" r="4" fill="#faf8f5" stroke={inkColor} strokeWidth="1" />
          <circle cx="128" cy="98" r="4" fill="#faf8f5" stroke={inkColor} strokeWidth="1" />
        </svg>
      );

    // ── 11. DIGITAL LOGIC ──────────────────────────────────────────
    case "digital-logic":
      // Combinational Logic Gate (NAND/XOR) & Synchronous Clock Pulses
      return (
        <svg
          viewBox="0 0 160 110"
          fill="none"
          className="w-full max-w-[140px] h-auto mx-auto select-none opacity-90 group-hover:scale-105 transition-all duration-300"
          aria-hidden="true"
        >
          {/* Dual Input Lines */}
          <line x1="24" y1="36" x2="56" y2="36" stroke={inkColor} strokeWidth="1.2" />
          <line x1="24" y1="60" x2="56" y2="60" stroke={inkColor} strokeWidth="1.2" />

          {/* XOR Curved Back Arc */}
          <path d="M 48 26 C 56 37, 56 59, 48 70" stroke={inkColor} strokeWidth="1.2" fill="none" />

          {/* Main Gate Shell */}
          <path
            d="M 56 26 C 64 37, 64 59, 56 70 C 72 70, 92 62, 102 48 C 92 34, 72 26, 56 26 Z"
            fill="#faf8f5"
            stroke={accentHex}
            strokeWidth="1.4"
          />

          {/* Output Line with Inversion Bubble */}
          <circle cx="107" cy="48" r="3.5" fill="#faf8f5" stroke={accentHex} strokeWidth="1.2" />
          <line x1="111" y1="48" x2="136" y2="48" stroke={inkColor} strokeWidth="1.3" />

          {/* Digital Waveform at Base */}
          <path
            d="M 28 92 h 12 v -12 h 14 v 12 h 14 v -12 h 14 v 12 h 14 v -12 h 14 v 12 h 10"
            stroke={accentHex}
            strokeWidth="1.1"
            fill="none"
          />
          {/* Timing tick markers */}
          <line x1="40" y1="92" x2="40" y2="97" stroke={inkColor} strokeWidth="0.8" />
          <line x1="68" y1="92" x2="68" y2="97" stroke={inkColor} strokeWidth="0.8" />
          <line x1="96" y1="92" x2="96" y2="97" stroke={inkColor} strokeWidth="0.8" />
        </svg>
      );

    // ── 12. ENGINEERING MATHEMATICS ────────────────────────────────
    case "engineering-mathematics":
      // Multivariable Surface Geometry, Tangent Vector & Definite Integral Area
      return (
        <svg
          viewBox="0 0 160 110"
          fill="none"
          className="w-full max-w-[140px] h-auto mx-auto select-none opacity-90 group-hover:scale-105 transition-all duration-300"
          aria-hidden="true"
        >
          {/* 3D Coordinate Axis Triad */}
          <line x1="28" y1="88" x2="28" y2="20" stroke={inkColor} strokeWidth="1.2" />
          <line x1="28" y1="88" x2="138" y2="88" stroke={inkColor} strokeWidth="1.2" />
          <line x1="28" y1="88" x2="12" y2="102" stroke={inkColor} strokeWidth="1.2" />
          {/* Axis arrowheads */}
          <polygon points="28,18 25,24 31,24" fill={inkColor} />
          <polygon points="140,88 134,85 134,91" fill={inkColor} />

          {/* Calculus Curve */}
          <path
            d="M 28 80 C 48 76, 62 30, 84 40 C 106 50, 118 22, 134 26"
            stroke={accentHex}
            strokeWidth="1.5"
            fill="none"
          />

          {/* Shaded Definite Integral Area under curve */}
          <path
            d="M 50 68 C 64 32, 84 40, 96 46 L 96 88 L 50 88 Z"
            fill={accentHex}
            fillOpacity="0.14"
            stroke={accentHex}
            strokeWidth="0.8"
            strokeDasharray="2 2"
          />

          {/* Tangent Slope Vector at inflection */}
          <line x1="68" y1="52" x2="100" y2="34" stroke={inkColor} strokeWidth="1.2" strokeDasharray="3 2" />
          <circle cx="84" cy="40" r="3" fill={accentHex} />

          {/* Integral Symbol Aesthetic Glyphs */}
          <path d="M 122 62 C 124 58, 128 58, 128 62 L 124 78 C 124 82, 128 82, 130 78" stroke={inkColor} strokeWidth="1.2" fill="none" strokeLinecap="round" />
        </svg>
      );

    // ── 13. GENERAL APTITUDE ───────────────────────────────────────
    case "general-aptitude":
      // Spatial Reasoning Unfolded Cube Net, Geometric Chirality & Compass Logic
      return (
        <svg
          viewBox="0 0 160 110"
          fill="none"
          className="w-full max-w-[140px] h-auto mx-auto select-none opacity-90 group-hover:scale-105 transition-all duration-300"
          aria-hidden="true"
        >
          {/* Unfolded 6-Square Cube Net (Spatial Cross) */}
          <g transform="translate(42, 16)">
            {/* Top tab */}
            <rect x="22" y="0" width="22" height="22" fill="#faf8f5" stroke={inkColor} strokeWidth="1.1" />
            <circle cx="33" cy="11" r="3" fill={accentHex} />

            {/* Middle horizontal strip of 3 squares */}
            <rect x="0" y="22" width="22" height="22" fill="#faf8f5" stroke={inkColor} strokeWidth="1.1" />
            <rect x="22" y="22" width="22" height="22" fill={accentHex} fillOpacity="0.12" stroke={accentHex} strokeWidth="1.3" />
            <rect x="44" y="22" width="22" height="22" fill="#faf8f5" stroke={inkColor} strokeWidth="1.1" />
            <line x1="5" y1="33" x2="17" y2="33" stroke={inkColor} strokeWidth="1" />
            <line x1="49" y1="27" x2="61" y2="39" stroke={inkColor} strokeWidth="1" />

            {/* Bottom column continuation */}
            <rect x="22" y="44" width="22" height="22" fill="#faf8f5" stroke={inkColor} strokeWidth="1.1" />
            <rect x="22" y="66" width="22" height="22" fill="#faf8f5" stroke={inkColor} strokeWidth="1.1" />
            <circle cx="33" cy="55" r="2.5" fill={inkColor} />

            {/* Fold Crease Dash Lines */}
            <line x1="22" y1="22" x2="44" y2="22" stroke={accentHex} strokeWidth="1" strokeDasharray="2 2" />
            <line x1="22" y1="44" x2="44" y2="44" stroke={accentHex} strokeWidth="1" strokeDasharray="2 2" />
          </g>

          {/* Spatial Rotation Crease Arc */}
          <path
            d="M 116 38 A 20 20 0 0 1 126 68"
            stroke={accentHex}
            strokeWidth="1.2"
            fill="none"
            strokeDasharray="2 2"
          />
          <polygon points="126,69 122,63 129,64" fill={accentHex} />

          {/* Geometric Triangle in Circle (Analytical Reasoning) */}
          <circle cx="122" cy="52" r="14" stroke={inkColor} strokeWidth="1" />
          <polygon points="122,40 134,60 110,60" stroke={inkColor} strokeWidth="1" fill="#faf8f5" />
          <circle cx="122" cy="53" r="2" fill={accentHex} />
        </svg>
      );

    // ── 14. PROBABILITY & STATISTICS ───────────────────────────────
    case "probability-and-statistics":
    case "prob-stats":
      // Gaussian Bell Curve, Standard Deviation Spread & Isometric Dice
      return (
        <svg
          viewBox="0 0 160 110"
          fill="none"
          className="w-full max-w-[140px] h-auto mx-auto select-none opacity-90 group-hover:scale-105 transition-all duration-300"
          aria-hidden="true"
        >
          {/* Baseline axis */}
          <line x1="18" y1="84" x2="142" y2="84" stroke={inkColor} strokeWidth="1.2" />

          {/* Shaded Normal Distribution Area (-1 sigma to +1 sigma) */}
          <path
            d="M 56 84 C 62 84, 68 56, 80 32 C 92 56, 98 84, 104 84 Z"
            fill={accentHex}
            fillOpacity="0.14"
          />

          {/* Continuous Bell Curve Profile */}
          <path
            d="M 22 84 C 42 84, 58 80, 68 58 C 74 44, 76 30, 80 30 C 84 30, 86 44, 92 58 C 102 80, 118 84, 138 84"
            stroke={accentHex}
            strokeWidth="1.6"
            fill="none"
          />

          {/* Mean (mu) center vertical line */}
          <line x1="80" y1="30" x2="80" y2="84" stroke={accentHex} strokeWidth="1.2" strokeDasharray="2 2" />
          <circle cx="80" cy="30" r="3" fill={accentHex} />

          {/* Inflection lines at +/- 1 sigma */}
          <line x1="64" y1="62" x2="64" y2="84" stroke={inkColor} strokeWidth="0.8" strokeDasharray="1.5 1.5" />
          <line x1="96" y1="62" x2="96" y2="84" stroke={inkColor} strokeWidth="0.8" strokeDasharray="1.5 1.5" />

          {/* Probability Dice Wireframe in Corner */}
          <g transform="translate(112, 18)">
            {/* Isometric Cube Faces */}
            <polygon points="16,0 32,8 16,16 0,8" fill="#faf8f5" stroke={inkColor} strokeWidth="1.1" />
            <polygon points="0,8 16,16 16,32 0,24" fill="#faf8f5" stroke={inkColor} strokeWidth="1.1" />
            <polygon points="32,8 32,24 16,32 16,16" fill={accentHex} fillOpacity="0.08" stroke={inkColor} strokeWidth="1.1" />
            {/* Pips */}
            <circle cx="16" cy="8" r="1.5" fill={accentHex} />
            <circle cx="8" cy="18" r="1.3" fill={inkColor} />
            <circle cx="8" cy="24" r="1.3" fill={inkColor} />
            <circle cx="24" cy="18" r="1.3" fill={inkColor} />
            <circle cx="24" cy="24" r="1.3" fill={inkColor} />
          </g>
        </svg>
      );

    // ── 15. LINEAR ALGEBRA ─────────────────────────────────────────
    case "linear-algebra":
      // Transformed Coordinate Space, Basis Vectors & Invariant Eigenspace
      return (
        <svg
          viewBox="0 0 160 110"
          fill="none"
          className="w-full max-w-[140px] h-auto mx-auto select-none opacity-90 group-hover:scale-105 transition-all duration-300"
          aria-hidden="true"
        >
          {/* Origin Pivot */}
          <g transform="translate(36, 76)">
            {/* Grid Shear Lines (Transformed Space) */}
            <line x1="-15" y1="0" x2="95" y2="0" stroke={inkColor} strokeWidth="0.8" strokeOpacity="0.3" />
            <line x1="0" y1="15" x2="0" y2="-65" stroke={inkColor} strokeWidth="0.8" strokeOpacity="0.3" />

            {/* Parallelogram Unit Area Det(A) */}
            <polygon
              points="0,0 48,-14 74,-52 26,-38"
              fill={accentHex}
              fillOpacity="0.12"
              stroke={accentHex}
              strokeWidth="1"
              strokeDasharray="2 2"
            />

            {/* Basis Vector v1 */}
            <line x1="0" y1="0" x2="48" y2="-14" stroke={inkColor} strokeWidth="1.4" />
            <polygon points="50,-14 43,-11 45,-18" fill={inkColor} />

            {/* Basis Vector v2 */}
            <line x1="0" y1="0" x2="26" y2="-38" stroke={inkColor} strokeWidth="1.4" />
            <polygon points="27,-40 21,-35 28,-33" fill={inkColor} />

            {/* Invariant Eigenvector lambda*v (Long Accent Ray) */}
            <line x1="-10" y1="12" x2="88" y2="-62" stroke={accentHex} strokeWidth="1.4" />
            <polygon points="90,-63 82,-62 86,-56" fill={accentHex} />
            <circle cx="0" cy="0" r="3" fill={inkColor} />

            {/* Eigenvalue scale indicator point */}
            <circle cx="56" cy="-40" r="2.5" fill={accentHex} />
          </g>

          {/* Matrix Bracket Symbol on Right */}
          <path d="M 130 32 L 136 32 L 136 78 L 130 78" stroke={inkColor} strokeWidth="1.3" />
          <path d="M 144 32 L 138 32 L 138 78 L 144 78" stroke={inkColor} strokeWidth="1.3" />
          <circle cx="137" cy="48" r="1.5" fill={accentHex} />
          <circle cx="137" cy="62" r="1.5" fill={accentHex} />
        </svg>
      );

    // ── 16. CALCULUS & OPTIMIZATION ────────────────────────────────
    case "calculus-and-optimization":
    case "calculus-opt":
      // Convex Optimization Level Sets (Contour Lines) & Gradient Descent Trajectory
      return (
        <svg
          viewBox="0 0 160 110"
          fill="none"
          className="w-full max-w-[140px] h-auto mx-auto select-none opacity-90 group-hover:scale-105 transition-all duration-300"
          aria-hidden="true"
        >
          {/* Concentric Elliptical Contour Level Sets */}
          <ellipse cx="80" cy="55" rx="55" ry="36" stroke={inkColor} strokeWidth="1" strokeOpacity="0.4" strokeDasharray="3 2" />
          <ellipse cx="80" cy="55" rx="38" ry="24" stroke={inkColor} strokeWidth="1.1" strokeOpacity="0.6" />
          <ellipse cx="80" cy="55" rx="22" ry="14" stroke={accentHex} strokeWidth="1.2" fill={accentHex} fillOpacity="0.08" />
          <ellipse cx="80" cy="55" rx="10" ry="6" stroke={accentHex} strokeWidth="1.3" fill={accentHex} fillOpacity="0.14" />

          {/* Optimal Global Minimum Target (*) */}
          <circle cx="80" cy="55" r="3" fill={accentHex} />

          {/* Gradient Descent Step Vector Trajectory */}
          {/* Step 0 -> Step 1 */}
          <line x1="124" y1="26" x2="98" y2="38" stroke={inkColor} strokeWidth="1.3" />
          <polygon points="98,38 105,34 103,41" fill={inkColor} />
          <circle cx="124" cy="26" r="2.5" fill={inkColor} />

          {/* Step 1 -> Step 2 */}
          <line x1="98" y1="38" x2="88" y2="47" stroke={inkColor} strokeWidth="1.3" />
          <polygon points="88,47 95,43 93,50" fill={inkColor} />
          <circle cx="98" cy="38" r="2" fill={inkColor} />

          {/* Step 2 -> Optimal Minimum */}
          <line x1="88" y1="47" x2="82" y2="53" stroke={accentHex} strokeWidth="1.4" />
          <polygon points="82,53 87,49 85,55" fill={accentHex} />

          {/* Gradient Vector Symbol nabla f */}
          <polygon points="34,26 42,26 38,34" fill={accentHex} />
        </svg>
      );

    // ── 17. MACHINE LEARNING ───────────────────────────────────────
    case "machine-learning":
      // Neural Synaptic Network & Linear Separating Hyperplane Classifier
      return (
        <svg
          viewBox="0 0 160 110"
          fill="none"
          className="w-full max-w-[140px] h-auto mx-auto select-none opacity-90 group-hover:scale-105 transition-all duration-300"
          aria-hidden="true"
        >
          {/* Synaptic Network (Left Half) */}
          {/* Input Layer (3 nodes) */}
          <circle cx="28" cy="28" r="6" fill="#faf8f5" stroke={inkColor} strokeWidth="1.2" />
          <circle cx="28" cy="55" r="6" fill="#faf8f5" stroke={inkColor} strokeWidth="1.2" />
          <circle cx="28" cy="82" r="6" fill="#faf8f5" stroke={inkColor} strokeWidth="1.2" />

          {/* Hidden Layer (2 nodes) */}
          <circle cx="62" cy="40" r="7" fill="#faf8f5" stroke={accentHex} strokeWidth="1.3" />
          <circle cx="62" cy="70" r="7" fill="#faf8f5" stroke={accentHex} strokeWidth="1.3" />

          {/* Output Node */}
          <circle cx="94" cy="55" r="7" fill="#faf8f5" stroke={accentHex} strokeWidth="1.4" fillOpacity="0.12" />
          <circle cx="94" cy="55" r="2.5" fill={accentHex} />

          {/* Synaptic Weight Connection Lines */}
          <line x1="34" y1="28" x2="55" y2="40" stroke={inkColor} strokeWidth="0.9" strokeOpacity="0.5" />
          <line x1="34" y1="28" x2="55" y2="70" stroke={inkColor} strokeWidth="0.9" strokeOpacity="0.5" />
          <line x1="34" y1="55" x2="55" y2="40" stroke={accentHex} strokeWidth="1.1" />
          <line x1="34" y1="55" x2="55" y2="70" stroke={accentHex} strokeWidth="1.1" />
          <line x1="34" y1="82" x2="55" y2="40" stroke={inkColor} strokeWidth="0.9" strokeOpacity="0.5" />
          <line x1="34" y1="82" x2="55" y2="70" stroke={inkColor} strokeWidth="0.9" strokeOpacity="0.5" />
          <line x1="69" y1="40" x2="87" y2="55" stroke={accentHex} strokeWidth="1.2" />
          <line x1="69" y1="70" x2="87" y2="55" stroke={accentHex} strokeWidth="1.2" />

          {/* Separating Margin Hyperplane on Right (SVM / Decision Boundary) */}
          <g transform="translate(108, 20)">
            {/* Bounding Frame */}
            <rect x="0" y="0" width="38" height="42" fill="#faf8f5" stroke={inkColor} strokeWidth="1" rx="2" />
            {/* Decision Boundary Line */}
            <line x1="4" y1="38" x2="34" y2="4" stroke={accentHex} strokeWidth="1.3" />
            <line x1="8" y1="42" x2="38" y2="8" stroke={accentHex} strokeWidth="0.7" strokeDasharray="1.5 1.5" />
            <line x1="0" y1="34" x2="30" y2="0" stroke={accentHex} strokeWidth="0.7" strokeDasharray="1.5 1.5" />
            {/* Class A Dots */}
            <circle cx="8" cy="14" r="1.8" fill={accentHex} />
            <circle cx="16" cy="10" r="1.8" fill={accentHex} />
            {/* Class B Crosses */}
            <line x1="24" y1="28" x2="28" y2="32" stroke={inkColor} strokeWidth="1" />
            <line x1="28" y1="28" x2="24" y2="32" stroke={inkColor} strokeWidth="1" />
            <line x1="28" y1="20" x2="32" y2="24" stroke={inkColor} strokeWidth="1" />
            <line x1="32" y1="20" x2="28" y2="24" stroke={inkColor} strokeWidth="1" />
          </g>
        </svg>
      );

    // ── 18. ARTIFICIAL INTELLIGENCE ────────────────────────────────
    case "artificial-intelligence":
      // A* Search Tree with Heuristic Path & Minimax Adversarial Cutoff
      return (
        <svg
          viewBox="0 0 160 110"
          fill="none"
          className="w-full max-w-[140px] h-auto mx-auto select-none opacity-90 group-hover:scale-105 transition-all duration-300"
          aria-hidden="true"
        >
          {/* Root Search State (Max Node / Triangle) */}
          <polygon points="80,18 89,34 71,34" fill="#faf8f5" stroke={accentHex} strokeWidth="1.4" />
          <circle cx="80" cy="28" r="2" fill={accentHex} />

          {/* Level 1 Search Branches */}
          <line x1="74" y1="34" x2="48" y2="52" stroke={inkColor} strokeWidth="1.1" />
          <line x1="86" y1="34" x2="112" y2="52" stroke={accentHex} strokeWidth="1.5" />

          {/* Left Node: Min Node (Inverted Triangle) */}
          <polygon points="48,64 39,48 57,48" fill="#faf8f5" stroke={inkColor} strokeWidth="1.2" />

          {/* Right Node (Optimal Branch chosen by f(n) = g + h) */}
          <polygon points="112,64 103,48 121,48" fill={accentHex} fillOpacity="0.14" stroke={accentHex} strokeWidth="1.4" />
          <circle cx="112" cy="54" r="2" fill={accentHex} />

          {/* Level 2 Subtree Branches */}
          <line x1="43" y1="64" x2="30" y2="84" stroke={inkColor} strokeWidth="1" />
          <line x1="53" y1="64" x2="65" y2="84" stroke={inkColor} strokeWidth="1" />

          {/* Alpha-Beta Pruning Cutoff on Left Subtree (Double Hash //) */}
          <line x1="56" y1="70" x2="62" y2="78" stroke="#dc2626" strokeWidth="1.3" />
          <line x1="60" y1="70" x2="66" y2="78" stroke="#dc2626" strokeWidth="1.3" />

          {/* Level 2 Optimal Goal Expansion from Right Node */}
          <line x1="106" y1="64" x2="94" y2="84" stroke={inkColor} strokeWidth="1.1" />
          <line x1="118" y1="64" x2="130" y2="84" stroke={accentHex} strokeWidth="1.5" />

          {/* Leaf Nodes */}
          <circle cx="30" cy="86" r="4.5" fill="#faf8f5" stroke={inkColor} strokeWidth="1" />
          <circle cx="65" cy="86" r="4" fill="#faf8f5" stroke={inkColor} strokeWidth="0.8" strokeDasharray="1.5 1.5" />
          <circle cx="94" cy="86" r="4.5" fill="#faf8f5" stroke={inkColor} strokeWidth="1" />

          {/* Goal State Node with Concentric Circles (Accept Target) */}
          <circle cx="130" cy="86" r="7" fill="#faf8f5" stroke={accentHex} strokeWidth="1.4" />
          <circle cx="130" cy="86" r="4" fill={accentHex} />
        </svg>
      );

    default:
      // Geometry and logic pattern (nested polygon / triangle) fallback
      return (
        <svg
          viewBox="0 0 160 110"
          fill="none"
          className="w-full max-w-[140px] h-auto mx-auto select-none opacity-85"
          aria-hidden="true"
        >
          <polygon points="80,24 130,86 30,86" stroke={inkColor} strokeWidth="1.2" fill="#faf8f5" />
          <polygon points="80,55 105,86 55,86" stroke={accentHex} strokeWidth="1.3" fill={accentHex} fillOpacity="0.1" />
          <circle cx="80" cy="44" r="3" fill={accentHex} />
        </svg>
      );
  }
}
