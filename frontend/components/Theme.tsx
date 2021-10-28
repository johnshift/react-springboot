import { extendTheme } from "@chakra-ui/react";

import { createBreakpoints } from "@chakra-ui/theme-tools";

const Button = {
  baseStyle: {
    _focus: {
      boxShadow: "none",
    },
  },
  variants: {
    link: {
      color: "blackt",
    },
    ghost: {
      _hover: {
        bg: "whitehl",
      },
    },
  },
  sizes: {},
  defaultProps: {},
};

const theme = extendTheme({
  breakpoints: createBreakpoints({
    sm: "48em", // tab
    md: "62em", // small screen
    lg: "85em", // laptop common
    xl: "96em", // hd
  }),
  colors: {
    black: "#2b2c2e",
    blackt: "#5f6161",
    white: "#f2f2f2",
    whiter: "#fcfcfc",
    blackhl: "#343538",
    whitehl: "#e6e7e8",
  },
  components: {
    Button,
  },
});
export default theme;
