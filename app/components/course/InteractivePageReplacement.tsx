"use client";

import { useState } from "react";
import { PageReplacementConfig } from "../../../lib/courses/types";

export default function InteractivePageReplacement({
  config,
}: {
  config: PageReplacementConfig;
}) {
  const { referenceString } = config;
  const [numFrames, setNumFrames] = useState(config.defaultNumFrames || 3);
  const [algorithm, setAlgorithm] = useState<"fifo" | "lru" | "optimal">("fifo");
  const [stepIndex, setStepIndex] = useState(referenceString.length); // default to fully computed

  // Run selected simulation
  const simulate = () => {
    const frames: (number | null)[] = new Array(numFrames).fill(null);
    const history: {
      page: number;
      frames: (number | null)[];
      isFault: boolean;
      evictedPage: number | null;
    }[] = [];

    // Queue for FIFO
    const fifoQueue: number[] = [];
    // Last used map for LRU
    const lastUsedMap = new Map<number, number>();

    let faults = 0;

    referenceString.forEach((page, time) => {
      const isHit = frames.includes(page);
      let evicted: number | null = null;

      if (isHit) {
        // Update LRU time
        lastUsedMap.set(page, time);
      } else {
        faults++;
        // Check if there is an empty slot
        const emptyIdx = frames.indexOf(null);
        if (emptyIdx !== -1) {
          frames[emptyIdx] = page;
          fifoQueue.push(page);
          lastUsedMap.set(page, time);
        } else {
          // Need to evict
          if (algorithm === "fifo") {
            evicted = fifoQueue.shift()!;
            const evictIdx = frames.indexOf(evicted);
            frames[evictIdx] = page;
            fifoQueue.push(page);
          } else if (algorithm === "lru") {
            // Find frame with minimum lastUsedMap time
            let lruTime = Infinity;
            let lruPage = frames[0]!;
            frames.forEach((f) => {
              if (f !== null) {
                const t = lastUsedMap.get(f) ?? -1;
                if (t < lruTime) {
                  lruTime = t;
                  lruPage = f;
                }
              }
            });
            evicted = lruPage;
            const evictIdx = frames.indexOf(evicted);
            frames[evictIdx] = page;
            lastUsedMap.set(page, time);
          } else if (algorithm === "optimal") {
            // Find frame whose next occurrence in referenceString is farthest in the future
            let farthestTime = -1;
            let optPage = frames[0]!;
            frames.forEach((f) => {
              if (f !== null) {
                let nextIdx = Infinity;
                for (let k = time + 1; k < referenceString.length; k++) {
                  if (referenceString[k] === f) {
                    nextIdx = k;
                    break;
                  }
                }
                if (nextIdx > farthestTime) {
                  farthestTime = nextIdx;
                  optPage = f;
                }
              }
            });
            evicted = optPage;
            const evictIdx = frames.indexOf(evicted);
            frames[evictIdx] = page;
          }
        }
      }

      history.push({
        page,
        frames: [...frames],
        isFault: !isHit,
        evictedPage: evicted,
      });
    });

    return { history, totalFaults: faults };
  };

  const { history, totalFaults } = simulate();
  const visibleSteps = history.slice(0, stepIndex);
  const currentFaults = visibleSteps.filter((s) => s.isFault).length;
  const hitRatio = (
    ((visibleSteps.length - currentFaults) / Math.max(1, visibleSteps.length)) *
    100
  ).toFixed(1);

  return (
    <div className="my-6 rounded-2xl border border-hairline bg-surface-1/90 backdrop-blur-md p-4 sm:p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-hairline/60 pb-3 mb-4">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-highlight font-bold block">
            Virtual Memory Simulation
          </span>
          <h4 className="text-base sm:text-lg font-bold text-ink-1">
            {config.title}
          </h4>
        </div>

        {/* Algorithm & Frame Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Algorithm selector */}
          <div className="inline-flex rounded-lg border border-hairline bg-surface-2 p-0.5 text-xs font-mono">
            {(["fifo", "lru", "optimal"] as const).map((algo) => (
              <button
                key={algo}
                type="button"
                onClick={() => setAlgorithm(algo)}
                className={`px-2.5 py-1 rounded-md transition-all cursor-pointer uppercase ${
                  algorithm === algo
                    ? "bg-accent text-white font-bold shadow-xs"
                    : "text-ink-3 hover:text-ink-1"
                }`}
              >
                {algo}
              </button>
            ))}
          </div>

          {/* Frames selector */}
          <div className="inline-flex items-center gap-1 rounded-lg border border-hairline bg-surface-2 px-2 py-1 text-xs font-mono text-ink-2">
            <span>Frames:</span>
            {[3, 4].map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setNumFrames(f)}
                className={`px-1.5 py-0.5 rounded cursor-pointer ${
                  numFrames === f
                    ? "bg-highlight text-black font-bold"
                    : "text-ink-3 hover:text-ink-1"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {config.caption && (
        <p className="text-xs text-ink-2 mb-4 leading-relaxed font-sans">
          {config.caption}
        </p>
      )}

      {/* Metrics Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5 text-xs font-mono">
        <div className="p-3 rounded-xl border border-hairline bg-surface-2/60">
          <span className="text-[10px] text-ink-3 block">Algorithm</span>
          <span className="text-sm font-bold text-ink-1 uppercase">{algorithm}</span>
        </div>
        <div className="p-3 rounded-xl border border-hairline bg-surface-2/60">
          <span className="text-[10px] text-ink-3 block">Allocated Frames</span>
          <span className="text-sm font-bold text-ink-1">{numFrames} Frames</span>
        </div>
        <div className="p-3 rounded-xl border border-rose-500/30 bg-rose-500/10">
          <span className="text-[10px] text-rose-800 dark:text-rose-300 block font-bold">Page Faults</span>
          <span className="text-sm font-bold text-rose-900 dark:text-rose-300">
            {currentFaults} / {visibleSteps.length}
          </span>
        </div>
        <div className="p-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10">
          <span className="text-[10px] text-emerald-800 dark:text-emerald-300 block font-bold">Hit Ratio</span>
          <span className="text-sm font-bold text-emerald-900 dark:text-emerald-300">{hitRatio}%</span>
        </div>
      </div>

      {/* Step slider / buttons */}
      <div className="flex items-center justify-between gap-3 mb-4 text-xs font-mono">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setStepIndex(Math.max(1, stepIndex - 1))}
            disabled={stepIndex <= 1}
            className="px-2.5 py-1 rounded border border-hairline bg-surface-2 hover:bg-surface-3 disabled:opacity-40 cursor-pointer"
          >
            ← Prev
          </button>
          <button
            type="button"
            onClick={() => setStepIndex(Math.min(referenceString.length, stepIndex + 1))}
            disabled={stepIndex >= referenceString.length}
            className="px-2.5 py-1 rounded border border-hairline bg-surface-2 hover:bg-surface-3 disabled:opacity-40 cursor-pointer"
          >
            Next →
          </button>
          <button
            type="button"
            onClick={() => setStepIndex(referenceString.length)}
            className="px-2 py-1 text-ink-3 hover:text-ink-1 cursor-pointer"
          >
            Show All
          </button>
        </div>
        <span className="text-ink-3">
          Step {stepIndex} of {referenceString.length}
        </span>
      </div>

      {/* Frame Table Timeline Visualizer */}
      <div className="overflow-x-auto rounded-xl border border-hairline bg-surface-1 mb-4 p-3">
        <table className="text-xs font-mono text-center border-collapse">
          <thead>
            <tr>
              <th className="py-1 px-2 text-left text-ink-3">Ref:</th>
              {referenceString.map((ref, i) => (
                <th
                  key={i}
                  className={`py-1 px-2 border-l border-hairline font-bold ${
                    i === stepIndex - 1
                      ? "bg-accent text-white rounded-t"
                      : i < stepIndex
                      ? "text-ink-1"
                      : "text-ink-3/40"
                  }`}
                >
                  {ref}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: numFrames }).map((_, fIdx) => (
              <tr key={fIdx} className="border-t border-hairline/60">
                <td className="py-1.5 px-2 text-left text-ink-3 font-semibold">
                  F{fIdx}
                </td>
                {referenceString.map((_, tIdx) => {
                  const step = history[tIdx];
                  const isVisible = tIdx < stepIndex;
                  const val = isVisible ? step.frames[fIdx] : "";
                  const isJustLoaded =
                    isVisible && step.isFault && step.frames[fIdx] === step.page;

                  return (
                    <td
                      key={tIdx}
                      className={`py-1.5 px-2 border-l border-hairline ${
                        isJustLoaded
                          ? "bg-rose-500/20 font-bold text-rose-900 dark:text-rose-200"
                          : isVisible && val !== null
                          ? "text-ink-1 font-semibold"
                          : "text-transparent"
                      }`}
                    >
                      {val !== null ? val : "-"}
                    </td>
                  );
                })}
              </tr>
            ))}
            {/* Status row: Hit vs Fault */}
            <tr className="border-t border-hairline bg-surface-2/40">
              <td className="py-1 px-2 text-left text-ink-3 font-bold">Status</td>
              {referenceString.map((_, tIdx) => {
                const step = history[tIdx];
                const isVisible = tIdx < stepIndex;
                if (!isVisible) {
                  return (
                    <td key={tIdx} className="py-1 px-2 border-l border-hairline">
                      -
                    </td>
                  );
                }
                return (
                  <td
                    key={tIdx}
                    className={`py-1 px-2 border-l border-hairline font-bold ${
                      step.isFault
                        ? "text-rose-800 dark:text-rose-300 bg-rose-500/10"
                        : "text-emerald-800 dark:text-emerald-300 bg-emerald-500/10"
                    }`}
                  >
                    {step.isFault ? "M" : "H"}
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex items-center gap-4 text-[11px] font-mono text-ink-3">
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded bg-rose-500/30 border border-rose-500/50 inline-block" />
          <span>M = Page Fault (Miss)</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded bg-emerald-500/30 border border-emerald-500/50 inline-block" />
          <span>H = Page Hit</span>
        </span>
      </div>
    </div>
  );
}
