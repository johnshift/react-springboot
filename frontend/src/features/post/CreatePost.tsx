import { Box, Divider, Paper } from "@mui/material";
import { useEffect } from "react";
import CreatePostAction from "./CreatePostAction";
import useCreatePost from "./CreatePostContext";
import CreatePostField from "./CreatePostField";
import CreatePostOptions from "./CreatePostOptions";

const CreatePost = () => {
  const { postBodyRef, setCursorPos } = useCreatePost();

  // update cursorPos everytime postBody changes
  useEffect(() => {
    if (postBodyRef.current) {
      setCursorPos(postBodyRef.current.selectionStart);
    }
  }, [postBodyRef, setCursorPos]);

  return (
    <>
      <Paper sx={{ width: "clamp(300px, 100%, 480px)" }}>
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
