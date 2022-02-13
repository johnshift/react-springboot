import { MouseEvent, useState } from "react";
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
import VpnLockIcon from "@mui/icons-material/VpnLock";

import useCreatePost from "./CreatePostContext";
import { MentionItem } from "react-mentions";
import { emojis as Emojis } from "../../common/components/emoji-popover/emojis";
import { PostVisibility } from "./types";
import EmojiPopover from "../../common/components/emoji-popover";

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
  const {
    isMobile,
    visibility,
    cursorPos,
    setCursorPos,
    postBody,
    setPostBody,
  } = useCreatePost();

  const [openMentions, setOpenMentions] = useState(false);
  const [openVisibility, setOpenVisibility] = useState(false);

  const iconSize = isMobile ? "medium" : "large";

  let visibilityIcon = <PublicIcon fontSize="inherit" />;
  if (visibility === "Circle") {
    visibilityIcon = (
      <SvgIcon fontSize="inherit">
        <svg baseProfile="tiny" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 14c1.381 0 2.631-.56 3.536-1.465C16.44 11.631 17 10.381 17 9s-.56-2.631-1.464-3.535C14.631 4.56 13.381 4 12 4s-2.631.56-3.536 1.465C7.56 6.369 7 7.619 7 9s.56 2.631 1.464 3.535A4.985 4.985 0 0012 14zm8 1a2.495 2.495 0 002.5-2.5c0-.69-.279-1.315-.732-1.768A2.492 2.492 0 0020 10a2.495 2.495 0 00-2.5 2.5A2.496 2.496 0 0020 15zm0 .59c-1.331 0-2.332.406-2.917.968C15.968 15.641 14.205 15 12 15c-2.266 0-3.995.648-5.092 1.564C6.312 15.999 5.3 15.59 4 15.59c-2.188 0-3.5 1.09-3.5 2.182 0 .545 1.312 1.092 3.5 1.092.604 0 1.146-.051 1.623-.133l-.04.27c0 1 2.406 2 6.417 2 3.762 0 6.417-1 6.417-2l-.02-.255c.463.073.995.118 1.603.118 2.051 0 3.5-.547 3.5-1.092 0-1.092-1.373-2.182-3.5-2.182zM4 15c.69 0 1.315-.279 1.768-.732A2.492 2.492 0 006.5 12.5 2.495 2.495 0 004 10a2.496 2.496 0 00-2.5 2.5A2.495 2.495 0 004 15z" />
        </svg>
      </SvgIcon>
    );
  } else if (visibility === "Only Self") {
    visibilityIcon = <VpnLockIcon fontSize="inherit" />;
  }

  const [emojiAnchorEl, setEmojiAnchorEl] = useState<HTMLButtonElement | null>(
    null
  );
  const onClickSelectEmoji = (e: MouseEvent<HTMLButtonElement>) => {
    setEmojiAnchorEl(e.currentTarget);
  };
  const onEmojiClick = (selectedEmoji: string) => {
    const cleanBefore = postBody.substring(0, cursorPos);
    const beforeMentionsCount = (cleanBefore.match(/\^/g) || []).length / 2;
    const rawPos = cursorPos + beforeMentionsCount * 2;

    const before = postBody.substring(0, rawPos);
    const after = postBody.substring(rawPos, postBody.length);

    const newBody = `${before}${selectedEmoji}${after}`;
    setPostBody(newBody);
    setCursorPos(cursorPos + 2);
    setEmojiAnchorEl(null);
  };

  return (
    <>
      <IconButton
        aria-label="select emoji"
        size={iconSize}
        // onClick={() => setOpenEmoji(true)}
        onClick={onClickSelectEmoji}
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

      <EmojiPopover
        anchorEl={emojiAnchorEl}
        onClose={() => setEmojiAnchorEl(null)}
        onEmojiClick={onEmojiClick}
        vertical="top"
        horizontal="left"
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
