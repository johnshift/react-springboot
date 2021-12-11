import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import Head from "next/head";
import theme from "../theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Head>
        <title>Veils App</title>
        <meta name="description" content="Share your secrets anonymously" />
      </Head>

      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
