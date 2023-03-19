import "../styles/globals.css";
import "../styles/highlight.css";

import { Analytics } from "@vercel/analytics/react";

import { Inter } from "@next/font/google";
import localFont from "@next/font/local";

import cx from "classnames";

const satoshi = localFont({
  src: "../styles/Satoshi-Variable.woff2",
  variable: "--font-satoshi",
  weight: "300 900",
  display: "swap",
  style: "normal",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "ShareGPT: Share your wildest ChatGPT conversations with one click.",
  description:
    "ShareGPT is a Chrome extension that allows you to share your wildest ChatGPT conversations with one click.",
  image: "https://sharegpt.com/thumbnail.png",
  imageAlt: "OG image for the ShareGPT application",
  canonical: "https://sharegpt.com",
  something: "false",
  manifest: "https://sharegpt.com/site.webmanifest",
  openGraph: {
    title: "ShareGPT: Share your wildest ChatGPT conversations with one click.",
    description:
      "ShareGPT is a Chrome extension that allows you to share your wildest ChatGPT conversations with one click.",
    images: [
      {
        url: "https://sharegpt.com/thumbnail.png",
        alt: "OG image for the ShareGPT application",
      },
    ],
  },
  icons: {
    apple: {
      url: "/favicons/apple-touch-icon.png",
      sizes: "180x180",
      type: "image/png",
    },
    icon: [
      {
        url: "/favicons/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/favicons/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@Vercel",
    creator: "@dom__inic",
    title: "ShareGPT: Share your wildest ChatGPT conversations with one click.",
    description:
      "ShareGPT is a Chrome extension that allows you to share your wildest ChatGPT conversations with one click.",
    image: "https://sharegpt.com/thumbnail.png",
  },
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 dark:bg-[#343541]">
        <main className={cx(inter.variable, satoshi.variable)}>
          {children}
          <Analytics />
        </main>
      </body>
    </html>
  );
}
