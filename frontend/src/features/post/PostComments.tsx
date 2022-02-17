import { MouseEvent, useState } from "react";
import {
  Avatar,
  Box,
  Chip,
  Divider,
  IconButton,
  Link as MuiLink,
  Paper,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";

import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import TagFacesIcon from "@mui/icons-material/TagFaces";

import MentionsBody from "../../common/components/mentions/MentionsBody";
import MentionsField from "../../common/components/mentions/MentionsField";
import EmojiPopover from "../../common/components/emoji-popover";

import { SuggestionDataItem } from "react-mentions";
import getInitials from "../../lib/getInitials";

const comments = [
  {
    name: "Nikka Melgar",
    comment:
      "Pakyu ka ^my lab^ 😡\nsakfljsfl lsfajsdlkfj dsf czmvc xcsdf 🎉🎉🎉",
  },
  {
    name: "John Ballesteros",
    comment: "Pakyu more",
  },
] as const;

const UpvotedIcon = () => (
  <SvgIcon sx={{ fontSize: "16px" }}>
    <path d="M4 14h4v7a1 1 0 001 1h6a1 1 0 001-1v-7h4a1.001 1.001 0 00.781-1.625l-8-10c-.381-.475-1.181-.475-1.562 0l-8 10A1.001 1.001 0 004 14z" />
  </SvgIcon>
);
const DownvotedIcon = () => (
  <SvgIcon sx={{ fontSize: "16px" }}>
    <path d="M20.901 10.566A1.001 1.001 0 0020 10h-4V3a1 1 0 00-1-1H9a1 1 0 00-1 1v7H4a1.001 1.001 0 00-.781 1.625l8 10a1 1 0 001.562 0l8-10c.24-.301.286-.712.12-1.059z" />
  </SvgIcon>
);

const Comment = ({ comment }: { comment: typeof comments[number] }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const [userVote, setUserVote] = useState(0);
  const upvote = () => {
    setUserVote(userVote !== 1 ? 1 : 0);
  };

  const downvote = () => {
    setUserVote(userVote !== -1 ? -1 : 0);
  };
  const upvoted = userVote === 1;
  const downvoted = userVote === -1;
  const votes = 20;

  const [userReaction, setUserReaction] = useState("");
  const onEmojiClick = (emoji: string) => {
    setUserReaction(emoji);
    setAnchorEl(null);
  };

  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    userReaction ? setUserReaction("") : setAnchorEl(e.currentTarget);
  };

  return (
    <Box
      sx={{
        pb: 2,
        display: "flex",
      }}
      key={comment.comment}
    >
      <Box
        sx={{
          pr: 2,
          // border: "1px solid red",
        }}
      >
        <Avatar alt={comment.name} sx={{ width: 36, height: 36 }}>
          {getInitials(comment.name)}
        </Avatar>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            minWidth: "250px",
            display: "block",
            flexDirection: "column",
            color: "#757575",
            backgroundColor: "#f1f1f1",
            borderRadius: "10px",
            px: 2,
            py: 1,
            position: "relative",
            // mb: -0.5,
          }}
        >
          <Typography sx={{ fontWeight: "bold" }}>{comment.name}</Typography>
          <MentionsBody body={comment.comment} isComment />

          <Paper
            sx={{
              position: "absolute",
              right: -1,
              marginTop: 0,
              marginRight: 0,
              fontSize: "12px",
              p: 0.5,
              borderRadius: "10px",
              "&:hover": {
                backgroundColor: "#eee",
                cursor: "pointer",
              },
            }}
          >
            <Typography fontSize="inherit">🥰🤩😎 21</Typography>
          </Paper>
        </Box>
        <Stack
          direction="row"
          sx={{ fontSize: "12px", alignItems: "center", pl: 2 }}
          spacing={0.5}
        >
          <Stack direction="row" sx={{ alignItems: "center" }} spacing={0.5}>
            <IconButton
              onClick={upvote}
              color={upvoted ? "primary" : "default"}
              size="small"
              sx={{ p: 0, height: "20px", width: "20px" }}
            >
              {upvoted ? <UpvotedIcon /> : <KeyboardArrowUpIcon />}
            </IconButton>
            <Typography sx={{ fontSize: "12px", color: "#66676B" }}>
              {votes + userVote}
            </Typography>
            <IconButton
              onClick={downvote}
              color={downvoted ? "primary" : "default"}
              size="small"
              sx={{ p: 0, height: "20px", width: "20px" }}
            >
              {downvoted ? <DownvotedIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </Stack>

          {userReaction ? (
            <IconButton
              onClick={onClick}
              color="secondary"
              sx={{ fontSize: "auto", p: "5px" }}
            >
              <Typography
                sx={{
                  width: "20px",
                  height: "20px",
                  fontSize: "16px",
                  lineHeight: "inherit",
                }}
              >
                {userReaction}
              </Typography>
            </IconButton>
          ) : (
            <IconButton size="small" onClick={onClick}>
              <TagFacesIcon fontSize="small" />
            </IconButton>
          )}
          {/* <MuiLink
            component="button"
            variant="body2"
            color="#66676B"
            underline="none"
            fontWeight="bold"
            onClick={onClick as any}
            sx={{
              fontSize: "inherit",
              ":hover": { textDecoration: "underline" },
            }}
          >
            React
          </MuiLink>
					 */}

          <MuiLink
            component="button"
            variant="body2"
            color="#66676B"
            underline="none"
            fontWeight="bold"
            sx={{
              fontSize: "inherit",
              ":hover": { textDecoration: "underline" },
              pr: 0.5,
            }}
          >
            Reply
          </MuiLink>

          <MuiLink
            component="button"
            variant="body2"
            color="#757575"
            underline="none"
            sx={{
              fontSize: "inherit",
              ":hover": { textDecoration: "underline", fontSize: "inherit" },
            }}
          >
            2y
          </MuiLink>
        </Stack>
      </Box>
      <EmojiPopover
        anchorEl={anchorEl}
        vertical="top"
        horizontal="left"
        onClose={() => setAnchorEl(null)}
        onEmojiClick={onEmojiClick}
      />
    </Box>
  );
};

const Comments = () => (
  <>
    {comments.map((comment) => (
      <Comment comment={comment} key={comment.comment} />
    ))}
  </>
);

const CommentInput = () => {
  const [body, setBody] = useState("");
  const [, setBodyPlain] = useState("");

  const [cursorPos, setCursorPos] = useState(0);

  const [, setMentions] = useState([] as SuggestionDataItem[]);
  const [mentionsHint] = useState([
    {
      id: "john",
      display: "John Ballesteros",
    },
    {
      id: "nikka",
      display: "Nikka Melgar",
    },
    {
      id: "XXX",
      display: "XXX",
    },
  ]);

  return (
    <Box
      sx={{
        py: 2,
        display: "flex",
        // border: "1px solid blue",
        alignItems: "center",
      }}
    >
      <Box sx={{ pr: 2 }}>
        <Avatar alt="John Ballesteros" sx={{ width: 36, height: 36 }}>
          JB
        </Avatar>
      </Box>
      <Box sx={{ width: "100%" }}>
        <MentionsField
          placeholder="Write a comment ..."
          body={body}
          setBody={setBody}
          setBodyPlain={setBodyPlain}
          setMentions={setMentions}
          mentionsHint={mentionsHint}
          cursorPos={cursorPos}
          setCursorPos={setCursorPos}
        />
      </Box>
    </Box>
  );
};

const PostComments = () => {
  return (
    <>
      <Divider />
      <CommentInput />
      <Comments />
    </>
  );
};

export default PostComments;
