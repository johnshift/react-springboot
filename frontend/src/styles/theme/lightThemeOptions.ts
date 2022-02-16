import { ThemeOptions } from "@mui/material/styles";

const lightThemeOptions: ThemeOptions = {
  breakpoints: {
    values: {
      xs: 0,
      sm: 420,
      md: 768,
      lg: 1024,
      xl: 1536,
    },
  },
  palette: {
    mode: "light",
    primary: {
      main: "#b71c1c",
    },
    secondary: {
      main: "#757575",
    },
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 5,
        },
      },
    },
  },
};

export default lightThemeOptions;
