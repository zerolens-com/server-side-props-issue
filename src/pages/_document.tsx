import React from "react";

import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render(): JSX.Element {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
            rel="stylesheet"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="#ffffff" />
        </Head>
        <body>
          <Main />
          <div id="modal_portal" />
          <NextScript />

          <svg
            style={{ width: 0, height: 0, position: "absolute" }}
            aria-hidden="true"
            focusable="false"
          >
            <linearGradient id="active-gradient" x2="1" y2="1">
              <stop offset="0%" stopColor="#88F1FF" />
              <stop offset="100%" stopColor="#417df0" />
            </linearGradient>
          </svg>
          <svg
            style={{ width: 0, height: 0, position: "absolute" }}
            aria-hidden="true"
            focusable="false"
          >
            <linearGradient id="gray-gradient" x2="1" y2="1">
              <stop offset="0%" stopColor="#dbdbdb" />
              <stop offset="100%" stopColor="#a6a6a6" />
            </linearGradient>
          </svg>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
