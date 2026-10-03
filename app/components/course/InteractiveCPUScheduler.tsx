"use client";

import { useState, useMemo } from "react";
import { CPUSchedulerConfig, ProcessScheduleItem } from "../../../lib/courses/types";

interface GanttBlock {
  processId: string;
  start: number;
  end: number;
  isIdle?: boolean;
}

export default function InteractiveCPUScheduler({
  config,
}: {
  config: CPUSchedulerConfig;
}) {
  const [algorithm, setAlgorithm] = useState<"fcfs" | "round-robin">(
    config.defaultAlgorithm === "round-robin" ? "round-robin" : "fcfs"
  );
  const [quantum, setQuantum] = useState(config.defaultQuantum || 2);
  const [processes] = useState<ProcessScheduleItem[]>(config.sampleProcesses);

  // Compute Gantt Chart and Metrics
  const { ganttChart, processStats, avgTAT, avgWT } = useMemo(() => {
    const gantt: GanttBlock[] = [];
    const stats: Record<string, { ct: number; tat: number; wt: number }> = {};

    if (algorithm === "fcfs") {
      // Sort by arrival time, then ID
      const queue = [...processes].sort((a, b) => a.arrivalTime - b.arrivalTime);
      let currentTime = 0;

      for (const p of queue) {
        if (currentTime < p.arrivalTime) {
          gantt.push({
            processId: "IDLE",
            start: currentTime,
            end: p.arrivalTime,
            isIdle: true,
          });
          currentTime = p.arrivalTime;
        }

        const start = currentTime;
        const end = start + p.burstTime;
        gantt.push({ processId: p.id, start, end });
        currentTime = end;

        const ct = end;
        const tat = ct - p.arrivalTime;
        const wt = tat - p.burstTime;
        stats[p.id] = { ct, tat, wt };
      }
    } else {
      // Round Robin
      const remainingBurst: Record<string, number> = {};
      processes.forEach((p) => {
        remainingBurst[p.id] = p.burstTime;
      });

      let currentTime = 0;
      const readyQueue: string[] = [];
      const arrivedSet = new Set<string>();

      // Check initial arrivals at t=0
      processes
        .filter((p) => p.arrivalTime <= currentTime)
        .sort((a, b) => a.arrivalTime - b.arrivalTime)
        .forEach((p) => {
          readyQueue.push(p.id);
          arrivedSet.add(p.id);
        });

      let completedCount = 0;
      let loopLimit = 100; // guard against infinite loops

      while (completedCount < processes.length && loopLimit-- > 0) {
        if (readyQueue.length === 0) {
          // Find next process arrival
          const unarrived = processes.filter((p) => !arrivedSet.has(p.id));
          if (unarrived.length > 0) {
            unarrived.sort((a, b) => a.arrivalTime - b.arrivalTime);
            const nextP = unarrived[0];
            gantt.push({
              processId: "IDLE",
              start: currentTime,
              end: nextP.arrivalTime,
              isIdle: true,
            });
            currentTime = nextP.arrivalTime;
            unarrived
              .filter((p) => p.arrivalTime <= currentTime)
              .forEach((p) => {
                readyQueue.push(p.id);
                arrivedSet.add(p.id);
              });
          } else {
            break;
          }
        }

        const currentPId = readyQueue.shift()!;
        const pObj = processes.find((p) => p.id === currentPId)!;
        const runTime = Math.min(quantum, remainingBurst[currentPId]);
        const start = currentTime;
        const end = start + runTime;

        gantt.push({ processId: currentPId, start, end });
        currentTime = end;
        remainingBurst[currentPId] -= runTime;

        // Check for new arrivals while process was running
        processes
          .filter((p) => !arrivedSet.has(p.id) && p.arrivalTime <= currentTime)
          .sort((a, b) => a.arrivalTime - b.arrivalTime)
          .forEach((p) => {
            readyQueue.push(p.id);
            arrivedSet.add(p.id);
          });

        if (remainingBurst[currentPId] > 0) {
          readyQueue.push(currentPId); // re-queue preempted process
        } else {
          completedCount++;
          const ct = currentTime;
          const tat = ct - pObj.arrivalTime;
          const wt = tat - pObj.burstTime;
          stats[currentPId] = { ct, tat, wt };
        }
      }
    }

    const totalTAT = processes.reduce((acc, p) => acc + (stats[p.id]?.tat || 0), 0);
    const totalWT = processes.reduce((acc, p) => acc + (stats[p.id]?.wt || 0), 0);

    return {
      ganttChart: gantt,
      processStats: stats,
      avgTAT: (totalTAT / processes.length).toFixed(2),
      avgWT: (totalWT / processes.length).toFixed(2),
    };
  }, [processes, algorithm, quantum]);

  const maxTime = ganttChart.length > 0 ? ganttChart[ganttChart.length - 1].end : 1;

  return (
    <div className="my-6 p-4 sm:p-5 border border-dashed border-hairline/90 rounded-lg bg-surface-1/30 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-dashed border-hairline/80 pb-3 mb-4">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-accent font-bold block mb-0.5">
            LAB BENCH &middot; CPU SIMULATOR
          </span>
          <h4 className="font-handwriting text-xl sm:text-2xl font-bold text-ink-1">
            {config.title}
          </h4>
        </div>

        {/* Algorithm Toggle */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto">
          <div className="inline-flex rounded border border-hairline/80 p-0.5 bg-surface-2/60 text-xs font-mono">
            <button
              type="button"
              onClick={() => setAlgorithm("fcfs")}
              className={`px-3 py-1 rounded transition-all cursor-pointer ${
                algorithm === "fcfs"
                  ? "bg-accent text-white font-bold"
                  : "text-ink-3 hover:text-ink-1"
              }`}
            >
              FCFS
            </button>
            <button
              type="button"
              onClick={() => setAlgorithm("round-robin")}
              className={`px-3 py-1 rounded transition-all cursor-pointer ${
                algorithm === "round-robin"
                  ? "bg-accent text-white font-bold"
                  : "text-ink-3 hover:text-ink-1"
              }`}
            >
              Round Robin
            </button>
          </div>
        </div>
      </div>

      {/* Round Robin Quantum Selector */}
      {algorithm === "round-robin" && (
        <div className="flex items-center gap-3 mb-4 py-2 px-3 rounded border border-dashed border-hairline/70 bg-surface-1/40">
          <span className="text-xs font-mono text-ink-2">
            Time Quantum (q): <strong className="text-accent">{quantum} ms</strong>
          </span>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4].map((qVal) => (
              <button
                key={qVal}
                type="button"
                onClick={() => setQuantum(qVal)}
                className={`px-2 py-0.5 rounded text-xs font-mono transition-colors cursor-pointer ${
                  quantum === qVal
                    ? "bg-accent text-white font-bold"
                    : "bg-surface-2 text-ink-3 hover:text-ink-1"
                }`}
              >
                q={qVal}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Process Table */}
      <div className="overflow-x-auto mb-5">
        <table className="w-full text-xs font-mono border-collapse">
          <thead>
            <tr className="border-b border-dashed border-hairline/80 text-ink-3">
              <th className="py-2 px-2.5 text-left">Process</th>
              <th className="py-2 px-2.5 text-center">Arrival (AT)</th>
              <th className="py-2 px-2.5 text-center">Burst (BT)</th>
              <th className="py-2 px-2.5 text-center">Completion (CT)</th>
              <th className="py-2 px-2.5 text-center">Turnaround (TAT)</th>
              <th className="py-2 px-2.5 text-center">Waiting (WT)</th>
            </tr>
          </thead>
          <tbody>
            {processes.map((p) => {
              const stat = processStats[p.id];
              return (
                <tr key={p.id} className="border-b border-dashed border-hairline/50 hover:bg-surface-1/40">
                  <td className="py-1.5 px-2.5 font-bold text-ink-1 font-mono">
                    {p.id}
                  </td>
                  <td className="py-1.5 px-2.5 text-center text-ink-2">{p.arrivalTime} ms</td>
                  <td className="py-1.5 px-2.5 text-center text-ink-2">{p.burstTime} ms</td>
                  <td className="py-1.5 px-2.5 text-center text-ink-1 font-mono">
                    {stat ? `${stat.ct} ms` : "—"}
                  </td>
                  <td className="py-1.5 px-2.5 text-center text-accent font-bold font-mono">
                    {stat ? `${stat.tat} ms` : "—"}
                  </td>
                  <td className="py-1.5 px-2.5 text-center text-amber-600 dark:text-amber-400 font-bold font-mono">
                    {stat ? `${stat.wt} ms` : "—"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Gantt Chart Visualizer (Notebook Drawn Timeline) */}
      <div className="mb-5">
        <div className="flex items-baseline justify-between mb-1.5">
          <span className="text-[11px] font-mono uppercase tracking-wider text-ink-3">
            Computed Gantt Chart Timeline:
          </span>
          <span className="font-handwriting text-sm text-accent">
            ✎ {algorithm === "round-robin" ? `preemption every ${quantum}ms` : "first come first served"}
          </span>
        </div>
        <div className="w-full border border-ink-1/40 rounded p-1 flex bg-surface-1/20">
          {ganttChart.map((block, idx) => {
            const duration = block.end - block.start;
            const widthPct = (duration / maxTime) * 100;
            const isIdle = block.isIdle;

            const colorClasses = isIdle
              ? "bg-surface-2/40 text-ink-3 italic text-[11px] border border-dashed border-hairline"
              : block.processId === "P1"
              ? "bg-accent/15 text-accent border border-accent/40 font-bold"
              : block.processId === "P2"
              ? "bg-surface-2 text-ink-1 border border-hairline/80 font-bold"
              : block.processId === "P3"
              ? "bg-amber-400/20 text-amber-900 dark:text-amber-200 border border-amber-400/40 font-bold"
              : "bg-surface-3 text-ink-2 border border-hairline font-bold";

            return (
              <div
                key={idx}
                style={{ width: `${widthPct}%` }}
                className={`h-10 flex flex-col items-center justify-center border-r border-background/60 transition-all ${colorClasses}`}
                title={`${block.processId} [${block.start} - ${block.end} ms]`}
              >
                <span className="text-sm font-handwriting font-bold">{block.processId}</span>
              </div>
            );
          })}
        </div>

        {/* Timeline Ticks */}
        <div className="flex justify-between text-[10px] font-mono text-ink-3 mt-1 px-0.5">
          <span>0</span>
          {ganttChart.map((b, idx) => (
            <span key={idx}>{b.end}</span>
          ))}
        </div>
      </div>

      {/* Summary Metrics (Violet & Soft Yellow) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-dashed border-hairline/80 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="text-ink-3">Avg Turnaround Time:</span>
          <strong className="text-accent text-sm">{avgTAT} ms</strong>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-ink-3">Avg Waiting Time:</span>
          <strong className="highlighter-yellow text-ink-1 text-sm font-mono px-2 py-0.5">
            {avgWT} ms
          </strong>
        </div>
      </div>

      {config.caption && (
        <p className="mt-2 text-[11px] text-ink-3/70 text-center font-mono">
          {config.caption}
        </p>
      )}
    </div>
  );
}
