import { useState, MouseEvent } from "react";
import { IconButton, Typography } from "@mui/material";

import TagFacesIcon from "@mui/icons-material/TagFaces";

import EmojiPopover from "../../common/components/emoji-popover";

import { usePostContext } from ".";

const PostReactBtn = () => {
  const { userReaction, setUserReaction } = usePostContext();

  const [reactAnchorEl, setReactAnchorEl] = useState<HTMLButtonElement | null>(
    null
  );
  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (userReaction) {
      setUserReaction(undefined);
    } else {
      setReactAnchorEl(e.currentTarget);
    }
  };

  const onEmojiClick = (emoji: string) => {
    setUserReaction(emoji);
    setReactAnchorEl(null);
  };

  return (
    <>
      {userReaction ? (
        <IconButton
          onClick={onClick}
          color="secondary"
          sx={{ fontSize: "auto" }}
        >
          <Typography sx={{ width: "30px", height: "30px", fontSize: "22px" }}>
            {userReaction}
          </Typography>
        </IconButton>
      ) : (
        <IconButton onClick={onClick} sx={{ fontSize: "20px" }}>
          <TagFacesIcon sx={{ fontSize: "30px" }} />
        </IconButton>
      )}

      <EmojiPopover
        anchorEl={reactAnchorEl}
        onClose={() => setReactAnchorEl(null)}
        onEmojiClick={onEmojiClick}
      />
    </>
  );
};

export default PostReactBtn;
