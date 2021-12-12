import { ChakraProvider, theme } from "@chakra-ui/react";
import { render } from "@testing-library/react";
import { ReactElement } from "react";
import { AuthProvider } from "../context/AuthProvider";

const renderW = (ui: ReactElement) => {
  const { rerender, ...result } = render(
    <AuthProvider>
      <ChakraProvider theme={theme}>{ui}</ChakraProvider>
    </AuthProvider>
  );

  return {
    ...result,
    rerender: (rerenderUI: ReactElement) => {
      rerender(
        <AuthProvider>
          <ChakraProvider theme={theme}>{rerenderUI}</ChakraProvider>
        </AuthProvider>
      );
    },
  };
};

export default renderW;
