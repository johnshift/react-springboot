import { Box, HStack, Button } from "@chakra-ui/react";

const Sidebar = () => {
  return (
    <Box bg="teal.300" flex={3} p={5}>
      <HStack>
        <Button w="100%" variant="solid">
          Home
        </Button>
        <Button w="100%" variant="outline">
          Home
        </Button>
      </HStack>
    </Box>
  );
};

export default Sidebar;
