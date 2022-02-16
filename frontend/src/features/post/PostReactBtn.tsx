import { useState, MouseEvent } from "react";
import { Chip, IconButton } from "@mui/material";

import TagFacesIcon from "@mui/icons-material/TagFaces";

import EmojiPopover from "../../common/components/emoji-popover";
import useDeviceWidth from "../../common/hooks/useDeviceWidth";

const PostReactBtn = () => {
  const { xs } = useDeviceWidth();

  const [reactAnchorEl, setReactAnchorEl] = useState<HTMLButtonElement | null>(
    null
  );
  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    setReactAnchorEl(e.currentTarget);
  };

  return (
    <>
      {xs ? (
        <IconButton onClick={onClick}>
          <TagFacesIcon />
        </IconButton>
      ) : (
        <Chip
          label="Emote"
          variant="outlined"
          icon={<TagFacesIcon />}
          sx={{ border: "transparent" }}
          component="button"
          onClick={onClick}
        />
      )}

      <EmojiPopover
        anchorEl={reactAnchorEl}
        onClose={() => setReactAnchorEl(null)}
        onEmojiClick={() => null}
      />
    </>
  );
};

export default PostReactBtn;
