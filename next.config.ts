import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // if the cookie `user_token` is present,
      // this redirect will NOT be applied
      {
        source: "/",
        missing: [
          {
            type: "cookie",
            key: "access_token",
          },
        ],
        permanent: false,
        destination: "/auth/login",
      },{
        source: "/auth/:slug*",
        has: [
          {
            type: "cookie",
            key: "access_token",
          },
        ],
        permanent: false,
        destination: "/",
      }
    ];
  }
};

export default nextConfig;
