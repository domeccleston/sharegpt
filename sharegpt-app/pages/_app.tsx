import "../styles/globals.css";
import "../styles/highlight.css";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";
import cx from "classnames";
import { Inter } from "@next/font/google";
import localFont from "@next/font/local";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const SFPro = localFont({
  src: "../styles/SF-Pro-Display-Bold.otf",
  variable: "--font-display",
});

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={session}>
      <main className={cx(inter.variable, SFPro.variable)}>
        <Component {...pageProps} />
        <Analytics />
      </main>
    </SessionProvider>
  );
}

export default MyApp;
