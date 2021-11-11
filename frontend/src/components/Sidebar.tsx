import { MdHomeFilled, MdGroups, MdPerson } from "react-icons/md";
import { GiDoubleFaceMask } from "react-icons/gi";
import { BiMessageAltDetail } from "react-icons/bi";
import { Box, Button, Icon, Flex } from "@chakra-ui/react";

import { useRouter } from "next/router";

const Sidebar = () => {
  const router = useRouter();

  return (
    <Box position="fixed" flex={3} p={5} display={["none", "block"]}>
      <Flex direction="column" align="start">
        <Button
          my={4}
          variant="link"
          leftIcon={<Icon as={MdHomeFilled} w={6} h={6} />}
          // isActive
          // _active={{
          //   bg: "red",
          // }}
          onClick={() => router.push("/")}
        >
          Home
        </Button>
        <Button
          my={4}
          variant="link"
          leftIcon={<Icon as={MdPerson} w={6} h={6} />}
          onClick={() => router.push("/user_1")}
        >
          Profile
        </Button>
        <Button
          my={4}
          variant="link"
          leftIcon={<Icon as={GiDoubleFaceMask} w={6} h={6} />}
          onClick={() => router.push("/veil_1")}
        >
          Veil
        </Button>
        <Button
          my={4}
          variant="link"
          leftIcon={<Icon as={MdGroups} w={7} h={7} />}
          onClick={() => router.push("/groups")}
        >
          Groups
        </Button>
        <Button
          my={4}
          variant="link"
          leftIcon={<Icon as={BiMessageAltDetail} w={7} h={7} />}
          onClick={() => router.push("/recents")}
        >
          Recents
        </Button>
      </Flex>
    </Box>
  );
};

export default Sidebar;
