"use client";

import { LessonMeta, LessonSection } from "../../../lib/courses/types";
import InteractiveFlowVisualizer from "./InteractiveFlowVisualizer";
import InteractiveCPUScheduler from "./InteractiveCPUScheduler";
import InteractiveStateTransition from "./InteractiveStateTransition";
import InteractiveBankersAlgorithm from "./InteractiveBankersAlgorithm";
import InteractivePageReplacement from "./InteractivePageReplacement";
import InteractiveDiskScheduling from "./InteractiveDiskScheduling";
import InteractiveSemaphore from "./InteractiveSemaphore";
import InteractiveSerializabilityChecker from "./InteractiveSerializabilityChecker";
import InteractiveBPlusTreeCalculator from "./InteractiveBPlusTreeCalculator";
import InteractiveNormalizationAnalyzer from "./InteractiveNormalizationAnalyzer";
import LiveDiagramDrawer, { DiagramPresetKey } from "./LiveDiagramDrawer";
import QuestionToSQLStudio from "./QuestionToSQLStudio";
import KnowledgeCheck from "./KnowledgeCheck";
import GateLens from "./GateLens";
import QuickRevision from "./QuickRevision";
import ResourcesAndSources from "./ResourcesAndSources";
import StickyNote from "./StickyNote";
import ZoomableVisual from "./ZoomableVisual";
import DedicatedCheatSheetModal from "./DedicatedCheatSheetModal";
import { highlightGlossaryTerms } from "../../../lib/courses/glossary";
import { useState } from "react";

export default function LessonRenderer({
  lesson,
  moduleTitle,
  subjectSlug,
}: {
  lesson: LessonMeta;
  moduleTitle?: string;
  subjectSlug?: string;
}) {
  const [isCheatSheetOpen, setIsCheatSheetOpen] = useState(false);

  return (
    <article className="w-full">
      {/* =========================================================
          LESSON HEADER (Student Engineering Notebook Folio)
          ========================================================= */}
      <header className="pb-6 mb-8 border-b border-dashed border-hairline/80">
        {/* Module stamp, read time, GATE badge, and Dedicated Cheat Sheet trigger */}
        <div className="flex flex-wrap items-center justify-between gap-y-2 mb-3">
          <div className="flex flex-wrap items-center gap-x-2 text-[11px] font-mono text-ink-3 tracking-widest uppercase">
            <span className="font-semibold text-ink-2">
              {moduleTitle ? moduleTitle.replace(/^Module \d+:\s*/i, "").toUpperCase() : "OPERATING SYSTEMS"}
            </span>
            <span className="opacity-40">&mdash;</span>
            <span>~{lesson.estimatedMinutes} MIN READ</span>
            {lesson.hasGATE && (
              <>
                <span className="opacity-40">&middot;</span>
                <span className="bg-[#fef08a] dark:bg-[#facc15] text-[#713f12] dark:text-[#422006] px-2 py-0.5 rounded-[3px] text-[10px] font-bold tracking-wider font-mono">
                  GATE CS LENS
                </span>
              </>
            )}
          </div>

          <button
            type="button"
            onClick={() => setIsCheatSheetOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono font-semibold bg-accent/10 hover:bg-accent/20 text-accent border border-accent/30 hover:border-accent/50 shadow-sm transition-all"
            title={`Open dedicated cheatsheet for ${lesson.title}`}
          >
            <span>📑</span>
            <span>Topic Cheat Sheet</span>
          </button>
        </div>

        <h1 className="font-handwriting text-2xl xs:text-3xl sm:text-4xl md:text-[2.75rem] font-bold text-ink-1 tracking-normal leading-snug sm:leading-[1.2] mb-3 break-words">
          <span
            className="inline bg-violet-500/10 dark:bg-violet-500/20 px-1.5 py-0.5 rounded-[4px] [box-decoration-break:clone] [-webkit-box-decoration-break:clone]"
            dangerouslySetInnerHTML={{
              __html: formatMarkdownInline(lesson.title),
            }}
          />
        </h1>

        {/* Serif Subtitle */}
        {lesson.tagline && (
          <p className="text-[clamp(1rem,1.2vw,1.125rem)] text-ink-2 leading-relaxed font-serif italic max-w-[68ch]">
            &ldquo;{lesson.tagline}&rdquo;
          </p>
        )}
      </header>

      {/* =========================================================
          SECTIONS STREAM (Content on Canvas, Not in Boxes)
          ========================================================= */}
      <div className="space-y-12">
        {lesson.sections.map((section, idx) => {
          const modNum = moduleTitle?.match(/(\d+)/)?.[1] || "1";
          return (
            <SectionBlock
              key={idx}
              section={section}
              index={idx}
              modNum={modNum}
              subjectSlug={subjectSlug}
              onOpenCheatSheet={() => setIsCheatSheetOpen(true)}
            />
          );
        })}
      </div>

      {/* In-lesson Dedicated Cheat Sheet Modal */}
      <DedicatedCheatSheetModal
        lesson={lesson}
        isOpen={isCheatSheetOpen}
        onClose={() => setIsCheatSheetOpen(false)}
      />
    </article>
  );
}

function SectionBlock({
  section,
  index,
  modNum = "1",
  subjectSlug,
  onOpenCheatSheet,
}: {
  section: LessonSection;
  index: number;
  modNum?: string;
  subjectSlug?: string;
  onOpenCheatSheet?: () => void;
}) {
  const sectionId = section.id || `section-${index}`;
  const sectionNumber = `${index + 1}.`;

  switch (section.type) {
    case "explanation":
      return (
        <section id={sectionId} className="scroll-mt-28">
          {section.heading && (
            <div className="pb-2.5 mb-5 border-b border-dashed border-hairline/80 flex items-baseline justify-between gap-3">
              <h2 className="font-handwriting text-2xl sm:text-3xl font-bold text-ink-1 tracking-tight flex items-baseline gap-2.5">
                <span className="font-mono text-accent text-lg sm:text-xl font-bold shrink-0">
                  {sectionNumber}
                </span>
                <span
                  className="bg-violet-500/10 dark:bg-violet-500/15 px-2 py-0.5 rounded-[3px]"
                  dangerouslySetInnerHTML={{
                    __html: formatMarkdownInline(section.heading.replace(/^\d+\.\s*/, "")),
                  }}
                />
              </h2>
              <span className="hidden sm:inline font-mono text-[10px] text-ink-3 uppercase tracking-widest opacity-60">
                § {modNum}.{sectionNumber}
              </span>
            </div>
          )}
          <div className="space-y-5 text-[clamp(1rem,1.1vw,1.125rem)] text-ink-2 leading-[1.8] font-sans max-w-[72ch]">
            {section.body.map((para, pIdx) => (
              <p
                key={pIdx}
                dangerouslySetInnerHTML={{
                  __html: formatMarkdownInline(para),
                }}
              />
            ))}
          </div>

          {section.callout && (
            section.callout.kind === "trap" || section.callout.kind === "exam-tip" ? (
              <StickyNote
                title={
                  section.callout.kind === "trap"
                    ? `Common Trap: ${section.callout.title || ""}`
                    : `Exam Note: ${section.callout.title || ""}`
                }
                rotation={section.callout.kind === "trap" ? "1deg" : "-1deg"}
                tone={section.callout.kind === "trap" ? "pink" : "yellow"}
              >
                <span
                  dangerouslySetInnerHTML={{
                    __html: formatMarkdownInline(section.callout.message),
                  }}
                />
              </StickyNote>
            ) : (
              <div className={`my-7 marginalia-bracket text-ink-1 relative font-sans pl-4 ${section.callout.kind === "mental-model" ? "notebook-highlight-green" : "notebook-highlight-yellow"}`}>
                <div className="font-handwriting text-xl sm:text-2xl font-bold text-accent mb-1 flex items-baseline gap-2">
                  <span>
                    {section.callout.kind === "mental-model"
                      ? "mental model"
                      : "notice this:"}
                  </span>
                  {section.callout.title && (
                    <span className="text-xs font-mono font-normal text-ink-3">
                      &mdash; {section.callout.title}
                    </span>
                  )}
                </div>
                <p
                  className="text-[15px] sm:text-base text-ink-2 leading-relaxed font-sans"
                  dangerouslySetInnerHTML={{
                    __html: formatMarkdownInline(section.callout.message),
                  }}
                />
              </div>
            )
          )}
        </section>
      );

    case "diagram": {
      const livePresetMap: Record<string, DiagramPresetKey> = {
        "seven-state": "os-process-lifecycle",
        "architecture": "os-dual-mode",
        "three-schema": "dbms-three-schema",
        "b-plus-tree": "dbms-b-plus-tree",
        "b-tree": "dbms-b-plus-tree",
        "transaction-states": "dbms-transaction-states",
        "tcp-handshake": "cn-tcp-handshake",
        "pipeline-hazards": "coa-pipeline-hazards",
        "dfa-state": "toc-dfa-state",
        "memory-layout": "c-pointer-memory",
      };

      const preset = livePresetMap[section.diagramType];

      return (
        <figure id={sectionId} className="my-10 scroll-mt-24 border-y border-dashed border-hairline/80 py-4">
          {section.heading && (
            <h3 className="font-handwriting text-xl sm:text-2xl font-bold text-ink-1 mb-3">
              {section.heading}
            </h3>
          )}

          <ZoomableVisual label="Expand diagram">
            {preset ? (
              <LiveDiagramDrawer presetKey={preset} />
            ) : (
              <div className="min-w-0 max-w-full overflow-hidden p-2 sm:p-4">
                {section.diagramType === "process-pcb" && <PcbDiagram />}
                {section.svgContent && (
                  <div
                    className="flex w-full max-w-full justify-center overflow-hidden"
                    dangerouslySetInnerHTML={{ __html: section.svgContent }}
                  />
                )}
                {section.diagramType !== "process-pcb" && !section.svgContent && section.asciiArt && (
                  <pre className="max-w-full overflow-hidden whitespace-pre-wrap break-words rounded border border-dashed border-hairline bg-surface-1/40 p-4 font-mono text-xs leading-relaxed text-ink-1 sm:text-sm">
                    {section.asciiArt}
                  </pre>
                )}
              </div>
            )}
          </ZoomableVisual>

          <figcaption className="mt-2 text-xs text-ink-3 font-mono text-center">
            {section.caption}
          </figcaption>
        </figure>
      );
    }

    case "interactive":
      return (
        <section id={sectionId} className="my-10 scroll-mt-24 pt-2">
          {/* Subtle laboratory indicator */}
          <div className="mb-1 font-mono text-[10px] text-ink-3 flex items-center gap-2 uppercase tracking-widest">
            <span className="text-accent font-bold">
              LABORATORY &middot; INTERACTIVE SIMULATION &mdash;
            </span>
            <span>Concept Exploration</span>
          </div>

          {section.heading && (
            <h3 className="font-handwriting text-2xl sm:text-3xl font-bold text-ink-1 mb-2">
              {section.heading}
            </h3>
          )}
          {section.leadParagraph && (
            <p className="text-sm text-ink-2 mb-4 leading-relaxed max-w-[70ch]">
              {section.leadParagraph}
            </p>
          )}

          <ZoomableVisual label="Expand interactive visual">
            {section.interactive.kind === "flow-visualizer" && (
              <InteractiveFlowVisualizer config={section.interactive.config} />
            )}
            {section.interactive.kind === "cpu-scheduler" && (
              <InteractiveCPUScheduler config={section.interactive.config} />
            )}
            {section.interactive.kind === "state-transition" && (
              <InteractiveStateTransition config={section.interactive.config} />
            )}
            {section.interactive.kind === "bankers-algorithm" && (
              <InteractiveBankersAlgorithm config={section.interactive.config} />
            )}
            {section.interactive.kind === "page-replacement" && (
              <InteractivePageReplacement config={section.interactive.config} />
            )}
            {section.interactive.kind === "disk-scheduling" && (
              <InteractiveDiskScheduling config={section.interactive.config} />
            )}
            {section.interactive.kind === "semaphore" && (
              <InteractiveSemaphore config={section.interactive.config} />
            )}
            {section.interactive.kind === "serializability-checker" && (
              <InteractiveSerializabilityChecker config={section.interactive.config} />
            )}
            {section.interactive.kind === "b-plus-tree-calculator" && (
              <InteractiveBPlusTreeCalculator config={section.interactive.config} />
            )}
            {section.interactive.kind === "normalization-analyzer" && (
              <InteractiveNormalizationAnalyzer config={section.interactive.config} />
            )}
            {section.interactive.kind === "question-to-sql" && (
              <QuestionToSQLStudio />
            )}
            {section.interactive.kind === "live-diagram" && (
              <LiveDiagramDrawer
                presetKey={
                  (section.interactive.config?.presetKey as DiagramPresetKey) ||
                  "os-process-lifecycle"
                }
              />
            )}
          </ZoomableVisual>
        </section>
      );

    case "worked-example":
      return (
        <section id={sectionId} className="my-10 py-6 scroll-mt-24 space-y-5 border-y border-dashed border-hairline/80">
          {/* Header */}
          <div className="flex items-baseline justify-between border-b border-dashed border-hairline/60 pb-2">
            <span className="font-mono text-[10px] uppercase tracking-widest text-ink-3 block">
              WORKED NUMERICAL &middot; STUDENT DERIVATION
            </span>
            {section.examTakeaway && (
              <span
                className="font-handwriting text-base text-accent font-semibold"
                dangerouslySetInnerHTML={{
                  __html: `✎ Key Takeaway: ${formatMarkdownInline(section.examTakeaway)}`,
                }}
              />
            )}
          </div>

          {section.heading && (
            <h3 className="font-handwriting text-2xl sm:text-3xl font-bold text-ink-1">
              {section.heading}
            </h3>
          )}

          {/* Problem Statement on Paper */}
          <div className="pl-4 border-l-2 border-hairline/90 text-sm sm:text-[15px] text-ink-1 leading-relaxed font-sans">
            <span className="font-mono text-xs font-bold text-ink-3 uppercase block mb-1">
              Problem Statement:
            </span>
            <div
              dangerouslySetInnerHTML={{
                __html: formatMarkdownInline(section.problemStatement),
              }}
            />
          </div>

          {/* Given Data Ledger */}
          {section.givenData && section.givenData.length > 0 && (
            <div className="my-3 overflow-x-auto">
              <table className="w-full text-xs font-mono border-collapse">
                <tbody>
                  <tr className="border-b border-dashed border-hairline/70">
                    {section.givenData.map((d, dIdx) => (
                      <td key={dIdx} className="py-1.5 px-3">
                        <span className="text-ink-3 text-[10px] uppercase block">{d.label}</span>
                        <span className="font-bold text-ink-1">{d.value}</span>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {/* Hand-Drawn Gantt Chart / SVG if provided */}
          {section.svgContent && (
            <div className="my-4 flex justify-center overflow-x-auto border-y border-dashed border-hairline/60 py-2">
              <div
                className="w-full max-w-xl"
                dangerouslySetInnerHTML={{ __html: section.svgContent }}
              />
            </div>
          )}

          {/* Numbered Steps in Pencil & Violet Ink */}
          <div className="space-y-4 pt-1">
            {section.steps.map((st) => (
              <div key={st.stepNumber} className="pl-4 border-l-2 border-accent/40 space-y-1">
                <span className="font-handwriting text-lg sm:text-xl font-bold text-accent block">
                  Step {st.stepNumber}: {st.title}
                </span>
                <p
                  className="text-xs sm:text-sm text-ink-2 leading-relaxed font-sans whitespace-pre-line"
                  dangerouslySetInnerHTML={{
                    __html: formatMarkdownInline(st.description),
                  }}
                />
                {st.formula && (
                  <div className="font-mono text-xs text-ink-1 bg-surface-1/40 px-3 py-1.5 rounded border border-dashed border-hairline/80 my-1 inline-block">
                    {st.formula}
                  </div>
                )}
                {st.intermediateResult && (
                  <span
                    className="font-handwriting text-sm sm:text-base text-accent block mt-0.5"
                    dangerouslySetInnerHTML={{
                      __html: `↳ Result: ${formatMarkdownInline(st.intermediateResult)}`,
                    }}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Final Answer Highlighted in Soft Yellow */}
          <div className="mt-6 pt-3 border-t border-dashed border-hairline/80 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <span className="font-handwriting text-lg font-bold text-ink-1">
              Final Answer:
            </span>
            <span
              className="highlighter-yellow text-sm sm:text-base font-bold text-ink-1 font-mono px-2.5 py-0.5 self-start sm:self-auto"
              dangerouslySetInnerHTML={{
                __html: formatMarkdownInline(section.finalAnswer),
              }}
            />
          </div>
        </section>
      );

    case "comparison":
      return (
        <section id={sectionId} className="my-10 scroll-mt-24 space-y-4">
          {section.heading && (
            <h3 className="text-lg sm:text-xl font-bold text-ink-1 font-sans">
              {section.heading}
            </h3>
          )}
          {section.leadParagraph && (
            <p
              className="text-sm text-ink-2 leading-relaxed max-w-[70ch]"
              dangerouslySetInnerHTML={{
                __html: formatMarkdownInline(section.leadParagraph),
              }}
            />
          )}

          <div className="overflow-x-auto rounded border border-hairline bg-surface-1/40">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-hairline bg-surface-2/60 text-ink-3 font-mono uppercase text-[11px]">
                  <th className="py-2.5 px-4 font-semibold">Feature / Aspect</th>
                  <th className="py-2.5 px-4 font-semibold text-accent">{section.columns[0]}</th>
                  <th className="py-2.5 px-4 font-semibold text-ink-1">{section.columns[1]}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline text-ink-2 font-sans">
                {section.criteria.map((c, cIdx) => (
                  <tr key={cIdx} className="hover:bg-surface-2/20">
                    <td className="py-3 px-4 font-mono font-medium text-ink-1 text-xs">
                      {c.feature ?? c.criterion}
                    </td>
                    <td
                      className="py-3 px-4 leading-relaxed"
                      dangerouslySetInnerHTML={{
                        __html: formatMarkdownInline(c.first ?? c.values?.[0] ?? ""),
                      }}
                    />
                    <td
                      className="py-3 px-4 leading-relaxed"
                      dangerouslySetInnerHTML={{
                        __html: formatMarkdownInline(c.second ?? c.values?.[1] ?? ""),
                      }}
                    />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {section.summaryTakeaway && (
            <p
              className="font-handwriting text-lg text-accent border-l-2 border-accent/60 pl-3 py-1 font-semibold"
              dangerouslySetInnerHTML={{
                __html: `✎ Takeaway: ${formatMarkdownInline(section.summaryTakeaway)}`,
              }}
            />
          )}
        </section>
      );

    case "misconceptions":
      return (
        <section id={sectionId} className="my-10 scroll-mt-24 space-y-4">
          {section.heading && (
            <div className="pb-2 mb-4 border-b border-dashed border-hairline/80 flex items-baseline justify-between gap-3">
              <h2 className="font-handwriting text-2xl sm:text-3xl font-bold text-ink-1 tracking-tight flex items-baseline gap-2.5">
                <span className="font-mono text-accent text-lg sm:text-xl font-bold shrink-0">
                  {sectionNumber}
                </span>
                <span className="bg-amber-500/10 dark:bg-amber-500/15 text-amber-900 dark:text-amber-200 px-2 py-0.5 rounded-[3px]">
                  {section.heading.replace(/^\d+\.\s*/, "")}
                </span>
              </h2>
              <span className="hidden sm:inline font-mono text-[10px] text-ink-3 uppercase tracking-widest opacity-60">
                § {modNum}.{sectionNumber}
              </span>
            </div>
          )}

          <div className="space-y-4">
            {section.items.map((item, mIdx) => (
              <div
                key={mIdx}
                className="p-4 sm:p-5 rounded-lg border border-dashed border-hairline bg-surface-1/40 space-y-2.5"
              >
                <div className="flex items-start gap-2 text-rose-600 dark:text-rose-400 font-sans text-sm font-semibold">
                  <span className="shrink-0 font-mono text-xs uppercase px-1.5 py-0.5 rounded bg-rose-500/10 border border-rose-500/20">
                    Myth
                  </span>
                  <span dangerouslySetInnerHTML={{ __html: formatMarkdownInline(item.commonMyth) }} />
                </div>

                <div className="flex items-start gap-2 text-emerald-600 dark:text-emerald-400 font-sans text-sm font-semibold">
                  <span className="shrink-0 font-mono text-xs uppercase px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                    Reality
                  </span>
                  <span dangerouslySetInnerHTML={{ __html: formatMarkdownInline(item.reality) }} />
                </div>

                <p
                  className="text-xs sm:text-sm text-ink-2 leading-relaxed font-sans pt-1 border-t border-hairline/60"
                  dangerouslySetInnerHTML={{ __html: formatMarkdownInline(item.explanation) }}
                />
              </div>
            ))}
          </div>
        </section>
      );

    case "practice":
      return (
        <div id={sectionId} className="scroll-mt-24">
          <KnowledgeCheck
            questions={section.questions}
            heading={section.heading}
            leadParagraph={section.leadParagraph}
          />
        </div>
      );

    case "gate-lens":
      return (
        <div id={sectionId} className="scroll-mt-24">
          <GateLens section={section} />
        </div>
      );

    case "quick-revision":
      return (
        <div id={sectionId} className="scroll-mt-24">
          <QuickRevision
            section={section}
            onOpenCheatSheet={onOpenCheatSheet}
          />
        </div>
      );

    case "resources":
      return (
        <div id={sectionId} className="scroll-mt-24">
          <ResourcesAndSources section={section} subjectSlug={subjectSlug} />
        </div>
      );

    default:
      return null;
  }
}

/** Helper to render simple inline bold, italic, math, highlights, and code cleanly */
export function formatMarkdownInline(text: string): string {
  const formatted = text
    .replace(/\\\{/g, "{")
    .replace(/\\\}/g, "}")
    .replace(/\\rightarrow/g, "→")
    .replace(/\\dots/g, "...")
    .replace(/\\ge/g, "≥")
    .replace(/\\le/g, "≤")
    .replace(/\\times/g, "×")
    .replace(/\\%/g, "%")
    // Explicit color highlight markdown syntax: ==color:text==
    .replace(/==pink:(.*?)==/g, "<mark class='student-highlight highlight-pink'>$1</mark>")
    .replace(/==green:(.*?)==/g, "<mark class='student-highlight highlight-green'>$1</mark>")
    .replace(/==purple:(.*?)==/g, "<mark class='student-highlight highlight-purple'>$1</mark>")
    .replace(/==violet:(.*?)==/g, "<mark class='student-highlight highlight-purple'>$1</mark>")
    .replace(/==yellow:(.*?)==/g, "<mark class='student-highlight highlight-yellow'>$1</mark>")
    // Default highlight syntax: ==text== (yellow core fact/definition)
    .replace(/==(.*?)==/g, "<mark class='student-highlight highlight-yellow'>$1</mark>")
    // Support JSX-like tag in text data: <Highlight color="pink">...</Highlight>
    .replace(/<Highlight\s+color=["']pink["']>(.*?)<\/Highlight>/g, "<mark class='student-highlight highlight-pink'>$1</mark>")
    .replace(/<Highlight\s+color=["']green["']>(.*?)<\/Highlight>/g, "<mark class='student-highlight highlight-green'>$1</mark>")
    .replace(/<Highlight\s+color=["']purple["']>(.*?)<\/Highlight>/g, "<mark class='student-highlight highlight-purple'>$1</mark>")
    .replace(/<Highlight\s+color=["']violet["']>(.*?)<\/Highlight>/g, "<mark class='student-highlight highlight-purple'>$1</mark>")
    .replace(/<Highlight(?:\s+color=["']yellow["'])?>(.*?)<\/Highlight>/g, "<mark class='student-highlight highlight-yellow'>$1</mark>")
    .replace(/~~(.*?)~~/g, "<span class='line-through opacity-60'>$1</span>")
    .replace(/\\text\{([^}]+)\}/g, "$1")
    .replace(/\$([^$]+)\$/g, "<span class='font-mono font-medium text-ink-1 text-[0.94em]'>$1</span>")
    .replace(/\*\*(.*?)\*\*/g, "<strong class='text-ink-1 font-semibold'>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/`([^`]+)`/g, "<code class='font-mono text-[0.88em] px-1.5 py-0.5 rounded bg-surface-2 border border-hairline text-accent font-semibold'>$1</code>");

  return highlightGlossaryTerms(formatted);
}

/** Theme-aware SVG Process Memory Layout Diagram with student handwritten notes */
function MemoryLayoutDiagram() {
  return (
    <div className="w-full max-w-lg mx-auto py-2">
      <svg
        viewBox="0 0 440 330"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto text-ink-1 font-mono text-xs select-none"
      >
        <rect x="40" y="20" width="240" height="290" rx="8" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.2" />
        <text x="300" y="35" fill="currentColor" opacity="0.6" fontSize="10">0xFFFF (High Memory)</text>
        <text x="300" y="305" fill="currentColor" opacity="0.6" fontSize="10">0x0000 (Low Memory)</text>

        {/* Stack */}
        <rect x="50" y="30" width="220" height="50" rx="6" fill="var(--color-accent, #9333ea)" fillOpacity="0.12" stroke="var(--color-accent, #9333ea)" strokeWidth="1.2" />
        <text x="160" y="52" fill="currentColor" fontWeight="bold" textAnchor="middle">Stack Segment</text>
        <text x="160" y="68" fill="currentColor" opacity="0.75" fontSize="10" textAnchor="middle">Local vars, parameters, call frames</text>
        <path d="M160 85 L160 105 M155 100 L160 105 L165 100" stroke="var(--color-accent, #9333ea)" strokeWidth="1.3" />
        <text x="290" y="96" fill="var(--color-accent, #9333ea)" fontSize="13" className="font-handwriting" style={{ fontFamily: "'Caveat', cursive" }}>
          ✎ grows down (stack frames)
        </text>

        {/* Free memory */}
        <rect x="50" y="112" width="220" height="46" stroke="currentColor" strokeOpacity="0.15" strokeDasharray="3 3" />
        <text x="160" y="132" fill="currentColor" opacity="0.45" fontSize="10" textAnchor="middle">Unallocated Virtual Memory</text>
        <text x="160" y="148" fill="var(--color-highlight, #facc15)" fontSize="13" textAnchor="middle" className="font-handwriting" style={{ fontFamily: "'Caveat', cursive" }}>
          ✎ collision = SegFault!
        </text>

        {/* Heap */}
        <path d="M160 182 L160 162 M155 167 L160 162 L165 167" stroke="var(--color-highlight, #f59e0b)" strokeWidth="1.3" />
        <text x="290" y="172" fill="var(--color-highlight, #f59e0b)" fontSize="13" className="font-handwriting" style={{ fontFamily: "'Caveat', cursive" }}>
          ✎ grows up (malloc / sbrk)
        </text>
        <rect x="50" y="188" width="220" height="45" rx="6" fill="var(--color-highlight, #f59e0b)" fillOpacity="0.12" stroke="var(--color-highlight, #f59e0b)" strokeWidth="1.2" />
        <text x="160" y="208" fill="currentColor" fontWeight="bold" textAnchor="middle">Heap Segment</text>
        <text x="160" y="222" fill="currentColor" opacity="0.75" fontSize="10" textAnchor="middle">Dynamic memory (malloc, free)</text>

        {/* BSS / Data */}
        <rect x="50" y="238" width="220" height="30" rx="4" fill="currentColor" fillOpacity="0.04" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1" />
        <text x="160" y="257" fill="currentColor" fontSize="11" textAnchor="middle">Data &amp; BSS Segments (Globals/Statics)</text>

        {/* Text */}
        <rect x="50" y="272" width="220" height="30" rx="4" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1" />
        <text x="160" y="291" fill="currentColor" fontWeight="bold" fontSize="11" textAnchor="middle">Text Segment (Binary Code)</text>
        <text x="290" y="290" fill="currentColor" opacity="0.6" fontSize="12" className="font-handwriting" style={{ fontFamily: "'Caveat', cursive" }}>
          ✎ read-only opcodes
        </text>
      </svg>
    </div>
  );
}

/** Theme-aware SVG Process Control Block (PCB) Structure Diagram with student handwritten notes */
function PcbDiagram() {
  return (
    <div className="w-full max-w-md mx-auto py-2">
      <svg
        viewBox="0 0 380 295"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto text-ink-1 font-mono text-xs select-none"
      >
        <rect x="20" y="15" width="340" height="245" rx="8" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1.2" />
        <text x="190" y="36" fill="var(--color-accent, #9333ea)" fontWeight="bold" textAnchor="middle">Process Control Block (PCB)</text>
        <line x1="20" y1="46" x2="360" y2="46" stroke="currentColor" strokeOpacity="0.2" />

        <rect x="35" y="54" width="310" height="24" rx="4" fill="var(--color-surface-2, #27272a)" />
        <text x="45" y="70" fill="currentColor" fontWeight="bold">Pointer / PID:</text>
        <text x="260" y="70" fill="currentColor" opacity="0.8">e.g. 1042</text>

        <rect x="35" y="84" width="310" height="24" rx="4" fill="var(--color-surface-2, #27272a)" />
        <text x="45" y="100" fill="currentColor" fontWeight="bold">Process State:</text>
        <text x="260" y="100" fill="var(--color-emerald, #10b981)">READY / RUNNING</text>

        <rect x="35" y="114" width="310" height="24" rx="4" fill="var(--color-surface-2, #27272a)" />
        <text x="45" y="130" fill="currentColor" fontWeight="bold">Program Counter (PC):</text>
        <text x="260" y="130" fill="currentColor" opacity="0.8">0x00401A20</text>

        <rect x="35" y="144" width="310" height="24" rx="4" fill="var(--color-surface-2, #27272a)" />
        <text x="45" y="160" fill="currentColor" fontWeight="bold">CPU Registers:</text>
        <text x="260" y="160" fill="currentColor" opacity="0.8">EAX, EBX, ESP, EBP</text>

        <rect x="35" y="174" width="310" height="24" rx="4" fill="var(--color-surface-2, #27272a)" />
        <text x="45" y="190" fill="currentColor" fontWeight="bold">Memory Limits:</text>
        <text x="260" y="190" fill="currentColor" opacity="0.8">Base &amp; Limit / Page Table</text>

        <rect x="35" y="204" width="310" height="24" rx="4" fill="var(--color-surface-2, #27272a)" />
        <text x="45" y="220" fill="currentColor" fontWeight="bold">List of Open Files:</text>
        <text x="260" y="220" fill="currentColor" opacity="0.8">stdin, stdout, socket#3</text>

        {/* Student Notebook Annotation */}
        <text x="190" y="278" fill="var(--color-accent, #9333ea)" fontSize="13" textAnchor="middle" className="font-handwriting" style={{ fontFamily: "'Caveat', cursive" }}>
          ✎ 1 PCB per process in OS Kernel Space &middot; saved on every context switch
        </text>
      </svg>
    </div>
  );
}

/** Theme-aware SVG Dual Mode Execution & System Call Diagram with student handwritten notes */
function DualModeDiagram() {
  return (
    <div className="w-full max-w-lg mx-auto py-2">
      <svg
        viewBox="0 0 440 260"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto text-ink-1 font-mono text-xs select-none"
      >
        <rect x="25" y="20" width="390" height="85" rx="8" fill="var(--color-surface-2, #27272a)" fillOpacity="0.4" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1.2" />
        <text x="40" y="42" fill="currentColor" fontWeight="bold">User Space (Mode Bit = 1)</text>
        <text x="320" y="42" fill="var(--color-accent, #9333ea)" fontSize="13" textAnchor="middle" className="font-handwriting" style={{ fontFamily: "'Caveat', cursive" }}>
          ✎ untrusted user code
        </text>
        <text x="40" y="60" fill="currentColor" opacity="0.7" fontSize="10">User Applications (C Program, Web Browser)</text>
        <rect x="45" y="70" width="160" height="24" rx="4" fill="var(--color-accent, #9333ea)" fillOpacity="0.15" stroke="var(--color-accent, #9333ea)" strokeWidth="1" />
        <text x="125" y="86" fill="currentColor" textAnchor="middle" fontSize="11">system_call() / read()</text>

        <path d="M125 95 L125 145" stroke="var(--color-highlight, #f59e0b)" strokeWidth="1.8" />
        <text x="135" y="124" fill="var(--color-highlight, #f59e0b)" fontSize="13" className="font-handwriting" style={{ fontFamily: "'Caveat', cursive" }}>
          ✎ trap: hardware flips mode bit (1 → 0)
        </text>

        <path d="M300 145 L300 95" stroke="var(--color-emerald, #10b981)" strokeWidth="1.8" />
        <text x="310" y="124" fill="var(--color-emerald, #10b981)" fontSize="13" className="font-handwriting" style={{ fontFamily: "'Caveat', cursive" }}>
          ✎ sysret: restores mode bit (0 → 1)
        </text>

        <rect x="25" y="148" width="390" height="80" rx="8" fill="var(--color-accent, #9333ea)" fillOpacity="0.08" stroke="var(--color-accent, #9333ea)" strokeWidth="1.2" />
        <text x="40" y="170" fill="var(--color-accent, #9333ea)" fontWeight="bold">Kernel Space (Mode Bit = 0)</text>
        <text x="40" y="188" fill="currentColor" opacity="0.7" fontSize="10">Privileged Hardware Instructions &amp; System Services</text>
        <text x="40" y="206" fill="currentColor" opacity="0.9" fontSize="10">Execute Service Routine → Access Disk/I/O</text>

        {/* Notebook Takeaway */}
        <text x="220" y="248" fill="currentColor" opacity="0.65" fontSize="12" textAnchor="middle" className="font-handwriting" style={{ fontFamily: "'Caveat', cursive" }}>
          ✎ user code can NEVER execute privileged hardware instructions directly
        </text>
      </svg>
    </div>
  );
}

/** Theme-aware SVG 7-State Process Lifecycle & Swapper Diagram with student handwritten notes */
function SevenStateDiagram() {
  return (
    <div className="w-full max-w-2xl mx-auto py-2">
      <svg
        viewBox="0 0 540 330"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto text-ink-1 font-mono text-[10px] select-none"
      >
        <defs>
          <marker id="arrow-sw" viewBox="0 0 6 6" refX="5" refY="3" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M 0 0 L 6 3 L 0 6 z" fill="currentColor" opacity="0.6" />
          </marker>
          <marker id="arrow-acc" viewBox="0 0 6 6" refX="5" refY="3" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M 0 0 L 6 3 L 0 6 z" fill="var(--color-accent, #9333ea)" />
          </marker>
          <marker id="arrow-warn" viewBox="0 0 6 6" refX="5" refY="3" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M 0 0 L 6 3 L 0 6 z" fill="var(--color-highlight, #f59e0b)" />
          </marker>
        </defs>

        <rect x="15" y="15" width="510" height="175" rx="8" fill="currentColor" fillOpacity="0.02" stroke="currentColor" strokeOpacity="0.15" strokeDasharray="4 4" />
        <text x="25" y="32" fill="var(--color-accent, #9333ea)" fontWeight="bold" fontSize="9" letterSpacing="1">
          MAIN MEMORY (RAM) · ACTIVE EXECUTION REGION
        </text>
        <text x="440" y="32" fill="currentColor" opacity="0.6" fontSize="12" className="font-handwriting" style={{ fontFamily: "'Caveat', cursive" }}>
          ✎ active in RAM
        </text>

        <rect x="15" y="210" width="510" height="105" rx="8" fill="var(--color-surface-2, #27272a)" fillOpacity="0.4" stroke="currentColor" strokeOpacity="0.15" />
        <text x="25" y="226" fill="var(--color-highlight, #f59e0b)" fontWeight="bold" fontSize="9" letterSpacing="1">
          SECONDARY STORAGE (SWAP SPACE / DISK) · SUSPENDED REGION
        </text>
        <text x="430" y="226" fill="currentColor" opacity="0.6" fontSize="12" className="font-handwriting" style={{ fontFamily: "'Caveat', cursive" }}>
          ✎ parked on disk
        </text>

        <rect x="30" y="55" width="55" height="30" rx="4" fill="var(--color-surface-2, #27272a)" stroke="currentColor" strokeOpacity="0.3" />
        <text x="57" y="73" fill="currentColor" fontWeight="bold" textAnchor="middle">NEW</text>

        <path d="M85 70 L125 70" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.2" markerEnd="url(#arrow-sw)" />
        <text x="105" y="65" fill="currentColor" opacity="0.6" fontSize="8" textAnchor="middle">Admit</text>

        <rect x="130" y="55" width="70" height="30" rx="4" fill="var(--color-accent, #9333ea)" fillOpacity="0.15" stroke="var(--color-accent, #9333ea)" strokeWidth="1.2" />
        <text x="165" y="73" fill="currentColor" fontWeight="bold" textAnchor="middle">READY</text>

        <rect x="290" y="55" width="75" height="30" rx="4" fill="var(--color-emerald, #10b981)" fillOpacity="0.15" stroke="var(--color-emerald, #10b981)" strokeWidth="1.2" />
        <text x="327" y="73" fill="currentColor" fontWeight="bold" textAnchor="middle">RUNNING</text>

        <path d="M200 65 L285 65" stroke="var(--color-emerald, #10b981)" strokeWidth="1.2" markerEnd="url(#arrow-sw)" />
        <text x="242" y="60" fill="var(--color-emerald, #10b981)" fontSize="8" textAnchor="middle">Dispatch</text>

        <path d="M285 77 L200 77" stroke="var(--color-highlight, #f59e0b)" strokeWidth="1.2" markerEnd="url(#arrow-warn)" />
        <text x="242" y="87" fill="var(--color-highlight, #f59e0b)" fontSize="8" textAnchor="middle">Time slice / Preempt</text>

        <rect x="435" y="55" width="75" height="30" rx="4" fill="var(--color-rose, #ef4444)" fillOpacity="0.12" stroke="var(--color-rose, #ef4444)" strokeWidth="1.2" />
        <text x="472" y="73" fill="currentColor" fontWeight="bold" textAnchor="middle">TERMINATED</text>

        <path d="M365 70 L430 70" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.2" markerEnd="url(#arrow-sw)" />
        <text x="398" y="65" fill="currentColor" opacity="0.6" fontSize="8" textAnchor="middle">Exit</text>

        <rect x="210" y="135" width="80" height="30" rx="4" fill="var(--color-highlight, #f59e0b)" fillOpacity="0.12" stroke="var(--color-highlight, #f59e0b)" strokeWidth="1.2" />
        <text x="250" y="153" fill="currentColor" fontWeight="bold" textAnchor="middle">WAITING</text>

        <path d="M330 85 L330 150 L295 150" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.2" markerEnd="url(#arrow-sw)" />
        <text x="335" y="125" fill="currentColor" opacity="0.6" fontSize="8">I/O Wait</text>

        <path d="M210 150 L165 150 L165 90" stroke="currentColor" strokeOpacity="0.6" strokeWidth="1.2" markerEnd="url(#arrow-sw)" />
        <text x="175" y="130" fill="currentColor" opacity="0.7" fontSize="8">I/O Event Done</text>

        <rect x="125" y="250" width="105" height="32" rx="4" fill="var(--color-accent, #9333ea)" fillOpacity="0.12" stroke="var(--color-accent, #9333ea)" strokeWidth="1.2" />
        <text x="177" y="267" fill="currentColor" fontWeight="bold" textAnchor="middle">READY-SUSPEND</text>
        <text x="177" y="277" fill="currentColor" opacity="0.6" fontSize="7" textAnchor="middle">(Disk · Ready)</text>

        <rect x="330" y="250" width="115" height="32" rx="4" fill="var(--color-highlight, #f59e0b)" fillOpacity="0.12" stroke="var(--color-highlight, #f59e0b)" strokeWidth="1.2" />
        <text x="387" y="267" fill="currentColor" fontWeight="bold" textAnchor="middle">BLOCKED-SUSPEND</text>
        <text x="387" y="277" fill="currentColor" opacity="0.6" fontSize="7" textAnchor="middle">(Disk · Awaiting I/O)</text>

        <path d="M275 165 L275 200 L350 200 L350 245" stroke="var(--color-highlight, #f59e0b)" strokeWidth="1.2" markerEnd="url(#arrow-warn)" />
        <text x="315" y="195" fill="var(--color-highlight, #f59e0b)" fontSize="12" textAnchor="middle" className="font-handwriting" style={{ fontFamily: "'Caveat', cursive" }}>
          ✎ swap out when RAM choked
        </text>

        <path d="M330 266 L235 266" stroke="var(--color-emerald, #10b981)" strokeWidth="1.4" markerEnd="url(#arrow-sw)" />
        <text x="282" y="260" fill="var(--color-emerald, #10b981)" fontWeight="bold" fontSize="8" textAnchor="middle">Event Completes on Disk</text>

        <path d="M145 250 L145 90" stroke="var(--color-accent, #9333ea)" strokeWidth="1.4" markerEnd="url(#arrow-acc)" />
        <text x="135" y="180" fill="var(--color-accent, #9333ea)" fontWeight="bold" fontSize="12" transform="rotate(-90 135 180)" textAnchor="middle" className="font-handwriting" style={{ fontFamily: "'Caveat', cursive" }}>
          ✎ swap back into RAM
        </text>

        <path d="M185 85 L185 245" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1" strokeDasharray="3 3" markerEnd="url(#arrow-sw)" />
      </svg>
    </div>
  );
}

/** Theme-aware SVG ANSI/SPARC Three-Schema Architecture Diagram with student handwritten notes */
function ThreeSchemaDiagram() {
  return (
    <div className="w-full max-w-2xl mx-auto py-2">
      <svg
        viewBox="0 0 580 430"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto text-ink-1 font-mono text-[11px] select-none"
      >
        <defs>
          <marker id="arrow-down" viewBox="0 0 6 6" refX="3" refY="5" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M 0 0 L 6 0 L 3 6 z" fill="currentColor" opacity="0.6" />
          </marker>
          <marker id="arrow-acc-down" viewBox="0 0 6 6" refX="3" refY="5" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M 0 0 L 6 0 L 3 6 z" fill="var(--color-accent, #9333ea)" />
          </marker>
          <marker id="arrow-acc-up" viewBox="0 0 6 6" refX="3" refY="1" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M 0 6 L 6 6 L 3 0 z" fill="var(--color-accent, #9333ea)" />
          </marker>
          <marker id="arrow-warn-down" viewBox="0 0 6 6" refX="3" refY="5" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M 0 0 L 6 0 L 3 6 z" fill="var(--color-highlight, #f59e0b)" />
          </marker>
          <marker id="arrow-warn-up" viewBox="0 0 6 6" refX="3" refY="1" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M 0 6 L 6 6 L 3 0 z" fill="var(--color-highlight, #f59e0b)" />
          </marker>
        </defs>

        {/* ── 1. EXTERNAL LEVEL ─────────────────────────── */}
        <rect x="15" y="10" width="550" height="85" rx="8" fill="var(--color-accent, #9333ea)" fillOpacity="0.06" stroke="var(--color-accent, #9333ea)" strokeOpacity="0.3" strokeWidth="1.2" />
        <text x="30" y="28" fill="var(--color-accent, #9333ea)" fontWeight="bold" fontSize="11" letterSpacing="0.5">
          EXTERNAL LEVEL (VIEW SCHEMA) &middot; END USER &amp; APP VIEWS
        </text>

        {/* View 1 */}
        <rect x="28" y="38" width="160" height="46" rx="5" fill="var(--color-surface-2, #27272a)" stroke="currentColor" strokeOpacity="0.25" />
        <text x="108" y="55" fill="currentColor" fontWeight="bold" fontSize="10" textAnchor="middle">View 1: Students</text>
        <text x="108" y="72" fill="currentColor" opacity="0.65" fontSize="9" textAnchor="middle">roll_no, gpa, enrolled</text>

        {/* View 2 */}
        <rect x="210" y="38" width="160" height="46" rx="5" fill="var(--color-surface-2, #27272a)" stroke="currentColor" strokeOpacity="0.25" />
        <text x="290" y="55" fill="currentColor" fontWeight="bold" fontSize="10" textAnchor="middle">View 2: Faculty</text>
        <text x="290" y="72" fill="currentColor" opacity="0.65" fontSize="9" textAnchor="middle">faculty_id, salary, dept</text>

        {/* View 3 */}
        <rect x="392" y="38" width="160" height="46" rx="5" fill="var(--color-surface-2, #27272a)" stroke="currentColor" strokeOpacity="0.25" />
        <text x="472" y="55" fill="currentColor" fontWeight="bold" fontSize="10" textAnchor="middle">View 3: Registrar</text>
        <text x="472" y="72" fill="currentColor" opacity="0.65" fontSize="9" textAnchor="middle">student_id, transcript</text>

        {/* ── MAPPING: EXTERNAL <-> CONCEPTUAL (LOGICAL INDEPENDENCE) ── */}
        <line x1="80" y1="96" x2="80" y2="136" stroke="var(--color-accent, #9333ea)" strokeWidth="1.5" markerEnd="url(#arrow-acc-down)" markerStart="url(#arrow-acc-up)" />
        <line x1="500" y1="96" x2="500" y2="136" stroke="var(--color-accent, #9333ea)" strokeWidth="1.5" markerEnd="url(#arrow-acc-down)" markerStart="url(#arrow-acc-up)" />

        <rect x="120" y="103" width="340" height="26" rx="13" fill="var(--color-surface-1, #18181b)" stroke="var(--color-accent, #9333ea)" strokeWidth="1" />
        <text x="290" y="119" fill="var(--color-accent, #9333ea)" fontWeight="bold" fontSize="10" textAnchor="middle">
          LOGICAL DATA INDEPENDENCE &middot; External / Conceptual Mapping
        </text>
        <text x="290" y="100" fill="var(--color-accent, #9333ea)" fontSize="13" textAnchor="middle" className="font-handwriting" style={{ fontFamily: "'Caveat', cursive" }}>
          ✎ change table columns without breaking user views!
        </text>

        {/* ── 2. CONCEPTUAL LEVEL ───────────────────────── */}
        <rect x="15" y="142" width="550" height="85" rx="8" fill="var(--color-emerald, #10b981)" fillOpacity="0.06" stroke="var(--color-emerald, #10b981)" strokeOpacity="0.3" strokeWidth="1.2" />
        <text x="30" y="162" fill="var(--color-emerald, #10b981)" fontWeight="bold" fontSize="11" letterSpacing="0.5">
          CONCEPTUAL LEVEL (LOGICAL SCHEMA) &middot; COMMUNITY ENTERPRISE VIEW
        </text>
        <rect x="28" y="172" width="524" height="44" rx="5" fill="var(--color-surface-2, #27272a)" stroke="currentColor" strokeOpacity="0.25" />
        <text x="290" y="190" fill="currentColor" fontWeight="bold" fontSize="10" textAnchor="middle">
          Entire Enterprise Database Schema: Entities, Attributes, Relationships &amp; Integrity Constraints
        </text>
        <text x="290" y="206" fill="currentColor" opacity="0.7" fontSize="9" textAnchor="middle">
          Relational Tables: Students(id, name, dept), Courses(cid, credits), Faculty(fid, rank), Enroll(id, cid, grade)
        </text>

        {/* ── MAPPING: CONCEPTUAL <-> INTERNAL (PHYSICAL INDEPENDENCE) ── */}
        <line x1="80" y1="228" x2="80" y2="268" stroke="var(--color-highlight, #f59e0b)" strokeWidth="1.5" markerEnd="url(#arrow-warn-down)" markerStart="url(#arrow-warn-up)" />
        <line x1="500" y1="228" x2="500" y2="268" stroke="var(--color-highlight, #f59e0b)" strokeWidth="1.5" markerEnd="url(#arrow-warn-down)" markerStart="url(#arrow-warn-up)" />

        <rect x="120" y="235" width="340" height="26" rx="13" fill="var(--color-surface-1, #18181b)" stroke="var(--color-highlight, #f59e0b)" strokeWidth="1" />
        <text x="290" y="251" fill="var(--color-highlight, #f59e0b)" fontWeight="bold" fontSize="10" textAnchor="middle">
          PHYSICAL DATA INDEPENDENCE &middot; Conceptual / Internal Mapping
        </text>
        <text x="290" y="232" fill="var(--color-highlight, #f59e0b)" fontSize="13" textAnchor="middle" className="font-handwriting" style={{ fontFamily: "'Caveat', cursive" }}>
          ✎ switch B+ tree to Hash index without rewriting any SQL queries!
        </text>

        {/* ── 3. INTERNAL LEVEL ─────────────────────────── */}
        <rect x="15" y="274" width="550" height="75" rx="8" fill="var(--color-surface-2, #27272a)" fillOpacity="0.4" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1.2" />
        <text x="30" y="293" fill="currentColor" fontWeight="bold" fontSize="11" letterSpacing="0.5">
          INTERNAL LEVEL (PHYSICAL SCHEMA) &middot; STORAGE ARCHITECTURE
        </text>
        <rect x="28" y="301" width="524" height="38" rx="5" fill="var(--color-surface-1, #18181b)" stroke="currentColor" strokeOpacity="0.2" />
        <text x="290" y="316" fill="currentColor" fontWeight="bold" fontSize="10" textAnchor="middle">
          Physical Data Structures: Record Byte Offsets, Inodes, Clustered B+ Trees, Secondary Indices, Hash Buckets
        </text>
        <text x="290" y="331" fill="currentColor" opacity="0.65" fontSize="9" textAnchor="middle">
          Page Sizes (4KB / 8KB), Slotted Page Layout, Row vs Columnar Format, Compression &amp; Encryption
        </text>

        {/* ── 4. PHYSICAL STORAGE DISK ──────────────────── */}
        <path d="M290 350 L290 365" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.5" markerEnd="url(#arrow-down)" />

        <rect x="110" y="368" width="360" height="36" rx="6" fill="currentColor" fillOpacity="0.04" stroke="currentColor" strokeOpacity="0.3" />
        <text x="290" y="385" fill="currentColor" fontWeight="bold" fontSize="10" textAnchor="middle">
          PHYSICAL PERSISTENT STORAGE
        </text>
        <text x="290" y="397" fill="currentColor" opacity="0.6" fontSize="8" textAnchor="middle">
          Magnetic Disk Platters (Tracks, Cylinders, Sectors) / NVMe SSD Flash NAND Blocks
        </text>
      </svg>
    </div>
  );
}
