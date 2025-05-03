import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
    headers: async () => {
        return [
            {
                source: "/api/:path*",
                headers: [
                    {
                        key: "Access-Control-Allow-Origin",
                        value: "*"
                    },
                    {
                        key: "Access-Control-Allow-Methods",
                        value: "GET,OPTIONS,PATCH,DELETE,POST,PUT"
                    },
                    {
                        key: "Access-Control-Allow-Headers",
                        value: "X-CSRF-Token, X-Requested-With, Authorization"
                    }
                ]
            },
            {
                source: "/_next/static/:path*",
                headers: [
                    { key: "Cache-Control", value: "no-cache, max-age=0" }
                ]
            }
        ];
    }
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
