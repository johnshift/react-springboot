import { Box, Divider, Paper } from "@mui/material";

import CreatePostAction from "./CreatePostAction";
import CreatePostField from "./CreatePostField";
import CreatePostOptions from "./CreatePostOptions";

const CreatePost = () => {
  return (
    <>
      <Paper
        elevation={4}
        sx={{
          width: "clamp(300px, 100%, 500px)",
          // width: "100%",
          mb: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            p: 2,
          }}
        >
          <CreatePostField />
          <Divider />

          <Box sx={{ display: "flex", justifyContent: "space-between", pt: 2 }}>
            <Box>
              <CreatePostOptions />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "end",
              }}
            >
              <CreatePostAction />
            </Box>
          </Box>
        </Box>
      </Paper>
    </>
  );
};

export default CreatePost;
