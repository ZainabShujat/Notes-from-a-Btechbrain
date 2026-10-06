"use client";

import { useState } from "react";
import { DiskSchedulingConfig } from "../../../lib/courses/types";

export default function InteractiveDiskScheduling({
  config,
}: {
  config: DiskSchedulingConfig;
}) {
  const { initialHead, totalCylinders, requests } = config;
  const [algorithm, setAlgorithm] = useState<
    "fcfs" | "sstf" | "scan" | "c-scan" | "look" | "c-look"
  >("scan");

  // Compute disk path based on algorithm
  const computePath = () => {
    let current = initialHead;
    const pending = [...requests];
    const sequence: number[] = [initialHead];
    let totalMovement = 0;

    if (algorithm === "fcfs") {
      requests.forEach((r) => {
        totalMovement += Math.abs(r - current);
        current = r;
        sequence.push(r);
      });
    } else if (algorithm === "sstf") {
      while (pending.length > 0) {
        // Find closest
        let closestIdx = 0;
        let minDist = Math.abs(pending[0] - current);
        for (let i = 1; i < pending.length; i++) {
          const dist = Math.abs(pending[i] - current);
          if (dist < minDist) {
            minDist = dist;
            closestIdx = i;
          }
        }
        const next = pending.splice(closestIdx, 1)[0];
        totalMovement += Math.abs(next - current);
        current = next;
        sequence.push(next);
      }
    } else if (algorithm === "scan") {
      // Moves towards higher cylinders first up to totalCylinders - 1, then reverses
      const right = pending.filter((r) => r >= current).sort((a, b) => a - b);
      const left = pending.filter((r) => r < current).sort((a, b) => b - a);

      right.forEach((r) => {
        totalMovement += Math.abs(r - current);
        current = r;
        sequence.push(r);
      });
      // Go to disk boundary if left exists
      if (left.length > 0) {
        const end = totalCylinders - 1;
        totalMovement += Math.abs(end - current);
        current = end;
        sequence.push(end);

        left.forEach((r) => {
          totalMovement += Math.abs(r - current);
          current = r;
          sequence.push(r);
        });
      }
    } else if (algorithm === "c-scan") {
      // Circular SCAN: moves right to end, jumps to 0, then continues right
      const right = pending.filter((r) => r >= current).sort((a, b) => a - b);
      const left = pending.filter((r) => r < current).sort((a, b) => a - b);

      right.forEach((r) => {
        totalMovement += Math.abs(r - current);
        current = r;
        sequence.push(r);
      });

      if (left.length > 0) {
        const end = totalCylinders - 1;
        totalMovement += Math.abs(end - current);
        sequence.push(end);

        // Jump to 0 (GATE convention: counts distance or doesn't depending on problem, standard counts travel)
        totalMovement += end; // from end to 0
        current = 0;
        sequence.push(0);

        left.forEach((r) => {
          totalMovement += Math.abs(r - current);
          current = r;
          sequence.push(r);
        });
      }
    } else if (algorithm === "look") {
      // Moves to highest request, then reverses (doesn't go to end cylinder)
      const right = pending.filter((r) => r >= current).sort((a, b) => a - b);
      const left = pending.filter((r) => r < current).sort((a, b) => b - a);

      right.forEach((r) => {
        totalMovement += Math.abs(r - current);
        current = r;
        sequence.push(r);
      });
      left.forEach((r) => {
        totalMovement += Math.abs(r - current);
        current = r;
        sequence.push(r);
      });
    } else if (algorithm === "c-look") {
      // Circular LOOK: moves right to highest request, jumps to lowest request, then moves right
      const right = pending.filter((r) => r >= current).sort((a, b) => a - b);
      const left = pending.filter((r) => r < current).sort((a, b) => a - b);

      right.forEach((r) => {
        totalMovement += Math.abs(r - current);
        current = r;
        sequence.push(r);
      });

      if (left.length > 0) {
        // Jump directly to lowest request
        totalMovement += Math.abs(current - left[0]);
        current = left[0];
        sequence.push(left[0]);

        for (let i = 1; i < left.length; i++) {
          totalMovement += Math.abs(left[i] - current);
          current = left[i];
          sequence.push(left[i]);
        }
      }
    }

    return { sequence, totalMovement };
  };

  const { sequence, totalMovement } = computePath();

  // SVG dimensions
  const svgWidth = 600;
  const svgHeight = 220;
  const paddingX = 40;
  const paddingY = 30;

  const scaleX = (cylinder: number) =>
    paddingX + (cylinder / (totalCylinders - 1)) * (svgWidth - 2 * paddingX);

  const stepY = (svgHeight - 2 * paddingY) / Math.max(1, sequence.length - 1);

  return (
    <div className="my-6 rounded-2xl border border-hairline bg-surface-1/90 backdrop-blur-md p-4 sm:p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-hairline/60 pb-3 mb-4">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-accent font-bold block">
            Storage & Disk Arm Simulator
          </span>
          <h4 className="text-base sm:text-lg font-bold text-ink-1">
            {config.title}
          </h4>
        </div>

        {/* Algorithm Buttons */}
        <div className="flex flex-wrap gap-1 rounded-lg border border-hairline bg-surface-2 p-1 text-xs font-mono max-w-full overflow-x-auto">
          {(["fcfs", "sstf", "scan", "c-scan", "look", "c-look"] as const).map(
            (algo) => (
              <button
                key={algo}
                type="button"
                onClick={() => setAlgorithm(algo)}
                className={`px-2 py-1 rounded cursor-pointer uppercase whitespace-nowrap ${
                  algorithm === algo
                    ? "bg-accent text-white font-bold shadow-xs"
                    : "text-ink-3 hover:text-ink-1"
                }`}
              >
                {algo}
              </button>
            )
          )}
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
          <span className="text-[10px] text-ink-3 block">Initial Head</span>
          <span className="text-sm font-bold text-ink-1">Cylinder {initialHead}</span>
        </div>
        <div className="p-3 rounded-xl border border-hairline bg-surface-2/60">
          <span className="text-[10px] text-ink-3 block">Total Cylinders</span>
          <span className="text-sm font-bold text-ink-1">0 → {totalCylinders - 1}</span>
        </div>
        <div className="p-3 rounded-xl border border-accent/30 bg-accent/10">
          <span className="text-[10px] text-purple-800 dark:text-accent-soft block font-bold">Total Head Movement</span>
          <span className="text-sm font-bold text-accent">
            {totalMovement} Cylinders
          </span>
        </div>
        <div className="p-3 rounded-xl border border-hairline bg-surface-2/60">
          <span className="text-[10px] text-ink-3 block">Total Serviced</span>
          <span className="text-sm font-bold text-ink-1">
            {requests.length} requests
          </span>
        </div>
      </div>

      {/* Arm Movement Path Diagram */}
      <div className="rounded-xl border border-hairline bg-surface-1 p-3 mb-4 overflow-x-auto">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full min-w-[500px] h-auto select-none font-mono text-[10px]"
        >
          {/* Cylinder Axis Top */}
          <line
            x1={paddingX}
            y1={paddingY - 10}
            x2={svgWidth - paddingX}
            y2={paddingY - 10}
            stroke="currentColor"
            strokeOpacity="0.2"
            strokeWidth="1.5"
          />
          {/* Marks for 0 and End */}
          <text
            x={paddingX}
            y={paddingY - 16}
            fill="currentColor"
            opacity="0.6"
            textAnchor="middle"
          >
            0
          </text>
          <text
            x={scaleX(initialHead)}
            y={paddingY - 16}
            fill="var(--color-accent, #9333ea)"
            fontWeight="bold"
            textAnchor="middle"
          >
            {initialHead} (Start)
          </text>
          <text
            x={svgWidth - paddingX}
            y={paddingY - 16}
            fill="currentColor"
            opacity="0.6"
            textAnchor="middle"
          >
            {totalCylinders - 1}
          </text>

          {/* Grid lines for requests */}
          {requests.map((r, i) => (
            <line
              key={i}
              x1={scaleX(r)}
              y1={paddingY - 6}
              x2={scaleX(r)}
              y2={svgHeight - 10}
              stroke="currentColor"
              strokeOpacity="0.08"
              strokeDasharray="2 2"
            />
          ))}

          {/* Path line between head sequence */}
          {sequence.map((cyl, i) => {
            if (i === 0) return null;
            const prevCyl = sequence[i - 1];
            const x1 = scaleX(prevCyl);
            const y1 = paddingY + (i - 1) * stepY;
            const x2 = scaleX(cyl);
            const y2 = paddingY + i * stepY;

            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="var(--color-accent, #a855f7)"
                strokeWidth="2"
                strokeOpacity="0.8"
              />
            );
          })}

          {/* Sequence Points */}
          {sequence.map((cyl, i) => {
            const cx = scaleX(cyl);
            const cy = paddingY + i * stepY;
            const isStart = i === 0;

            return (
              <g key={i}>
                <circle
                  cx={cx}
                  cy={cy}
                  r={isStart ? 5 : 4}
                  fill={isStart ? "var(--color-accent, #9333ea)" : "var(--color-surface-1, #18181b)"}
                  stroke="var(--color-accent, #a855f7)"
                  strokeWidth="2"
                />
                <text
                  x={cx + (cyl > totalCylinders / 2 ? -8 : 8)}
                  y={cy + 3}
                  textAnchor={cyl > totalCylinders / 2 ? "end" : "start"}
                  fill="currentColor"
                  opacity="0.8"
                  fontSize="9px"
                >
                  {cyl}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Head Movement Trajectory List */}
      <div className="p-3 rounded-lg border border-hairline bg-surface-2/40 text-xs font-mono text-ink-2">
        <span className="font-bold text-accent mr-1">Servicing Order:</span>
        <span className="text-ink-1 font-bold">
          {sequence.join(" → ")}
        </span>
      </div>
    </div>
  );
}
