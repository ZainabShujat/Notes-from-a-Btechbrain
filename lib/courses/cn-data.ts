import { CourseMeta } from "./types";

export const COMPUTER_NETWORKS_COURSE: CourseMeta = {
  id: "computer-networks",
  title: "Computer Networks",
  slug: "computer-networks",
  subjectSlug: "computer-networks",
  shortTitle: "CN",
  icon: "🌐",
  color: "bg-violet-400",
  tagline:
    "Master packet flows, sliding window arithmetic, CIDR subnetting, IP fragmentation, and TCP congestion control for university exams and GATE CS/IT.",
  description:
    "A rigorous, comprehensive study notebook covering computer networking fundamentals, mathematical channel capacities, flow control protocols, IP routing, and transport layer mechanisms. Built specifically for B.Tech semester exams and high-percentile GATE CS/IT preparation.",
  level: "Undergraduate / GATE CS",
  estimatedHours: 40,
  prerequisites: [
    "Basic C programming and data structures",
    "Discrete Mathematics (Probability, Binary arithmetic)",
    "Elementary Operating Systems (Sockets, I/O)",
  ],
  learningOutcomes: [
    "Calculate theoretical channel limits using Nyquist formula and Shannon-Hartley capacity theorem",
    "Solve sliding window numericals for Stop-and-Wait, Go-Back-N, and Selective Repeat under varying propagation delays",
    "Compute CRC polynomial division remainders and derive minimum Hamming distances for error detection/correction",
    "Derive Ethernet CSMA/CD minimum frame size constraints and collision domain bounds",
    "Design classless IP subnets (CIDR/VLSM) and compute exact IPv4 fragmentation offsets and MF flags",
    "Trace Distance Vector Bellman-Ford updates, count-to-infinity traps, and Dijkstra Link-State shortest paths",
    "Model TCP congestion window (cwnd) growth across Slow Start, Congestion Avoidance, and Fast Recovery phases",
  ],
  gateWeightage: "7 - 10 Marks",
  gateSyllabusTopics: [
    "Principles of layering: OSI and TCP/IP protocol stacks",
    "Basics of packet switching, circuit switching, and delay analysis",
    "Data link layer: framing, error detection (CRC, checksum), flow control (Stop-and-Wait, GBN, SR)",
    "Medium Access Control: ALOHA, CSMA/CD, Ethernet frame formats",
    "Network layer: IPv4 addressing, CIDR, subnetting, NAT, fragmentation",
    "Routing algorithms: Distance Vector (RIP), Link State (OSPF)",
    "Transport layer: UDP, TCP connection management, flow control, congestion control",
    "Application layer: DNS resolution, HTTP persistent/non-persistent connections",
  ],
  modules: [
    // =========================================================================
    // MODULE 1: LAYERING & DELAYS
    // =========================================================================
    {
      id: "cn-module-1-layering-and-delays",
      title: "Module 1: Protocol Layering & Network Delays",
      slug: "layering-and-delays",
      description:
        "Architectural principles of computer networking: OSI 7-layer vs TCP/IP 5-layer stacks, packet encapsulation, and end-to-end delay mathematics.",
      order: 1,
      lessons: [
        {
          id: "osi-vs-tcp-ip-and-encapsulation",
          title: "OSI vs TCP/IP Models & Packet Encapsulation",
          slug: "osi-vs-tcp-ip-and-encapsulation",
          order: 1,
          estimatedMinutes: 20,
          tagline: "Layer responsibilities, protocol data units (PDU), and header encapsulation.",
          hasInteractive: false,
          hasGATE: true,
          hasPractice: true,
          sections: [
            {
              type: "explanation",
              heading: "1. The Principle of Layering & Architectural Separation",
              body: [
                "Computer networks rely on modular layering to decompose massive communication complexity into independent functional abstractions. Each layer n provides specific services to layer (n+1) via a ==purple:Service Access Point (SAP)==, while relying on the services of layer (n-1).",
                "**Protocols vs Services:** A ==yellow:protocol is a set of formal rules governing peer-to-peer communication across hosts== at the same layer. A ==green:service is a set of operations that a layer provides to the layer immediately above it== through an interface.",
                "**Encapsulation & Decapsulation:** As user data travels down the sender's protocol stack, each layer prepends a protocol-specific header (and occasionally an error-detecting trailer at Layer 2). The resulting packet is termed a ==purple:Protocol Data Unit (PDU)==: ==yellow:Application Message → Transport Segment/Datagram → Network Datagram/Packet → Data Link Frame → Physical Raw Bits==.",
              ],
              callout: {
                kind: "gate-tip",
                title: "GATE PDU Nomenclature Trap",
                message:
                  "GATE questions often test exact terminology: ==purple:Application Layer produces 'Messages'==, ==yellow:Transport Layer produces 'Segments' (TCP) or 'User Datagrams' (UDP)==, ==pink:Network Layer produces 'Packets/Datagrams'==, and ==green:Data Link Layer produces 'Frames'==.",
              },
            },
            {
              type: "comparison",
              heading: "2. OSI 7-Layer vs TCP/IP 5-Layer Architectural Comparison",
              leadParagraph:
                "Standard comparison of responsibilities, protocol units, and design philosophies:",
              columns: ["Layer", "OSI Model (Theoretical)", "TCP/IP Model (Practical Standard)"],
              criteria: [
                {
                  criterion: "Layer 7 (Application)",
                  values: ["==purple:User network interface== (HTTP, SMTP, DNS, FTP)", "==yellow:Merges OSI Session, Presentation & App into one== application layer"],
                },
                {
                  criterion: "Layer 6 (Presentation)",
                  values: ["==green:Data serialization, ASCII/EBCDIC, SSL/TLS encryption== format conversion", "Handled directly inside user application libraries"],
                },
                {
                  criterion: "Layer 5 (Session)",
                  values: ["==pink:Dialogue control, token management, synchronization checkpoints==", "Integrated into application or transport layer"],
                },
                {
                  criterion: "Layer 4 (Transport)",
                  values: ["==yellow:End-to-end process-to-process delivery== (TCP, UDP with port numbers)", "End-to-end host communication with port addressing"],
                },
                {
                  criterion: "Layer 3 (Network)",
                  values: ["==yellow:Host-to-host routing, logical IP addressing== across networks", "Internet Protocol (IPv4/IPv6), ICMP, routing"],
                },
                {
                  criterion: "Layer 2 (Data Link)",
                  values: ["==pink:Hop-to-hop node delivery, framing, CRC error detection, MAC access==", "Network Interface / Data Link (Ethernet, Wi-Fi)"],
                },
                {
                  criterion: "Layer 1 (Physical)",
                  values: ["==green:Raw bit transmission, signal voltages, cable pins==", "Physical transmission medium (Copper, Fiber, Radio)"],
                },
              ],
            },
            {
              type: "explanation",
              heading: "3. End-to-End Delay Analysis: The Four Delay Components",
              body: [
                "Whenever a packet travels from source to destination across a store-and-forward packet-switched network, total node delay d_nodal comprises exactly four components: d_nodal = d_proc + d_queue + d_trans + d_prop.",
                "1. Nodal Processing Delay (d_proc): Time taken by the router to examine the packet header, verify the checksum, and determine the output link via routing table lookup (typically microseconds).",
                "2. Queuing Delay (d_queue): Time the packet waits in the router output buffer queue before transmission. Depends on network congestion and traffic intensity I = (L * a) / R, where L = packet size (bits), a = average arrival rate (packets/sec), and R = transmission rate (bps). If I > 1, queue grows without bound and packets drop.",
                "3. Transmission Delay (d_trans): Time required to push all packet bits onto the physical link: d_trans = L / R, where L = packet length in bits, R = link bandwidth/capacity in bits per second (bps).",
                "4. Propagation Delay (d_prop): Time taken for a single bit to travel across the physical medium from sender to receiver: d_prop = d / s, where d = physical distance in meters, s = signal propagation speed in the medium (typically 2 * 10^8 m/s in copper/fiber, 3 * 10^8 m/s in vacuum).",
              ],
              callout: {
                kind: "gate-tip",
                title: "Crucial GATE Distinction: Transmission vs Propagation Delay",
                message:
                  "Transmission delay depends strictly on packet size L and bandwidth R (L / R). Propagation delay depends strictly on distance d and signal velocity s (d / s). Bandwidth does NOT speed up signal travel; it only pushes bits onto the wire faster!",
              },
            },
            {
              type: "gate-analysis",
              heading: "4. GATE Step-by-Step Numerical: Store-and-Forward Packet Switching Delay",
              weightage: "2 Marks (High Frequency)",
              trap: "In store-and-forward packet switching, intermediate routers must receive the ENTIRE packet before forwarding the first bit to the next link!",
              solutionSteps: [
                "Problem: A source host sends a file of size F = 1.5 Megabytes over a path of N = 4 identical links. Each link has bandwidth R = 10 Mbps and propagation delay d_prop = 5 ms. The file is split into packets of size P = 1500 bytes (including 20 bytes header). Neglect processing and queuing delays.",
                "Step 1: Compute packet transmission delay per link: d_trans = (1500 * 8 bits) / (10 * 10^6 bps) = 12,000 / 10,000,000 = 1.2 milliseconds.",
                "Step 2: Number of packets M = Total Data / Packet Data. Here, packet payload = 1500 - 20 = 1480 bytes. M = ceil(1.5 * 10^6 / 1480) = ceil(1013.51) = 1014 packets.",
                "Step 3: Pipelined store-and-forward transmission formula: Total Time T = (Time for Packet 1 to reach destination) + (Remaining M - 1 packets arriving back-to-back at destination).",
                "Packet 1 traverses 4 links: 4 * d_trans + 4 * d_prop = 4 * 1.2 ms + 4 * 5 ms = 4.8 ms + 20 ms = 24.8 ms.",
                "Remaining (M - 1) = 1013 packets arrive one by one spaced by d_trans: 1013 * 1.2 ms = 1215.6 ms.",
                "Total End-to-End Delay = 24.8 ms + 1215.6 ms = 1240.4 ms = 1.2404 seconds.",
              ],
            },
            {
              type: "resources",
              heading: "5. References & Curated Study Materials",
              sources: [
                {
                  title: "Computer Networking: A Top-Down Approach (8th Edition)",
                  authors: "James F. Kurose, Keith W. Ross",
                  year: "2020",
                  publisher: "Pearson",
                  link: "https://www.pearson.com",
                  relevance:
                    "Chapter 1: Computer Networks and the Internet — standard academic source for nodal delay calculations and queuing models.",
                },
                {
                  title: "Data Communications and Networking (5th Edition)",
                  authors: "Behrouz A. Forouzan",
                  year: "2012",
                  publisher: "McGraw-Hill",
                  link: "https://www.mheducation.com",
                  relevance:
                    "Chapter 2: Network Models — comprehensive diagrams of OSI 7-layer architecture and SAP data encapsulation.",
                },
              ],
              videos: [
                {
                  title: "Transmission Delay vs Propagation Delay Numerical Tricks",
                  creator: "Gate Smashers",
                  duration: "14 mins",
                  url: "https://www.youtube.com/playlist?list=PLxCzCOWd7aiGShFormBZvhs6quW3hVgTL",
                  whyThisHelps:
                    "Quick derivation of store-and-forward formulas and packet pipeline timing diagrams.",
                },
                {
                  title: "OSI Model vs TCP/IP Architecture Explained",
                  creator: "Neso Academy",
                  duration: "16 mins",
                  url: "https://www.youtube.com/playlist?list=PLBlnK6fEyqRgMCUAG0XRw78UA8qnv6jEx",
                  whyThisHelps:
                    "Visual step-by-step whiteboard lecture on header encapsulation across all protocol layers.",
                },
              ],
            },
          ],
        },
      ],
    },

    // =========================================================================
    // MODULE 2: DATA LINK LAYER & ERROR CONTROL
    // =========================================================================
    {
      id: "cn-module-2-data-link-and-error-control",
      title: "Module 2: Data Link Layer, Error Detection & Correction",
      slug: "data-link-and-error-control",
      description:
        "Framing methods, bit-stuffing, checksum, Cyclic Redundancy Check (CRC) polynomial arithmetic, and Hamming distance bounds.",
      order: 2,
      lessons: [
        {
          id: "framing-and-crc-error-detection",
          title: "Framing, Bit Stuffing & Cyclic Redundancy Check (CRC)",
          slug: "framing-and-crc-error-detection",
          order: 1,
          estimatedMinutes: 24,
          tagline: "Flag bytes, HDLC bit-stuffing, and binary modulo-2 CRC division.",
          hasInteractive: false,
          hasGATE: true,
          hasPractice: true,
          sections: [
            {
              type: "explanation",
              heading: "1. Framing Techniques & Bit Stuffing",
              body: [
                "The Data Link Layer encapsulates network datagrams into distinct frames. To delimit frame boundaries, modern protocols use byte stuffing (character-oriented) or bit stuffing (bit-oriented).",
                "HDLC Bit Stuffing Rule: HDLC frames begin and end with the special flag byte 01111110 (0x7E, six consecutive 1s). Whenever the transmitting hardware detects five consecutive 1s in the user data stream, it automatically inserts ('stuffs') an extra 0 bit into the output stream. The receiver hardware detects five consecutive 1s followed by a 0 and automatically discards the stuffed 0 bit.",
                "If the receiver detects five 1s followed by a 1 and then a 0, it recognizes the valid end-of-frame flag (01111110). If it detects seven consecutive 1s, it flags a physical channel transmission error.",
              ],
              callout: {
                kind: "gate-tip",
                title: "GATE Bit Stuffing Trick",
                message:
                  "Always count consecutive 1s strictly from left to right. When five 1s are encountered, insert a 0 immediately, and restart the counting sequence after that stuffed 0.",
              },
            },
            {
              type: "explanation",
              heading: "2. Cyclic Redundancy Check (CRC) Polynomial Mathematics",
              body: [
                "CRC is the most powerful hardware error-detecting code in modern data link protocols (Ethernet uses CRC-32). It treats bit sequences as polynomials with coefficients in Galois Field GF(2).",
                "Modulo-2 Arithmetic: Addition and subtraction in GF(2) are identical and correspond to the bitwise XOR operation (no carries and no borrows): 0 + 0 = 0, 0 + 1 = 1, 1 + 0 = 1, 1 + 1 = 0.",
                "CRC Algorithm Steps:",
                "1. Let the original data bit sequence be D (length k bits), and let the agreed Generator Polynomial be G(x) of degree r (length r + 1 bits).",
                "2. Append r zeros to the right of the data bits D: D' = D * 2^r.",
                "3. Perform modulo-2 binary division of D' by G. The resulting remainder R has degree at most r - 1 (length r bits).",
                "4. Transmit the codeword T = D' XOR R. At the receiver, dividing T by G yields a remainder of exactly 0 if no errors occurred.",
              ],
            },
            {
              type: "gate-analysis",
              heading: "3. GATE Worked Numerical: CRC Remainder & Transmitted Codeword",
              weightage: "2 Marks (Compulsory in GATE CS)",
              trap: "If generator polynomial G(x) = x^3 + x + 1, its degree is 3! That means you MUST append exactly 3 zeros to the data, and the generator binary bit string has 4 bits: 1011.",
              solutionSteps: [
                "Problem: Given Data = 110101 and Generator G(x) = x^3 + x + 1. Find the CRC remainder and the transmitted bit frame.",
                "Step 1: Write G(x) as binary: G(x) = 1*x^3 + 0*x^2 + 1*x^1 + 1*x^0 -> Generator bits = 1011 (degree r = 3).",
                "Step 2: Append r = 3 zeros to Data: Dividend = 110101 000 (total 9 bits).",
                "Step 3: Modulo-2 division (XOR subtraction):",
                "  110101000 divided by 1011:",
                "  1101 XOR 1011 = 0110 -> bring down 0 -> 1100",
                "  1100 XOR 1011 = 0111 -> bring down 1 -> 1111",
                "  1111 XOR 1011 = 0100 -> bring down 0 -> 1000",
                "  1000 XOR 1011 = 0011 -> bring down 0 -> 0110",
                "  0110 has degree < 3 -> bring down 0 -> 110 (degree 2).",
                "Final Remainder R = 110 (3 bits).",
                "Step 4: Transmitted Codeword T = Data appended with Remainder = 110101 110.",
              ],
            },
            {
              type: "explanation",
              heading: "4. Hamming Distance & Error Detection/Correction Bounds",
              body: [
                "Hamming Distance d(c1, c2) between two binary codewords of equal length is the number of bit positions in which they differ (the number of 1s in c1 XOR c2).",
                "Minimum Hamming Distance d_min of a code is the smallest Hamming distance between any pair of valid codewords in the code.",
                "Theorem 1 (Error Detection): To detect up to e bit errors in any transmitted codeword, the code must satisfy: d_min >= e + 1.",
                "Theorem 2 (Error Correction): To correct up to t bit errors in any transmitted codeword, the code must satisfy: d_min >= 2t + 1.",
              ],
              callout: {
                kind: "gate-tip",
                title: "GATE Formula Check",
                message:
                  "To detect 3 errors: d_min >= 3 + 1 = 4. To correct 2 errors: d_min >= 2(2) + 1 = 5. To detect e errors and simultaneously correct t errors (where e > t): d_min >= e + t + 1.",
              },
            },
            {
              type: "resources",
              heading: "5. References & Curated Study Materials",
              sources: [
                {
                  title: "Computer Networks (5th Edition)",
                  authors: "Andrew S. Tanenbaum, David J. Wetherall",
                  year: "2011",
                  publisher: "Pearson",
                  link: "https://www.pearson.com",
                  relevance:
                    "Chapter 3: The Data Link Layer — definitive mathematical proofs of polynomial division and Hamming code parity bit positions.",
                },
              ],
              videos: [
                {
                  title: "Cyclic Redundancy Check (CRC) Modulo-2 Division",
                  creator: "Neso Academy",
                  duration: "18 mins",
                  url: "https://www.youtube.com/playlist?list=PLBlnK6fEyqRgMCUAG0XRw78UA8qnv6jEx",
                  whyThisHelps:
                    "Step-by-step whiteboard calculation of CRC polynomials, undetected error properties, and generator constraints.",
                },
              ],
            },
          ],
        },
      ],
    },

    // =========================================================================
    // MODULE 3: FLOW CONTROL & SLIDING WINDOW
    // =========================================================================
    {
      id: "cn-module-3-flow-control-and-sliding-window",
      title: "Module 3: Flow Control & Sliding Window Protocols",
      slug: "flow-control-and-sliding-window",
      description:
        "Stop-and-Wait ARQ, Go-Back-N (GBN), Selective Repeat (SR), window size limits, link utilization, and sequence number bit requirements.",
      order: 3,
      lessons: [
        {
          id: "sliding-window-protocols-and-efficiency",
          title: "Sliding Window: Stop-and-Wait, Go-Back-N & Selective Repeat",
          slug: "sliding-window-protocols-and-efficiency",
          order: 1,
          estimatedMinutes: 26,
          tagline: "Window sizes, link efficiency eta = W / (1 + 2a), and timer retransmissions.",
          hasInteractive: false,
          hasGATE: true,
          hasPractice: true,
          sections: [
            {
              type: "explanation",
              heading: "1. The Stop-and-Wait Protocol & Fundamental Efficiency",
              body: [
                "In Stop-and-Wait ARQ, the sender transmits a single frame and halts until an acknowledgment (ACK) is received from the receiver. If a timer expires before the ACK arrives, the sender retransmits the frame.",
                "Total Round-Trip Cycle Time T_cycle = T_t + 2 * T_p + T_proc + T_ack.",
                "Assuming processing delay T_proc approx 0 and ACK frame transmission delay T_ack approx 0: T_cycle = T_t + 2 * T_p.",
                "Link Efficiency (Utilization) eta = Useful Time / Total Time = T_t / (T_t + 2 * T_p) = 1 / (1 + 2a), where a = T_p / T_t = (Propagation Delay) / (Transmission Delay).",
                "Throughput = eta * Bandwidth = (Size of Frame) / (T_t + 2 * T_p).",
              ],
              callout: {
                kind: "gate-tip",
                title: "Impact of High Bandwidth-Delay Product",
                message:
                  "On satellite links or high-speed fiber where propagation delay T_p is huge compared to transmission delay T_t (i.e., a >> 1), Stop-and-Wait efficiency collapses near 0%! Pipelined sliding window protocols are essential.",
              },
            },
            {
              type: "comparison",
              heading: "2. Sliding Window Architectural Comparison: GBN vs Selective Repeat",
              leadParagraph:
                "Detailed comparison of window bounds, receiver buffering, acknowledgment types, and retransmission behavior:",
              columns: ["Feature", "Go-Back-N (GBN)", "Selective Repeat (SR)"],
              criteria: [
                {
                  criterion: "Sender Window Size (W_s)",
                  values: ["W_s <= 2^k - 1 (for k-bit sequence numbers)", "W_s <= 2^(k - 1)"],
                },
                {
                  criterion: "Receiver Window Size (W_r)",
                  values: ["W_r = 1 (strictly accepts in-order only)", "W_r = W_s <= 2^(k - 1)"],
                },
                {
                  criterion: "Window Sum Condition",
                  values: ["W_s + W_r <= 2^k (W_s + 1 <= 2^k)", "W_s + W_r <= 2^k (W_s = W_r = 2^(k-1))"],
                },
                {
                  criterion: "Out-of-Order Frames",
                  values: ["Discarded completely (not buffered)", "Buffered in receiver window until gap is filled"],
                },
                {
                  criterion: "Acknowledgment Type",
                  values: ["Cumulative ACK (ACK n confirms all frames <= n)", "Individual Selective ACK (NACK / SACK)"],
                },
                {
                  criterion: "Retransmission on Timeout",
                  values: ["Retransmits entire window of unacknowledged frames", "Retransmits ONLY the single lost frame"],
                },
                {
                  criterion: "Hardware Complexity",
                  values: ["Low (no receiver buffer needed)", "High (sorting buffer, individual timers per frame)"],
                },
              ],
            },
            {
              type: "gate-analysis",
              heading: "3. GATE Worked Numerical: 100% Link Utilization & Sequence Number Bits",
              weightage: "2 Marks (Most Frequent CN Numerical in GATE)",
              trap: "In Go-Back-N, if optimal window size is W, you need at least W + 1 distinct sequence numbers! Sequence bits k = ceil(log2(W + 1)). In Selective Repeat, k = ceil(log2(2 * W)).",
              solutionSteps: [
                "Problem: A 1000 km link has bandwidth B = 100 Mbps and propagation speed s = 2 * 10^8 m/s. Frame size L = 1000 bytes. Find:",
                "1. Stop-and-Wait efficiency.",
                "2. Minimum sender window size W_s to achieve 100% link utilization.",
                "3. Minimum sequence number bits required for GBN and Selective Repeat.",
                "Step 1: Compute T_t and T_p:",
                "T_t = (1000 * 8 bits) / (100 * 10^6 bps) = 8,000 / 100,000,000 = 0.08 ms = 80 microseconds.",
                "T_p = Distance / Speed = 1000 * 10^3 m / (2 * 10^8 m/s) = 5 * 10^-3 s = 5 ms.",
                "a = T_p / T_t = 5 ms / 0.08 ms = 62.5.",
                "Step 2: Stop-and-Wait Efficiency eta = 1 / (1 + 2a) = 1 / (1 + 125) = 1 / 126 approx 0.00794 (0.79%).",
                "Step 3: For 100% utilization: Efficiency eta = 1 => W_s >= 1 + 2a = 1 + 125 = 126 frames.",
                "Step 4: Sequence number bits:",
                "For Go-Back-N: Total sequence numbers N >= W_s + 1 = 126 + 1 = 127. k = ceil(log2 127) = 7 bits.",
                "For Selective Repeat: Total sequence numbers N >= 2 * W_s = 2 * 126 = 252. k = ceil(log2 252) = 8 bits.",
              ],
            },
            {
              type: "resources",
              heading: "4. References & Curated Study Materials",
              sources: [
                {
                  title: "Data Communications and Networking (5th Edition)",
                  authors: "Behrouz A. Forouzan",
                  year: "2012",
                  publisher: "McGraw-Hill",
                  link: "https://www.mheducation.com",
                  relevance:
                    "Chapter 11: Data Link Control — detailed timeline diagrams of Go-Back-N and Selective Repeat window slides under lost frame scenarios.",
                },
              ],
              videos: [
                {
                  title: "Sliding Window Protocol Efficiency & Sequence Bits GATE Numericals",
                  creator: "Gate Smashers",
                  duration: "20 mins",
                  url: "https://www.youtube.com/playlist?list=PLxCzCOWd7aiGShFormBZvhs6quW3hVgTL",
                  whyThisHelps:
                    "Comprehensive derivation of 1 + 2a formulas and sequence number bit-count traps.",
                },
              ],
            },
          ],
        },
      ],
    },

    // =========================================================================
    // MODULE 4: MAC & ETHERNET
    // =========================================================================
    {
      id: "cn-module-4-mac-and-ethernet",
      title: "Module 4: Medium Access Control (MAC) & Ethernet",
      slug: "mac-and-ethernet",
      description:
        "Random access protocols (Pure ALOHA, Slotted ALOHA), CSMA/CD, CSMA/CA, Ethernet frame format, and minimum frame size constraints.",
      order: 4,
      lessons: [
        {
          id: "csma-cd-and-ethernet-frame",
          title: "CSMA/CD Collision Detection & Minimum Frame Size",
          slug: "csma-cd-and-ethernet-frame",
          order: 1,
          estimatedMinutes: 22,
          tagline: "L >= 2 * T_p * Bandwidth, binary exponential backoff, and collision domains.",
          hasInteractive: false,
          hasGATE: true,
          hasPractice: true,
          sections: [
            {
              type: "explanation",
              heading: "1. Evolution of Random Access: ALOHA to CSMA/CD",
              body: [
                "In broadcast channels where multiple stations share a single physical medium, Medium Access Control (MAC) protocols arbitrate who transmits.",
                "1. Pure ALOHA: Stations transmit whenever they have data. If two frames overlap even by a single bit, a collision occurs. Vulnerable time = 2 * T_fr. Maximum throughput S_max = 1 / (2e) approx 18.4% (at traffic load G = 0.5).",
                "2. Slotted ALOHA: Time is partitioned into discrete slots of length T_fr. Stations can only begin transmitting at the beginning of a time slot. Vulnerable time = T_fr. Maximum throughput S_max = 1 / e approx 36.8% (at G = 1).",
                "3. CSMA (Carrier Sense Multiple Access): 'Listen before talk'. Stations sense the channel first: 1-persistent (transmits immediately when idle; causes collision if two are waiting), Non-persistent (waits random time before sensing again if busy), p-persistent (transmits with probability p in next slot).",
                "4. CSMA/CD: 'Listen before talk and listen while talking'. As soon as a collision is detected during transmission, the station aborts immediately and broadcasts a 32-bit jam signal to notify all stations.",
              ],
            },
            {
              type: "gate-analysis",
              heading: "2. The Golden Rule of CSMA/CD: Minimum Frame Size Derivation",
              weightage: "2 Marks (Guaranteed GATE Topic)",
              trap: "A transmitting station MUST continue transmitting until the round-trip signal has had time to return. If the frame is too short, the transmission finishes before the collision signal returns, and the collision goes undetected!",
              solutionSteps: [
                "Worst-Case Scenario: Station A and Station B are at opposite ends of a cable separated by propagation delay T_p.",
                "At t = 0: Station A starts transmitting.",
                "At t = T_p - epsilon: Just before A's signal reaches B, Station B senses an idle line and starts transmitting.",
                "Immediately at t = T_p: A collision occurs near B.",
                "The collision signal takes another T_p to travel back to A.",
                "Station A receives the collision signal at time t = 2 * T_p.",
                "To detect this collision while still transmitting, Transmission Time T_t must be AT LEAST 2 * T_p: T_t >= 2 * T_p.",
                "Since T_t = L / Bandwidth (B): L / B >= 2 * T_p => L_min = 2 * T_p * B.",
                "Standard 10 Mbps Ethernet: Round-trip time 2 * T_p = 51.2 microseconds. L_min = (10 * 10^6 bps) * (51.2 * 10^-6 s) = 512 bits = 64 bytes!",
              ],
            },
            {
              type: "explanation",
              heading: "3. Binary Exponential Backoff Algorithm",
              body: [
                "After a collision in CSMA/CD, the transmitting station waits for a random backoff time before attempting retransmission.",
                "Algorithm: After collision number n (1 <= n <= 15):",
                "1. Set k = min(n, 10).",
                "2. Pick an integer r uniformly at random from the range [0, 2^k - 1].",
                "3. Wait for backoff duration T_backoff = r * Slot_Time (where Slot_Time = 2 * T_p = 51.2 microseconds in standard Ethernet).",
                "4. After 16 consecutive collisions, the station aborts transmission and reports a network failure to higher layers.",
              ],
              callout: {
                kind: "gate-tip",
                title: "GATE Backoff Probability Trap",
                message:
                  "What is the probability that two colliding stations pick the SAME backoff slot after collision n = 2? Range is [0, 2^2 - 1] = [0, 3] (4 choices). Total outcomes = 4 * 4 = 16. Matching pairs = 4. Probability = 4 / 16 = 1/4 = 1 / (2^k).",
              },
            },
            {
              type: "resources",
              heading: "4. References & Curated Study Materials",
              sources: [
                {
                  title: "Computer Networks (5th Edition)",
                  authors: "Andrew S. Tanenbaum, David J. Wetherall",
                  year: "2011",
                  publisher: "Pearson",
                  link: "https://www.pearson.com",
                  relevance:
                    "Chapter 4: The Medium Access Control Sublayer — classic analytical derivations of ALOHA throughput and CSMA/CD slot times.",
                },
              ],
              videos: [
                {
                  title: "CSMA/CD Minimum Frame Size & Backoff Algorithm Solved Examples",
                  creator: "Gate Smashers",
                  duration: "17 mins",
                  url: "https://www.youtube.com/playlist?list=PLxCzCOWd7aiGShFormBZvhs6quW3hVgTL",
                  whyThisHelps:
                    "Clear graphical proofs of why transmission time must equal round trip propagation delay.",
                },
              ],
            },
          ],
        },
      ],
    },

    // =========================================================================
    // MODULE 5: NETWORK LAYER & IPV4
    // =========================================================================
    {
      id: "cn-module-5-network-layer-and-ipv4",
      title: "Module 5: Network Layer, IPv4 Addressing & CIDR Subnetting",
      slug: "network-layer-and-ipv4",
      description:
        "IPv4 header format, IP packet fragmentation, classful addressing, CIDR prefixes, subnet masks, and NAT translation tables.",
      order: 5,
      lessons: [
        {
          id: "ipv4-fragmentation-and-cidr-subnetting",
          title: "IPv4 Header, Packet Fragmentation & CIDR Subnetting",
          slug: "ipv4-fragmentation-and-cidr-subnetting",
          order: 1,
          estimatedMinutes: 28,
          tagline: "Header fields, MTU fragmentation offsets, and VLSM network bit masks.",
          hasInteractive: false,
          hasGATE: true,
          hasPractice: true,
          sections: [
            {
              type: "explanation",
              heading: "1. IPv4 Header Fields: Crucial Exam Dimensions",
              body: [
                "The IPv4 header has a variable length: 20 bytes (minimum, when Options field is empty) up to 60 bytes (maximum, when Options field is 40 bytes).",
                "Key Header Fields:",
                "1. HLEN (Header Length, 4 bits): Expressed in 4-byte (32-bit) words. Minimum value is 5 (5 * 4 = 20 bytes). Maximum value is 15 (15 * 4 = 60 bytes).",
                "2. Total Length (16 bits): Entire IP datagram size (Header + Data) in bytes. Maximum theoretical datagram size = 2^16 - 1 = 65,535 bytes.",
                "3. TTL (Time to Live, 8 bits): Hop counter decremented by 1 at each router. When TTL reaches 0, router drops the packet and sends an ICMP Time Exceeded (Type 11) message back to the sender.",
                "4. Protocol (8 bits): Multiplexing identifier for higher layer: 1 = ICMP, 2 = IGMP, 6 = TCP, 17 = UDP, 89 = OSPF.",
                "5. Fragmentation Fields: Identification (16 bits), Flags (3 bits: Reserved, DF, MF), Fragment Offset (13 bits).",
              ],
              callout: {
                kind: "gate-tip",
                title: "The 8-Byte Offset Scale Factor",
                message:
                  "Because the Fragment Offset field is only 13 bits (range 0 to 8191) while the datagram can be 65,535 bytes long, the offset is measured in units of 8-BYTE BLOCKS! Every fragment data payload MUST be an exact multiple of 8 bytes (except the final fragment).",
              },
            },
            {
              type: "gate-analysis",
              heading: "2. GATE Step-by-Step Numerical: IP Datagram Fragmentation",
              weightage: "2 Marks (Compulsory in GATE CS)",
              trap: "Remember to subtract the 20-byte IP header from the link MTU to determine maximum payload per fragment, and ensure payload is divisible by 8!",
              solutionSteps: [
                "Problem: An IPv4 datagram of Total Length = 4000 bytes (with 20-byte IP header) arrives at a router whose output interface has an MTU (Maximum Transmission Unit) of 1500 bytes. Calculate the number of fragments, their sizes, DF/MF flags, and fragment offsets.",
                "Step 1: Total Data Payload = 4000 - 20 = 3980 bytes.",
                "Step 2: Maximum payload per fragment = MTU - Header = 1500 - 20 = 1480 bytes. Since 1480 / 8 = 185 (exact integer), 1480 is valid.",
                "Step 3: Fragment generation:",
                "  Fragment 1: Payload = 1480 bytes (bytes 0 to 1479). Total Length = 1500 bytes. MF = 1. Offset = 0 / 8 = 0.",
                "  Fragment 2: Payload = 1480 bytes (bytes 1480 to 2959). Total Length = 1500 bytes. MF = 1. Offset = 1480 / 8 = 185.",
                "  Fragment 3: Remaining Payload = 3980 - (1480 + 1480) = 1020 bytes (bytes 2960 to 3979). Total Length = 1020 + 20 = 1040 bytes. MF = 0 (last fragment!). Offset = 2960 / 8 = 370.",
                "Summary: 3 fragments with Offsets [0, 185, 370] and MF flags [1, 1, 0].",
              ],
            },
            {
              type: "explanation",
              heading: "3. CIDR (Classless Inter-Domain Routing) & Subnet Mathematics",
              body: [
                "Classless addressing uses CIDR notation: a.b.c.d / n, where n is the prefix length (number of contiguous 1s in the subnet mask, 0 <= n <= 32).",
                "Formulas for /n Block:",
                "1. Subnet Mask: n bits of 1s followed by (32 - n) bits of 0s.",
                "2. Host bits h = 32 - n.",
                "3. Total IP addresses in block = 2^h = 2^(32 - n).",
                "4. Usable Host addresses = 2^h - 2 (subtracting Network Address where host bits are all 0s, and Direct Broadcast Address where host bits are all 1s).",
                "5. Network Address: IP address bitwise-AND Subnet Mask.",
                "6. Broadcast Address: Network Address with all h host bits set to 1.",
              ],
            },
            {
              type: "gate-analysis",
              heading: "4. GATE Worked Numerical: Subnet Mask & Usable IP Range",
              weightage: "1-2 Marks",
              trap: "Always check which octet the prefix split falls into. For /26, 26 = 8 + 8 + 8 + 2, so the boundary is in the 4th octet with 2 subnet bits and 6 host bits.",
              solutionSteps: [
                "Problem: An ISP assigns host IP 198.51.100.142 / 27. Find the Subnet Mask, Network ID, Broadcast ID, and the range of usable host addresses.",
                "Step 1: Prefix /27 means 27 ones: 11111111.11111111.11111111.11100000 -> Subnet Mask = 255.255.255.224.",
                "Step 2: Host bits h = 32 - 27 = 5 bits. Block size = 2^5 = 32 addresses.",
                "Step 3: Analyze 4th octet (142 in binary = 10001110):",
                "  142 / 32 = 4 with remainder 14.",
                "  Block begins at 4 * 32 = 128 (10000000).",
                "  Network Address = 198.51.100.128.",
                "Step 4: Block ends at 128 + 32 - 1 = 159 (10011111).",
                "  Direct Broadcast Address = 198.51.100.159.",
                "Step 5: Usable Host IP Range = 198.51.100.129 to 198.51.100.158 (Total = 32 - 2 = 30 usable hosts).",
              ],
            },
            {
              type: "resources",
              heading: "5. References & Curated Study Materials",
              sources: [
                {
                  title: "Computer Networking: A Top-Down Approach (8th Edition)",
                  authors: "James F. Kurose, Keith W. Ross",
                  year: "2020",
                  publisher: "Pearson",
                  link: "https://www.pearson.com",
                  relevance:
                    "Chapter 4: The Network Layer: Data Plane — standard reference for IPv4 header fields, fragmentation algorithm, and CIDR hierarchical address allocation.",
                },
              ],
              videos: [
                {
                  title: "IPv4 Fragmentation Offsets & MF Flag Numerical Shortcuts",
                  creator: "Gate Smashers",
                  duration: "16 mins",
                  url: "https://www.youtube.com/playlist?list=PLxCzCOWd7aiGShFormBZvhs6quW3hVgTL",
                  whyThisHelps:
                    "Quick intuitive method for solving MTU fragmentation puzzles without calculation mistakes.",
                },
                {
                  title: "Subnetting and CIDR Full Concept with Worked Examples",
                  creator: "Neso Academy",
                  duration: "24 mins",
                  url: "https://www.youtube.com/playlist?list=PLBlnK6fEyqRgMCUAG0XRw78UA8qnv6jEx",
                  whyThisHelps:
                    "Systematic breakdown of FLSM vs VLSM and bit-splitting for host/network boundaries.",
                },
              ],
            },
          ],
        },
      ],
    },

    // =========================================================================
    // MODULE 6: ROUTING ALGORITHMS
    // =========================================================================
    {
      id: "cn-module-6-routing-algorithms",
      title: "Module 6: Routing Protocols & Algorithms",
      slug: "routing-algorithms",
      description:
        "Distance Vector Routing (Bellman-Ford, Count to Infinity, Split Horizon), Link State Routing (Dijkstra SPF, OSPF), and BGP path vector fundamentals.",
      order: 6,
      lessons: [
        {
          id: "distance-vector-vs-link-state",
          title: "Distance Vector vs Link State Routing: Algorithms & Traps",
          slug: "distance-vector-vs-link-state",
          order: 1,
          estimatedMinutes: 24,
          tagline: "Bellman-Ford updates, count-to-infinity, split horizon, and Dijkstra SPF.",
          hasInteractive: false,
          hasGATE: true,
          hasPractice: true,
          sections: [
            {
              type: "explanation",
              heading: "1. Distance Vector Routing & Bellman-Ford Principle",
              body: [
                "Distance Vector is a decentralized routing algorithm where each router maintains a table (vector) of minimum distances to all known destinations. Periodically (e.g., every 30s in RIP), each node sends its entire routing table ONLY to its immediate neighbors.",
                "Bellman-Ford Equation: Let D_x(y) be the cost of the least-cost path from node x to node y. D_x(y) = min_v { c(x, v) + D_v(y) }, where the minimum is taken over all neighbors v of x, and c(x, v) is the direct link cost from x to v.",
                "The Count-to-Infinity Problem: Good news travels fast, but bad news travels agonizingly slow. When a link breaks (cost increases to infinity), adjacent routers may exchange outdated mutual vectors, incrementing distance by 1 at each iteration until reaching infinity (RIP defines infinity as 16 hops).",
                "Mitigations: Split Horizon (never advertise a route back out the same interface through which it was learned) and Poison Reverse (actively advertise a distance of infinity back to the next-hop neighbor).",
              ],
            },
            {
              type: "comparison",
              heading: "2. Routing Paradigm Comparison: Distance Vector vs Link State",
              leadParagraph:
                "Core architectural differences between RIP (Distance Vector) and OSPF (Link State):",
              columns: ["Dimension", "Distance Vector (RIP)", "Link State (OSPF)"],
              criteria: [
                {
                  criterion: "Underlying Algorithm",
                  values: ["Distributed Bellman-Ford equation", "Dijkstra Shortest Path First (SPF)"],
                },
                {
                  criterion: "Knowledge Scope",
                  values: ["Tells neighbors about the entire world", "Tells the entire world about its local neighbors"],
                },
                {
                  criterion: "Topology Awareness",
                  values: ["Has NO map of full network; routes on hearsay", "Every router builds complete identical network graph"],
                },
                {
                  criterion: "Convergence Speed",
                  values: ["Slow (susceptible to routing loops)", "Fast (no count-to-infinity issue)"],
                },
                {
                  criterion: "Message Overhead",
                  values: ["Periodic broadcasts of full routing tables", "Triggered Link State Advertisements (LSA)"],
                },
                {
                  criterion: "Metric",
                  values: ["Hop count (maximum 15 hops; 16 = infinity)", "Cost based on reference bandwidth (100 Mbps / Bandwidth)"],
                },
              ],
            },
            {
              type: "gate-analysis",
              heading: "3. GATE Worked Numerical: Distance Vector Routing Table Update",
              weightage: "2 Marks",
              trap: "When applying Bellman-Ford update from neighbor vector, don't forget to ADD the link cost to that neighbor before comparing against current known distance!",
              solutionSteps: [
                "Problem: Node X is connected to neighbors A, B, and C with direct link costs: c(X, A) = 2, c(X, B) = 5, c(X, C) = 1.",
                "Node X receives distance vectors from A, B, and C with costs to destination D:",
                "  D_A(D) = 6,  D_B(D) = 2,  D_C(D) = 8.",
                "Compute X's new minimum distance to destination D and the next-hop router.",
                "Step 1: Compute candidate costs through each neighbor:",
                "  Path via A: c(X, A) + D_A(D) = 2 + 6 = 8.",
                "  Path via B: c(X, B) + D_B(D) = 5 + 2 = 7.",
                "  Path via C: c(X, C) + D_C(D) = 1 + 8 = 9.",
                "Step 2: D_X(D) = min(8, 7, 9) = 7.",
                "Step 3: Minimum cost is 7 via neighbor B. Node X updates its routing table entry for destination D: Cost = 7, Next Hop = B.",
              ],
            },
            {
              type: "resources",
              heading: "4. References & Curated Study Materials",
              sources: [
                {
                  title: "Computer Networks: A Systems Approach (6th Edition)",
                  authors: "Larry L. Peterson, Bruce S. Davie",
                  year: "2021",
                  publisher: "Morgan Kaufmann",
                  link: "https://book.systemsapproach.org",
                  relevance:
                    "Chapter 3: Routing — excellent mathematical dissection of routing loops and link-state flooding mechanisms.",
                },
              ],
              videos: [
                {
                  title: "Distance Vector Routing & Count to Infinity Solution",
                  creator: "Gate Smashers",
                  duration: "18 mins",
                  url: "https://www.youtube.com/playlist?list=PLxCzCOWd7aiGShFormBZvhs6quW3hVgTL",
                  whyThisHelps:
                    "Animated tracing of table convergence, split horizon, and poison reverse.",
                },
              ],
            },
          ],
        },
      ],
    },

    // =========================================================================
    // MODULE 7: TRANSPORT LAYER & TCP
    // =========================================================================
    {
      id: "cn-module-7-transport-layer-and-tcp",
      title: "Module 7: Transport Layer, TCP Flow & Congestion Control",
      slug: "transport-layer-and-tcp",
      description:
        "UDP vs TCP, 3-way handshake, connection termination, flow control, and TCP congestion algorithms (Slow Start, Congestion Avoidance, Fast Recovery).",
      order: 7,
      lessons: [
        {
          id: "tcp-connection-and-congestion-control",
          title: "TCP Handshake, Flow Control & Congestion Control",
          slug: "tcp-connection-and-congestion-control",
          order: 1,
          estimatedMinutes: 26,
          tagline: "SYN/ACK sequence tracking, advertised window, cwnd and ssthresh dynamics.",
          hasInteractive: false,
          hasGATE: true,
          hasPractice: true,
          sections: [
            {
              type: "explanation",
              heading: "1. TCP Connection Management: 3-Way Handshake & Teardown",
              body: [
                "TCP is a connection-oriented, reliable, byte-stream transport protocol. Before application data flows, a 3-way handshake establishes sequence numbers and buffer parameters:",
                "1. Step 1 (Client -> Server): Client sends SYN segment (SYN=1, ACK=0) with initial sequence number seq = x. Consumes 1 sequence number.",
                "2. Step 2 (Server -> Client): Server responds with SYN+ACK segment (SYN=1, ACK=1) with its own initial sequence number seq = y and acknowledgment ack = x + 1. Consumes 1 sequence number.",
                "3. Step 3 (Client -> Server): Client sends ACK segment (SYN=0, ACK=1) with seq = x + 1 and ack = y + 1. May carry payload.",
                "Connection Teardown (Modified 4-Way Handshake): Either end can initiate termination by sending a FIN segment. The receiving side sends ACK (half-close), finishes transmitting its remaining data, and sends its own FIN segment. The initiator acknowledges with ACK and enters the TIME_WAIT state (2 * MSL = Maximum Segment Lifetime, typically 2 minutes) to ensure the final ACK arrives.",
              ],
            },
            {
              type: "explanation",
              heading: "2. TCP Congestion Control Architecture: Tahoe vs Reno",
              body: [
                "TCP regulates its sending rate dynamically using two state variables: cwnd (Congestion Window, maintained by sender) and rwnd (Receiver Advertised Window, sent in TCP header).",
                "Actual Transmission Window W = min(cwnd, rwnd).",
                "The three main phases of TCP congestion control are:",
                "1. Slow Start: cwnd starts at 1 MSS (Maximum Segment Size). For EVERY ACK received, cwnd increases by 1 MSS. Thus, over each RTT, cwnd DOUBLES exponentially: 1 -> 2 -> 4 -> 8 -> 16... until cwnd >= ssthresh (Slow Start Threshold).",
                "2. Congestion Avoidance: Once cwnd reaches ssthresh, cwnd increases LINEARLY by 1 MSS per RTT (Additive Increase: cwnd = cwnd + 1/cwnd per ACK).",
                "3. Multiplicative Decrease on Packet Loss:",
                "  Case A — Loss detected by Timeout: Severe congestion! Set ssthresh = max(cwnd / 2, 2 MSS). Set cwnd = 1 MSS. Re-enter Slow Start.",
                "  Case B — Loss detected by 3 Duplicate ACKs (Fast Retransmit): Mild congestion! Retransmit missing segment immediately without waiting for timeout.",
                "  In TCP Tahoe: Set ssthresh = cwnd / 2; reset cwnd = 1 MSS (enters Slow Start).",
                "  In TCP Reno (Fast Recovery): Set ssthresh = cwnd / 2; set cwnd = ssthresh + 3 MSS; then continue Congestion Avoidance (linear growth). Avoids slow-start penalty!",
              ],
            },
            {
              type: "gate-analysis",
              heading: "3. GATE Worked Numerical: TCP cwnd Evolution & Threshold Calculation",
              weightage: "2 Marks (High Frequency)",
              trap: "Check whether loss is due to TIMEOUT or 3 DUPLICATE ACKs, and whether the question specifies TCP Tahoe or TCP Reno!",
              solutionSteps: [
                "Problem: A TCP connection has initial ssthresh = 16 MSS. cwnd starts at 1 MSS. A timeout occurs during transmission round 7. Find the value of ssthresh and cwnd in round 8, 9, and 10.",
                "Step 1: Trace cwnd per round from start (Slow Start doubles cwnd every RTT until ssthresh):",
                "  Round 1: cwnd = 1 MSS",
                "  Round 2: cwnd = 2 MSS",
                "  Round 3: cwnd = 4 MSS",
                "  Round 4: cwnd = 8 MSS",
                "  Round 5: cwnd = 16 MSS (reaches ssthresh = 16! Switches to Congestion Avoidance)",
                "  Round 6: cwnd = 17 MSS (additive increase +1)",
                "  Round 7: cwnd = 18 MSS -> TIMEOUT OCCURS!",
                "Step 2: On Timeout in Round 7:",
                "  New ssthresh = cwnd / 2 = 18 / 2 = 9 MSS.",
                "  New cwnd resets to 1 MSS.",
                "Step 3: Continue tracing from Round 8:",
                "  Round 8: cwnd = 1 MSS (Slow Start, doubles each RTT)",
                "  Round 9: cwnd = 2 MSS",
                "  Round 10: cwnd = 4 MSS",
                "  Round 11: cwnd = 8 MSS",
                "  Round 12: cwnd = 9 MSS (hits new ssthresh = 9, switches to linear increase).",
              ],
            },
            {
              type: "resources",
              heading: "4. References & Curated Study Materials",
              sources: [
                {
                  title: "Computer Networking: A Top-Down Approach (8th Edition)",
                  authors: "James F. Kurose, Keith W. Ross",
                  year: "2020",
                  publisher: "Pearson",
                  link: "https://www.pearson.com",
                  relevance:
                    "Chapter 3: Transport Layer — definitive mathematical analysis of AIMD (Additive Increase Multiplicative Decrease) and TCP Reno Fast Recovery.",
                },
              ],
              videos: [
                {
                  title: "TCP Congestion Control (Slow Start, AIMD) GATE Numericals",
                  creator: "Gate Smashers",
                  duration: "22 mins",
                  url: "https://www.youtube.com/playlist?list=PLxCzCOWd7aiGShFormBZvhs6quW3hVgTL",
                  whyThisHelps:
                    "Crystal-clear round-by-round cwnd tracing for both timeout and 3-duplicate ACK scenarios.",
                },
              ],
            },
          ],
        },
      ],
    },

    // =========================================================================
    // MODULE 8: APPLICATION LAYER
    // =========================================================================
    {
      id: "cn-module-8-application-layer",
      title: "Module 8: Application Layer Protocols",
      slug: "application-layer",
      description:
        "DNS hierarchy and resolution (Iterative vs Recursive), HTTP persistent vs non-persistent RTT analysis, and electronic mail architecture (SMTP, POP3, IMAP).",
      order: 8,
      lessons: [
        {
          id: "dns-and-http-rtt-analysis",
          title: "DNS Resolution & HTTP RTT Delay Calculations",
          slug: "dns-and-http-rtt-analysis",
          order: 1,
          estimatedMinutes: 20,
          tagline: "Iterative vs recursive queries, HTTP/1.0 vs 1.1 pipelining, and RTT counting.",
          hasInteractive: false,
          hasGATE: true,
          hasPractice: true,
          sections: [
            {
              type: "explanation",
              heading: "1. The Domain Name System (DNS) Resolution Hierarchy",
              body: [
                "DNS is a distributed, hierarchical database mapped over UDP port 53 (and TCP port 53 for zone transfers or responses exceeding 512 bytes).",
                "Hierarchy of DNS Servers:",
                "1. Root DNS Servers (13 logical root server authorities worldwide, named a.root-servers.net to m.root-servers.net).",
                "2. Top-Level Domain (TLD) Servers: Responsible for generic (.com, .org, .edu) and country-code (.in, .uk, .jp) domains.",
                "3. Authoritative DNS Servers: The organization's own DNS server that provides definitive IP mappings for its hostnames.",
                "Resolution Modes:",
                "- Recursive Resolution: The client asks the Local DNS Server; if the local server doesn't know, it takes the burden of querying the hierarchy and returns the final answer directly to the client.",
                "- Iterative Resolution: The queried server replies with a referral pointer: 'I don't know the answer, but ask this TLD server next.' The client (or local resolver) repeatedly contacts each successive server.",
              ],
            },
            {
              type: "gate-analysis",
              heading: "2. GATE Worked Numerical: HTTP Persistent vs Non-Persistent RTTs",
              weightage: "2 Marks",
              trap: "Non-persistent HTTP requires a BRAND NEW TCP 3-way handshake for every individual referenced object! Persistent HTTP reuses the single established TCP connection.",
              solutionSteps: [
                "Problem: A web client fetches a page containing 1 base HTML text file and 10 referenced JPEG images located on the same server. Neglect transmission delay and DNS lookup time. Calculate total RTTs under:",
                "1. Non-persistent HTTP without parallel connections.",
                "2. Persistent HTTP without pipelining.",
                "3. Persistent HTTP with pipelining.",
                "Step 1: Non-Persistent HTTP without parallel connections:",
                "  Each object requires: 1 RTT for TCP Handshake + 1 RTT for HTTP Request/Response = 2 RTTs.",
                "  Total objects = 1 (base HTML) + 10 (images) = 11 objects.",
                "  Total Time = 11 * 2 RTT = 22 RTTs.",
                "Step 2: Persistent HTTP without pipelining:",
                "  Base HTML: 1 RTT (TCP Handshake) + 1 RTT (HTML fetch) = 2 RTTs.",
                "  TCP connection stays OPEN. Client sends a request for image 1, waits 1 RTT for image 1 to arrive, then requests image 2...",
                "  Each of the 10 images requires exactly 1 RTT.",
                "  Total Time = 2 RTT (base) + 10 * 1 RTT = 12 RTTs.",
                "Step 3: Persistent HTTP with pipelining:",
                "  Base HTML = 2 RTTs.",
                "  Client sends back-to-back requests for ALL 10 images simultaneously in a single burst: takes only 1 RTT for all images to arrive.",
                "  Total Time = 2 RTT + 1 RTT = 3 RTTs!",
              ],
            },
            {
              type: "resources",
              heading: "3. References & Curated Study Materials",
              sources: [
                {
                  title: "Computer Networking: A Top-Down Approach (8th Edition)",
                  authors: "James F. Kurose, Keith W. Ross",
                  year: "2020",
                  publisher: "Pearson",
                  link: "https://www.pearson.com",
                  relevance:
                    "Chapter 2: Application Layer — complete protocol packet exchanges for DNS, HTTP/1.1, HTTP/2, and email protocols.",
                },
              ],
              videos: [
                {
                  title: "DNS Resolution & HTTP Persistent vs Non-Persistent RTT Numericals",
                  creator: "Gate Smashers",
                  duration: "15 mins",
                  url: "https://www.youtube.com/playlist?list=PLxCzCOWd7aiGShFormBZvhs6quW3hVgTL",
                  whyThisHelps:
                    "Step-by-step ladder diagrams demonstrating exact RTT counting in GATE questions.",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
