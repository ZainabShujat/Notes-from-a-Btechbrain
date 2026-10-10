"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import type { BrainMapData, BrainMapNode } from "../../lib/generateMapData";

const ForceGraph2D = dynamic(() => import("react-force-graph-2d"), { ssr: false });
const TYPE_LABEL: Record<BrainMapNode["type"], string> = {
  edition: "Edition", wander: "Wander note", subject: "Notebook", lesson: "Lesson", experience: "Interactive", game: "Game", series: "Series", project: "Project",
};
const TYPE_COLOR: Record<BrainMapNode["type"], string> = {
  edition: "#c4b5fd", wander: "#f4bd78", subject: "#94a3b8", lesson: "#9ac9cf", experience: "#e9a6c4", game: "#d2ca90", series: "#d7b17b", project: "#c69de2",
};
const TYPES = Object.keys(TYPE_LABEL) as BrainMapNode["type"][];

type GraphNode = BrainMapNode & { x?: number; y?: number; color?: string; val?: number };
type GraphLink = { source: GraphNode | string | number; target: GraphNode | string | number; relation: string };
type GraphRef = { zoom: (scale?: number, duration?: number) => number; zoomToFit: (duration?: number, padding?: number) => void; centerAt: (x?: number, y?: number, duration?: number) => void };

function excerpt(node: BrainMapNode) {
  if (node.description) return node.description;
  if (node.category) return `${TYPE_LABEL[node.type]} · ${node.category}`;
  return `${TYPE_LABEL[node.type]} from Notes From a B.Tech Brain.`;
}

export default function BrainMap({ data }: { data: BrainMapData }) {
  const graphRef = useRef<GraphRef | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const [size, setSize] = useState({ width: 1000, height: 650 });
  const [hasMeasuredStage, setHasMeasuredStage] = useState(false);
  const [query, setQuery] = useState("");
  const [activeTypes, setActiveTypes] = useState<Set<BrainMapNode["type"]>>(() => new Set(TYPES));
  const [category, setCategory] = useState("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [canvasInk, setCanvasInk] = useState("#f5f3ff");
  const nodeById = useMemo(() => new Map(data.nodes.map((node) => [node.id, node])), [data.nodes]);

  useEffect(() => {
    const element = stageRef.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => {
      setSize({ width: Math.max(280, entry.contentRect.width), height: Math.max(280, entry.contentRect.height) });
      setHasMeasuredStage(true);
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);


  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateInk = () => setCanvasInk(getComputedStyle(document.documentElement).getPropertyValue("--theme-ink-1").trim() || "#f5f3ff");
    const themeObserver = new MutationObserver(updateInk);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "data-theme"] });
    updateInk();
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => { media.removeEventListener("change", update); themeObserver.disconnect(); };
  }, []);

  const categories = useMemo(() => [...new Set(data.nodes.filter((node) => node.type === "edition" || node.type === "series" || node.type === "subject").map((node) => node.category).filter((value): value is string => Boolean(value)))].sort((a, b) => a.localeCompare(b)), [data.nodes]);
  const normalizedQuery = query.trim().toLocaleLowerCase();
  const filteredNodes = useMemo(() => data.nodes.filter((node) => activeTypes.has(node.type) && (category === "all" || node.category === category) && (!normalizedQuery || [node.title, node.description, node.category, ...node.tags].some((value) => value?.toLocaleLowerCase().includes(normalizedQuery)))), [activeTypes, category, data.nodes, normalizedQuery]);

  useEffect(() => {
    if (!hasMeasuredStage || !graphRef.current || filteredNodes.length === 0) return;
    const frame = requestAnimationFrame(() => graphRef.current?.zoomToFit(reducedMotion ? 0 : 300, size.width < 520 ? 105 : 125));
    return () => cancelAnimationFrame(frame);
  }, [hasMeasuredStage, reducedMotion, size.height, size.width, filteredNodes.length]);
  const visibleIds = useMemo(() => new Set(filteredNodes.map((node) => node.id)), [filteredNodes]);
  const visibleEdges = useMemo(() => data.edges.filter((edge) => visibleIds.has(edge.source) && visibleIds.has(edge.target)), [data.edges, visibleIds]);
  const neighborhood = useMemo(() => {
    const set = new Set<string>();
    if (!selectedId) return set;
    set.add(selectedId);
    for (const edge of visibleEdges) {
      if (edge.source === selectedId) set.add(edge.target);
      if (edge.target === selectedId) set.add(edge.source);
    }
    return set;
  }, [selectedId, visibleEdges]);
  const graphData = useMemo(() => ({
    nodes: filteredNodes.map((node, index) => ({ ...node, color: TYPE_COLOR[node.type], val: ({ edition: 5.2, subject: 6.3, lesson: 3.6, experience: 3.5, wander: 4.1, game: 5, series: 5.7, project: 5.4 } as const)[node.type], x: Math.cos(index * 2.39996) * (150 + Math.sqrt(index) * 35), y: Math.sin(index * 2.39996) * (150 + Math.sqrt(index) * 35) })),
    links: visibleEdges.map((edge) => ({ ...edge, source: edge.source, target: edge.target, value: edge.relation === "contains" ? 0.55 : 0.8 })),
  }), [filteredNodes, visibleEdges]);
  const selected = selectedId ? nodeById.get(selectedId) : undefined;
  const focused = hoveredId ? nodeById.get(hoveredId) : undefined;
  const selectedRelationships = selected ? visibleEdges.filter((edge) => edge.source === selected.id || edge.target === selected.id).slice(0, 6) : [];
  const visibleResults = showAll ? filteredNodes : filteredNodes.slice(0, 16);

  useEffect(() => { if (selectedId && !visibleIds.has(selectedId)) setSelectedId(null); }, [selectedId, visibleIds]);

  const focusNode = useCallback((node: BrainMapNode) => {
    setSelectedId(node.id);
    const graphNode = graphData.nodes.find((candidate) => candidate.id === node.id);
    if (graphNode && graphRef.current) {
      graphRef.current.centerAt(graphNode.x, graphNode.y, reducedMotion ? 0 : 650);
      graphRef.current.zoom(1.75, reducedMotion ? 0 : 650);
    }
  }, [graphData.nodes, reducedMotion]);

  const toggleType = (type: BrainMapNode["type"]) => setActiveTypes((previous) => {
    const next = new Set(previous);
    if (next.has(type)) next.delete(type); else next.add(type);
    return next;
  });

  const clearFilters = () => { setQuery(""); setCategory("all"); setActiveTypes(new Set(TYPES)); setSelectedId(null); };
  const adjustZoom = (factor: number) => {
    const graph = graphRef.current;
    if (!graph) return;
    const current = graph.zoom();
    graph.zoom(Math.max(0.3, Math.min(5, current * factor)), reducedMotion ? 0 : 220);
  };

  return (
    <main className="min-h-screen bg-background text-ink-1">
      <header className="relative overflow-hidden border-b border-hairline bg-raised px-5 pb-8 pt-12 sm:px-8 md:pb-10 md:pt-16">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-50" style={{ background: "radial-gradient(ellipse at 78% 15%, rgb(124 58 237 / 19%), transparent 46%), radial-gradient(ellipse at 10% 95%, rgb(234 179 8 / 8%), transparent 40%)" }} />
        <div className="relative mx-auto max-w-[1440px]">
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-accent-soft">A living index of the publication</p>
          <div className="mt-4 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div className="max-w-3xl">
              <h1 className="text-4xl font-semibold tracking-[-0.045em] sm:text-5xl md:text-6xl">The Brain Map<span className="text-accent-soft">.</span></h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-ink-2 sm:text-lg">Follow the threads between essays, fleeting observations, notebooks, and the things you can try for yourself.</p>
            </div>
            <div className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-wider text-ink-3" aria-label="Map summary">
              <span><strong className="text-ink-1">{data.nodes.length}</strong> resources</span><span><strong className="text-ink-1">{data.edges.length}</strong> verified links</span>
            </div>
          </div>
          <p className="mt-4 text-xs leading-5 text-ink-3">Connections are drawn from course structure, interactive lesson sections, and links or related-edition metadata written into the publication.</p>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1600px] gap-4 px-3 py-4 sm:px-5 lg:grid-cols-[minmax(0,1fr)_350px] lg:gap-5 lg:px-8 lg:py-7">
        <section aria-label="Interactive knowledge graph" className="min-w-0 overflow-hidden rounded-2xl border border-hairline bg-raised shadow-card">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-hairline px-4 py-3 sm:px-5">
            <div className="flex flex-wrap gap-x-4 gap-y-2" aria-label="Resource legend">
              {TYPES.map((type) => <span key={type} className="inline-flex items-center gap-2 text-[11px] text-ink-2"><span aria-hidden="true" className="size-2 rounded-full" style={{ background: TYPE_COLOR[type] }} />{TYPE_LABEL[type]}</span>)}
            </div>
            <div className="flex flex-wrap gap-2" aria-label="Map controls">
              <button type="button" aria-label="Zoom in" onClick={() => adjustZoom(1.35)} className="size-9 rounded-lg border border-hairline text-base text-ink-2 transition hover:bg-surface-2 focus-visible:outline-2 focus-visible:outline-accent-soft">+</button>
              <button type="button" aria-label="Zoom out" onClick={() => adjustZoom(1 / 1.35)} className="size-9 rounded-lg border border-hairline text-base text-ink-2 transition hover:bg-surface-2 focus-visible:outline-2 focus-visible:outline-accent-soft">−</button>
              <button type="button" onClick={() => graphRef.current?.zoomToFit(reducedMotion ? 0 : 500, size.width < 520 ? 105 : 125)} className="rounded-lg border border-hairline px-3 py-2 text-xs text-ink-2 transition hover:bg-surface-2 focus-visible:outline-2 focus-visible:outline-accent-soft">Fit map</button>
              <button type="button" onClick={() => { graphRef.current?.centerAt(0, 0, reducedMotion ? 0 : 450); graphRef.current?.zoom(1, reducedMotion ? 0 : 450); setSelectedId(null); }} className="rounded-lg border border-hairline px-3 py-2 text-xs text-ink-2 transition hover:bg-surface-2 focus-visible:outline-2 focus-visible:outline-accent-soft">Reset</button>
            </div>
          </div>
          <div ref={stageRef} className="relative h-[clamp(320px,58svh,680px)] touch-none overflow-hidden bg-sunken sm:h-[clamp(380px,64dvh,760px)] lg:h-[min(76dvh,820px)]" style={{ backgroundImage: "radial-gradient(circle at 48% 48%, rgb(124 58 237 / 10%), transparent 48%), radial-gradient(circle at 22% 22%, rgb(148 163 184 / 5%) 1px, transparent 1.5px)", backgroundSize: "auto, 35px 35px" }}>
            {filteredNodes.length > 0 ? <ForceGraph2D
              ref={graphRef as never}
              graphData={graphData}
              width={size.width}
              height={size.height}
              backgroundColor="transparent"
              cooldownTicks={reducedMotion ? 35 : 65}
              d3AlphaDecay={0.08}
              d3VelocityDecay={0.34}
              warmupTicks={Math.min(30, graphData.nodes.length)}
              enableNodeDrag={false}
              enablePanInteraction
              enableZoomInteraction
              minZoom={0.3}
              maxZoom={5}
              onNodeHover={((node: GraphNode | null) => setHoveredId(node?.id || null)) as never}
              onNodeClick={((node: GraphNode) => focusNode(node)) as never}
              nodeRelSize={1}
              nodeCanvasObject={((node: GraphNode, ctx: CanvasRenderingContext2D, globalScale: number) => {
                const radius = node.val || 4;
                const active = !selectedId || neighborhood.has(node.id);
                ctx.globalAlpha = active ? 0.92 : 0.2;
                ctx.beginPath(); ctx.arc(node.x || 0, node.y || 0, radius, 0, 2 * Math.PI);
                ctx.fillStyle = node.color || "#c4b5fd";
                if (node.id === selectedId) { ctx.shadowBlur = 12; ctx.shadowColor = node.color || "#c4b5fd"; }
                ctx.fill(); ctx.shadowBlur = 0;
                if (node.id === selectedId) { ctx.beginPath(); ctx.arc(node.x || 0, node.y || 0, radius + 4, 0, 2 * Math.PI); ctx.strokeStyle = node.color || "#c4b5fd"; ctx.lineWidth = 1 / globalScale; ctx.stroke(); }
                const labelVisible = globalScale > (node.type === "subject" ? (size.width < 520 ? 0.8 : 0.62) : (size.width < 520 ? 1.35 : 1.05)) || node.id === selectedId || node.id === hoveredId;
                if (labelVisible) {
                  const fontSize = Math.max(3, Math.min(13, (node.id === selectedId ? 12 : 10) / globalScale));
                  ctx.font = `${node.id === selectedId ? "600 " : ""}${fontSize}px Inter, ui-sans-serif, sans-serif`;
                  ctx.textAlign = "center"; ctx.textBaseline = "top"; ctx.fillStyle = canvasInk;
                  ctx.fillText(node.title.length > 30 ? `${node.title.slice(0, 28)}…` : node.title, node.x || 0, (node.y || 0) + radius + 4);
                }
                ctx.globalAlpha = 1;
              }) as never}
              linkCanvasObject={((link: GraphLink, ctx: CanvasRenderingContext2D) => {
                if (typeof link.source !== "object" || typeof link.target !== "object") return;
                const source = link.source; const target = link.target;
                const active = !selectedId || neighborhood.has(source.id) && neighborhood.has(target.id);
                ctx.beginPath(); ctx.moveTo(source.x || 0, source.y || 0); ctx.lineTo(target.x || 0, target.y || 0);
                ctx.strokeStyle = active ? (link.relation === "contains" ? "rgb(148 163 184 / 22%)" : "rgb(196 181 253 / 52%)") : "rgb(148 163 184 / 8%)";
                ctx.lineWidth = link.relation === "contains" ? 0.65 : 1.1; ctx.stroke();
              }) as never}
              onEngineStop={() => graphRef.current?.zoomToFit(reducedMotion ? 0 : 350, size.width < 520 ? 105 : 125)}
            /> : <div className="grid h-full place-items-center p-8 text-center text-sm text-ink-2">No resources match those filters. Try another search or reset the filters.</div>}
            {focused && <div className="pointer-events-none absolute bottom-3 left-3 max-w-[min(88%,420px)] rounded-xl border border-hairline bg-raised/95 px-4 py-3 shadow-card backdrop-blur"><p className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent-soft">{TYPE_LABEL[focused.type]}</p><p className="mt-1 text-sm font-medium text-ink-1">{focused.title}</p><p className="mt-1 line-clamp-2 text-xs leading-5 text-ink-2">{excerpt(focused)}</p></div>}
            <span className="pointer-events-none absolute bottom-3 right-3 rounded-full border border-hairline bg-raised/85 px-3 py-1.5 font-mono text-[10px] text-ink-3">Drag to pan · pinch or use + / − to zoom</span>
          </div>
          <p className="border-t border-hairline px-4 py-3 text-xs leading-5 text-ink-3 sm:px-5">Choose a point to see its context. Use the resource list alongside the map for keyboard-accessible exploration.</p>
        </section>

        <aside className="flex min-h-[520px] flex-col gap-4 lg:sticky lg:top-5 lg:max-h-[calc(100svh-2.5rem)] lg:self-start">
          <section className="rounded-2xl border border-hairline bg-raised p-4 shadow-card sm:p-5">
            <label htmlFor="map-search" className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-3">Find a thread</label>
            <input id="map-search" value={query} onChange={(event) => { setQuery(event.target.value); setShowAll(false); }} placeholder="Search titles, tags, topics…" className="mt-3 w-full rounded-xl border border-hairline bg-sunken px-3.5 py-3 text-sm text-ink-1 outline-none placeholder:text-ink-3 focus:border-accent-soft focus:ring-2 focus:ring-accent-soft/20" />
            <label htmlFor="map-category" className="mt-4 block text-[11px] font-medium text-ink-3">Notebook / category</label>
            <select id="map-category" value={category} onChange={(event) => setCategory(event.target.value)} className="mt-1.5 w-full rounded-lg border border-hairline bg-sunken px-3 py-2.5 text-sm text-ink-1 focus-visible:outline-2 focus-visible:outline-accent-soft"><option value="all">All categories</option>{categories.map((item) => <option key={item} value={item}>{item}</option>)}</select>
            <fieldset className="mt-4"><legend className="mb-2 text-[11px] font-medium text-ink-3">Show resource types</legend><div className="flex flex-wrap gap-2">{TYPES.map((type) => <button key={type} type="button" aria-pressed={activeTypes.has(type)} onClick={() => toggleType(type)} className={`rounded-full border px-2.5 py-1.5 text-[11px] transition focus-visible:outline-2 focus-visible:outline-accent-soft ${activeTypes.has(type) ? "border-hairline-strong bg-surface-2 text-ink-1" : "border-hairline text-ink-3 opacity-65"}`}><span className="mr-1.5 inline-block size-1.5 rounded-full" style={{ background: TYPE_COLOR[type] }} />{TYPE_LABEL[type]}</button>)}</div></fieldset>
            <div className="mt-4 flex items-center justify-between border-t border-hairline pt-3 text-xs text-ink-3"><span aria-live="polite">{filteredNodes.length} of {data.nodes.length} resources</span><button type="button" onClick={clearFilters} className="font-medium text-accent-soft underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-accent-soft">Clear filters</button></div>
          </section>

          {selected ? <section aria-labelledby="map-detail-title" className="rounded-2xl border border-hairline bg-raised p-5 shadow-card">
            <div className="flex items-center justify-between gap-3"><span className="font-mono text-[10px] uppercase tracking-[0.17em] text-accent-soft">{TYPE_LABEL[selected.type]}</span><button type="button" onClick={() => setSelectedId(null)} aria-label="Close selected resource" className="rounded-md px-2 py-1 text-ink-3 hover:bg-surface-2 hover:text-ink-1 focus-visible:outline-2 focus-visible:outline-accent-soft">✕</button></div>
            <h2 id="map-detail-title" className="mt-3 text-xl font-semibold leading-snug tracking-tight">{selected.title}</h2>
            <p className="mt-3 text-sm leading-6 text-ink-2">{excerpt(selected)}</p>
            {selected.category && <p className="mt-3 text-xs text-ink-3">{selected.category}</p>}
            {selectedRelationships.length > 0 && <div className="mt-4 border-t border-hairline pt-3"><p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-ink-3">Connected by</p><ul className="mt-2 space-y-2">{selectedRelationships.map((edge) => { const related = nodeById.get(edge.source === selected.id ? edge.target : edge.source); return <li key={edge.id} className="text-xs leading-5 text-ink-2"><span className="font-medium text-ink-1">{related?.title || "Related resource"}</span><span className="block text-[10px] text-ink-3">{edge.provenance}</span></li>; })}</ul></div>}
            {selected.tags.length > 0 && <div className="mt-3 flex flex-wrap gap-1.5">{selected.tags.slice(0, 8).map((tag) => <span key={tag} className="rounded-full bg-surface-2 px-2 py-1 text-[10px] text-ink-3">{tag}</span>)}</div>}
            <Link href={selected.href} target={selected.href.startsWith("http") ? "_blank" : undefined} rel={selected.href.startsWith("http") ? "noreferrer" : undefined} className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-accent px-4 py-3 text-sm font-semibold text-on-accent transition hover:bg-accent-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-soft">Open original resource <span aria-hidden="true" className="ml-2">↗</span></Link>
          </section> : <section className="rounded-2xl border border-hairline bg-raised p-5 shadow-card"><p className="font-mono text-[10px] uppercase tracking-[0.17em] text-ink-3">Reading the map</p><h2 className="mt-2 text-lg font-semibold">A point of entry, not a dead end.</h2><p className="mt-2 text-sm leading-6 text-ink-2">Select an idea to follow the verified links around it, or search the archive directly.</p></section>}

          <section aria-label="Accessible resource index" className="min-h-0 flex-1 rounded-2xl border border-hairline bg-raised p-4 shadow-card sm:p-5">
            <div className="flex items-baseline justify-between gap-3"><h2 className="text-sm font-semibold">Resources</h2><span className="font-mono text-[10px] text-ink-3">{visibleResults.length} shown</span></div>
            <ul className="mt-2 max-h-72 divide-y divide-hairline overflow-y-auto lg:max-h-[28svh]" aria-label="Matching resources">{visibleResults.map((node) => <li key={node.id}><button type="button" onClick={() => focusNode(node)} onFocus={() => setHoveredId(node.id)} onBlur={() => setHoveredId(null)} aria-pressed={selectedId === node.id} className={`w-full rounded-lg px-2.5 py-2.5 text-left transition hover:bg-surface-2 focus-visible:outline-2 focus-visible:outline-accent-soft ${selectedId === node.id ? "bg-surface-2" : ""}`}><span className="flex items-center gap-2"><span aria-hidden="true" className="size-1.5 shrink-0 rounded-full" style={{ background: TYPE_COLOR[node.type] }} /><span className="line-clamp-1 text-xs font-medium text-ink-1">{node.title}</span></span><span className="ml-3.5 mt-1 block line-clamp-1 text-[10px] text-ink-3">{TYPE_LABEL[node.type]}{node.category ? ` · ${node.category}` : ""}</span></button></li>)}</ul>
            {filteredNodes.length > 16 && <button type="button" onClick={() => setShowAll((value) => !value)} className="mt-2 w-full rounded-lg border border-hairline px-3 py-2 text-xs text-ink-2 hover:bg-surface-2 focus-visible:outline-2 focus-visible:outline-accent-soft">{showAll ? "Show fewer" : `Show all ${filteredNodes.length} results`}</button>}
            {filteredNodes.length === 0 && <p className="py-5 text-sm text-ink-3">No matching resources. Clear or adjust your filters.</p>}
          </section>
        </aside>
      </div>
      <footer className="mx-auto max-w-[1600px] px-5 pb-8 text-center text-xs text-ink-3 sm:px-8">A small atlas of what we’ve made and wondered about so far.</footer>
    </main>
  );
}
