import {
  Box,
  Flex,
  Heading,
  Button,
  Spacer,
  IconButton,
} from "@chakra-ui/react";
import { MoonIcon, HamburgerIcon } from "@chakra-ui/icons";

const Nav = () => {
  return (
    <Flex shadow="md" p={3} pt={4}>
      <Box>
        <Heading size="2xl">veils</Heading>
      </Box>
      <Spacer />
      <Box>
        <IconButton
          variant="outline"
          aria-label="dark mode"
          icon={<MoonIcon />}
          mr={2}
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
