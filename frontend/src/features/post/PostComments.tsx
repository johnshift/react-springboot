import { Avatar, Box, Divider } from "@mui/material";
import { Mention, MentionsInput, SuggestionDataItem } from "react-mentions";

import classNames from "../../styles/commentInput.module.css";

const CommentInput = () => (
  <>
    <Box sx={{ pr: 2 }}>
      <Avatar alt="John Ballesteros" sx={{ width: 36, height: 36 }}>
        JB
      </Avatar>
    </Box>
    <Box sx={{ width: "100%" }}>
      <MentionsInput
        classNames={classNames}
        // value={body}
        placeholder="Write a comment ..."
        className="mentions"
      >
        <Mention
          trigger="@"
          markup="^__display__^"
          className={classNames.mentions__mention}
          data={[] as SuggestionDataItem[]}
          appendSpaceOnAdd
        />
      </MentionsInput>
    </Box>
  </>
);

const PostComments = () => {
  return (
    <>
      <Divider />
      <Box
        sx={{
          p: 2,
          display: "flex",
          // border: "1px solid blue",
          justifyContent: "start",
          alignItems: "center",
        }}
      >
        <CommentInput />
      </Box>
    </>
  );
};

export default PostComments;
