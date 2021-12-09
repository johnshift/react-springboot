import type { AppProps } from "next/app";
import Head from "next/head";
import { Toaster } from "react-hot-toast";

import "../../styles/global.min.css";
import "../../styles/windi.min.css";
import { DEFAULT_META_DESCRIPTION, DEFAULT_PAGE_TITLE } from "../lib/constants";
import { AuthProvider } from "../lib/contexts/auth";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>{DEFAULT_PAGE_TITLE}</title>
        <meta name="description" content={DEFAULT_META_DESCRIPTION} />
      </Head>
      <Toaster />
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </>
  );
}

export default MyApp;
