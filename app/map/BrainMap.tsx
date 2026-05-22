"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";


const ForceGraph2D = dynamic(
  () => import("react-force-graph-2d"),
  { ssr: false }
);

type Article = {
  title: string;
  slug: string;
  tags?: string[];
};

type Cluster = {
  id: string;
  label: string;
  count: number;
  color?: {
    base: string;
    glow: string;
  };
  articles?: Article[];
};

type Props = {
  clusters: Cluster[];
};

export default function BrainMap({
  clusters,
}: Props) {

  const fgRef = useRef<any>(null);

  const [viewport, setViewport] =
    useState({
      width: 1400,
      height: 900,
    });

  const [mapExpanded, setMapExpanded] =
    useState(false);

  const [expandedTag, setExpandedTag] =
    useState<string | null>(null);

  const [hoveredArticle, setHoveredArticle] =
    useState<string | null>(null);
    const [visibleTags, setVisibleTags] =
  useState<string[]>([]);
  const [hoveredNode, setHoveredNode] =
  useState<any>(null);

  

  useEffect(() => {

    const resize = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    resize();

    window.addEventListener(
      "resize",
      resize
    );

    return () =>
      window.removeEventListener(
        "resize",
        resize
      );

  }, []);

  const isMobile =
    viewport.width < 768;

  const stageHeight = isMobile
    ? viewport.height * 0.82
    : viewport.height * 0.9;

  const graph = useMemo(() => {

    const nodes: any[] = [];
    const links: any[] = [];

    // CORE

    nodes.push({
      id: "core",
      label: "BTech Brain",
      type: "core",
      val: isMobile ? 18 : 30,
      fx: 0,
      fy: 0,
      color: "#fbbf24",
      glow: "#fde68a",
    });

    // INITIAL STATE

    if (!mapExpanded) {
      return { nodes, links };
    }
    

    const visible = clusters.slice(
      0,
      isMobile ? 12 : 18
    );

    // TAGS

    visible.forEach(
      (tag, index) => {

        const angle =
          (index / visible.length) *
          Math.PI * 2;

        const articleCount =
          tag.articles?.length || 1;

        const distance =
          (isMobile ? 145 : 270) +
          articleCount *
            (isMobile ? 3 : 5);

        const x =
          Math.cos(angle) *
          distance;

        const y =
          Math.sin(angle) *
          distance;

        nodes.push({
          id: tag.id,
          label: `#${tag.label}`,
          type: "tag",
          val: Math.max(
            isMobile ? 5 : 8,
            articleCount * 1.4
          ),
          fx: x + Math.sin(Date.now() * 0.0003 + index) * 6,
fy: y + Math.cos(Date.now() * 0.0003 + index) * 6,
          color:
            tag.color?.base ||
            "#7c3aed",
          glow:
            tag.color?.glow ||
            "#c4b5fd",
        });

        // ONLY TO CORE

        links.push({
          source: "core",
          target: tag.id,
          value: 0.45,
        });
      }
    );

    // EXPANDED TAG

    if (expandedTag) {

      const active =
        visible.find(
          (x) =>
            x.id === expandedTag
        );

      if (active) {

        const parent =
          nodes.find(
            (x) =>
              x.id === active.id
          );

        const articles =
          active.articles?.slice(
            0,
            isMobile ? 7 : 12
          ) || [];

        articles.forEach(
          (article, idx) => {

            const angle =
              (idx / articles.length) *
              Math.PI * 2;

            const radius =
              isMobile
                ? 105
                : 165;

            const ax =
              parent.fx +
              Math.cos(angle) *
                radius;

            const ay =
              parent.fy +
              Math.sin(angle) *
                radius;

            const articleId =
              `article-${article.slug}`;

            nodes.push({
              id: articleId,
              label:
                article.title.length >
                (isMobile ? 18 : 28)
                  ? article.title.slice(
                      0,
                      isMobile ? 18 : 28
                    ) + "..."
                  : article.title,
              slug: article.slug,
              type: "article",
              val: isMobile ? 2 : 3,
              fx: ax,
              fy: ay,
              color: "#67e8f9",
              glow: "#a5f3fc",
            });

            // ARTICLE TO TAG

            links.push({
              source: active.id,
              target: articleId,
              value: 0.8,
            });

            // ONLY SHOW CONNECTIONS
            // WHEN HOVERED

            visible.forEach(
              (otherTag) => {

                if (
                  otherTag.id ===
                  active.id
                ) return;

                const hasTag =
                  article.tags?.some(
                    (t) =>
                      t
                        .toLowerCase()
                        .trim() ===
                      otherTag.id
                  );

                if (
                  hasTag &&
                  hoveredArticle === articleId
                ) {

                  links.push({
                    source: articleId,
                    target: otherTag.id,
                    value: 0.4,
                    dashed: true,
                  });

                }
              }
            );
          }
        );
      }
    }

    return {
      nodes,
      links,
    };

  }, [
    clusters,
    expandedTag,
    mapExpanded,
    hoveredArticle,
    isMobile,
  ]);

  return (

    <div
      className="relative w-full overflow-hidden"
      style={{
        height: stageHeight,
        background:
          "radial-gradient(circle at center, rgba(76,29,149,0.32) 0%, rgba(2,6,23,1) 72%)",
      }}
    >

      {/* TITLE */}

      <div className="absolute top-10 left-1/2 z-20 -translate-x-1/2 text-center px-4">

        <h1 className="text-5xl md:text-7xl font-black text-violet-300 tracking-tight">
          Brain Map
        </h1>

        <p className="mt-3 text-sm md:text-lg text-zinc-400 max-w-xl">
          Explore recurring ideas and connected constellations.
        </p>

      </div>

      {/* HELP */}

      <div className="absolute bottom-5 left-5 z-20 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md px-4 py-3 text-white shadow-2xl">

        <p className="text-xs md:text-sm text-zinc-300 leading-relaxed">
          Drag to pan
          <br />
          Scroll or pinch to zoom
          <br />
          Click nodes to explore
        </p>

      </div>

      {/* HINTS */}

      {!mapExpanded && (

        <div className="absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-[140px] rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md px-4 py-3 text-center text-white shadow-2xl animate-pulse">

          <p className="text-sm md:text-base text-zinc-200">
            ✦ Click the core to reveal major thought constellations
          </p>

        </div>
      )}

      {mapExpanded && !expandedTag && (

        <div className="absolute left-1/2 top-1/2 z-30 translate-x-[80px] -translate-y-[220px] md:translate-x-[180px] md:-translate-y-[260px] rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md px-4 py-3 text-white shadow-2xl">

          <p className="text-xs md:text-sm text-zinc-200 max-w-[220px] leading-relaxed">
            ✦ Click a constellation to reveal connected articles
          </p>

        </div>
      )}

      {expandedTag && (

        <div className="absolute bottom-6 left-1/2 z-30 -translate-x-1/2 rounded-2xl border border-red-500/20 bg-black/50 backdrop-blur-md px-4 py-3 text-white shadow-[0_0_40px_rgba(255,0,0,0.15)]">

          <p className="text-xs md:text-sm text-zinc-200 text-center leading-relaxed">
            ✦ Hover articles to reveal shared thought pathways
          </p>

        </div>
      )}

      {/* GRAPH */}

      <ForceGraph2D

        ref={fgRef}

        graphData={graph}

        width={viewport.width}

        height={stageHeight}

        backgroundColor="transparent"

        enableNodeDrag={false}

        enablePanInteraction={true}

        enableZoomInteraction={true}

        minZoom={0.35}

        maxZoom={8}

        cooldownTicks={120}

        onNodeHover={(node: any) => {

          if (
            node?.type === "article"
          ) {
            setHoveredArticle(node.id);
          } else {
            setHoveredArticle(null);
          }
        }}

        onNodeClick={(node: any) => {

          // CORE

          if (
            node.id === "core"
          ) {

            setExpandedTag(null);

            setHoveredArticle(null);

            setMapExpanded(
              (prev) => !prev
            );

            return;
          }

          // TAG

          if (
            node.type === "tag"
          ) {

            // COLLAPSE

            if (
              expandedTag === node.id
            ) {

              setExpandedTag(null);

              setHoveredArticle(null);

              return;
            }

            // EXPAND

            setExpandedTag(node.id);

            setHoveredArticle(null);

            return;
          }

          // ARTICLE

          if (
            node.type === "article"
          ) {

            window.location.href =
              `/post/${node.slug}`;
          }
        }}

        nodeCanvasObject={(
  node: any,
  ctx,
  globalScale
) => {

  const label =
    node.label;

  const isHovered =
    hoveredArticle === node.id;

  // FONT SIZE

  const fontSize =
    node.type === "core"
      ? (isMobile ? 10 : 16)

      : node.type === "tag"
      ? (isMobile ? 6 : 10)

      : (
          isHovered
            ? (isMobile ? 10 : 14)
            : (isMobile ? 3 : 5)
        );

  // NODE SIZE

  const radius =
    node.type === "article"
      ? (
          isHovered
            ? node.val * 2
            : node.val
        )
      : node.val;

  // NODE CIRCLE

  ctx.beginPath();

  ctx.arc(
    node.x,
    node.y,
    radius,
    0,
    2 * Math.PI,
    false
  );

  // GLOW

  ctx.shadowBlur =
    node.type === "core"
      ? 35

      : node.type === "tag"
      ? 24

      : (
          isHovered
            ? 32
            : 10
        );

  ctx.shadowColor =
    node.glow ||
    node.color;

  ctx.fillStyle =
    node.color;

  ctx.fill();

  ctx.shadowBlur = 0;

  // LABELS

  ctx.font =
    `${
      node.type === "core" ||
      node.type === "tag"
        ? "bold "
        : ""
    }${fontSize}px Inter`;

  ctx.textAlign =
    "center";

  ctx.textBaseline =
    "middle";

  ctx.fillStyle =
    "white";

  // FADE NON-HOVERED ARTICLES

  if (
    node.type === "article" &&
    hoveredArticle &&
    !isHovered
  ) {
    ctx.globalAlpha = 0.25;
  } else {
    ctx.globalAlpha = 1;
  }

  ctx.fillText(
    label,
    node.x,
    node.y +
      radius +
      (
        node.type === "article"
          ? (isHovered ? 16 : 10)
          : 16
      )
  );

  ctx.globalAlpha = 1;
}}

        linkCanvasObject={(
          link: any,
          ctx
        ) => {

          const start =
            link.source;

          const end =
            link.target;

          if (
            typeof start !== "object" ||
            typeof end !== "object"
          ) {
            return;
          }

          const dx =
            end.x - start.x;

          const dy =
            end.y - start.y;

          ctx.beginPath();

          ctx.moveTo(
            start.x,
            start.y
          );

          ctx.lineTo(
            end.x,
            end.y
          );

          // RED SIGNAL LINKS

          if (link.dashed) {

            ctx.strokeStyle =
              "rgba(255,40,40,0.95)";

            ctx.lineWidth = 1.4;

            ctx.shadowBlur = 18;

            ctx.shadowColor =
              "rgba(255,0,0,1)";

            ctx.stroke();

            // PARTICLES

            const time =
              Date.now() * 0.0025;

            const packetCount = 3;

            for (
              let i = 0;
              i < packetCount;
              i++
            ) {

              const t =
                (
                  (time + i * 0.33) % 1
                );

              const px =
                start.x + dx * t;

              const py =
                start.y + dy * t;

              ctx.beginPath();

              ctx.arc(
                px,
                py,
                2.2,
                0,
                Math.PI * 2
              );

              ctx.fillStyle =
                "rgba(255,120,120,1)";

              ctx.shadowBlur = 20;

              ctx.shadowColor =
                "rgba(255,80,80,1)";

              ctx.fill();
            }

          } else {

            // NORMAL LINKS

            ctx.strokeStyle =
              "rgba(255,255,255,0.14)";

            ctx.lineWidth =
              link.value || 0.5;

            ctx.shadowBlur = 0;

            ctx.stroke();
          }
        }}
      />
    </div>
  );
}