import { extendTheme } from "@chakra-ui/react";

import {
  createBreakpoints,
  mode,
  StyleFunctionProps,
} from "@chakra-ui/theme-tools";
import { Dict } from "@chakra-ui/utils";

const theme = extendTheme({
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
  breakpoints: createBreakpoints({
    sm: "48em", // tab
    md: "62em", // small screen
    lg: "85em", // laptop common
    xl: "96em", // hd
  }),
  colors: {
    black: "#2b2c2e",
    white: "#f2f2f2",
    blackhl: "#343538",
    whitehl: "#e6e7e8",
  },
});
export default theme;
