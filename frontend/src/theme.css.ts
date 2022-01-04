import {
  createTheme,
  globalStyle,
  createGlobalTheme,
} from "@vanilla-extract/css";

// vars -> independent of theme
export const vars = createGlobalTheme(":root", {
  colors: {
    default: "whitesmoke",
    red: "#b50e0e",
  },
});

export const [lightTheme, themeVars] = createTheme({
  background: "white",
  foreground: "black",
});

export const darkTheme = createTheme(themeVars, {
  background: "black",
  foreground: "white",
});

globalStyle("body", {
  backgroundColor: themeVars.background,
  color: vars.colors.red,
});
