import { Box, Chip } from "@mui/material";

import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import InsertCommentIcon from "@mui/icons-material/InsertComment";

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
    {/* <LocalFireDepartmentIcon color="inherit" sx={{ mr: "3px" }} />
        <Typography variant="caption">69 votes </Typography> */}
  </Box>
);

const Reactions = () => (
  <Box
    sx={
      {
        // border: "1px solid green"
      }
    }
  >
    <Chip
      label="😆 11"
      clickable
      variant="outlined"
      sx={{ border: "transparent" }}
    />
    <Chip
      label="👍 9"
      clickable
      variant="outlined"
      sx={{ border: "transparent" }}
    />
    <Chip
      label="❤️ 6"
      clickable
      variant="outlined"
      sx={{ border: "transparent" }}
    />
    <Chip
      label="🍆 4"
      clickable
      variant="outlined"
      sx={{ border: "transparent" }}
    />
    <Chip
      label="💦 3"
      clickable
      variant="outlined"
      sx={{ border: "transparent" }}
    />
  </Box>
);

const PostFeedback = () => {
  return (
    <Box sx={{ display: "flex", color: "#757575", py: "5px" }}>
      <Votes />
      <Box sx={{ flexGrow: 1 }} />
      <Reactions />

      {/* <Box sx={{ border: "1px solid red", flexGrow: 2 }} />
      <Box sx={{ border: "1px solid green", flexGrow: 1 }} /> */}
    </Box>
  );
};

export default PostFeedback;
