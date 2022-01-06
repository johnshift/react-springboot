import { createGlobalTheme, globalStyle } from "@vanilla-extract/css";

export const colors = createGlobalTheme(":root", {
  black: "hsl(0, 0%, 15%)",
  white: "hsl(0, 0%, 93%)",

  smoke: "hsl(0, 0%, 96%)",
  smokeDim: "hsl(0, 0%, 90%)",

  gray: "hsl(240, 5%, 90%)",

  red: "hsl(0, 86%, 38%)",
});

const darkColors = {
  black: "hsl(0, 0%, 80%)",
  white: "hsl(0, 0%, 7%)",

  smoke: "hsl(0, 0%, 15%)",
  smokeDim: "hsl(0, 0%, 10%)",

  gray: "hsl(240, 5%, 10%)",

  red: "hsl(0, 86%, 38%)",
};

createGlobalTheme('[data-theme="dark"]', colors, darkColors);
// createGlobalTheme("@media > (prefers-color-scheme: dark)", colors, darkColors);

// export const [lightTheme, vars] = createTheme({
//   colors: {
//     dk: "hsl(0, 0%, 15%)",
//     lt: "hsl(0, 0%, 93%)",

//     ltBg: "hsl(0, 0%, 96%)",
//     ltBgDk: "hsl(0, 0%, 90%)",

//     red: "hsl(0, 86%, 38%)",
//     grayLt: "hsl(240, 5%, 90%)",
//   },
// });

// export const darkTheme = createTheme(vars, {
//   colors: {
//     dk: "hsl(0, 0%, 80%)",
//     lt: "hsl(0, 0%, 7%)",

//     ltBg: "hsl(0, 0%, 15%)",
//     ltBgDk: "hsl(0, 0%, 10%)",

//     red: "hsl(0, 86%, 38%)",
//     grayLt: "hsl(240, 5%, 10%)",
//   },
// });

globalStyle("body", {
  backgroundColor: colors.white,
  color: colors.black,
  fontFamily: '"Arial", sans-serif',
});
