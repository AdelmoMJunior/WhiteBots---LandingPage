import createNextIntlPlugin from "next-intl/plugin";
import type {NextConfig} from "next";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const isDev = process.env.NODE_ENV !== "production";
const supabaseOrigin = process.env.NEXT_PUBLIC_SUPABASE_URL
  ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).origin
  : "https://*.supabase.co";

const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://www.googletagmanager.com`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  `connect-src 'self' ${supabaseOrigin} https://*.supabase.co wss://*.supabase.co https://www.google-analytics.com https://region1.google-analytics.com https://analytics.google.com`,
  "worker-src 'self' blob:",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'"
].join("; ");

const nextConfig: NextConfig = {
  poweredByHeader: false,
  allowedDevOrigins: ["127.0.0.1"],
  images: {
    formats: ["image/avif", "image/webp"]
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {key: "Content-Security-Policy", value: csp},
          {key: "Referrer-Policy", value: "strict-origin-when-cross-origin"},
          {key: "X-Content-Type-Options", value: "nosniff"},
          {key: "X-Frame-Options", value: "DENY"},
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=()"
          }
        ]
      }
    ];
  }
};

export default withNextIntl(nextConfig);
