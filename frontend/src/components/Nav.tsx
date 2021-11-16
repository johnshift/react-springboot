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
import axios from "axios";
import { useRouter } from "next/router";
import { MdMenu } from "react-icons/md";
import { useRecoilValue, useRecoilState } from "recoil";
import { AUTH_LOGOUT_URL } from "../constants";
import { sessionAtom } from "../recoil/auth/atom";

const Nav = () => {
  const router = useRouter();

  const [session, setSession] = useRecoilState(sessionAtom);
  console.log("Nav session: ", session);

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
        <Menu isLazy id="chakra-#4328-1">
          <MenuButton
            as={IconButton}
            aria-label="menu"
            icon={<Icon as={MdMenu} w={10} h={10} />}
            variant="ghost"
          />
          <MenuList id="chakra-#4328-13">
            <MenuItem
              id="chakra-#4328-14"
              onClick={() => {
                axios
                  .post(AUTH_LOGOUT_URL, null, {
                    // headers: {
                    //   "x-csrf-token": session?.csrfToken as string,
                    // },
                  })
                  .then((res) => {
                    console.log("logout res: ", res);
                    setSession(null);
                    router.replace("/login");
                  })
                  .catch((err) => {
                    console.log("logout err: ", err);
                  });
              }}
            >
              Logout
            </MenuItem>
            <MenuItem>Shit</MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </Flex>
  );
};

export default Nav;
