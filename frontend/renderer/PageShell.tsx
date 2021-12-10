import React from "react";
import { PageContextProvider } from "./usePageContext";
import type { PageContext } from "./types";
import { ChakraProvider } from "@chakra-ui/react";

export { PageShell };

function PageShell({
  children,
  pageContext,
}: {
  children: React.ReactNode;
  pageContext: PageContext;
}) {
  return (
    <React.StrictMode>
      <PageContextProvider pageContext={pageContext}>
        <ChakraProvider>{children}</ChakraProvider>
      </PageContextProvider>
    </React.StrictMode>
  );
}
