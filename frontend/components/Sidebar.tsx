import { MdHomeFilled, MdGroups, MdPerson } from "react-icons/md";
import { GiDoubleFaceMask } from "react-icons/gi";
import { BiMessageAltDetail } from "react-icons/bi";
import { Box, Button, Icon, Flex } from "@chakra-ui/react";

const Sidebar = () => {
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
        >
          Home
        </Button>
        <Button
          my={4}
          variant="link"
          leftIcon={<Icon as={MdPerson} w={6} h={6} />}
        >
          Profile
        </Button>
        <Button
          my={4}
          variant="link"
          leftIcon={<Icon as={GiDoubleFaceMask} w={6} h={6} />}
        >
          Veil
        </Button>
        <Button
          my={4}
          variant="link"
          leftIcon={<Icon as={MdGroups} w={7} h={7} />}
        >
          Groups
        </Button>
        <Button
          my={4}
          variant="link"
          leftIcon={<Icon as={BiMessageAltDetail} w={7} h={7} />}
        >
          Recents
        </Button>
      </Flex>
    </Box>
  );
};

export default Sidebar;
