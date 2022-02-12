import { Box } from "@mui/material";

import classNames from "../../styles/postBody.module.css";
import { Mention, MentionsInput, SuggestionDataItem } from "react-mentions";
import { usePostContext } from "./PostContext";

const PostBody = () => {
  const { body } = usePostContext();

  return (
    <Box sx={{ mb: 1 }}>
      <MentionsInput classNames={classNames} value={body} className="mentions">
        <Mention
          trigger="@"
          markup="^__display__^"
          className={classNames.mentions__mention}
          data={[] as SuggestionDataItem[]}
          appendSpaceOnAdd
        />
      </MentionsInput>
    </Box>
  );
};

export default PostBody;
