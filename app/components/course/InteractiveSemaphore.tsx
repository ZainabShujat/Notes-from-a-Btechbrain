"use client";

import { useState } from "react";
import { SemaphoreSimulatorConfig } from "../../../lib/courses/types";

export default function InteractiveSemaphore({
  config,
}: {
  config: SemaphoreSimulatorConfig;
}) {
  const [semaphoreVal, setSemaphoreVal] = useState(config.initialValue);
  const [inCriticalSection, setInCriticalSection] = useState<string | null>(null);
  const [blockedQueue, setBlockedQueue] = useState<string[]>([]);
  const [actionLog, setActionLog] = useState<string[]>(["Semaphore initialized to " + config.initialValue]);

  const processes = ["P1", "P2", "P3"];

  const handleWait = (p: string) => {
    // If process is already in CS or blocked, ignore
    if (inCriticalSection === p || blockedQueue.includes(p)) return;

    const newVal = semaphoreVal - 1;
    setSemaphoreVal(newVal);

    if (newVal < 0) {
      setBlockedQueue([...blockedQueue, p]);
      setActionLog((prev) => [
        `${p} executed wait(S) → S becomes ${newVal}. Since S < 0, ${p} is BLOCKED and put in queue.`,
        ...prev.slice(0, 4),
      ]);
    } else {
      setInCriticalSection(p);
      setActionLog((prev) => [
        `${p} executed wait(S) → S becomes ${newVal}. Since S ≥ 0, ${p} enters the CRITICAL SECTION!`,
        ...prev.slice(0, 4),
      ]);
    }
  };

  const handleSignal = (p: string) => {
    if (inCriticalSection !== p) return;

    const newVal = semaphoreVal + 1;
    setSemaphoreVal(newVal);

    if (blockedQueue.length > 0) {
      const [nextP, ...rest] = blockedQueue;
      setInCriticalSection(nextP);
      setBlockedQueue(rest);
      setActionLog((prev) => [
        `${p} executed signal(S) → S becomes ${newVal}. Wake up ${nextP} from queue to enter CRITICAL SECTION!`,
        ...prev.slice(0, 4),
      ]);
    } else {
      setInCriticalSection(null);
      setActionLog((prev) => [
        `${p} executed signal(S) → S becomes ${newVal}. Critical Section is now empty.`,
        ...prev.slice(0, 4),
      ]);
    }
  };

  const handleReset = () => {
    setSemaphoreVal(config.initialValue);
    setInCriticalSection(null);
    setBlockedQueue([]);
    setActionLog(["Simulator reset to initial state (S = " + config.initialValue + ")."]);
  };

  return (
    <div className="my-6 rounded-2xl border border-hairline bg-surface-1/90 backdrop-blur-md p-4 sm:p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-hairline/60 pb-3 mb-4">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-highlight font-bold block">
            Concurrency & Synchronization Laboratory
          </span>
          <h4 className="text-base sm:text-lg font-bold text-ink-1">
            {config.title}
          </h4>
        </div>
        <button
          type="button"
          onClick={handleReset}
          className="px-3 py-1.5 rounded-lg border border-hairline bg-surface-2 hover:bg-surface-3 text-xs font-mono text-ink-2 transition-colors cursor-pointer"
        >
          Reset
        </button>
      </div>

      {config.caption && (
        <p className="text-xs text-ink-2 mb-4 leading-relaxed font-sans">
          {config.caption}
        </p>
      )}

      {/* Semaphore State Visualization */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5 text-center font-mono">
        {/* Counter */}
        <div className="p-4 rounded-xl border border-hairline bg-surface-2/60 flex flex-col justify-center items-center">
          <span className="text-xs text-ink-3 mb-1">Semaphore Variable (S)</span>
          <span
            className={`text-3xl font-extrabold ${
              semaphoreVal < 0
                ? "text-rose-700 dark:text-rose-400"
                : semaphoreVal === 0
                ? "text-amber-700 dark:text-amber-300"
                : "text-emerald-700 dark:text-emerald-400"
            }`}
          >
            {semaphoreVal}
          </span>
          <span className="text-[10px] text-ink-3 mt-1">
            {semaphoreVal < 0
              ? `${Math.abs(semaphoreVal)} processes blocked`
              : `${semaphoreVal} resources free`}
          </span>
        </div>

        {/* Critical Section Slot */}
        <div className="p-4 rounded-xl border border-accent/40 bg-accent/10 flex flex-col justify-center items-center">
          <span className="text-xs text-purple-800 dark:text-accent-soft font-bold mb-1">
            Inside Critical Section
          </span>
          {inCriticalSection ? (
            <div className="px-4 py-2 rounded-lg bg-accent text-white font-bold text-sm shadow-xs animate-pulse">
              Process {inCriticalSection}
            </div>
          ) : (
            <span className="text-xs text-ink-3 italic py-2">Empty (Idle)</span>
          )}
        </div>

        {/* Blocked Queue */}
        <div className="p-4 rounded-xl border border-hairline bg-surface-2/60 flex flex-col justify-center items-center">
          <span className="text-xs text-ink-3 mb-1">Blocked / Sleep Queue</span>
          {blockedQueue.length > 0 ? (
            <div className="flex gap-1.5 flex-wrap justify-center">
              {blockedQueue.map((p) => (
                <span
                  key={p}
                  className="px-2.5 py-1 rounded bg-rose-500/20 text-rose-900 dark:text-rose-200 border border-rose-500/40 text-xs font-bold"
                >
                  {p}
                </span>
              ))}
            </div>
          ) : (
            <span className="text-xs text-ink-3 italic py-2">Queue empty</span>
          )}
        </div>
      </div>

      {/* Process Interactive Action Buttons */}
      <div className="border border-hairline rounded-xl p-4 bg-surface-1 mb-4">
        <span className="text-xs font-mono font-bold text-ink-1 block mb-3">
          Trigger Process Operations:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {processes.map((p) => {
            const isInside = inCriticalSection === p;
            const isBlocked = blockedQueue.includes(p);

            return (
              <div
                key={p}
                className="p-3 rounded-lg border border-hairline bg-surface-2/40 flex flex-col gap-2 text-xs font-mono"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-ink-1">{p}</span>
                  <span className="text-[10px] text-ink-3">
                    {isInside
                      ? "In CS"
                      : isBlocked
                      ? "Blocked"
                      : "Ready"}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleWait(p)}
                    disabled={isInside || isBlocked}
                    className="flex-1 py-1.5 rounded bg-accent/20 hover:bg-accent/30 text-accent font-bold disabled:opacity-40 cursor-pointer"
                  >
                    wait(S)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSignal(p)}
                    disabled={!isInside}
                    className="flex-1 py-1.5 rounded bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 font-bold disabled:opacity-40 cursor-pointer"
                  >
                    signal(S)
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Event Log */}
      <div className="p-3 rounded-lg border border-hairline bg-surface-2/30 text-xs font-mono text-ink-2 space-y-1">
        <span className="text-accent font-bold block mb-1">Execution Log:</span>
        {actionLog.map((log, idx) => (
          <p key={idx} className={idx === 0 ? "text-ink-1 font-semibold" : "text-ink-3"}>
            › {log}
          </p>
        ))}
      </div>
    </div>
  );
}
