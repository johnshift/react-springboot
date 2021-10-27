import { Box, Flex } from "@chakra-ui/react";
import { ReactNode } from "react";

import theme from "./Theme";
import { ChakraProvider } from "@chakra-ui/react";
import Nav from "./Nav";

import useMediaQuery from "../components/useMediaQuery";

type LayoutProps = {
  children: ReactNode;
  showNav: boolean;
};

const Layout = ({ children, showNav }: LayoutProps) => {
  const showSidebar = useMediaQuery("(min-width: 768px)");

  return (
    <ChakraProvider theme={theme}>
      {showNav && <Nav />}
      <Flex
        h="200vh"
        mt="80px"
        mx={["5px", "5%", "17%", "22%", "26%"]}
        border="1px solid green"
      >
        {/* <Box bg="teal.300" flex={3} hidden={showSidebar}></Box> */}
        {showSidebar && <Box bg="teal.300" flex={3}></Box>}
        <Box bg="blue.500" flex={9}>
          {children}
        </Box>
      </Flex>
    </ChakraProvider>
  );
};

export default Layout;
