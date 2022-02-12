import { Box, Button, Chip, IconButton } from "@mui/material";

import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import TagFacesIcon from "@mui/icons-material/TagFaces";

const Mentions = () => (
  <Box
    sx={
      {
        //  border: "1px solid red"
      }
    }
  >
    <Chip
      label="1 mention"
      clickable
      variant="outlined"
      sx={{ border: "transparent" }}
    />
  </Box>
);

const Comments = () => (
  <Box
    sx={
      {
        // border: "1px solid green"
      }
    }
  >
    <Chip
      label="5 comments"
      clickable
      variant="outlined"
      sx={{ border: "transparent" }}
    />
  </Box>
);

const PostActions = () => {
  return (
    <Box sx={{ display: "flex", pt: 1 }}>
      <Box>
        <IconButton>
          <KeyboardArrowUpIcon />
        </IconButton>
        <IconButton>
          <KeyboardArrowDownIcon />
        </IconButton>
      </Box>

      <Box sx={{ flexGrow: 1 }} />
      <Mentions />
      <Comments />

      <Box>
        <Chip
          label="React"
          clickable
          variant="outlined"
          icon={<TagFacesIcon />}
          sx={{ border: "transparent" }}
        />
      </Box>
    </Box>
  );
};

export default PostActions;
