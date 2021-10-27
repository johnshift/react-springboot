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
  styles: {
    global: (props: Dict<any>) => ({
      body: {
        bg: mode("black", "white")(props),
        color: mode("white", "black")(props),
      },
    }),
  },
  components: {
    Menu: {
      parts: ["menu", "list", "item"],
      baseStyle: (props: Dict<any> | StyleFunctionProps) => ({
        menu: {
          bg: mode("black", "white")(props),
          color: mode("white", "black")(props),
        },
        item: {
          bg: mode("black", "white")(props),
          color: mode("white", "black")(props),
        },
        list: {
          bg: mode("black", "white")(props),
          color: mode("white", "black")(props),
        },
      }),
    },
    Button: {
      baseStyle: (props: Dict<any> | StyleFunctionProps) => ({
        bg: mode("black", "white")(props),
        color: mode("white", "black")(props),
      }),
      variants: (props: Dict<any> | StyleFunctionProps) => ({
        outline: {
          color: mode("white", "black")(props),
        },
      }),
    },
  },
  colors: {
    black: "#2b2c2e",
    white: "#f2f2f2",
  },
});
export default theme;
