import { Flex, Box, Text } from "@chakra-ui/react";
import Avatar from "../../components/Avatar";

import { useContext } from "react";
import { PostCtx } from "./Post";

const PostHeader = () => {
  const { owner, created } = useContext(PostCtx);

  return (
    <Flex h="80px" gap={0}>
      <Box w="20%">
        <Avatar size="lg" label="post avatar" />
      </Box>
      <Box h="100%" w="80%" p={2} pt={3}>
        <Text fontSize="lg">{owner}</Text>
        <Text fontSize="sm">{created}</Text>
      </Box>
    </Flex>
  );
};

export default PostHeader;
