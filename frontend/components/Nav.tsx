import { Box, Flex, Heading, Spacer, IconButton } from "@chakra-ui/react";
import { MoonIcon, SunIcon, HamburgerIcon } from "@chakra-ui/icons";
import { useColorMode, useColorModeValue } from "@chakra-ui/color-mode";

const Nav = () => {
  const { toggleColorMode } = useColorMode();

  const bg = useColorModeValue("black", "white");
  const icon = useColorModeValue(<SunIcon />, <MoonIcon />);

  return (
    <Flex
      position="fixed"
      top={0}
      bg={bg}
      w="100%"
      shadow="md"
      p={3}
      align="center"
      justify="center"
      px={["5px", "30px", "15%", "20%", "25%"]}
    >
      <Box>
        <Heading size="2xl">veils</Heading>
      </Box>
      <Spacer />
      <Box>
        <IconButton
          // variant="outline"
          aria-label="dark mode"
          icon={icon}
          // icon={<MoonIcon />}
          mr={2}
          onClick={toggleColorMode}
        />
        <IconButton
          // variant="outline"
          aria-label="menu"
          icon={<HamburgerIcon />}
        />
      </Box>
    </Flex>
  );
};

export default Nav;
