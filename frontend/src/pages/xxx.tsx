import { Box } from "@mui/material";

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
      <h1>Test Page</h1>
    </Center>
  );
};

export default TestPage;
