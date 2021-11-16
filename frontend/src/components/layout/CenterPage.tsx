import { Box, Flex } from "@chakra-ui/react";
import { ReactNode } from "react";

import theme from "../Theme";
import { ChakraProvider, Center } from "@chakra-ui/react";
import Nav from "../Nav";

type LayoutProps = {
  children: ReactNode;
  showNav: boolean;
};

const Layout = ({ children, showNav }: LayoutProps) => {
  return (
    <ChakraProvider theme={theme}>
      {showNav && <Nav />}
      <Flex
        h="100vh"
        w="100%"
        justify="center"
        // border="1px solid green"
      >
        <Center>{children}</Center>
      </Flex>
    </ChakraProvider>
  );
};

export default Layout;
