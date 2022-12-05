/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["s.gravatar.com", "lh3.googleusercontent.com"],
  },
  async headers() {
    return [
      {
        source: "/api/save",
        headers: [
          {
            source: "/:slug",
            headers: [
              {
                key: "x-robots-tag",
                value: "noindex",
              },
            ],
          },
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/",
        has: [
          {
            type: "host",
            value: `chatg.pt`,
          },
        ],
        destination: "https://chat.openai.com", // redirect to OpenAI for now
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
