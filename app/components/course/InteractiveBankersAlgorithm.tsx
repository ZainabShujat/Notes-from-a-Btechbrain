"use client";

import { useState } from "react";
import { BankersAlgorithmConfig } from "../../../lib/courses/types";

export default function InteractiveBankersAlgorithm({
  config,
}: {
  config: BankersAlgorithmConfig;
}) {
  const { resourceNames, allocationMatrix, maxMatrix, totalAvailable } = config;

  // Calculate Need Matrix: Need[i][j] = Max[i][j] - Allocation[i][j]
  const numP = allocationMatrix.length;
  const numR = resourceNames.length;

  const needMatrix = maxMatrix.map((row, i) =>
    row.map((maxVal, j) => maxVal - allocationMatrix[i][j])
  );

  // Simulation State
  const [currentStep, setCurrentStep] = useState(0);
  const [simHistory, setSimHistory] = useState<
    {
      finished: boolean[];
      available: number[];
      executedOrder: number[];
      activeProcess: number | null;
      log: string;
    }[]
  >(() => {
    // Compute the step-by-step execution eagerly
    const history: {
      finished: boolean[];
      available: number[];
      executedOrder: number[];
      activeProcess: number | null;
      log: string;
    }[] = [
      {
        finished: new Array(numP).fill(false),
        available: [...totalAvailable],
        executedOrder: [],
        activeProcess: null,
        log: "Initial system state. Ready to test safety algorithm.",
      },
    ];

    const finished = new Array(numP).fill(false);
    const avail = [...totalAvailable];
    const order: number[] = [];

    let progress = true;
    while (order.length < numP && progress) {
      progress = false;
      for (let i = 0; i < numP; i++) {
        if (!finished[i]) {
          // Check if Need[i] <= Avail
          const canRun = needMatrix[i].every((needVal, j) => needVal <= avail[j]);
          if (canRun) {
            // Allocate and complete
            for (let j = 0; j < numR; j++) {
              avail[j] += allocationMatrix[i][j];
            }
            finished[i] = true;
            order.push(i);
            progress = true;

            history.push({
              finished: [...finished],
              available: [...avail],
              executedOrder: [...order],
              activeProcess: i,
              log: `P${i} can satisfy its Need ≤ Available. P${i} completes and releases its Allocation [${allocationMatrix[i].join(
                ", "
              )}]. New Available: [${avail.join(", ")}].`,
            });
            break;
          }
        }
      }
    }

    if (order.length === numP) {
      history.push({
        finished: [...finished],
        available: [...avail],
        executedOrder: [...order],
        activeProcess: null,
        log: `System is in a SAFE STATE! Safe execution sequence found: <${order
          .map((p) => `P${p}`)
          .join(", ")}>.`,
      });
    } else {
      history.push({
        finished: [...finished],
        available: [...avail],
        executedOrder: [...order],
        activeProcess: null,
        log: `DEADLOCK RISK: No process has Need ≤ Available. System is NOT in a safe state!`,
      });
    }

    return history;
  });

  const state = simHistory[currentStep] || simHistory[0];
  const isComplete = currentStep === simHistory.length - 1;

  const handleNext = () => {
    if (currentStep < simHistory.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
  };

  return (
    <div className="my-6 rounded-2xl border border-hairline bg-surface-1/90 backdrop-blur-md p-4 sm:p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-hairline/60 pb-3 mb-4">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-accent font-bold block">
            Deadlock Avoidance Simulator
          </span>
          <h4 className="text-base sm:text-lg font-bold text-ink-1">
            {config.title}
          </h4>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleReset}
            className="px-3 py-1.5 rounded-lg border border-hairline bg-surface-2 hover:bg-surface-3 text-xs font-mono text-ink-2 transition-colors cursor-pointer"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={handleNext}
            disabled={isComplete}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
              isComplete
                ? "bg-surface-2 text-ink-3 cursor-not-allowed opacity-60"
                : "bg-accent text-white hover:bg-accent/90 shadow-xs"
            }`}
          >
            {isComplete ? "Done" : "Step Algorithm →"}
          </button>
        </div>
      </div>

      {config.caption && (
        <p className="text-xs text-ink-2 mb-4 leading-relaxed font-sans">
          {config.caption}
        </p>
      )}

      {/* Available Resource Vector */}
      <div className="mb-5 p-3 rounded-xl border border-accent/30 bg-accent/5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-ink-1">
            Current Available Vector:
          </span>
          <div className="flex gap-2">
            {resourceNames.map((r, idx) => (
              <span
                key={r}
                className="px-2 py-0.5 rounded bg-surface-1 border border-accent/40 font-mono text-xs font-bold text-accent"
              >
                {r}: {state.available[idx]}
              </span>
            ))}
          </div>
        </div>
        <div className="text-xs font-mono text-ink-3">
          Step {currentStep} of {simHistory.length - 1}
        </div>
      </div>

      {/* Process Allocation, Max, and Need Table */}
      <div className="overflow-x-auto rounded-xl border border-hairline bg-surface-1 mb-5">
        <table className="w-full text-xs font-mono text-center border-collapse">
          <thead>
            <tr className="border-b border-hairline bg-surface-2 text-ink-3">
              <th className="py-2.5 px-3 text-left">Process</th>
              <th className="py-2.5 px-3 border-l border-hairline">
                Allocation ({resourceNames.join(" ")})
              </th>
              <th className="py-2.5 px-3 border-l border-hairline">
                Max ({resourceNames.join(" ")})
              </th>
              <th className="py-2.5 px-3 border-l border-hairline bg-accent/5 text-accent-soft">
                Need (Max - Alloc)
              </th>
              <th className="py-2.5 px-3 border-l border-hairline">Status</th>
            </tr>
          </thead>
          <tbody>
            {allocationMatrix.map((allocRow, pIdx) => {
              const isFinished = state.finished[pIdx];
              const isActive = state.activeProcess === pIdx;
              const canSatisfy = needMatrix[pIdx].every(
                (n, j) => n <= state.available[j]
              );

              return (
                <tr
                  key={pIdx}
                  className={`border-b border-hairline/40 transition-colors ${
                    isActive
                      ? "bg-accent/20 font-bold"
                      : isFinished
                      ? "bg-surface-2/40 opacity-60"
                      : "hover:bg-surface-2/30"
                  }`}
                >
                  <td className="py-2.5 px-3 text-left font-bold text-ink-1">
                    P{pIdx}
                    {isActive && (
                      <span className="ml-1 text-[10px] text-accent">▶</span>
                    )}
                  </td>
                  <td className="py-2.5 px-3 border-l border-hairline text-ink-2">
                    {allocRow.join("  ")}
                  </td>
                  <td className="py-2.5 px-3 border-l border-hairline text-ink-2">
                    {maxMatrix[pIdx].join("  ")}
                  </td>
                  <td
                    className={`py-2.5 px-3 border-l border-hairline font-bold ${
                      isFinished
                        ? "text-ink-3"
                        : canSatisfy
                        ? "text-emerald-800 dark:text-emerald-300 bg-emerald-500/10 font-bold"
                        : "text-rose-800 dark:text-rose-400 bg-rose-500/10 font-medium"
                    }`}
                  >
                    {needMatrix[pIdx].join("  ")}
                  </td>
                  <td className="py-2.5 px-3 border-l border-hairline">
                    {isFinished ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-900 dark:text-emerald-300 border border-emerald-500/40">
                        Finished ✓
                      </span>
                    ) : canSatisfy ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-900 dark:text-amber-300 border border-amber-500/40">
                        Need ≤ Avail
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-surface-2 text-ink-2">
                        Waiting
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Safe Execution Sequence Bar */}
      <div className="p-3 rounded-xl border border-hairline bg-surface-2/50 text-xs font-mono flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-ink-3">Safe Sequence so far:</span>
          {state.executedOrder.length === 0 ? (
            <span className="text-ink-3 italic">None executed yet</span>
          ) : (
            <div className="flex items-center gap-1.5 font-bold text-accent">
              {state.executedOrder.map((p, idx) => (
                <span key={idx} className="flex items-center gap-1">
                  <span className="px-2 py-0.5 rounded bg-surface-1 border border-accent/30 text-ink-1">
                    P{p}
                  </span>
                  {idx < state.executedOrder.length - 1 && <span>→</span>}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Dynamic Action Log Callout */}
      <div className="mt-3 p-3 rounded-lg border border-hairline bg-surface-1 text-xs font-mono text-ink-2">
        <span className="font-bold text-accent mr-1">Log:</span>
        {state.log}
      </div>
    </div>
  );
}
