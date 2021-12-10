import React from "react";
import ReactDOM from "react-dom";
import { getPage, PageContextBuiltInClient } from "vite-plugin-ssr/client";
import { PageContext } from "./PageContext";
import Shell from "./Shell";

export const hydrate = async () => {
  const pageContext = await getPage<PageContextBuiltInClient & PageContext>();
  const { Page, pageProps } = pageContext;

  ReactDOM.hydrate(
    <Shell pageContext={pageContext}>
      <Page {...pageProps} />
    </Shell>,
    document.getElementById("page-view")
  );
};

hydrate();
