import { Box, Paper } from "@mui/material";
import React from "react";

const Center = ({ children }: { children: React.ReactNode }) => (
  <Box
    sx={{
      display: "grid",
      placeItems: "center",
      height: "100vh",
    }}
  >
    {children}
  </Box>
);

const TestPage = () => {
  return (
    <Center>
      <CreatePost />
    </Center>
  );
};
export default TestPage;

const CreatePost = () => {
  return (
    <Paper sx={{ width: "clamp(300px, 85%, 350px)" }}>
      <p>Create Post</p>
    </Paper>
  );
};
