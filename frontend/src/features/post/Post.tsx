import { Box, Divider, Paper } from "@mui/material";

import { IPostContext } from "./types";
import PostHeader from "./PostHeader";
import { PostContext } from "./PostContext";
import PostBody from "./PostBody";
import PostFeedback from "./PostFeedback";
import PostActions from "./PostActions";

const Post = (props: IPostContext) => {
  return (
    <PostContext.Provider value={{ ...props }}>
      <Paper
        elevation={4}
        sx={{
          width: "clamp(300px, 100%, 500px)",
        }}
      >
        <Box
          sx={{
            // border: "1px solid green",
            display: "flex",
            flexDirection: "column",
            p: 2,
            pb: 1,
          }}
        >
          <PostHeader />
          <PostBody />
          <Divider />
          <Box
            sx={{
              // border: "1px solid red",
              flexDirection: "column",
            }}
          >
            <PostFeedback />
            <Divider />
            <PostActions />
          </Box>
        </Box>
      </Paper>
    </PostContext.Provider>
  );
};

export default Post;
