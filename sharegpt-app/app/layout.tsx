import "../styles/globals.css";
import "../styles/highlight.css";
// import { Analytics } from "@vercel/analytics/react";
import { SessionProvider } from "next-auth/react";
import cx from "classnames";
import { Inter } from "@next/font/google";
import localFont from "@next/font/local";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// const SFPro = localFont({
//   src: "../styles/SF-Pro-Display-Bold.otf",
//   variable: "--font-display",
// });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 dark:bg-[#343541]">
        <main className={cx(inter.variable)}>
          {children}
          {/* <Analytics /> */}
        </main>
      </body>
    </html>
  );
}
