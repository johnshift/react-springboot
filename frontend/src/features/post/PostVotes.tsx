import { Box, Chip } from "@mui/material";

import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";

import { usePostContext } from ".";

const PostVotes = () => {
  const { votes, userVote } = usePostContext();

  return (
    <Box
      sx={{
        ":hover": {
          cursor: "pointer",
        },
      }}
    >
      <Chip
        label={`${votes + userVote} votes`}
        clickable
        variant="outlined"
        icon={<LocalFireDepartmentIcon />}
        sx={{ border: "transparent" }}
      />
    </Box>
  );
};

export default PostVotes;
