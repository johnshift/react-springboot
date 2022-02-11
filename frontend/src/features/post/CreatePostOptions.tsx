import React, { useState } from "react";
import {
  Avatar,
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  SvgIcon,
} from "@mui/material";

import TagFacesIcon from "@mui/icons-material/TagFaces";

import PublicIcon from "@mui/icons-material/Public";
import GroupsIcon from "@mui/icons-material/Groups";
import VpnLockIcon from "@mui/icons-material/VpnLock";

import useCreatePost, { PostVisibility } from "./CreatePostContext";
import { MentionItem } from "react-mentions";
import { emojis as Emojis } from "./emojis";

const EmojiDialog = ({
  open,
  onClose,
  emojis,
}: {
  open: boolean;
  onClose: () => void;
  emojis: typeof Emojis;
}) => {
  const { isMobile, cursorPos, setCursorPos, postBody, setPostBody } =
    useCreatePost();
  const gridTemplate = `repeat(${isMobile ? "4" : "5"}, 1fr)`;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Select Emoji</DialogTitle>
      <DialogContent>
        <Box
          display="grid"
          gridTemplateColumns={gridTemplate}
          gap={2}
          sx={{ maxHeight: "300px" }}
        >
          {emojis.map((emoji) => (
            <IconButton
              aria-label={emoji.label}
              key={emoji.label}
              color="inherit"
              onClick={() => {
                const cleanBefore = postBody.substring(0, cursorPos);
                const beforeMentionsCount =
                  (cleanBefore.match(/\^/g) || []).length / 2;
                const rawPos = cursorPos + beforeMentionsCount * 2;

                const before = postBody.substring(0, rawPos);
                const after = postBody.substring(rawPos, postBody.length);

                const newBody = `${before}${emoji.symbol}${after}`;
                setPostBody(newBody);
                setCursorPos(cursorPos + 2);
                onClose();
              }}
            >
              {emoji.symbol}
            </IconButton>
          ))}
        </Box>
      </DialogContent>
    </Dialog>
  );
};
const MemoizedEmojiDialog = React.memo(EmojiDialog);

const MentionDialog = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const {
    mentions,
    setMentions,
    mentionsHint,
    cursorPos,
    setCursorPos,
    postBody,
    setPostBody,
  } = useCreatePost();

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n, i, a) => (i === 0 || i + 1 === a.length ? n[0] : null))
      .join("");
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Mention Someone</DialogTitle>
      <DialogContent>
        <List sx={{ maxHeight: "300px" }}>
          {mentionsHint.map((person) => (
            <ListItem
              button
              key={person.id}
              onClick={() => {
                const cleanBefore = postBody.substring(0, cursorPos);
                const beforeMentionsCount =
                  (cleanBefore.match(/\^/g) || []).length / 2;
                const rawPos = cursorPos + beforeMentionsCount * 2;

                const before = postBody.substring(0, rawPos);
                const after = postBody.substring(rawPos, postBody.length);

                const newBody = `${before} ^${person.display}^ ${after}`;
                setPostBody(newBody);
                const newCursorPos =
                  cursorPos + (person.display as string).length;

                setCursorPos(newCursorPos + 2);

                const newMentions = mentions;
                newMentions.push(person as MentionItem);
                setMentions(newMentions);
                onClose();
              }}
            >
              <ListItemAvatar>
                <Avatar alt={person.display}>
                  {getInitials(person.display as string)}
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={person.display} />
            </ListItem>
          ))}
        </List>
      </DialogContent>
    </Dialog>
  );
};

const PostVisibilityDialog = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const { visibility, setVisibility } = useCreatePost();

  const handleSelect = (e: SelectChangeEvent) => {
    setVisibility(e.target.value as PostVisibility);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      // fullWidth
      // sx={{ maxWidth: "300px" }}
    >
      {/* <DialogTitle>Set Post Visibility</DialogTitle> */}
      <DialogContent>
        <br />
        <FormControl fullWidth sx={{ minWidth: "200px" }}>
          <InputLabel id="set-visibility">Select Visibility</InputLabel>
          <Select
            labelId="set-visibility"
            id="set-visibility-select"
            label="Select Visibility"
            value={visibility}
            onChange={handleSelect}
          >
            <MenuItem value="Public">Public</MenuItem>
            <MenuItem value="Circle">Circle</MenuItem>
            <MenuItem value="Only Self">Only Self</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
    </Dialog>
  );
};

const CreatePostOptions = () => {
  const { isMobile, visibility } = useCreatePost();

  const [openEmoji, setOpenEmoji] = useState(false);
  const [openMentions, setOpenMentions] = useState(false);
  const [openVisibility, setOpenVisibility] = useState(false);

  const iconSize = isMobile ? "medium" : "large";

  let visibilityIcon = <PublicIcon fontSize="inherit" />;
  if (visibility === "Circle") {
    visibilityIcon = <GroupsIcon fontSize="inherit" />;
  } else if (visibility === "Only Self") {
    visibilityIcon = <VpnLockIcon fontSize="inherit" />;
  }

  return (
    <>
      <IconButton
        aria-label="select emoji"
        size={iconSize}
        onClick={() => setOpenEmoji(true)}
      >
        <TagFacesIcon fontSize="inherit" />
      </IconButton>
      <IconButton
        aria-label="mention"
        size={iconSize}
        onClick={() => setOpenMentions(true)}
      >
        <SvgIcon fontSize="inherit">
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M20 12a8 8 0 10-3.562 6.657l1.11 1.664A9.953 9.953 0 0112 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10v1.5a3.5 3.5 0 01-6.396 1.966A5 5 0 1115 8h2v5.5a1.5 1.5 0 003 0V12zm-8-3a3 3 0 100 6 3 3 0 000-6z" />
        </SvgIcon>
      </IconButton>
      <IconButton
        aria-label="schedule"
        size={iconSize}
        onClick={() => setOpenVisibility(true)}
      >
        {visibilityIcon}
      </IconButton>
      <MemoizedEmojiDialog
        open={openEmoji}
        onClose={() => setOpenEmoji(false)}
        emojis={Emojis}
      />
      <MentionDialog
        open={openMentions}
        onClose={() => setOpenMentions(false)}
      />
      <PostVisibilityDialog
        open={openVisibility}
        onClose={() => setOpenVisibility(false)}
      />
    </>
  );
};

export default CreatePostOptions;
