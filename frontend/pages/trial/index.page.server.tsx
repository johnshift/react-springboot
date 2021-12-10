import React from "react";
import ReactDOMServer from "react-dom/server";
import {
  dangerouslySkipEscape,
  escapeInject,
  PageContextBuiltIn,
} from "vite-plugin-ssr";
import { PageContext } from "./PageContext";
import Shell from "./Shell";

// this is the type for the props sent to client
export type PassProps = {
  msgFromServerPage: string;
};

// we need to include passProps
export const passToClient = ["pageProps"];

export const onBeforeRender = async (pageContext: PageContext) => {
  // pageProps is supplied to page-view inside the shell component
  // this is both declared on server.render and client.hydrate
  // note: you need to include it on 'passToClient'
  const passProps: PassProps = {
    msgFromServerPage: "hello from server page",
  };

  // // simulate network delay
  // console.log("sleeping ...", new Date().getTime());
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  // console.log("woke up ...", new Date().getTime());

  return {
    pageContext: {
      pageProps: passProps,
    },
  };
};

export const render = async (pageContext: PageContextBuiltIn & PageContext) => {
  const { Page, pageProps } = pageContext;

  // we will pre-render the page with provided props
  const preRenderedPage = ReactDOMServer.renderToString(
    <Shell pageContext={pageContext}>
      <Page {...pageProps} />
    </Shell>
  );

  // const preRenderedPage = ReactDOMServer.renderToString(<h1>FUCK YOU</h1>);

  const description = "Hello vite-plugin-ssr";
  const title = "Trial Page";

  // note 'documentHtml' key is required
  const documentHtml = escapeInject`
		<html lang='en'>
			<head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="${description}" />
				<title>${title}</title>
			</head>
			<body>
				<div id="page-view">${dangerouslySkipEscape(preRenderedPage)}</div>
			</body>
		</html>`;

  return {
    documentHtml,
    pageContext: {
      // We can add some `pageContext` here, which is useful if we want to do page redirection https://vite-plugin-ssr.com/page-redirection
    },
  };
};
