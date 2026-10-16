import type { LessonMeta } from "./types";

export const CN_NAT_AND_IP_SUPPORT_LESSON: LessonMeta = {
  id: "nat-and-ip-support-protocols",
  title: "NAT, and the Helpers Around IP: ARP, DHCP & ICMP",
  slug: "nat-and-ip-support-protocols",
  order: 2,
  estimatedMinutes: 28,
  tagline: "How a whole hostel Wi-Fi shares one public IP, and the small protocols that make IP usable at all.",
  hasInteractive: false,
  hasGATE: true,
  hasPractice: true,
  syllabusScope: "GATE 2027 CS/IT core: Network Address Translation. ARP, DHCP and ICMP are enrichment (not named in the 2027 list) but standard B.Tech material.",
  cheatsheet: {
    summaryRule:
      "NAT (in its common port-translating form, NAPT) rewrites the source IP and port of outgoing packets to the router's public IP and a chosen port, remembers the mapping in a translation table, and uses that table to rewrite the destination of replies.",
    keyFormulasAndRules: [
      "Private IPv4 ranges (RFC 1918): 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16.",
      "NAPT table entry: (private IP, private port) ↔ (public IP, public port), per transport protocol.",
      "Outbound: rewrite SOURCE IP:port. Inbound reply: rewrite DESTINATION IP:port using the table.",
      "After rewriting, NAT must recompute the IP header checksum and the TCP/UDP checksum (its pseudo-header includes the IP addresses).",
      "ARP: resolves an IPv4 address to a MAC address on the same link. Request is broadcast, reply is unicast.",
      "DHCP: Discover → Offer → Request → Acknowledge (DORA), over UDP (server port 67, client port 68).",
      "ICMP: carried inside IP (protocol number 1). Echo request/reply = types 8/0, destination unreachable = 3, time exceeded = 11.",
    ],
    examPitfalls: [
      "A host sending to a remote network ARPs for its default gateway's MAC, not the remote host's MAC.",
      "Across hops the MAC addresses change at every router; the IP addresses stay the same unless NAT rewrites them.",
      "NAT alone does not let outside hosts start connections to inside hosts; that needs a static mapping (port forwarding).",
      "A 16-bit port field limits how many simultaneous mappings one public IP can hold per protocol.",
    ],
  },
  sections: [
    {
      type: "explanation",
      heading: "1. Why NAT exists",
      body: [
        "**Prerequisites:** IPv4 addressing and CIDR from [IPv4 fragmentation and CIDR subnetting](/notes/computer-networks/ipv4-fragmentation-and-cidr-subnetting), and the idea of TCP/UDP ports.",
        "IPv4 has a 32-bit address space, which is not enough for every phone and laptop to get its own globally unique address. RFC 1918 reserves three blocks for private use inside organisations: ==yellow:10.0.0.0/8, 172.16.0.0/12 and 192.168.0.0/16==. Routers on the public internet do not forward packets addressed to these ranges, so many networks can reuse the same private addresses.",
        "A NAT router sits at the border between the private network and the internet. It owns at least one public address. When an inside host talks to the outside, the router rewrites the packet so it appears to come from the public address, and it keeps enough state to send the reply back to the right inside host.",
      ],
      callout: {
        kind: "mental-model",
        title: "Think of a hostel reception desk",
        message:
          "Everyone in the hostel posts letters with the hostel's single street address. Reception notes which room sent which letter, so when a reply arrives addressed to the hostel, it knows which room to hand it to.",
      },
    },
    {
      type: "explanation",
      heading: "2. How port translation (NAPT) works",
      body: [
        "Most home and campus routers do ==purple:Network Address and Port Translation (NAPT)==, so many inside hosts share one public IP. The router tells conversations apart using transport ports.",
        "**Outbound:** a packet leaves host 192.168.1.10 from port 5000. The router picks an unused public port, say 40001, rewrites the packet's source to its public address and port 40001, and records the mapping (192.168.1.10:5000 ↔ public:40001) in its translation table.",
        "**Inbound:** the server replies to public:40001. The router looks up port 40001, rewrites the destination back to 192.168.1.10:5000, and forwards it inside.",
        "Because the IP addresses and ports changed, the router must ==green:recompute the IP header checksum and the TCP/UDP checksum==. The transport checksum covers a pseudo-header that includes the source and destination IP addresses, so it changes too.",
      ],
    },
    {
      type: "worked-example",
      heading: "3. Worked trace: one request through NAT",
      problemStatement:
        "A laptop at 192.168.1.10 opens a TCP connection from port 5000 to a web server at 198.51.100.20, port 80. The NAT router's public address is 203.0.113.5, and it assigns public port 40001. Write the source and destination IP:port of the packet on each side of the router, in both directions.",
      givenData: [
        { label: "Inside host", value: "192.168.1.10:5000" },
        { label: "Server", value: "198.51.100.20:80" },
        { label: "Router public IP", value: "203.0.113.5" },
        { label: "Assigned public port", value: "40001" },
      ],
      steps: [
        { stepNumber: 1, title: "Request, inside the LAN", description: "The laptop sends the packet unchanged.", intermediateResult: "src 192.168.1.10:5000 → dst 198.51.100.20:80" },
        { stepNumber: 2, title: "Request, after NAT", description: "The router rewrites only the source and stores the mapping 192.168.1.10:5000 ↔ 203.0.113.5:40001.", intermediateResult: "src 203.0.113.5:40001 → dst 198.51.100.20:80" },
        { stepNumber: 3, title: "Reply, on the internet", description: "The server answers whoever appeared to send the request.", intermediateResult: "src 198.51.100.20:80 → dst 203.0.113.5:40001" },
        { stepNumber: 4, title: "Reply, after NAT", description: "The router finds port 40001 in its table and rewrites only the destination.", intermediateResult: "src 198.51.100.20:80 → dst 192.168.1.10:5000" },
      ],
      finalAnswer:
        "Outbound, NAT rewrites the source (192.168.1.10:5000 becomes 203.0.113.5:40001). Inbound, it rewrites the destination back. The server never sees the private address.",
      examTakeaway: "Outbound changes the source; inbound changes the destination. The server side of the conversation is never rewritten.",
      notes: ["Example addresses come from blocks reserved for documentation (RFC 5737), so they do not point at real hosts."],
    },
    {
      type: "comparison",
      heading: "4. What NAT costs you",
      columns: ["Benefit", "Cost"],
      criteria: [
        { criterion: "Address space", values: ["Many hosts share one public IPv4 address", "The 16-bit port space limits simultaneous mappings per public IP and protocol"] },
        { criterion: "Reachability", values: ["Inside hosts are not directly addressable from outside", "Outside hosts cannot start connections inward without a static mapping (port forwarding)"] },
        { criterion: "Layering", values: ["Transparent to most client-server apps", "Breaks the end-to-end principle: a network-layer device edits transport-layer ports"] },
        { criterion: "Protocols", values: ["Works for ordinary TCP/UDP flows", "Protocols that carry IP addresses inside their payload need special helpers"] },
      ],
      summaryTakeaway: "NAT is a workaround for IPv4 address shortage, not a security feature by design, even though it hides inside addresses.",
    },
    {
      type: "explanation",
      heading: "5. ARP: from IP address to MAC address (enrichment)",
      body: [
        "IP gets a packet to the right network, but on the final link the frame needs a MAC address. The ==purple:Address Resolution Protocol (ARP)== finds the MAC address that belongs to an IPv4 address on the same link.",
        "The sender broadcasts an ARP request (destination MAC FF:FF:FF:FF:FF:FF) asking who has a given IP. The owner answers with a unicast ARP reply containing its MAC. Both sides cache the result in an ARP table for a while, so most packets need no ARP traffic.",
        "If the destination is on another network, the host does not ARP for the remote host. It ARPs for its ==yellow:default gateway's MAC== and sends the frame there, with the IP destination still set to the remote host.",
      ],
      callout: {
        kind: "trap",
        title: "Which addresses change hop by hop?",
        message:
          "At every router the frame is rebuilt, so source and destination MAC addresses change on every link. The source and destination IP addresses stay the same along the path, unless a NAT device rewrites them.",
      },
    },
    {
      type: "explanation",
      heading: "6. DHCP and ICMP (enrichment)",
      body: [
        "**DHCP** gives a joining host its IP address, subnet mask, default gateway and DNS server, leased for a limited time. The exchange is ==green:Discover → Offer → Request → Acknowledge (DORA)==. The client has no address yet, so its Discover goes out from 0.0.0.0 to the broadcast address 255.255.255.255, over UDP from client port 68 to server port 67.",
        "**ICMP** carries error reports and diagnostics for IP. It travels inside IP packets (protocol number 1). Common types: ==yellow:echo request (8) and echo reply (0)==, used by ping; ==yellow:destination unreachable (3)==; and ==yellow:time exceeded (11)==, sent when a router decrements TTL to zero.",
        "Traceroute uses time exceeded: it sends probes with TTL = 1, 2, 3, … and each router that drops a probe reveals itself with an ICMP time-exceeded message. Path MTU discovery uses the destination-unreachable 'fragmentation needed' code, sent when a packet with the Don't Fragment bit is too large for the next link.",
      ],
    },
    {
      type: "misconceptions",
      heading: "7. Common mix-ups",
      items: [
        { commonMyth: "NAT changes the destination address of outgoing packets.", reality: "Outgoing packets get a new source; replies get a new destination.", explanation: "The server's address is never touched. Only the inside host's address and port are hidden behind the router's." },
        { commonMyth: "To reach a host on another network, ARP for that host's MAC.", reality: "ARP only works on the local link; you ARP for the gateway.", explanation: "ARP requests are broadcasts, and broadcasts do not cross routers." },
        { commonMyth: "ICMP runs over TCP or UDP.", reality: "ICMP sits directly inside IP.", explanation: "ICMP messages use IP protocol number 1. They have no TCP or UDP header." },
      ],
    },
    {
      type: "practice",
      heading: "Practice",
      questions: [
        {
          id: "cn-nat-1",
          prompt: "A NAT router with public address P receives an outgoing TCP segment from 10.0.0.7:3000 to S:443. Which fields does it rewrite?",
          type: "single-choice",
          options: [
            { id: "a", text: "Source IP and source port", isCorrect: true, explanation: "Outbound packets get the router's public IP and an assigned public port as their source." },
            { id: "b", text: "Destination IP and destination port", isCorrect: false, explanation: "That rewrite happens to the reply, coming back in." },
            { id: "c", text: "Only the source IP, never the port", isCorrect: false, explanation: "That is basic NAT. Port translation (NAPT) also rewrites the port so many hosts can share one IP." },
          ],
          explanation: "Outbound: rewrite the source. Inbound: rewrite the destination.",
          difficulty: "foundation",
        },
        {
          id: "cn-nat-2",
          prompt: "Host H (192.168.1.5) sends an IP packet to a server on another network through its gateway R. Which destination MAC address is in the frame H transmits?",
          type: "single-choice",
          options: [
            { id: "a", text: "R's MAC address", isCorrect: true, explanation: "H ARPs for its gateway and hands the frame to R." },
            { id: "b", text: "The server's MAC address", isCorrect: false, explanation: "ARP cannot resolve addresses beyond the local link." },
            { id: "c", text: "FF:FF:FF:FF:FF:FF", isCorrect: false, explanation: "Only the ARP request is broadcast. The data frame is unicast to the gateway." },
          ],
          explanation: "IP destination = server; MAC destination = next hop.",
          difficulty: "gate-level",
        },
        {
          id: "cn-nat-3",
          prompt: "Why must a NAT router recompute the TCP checksum after rewriting only IP addresses and ports?",
          type: "single-choice",
          options: [
            { id: "a", text: "The TCP checksum covers a pseudo-header that includes the IP addresses, plus the port fields", isCorrect: true, explanation: "Changing any covered field invalidates the checksum." },
            { id: "b", text: "TCP checksums are recomputed by every router", isCorrect: false, explanation: "Ordinary routers do not touch the transport checksum." },
          ],
          explanation: "The pseudo-header ties the transport checksum to the IP addresses.",
          difficulty: "tricky",
        },
        {
          id: "cn-nat-4",
          prompt: "Which ICMP message type does traceroute rely on to discover each router on the path?",
          type: "single-choice",
          options: [
            { id: "a", text: "Time exceeded (type 11)", isCorrect: true, explanation: "Each router that decrements TTL to zero reports back with time exceeded." },
            { id: "b", text: "Echo reply (type 0)", isCorrect: false, explanation: "Echo reply comes only from the final destination when probing with ping." },
          ],
          explanation: "Probes with increasing TTL make each hop reveal itself.",
          difficulty: "foundation",
        },
      ],
    },
    {
      type: "quick-revision",
      heading: "One-minute revision",
      oneMinutePanicCard: {
        coreRule: "NAT: outbound rewrites source IP:port, inbound rewrites destination IP:port, using a translation table.",
        mustRememberFormulas: [
          "Private: 10/8, 172.16/12, 192.168/16",
          "NAPT entry: (private IP, port) ↔ (public IP, port)",
          "DHCP: DORA over UDP 68 → 67",
          "ICMP types: 8/0 echo, 3 unreachable, 11 time exceeded",
        ],
        criticalPitfalls: [
          "ARP for the gateway when the destination is remote",
          "MACs change every hop; IPs don't (unless NAT)",
          "NAT breaks inbound connections without port forwarding",
          "Recompute IP and TCP/UDP checksums after rewriting",
        ],
      },
    },
    {
      type: "resources",
      heading: "References",
      sources: [
        { title: "GATE 2027 CS/IT syllabus", authorOrInstitution: "IIT Madras", url: "https://gate2027.iitm.ac.in/static/doc/GATE2027_Syllabus/CS_GATE2027_Syllabus.pdf", type: "gate-official", topic: "Computer Networks: IPv4 fragmentation, CIDR notation, Network Address Translation." },
        { title: "RFC 3022: Traditional IP Network Address Translator (Traditional NAT)", authors: "P. Srisuresh, K. Egevang", year: "2001", url: "https://www.rfc-editor.org/rfc/rfc3022", type: "primary-standard", topic: "Basic NAT and NAPT, translation tables, checksum adjustment." },
        { title: "RFC 1918: Address Allocation for Private Internets", year: "1996", url: "https://www.rfc-editor.org/rfc/rfc1918", type: "primary-standard", topic: "The three private IPv4 address blocks." },
        { title: "RFC 826: An Ethernet Address Resolution Protocol", authors: "D. Plummer", year: "1982", url: "https://www.rfc-editor.org/rfc/rfc826", type: "primary-standard", topic: "ARP request/reply." },
        { title: "RFC 2131: Dynamic Host Configuration Protocol", authors: "R. Droms", year: "1997", url: "https://www.rfc-editor.org/rfc/rfc2131", type: "primary-standard", topic: "DHCP message exchange and leases." },
        { title: "RFC 792: Internet Control Message Protocol", authors: "J. Postel", year: "1981", url: "https://www.rfc-editor.org/rfc/rfc792", type: "primary-standard", topic: "ICMP message types." },
        { title: "Computer Networking: A Top-Down Approach", authors: "James F. Kurose, Keith W. Ross", publisher: "Pearson", type: "primary-standard", topic: "Network layer chapters: NAT, DHCP, ICMP; link layer chapter: ARP." },
      ],
    },
  ],
};
