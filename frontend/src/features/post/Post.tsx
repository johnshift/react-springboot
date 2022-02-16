import { useState } from "react";
import { Box, Divider, Paper, Stack } from "@mui/material";

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
import useDeviceSize from "../../common/hooks/useDeviceSize";

const PostComponent = (props: Post) => {
  const [showComments, setShowComments] = useState(false);

  const [userVote, setUserVote] = useState(0);
  const [userReaction, setUserReaction] = useState<string | undefined>("😍");

  const { isXs } = useDeviceSize();

  return (
    <PostContextProvider
      value={{
        ...props,
        showComments,
        setShowComments,
        userVote,
        setUserVote,
        userReaction,
        setUserReaction,
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
              // py: 2,
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <PostReactions />
            <PostReactBtn />
          </Stack>

          <Divider />

          <Stack
            direction="row"
            sx={{
              justifyContent: "space-between",
              pt: 1.5,
              pb: 0.5,
            }}
          >
            <Box sx={{ flexGrow: 1 }}>
              <PostVoteBtns />
            </Box>
            <Stack
              direction="row"
              sx={{
                justifyContent: isXs ? "space-between" : "space-around",
                flexGrow: 2,
              }}
              spacing={1}
            >
              <PostCommentsBtn />
              <PostShareBtn />
            </Stack>
          </Stack>

          {showComments && <PostComments />}
        </Stack>
      </Paper>
    </PostContextProvider>
  );
};

export default PostComponent;
