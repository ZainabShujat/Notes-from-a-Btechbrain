import { mcq, num, practice, worked, type LessonExtras } from "./helpers";

export const CN_EXTRAS: LessonExtras = {
  "osi-vs-tcp-ip-and-encapsulation": [
    worked(
      "Worked example: header overhead on one packet",
      "An application sends 1000 bytes. TCP adds a 20-byte header, IP a 20-byte header, and Ethernet 18 bytes (header plus trailer). What fraction of the frame is application data?",
      [
        ["Add up the layers", "Each layer wraps the layer above: data, then TCP segment, IP packet, Ethernet frame.", "1000 + 20 + 20 + 18", "1058 bytes"],
        ["Efficiency", "Useful bytes over total bytes.", "1000 / 1058", "≈ 0.945"],
      ],
      "About 94.5% of the frame is data",
      "Encapsulation adds headers at every layer; small payloads waste a far bigger share on headers."
    ),
    practice([
      mcq("cn-osi-1", "A router works mainly at which OSI layer?", [
        ["Network (3)", true, "It forwards packets by IP address."],
        ["Data link (2)", false, "That's a switch."],
        ["Physical (1)", false, "That's a hub or repeater."],
        ["Transport (4)", false, "Routers don't look at port numbers to forward packets."],
      ], "Hub: layer 1, switch: layer 2, router: layer 3.", "foundation"),
      mcq("cn-osi-2", "What is the unit of data at the transport layer called, for TCP?", [
        ["Segment", true, "TCP sends segments (UDP sends datagrams)."],
        ["Frame", false, "That's the data link layer."],
        ["Packet", false, "That's the network layer."],
        ["Bit", false, "That's the physical layer."],
      ], "Segment → packet → frame → bits, going down the stack.", "foundation"),
      num("cn-osi-3", "Same headers (TCP 20, IP 20, Ethernet 18 bytes), but the application sends only 40 bytes. What percentage of the frame is data? Round to the nearest whole number.", 41,
        "40 / (40 + 58) = 40/98 ≈ 40.8%, which rounds to 41%.", "gate-level", "%", 1),
    ]),
  ],

  "physical-layer-capacity-and-switching": [
    worked(
      "Worked example: Nyquist and Shannon limits",
      "A 3000 Hz channel. (a) With 4 signal levels and no noise, what is the maximum bit rate? (b) With an SNR of 30 dB, what is the Shannon capacity?",
      [
        ["Nyquist (noiseless)", "C = 2B log₂ L.", "2·3000·log₂ 4", "12,000 bps"],
        ["Convert the SNR from decibels", "30 dB = 10^(30/10).", "SNR = 1000"],
        ["Shannon (noisy)", "C = B log₂(1 + SNR).", "3000·log₂ 1001", "≈ 29,900 bps"],
      ],
      "(a) 12 kbps   (b) about 29.9 kbps",
      "Nyquist caps a noiseless channel for a given number of levels; Shannon caps any scheme on a noisy channel. The real limit is the smaller of the two."
    ),
    practice([
      num("cn-ph-1", "Convert an SNR of 20 dB to a plain ratio.", 100, "SNR = 10^(20/10) = 10² = 100.", "foundation"),
      num("cn-ph-2", "A noiseless 4 kHz channel uses 8 signal levels. What is the maximum bit rate, in kbps?", 24,
        "2·4000·log₂ 8 = 2·4000·3 = 24,000 bps.", "gate-level", "kbps"),
      mcq("cn-ph-3", "Compared with packet switching, circuit switching:", [
        ["Reserves bandwidth for the whole call, even when nobody is talking", true, "So it wastes capacity on bursty traffic, but gives a steady delay."],
        ["Splits the message into packets that take different routes", false, "That's packet switching."],
        ["Has no setup phase", false, "Circuit switching needs a setup phase."],
      ], "Circuit switching: setup, dedicated path, constant delay. Packet switching: no setup, shared links, variable delay."),
    ]),
  ],

  "framing-and-crc-error-detection": [
    worked(
      "Worked example: compute a CRC",
      "Message 1101011011, generator 10011 (x⁴ + x + 1). Find the CRC bits to append.",
      [
        ["Append zeros", "The generator has degree 4, so append 4 zeros.", undefined, "11010110110000"],
        ["Divide mod 2", "Long division where each subtraction is XOR, with 10011 as the divisor."],
        ["Take the remainder", "The last 4 bits left after the division.", undefined, "1110"],
        ["Transmit", "Message followed by the remainder.", undefined, "11010110111110"],
      ],
      "CRC = 1110; send 11010110111110",
      "The receiver divides the whole frame by the generator; a non-zero remainder means an error was detected."
    ),
    practice([
      mcq("cn-crc-1", "HDLC uses the flag 01111110 and bit stuffing. What does the data 011111111 become on the wire?", [
        ["0111110111", true, "After five 1s in a row, a 0 is inserted."],
        ["011111111", false, "Six 1s in a row would look like part of a flag."],
        ["01111101111", false, "Only one 0 is needed here."],
      ], "Stuff a 0 after every five consecutive 1s; the receiver removes it.", "foundation"),
      mcq("cn-crc-2", "A CRC with a generator of degree r detects every burst error of length:", [
        ["≤ r", true, "Such a burst can't be a multiple of the generator."],
        ["≤ 2r", false, "Longer bursts are only caught with high probability."],
        ["Any length, always", false, "Some long bursts slip through."],
      ], "Degree-r CRC: all single-bit errors, all bursts up to length r, and most longer ones."),
      num("cn-crc-3", "How many check bits does CRC-32 add to each frame?", 32, "A degree-32 generator leaves a 32-bit remainder.", "foundation"),
    ]),
  ],

  "sliding-window-protocols-and-efficiency": [
    worked(
      "Worked example: how big must the window be?",
      "A frame takes Tt = 1 ms to transmit and the propagation delay is Tp = 10 ms. Find stop-and-wait efficiency, the window size for full utilisation, and the sequence bits Go-Back-N needs.",
      [
        ["Ratio a", "a = Tp / Tt.", "10 / 1", "a = 10"],
        ["Stop-and-wait efficiency", "η = 1 / (1 + 2a).", "1 / 21", "≈ 4.76%"],
        ["Window for 100%", "Keep sending until the first ACK returns: 1 + 2a frames.", "1 + 20", "21 frames"],
        ["Sequence bits for Go-Back-N", "Go-Back-N needs window ≤ 2^k − 1, so 2^k ≥ 22.", "k = ⌈log₂ 22⌉", "5 bits"],
      ],
      "4.76%; window 21; 5 sequence bits",
      "Selective Repeat needs window ≤ 2^(k−1), so it would need 6 bits for a window of 21."
    ),
    practice([
      num("cn-sw-1", "Selective Repeat with 4-bit sequence numbers. What is the largest window size?", 8,
        "Selective Repeat needs window ≤ 2^(k−1) = 2³ = 8; otherwise old and new frames could be confused."),
      num("cn-sw-2", "Go-Back-N with 4-bit sequence numbers. What is the largest window size?", 15,
        "Go-Back-N allows up to 2^k − 1 = 15.", "foundation"),
      mcq("cn-sw-3", "In Go-Back-N, frame 3 is lost and frames 4 to 6 arrive. What does the receiver do?", [
        ["Discards 4 to 6 and keeps acknowledging 2", true, "The Go-Back-N receiver accepts frames only in order."],
        ["Buffers 4 to 6 and asks only for 3", false, "That's Selective Repeat."],
        ["Delivers 4 to 6 to the application", false, "That would deliver them out of order."],
      ], "Go-Back-N: a simple receiver, but costly retransmissions. Selective Repeat: buffering, but only lost frames are resent."),
    ]),
  ],

  "csma-cd-and-ethernet-frame": [
    worked(
      "Worked example: minimum frame size for CSMA/CD",
      "A 1 Gbps CSMA/CD network with a 1 km cable and signal speed 2 × 10⁸ m/s. What is the minimum frame size?",
      [
        ["Why there's a minimum", "A sender must still be transmitting when news of a collision comes back, so Tt ≥ 2Tp."],
        ["Propagation delay", "Tp = distance / speed.", "1000 / (2 × 10⁸)", "5 μs"],
        ["Bits sent in 2Tp", "L = 2·Tp·B.", "2 · 5 × 10⁻⁶ · 10⁹", "10,000 bits"],
        ["Convert to bytes", "Divide by 8.", "10,000 / 8", "1250 bytes"],
      ],
      "1250 bytes",
      "Classic 10 Mbps Ethernet gets its 64-byte minimum from a 51.2 μs slot time: 512 bits."
    ),
    practice([
      num("cn-csma-1", "10 Mbps Ethernet has a slot time of 51.2 μs. What minimum frame size does that give, in bytes?", 64,
        "51.2 × 10⁻⁶ × 10 × 10⁶ = 512 bits = 64 bytes.", "foundation"),
      mcq("cn-csma-2", "After the 3rd collision of a frame, binary exponential backoff picks a random wait of k slots, with k from:", [
        ["0 to 7", true, "After n collisions, k ranges over 0 to 2ⁿ − 1 = 7 (n is capped at 10)."],
        ["0 to 3", false, "That's after the 2nd collision."],
        ["0 to 15", false, "That's after the 4th collision."],
      ], "The range doubles with each collision; Ethernet gives up after 16 attempts."),
      mcq("cn-csma-3", "Why can't wireless LANs use CSMA/CD?", [
        ["A transmitting radio can't reliably hear collisions, and hidden terminals exist", true, "So 802.11 uses CSMA/CA, with ACKs and optional RTS/CTS."],
        ["Wireless signals don't collide", false, "They do collide."],
        ["Wireless frames are too short", false, "Frame size isn't the issue."],
      ], "Collision detection needs to listen while sending, which radios can't do well."),
    ]),
  ],

  "lan-switching-and-data-link-devices": [
    worked(
      "Worked example: count collision and broadcast domains",
      "A router has two ports. Port 1 connects to an 8-port switch with a PC on every port. Port 2 connects to a hub with 4 PCs. Count the collision and broadcast domains.",
      [
        ["Switch side", "Every switch port is its own collision domain: 8. The router link is one more."],
        ["Hub side", "A hub repeats every signal, so all its PCs share one collision domain."],
        ["Broadcast domains", "Only the router stops broadcasts, and each router port is one broadcast domain: 2."],
        ["Total collision domains", "8 PC ports + 1 switch-to-router link + 1 hub segment.", undefined, "10"],
      ],
      "10 collision domains, 2 broadcast domains",
      "Hubs: one of each. Switches split collision domains. Routers (and VLANs) split broadcast domains."
    ),
    practice([
      mcq("cn-lan-1", "A 24-port switch with no VLANs gives:", [
        ["24 collision domains and 1 broadcast domain", true, "Each port is its own collision domain; broadcasts still flood every port."],
        ["1 collision domain and 24 broadcast domains", false, "That's backwards."],
        ["24 of each", false, "Broadcasts cross a switch."],
      ], "Switches separate collision domains, not broadcast domains.", "foundation"),
      mcq("cn-lan-2", "What does the spanning tree protocol do?", [
        ["Disables some links so there are no switching loops", true, "Without it, broadcast frames would loop forever between redundant switches."],
        ["Finds shortest IP routes", false, "That's a routing protocol."],
        ["Assigns IP addresses", false, "That's DHCP."],
      ], "STP builds a loop-free tree over the switches, keeping redundant links on standby."),
      mcq("cn-lan-3", "A switch receives a frame for a MAC address it hasn't learned yet. It:", [
        ["Floods it to every port except the one it arrived on", true, "Then it learns the address from the reply."],
        ["Drops it", false, "Unknown unicast frames are flooded, not dropped."],
        ["Sends it back to the sender", false, "That never happens."],
      ], "Switches learn from source addresses and forward by destination addresses."),
    ]),
  ],

  "ipv4-fragmentation-and-cidr-subnetting": [
    worked(
      "Worked example: fragment an IP datagram",
      "A 4000-byte IPv4 datagram (20-byte header) crosses a link with MTU 1500. Give each fragment's data size and offset.",
      [
        ["Data to carry", "4000 − 20 header bytes.", "3980 bytes"],
        ["Largest data per fragment", "1500 − 20 = 1480, which is a multiple of 8, as offsets count in 8-byte units.", "1480 bytes"],
        ["Split the data", "1480 + 1480 + 1020 = 3980.", undefined, "3 fragments"],
        ["Offsets (in 8-byte units)", "0, 1480/8 = 185, 2960/8 = 370.", undefined, "0, 185, 370"],
        ["More-fragments flag", "Set on the first two, clear on the last."],
      ],
      "Fragments of 1480, 1480 and 1020 data bytes, at offsets 0, 185 and 370",
      "Fragment data must be a multiple of 8 bytes, except in the last fragment."
    ),
    practice([
      num("cn-ip-1", "How many usable host addresses does a /26 subnet have?", 62,
        "32 − 26 = 6 host bits: 2⁶ − 2 = 62 (the network and broadcast addresses can't be hosts).", "foundation"),
      mcq("cn-ip-2", "Which network does the host 200.1.1.130/26 belong to?", [
        ["200.1.1.128", true, "/26 blocks go in steps of 64: 0, 64, 128, 192. 130 falls in the block starting at 128."],
        ["200.1.1.0", false, "That block ends at .63."],
        ["200.1.1.64", false, "That block ends at .127."],
        ["200.1.1.192", false, "That starts above 130."],
      ], "The broadcast address of that subnet is 200.1.1.191."),
      num("cn-ip-3", "A 2400-byte datagram (20-byte header) crosses a link with MTU 820. How many fragments are made?", 3,
        "Data = 2380 bytes. Per fragment: 800 bytes (820 − 20, a multiple of 8). 800 + 800 + 780 = 2380, so 3 fragments."),
    ]),
  ],

  "distance-vector-vs-link-state": [
    worked(
      "Worked example: one distance vector update",
      "Router A reaches B at cost 2 and C at cost 7. B says its distance to D is 5; C says its distance to D is 1. What is A's new distance to D?",
      [
        ["Bellman-Ford equation", "d_A(D) = min over neighbours v of [cost(A, v) + d_v(D)]."],
        ["Through B", "2 + 5.", "7"],
        ["Through C", "7 + 1.", "8"],
        ["Take the minimum", "Choose B as the next hop.", "min(7, 8)", "7 via B"],
      ],
      "d_A(D) = 7, next hop B",
      "Distance vector uses only neighbours' vectors; link state floods the whole topology and runs Dijkstra locally."
    ),
    practice([
      mcq("cn-rt-1", "The count-to-infinity problem affects:", [
        ["Distance vector routing", true, "Bad news spreads slowly, as routers keep trusting old routes through each other."],
        ["Link state routing", false, "Each router has the whole map, so it recomputes correctly."],
        ["Both equally", false, "Link state doesn't suffer from it."],
      ], "Split horizon and poison reverse reduce, but don't always remove, count-to-infinity.", "foundation"),
      mcq("cn-rt-2", "Link state routers compute their routes with:", [
        ["Dijkstra's algorithm", true, "Each router runs it on the full topology it has learned (OSPF works this way)."],
        ["Bellman-Ford over neighbours' vectors", false, "That's distance vector (RIP)."],
        ["Flooding the data packets", false, "Only link-state advertisements are flooded."],
      ], "OSPF: link state, Dijkstra. RIP: distance vector, Bellman-Ford."),
      num("cn-rt-3", "A and B are directly linked at cost 1, and B is linked to C at cost 1. The B–C link fails. With no split horizon and costs counting to infinity at 16 (as in RIP), what is the largest finite cost B will hold for C before it gives up?", 15,
        "A and B keep raising each other's cost to C (3, 4, …) until it reaches 16, which RIP treats as unreachable. The largest finite value is 15.", "tricky"),
    ]),
  ],

  "tcp-connection-and-congestion-control": [
    worked(
      "Worked example: TCP slow start and congestion avoidance",
      "cwnd starts at 1 MSS with ssthresh = 16 MSS, and there are no losses. What is cwnd at the start of each of the first 9 rounds?",
      [
        ["Slow start", "Below ssthresh, cwnd doubles every round trip.", undefined, "1, 2, 4, 8, 16"],
        ["Reach ssthresh", "At 16, TCP switches to congestion avoidance."],
        ["Congestion avoidance", "cwnd grows by 1 MSS per round trip.", undefined, "17, 18, 19, 20"],
      ],
      "1, 2, 4, 8, 16, 17, 18, 19, 20",
      "On a timeout, ssthresh = cwnd/2 and cwnd goes back to 1. On 3 duplicate ACKs (Reno), cwnd = ssthresh = cwnd/2."
    ),
    practice([
      num("cn-tcp-1", "A client sends SYN with sequence number 100. What acknowledgement number does the server's SYN-ACK carry?", 101,
        "A SYN uses up one sequence number, so the server expects byte 101 next.", "foundation"),
      num("cn-tcp-2", "A TCP window of 65,535 bytes with an RTT of 10 ms. What is the maximum throughput, in Mbps? (Round to one decimal place.)", 52.4,
        "Throughput ≤ window/RTT = 65,535 × 8 / 0.010 ≈ 52.4 Mbps. This is why the window scaling option exists.", "gate-level", "Mbps", 0.1),
      mcq("cn-tcp-3", "cwnd = 20 MSS when a timeout occurs. Afterwards:", [
        ["ssthresh = 10 and cwnd = 1", true, "A timeout halves ssthresh and restarts slow start."],
        ["ssthresh = 20 and cwnd = 10", false, "That's not how TCP reacts to a timeout."],
        ["cwnd = 10, staying in congestion avoidance", false, "That's the fast-recovery reaction to 3 duplicate ACKs."],
      ], "Timeout: back to cwnd = 1. Three duplicate ACKs: halve and keep going."),
    ]),
  ],

  "dns-and-http-rtt-analysis": [
    worked(
      "Worked example: page load time, persistent vs non-persistent",
      "A page has a base HTML file and 10 small images on the same server. Ignore transmission time. How many RTTs does it take with (a) non-persistent HTTP, serially, and (b) persistent HTTP without pipelining?",
      [
        ["One object, non-persistent", "1 RTT for the TCP handshake plus 1 RTT for request and response.", "2 RTT"],
        ["(a) 11 objects in a row", "Every object pays the handshake again.", "11 × 2", "22 RTT"],
        ["(b) Persistent", "One handshake, then 1 RTT per object.", "1 + 11", "12 RTT"],
      ],
      "(a) 22 RTT   (b) 12 RTT",
      "Pipelining cuts (b) further: about 2 RTT for the base file, then about 1 RTT for all the images together."
    ),
    practice([
      mcq("cn-dns-1", "In iterative DNS resolution, who contacts the root, TLD and authoritative servers?", [
        ["The local resolver, one after another", true, "Each server replies with a referral, and the resolver follows it."],
        ["The root server, on the resolver's behalf", false, "That's recursive resolution."],
        ["The browser contacts all three directly", false, "The browser asks its local resolver."],
      ], "Iterative: referrals back to the resolver. Recursive: each server asks the next one itself.", "foundation"),
      num("cn-dns-2", "A page has 5 embedded objects. With non-persistent HTTP and requests made one at a time (ignore transmission time), how many RTTs does it take?", 12,
        "6 objects (base + 5) × 2 RTT each = 12 RTT."),
      mcq("cn-dns-3", "DNS queries normally travel over:", [
        ["UDP, port 53", true, "Small and fast; TCP port 53 is used for large replies and zone transfers."],
        ["TCP, port 80", false, "That's HTTP."],
        ["UDP, port 67", false, "That's DHCP."],
      ], "DNS: UDP/53 (TCP/53 for big responses). HTTP: TCP/80. HTTPS: TCP/443."),
    ]),
  ],

  "network-security-and-cryptography": [
    worked(
      "Worked example: RSA with small numbers",
      "p = 3, q = 11, e = 3. Find n, φ(n) and d; then encrypt m = 4 and decrypt the result.",
      [
        ["Modulus", "n = pq.", "3 · 11", "n = 33"],
        ["Totient", "φ(n) = (p − 1)(q − 1).", "2 · 10", "φ = 20"],
        ["Private key", "d is the inverse of e mod φ: 3d ≡ 1 (mod 20).", "3 · 7 = 21 ≡ 1", "d = 7"],
        ["Encrypt", "c = mᵉ mod n.", "4³ mod 33 = 64 mod 33", "c = 31"],
        ["Decrypt", "m = cᵈ mod n.", "31⁷ mod 33", "m = 4 ✓"],
      ],
      "n = 33, φ = 20, d = 7, ciphertext 31, which decrypts back to 4",
      "Real RSA uses primes hundreds of digits long; it's secure because factoring n is hard."
    ),
    practice([
      num("cn-sec-1", "Diffie-Hellman with p = 23 and g = 5. Alice picks a = 6 and Bob picks b = 15. What shared key do they compute?", 2,
        "Alice sends 5⁶ mod 23 = 8; Bob sends 5¹⁵ mod 23 = 19. Alice computes 19⁶ mod 23 = 2, and Bob computes 8¹⁵ mod 23 = 2."),
      num("cn-sec-2", "10 people each want a private channel with every other person using symmetric keys. How many keys are needed?", 45,
        "One key per pair: C(10, 2) = 10·9/2 = 45. With public-key cryptography each person needs one key pair instead.", "foundation"),
      mcq("cn-sec-3", "A digital signature is made by encrypting the message hash with the:", [
        ["Sender's private key", true, "Anyone can check it with the sender's public key, and only the sender could have made it."],
        ["Receiver's public key", false, "That gives confidentiality, not a signature."],
        ["Sender's public key", false, "Anyone could make that."],
      ], "Sign with your private key; encrypt to someone else with their public key."),
    ]),
  ],
};
