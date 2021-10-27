import { Box, Flex, Heading, Spacer, IconButton } from "@chakra-ui/react";
import { MoonIcon, SunIcon, HamburgerIcon } from "@chakra-ui/icons";
import { useColorMode } from "@chakra-ui/color-mode";

const Nav = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex
      shadow="md"
      p={3}
      align="center"
      px={["5px", "50px", "15%", "20%", "25%"]}
    >
      <Box>
        <Heading size="2xl">veils</Heading>
      </Box>
      <Spacer />
      <Box>
        <IconButton
          variant="outline"
          aria-label="dark mode"
          icon={colorMode == "light" ? <MoonIcon /> : <SunIcon />}
          mr={2}
          onClick={toggleColorMode}
        />
        <IconButton
          variant="outline"
          aria-label="menu"
          icon={<HamburgerIcon />}
        />
      </Box>
    </Flex>
  );
};

export default Nav;
