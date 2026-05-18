"use client";

import { motion } from "framer-motion";

type Props = {
  title: string;

  type: "sun" | "planet" | "moon";

  color?: {
    base: string;
    glow: string;
  };

  size?: number;

  active?: boolean;

  onClick?: () => void;
};

export default function MapNode({
  title,
  type,
  color,
  size = 140,
  active,
  onClick,
}: Props) {
  const styles = {
    sun: {
      background:
        "radial-gradient(circle at 30% 30%, #fde68a, #f59e0b)",

      shadow:
        "0 0 120px rgba(245,158,11,0.75)",
    },

    planet: {
      background: `radial-gradient(circle at 30% 30%, ${color?.glow}, ${color?.base})`,

      shadow: `0 0 60px ${color?.glow}`,
    },

    moon: {
      background:
        "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.95), rgba(220,220,255,0.6))",

      shadow:
        "0 0 40px rgba(255,255,255,0.3)",
    },
  };

  return (
    <motion.button
      onClick={onClick}
      animate={{
        scale: active ? 1.18 : 1,

        y: [0, -8, 0],
      }}
      transition={{
        y: {
          repeat: Infinity,
          duration: 5,
          ease: "easeInOut",
        },

        scale: {
          duration: 0.5,
        },
      }}
      className="
        absolute
        rounded-full
        flex
        items-center
        justify-center
        text-center
        font-bold
        px-3
        overflow-hidden
        text-black
        backdrop-blur-xl
      "
      style={{
        width: size,
        height: size,

        background:
          styles[type].background,

        boxShadow:
          styles[type].shadow,

        zIndex:
          type === "moon"
            ? 30
            : type === "planet"
            ? 20
            : 10,
      }}
    >
      <span
        className="leading-[1.05]"
        style={{
          maxWidth: "76%",
          fontSize:
            type === "moon"
              ? `${Math.max(6, Math.min(10, size * 0.18))}px`
              : type === "planet"
              ? `${Math.max(9, Math.min(14, size * 0.14))}px`
              : `${Math.max(11, Math.min(18, size * 0.12))}px`,
          wordBreak: "break-word",
          overflowWrap: "anywhere",
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: type === "moon" ? 3 : 2,
          overflow: "hidden",
        }}
      >
        {title}
      </span>
    </motion.button>
  );
}