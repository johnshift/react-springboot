import { Box, Flex } from "@chakra-ui/react";
import { ReactNode } from "react";

import theme from "./Theme";
import { ChakraProvider } from "@chakra-ui/react";
import Nav from "./Nav";

import Sidebar from "./Sidebar";

type LayoutProps = {
  children: ReactNode;
  showNav: boolean;
};

const Layout = ({ children, showNav }: LayoutProps) => {
  return (
    <ChakraProvider theme={theme}>
      {showNav && <Nav />}
      <Flex
        h="200vh"
        mt="80px"
        mx={["5px", "10%", "20%", "25%", "30%"]}
        // border="1px solid green"
      >
        <Sidebar />
        <Box flex={3} display={["none", "block"]} />

        <Box flex={7} p={[1, 8]} mr={[0, 3]}>
          {children}
        </Box>
      </Flex>
    </ChakraProvider>
  );
};

export default Layout;
