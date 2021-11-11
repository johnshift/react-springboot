import {
  Box,
  Flex,
  Heading,
  Spacer,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { MdMenu } from "react-icons/md";

const Nav = () => {
  return (
    <Flex
      bg="white"
      position="fixed"
      top={0}
      w="100%"
      shadow="md"
      p={3}
      align="center"
      justify="center"
      px={["5px", "8%", "18%", "23%", "29%"]}
      zIndex="sticky"
    >
      <Box>
        <Heading size="2xl">veils</Heading>
      </Box>
      <Spacer />
      <Box>
        {/* <IconButton
          variant="ghost"
          aria-label="dark mode"
          icon={<Icon as={MdOutlineNotifications} w={6} h={6} />}
          mr={2}
        /> */}
        <Menu id="menu">
          <MenuButton
            as={IconButton}
            aria-label="menu"
            icon={<Icon as={MdMenu} w={10} h={10} />}
            variant="ghost"
          />
          {/* <MenuList>
            <MenuItem>One</MenuItem>
            <MenuItem>Two</MenuItem>
            <MenuItem>Three</MenuItem>
          </MenuList> */}
        </Menu>
      </Box>
    </Flex>
  );
};

export default Nav;
