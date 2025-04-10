import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Убрали async headers() для CORS, так как теперь это обрабатывается в middleware.ts
};

export default nextConfig;
