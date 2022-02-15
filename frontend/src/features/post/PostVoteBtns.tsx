import { Box, IconButton } from "@mui/material";

import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import { usePostContext } from ".";

const PostVoteBtns = () => {
  const { setUserVote } = usePostContext();

  const upvote = () => {
    setUserVote((v) => v + 1);
  };

  const downvote = () => {
    setUserVote((v) => v - 1);
  };

  return (
    <Box>
      <IconButton onClick={upvote}>
        <KeyboardArrowUpIcon />
      </IconButton>
      <IconButton onClick={downvote}>
        <KeyboardArrowDownIcon />
      </IconButton>
    </Box>
  );
};

export default PostVoteBtns;
