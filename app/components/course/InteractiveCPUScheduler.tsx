"use client";

import { useState, useMemo } from "react";
import { CPUSchedulerConfig, ProcessScheduleItem } from "../../../lib/courses/types";

export type SchedulingAlgorithm =
  | "fcfs"
  | "sjf-nonpreemptive"
  | "sjf-preemptive"
  | "priority-nonpreemptive"
  | "priority-preemptive"
  | "round-robin"
  | "ljf"
  | "lrtf"
  | "hrrn";

interface GanttBlock {
  processId: string;
  start: number;
  end: number;
  isIdle?: boolean;
}

const ALGORITHMS: { id: SchedulingAlgorithm; name: string; tag: string; type: "Preemptive" | "Non-Preemptive" }[] = [
  { id: "fcfs", name: "FCFS", tag: "First-Come First-Served", type: "Non-Preemptive" },
  { id: "sjf-nonpreemptive", name: "SJF", tag: "Shortest Job First", type: "Non-Preemptive" },
  { id: "sjf-preemptive", name: "SRTF", tag: "Shortest Remaining Time First", type: "Preemptive" },
  { id: "round-robin", name: "RR", tag: "Round Robin (Time Sharing)", type: "Preemptive" },
  { id: "priority-nonpreemptive", name: "Priority (NP)", tag: "Priority Non-Preemptive", type: "Non-Preemptive" },
  { id: "priority-preemptive", name: "Priority (P)", tag: "Priority Preemptive", type: "Preemptive" },
  { id: "hrrn", name: "HRRN", tag: "Highest Response Ratio Next", type: "Non-Preemptive" },
  { id: "ljf", name: "LJF", tag: "Longest Job First", type: "Non-Preemptive" },
  { id: "lrtf", name: "LRTF", tag: "Longest Remaining Time First", type: "Preemptive" },
];

export default function InteractiveCPUScheduler({
  config,
}: {
  config: CPUSchedulerConfig;
}) {
  const [algorithm, setAlgorithm] = useState<SchedulingAlgorithm>(
    (config.defaultAlgorithm as SchedulingAlgorithm) || "round-robin"
  );
  const [quantum, setQuantum] = useState(config.defaultQuantum || 2);
  const [priorityOrder, setPriorityOrder] = useState<"lower-is-higher" | "higher-is-higher">("lower-is-higher");
  const [processes] = useState<ProcessScheduleItem[]>(() => {
    return config.sampleProcesses.map((p, idx) => ({
      ...p,
      priority: p.priority ?? (idx + 1),
    }));
  });

  // Compute Gantt Chart and Metrics
  const { ganttChart, processStats, avgTAT, avgWT } = useMemo(() => {
    const gantt: GanttBlock[] = [];
    const stats: Record<string, { ct: number; tat: number; wt: number }> = {};
    const n = processes.length;
    if (n === 0) {
      return { ganttChart: [], processStats: {}, avgTAT: "0.00", avgWT: "0.00" };
    }

    const helperComparePriority = (p1: ProcessScheduleItem, p2: ProcessScheduleItem) => {
      const prio1 = p1.priority ?? 0;
      const prio2 = p2.priority ?? 0;
      if (prio1 !== prio2) {
        return priorityOrder === "lower-is-higher" ? prio1 - prio2 : prio2 - prio1;
      }
      if (p1.arrivalTime !== p2.arrivalTime) {
        return p1.arrivalTime - p2.arrivalTime;
      }
      return p1.id.localeCompare(p2.id);
    };

    // Helper: compress contiguous identical process execution blocks
    const pushGantt = (processId: string, start: number, end: number, isIdle = false) => {
      if (start >= end) return;
      if (gantt.length > 0) {
        const last = gantt[gantt.length - 1];
        if (last.processId === processId && last.isIdle === isIdle && last.end === start) {
          last.end = end;
          return;
        }
      }
      gantt.push({ processId, start, end, isIdle });
    };

    // ─────────────────────────────────────────────────────────────
    // 1. FCFS
    // ─────────────────────────────────────────────────────────────
    if (algorithm === "fcfs") {
      const queue = [...processes].sort((a, b) => {
        if (a.arrivalTime !== b.arrivalTime) return a.arrivalTime - b.arrivalTime;
        return a.id.localeCompare(b.id);
      });
      let currentTime = 0;

      for (const p of queue) {
        if (currentTime < p.arrivalTime) {
          pushGantt("IDLE", currentTime, p.arrivalTime, true);
          currentTime = p.arrivalTime;
        }

        const start = currentTime;
        const end = start + p.burstTime;
        pushGantt(p.id, start, end);
        currentTime = end;

        const ct = end;
        const tat = ct - p.arrivalTime;
        const wt = tat - p.burstTime;
        stats[p.id] = { ct, tat, wt };
      }
    }

    // ─────────────────────────────────────────────────────────────
    // 2. SJF (Non-Preemptive)
    // ─────────────────────────────────────────────────────────────
    else if (algorithm === "sjf-nonpreemptive") {
      const completed = new Set<string>();
      let currentTime = 0;

      while (completed.size < n) {
        const available = processes.filter(
          (p) => !completed.has(p.id) && p.arrivalTime <= currentTime
        );

        if (available.length === 0) {
          const uncompleted = processes.filter((p) => !completed.has(p.id));
          const nextArr = Math.min(...uncompleted.map((p) => p.arrivalTime));
          pushGantt("IDLE", currentTime, nextArr, true);
          currentTime = nextArr;
          continue;
        }

        available.sort((a, b) => {
          if (a.burstTime !== b.burstTime) return a.burstTime - b.burstTime;
          if (a.arrivalTime !== b.arrivalTime) return a.arrivalTime - b.arrivalTime;
          return a.id.localeCompare(b.id);
        });

        const chosen = available[0];
        const start = currentTime;
        const end = start + chosen.burstTime;
        pushGantt(chosen.id, start, end);
        currentTime = end;

        completed.add(chosen.id);
        const ct = end;
        const tat = ct - chosen.arrivalTime;
        const wt = tat - chosen.burstTime;
        stats[chosen.id] = { ct, tat, wt };
      }
    }

    // ─────────────────────────────────────────────────────────────
    // 3. SRTF / Preemptive SJF
    // ─────────────────────────────────────────────────────────────
    else if (algorithm === "sjf-preemptive") {
      const remaining: Record<string, number> = {};
      processes.forEach((p) => (remaining[p.id] = p.burstTime));
      let completedCount = 0;
      let currentTime = 0;
      const maxLimit = 1000;
      let stepGuard = 0;

      while (completedCount < n && stepGuard++ < maxLimit) {
        const available = processes.filter(
          (p) => remaining[p.id] > 0 && p.arrivalTime <= currentTime
        );

        if (available.length === 0) {
          const uncompleted = processes.filter((p) => remaining[p.id] > 0);
          const nextArr = Math.min(...uncompleted.map((p) => p.arrivalTime));
          pushGantt("IDLE", currentTime, nextArr, true);
          currentTime = nextArr;
          continue;
        }

        available.sort((a, b) => {
          if (remaining[a.id] !== remaining[b.id]) return remaining[a.id] - remaining[b.id];
          if (a.arrivalTime !== b.arrivalTime) return a.arrivalTime - b.arrivalTime;
          return a.id.localeCompare(b.id);
        });

        const chosen = available[0];
        pushGantt(chosen.id, currentTime, currentTime + 1);
        currentTime += 1;
        remaining[chosen.id] -= 1;

        if (remaining[chosen.id] === 0) {
          completedCount++;
          const ct = currentTime;
          const tat = ct - chosen.arrivalTime;
          const wt = tat - chosen.burstTime;
          stats[chosen.id] = { ct, tat, wt };
        }
      }
    }

    // ─────────────────────────────────────────────────────────────
    // 4. Priority (Non-Preemptive)
    // ─────────────────────────────────────────────────────────────
    else if (algorithm === "priority-nonpreemptive") {
      const completed = new Set<string>();
      let currentTime = 0;

      while (completed.size < n) {
        const available = processes.filter(
          (p) => !completed.has(p.id) && p.arrivalTime <= currentTime
        );

        if (available.length === 0) {
          const uncompleted = processes.filter((p) => !completed.has(p.id));
          const nextArr = Math.min(...uncompleted.map((p) => p.arrivalTime));
          pushGantt("IDLE", currentTime, nextArr, true);
          currentTime = nextArr;
          continue;
        }

        available.sort(helperComparePriority);

        const chosen = available[0];
        const start = currentTime;
        const end = start + chosen.burstTime;
        pushGantt(chosen.id, start, end);
        currentTime = end;

        completed.add(chosen.id);
        const ct = end;
        const tat = ct - chosen.arrivalTime;
        const wt = tat - chosen.burstTime;
        stats[chosen.id] = { ct, tat, wt };
      }
    }

    // ─────────────────────────────────────────────────────────────
    // 5. Priority (Preemptive)
    // ─────────────────────────────────────────────────────────────
    else if (algorithm === "priority-preemptive") {
      const remaining: Record<string, number> = {};
      processes.forEach((p) => (remaining[p.id] = p.burstTime));
      let completedCount = 0;
      let currentTime = 0;
      const maxLimit = 1000;
      let stepGuard = 0;

      while (completedCount < n && stepGuard++ < maxLimit) {
        const available = processes.filter(
          (p) => remaining[p.id] > 0 && p.arrivalTime <= currentTime
        );

        if (available.length === 0) {
          const uncompleted = processes.filter((p) => remaining[p.id] > 0);
          const nextArr = Math.min(...uncompleted.map((p) => p.arrivalTime));
          pushGantt("IDLE", currentTime, nextArr, true);
          currentTime = nextArr;
          continue;
        }

        available.sort(helperComparePriority);

        const chosen = available[0];
        pushGantt(chosen.id, currentTime, currentTime + 1);
        currentTime += 1;
        remaining[chosen.id] -= 1;

        if (remaining[chosen.id] === 0) {
          completedCount++;
          const ct = currentTime;
          const tat = ct - chosen.arrivalTime;
          const wt = tat - chosen.burstTime;
          stats[chosen.id] = { ct, tat, wt };
        }
      }
    }

    // ─────────────────────────────────────────────────────────────
    // 6. Round Robin
    // ─────────────────────────────────────────────────────────────
    else if (algorithm === "round-robin") {
      const remainingBurst: Record<string, number> = {};
      processes.forEach((p) => (remainingBurst[p.id] = p.burstTime));

      let currentTime = 0;
      const readyQueue: string[] = [];
      const arrivedSet = new Set<string>();

      // Check initial arrivals at t=0
      processes
        .filter((p) => p.arrivalTime <= currentTime)
        .sort((a, b) => a.arrivalTime - b.arrivalTime || a.id.localeCompare(b.id))
        .forEach((p) => {
          readyQueue.push(p.id);
          arrivedSet.add(p.id);
        });

      let completedCount = 0;
      let loopLimit = 200;

      while (completedCount < n && loopLimit-- > 0) {
        if (readyQueue.length === 0) {
          const unarrived = processes.filter((p) => !arrivedSet.has(p.id));
          if (unarrived.length > 0) {
            unarrived.sort((a, b) => a.arrivalTime - b.arrivalTime || a.id.localeCompare(b.id));
            const nextP = unarrived[0];
            pushGantt("IDLE", currentTime, nextP.arrivalTime, true);
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

        pushGantt(currentPId, start, end);
        currentTime = end;
        remainingBurst[currentPId] -= runTime;

        // Invariant: New arrivals entering at time t enter ready queue BEFORE preempted process
        processes
          .filter((p) => !arrivedSet.has(p.id) && p.arrivalTime <= currentTime)
          .sort((a, b) => a.arrivalTime - b.arrivalTime || a.id.localeCompare(b.id))
          .forEach((p) => {
            readyQueue.push(p.id);
            arrivedSet.add(p.id);
          });

        if (remainingBurst[currentPId] > 0) {
          readyQueue.push(currentPId);
        } else {
          completedCount++;
          const ct = currentTime;
          const tat = ct - pObj.arrivalTime;
          const wt = tat - pObj.burstTime;
          stats[currentPId] = { ct, tat, wt };
        }
      }
    }

    // ─────────────────────────────────────────────────────────────
    // 7. HRRN (Highest Response Ratio Next)
    // Response Ratio R = (W + S) / S = 1 + (W / S)
    // ─────────────────────────────────────────────────────────────
    else if (algorithm === "hrrn") {
      const completed = new Set<string>();
      let currentTime = 0;

      while (completed.size < n) {
        const available = processes.filter(
          (p) => !completed.has(p.id) && p.arrivalTime <= currentTime
        );

        if (available.length === 0) {
          const uncompleted = processes.filter((p) => !completed.has(p.id));
          const nextArr = Math.min(...uncompleted.map((p) => p.arrivalTime));
          pushGantt("IDLE", currentTime, nextArr, true);
          currentTime = nextArr;
          continue;
        }

        // Calculate Response Ratio for each
        available.sort((a, b) => {
          const waitA = currentTime - a.arrivalTime;
          const waitB = currentTime - b.arrivalTime;
          const ratioA = (waitA + a.burstTime) / a.burstTime;
          const ratioB = (waitB + b.burstTime) / b.burstTime;
          if (ratioB !== ratioA) return ratioB - ratioA; // Higher ratio gets priority
          if (a.arrivalTime !== b.arrivalTime) return a.arrivalTime - b.arrivalTime;
          return a.id.localeCompare(b.id);
        });

        const chosen = available[0];
        const start = currentTime;
        const end = start + chosen.burstTime;
        pushGantt(chosen.id, start, end);
        currentTime = end;

        completed.add(chosen.id);
        const ct = end;
        const tat = ct - chosen.arrivalTime;
        const wt = tat - chosen.burstTime;
        stats[chosen.id] = { ct, tat, wt };
      }
    }

    // ─────────────────────────────────────────────────────────────
    // 8. LJF (Longest Job First - Non-Preemptive)
    // ─────────────────────────────────────────────────────────────
    else if (algorithm === "ljf") {
      const completed = new Set<string>();
      let currentTime = 0;

      while (completed.size < n) {
        const available = processes.filter(
          (p) => !completed.has(p.id) && p.arrivalTime <= currentTime
        );

        if (available.length === 0) {
          const uncompleted = processes.filter((p) => !completed.has(p.id));
          const nextArr = Math.min(...uncompleted.map((p) => p.arrivalTime));
          pushGantt("IDLE", currentTime, nextArr, true);
          currentTime = nextArr;
          continue;
        }

        available.sort((a, b) => {
          if (b.burstTime !== a.burstTime) return b.burstTime - a.burstTime; // Longest burst first
          if (a.arrivalTime !== b.arrivalTime) return a.arrivalTime - b.arrivalTime;
          return a.id.localeCompare(b.id);
        });

        const chosen = available[0];
        const start = currentTime;
        const end = start + chosen.burstTime;
        pushGantt(chosen.id, start, end);
        currentTime = end;

        completed.add(chosen.id);
        const ct = end;
        const tat = ct - chosen.arrivalTime;
        const wt = tat - chosen.burstTime;
        stats[chosen.id] = { ct, tat, wt };
      }
    }

    // ─────────────────────────────────────────────────────────────
    // 9. LRTF (Longest Remaining Time First - Preemptive)
    // ─────────────────────────────────────────────────────────────
    else if (algorithm === "lrtf") {
      const remaining: Record<string, number> = {};
      processes.forEach((p) => (remaining[p.id] = p.burstTime));
      let completedCount = 0;
      let currentTime = 0;
      const maxLimit = 1000;
      let stepGuard = 0;

      while (completedCount < n && stepGuard++ < maxLimit) {
        const available = processes.filter(
          (p) => remaining[p.id] > 0 && p.arrivalTime <= currentTime
        );

        if (available.length === 0) {
          const uncompleted = processes.filter((p) => remaining[p.id] > 0);
          const nextArr = Math.min(...uncompleted.map((p) => p.arrivalTime));
          pushGantt("IDLE", currentTime, nextArr, true);
          currentTime = nextArr;
          continue;
        }

        available.sort((a, b) => {
          if (remaining[b.id] !== remaining[a.id]) return remaining[b.id] - remaining[a.id];
          if (a.arrivalTime !== b.arrivalTime) return a.arrivalTime - b.arrivalTime;
          return a.id.localeCompare(b.id);
        });

        const chosen = available[0];
        pushGantt(chosen.id, currentTime, currentTime + 1);
        currentTime += 1;
        remaining[chosen.id] -= 1;

        if (remaining[chosen.id] === 0) {
          completedCount++;
          const ct = currentTime;
          const tat = ct - chosen.arrivalTime;
          const wt = tat - chosen.burstTime;
          stats[chosen.id] = { ct, tat, wt };
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
  }, [processes, algorithm, quantum, priorityOrder]);

  const maxTime = ganttChart.length > 0 ? ganttChart[ganttChart.length - 1].end : 1;
  const currentAlgoMeta = ALGORITHMS.find((a) => a.id === algorithm) || ALGORITHMS[0];

  return (
    <div className="my-6 p-4 sm:p-5 border border-dashed border-hairline/90 rounded-xl bg-surface-1/30 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-dashed border-hairline/80 pb-3 mb-4">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-accent font-bold block mb-0.5">
            LAB BENCH &middot; UNIVERSAL CPU SIMULATOR
          </span>
          <h4 className="font-handwriting text-xl sm:text-2xl font-bold text-ink-1">
            {config.title}
          </h4>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono px-2 py-0.5 rounded border border-accent/40 bg-accent/10 text-accent font-semibold">
            {currentAlgoMeta.type}
          </span>
          <span className="text-[11px] font-mono text-ink-3">
            {currentAlgoMeta.tag}
          </span>
        </div>
      </div>

      {/* Comprehensive Algorithm Selector Bar */}
      <div className="mb-4">
        <label className="text-xs font-mono text-ink-3 uppercase tracking-wider block mb-2">
          Select Scheduling Algorithm ({ALGORITHMS.length} Supported):
        </label>
        <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-lg border border-hairline/80 bg-surface-2/60 max-w-full overflow-x-auto pb-1">
          {ALGORITHMS.map((algo) => {
            const isSelected = algorithm === algo.id;
            return (
              <button
                key={algo.id}
                type="button"
                onClick={() => setAlgorithm(algo.id)}
                className={`px-2.5 py-1 text-xs font-mono rounded transition-all cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? "bg-accent text-white font-bold shadow-xs scale-[1.02]"
                    : "text-ink-2 hover:text-ink-1 hover:bg-surface-3"
                }`}
                title={algo.tag}
              >
                {algo.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Algorithm Specific Control Sub-bar */}
      {algorithm === "round-robin" && (
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 py-2 px-3 border border-dashed border-hairline/70 bg-surface-1/50 rounded-lg">
          <span className="text-xs font-mono text-ink-2">
            Time Quantum (q): <strong className="text-accent">{quantum} ms</strong>
          </span>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((qVal) => (
              <button
                key={qVal}
                type="button"
                onClick={() => setQuantum(qVal)}
                className={`px-2 py-0.5 text-xs font-mono rounded transition-colors cursor-pointer ${
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

      {(algorithm === "priority-nonpreemptive" || algorithm === "priority-preemptive") && (
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 py-2 px-3 border border-dashed border-hairline/70 bg-surface-1/50 rounded-lg">
          <span className="text-xs font-mono text-ink-2">
            Priority Convention:
          </span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setPriorityOrder("lower-is-higher")}
              className={`px-2.5 py-1 text-xs font-mono rounded transition-colors cursor-pointer ${
                priorityOrder === "lower-is-higher"
                  ? "bg-accent text-white font-bold"
                  : "bg-surface-2 text-ink-3 hover:text-ink-1"
              }`}
            >
              1 is Highest (Unix standard)
            </button>
            <button
              type="button"
              onClick={() => setPriorityOrder("higher-is-higher")}
              className={`px-2.5 py-1 text-xs font-mono rounded transition-colors cursor-pointer ${
                priorityOrder === "higher-is-higher"
                  ? "bg-accent text-white font-bold"
                  : "bg-surface-2 text-ink-3 hover:text-ink-1"
              }`}
            >
              Larger # is Highest
            </button>
          </div>
        </div>
      )}

      {/* Input Process Table */}
      <div className="overflow-x-auto mb-5 rounded-lg border border-hairline bg-surface-1/40">
        <table className="w-full text-xs font-mono border-collapse">
          <thead>
            <tr className="border-b border-hairline bg-surface-2/60 text-ink-3">
              <th className="py-2.5 px-3 text-left">Process</th>
              <th className="py-2.5 px-3 text-center">Arrival (AT)</th>
              <th className="py-2.5 px-3 text-center">Burst (BT)</th>
              {(algorithm === "priority-nonpreemptive" || algorithm === "priority-preemptive") && (
                <th className="py-2.5 px-3 text-center text-accent">Priority</th>
              )}
              <th className="py-2.5 px-3 text-center">Completion (CT)</th>
              <th className="py-2.5 px-3 text-center">Turnaround (TAT)</th>
              <th className="py-2.5 px-3 text-center">Waiting (WT)</th>
            </tr>
          </thead>
          <tbody>
            {processes.map((p) => {
              const stat = processStats[p.id];
              return (
                <tr key={p.id} className="border-b border-hairline/60 hover:bg-surface-2/30">
                  <td className="py-2 px-3 font-bold text-ink-1 font-mono flex items-center gap-1.5">
                    <span
                      className="w-2.5 h-2.5 rounded-full inline-block"
                      style={{ backgroundColor: p.color || "#8b5cf6" }}
                    />
                    <span>{p.id}</span>
                  </td>
                  <td className="py-2 px-3 text-center text-ink-2">{p.arrivalTime} ms</td>
                  <td className="py-2 px-3 text-center text-ink-2">{p.burstTime} ms</td>
                  {(algorithm === "priority-nonpreemptive" || algorithm === "priority-preemptive") && (
                    <td className="py-2 px-3 text-center text-accent font-bold">
                      {p.priority ?? "—"}
                    </td>
                  )}
                  <td className="py-2 px-3 text-center text-ink-1 font-mono font-semibold">
                    {stat ? `${stat.ct} ms` : "—"}
                  </td>
                  <td className="py-2 px-3 text-center text-accent font-bold font-mono">
                    {stat ? `${stat.tat} ms` : "—"}
                  </td>
                  <td className="py-2 px-3 text-center text-amber-600 dark:text-amber-400 font-bold font-mono">
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
        <div className="flex flex-wrap items-baseline justify-between mb-2 gap-2">
          <span className="text-[11px] font-mono uppercase tracking-wider text-ink-3">
            Computed Execution Gantt Chart ({algorithm.toUpperCase()}):
          </span>
          <span className="font-handwriting text-sm text-accent">
            ✎ Total CPU Execution Time: {maxTime} ms
          </span>
        </div>
        <div className="w-full border border-hairline/90 rounded-lg p-1.5 flex bg-surface-1/40 overflow-x-auto sm:overflow-x-visible min-h-[52px] gap-1">
          {ganttChart.map((block, idx) => {
            const duration = block.end - block.start;
            const isIdle = block.isIdle;

            const pObj = processes.find((p) => p.id === block.processId);
            const baseBg = isIdle
              ? "bg-surface-2/50 text-ink-3 italic border border-dashed border-hairline/80"
              : pObj?.color
              ? "border border-black/10 dark:border-white/10 font-bold text-white shadow-xs"
              : "bg-accent/20 text-accent font-bold border border-accent/40";

            return (
              <div
                key={idx}
                style={{
                  flexGrow: duration,
                  flexShrink: 0,
                  flexBasis: 0,
                  minWidth: "22px",
                  backgroundColor: !isIdle && pObj?.color ? pObj.color : undefined,
                }}
                className={`h-11 flex flex-col items-center justify-center rounded transition-all ${baseBg}`}
                title={`${block.processId} [${block.start} - ${block.end} ms] (duration: ${duration}ms)`}
              >
                <span className="text-xs sm:text-sm font-handwriting font-bold leading-none">
                  {block.processId}
                </span>
                <span className="text-[9px] font-mono opacity-80 leading-none mt-0.5">
                  {duration}ms
                </span>
              </div>
            );
          })}
        </div>

        {/* Timeline Ticks (proportional to block widths) */}
        <div className="flex text-[10px] font-mono text-ink-3 mt-1.5 px-1.5 w-full gap-1">
          <div className="w-0 shrink-0 text-left -ml-1">0</div>
          {ganttChart.map((b, idx) => {
            const duration = b.end - b.start;
            return (
              <div
                key={idx}
                style={{
                  flexGrow: duration,
                  flexShrink: 0,
                  flexBasis: 0,
                  minWidth: "22px",
                }}
                className="text-right pr-0.5"
              >
                {b.end}
              </div>
            );
          })}
        </div>
      </div>

      {/* Summary Metrics */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-dashed border-hairline/80 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="text-ink-3">Avg Turnaround Time:</span>
          <strong className="text-accent text-sm font-bold">{avgTAT} ms</strong>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-ink-3">Avg Waiting Time:</span>
          <strong className="highlighter-yellow text-ink-1 text-sm font-mono px-2 py-0.5 rounded">
            {avgWT} ms
          </strong>
        </div>
      </div>

      {config.caption && (
        <p className="mt-2.5 text-[11px] text-ink-3/70 text-center font-mono">
          {config.caption}
        </p>
      )}
    </div>
  );
}
