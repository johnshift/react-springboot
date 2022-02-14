import { Box } from "@mui/material";
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
      <h1>Test Page</h1>
    </Center>
  );
};

export default TestPage;
