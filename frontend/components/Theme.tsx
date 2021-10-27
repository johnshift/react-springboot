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
      parts: ["list", "item"],
      baseStyle: (props: Dict<any> | StyleFunctionProps) => ({
        item: {
          bg: mode("black", "white")(props),
          color: mode("white", "black")(props),
          transitionProperty: "background",
          transitionDuration: "ultra-fast",
          transitionTimingFunction: "ease-in",
          py: "10px",
          _focus: {
            bg: mode("blackhl", "whitehl")(props),
          },
          // _active: {
          //   bg: mode("gray.200", "whiteAlpha.200")(props),
          // },
          // _expanded: {
          //   bg: mode("gray.100", "whiteAlpha.100")(props),
          // },
          // _disabled: {
          //   opacity: 0.4,
          //   cursor: "not-allowed",
          // },
        },
        list: {
          bg: mode("black", "white")(props),
          color: mode("white", "black")(props),
          boxShadow: mode("sm", "dark-lg")(props),
          // minW: "3xs",
          py: "1",
          zIndex: 1,
          // borderRadius: "md",
          borderWidth: "0px",
          borderRadius: "lg",
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
    blackhl: "#343538",
    whitehl: "#e6e7e8",
  },
});
export default theme;
