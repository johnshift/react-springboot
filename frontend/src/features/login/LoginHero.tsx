import { Box, Button, Center, Flex, Heading } from "@chakra-ui/react";

const LoginHero = () => {
  return (
    <Box
      mt={["10", "0"]}
      h={["40%", "auto"]}
      w={["100%", "50%"]}
      pl={[10, 0]}
      // border="1px solid green"
      // bg={["red", "green", "blue", "yellow"]}
    >
      <Center h="100%" w="100%">
        <Flex direction="column">
          <Box w="100%" mb={10}>
            <Heading size="4xl" fontWeight="extrabold" color="red.600">
              veils
            </Heading>
          </Box>
          <Box mb={10}>
            <Heading size="lg" color="gray.600">
              Share your secrets anonymously
            </Heading>
          </Box>
          <Box>
            <Button>demo</Button>
          </Box>
        </Flex>
      </Center>
    </Box>
  );
};

export default LoginHero;
