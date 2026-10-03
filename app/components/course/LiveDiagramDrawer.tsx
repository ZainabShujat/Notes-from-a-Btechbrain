"use client";

import React, { useState, useEffect, useRef } from "react";

export type DiagramPresetKey =
  | "os-process-lifecycle"
  | "os-dual-mode"
  | "dbms-three-schema"
  | "dbms-b-plus-tree"
  | "dbms-transaction-states"
  | "cn-tcp-handshake"
  | "coa-pipeline-hazards"
  | "toc-dfa-state"
  | "c-pointer-memory";

interface DiagramStep {
  stepNumber: number;
  title: string;
  drawSummary: string;
  examInstructions: string;
  marksRubric: string;
  examTip: string;
  commonTrap: string;
  /** SVG element IDs or layer identifiers drawn up to this step */
  activeLayers: string[];
  /** Highlights the newly added element in this step */
  highlightId?: string;
  penPosition?: { x: number; y: number };
}

interface DiagramDefinition {
  title: string;
  subject: string;
  examContext: string;
  totalMarks: string;
  viewBox: string;
  steps: DiagramStep[];
  renderSvg: (currentStep: number, isPlaying: boolean) => React.ReactNode;
}

export const DIAGRAM_DEFINITIONS: Record<DiagramPresetKey, DiagramDefinition> = {
  // ── 01. OS: 7-STATE PROCESS LIFECYCLE ──────────────────────────────────────
  "os-process-lifecycle": {
    title: "7-State Process Lifecycle with Swapper",
    subject: "Operating Systems",
    examContext: "Appears in 85% of University End-Term OS Papers & GATE CS",
    totalMarks: "10 Marks (Theory + Diagram)",
    viewBox: "0 0 680 400",
    steps: [
      {
        stepNumber: 1,
        title: "Step 1: Draw the RAM vs Disk Memory Boundaries",
        drawSummary: "Draw two horizontal dotted partition boxes: Upper box is Main Memory (RAM), lower box is Secondary Storage (Swap Space).",
        examInstructions: "Professors first look for the clear spatial division between RAM (active execution) and Swap Disk (suspended states). Label both clearly.",
        marksRubric: "2 Marks: Boundary demarcation & memory labels.",
        examTip: "Always use dotted lines for memory boundaries and solid lines for state boxes.",
        commonTrap: "Placing Ready-Suspend inside RAM. Ready-Suspend means PCB is in RAM but memory pages are on DISK.",
        activeLayers: ["boundary-ram", "boundary-disk", "labels-memory"],
        highlightId: "labels-memory",
        penPosition: { x: 340, y: 35 },
      },
      {
        stepNumber: 2,
        title: "Step 2: Draw the 3 Primary CPU States & Dispatch",
        drawSummary: "Draw Ready, Running, and Terminated states in RAM with Admit, Dispatch, and Exit arrows.",
        examInstructions: "Draw Ready (left) -> Running (middle) -> Terminated (right). Label the transition from Ready to Running as 'Dispatch' (Short-Term Scheduler).",
        marksRubric: "2.5 Marks: Core CPU execution pipeline.",
        examTip: "Running state must only hold ONE process at a time on a single CPU core.",
        commonTrap: "Forgetting the Long-Term Scheduler (Job Scheduler) arrow entering Ready from NEW.",
        activeLayers: ["boundary-ram", "boundary-disk", "labels-memory", "state-new", "state-ready", "state-running", "state-terminated", "arrows-primary"],
        highlightId: "state-running",
        penPosition: { x: 340, y: 90 },
      },
      {
        stepNumber: 3,
        title: "Step 3: Add Time Quantum Preemption & Blocked State",
        drawSummary: "Add the preemption reverse arc (Running -> Ready) and the Blocked/Wait state for I/O.",
        examInstructions: "Draw arrow from Running back to Ready with label 'Time Slice Expired / Preempted'. Then draw Blocked below Ready/Running with 'I/O or Event Wait'.",
        marksRubric: "2.5 Marks: Round-robin preemption loop & blocking.",
        examTip: "Notice that when I/O completes, Blocked goes to READY, NEVER directly back to Running!",
        commonTrap: "CRITICAL PENALTY: Drawing Blocked -> Running directly. The CPU dispatcher only picks processes from the Ready queue!",
        activeLayers: ["boundary-ram", "boundary-disk", "labels-memory", "state-new", "state-ready", "state-running", "state-terminated", "arrows-primary", "arrow-preempt", "state-blocked", "arrows-blocked"],
        highlightId: "arrow-preempt",
        penPosition: { x: 340, y: 155 },
      },
      {
        stepNumber: 4,
        title: "Step 4: Add Secondary Storage Suspend States",
        drawSummary: "In the lower Disk box, draw Ready-Suspend and Blocked-Suspend states with swapping transitions.",
        examInstructions: "Draw arrows pointing downwards for 'Suspend' (Swapped Out) and upwards for 'Resume / Activate' (Swapped In). Controlled by Medium-Term Scheduler.",
        marksRubric: "2 Marks: Medium-Term Swapper architecture.",
        examTip: "Blocked-Suspend can transition to Ready-Suspend while on disk when its I/O finishes without loading into RAM!",
        commonTrap: "Missing the horizontal arrow from Blocked-Suspend to Ready-Suspend on disk.",
        activeLayers: ["boundary-ram", "boundary-disk", "labels-memory", "state-new", "state-ready", "state-running", "state-terminated", "arrows-primary", "arrow-preempt", "state-blocked", "arrows-blocked", "state-ready-suspend", "state-blocked-suspend", "arrows-suspend", "arrow-disk-transition"],
        highlightId: "state-ready-suspend",
        penPosition: { x: 200, y: 310 },
      },
      {
        stepNumber: 5,
        title: "Step 5: Label the Schedulers (LTS, MTS, STS)",
        drawSummary: "Annotate the 3 OS schedulers: Long-Term (Admit), Short-Term (Dispatch), and Medium-Term (Swapper).",
        examInstructions: "Write handwritten annotations showing time scales: STS (milliseconds), MTS (seconds), LTS (minutes/batches). This secures full 10/10 marks.",
        marksRubric: "1 Mark: Complete scheduler role annotations.",
        examTip: "STS = CPU Scheduler (high frequency). MTS = Swapper (reduces degree of multiprogramming). LTS = Job Scheduler (controls degree of multiprogramming).",
        commonTrap: "Confusing LTS and MTS responsibilities.",
        activeLayers: ["boundary-ram", "boundary-disk", "labels-memory", "state-new", "state-ready", "state-running", "state-terminated", "arrows-primary", "arrow-preempt", "state-blocked", "arrows-blocked", "state-ready-suspend", "state-blocked-suspend", "arrows-suspend", "arrow-disk-transition", "annotations-schedulers"],
        highlightId: "annotations-schedulers",
        penPosition: { x: 520, y: 190 },
      },
    ],
    renderSvg: (currentStep: number, isPlaying: boolean) => {
      const show = (step: number) => currentStep >= step;
      return (
        <svg viewBox="0 0 680 400" className="w-full h-auto text-ink-1 font-mono text-xs select-none">
          <defs>
            <marker id="arrow-exam" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 0 L 8 4 L 0 8 z" fill="currentColor" />
            </marker>
            <marker id="arrow-acc-live" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 0 L 8 4 L 0 8 z" fill="var(--color-accent, #9333ea)" />
            </marker>
            <marker id="arrow-amber-live" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 0 L 8 4 L 0 8 z" fill="#d97706" />
            </marker>
          </defs>

          {/* STEP 1: MEMORY BOUNDARIES */}
          {show(1) && (
            <g className="transition-opacity duration-500 ease-out">
              <rect x="20" y="20" width="640" height="215" rx="8" fill="var(--color-surface-1, #fcfaf5)" fillOpacity="0.5" stroke="currentColor" strokeOpacity="0.25" strokeDasharray="5 5" strokeWidth="1.5" />
              <text x="35" y="42" fill="var(--color-accent, #9333ea)" fontWeight="bold" fontSize="11" letterSpacing="1">
                MAIN MEMORY (RAM) · ACTIVE EXECUTION BOUNDARY
              </text>
              <rect x="20" y="250" width="640" height="130" rx="8" fill="var(--color-surface-2, #27272a)" fillOpacity="0.08" stroke="currentColor" strokeOpacity="0.25" strokeDasharray="5 5" strokeWidth="1.5" />
              <text x="35" y="272" fill="#d97706" fontWeight="bold" fontSize="11" letterSpacing="1">
                SECONDARY STORAGE (SWAP DISK) · SUSPENDED STATE BOUNDARY
              </text>
            </g>
          )}

          {/* STEP 2: PRIMARY CPU STATES */}
          {show(2) && (
            <g className="transition-all duration-500">
              {/* NEW */}
              <rect x="35" y="70" width="65" height="38" rx="6" fill="var(--color-surface-2, #27272a)" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5" />
              <text x="67" y="93" fill="currentColor" fontWeight="bold" textAnchor="middle" fontSize="11">NEW</text>

              {/* Arrow NEW -> READY */}
              <path d="M100 89 L145 89" stroke="currentColor" strokeWidth="1.5" markerEnd="url(#arrow-exam)" />
              <text x="122" y="80" fill="currentColor" opacity="0.8" fontSize="9" textAnchor="middle">Admit</text>

              {/* READY */}
              <rect x="150" y="70" width="85" height="38" rx="6" fill="var(--color-accent, #9333ea)" fillOpacity="0.15" stroke="var(--color-accent, #9333ea)" strokeWidth="2" />
              <text x="192" y="93" fill="var(--color-accent, #9333ea)" fontWeight="bold" textAnchor="middle" fontSize="12">READY</text>

              {/* Arrow READY -> RUNNING (Dispatch) */}
              <path d="M235 84 L335 84" stroke="var(--color-emerald, #10b981)" strokeWidth="2" markerEnd="url(#arrow-exam)" />
              <text x="285" y="76" fill="var(--color-emerald, #10b981)" fontWeight="bold" fontSize="9" textAnchor="middle">Dispatch (STS)</text>

              {/* RUNNING */}
              <rect x="340" y="70" width="95" height="38" rx="6" fill="var(--color-emerald, #10b981)" fillOpacity="0.18" stroke="var(--color-emerald, #10b981)" strokeWidth="2" />
              <text x="387" y="93" fill="var(--color-emerald, #10b981)" fontWeight="bold" textAnchor="middle" fontSize="12">RUNNING</text>

              {/* Arrow RUNNING -> TERMINATED */}
              <path d="M435 89 L520 89" stroke="currentColor" strokeWidth="1.5" markerEnd="url(#arrow-exam)" />
              <text x="477" y="80" fill="currentColor" opacity="0.8" fontSize="9" textAnchor="middle">Exit</text>

              {/* TERMINATED */}
              <rect x="525" y="70" width="95" height="38" rx="6" fill="#ef4444" fillOpacity="0.15" stroke="#ef4444" strokeWidth="2" />
              <text x="572" y="93" fill="#ef4444" fontWeight="bold" textAnchor="middle" fontSize="11">TERMINATED</text>
            </g>
          )}

          {/* STEP 3: PREEMPTION & BLOCKED */}
          {show(3) && (
            <g className="transition-all duration-500">
              {/* Preemption arc: RUNNING -> READY */}
              <path d="M360 70 C360 40, 210 40, 210 70" stroke="#f59e0b" strokeWidth="1.8" fill="none" markerEnd="url(#arrow-amber-live)" />
              <text x="285" y="42" fill="#d97706" fontWeight="bold" fontSize="9" textAnchor="middle">Time Quantum Expired / Preempted</text>

              {/* BLOCKED State */}
              <rect x="250" y="150" width="95" height="38" rx="6" fill="#d97706" fillOpacity="0.15" stroke="#d97706" strokeWidth="2" />
              <text x="297" y="173" fill="#d97706" fontWeight="bold" textAnchor="middle" fontSize="11">BLOCKED</text>

              {/* RUNNING -> BLOCKED */}
              <path d="M375 108 L325 150" stroke="currentColor" strokeWidth="1.5" markerEnd="url(#arrow-exam)" />
              <text x="368" y="138" fill="currentColor" opacity="0.8" fontSize="9">I/O Wait</text>

              {/* BLOCKED -> READY */}
              <path d="M265 150 L205 108" stroke="var(--color-accent, #9333ea)" strokeWidth="1.8" markerEnd="url(#arrow-acc-live)" />
              <text x="215" y="142" fill="var(--color-accent, #9333ea)" fontWeight="bold" fontSize="9">I/O Complete</text>
            </g>
          )}

          {/* STEP 4: SUSPENDED STATES ON DISK */}
          {show(4) && (
            <g className="transition-all duration-500">
              {/* READY SUSPEND */}
              <rect x="135" y="295" width="125" height="42" rx="6" fill="var(--color-accent, #9333ea)" fillOpacity="0.12" stroke="var(--color-accent, #9333ea)" strokeDasharray="4 2" strokeWidth="1.8" />
              <text x="197" y="316" fill="var(--color-accent, #9333ea)" fontWeight="bold" textAnchor="middle" fontSize="10">READY-SUSPEND</text>
              <text x="197" y="329" fill="currentColor" opacity="0.65" textAnchor="middle" fontSize="8">(On Swap Disk)</text>

              {/* BLOCKED SUSPEND */}
              <rect x="325" y="295" width="135" height="42" rx="6" fill="#d97706" fillOpacity="0.12" stroke="#d97706" strokeDasharray="4 2" strokeWidth="1.8" />
              <text x="392" y="316" fill="#d97706" fontWeight="bold" textAnchor="middle" fontSize="10">BLOCKED-SUSPEND</text>
              <text x="392" y="329" fill="currentColor" opacity="0.65" textAnchor="middle" fontSize="8">(On Swap Disk)</text>

              {/* Swap Out: READY -> READY-SUSPEND */}
              <path d="M175 108 L175 295" stroke="currentColor" strokeWidth="1.4" markerEnd="url(#arrow-exam)" />
              <text x="145" y="200" fill="currentColor" opacity="0.85" fontSize="8">Suspend</text>

              {/* Swap In: READY-SUSPEND -> READY */}
              <path d="M210 295 L210 108" stroke="var(--color-accent, #9333ea)" strokeWidth="1.5" markerEnd="url(#arrow-acc-live)" />
              <text x="215" y="200" fill="var(--color-accent, #9333ea)" fontWeight="bold" fontSize="8">Activate</text>

              {/* Swap Out: BLOCKED -> BLOCKED-SUSPEND */}
              <path d="M310 188 L355 295" stroke="currentColor" strokeWidth="1.4" markerEnd="url(#arrow-exam)" />
              <text x="345" y="235" fill="currentColor" opacity="0.85" fontSize="8">Suspend</text>

              {/* On-Disk Transition: BLOCKED-SUSPEND -> READY-SUSPEND */}
              <path d="M325 316 L260 316" stroke="#10b981" strokeWidth="1.6" markerEnd="url(#arrow-exam)" />
              <text x="292" y="308" fill="#10b981" fontWeight="bold" fontSize="8" textAnchor="middle">I/O Done on Disk</text>
            </g>
          )}

          {/* STEP 5: SCHEDULER ANNOTATIONS */}
          {show(5) && (
            <g className="transition-all duration-500 font-handwriting text-accent">
              <rect x="470" y="145" width="180" height="75" rx="6" fill="var(--color-surface-1, #fcfaf5)" stroke="var(--color-accent, #9333ea)" strokeWidth="1" strokeDasharray="3 3" />
              <text x="480" y="165" fill="var(--color-accent, #9333ea)" fontWeight="bold" fontSize="12">✎ Schedulers Cheat Key:</text>
              <text x="480" y="182" fill="currentColor" fontSize="11">1. STS: Ready → Running (ms)</text>
              <text x="480" y="197" fill="currentColor" fontSize="11">2. MTS: Swap In/Out (sec)</text>
              <text x="480" y="212" fill="currentColor" fontSize="11">3. LTS: Job → Ready (batches)</text>
            </g>
          )}
        </svg>
      );
    },
  },

  // ── 02. OS: DUAL-MODE KERNEL TRAP ─────────────────────────────────────────
  "os-dual-mode": {
    title: "Dual-Mode Execution & System Call Trap Architecture",
    subject: "Operating Systems",
    examContext: "Crucial 5/10-Mark Question in Unit 1 Hardware Protection",
    totalMarks: "8 Marks",
    viewBox: "0 0 600 360",
    steps: [
      {
        stepNumber: 1,
        title: "Step 1: Divide User Space vs Kernel Space",
        drawSummary: "Draw two large zones: User Mode (Mode Bit = 1) at the top, Kernel Mode (Mode Bit = 0) at the bottom.",
        examInstructions: "Professors check for the physical Mode Bit in the Processor Status Register (PSR). Unprivileged vs Privileged instructions.",
        marksRubric: "2 Marks: Architectural boundary & Mode Bit states.",
        examTip: "Always write 'Mode Bit = 1' and 'Mode Bit = 0' right beside the header.",
        commonTrap: "Believing user programs can toggle the mode bit directly. Only hardware trap or interrupt can switch 1 -> 0.",
        activeLayers: ["layer-spaces", "layer-modebits"],
        highlightId: "layer-modebits",
      },
      {
        stepNumber: 2,
        title: "Step 2: User Process Invokes System Call",
        drawSummary: "Draw the user application calling read() or open(), loading syscall number into register (e.g. EAX = 3).",
        examInstructions: "Explain that standard C library functions (glibc wrappers) place arguments into registers and execute a software trap instruction.",
        marksRubric: "2 Marks: System call initiation & parameter passing.",
        examTip: "Examples of trap instructions: INT 0x80 (x86 32-bit), SYSCALL (x86-64), SVC (ARM).",
        commonTrap: "Saying system calls are direct C function calls into kernel memory. They are hardware interrupts!",
        activeLayers: ["layer-spaces", "layer-modebits", "layer-userapp", "layer-trapinst"],
        highlightId: "layer-trapinst",
      },
      {
        stepNumber: 3,
        title: "Step 3: Hardware Trap & Mode Switch (1 → 0)",
        drawSummary: "Draw downward trap arrow: Hardware flips mode bit (1 -> 0), switches to kernel stack, and looks up IVT.",
        examInstructions: "Draw downward arrow crossing the privilege boundary. Hardware automatically saves PC and PSR to kernel stack.",
        marksRubric: "2 Marks: Hardware-enforced privilege transition & stack switch.",
        examTip: "Interrupt Vector Table (IVT) contains addresses of kernel Service Routines (ISRs).",
        commonTrap: "Thinking the kernel trust user stack pointers. The hardware switches to a dedicated kernel stack.",
        activeLayers: ["layer-spaces", "layer-modebits", "layer-userapp", "layer-trapinst", "layer-trapaction", "layer-ivt"],
        highlightId: "layer-trapaction",
      },
      {
        stepNumber: 4,
        title: "Step 4: Kernel Executes Privileged Handler & Returns (IRET)",
        drawSummary: "Draw Syscall Service Routine accessing hardware, then upward sysret arrow restoring Mode Bit (0 -> 1).",
        examInstructions: "Draw upward arrow with 'sysret / iret'. Hardware restores user PC and flips Mode Bit back to 1. User application resumes.",
        marksRubric: "2 Marks: Kernel service completion & safe return.",
        examTip: "Mode switch preserves complete isolation; if service routine fails, it returns an error code (errno = -1).",
        commonTrap: "Omitting the return path (sysret/iret). Without return, the process hangs in kernel mode forever.",
        activeLayers: ["layer-spaces", "layer-modebits", "layer-userapp", "layer-trapinst", "layer-trapaction", "layer-ivt", "layer-isr", "layer-return"],
        highlightId: "layer-return",
      },
    ],
    renderSvg: (currentStep: number) => {
      const show = (step: number) => currentStep >= step;
      return (
        <svg viewBox="0 0 600 360" className="w-full h-auto text-ink-1 font-mono text-xs select-none">
          <defs>
            <marker id="arrow-dm" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 0 L 8 4 L 0 8 z" fill="currentColor" />
            </marker>
            <marker id="arrow-trap" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 0 L 8 4 L 0 8 z" fill="#f59e0b" />
            </marker>
            <marker id="arrow-ret" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 0 L 8 4 L 0 8 z" fill="#10b981" />
            </marker>
          </defs>

          {/* STEP 1: USER VS KERNEL SPACES */}
          {show(1) && (
            <g className="transition-all duration-500">
              <rect x="25" y="25" width="550" height="120" rx="8" fill="var(--color-surface-1, #fcfaf5)" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.5" />
              <text x="45" y="50" fill="currentColor" fontWeight="bold" fontSize="12">USER SPACE (User Mode)</text>
              <rect x="420" y="35" width="135" height="24" rx="4" fill="currentColor" fillOpacity="0.1" />
              <text x="487" y="51" fill="currentColor" fontWeight="bold" textAnchor="middle" fontSize="11">Mode Bit = 1</text>
              <text x="45" y="70" fill="currentColor" opacity="0.65" fontSize="10">Unprivileged Execution: Standard memory, no direct hardware access</text>

              <rect x="25" y="195" width="550" height="140" rx="8" fill="var(--color-accent, #9333ea)" fillOpacity="0.08" stroke="var(--color-accent, #9333ea)" strokeWidth="1.8" />
              <text x="45" y="220" fill="var(--color-accent, #9333ea)" fontWeight="bold" fontSize="12">KERNEL SPACE (Kernel Mode / Ring 0)</text>
              <rect x="420" y="205" width="135" height="24" rx="4" fill="var(--color-accent, #9333ea)" fillOpacity="0.2" />
              <text x="487" y="221" fill="var(--color-accent, #9333ea)" fontWeight="bold" textAnchor="middle" fontSize="11">Mode Bit = 0</text>
              <text x="45" y="240" fill="currentColor" opacity="0.65" fontSize="10">Privileged Execution: Raw MMU, Device Controllers, Page Tables</text>
            </g>
          )}

          {/* STEP 2: USER PROCESS SYSCALL */}
          {show(2) && (
            <g className="transition-all duration-500">
              <rect x="45" y="85" width="220" height="42" rx="6" fill="var(--color-surface-2, #27272a)" fillOpacity="0.25" stroke="currentColor" strokeWidth="1.2" />
              <text x="55" y="103" fill="currentColor" fontWeight="bold" fontSize="11">User Process (e.g. read(fd, buf))</text>
              <text x="55" y="118" fill="currentColor" opacity="0.75" fontSize="9">Mov EAX, 3; INT 0x80 / SYSCALL</text>
            </g>
          )}

          {/* STEP 3: TRAP & SWITCH */}
          {show(3) && (
            <g className="transition-all duration-500">
              <path d="M150 127 L150 250" stroke="#f59e0b" strokeWidth="2.5" markerEnd="url(#arrow-trap)" />
              <rect x="160" y="145" width="180" height="38" rx="4" fill="#fef3c7" dark-fill="#78350f" stroke="#f59e0b" strokeWidth="1" />
              <text x="168" y="160" fill="#92400e" fontWeight="bold" fontSize="10">⚡ HARDWARE TRAP</text>
              <text x="168" y="174" fill="#92400e" fontSize="9">1. Flips Mode Bit (1 → 0)</text>
              <text x="168" y="185" fill="#92400e" fontSize="9">2. Switches to Kernel Stack</text>

              {/* IVT Lookup */}
              <rect x="45" y="255" width="200" height="60" rx="6" fill="var(--color-surface-2, #27272a)" fillOpacity="0.3" stroke="currentColor" strokeWidth="1.2" />
              <text x="55" y="275" fill="var(--color-accent, #9333ea)" fontWeight="bold" fontSize="11">Interrupt Vector Table (IVT)</text>
              <text x="55" y="292" fill="currentColor" opacity="0.8" fontSize="9">Trap Handler index [0x80]</text>
              <text x="55" y="305" fill="currentColor" opacity="0.6" fontSize="9">Points to sys_call_table[3]</text>
            </g>
          )}

          {/* STEP 4: KERNEL ISR & RETURN */}
          {show(4) && (
            <g className="transition-all duration-500">
              {/* Syscall Handler Execution */}
              <rect x="300" y="255" width="230" height="60" rx="6" fill="var(--color-accent, #9333ea)" fillOpacity="0.2" stroke="var(--color-accent, #9333ea)" strokeWidth="1.5" />
              <text x="312" y="275" fill="var(--color-accent, #9333ea)" fontWeight="bold" fontSize="11">Execute sys_read() Handler</text>
              <text x="312" y="292" fill="currentColor" opacity="0.8" fontSize="9">Access Disk Controller &amp; DMA</text>
              <text x="312" y="305" fill="currentColor" opacity="0.6" fontSize="9">Copy data to user memory buffer</text>

              {/* Return path: sysret / iret */}
              <path d="M420 255 L420 127" stroke="#10b981" strokeWidth="2.5" markerEnd="url(#arrow-ret)" />
              <rect x="430" y="145" width="135" height="38" rx="4" fill="#d1fae5" stroke="#10b981" strokeWidth="1" />
              <text x="438" y="160" fill="#065f46" fontWeight="bold" fontSize="10">✓ IRET / SYSRET</text>
              <text x="438" y="174" fill="#065f46" fontSize="9">Restores Mode Bit (0 → 1)</text>
              <text x="438" y="185" fill="#065f46" fontSize="9">Resumes User Code</text>
            </g>
          )}
        </svg>
      );
    },
  },

  // ── 03. DBMS: ANSI-SPARC 3-SCHEMA ARCHITECTURE ────────────────────────────
  "dbms-three-schema": {
    title: "ANSI-SPARC 3-Schema Architecture & Data Independence",
    subject: "Database Management Systems",
    examContext: "Guaranteed 10-Mark Question in Unit 1 of every DBMS Exam",
    totalMarks: "10 Marks",
    viewBox: "0 0 640 420",
    steps: [
      {
        stepNumber: 1,
        title: "Step 1: Draw External Level (User Views)",
        drawSummary: "Draw multiple top-level boxes: View 1 (Accounts), View 2 (Registrar), View N (Student Portal).",
        examInstructions: "Professors check that you draw multiple external views tailored to different user roles, not just a single box.",
        marksRubric: "2 Marks: External Level schema & user perspective.",
        examTip: "Each external view describes only the part of the database relevant to a specific user group.",
        commonTrap: "Drawing only one external box. The whole point of external level is multiple customized views!",
        activeLayers: ["layer-external"],
        highlightId: "layer-external",
      },
      {
        stepNumber: 2,
        title: "Step 2: Draw the Global Conceptual Schema",
        drawSummary: "Draw the single central Conceptual Level box representing logical database entities, relationships & constraints.",
        examInstructions: "Emphasize that there is ONLY ONE conceptual schema for the entire organization (ER model / relational tables).",
        marksRubric: "2.5 Marks: Conceptual Schema representation.",
        examTip: "Conceptual level hides physical storage details (B+ trees, byte offsets) but describes ALL entities and constraints.",
        commonTrap: "Confusing conceptual level with physical tables on disk.",
        activeLayers: ["layer-external", "layer-conceptual"],
        highlightId: "layer-conceptual",
      },
      {
        stepNumber: 3,
        title: "Step 3: Draw Internal Level & Physical Storage",
        drawSummary: "Draw Internal Schema (B+ tree indexes, hashing, block allocation) and the physical database on disk.",
        examInstructions: "Internal level describes HOW data is physically stored on disk: record formats, compression, encryption, access paths.",
        marksRubric: "2.5 Marks: Internal Schema & disk layout.",
        examTip: "Internal level = byte-level access paths; Physical level = raw magnetic/SSD storage blocks.",
        commonTrap: "Forgetting to draw the disk platter icon at the bottom.",
        activeLayers: ["layer-external", "layer-conceptual", "layer-internal", "layer-disk"],
        highlightId: "layer-internal",
      },
      {
        stepNumber: 4,
        title: "Step 4: Label Logical & Physical Data Independence",
        drawSummary: "Draw bidirectional mapping arrows between levels and annotate Logical vs Physical Data Independence.",
        examInstructions: "Upper mapping = Logical Data Independence (changing conceptual schema does NOT break external views). Lower mapping = Physical Data Independence (changing index/storage does NOT break conceptual schema).",
        marksRubric: "3 Marks: Mappings & definition of the two types of independence.",
        examTip: "Logical Data Independence is MUCH HARDER to achieve than Physical Data Independence!",
        commonTrap: "Swapping Logical and Physical data independence arrows. Upper is Logical, Lower is Physical!",
        activeLayers: ["layer-external", "layer-conceptual", "layer-internal", "layer-disk", "layer-mappings", "layer-independence"],
        highlightId: "layer-independence",
      },
    ],
    renderSvg: (currentStep: number) => {
      const show = (step: number) => currentStep >= step;
      return (
        <svg viewBox="0 0 640 420" className="w-full h-auto text-ink-1 font-mono text-xs select-none">
          <defs>
            <marker id="arrow-bi" viewBox="0 0 8 8" refX="4" refY="4" markerWidth="5" markerHeight="5" orient="auto">
              <path d="M 0 4 L 4 0 L 8 4 L 4 8 z" fill="var(--color-accent, #9333ea)" />
            </marker>
          </defs>

          {/* STEP 1: EXTERNAL VIEWS */}
          {show(1) && (
            <g className="transition-all duration-500">
              <rect x="25" y="20" width="590" height="75" rx="8" fill="var(--color-surface-1, #fcfaf5)" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1.2" />
              <text x="40" y="40" fill="var(--color-accent, #9333ea)" fontWeight="bold" fontSize="12">1. EXTERNAL LEVEL (User Views &amp; Subschemas)</text>
              <rect x="40" y="50" width="135" height="32" rx="4" fill="var(--color-accent, #9333ea)" fillOpacity="0.15" stroke="var(--color-accent, #9333ea)" strokeWidth="1" />
              <text x="107" y="70" fill="currentColor" textAnchor="middle" fontSize="10">View 1: Student App</text>
              <rect x="195" y="50" width="145" height="32" rx="4" fill="var(--color-accent, #9333ea)" fillOpacity="0.15" stroke="var(--color-accent, #9333ea)" strokeWidth="1" />
              <text x="267" y="70" fill="currentColor" textAnchor="middle" fontSize="10">View 2: Faculty Portal</text>
              <rect x="360" y="50" width="145" height="32" rx="4" fill="var(--color-accent, #9333ea)" fillOpacity="0.15" stroke="var(--color-accent, #9333ea)" strokeWidth="1" />
              <text x="432" y="70" fill="currentColor" textAnchor="middle" fontSize="10">View N: Finance / HR</text>
            </g>
          )}

          {/* STEP 2: CONCEPTUAL SCHEMA */}
          {show(2) && (
            <g className="transition-all duration-500">
              <rect x="25" y="145" width="590" height="70" rx="8" fill="var(--color-emerald, #10b981)" fillOpacity="0.1" stroke="var(--color-emerald, #10b981)" strokeWidth="1.8" />
              <text x="40" y="168" fill="var(--color-emerald, #10b981)" fontWeight="bold" fontSize="12">2. CONCEPTUAL LEVEL (Global Logical Schema)</text>
              <text x="40" y="188" fill="currentColor" opacity="0.8" fontSize="10">Entities, Relationships, Integrity Constraints (PK, FK, CHECK)</text>
              <text x="40" y="202" fill="currentColor" opacity="0.6" fontSize="9">e.g. Student(id, name, dept_id), Course(code, title, credits), Enroll(id, code, grade)</text>
            </g>
          )}

          {/* STEP 3: INTERNAL LEVEL & DISK */}
          {show(3) && (
            <g className="transition-all duration-500">
              <rect x="25" y="265" width="590" height="65" rx="8" fill="#d97706" fillOpacity="0.1" stroke="#d97706" strokeWidth="1.8" />
              <text x="40" y="288" fill="#d97706" fontWeight="bold" fontSize="12">3. INTERNAL LEVEL (Physical Schema &amp; Access Paths)</text>
              <text x="40" y="306" fill="currentColor" opacity="0.8" fontSize="10">Record Formats, B+ Tree Clustered Indexes, Hash Buckets, Page Sizes (8KB)</text>
              <text x="40" y="320" fill="currentColor" opacity="0.6" fontSize="9">Data compression algorithms, encryption keys, free space maps</text>

              {/* Physical Storage */}
              <rect x="180" y="360" width="280" height="38" rx="6" fill="var(--color-surface-2, #27272a)" fillOpacity="0.3" stroke="currentColor" strokeWidth="1.5" />
              <text x="320" y="383" fill="currentColor" fontWeight="bold" textAnchor="middle" fontSize="11">💾 PHYSICAL DATABASE ON DISK</text>
            </g>
          )}

          {/* STEP 4: DATA INDEPENDENCE MAPPINGS */}
          {show(4) && (
            <g className="transition-all duration-500">
              {/* Mapping 1: Logical Data Independence */}
              <line x1="100" y1="95" x2="100" y2="145" stroke="var(--color-accent, #9333ea)" strokeWidth="2" strokeDasharray="3 3" />
              <line x1="260" y1="95" x2="260" y2="145" stroke="var(--color-accent, #9333ea)" strokeWidth="2" strokeDasharray="3 3" />
              <rect x="340" y="103" width="265" height="32" rx="4" fill="#fef08a" stroke="#ca8a04" strokeWidth="1" />
              <text x="350" y="118" fill="#854d0e" fontWeight="bold" fontSize="10">LOGICAL DATA INDEPENDENCE</text>
              <text x="350" y="129" fill="#854d0e" fontSize="8.5">Modify conceptual schema without breaking user views</text>

              {/* Mapping 2: Physical Data Independence */}
              <line x1="180" y1="215" x2="180" y2="265" stroke="#d97706" strokeWidth="2" strokeDasharray="3 3" />
              <rect x="340" y="223" width="265" height="32" rx="4" fill="#fed7aa" stroke="#ea580c" strokeWidth="1" />
              <text x="350" y="238" fill="#9a3412" fontWeight="bold" fontSize="10">PHYSICAL DATA INDEPENDENCE</text>
              <text x="350" y="249" fill="#9a3412" fontSize="8.5">Reorganize indexes/storage without altering conceptual schema</text>

              {/* Disk connection */}
              <line x1="320" y1="330" x2="320" y2="360" stroke="currentColor" strokeWidth="2" strokeDasharray="2 2" />
            </g>
          )}
        </svg>
      );
    },
  },

  // ── 04. DBMS: B+ TREE NODE SPLIT ──────────────────────────────────────────
  "dbms-b-plus-tree": {
    title: "B+ Tree Node Insertion & Splitting Algorithm",
    subject: "Database Management Systems",
    examContext: "Standard 8-Mark Numerical / Step-by-Step Drawing Problem",
    totalMarks: "8 Marks",
    viewBox: "0 0 640 380",
    steps: [
      {
        stepNumber: 1,
        title: "Step 1: Leaf Node Reaches Maximum Capacity",
        drawSummary: "Draw an order-4 leaf node currently filled with 3 keys: [10, 20, 30].",
        examInstructions: "For a B+ tree of order M=4, a leaf node can hold at most M-1 = 3 keys. Draw the 3 key cells and record pointers.",
        marksRubric: "2 Marks: Node capacity calculation & initial structure.",
        examTip: "Order M means at most M pointers and M-1 keys.",
        commonTrap: "Allowing 4 keys in an order-4 node without splitting.",
        activeLayers: ["bpt-leaf-initial"],
        highlightId: "bpt-leaf-initial",
      },
      {
        stepNumber: 2,
        title: "Step 2: New Key 25 Arrives (Temporary Overflow)",
        drawSummary: "Show temporary insertion of key 25 into sorted position: [10, 20, 25, 30]. Node overflows!",
        examInstructions: "Draw the overflowed node with a red dashed border showing 4 keys (exceeds M-1=3 limit).",
        marksRubric: "2 Marks: Overflow condition detection.",
        examTip: "Always insert keys in sorted order BEFORE determining the split point.",
        commonTrap: "Splitting before inserting the new key.",
        activeLayers: ["bpt-leaf-initial", "bpt-overflow"],
        highlightId: "bpt-overflow",
      },
      {
        stepNumber: 3,
        title: "Step 3: Split Node into Left & Right Siblings",
        drawSummary: "Split into Left Leaf [10, 20] and Right Leaf [25, 30]. Link right sibling with leaf pointer.",
        examInstructions: "In a B+ Tree, leaf nodes form a doubly/singly linked list for range queries. Draw the horizontal sibling pointer!",
        marksRubric: "2 Marks: Correct key partitioning & leaf linking.",
        examTip: "Left leaf gets ⌈(M-1)/2⌉ keys, right leaf gets remaining.",
        commonTrap: "Forgetting the sibling pointer between leaves. That's a B-tree, NOT a B+ tree!",
        activeLayers: ["bpt-leaf-initial", "bpt-overflow", "bpt-split-leaves"],
        highlightId: "bpt-split-leaves",
      },
      {
        stepNumber: 4,
        title: "Step 4: Push Copy of Smallest Right Key Up to Parent",
        drawSummary: "Push key 25 up to parent index node with pointers to left and right children.",
        examInstructions: "CRITICAL B+ TREE RULE: In B+ Trees, the key 25 is COPIED up to the parent (it REMAINS in the right leaf!). In standard B-Trees it moves up exclusively.",
        marksRubric: "2 Marks: Key promotion rule & parent pointer routing.",
        examTip: "Professor looks specifically for key 25 present in BOTH parent and right leaf!",
        commonTrap: "Deleting 25 from the leaf when promoting it. In B+ trees, all data records live in leaves!",
        activeLayers: ["bpt-leaf-initial", "bpt-overflow", "bpt-split-leaves", "bpt-parent-promoted"],
        highlightId: "bpt-parent-promoted",
      },
    ],
    renderSvg: (currentStep: number) => {
      const show = (step: number) => currentStep >= step;
      return (
        <svg viewBox="0 0 640 380" className="w-full h-auto text-ink-1 font-mono text-xs select-none">
          <defs>
            <marker id="arrow-bpt" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 0 L 8 4 L 0 8 z" fill="currentColor" />
            </marker>
          </defs>

          {/* STEP 1: INITIAL FULL LEAF */}
          {show(1) && !show(3) && (
            <g className="transition-all duration-500">
              <text x="40" y="40" fill="currentColor" fontWeight="bold" fontSize="12">Order M = 4 (Max keys = M-1 = 3)</text>
              <rect x="180" y="60" width="240" height="48" rx="6" fill="var(--color-surface-1, #fcfaf5)" stroke="currentColor" strokeWidth="1.5" />
              <text x="220" y="90" fill="currentColor" fontWeight="bold" fontSize="14" textAnchor="middle">10</text>
              <line x1="260" y1="60" x2="260" y2="108" stroke="currentColor" opacity="0.3" />
              <text x="300" y="90" fill="currentColor" fontWeight="bold" fontSize="14" textAnchor="middle">20</text>
              <line x1="340" y1="60" x2="340" y2="108" stroke="currentColor" opacity="0.3" />
              <text x="380" y="90" fill="currentColor" fontWeight="bold" fontSize="14" textAnchor="middle">30</text>
              <text x="300" y="130" fill="currentColor" opacity="0.7" textAnchor="middle" fontSize="10">Node is Full (3 keys). Next insert causes split.</text>
            </g>
          )}

          {/* STEP 2: OVERFLOW */}
          {show(2) && !show(3) && (
            <g className="transition-all duration-500">
              <rect x="150" y="160" width="320" height="52" rx="6" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 2" />
              <text x="190" y="192" fill="currentColor" fontWeight="bold" fontSize="14" textAnchor="middle">10</text>
              <line x1="230" y1="160" x2="230" y2="212" stroke="currentColor" opacity="0.3" />
              <text x="270" y="192" fill="currentColor" fontWeight="bold" fontSize="14" textAnchor="middle">20</text>
              <line x1="310" y1="160" x2="310" y2="212" stroke="currentColor" opacity="0.3" />
              <text x="350" y="192" fill="#ef4444" fontWeight="bold" fontSize="15" textAnchor="middle">25 ★</text>
              <line x1="390" y1="160" x2="390" y2="212" stroke="currentColor" opacity="0.3" />
              <text x="430" y="192" fill="currentColor" fontWeight="bold" fontSize="14" textAnchor="middle">30</text>
              <text x="310" y="235" fill="#b91c1c" fontWeight="bold" textAnchor="middle" fontSize="11">⚠️ OVERFLOW: 4 keys &gt; 3. Must split at index ⌈4/2⌉ = 2!</text>
            </g>
          )}

          {/* STEP 3 & 4: SPLIT LEAVES & PARENT PROMOTION */}
          {show(3) && (
            <g className="transition-all duration-500">
              <text x="320" y="30" fill="var(--color-accent, #9333ea)" fontWeight="bold" textAnchor="middle" fontSize="12">
                AFTER SPLIT: Balanced B+ Tree Subtree
              </text>

              {/* PARENT NODE */}
              {show(4) && (
                <g>
                  <rect x="260" y="55" width="120" height="42" rx="6" fill="var(--color-accent, #9333ea)" fillOpacity="0.15" stroke="var(--color-accent, #9333ea)" strokeWidth="2" />
                  <text x="320" y="82" fill="var(--color-accent, #9333ea)" fontWeight="bold" fontSize="16" textAnchor="middle">25</text>
                  <text x="320" y="45" fill="var(--color-accent, #9333ea)" fontSize="9" textAnchor="middle" className="font-handwriting">✎ key 25 copied up</text>

                  {/* Left child pointer */}
                  <path d="M280 97 L175 160" stroke="currentColor" strokeWidth="1.8" markerEnd="url(#arrow-bpt)" />
                  {/* Right child pointer */}
                  <path d="M360 97 L465 160" stroke="currentColor" strokeWidth="1.8" markerEnd="url(#arrow-bpt)" />
                </g>
              )}

              {/* LEFT LEAF */}
              <rect x="90" y="160" width="180" height="45" rx="6" fill="var(--color-surface-1, #fcfaf5)" stroke="currentColor" strokeWidth="1.8" />
              <text x="135" y="188" fill="currentColor" fontWeight="bold" fontSize="14" textAnchor="middle">10</text>
              <line x1="180" y1="160" x2="180" y2="205" stroke="currentColor" opacity="0.3" />
              <text x="225" y="188" fill="currentColor" fontWeight="bold" fontSize="14" textAnchor="middle">20</text>

              {/* SIBLING POINTER */}
              <path d="M270 182 L380 182" stroke="#10b981" strokeWidth="2.5" markerEnd="url(#arrow-bpt)" />
              <text x="325" y="174" fill="#10b981" fontWeight="bold" fontSize="9" textAnchor="middle">Sibling Link</text>

              {/* RIGHT LEAF */}
              <rect x="385" y="160" width="180" height="45" rx="6" fill="var(--color-surface-1, #fcfaf5)" stroke="currentColor" strokeWidth="1.8" />
              <text x="430" y="188" fill="var(--color-accent, #9333ea)" fontWeight="bold" fontSize="14" textAnchor="middle">25</text>
              <line x1="475" y1="160" x2="475" y2="205" stroke="currentColor" opacity="0.3" />
              <text x="520" y="188" fill="currentColor" fontWeight="bold" fontSize="14" textAnchor="middle">30</text>

              {/* Exam Scoring Annotation */}
              <rect x="90" y="240" width="475" height="75" rx="6" fill="var(--color-surface-2, #27272a)" fillOpacity="0.08" stroke="currentColor" strokeOpacity="0.2" />
              <text x="110" y="262" fill="var(--color-accent, #9333ea)" fontWeight="bold" fontSize="11">✎ University Exam Marks Key:</text>
              <text x="110" y="280" fill="currentColor" opacity="0.85" fontSize="10">1. Notice that 25 is present in BOTH parent index and right leaf node!</text>
              <text x="110" y="296" fill="currentColor" opacity="0.85" fontSize="10">2. All actual record pointers reside exclusively at leaf level.</text>
              <text x="110" y="310" fill="#10b981" fontWeight="bold" fontSize="9.5">3. Leaf linked list allows O(log n + k) range queries: SELECT * WHERE age BETWEEN 10 AND 30.</text>
            </g>
          )}
        </svg>
      );
    },
  },

  // ── 05. CN: TCP 3-WAY HANDSHAKE ───────────────────────────────────────────
  "cn-tcp-handshake": {
    title: "TCP 3-Way Handshake & Connection Teardown",
    subject: "Computer Networks",
    examContext: "Compulsory Question in Transport Layer Module",
    totalMarks: "10 Marks",
    viewBox: "0 0 640 420",
    steps: [
      {
        stepNumber: 1,
        title: "Step 1: Draw Client & Server Timelines and Initial States",
        drawSummary: "Draw vertical timeline axes for Client (left) and Server (right). Server starts in LISTEN state, Client in CLOSED.",
        examInstructions: "Draw time pointing downwards. Clearly write the initial socket states: Client = CLOSED, Server = LISTEN.",
        marksRubric: "2 Marks: Timeline geometry and initial socket states.",
        examTip: "Server socket executes socket() -> bind() -> listen() before accepting any incoming connections.",
        commonTrap: "Assuming client starts in LISTEN. Client is active initiator, Server is passive listener.",
        activeLayers: ["tcp-axes", "tcp-states-init"],
        highlightId: "tcp-states-init",
      },
      {
        stepNumber: 2,
        title: "Step 2: Packet 1 - SYN from Client to Server",
        drawSummary: "Draw diagonal arrow from Client to Server: SYN=1, Seq = x. Client state -> SYN_SENT.",
        examInstructions: "Client sends initial sequence number (ISN = x). SYN flag consumes 1 sequence number.",
        marksRubric: "2.5 Marks: SYN packet parameters & sequence number definition.",
        examTip: "Sequence numbers are randomized (RFC 6528) to prevent blind sequence guessing attacks.",
        commonTrap: "Setting Ack number in Packet 1. In pure SYN, the ACK bit is 0, so Ack number is meaningless.",
        activeLayers: ["tcp-axes", "tcp-states-init", "tcp-syn"],
        highlightId: "tcp-syn",
      },
      {
        stepNumber: 3,
        title: "Step 3: Packet 2 - SYN + ACK from Server to Client",
        drawSummary: "Server responds: SYN=1, ACK=1, Seq = y, Ack = x + 1. Server state -> SYN_RCVD.",
        examInstructions: "Server chooses its own ISN (y) and acknowledges client's sequence (Ack = x + 1).",
        marksRubric: "2.5 Marks: Piggybacked SYN-ACK & acknowledgement formula.",
        examTip: "Ack = x + 1 means 'I have received up to x, I am expecting byte x+1 next'.",
        commonTrap: "Writing Ack = x instead of x + 1. The SYN flag counts as 1 logical byte of sequence space.",
        activeLayers: ["tcp-axes", "tcp-states-init", "tcp-syn", "tcp-synack"],
        highlightId: "tcp-synack",
      },
      {
        stepNumber: 4,
        title: "Step 4: Packet 3 - ACK from Client & ESTABLISHED State",
        drawSummary: "Client sends ACK=1, Seq = x + 1, Ack = y + 1. Both sides enter ESTABLISHED state!",
        examInstructions: "Connection is now full-duplex ESTABLISHED. Data transfer can begin immediately with this packet.",
        marksRubric: "3 Marks: Completion of handshake & bidirectional readiness.",
        examTip: "Why 3-way instead of 2-way? To prevent delayed/duplicate obsolete SYN segments from establishing half-open connections!",
        commonTrap: "Failing to explain why 2-way handshake fails in unreliable networks.",
        activeLayers: ["tcp-axes", "tcp-states-init", "tcp-syn", "tcp-synack", "tcp-ack-final"],
        highlightId: "tcp-ack-final",
      },
    ],
    renderSvg: (currentStep: number) => {
      const show = (step: number) => currentStep >= step;
      return (
        <svg viewBox="0 0 640 420" className="w-full h-auto text-ink-1 font-mono text-xs select-none">
          <defs>
            <marker id="arrow-tcp" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 0 L 8 4 L 0 8 z" fill="currentColor" />
            </marker>
          </defs>

          {/* STEP 1: CLIENT & SERVER AXES */}
          {show(1) && (
            <g className="transition-all duration-500">
              {/* Client Column */}
              <line x1="120" y1="40" x2="120" y2="380" stroke="currentColor" strokeWidth="2" />
              <rect x="60" y="15" width="120" height="28" rx="4" fill="var(--color-surface-1, #fcfaf5)" stroke="currentColor" strokeWidth="1.5" />
              <text x="120" y="33" fill="currentColor" fontWeight="bold" textAnchor="middle" fontSize="12">CLIENT (Host A)</text>

              {/* Server Column */}
              <line x1="520" y1="40" x2="520" y2="380" stroke="currentColor" strokeWidth="2" />
              <rect x="460" y="15" width="120" height="28" rx="4" fill="var(--color-surface-1, #fcfaf5)" stroke="currentColor" strokeWidth="1.5" />
              <text x="520" y="33" fill="currentColor" fontWeight="bold" textAnchor="middle" fontSize="12">SERVER (Host B)</text>

              {/* Initial States */}
              <text x="110" y="65" fill="currentColor" opacity="0.6" textAnchor="end" fontSize="10">CLOSED</text>
              <rect x="528" y="52" width="70" height="20" rx="3" fill="var(--color-accent, #9333ea)" fillOpacity="0.15" />
              <text x="563" y="66" fill="var(--color-accent, #9333ea)" fontWeight="bold" textAnchor="middle" fontSize="10">LISTEN</text>
            </g>
          )}

          {/* STEP 2: PACKET 1 (SYN) */}
          {show(2) && (
            <g className="transition-all duration-500">
              <path d="M120 100 L515 155" stroke="var(--color-accent, #9333ea)" strokeWidth="2" markerEnd="url(#arrow-tcp)" />
              <rect x="220" y="100" width="200" height="28" rx="4" fill="var(--color-surface-1, #fcfaf5)" stroke="var(--color-accent, #9333ea)" strokeWidth="1" />
              <text x="320" y="118" fill="var(--color-accent, #9333ea)" fontWeight="bold" textAnchor="middle" fontSize="11">
                1. SYN=1, Seq = x
              </text>
              {/* Client state changes */}
              <rect x="25" y="95" width="85" height="20" rx="3" fill="#f59e0b" fillOpacity="0.15" />
              <text x="67" y="109" fill="#d97706" fontWeight="bold" textAnchor="middle" fontSize="9.5">SYN_SENT</text>
            </g>
          )}

          {/* STEP 3: PACKET 2 (SYN + ACK) */}
          {show(3) && (
            <g className="transition-all duration-500">
              <path d="M520 175 L125 230" stroke="#d97706" strokeWidth="2" markerEnd="url(#arrow-tcp)" />
              <rect x="200" y="175" width="240" height="28" rx="4" fill="var(--color-surface-1, #fcfaf5)" stroke="#d97706" strokeWidth="1" />
              <text x="320" y="193" fill="#d97706" fontWeight="bold" textAnchor="middle" fontSize="11">
                2. SYN=1, ACK=1, Seq = y, Ack = x + 1
              </text>
              {/* Server state changes */}
              <rect x="528" y="165" width="80" height="20" rx="3" fill="#f59e0b" fillOpacity="0.15" />
              <text x="568" y="179" fill="#d97706" fontWeight="bold" textAnchor="middle" fontSize="9.5">SYN_RCVD</text>
            </g>
          )}

          {/* STEP 4: PACKET 3 (ACK) & ESTABLISHED */}
          {show(4) && (
            <g className="transition-all duration-500">
              <path d="M120 250 L515 305" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrow-tcp)" />
              <rect x="210" y="250" width="220" height="28" rx="4" fill="var(--color-surface-1, #fcfaf5)" stroke="#10b981" strokeWidth="1" />
              <text x="320" y="268" fill="#10b981" fontWeight="bold" textAnchor="middle" fontSize="11">
                3. ACK=1, Seq = x + 1, Ack = y + 1
              </text>

              {/* Both become ESTABLISHED */}
              <rect x="15" y="275" width="95" height="24" rx="4" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="1.2" />
              <text x="62" y="291" fill="#10b981" fontWeight="bold" textAnchor="middle" fontSize="10">ESTABLISHED</text>

              <rect x="528" y="315" width="95" height="24" rx="4" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="1.2" />
              <text x="575" y="331" fill="#10b981" fontWeight="bold" textAnchor="middle" fontSize="10">ESTABLISHED</text>

              {/* Exam Scoring Annotation */}
              <rect x="135" y="340" width="370" height="60" rx="6" fill="var(--color-surface-2, #27272a)" fillOpacity="0.08" stroke="currentColor" strokeOpacity="0.2" />
              <text x="145" y="360" fill="var(--color-accent, #9333ea)" fontWeight="bold" fontSize="11">✎ Why 3 Steps? (Exam Scoring Question):</text>
              <text x="145" y="377" fill="currentColor" opacity="0.8" fontSize="9.5">Prevents delayed duplicate SYN packets from tying up server resources.</text>
              <text x="145" y="391" fill="currentColor" opacity="0.8" fontSize="9.5">Both peers verify bidirectional sequence synchronization before data flows.</text>
            </g>
          )}
        </svg>
      );
    },
  },

  // ── 06. COA: 5-STAGE PIPELINE HAZARD ──────────────────────────────────────
  "coa-pipeline-hazards": {
    title: "5-Stage MIPS Pipeline & Data Forwarding Bypass",
    subject: "Computer Organization & Architecture",
    examContext: "Pipelining & Hazards Problem (Always in GATE & University Exam)",
    totalMarks: "10 Marks",
    viewBox: "0 0 640 380",
    steps: [
      {
        stepNumber: 1,
        title: "Step 1: Draw the 5 Pipeline Stages",
        drawSummary: "Draw the standard 5 stages: IF (Instruction Fetch), ID (Instruction Decode / Register Read), EX (Execute / ALU), MEM (Memory Access), WB (Write Back).",
        examInstructions: "Every instruction in a classic RISC processor takes 5 clock cycles through these 5 physical hardware stages.",
        marksRubric: "2 Marks: Stage definitions & sequencing.",
        examTip: "Registers are written in WB and read in ID.",
        commonTrap: "Mixing the order of MEM and WB.",
        activeLayers: ["pipe-stages"],
        highlightId: "pipe-stages",
      },
      {
        stepNumber: 2,
        title: "Step 2: Trace RAW (Read After Write) Data Hazard",
        drawSummary: "Show I1: ADD R1, R2, R3 (writes to R1 in cycle 5 WB) followed by I2: SUB R4, R1, R5 (needs R1 in cycle 3 ID).",
        examInstructions: "RAW Dependency: I2 attempts to read R1 before I1 has committed the newly calculated value to the register file!",
        marksRubric: "3 Marks: Register dependency identification.",
        examTip: "Without forwarding or stalls, I2 would read the OLD, stale value of R1!",
        commonTrap: "Confusing RAW (true dependency) with WAR or WAW (name dependencies).",
        activeLayers: ["pipe-stages", "pipe-raw-dependency"],
        highlightId: "pipe-raw-dependency",
      },
      {
        stepNumber: 3,
        title: "Step 3: Solution A - Pipeline Stall (Bubbles)",
        drawSummary: "Show 2 bubble cycles inserted in hardware, delaying I2 execution until cycle 5.",
        examInstructions: "Hardware detects hazard and injects NOP (bubble) instructions, holding PC and IF/ID pipeline registers.",
        marksRubric: "2.5 Marks: Bubble insertion mechanics & CPI penalty.",
        examTip: "Stalls reduce processor throughput and increase CPI above ideal CPI = 1.",
        commonTrap: "Inserting 3 bubbles instead of 2.",
        activeLayers: ["pipe-stages", "pipe-raw-dependency", "pipe-stall"],
        highlightId: "pipe-stall",
      },
      {
        stepNumber: 4,
        title: "Step 4: Solution B - Operand Forwarding (Bypass Wire)",
        drawSummary: "Draw the forwarding bypass multiplexer wire directly from EX/MEM or MEM/WB register into ALU input.",
        examInstructions: "Draw the bypass wire from the ALU output of I1 directly into the ALU input of I2, ELIMINATING the stall completely!",
        marksRubric: "2.5 Marks: Hardware forwarding bypass path.",
        examTip: "Forwarding works for ALU-to-ALU dependencies with 0 stalls! (Load-Use data hazard still needs 1 stall).",
        commonTrap: "Claiming forwarding eliminates all stalls. A Load followed by immediate ALU use still requires 1 stall!",
        activeLayers: ["pipe-stages", "pipe-raw-dependency", "pipe-stall", "pipe-forwarding"],
        highlightId: "pipe-forwarding",
      },
    ],
    renderSvg: (currentStep: number) => {
      const show = (step: number) => currentStep >= step;
      return (
        <svg viewBox="0 0 640 380" className="w-full h-auto text-ink-1 font-mono text-xs select-none">
          <defs>
            <marker id="arrow-coa" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 0 L 8 4 L 0 8 z" fill="currentColor" />
            </marker>
          </defs>

          {/* STEP 1: 5 STAGES */}
          {show(1) && (
            <g className="transition-all duration-500">
              <text x="35" y="30" fill="currentColor" fontWeight="bold" fontSize="12">5-Stage MIPS Pipeline Pipeline Stages:</text>
              {["IF (Fetch)", "ID (Decode/Reg)", "EX (ALU)", "MEM (RAM)", "WB (Write)"].map((st, i) => (
                <g key={i}>
                  <rect x={35 + i * 115} y="45" width="105" height="38" rx="6" fill="var(--color-surface-1, #fcfaf5)" stroke="currentColor" strokeWidth="1.5" />
                  <text x={87 + i * 115} y="68" fill="var(--color-accent, #9333ea)" fontWeight="bold" textAnchor="middle" fontSize="10">{st}</text>
                </g>
              ))}
            </g>
          )}

          {/* STEP 2: RAW HAZARD */}
          {show(2) && (
            <g className="transition-all duration-500">
              <text x="35" y="115" fill="#ef4444" fontWeight="bold" fontSize="11">Data Hazard (RAW): I1 writes R1 in Cycle 5; I2 reads R1 in Cycle 3!</text>
              {/* I1 */}
              <text x="35" y="145" fill="currentColor" fontWeight="bold" fontSize="11">I1: ADD R1, R2, R3</text>
              {["IF", "ID", "EX", "MEM", "WB (Writes R1)"].map((s, i) => (
                <rect key={i} x={180 + i * 85} y="130" width="80" height="24" rx="3" fill="var(--color-emerald, #10b981)" fillOpacity="0.2" stroke="var(--color-emerald, #10b981)" strokeWidth="1" />
              ))}

              {/* I2 without forwarding */}
              <text x="35" y="185" fill="currentColor" fontWeight="bold" fontSize="11">I2: SUB R4, R1, R5</text>
              {["IF", "ID (Needs R1!)"].map((s, i) => (
                <rect key={i} x={265 + i * 85} y="170" width="80" height="24" rx="3" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.2" />
              ))}
              <text x="390" y="185" fill="#ef4444" fontSize="9">← STALE READ!</text>
            </g>
          )}

          {/* STEP 3 & 4: FORWARDING BYPASS */}
          {show(4) ? (
            <g className="transition-all duration-500">
              <rect x="35" y="215" width="570" height="145" rx="6" fill="var(--color-surface-1, #fcfaf5)" stroke="#10b981" strokeWidth="2" />
              <text x="50" y="238" fill="#10b981" fontWeight="bold" fontSize="12">✓ SOLUTION: ALU OPERAND FORWARDING (0 STALL CYCLES)</text>
              <text x="50" y="258" fill="currentColor" opacity="0.8" fontSize="10">
                The result of ADD R1 is already computed at end of cycle 3 (EX stage output register).
              </text>
              <text x="50" y="274" fill="currentColor" opacity="0.8" fontSize="10">
                A dedicated bypass bus routes EX/MEM pipeline register directly into ALU input for I2!
              </text>

              {/* Forwarding Wire Graphic */}
              <path d="M385 154 C385 190, 420 190, 420 170" stroke="#10b981" strokeWidth="3" fill="none" markerEnd="url(#arrow-coa)" />
              <text x="440" y="200" fill="#10b981" fontWeight="bold" fontSize="11 font-handwriting">⚡ Direct Forwarding Bypass Path</text>

              <text x="50" y="310" fill="var(--color-accent, #9333ea)" fontWeight="bold" fontSize="11">✎ Exam Formula:</text>
              <text x="50" y="328" fill="currentColor" opacity="0.8" fontSize="10">
                Speedup = (Clock Cycle without Hazard) / (Clock Cycle with Hazard) · Ideal CPI = 1.0
              </text>
              <text x="50" y="344" fill="#d97706" fontSize="9.5 font-bold">
                * Note: Load-to-Use hazard cannot be bypassed in cycle 3 (requires 1 bubble stall).
              </text>
            </g>
          ) : show(3) ? (
            <g className="transition-all duration-500">
              <rect x="35" y="215" width="570" height="130" rx="6" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
              <text x="50" y="238" fill="#d97706" fontWeight="bold" fontSize="12">SOLUTION A: HARDWARE STALL (BUBBLE INSERTION)</text>
              <text x="50" y="258" fill="#92400e" fontSize="10">
                Hardware inserts 2 NOP (bubble) cycles, freezing I2 until I1 completes Write Back in cycle 5.
              </text>
              <text x="50" y="280" fill="#92400e" fontSize="10">
                Result: Clock cycles wasted = 2 bubbles. CPI increases from 1.0 to 1.4.
              </text>
              <text x="50" y="310" fill="currentColor" opacity="0.75" fontSize="9 font-mono">
                [Cycle 1: IF] → [Cycle 2: ID] → [Cycle 3: STALL] → [Cycle 4: STALL] → [Cycle 5: EX]
              </text>
            </g>
          ) : null}
        </svg>
      );
    },
  },

  // ── 07. TOC: DFA STATE TRANSITION DIAGRAM ─────────────────────────────────
  "toc-dfa-state": {
    title: "DFA Construction: Strings Ending in '01' over {0, 1}",
    subject: "Theory of Computation",
    examContext: "Core 8-Mark University Exam Automata Construction Problem",
    totalMarks: "8 Marks",
    viewBox: "0 0 600 360",
    steps: [
      {
        stepNumber: 1,
        title: "Step 1: Define States & Initial State q0",
        drawSummary: "Draw start state q0 with incoming unlabelled start arrow. Represents 'no suffix matched'.",
        examInstructions: "State definition: q0 = start state (empty / not ending in 0 or 01). Mark start arrow clearly.",
        marksRubric: "2 Marks: Initial state definition & naming.",
        examTip: "Every DFA must have EXACTLY one start state.",
        commonTrap: "Forgetting the incoming start arrow with no origin.",
        activeLayers: ["dfa-q0"],
        highlightId: "dfa-q0",
      },
      {
        stepNumber: 2,
        title: "Step 2: Read '0' to reach state q1 (Streak of 0)",
        drawSummary: "Draw state q1. Transition q0 --0--> q1. Self-loop on q0 with 1.",
        examInstructions: "State q1 means: the string currently ends in '0'. If a 1 arrives in q0, we stay in q0.",
        marksRubric: "2 Marks: First forward transition & self-loop.",
        examTip: "Self-loop on q0 with input 1 means multiple leading 1's keep us searching for the first 0.",
        commonTrap: "Creating unnecessary extra states.",
        activeLayers: ["dfa-q0", "dfa-q1"],
        highlightId: "dfa-q1",
      },
      {
        stepNumber: 3,
        title: "Step 3: Read '1' from q1 to reach Accept State q2 ('01')",
        drawSummary: "Draw double-circle Accept State q2. Transition q1 --1--> q2. Self-loop on q1 with 0.",
        examInstructions: "State q2 means: string ends in '01'. Draw DOUBLE CIRCLE. If another 0 arrives in q1, self-loop (streak of 0s).",
        marksRubric: "2 Marks: Final accepting state with double concentric circle.",
        examTip: "Double circle is MANDATORY in university exams for final states.",
        commonTrap: "Drawing single circle for accept state loses 2 marks immediately.",
        activeLayers: ["dfa-q0", "dfa-q1", "dfa-q2"],
        highlightId: "dfa-q2",
      },
      {
        stepNumber: 4,
        title: "Step 4: Complete Transitions for All Symbols (DFA Completeness)",
        drawSummary: "From q2, on '0' transition back to q1; on '1' transition back to q0.",
        examInstructions: "Every DFA must have a transition for EVERY input symbol {0, 1} from EVERY state (Total Transition Function).",
        marksRubric: "2 Marks: Completeness & 5-tuple formal definition.",
        examTip: "Formal 5-tuple: M = (Q, Σ, δ, q0, F). Q={q0, q1, q2}, Σ={0, 1}, F={q2}.",
        commonTrap: "Leaving states incomplete (missing transitions turns the diagram into an NFA!).",
        activeLayers: ["dfa-q0", "dfa-q1", "dfa-q2", "dfa-complete"],
        highlightId: "dfa-complete",
      },
    ],
    renderSvg: (currentStep: number) => {
      const show = (step: number) => currentStep >= step;
      return (
        <svg viewBox="0 0 600 360" className="w-full h-auto text-ink-1 font-mono text-xs select-none">
          <defs>
            <marker id="arrow-toc" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 0 L 8 4 L 0 8 z" fill="currentColor" />
            </marker>
          </defs>

          {/* STEP 1: q0 */}
          {show(1) && (
            <g className="transition-all duration-500">
              <path d="M40 180 L80 180" stroke="currentColor" strokeWidth="2" markerEnd="url(#arrow-toc)" />
              <text x="50" y="170" fill="currentColor" fontSize="10">Start</text>
              <circle cx="115" cy="180" r="32" fill="var(--color-surface-1, #fcfaf5)" stroke="currentColor" strokeWidth="2" />
              <text x="115" y="185" fill="currentColor" fontWeight="bold" textAnchor="middle" fontSize="16">q0</text>
              <text x="115" y="228" fill="currentColor" opacity="0.65" textAnchor="middle" fontSize="9">Empty / Not '0'</text>

              {/* Self loop on q0 with 1 */}
              <path d="M100 152 C90 115, 140 115, 130 152" stroke="currentColor" strokeWidth="1.5" fill="none" markerEnd="url(#arrow-toc)" />
              <text x="115" y="118" fill="currentColor" fontWeight="bold" textAnchor="middle" fontSize="12">1</text>
            </g>
          )}

          {/* STEP 2: q1 */}
          {show(2) && (
            <g className="transition-all duration-500">
              <path d="M147 180 L258 180" stroke="currentColor" strokeWidth="2" markerEnd="url(#arrow-toc)" />
              <text x="202" y="170" fill="var(--color-accent, #9333ea)" fontWeight="bold" textAnchor="middle" fontSize="13">0</text>

              <circle cx="290" cy="180" r="32" fill="var(--color-surface-1, #fcfaf5)" stroke="var(--color-accent, #9333ea)" strokeWidth="2" />
              <text x="290" y="185" fill="var(--color-accent, #9333ea)" fontWeight="bold" textAnchor="middle" fontSize="16">q1</text>
              <text x="290" y="228" fill="currentColor" opacity="0.65" textAnchor="middle" fontSize="9">Ends in '0'</text>

              {/* Self loop on q1 with 0 */}
              <path d="M275 152 C265 115, 315 115, 305 152" stroke="currentColor" strokeWidth="1.5" fill="none" markerEnd="url(#arrow-toc)" />
              <text x="290" y="118" fill="currentColor" fontWeight="bold" textAnchor="middle" fontSize="12">0</text>
            </g>
          )}

          {/* STEP 3: q2 (Accept State) */}
          {show(3) && (
            <g className="transition-all duration-500">
              <path d="M322 180 L433 180" stroke="currentColor" strokeWidth="2" markerEnd="url(#arrow-toc)" />
              <text x="377" y="170" fill="var(--color-emerald, #10b981)" fontWeight="bold" textAnchor="middle" fontSize="13">1</text>

              {/* Double circle for final state */}
              <circle cx="465" cy="180" r="34" fill="var(--color-emerald, #10b981)" fillOpacity="0.12" stroke="var(--color-emerald, #10b981)" strokeWidth="2" />
              <circle cx="465" cy="180" r="28" fill="none" stroke="var(--color-emerald, #10b981)" strokeWidth="1.8" />
              <text x="465" y="185" fill="var(--color-emerald, #10b981)" fontWeight="bold" textAnchor="middle" fontSize="16">q2</text>
              <text x="465" y="232" fill="var(--color-emerald, #10b981)" fontWeight="bold" textAnchor="middle" fontSize="9.5">ACCEPT: Ends in '01'</text>
            </g>
          )}

          {/* STEP 4: COMPLETENESS TRANSITIONS */}
          {show(4) && (
            <g className="transition-all duration-500">
              {/* q2 -> q1 on '0' */}
              <path d="M440 205 C380 270, 320 250, 300 213" stroke="#f59e0b" strokeWidth="1.8" fill="none" markerEnd="url(#arrow-toc)" />
              <text x="375" y="270" fill="#d97706" fontWeight="bold" fontSize="12">0 (becomes suffix '0')</text>

              {/* q2 -> q0 on '1' */}
              <path d="M465 145 C465 50, 115 50, 115 145" stroke="#ef4444" strokeWidth="1.8" fill="none" markerEnd="url(#arrow-toc)" />
              <text x="290" y="42" fill="#ef4444" fontWeight="bold" textAnchor="middle" fontSize="12">1 (reset: suffix is '1')</text>

              {/* Exam Scoring Annotation */}
              <rect x="50" y="290" width="500" height="55" rx="6" fill="var(--color-surface-2, #27272a)" fillOpacity="0.08" stroke="currentColor" strokeOpacity="0.2" />
              <text x="65" y="312" fill="var(--color-accent, #9333ea)" fontWeight="bold" fontSize="11">✎ University Exam Formal Definition Checklist:</text>
              <text x="65" y="330" fill="currentColor" opacity="0.85" fontSize="10">
                States Q = &#123;q0, q1, q2&#125;, Alphabet Σ = &#123;0, 1&#125;, Start State = q0, Final States F = &#123;q2&#125;
              </text>
            </g>
          )}
        </svg>
      );
    },
  },

  // ── 08. C: MEMORY LAYOUT & STACK FRAME ────────────────────────────────────
  "c-pointer-memory": {
    title: "C Program Memory Architecture & Stack Frame",
    subject: "Programming in C",
    examContext: "Standard 8-Mark University Exam Memory Layout Question",
    totalMarks: "8 Marks",
    viewBox: "0 0 580 400",
    steps: [
      {
        stepNumber: 1,
        title: "Step 1: Text Segment (Code) & Read-Only Memory",
        drawSummary: "Draw low memory base: Text / Code segment (binary machine instructions).",
        examInstructions: "Lowest memory addresses. Read-only to prevent self-modifying code. Shared among multiple running instances.",
        marksRubric: "2 Marks: Segment placement & address direction.",
        examTip: "Low memory is at the bottom (0x00000000); High memory is at the top (0xFFFFFFFF).",
        commonTrap: "Placing Code segment at high memory.",
        activeLayers: ["c-text"],
        highlightId: "c-text",
      },
      {
        stepNumber: 2,
        title: "Step 2: Initialized (.data) vs Uninitialized (.bss) Segments",
        drawSummary: "Draw Data Segment: .data (globals with initial values) and .bss (globals initialized to zero by kernel).",
        examInstructions: "Professors check the distinction: int x = 10; goes to .data. int y; goes to .bss.",
        marksRubric: "2 Marks: Accurate classification of global & static variables.",
        examTip: "BSS stands for 'Block Started by Symbol'. It takes 0 bytes in the executable file on disk!",
        commonTrap: "Thinking uninitialized variables take file space. .bss only stores total size needed at runtime.",
        activeLayers: ["c-text", "c-data-bss"],
        highlightId: "c-data-bss",
      },
      {
        stepNumber: 3,
        title: "Step 3: Heap Segment & Dynamic Memory",
        drawSummary: "Draw Heap growing upwards towards high memory via malloc(), calloc(), realloc(), free().",
        examInstructions: "Heap is managed by programmer via brk/sbrk system calls. Grows towards high memory.",
        marksRubric: "2 Marks: Heap direction & allocation functions.",
        examTip: "Memory leaks occur in the Heap when free() is omitted before losing pointer reference.",
        commonTrap: "Drawing Heap growing downwards. Heap grows UPWARDS, Stack grows DOWNWARDS.",
        activeLayers: ["c-text", "c-data-bss", "c-heap"],
        highlightId: "c-heap",
      },
      {
        stepNumber: 4,
        title: "Step 4: Stack Segment & Function Activation Frame",
        drawSummary: "Draw Stack at high memory growing downwards with activation record (return address, saved EBP, local variables).",
        examInstructions: "Stack frames are pushed on function call and popped on return. Stack overflow occurs when Stack meets Heap.",
        marksRubric: "2 Marks: Activation record structure & collision boundary.",
        examTip: "Draw the meeting arrows between Heap and Stack to demonstrate virtual memory growth limits.",
        commonTrap: "Omitting the return address from the stack frame.",
        activeLayers: ["c-text", "c-data-bss", "c-heap", "c-stack"],
        highlightId: "c-stack",
      },
    ],
    renderSvg: (currentStep: number) => {
      const show = (step: number) => currentStep >= step;
      return (
        <svg viewBox="0 0 580 400" className="w-full h-auto text-ink-1 font-mono text-xs select-none">
          <defs>
            <marker id="arrow-c" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 0 L 8 4 L 0 8 z" fill="currentColor" />
            </marker>
          </defs>

          {/* Background Column Frame */}
          <rect x="80" y="30" width="340" height="340" rx="6" fill="var(--color-surface-1, #fcfaf5)" stroke="currentColor" strokeWidth="1.8" />
          <text x="430" y="45" fill="currentColor" opacity="0.6" fontSize="10">0xFFFFFFFF (High Memory)</text>
          <text x="430" y="365" fill="currentColor" opacity="0.6" fontSize="10">0x00000000 (Low Memory)</text>

          {/* STEP 1: TEXT SEGMENT */}
          {show(1) && (
            <g className="transition-all duration-500">
              <rect x="80" y="310" width="340" height="60" fill="var(--color-surface-2, #27272a)" fillOpacity="0.25" stroke="currentColor" strokeWidth="1.2" />
              <text x="250" y="335" fill="currentColor" fontWeight="bold" textAnchor="middle" fontSize="12">TEXT / CODE SEGMENT</text>
              <text x="250" y="352" fill="currentColor" opacity="0.75" textAnchor="middle" fontSize="9.5">Binary Machine Instructions (Read-Only)</text>
            </g>
          )}

          {/* STEP 2: DATA & BSS */}
          {show(2) && (
            <g className="transition-all duration-500">
              <rect x="80" y="260" width="340" height="50" fill="var(--color-accent, #9333ea)" fillOpacity="0.12" stroke="currentColor" strokeWidth="1.2" />
              <text x="250" y="280" fill="var(--color-accent, #9333ea)" fontWeight="bold" textAnchor="middle" fontSize="11">INITIALIZED DATA (.data)</text>
              <text x="250" y="295" fill="currentColor" opacity="0.7" textAnchor="middle" fontSize="9">int count = 10; static int flag = 1;</text>

              <rect x="80" y="210" width="340" height="50" fill="var(--color-accent, #9333ea)" fillOpacity="0.08" stroke="currentColor" strokeWidth="1.2" />
              <text x="250" y="230" fill="var(--color-accent, #9333ea)" fontWeight="bold" textAnchor="middle" fontSize="11">UNINITIALIZED DATA (.bss)</text>
              <text x="250" y="245" fill="currentColor" opacity="0.7" textAnchor="middle" fontSize="9">int buffer[1024]; (Zero-initialized by kernel)</text>
            </g>
          )}

          {/* STEP 3: HEAP */}
          {show(3) && (
            <g className="transition-all duration-500">
              <rect x="80" y="160" width="340" height="50" fill="#d97706" fillOpacity="0.12" stroke="#d97706" strokeWidth="1.2" />
              <text x="250" y="180" fill="#d97706" fontWeight="bold" textAnchor="middle" fontSize="11">HEAP (Dynamic Memory Allocation)</text>
              <text x="250" y="195" fill="currentColor" opacity="0.7" textAnchor="middle" fontSize="9">malloc(), calloc(), free() &middot; brk/sbrk</text>

              {/* Heap Growth Arrow (Upwards) */}
              <path d="M250 160 L250 140" stroke="#d97706" strokeWidth="2.5" markerEnd="url(#arrow-c)" />
              <text x="260" y="145" fill="#d97706" fontWeight="bold" fontSize="9">Grows ↑</text>
            </g>
          )}

          {/* STEP 4: STACK */}
          {show(4) && (
            <g className="transition-all duration-500">
              <rect x="80" y="30" width="340" height="85" fill="#10b981" fillOpacity="0.15" stroke="#10b981" strokeWidth="1.8" />
              <text x="250" y="55" fill="#10b981" fontWeight="bold" textAnchor="middle" fontSize="12">STACK SEGMENT (Activation Records)</text>
              <text x="250" y="72" fill="currentColor" opacity="0.8" textAnchor="middle" fontSize="9">Local Variables, Return Address, Saved EBP</text>
              <text x="250" y="88" fill="currentColor" opacity="0.8" textAnchor="middle" fontSize="9">main() → foo() → bar() stack frames</text>

              {/* Stack Growth Arrow (Downwards) */}
              <path d="M250 115 L250 135" stroke="#10b981" strokeWidth="2.5" markerEnd="url(#arrow-c)" />
              <text x="260" y="130" fill="#10b981" fontWeight="bold" fontSize="9">Grows ↓</text>

              <text x="250" y="150" fill="#ef4444" fontWeight="bold" textAnchor="middle" fontSize="9">
                ⚡ Stack Overflow if Heap &amp; Stack collide!
              </text>
            </g>
          )}
        </svg>
      );
    },
  },

  // ── 09. DBMS: TRANSACTION STATES ──────────────────────────────────────────
  "dbms-transaction-states": {
    title: "ACID Transaction State Machine Diagram",
    subject: "Database Management Systems",
    examContext: "Mandatory 5-Mark Question in Concurrency & Recovery",
    totalMarks: "5 Marks",
    viewBox: "0 0 600 340",
    steps: [
      {
        stepNumber: 1,
        title: "Step 1: Active State (Read/Write Operations)",
        drawSummary: "Draw start state: ACTIVE. The transaction enters this state upon start.",
        examInstructions: "In Active state, transaction executes SQL statements (Read/Write) in memory buffer cache.",
        marksRubric: "1.5 Marks: Initial state definition.",
        examTip: "Active state operations are recorded in Write-Ahead Log (WAL) in RAM.",
        commonTrap: "Thinking data is flushed to disk during active state.",
        activeLayers: ["tx-active"],
        highlightId: "tx-active",
      },
      {
        stepNumber: 2,
        title: "Step 2: Partially Committed State (Last Op Executed)",
        drawSummary: "Draw PARTIALLY COMMITTED state. Reached when final statement has executed in memory.",
        examInstructions: "Professors check: Partially Committed means final statement executed in volatile buffer, BUT WAL not yet flushed to disk!",
        marksRubric: "1.5 Marks: Distinction between partially committed and committed.",
        examTip: "If power failure occurs in Partially Committed state, transaction CANNOT commit — it must abort!",
        commonTrap: "Assuming Partially Committed guarantees durability. It does not!",
        activeLayers: ["tx-active", "tx-partially"],
        highlightId: "tx-partially",
      },
      {
        stepNumber: 3,
        title: "Step 3: Committed State (WAL Flushed to Disk)",
        drawSummary: "Draw COMMITTED terminal state with double border. Reached after successful log flush.",
        examInstructions: "Once WAL commit record is forced to non-volatile disk, state transitions to COMMITTED (Durability guaranteed).",
        marksRubric: "1 Mark: Terminal committed state & WAL flush.",
        examTip: "Once Committed, transaction can NEVER be aborted; changes can only be reversed by a compensating transaction.",
        commonTrap: "Drawing arrow from Committed to Aborted.",
        activeLayers: ["tx-active", "tx-partially", "tx-committed"],
        highlightId: "tx-committed",
      },
      {
        stepNumber: 4,
        title: "Step 4: Failed & Aborted States (Rollback via Undo Log)",
        drawSummary: "Draw FAILED state and ABORTED state with rollback loop. Restart or Kill process.",
        examInstructions: "A transaction enters FAILED on hardware crash, arithmetic divide-by-zero, or deadlock abort. Undo log restores DB state to ABORTED.",
        marksRubric: "1 Mark: Abort / Rollback handling.",
        examTip: "After Aborted, transaction can either restart (if transient deadlock) or terminate (if logical error).",
        commonTrap: "Forgetting the transition from Partially Committed to Failed.",
        activeLayers: ["tx-active", "tx-partially", "tx-committed", "tx-failed", "tx-aborted"],
        highlightId: "tx-aborted",
      },
    ],
    renderSvg: (currentStep: number) => {
      const show = (step: number) => currentStep >= step;
      return (
        <svg viewBox="0 0 600 340" className="w-full h-auto text-ink-1 font-mono text-xs select-none">
          <defs>
            <marker id="arrow-tx" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 0 L 8 4 L 0 8 z" fill="currentColor" />
            </marker>
          </defs>

          {/* STEP 1: ACTIVE */}
          {show(1) && (
            <g className="transition-all duration-500">
              <rect x="40" y="80" width="105" height="42" rx="6" fill="var(--color-surface-1, #fcfaf5)" stroke="currentColor" strokeWidth="1.8" />
              <text x="92" y="106" fill="currentColor" fontWeight="bold" textAnchor="middle" fontSize="12">ACTIVE</text>
              <text x="92" y="138" fill="currentColor" opacity="0.65" textAnchor="middle" fontSize="9">Reads / Writes in RAM</text>
            </g>
          )}

          {/* STEP 2: PARTIALLY COMMITTED */}
          {show(2) && (
            <g className="transition-all duration-500">
              <path d="M145 101 L250 101" stroke="currentColor" strokeWidth="1.8" markerEnd="url(#arrow-tx)" />
              <text x="197" y="93" fill="currentColor" opacity="0.8" textAnchor="middle" fontSize="9">Last statement</text>

              <rect x="255" y="80" width="165" height="42" rx="6" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.8" />
              <text x="337" y="106" fill="#854d0e" fontWeight="bold" textAnchor="middle" fontSize="11">PARTIALLY COMMITTED</text>
              <text x="337" y="138" fill="#854d0e" opacity="0.8" textAnchor="middle" fontSize="8.5">Buffer ready; log not on disk</text>
            </g>
          )}

          {/* STEP 3: COMMITTED */}
          {show(3) && (
            <g className="transition-all duration-500">
              <path d="M420 101 L480 101" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrow-tx)" />
              <text x="450" y="93" fill="#10b981" fontWeight="bold" textAnchor="middle" fontSize="8.5">WAL Disk Flush</text>

              {/* Final State Double Border */}
              <rect x="485" y="75" width="100" height="52" rx="6" fill="#10b981" fillOpacity="0.15" stroke="#10b981" strokeWidth="2" />
              <rect x="490" y="80" width="90" height="42" rx="4" fill="none" stroke="#10b981" strokeWidth="1.2" />
              <text x="535" y="106" fill="#10b981" fontWeight="bold" textAnchor="middle" fontSize="11">COMMITTED</text>
            </g>
          )}

          {/* STEP 4: FAILED & ABORTED */}
          {show(4) && (
            <g className="transition-all duration-500">
              {/* Active -> Failed */}
              <path d="M92 122 L92 220" stroke="#ef4444" strokeWidth="1.6" markerEnd="url(#arrow-tx)" />
              <text x="96" y="170" fill="#ef4444" fontSize="8.5">Error / Crash</text>

              {/* Partially Committed -> Failed */}
              <path d="M337 122 L170 230" stroke="#ef4444" strokeWidth="1.6" markerEnd="url(#arrow-tx)" />
              <text x="270" y="170" fill="#ef4444" fontSize="8.5">Flush Failure</text>

              {/* FAILED */}
              <rect x="50" y="225" width="105" height="42" rx="6" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.8" />
              <text x="102" y="251" fill="#b91c1c" fontWeight="bold" textAnchor="middle" fontSize="12">FAILED</text>

              {/* Failed -> Aborted */}
              <path d="M155 246 L270 246" stroke="#ef4444" strokeWidth="1.8" markerEnd="url(#arrow-tx)" />
              <text x="212" y="238" fill="#ef4444" fontSize="8.5">Rollback / Undo</text>

              {/* ABORTED (Double Border) */}
              <rect x="275" y="220" width="115" height="52" rx="6" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" />
              <rect x="280" y="225" width="105" height="42" rx="4" fill="none" stroke="#ef4444" strokeWidth="1.2" />
              <text x="332" y="251" fill="#b91c1c" fontWeight="bold" textAnchor="middle" fontSize="12">ABORTED</text>

              {/* Aborted Restart Option */}
              <path d="M390 246 C460 246, 460 300, 200 300 C10 300, 10 95, 35 95" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 3" fill="none" markerEnd="url(#arrow-tx)" />
              <text x="320" y="318" fill="currentColor" opacity="0.75" textAnchor="middle" fontSize="9 font-handwriting">
                ✎ Restart transaction (if deadlock) or Kill (if logic error)
              </text>
            </g>
          )}
        </svg>
      );
    },
  },
};

export default function LiveDiagramDrawer({
  presetKey = "os-process-lifecycle",
  autoPlay = false,
}: {
  presetKey?: DiagramPresetKey;
  autoPlay?: boolean;
}) {
  const [selectedKey, setSelectedKey] = useState<DiagramPresetKey>(presetKey);
  const diagram = DIAGRAM_DEFINITIONS[selectedKey] || DIAGRAM_DEFINITIONS["os-process-lifecycle"];

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(autoPlay);
  const [playSpeed, setPlaySpeed] = useState<number>(1); // 1x or 1.5x
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const totalSteps = diagram.steps.length;
  const currentStepData = diagram.steps[currentStep - 1] || diagram.steps[0];

  // Auto-play interval
  useEffect(() => {
    if (isPlaying) {
      const intervalTime = Math.round(3400 / playSpeed);
      timerRef.current = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= totalSteps) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, intervalTime);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, totalSteps, playSpeed]);

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStep(1);
  };

  const handleNext = () => {
    setIsPlaying(false);
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    setIsPlaying(false);
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleTogglePlay = () => {
    if (currentStep >= totalSteps && !isPlaying) {
      setCurrentStep(1);
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="w-full my-8 rounded-lg border border-[#e2d9cc] dark:border-[#2e2a42] bg-[#fbf9f4] dark:bg-[#151624] shadow-sm overflow-hidden font-sans">
      {/* ── TOP BAR: METADATA & PRESET SELECTOR ── */}
      <div className="p-4 sm:p-5 border-b border-[#e2d9cc] dark:border-[#2e2a42] bg-[#f5ede0]/50 dark:bg-[#1a1b2d]/60 flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-violet-500/15 text-violet-700 dark:text-violet-300 font-mono text-[10px] font-bold uppercase tracking-wider">
              LIVE EXAM DRAWING STUDIO
            </span>
            <span className="font-mono text-[11px] text-ink-3">
              {diagram.subject} &middot; {diagram.totalMarks}
            </span>
          </div>
          <h4 className="font-handwriting text-2xl sm:text-3xl font-bold text-ink-1">
            {diagram.title}
          </h4>
          <p className="text-xs text-ink-2 font-mono">
            {diagram.examContext}
          </p>
        </div>

        {/* Preset Selector Dropdown */}
        <div className="flex items-center gap-2">
          <label htmlFor="diagram-select" className="text-xs font-mono text-ink-3 hidden sm:inline">
            Diagram:
          </label>
          <select
            id="diagram-select"
            value={selectedKey}
            onChange={(e) => {
              setSelectedKey(e.target.value as DiagramPresetKey);
              setCurrentStep(1);
              setIsPlaying(false);
            }}
            className="px-3 py-1.5 rounded-md border border-[#d6cfbe] dark:border-[#38334f] bg-surface-1 text-ink-1 font-mono text-xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <optgroup label="Operating Systems">
              <option value="os-process-lifecycle">OS: 7-State Process Lifecycle</option>
              <option value="os-dual-mode">OS: Dual Mode Kernel Trap</option>
            </optgroup>
            <optgroup label="Database Management Systems">
              <option value="dbms-three-schema">DBMS: 3-Schema Architecture</option>
              <option value="dbms-b-plus-tree">DBMS: B+ Tree Node Split</option>
              <option value="dbms-transaction-states">DBMS: Transaction State Machine</option>
            </optgroup>
            <optgroup label="Computer Networks">
              <option value="cn-tcp-handshake">CN: TCP 3-Way Handshake</option>
            </optgroup>
            <optgroup label="Computer Organization (COA)">
              <option value="coa-pipeline-hazards">COA: 5-Stage Pipeline Hazards</option>
            </optgroup>
            <optgroup label="Theory of Computation (TOC)">
              <option value="toc-dfa-state">TOC: DFA Construction (Strings '01')</option>
            </optgroup>
            <optgroup label="Programming in C">
              <option value="c-pointer-memory">C: Memory Layout Architecture</option>
            </optgroup>
          </select>
        </div>
      </div>

      {/* ── PLAYER CONTROLS TOOLBAR ── */}
      <div className="px-4 sm:px-6 py-3 border-b border-[#e2d9cc] dark:border-[#2e2a42] bg-surface-1/70 flex flex-wrap items-center justify-between gap-3">
        {/* Playback Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleTogglePlay}
            className="px-3.5 py-1.5 rounded bg-violet-600 hover:bg-violet-700 text-white font-mono text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer"
          >
            {isPlaying ? (
              <>
                <span>⏸</span>
                <span>Pause</span>
              </>
            ) : (
              <>
                <span>▶</span>
                <span>{currentStep >= totalSteps ? "Replay Flow" : "Live Draw Flow"}</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="px-2.5 py-1.5 rounded border border-hairline hover:bg-surface-2 text-ink-2 font-mono text-xs flex items-center gap-1 transition-colors cursor-pointer"
            title="Reset to Step 1"
          >
            <span>⏮</span>
            <span className="hidden sm:inline">Reset</span>
          </button>

          <div className="h-4 w-px bg-hairline mx-1" />

          <button
            type="button"
            onClick={handlePrev}
            disabled={currentStep <= 1}
            className="px-2.5 py-1.5 rounded border border-hairline hover:bg-surface-2 text-ink-2 disabled:opacity-40 disabled:pointer-events-none font-mono text-xs flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>◀</span>
            <span className="hidden sm:inline">Prev</span>
          </button>

          <button
            type="button"
            onClick={handleNext}
            disabled={currentStep >= totalSteps}
            className="px-2.5 py-1.5 rounded border border-hairline hover:bg-surface-2 text-ink-2 disabled:opacity-40 disabled:pointer-events-none font-mono text-xs flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span className="hidden sm:inline">Next</span>
            <span>▶</span>
          </button>
        </div>

        {/* Step Progress Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1">
          {diagram.steps.map((st) => (
            <button
              key={st.stepNumber}
              type="button"
              onClick={() => {
                setIsPlaying(false);
                setCurrentStep(st.stepNumber);
              }}
              className={`px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold transition-all cursor-pointer whitespace-nowrap ${
                currentStep === st.stepNumber
                  ? "bg-violet-600 text-white shadow-sm ring-2 ring-violet-300 dark:ring-violet-800"
                  : currentStep > st.stepNumber
                  ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30"
                  : "bg-surface-2 text-ink-3 hover:text-ink-1"
              }`}
            >
              Step {st.stepNumber}
            </button>
          ))}
        </div>

        {/* Speed toggle */}
        <button
          type="button"
          onClick={() => setPlaySpeed(playSpeed === 1 ? 1.5 : 1)}
          className="font-mono text-[11px] text-ink-3 hover:text-ink-1 px-2 py-1 rounded bg-surface-2 border border-hairline"
        >
          {playSpeed}x Speed
        </button>
      </div>

      {/* ── MAIN DRAWING CANVAS (EXAM ANSWER SHEET METAPHOR) ── */}
      <div className="p-4 sm:p-6 bg-[#fcfbf9] dark:bg-[#131422] relative overflow-hidden">
        {/* Subtle Engineering Grid Paper Background */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.035] bg-[radial-gradient(#000000_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"
          aria-hidden="true"
        />

        {/* Floating Drawing Status Badge */}
        <div className="absolute top-3 right-3 z-10 flex items-center gap-2 px-3 py-1 rounded-full bg-surface-1/90 backdrop-blur-sm border border-hairline shadow-sm text-xs font-mono text-ink-2">
          {isPlaying ? (
            <>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                ✏️ Student Pen Drawing Step {currentStep}/{totalSteps}...
              </span>
            </>
          ) : (
            <span>
              Step {currentStep} of {totalSteps} &middot; Exam Sheet View
            </span>
          )}
        </div>

        {/* The Progressive SVG Canvas */}
        <div className="relative z-0 min-h-[300px] flex items-center justify-center p-2 sm:p-4">
          {diagram.renderSvg(currentStep, isPlaying)}
        </div>
      </div>

      {/* ── EXAM SCORING RUBRIC & INK ANNOTATION BOX ── */}
      <div className="p-5 sm:p-6 border-t border-[#e2d9cc] dark:border-[#2e2a42] bg-[#fbf8f2] dark:bg-[#171829] space-y-4">
        {/* Step Header & Draw Instructions */}
        <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-dashed border-hairline/80 pb-3">
          <div>
            <span className="font-mono text-xs font-bold text-violet-600 dark:text-violet-400 uppercase tracking-wider">
              {currentStepData.title}
            </span>
            <p className="text-sm font-sans font-medium text-ink-1 mt-0.5">
              {currentStepData.drawSummary}
            </p>
          </div>
          <span className="px-2.5 py-1 rounded bg-amber-500/15 border border-amber-500/30 text-amber-800 dark:text-amber-300 font-mono text-[11px] font-bold">
            {currentStepData.marksRubric}
          </span>
        </div>

        {/* University Exam Sheet Instructions & Rubric */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
          <div className="p-3.5 rounded-md bg-surface-1 border border-hairline/80 space-y-1.5">
            <span className="font-mono font-bold text-[10px] text-ink-3 uppercase tracking-wider flex items-center gap-1">
              <span>✍️ HOW TO DRAW ON EXAM ANSWER SHEET</span>
            </span>
            <p className="text-ink-2 leading-relaxed">
              {currentStepData.examInstructions}
            </p>
          </div>

          <div className="p-3.5 rounded-md bg-rose-500/5 dark:bg-rose-500/10 border border-rose-500/25 space-y-1.5">
            <span className="font-mono font-bold text-[10px] text-rose-700 dark:text-rose-300 uppercase tracking-wider flex items-center gap-1">
              <span>⚠️ COMMON EXAM BLUNDER / MARKS LOST</span>
            </span>
            <p className="text-rose-900 dark:text-rose-200 leading-relaxed">
              {currentStepData.commonTrap}
            </p>
          </div>
        </div>

        {/* Student Handwritten Quick Tip */}
        <div className="pt-1 flex items-start gap-2 text-violet-700 dark:text-violet-300 font-handwriting text-base sm:text-lg">
          <span className="shrink-0 font-bold">✎ Tip:</span>
          <span>{currentStepData.examTip}</span>
        </div>
      </div>
    </div>
  );
}
