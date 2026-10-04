"use client";

import React, { useState, useMemo } from "react";
import { SerializabilityCheckerConfig } from "../../../lib/courses/types";

interface ScheduleOp {
  id: string;
  transaction: string;
  op: "R" | "W";
  item: string;
}

export default function InteractiveSerializabilityChecker({
  config,
}: {
  config: SerializabilityCheckerConfig;
}) {
  const [schedule, setSchedule] = useState<ScheduleOp[]>(config.defaultSchedule);
  const [activePreset, setActivePreset] = useState<number | null>(0);

  // Identify all unique transactions
  const transactions = useMemo(() => {
    return Array.from(new Set(schedule.map((s) => s.transaction))).sort();
  }, [schedule]);

  // Compute conflicting operations and build directed precedence graph
  const { conflicts, edges, hasCycle, cycleNodes, topologicalOrder } = useMemo(() => {
    const conflictList: {
      fromTx: string;
      toTx: string;
      fromIdx: number;
      toIdx: number;
      fromOp: ScheduleOp;
      toOp: ScheduleOp;
      type: string;
    }[] = [];

    const edgeMap = new Map<string, Set<string>>();
    transactions.forEach((t) => edgeMap.set(t, new Set<string>()));

    for (let i = 0; i < schedule.length; i++) {
      for (let j = i + 1; j < schedule.length; j++) {
        const op1 = schedule[i];
        const op2 = schedule[j];

        // Same data item, different transactions, at least one write
        if (op1.item === op2.item && op1.transaction !== op2.transaction) {
          if (op1.op === "W" || op2.op === "W") {
            const conflictType =
              op1.op === "R" && op2.op === "W"
                ? "Read-Write (Anti-dependency)"
                : op1.op === "W" && op2.op === "R"
                ? "Write-Read (Dirty Read risk)"
                : "Write-Write (Blind Write clash)";

            conflictList.push({
              fromTx: op1.transaction,
              toTx: op2.transaction,
              fromIdx: i,
              toIdx: j,
              fromOp: op1,
              toOp: op2,
              type: conflictType,
            });

            edgeMap.get(op1.transaction)?.add(op2.transaction);
          }
        }
      }
    }

    // Convert edge map to list
    const edgeList: { from: string; to: string }[] = [];
    edgeMap.forEach((targets, src) => {
      targets.forEach((tgt) => {
        edgeList.push({ from: src, to: tgt });
      });
    });

    // Cycle detection using DFS
    const visited = new Map<string, number>(); // 0: unvisited, 1: visiting, 2: visited
    const parent = new Map<string, string | null>();
    transactions.forEach((t) => {
      visited.set(t, 0);
      parent.set(t, null);
    });

    let cycleFound = false;
    const cycleDetectedNodes: string[] = [];

    function dfs(node: string): boolean {
      visited.set(node, 1);
      const neighbors = edgeMap.get(node) || new Set();

      for (const neighbor of Array.from(neighbors)) {
        if (visited.get(neighbor) === 1) {
          cycleFound = true;
          cycleDetectedNodes.push(node, neighbor);
          return true;
        }
        if (visited.get(neighbor) === 0) {
          parent.set(neighbor, node);
          if (dfs(neighbor)) return true;
        }
      }

      visited.set(node, 2);
      return false;
    }

    for (const tx of transactions) {
      if (visited.get(tx) === 0) {
        if (dfs(tx)) break;
      }
    }

    // Topological sort if no cycle
    let topoOrder: string[] | null = null;
    if (!cycleFound && transactions.length > 0) {
      const inDegree = new Map<string, number>();
      transactions.forEach((t) => inDegree.set(t, 0));
      edgeList.forEach((e) => {
        inDegree.set(e.to, (inDegree.get(e.to) || 0) + 1);
      });

      const queue: string[] = [];
      transactions.forEach((t) => {
        if (inDegree.get(t) === 0) queue.push(t);
      });

      const order: string[] = [];
      while (queue.length > 0) {
        const u = queue.shift()!;
        order.push(u);
        const neighbors = edgeMap.get(u) || new Set();
        neighbors.forEach((v) => {
          inDegree.set(v, (inDegree.get(v) || 0) - 1);
          if (inDegree.get(v) === 0) queue.push(v);
        });
      }

      if (order.length === transactions.length) {
        topoOrder = order;
      }
    }

    return {
      conflicts: conflictList,
      edges: edgeList,
      hasCycle: cycleFound,
      cycleNodes: Array.from(new Set(cycleDetectedNodes)),
      topologicalOrder: topoOrder,
    };
  }, [schedule, transactions]);

  const loadPreset = (idx: number) => {
    if (!config.sampleSchedules || !config.sampleSchedules[idx]) return;
    setSchedule(config.sampleSchedules[idx].schedule);
    setActivePreset(idx);
  };

  return (
    <div className="rounded-xl border border-hairline bg-surface-1/80 backdrop-blur-md p-5 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-hairline pb-4">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-accent block">
            Interactive Concurrency Simulator
          </span>
          <h3 className="text-base sm:text-lg font-bold text-ink-1">
            {config.title || "Precedence Graph & Conflict Serializability Checker"}
          </h3>
          {config.caption && (
            <p className="text-xs text-ink-3 mt-0.5">{config.caption}</p>
          )}
        </div>

        {/* Verdict Badge */}
        <div>
          {hasCycle ? (
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-500/15 border border-rose-500/30 text-rose-400 text-xs font-mono font-bold shape-octagon-sm">
              <span>● Non-Serializable (Cycle Detected)</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold shape-octagon-sm">
              <span>● Conflict Serializable</span>
            </div>
          )}
        </div>
      </div>

      {/* Preset Selector */}
      {config.sampleSchedules && config.sampleSchedules.length > 0 && (
        <div>
          <span className="text-[11px] font-mono text-ink-3 block mb-2 uppercase tracking-wider">
            Select Exam Scenario Preset:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {config.sampleSchedules.map((sample, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => loadPreset(idx)}
                className={`text-left p-3 border text-xs transition-all shape-octagon-sm ${
                  activePreset === idx
                    ? "border-accent bg-accent/10 text-ink-1"
                    : "border-hairline bg-surface-2/60 text-ink-2 hover:border-hairline-strong hover:text-ink-1"
                }`}
              >
                <div className="font-semibold">{sample.name}</div>
                <div className="text-[11px] text-ink-3 mt-1 leading-snug">
                  {sample.description}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Schedule Timeline Visualization */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-mono text-ink-3">
          <span>Interleaved Execution Sequence:</span>
          <span>{schedule.length} sequential operations</span>
        </div>

        <div className="p-4 rounded-xl border border-hairline bg-surface-0/60 overflow-x-auto">
          <div className="flex items-center gap-2 min-w-max pb-1">
            {schedule.map((item, idx) => {
              const isWrite = item.op === "W";
              return (
                <div key={item.id} className="flex items-center">
                  <div
                    className={`px-3 py-2 rounded-lg border flex flex-col items-center justify-center min-w-[64px] transition-all ${
                      isWrite
                        ? "bg-amber-500/10 border-amber-500/30 text-amber-300"
                        : "bg-blue-500/10 border-blue-500/30 text-blue-300"
                    }`}
                  >
                    <span className="text-[10px] font-mono text-ink-3">
                      t={idx + 1}
                    </span>
                    <span className="text-sm font-bold font-mono">
                      {item.op}
                      <sub>{item.transaction.replace("T", "")}</sub>({item.item})
                    </span>
                  </div>
                  {idx < schedule.length - 1 && (
                    <span className="text-ink-3 font-mono px-1">→</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Precedence Graph & Conflicting Pairs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Precedence Graph Nodes */}
        <div className="p-4 rounded-xl border border-hairline bg-surface-2/50 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-ink-2">
              Precedence Graph (Serialization Graph)
            </h4>
            <span className="text-[11px] font-mono text-ink-3">
              {edges.length} Directed Edge{edges.length === 1 ? "" : "s"}
            </span>
          </div>

          {/* Graph Representation */}
          <div className="p-4 rounded-lg bg-surface-0/70 border border-hairline flex flex-col items-center justify-center min-h-[140px] text-center">
            {edges.length === 0 ? (
              <p className="text-xs text-ink-3 font-mono">
                No cross-transaction conflicting pairs found. All operations are completely independent.
              </p>
            ) : (
              <div className="space-y-3 w-full">
                <div className="flex flex-wrap items-center justify-center gap-4">
                  {transactions.map((tx) => {
                    const isCycleNode = hasCycle && cycleNodes.includes(tx);
                    return (
                      <div
                        key={tx}
                        className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-mono font-bold text-sm shadow-xs ${
                          isCycleNode
                            ? "bg-rose-500/20 border-rose-500 text-rose-300 animate-pulse"
                            : "bg-surface-3 border-accent text-accent"
                        }`}
                      >
                        {tx}
                      </div>
                    );
                  })}
                </div>

                <div className="pt-2 border-t border-hairline/60 flex flex-wrap items-center justify-center gap-2 text-xs font-mono">
                  {edges.map((edge, eIdx) => (
                    <span
                      key={eIdx}
                      className="px-2.5 py-1 rounded bg-surface-1 border border-hairline text-ink-2"
                    >
                      {edge.from} <span className="text-accent">&rarr;</span> {edge.to}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Verdict Explainer */}
          <div className="text-xs leading-relaxed">
            {hasCycle ? (
              <p className="text-rose-400">
                ⚠️ <strong>Precedence Graph Contains a Directed Cycle:</strong> There is a cyclic dependency between {cycleNodes.join(" and ")}. No serial schedule can preserve the conflict order. Hence, this schedule is <strong>NOT Conflict Serializable</strong>.
              </p>
            ) : (
              <p className="text-emerald-400">
                ✅ <strong>Precedence Graph is a DAG (Acyclic):</strong> Conflict serializability holds! Equivalent serial schedule execution order:{" "}
                <strong className="font-mono bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                  {topologicalOrder ? topologicalOrder.join(" → ") : "Any serial order"}
                </strong>
              </p>
            )}
          </div>
        </div>

        {/* Conflicting Pairs Table */}
        <div className="p-4 rounded-xl border border-hairline bg-surface-2/50 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-ink-2">
              Detected Conflicting Operations
            </h4>
            <span className="text-[11px] font-mono text-ink-3">
              {conflicts.length} conflict pair{conflicts.length === 1 ? "" : "s"}
            </span>
          </div>

          <div className="max-h-[220px] overflow-y-auto space-y-2 pr-1">
            {conflicts.length === 0 ? (
              <p className="text-xs text-ink-3 font-mono text-center py-8">
                No conflicting operations exist.
              </p>
            ) : (
              conflicts.map((c, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-lg border border-hairline bg-surface-0/60 text-xs flex items-center justify-between"
                >
                  <div>
                    <span className="font-mono font-semibold text-ink-1">
                      {c.fromOp.op}
                      <sub>{c.fromOp.transaction.replace("T", "")}</sub>({c.fromOp.item})
                      <span className="text-ink-3 mx-1.5">prior to</span>
                      {c.toOp.op}
                      <sub>{c.toOp.transaction.replace("T", "")}</sub>({c.toOp.item})
                    </span>
                    <span className="block text-[11px] text-ink-3 mt-0.5">
                      Item: <strong className="text-ink-2">{c.fromOp.item}</strong> · {c.type}
                    </span>
                  </div>
                  <span className="font-mono text-xs font-bold text-accent shrink-0 px-2 py-1 rounded bg-surface-2 border border-hairline">
                    {c.fromTx} &rarr; {c.toTx}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
