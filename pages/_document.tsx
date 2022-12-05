import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <meta title="ShareGPT: easily share your ChatGPT conversations with friends" />
        <meta
          name="description"
          content="Chrome Extension to let you share your ChatGPT conversations in one click"
        />
      </Head>
      <body className="bg-white dark:bg-[#343541]">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
