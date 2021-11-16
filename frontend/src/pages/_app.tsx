import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";

import { QueryClient, QueryClientProvider } from "react-query";

import { RecoilRoot } from "recoil";

import "./index.css";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

// if (process.env.NODE_ENV === "development") {
require("../mocks");
// }

const queryClient = new QueryClient();

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        {getLayout(<Component {...pageProps} />)}
      </QueryClientProvider>
    </RecoilRoot>
  );
};

export default MyApp;
