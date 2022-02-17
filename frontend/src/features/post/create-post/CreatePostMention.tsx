import { MouseEvent, useState } from "react";
import {
  Avatar,
  IconButton,
  ListItemAvatar,
  ListItemText,
  Menu,
  MenuItem,
  SvgIcon,
} from "@mui/material";

import getInitials from "../../../lib/getInitials";

import { useCreatePostCtx, MentionsHint } from ".";

const CreatePostMention = () => {
  const { mentionsHint, body, setBody, cursorPos, setCursorPos, insertPos } =
    useCreatePostCtx();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const onClickIcon = (e: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const onClickMention = (person: MentionsHint) => {
    const before = body.substring(0, insertPos);
    const after = body.substring(insertPos, body.length);

    const mentionStr = ` @[${person.display}](${person.id}) `;
    const newBody = `${before}${mentionStr}${after}`;

    setBody(newBody);
    setCursorPos(cursorPos + mentionStr.length);
    setAnchorEl(null);

    console.log("mentionBtn click -- person =", person);
  };

  return (
    <>
      <IconButton onClick={onClickIcon} aria-label="mention a person">
        <SvgIcon fontSize="inherit">
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M20 12a8 8 0 10-3.562 6.657l1.11 1.664A9.953 9.953 0 0112 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10v1.5a3.5 3.5 0 01-6.396 1.966A5 5 0 1115 8h2v5.5a1.5 1.5 0 003 0V12zm-8-3a3 3 0 100 6 3 3 0 000-6z" />
        </SvgIcon>
      </IconButton>

      <Menu
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        {mentionsHint.map((person) => (
          <MenuItem key={person.display} onClick={() => onClickMention(person)}>
            <ListItemAvatar>
              <Avatar alt={person.display}>
                {getInitials(person.display as string)}
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={person.display} />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default CreatePostMention;
