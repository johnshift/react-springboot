import { Box, Chip, Link as MuiLink, Typography } from "@mui/material";

import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";

import { usePostContext } from ".";

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

const Reactions = () => {
  const { isMobile } = usePostContext();

  const reactionsInfo = isMobile
    ? "16 emotes"
    : "mylab, grapeapple and 14 others";

  return (
    <Box
      sx={{
        display: "flex",
        // border: "1px solid red",
        maxWidth: "100%",
      }}
    >
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
        <Typography sx={{ fontSize: "13px" }}>{reactionsInfo}</Typography>
      </MuiLink>
    </Box>
  );
};

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
