import { useState } from "react";
import { Divider, Paper, useTheme, useMediaQuery, Stack } from "@mui/material";

import {
  PostContextProvider,
  Post,
  PostHeader,
  PostBody,
  PostActions,
  PostComments,
  PostVotes,
} from ".";
import PostReactions from "./PostReactions";

const PostComponent = (props: Post) => {
  const [showComments, setShowComments] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only("xs"));

  return (
    <PostContextProvider
      value={{
        ...props,
        showComments,
        setShowComments,
        isMobile,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          width: "clamp(300px, 100%, 500px)",
        }}
      >
        <Stack
          sx={{
            px: 2,
            pt: 2,
          }}
        >
          <PostHeader />
          <PostBody />
          <Divider />

          <Stack
            direction="row"
            sx={{
              color: "#757575",
              py: "5px",
              justifyContent: "space-between",
            }}
          >
            <PostVotes />
            <PostReactions />
          </Stack>

          <Divider />

          <PostActions />

          {showComments && <PostComments />}
        </Stack>
      </Paper>
    </PostContextProvider>
  );
};

export default PostComponent;
