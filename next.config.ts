import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Old routes → new worlds
      { source: "/browse", destination: "/notes", permanent: true },
      { source: "/series-hub", destination: "/notes", permanent: true },
      { source: "/themes", destination: "/notes", permanent: true },
      { source: "/notifications", destination: "/", permanent: true },
      { source: "/community", destination: "/", permanent: true },
      { source: "/map-v2", destination: "/wonder", permanent: true },
    ];
  },
};

export default nextConfig;
