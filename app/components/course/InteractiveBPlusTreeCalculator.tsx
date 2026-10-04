"use client";

import React, { useState, useMemo } from "react";
import { BPlusTreeCalculatorConfig } from "../../../lib/courses/types";

export default function InteractiveBPlusTreeCalculator({
  config,
}: {
  config: BPlusTreeCalculatorConfig;
}) {
  const [blockSize, setBlockSize] = useState<number>(config.defaultBlockSize || 512);
  const [keySize, setKeySize] = useState<number>(config.defaultKeySize || 10);
  const [blockPtrSize, setBlockPtrSize] = useState<number>(config.defaultBlockPointerSize || 8);
  const [recordPtrSize, setRecordPtrSize] = useState<number>(config.defaultRecordPointerSize || 8);
  const [recordCount, setRecordCount] = useState<number>(100000);

  // Calculations for B+ Tree orders
  const results = useMemo(() => {
    // Internal node: p * blockPtr + (p - 1) * keySize <= blockSize
    // p * (blockPtr + keySize) - keySize <= blockSize
    // p * (blockPtr + keySize) <= blockSize + keySize
    const internalDenominator = blockPtrSize + keySize;
    const internalOrderP = Math.floor((blockSize + keySize) / internalDenominator);

    // Leaf node: m * (keySize + recordPtrSize) + blockPtrSize <= blockSize
    const leafDenominator = keySize + recordPtrSize;
    const leafOrderM = Math.floor((blockSize - blockPtrSize) / leafDenominator);

    // Min and max keys
    // Root node: min 1 key, max p - 1 keys
    // Internal node: min ceil(p/2) - 1 keys, max p - 1 keys
    // Leaf node: min ceil(m/2) keys, max m keys
    const internalMinKeys = Math.ceil(internalOrderP / 2) - 1;
    const internalMaxKeys = internalOrderP - 1;
    const leafMinKeys = Math.ceil(leafOrderM / 2);
    const leafMaxKeys = leafOrderM;

    // Height calculation:
    // At level 1 (root): 1 node
    // Max records at height h:
    // h=1: m records
    // h=2: (internalOrderP) * leafOrderM records
    // h=3: (internalOrderP)^2 * leafOrderM records
    // General: (internalOrderP)^(h-1) * leafOrderM
    let calculatedHeight = 1;
    if (recordCount > leafOrderM) {
      calculatedHeight =
        Math.ceil(
          Math.log(recordCount / leafOrderM) / Math.log(internalOrderP)
        ) + 1;
    }

    const diskIOAccesses = calculatedHeight + 1; // height index blocks + 1 data block

    return {
      internalOrderP,
      leafOrderM,
      internalMinKeys,
      internalMaxKeys,
      leafMinKeys,
      leafMaxKeys,
      calculatedHeight,
      diskIOAccesses,
    };
  }, [blockSize, keySize, blockPtrSize, recordPtrSize, recordCount]);

  return (
    <div className="rounded-xl border border-hairline bg-surface-1/80 backdrop-blur-md p-5 md:p-6 space-y-6">
      {/* Header */}
      <div className="border-b border-hairline pb-4">
        <span className="text-[10px] font-mono uppercase tracking-wider text-accent block">
          Interactive Index Engineering
        </span>
        <h3 className="text-base sm:text-lg font-bold text-ink-1">
          {config.title || "B+ Tree Order, Capacity & Height Calculator"}
        </h3>
        {config.caption && (
          <p className="text-xs text-ink-3 mt-0.5">{config.caption}</p>
        )}
      </div>

      {/* Input Parameters Controls */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3 rounded-lg border border-hairline bg-surface-2/60">
          <label className="block text-[11px] font-mono text-ink-3 mb-1">
            Disk Block Size
          </label>
          <div className="flex items-center gap-1.5">
            <input
              type="number"
              value={blockSize}
              onChange={(e) => setBlockSize(Math.max(64, Number(e.target.value)))}
              className="w-full bg-surface-0 border border-hairline rounded px-2.5 py-1 text-sm font-mono text-ink-1 focus:border-accent outline-none"
            />
            <span className="text-xs font-mono text-ink-3">B</span>
          </div>
        </div>

        <div className="p-3 rounded-lg border border-hairline bg-surface-2/60">
          <label className="block text-[11px] font-mono text-ink-3 mb-1">
            Search Key Size
          </label>
          <div className="flex items-center gap-1.5">
            <input
              type="number"
              value={keySize}
              onChange={(e) => setKeySize(Math.max(1, Number(e.target.value)))}
              className="w-full bg-surface-0 border border-hairline rounded px-2.5 py-1 text-sm font-mono text-ink-1 focus:border-accent outline-none"
            />
            <span className="text-xs font-mono text-ink-3">B</span>
          </div>
        </div>

        <div className="p-3 rounded-lg border border-hairline bg-surface-2/60">
          <label className="block text-[11px] font-mono text-ink-3 mb-1">
            Block Pointer Size
          </label>
          <div className="flex items-center gap-1.5">
            <input
              type="number"
              value={blockPtrSize}
              onChange={(e) => setBlockPtrSize(Math.max(1, Number(e.target.value)))}
              className="w-full bg-surface-0 border border-hairline rounded px-2.5 py-1 text-sm font-mono text-ink-1 focus:border-accent outline-none"
            />
            <span className="text-xs font-mono text-ink-3">B</span>
          </div>
        </div>

        <div className="p-3 rounded-lg border border-hairline bg-surface-2/60">
          <label className="block text-[11px] font-mono text-ink-3 mb-1">
            Record Pointer Size
          </label>
          <div className="flex items-center gap-1.5">
            <input
              type="number"
              value={recordPtrSize}
              onChange={(e) => setRecordPtrSize(Math.max(1, Number(e.target.value)))}
              className="w-full bg-surface-0 border border-hairline rounded px-2.5 py-1 text-sm font-mono text-ink-1 focus:border-accent outline-none"
            />
            <span className="text-xs font-mono text-ink-3">B</span>
          </div>
        </div>
      </div>

      {/* Preset Buttons */}
      <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
        <span className="text-ink-3">Classic GATE Scenarios:</span>
        <button
          type="button"
          onClick={() => {
            setBlockSize(512);
            setKeySize(10);
            setBlockPtrSize(8);
            setRecordPtrSize(8);
          }}
          className="px-2.5 py-1 rounded bg-surface-2 border border-hairline hover:border-hairline-strong text-ink-2"
        >
          GATE 512B / 10B Key
        </button>
        <button
          type="button"
          onClick={() => {
            setBlockSize(1024);
            setKeySize(14);
            setBlockPtrSize(6);
            setRecordPtrSize(8);
          }}
          className="px-2.5 py-1 rounded bg-surface-2 border border-hairline hover:border-hairline-strong text-ink-2"
        >
          1KB Block / 14B Key
        </button>
        <button
          type="button"
          onClick={() => {
            setBlockSize(4096);
            setKeySize(16);
            setBlockPtrSize(8);
            setRecordPtrSize(12);
          }}
          className="px-2.5 py-1 rounded bg-surface-2 border border-hairline hover:border-hairline-strong text-ink-2"
        >
          Modern 4KB OS Page
        </button>
      </div>

      {/* Result Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Internal Node Order Card */}
        <div className="p-4 rounded-xl border border-hairline bg-surface-0/60 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-accent">
              Internal (Non-Leaf) Node
            </span>
            <span className="text-lg font-mono font-bold text-ink-1">
              Order p = {results.internalOrderP}
            </span>
          </div>

          <div className="text-xs font-mono text-ink-2 space-y-1 bg-surface-1/80 p-3 rounded-lg border border-hairline">
            <p className="text-ink-3">Formula Inequality:</p>
            <p className="text-ink-1">
              p &middot; P<sub>b</sub> + (p &minus; 1) &middot; K &le; B
            </p>
            <p className="text-ink-3 pt-1">With values plugged in:</p>
            <p className="text-ink-1">
              p &middot; {blockPtrSize} + (p &minus; 1) &middot; {keySize} &le; {blockSize}
            </p>
            <p className="text-accent font-semibold pt-1">
              &rArr; p &middot; {blockPtrSize + keySize} &le; {blockSize + keySize} &rArr; p = {results.internalOrderP}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-1">
            <div className="p-2 rounded bg-surface-2/60 border border-hairline text-center">
              <span className="text-ink-3 block text-[10px]">Min Keys (Non-Root)</span>
              <span className="font-bold text-ink-1">&lceil;p/2&rceil; &minus; 1 = {results.internalMinKeys}</span>
            </div>
            <div className="p-2 rounded bg-surface-2/60 border border-hairline text-center">
              <span className="text-ink-3 block text-[10px]">Max Keys</span>
              <span className="font-bold text-ink-1">p &minus; 1 = {results.internalMaxKeys}</span>
            </div>
          </div>
        </div>

        {/* Leaf Node Order Card */}
        <div className="p-4 rounded-xl border border-hairline bg-surface-0/60 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
              Leaf Node (Data Layer)
            </span>
            <span className="text-lg font-mono font-bold text-ink-1">
              Order m = {results.leafOrderM}
            </span>
          </div>

          <div className="text-xs font-mono text-ink-2 space-y-1 bg-surface-1/80 p-3 rounded-lg border border-hairline">
            <p className="text-ink-3">Formula Inequality:</p>
            <p className="text-ink-1">
              m &middot; (K + P<sub>r</sub>) + P<sub>b</sub> &le; B
            </p>
            <p className="text-ink-3 pt-1">With values plugged in:</p>
            <p className="text-ink-1">
              m &middot; ({keySize} + {recordPtrSize}) + {blockPtrSize} &le; {blockSize}
            </p>
            <p className="text-emerald-400 font-semibold pt-1">
              &rArr; m &middot; {keySize + recordPtrSize} &le; {blockSize - blockPtrSize} &rArr; m = {results.leafOrderM}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-1">
            <div className="p-2 rounded bg-surface-2/60 border border-hairline text-center">
              <span className="text-ink-3 block text-[10px]">Min Records / Leaf</span>
              <span className="font-bold text-ink-1">&lceil;m/2&rceil; = {results.leafMinKeys}</span>
            </div>
            <div className="p-2 rounded bg-surface-2/60 border border-hairline text-center">
              <span className="text-ink-3 block text-[10px]">Max Records / Leaf</span>
              <span className="font-bold text-ink-1">m = {results.leafMaxKeys}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Database Sizing & Query IO Simulator */}
      <div className="p-4 rounded-xl border border-hairline bg-surface-2/40 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-ink-2">
            Multi-level Index Search Performance for Table
          </h4>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-ink-3">Table Records:</span>
            <input
              type="number"
              value={recordCount}
              onChange={(e) => setRecordCount(Math.max(1, Number(e.target.value)))}
              className="w-28 bg-surface-0 border border-hairline rounded px-2 py-0.5 text-xs font-mono text-ink-1 focus:border-accent outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center text-xs font-mono">
          <div className="p-3 rounded-lg border border-hairline bg-surface-1">
            <span className="text-ink-3 block text-[11px] mb-1">Tree Height (Index Levels)</span>
            <span className="text-xl font-bold text-accent">{results.calculatedHeight}</span>
            <span className="text-[10px] text-ink-3 block mt-0.5">Levels to search</span>
          </div>

          <div className="p-3 rounded-lg border border-hairline bg-surface-1">
            <span className="text-ink-3 block text-[11px] mb-1">Disk Block I/O Cost</span>
            <span className="text-xl font-bold text-emerald-400">{results.diskIOAccesses} I/Os</span>
            <span className="text-[10px] text-ink-3 block mt-0.5">
              {results.calculatedHeight} Index + 1 Record fetch
            </span>
          </div>

          <div className="p-3 rounded-lg border border-hairline bg-surface-1">
            <span className="text-ink-3 block text-[11px] mb-1">Max Leaf Level Blocks</span>
            <span className="text-xl font-bold text-ink-1">
              {Math.ceil(recordCount / results.leafMaxKeys)}
            </span>
            <span className="text-[10px] text-ink-3 block mt-0.5">Linked sequential blocks</span>
          </div>
        </div>
      </div>
    </div>
  );
}
