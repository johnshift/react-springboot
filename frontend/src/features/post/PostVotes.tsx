import { Box, Chip } from "@mui/material";

import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";

import { usePostContext } from ".";

const PostVotes = () => {
  const { votes } = usePostContext();

  return (
    <Box
      sx={{
        ":hover": {
          cursor: "pointer",
        },
      }}
    >
      <Chip
        label={`${votes} votes`}
        clickable
        variant="outlined"
        icon={<LocalFireDepartmentIcon />}
        sx={{ border: "transparent" }}
      />
    </Box>
  );
};

export default PostVotes;
