import { Divider, Paper, Stack } from "@mui/material";

import {
  CreatePostInput,
  OptEmoji,
  OptMention,
  OptVisibility,
  Submit,
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
            <OptEmoji />
            <OptMention />
            <OptVisibility />
          </Stack>
          <Stack
            direction="row"
            sx={{
              justifyContent: "end",
            }}
          >
            <Submit />
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default CreatePost;
