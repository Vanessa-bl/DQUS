import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import path from "node:path";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  outputFileTracingRoot: path.resolve(__dirname),

  async redirects() {
    return [
      {
        source: "/contadores",
        destination: "/es/accountants",
        permanent: true,
      },
      {
        source: "/pago-exitoso",
        destination: "/es/payment-success",
        permanent: true,
      },
      {
        source: "/pago-error",
        destination: "/es/payment-error",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
