import { Box } from "@mui/material";

const SomethingWentWrong = () => {
  return (
    <Box
      sx={{
        display: "grid",
        placeItems: "center",
        height: "100vh",
      }}
    >
      <h1>Something went wrong :(</h1>
    </Box>
  );
};

export default SomethingWentWrong;
