import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";

import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

import Nav from "../components/Nav";

const breakpoints = createBreakpoints({
  sm: "48em", // tab
  md: "62em", // small screen
  lg: "85em", // laptop common
  xl: "96em", // hd
});

const theme = extendTheme({ breakpoints });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Nav />
      <Component {...pageProps} />{" "}
    </ChakraProvider>
  );
}

export default MyApp;
