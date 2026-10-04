"use client";

import React, { useState, useMemo } from "react";
import { NormalizationAnalyzerConfig } from "../../../lib/courses/types";

interface FD {
  lhs: string[];
  rhs: string[];
}

export default function InteractiveNormalizationAnalyzer({
  config,
}: {
  config: NormalizationAnalyzerConfig;
}) {
  const [attributes, setAttributes] = useState<string[]>(
    config.defaultAttributes || ["A", "B", "C", "D"]
  );
  const [fds, setFds] = useState<FD[]>(
    config.defaultFDs || [
      { lhs: ["A", "B"], rhs: ["C"] },
      { lhs: ["C"], rhs: ["D"] },
      { lhs: ["D"], rhs: ["A"] },
    ]
  );
  const [selectedClosureAttrs, setSelectedClosureAttrs] = useState<string[]>(["A", "B"]);

  // Helper to compute attribute closure
  const computeClosure = (seed: string[], currentFds: FD[]): string[] => {
    let closure = new Set<string>(seed);
    let changed = true;

    while (changed) {
      changed = false;
      for (const fd of currentFds) {
        // If all lhs attributes are in closure
        if (fd.lhs.every((attr) => closure.has(attr))) {
          for (const r of fd.rhs) {
            if (!closure.has(r)) {
              closure.add(r);
              changed = true;
            }
          }
        }
      }
    }
    return Array.from(closure).sort();
  };

  // User-selected closure
  const userClosure = useMemo(() => {
    return computeClosure(selectedClosureAttrs, fds);
  }, [selectedClosureAttrs, fds]);

  // Compute all candidate keys
  const { candidateKeys, primeAttributes, nonPrimeAttributes, normalFormAnalysis } = useMemo(() => {
    // 1. Identify attributes that never appear on the RHS (Essential Attributes)
    const rhsAttrs = new Set<string>();
    fds.forEach((fd) => fd.rhs.forEach((r) => rhsAttrs.add(r)));

    const essentialAttrs = attributes.filter((a) => !rhsAttrs.has(a));

    // Generate powerset of attributes to find minimal superkeys
    const getAllSubsets = (arr: string[]): string[][] => {
      return arr.reduce(
        (subsets, value) => subsets.concat(subsets.map((set) => [value, ...set])),
        [[]] as string[][]
      );
    };

    const allSubsets = getAllSubsets(attributes).sort((a, b) => a.length - b.length);
    const superkeys: string[][] = [];

    for (const subset of allSubsets) {
      if (subset.length === 0) continue;
      // Must contain essential attributes
      if (!essentialAttrs.every((ea) => subset.includes(ea))) continue;

      const cl = computeClosure(subset, fds);
      if (cl.length === attributes.length) {
        superkeys.push(subset.sort());
      }
    }

    // Filter to minimal superkeys (candidate keys)
    const cKeys: string[][] = [];
    for (const sk of superkeys) {
      const isMinimal = !cKeys.some((ck) => ck.every((attr) => sk.includes(attr)));
      if (isMinimal) {
        cKeys.push(sk);
      }
    }

    const primeSet = new Set<string>();
    cKeys.forEach((k) => k.forEach((a) => primeSet.add(a)));
    const primeList = Array.from(primeSet).sort();
    const nonPrimeList = attributes.filter((a) => !primeSet.has(a));

    // Helper: is X a superkey?
    const isSuperKey = (x: string[]): boolean => {
      return computeClosure(x, fds).length === attributes.length;
    };

    // Helper: is X a proper subset of any candidate key?
    const isProperSubsetOfAnyKey = (x: string[]): boolean => {
      return cKeys.some(
        (k) => x.every((attr) => k.includes(attr)) && x.length < k.length
      );
    };

    // Test normal forms for each FD
    const fdEvaluations = fds.map((fd) => {
      const lhsStr = fd.lhs.join("");
      const rhsStr = fd.rhs.join("");
      const lhsIsSK = isSuperKey(fd.lhs);
      const isPartial =
        isProperSubsetOfAnyKey(fd.lhs) && fd.rhs.some((r) => !primeSet.has(r));
      const rhsAllPrime = fd.rhs.every((r) => primeSet.has(r));

      // 2NF violation: Partial dependency on non-prime attribute
      const passes2NF = !isPartial;

      // 3NF condition: either LHS is superkey OR RHS is prime attribute
      const passes3NF = lhsIsSK || rhsAllPrime;

      // BCNF condition: LHS must be superkey
      const passesBCNF = lhsIsSK;

      return {
        fdStr: `${lhsStr} → ${rhsStr}`,
        lhsIsSK,
        isPartial,
        rhsAllPrime,
        passes2NF,
        passes3NF,
        passesBCNF,
      };
    });

    let highestNF = "BCNF";
    if (fdEvaluations.some((e) => !e.passesBCNF)) highestNF = "3NF";
    if (fdEvaluations.some((e) => !e.passes3NF)) highestNF = "2NF";
    if (fdEvaluations.some((e) => !e.passes2NF)) highestNF = "1NF";

    return {
      candidateKeys: cKeys,
      primeAttributes: primeList,
      nonPrimeAttributes: nonPrimeList,
      normalFormAnalysis: {
        highestNF,
        fdEvaluations,
      },
    };
  }, [attributes, fds]);

  const toggleClosureAttr = (attr: string) => {
    if (selectedClosureAttrs.includes(attr)) {
      setSelectedClosureAttrs(selectedClosureAttrs.filter((a) => a !== attr));
    } else {
      setSelectedClosureAttrs([...selectedClosureAttrs, attr].sort());
    }
  };

  const loadPreset = (preset: "gate1" | "gate2" | "gate3") => {
    if (preset === "gate1") {
      setAttributes(["A", "B", "C", "D"]);
      setFds([
        { lhs: ["A", "B"], rhs: ["C"] },
        { lhs: ["C"], rhs: ["D"] },
        { lhs: ["D"], rhs: ["A"] },
      ]);
      setSelectedClosureAttrs(["A", "B"]);
    } else if (preset === "gate2") {
      setAttributes(["A", "B", "C", "D"]);
      setFds([
        { lhs: ["A"], rhs: ["B"] },
        { lhs: ["B"], rhs: ["C"] },
        { lhs: ["C"], rhs: ["D"] },
      ]);
      setSelectedClosureAttrs(["A"]);
    } else if (preset === "gate3") {
      setAttributes(["A", "B", "C", "D", "E"]);
      setFds([
        { lhs: ["A", "B"], rhs: ["C", "D"] },
        { lhs: ["D"], rhs: ["E"] },
        { lhs: ["B"], rhs: ["D"] },
      ]);
      setSelectedClosureAttrs(["A", "B"]);
    }
  };

  return (
    <div className="rounded-xl border border-hairline bg-surface-1/80 backdrop-blur-md p-5 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-hairline pb-4">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-accent block">
            Interactive Schema Evaluator
          </span>
          <h3 className="text-base sm:text-lg font-bold text-ink-1">
            {config.title || "Functional Dependency, Candidate Key & Normalization Engine"}
          </h3>
          {config.caption && (
            <p className="text-xs text-ink-3 mt-0.5">{config.caption}</p>
          )}
        </div>

        {/* Highest Normal Form Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-surface-2 border border-hairline text-xs font-mono font-bold text-ink-1 shape-octagon-sm">
          <span>Highest Normal Form:</span>
          <span className="text-accent font-bold px-2 py-0.5 bg-accent/15 border border-accent/30 shape-octagon-sm">
            {normalFormAnalysis.highestNF}
          </span>
        </div>
      </div>

      {/* Preset Scenarios */}
      <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
        <span className="text-ink-3">Standard GATE PYQ Presets:</span>
        <button
          type="button"
          onClick={() => loadPreset("gate1")}
          className="px-2.5 py-1 bg-surface-2 border border-hairline hover:border-hairline-strong text-ink-2 shape-octagon-sm cursor-pointer"
        >
          R(ABCD): AB&rarr;C, C&rarr;D, D&rarr;A (3 Keys)
        </button>
        <button
          type="button"
          onClick={() => loadPreset("gate2")}
          className="px-2.5 py-1 bg-surface-2 border border-hairline hover:border-hairline-strong text-ink-2 shape-octagon-sm cursor-pointer"
        >
          R(ABCD): A&rarr;B, B&rarr;C, C&rarr;D (2NF Only)
        </button>
        <button
          type="button"
          onClick={() => loadPreset("gate3")}
          className="px-2.5 py-1 bg-surface-2 border border-hairline hover:border-hairline-strong text-ink-2 shape-octagon-sm cursor-pointer"
        >
          R(ABCDE): Partial Dependency Trap
        </button>
      </div>

      {/* Active Relation & FDs display */}
      <div className="p-4 rounded-xl border border-hairline bg-surface-0/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono">
        <div>
          <span className="text-ink-3 block text-[11px] mb-1">Relation Schema:</span>
          <span className="text-sm font-bold text-ink-1">
            R({attributes.join(", ")})
          </span>
        </div>

        <div>
          <span className="text-ink-3 block text-[11px] mb-1">Functional Dependencies (F):</span>
          <div className="flex flex-wrap gap-2">
            {fds.map((fd, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded bg-surface-2 border border-hairline font-bold text-accent"
              >
                {fd.lhs.join("")} &rarr; {fd.rhs.join("")}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Live Attribute Closure Calculator */}
      <div className="p-4 rounded-xl border border-hairline bg-surface-2/40 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-ink-2">
              Attribute Closure Calculator (X<sup>+</sup>)
            </h4>
            <p className="text-[11px] text-ink-3">
              Click attributes to compute their transitive functional reach under F:
            </p>
          </div>
          <div className="flex items-center gap-1.5">
            {attributes.map((attr) => {
              const isSelected = selectedClosureAttrs.includes(attr);
              return (
                <button
                  key={attr}
                  type="button"
                  onClick={() => toggleClosureAttr(attr)}
                  className={`w-7 h-7 rounded font-mono font-bold text-xs transition-colors ${
                    isSelected
                      ? "bg-accent text-white"
                      : "bg-surface-0 border border-hairline text-ink-2 hover:border-hairline-strong"
                  }`}
                >
                  {attr}
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-3 rounded-lg border border-hairline bg-surface-0 flex items-center justify-between text-xs font-mono">
          <div>
            <span className="text-ink-3">Closure ({selectedClosureAttrs.join("") || "\u2205"})<sup>+</sup> = </span>
            <span className="font-bold text-accent text-sm ml-1">
              &#123;{userClosure.join(", ") || "\u2205"}&#125;
            </span>
          </div>
          <div>
            {userClosure.length === attributes.length ? (
              <span className="text-emerald-400 font-semibold">
                ● Superkey (Determines All Attributes)
              </span>
            ) : (
              <span className="text-ink-3">
                Determines {userClosure.length} of {attributes.length} attributes
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Candidate Keys & Prime Attribute Classification */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Candidate Keys */}
        <div className="p-4 rounded-xl border border-hairline bg-surface-2/50 space-y-2">
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-ink-2">
            Derived Candidate Keys ({candidateKeys.length})
          </h4>
          <div className="flex flex-wrap gap-2 pt-1">
            {candidateKeys.map((ck, i) => (
              <span
                key={i}
                className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono font-bold text-xs"
              >
                {ck.join("")}
              </span>
            ))}
          </div>
          <p className="text-[11px] text-ink-3 pt-2 leading-relaxed">
            A candidate key is a <em>minimal superkey</em>. Notice that no proper subset of these keys can determine all attributes.
          </p>
        </div>

        {/* Prime vs Non-Prime */}
        <div className="p-4 rounded-xl border border-hairline bg-surface-2/50 space-y-2 text-xs font-mono">
          <h4 className="font-bold uppercase tracking-wider text-ink-2">
            Attribute Taxonomy
          </h4>
          <div className="space-y-1.5 pt-1">
            <div>
              <span className="text-ink-3">Prime Attributes (Part of any key):</span>
              <span className="font-bold text-accent ml-2">
                &#123;{primeAttributes.join(", ") || "None"}&#125;
              </span>
            </div>
            <div>
              <span className="text-ink-3">Non-Prime Attributes:</span>
              <span className="font-bold text-ink-1 ml-2">
                &#123;{nonPrimeAttributes.join(", ") || "None"}&#125;
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Step-by-Step FD Normal Form Inspection */}
      <div className="p-4 rounded-xl border border-hairline bg-surface-0/60 space-y-3">
        <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-ink-2">
          Normal Form Breakdown per Dependency
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono border-collapse">
            <thead>
              <tr className="border-b border-hairline bg-surface-2/60 text-ink-3 uppercase text-[10px]">
                <th className="py-2.5 px-3">FD</th>
                <th className="py-2.5 px-3">LHS is Superkey?</th>
                <th className="py-2.5 px-3">RHS is Prime?</th>
                <th className="py-2.5 px-3">2NF Status</th>
                <th className="py-2.5 px-3">3NF Status</th>
                <th className="py-2.5 px-3">BCNF Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline text-ink-2">
              {normalFormAnalysis.fdEvaluations.map((evalItem, idx) => (
                <tr key={idx}>
                  <td className="py-2.5 px-3 font-bold text-accent">{evalItem.fdStr}</td>
                  <td className="py-2.5 px-3">
                    {evalItem.lhsIsSK ? (
                      <span className="text-emerald-400">Yes</span>
                    ) : (
                      <span className="text-rose-400">No</span>
                    )}
                  </td>
                  <td className="py-2.5 px-3">
                    {evalItem.rhsAllPrime ? (
                      <span className="text-emerald-400">Yes</span>
                    ) : (
                      <span className="text-ink-3">No</span>
                    )}
                  </td>
                  <td className="py-2.5 px-3">
                    {evalItem.passes2NF ? (
                      <span className="text-emerald-400">Pass</span>
                    ) : (
                      <span className="text-rose-400 font-bold">Violates (Partial)</span>
                    )}
                  </td>
                  <td className="py-2.5 px-3">
                    {evalItem.passes3NF ? (
                      <span className="text-emerald-400">Pass</span>
                    ) : (
                      <span className="text-rose-400 font-bold">Violates (Transitive)</span>
                    )}
                  </td>
                  <td className="py-2.5 px-3">
                    {evalItem.passesBCNF ? (
                      <span className="text-emerald-400">Pass</span>
                    ) : (
                      <span className="text-rose-400 font-bold">Violates</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
