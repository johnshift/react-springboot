import { Divider, Paper, Stack } from "@mui/material";

import {
  CreatePostInput,
  CreatePostEmoji,
  CreatePostMention,
  CreatePostVisibility,
  CreatePostSubmit,
} from ".";

const CreatePost = () => {
  return (
    <Paper
      elevation={4}
      sx={{
        width: "clamp(300px, 100%, 500px)",
        // width: "100%",
        mb: 3,
      }}
    >
      <Stack
        sx={{
          p: 2,
        }}
      >
        <CreatePostInput />

        <Divider />

        <Stack
          direction="row"
          sx={{
            justifyContent: "space-between",
            mt: 2,
            // border: "1px solid red",
          }}
        >
          <Stack direction="row">
            <CreatePostEmoji />
            <CreatePostMention />
            <CreatePostVisibility />
          </Stack>
          <Stack
            direction="row"
            sx={{
              justifyContent: "end",
            }}
          >
            <CreatePostSubmit />
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default CreatePost;
