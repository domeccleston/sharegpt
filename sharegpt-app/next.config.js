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
      "avatars.dicebear.com",
      "pbs.twimg.com",
      "abs.twimg.com",
      "images.unsplash.com",
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
        source: "/extension",
        destination:
          "https://chrome.google.com/webstore/detail/sharegpt/daiacboceoaocpibfodeljbdfacokfjb?hl=en&authuser=0",
        permanent: false,
      },
      {
        source: "/shortcut",
        destination:
          "https://www.icloud.com/shortcuts/bc0d1abea36f46c4838da29d25cd43d6",
        permanent: false,
      },
      {
        source: "/github",
        destination: "https://github.com/domeccleston/sharegpt",
        permanent: false,
      },
      {
        source: "/mentions",
        destination:
          "https://twitter.com/search?q=shareg.pt%20-from%3Asteventey&src=typed_query&f=top", // show ShareGPT mentions on Twitter that are not from @steventey
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
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "shareg.pt",
          },
        ],
        destination: "https://sharegpt.com/c/:path*",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
