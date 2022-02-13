import { Box, Chip, IconButton, SvgIcon } from "@mui/material";

import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import TagFacesIcon from "@mui/icons-material/TagFaces";

import { MouseEvent, useState } from "react";

import { usePostContext } from "./PostContext";
import EmojiPopover from "../../common/components/emoji-popover";

const PostActions = () => {
  const [reactAnchorEl, setReactAnchorEl] = useState<HTMLButtonElement | null>(
    null
  );
  const clickReact = (e: MouseEvent<HTMLButtonElement>) => {
    setReactAnchorEl(e.currentTarget);
  };

  const { showComments, setShowComments } = usePostContext();

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

      <Box>
        <Chip
          label="5 comments"
          clickable
          variant="outlined"
          sx={{ border: "transparent" }}
          icon={
            <SvgIcon>
              <path d="M8 11a1 1 0 101 1 1 1 0 00-1-1zm4 0a1 1 0 101 1 1 1 0 00-1-1zm4 0a1 1 0 101 1 1 1 0 00-1-1zm-4-9A10 10 0 002 12a9.89 9.89 0 002.26 6.33l-2 2a1 1 0 00-.21 1.09A1 1 0 003 22h9a10 10 0 000-20zm0 18H5.41l.93-.93a1 1 0 00.3-.71 1 1 0 00-.3-.7A8 8 0 1112 20z" />
            </SvgIcon>
          }
          onClick={() => setShowComments(!showComments)}
        />

        <Chip
          label="Share"
          variant="outlined"
          icon={
            <SvgIcon>
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M13 14h-2a8.999 8.999 0 00-7.968 4.81A10.136 10.136 0 013 18C3 12.477 7.477 8 13 8V3l10 8-10 8v-5z" />
            </SvgIcon>
          }
          sx={{ border: "transparent" }}
          component="button"
          clickable
        />

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
          onEmojiClick={() => null}
        />
      </Box>
    </Box>
  );
};

export default PostActions;
