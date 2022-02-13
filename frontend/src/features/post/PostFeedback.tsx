import { Box, Chip, Link as MuiLink } from "@mui/material";

import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";

const Votes = () => (
  <Box
    sx={{
      // border: "1px solid red",
      ":hover": {
        cursor: "pointer",
      },
    }}
  >
    <Chip
      label="69 votes"
      clickable
      variant="outlined"
      icon={<LocalFireDepartmentIcon />}
      sx={{ border: "transparent" }}
    />
  </Box>
);

const Reactions = () => (
  <Box>
    <Chip
      label="💕🍆💦"
      clickable
      variant="outlined"
      sx={{ border: "transparent" }}
    />
    <MuiLink
      component="button"
      variant="body2"
      color="#66676B"
      underline="none"
      // fontWeight="bold"
      sx={{ ":hover": { textDecoration: "underline" } }}
    >
      mylab, grapeapple and 33 others
    </MuiLink>
  </Box>
);

const PostFeedback = () => {
  return (
    <Box
      sx={{
        display: "flex",
        color: "#757575",
        py: "5px",
        justifyContent: "space-between",
      }}
    >
      <Votes />

      <Reactions />
    </Box>
  );
};

export default PostFeedback;
