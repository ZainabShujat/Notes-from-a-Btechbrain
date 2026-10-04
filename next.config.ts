import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Old routes → new worlds
      { source: "/browse", destination: "/editions", permanent: true },
      { source: "/series-hub", destination: "/editions", permanent: true },
      { source: "/themes", destination: "/editions", permanent: true },
      { source: "/the-work-we-do", destination: "/work", permanent: true },
      { source: "/notifications", destination: "/", permanent: true },
      { source: "/community", destination: "/", permanent: true },
      { source: "/map-v2", destination: "/wonder", permanent: true },
    ];
  },
};

export default nextConfig;
