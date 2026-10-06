"use client";

import { useState } from "react";
import { FlowVisualizerConfig } from "../../../lib/courses/types";

export default function InteractiveFlowVisualizer({
  config,
}: {
  config: FlowVisualizerConfig;
}) {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const currentStep = config.steps[activeStepIndex];

  return (
    <div className="my-6 rounded-xl border border-hairline bg-surface-1/70 backdrop-blur-xs p-5 sm:p-6 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-hairline/60 pb-3 mb-5">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-widest text-accent font-semibold block mb-0.5">
            Interactive Flow
          </span>
          <h4 className="text-base sm:text-lg font-bold text-ink-1">
            {config.title}
          </h4>
        </div>
        <div className="flex items-center gap-1.5 self-start sm:self-auto text-xs font-mono text-ink-3">
          <span>Step {activeStepIndex + 1} of {config.steps.length}</span>
        </div>
      </div>

      {/* Step Pills Chain */}
      <div className="flex flex-wrap items-center gap-2 mb-6 max-w-full overflow-x-auto pb-1">
        {config.steps.map((step, idx) => {
          const isActive = idx === activeStepIndex;
          const isPast = idx < activeStepIndex;

          return (
            <div key={step.id} className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveStepIndex(idx)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono tracking-wide transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                  isActive
                    ? "bg-accent text-white font-bold shadow-xs scale-105"
                    : isPast
                    ? "bg-accent/15 text-purple-800 dark:text-purple-300 font-bold border border-accent/30 hover:bg-accent/25"
                    : "bg-surface-2 text-ink-3 hover:text-ink-1 hover:bg-surface-3 border border-hairline"
                }`}
                aria-current={isActive ? "step" : undefined}
              >
                <span className="text-[10px] opacity-75">{idx + 1}.</span>
                <span>{step.shortLabel || step.label}</span>
              </button>
              {idx < config.steps.length - 1 && (
                <span className="text-ink-3/40 text-xs select-none">→</span>
              )}
            </div>
          );
        })}
      </div>

      {/* Active Step Details Panel */}
      <div className="rounded-lg border border-hairline/80 bg-surface-2/60 p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <span className="text-xs font-mono text-purple-800 dark:text-accent-soft font-bold block mb-1">
              Active Stage:
            </span>
            <h5 className="text-base sm:text-lg font-bold text-ink-1 mb-2">
              {currentStep.label}
            </h5>
            <p className="text-sm sm:text-base text-ink-2 leading-relaxed">
              {currentStep.description}
            </p>
            {currentStep.annotation && (
              <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-accent/10 border border-accent/20 text-xs font-mono text-purple-900 dark:text-purple-200">
                <span className="font-bold">Hardware/Kernel Note:</span>
                <span>{currentStep.annotation}</span>
              </div>
            )}
          </div>
        </div>

        {/* Step Controls */}
        <div className="flex items-center justify-between gap-3 mt-6 pt-4 border-t border-hairline/40">
          <button
            type="button"
            onClick={() => setActiveStepIndex((prev) => Math.max(0, prev - 1))}
            disabled={activeStepIndex === 0}
            className="px-3.5 py-1.5 rounded-lg border border-hairline text-xs font-mono text-ink-2 hover:text-ink-1 hover:bg-surface-3 transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
          >
            ← Previous Step
          </button>
          <button
            type="button"
            onClick={() =>
              setActiveStepIndex((prev) =>
                prev < config.steps.length - 1 ? prev + 1 : config.allowLoop ? 0 : prev
              )
            }
            disabled={!config.allowLoop && activeStepIndex === config.steps.length - 1}
            className="px-4 py-1.5 rounded-lg bg-accent hover:bg-accent-strong text-white text-xs font-mono font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-xs"
          >
            {activeStepIndex === config.steps.length - 1
              ? config.allowLoop
                ? "Restart Loop ⟳"
                : "Complete ✓"
              : "Next Step →"}
          </button>
        </div>
      </div>

      {config.caption && (
        <p className="mt-3 text-xs text-ink-3/70 text-center font-mono">
          {config.caption}
        </p>
      )}
    </div>
  );
}
