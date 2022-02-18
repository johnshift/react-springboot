import { Box } from "@mui/material";
import CreatePost from "../features/post/create-post";
import { CreatePostProvider } from "../features/post/create-post/Context";
const Center = ({ children }: { children: React.ReactNode }) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      flexDirection: "column",
    }}
  >
    {children}
  </Box>
);

const TestPage = () => {
  return (
    <Center>
      <CreatePostProvider>
        <CreatePost />
      </CreatePostProvider>
    </Center>
  );
};

export default TestPage;
