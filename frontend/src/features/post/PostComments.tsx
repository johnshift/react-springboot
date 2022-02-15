import { MouseEvent, useRef, useState } from "react";
import {
  Avatar,
  Box,
  Divider,
  Link as MuiLink,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
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

const Comment = ({ comment }: { comment: typeof comments[number] }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  return (
    <Box
      sx={{
        px: 2,
        pb: 2,
        display: "flex",
      }}
      key={comment.comment}
    >
      <Box
        sx={{
          pr: 2,
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
            minWidth: "240px",
            display: "block",
            flexDirection: "column",
            color: "#757575",
            backgroundColor: "#f1f1f1",
            borderRadius: "10px",
            px: 2,
            py: 1,
            mb: 0.5,
            position: "relative",
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
        <Stack direction="row" spacing={1.5} sx={{ pl: 2.5 }}>
          <MuiLink
            component="button"
            variant="body2"
            color="#66676B"
            underline="none"
            fontWeight="bold"
            onClick={onClick as any}
            sx={{ ":hover": { textDecoration: "underline" } }}
          >
            React
          </MuiLink>
          <MuiLink
            component="button"
            variant="body2"
            color="#66676B"
            underline="none"
            fontWeight="bold"
            sx={{ ":hover": { textDecoration: "underline" } }}
          >
            Reply
          </MuiLink>
          <MuiLink
            component="button"
            variant="body2"
            color="#757575"
            underline="none"
            sx={{ ":hover": { textDecoration: "underline" } }}
          >
            2y
          </MuiLink>
        </Stack>
      </Box>
      <EmojiPopover
        anchorEl={anchorEl}
        vertical="bottom"
        horizontal="left"
        onClose={() => setAnchorEl(null)}
        onEmojiClick={() => null}
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

  const ref = useRef(null);

  return (
    <Box
      sx={{
        p: 2,
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
          fieldRef={ref}
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
