"use client";

import { useState } from "react";
import { StateTransitionConfig } from "../../../lib/courses/types";

export default function InteractiveStateTransition({
  config,
}: {
  config: StateTransitionConfig;
}) {
  const [currentStateId, setCurrentStateId] = useState(config.initialState);
  const [lastAction, setLastAction] = useState<string>(
    "Process is in initial READY state. Waiting for CPU allocation."
  );

  const currentState =
    config.states.find((s) => s.id === currentStateId) || config.states[0];

  // Available transitions from current state
  const availableTransitions = config.transitions.filter(
    (t) => t.from === currentStateId
  );

  const handleTransition = (toStateId: string, actionDescription: string) => {
    setCurrentStateId(toStateId);
    setLastAction(actionDescription);
  };

  return (
    <div className="my-6 rounded-xl border border-hairline bg-surface-1/70 backdrop-blur-xs p-5 sm:p-6 shadow-xs">
      <div className="border-b border-hairline/60 pb-3 mb-5">
        <span className="text-[11px] font-mono uppercase tracking-widest text-accent font-semibold block mb-0.5">
          Process Lifecycle State Machine
        </span>
        <h4 className="text-base sm:text-lg font-bold text-ink-1">
          {config.title}
        </h4>
      </div>

      {/* State Machine Nodes Map */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 mb-6">
        {config.states.map((s) => {
          const isCurrent = s.id === currentStateId;
          return (
            <div
              key={s.id}
              className={`p-3 rounded-xl border text-center transition-all duration-300 ${
                isCurrent
                  ? "bg-accent/20 border-accent shadow-md scale-105"
                  : "bg-surface-2 border-hairline/60 opacity-60 hover:opacity-90"
              }`}
            >
              <div className="flex items-center justify-center gap-1.5 mb-1">
                {isCurrent && (
                  <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
                )}
                <span
                  className={`text-xs font-mono font-bold tracking-wider ${
                    isCurrent ? "text-purple-900 dark:text-accent-soft" : "text-ink-2"
                  }`}
                >
                  {s.label}
                </span>
              </div>
              <span className="text-[10px] text-ink-3 line-clamp-2 leading-tight block">
                {s.description}
              </span>
            </div>
          );
        })}
      </div>

      {/* Interactive Kernel Triggers / Events */}
      <div className="rounded-lg border border-hairline/80 bg-surface-2/60 p-4 sm:p-5">
        <span className="text-xs font-mono uppercase tracking-wider text-ink-3 block mb-3">
          Available Kernel Events from{" "}
          <strong className="text-purple-800 dark:text-accent-soft font-bold">{currentState.label}</strong>:
        </span>

        {availableTransitions.length > 0 ? (
          <div className="flex flex-wrap gap-2.5 mb-4">
            {availableTransitions.map((t, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleTransition(t.to, t.actionDescription)}
                className="inline-flex items-center gap-2 px-3.5 py-2 bg-surface-3 hover:bg-accent/20 border border-hairline hover:border-accent text-xs font-mono text-ink-1 transition-all cursor-pointer shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-accent shape-octagon-sm"
              >
                <span>{t.trigger}</span>
                <span className="text-ink-3">→</span>
                <span className="font-bold text-purple-900 dark:text-purple-300">
                  {t.to.toUpperCase()}
                </span>
              </button>
            ))}
          </div>
        ) : (
          <div className="mb-4 text-xs font-mono text-emerald-400 p-2.5 bg-emerald-500/10 border border-emerald-500/20 shape-octagon-sm">
            Process has terminated. Execution is finished.
          </div>
        )}

        {/* Action Explanation Callout */}
        <div className="p-3 bg-surface-1 border border-hairline/60 shape-octagon-sm">
          <span className="text-[10px] font-mono text-ink-3 uppercase tracking-wider block mb-1">
            Last Kernel Operation:
          </span>
          <p className="text-xs sm:text-sm text-ink-2 leading-relaxed">
            {lastAction}
          </p>
        </div>

        {/* Reset Button */}
        {currentStateId !== config.initialState && (
          <div className="mt-4 pt-3 border-t border-hairline/40 flex justify-end">
            <button
              type="button"
              onClick={() => {
                setCurrentStateId(config.initialState);
                setLastAction("Simulator reset to initial READY state.");
              }}
              className="px-3 py-1 bg-surface-2 border border-hairline text-xs font-mono text-ink-3 hover:text-ink-1 transition-colors cursor-pointer shape-octagon-sm"
            >
              Reset to Ready ⟳
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
