import { Box, Chip, IconButton } from "@mui/material";

import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import { MouseEvent, useState } from "react";

import { usePostContext } from "./PostContext";
import EmojiPopover from "../../common/components/emoji-popover";

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

const Comments = () => {
  const { showComments, setShowComments } = usePostContext();

  return (
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
        onClick={() => setShowComments(!showComments)}
      />
    </Box>
  );
};

const PostActions = () => {
  const [reactAnchorEl, setReactAnchorEl] = useState<HTMLButtonElement | null>(
    null
  );
  const clickReact = (e: MouseEvent<HTMLButtonElement>) => {
    setReactAnchorEl(e.currentTarget);
  };

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
          variant="outlined"
          icon={<TagFacesIcon />}
          sx={{ border: "transparent" }}
          component="button"
          onClick={clickReact}
        />
        <EmojiPopover
          anchorEl={reactAnchorEl}
          onClose={() => setReactAnchorEl(null)}
        />
      </Box>
    </Box>
  );
};

export default PostActions;
