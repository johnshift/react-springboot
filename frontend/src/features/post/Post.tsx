import { Box, Flex } from "@chakra-ui/react";

import { createContext } from "react";
import { PostT } from ".";

import PostHeader from "./PostHeader";
import PostBody from "./PostBody";
import PostInfo from "./PostInfo";
import PostFooter from "./PostFooter";

export const PostCtx = createContext<PostT>({} as PostT);

const Post = (post: PostT) => {
  return (
    <PostCtx.Provider value={post}>
      <Box
        bg="whiter"
        borderRadius="lg"
        shadow="md"
        px={1}
        pt={4}
        pr={3}
        mb={5}
        // border="1px solid teal"
      >
        <PostHeader />
        <PostBody />
        <Flex h="100px" flexDirection="column" p={2} pb={0}>
          <PostInfo />
          <PostFooter />
        </Flex>
      </Box>
    </PostCtx.Provider>
  );
};

export default Post;
