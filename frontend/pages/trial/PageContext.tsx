import React, { createContext, ReactNode } from "react";

// this is the type for custom context on this page
export type PageContext = {
  pageProps: string;
};

const Context = createContext<PageContext>(undefined as any);

// this is the root context provider used by the shell
export const PageContextProvider = ({
  pageContext,
  children,
}: {
  pageContext: PageContext;
  children: ReactNode;
}) => {
  return <Context.Provider value={pageContext}>{children}</Context.Provider>;
};
