import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  ...(process.env.NODE_ENV === "development" && {
    webpack: (config) => {
      config.cache = false;
      return config;
    },
  }),
};

export default nextConfig;
