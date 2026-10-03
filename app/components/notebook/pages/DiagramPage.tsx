import { DiagramPageContent } from "../../../../lib/notebooks/types";

export default function DiagramPage({ content }: { content: DiagramPageContent }) {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        {content.subheading && (
          <span className="text-[10px] font-mono uppercase tracking-widest text-ink-3 block mb-1">
            {content.subheading}
          </span>
        )}
        <h3 className="font-handwriting text-2xl sm:text-3xl font-bold text-ink-1 leading-tight">
          <span className="bg-violet-500/10 dark:bg-violet-500/20 px-2 py-0.5 rounded-[3px]">
            {content.heading}
          </span>
        </h3>
      </div>

      {/* Handwritten Annotation */}
      {content.handwrittenNote && (
        <p className="font-handwriting text-base sm:text-lg text-accent font-semibold leading-snug">
          {content.handwrittenNote}
        </p>
      )}

      {/* SVG Diagram Canvas (Carefully Drawn Student Notes Aesthetics) */}
      <div className="rounded-xl border border-dashed border-hairline/80 bg-surface-1/20 p-3 sm:p-4 overflow-hidden">
        {renderDiagramSvg(content.customKey)}
      </div>

      {content.caption && (
        <p className="text-[11px] font-mono text-ink-3 text-center">
          {content.caption}
        </p>
      )}

      {/* Accompanying Notes */}
      {content.notes && content.notes.length > 0 && (
        <ul className="space-y-1.5 pt-1 text-xs text-ink-2">
          {content.notes.map((n, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-accent font-bold text-xs mt-0.5">&bull;</span>
              <span>{n}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function renderDiagramSvg(key: DiagramPageContent["customKey"]) {
  switch (key) {
    case "os-process-lifecycle":
      return (
        <svg viewBox="0 0 460 220" fill="none" className="w-full h-auto text-ink-1 font-mono text-[9px] select-none">
          <rect x="10" y="10" width="440" height="115" rx="6" stroke="currentColor" strokeOpacity="0.2" strokeDasharray="3 3" />
          <text x="20" y="24" fill="var(--color-accent, #a855f7)" fontWeight="bold" fontSize="8">MAIN MEMORY (RAM)</text>
          
          <rect x="25" y="45" width="55" height="26" rx="4" fill="var(--color-surface-2, #27272a)" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1" />
          <text x="52" y="61" fill="currentColor" fontWeight="bold" textAnchor="middle">NEW</text>

          <path d="M80 58 L115 58" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.2" markerEnd="url(#arrow)" />
          
          <rect x="120" y="45" width="65" height="26" rx="4" fill="var(--color-accent, #9333ea)" fillOpacity="0.15" stroke="var(--color-accent, #9333ea)" strokeWidth="1.2" />
          <text x="152" y="61" fill="currentColor" fontWeight="bold" textAnchor="middle">READY</text>

          <path d="M185 52 L245 52" stroke="var(--color-emerald, #10b981)" strokeWidth="1.2" />
          <text x="215" y="48" fill="var(--color-emerald, #10b981)" fontSize="7" textAnchor="middle">Dispatch →</text>

          <path d="M245 64 L185 64" stroke="var(--color-highlight, #f59e0b)" strokeWidth="1.2" />
          <text x="215" y="73" fill="var(--color-highlight, #f59e0b)" fontSize="7" textAnchor="middle">← Preempt</text>

          <rect x="250" y="45" width="70" height="26" rx="4" fill="var(--color-emerald, #10b981)" fillOpacity="0.15" stroke="var(--color-emerald, #10b981)" strokeWidth="1.2" />
          <text x="285" y="61" fill="currentColor" fontWeight="bold" textAnchor="middle">RUNNING</text>

          <path d="M320 58 L375 58" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.2" />
          <rect x="380" y="45" width="65" height="26" rx="4" fill="var(--color-rose, #ef4444)" fillOpacity="0.15" stroke="var(--color-rose, #ef4444)" strokeWidth="1.2" />
          <text x="412" y="61" fill="currentColor" fontWeight="bold" textAnchor="middle">EXIT</text>

          <rect x="180" y="90" width="75" height="26" rx="4" fill="var(--color-highlight, #f59e0b)" fillOpacity="0.15" stroke="var(--color-highlight, #f59e0b)" strokeWidth="1.2" />
          <text x="217" y="106" fill="currentColor" fontWeight="bold" textAnchor="middle">WAITING</text>
          
          <path d="M285 71 L285 103 L255 103" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1" />
          <path d="M180 103 L152 103 L152 71" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1" />

          {/* Disk Swap Region */}
          <rect x="10" y="140" width="440" height="70" rx="6" fill="var(--color-surface-2, #27272a)" fillOpacity="0.3" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1" />
          <text x="20" y="154" fill="var(--color-highlight, #f59e0b)" fontWeight="bold" fontSize="8">SECONDARY STORAGE (SWAP DISK)</text>

          <rect x="110" y="165" width="95" height="28" rx="4" fill="var(--color-accent, #9333ea)" fillOpacity="0.12" stroke="var(--color-accent, #9333ea)" strokeWidth="1" />
          <text x="157" y="182" fill="currentColor" fontWeight="bold" textAnchor="middle">READY-SUSPEND</text>

          <rect x="250" y="165" width="105" height="28" rx="4" fill="var(--color-highlight, #f59e0b)" fillOpacity="0.12" stroke="var(--color-highlight, #f59e0b)" strokeWidth="1" />
          <text x="302" y="182" fill="currentColor" fontWeight="bold" textAnchor="middle">BLOCKED-SUSPEND</text>

          {/* Handwritten swap indicators */}
          <path d="M152 71 L152 165" stroke="var(--color-accent, #9333ea)" strokeWidth="1.2" strokeDasharray="3 3" />
          <text x="160" y="130" fill="var(--color-accent, #9333ea)" fontSize="11" className="font-handwriting" style={{ fontFamily: "'Caveat', cursive" }}>
            ✎ swap in / out
          </text>
          <text x="320" y="145" fill="var(--color-highlight, #f59e0b)" fontSize="11" className="font-handwriting" style={{ fontFamily: "'Caveat', cursive" }}>
            ✎ RAM thrashing eviction
          </text>
        </svg>
      );

    case "dbms-three-schema":
      return (
        <svg viewBox="0 0 460 210" fill="none" className="w-full h-auto text-ink-1 font-mono text-[9px] select-none">
          {/* External */}
          <rect x="20" y="10" width="420" height="42" rx="6" fill="var(--color-accent, #9333ea)" fillOpacity="0.08" stroke="var(--color-accent, #9333ea)" strokeWidth="1" />
          <text x="30" y="24" fill="var(--color-accent, #9333ea)" fontWeight="bold" fontSize="9">EXTERNAL VIEWS (Student, Faculty, Admin)</text>
          <text x="30" y="38" fill="currentColor" opacity="0.7" fontSize="8">SELECT roll_no, gpa FROM students_view</text>
          <text x="320" y="30" fill="var(--color-accent, #9333ea)" fontSize="12" className="font-handwriting" style={{ fontFamily: "'Caveat', cursive" }}>✎ tailored user views</text>

          {/* Mapping line */}
          <path d="M230 52 L230 76" stroke="var(--color-accent, #9333ea)" strokeWidth="1.5" />
          <text x="240" y="67" fill="var(--color-accent, #9333ea)" fontSize="10" className="font-handwriting" style={{ fontFamily: "'Caveat', cursive" }}>✎ logical data independence</text>

          {/* Conceptual */}
          <rect x="20" y="76" width="420" height="42" rx="6" fill="var(--color-emerald, #10b981)" fillOpacity="0.08" stroke="var(--color-emerald, #10b981)" strokeWidth="1" />
          <text x="30" y="90" fill="var(--color-emerald, #10b981)" fontWeight="bold" fontSize="9">CONCEPTUAL SCHEMA (Community Enterprise View)</text>
          <text x="30" y="104" fill="currentColor" opacity="0.7" fontSize="8">Relational Tables, Foreign Keys, Check Constraints</text>

          {/* Mapping line */}
          <path d="M230 118 L230 142" stroke="var(--color-highlight, #f59e0b)" strokeWidth="1.5" />
          <text x="240" y="133" fill="var(--color-highlight, #f59e0b)" fontSize="10" className="font-handwriting" style={{ fontFamily: "'Caveat', cursive" }}>✎ physical data independence</text>

          {/* Internal */}
          <rect x="20" y="142" width="420" height="46" rx="6" fill="var(--color-surface-2, #27272a)" fillOpacity="0.4" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1" />
          <text x="30" y="156" fill="currentColor" fontWeight="bold" fontSize="9">INTERNAL SCHEMA (Physical File Layout)</text>
          <text x="30" y="170" fill="currentColor" opacity="0.7" fontSize="8">Record Offsets, Clustered B+ Trees, Slotted Pages, NVMe SSD</text>
          <text x="310" y="172" fill="var(--color-highlight, #f59e0b)" fontSize="12" className="font-handwriting" style={{ fontFamily: "'Caveat', cursive" }}>✎ switch index without rewriting SQL</text>
        </svg>
      );

    case "algo-bfs-dfs":
      return (
        <svg viewBox="0 0 440 200" fill="none" className="w-full h-auto text-ink-1 font-mono text-[9px] select-none">
          {/* Tree Nodes */}
          <circle cx="110" cy="30" r="14" fill="var(--color-accent, #9333ea)" fillOpacity="0.2" stroke="var(--color-accent, #9333ea)" strokeWidth="1.2" />
          <text x="110" y="34" fill="currentColor" fontWeight="bold" textAnchor="middle">1</text>

          <circle cx="65" cy="85" r="14" fill="var(--color-surface-2, #27272a)" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1" />
          <text x="65" y="89" fill="currentColor" fontWeight="bold" textAnchor="middle">2</text>

          <circle cx="155" cy="85" r="14" fill="var(--color-surface-2, #27272a)" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1" />
          <text x="155" y="89" fill="currentColor" fontWeight="bold" textAnchor="middle">3</text>

          <circle cx="40" cy="140" r="14" fill="var(--color-surface-2, #27272a)" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1" />
          <text x="40" y="144" fill="currentColor" fontWeight="bold" textAnchor="middle">4</text>

          <circle cx="90" cy="140" r="14" fill="var(--color-surface-2, #27272a)" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1" />
          <text x="90" y="144" fill="currentColor" fontWeight="bold" textAnchor="middle">5</text>

          <line x1="100" y1="42" x2="75" y2="73" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.2" />
          <line x1="120" y1="42" x2="145" y2="73" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.2" />
          <line x1="57" y1="97" x2="48" y2="128" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.2" />
          <line x1="73" y1="97" x2="82" y2="128" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.2" />

          {/* Comparison Panels */}
          <rect x="210" y="20" width="210" height="70" rx="6" fill="var(--color-accent, #9333ea)" fillOpacity="0.08" stroke="var(--color-accent, #9333ea)" strokeWidth="1" />
          <text x="220" y="36" fill="var(--color-accent, #9333ea)" fontWeight="bold" fontSize="10">BFS: Breadth-First Search</text>
          <text x="220" y="52" fill="currentColor" opacity="0.8">Data Structure: FIFO Queue</text>
          <text x="220" y="66" fill="currentColor" opacity="0.8">Order: 1 → 2 → 3 → 4 → 5</text>
          <text x="220" y="82" fill="var(--color-accent, #9333ea)" fontSize="11" className="font-handwriting" style={{ fontFamily: "'Caveat', cursive" }}>✎ finds shortest path in unweighted graphs</text>

          <rect x="210" y="105" width="210" height="70" rx="6" fill="var(--color-emerald, #10b981)" fillOpacity="0.08" stroke="var(--color-emerald, #10b981)" strokeWidth="1" />
          <text x="220" y="121" fill="var(--color-emerald, #10b981)" fontWeight="bold" fontSize="10">DFS: Depth-First Search</text>
          <text x="220" y="137" fill="currentColor" opacity="0.8">Data Structure: LIFO Stack</text>
          <text x="220" y="151" fill="currentColor" opacity="0.8">Order: 1 → 2 → 4 → 5 → 3</text>
          <text x="220" y="167" fill="var(--color-emerald, #10b981)" fontSize="11" className="font-handwriting" style={{ fontFamily: "'Caveat', cursive" }}>✎ back-edges indicate cycles</text>
        </svg>
      );

    case "cn-osi-layers":
      return (
        <svg viewBox="0 0 440 190" fill="none" className="w-full h-auto text-ink-1 font-mono text-[9px] select-none">
          <rect x="20" y="15" width="380" height="30" rx="4" fill="var(--color-accent, #9333ea)" fillOpacity="0.12" stroke="var(--color-accent, #9333ea)" strokeWidth="1" />
          <text x="30" y="33" fill="currentColor" fontWeight="bold">L7-L5: Application Layer</text>
          <text x="230" y="33" fill="currentColor" opacity="0.7">HTTP, DNS, SSH, TLS</text>
          <text x="360" y="33" fill="var(--color-accent, #9333ea)" fontSize="11" className="font-handwriting" style={{ fontFamily: "'Caveat', cursive" }}>Data</text>

          <rect x="20" y="52" width="380" height="30" rx="4" fill="var(--color-indigo, #6366f1)" fillOpacity="0.12" stroke="var(--color-indigo, #6366f1)" strokeWidth="1" />
          <text x="30" y="70" fill="currentColor" fontWeight="bold">L4: Transport Layer</text>
          <text x="230" y="70" fill="currentColor" opacity="0.7">TCP (Ports), UDP</text>
          <text x="350" y="70" fill="var(--color-indigo, #6366f1)" fontSize="11" className="font-handwriting" style={{ fontFamily: "'Caveat', cursive" }}>Segment</text>

          <rect x="20" y="89" width="380" height="30" rx="4" fill="var(--color-emerald, #10b981)" fillOpacity="0.12" stroke="var(--color-emerald, #10b981)" strokeWidth="1" />
          <text x="30" y="107" fill="currentColor" fontWeight="bold">L3: Network Layer</text>
          <text x="230" y="107" fill="currentColor" opacity="0.7">IP (Routing), ICMP, OSPF</text>
          <text x="355" y="107" fill="var(--color-emerald, #10b981)" fontSize="11" className="font-handwriting" style={{ fontFamily: "'Caveat', cursive" }}>Packet</text>

          <rect x="20" y="126" width="380" height="30" rx="4" fill="var(--color-amber, #f59e0b)" fillOpacity="0.12" stroke="var(--color-amber, #f59e0b)" strokeWidth="1" />
          <text x="30" y="144" fill="currentColor" fontWeight="bold">L2: Data Link Layer</text>
          <text x="230" y="144" fill="currentColor" opacity="0.7">Ethernet (MAC), ARP, CRC</text>
          <text x="355" y="144" fill="var(--color-amber, #f59e0b)" fontSize="11" className="font-handwriting" style={{ fontFamily: "'Caveat', cursive" }}>Frame</text>

          <rect x="20" y="163" width="380" height="22" rx="4" fill="var(--color-surface-2, #27272a)" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1" />
          <text x="30" y="177" fill="currentColor" fontWeight="bold">L1: Physical Layer</text>
          <text x="230" y="177" fill="currentColor" opacity="0.7">Fiber optics, Twisted Pair</text>
          <text x="365" y="177" fill="currentColor" opacity="0.6">Bits</text>
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 440 180" fill="none" className="w-full h-auto text-ink-1 font-mono text-xs select-none">
          <rect x="20" y="20" width="400" height="140" rx="8" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1.2" />
          <text x="220" y="80" fill="var(--color-accent, #a855f7)" fontWeight="bold" textAnchor="middle">
            Interactive Engineering Diagram
          </text>
          <text x="220" y="105" fill="currentColor" opacity="0.7" fontSize="11" textAnchor="middle">
            Precision mathematical graph &amp; architecture layout
          </text>
          <text x="220" y="130" fill="var(--color-highlight, #facc15)" fontSize="13" textAnchor="middle" className="font-handwriting" style={{ fontFamily: "'Caveat', cursive" }}>
            ✎ carefully drawn student notes
          </text>
        </svg>
      );
  }
}
