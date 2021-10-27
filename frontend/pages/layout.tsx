import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";

import theme from "./theme";
import { ChakraProvider } from "@chakra-ui/react";
import Nav from "../components/Nav";

type LayoutProps = {
  children: ReactNode;
  showNav: boolean;
};

const Layout = ({ children, showNav }: LayoutProps) => {
  return (
    <ChakraProvider theme={theme}>
      {showNav && <Nav />}
      <Box h="200vh" mt="80px" mx={["5px", "5%", "17%", "22%", "26%"]}>
        {children}
      </Box>
    </ChakraProvider>
  );
};

export default Layout;
