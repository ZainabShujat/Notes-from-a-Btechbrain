"use client";

import { useState } from "react";
import { SlidingWindowConfig } from "../../../lib/courses/types";

type Protocol = "stop-and-wait" | "go-back-n" | "selective-repeat";

type Transmission = {
  frame: number;
  status: "delivered" | "lost" | "discarded" | "buffered" | "resent";
};

const PROTOCOL_LABELS: Record<Protocol, string> = {
  "stop-and-wait": "Stop-and-Wait",
  "go-back-n": "Go-Back-N",
  "selective-repeat": "Selective Repeat",
};

const range = (from: number, to: number) =>
  Array.from({ length: Math.max(0, to - from) }, (_, i) => from + i);

/**
 * Order of frames on the wire when one frame is lost once and no ACK is lost.
 * The sender's window has base = lost frame when the loss happens, so frames
 * lost .. lost + W - 1 are already in flight before the timeout fires.
 */
function simulate(protocol: Protocol, frames: number, windowSize: number, lost: number | null): Transmission[] {
  if (lost === null) return range(0, frames).map((frame) => ({ frame, status: "delivered" }));

  const w = protocol === "stop-and-wait" ? 1 : windowSize;
  const inFlightEnd = Math.min(lost + w, frames);
  const firstPass: Transmission[] = range(0, inFlightEnd).map((frame) => ({
    frame,
    status:
      frame < lost
        ? "delivered"
        : frame === lost
          ? "lost"
          : protocol === "selective-repeat"
            ? "buffered"
            : "discarded",
  }));

  if (protocol === "selective-repeat") {
    return [
      ...firstPass,
      { frame: lost, status: "resent" },
      ...range(inFlightEnd, frames).map((frame): Transmission => ({ frame, status: "delivered" })),
    ];
  }

  // Stop-and-Wait and Go-Back-N resend everything from the lost frame onward.
  return [
    ...firstPass,
    ...range(lost, frames).map((frame): Transmission => ({
      frame,
      status: frame < inFlightEnd ? "resent" : "delivered",
    })),
  ];
}

const STATUS_STYLES: Record<Transmission["status"], { box: string; note: string }> = {
  delivered: { box: "border-accent/50 bg-accent/10 text-ink-1", note: "" },
  lost: { box: "border-rose-500 bg-rose-500/15 text-rose-400 line-through", note: "lost" },
  discarded: { box: "border-dashed border-amber-500/70 bg-amber-500/10 text-amber-500", note: "discarded" },
  buffered: { box: "border-dashed border-sky-500/70 bg-sky-500/10 text-sky-400", note: "buffered" },
  resent: { box: "border-accent bg-accent text-white font-bold", note: "resent" },
};

function describe(protocol: Protocol, frames: number, windowSize: number, lost: number | null) {
  if (lost === null) return "No loss: every frame is delivered on its first transmission.";
  const w = protocol === "stop-and-wait" ? 1 : windowSize;
  const lastInFlight = Math.min(lost + w, frames) - 1;
  const after = lastInFlight > lost ? `frames ${lost + 1}–${lastInFlight}` : null;

  if (protocol === "stop-and-wait") {
    return `Frame ${lost} is lost. The sender waits for its timeout, resends frame ${lost}, and only then moves on.`;
  }
  if (protocol === "go-back-n") {
    return after
      ? `Frame ${lost} is lost. The receiver accepts only in-order frames, so it discards ${after}. On timeout the sender goes back and resends frames ${lost}–${lastInFlight}.`
      : `Frame ${lost} is lost. Nothing else was in flight, so only frame ${lost} is resent.`;
  }
  return after
    ? `Frame ${lost} is lost. The receiver buffers ${after} out of order and the sender resends only frame ${lost}.`
    : `Frame ${lost} is lost. Only frame ${lost} is resent.`;
}

export default function InteractiveSlidingWindow({ config }: { config: SlidingWindowConfig }) {
  const [protocol, setProtocol] = useState<Protocol>("go-back-n");
  const [frames, setFrames] = useState(config.frameCount);
  const [windowSize, setWindowSize] = useState(config.windowSize);
  const [a, setA] = useState(config.propagationRatio);
  const [lost, setLost] = useState<number | null>(config.lostFrame);

  const effectiveWindow = protocol === "stop-and-wait" ? 1 : windowSize;
  const efficiency = Math.min(1, effectiveWindow / (1 + 2 * a));
  const windowForFullUse = Math.ceil(1 + 2 * a);
  const sequenceBits =
    protocol === "stop-and-wait"
      ? 1
      : protocol === "go-back-n"
        ? Math.ceil(Math.log2(windowSize + 1))
        : Math.ceil(Math.log2(2 * windowSize));

  const safeLost = lost !== null && lost < frames ? lost : null;
  const transmissions = simulate(protocol, frames, windowSize, safeLost);
  const retransmissions = transmissions.length - frames;

  return (
    <div className="my-6 rounded-2xl border border-hairline bg-surface-1/90 backdrop-blur-md p-4 sm:p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-hairline/60 pb-3 mb-4">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-accent font-bold block">
            Data Link Flow Control Simulator
          </span>
          <h4 className="text-base sm:text-lg font-bold text-ink-1">{config.title}</h4>
        </div>

        <div className="flex flex-wrap gap-1 rounded-lg border border-hairline bg-surface-2 p-1 text-xs font-mono max-w-full overflow-x-auto">
          {(Object.keys(PROTOCOL_LABELS) as Protocol[]).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setProtocol(p)}
              aria-pressed={protocol === p}
              className={`px-2 py-1 rounded cursor-pointer whitespace-nowrap ${
                protocol === p ? "bg-accent text-white font-bold shadow-xs" : "text-ink-3 hover:text-ink-1"
              }`}
            >
              {PROTOCOL_LABELS[p]}
            </button>
          ))}
        </div>
      </div>

      {config.caption && <p className="text-xs text-ink-2 mb-4 leading-relaxed font-sans">{config.caption}</p>}

      {/* Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5 text-xs font-mono">
        <label className="block">
          <span className="text-ink-3 block mb-1">
            Window size W<sub>s</sub> = <strong className="text-ink-1">{effectiveWindow}</strong>
            {protocol === "stop-and-wait" && " (fixed at 1)"}
          </span>
          <input
            type="range"
            min={1}
            max={16}
            value={windowSize}
            disabled={protocol === "stop-and-wait"}
            onChange={(e) => setWindowSize(Number(e.target.value))}
            className="w-full accent-[var(--color-accent,#9333ea)] disabled:opacity-40"
          />
        </label>
        <label className="block">
          <span className="text-ink-3 block mb-1">
            a = T<sub>p</sub> / T<sub>t</sub> = <strong className="text-ink-1">{a}</strong>
          </span>
          <input
            type="range"
            min={0}
            max={20}
            step={0.5}
            value={a}
            onChange={(e) => setA(Number(e.target.value))}
            className="w-full accent-[var(--color-accent,#9333ea)]"
          />
        </label>
        <label className="block">
          <span className="text-ink-3 block mb-1">
            Frames to send = <strong className="text-ink-1">{frames}</strong>
          </span>
          <input
            type="range"
            min={4}
            max={16}
            value={frames}
            onChange={(e) => setFrames(Number(e.target.value))}
            className="w-full accent-[var(--color-accent,#9333ea)]"
          />
        </label>
        <label className="block">
          <span className="text-ink-3 block mb-1">Lose this frame once</span>
          <select
            value={safeLost ?? ""}
            onChange={(e) => setLost(e.target.value === "" ? null : Number(e.target.value))}
            className="w-full rounded border border-hairline bg-surface-2 px-2 py-1.5 text-ink-1"
          >
            <option value="">No loss</option>
            {range(0, frames).map((f) => (
              <option key={f} value={f}>
                Frame {f}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5 text-xs font-mono">
        <div className="p-3 rounded-xl border border-accent/30 bg-accent/10">
          <span className="text-[10px] text-purple-800 dark:text-accent-soft block font-bold">
            Efficiency η = min(1, W<sub>s</sub>/(1+2a))
          </span>
          <span className="text-sm font-bold text-accent">{(efficiency * 100).toFixed(1)}%</span>
        </div>
        <div className="p-3 rounded-xl border border-hairline bg-surface-2/60">
          <span className="text-[10px] text-ink-3 block">W<sub>s</sub> for 100% use</span>
          <span className="text-sm font-bold text-ink-1">≥ {windowForFullUse} frames</span>
        </div>
        <div className="p-3 rounded-xl border border-hairline bg-surface-2/60">
          <span className="text-[10px] text-ink-3 block">Sequence bits needed</span>
          <span className="text-sm font-bold text-ink-1">k = {sequenceBits}</span>
        </div>
        <div className="p-3 rounded-xl border border-hairline bg-surface-2/60">
          <span className="text-[10px] text-ink-3 block">Transmissions</span>
          <span className="text-sm font-bold text-ink-1">
            {transmissions.length}
            {retransmissions > 0 && <span className="text-rose-400"> (+{retransmissions} resent)</span>}
          </span>
        </div>
      </div>

      {/* Wire timeline */}
      <div className="rounded-xl border border-hairline bg-surface-1 p-3 mb-3">
        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-ink-3 block mb-2">
          Frames on the wire, in order
        </span>
        <ol className="flex flex-wrap gap-1.5" aria-label="Transmission order">
          {transmissions.map((t, i) => {
            const style = STATUS_STYLES[t.status];
            return (
              <li
                key={i}
                className={`w-12 rounded-md border px-1 py-1.5 text-center font-mono ${style.box}`}
                title={style.note ? `Frame ${t.frame}: ${style.note}` : `Frame ${t.frame}`}
              >
                <span className="block text-sm leading-none">{t.frame}</span>
                <span className="block text-[9px] mt-1 leading-none no-underline opacity-90">
                  {style.note || " "}
                </span>
              </li>
            );
          })}
        </ol>
      </div>

      <p className="p-3 rounded-lg border border-hairline bg-surface-2/40 text-xs text-ink-2 leading-relaxed">
        {describe(protocol, frames, windowSize, safeLost)}
      </p>
    </div>
  );
}
