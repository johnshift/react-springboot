import { Box } from "@chakra-ui/react";
import useStore from "../../store";

import Post from "../post";

const Feed = () => {
  const { posts } = useStore();

  return (
    <Box
      h="2100px"
      // border="1px solid tomato"
    >
      {posts.map((post, i) => (
        <Post key={i} {...post} />
      ))}
    </Box>
  );
};

export default Feed;
