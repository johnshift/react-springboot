import type { AppProps } from "next/app";

// import "../../public/bulma.min.css";
import "../../styles/windi.min.css";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
