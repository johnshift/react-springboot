import NextDocument, { Html, Head, Main, NextScript } from "next/document";
export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta
            name="description"
            content="Share your secrets to your circle without them knowing its you!"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
