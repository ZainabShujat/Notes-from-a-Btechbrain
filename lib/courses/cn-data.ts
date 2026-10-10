import { CourseMeta } from "./types";
import { CN_SOCKET_API_LESSON } from "./cn-socket-data";

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
  gateScope: "GATE 2027 CS/IT scope",
  gateSyllabusTopics: [
    "Principles of layering: OSI and TCP/IP protocol stacks",
    "Basics of packet switching, circuit switching, and delay analysis",
    "Physical layer: Nyquist bit rate, Shannon-Hartley capacity formula, SNR dB conversions, transmission media",
    "Data link layer: framing, error detection (CRC, checksum), flow control (Stop-and-Wait, GBN, SR)",
    "Medium Access Control: ALOHA, CSMA/CD, Ethernet frame formats, transparent bridges, Spanning Tree Protocol (STP)",
    "Network layer: IPv4 addressing, CIDR, subnetting, NAT, fragmentation",
    "Routing algorithms: Distance Vector (RIP), Link State (OSPF), BGP path vector",
    "Transport layer: UDP, TCP connection management, flow control, congestion control (Tahoe vs Reno)",
    "Application layer: DNS resolution, HTTP persistent/non-persistent connections, SMTP, POP3",
    "Network security: RSA public-key algorithm, Diffie-Hellman key exchange, SHA-256 digital signatures, firewalls",
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
          cheatsheet: {
            summaryRule: "OSI is a 7-layer reference model; TCP/IP is the practical 4/5-layer implementation. As data descends the stack, each layer encapsulates headers (Application: Messages, Transport: Segments/Datagrams, Network: Packets, Data Link: Frames, Physical: Bits). Total nodal delay is d_nodal = d_proc + d_queue + d_trans + d_prop.",
            keyFormulasAndRules: [
              "Transmission Delay: d_trans = L / R (depends strictly on packet length L and link bandwidth R).",
              "Propagation Delay: d_prop = d / s (depends strictly on distance d and signal velocity s in medium).",
              "Bandwidth-Delay Product (BDP): BDP = R * d_prop (measures maximum in-flight bits filling the pipe).",
              "Store-and-Forward Pipelined Delay: For M packets across N links, Total Time = N * d_trans + N * d_prop + (M - 1) * d_trans.",
              "Traffic Intensity: I = (L * a) / R. If I > 1, queue grows without bound and packet loss occurs.",
            ],
            examPitfalls: [
              "Bandwidth does NOT affect signal propagation speed; higher bandwidth only reduces transmission delay L/R.",
              "In store-and-forward routing, intermediate routers cannot forward a packet until all bits of that packet have been completely received.",
              "PDU nomenclature: Application = Messages, Transport = Segments/Datagrams, Network = Packets, Data Link = Frames.",
            ],
          },
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
        {
          id: "physical-layer-capacity-and-switching",
          title: "Physical Layer: Channel Capacity, Nyquist-Shannon Bounds & Switching",
          slug: "physical-layer-capacity-and-switching",
          order: 2,
          estimatedMinutes: 25,
          tagline: "Nyquist bit rate, Shannon-Hartley capacity, SNR decibels, and circuit vs packet switching.",
          hasInteractive: false,
          hasGATE: true,
          hasPractice: true,
          cheatsheet: {
            summaryRule: "Nyquist formula defines the maximum theoretical bit rate on a noiseless channel: C = 2B log2(M). Shannon-Hartley capacity theorem defines the absolute upper bound on a noisy Gaussian channel: C = B log2(1 + SNR). In real systems, the actual achievable bit rate is min(Nyquist, Shannon).",
            keyFormulasAndRules: [
              "Nyquist Bit Rate (Noiseless): C = 2 * B * log2(M) bps, where B = bandwidth (Hz) and M = discrete signaling levels.",
              "Shannon-Hartley Capacity (Noisy): C = B * log2(1 + SNR) bps, where SNR = S / N (linear power ratio, NOT dB).",
              "SNR in Decibels: SNR_dB = 10 * log10(SNR)  <=>  SNR = 10^(SNR_dB / 10).",
              "Circuit Switching: Dedicated end-to-end path established before data transfer. Constant bit rate, zero queuing delay after setup, low link utilization during idle bursts.",
              "Packet Switching: Data broken into independent packets multiplexed statistically across shared links. High utilization, variable queuing delays, jitter, packet drop under congestion.",
            ],
            examPitfalls: [
              "Never plug SNR_dB directly into the Shannon formula! You must first convert decibels to linear SNR: SNR = 10^(SNR_dB / 10).",
              "If a question asks for the minimum number of signal levels M needed on a noisy channel, first calculate Shannon capacity C, then equate C = 2B log2(M) to solve for M = ceil(2^(C / (2B))).",
              "Virtual Circuit (VC) packet switching maintains a connection state table in routers and preserves packet order, but packets still experience queuing delays and store-and-forward transmission.",
            ],
          },
          sections: [
            {
              type: "explanation",
              heading: "1. The Physics of the Channel: Bandwidth & Signal Attenuation",
              body: [
                "Every physical transmission medium acts as a band-pass filter that attenuates high-frequency Fourier components of transmitted square waveforms. As pulses travel along copper or fiber, high frequencies decay rapidly, rounding the sharp pulse transitions and leading to ==purple:Intersymbol Interference (ISI)==.",
                "To transmit digital symbols without overlapping each other at the receiver, the symbol transmission rate (baud rate) cannot exceed twice the available analog bandwidth B (in Hertz). This fundamental physical constraint leads directly to the classical Nyquist and Shannon channel bounds.",
              ],
            },
            {
              type: "explanation",
              heading: "2. Nyquist Bit Rate for Noiseless Channels",
              body: [
                "In 1928, Harry Nyquist proved that for an ideal noiseless channel of bandwidth B Hertz, the maximum symbol transmission rate without ISI is exactly 2B baud (symbols per second).",
                "If each symbol encodes M distinct discrete voltage levels, each symbol carries log2(M) bits of information.",
                "**Nyquist Maximum Data Rate Formula:**",
                "$$C = 2 \\times B \\times \\log_2(M) \\quad \\text{bits per second (bps)}$$",
                "Implication: On a noiseless channel, data rate can be arbitrarily increased simply by increasing the number of signaling levels M. However, in the real world, thermal noise limits how closely signaling levels can be spaced before the receiver confuses adjacent levels.",
              ],
            },
            {
              type: "explanation",
              heading: "3. Shannon-Hartley Theorem for Noisy Channels",
              body: [
                "In 1948, Claude Shannon published the mathematical foundation of information theory, proving that random thermal noise (Additive White Gaussian Noise, AWGN) imposes an insurmountable upper limit on the error-free information capacity of any physical channel.",
                "**Shannon-Hartley Capacity Formula:**",
                "$$C = B \\times \\log_2(1 + \\text{SNR}) \\quad \\text{bits per second (bps)}$$",
                "Where:",
                "• B is the channel bandwidth in Hertz (Hz).",
                "• SNR is the Signal-to-Noise Ratio (power ratio S / N) in linear units, NOT decibels.",
                "Converting SNR from Decibels to Linear:",
                "$$\\text{SNR}_{\\text{dB}} = 10 \\log_{10}(\\text{SNR}) \\implies \\text{SNR} = 10^{\\frac{\\text{SNR}_{\\text{dB}}}{10}}$$",
                "Key Principle: No matter how many signal levels M you engineer, you CANNOT exceed Shannon capacity C on a channel with bandwidth B and signal-to-noise ratio SNR without introducing errors!",
              ],
              callout: {
                kind: "gate-tip",
                title: "Decibel Conversion Table for Rapid GATE Mental Math",
                message:
                  "• 10 dB = 10\n• 20 dB = 100\n• 30 dB = 1,000\n• 40 dB = 10,000\n• 3 dB ≈ 2 (doubling of signal power)\nExample: If SNR_dB = 30 dB, then SNR = 1000. Then log2(1 + 1000) = log2(1001) ≈ 10 bits/sec/Hz.",
              },
            },
            {
              type: "comparison",
              heading: "4. Switching Architectures: Circuit vs Packet vs Virtual Circuit Switching",
              leadParagraph:
                "Comparison of core telecommunication and data networking transmission architectures:",
              columns: ["Dimension", "Circuit Switching (PSTN/ISDN)", "Datagram Packet Switching (Internet IPv4/IPv6)", "Virtual Circuit Packet Switching (ATM/X.25/MPLS)"],
              criteria: [
                {
                  criterion: "Connection Setup",
                  values: ["Mandatory 3-way path reservation before data flows", "Connectionless: No prior setup; packets sent immediately", "Mandatory setup phase to assign Virtual Circuit IDs (VCID)"],
                },
                {
                  criterion: "Routing per Packet",
                  values: ["Entire call uses same physical path dedicated exclusively", "Each packet routed independently; may take different paths", "All packets follow fixed VC path using VC translation tables"],
                },
                {
                  criterion: "Bandwidth Reservation",
                  values: ["Dedicated guaranteed bandwidth; wasted if idle", "Statistical multiplexing on demand; dynamic sharing", "Statistical multiplexing; dynamic sharing with QoS guarantees"],
                },
                {
                  criterion: "Packet Delivery Order",
                  values: ["Guaranteed strictly in-order arrival", "Packets can arrive out of order (reordering needed at L4)", "Guaranteed in-order arrival along virtual circuit"],
                },
                {
                  criterion: "Failure Sensitivity",
                  values: ["Link failure aborts the entire active circuit", "Robust: subsequent packets dynamically route around failed links", "Link failure aborts all active VCs traversing that link"],
                },
              ],
            },
            {
              type: "gate-analysis",
              heading: "5. GATE Worked Numerical: Combined Nyquist & Shannon Engineering",
              weightage: "2 Marks (Common GATE CS Trap)",
              trap: "Students frequently compute Shannon capacity and stop, forgetting that physical transmitters use discrete levels M governed by Nyquist!",
              solutionSteps: [
                "Problem (Modeled on GATE Pattern): A telephone channel has an analog bandwidth B = 4 kHz and a signal-to-noise ratio SNR_dB = 30 dB.",
                "Calculate:",
                "  (a) The theoretical maximum channel capacity C.",
                "  (b) The minimum number of discrete signal levels M required to transmit at a rate of 24 kbps using Nyquist signaling, and whether this transmission is theoretically possible on this channel.",
                "Step 1: Compute Shannon Capacity C:",
                "  Bandwidth B = 4,000 Hz.",
                "  SNR_dB = 30 dB -> Linear SNR = 10^(30 / 10) = 10^3 = 1000.",
                "  Shannon Capacity C = B * log2(1 + SNR) = 4000 * log2(1 + 1000) = 4000 * log2(1001).",
                "  Since 2^10 = 1024, log2(1001) ≈ 9.967 bits.",
                "  C = 4000 * 9.967 ≈ 39,869 bps ≈ 39.87 kbps.",
                "Step 2: Check feasibility of 24 kbps transmission:",
                "  Since desired rate R = 24 kbps < C (39.87 kbps), error-free transmission at 24 kbps is theoretically possible!",
                "Step 3: Determine required discrete signal levels M via Nyquist formula:",
                "  R = 2 * B * log2(M) bps",
                "  24,000 = 2 * 4,000 * log2(M) = 8,000 * log2(M)",
                "  log2(M) = 24,000 / 8,000 = 3",
                "  M = 2^3 = 8 signal levels.",
                "Conclusion: Shannon capacity is 39.87 kbps; 24 kbps is achievable using M = 8 discrete signal levels.",
              ],
            },
            {
              type: "resources",
              heading: "6. References & Curated Study Materials",
              sources: [
                {
                  title: "Data Communications and Networking (5th Edition)",
                  authors: "Behrouz A. Forouzan",
                  year: "2012",
                  publisher: "McGraw-Hill",
                  link: "https://www.mheducation.com",
                  relevance:
                    "Chapter 3: Data and Signals — comprehensive derivations of Fourier analysis, Nyquist bit rate, and Shannon capacity.",
                },
                {
                  title: "Computer Networks (5th Edition)",
                  authors: "Andrew S. Tanenbaum, David J. Wetherall",
                  year: "2011",
                  publisher: "Pearson",
                  link: "https://www.pearson.com",
                  relevance:
                    "Chapter 2: The Physical Layer — transmission media properties and modulation schemes.",
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
          cheatsheet: {
            summaryRule: "Data Link framing delimits frames using byte stuffing (character-oriented) or bit stuffing (inserting 0 after five consecutive 1s in HDLC). CRC uses modulo-2 polynomial division (XOR without borrow); generator of degree r appends r zeros, generating an r-bit remainder. Minimum Hamming distance d_min >= e + 1 detects e errors; d_min >= 2t + 1 corrects t errors.",
            keyFormulasAndRules: [
              "HDLC Bit Stuffing: Transmitter inserts '0' after five consecutive '1's. Receiver strips '0' after five '1's.",
              "CRC Codeword: Transmit T = D * 2^r XOR R, where R = (D * 2^r) mod_2 G.",
              "CRC Error Detection Capability: If G(x) has x^0 = 1, detects all single-bit errors; if (x+1) is a factor of G(x), detects all odd numbers of bit errors; detects all burst errors of length <= r.",
              "Hamming Distance Bounds: Error detection: d_min >= e + 1; Error correction: d_min >= 2t + 1; Simultaneous detection & correction: d_min >= e + t + 1 (e > t).",
            ],
            examPitfalls: [
              "A polynomial of degree r has r + 1 coefficients/bits! For example, x^4 + x + 1 has degree 4, represented as 10011 (5 bits), appending 4 zeros.",
              "In bit stuffing, never count the stuffed 0 as part of the next sequence of five 1s.",
              "CRC division uses XOR arithmetic (no carries and no borrows); 1 XOR 1 = 0, 0 XOR 0 = 0, 1 XOR 0 = 1.",
            ],
          },
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
          cheatsheet: {
            summaryRule: "Flow control manages sender transmission rates to avoid overflowing receiver buffers. Stop-and-Wait has W_S = 1, W_R = 1 with eta = 1 / (1 + 2a). Go-Back-N has W_S = 2^k - 1, W_R = 1 with cumulative ACKs and go-back retransmissions. Selective Repeat has W_S = 2^(k-1), W_R = 2^(k-1) with independent ACKs and individual retransmissions. Pipelined efficiency is eta = min(1, W_S / (1 + 2a)).",
            keyFormulasAndRules: [
              "Normalized Propagation Parameter: a = T_p / T_t = (d / s) / (L / R).",
              "Total Round-Trip Cycle Time: T_cycle = T_t + 2 * T_p + T_ack (if T_ack is negligible, T_cycle = T_t + 2 * T_p).",
              "Stop-and-Wait Efficiency & Throughput: eta = 1 / (1 + 2a); Throughput = eta * Bandwidth = L / (T_t + 2 * T_p).",
              "Pipelined Window Efficiency: eta = min(1, W_S / (1 + 2a)). For 100% utilization: W_S >= 1 + 2a.",
              "Sequence Number Bounds for k Bits: Stop-and-Wait: k >= 1; Go-Back-N: W_S + W_R <= 2^k => W_S <= 2^k - 1 (since W_R = 1); Selective Repeat: W_S + W_R <= 2^k => W_S <= 2^(k-1) and W_R <= 2^(k-1).",
            ],
            examPitfalls: [
              "If ACK transmission time T_ack is NOT negligible, Cycle Time = T_t + 2 * T_p + T_ack.",
              "In Go-Back-N, receiver window W_R = 1, so out-of-order error-free frames are unconditionally discarded!",
              "In Selective Repeat, if sequence numbers are not at least 2 * W_S, duplicate frames from the preceding window wrap around and overlap with the new window, corrupting data.",
            ],
          },
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
          cheatsheet: {
            summaryRule: "CSMA/CD enforces 'listen before talk, listen while talk'. To detect collisions before transmission completes, transmission time must satisfy T_t >= 2 * T_p, yielding minimum frame size L_min = 2 * T_p * Bandwidth. Binary exponential backoff chooses an integer slot r in [0, 2^min(n, 10) - 1] after collision n.",
            keyFormulasAndRules: [
              "CSMA/CD Condition: T_t >= 2 * T_p <=> L_min / R >= 2 * (d / s) => L_min >= 2 * (d / s) * R.",
              "Maximum Network Cable Span: d_max = (L_min * s) / (2 * R).",
              "Pure ALOHA Throughput: S = G * e^(-2G); Maximum S_max = 1 / (2e) ≈ 18.4% at G = 0.5.",
              "Slotted ALOHA Throughput: S = G * e^(-G); Maximum S_max = 1 / e ≈ 36.8% at G = 1.0.",
              "IEEE 802.3 Standard Bounds: Minimum frame size = 64 bytes (46B payload + 18B header/trailer); Slot time = 512 bit times (51.2 μs at 10 Mbps).",
              "Binary Exponential Backoff: Backoff slot r drawn uniformly from [0, 2^k - 1], where k = min(n, 10) for 1 <= n <= 15. Collision count drops after 16 failed attempts.",
            ],
            examPitfalls: [
              "If bandwidth R doubles while cable length stays constant, L_min must double to retain collision detection!",
              "Repeaters and Hubs extend the physical collision domain; Bridges and Switches divide the collision domain into distinct collision segments.",
              "CSMA/CA (used in Wi-Fi IEEE 802.11) uses RTS/CTS (Request to Send / Clear to Send) handshakes and NAV timers because wireless stations cannot detect collisions while transmitting (Hidden Terminal Problem).",
            ],
          },
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
        {
          id: "lan-switching-and-data-link-devices",
          title: "Connecting Devices, Transparent Bridges & Spanning Tree Protocol (STP)",
          slug: "lan-switching-and-data-link-devices",
          order: 2,
          estimatedMinutes: 24,
          tagline: "Collision vs broadcast domains, transparent bridge backward learning, and Spanning Tree Protocol.",
          hasInteractive: false,
          hasGATE: true,
          hasPractice: true,
          cheatsheet: {
            summaryRule: "Connecting devices operate at different layers: Hubs/Repeaters operate at Layer 1 (single collision domain, single broadcast domain). Bridges/Switches operate at Layer 2 (each switch port is its own collision domain; all ports share one broadcast domain). Routers operate at Layer 3 (each router interface is its own collision domain AND its own broadcast domain). STP eliminates Layer 2 bridging loops.",
            keyFormulasAndRules: [
              "Collision Domain Count: Hubs/Repeaters = 1 collision domain for all connected ports; Switches/Bridges = 1 collision domain per connected active port; Routers = 1 collision domain per interface.",
              "Broadcast Domain Count: Hubs and Switches do NOT isolate broadcasts = 1 broadcast domain across all interconnected switches/hubs (unless VLANs are configured); Routers isolate broadcasts = 1 broadcast domain per router interface.",
              "Transparent Bridge Learning Algorithm: Upon receiving frame with source MAC S on port P: Add or update entry (MAC=S, Port=P, Timer=0). If destination MAC D is in forwarding table on port Q != P, forward to port Q. If D is on port P, filter (drop). If D is unknown or broadcast (FF:FF:FF:FF:FF:FF), flood to all ports except P.",
              "Spanning Tree Protocol (STP IEEE 802.1D): Bridge ID = 2-byte Priority (default 32768) + 6-byte MAC. Root Bridge = Bridge with smallest Bridge ID. Root Port = Port with lowest path cost to Root Bridge. Designated Port = Port with lowest path cost on each segment. Blocked Port = All remaining alternate ports.",
            ],
            examPitfalls: [
              "A Hub does NOT break up collision domains! If 8 computers connect to a single 8-port Hub, there is exactly 1 collision domain.",
              "A Switch breaks up collision domains, but NOT broadcast domains! An 8-port switch has 8 collision domains, but only 1 broadcast domain.",
              "In STP, the bridge with the LOWEST (smallest numerical) Bridge ID becomes the Root Bridge, NOT the highest!",
            ],
          },
          sections: [
            {
              type: "explanation",
              heading: "1. Networking Connecting Devices Hierarchy",
              body: [
                "To interconnect local area networks, hardware devices operate across distinct layers of the protocol stack:",
                "1. Repeaters & Hubs (Layer 1 - Physical): Receive electrical/optical signals and regenerate (amplify) bit streams onto all other ports. They have no memory, do not inspect frame headers, and create a single shared ==purple:Collision Domain== and a single ==yellow:Broadcast Domain==.",
                "2. Bridges & Layer 2 Switches (Layer 2 - Data Link): Multi-port bridges that maintain an internal forwarding database (CAM table). They inspect 48-bit MAC addresses, filter traffic to prevent collisions from spreading, and isolate each port into an independent ==green:Collision Domain==. However, standard Layer 2 switches forward broadcast frames (e.g. ARP requests) to all ports, leaving a single ==yellow:Broadcast Domain==.",
                "3. Routers (Layer 3 - Network): Examine 32-bit/128-bit logical IP addresses to route packets between disparate networks. Routers block Layer 2 broadcasts by default, isolating both ==green:Collision Domains== and ==pink:Broadcast Domains== per interface.",
              ],
            },
            {
              type: "comparison",
              heading: "2. Collision vs Broadcast Domain Operational Comparison",
              leadParagraph:
                "Domain boundary rules for standard network equipment:",
              columns: ["Device", "OSI Layer", "Collision Domains Created", "Broadcast Domains Created"],
              criteria: [
                {
                  criterion: "Hub / Repeater (N ports)",
                  values: ["Layer 1 (Physical)", "Exactly 1 (shared across all N ports)", "Exactly 1 (shared across all N ports)"],
                },
                {
                  criterion: "Bridge (2 ports)",
                  values: ["Layer 2 (Data Link)", "2 collision domains (1 per port)", "1 broadcast domain (floods broadcasts)"],
                },
                {
                  criterion: "Switch (N active ports)",
                  values: ["Layer 2 (Data Link)", "N collision domains (1 per active port)", "1 broadcast domain (floods broadcasts)"],
                },
                {
                  criterion: "Router (K interfaces)",
                  values: ["Layer 3 (Network)", "K collision domains (1 per interface)", "K broadcast domains (blocks broadcasts)"],
                },
              ],
            },
            {
              type: "explanation",
              heading: "3. Transparent Bridge Backward Learning Algorithm",
              body: [
                "A transparent bridge operates plug-and-play without requiring manual network configuration. It learns network topology dynamically through ==yellow:backward learning==:",
                "Algorithm Execution on Arrival of Frame (Source = S, Destination = D) on Port P:",
                "1. Inspection & Learning: The bridge inspects Source MAC S. It writes or refreshes the entry in its Filtering/Forwarding Table: `(MAC = S, Port = P, TTL = 300s)`.",
                "2. Destination Lookup & Forwarding Decision:",
                "  • Case A (Same Segment): If Destination D is in the table and mapped to Port P, the bridge drops (filters) the frame because the destination is already on the source segment.",
                "  • Case B (Known Different Segment): If Destination D is in the table and mapped to Port Q (where Q != P), the bridge forwards the frame exclusively onto Port Q.",
                "  • Case C (Unknown Destination or Broadcast): If Destination D is NOT in the table, or if D is the broadcast MAC `FF:FF:FF:FF:FF:FF`, the bridge floods the frame to ALL active ports EXCEPT the incoming port P.",
              ],
            },
            {
              type: "explanation",
              heading: "4. Spanning Tree Protocol (STP IEEE 802.1D)",
              body: [
                "Redundant physical links between switches are essential for fault tolerance. However, redundant links create ==pink:Layer 2 Physical Loops==, causing:",
                "• Broadcast Storms: Broadcast frames circulate infinitely, saturating network bandwidth.",
                "• Multiple Frame Copies: Unicast frames arrive repeatedly at destination hosts.",
                "• CAM Table Instability: Switch MAC learning tables thrash continuously as frames arrive from oscillating ports.",
                "STP Algorithm (Radia Perlman):",
                "1. Elect Root Bridge: Switches exchange Bridge Protocol Data Units (BPDUs). The switch with the lowest numerical Bridge ID (Priority + MAC) becomes the Root Bridge.",
                "2. Elect Root Ports (RP): On every non-root switch, the port with the lowest cumulative path cost to the Root Bridge is designated as the Root Port (exactly 1 RP per non-root switch).",
                "3. Elect Designated Ports (DP): On every physical link/segment, the switch port providing the lowest path cost to the Root Bridge is elected as the Designated Port (all ports on the Root Bridge are DPs).",
                "4. Block Alternate Ports: All remaining ports are placed into the Blocking/Discarding state, breaking all loops while maintaining hot standby backup paths.",
              ],
            },
            {
              type: "gate-analysis",
              heading: "5. GATE Worked Numerical: Domain Counting & Bridge Table Trace",
              weightage: "2 Marks",
              trap: "Remember that each interface of a router is BOTH an independent collision domain AND an independent broadcast domain!",
              solutionSteps: [
                "Problem (Modeled on GATE Pattern): A campus network consists of:",
                "  • 1 Router with 3 active interfaces (R1, R2, R3).",
                "  • Interface R1 connects to an 8-port Switch S1. S1 connects to 7 host PCs.",
                "  • Interface R2 connects to a 4-port Hub H1. H1 connects to 3 host PCs.",
                "  • Interface R3 connects to an 8-port Switch S2. S2 connects to 5 host PCs and a 4-port Hub H2. H2 connects to 3 host PCs.",
                "Calculate: (a) Total number of Collision Domains, and (b) Total number of Broadcast Domains in the network.",
                "Step 1: Calculate Broadcast Domains:",
                "  Routers isolate broadcast traffic. Each active router interface defines exactly 1 broadcast domain.",
                "  The router has 3 active interfaces (R1, R2, R3).",
                "  Switches and Hubs do not create separate broadcast domains.",
                "  Total Broadcast Domains = 3.",
                "Step 2: Calculate Collision Domains per Router Interface branch:",
                "  Branch 1 (R1 -> Switch S1):",
                "    S1 has 8 active links: 1 link to router R1 + 7 links to host PCs = 8 links.",
                "    Each active switch link is an independent collision domain = 8 collision domains.",
                "  Branch 2 (R2 -> Hub H1):",
                "    H1 connects to R2 and 3 PCs. A Hub shares a single physical wire.",
                "    Entire Hub H1 branch = 1 collision domain.",
                "  Branch 3 (R3 -> Switch S2 -> Hub H2):",
                "    S2 has active ports: 1 link to router R3 + 5 links to PCs + 1 link to Hub H2 = 7 switch ports.",
                "    Each of these 7 switch ports forms a collision domain = 7 collision domains.",
                "    (The 3 PCs connected to Hub H2 all share the single collision domain provided by that one switch port).",
                "    Total collision domains in Branch 3 = 7.",
                "Step 3: Total Collision Domains = 8 + 1 + 7 = 16 Collision Domains.",
                "Conclusion: Total Broadcast Domains = 3; Total Collision Domains = 16.",
              ],
            },
            {
              type: "resources",
              heading: "6. References & Curated Study Materials",
              sources: [
                {
                  title: "Computer Networks: A Systems Approach (6th Edition)",
                  authors: "Larry L. Peterson, Bruce S. Davie",
                  year: "2020",
                  publisher: "Morgan Kaufmann",
                  link: "https://book.systemsapproach.org",
                  relevance:
                    "Chapter 3: Direct Link Networks — definitive coverage of learning bridges, spanning tree protocol, and switch architectures.",
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
          cheatsheet: {
            summaryRule: "IPv4 header is 20 to 60 bytes (HLEN scaled by 4). Fragmentation occurs when datagram size > MTU; Fragment Offset is measured in 8-byte blocks of payload data. CIDR uses variable-length /n prefix with Longest Prefix Matching (LPM). Subnet ID = IP AND Mask; Direct Broadcast Address (DBA) sets all host bits to 1; Usable hosts = 2^(32-n) - 2.",
            keyFormulasAndRules: [
              "Header Length (HLEN): Expressed in 4-byte words (range 5 to 15, corresponding to 20 to 60 bytes).",
              "Total Length: 16-bit field spanning header + payload (maximum 65,535 bytes).",
              "Fragmentation Offsets: Fragment Offset = (Payload bytes transmitted prior to this fragment) / 8.",
              "Flags: DF = 1 (Don't Fragment); MF = 1 (More Fragments follow); MF = 0 (Last fragment).",
              "Usable Host IP Addresses in /n Subnet: 2^(32 - n) - 2 (excludes Network Address and Direct Broadcast Address).",
              "Private IP Blocks (RFC 1918): Class A: 10.0.0.0/8; Class B: 172.16.0.0/12; Class C: 192.168.0.0/16.",
            ],
            examPitfalls: [
              "Fragment Offset counts PAYLOAD bytes only, NEVER including the 20-byte IP header!",
              "Every fragment (except possibly the very last fragment) MUST carry a payload size that is an exact integer multiple of 8 bytes.",
              "Don't forget to subtract 2 for the Network ID and Direct Broadcast Address when calculating usable host addresses.",
            ],
          },
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
          cheatsheet: {
            summaryRule: "Routing algorithms determine paths through the network. Distance Vector (RIP, Bellman-Ford) shares entire routing table with immediate neighbors only; prone to slow convergence and Count-to-Infinity. Link State (OSPF, Dijkstra) floods local link states to all routers in the domain; every router builds an identical global topology graph and executes Dijkstra SPF. Path Vector (BGP) advertises complete AS-PATH lists to prevent inter-domain loops.",
            keyFormulasAndRules: [
              "Bellman-Ford Equation: D_x(y) = min_v { c(x, v) + D_v(y) } over all neighbors v of x.",
              "RIP Protocol Bounds: Metric is hop count; Maximum valid path length is 15 hops; 16 hops represents infinity (unreachable).",
              "Count-to-Infinity Mitigations: Split Horizon (do not re-advertise route to the interface from which it was learned); Poison Reverse (advertise cost = infinity back to next hop).",
              "OSPF Hierarchy: Area 0 (Backbone Area) interconnects standard areas; Area Border Routers (ABR) connect standard areas to Area 0; Autonomous System Boundary Routers (ASBR) connect OSPF to external routing domains.",
              "BGP Loop Detection: A BGP router discards any routing update if its own Autonomous System Number (ASN) already appears in the AS-PATH attribute list.",
            ],
            examPitfalls: [
              "Split Horizon with Poison Reverse does NOT completely prevent loops involving three or more routers!",
              "Link State Packets (LSPs) are flooded to ALL routers, but each LSP only lists the costs to IMMEDIATE neighbors.",
              "Distance Vector updates are sent ONLY to immediate neighbors, but contain distance estimates to ALL routers in the entire network.",
            ],
          },
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
          cheatsheet: {
            summaryRule: "TCP provides reliable, in-order, byte-stream delivery with 3-way handshake and 4-way teardown (TIME_WAIT = 2MSL). Transmission window is W = min(cwnd, rwnd). Slow Start doubles cwnd every RTT; Congestion Avoidance adds 1 MSS every RTT (AIMD). On Timeout: ssthresh = cwnd / 2, cwnd = 1 MSS (Tahoe & Reno). On 3 Duplicate ACKs: Reno sets ssthresh = cwnd / 2, cwnd = ssthresh + 3 MSS, continuing linear growth without dropping to 1.",
            keyFormulasAndRules: [
              "Effective Transmission Window: W = min(cwnd, rwnd).",
              "Slow Start Growth: cwnd = cwnd + 1 MSS per ACK received (doubles cwnd each RTT) until cwnd >= ssthresh.",
              "Congestion Avoidance Growth: cwnd = cwnd + (1 / cwnd) MSS per ACK received (increases by 1 MSS each RTT).",
              "Timeout Event (Tahoe & Reno): ssthresh = max(cwnd / 2, 2 MSS); cwnd = 1 MSS; enters Slow Start.",
              "3 Duplicate ACKs (Reno Fast Recovery): ssthresh = max(cwnd / 2, 2 MSS); cwnd = ssthresh + 3 MSS; continues Congestion Avoidance.",
              "TCP Header: 20 to 60 bytes; Sequence number counts bytes, not packets; SYN and FIN flags each consume 1 sequence number (ACK with no data consumes 0).",
              "Karn's Algorithm: Do not measure RTT for retransmitted segments; double timeout timer (exponential backoff) upon every retransmission.",
            ],
            examPitfalls: [
              "SYN and FIN consume exactly 1 sequence number each, even when they carry 0 payload bytes! ACK segments without data consume 0 sequence numbers.",
              "In Slow Start, cwnd increases by 1 MSS for EACH individual ACK received, which doubles cwnd in one RTT if all segments are ACKed individually.",
              "Do not confuse Tahoe and Reno: On 3 duplicate ACKs, Tahoe drops cwnd to 1, while Reno enters Fast Recovery and drops cwnd to ssthresh + 3.",
            ],
          },
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
        CN_SOCKET_API_LESSON,
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
          cheatsheet: {
            summaryRule: "Application protocols provide user network services. DNS resolves hostnames to IPs via hierarchical servers (Root -> TLD -> Authoritative); Iterative gives referrals while Recursive queries on behalf of client. HTTP/1.0 uses non-persistent connections (2 RTT per object); HTTP/1.1 uses persistent connections (1 RTT per object); HTTP/2 uses binary multiplexed streams; HTTP/3 uses QUIC over UDP. Email uses SMTP (push, port 25), POP3 (pull, port 110), IMAP (pull with server sync, port 143).",
            keyFormulasAndRules: [
              "Non-Persistent HTTP RTT Total: For base HTML + N objects, Total RTTs = (1 + N) * 2 RTT = 2(N + 1) RTTs (without parallel connections).",
              "Persistent HTTP Without Pipelining: 2 RTT (base HTML) + N * 1 RTT = N + 2 RTTs.",
              "Persistent HTTP With Pipelining: 2 RTT (base HTML) + 1 RTT (burst of all N objects) = 3 RTTs.",
              "DNS Ports: UDP Port 53 (standard lookups <= 512 bytes); TCP Port 53 (zone transfers and responses > 512 bytes).",
              "Email Ports: SMTP (TCP 25, 587 submission); POP3 (TCP 110, 995 SSL); IMAP (TCP 143, 993 SSL).",
            ],
            examPitfalls: [
              "Non-persistent HTTP requires a BRAND NEW TCP handshake (1 RTT) PLUS 1 RTT for HTTP get/response for EACH referenced image, resulting in 2 RTT per image!",
              "Do not confuse SMTP and POP3: SMTP is a push protocol used to send mail from client to server and between servers; POP3 and IMAP are pull protocols used to retrieve mail from the mailbox server to the client.",
            ],
          },
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

    // =========================================================================
    // MODULE 9: NETWORK SECURITY & CRYPTOGRAPHY
    // =========================================================================
    {
      id: "cn-module-9-network-security-and-cryptography",
      title: "Module 9: Network Security, Cryptography & Firewalls",
      slug: "network-security-and-cryptography",
      description:
        "Symmetric vs asymmetric ciphers, RSA public-key algorithm, Diffie-Hellman key exchange, SHA cryptographic hashes, digital signatures, and firewall packet filtering.",
      order: 9,
      lessons: [
        {
          id: "network-security-and-cryptography",
          title: "Network Security: Cryptography, RSA Math, Diffie-Hellman & Firewalls",
          slug: "network-security-and-cryptography",
          order: 1,
          estimatedMinutes: 28,
          tagline: "Symmetric vs asymmetric ciphers, RSA modular exponentiation, Diffie-Hellman, and packet-filtering firewalls.",
          hasInteractive: false,
          hasGATE: true,
          hasPractice: true,
          cheatsheet: {
            summaryRule: "Network Security provides confidentiality, integrity, authentication, and non-repudiation. Symmetric ciphers (DES, AES) use 1 shared key for encryption and decryption. Asymmetric ciphers (RSA) use key pairs (Public/Private); security rests on prime factorization. Diffie-Hellman establishes a shared key over an insecure channel. Digital signatures encrypt message digest (SHA) with the sender's Private Key. Firewalls inspect packets (stateless vs stateful).",
            keyFormulasAndRules: [
              "RSA Key Generation: Select primes p, q. n = p * q. phi(n) = (p - 1)(q - 1). Choose e coprime to phi(n). Compute d = e^(-1) mod phi(n) via e * d = 1 (mod phi(n)).",
              "RSA Encryption & Decryption: Ciphertext c = m^e mod n; Plaintext m = c^d mod n (requires 0 <= m < n).",
              "Diffie-Hellman Shared Secret: Alice sends A = g^a mod p; Bob sends B = g^b mod p; Shared Key K = B^a mod p = A^b mod p = g^(ab) mod p.",
              "Digital Signature Generation & Verification: Signature S = D_Kpriv_sender(Hash(M)); Verification: Valid if E_Kpub_sender(S) == Hash(M).",
              "Firewall Types: Stateless Packet Filter (Layer 3/4 header: IP, Port, TCP flags SYN/ACK); Stateful Inspection (tracks TCP 3-way handshake state table); Application Gateway / Proxy (Layer 7 payload inspection).",
            ],
            examPitfalls: [
              "In RSA, private exponent d is computed modulo phi(n) = (p - 1)(q - 1), NOT modulo n!",
              "Diffie-Hellman key exchange is vulnerable to active Man-in-the-Middle (MitM) attacks unless combined with digital signatures or certificates for authentication.",
              "To sign a message for authentication/non-repudiation, the sender uses their own PRIVATE key. To encrypt for confidentiality, the sender uses the recipient's PUBLIC key.",
            ],
          },
          sections: [
            {
              type: "explanation",
              heading: "1. Security Fundamentals & Symmetric vs Asymmetric Ciphers",
              body: [
                "Network security encompasses four fundamental pillars (the CIA+N model):",
                "• Confidentiality: Only authorized sender and receiver understand message content (achieved via encryption).",
                "• Integrity: Ensuring the message was not altered in transit (achieved via cryptographic hashes and MACs).",
                "• Authentication: Confirming the true identity of the communicating peer.",
                "• Non-Repudiation: Proving that the sender genuinely sent the message (achieved via digital signatures).",
                "Symmetric vs Asymmetric Cryptographic Paradigms:",
                "1. Symmetric Key Cryptography: Sender and receiver share the identical secret key K. Very fast, computationally light, used for bulk data encryption. Examples: DES (56-bit key, obsolete), Triple-DES (3DES, 168-bit key), AES (Advanced Encryption Standard, Rijndael with 128, 192, or 256-bit keys). Key distribution problem: How do sender and receiver agree on K over an untrusted internet?",
                "2. Asymmetric (Public-Key) Cryptography: Each entity owns an asymmetric key pair: a publicly published Public Key (K_pub) and a strictly guarded Private Key (K_priv). A message encrypted with K_pub can only be decrypted by the matching K_priv. Solves the key distribution problem. Examples: RSA, Diffie-Hellman, ECC (Elliptic Curve Cryptography).",
              ],
            },
            {
              type: "explanation",
              heading: "2. The RSA Public-Key Cryptosystem: Mathematical Derivation",
              body: [
                "Invented in 1977 by Ron Rivest, Adi Shamir, and Leonard Adleman, RSA is the most widely deployed public-key algorithm. Its security rests on the computational intractability of factoring large composite integers into their prime components.",
                "RSA Algorithm Step-by-Step:",
                "1. Choose two large, distinct prime numbers p and q.",
                "2. Compute modulus n = p * q. The bit length of n is the key length (e.g. 2048 bits).",
                "3. Compute Euler's Totient function: phi(n) = (p - 1) * (q - 1).",
                "4. Select public exponent e such that 1 < e < phi(n) and gcd(e, phi(n)) = 1 (e is coprime to phi(n)). Commonly chosen values in practice are 3, 17, or 65537 (2^16 + 1).",
                "5. Compute private decryption exponent d such that: d = e^(-1) mod phi(n), meaning: (e * d) mod phi(n) = 1.",
                "   This is solved efficiently using the Extended Euclidean Algorithm.",
                "6. Key Pairs: Public Key = (e, n); Private Key = (d, n).",
                "7. Encryption (by Sender using Public Key):",
                "   $$c = m^e \\bmod n \\quad (\\text{where plaintext integer } 0 \\le m < n)$$",
                "8. Decryption (by Recipient using Private Key):",
                "   $$m = c^d \\bmod n$$",
                "Correctness Proof (Euler's Totient Theorem):",
                "Since e * d = 1 (mod phi(n)), there exists an integer k such that e * d = k * phi(n) + 1.",
                "Then c^d = (m^e)^d = m^(e*d) = m^(k * phi(n) + 1) = (m^phi(n))^k * m.",
                "By Euler's Theorem, if gcd(m, n) = 1, then m^phi(n) = 1 (mod n). Hence, 1^k * m = m (mod n).",
              ],
              callout: {
                kind: "gate-tip",
                title: "Crucial GATE Trap: Modular Base for d vs c",
                message:
                  "Private exponent d is computed modulo phi(n) = (p - 1)(q - 1). Encryption and decryption are computed modulo n = p * q! Never mix up the two moduli.",
              },
            },
            {
              type: "explanation",
              heading: "3. Diffie-Hellman Key Exchange & Digital Signatures",
              body: [
                "Diffie-Hellman Key Exchange Protocol:",
                "Allows two parties (Alice and Bob) who have never met to establish a shared symmetric secret key over a public eavesdropped channel without transmitting the key itself.",
                "1. Public parameters: A large prime p and a primitive root modulo p, denoted g.",
                "2. Alice picks a secret random private number a (1 <= a < p) and sends public value A = g^a mod p.",
                "3. Bob picks a secret random private number b (1 <= b < p) and sends public value B = g^b mod p.",
                "4. Alice computes shared key: K = B^a mod p = (g^b)^a mod p = g^(ab) mod p.",
                "5. Bob computes shared key: K = A^b mod p = (g^a)^b mod p = g^(ab) mod p.",
                "Eavesdropper Eve sees p, g, A, B, but computing a or b requires solving the Discrete Logarithm Problem, which is computationally infeasible for large p (e.g. 2048-bit primes).",
                "Digital Signatures & Secure Hash Functions (SHA-256):",
                "A digital signature provides non-repudiation and authentication.",
                "1. Sender computes fixed-size digest H = Hash(M) using a cryptographic hash function (SHA-256: one-way, collision-resistant).",
                "2. Sender encrypts H using their own PRIVATE key: S = (H)^d_sender mod n_sender.",
                "3. Receiver decrypts signature using sender's PUBLIC key: H' = (S)^e_sender mod n_sender.",
                "4. If H' == Hash(M), the receiver has mathematical proof that the message originated from the sender and was not modified.",
              ],
            },
            {
              type: "explanation",
              heading: "4. Firewalls: Packet-Filtering, Stateful & Application Gateways",
              body: [
                "A firewall is a network security appliance that monitors and filters incoming and outgoing traffic based on configured security policies.",
                "1. Stateless Packet-Filtering Firewalls (Layer 3 & 4): Inspects individual IP datagrams in isolation. Evaluates rules based on: Source/Destination IP address, Source/Destination Port numbers, IP Protocol type (TCP, UDP, ICMP), and TCP control flags (SYN, ACK). High performance, but vulnerable to IP spoofing and cannot detect connection context.",
                "2. Stateful Inspection Firewalls (Layer 4): Maintains an active state connection table. Verifies whether incoming packets belong to an existing, legitimately initiated TCP session (e.g. allows incoming ACK packets only if a matching outgoing SYN was previously observed).",
                "3. Application-Level Gateways / Proxy Firewalls (Layer 7): Intercepts application traffic (HTTP, FTP, DNS) at the application layer. Can inspect message payloads, detect malicious SQL injection or cross-site scripting strings, and filter specific URLs.",
              ],
            },
            {
              type: "gate-analysis",
              heading: "5. GATE Worked Numerical: Complete RSA Cryptosystem Calculation",
              weightage: "2 Marks (Compulsory Topic in GATE CS)",
              trap: "When calculating d = e^(-1) mod phi(n), ensure e * d mod phi(n) = 1. A common mistake is solving e * d mod n = 1!",
              solutionSteps: [
                "Problem (Original Practice Problem · Modeled on GATE Pattern):",
                "In an RSA cryptosystem, the prime numbers are p = 7 and q = 11. The public encryption exponent is chosen as e = 13.",
                "Calculate:",
                "  (a) The modulus n and Euler's totient phi(n).",
                "  (b) The private decryption exponent d.",
                "  (c) The ciphertext c corresponding to plaintext message m = 8.",
                "  (d) Verify decryption of c back to m.",
                "Step 1: Compute modulus n and phi(n):",
                "  n = p * q = 7 * 11 = 77.",
                "  phi(n) = (p - 1) * (q - 1) = (7 - 1) * (11 - 1) = 6 * 10 = 60.",
                "Step 2: Find private exponent d:",
                "  We require e * d = 1 (mod phi(n)) => 13 * d = 1 (mod 60).",
                "  Using the Extended Euclidean Algorithm or trial multiples of 60:",
                "    13 * d = 60 * k + 1",
                "    For k = 1: 60(1) + 1 = 61 (not divisible by 13).",
                "    For k = 2: 60(2) + 1 = 121 (not divisible by 13).",
                "    For k = 3: 60(3) + 1 = 181 (not divisible by 13).",
                "    For k = 4: 60(4) + 1 = 241 (not divisible by 13).",
                "    For k = 5: 60(5) + 1 = 301 (not divisible by 13).",
                "    For k = 6: 60(6) + 1 = 361 (not divisible by 13).",
                "    For k = 7: 60(7) + 1 = 421 (not divisible by 13).",
                "    For k = 8: 60(8) + 1 = 481 -> 481 / 13 = 37 exactly! (13 * 37 = 481).",
                "  Thus, private exponent d = 37.",
                "  (Notice: 13 * 37 = 481 = 8 * 60 + 1 = 1 mod 60).",
                "Step 3: Encrypt plaintext m = 8:",
                "  Ciphertext c = m^e mod n = 8^13 mod 77.",
                "  Use modular exponentiation (repeated squaring):",
                "    8^1 = 8 mod 77",
                "    8^2 = 64 = -13 mod 77",
                "    8^4 = (-13)^2 = 169 = 2 * 77 + 15 = 15 mod 77",
                "    8^8 = 15^2 = 225 = 2 * 77 + 71 = 71 = -6 mod 77",
                "  Now decompose exponent 13 = 8 + 4 + 1:",
                "    8^13 = 8^8 * 8^4 * 8^1 = (-6) * 15 * 8 mod 77",
                "    (-6 * 15) = -90 = -90 + 2 * 77 = -90 + 154 = 64 mod 77",
                "    64 * 8 = 512 = 6 * 77 + 50 = 50 mod 77.",
                "  Ciphertext c = 50.",
                "Step 4: Decrypt ciphertext c = 50 using private exponent d = 37:",
                "  m = c^d mod n = 50^37 mod 77.",
                "  50 = -27 mod 77.",
                "  50^2 = 2500 = 32 * 77 + 36 = 36 mod 77.",
                "  50^4 = 36^2 = 1296 = 16 * 77 + 64 = 64 = -13 mod 77.",
                "  50^8 = (-13)^2 = 169 = 15 mod 77.",
                "  50^16 = 15^2 = 225 = -6 mod 77.",
                "  50^32 = (-6)^2 = 36 mod 77.",
                "  Decompose exponent 37 = 32 + 4 + 1:",
                "  50^37 = 50^32 * 50^4 * 50^1 mod 77",
                "  = 36 * (-13) * 50 mod 77",
                "  36 * (-13) = -468 = -468 + 7 * 77 = -468 + 539 = 71 = -6 mod 77.",
                "  (-6) * 50 = -300 = -300 + 4 * 77 = -300 + 308 = 8 mod 77.",
                "  Decrypted plaintext m = 8! (Matches original plaintext).",
                "Conclusion: n = 77, phi(n) = 60, d = 37, c = 50, and decryption recovers m = 8.",
              ],
            },
            {
              type: "resources",
              heading: "6. References & Curated Study Materials",
              sources: [
                {
                  title: "Cryptography and Network Security: Principles and Practice (8th Edition)",
                  authors: "William Stallings",
                  year: "2020",
                  publisher: "Pearson",
                  link: "https://www.pearson.com",
                  relevance:
                    "Chapters 3, 9, 10, 13: Detailed mathematical derivations of AES, RSA, Diffie-Hellman key exchange, SHA-256, and firewall architectures.",
                },
                {
                  title: "Computer Networking: A Top-Down Approach (8th Edition)",
                  authors: "James F. Kurose, Keith W. Ross",
                  year: "2020",
                  publisher: "Pearson",
                  link: "https://www.pearson.com",
                  relevance:
                    "Chapter 8: Network Security — principles of cryptography, message integrity, and firewalls in the Internet protocol stack.",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
