import { ChakraProvider } from "@chakra-ui/react";
import React, { ReactNode } from "react";
import { PageContext, PageContextProvider } from "./PageContext";

// this is the custom shell for this page
// used both by server.render and client.hydrate
const Shell = ({
  pageContext,
  children,
}: {
  pageContext: PageContext;
  children: ReactNode;
}) => {
  return (
    <React.StrictMode>
      <PageContextProvider pageContext={pageContext}>
        <ChakraProvider>{children}</ChakraProvider>
      </PageContextProvider>
    </React.StrictMode>
  );
};

export default Shell;
