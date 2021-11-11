import { Flex, Box } from "@chakra-ui/react";

import { useContext } from "react";
import { PostCtx } from "./Post";

const PostBody = () => {
  const { body } = useContext(PostCtx);

  return (
    <Flex
      w="100%"
      px={5}
      // minH="40px"
      justify="start"
      flexDirection="column"
      // border="1px solid gray"
    >
      {body.split("\n").map((t, i) => (
        <Box key={i} py={1} data-testid="post-body-part">
          {t}
        </Box>
      ))}
    </Flex>
  );
};

export default PostBody;
