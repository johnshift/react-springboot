import { ChakraProvider, theme } from "@chakra-ui/react";
import { render } from "@testing-library/react";
import { ReactElement } from "react";

const renderW = (ui: ReactElement) => {
  const { rerender, ...result } = render(
    <ChakraProvider theme={theme}>{ui}</ChakraProvider>
  );

  return {
    ...result,
    rerender: (rerenderUI: ReactElement) => {
      rerender(<ChakraProvider theme={theme}>{rerenderUI}</ChakraProvider>);
    },
  };
};

export default renderW;
