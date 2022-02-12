import { Box, Button, Chip, IconButton, Popover } from "@mui/material";

import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import { MouseEvent, useState } from "react";

import { emojis } from "./emojis";
import { usePostContext } from "./PostContext";

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
        <Popover
          open={Boolean(reactAnchorEl)}
          onClose={() => setReactAnchorEl(null)}
          anchorEl={reactAnchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <Box
            display="grid"
            gridTemplateColumns="repeat(5, 1fr)"
            gap={2}
            sx={{ maxHeight: "300px" }}
          >
            {emojis.map((emoji) => (
              <IconButton
                aria-label={emoji.label}
                key={emoji.label}
                color="inherit"
              >
                {emoji.symbol}
              </IconButton>
            ))}
          </Box>
        </Popover>
      </Box>
    </Box>
  );
};

export default PostActions;
