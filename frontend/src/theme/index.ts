import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

const theme = extendTheme({
  // breakpoints: createBreakpoints({
  //   // xs: small phone (first)
  //   sm: "25em", // hd phone
  //   md: "48em", // tab
  //   lg: "70em", // laptop common
  //   xl: "95em", // laptop medium
  //   // xxl: hd (last)
  // }),
  breakpoints: createBreakpoints({
    sm: "48em", // tab
    md: "62em", // small laptop
    lg: "90em", // large laptop
    xl: "95em", // hd
  }),
});

export default theme;
