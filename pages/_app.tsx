import "../styles/globals.css";
import "../styles/highlight.css";
import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";
import cx from "classnames";
import { Inter, Cormorant_Garamond } from "@next/font/google";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: "700",
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className={cx(inter.variable, cormorant.variable)}>
      <Component {...pageProps} />
      <Analytics />
    </main>
  );
}

export default MyApp;
