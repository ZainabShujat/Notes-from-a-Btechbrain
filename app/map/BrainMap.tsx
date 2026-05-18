"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import MapNode from "./MapNode";

import type { GraphNode } from "../../lib/generateMapData";

type Props = {
  clusters: GraphNode[];
};

type PositionedNode = {
  node: GraphNode;
  x: number;
  y: number;
};

export default function BrainMap({
  clusters,
}: Props) {
  const [opened, setOpened] =
    useState<string | null>(null);

  const [systemOpen, setSystemOpen] =
    useState(false);

  const [viewport, setViewport] =
    useState({
      width: 1280,
      height: 900,
    });

  useEffect(() => {
    const update = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    update();
    window.addEventListener("resize", update);

    return () =>
      window.removeEventListener("resize", update);
  }, []);

  const isMobile = viewport.width < 768;
  const navOffset = isMobile ? 92 : 104;

  const stageHeight = Math.max(
    viewport.height - navOffset,
    isMobile ? 560 : 660
  );

  const stageWidth = viewport.width;

  const baseScale =
    viewport.width < 480
      ? 0.46
      : viewport.width < 768
      ? 0.62
      : viewport.width < 1024
      ? 0.82
      : 1;

  const sunSize =
    viewport.width < 480
      ? 130
      : viewport.width < 768
      ? 168
      : viewport.width < 1024
      ? 210
      : 250;

  const centerX = stageWidth / 2;
  const centerY = stageHeight / 2;

  const maxOrbit = Math.min(
    stageWidth * (isMobile ? 0.33 : 0.35),
    stageHeight * (isMobile ? 0.32 : 0.36)
  );

  const getPlanetSize = (node: GraphNode) => {
    if (node.tier === "large") {
      return viewport.width < 768 ? 134 : 176;
    }

    if (node.tier === "medium") {
      return viewport.width < 768 ? 112 : 148;
    }

    return viewport.width < 768 ? 88 : 122;
  };

  const getOrbitRadius = (node: GraphNode) => {
    const spacing = node.tier === "large" ? 1 : node.tier === "medium" ? 0.78 : 0.56;

    return maxOrbit * spacing;
  };

  const positionedNodes = useMemo(() => {
    const visible = clusters.slice(0, 10);

    return visible.map((node, index) => {
      const angleOffset = isMobile ? -Math.PI / 2 : -Math.PI / 2.3;
      const angle = angleOffset + (index / visible.length) * Math.PI * 2;
      const orbit = getOrbitRadius(node);

      return {
        node,
        x: centerX + Math.cos(angle) * orbit,
        y: centerY + Math.sin(angle) * orbit,
      };
    });
  }, [clusters, centerX, centerY, isMobile, maxOrbit]);

  const focusedNode: PositionedNode | null =
    opened === null
      ? null
      : positionedNodes.find((item) => item.node.id === opened) || null;

  return (
    <section
      className="relative overflow-hidden bg-[#050816]"
      style={{ height: stageHeight }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.16),transparent_72%)]" />

      <div className="pointer-events-none absolute top-3 left-1/2 z-10 w-full max-w-4xl -translate-x-1/2 px-4 text-center md:top-4">
        <h1 className="text-[clamp(2.2rem,8vw,5.6rem)] font-black leading-[0.9] bg-linear-to-r from-fuchsia-300 to-purple-500 bg-clip-text text-transparent">
          Brain Map
        </h1>

        <p className="mx-auto mt-2 max-w-xl text-xs text-zinc-400 md:mt-3 md:text-base">
          Explore recurring ideas, emotional pathways, learning arcs, and
          connected constellations across the site.
        </p>
      </div>

      <motion.div
        animate={{
          scale: opened ? Math.max(1, baseScale * 1.18) : baseScale,
          x: opened && focusedNode ? stageWidth / 2 - focusedNode.x * baseScale : 0,
          y: opened && focusedNode ? stageHeight / 2 - focusedNode.y * baseScale : 0,
        }}
        transition={{
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative h-full w-full"
      >
        <div
          className="absolute z-10"
          style={{
            left: centerX,
            top: centerY,
            transform: "translate(-50%, -50%)",
          }}
        >
          <MapNode
            title="Notes From a BTech Brain"
            type="sun"
            size={sunSize}
            active={systemOpen}
            onClick={() => {
              setSystemOpen((prev) => !prev);
              setOpened(null);
            }}
          />
        </div>

        <AnimatePresence>
          {systemOpen &&
            positionedNodes.map((item, index) => {
              const isActive = opened === item.node.id;
              const isDimmed = opened !== null && !isActive;

              return (
                <motion.div
                  key={item.node.id}
                  initial={{
                    opacity: 0,
                    scale: 0,
                    x: centerX,
                    y: centerY,
                  }}
                  animate={{
                    opacity: isDimmed ? 0.2 : 1,
                    scale: isActive ? 1.08 : 1,
                    x: item.x,
                    y: item.y,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0,
                  }}
                  transition={{
                    duration: 0.7,
                    delay: index * 0.04,
                    type: "spring",
                  }}
                  className="absolute z-20"
                >
                  <MapNode
                    title={`#${item.node.label}`}
                    type="planet"
                    color={item.node.color}
                    size={getPlanetSize(item.node)}
                    active={isActive}
                    onClick={() =>
                      setOpened(
                        isActive ? null : item.node.id
                      )
                    }
                  />

                  <AnimatePresence>
                    {isActive &&
                      item.node.articles
                        .slice(0, isMobile ? 5 : 8)
                        .map((article, moonIndex) => {
                          const moonAngle = (moonIndex / 8) * Math.PI * 2;
                          const moonRadius = isMobile ? 118 : 168;

                          return (
                            <motion.a
                              key={article.slug}
                              href={`/post/${article.slug}`}
                              initial={{
                                opacity: 0,
                                scale: 0,
                              }}
                              animate={{
                                opacity: 1,
                                scale: 1,
                                x: Math.cos(moonAngle) * moonRadius,
                                y: Math.sin(moonAngle) * moonRadius,
                              }}
                              exit={{
                                opacity: 0,
                                scale: 0,
                              }}
                              transition={{
                                delay: moonIndex * 0.04,
                              }}
                              className="absolute left-1/2 top-1/2 z-30 pointer-events-auto"
                            >
                              <MapNode
                                title={article.title}
                                type="moon"
                                size={isMobile ? 62 : 78}
                              />
                            </motion.a>
                          );
                        })}
                  </AnimatePresence>
                </motion.div>
              );
            })}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
