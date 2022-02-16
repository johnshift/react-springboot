import { useState } from "react";
import { Divider, Paper, Stack } from "@mui/material";

import {
  PostContextProvider,
  Post,
  PostHeader,
  PostBody,
  PostComments,
  PostReactions,
  PostVoteBtns,
  PostCommentsBtn,
  PostShareBtn,
  PostReactBtn,
} from ".";

const PostComponent = (props: Post) => {
  const [showComments, setShowComments] = useState(false);

  const [userVote, setUserVote] = useState(0);

  return (
    <PostContextProvider
      value={{
        ...props,
        showComments,
        setShowComments,
        userVote,
        setUserVote,
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
            <PostReactions />
            <PostReactBtn />
          </Stack>

          <Divider />

          <Stack
            direction="row"
            sx={{ justifyContent: "space-between", pt: 1.5, pb: 0.5 }}
          >
            <PostVoteBtns />
            <PostShareBtn />
            <PostCommentsBtn />
          </Stack>

          {showComments && <PostComments />}
        </Stack>
      </Paper>
    </PostContextProvider>
  );
};

export default PostComponent;
