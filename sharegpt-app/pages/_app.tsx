import "../styles/globals.css";
import "../styles/highlight.css";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";
import cx from "classnames";
import { Inter } from "@next/font/google";
import localFont from "@next/font/local";

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

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={session}>
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <p>Due to high volumes of traffic, ShareGPT is down for maintenance.</p>
        <p>We&apos;ll be back shortly.</p>
      </div>
      {/* <main className={cx(inter.variable, satoshi.variable)}>
        <Component {...pageProps} />
        <Analytics />
      </main> */}
    </SessionProvider>
  );
}

export default MyApp;
