/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "avatar.vercel.sh",
      "s.gravatar.com",
      "lh3.googleusercontent.com",
      "www.datocms-assets.com",
    ],
  },
  async headers() {
    return [
      {
        source: "/:slug",
        headers: [
          {
            key: "Referrer-Policy",
            value: "no-referrer-when-downgrade",
          },
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "x-robots-tag",
            value: "noindex",
          },
        ],
      },
      {
        source: "/api/save",
        headers: [
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
            value: "chatg.pt",
          },
        ],
        destination: "https://chat.openai.com", // redirect to OpenAI for now
        permanent: false,
      },
      {
        source: "/",
        has: [
          {
            type: "host",
            value: "shareg.pt",
          },
        ],
        destination: "https://sharegpt.com",
        permanent: false,
      },
      {
        source: "/extension",
        destination:
          "https://chrome.google.com/webstore/detail/sharegpt/daiacboceoaocpibfodeljbdfacokfjb?hl=en&authuser=0", // redirect to GH repo for now, will need to update when we get in the chrome store
        permanent: false,
      },
      {
        source: "/mentions",
        destination:
          "https://twitter.com/search?q=shareg.pt%20-from%3Asteventey&src=typed_query&f=top", // show ShareGPT mentions on Twitter that are not from @steventey
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
