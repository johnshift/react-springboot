import { Box, Divider, Paper } from "@mui/material";

import { IPost } from "./types";
import PostHeader from "./PostHeader";
import { PostContext } from "./PostContext";
import PostBody from "./PostBody";
import PostFeedback from "./PostFeedback";
import PostActions from "./PostActions";
import PostComments from "./PostComments";
import { useState } from "react";

const Post = (props: IPost) => {
  const [showComments, setShowComments] = useState(false);

  return (
    <PostContext.Provider
      value={{
        ...props,
        showComments,
        setShowComments,
      }}
    >
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
            px: 2,
            pt: 2,
          }}
        >
          <PostHeader />
          <PostBody />
          <Divider />

          <PostFeedback />

          <Divider />

          <PostActions />

          {showComments && <PostComments />}
        </Box>
      </Paper>
    </PostContext.Provider>
  );
};

export default Post;
