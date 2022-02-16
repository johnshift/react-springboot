import { Box, IconButton, Stack, SvgIcon, Typography } from "@mui/material";

import { usePostContext } from ".";

import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const UpvotedIcon = () => (
  <SvgIcon>
    <path d="M4 14h4v7a1 1 0 001 1h6a1 1 0 001-1v-7h4a1.001 1.001 0 00.781-1.625l-8-10c-.381-.475-1.181-.475-1.562 0l-8 10A1.001 1.001 0 004 14z" />
  </SvgIcon>
);

const DownvotedIcon = () => (
  <SvgIcon>
    <path d="M20.901 10.566A1.001 1.001 0 0020 10h-4V3a1 1 0 00-1-1H9a1 1 0 00-1 1v7H4a1.001 1.001 0 00-.781 1.625l8 10a1 1 0 001.562 0l8-10c.24-.301.286-.712.12-1.059z" />
  </SvgIcon>
);

const PostVoteBtns = () => {
  const { votes, userVote, setUserVote } = usePostContext();

  const upvote = () => {
    setUserVote(userVote !== 1 ? 1 : 0);
  };

  const downvote = () => {
    setUserVote(userVote !== -1 ? -1 : 0);
  };

  const upvoted = userVote === 1;
  const downvoted = userVote === -1;

  return (
    <Stack
      direction="row"
      sx={{
        p: 0.5,
        alignItems: "center",
        // border: "1px solid red"
      }}
      spacing={1}
    >
      <IconButton
        onClick={upvote}
        color={upvoted ? "primary" : "default"}
        size="small"
      >
        {upvoted ? <UpvotedIcon /> : <KeyboardArrowUpIcon />}
      </IconButton>
      <Box>
        <Typography fontSize={"small"} noWrap>
          {votes + userVote}
        </Typography>
      </Box>
      <IconButton
        onClick={downvote}
        color={downvoted ? "primary" : "default"}
        size="small"
      >
        {downvoted ? <DownvotedIcon /> : <KeyboardArrowDownIcon />}
      </IconButton>
    </Stack>
  );
};

export default PostVoteBtns;
