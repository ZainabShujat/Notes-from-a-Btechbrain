"use client";

/**
 * Decorative glyphs for the seasonal themes.
 *
 * Replaces emoji, which rendered differently on every platform and read
 * as clip-art. These are geometric marks that inherit the surrounding
 * font-size (width/height are 1em) and the current colour, so the
 * existing particle CSS keeps working unchanged.
 */

type GlyphName =
  | "bloom"
  | "leaf"
  | "spark"
  | "star"
  | "burst"
  | "orbit"
  | "heart"
  | "crescent"
  | "circuit"
  | "book"
  | "nib"
  | "balloon"
  | "ribbon"
  | "cross"
  | "drop";

const paths: Record<GlyphName, React.ReactNode> = {
  // six-petal bloom
  bloom: (
    <g>
      {[0, 60, 120, 180, 240, 300].map((a) => (
        <ellipse
          key={a}
          cx="12"
          cy="6.6"
          rx="2.6"
          ry="4.4"
          transform={`rotate(${a} 12 12)`}
        />
      ))}
      <circle cx="12" cy="12" r="2" opacity="0.55" />
    </g>
  ),
  leaf: (
    <path d="M12 2C6.5 5 3.5 9 3.5 14c0 4.5 3.4 8 8.5 8 .3-6.4 2.6-11.4 7-15.4C17.6 4.2 15 2.6 12 2Z" />
  ),
  spark: (
    <path d="M12 1.5 13.7 9 21 11.5 13.7 14 12 21.5 10.3 14 3 11.5 10.3 9Z" />
  ),
  star: (
    <path d="M12 2.5 14.6 9.3 21.5 9.9 16.3 14.4 17.9 21.2 12 17.6 6.1 21.2 7.7 14.4 2.5 9.9 9.4 9.3Z" />
  ),
  burst: (
    <g>
      {[0, 45, 90, 135].map((a) => (
        <rect
          key={a}
          x="11.2"
          y="2"
          width="1.6"
          height="20"
          rx="0.8"
          transform={`rotate(${a} 12 12)`}
        />
      ))}
    </g>
  ),
  orbit: (
    <g>
      <circle cx="12" cy="12" r="3.2" />
      <ellipse
        cx="12"
        cy="12"
        rx="10"
        ry="4.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        transform="rotate(-24 12 12)"
      />
    </g>
  ),
  heart: (
    <path d="M12 21s-8.2-5-8.2-10.4A4.8 4.8 0 0 1 12 7.4a4.8 4.8 0 0 1 8.2 3.2C20.2 16 12 21 12 21Z" />
  ),
  crescent: (
    <path d="M17.5 3a9.5 9.5 0 1 0 3.2 15.2A8 8 0 0 1 17.5 3Z" />
  ),
  circuit: (
    <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <path d="M3 12h5m8 0h5M12 3v5m0 8v5" />
      <rect x="8.5" y="8.5" width="7" height="7" rx="1.6" />
    </g>
  ),
  book: (
    <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
      <path d="M4 5.5h5.5A2.5 2.5 0 0 1 12 8v11a2 2 0 0 0-2-2H4Z" />
      <path d="M20 5.5h-5.5A2.5 2.5 0 0 0 12 8v11a2 2 0 0 1 2-2h6Z" />
    </g>
  ),
  nib: (
    <path d="M4 20l2.6-7.2 8-8a2.4 2.4 0 0 1 3.4 3.4l-8 8L4 20Z" />
  ),
  balloon: (
    <g>
      <ellipse cx="12" cy="9" rx="5.6" ry="6.6" />
      <path
        d="M12 15.6c0 2 1.6 2.6 1.6 4.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </g>
  ),
  ribbon: (
    <path d="M12 3l2.4 5.4 5.6.6-4.2 3.9 1.2 5.7L12 15.8 6.9 18.6l1.2-5.7L4 9l5.6-.6Z" opacity="0.9" />
  ),
  cross: (
    <path d="M9.6 2h4.8v7.2H21v4.8h-6.6V21H9.6v-7H3V9.2h6.6Z" />
  ),
  drop: <path d="M12 2.5c4 5 6.5 8.2 6.5 11.4a6.5 6.5 0 0 1-13 0C5.5 10.7 8 7.5 12 2.5Z" />,
};

export default function ThemeGlyph({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const glyph = paths[name as GlyphName] ?? paths.spark;

  return (
    <svg
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={className}
      style={{ display: "block" }}
    >
      {glyph}
    </svg>
  );
}
