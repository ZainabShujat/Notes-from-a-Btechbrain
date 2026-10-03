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
    case "operating-systems":
      // Stacked virtual memory / abstraction layers with subtle isometric perspective
      return (
        <svg
          viewBox="0 0 160 110"
          fill="none"
          className="w-full max-w-[140px] h-auto mx-auto select-none opacity-85"
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

    case "data-structures":
      // Binary Tree with circular nodes and branch lines
      return (
        <svg
          viewBox="0 0 160 110"
          fill="none"
          className="w-full max-w-[140px] h-auto mx-auto select-none opacity-85"
          aria-hidden="true"
        >
          {/* Branch lines */}
          <line x1="80" y1="26" x2="45" y2="58" stroke={inkColor} strokeWidth="1.2" />
          <line x1="80" y1="26" x2="115" y2="58" stroke={inkColor} strokeWidth="1.2" />
          <line x1="45" y1="58" x2="28" y2="90" stroke={inkColor} strokeWidth="1.2" />
          <line x1="45" y1="58" x2="62" y2="90" stroke={inkColor} strokeWidth="1.2" />
          <line x1="115" y1="58" x2="98" y2="90" stroke={inkColor} strokeWidth="1.2" />
          <line x1="115" y1="58" x2="132" y2="90" stroke={inkColor} strokeWidth="1.2" />
          
          {/* Root node */}
          <circle cx="80" cy="26" r="9" fill="#faf8f5" stroke={accentHex} strokeWidth="1.5" />
          {/* Level 1 nodes */}
          <circle cx="45" cy="58" r="8" fill="#faf8f5" stroke={inkColor} strokeWidth="1.2" />
          <circle cx="115" cy="58" r="8" fill="#faf8f5" stroke={inkColor} strokeWidth="1.2" />
          {/* Level 2 leaves */}
          <circle cx="28" cy="90" r="6" fill="#faf8f5" stroke={inkColor} strokeWidth="1" />
          <circle cx="62" cy="90" r="6" fill="#faf8f5" stroke={inkColor} strokeWidth="1" />
          <circle cx="98" cy="90" r="6" fill="#faf8f5" stroke={inkColor} strokeWidth="1" />
          <circle cx="132" cy="90" r="6" fill="#faf8f5" stroke={inkColor} strokeWidth="1" />
        </svg>
      );

    case "algorithms":
      // 3-node cycle / state loop with curved arrows
      return (
        <svg
          viewBox="0 0 160 110"
          fill="none"
          className="w-full max-w-[140px] h-auto mx-auto select-none opacity-85"
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
          <circle cx="56" cy="85" r="9" fill="#faf8f5" stroke={inkColor} strokeWidth="1.2" />
          <circle cx="114" cy="80" r="9" fill="#faf8f5" stroke={inkColor} strokeWidth="1.2" />
        </svg>
      );

    case "dbms":
      // Database cylinder connected to relational table
      return (
        <svg
          viewBox="0 0 160 110"
          fill="none"
          className="w-full max-w-[140px] h-auto mx-auto select-none opacity-85"
          aria-hidden="true"
        >
          {/* Cylinder Top */}
          <ellipse cx="50" cy="35" rx="18" ry="7" fill="#faf8f5" stroke={accentHex} strokeWidth="1.3" />
          {/* Cylinder Body */}
          <path d="M 32 35 v 32 c 0 4 8 7 18 7 s 18 -3 18 -7 v -32" stroke={accentHex} strokeWidth="1.3" fill="none" />
          <path d="M 32 50 c 0 4 8 7 18 7 s 18 -3 18 -7" stroke={accentHex} strokeWidth="1" strokeDasharray="2 2" fill="none" />

          {/* Connection line */}
          <line x1="68" y1="52" x2="95" y2="52" stroke={inkColor} strokeWidth="1.2" />
          <polygon points="95,52 90,49 90,55" fill={inkColor} />

          {/* Table Schema */}
          <rect x="98" y="32" width="40" height="38" rx="2" fill="#faf8f5" stroke={inkColor} strokeWidth="1.2" />
          <line x1="98" y1="44" x2="138" y2="44" stroke={inkColor} strokeWidth="1" />
          <line x1="112" y1="44" x2="112" y2="70" stroke={inkColor} strokeWidth="1" strokeDasharray="1.5 1.5" />
          <line x1="125" y1="44" x2="125" y2="70" stroke={inkColor} strokeWidth="1" strokeDasharray="1.5 1.5" />
        </svg>
      );

    case "computer-networks":
      // Wireframe globe connected to workstation nodes
      return (
        <svg
          viewBox="0 0 160 110"
          fill="none"
          className="w-full max-w-[140px] h-auto mx-auto select-none opacity-85"
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

    case "theory-of-computation":
      // Automaton state machine (q0 -> q1 accept state)
      return (
        <svg
          viewBox="0 0 160 110"
          fill="none"
          className="w-full max-w-[140px] h-auto mx-auto select-none opacity-85"
          aria-hidden="true"
        >
          {/* Start arrow */}
          <line x1="20" y1="55" x2="38" y2="55" stroke={inkColor} strokeWidth="1.2" />
          <polygon points="38,55 33,52 33,58" fill={inkColor} />

          {/* State q0 */}
          <circle cx="52" cy="55" r="14" fill="#faf8f5" stroke={inkColor} strokeWidth="1.2" />
          <circle cx="52" cy="55" r="2" fill={inkColor} />

          {/* Transition q0 -> q1 */}
          <path d="M 64 47 C 78 38, 92 38, 106 47" stroke={accentHex} strokeWidth="1.2" fill="none" />
          <polygon points="106,47 99,44 102,51" fill={accentHex} />

          {/* Transition q1 -> q0 return */}
          <path d="M 106 63 C 92 72, 78 72, 64 63" stroke={inkColor} strokeWidth="1.2" fill="none" />
          <polygon points="64,63 71,66 68,59" fill={inkColor} />

          {/* Accept State q1 (double circle) */}
          <circle cx="120" cy="55" r="14" fill="#faf8f5" stroke={inkColor} strokeWidth="1.2" />
          <circle cx="120" cy="55" r="11" fill="none" stroke={accentHex} strokeWidth="1.3" />
        </svg>
      );

    case "compiler-design":
      // Compilation pipeline sequence: Lexer -> Parser -> CodeGen
      return (
        <svg
          viewBox="0 0 160 110"
          fill="none"
          className="w-full max-w-[140px] h-auto mx-auto select-none opacity-85"
          aria-hidden="true"
        >
          <rect x="20" y="44" width="28" height="24" rx="2" fill="#faf8f5" stroke={inkColor} strokeWidth="1.2" />
          <line x1="48" y1="56" x2="62" y2="56" stroke={inkColor} strokeWidth="1" />
          <polygon points="62,56 57,53 57,59" fill={inkColor} />

          <rect x="64" y="40" width="32" height="32" rx="3" fill="#faf8f5" stroke={accentHex} strokeWidth="1.4" />
          <circle cx="80" cy="56" r="6" stroke={accentHex} strokeWidth="1" />

          <line x1="96" y1="56" x2="110" y2="56" stroke={inkColor} strokeWidth="1" />
          <polygon points="110,56 105,53 105,59" fill={inkColor} />

          <rect x="112" y="44" width="28" height="24" rx="2" fill="#faf8f5" stroke={inkColor} strokeWidth="1.2" />
        </svg>
      );

    case "coa":
      // CPU Bus / ALU block diagram
      return (
        <svg
          viewBox="0 0 160 110"
          fill="none"
          className="w-full max-w-[140px] h-auto mx-auto select-none opacity-85"
          aria-hidden="true"
        >
          {/* Main Bus */}
          <line x1="25" y1="85" x2="135" y2="85" stroke={inkColor} strokeWidth="2" />
          {/* ALU Trapezoid */}
          <polygon points="45,30 95,30 85,58 55,58" fill="#faf8f5" stroke={accentHex} strokeWidth="1.3" />
          {/* Register box */}
          <rect x="105" y="32" width="28" height="26" rx="2" fill="#faf8f5" stroke={inkColor} strokeWidth="1.2" />
          {/* Drops to bus */}
          <line x1="70" y1="58" x2="70" y2="85" stroke={inkColor} strokeWidth="1.2" strokeDasharray="2 2" />
          <line x1="119" y1="58" x2="119" y2="85" stroke={inkColor} strokeWidth="1.2" strokeDasharray="2 2" />
        </svg>
      );

    case "digital-logic":
      // Logic gate symbol (NAND / XOR)
      return (
        <svg
          viewBox="0 0 160 110"
          fill="none"
          className="w-full max-w-[140px] h-auto mx-auto select-none opacity-85"
          aria-hidden="true"
        >
          <line x1="30" y1="42" x2="60" y2="42" stroke={inkColor} strokeWidth="1.2" />
          <line x1="30" y1="68" x2="60" y2="68" stroke={inkColor} strokeWidth="1.2" />
          {/* AND / NAND curve */}
          <path d="M 60 30 H 80 C 95 30 106 42 106 55 C 106 68 95 80 80 80 H 60 Z" fill="#faf8f5" stroke={accentHex} strokeWidth="1.3" />
          {/* Invert bubble */}
          <circle cx="112" cy="55" r="4" fill="#faf8f5" stroke={inkColor} strokeWidth="1.2" />
          <line x1="116" y1="55" x2="135" y2="55" stroke={inkColor} strokeWidth="1.2" />
        </svg>
      );

    case "c-programming":
      // Pointer pointing to memory box
      return (
        <svg
          viewBox="0 0 160 110"
          fill="none"
          className="w-full max-w-[140px] h-auto mx-auto select-none opacity-85"
          aria-hidden="true"
        >
          {/* Pointer box */}
          <rect x="25" y="42" width="34" height="26" rx="2" fill="#faf8f5" stroke={inkColor} strokeWidth="1.2" />
          <circle cx="42" cy="55" r="3" fill={accentHex} />
          {/* Pointer arrow */}
          <path d="M 42 55 C 65 55, 75 35, 95 48" stroke={accentHex} strokeWidth="1.4" fill="none" />
          <polygon points="95,48 88,46 91,53" fill={accentHex} />
          {/* Memory value box */}
          <rect x="98" y="38" width="38" height="34" rx="3" fill="#faf8f5" stroke={inkColor} strokeWidth="1.2" />
          <line x1="98" y1="52" x2="136" y2="52" stroke={inkColor} strokeWidth="1" strokeDasharray="2 2" />
        </svg>
      );

    case "discrete-mathematics":
      // Venn Diagram (intersecting circles)
      return (
        <svg
          viewBox="0 0 160 110"
          fill="none"
          className="w-full max-w-[140px] h-auto mx-auto select-none opacity-85"
          aria-hidden="true"
        >
          <circle cx="68" cy="55" r="28" stroke={inkColor} strokeWidth="1.2" fill="#faf8f5" fillOpacity="0.4" />
          <circle cx="92" cy="55" r="28" stroke={accentHex} strokeWidth="1.3" fill={accentHex} fillOpacity="0.08" />
        </svg>
      );

    case "engineering-mathematics":
      // Coordinate axes with area under curve
      return (
        <svg
          viewBox="0 0 160 110"
          fill="none"
          className="w-full max-w-[140px] h-auto mx-auto select-none opacity-85"
          aria-hidden="true"
        >
          {/* Axes */}
          <line x1="30" y1="20" x2="30" y2="90" stroke={inkColor} strokeWidth="1.2" />
          <line x1="30" y1="90" x2="135" y2="90" stroke={inkColor} strokeWidth="1.2" />
          {/* Curve */}
          <path
            d="M 30 85 C 50 80, 65 35, 85 45 C 105 55, 115 25, 130 30"
            stroke={accentHex}
            strokeWidth="1.4"
            fill="none"
          />
          {/* Shaded area */}
          <path
            d="M 50 75 C 65 35, 85 45, 95 50 L 95 90 L 50 90 Z"
            fill={accentHex}
            fillOpacity="0.12"
          />
        </svg>
      );

    case "general-aptitude":
    default:
      // Geometry and logic pattern (nested polygon / triangle)
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
