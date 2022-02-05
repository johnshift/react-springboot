import * as React from "react";
import type { AppProps } from "next/app";

import { CacheProvider, EmotionCache } from "@emotion/react";
import {
  ThemeProvider,
  CssBaseline,
  createTheme,
  Container,
  Box,
} from "@mui/material";
import createEmotionCache from "../utils/createEmotionCache";
import lightThemeOptions from "../styles/theme/lightThemeOptions";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { Provider } from "react-redux";
import store from "../store";

import Toast from "../features/toast";
import { QueryClient, QueryClientProvider } from "react-query";
import Nav from "../common/components/nav";

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const clientSideEmotionCache = createEmotionCache();

const lightTheme = createTheme(lightThemeOptions);

const queryClient = new QueryClient();

const MyApp: React.FunctionComponent<MyAppProps> = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <Nav />
            <Container maxWidth="md">
              {/* <Box sx={{ paddingX: "30px" }}> */}
              <Component {...pageProps} />
              {/* </Box> */}
            </Container>
            <Toast />
          </QueryClientProvider>
        </Provider>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default MyApp;
