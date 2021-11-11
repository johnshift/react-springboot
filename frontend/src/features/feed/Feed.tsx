import { Box } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { postsAtom } from "../../recoil/post/atom";

import axios from "axios";
import Post from "../post";
import { useQuery } from "react-query";

const Feed = () => {
  const [posts, setPosts] = useRecoilState(postsAtom);

  const response = useQuery("posts", async () => {
    const { data } = await axios.get(
      "https://veils.herokuapp.com/api/v1/posts"
    );
    setPosts(data);
    return data;
  });

  if (response.isLoading) {
    return <Box>Loading (show feed skeleton)...</Box>;
  }

  return (
    <Box
      h="2100px"
      // border="1px solid tomato"
    >
      {posts.map((post) => {
        return <Post {...post} key={post.id} />;
      })}
    </Box>
  );
};

export default Feed;
