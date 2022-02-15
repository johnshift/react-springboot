import { useState, MouseEvent } from "react";
import { IconButton } from "@mui/material";

import TagFacesIcon from "@mui/icons-material/TagFaces";

import EmojiPopover from "../../../common/components/emoji-popover";

import { useCreatePostCtx } from ".";

const CreatePostEmoji = () => {
  const { body, setBody, cursorPos, setCursorPos, insertPos } =
    useCreatePostCtx();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const onClickIcon = (e: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const onEmojiClick = (selectedEmoji: string) => {
    const before = body.substring(0, insertPos);
    const after = body.substring(insertPos, body.length);

    const newBody = `${before}${selectedEmoji}${after}`;
    console.log("newBody =", newBody);
    setBody(newBody);
    setCursorPos(cursorPos + 2);
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton aria-label="select emoji" onClick={onClickIcon}>
        <TagFacesIcon fontSize="inherit" />
      </IconButton>

      <EmojiPopover
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        onEmojiClick={onEmojiClick}
        vertical="top"
        horizontal="left"
      />
    </>
  );
};

export default CreatePostEmoji;
