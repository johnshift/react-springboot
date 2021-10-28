import {
  Box,
  Flex,
  Heading,
  Spacer,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { SearchIcon, HamburgerIcon } from "@chakra-ui/icons";

const Nav = () => {
  return (
    <Flex
      position="fixed"
      top={0}
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
          variant="ghost"
          aria-label="dark mode"
          icon={<SearchIcon />}
          mr={2}
        />
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="menu"
            icon={<HamburgerIcon />}
            variant="ghost"
          />
          <MenuList>
            <MenuItem>One</MenuItem>
            <MenuItem>Two</MenuItem>
            <MenuItem>Three</MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </Flex>
  );
};

export default Nav;
